---
title: 《倚天屠龙之君临天下》素材提取
date: 2022-02-24 11:45:21
categories:
- [玩具]
tags:
- 玩具
cover: 1.png
---

小时候玩这个游戏玩了好几遍，很喜欢这个游戏。菜刀1-9999至今记忆犹新。
### 解包过程
直接打开包就能看到里面的很多素材是加密的。
![](1.png)
既然加密，程序内部肯定会有解密的方法。仔细找一下应该不然找到，我也就翻了几个小时吧，就找到了。
首先找到这个地方，这里有一个文件后缀的判断，下面针对这个ps文件创建了一个``image``
![](2.png)
找到这个a函数，显然这就是解密方法，原理差不多就是二进制读取然后把字节打乱。
![](3.png)
### 解密文件
把这个类整个拿出来，改以下输入和输出的地方，输入读本地文件流，输出把文件流写出来就行了。
```JAVA
package com.decodeps;//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

import java.io.*;

public final class x {
    byte[] a;
    private int bb;
    int aa;
    private static final byte[] b = new byte[]{-119, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82};

    public x() {
        this.aa = 0;
        this.bb = 0;
    }

    public x(String var1) {
        String var2 = null;

        try {
//            if (!var1.startsWith("/")) {
//                var2 = "/" + var1;
//            } else {
                var2 = var1;
//            }

            System.out.println(var2);

//            InputStream var6 = this.getClass().getResourceAsStream(var2);
            InputStream var6 = new FileInputStream(var2);
            ByteArrayOutputStream var3 = new ByteArrayOutputStream(256);
            byte[] var4 = new byte[256];

            while((this.bb = var6.read(var4)) != -1) {
                var3.write(var4, 0, this.bb);
            }

            this.a = var3.toByteArray();
            var6.close();
            var3.close();
            this.bb = this.a.length;
            this.aa = 0;
        } catch (Exception var5) {
            System.out.println("读取文件：" + var2 + "出错"+var5.toString());
        }
    }

    public final byte A() {
        return this.a[this.aa++];
    }

    public final void a(int var1) {
        this.aa += var1;
        if (this.aa >= this.bb) {
            this.aa = 0;
        }

    }

    public final byte[] AA() {
        x var1 = this;
        this.bb = this.a.length;
        this.aa = 0;

        byte[] var10000;
        for(int var2 = 7; var2 < var1.bb; var2 += 8) {
            var10000 = var1.a;
            var10000[var2] = (byte)(var10000[var2] + 5);
        }

        var1.bb = 16 + var1.a.length;
        byte[] var4 = new byte[var1.bb];

        int var3;
        for(var3 = 16; var3 < var1.bb; ++var3) {
            var4[var3] = var1.A();
        }

        for(var3 = 0; var3 < 16; ++var3) {
            var4[var3] = b[var3];
        }

        var1.a = null;
        var1.a = var4;
        var10000 = var1.a;
//        return Image.createImage(this.a, 0, this.b);
        return this.a;
    }
}
```
```JAVA
package com.decodeps;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class Main {

    static String readDir = "C:\\Users\\ccz41\\Desktop\\2022012114130436579";
    static String writeDir = "C:\\Users\\ccz41\\Desktop\\decode";

    public static void main(String[] args) {
        ListFiles(readDir);
    }

    public static void ListFiles(String path){
        File file = new File(path);
        File[] fs = file.listFiles();	//遍历path下的文件和目录，放在File数组中
        for(File f:fs){					//遍历File[]数组
            if(f.isDirectory())		//若非目录(即文件)，则打印
            {
                ListFiles(f.getPath());
            }
            else
            {
                if(f.getPath().endsWith(".ps"))
                {
                    x xx = new x(f.getPath());
                    byte[] data = xx.AA();
                    String writePath = f.getPath().replace(readDir,writeDir).replace(".ps",".png");
                    WirtePNG(data,writePath);
                }
            }
        }
    }

    private static void WirtePNG(byte[] a,String dir)
    {
        File file = new File(dir);  //创建文件对象
        try {
            if (!file.exists()) {
                boolean i = file.getParentFile().mkdirs(); // 创建路径
            }
            if (!file.exists()) {               //如果文件不存在则新建文件
                file.createNewFile();
            }
            FileOutputStream output = new FileOutputStream(file);
            output.write(a);                //将数组的信息写入文件中
            output.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
```