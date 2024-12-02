import{d as L,r as f,x as q,o as E,e as M,f as n,w as i,v as g,K as C,l as m,h as d,J as b,G as V,L as N,F as $}from"../index.BjFuJ2qg.js";import{H as B,g as l,P as H,e as K}from"./Pagination.BqCIewOk.js";import{a as v}from"./apiConfig.FeihSf0O.js";import{S as A,a as F}from"./SelectGroupDate.BS27YPnL.js";import"./dateUtil.DGU2Bw4m.js";class G{async getDictionaryList(o){return(await v("/cr/getDictionaryList",o||{})).data}async setDictionaryList(o){return(await v("/cr/setDictionaryList",o||{})).data}}const P=new G,I={colspan:"3"},R={class:"audit"},T={colspan:"3"},J={colspan:"3"},O={class:"btnWrap"},W={class:"crud"},j={class:"totalCount"},z={class:"no-list"},_=L({__name:"Dictionary",setup(w){const o=f({abb:"",updater:"",creator:"",startUpdateDt:null,endUpdateDt:null,createDt:null}),e=f({required:["abb","korean","english"],grid:{},list:[],audit:!1,totalCount:0,currentPage:1,lastPage:1}),y={unique:["abb"],required:["abb","korean","english"]};let c=null;const D=a=>{a==null||a.preventDefault(),r()},r=()=>{event==null||event.preventDefault(),e.totalCount=0,P.getDictionaryList({...o,page:e.currentPage}).then(a=>{var t,s,u,p;e.list=(t=a.data)==null?void 0:t.list,e.totalCount=(s=a.data)==null?void 0:s.totalCount,e.currentPage=(u=a.data)==null?void 0:u.currentPage,e.lastPage=(p=a.data)==null?void 0:p.lastPage,e.grid&&e.grid.updateSettings({data:e.list})},a=>{console.log(a)})},x=a=>{e.currentPage=a,r()},S=()=>{const a={...l.commonAddColumns,abb:"",korean:"",english:"",memo:"",...l.auditAddColumns};e.list=l.add({newRow:a,list:e.list,grid:e.grid})},k=()=>{l.del({selectedRow:c,grid:e.grid})},U=()=>{const a=l.valid({list:e.list,required:y.required});a&&P.setDictionaryList(a).then(()=>{r()})};return q(()=>{const a=document.querySelector("#grid");e.grid=new B(a,{data:e.list,colHeaders:[...l.commonColumnNames,"약어","한국어","영어","설명",...l.auditColumnNames],hiddenColumns:l.hiddenColumns([]),columns:[...l.commonColumns,{data:"abb",type:"text",readOnly:!0},{data:"korean",type:"text",width:150},{data:"english",type:"text",width:150},{data:"memo",type:"text",width:200},...l.auditColumns],cells:function(t,s){return l.cellsEvent({row:t,col:s,grid:e.grid,self:this,pk:[1]})},afterChange(t,s){l.afterChangeEvent({changes:t,source:s,gridProps:y,grid:e.grid,self:this})},afterSelectionEnd:function(t,s,u,p){c=t},...l.defaultProps}),r()}),(a,t)=>(E(),M($,null,[n("form",{class:"search",onSubmit:D,onKeyup:N(D,["enter"])},[n("fieldset",null,[t[16]||(t[16]=n("legend",null,"검색",-1)),n("table",null,[t[15]||(t[15]=n("colgroup",null,[n("col",{style:{width:"80px"}}),n("col",{style:{width:"30%"}}),n("col",{style:{width:"80px"}}),n("col")],-1)),n("tbody",null,[n("tr",null,[t[10]||(t[10]=n("th",null,"약어",-1)),n("td",I,[i(n("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=s=>o.abb=s)},null,512),[[g,o.abb]])])])]),i(n("tbody",R,[n("tr",null,[t[11]||(t[11]=n("th",null,"수정기간",-1)),n("td",T,[m(A,{format:"yyyy-MM-dd",date:[o.startUpdateDt,o.endUpdateDt],onSetStartDate:t[1]||(t[1]=s=>{o.startUpdateDt=s.date}),onSetEndDate:t[2]||(t[2]=s=>{o.endUpdateDt=s.date})},null,8,["date"])])]),n("tr",null,[t[12]||(t[12]=n("th",null,"등록일",-1)),n("td",J,[m(F,{format:"yyyy-MM-dd",date:[o.createDt],onSetStartDate:t[3]||(t[3]=s=>{o.createDt=s.date})},null,8,["date"])])]),n("tr",null,[t[13]||(t[13]=n("th",null,"수정ID",-1)),n("td",null,[i(n("input",{type:"text","onUpdate:modelValue":t[4]||(t[4]=s=>o.updater=s)},null,512),[[g,o.updater]])]),t[14]||(t[14]=n("th",null,"등록ID",-1)),n("td",null,[i(n("input",{type:"text","onUpdate:modelValue":t[5]||(t[5]=s=>o.creator=s)},null,512),[[g,o.creator]])])])],512),[[C,e.audit]])])]),n("div",O,[n("span",W,[n("button",{type:"button",class:"button add",onClick:S},t[17]||(t[17]=[n("span",{class:"icon"},"",-1),d("추가")])),n("button",{type:"button",class:"button del",onClick:k},t[18]||(t[18]=[n("span",{class:"icon"},"",-1),d("삭제")])),n("button",{type:"button",class:"button save",onClick:U},t[19]||(t[19]=[n("span",{class:"icon"},"",-1),d("저장")])),n("button",{type:"button",class:"button reset",onClick:t[6]||(t[6]=s=>b(l).reload())},t[20]||(t[20]=[n("span",{class:"icon"},'"',-1),d("초기화")]))]),n("button",{type:"button",class:"audit",onClick:t[7]||(t[7]=s=>e.audit=!e.audit)},"상세조회"),t[23]||(t[23]=n("button",{type:"submit",class:"button3"},[n("span",{class:"icon"},"")],-1)),n("button",{type:"reset",onClick:t[8]||(t[8]=s=>b(l).reload())},t[21]||(t[21]=[n("span",{class:"icon"},'"',-1)])),n("button",{type:"button",class:"button excel",onClick:t[9]||(t[9]=s=>b(K).excelExport(e.grid,"코드"))},t[22]||(t[22]=[n("span",{class:"icon"},"",-1)])),n("div",j,"총 "+V(e.totalCount)+"건",1)])],32),t[24]||(t[24]=n("div",{id:"grid",class:"grid-container"},null,-1)),i(n("div",z,"조회 내역이 없습니다.",512),[[C,e.list.length===0]]),m(H,{currentPage:e.currentPage,lastPage:e.lastPage,"onUpdate:page":x},null,8,["currentPage","lastPage"])],64))}});export{_ as default};