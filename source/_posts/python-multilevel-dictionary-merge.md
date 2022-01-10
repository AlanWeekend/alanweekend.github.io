---
title: Python 多级字典合并
date: 2022-01-10 10:35:07
categories:
- [Python]
tags:
- Python
---
```Python
def dicMeg(dic1,dic2):
    """嵌套字典合并，参数1旧字典，参数2新字典，结果是将新字典合并到旧字典中"""
    for i in dic2:
        print(i)
        if i in dic1:
            if type(dic1[i]) is dict and type(dic2[i]) is dict:

                dicMeg(dic1[i],dic2[i])
        else:
            dic1[i] = dic2[i]
```