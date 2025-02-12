import{d as k,r as x,x as c,o as C,e as $,f as t,G as y,w as i,v as p,p as S,c as A,K as V,l as D,h as N,J as v,L as B,A as H,B as O,F as K}from"../index.CA2PHKMv.js";import{H as R,g as u,P as F,e as G}from"./pagination.DuW7WgHU.js";import{a as f}from"./api-config.6OFjWcER.js";import{S as I,a as T}from"./select-group-date.CJbCb1F5.js";import{D as j}from"./detail.6K8T0y58.js";import"./date-util.C-LbdNth.js";class J{async getQna(o){return(await f("/cs/get-qna",o||{})).data}async getQnaList(o){return(await f("/cs/get-qna-list",o||{})).data}async setQna(o){return(await f("/cs/set-qna",o||{})).data}async setQnaList(o){return(await f("/cs/set-qna-list",o||{})).data}}const q=new J,W={class:"detail-content"},z={class:"detail-scroll"},X={class:"detail-table"},Y=k({__name:"qna-detail",props:{data:{type:Object,required:!0}},setup(d){const o=d;x({editor:{},editorOption:{}});const m=()=>{o.data.qnaNo&&q.getQna({qnaNo:o.data.qnaNo}).then(a=>{o.data.qnaNo=a.data.qnaNo,o.data.memberName=a.data.memberName,o.data.phoneNo=a.data.phoneNo,o.data.email=a.data.email,o.data.title=a.data.title,o.data.content=a.data.content,o.data.creator=a.data.creator,o.data.createDt=a.data.createDt,o.data.updater=a.data.updater,o.data.updateDt=a.data.updateDt},a=>{console.log(a)})};return c(()=>{m()}),(a,n)=>(C(),$("div",W,[n[16]||(n[16]=t("h2",null,"문의 상세",-1)),t("div",z,[t("table",X,[n[15]||(n[15]=t("caption",null,"문의 상세",-1)),t("tbody",null,[t("tr",null,[n[5]||(n[5]=t("th",{scope:"col"},"질문번호",-1)),t("td",null,y(d.data.qnaNo),1)]),t("tr",null,[n[6]||(n[6]=t("th",{scope:"col"},"회원명",-1)),t("td",null,[i(t("input",{type:"text","onUpdate:modelValue":n[0]||(n[0]=r=>d.data.memberName=r)},null,512),[[p,d.data.memberName]])])]),t("tr",null,[n[7]||(n[7]=t("th",{scope:"col"},"전화번호",-1)),t("td",null,[i(t("input",{type:"text","onUpdate:modelValue":n[1]||(n[1]=r=>d.data.phoneNo=r)},null,512),[[p,d.data.phoneNo]])])]),t("tr",null,[n[8]||(n[8]=t("th",{scope:"col"},"이메일",-1)),t("td",null,[i(t("input",{type:"text","onUpdate:modelValue":n[2]||(n[2]=r=>d.data.email=r),required:""},null,512),[[p,d.data.email]])])]),t("tr",null,[n[9]||(n[9]=t("th",{scope:"col"},"제목",-1)),t("td",null,[i(t("input",{type:"text","onUpdate:modelValue":n[3]||(n[3]=r=>d.data.title=r)},null,512),[[p,d.data.title]])])]),t("tr",null,[n[10]||(n[10]=t("th",{scope:"col"},"내용",-1)),t("td",null,[i(t("input",{type:"text","onUpdate:modelValue":n[4]||(n[4]=r=>d.data.content=r)},null,512),[[p,d.data.content]])])]),t("tr",null,[n[11]||(n[11]=t("th",{scope:"col"},"등록자",-1)),t("td",null,y(d.data.creator),1)]),t("tr",null,[n[12]||(n[12]=t("th",{scope:"col"},"등록일시",-1)),t("td",null,y(d.data.createDt),1)]),t("tr",null,[n[13]||(n[13]=t("th",{scope:"col"},"수정자",-1)),t("td",null,y(d.data.updater),1)]),t("tr",null,[n[14]||(n[14]=t("th",{scope:"col"},"수정일시",-1)),t("td",null,y(d.data.updateDt),1)])])])]),n[17]||(n[17]=t("div",{class:"detail-bottom"},[t("button",{type:"button"},"저장"),t("button",{type:"button"},"취소")],-1))]))}}),Z={colspan:"3"},h={colspan:"3"},_={colspan:"3"},tt={colspan:"3"},et={colspan:"3"},nt={class:"audit"},at={colspan:"3"},lt={colspan:"3"},ot={class:"btnWrap"},st={class:"crud"},dt={class:"totalCount"},ut={class:"no-list"},bt=k({__name:"qna",setup(d){const o=S(null),m=S(!1);A();const a=x({memberName:"",phoneNo:"",email:"",title:"",content:"",updater:"",creator:"",startUpdateDt:"",endUpdateDt:"",createDt:""}),n=x({required:["memberName","phoneNo","title","content"],grid:{},list:[],audit:!1,totalCount:0,currentPage:1,totalPage:50,lastPage:1}),r={unique:["qnaNo"],required:["memberName","phoneNo","title","content"]};let P=null;const U=s=>{s==null||s.preventDefault(),w()},w=()=>{q.getQnaList({...a,page:n.currentPage,totalPage:n.totalPage}).then(s=>{var e,l,b,g;n.list=(e=s.data)==null?void 0:e.list,n.totalCount=(l=s.data)==null?void 0:l.totalCount,n.currentPage=(b=s.data)==null?void 0:b.currentPage,n.lastPage=(g=s.data)==null?void 0:g.lastPage,n.grid&&n.grid.updateSettings({data:n.list})},s=>{console.log(s)})},Q=s=>{n.currentPage=s,w()},L=()=>{const s={...u.commonAddColumns,qnaNo:"",memberName:"",phoneNo:"",email:"",title:"",content:"",...u.auditAddColumns};n.list=u.add({newRow:s,list:n.list,grid:n.grid})},M=()=>{u.del({selectedRow:P,grid:n.grid})},E=()=>{const s=u.valid({list:n.list,required:r.required});s&&q.setQnaList(s).then(()=>{w()})};return c(()=>{const s=document.querySelector("#grid");n.grid=new R(s,{data:n.list,colHeaders:[...u.commonColumnNames,"질문번호","회원명","전화번호","이메일","제목","내용",...u.auditColumnNames],hiddenColumns:u.hiddenColumns([]),columns:[...u.commonColumns,{data:"qnaNo",type:"numeric",width:150,readOnly:!0},{data:"memberName",type:"text",width:150},{data:"phoneNo",type:"text",width:150},{data:"email",type:"text",width:150},{data:"title",type:"text",width:150,className:"underline"},{data:"content",type:"text",width:150},...u.auditColumns],cells:function(e,l){return u.cellsEvent({row:e,col:l,grid:n.grid,self:this,pk:[]})},afterChange(e,l){u.afterChangeEvent({changes:e,source:l,gridProps:r,grid:n.grid,self:this})},afterSelectionEnd:function(e,l,b,g){P=e},afterOnCellMouseDown:(e,l)=>{const b=n.grid.getColHeader(l.col),g=n.grid.getSourceDataAtRow(l.row);b==="제목"&&g&&(o.value=g,m.value=!0)},...u.defaultProps}),w()}),(s,e)=>(C(),$(K,null,[t("form",{class:"search",onSubmit:U,onKeyup:B(U,["enter"])},[t("fieldset",null,[e[25]||(e[25]=t("legend",null,"검색",-1)),t("table",null,[e[24]||(e[24]=t("colgroup",null,[t("col",{style:{width:"80px"}}),t("col",{style:{width:"30%"}}),t("col",{style:{width:"80px"}}),t("col")],-1)),t("tbody",null,[t("tr",null,[e[15]||(e[15]=t("th",{scope:"row"},"회원명",-1)),t("td",Z,[i(t("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=l=>a.memberName=l)},null,512),[[p,a.memberName]])])]),t("tr",null,[e[16]||(e[16]=t("th",{scope:"row"},"전화번호",-1)),t("td",h,[i(t("input",{type:"text","onUpdate:modelValue":e[1]||(e[1]=l=>a.phoneNo=l)},null,512),[[p,a.phoneNo]])])]),t("tr",null,[e[17]||(e[17]=t("th",{scope:"row"},"이메일",-1)),t("td",_,[i(t("input",{type:"text","onUpdate:modelValue":e[2]||(e[2]=l=>a.email=l)},null,512),[[p,a.email]])])]),t("tr",null,[e[18]||(e[18]=t("th",{scope:"row"},"제목",-1)),t("td",tt,[i(t("input",{type:"text","onUpdate:modelValue":e[3]||(e[3]=l=>a.title=l)},null,512),[[p,a.title]])])]),t("tr",null,[e[19]||(e[19]=t("th",{scope:"row"},"내용",-1)),t("td",et,[i(t("input",{type:"text","onUpdate:modelValue":e[4]||(e[4]=l=>a.content=l)},null,512),[[p,a.content]])])])]),i(t("tbody",nt,[t("tr",null,[e[20]||(e[20]=t("th",{scope:"row"},"수정기간",-1)),t("td",at,[D(I,{format:"yyyy-MM-dd",date:[a.startUpdateDt,a.endUpdateDt],onSetStartDate:e[5]||(e[5]=l=>{a.startUpdateDt=l.date}),onSetEndDate:e[6]||(e[6]=l=>{a.endUpdateDt=l.date})},null,8,["date"])])]),t("tr",null,[e[21]||(e[21]=t("th",{scope:"row"},"등록일",-1)),t("td",lt,[D(T,{format:"yyyy-MM-dd",date:[a.createDt],onSetStartDate:e[7]||(e[7]=l=>{a.createDt=l.date})},null,8,["date"])])]),t("tr",null,[e[22]||(e[22]=t("th",{scope:"row"},"수정ID",-1)),t("td",null,[i(t("input",{type:"text","onUpdate:modelValue":e[8]||(e[8]=l=>a.updater=l)},null,512),[[p,a.updater]])]),e[23]||(e[23]=t("th",{scope:"row"},"등록ID",-1)),t("td",null,[i(t("input",{type:"text","onUpdate:modelValue":e[9]||(e[9]=l=>a.creator=l)},null,512),[[p,a.creator]])])])],512),[[V,n.audit]])])]),t("div",ot,[t("span",st,[t("button",{type:"button",class:"button add",onClick:L},e[26]||(e[26]=[t("span",{class:"icon"},"",-1),N("추가")])),t("button",{type:"button",class:"button del",onClick:M},e[27]||(e[27]=[t("span",{class:"icon"},"",-1),N("삭제")])),t("button",{type:"button",class:"button save",onClick:E},e[28]||(e[28]=[t("span",{class:"icon"},"",-1),N("저장")])),t("button",{type:"button",class:"button reset",onClick:e[10]||(e[10]=l=>v(u).reload())},e[29]||(e[29]=[t("span",{class:"icon"},'"',-1),N("초기화")]))]),t("button",{type:"button",class:"audit",onClick:e[11]||(e[11]=l=>n.audit=!n.audit)},"상세조회"),e[32]||(e[32]=t("button",{type:"submit",class:"button3"},[t("span",{class:"icon"},"")],-1)),t("button",{type:"reset",onClick:e[12]||(e[12]=l=>v(u).reload())},e[30]||(e[30]=[t("span",{class:"icon"},'"',-1)])),t("button",{type:"button",class:"button excel",onClick:e[13]||(e[13]=l=>v(G).excelExport(n.grid,"문의"))},e[31]||(e[31]=[t("span",{class:"icon"},"",-1)])),t("div",dt,"총 "+y(n.totalCount)+"건",1)])],32),e[33]||(e[33]=t("div",{id:"grid",class:"grid-container"},null,-1)),i(t("div",ut,"조회 내역이 없습니다.",512),[[V,n.list.length===0]]),D(F,{currentPage:n.currentPage,lastPage:n.lastPage,"onUpdate:page":Q},null,8,["currentPage","lastPage"]),m.value?(C(),H(j,{key:0,component:Y,data:o.value,show:m.value,onClose:e[14]||(e[14]=l=>m.value=!1)},null,8,["data","show"])):O("",!0)],64))}});export{bt as default};
