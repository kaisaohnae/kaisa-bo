import{d as C,c as y,r as h,x,o as n,e as s,f as d,w as r,M as u,h as i,G as c,F as S,D as V,J as b,_ as k}from"../index.D1VbM3C_.js";const B={class:"common-code-radio"},D=["value"],M=C({__name:"CommonCodeRadio",props:{cd:{type:String,required:!0},model:{type:String,required:!0},default:{type:String,default:"전체"}},emits:["set-data"],setup(m,{emit:p}){const v=y(),_=p,o=m,e=h({value:o.model}),l=()=>{_("set-data",e.value)};return x(()=>{}),(N,t)=>(n(),s("div",B,[d("label",null,[r(d("input",{type:"radio",value:"","onUpdate:modelValue":t[0]||(t[0]=a=>e.value=a),onChange:l},null,544),[[u,e.value]]),i(" "+c(o.default),1)]),(n(!0),s(S,null,V(b(v).codeList[o.cd],(a,f)=>(n(),s("label",{key:f},[r(d("input",{type:"radio",value:a.codeValue,"onUpdate:modelValue":t[1]||(t[1]=g=>e.value=g),onChange:l},null,40,D),[[u,e.value]]),i(" "+c(a.codeName),1)]))),128))]))}}),q=k(M,[["__scopeId","data-v-c690eb72"]]);export{q as C};