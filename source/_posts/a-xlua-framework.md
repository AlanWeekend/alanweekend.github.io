---
title: 学习一个xlua框架总结
date: 2022-01-20 10:08:26
categories:
tags:
cover:
---

# 框架大体结构
{% mermaid %}
    classDiagram
        class GameStart{
            <<框架入口>>
        }
        class MonoBehaviour{
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
            <<对象池管理器>>
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
{% endmermaid %}