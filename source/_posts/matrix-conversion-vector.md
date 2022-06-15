---
title: 矩阵转换向量
katex: true
date: 2022-06-15 17:07:25
categories:
- [Shader]
tags:
- Shader入门精要
cover: 1.jpg
---
$$
\vec V = 
\left[\begin{matrix}
x \\
y \\ 
z \\
\end{matrix}\right] =
\left[\begin{matrix}
x \\
0 \\ 
0 \\
\end{matrix}\right] +
\left[\begin{matrix}
0 \\
y \\ 
0 \\
\end{matrix}\right] +
\left[\begin{matrix}
0 \\
0 \\ 
z \\
\end{matrix}\right]
$$

矩阵可以看作是在基向量上通过变换得到的例如
![](1.jpg)