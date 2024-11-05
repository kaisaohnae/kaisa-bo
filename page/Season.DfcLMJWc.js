import{d as I,c as E,r as C,x as L,o as O,e as V,f as e,w as r,K as g,J as u,v as p,l as P,h as m,G as q,L as M,F as $}from"../index.D1VbM3C_.js";import{H as A,g as l,P as B,e as H}from"./Pagination.CwC5FYHD.js";import{a as D}from"./apiConfig.BM_b3DjX.js";import{S as K,a as F}from"./SelectGroupDate.CRAe91qa.js";import"./dateUtil.-4ZUTLvU.js";class G{async getSeasonList(d){return(await D("/od/getSeasonList",d||{})).data}async setSeasonList(d){return(await D("/od/setSeasonList",d||{})).data}}const w=new G,R={colspan:"3"},T={colspan:"3"},J={class:"audit"},W={colspan:"3"},j={colspan:"3"},z={class:"btnWrap"},Q={class:"crud"},X={class:"totalCount"},Y={class:"no-list"},nt=I({__name:"Season",setup(x){const d=E(),o=C({companyId:"",seasonName:"",updater:"",creator:"",startUpdateDt:"",endUpdateDt:"",createDt:""}),n=C({required:["seasonPriceNo","companyId","sortOrder","seasonName","seasonStartDay","seasonEndDay","price","friPrice","satPrice","sunPrice"],grid:{},list:[],audit:!1,totalCount:0,currentPage:1,totalPage:50,lastPage:1}),f={unique:["companyId"],required:["seasonPriceNo","companyId","sortOrder","seasonName","seasonStartDay","seasonEndDay","price","friPrice","satPrice","sunPrice"]};let S=null;const b=a=>{a==null||a.preventDefault(),i()},i=()=>{w.getSeasonList({...o,page:n.currentPage,totalPage:n.totalPage}).then(a=>{var t,s,y,c;n.list=(t=a.data)==null?void 0:t.list,n.totalCount=(s=a.data)==null?void 0:s.totalCount,n.currentPage=(y=a.data)==null?void 0:y.currentPage,n.lastPage=(c=a.data)==null?void 0:c.lastPage,n.grid&&n.grid.updateSettings({data:n.list})},a=>{console.log(a)})},v=a=>{n.currentPage=a,i()},N=()=>{const a={...l.commonAddColumns,seasonNo:"",seasonPriceNo:"",companyId:"",sortOrder:"",seasonName:"",seasonStartDay:"",seasonEndDay:"",price:"",friPrice:"",satPrice:"",sunPrice:"",...l.auditAddColumns};n.list=l.add({newRow:a,list:n.list,grid:n.grid})},k=()=>{l.del({selectedRow:S,grid:n.grid})},U=()=>{const a=l.valid({list:n.list,required:f.required});a&&w.setSeasonList(a).then(()=>{i()})};return L(()=>{const a=document.querySelector("#grid");n.grid=new A(a,{data:n.list,colHeaders:[...l.commonColumnNames,"시즌번호","시즌가격번호","업체아이디","정렬순서","시즌명","시즌시작일시","시즌종료일시","가격","금요일가격","토요일가격","일요일가격",...l.auditColumnNames],hiddenColumns:l.hiddenColumns([]),columns:[...l.commonColumns,{data:"seasonNo",type:"numeric",width:150,readOnly:!0},{data:"seasonPriceNo",type:"numeric",width:150,readOnly:!0},{data:"companyId",type:"text",width:100,readOnly:!0},{data:"sortOrder",type:"numeric",width:150},{data:"seasonName",type:"text",width:150},{data:"seasonStartDay",type:"text",width:170,...l.datePickerConfig},{data:"seasonEndDay",type:"text",width:170,...l.datePickerConfig},{data:"price",type:"numeric",width:150},{data:"friPrice",type:"numeric",width:150},{data:"satPrice",type:"numeric",width:150},{data:"sunPrice",type:"numeric",width:150},...l.auditColumns],cells:function(t,s){return l.cellsEvent({row:t,col:s,grid:n.grid,self:this,pk:[]})},afterChange(t,s){l.afterChangeEvent({changes:t,source:s,gridProps:f,grid:n.grid,self:this})},afterSelectionEnd:function(t,s,y,c){S=t},...l.defaultProps}),i()}),(a,t)=>(O(),V($,null,[e("form",{class:"search",onSubmit:b,onKeyup:M(b,["enter"])},[e("fieldset",null,[t[18]||(t[18]=e("legend",null,"검색",-1)),e("table",null,[t[17]||(t[17]=e("colgroup",null,[e("col",{style:{width:"80px"}}),e("col",{style:{width:"30%"}}),e("col",{style:{width:"80px"}}),e("col")],-1)),e("tbody",null,[r(e("tr",null,[t[11]||(t[11]=e("th",null,"업체아이디",-1)),e("td",R,[r(e("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=s=>o.companyId=s)},null,512),[[p,o.companyId]])])],512),[[g,u(d).userInfo.companyId==="kaisa"]]),e("tr",null,[t[12]||(t[12]=e("th",null,"시즌명",-1)),e("td",T,[r(e("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=s=>o.seasonName=s)},null,512),[[p,o.seasonName]])])])]),r(e("tbody",J,[e("tr",null,[t[13]||(t[13]=e("th",null,"수정기간",-1)),e("td",W,[P(K,{format:"yyyy-MM-dd",date:[o.startUpdateDt,o.endUpdateDt],onSetStartDate:t[2]||(t[2]=s=>{o.startUpdateDt=s.date}),onSetEndDate:t[3]||(t[3]=s=>{o.endUpdateDt=s.date})},null,8,["date"])])]),e("tr",null,[t[14]||(t[14]=e("th",null,"등록일",-1)),e("td",j,[P(F,{format:"yyyy-MM-dd",date:[o.createDt],onSetStartDate:t[4]||(t[4]=s=>{o.createDt=s.date})},null,8,["date"])])]),e("tr",null,[t[15]||(t[15]=e("th",null,"수정ID",-1)),e("td",null,[r(e("input",{type:"text","onUpdate:modelValue":t[5]||(t[5]=s=>o.updater=s)},null,512),[[p,o.updater]])]),t[16]||(t[16]=e("th",null,"등록ID",-1)),e("td",null,[r(e("input",{type:"text","onUpdate:modelValue":t[6]||(t[6]=s=>o.creator=s)},null,512),[[p,o.creator]])])])],512),[[g,n.audit]])])]),e("div",z,[e("span",Q,[e("button",{type:"button",class:"button add",onClick:N},t[19]||(t[19]=[e("span",{class:"icon"},"",-1),m("추가")])),e("button",{type:"button",class:"button del",onClick:k},t[20]||(t[20]=[e("span",{class:"icon"},"",-1),m("삭제")])),e("button",{type:"button",class:"button save",onClick:U},t[21]||(t[21]=[e("span",{class:"icon"},"",-1),m("저장")])),e("button",{type:"button",class:"button reset",onClick:t[7]||(t[7]=s=>u(l).reload())},t[22]||(t[22]=[e("span",{class:"icon"},'"',-1),m("초기화")]))]),e("button",{type:"button",class:"audit",onClick:t[8]||(t[8]=s=>n.audit=!n.audit)},"상세조회"),t[25]||(t[25]=e("button",{type:"submit",class:"button3"},[e("span",{class:"icon"},"")],-1)),e("button",{type:"reset",onClick:t[9]||(t[9]=s=>u(l).reload())},t[23]||(t[23]=[e("span",{class:"icon"},'"',-1)])),e("button",{type:"button",class:"button excel",onClick:t[10]||(t[10]=s=>u(H).excelExport(n.grid,"시즌"))},t[24]||(t[24]=[e("span",{class:"icon"},"",-1)])),e("div",X,"총 "+q(n.totalCount)+"건",1)])],32),t[26]||(t[26]=e("div",{id:"grid",class:"grid-container"},null,-1)),r(e("div",Y,"조회 내역이 없습니다.",512),[[g,n.list.length===0]]),P(B,{currentPage:n.currentPage,lastPage:n.lastPage,"onUpdate:page":v},null,8,["currentPage","lastPage"])],64))}});export{nt as default};
