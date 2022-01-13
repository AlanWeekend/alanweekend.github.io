---
title: 优化动态删除集合中的元素
date: 2022-01-13 17:04:47
categories:
- [算法]
tags:
- 优化
cover:
---

### 如何删除一个集合中满足条件的所有元素？

这是一个很常见的问题，解决方式也五花八门。

常用的思路一般是找出所有集合中所有满足条件的集合存起来，再遍历这个集合删除其中的元素
```CSHARP
static void Main(string[] args)
{
    var lst = new List<int>() { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
    var tempLst = new List<int>();
    foreach (var item in lst)
    {
        if (item > 5) tempLst.Add(item);
    }
    foreach (var item in tempLst)
    {
        lst.Remove(item);
    }
}
```
这种方式虽然简单，但有两个缺点
> 1. 会额外增加GC，因为new了一个新的集合
> 2. 会增加额外的遍历次数（第二次集合的遍历）

还见过另外一种思路，foreach中remove之后递归
```CSHARP
static void RemoveLst()
{
    var lst = new List<int>() { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
    foreach (var item in lst)
    {
        if (item > 5) 
        {
            lst.Remove(item);
            RemoveLst();
        }
    }
}
```
这种方式可以解决在foreach中动态修改iem的问题，但是缺点也很明显
> 1. 递归，空间和时间消耗没啥好说的
> 2. 增加额外的遍历次数，每次删除一个item都要从头开始遍历一次集合

### 优化,不产生新的GC也不会额外遍历

其实可以在for中做动态删除，不过直接删除的话后面的item会自动往前补，比如删掉下标为6的元素"6"，删完之后下标为6的元素就是"7"了，这时候进入下一次循环，下标为7的元素就是"8",那么"7"实际上是被跳过了。

其实可以在for里嵌套一层while,避免被跳过的情况，如果条件满足就一直删除，一直到一个条件不满足的item，进入下一次for循环。

在while中删除，item会自动往前补，下一次循环的时候就是当前不满足条件的后面一个元素，实际上只是把集合中所有的元素只遍历了一遍而已。

```CSHARP
static void Main(string[] args)
{
    var lst = new List<int>() { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
    for (int i = 0; i < lst.Count; i++)
    {
        while (i < lst.Count && lst[i] > 5)
        {
            lst.RemoveAt(i);
        }
    }
}
```