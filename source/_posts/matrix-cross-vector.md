---
title: 向量与矩阵相乘
katex: true
date: 2022-06-15 16:39:27
categories:
- [Shader]
tags:
- Shader入门精要
cover:
---
# 行向量与矩阵相乘
$$\vec V ABC$$
$$
\left[\begin{matrix}
x & y & z \\
\end{matrix}\right]
\left[\begin{matrix}
m_{11} & m_{12} & m_{13} \\
m_{21} & m_{22} & m_{23} \\
m_{31} & m_{32} & m_{33} \\
\end{matrix}\right] =
\left[\begin{matrix}
xm_{11}+ym_{21}+zm_{31} & 
xm_{12}+ym_{22}+zm_{32} & 
xm_{13}+ym_{23}+zm_{33} \\
\end{matrix}\right] 
$$

# 列向量与矩阵相乘
$$CBA\vec V $$
$$
\left[\begin{matrix}
m_{11} & m_{12} & m_{13} \\
m_{21} & m_{22} & m_{23} \\
m_{31} & m_{32} & m_{33} \\
\end{matrix}\right]
\left[\begin{matrix}
x \\
y \\
z \\
\end{matrix}\right] =
\left[\begin{matrix}
xm_{11}+ym_{12}+zm_{13} & 
xm_{21}+ym_{22}+zm_{23} & 
xm_{31}+ym_{23}+zm_{33} \\
\end{matrix}\right] 
$$

# 性质
行向量``只能``左乘矩阵
列向量``只能``右乘矩阵
行向量乘矩阵``不等于``列向量乘矩阵

# 平台区别
Directx使用的是行向量，OpenGL使用的是列向量