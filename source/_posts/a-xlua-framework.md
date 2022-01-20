---
title: 学习一个xlua框架总结
date: 2022-01-20 10:08:26
categories:
tags:
cover:
---

# 框架大体结构
## 场景结构
![场景结构](1.png)
## 框架UML图
{% mermaid %}
    classDiagram
        class GameStart{
            <<框架入口>>
        }
        class Manager{
            <<所有模块的引用入口>>
        }
        class ResourceManager{
            <<资源管理器>>
        }
        class LuaManager{
            <<Lua管理器>>
        }
        class UIManager{
            <<UI管理器>>
        }
        class EntityManager{
            <<实体管理器>>
        }        
        class SceneManager{
            <<场景管理器>>
        }        
        class SoundManager{
            <<声音管理器>>
        }        
        class EventManager{
            <<事件管理器>>
        }        
        class PoolManager{
            <<池管理器>>
        }        
        class NetManager{
            <<网络管理器>>
        }
        class BuildTool{
            <<AssetBundle打包工具>>
        }
        class UnityEx{
            <<LuaCallSharp扩展>>
        }
        GameStart --o MonoBehaviour : 继承
        Manager --|> MonoBehaviour : 继承
        ResourceManager --|> MonoBehaviour : 继承
        LuaManager --|> MonoBehaviour : 继承
        UIManager --|> MonoBehaviour : 继承
        EntityManager --|> MonoBehaviour : 继承
        SceneManager --|> MonoBehaviour : 继承
        SoundManager --|> MonoBehaviour : 继承
        EventManager --|> MonoBehaviour : 继承
        PoolManager --|> MonoBehaviour : 继承
        NetManager --|> MonoBehaviour : 继承
        Manager --o ResourceManager : 包含
        Manager --o LuaManager : 包含
        Manager --o UIManager : 包含
        Manager --o EntityManager : 包含
        Manager --o SceneManager : 包含
        Manager --o SoundManager : 包含
        Manager --o EventManager : 包含
        Manager --o PoolManager : 包含
        Manager --o NetManager : 包含
{% endmermaid %}

---

# BuildTool类

收集资源及依赖文件打成ab，记录文件列表包括资源名|Bundle名|依赖[]
{% mermaid %}
    classDiagram
        class BuildTool{
            <<AssetBundle打包工具>>
            -BuildWindowsBundle() $
            -BuildAndroidBundle()$
            -BuildIOSBundle()$
            -Build() $
            -GetDependence(string curFile)$ List~string~
        }
{% endmermaid %}

记录文件列表如下：

```
Assets/BuildResources/UI/Prefab/TestUI.prefab|ui/prefab/testui.prefab.ab|Assets/BuildResources/UI/Res/3.png|Assets/BuildResources/UI/Res/1.png
```
以``|``符号分割，[0] = 资源名，[1] = Bundle名，后面的都是依赖

---

# GameStart类
框架入口，挂载到Root节点，读取文件列表，初始化lua等
```CSharp
using UnityEngine;

public class GameStart : MonoBehaviour
{
    public GameMode GameMode;
    public bool OpenLog;

    void Start()
    {
        // 订阅lua初始化完成事件
        Manager.Event.Subscribe(10000,OnLuaInit);

        AppConst.GameMode = this.GameMode;
        AppConst.OpenLog = this.OpenLog;
        DontDestroyOnLoad(this);

        // 读取并解析文件列表
        Manager.Resource.ParseVersionFile();
        // 初始化lua
        Manager.Lua.Init();
    }

    void OnLuaInit(object args)
    {
        Manager.Lua.StartLua("main");
        var func = Manager.Lua.LuaEnv.Global.Get<XLua.LuaFunction>("Main");
        func.Call();

        Manager.Pool.CreateGameObjectPool("UI", 10);
        Manager.Pool.CreateGameObjectPool("Monster", 120);
        Manager.Pool.CreateGameObjectPool("Effect", 120);
        Manager.Pool.CreateAssetPool("AssetBundle", 10);
    }
}
```

---

# Manager类
存储所有模块脚本，持有所有模块，所有模块的入口，挂载到Manager节点
{% mermaid %}
    classDiagram
        class Manager{
            <<所有模块的引用入口>>
            +ResourceManager Resource$
            +LuaManager Lua$
            +UIManager UI$
            +EntityManager Entity$
            +SceneManager Scene$
            +SoundManager Sound$
            +EventManager Event$
            +PoolManager Pool$
            +NetManager Net$
            -Awake()
        }
        Manager --|> MonoBehaviour : 继承
{% endmermaid %}
在Awake中初始化所有模块
```CSharp
private void Awake()
{
    _resource = this.gameObject.AddComponent<ResourceManager>();
    _lua = this.gameObject.AddComponent<LuaManager>();
    _ui = this.gameObject.AddComponent<UIManager>();
    _entity = this.gameObject.AddComponent<EntityManager>();
    _scene = this.gameObject.AddComponent<SceneManager>();
    _sound = this.gameObject.AddComponent<SoundManager>();
    _event = this.gameObject.AddComponent<EventManager>();
    _pool = this.gameObject.AddComponent<PoolManager>();
    _net = this.gameObject.AddComponent<NetManager>();
}
```

---

# 资源加载与卸载流程
## 加载
{% mermaid %}
flowchart TB
    资源名 --> id1{从Bundle缓存获取}
    id1-- 有 -->Bundle缓存
    Bundle缓存-- 返回 -->Bundle
    id1-- 无 -->id2{从资源池获取}
    id2-- 有 -->资源池
    资源池-- 取出 -->Bundle缓存
    id2-- 无 -->读取AB文件
    读取AB文件 --> Bundle缓存
{% endmermaid %}

## 卸载
{% mermaid %}
flowchart TB
    销毁对象 -- 引用计数-1 --> Bundle缓存
    Bundle缓存-- 引用计数<=0 -->资源池
    资源池-- 到时间 --> 卸载Bundle
{% endmermaid %}

---

# ResourceManager类
解析文件列表，加载ab，并对外提供加载各种类型资源的方法。内部使用引用计数，在外部定时卸载引用计数为0的资源。包括编辑器模式加载和Bundle模式加载两种方式。
{% mermaid %}
    classDiagram
        class ResourceManager{
            <<资源加载模块>>
            -Dictionary~string, BundleInfo~ m_BundleInfos
            -Dictionary~string, BundleData~ m_LoadedAssetBundle
            +ParseVersionFile()
            +MinusBundleCount(string assetName)
            +UnloadBundle(UObject obj)
            +LoadUI(string assetName, Action<UObject> onComplate)
            +LoadMusic(string assetName, Action<UObject> onComplate)
            +LoadSound(string assetName, Action<UObject> onComplate)
            +LoadEffect(string assetName, Action<UObject> onComplate)
            +LoadScene(string assetName, Action<UObject> onComplate)
            +LoadLua(string assetName, Action<UObject> onComplate)
            +LoadPrefab(string assetName, Action<UObject> onComplate)
            -LoadBunldeAsync(string assetName, Action<UObject> onComplate = null) IEnumerator
            -LoadAssetAsync(string assetName, Action<UObject> onComplate)
            -GetBundle(string name) BundleData
            -MinusOneBundleCount(string bundleName)
            -EditorLoadAsset(string assetName, Action<UObject> onComplate)
            -Awake()
        }
        class BundleInfo{
            <<描述要加载的Bunld信息：资源名、Bundle名、依赖>>
            +string AssetsName
            +string BunldeName
            +List~string~ Dependence
        }
        class BundleData{
            <<描述缓存的Bunlde信息：Bundle、引用计数>>
            +AssetBundle Bundle
            +int Count
            +BundleData(AssetBundle ab)
        }
        ResourceManager --|> MonoBehaviour : 继承
        ResourceManager -- BundleInfo : 依赖
        ResourceManager -- BundleData : 依赖
{% endmermaid %}

## ParseVersion 解析版本文件
解析版本文件，缓存解析出的ab和依赖
```CSharp
public void ParseVersionFile()
{
    // 版本文件路径
    string url = Path.Combine(PathUtil.BunldeResourcePath, AppConst.FileListName);
    var data = File.ReadAllLines(url);

    for (int i = 0; i < data.Length; i++)
    {
        // 解析Bunlde信息
        var bundleInfo = new BundleInfo();
        string[] info = data[i].Split('|');
        bundleInfo.AssetsName = info[0];
        bundleInfo.BunldeName = info[1];
        bundleInfo.Dependence = new List<string>(info.Length - 2);
        for (int j = 2; j < info.Length; j++)
        {
            bundleInfo.Dependence.Add(info[j]);
        }
        // 缓存Bundle信息
        m_BundleInfos.Add(bundleInfo.AssetsName, bundleInfo);
        // 缓存lua文件名，用于加载lua脚本
        if (info[0].IndexOf("LuaScripts") > 0)
        { 
            Manager.Lua.LuaNames.Add(info[0]);
        }
    }
}
```

## 对外提供的Load方法
根据加载的资源类型，从不同的目录中加载文件
```CSharp
public void LoadUI(string assetName, Action<UObject> onComplate)
{
    LoadAssetAsync(PathUtil.GetUIPath(assetName), onComplate);
}

public void LoadMusic(string assetName, Action<UObject> onComplate)
{
    LoadAssetAsync(PathUtil.GetMusicPath(assetName), onComplate);
}

public void LoadSound(string assetName, Action<UObject> onComplate)
{
    LoadAssetAsync(PathUtil.GetSoundPath(assetName), onComplate);
}

public void LoadEffect(string assetName, Action<UObject> onComplate)
{
    LoadAssetAsync(PathUtil.GetEffectPath(assetName), onComplate);
}

public void LoadScene(string assetName, Action<UObject> onComplate)
{
    LoadAssetAsync(PathUtil.GetScenePath(assetName), onComplate);
}
public void LoadLua(string assetName, Action<UObject> onComplate)
{
    LoadAssetAsync(assetName, onComplate);
}
public void LoadPrefab(string assetName, Action<UObject> onComplate)
{
    LoadAssetAsync(assetName, onComplate);
}
```

## LoadAssetAsync 异步加载资源
根据模式，区分是从Edior中加载还是从Bundle中加载
```CSharp
private void LoadAssetAsync(string assetName, Action<UObject> onComplate)
{
    if (AppConst.GameMode == GameMode.EditorMode)
        EditorLoadAsset(assetName, onComplate);
    else
        StartCoroutine(LoadBunldeAsync(assetName, onComplate));
}
```

## EditorLoadAsset 编辑器模式下加载
这里用到了``AssetDatabase.LoadAssetAtPath``API去加载项目中的资源
```CSharp
private void EditorLoadAsset(string assetName, Action<UObject> onComplate)
{
#if UNITY_EDITOR
    var obj = AssetDatabase.LoadAssetAtPath<UObject>(assetName);
    if (obj == null)
        Debug.LogError("asset name is not exist:" + assetName);
    onComplate?.Invoke(obj);
#endif
}
```

## GetBundle 从已加载的缓存中获取Bundle
注意，这里从缓存中获取bundle，如果缓存中有，返回Bundle并且引用计数+1
```CSharp
BundleData GetBundle(string name)
{
    if(m_LoadedAssetBundle.TryGetValue(name,out var bundle))
    {
        bundle.Count++;
        return bundle;
    }
    return null;
}
```

## LoadBunldeAsync 异步加载Bundle
**从读取AB文件到实例化至场景中，需要经历一下几个步骤：**
1. 读取AB文件
2. 加载AB文件中的Bundle资源
3. 实例化Bundle

**这里分了如下几步去加载Bundle：**
1. 先从缓存中获取，如果缓存中有，加载Bundle，并且引用计数+1
2. 缓存中没有，从资源池获取。如果资源池有，从资源池中取出Bundle，加载这个Bundle并且引用计数+1
3. 缓存和资源池中都没有，根据传入的路径读取ab文件，加载这个Bundle，并且缓存起来，同时引用计数也要+1

**这里有几个需要注意的点：**
> 加载Bundle文件时，必须要先加载Bundle的依赖文件。
> 场景文件不需要加载Bundle。
> 依赖文件也不需要加载Bundle。
```CSharp
private IEnumerator LoadBunldeAsync(string assetName, Action<UObject> onComplate = null)
{
    var bunldeName = m_BundleInfos[assetName].BunldeName;
    var bundlePath = Path.Combine(PathUtil.BunldeResourcePath, bunldeName);
    var dependences = m_BundleInfos[assetName].Dependence;

    BundleData bundle = GetBundle(bunldeName);
    if (bundle == null)
    {
        var obj = Manager.Pool.Spawn("AssetBundle",bunldeName);
        if (obj != null)
        {
            var ab = obj as AssetBundle;
            bundle = new BundleData(ab);
        }
        else
        {
            // 加载依赖
            if (dependences != null && dependences.Count > 0)
            {
                foreach (var dependence in dependences)
                {
                    yield return LoadBunldeAsync(dependence);
                }
            }
        
            // 加载bundle
            AssetBundleCreateRequest request = AssetBundle.LoadFromFileAsync(bundlePath);
            yield return request;
            bundle = new BundleData(request.assetBundle);
            m_LoadedAssetBundle.Add(bunldeName, bundle);
        }
    }

    // 场景资源不需要加载ab
    if (assetName.EndsWith(".unity"))
    {
        onComplate?.Invoke(null);
        yield break;
    }

    // 加载依赖资源不需加载bundle
    if (onComplate == null)
    {
        yield break;
    }
    // 加载bundle中的资源
    AssetBundleRequest bunldeRequest = bundle.Bundle.LoadAssetAsync(assetName);
    yield return bunldeRequest;

    onComplate?.Invoke(bunldeRequest?.asset);
}
```

## MinusOneBundleCount 减去一个资源的引用计数
这里分两种情况：
- Bundle的引用计数``>1``时，只做-1
- Bundle的引用计数``<=0``时，把Bundle放入资源池，等待资源池的定时释放
```CSharp
private void MinusOneBundleCount(string bundleName)
{
    if (m_LoadedAssetBundle.TryGetValue(bundleName, out var bundle))
    {
        if (bundle.Count > 0)
        {
            bundle.Count--;
        }

        if (bundle.Count <= 0)
        {
            Manager.Pool.UnSpawn("AssetBundle",bundleName,bundle.Bundle);
            m_LoadedAssetBundle.Remove(bundleName);
        }
    }
}
```
## MinusBundleCount 减去资源的引用计数
这里需要对自身的引用数-1的同时，对引用的依赖的引用计数也要-1
这个函数对外提供，在销毁一个对象时，手动调用一下引用计数-1
```CSharp
public void MinusBundleCount(string assetName)
{
    string bundleName = m_BundleInfos[assetName].BunldeName;
    MinusOneBundleCount(bundleName);

    // 依赖资源
    var dependences = m_BundleInfos[assetName].Dependence;
    if (dependences != null)
    {
        foreach (var dep in dependences)
        {
            string name = m_BundleInfos[dep].BunldeName;
            MinusBundleCount(name);
        }
    }
}
```
## UnloadBundle卸载Bundle资源
```CSharp
public void UnloadBundle(UObject obj)
{
    var ab = obj as AssetBundle;
    ab.Unload(true);
}
```
---
# Pool类
池管理类，框架对资源池的设计思想是：可以有多个对象池和引用池，开发者可以自行按照类型去分类
{% mermaid %}
    classDiagram
        class PoolManager{
            <<池管理器>>
            -Transform m_Parnt
            -Dictionary~string, PoolBase~ m_Pools
            +CreateGameObjectPool(string poolName, float releaseTime)
            +CreateAssetPool(string poolName, float releaseTime)
            +Spawn(string poolName, string assetName) Object
            +UnSpawn(string poolName, string assetName, Object asset)
            -Awake()
            -CreatePool<T>(string poolName, float releaseTime)
        }
        class PoolObject{
            +Object Object
            +string Name
            +System.DateTime LastUseTime
            +PoolObject(string name, Object Object)
        }
        class PoolBase{
            <<池父类>>
            ~float m_ReleaseTime
            ~long m_LastReleaseTime
            ~List~PoolObject~ m_Objects
            +Init(float time)
            +Spawn(string name) Object
            +UnSpawn(string name, Object obj)
            +Release()
            -Awake()
            -Update()
        }        
        class GameObjectPool{
            <<对象池>>
            +Spawn(string name) Object
            +UnSpawn(string name, Object obj)
            +Release()
        }        
        class AssetPool{
            <<资源池>>
            +Spawn(string name) Object
            +UnSpawn(string name, Object obj)
            +Release()
        }
        PoolManager --|> MonoBehaviour : 继承
        PoolBase --|> MonoBehaviour : 继承
        PoolBase -- PoolObject : 依赖 
        GameObjectPool --|> PoolBase : 继承
        AssetPool --|> PoolBase : 继承
{% endmermaid %}
## CreatePool 创建对象池
创建一个指定类型的池，所有创建的池都放在``Root/Pool/*``节点下
```CSharp
private void CreatePool<T>(string poolName, float releaseTime) where T : PoolBase
{
    if (!m_Pools.TryGetValue(poolName, out var pool))
    {
        var go = new GameObject(poolName);
        go.transform.SetParent(m_Parnt);
        pool = go.AddComponent<T>();
        pool.Init(releaseTime);
        m_Pools.Add(poolName,pool);
    }
}
```
## CreateGameObjectPool 创建对象池
对外提供的方法，创建一个存储GameObject的池
```C#
public void CreateGameObjectPool(string poolName, float releaseTime)
{
    this.CreatePool<GameObjectPool>(poolName, releaseTime);
}
```
## CreateAssetPool 创建资源池
对外提供的方法，创建一个存储Bundle资源的池
```C#
public void CreateAssetPool(string poolName, float releaseTime)
{
    this.CreatePool<AssetPool>(poolName, releaseTime);
}
```
## Spawn 生成对象
对外提供的方法
```CSharp
public Object Spawn(string poolName, string assetName)
{
    if (m_Pools.TryGetValue(poolName, out var pool))
    {
        return pool.Spawn(assetName);
    }

    return null;
}
```

## UnSpawn 回收对象
对外提供的方法
```CSharp
public void UnSpawn(string poolName, string assetName, Object asset)
{
    if (m_Pools.TryGetValue(poolName, out var pool))
    {
        pool.UnSpawn(assetName,asset);
    }
}
```
## PoolBase类
所有池类的父类
### 定时释放资源
内部维护一个释放时间间隔，定时释放池内资源
```CSharp
private void Update()
{
    if (System.DateTime.Now.Ticks - m_LastReleaseTime >= m_ReleaseTime * 10000000)
    {
        m_LastReleaseTime = System.DateTime.Now.Ticks;
        Release();
    }
}
```
## GameObjectPool 类
对象池，释放资源时，需要调用引用计数-1
```CSharp
public override void Release()
{
    base.Release();
    for (int i = 0; i < m_Objects.Count; i++)
    {
        while (i < m_Objects.Count &&
                System.DateTime.Now.Ticks - m_Objects[i].LastUseTime.Ticks >= m_ReleaseTime * 10000000)
        {
            Destroy(m_Objects[i].Object);
            Manager.Resource.MinusBundleCount(m_Objects[i].Name);
            m_Objects.Remove(m_Objects[i]);
        }
    }
}
```
## AssetPool类
资源池，定时卸载不用的Bundle
```CSharp
public override void Release()
{        
    for (int i = 0; i < m_Objects.Count; i++)
    {
        while (i < m_Objects.Count &&
                System.DateTime.Now.Ticks - m_Objects[i].LastUseTime.Ticks >= m_ReleaseTime * 10000000)
        {
            Debug.Log($"卸载ab{m_Objects[i].Name}");
            Manager.Resource.UnloadBundle(m_Objects[i].Object);
            m_Objects.Remove(m_Objects[i]);
        }
    }
}
```
---
# Lua管理器
初始化Lua虚拟机，加载Lua脚本
{% mermaid %}
    classDiagram
        class LuaManager{
            +List~string~ LuaNames
            +LuaEnv LuaEnv
            -Dictionary~string, byte[]~ m_LuaScript
            +Init()
            +StartLua(string luaFileName)
            +GetLuaScript(string luaFileName)
            -Loader(ref string luaFileName)
            -EditorLoadLuaScript()
            -LoadLuaScript()
            -AddLuaScript(string assetsName, byte[] luaScript)
            -Update()
            -OnDestroy()
        }
        class LuaBehaviour{
            -LuaEnv m_LuaEnv
            -Action m_LuaOnInit
            -Action m_LuaUpdate
            -Action m_LuaOnDestroy
            ~LuaTable m_ScriptEnv
            +Init(string luaName)
            ~Clear()
            -Awake()
            -Update()
            -OnDestroy()
            -OnApplicationQuit()
        }
        LuaManager --|> MonoBehaviour : 继承
        LuaBehaviour --|> MonoBehaviour : 继承
{% endmermaid %}
## Init 初始化
对外提供的方法，在``GameStart``中调用
**这里做以下几件事:**
1. 初始化Lua虚拟机
2. 添加第三方库
3. 添加自定义Loader
4. 加载所有的Lua脚本

```CSharp
public void Init()
{
    LuaEnv = new LuaEnv();
    LuaEnv.AddBuildin("rapidjson", XLua.LuaDLL.Lua.LoadRapidJson);
    LuaEnv.AddLoader(Loader);
    m_LuaScript = new Dictionary<string, byte[]> ();
    if (AppConst.GameMode == GameMode.EditorMode)
    {
        EditorLoadLuaScript();
    }
    else
    {
        LoadLuaScript();
    }
}
```

## Update
调用Xlua的Tick函数，进行GC
```CSharp
private void Update()
{
    LuaEnv?.Tick();
}
```

## OnDestroy
释放lua虚拟机
```CSharp
private void OnDestroy()
{
    if (LuaEnv != null)
    { 
        LuaEnv.Dispose();
        LuaEnv = null;
    }
}
```

## StartLua
执行Lua脚本，一般只调用一次，执行lua的main脚本
```CSharp
public void StartLua(string luaFileName)
{
    LuaEnv.DoString($"require '{luaFileName}'");
}
```

## EditorLoadLuaScript 编辑器模拟下加载所有的Lua脚本
```CSharp
private void EditorLoadLuaScript()
{
    var luaFiles = Directory.GetFiles(PathUtil.LuaPath, "*.bytes", SearchOption.AllDirectories);
    foreach (var luaFile in luaFiles)
    {
        var fileName = PathUtil.GetStandardPath(luaFile);
        var file = File.ReadAllBytes(fileName);
        AddLuaScript(PathUtil.GetUnityPath(fileName), file);
    }
    Manager.Event.Fire(10000);
}
```

## LoadLuaScript 从Bundle中加载所有的Lua脚本
```CSharp
private void LoadLuaScript()
{
    foreach (var luaName in LuaNames)
    {
        Manager.Resource.LoadLua(luaName, (UnityEngine.Object obj) =>
        {
            AddLuaScript(luaName, (obj as TextAsset)?.bytes);
            if (m_LuaScript.Count < LuaNames.Count) return;
            Manager.Event.Fire(10000);
            LuaNames.Clear();
            LuaNames = null;
        });
    }
}
```

## AddLuaScript 缓存lua脚本
主要是避免在Loader中重复读取脚本
```CSharp
private void AddLuaScript(string assetsName, byte[] luaScript)
{
    m_LuaScript[assetsName] = luaScript;
}
```

## GetLuaScript 自定义Loader
```CSharp
public byte[] GetLuaScript(string luaFileName)
{
    luaFileName = luaFileName.Replace(".", "/");
    var fileName = PathUtil.GetLuaScriptPath(luaFileName);

    if (!m_LuaScript.TryGetValue(fileName, out var luaScript))
    {
        Debug.Log($"lua script is not exist:{fileName}");
    }
    return luaScript;
}
```

## LuaBehaviour类
绑定lua脚本，提供类似MonoBehaviour的生命周期。
同时也是所有需要在lua中挂载的脚本的父类。
### Awake
为每一个lua脚本创建单独的环境，防止各脚本之前相互影响
```CSharp
private void Awake()
{
    m_ScriptEnv = m_LuaEnv.NewTable();
    var meta = m_LuaEnv.NewTable();
    meta.Set("__index", m_LuaEnv.Global);
    m_ScriptEnv.SetMetaTable(meta);
    meta.Dispose();
    m_ScriptEnv.Set("self", this);
}
```

### Init
初始化，绑定生命周期的回调
```CSharp
public virtual void Init(string luaName)
{
    m_LuaEnv.DoString(Manager.Lua.GetLuaScript(luaName), luaName, m_ScriptEnv);
    m_ScriptEnv.Get("OnInit",out m_LuaOnInit);
    m_ScriptEnv.Get("Update",out m_LuaUpdate);
    m_ScriptEnv.Get("OnDestroy",out m_LuaOnDestroy);       
    m_LuaOnInit?.Invoke(); 
}
```

### Update
调用lua中的Update
```CSharp
private void Update()
{
    m_LuaUpdate?.Invoke();
}
```

### OnDestroy
调用lua中的OnDestroy
清空绑定的回调，释放脚本环境
```CSharp
private void OnDestroy()
{
    m_LuaOnDestroy?.Invoke();
    Clear();
}
```

### OnApplicationQuit
清空绑定的回调，释放脚本环境
```CSharp
private void OnApplicationQuit()
{
    Clear();
}
```

### Clear
清空绑定的回调，释放脚本环境
**值得注意的是**
> 释放lua虚拟机时，必须要先清空绑定的lua回调

```CSharp
protected virtual void Clear()
{
    m_LuaOnInit = null;
    m_LuaUpdate = null;
    m_LuaOnDestroy = null;
    m_ScriptEnv?.Dispose();
    m_ScriptEnv = null;
}
```


### OnDestroy

---
# UI管理器
管理所有的UI，包括：UI分组、打开关闭UI

{% mermaid %}
    classDiagram
        class UIManager{
            -Dictionary~string, Transform~ m_UIGroups
            -Transform m_UIParent
            +SetUIGroup(List<string> group)
            +GetUIGourp(string group) Transform
            +OpenUI(string uiName, string group, string luaName)
            -Awake()
        }
        class UILogic{

        }
        UIManager --|> MonoBehaviour
{% endmermaid %}