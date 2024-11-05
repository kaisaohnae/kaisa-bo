import{d as k,c as q,r as w,x as I,o as T,e as V,f as e,w as u,v as y,K as P,l as g,h as m,J as c,G as E,L as M,F as $}from"../index.D1VbM3C_.js";import{H as A,g as l,P as B,e as H}from"./Pagination.CwC5FYHD.js";import{a as x}from"./apiConfig.BM_b3DjX.js";import{S as K,a as F}from"./SelectGroupDate.CRAe91qa.js";import"./dateUtil.-4ZUTLvU.js";class G{async getCompanyList(i){return(await x("/at/getCompanyList",i||{})).data}async setCompanyList(i){return(await x("/at/setCompanyList",i||{})).data}}const D=new G,R={colspan:"3"},J={class:"audit"},O={colspan:"3"},W={colspan:"3"},j={class:"btnWrap"},z={class:"crud"},Q={class:"totalCount"},X={class:"no-list"},et=k({__name:"Company",setup(v){const i=q(),s=w({companyName:"",updater:"",creator:"",startUpdateDt:"",endUpdateDt:"",createDt:""}),n=w({required:["companyId","companyTypeCode","companyName","phoneNo"],grid:{},list:[],audit:!1,totalCount:0,currentPage:1,totalPage:50,lastPage:1}),C={unique:["companyId"],required:["companyId","companyTypeCode","companyName","phoneNo"]};let b=null;const f=a=>{a==null||a.preventDefault(),p()},p=()=>{D.getCompanyList({...s,page:n.currentPage,totalPage:n.totalPage}).then(a=>{var t,o,d,r;n.list=(t=a.data)==null?void 0:t.list,n.totalCount=(o=a.data)==null?void 0:o.totalCount,n.currentPage=(d=a.data)==null?void 0:d.currentPage,n.lastPage=(r=a.data)==null?void 0:r.lastPage,n.grid&&n.grid.updateSettings({data:n.list})},a=>{console.log(a)})},S=a=>{n.currentPage=a,p()},N=()=>{const a={...l.commonAddColumns,companyId:"",companyTypeCode:"",companyName:"",lttd:"",lotd:"",addr1:"",addr2:"",phoneNo:"",...l.auditAddColumns};n.list=l.add({newRow:a,list:n.list,grid:n.grid})},U=()=>{l.del({selectedRow:b,grid:n.grid})},L=()=>{const a=l.valid({list:n.list,required:C.required});a&&D.setCompanyList(a).then(()=>{p()})};return I(()=>{const a=document.querySelector("#grid");n.grid=new A(a,{data:n.list,colHeaders:[...l.commonColumnNames,"업체아이디","업체유형코드","업체명","위도","경도","주소1","주소2","전화번호",...l.auditColumnNames],hiddenColumns:l.hiddenColumns([]),columns:[...l.commonColumns,{data:"companyId",type:"text",width:100,readOnly:!0},{data:"companyTypeCode",type:"dropdown",width:150,source:function(t,o){var d;o((d=i.codeList.companyTypeCode)==null?void 0:d.map(r=>r.codeValue))}},{data:"companyName",type:"text",width:150},{data:"lttd",type:"text",width:150},{data:"lotd",type:"text",width:150},{data:"addr1",type:"text",width:150},{data:"addr2",type:"text",width:150},{data:"phoneNo",type:"text",width:150},...l.auditColumns],cells:function(t,o){return l.cellsEvent({row:t,col:o,grid:n.grid,self:this,pk:[]})},afterChange(t,o){l.afterChangeEvent({changes:t,source:o,gridProps:C,grid:n.grid,self:this})},afterSelectionEnd:function(t,o,d,r){b=t},...l.defaultProps}),p()}),(a,t)=>(T(),V($,null,[e("form",{class:"search",onSubmit:f,onKeyup:M(f,["enter"])},[e("fieldset",null,[t[16]||(t[16]=e("legend",null,"검색",-1)),e("table",null,[t[15]||(t[15]=e("colgroup",null,[e("col",{style:{width:"80px"}}),e("col",{style:{width:"30%"}}),e("col",{style:{width:"80px"}}),e("col")],-1)),e("tbody",null,[e("tr",null,[t[10]||(t[10]=e("th",null,"업체명",-1)),e("td",R,[u(e("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=o=>s.companyName=o)},null,512),[[y,s.companyName]])])])]),u(e("tbody",J,[e("tr",null,[t[11]||(t[11]=e("th",null,"수정기간",-1)),e("td",O,[g(K,{format:"yyyy-MM-dd",date:[s.startUpdateDt,s.endUpdateDt],onSetStartDate:t[1]||(t[1]=o=>{s.startUpdateDt=o.date}),onSetEndDate:t[2]||(t[2]=o=>{s.endUpdateDt=o.date})},null,8,["date"])])]),e("tr",null,[t[12]||(t[12]=e("th",null,"등록일",-1)),e("td",W,[g(F,{format:"yyyy-MM-dd",date:[s.createDt],onSetStartDate:t[3]||(t[3]=o=>{s.createDt=o.date})},null,8,["date"])])]),e("tr",null,[t[13]||(t[13]=e("th",null,"수정ID",-1)),e("td",null,[u(e("input",{type:"text","onUpdate:modelValue":t[4]||(t[4]=o=>s.updater=o)},null,512),[[y,s.updater]])]),t[14]||(t[14]=e("th",null,"등록ID",-1)),e("td",null,[u(e("input",{type:"text","onUpdate:modelValue":t[5]||(t[5]=o=>s.creator=o)},null,512),[[y,s.creator]])])])],512),[[P,n.audit]])])]),e("div",j,[e("span",z,[e("button",{type:"button",class:"button add",onClick:N},t[17]||(t[17]=[e("span",{class:"icon"},"",-1),m("추가")])),e("button",{type:"button",class:"button del",onClick:U},t[18]||(t[18]=[e("span",{class:"icon"},"",-1),m("삭제")])),e("button",{type:"button",class:"button save",onClick:L},t[19]||(t[19]=[e("span",{class:"icon"},"",-1),m("저장")])),e("button",{type:"button",class:"button reset",onClick:t[6]||(t[6]=o=>c(l).reload())},t[20]||(t[20]=[e("span",{class:"icon"},'"',-1),m("초기화")]))]),e("button",{type:"button",class:"audit",onClick:t[7]||(t[7]=o=>n.audit=!n.audit)},"상세조회"),t[23]||(t[23]=e("button",{type:"submit",class:"button3"},[e("span",{class:"icon"},"")],-1)),e("button",{type:"reset",onClick:t[8]||(t[8]=o=>c(l).reload())},t[21]||(t[21]=[e("span",{class:"icon"},'"',-1)])),e("button",{type:"button",class:"button excel",onClick:t[9]||(t[9]=o=>c(H).excelExport(n.grid,"업체"))},t[22]||(t[22]=[e("span",{class:"icon"},"",-1)])),e("div",Q,"총 "+E(n.totalCount)+"건",1)])],32),t[24]||(t[24]=e("div",{id:"grid",class:"grid-container"},null,-1)),u(e("div",X,"조회 내역이 없습니다.",512),[[P,n.list.length===0]]),g(B,{currentPage:n.currentPage,lastPage:n.lastPage,"onUpdate:page":S},null,8,["currentPage","lastPage"])],64))}});export{et as default};
