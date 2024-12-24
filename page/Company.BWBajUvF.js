import{d as k,c as q,r as P,x as I,o as T,e as V,f as e,w as u,v as g,K as x,l as c,h as m,J as C,G as E,L as M,F as $}from"../index.8mXqKDFy.js";import{H as A,g as d,P as B,e as H}from"./Pagination.HFP-leG0.js";import{a as y}from"./apiConfig.Cb5X9RbM.js";import{S as K,a as F}from"./SelectGroupDate.DlEKbCFO.js";import"./dateUtil.CtZ7_Ahw.js";class G{async getCompany(l){return(await y("/at/getCompany",l||{})).data}async getCompanyList(l){return(await y("/at/getCompanyList",l||{})).data}async setCompany(l){return(await y("/at/setCompany",l||{})).data}async setCompanyList(l){return(await y("/at/setCompanyList",l||{})).data}}const D=new G,R={colspan:"3"},J={class:"audit"},O={colspan:"3"},W={colspan:"3"},j={class:"btnWrap"},z={class:"crud"},Q={class:"totalCount"},X={class:"no-list"},et=k({__name:"Company",setup(v){const l=q(),s=P({companyName:"",updater:"",creator:"",startUpdateDt:"",endUpdateDt:"",createDt:""}),o=P({required:["companyId","companyTypeCode","companyName","phoneNo"],grid:{},list:[],audit:!1,totalCount:0,currentPage:1,totalPage:50,lastPage:1}),w={unique:["companyId"],required:["companyId","companyTypeCode","companyName","phoneNo"]};let b=null;const f=n=>{n==null||n.preventDefault(),p()},p=()=>{D.getCompanyList({...s,page:o.currentPage,totalPage:o.totalPage}).then(n=>{var t,a,r,i;o.list=(t=n.data)==null?void 0:t.list,o.totalCount=(a=n.data)==null?void 0:a.totalCount,o.currentPage=(r=n.data)==null?void 0:r.currentPage,o.lastPage=(i=n.data)==null?void 0:i.lastPage,o.grid&&o.grid.updateSettings({data:o.list})},n=>{console.log(n)})},S=n=>{o.currentPage=n,p()},N=()=>{const n={...d.commonAddColumns,companyId:"",companyTypeCode:"",companyName:"",lttd:"",lotd:"",addr1:"",addr2:"",phoneNo:"",...d.auditAddColumns};o.list=d.add({newRow:n,list:o.list,grid:o.grid})},U=()=>{d.del({selectedRow:b,grid:o.grid})},L=()=>{const n=d.valid({list:o.list,required:w.required});n&&D.setCompanyList(n).then(()=>{p()})};return I(()=>{const n=document.querySelector("#grid");o.grid=new A(n,{data:o.list,colHeaders:[...d.commonColumnNames,"업체아이디","업체유형코드","업체명","위도","경도","주소1","주소2","전화번호",...d.auditColumnNames],hiddenColumns:d.hiddenColumns([]),columns:[...d.commonColumns,{data:"companyId",type:"text",width:100,readOnly:!0},{data:"companyTypeCode",type:"dropdown",width:150,source:function(t,a){var r;a((r=l.codeList.companyTypeCode)==null?void 0:r.map(i=>i.codeValue))}},{data:"companyName",type:"text",width:150},{data:"lttd",type:"text",width:150},{data:"lotd",type:"text",width:150},{data:"addr1",type:"text",width:150},{data:"addr2",type:"text",width:150},{data:"phoneNo",type:"text",width:150},...d.auditColumns],cells:function(t,a){return d.cellsEvent({row:t,col:a,grid:o.grid,self:this,pk:[]})},afterChange(t,a){d.afterChangeEvent({changes:t,source:a,gridProps:w,grid:o.grid,self:this})},afterSelectionEnd:function(t,a,r,i){b=t},...d.defaultProps}),p()}),(n,t)=>(T(),V($,null,[e("form",{class:"search",onSubmit:f,onKeyup:M(f,["enter"])},[e("fieldset",null,[t[16]||(t[16]=e("legend",null,"검색",-1)),e("table",null,[t[15]||(t[15]=e("colgroup",null,[e("col",{style:{width:"80px"}}),e("col",{style:{width:"30%"}}),e("col",{style:{width:"80px"}}),e("col")],-1)),e("tbody",null,[e("tr",null,[t[10]||(t[10]=e("th",{scope:"row"},"업체명",-1)),e("td",R,[u(e("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=a=>s.companyName=a)},null,512),[[g,s.companyName]])])])]),u(e("tbody",J,[e("tr",null,[t[11]||(t[11]=e("th",{scope:"row"},"수정기간",-1)),e("td",O,[c(K,{format:"yyyy-MM-dd",date:[s.startUpdateDt,s.endUpdateDt],onSetStartDate:t[1]||(t[1]=a=>{s.startUpdateDt=a.date}),onSetEndDate:t[2]||(t[2]=a=>{s.endUpdateDt=a.date})},null,8,["date"])])]),e("tr",null,[t[12]||(t[12]=e("th",{scope:"row"},"등록일",-1)),e("td",W,[c(F,{format:"yyyy-MM-dd",date:[s.createDt],onSetStartDate:t[3]||(t[3]=a=>{s.createDt=a.date})},null,8,["date"])])]),e("tr",null,[t[13]||(t[13]=e("th",{scope:"row"},"수정ID",-1)),e("td",null,[u(e("input",{type:"text","onUpdate:modelValue":t[4]||(t[4]=a=>s.updater=a)},null,512),[[g,s.updater]])]),t[14]||(t[14]=e("th",{scope:"row"},"등록ID",-1)),e("td",null,[u(e("input",{type:"text","onUpdate:modelValue":t[5]||(t[5]=a=>s.creator=a)},null,512),[[g,s.creator]])])])],512),[[x,o.audit]])])]),e("div",j,[e("span",z,[e("button",{type:"button",class:"button add",onClick:N},t[17]||(t[17]=[e("span",{class:"icon"},"",-1),m("추가")])),e("button",{type:"button",class:"button del",onClick:U},t[18]||(t[18]=[e("span",{class:"icon"},"",-1),m("삭제")])),e("button",{type:"button",class:"button save",onClick:L},t[19]||(t[19]=[e("span",{class:"icon"},"",-1),m("저장")])),e("button",{type:"button",class:"button reset",onClick:t[6]||(t[6]=a=>C(d).reload())},t[20]||(t[20]=[e("span",{class:"icon"},'"',-1),m("초기화")]))]),e("button",{type:"button",class:"audit",onClick:t[7]||(t[7]=a=>o.audit=!o.audit)},"상세조회"),t[23]||(t[23]=e("button",{type:"submit",class:"button3"},[e("span",{class:"icon"},"")],-1)),e("button",{type:"reset",onClick:t[8]||(t[8]=a=>C(d).reload())},t[21]||(t[21]=[e("span",{class:"icon"},'"',-1)])),e("button",{type:"button",class:"button excel",onClick:t[9]||(t[9]=a=>C(H).excelExport(o.grid,"업체"))},t[22]||(t[22]=[e("span",{class:"icon"},"",-1)])),e("div",Q,"총 "+E(o.totalCount)+"건",1)])],32),t[24]||(t[24]=e("div",{id:"grid",class:"grid-container"},null,-1)),u(e("div",X,"조회 내역이 없습니다.",512),[[x,o.list.length===0]]),c(B,{currentPage:o.currentPage,lastPage:o.lastPage,"onUpdate:page":S},null,8,["currentPage","lastPage"])],64))}});export{et as default};
