---
title: 矩阵
date: 2022-06-15 13:59:40
categories:
- [Shader]
tags:
- Shader入门精要
cover:
katex: true
---
# 矩阵
$$\left[\begin{matrix}
1&1&1\\
2&2&2\\
3&3&3\\
4&4&4\\
\end{matrix}\right]$$

## 方阵
$$\left[\begin{matrix}
1&1&1\\
2&2&2\\
3&3&3\\
\end{matrix}\right]$$
> n x n  阶矩阵

## 对角矩阵
$$\left[\begin{matrix}
1&0&0\\
0&2&0\\
0&0&3\\
\end{matrix}\right]$$
> 对角线以外为0的方阵

## 单位矩阵
$$\left[\begin{matrix}
1&0&0\\
0&2&0\\
0&0&3\\
\end{matrix}\right]$$
> 对角矩阵中对角线全为1的对角矩阵

# 矩阵与向量
$$\left[\begin{matrix}
4\\
5\\
6\\
\end{matrix}\right]$$

$$\left[\begin{matrix}
4&5&6\\
\end{matrix}\right]$$

上面两个矩阵分别可以称为``列向量``或者``行向量``,因为他们与$\vec{(4,5,6)}$是一样的
> 向量与矩阵运算时必须确定是行向量还是列向量

# 矩阵的转置
$m^T$是m的转置矩阵，即$M^T_{ij}$ = $M_{ji}$ 
> 也就是矩阵行变列，列变行

例如:
$$\left[\begin{matrix}
1&2&3\\
4&5&6\\
7&8&9\\
\end{matrix}\right]^T = 
\left[\begin{matrix}
1&4&7\\
2&5&8\\
3&6&9\\
\end{matrix}\right]$$

或者：
$$\left[\begin{matrix}
1&2&3\\
4&5&6\\
7&8&9\\
10&11&12\\
\end{matrix}\right]^T = 
\left[\begin{matrix}
1&4&7&10\\
2&5&8&11\\
3&6&9&12\\
\end{matrix}\right]$$

## 转置矩阵性质
1. 矩阵转置的转置等于原矩阵
$$(M^T)^T = M$$
> 对角矩阵的转置 = 原矩阵，单位矩阵同理
$$\left[\begin{matrix}
1&0&0\\
0&2&0\\
0&0&3\\
\end{matrix}\right]^T = 
\left[\begin{matrix}
1&0&0\\
0&2&0\\
0&0&3\\
\end{matrix}\right]
$$
2. 矩阵串接的转置，等于反向串接各个矩阵的转置
$$(AB)^T=B^TA^T$$

# 标量与矩阵相乘
$$kM = k\left[\begin{matrix}
m_{11}&m_{12}&m_{13}\\
m_{21}&m_{22}&m_{23}\\
m_{31}&m_{32}&m_{33}\\
\end{matrix}\right] = 
\left[\begin{matrix}
km_{11}&km_{12}&km_{13}\\
km_{21}&km_{22}&km_{23}\\
km_{31}&km_{32}&km_{33}\\
\end{matrix}\right]$$

# 矩阵乘法
$$A_{(r \times n)}B_{(n \times c)}=C_{(r \times c)} $$
>矩阵相乘必须满足第一个矩阵的列数=第二个矩阵的行数

计算方式:
$$C_{ij}=\sum_{k=1}^na_{ik}b_{ji}$$
例如：
$$\left[\begin{matrix}
a_{11}&a_{12}\\
a_{21}&a_{22}\\
a_{31}&a_{32}\\
a_{41}&a_{42}\\
\end{matrix}\right]  
\left[\begin{matrix}
b_{11}&b_{12}&b_{13}\\
b_{21}&b_{22}&b_{23}&\\
\end{matrix}\right] = 
\left[\begin{matrix}
a_{11}b_{11}+a_{12}b_{21} & a_{11}b_{12}+a_{12}b_{22} & a_{11}b_{13}+a_{12}b_{23} \\
a_{21}b_{11}+a_{22}b_{21} & a_{21}b_{12}+a_{22}b_{22} & a_{21}b_{13}+a_{22}b_{23} \\
a_{31}b_{11}+a_{32}b_{21} & a_{31}b_{12}+a_{32}b_{22} & a_{31}b_{13}+a_{32}b_{23} \\
a_{41}b_{11}+a_{42}b_{21} & a_{41}b_{12}+a_{42}b_{22} & a_{41}b_{13}+a_{42}b_{23} \\
\end{matrix}\right]$$
> 矩阵与单位矩阵相乘等于原矩阵
$$\left[\begin{matrix}
a_{11}&a_{12}&a_{13}\\
a_{21}&a_{22}&a_{23}\\
a_{31}&a_{32}&a_{33}\\
\end{matrix}\right]  
\left[\begin{matrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1 \\
\end{matrix}\right] = 
\left[\begin{matrix}
a_{11}&a_{12}&a_{13}\\
a_{21}&a_{22}&a_{23}\\
a_{31}&a_{32}&a_{33}\\
\end{matrix}\right]$$
## 矩阵乘法性质
1. 矩阵乘法并不满足交换律。
$$AB \ne BA$$
例如:
$$\left[\begin{matrix}
-3&0\\
5&\frac 12\\
\end{matrix}\right]  
\left[\begin{matrix}
-7&2\\
4&6\\
\end{matrix}\right] = 
\left[\begin{matrix}
21 + 0 & -6 + 0 \\
-35 + 2 & 10 + 3 \\
\end{matrix}\right] = 
\left[\begin{matrix}
21  & -6 \\
-33 & 13 \\
\end{matrix}\right]$$


$$\left[\begin{matrix}
-7&2\\
4&6\\
\end{matrix}\right]
\left[\begin{matrix}
-3&0\\
5&\frac 12\\
\end{matrix}\right] = 
\left[\begin{matrix}
21 + 10 & 0 + 1 \\
-12 + 30 & 0 + 3 \\
\end{matrix}\right] = 
\left[\begin{matrix}
31  & 1 \\
18 & 3 \\
\end{matrix}\right]$$
2. 矩阵乘法满足结合律。
$$A(BC) = (AB)C$$
$$(kA)B = k(AB) = A(kB)$$
$$(AB)^T=B^TA^T$$
例如：
$$设A =
\left[\begin{matrix}
3  & 2 \\
1 & 6 \\
\end{matrix}\right]
,设B =
\left[\begin{matrix}
4  & 1 \\
3 & 5 \\
\end{matrix}\right]$$
$$AB=
\left[\begin{matrix}
12 + 6  & 3 + 10 \\
4 + 18 & 1 + 30 \\
\end{matrix}\right] =
\left[\begin{matrix}
18  & 13 \\
22 & 31 \\
\end{matrix}\right]
,则(AB)^T =
\left[\begin{matrix}
18  & 22 \\
31 & 31 \\
\end{matrix}\right]
$$
$$
B^TA^T=
\left[\begin{matrix}
12 + 6  & 4 + 18 \\
3 + 10 & 1 + 30 \\
\end{matrix}\right] = 
\left[\begin{matrix}
18  & 22 \\
13 & 31 \\
\end{matrix}\right] = 
(AB)^T
$$