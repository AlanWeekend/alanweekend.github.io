---
title: Visual Studio 2022 集成Xlua第三方库 build_xlua_with_libs
date: 2022-01-17 16:36:22
categories:
- [Xlua]
tags:
- Xlua
cover: 1.png
---

[build_xlua_with_libs](https://github.com/chexiongsheng/build_xlua_with_libs)

下载仓库后直接执行.bat会报如下的错误

```bat
CMake Error:
  Generator

    Visual Studio 15 2017

  could not find any instance of Visual Studio.
```

解决方法:

1. 首先确定Visual Studio已安装cmake组件

![Visual Studio Installer](1.png)

2. 参考往上的其他文章，安装使用C++的桌面开发和Visual Studio 扩展开发这两个负荷。不确定是否是必要的，我安装了。

3. 修改.bat文件中的generator，如果是Visual Studio 2022 修改为 ``Visual Studio 17 2022``

```bat
mkdir build64 & pushd build64
cmake -G "Visual Studio 17 2022" ..
popd
cmake --build build64 --config Release
md plugin_lua53\Plugins\x86_64
copy /Y build64\Release\xlua.dll plugin_lua53\Plugins\x86_64\xlua.dll
pause
```

其实Visual Studio 版本对应的generator可以在CMAKE-GUI中查看

![CMAKE Generator List](2.png)