const e=JSON.parse('{"key":"v-0e0fa793","path":"/posts/Unity/BDFramework/BDFramework%E9%80%82%E9%85%8DWindows/","title":"BDFramework适配Windows","lang":"zh-CN","frontmatter":{"title":"BDFramework适配Windows","date":"2022-08-16T22:17:20.000Z","categorie":["Unity"],"tag":["BDFramework"],"cover":null,"description":"将BDFramework本地化 不要通过unpm安装框架，在框架发布页下载包文件，放在项目的Packages目录中。 适配Windows 修改支持Windows打包 修改Packages/BDFramework/Editor/EditorPiepeline/PublishPipeline/EditroWindow_PublishAssets.cs的OnGUI_OneKeyExprot()方法，添加Windows打包支持，内容如下","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Unity/BDFramework/BDFramework%E9%80%82%E9%85%8DWindows/"}],["meta",{"property":"og:site_name","content":"周末的博客"}],["meta",{"property":"og:title","content":"BDFramework适配Windows"}],["meta",{"property":"og:description","content":"将BDFramework本地化 不要通过unpm安装框架，在框架发布页下载包文件，放在项目的Packages目录中。 适配Windows 修改支持Windows打包 修改Packages/BDFramework/Editor/EditorPiepeline/PublishPipeline/EditroWindow_PublishAssets.cs的OnGUI_OneKeyExprot()方法，添加Windows打包支持，内容如下"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-30T07:00:52.000Z"}],["meta",{"property":"article:author","content":"Mr.Hope"}],["meta",{"property":"article:tag","content":"BDFramework"}],["meta",{"property":"article:published_time","content":"2022-08-16T22:17:20.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-30T07:00:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"BDFramework适配Windows\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-08-16T22:17:20.000Z\\",\\"dateModified\\":\\"2023-05-30T07:00:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Hope\\",\\"url\\":\\"https://mrhope.site\\"}]}"]]},"headers":[{"level":2,"title":"修改支持Windows打包","slug":"修改支持windows打包","link":"#修改支持windows打包","children":[]},{"level":2,"title":"去掉Sqlite","slug":"去掉sqlite","link":"#去掉sqlite","children":[]}],"git":{"createdTime":1685430052000,"updatedTime":1685430052000,"contributors":[{"name":"Weekend","email":"872285171@qq.com","commits":1}]},"readingTime":{"minutes":1.93,"words":578},"filePathRelative":"posts/Unity/BDFramework/BDFramework适配Windows/index.md","localizedDate":"2022年8月16日","excerpt":"<h1> 将BDFramework本地化</h1>\\n<p>不要通过unpm安装框架，在框架<a href=\\"https://github.com/yimengfan/BDFramework.Core/releases\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">发布页</a>下载包文件，放在项目的<code>Packages</code>目录中。</p>\\n<h1> 适配Windows</h1>\\n<h2> 修改支持Windows打包</h2>\\n<ol>\\n<li>修改<code>Packages/BDFramework/Editor/EditorPiepeline/PublishPipeline/EditroWindow_PublishAssets.cs</code>的<code>OnGUI_OneKeyExprot()</code>方法，添加Windows打包支持，内容如下</li>\\n</ol>","autoDesc":true}');export{e as data};
