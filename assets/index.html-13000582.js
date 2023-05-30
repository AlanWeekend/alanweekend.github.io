import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as t}from"./app-8d2c7d6f.js";const p="/assets/1-8cdaadd8.png",e={},o=t('<h2 id="dda画线算法" tabindex="-1"><a class="header-anchor" href="#dda画线算法" aria-hidden="true">#</a> DDA画线算法</h2><p>DDA画线算法也叫数值微分算法。其算法原理如下：</p><h3 id="算法原理" tabindex="-1"><a class="header-anchor" href="#算法原理" aria-hidden="true">#</a> 算法原理</h3><p>DDA算法的基础就是初中数学中的斜截式方程y=kx+b。 斜率k=Δy/Δx,Δy=y2-y1,Δx=x2-x1。所以k=(y2-y1)/(x2-x1)。这也是斜截式方程的特点。知道坐标系内的任意两点就能求其一元二次方程。 因此，给出一个起点和终点就能画出一条线。</p><h2 id="算法优化" tabindex="-1"><a class="header-anchor" href="#算法优化" aria-hidden="true">#</a> 算法优化</h2><p>一元二次方程y=kx+b，可以看出其中用了一个乘法。对于画线算法来说，如果用此方程直接画线，那么每画一个像素点都要计算一个乘法。而在加减乘除中乘法运算的效率是比较慢的，所以直接使用斜截式方程画线的效率太低。要把其中的乘法运算转换成加法运算，因为加法运算是最快的。</p><h3 id="增量思想" tabindex="-1"><a class="header-anchor" href="#增量思想" aria-hidden="true">#</a> 增量思想</h3><p>假设x为步长方向，每次加一: <strong>y</strong> (i)= <strong>kx</strong> (i) <strong>+b</strong>，那么 <strong>y</strong> (i+1)<strong>=kx</strong> (i+1) <strong>+b</strong>。 已知x每次加一,所以,<strong>x</strong> (i+1) <strong>=x</strong> i <strong>+1</strong> ,所以: <strong>y</strong> (i+1) <strong>=k(x</strong> (i) <strong>+1)</strong> <strong>+b</strong><strong>y</strong> (i+1) <strong>=kx</strong> (i) <strong>+k+b</strong>，（y(i)=kx(i)+b） <strong>y</strong> (i+1) <strong>=y</strong> (i) <strong>+b</strong> 这样就能求出x+1时对应的y值了。 这样做但斜率小于1时，画出的线段时连续的，当斜率大于1时，画出的线段则成离散的了。因为像素点只能是整数，所以需要四舍五入。假设k&gt;1时，当x+1时，y则加kx，肯定是一个1大的整数，因此画出的线段不连续。</p><figure><img src="'+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="斜率转换" tabindex="-1"><a class="header-anchor" href="#斜率转换" aria-hidden="true">#</a> 斜率转换</h3><p><strong>(x</strong> (i+1) <strong>-x</strong> (i) <strong>)=Δx</strong><strong>(y</strong> (i+1) <strong>-y</strong> (i) <strong>)=Δy</strong> k=Δy/Δx y(i)=kx(i),y(i+1)=kx(i+1)=kx(i)+k; 当|k|&gt;1时，以y为步长方向。令Δm=Δy,那么y的增量为Δy/Δm=1,x的增量为Δx/Δm。 当|k|&lt;1时，以x为步长方向。令Δm=Δx,那么x的增量为Δx/Δm=1,y的增量为Δy/Δm。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> OpenGL<span class="token punctuation">.</span>GL <span class="token keyword">import</span> <span class="token operator">*</span>
<span class="token keyword">from</span> OpenGL<span class="token punctuation">.</span>GLU <span class="token keyword">import</span> <span class="token operator">*</span>
<span class="token keyword">from</span> OpenGL<span class="token punctuation">.</span>GLUT <span class="token keyword">import</span> <span class="token operator">*</span>

<span class="token keyword">def</span> <span class="token function">drawFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 清除颜色缓冲</span>
    glClear<span class="token punctuation">(</span>GL_COLOR_BUFFER_BIT<span class="token punctuation">)</span>
    ddaLine<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">150</span><span class="token punctuation">)</span>

    <span class="token comment"># 强制刷新缓冲</span>
    glFlush<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">ddaLine</span><span class="token punctuation">(</span>x0<span class="token punctuation">,</span>y0<span class="token punctuation">,</span>x1<span class="token punctuation">,</span>y1<span class="token punctuation">)</span><span class="token punctuation">:</span>
    dm<span class="token operator">=</span><span class="token number">0</span>
    <span class="token keyword">if</span> <span class="token builtin">abs</span><span class="token punctuation">(</span>x1<span class="token operator">-</span>x0<span class="token punctuation">)</span><span class="token operator">&gt;</span><span class="token builtin">abs</span><span class="token punctuation">(</span>y1<span class="token operator">-</span>y0<span class="token punctuation">)</span><span class="token punctuation">:</span>
        dm<span class="token operator">=</span><span class="token builtin">abs</span><span class="token punctuation">(</span>x1<span class="token operator">-</span>x0<span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        dm<span class="token operator">=</span><span class="token builtin">abs</span><span class="token punctuation">(</span>y1<span class="token operator">-</span>y0<span class="token punctuation">)</span>
    
    dx<span class="token operator">=</span><span class="token punctuation">(</span>x1<span class="token operator">-</span>x0<span class="token punctuation">)</span><span class="token operator">/</span>dm
    dy<span class="token operator">=</span><span class="token punctuation">(</span>y1<span class="token operator">-</span>y0<span class="token punctuation">)</span><span class="token operator">/</span>dm
    
    x<span class="token operator">=</span>x0<span class="token operator">+</span><span class="token number">0.5</span>
    y<span class="token operator">=</span>y0<span class="token operator">+</span><span class="token number">0.5</span>

    glColor3f<span class="token punctuation">(</span><span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span>
    glPointSize<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span>dm<span class="token punctuation">)</span><span class="token punctuation">:</span>
        glBegin<span class="token punctuation">(</span>GL_POINTS<span class="token punctuation">)</span>
        glVertex2i<span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token builtin">int</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">)</span>
        glEnd<span class="token punctuation">(</span><span class="token punctuation">)</span>
        x<span class="token operator">+=</span>dx
        y<span class="token operator">+=</span>dy



<span class="token keyword">def</span> <span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    glClearColor<span class="token punctuation">(</span><span class="token number">0.0</span><span class="token punctuation">,</span><span class="token number">0.0</span><span class="token punctuation">,</span><span class="token number">0.0</span><span class="token punctuation">,</span><span class="token number">0.0</span><span class="token punctuation">)</span>
    glShadeModel<span class="token punctuation">(</span>GL_FLAT<span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">Reshape</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span>h<span class="token punctuation">)</span><span class="token punctuation">:</span>
    glMatrixMode<span class="token punctuation">(</span>GL_PROJECTION<span class="token punctuation">)</span>
    glLoadIdentity<span class="token punctuation">(</span><span class="token punctuation">)</span>
    gluOrtho2D<span class="token punctuation">(</span><span class="token number">0.0</span><span class="token punctuation">,</span>GLdouble<span class="token punctuation">(</span>w<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">0.0</span><span class="token punctuation">,</span>GLdouble<span class="token punctuation">(</span>h<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 初始化opengl</span>
glutInit<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 初始化显示模式 单缓冲 rgba颜色</span>
glutInitDisplayMode<span class="token punctuation">(</span>GLUT_SINGLE <span class="token operator">|</span> GLUT_RGB<span class="token punctuation">)</span>
<span class="token comment"># 设置窗口大小</span>
glutInitWindowSize<span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">,</span> <span class="token number">400</span><span class="token punctuation">)</span>
<span class="token comment"># 窗口标题</span>
glutCreateWindow<span class="token punctuation">(</span><span class="token string">&quot;First&quot;</span><span class="token punctuation">)</span>
Init<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 绘制窗口</span>
glutDisplayFunc<span class="token punctuation">(</span>drawFunc<span class="token punctuation">)</span>
glutReshapeFunc<span class="token punctuation">(</span>Reshape<span class="token punctuation">)</span>
<span class="token comment"># 主循环</span>
glutMainLoop<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),i=[o];function c(l,u){return s(),a("div",null,i)}const k=n(e,[["render",c],["__file","index.html.vue"]]);export{k as default};
