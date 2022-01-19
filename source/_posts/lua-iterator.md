---
title: lua迭代器总结
date: 2022-01-19 15:45:12
categories:
- [lua]
tags:
- 迭代器
cover: 1.png
---

### lua内置迭代器
lua包含两个内置迭代器：``paris``和``iparis``。
区别如下：
1. paris 可以迭代表中的key,value
2. iparis 按照索引从1开始，递增遍历，如果遇到nil就会停止；可以理解为iparis只能遍历数组或者表中的数组。

```Lua
array = {"1",2,3,a="aa",nil,4}

print('paris')
for k, v in pairs(array) do
    print(v)
end

print('iparis')
for k, v in ipairs(array) do
    print(v)
end

```
![运行结果](1.png)

### 自定义迭代器
迭代语法
```Lua
for 变量列表 in 迭代函数,状态变量,控制变量 do
    --循环体
end
```
执行过程如下:
1. 调用迭代函数，（把状态变量和控制变量当作参数传递给迭代函数）状态变量只会在第一次调用的时候赋值
2. 如果迭代函数的返回值是nil，退出for循环
        如果不是nil的话，把返回值赋值给变量列表，并执行循环体

```Lua
function square(state,control)
	if control>=state then
		return nil
	else
		control=control+1;
		return control,control*control;
	end
end

for i,j in square,9,0 do
	print(i,j)
end
```