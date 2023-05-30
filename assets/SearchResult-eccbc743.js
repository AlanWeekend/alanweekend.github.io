import{n as S,u as G,f as J,p as K,q as I,t as N,v as T,w as U,g as D,h as b,x as X,y as M,l as s,R as F,z as Y,H as Z,A as _,B as ee,C as te,D as se,E as ae,s as le,F as re,G as ue,I as oe,J as ne,K as ce,L as ie}from"./app-6bef6d75.js";const ve=()=>{const e=new Worker(`/${S.worker}`,{}),n=[];return e.addEventListener("message",({data:r})=>{const{resolve:p}=n.shift();p(r)}),{search:(r,p,m)=>new Promise((o,d)=>{e.postMessage({query:r,locale:p,options:m}),n.push({resolve:o,reject:d})}),terminate:()=>{e.terminate(),n.forEach(({reject:r})=>r(new Error("Worker has been terminated.")))}}};var y=(e=>(e.title="t",e.heading="h",e.text="p",e.custom="c",e))(y||{}),l=(e=>(e.type="t",e.key="k",e.anchor="a",e.header="h",e.index="i",e.display="d",e))(l||{});const he="search-pro-result-history",h=G(he,[]),pe=()=>{const{resultHistoryCount:e}=S,n=e>0;return{enabled:n,resultHistory:h,addResultHistory:r=>{n&&(h.value.length<e?h.value=[r,...h.value]:h.value=[r,...h.value.slice(0,e-1)])},removeResultHistory:r=>{h.value=[...h.value.slice(0,r),...h.value.slice(r+1)]}}},de=e=>{const n=ae(),r=I(),{search:p,terminate:m}=ve(),o=D(!1),d=le([]),k=()=>{d.value=[],o.value=!1},w=ce(g=>{o.value=!0,g?p(g,r.value,n).then(f=>{d.value=f,o.value=!1}).catch(f=>{console.error(f),k()}):k()},S.delay);return M([e,r],()=>w(e.value),{immediate:!0}),{searching:o,results:d,terminate:m}};var me=J({name:"SearchResult",props:{query:{type:String,required:!0}},emits:["close","updateQuery"],setup(e,{emit:n}){const r=re(),p=K(),m=I(),o=N(T),{addQueryHistory:d}=ue(),{enabled:k,resultHistory:w,addResultHistory:g,removeResultHistory:f}=pe(),$=U(e,"query"),{results:R,searching:Q}=de($),i=D(0),u=D(0),E=b(()=>w.value.length>0),q=b(()=>R.value.length>0),x=b(()=>R.value[i.value]||null),C=t=>p.resolve({name:t[l.key],...l.anchor in t?{hash:`#${t[l.anchor]}`}:{}}).fullPath,O=()=>{i.value=i.value>0?i.value-1:R.value.length-1,u.value=x.value.contents.length-1},V=()=>{i.value=i.value<R.value.length-1?i.value+1:0,u.value=0},W=()=>{u.value<x.value.contents.length-1?u.value=u.value+1:V()},z=()=>{u.value>0?u.value=u.value-1:O()},P=t=>t.map(a=>ie(a)?a:s(a[0],a[1])),j=t=>{if(t[l.type]===y.custom){const a=oe[t[l.index]]||"$content",[v,H=""]=ne(a)?a[m.value].split("$content"):a.split("$content");return t[l.display].map(c=>P([v,...c,H])).flat()}return t[l.display].map(a=>P(a)).flat()},L=()=>{i.value=0,u.value=0,n("updateQuery",""),n("close")};return X("keydown",t=>{if(q.value){if(t.key==="ArrowUp")z();else if(t.key==="ArrowDown")W();else if(t.key==="Enter"){const a=x.value.contents[u.value],v=C(a);r.value.path!==v&&(d(e.query),g(a),p.push(v),L())}}}),M([i,u],()=>{var t;(t=document.querySelector(".search-pro-result-list-item.active .search-pro-result-item.active"))==null||t.scrollIntoView(!1)},{flush:"post"}),()=>s("div",{class:["search-pro-result",{empty:$.value?!q.value:!E.value}],id:"search-pro-results"},$.value===""?E.value?s("ul",{class:"search-pro-result-list"},s("li",{class:"search-pro-result-list-item"},[s("div",{class:"search-pro-result-title"},o.value.history),w.value.map((t,a)=>s(F,{to:C(t),class:["search-pro-result-item",{active:u.value===a}],onClick:()=>{L()}},()=>[s(Y,{class:"search-pro-result-type"}),s("div",{class:"search-pro-result-content"},[t[l.type]===y.text&&t[l.header]?s("div",{class:"content-header"},t[l.header]):null,s("div",j(t))]),s("button",{class:"search-pro-close-icon",innerHTML:Z,onClick:v=>{v.preventDefault(),v.stopPropagation(),f(a)}})]))])):k?o.value.emptyHistory:o.value.emptyResult:Q.value?s(_,{hint:o.value.searching}):q.value?s("ul",{class:"search-pro-result-list"},R.value.map(({title:t,contents:a},v)=>{const H=i.value===v;return s("li",{class:["search-pro-result-list-item",{active:H}]},[s("div",{class:"search-pro-result-title"},t||"Documentation"),a.map((c,B)=>{const A=H&&u.value===B;return s(F,{to:C(c),class:["search-pro-result-item",{active:A,"aria-selected":A}],onClick:()=>{d(e.query),g(c),L()}},()=>[c[l.type]===y.text?null:s(c[l.type]===y.title?ee:c[l.type]===y.heading?te:se,{class:"search-pro-result-type"}),s("div",{class:"search-pro-result-content"},[c[l.type]===y.text&&c[l.header]?s("div",{class:"content-header"},c[l.header]):null,s("div",j(c))])])})])})):o.value.emptyResult)}});export{me as default};
