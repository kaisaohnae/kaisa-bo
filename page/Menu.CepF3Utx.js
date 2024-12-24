import{d as U,c as k,r as D,x as q,o as G,e as I,f as e,w as i,v as y,K as P,l as c,h as m,J as w,G as V,L as E,F as O}from"../index.BiHN_QT9.js";import{H as $,g as d,P as h,e as A}from"./Pagination.D04KymE1.js";import{a as g}from"./apiConfig.Xhj7Bla-.js";import{S as B,a as H}from"./SelectGroupDate.DcEFRv-R.js";import"./dateUtil.CCuh71ce.js";class K{async getMenu(l){return(await g("/at/getMenu",l||{})).data}async getMenuList(l){return(await g("/at/getMenuList",l||{})).data}async setMenu(l){return(await g("/at/setMenu",l||{})).data}async setMenuList(l){return(await g("/at/setMenuList",l||{})).data}}const M=new K,F={colspan:"3"},R={class:"audit"},T={colspan:"3"},J={colspan:"3"},W={class:"btnWrap"},j={class:"crud"},z={class:"totalCount"},Q={class:"no-list"},et=U({__name:"Menu",setup(v){const l=k(),o=D({menuName:"",updater:"",creator:"",startUpdateDt:"",endUpdateDt:"",createDt:""}),n=D({required:["menuId","menuName","menuGroupCode","path","isDisplay","isLast","depth","sortOrder"],grid:{},list:[],audit:!1,totalCount:0,currentPage:1,totalPage:50,lastPage:1}),C={unique:["menuId"],required:["menuId","menuName","menuGroupCode","path","isDisplay","isLast","depth","sortOrder"]};let b=null;const f=a=>{a==null||a.preventDefault(),p()},p=()=>{M.getMenuList({...o,page:n.currentPage,totalPage:n.totalPage}).then(a=>{var t,s,r,u;n.list=(t=a.data)==null?void 0:t.list,n.totalCount=(s=a.data)==null?void 0:s.totalCount,n.currentPage=(r=a.data)==null?void 0:r.currentPage,n.lastPage=(u=a.data)==null?void 0:u.lastPage,n.grid&&n.grid.updateSettings({data:n.list})},a=>{console.log(a)})},x=a=>{n.currentPage=a,p()},S=()=>{const a={...d.commonAddColumns,menuId:"",menuName:"",menuGroupCode:"",path:"",icon:"",isDisplay:"",isLast:"",depth:"",sortOrder:"",...d.auditAddColumns};n.list=d.add({newRow:a,list:n.list,grid:n.grid})},L=()=>{d.del({selectedRow:b,grid:n.grid})},N=()=>{const a=d.valid({list:n.list,required:C.required});a&&M.setMenuList(a).then(()=>{p()})};return q(()=>{const a=document.querySelector("#grid");n.grid=new $(a,{data:n.list,colHeaders:[...d.commonColumnNames,"메뉴아이디","메뉴명","메뉴그룹코드","경로","아이콘","전시여부","마지막여부","깊이","정렬순서",...d.auditColumnNames],hiddenColumns:d.hiddenColumns([]),columns:[...d.commonColumns,{data:"menuId",type:"text",width:150,readOnly:!0},{data:"menuName",type:"text",width:150},{data:"menuGroupCode",type:"dropdown",width:150,source:function(t,s){var r;s((r=l.codeList.menuGroupCode)==null?void 0:r.map(u=>u.codeValue))}},{data:"path",type:"text",width:150},{data:"icon",type:"text",width:150},{data:"isDisplay",type:"numeric",width:150},{data:"isLast",type:"numeric",width:150},{data:"depth",type:"numeric",width:150},{data:"sortOrder",type:"numeric",width:150},...d.auditColumns],cells:function(t,s){return d.cellsEvent({row:t,col:s,grid:n.grid,self:this,pk:[]})},afterChange(t,s){d.afterChangeEvent({changes:t,source:s,gridProps:C,grid:n.grid,self:this})},afterSelectionEnd:function(t,s,r,u){b=t},...d.defaultProps}),p()}),(a,t)=>(G(),I(O,null,[e("form",{class:"search",onSubmit:f,onKeyup:E(f,["enter"])},[e("fieldset",null,[t[16]||(t[16]=e("legend",null,"검색",-1)),e("table",null,[t[15]||(t[15]=e("colgroup",null,[e("col",{style:{width:"80px"}}),e("col",{style:{width:"30%"}}),e("col",{style:{width:"80px"}}),e("col")],-1)),e("tbody",null,[e("tr",null,[t[10]||(t[10]=e("th",{scope:"row"},"메뉴명",-1)),e("td",F,[i(e("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=s=>o.menuName=s)},null,512),[[y,o.menuName]])])])]),i(e("tbody",R,[e("tr",null,[t[11]||(t[11]=e("th",{scope:"row"},"수정기간",-1)),e("td",T,[c(B,{format:"yyyy-MM-dd",date:[o.startUpdateDt,o.endUpdateDt],onSetStartDate:t[1]||(t[1]=s=>{o.startUpdateDt=s.date}),onSetEndDate:t[2]||(t[2]=s=>{o.endUpdateDt=s.date})},null,8,["date"])])]),e("tr",null,[t[12]||(t[12]=e("th",{scope:"row"},"등록일",-1)),e("td",J,[c(H,{format:"yyyy-MM-dd",date:[o.createDt],onSetStartDate:t[3]||(t[3]=s=>{o.createDt=s.date})},null,8,["date"])])]),e("tr",null,[t[13]||(t[13]=e("th",{scope:"row"},"수정ID",-1)),e("td",null,[i(e("input",{type:"text","onUpdate:modelValue":t[4]||(t[4]=s=>o.updater=s)},null,512),[[y,o.updater]])]),t[14]||(t[14]=e("th",{scope:"row"},"등록ID",-1)),e("td",null,[i(e("input",{type:"text","onUpdate:modelValue":t[5]||(t[5]=s=>o.creator=s)},null,512),[[y,o.creator]])])])],512),[[P,n.audit]])])]),e("div",W,[e("span",j,[e("button",{type:"button",class:"button add",onClick:S},t[17]||(t[17]=[e("span",{class:"icon"},"",-1),m("추가")])),e("button",{type:"button",class:"button del",onClick:L},t[18]||(t[18]=[e("span",{class:"icon"},"",-1),m("삭제")])),e("button",{type:"button",class:"button save",onClick:N},t[19]||(t[19]=[e("span",{class:"icon"},"",-1),m("저장")])),e("button",{type:"button",class:"button reset",onClick:t[6]||(t[6]=s=>w(d).reload())},t[20]||(t[20]=[e("span",{class:"icon"},'"',-1),m("초기화")]))]),e("button",{type:"button",class:"audit",onClick:t[7]||(t[7]=s=>n.audit=!n.audit)},"상세조회"),t[23]||(t[23]=e("button",{type:"submit",class:"button3"},[e("span",{class:"icon"},"")],-1)),e("button",{type:"reset",onClick:t[8]||(t[8]=s=>w(d).reload())},t[21]||(t[21]=[e("span",{class:"icon"},'"',-1)])),e("button",{type:"button",class:"button excel",onClick:t[9]||(t[9]=s=>w(A).excelExport(n.grid,"메뉴"))},t[22]||(t[22]=[e("span",{class:"icon"},"",-1)])),e("div",z,"총 "+V(n.totalCount)+"건",1)])],32),t[24]||(t[24]=e("div",{id:"grid",class:"grid-container"},null,-1)),i(e("div",Q,"조회 내역이 없습니다.",512),[[P,n.list.length===0]]),c(h,{currentPage:n.currentPage,lastPage:n.lastPage,"onUpdate:page":x},null,8,["currentPage","lastPage"])],64))}});export{et as default};