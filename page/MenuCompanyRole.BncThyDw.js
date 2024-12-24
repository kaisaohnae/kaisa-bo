import{d as U,c as k,r as x,x as L,o as N,e as V,f as e,w as u,v as i,K as C,J as p,l as b,h as m,G as q,L as E,F as $}from"../index.8mXqKDFy.js";import{H as A,g as l,P as B,e as H}from"./Pagination.HFP-leG0.js";import{a as y}from"./apiConfig.Cb5X9RbM.js";import{S as K,a as F}from"./SelectGroupDate.DlEKbCFO.js";import"./dateUtil.CtZ7_Ahw.js";class G{async getMenuCompanyRole(d){return(await y("/at/getMenuCompanyRole",d||{})).data}async getMenuCompanyRoleList(d){return(await y("/at/getMenuCompanyRoleList",d||{})).data}async setMenuCompanyRole(d){return(await y("/at/setMenuCompanyRole",d||{})).data}async setMenuCompanyRoleList(d){return(await y("/at/setMenuCompanyRoleList",d||{})).data}}const D=new G,O={colspan:"3"},T={colspan:"3"},J={class:"audit"},W={colspan:"3"},j={colspan:"3"},z={class:"btnWrap"},Q={class:"crud"},X={class:"totalCount"},Y={class:"no-list"},nt=U({__name:"MenuCompanyRole",setup(I){const d=k(),s=x({menuId:"",companyId:"",updater:"",creator:"",startUpdateDt:"",endUpdateDt:"",createDt:""}),n=x({required:["menuId","companyId","menuName","buttonRole"],grid:{},list:[],audit:!1,totalCount:0,currentPage:1,totalPage:50,lastPage:1}),f={unique:["companyId"],required:["menuId","companyId","menuName","buttonRole"]};let w=null;const P=a=>{a==null||a.preventDefault(),r()},r=()=>{D.getMenuCompanyRoleList({...s,page:n.currentPage,totalPage:n.totalPage}).then(a=>{var t,o,g,c;n.list=(t=a.data)==null?void 0:t.list,n.totalCount=(o=a.data)==null?void 0:o.totalCount,n.currentPage=(g=a.data)==null?void 0:g.currentPage,n.lastPage=(c=a.data)==null?void 0:c.lastPage,n.grid&&n.grid.updateSettings({data:n.list})},a=>{console.log(a)})},M=a=>{n.currentPage=a,r()},R=()=>{const a={...l.commonAddColumns,menuId:"",companyId:"",menuName:"",buttonRole:"",...l.auditAddColumns};n.list=l.add({newRow:a,list:n.list,grid:n.grid})},v=()=>{l.del({selectedRow:w,grid:n.grid})},S=()=>{const a=l.valid({list:n.list,required:f.required});a&&D.setMenuCompanyRoleList(a).then(()=>{r()})};return L(()=>{const a=document.querySelector("#grid");n.grid=new A(a,{data:n.list,colHeaders:[...l.commonColumnNames,"메뉴아이디","업체아이디","메뉴명","버튼권한",...l.auditColumnNames],hiddenColumns:l.hiddenColumns([]),columns:[...l.commonColumns,{data:"menuId",type:"text",width:150,readOnly:!0},{data:"companyId",type:"text",width:100,readOnly:!0},{data:"menuName",type:"text",width:150},{data:"buttonRole",type:"text",width:150},...l.auditColumns],cells:function(t,o){return l.cellsEvent({row:t,col:o,grid:n.grid,self:this,pk:[]})},afterChange(t,o){l.afterChangeEvent({changes:t,source:o,gridProps:f,grid:n.grid,self:this})},afterSelectionEnd:function(t,o,g,c){w=t},...l.defaultProps}),r()}),(a,t)=>(N(),V($,null,[e("form",{class:"search",onSubmit:P,onKeyup:E(P,["enter"])},[e("fieldset",null,[t[18]||(t[18]=e("legend",null,"검색",-1)),e("table",null,[t[17]||(t[17]=e("colgroup",null,[e("col",{style:{width:"80px"}}),e("col",{style:{width:"30%"}}),e("col",{style:{width:"80px"}}),e("col")],-1)),e("tbody",null,[e("tr",null,[t[11]||(t[11]=e("th",{scope:"row"},"메뉴아이디",-1)),e("td",O,[u(e("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=o=>s.menuId=o)},null,512),[[i,s.menuId]])])]),u(e("tr",null,[t[12]||(t[12]=e("th",{scope:"row"},"업체아이디",-1)),e("td",T,[u(e("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=o=>s.companyId=o)},null,512),[[i,s.companyId]])])],512),[[C,p(d).userInfo.companyId==="kaisa"]])]),u(e("tbody",J,[e("tr",null,[t[13]||(t[13]=e("th",{scope:"row"},"수정기간",-1)),e("td",W,[b(K,{format:"yyyy-MM-dd",date:[s.startUpdateDt,s.endUpdateDt],onSetStartDate:t[2]||(t[2]=o=>{s.startUpdateDt=o.date}),onSetEndDate:t[3]||(t[3]=o=>{s.endUpdateDt=o.date})},null,8,["date"])])]),e("tr",null,[t[14]||(t[14]=e("th",{scope:"row"},"등록일",-1)),e("td",j,[b(F,{format:"yyyy-MM-dd",date:[s.createDt],onSetStartDate:t[4]||(t[4]=o=>{s.createDt=o.date})},null,8,["date"])])]),e("tr",null,[t[15]||(t[15]=e("th",{scope:"row"},"수정ID",-1)),e("td",null,[u(e("input",{type:"text","onUpdate:modelValue":t[5]||(t[5]=o=>s.updater=o)},null,512),[[i,s.updater]])]),t[16]||(t[16]=e("th",{scope:"row"},"등록ID",-1)),e("td",null,[u(e("input",{type:"text","onUpdate:modelValue":t[6]||(t[6]=o=>s.creator=o)},null,512),[[i,s.creator]])])])],512),[[C,n.audit]])])]),e("div",z,[e("span",Q,[e("button",{type:"button",class:"button add",onClick:R},t[19]||(t[19]=[e("span",{class:"icon"},"",-1),m("추가")])),e("button",{type:"button",class:"button del",onClick:v},t[20]||(t[20]=[e("span",{class:"icon"},"",-1),m("삭제")])),e("button",{type:"button",class:"button save",onClick:S},t[21]||(t[21]=[e("span",{class:"icon"},"",-1),m("저장")])),e("button",{type:"button",class:"button reset",onClick:t[7]||(t[7]=o=>p(l).reload())},t[22]||(t[22]=[e("span",{class:"icon"},'"',-1),m("초기화")]))]),e("button",{type:"button",class:"audit",onClick:t[8]||(t[8]=o=>n.audit=!n.audit)},"상세조회"),t[25]||(t[25]=e("button",{type:"submit",class:"button3"},[e("span",{class:"icon"},"")],-1)),e("button",{type:"reset",onClick:t[9]||(t[9]=o=>p(l).reload())},t[23]||(t[23]=[e("span",{class:"icon"},'"',-1)])),e("button",{type:"button",class:"button excel",onClick:t[10]||(t[10]=o=>p(H).excelExport(n.grid,"메뉴업체권한"))},t[24]||(t[24]=[e("span",{class:"icon"},"",-1)])),e("div",X,"총 "+q(n.totalCount)+"건",1)])],32),t[26]||(t[26]=e("div",{id:"grid",class:"grid-container"},null,-1)),u(e("div",Y,"조회 내역이 없습니다.",512),[[C,n.list.length===0]]),b(B,{currentPage:n.currentPage,lastPage:n.lastPage,"onUpdate:page":M},null,8,["currentPage","lastPage"])],64))}});export{nt as default};
