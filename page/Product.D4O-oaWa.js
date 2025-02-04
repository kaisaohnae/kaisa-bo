import{d as I,r as x,x as L,o as B,e as q,f as t,G as D,w as y,v as P,l as w,p as V,c as M,K as v,J as N,h as b,L as A,A as O,B as K,F as R}from"../index.C-nXzXzh.js";import{g as m,H as F,P as G,e as T}from"./Pagination.Dv7wRgvR.js";import{a as S}from"./apiConfig.Dn3pyRtA.js";import{S as j,a as J}from"./SelectGroupDate.CxGgGt6L.js";import{D as W}from"./Detail.CX0PklKl.js";import{_ as f}from"./CommonCode.vue_vue_type_script_setup_true_lang.GLTqk_w3.js";import"./dateUtil.DX7rpUD5.js";class z{async getProduct(l){return(await S("/pd/getProduct",l||{})).data}async getProductList(l){return(await S("/pd/getProductList",l||{})).data}async setProduct(l){return(await S("/pd/setProduct",l||{})).data}async setProductList(l){return(await S("/pd/setProductList",l||{})).data}}const k=new z,X={class:"detail-content"},Y={class:"detail-scroll"},Z={class:"detail-table"},h=I({__name:"ProductDetail",props:{data:{type:Object,required:!0}},setup(n){const l=n,g=x({editor:{},editorOption:{}}),c=()=>{g.editor=m.createEditor({name:"#ProductEditor",cnts:l.data})},r=()=>{l.data.productNo?k.getProduct({productNo:l.data.productNo}).then(e=>{l.data.productNo=e.data.productNo,l.data.companyId=e.data.companyId,l.data.seasonPriceNo=e.data.seasonPriceNo,l.data.productName=e.data.productName,l.data.headCount=e.data.headCount,l.data.maxHeadCount=e.data.maxHeadCount,l.data.m2=e.data.m2,l.data.isDisplay=e.data.isDisplay,l.data.isPet=e.data.isPet,l.data.isBBQ=e.data.isBBQ,l.data.isPickup=e.data.isPickup,l.data.isStone=e.data.isStone,l.data.memo=e.data.memo,l.data.content=e.data.content,l.data.fileNo=e.data.fileNo,l.data.creator=e.data.creator,l.data.createDt=e.data.createDt,l.data.updater=e.data.updater,l.data.updateDt=e.data.updateDt,c()},e=>{console.log(e)}):c()};return L(()=>{r()}),(e,a)=>(B(),q("div",X,[a[34]||(a[34]=t("h2",null,"상품 상세",-1)),t("div",Y,[t("table",Z,[a[33]||(a[33]=t("caption",null,"상품 상세",-1)),t("tbody",null,[t("tr",null,[a[13]||(a[13]=t("th",{scope:"col"},"상품번호",-1)),t("td",null,D(n.data.productNo),1)]),t("tr",null,[a[14]||(a[14]=t("th",{scope:"col"},"업체아이디",-1)),t("td",null,[y(t("input",{type:"text","onUpdate:modelValue":a[0]||(a[0]=s=>n.data.companyId=s)},null,512),[[P,n.data.companyId]])])]),t("tr",null,[a[15]||(a[15]=t("th",{scope:"col"},"시즌가격번호",-1)),t("td",null,[y(t("input",{type:"number","onUpdate:modelValue":a[1]||(a[1]=s=>n.data.seasonPriceNo=s)},null,512),[[P,n.data.seasonPriceNo]])])]),t("tr",null,[a[16]||(a[16]=t("th",{scope:"col"},"상품명",-1)),t("td",null,[y(t("input",{type:"text","onUpdate:modelValue":a[2]||(a[2]=s=>n.data.productName=s)},null,512),[[P,n.data.productName]])])]),t("tr",null,[a[17]||(a[17]=t("th",{scope:"col"},"인원수",-1)),t("td",null,[y(t("input",{type:"number","onUpdate:modelValue":a[3]||(a[3]=s=>n.data.headCount=s)},null,512),[[P,n.data.headCount]])])]),t("tr",null,[a[18]||(a[18]=t("th",{scope:"col"},"최대인원수",-1)),t("td",null,[y(t("input",{type:"number","onUpdate:modelValue":a[4]||(a[4]=s=>n.data.maxHeadCount=s)},null,512),[[P,n.data.maxHeadCount]])])]),t("tr",null,[a[19]||(a[19]=t("th",{scope:"col"},"평형",-1)),t("td",null,[y(t("input",{type:"number","onUpdate:modelValue":a[5]||(a[5]=s=>n.data.m2=s)},null,512),[[P,n.data.m2]])])]),t("tr",null,[a[20]||(a[20]=t("th",{scope:"col"},"전시여부",-1)),t("td",null,[w(f,{cd:"isDisplay",model:n.data.isDisplay,onSetData:a[6]||(a[6]=s=>{n.data.isDisplay=s})},null,8,["model"])])]),t("tr",null,[a[21]||(a[21]=t("th",{scope:"col"},"애완동물여부",-1)),t("td",null,[w(f,{cd:"isPet",model:n.data.isPet,onSetData:a[7]||(a[7]=s=>{n.data.isPet=s})},null,8,["model"])])]),t("tr",null,[a[22]||(a[22]=t("th",{scope:"col"},"바베큐여부",-1)),t("td",null,[w(f,{cd:"isBBQ",model:n.data.isBBQ,onSetData:a[8]||(a[8]=s=>{n.data.isBBQ=s})},null,8,["model"])])]),t("tr",null,[a[23]||(a[23]=t("th",{scope:"col"},"픽업여부",-1)),t("td",null,[w(f,{cd:"isPickup",model:n.data.isPickup,onSetData:a[9]||(a[9]=s=>{n.data.isPickup=s})},null,8,["model"])])]),t("tr",null,[a[24]||(a[24]=t("th",{scope:"col"},"온돌여부",-1)),t("td",null,[w(f,{cd:"isStone",model:n.data.isStone,onSetData:a[10]||(a[10]=s=>{n.data.isStone=s})},null,8,["model"])])]),t("tr",null,[a[25]||(a[25]=t("th",{scope:"col"},"메모",-1)),t("td",null,[y(t("input",{type:"text","onUpdate:modelValue":a[11]||(a[11]=s=>n.data.memo=s),required:""},null,512),[[P,n.data.memo]])])]),a[31]||(a[31]=t("tr",null,[t("th",{scope:"col",colspan:"2"},"내용")],-1)),a[32]||(a[32]=t("tr",null,[t("td",{colspan:"2"},[t("div",{id:"ProductEditor"})])],-1)),t("tr",null,[a[26]||(a[26]=t("th",{scope:"col"},"파일번호",-1)),t("td",null,[y(t("input",{type:"number","onUpdate:modelValue":a[12]||(a[12]=s=>n.data.fileNo=s)},null,512),[[P,n.data.fileNo]])])]),t("tr",null,[a[27]||(a[27]=t("th",{scope:"col"},"등록자",-1)),t("td",null,D(n.data.creator),1)]),t("tr",null,[a[28]||(a[28]=t("th",{scope:"col"},"등록일시",-1)),t("td",null,D(n.data.createDt),1)]),t("tr",null,[a[29]||(a[29]=t("th",{scope:"col"},"수정자",-1)),t("td",null,D(n.data.updater),1)]),t("tr",null,[a[30]||(a[30]=t("th",{scope:"col"},"수정일시",-1)),t("td",null,D(n.data.updateDt),1)])])])]),a[35]||(a[35]=t("div",{class:"detail-bottom"},[t("button",{type:"button"},"저장"),t("button",{type:"button"},"취소")],-1))]))}}),_={colspan:"3"},tt={colspan:"3"},at={class:"audit"},ot={colspan:"3"},et={colspan:"3"},dt={class:"btnWrap"},nt={class:"crud"},lt={class:"totalCount"},st={class:"no-list"},gt=I({__name:"Product",setup(n){const l=V(null),g=V(!1),c=M(),r=x({companyId:"",productName:"",updater:"",creator:"",startUpdateDt:"",endUpdateDt:"",createDt:""}),e=x({required:["companyId","seasonPriceNo","productName","headCount","maxHeadCount","m2","isDisplay","isPet","isBBQ","isPickup","isStone","fileNo"],grid:{},list:[],audit:!1,totalCount:0,currentPage:1,totalPage:50,lastPage:1}),a={unique:["productNo"],required:["companyId","seasonPriceNo","productName","headCount","maxHeadCount","m2","isDisplay","isPet","isBBQ","isPickup","isStone","fileNo"]};let s=null;const U=u=>{u==null||u.preventDefault(),C()},C=()=>{k.getProductList({...r,page:e.currentPage,totalPage:e.totalPage}).then(u=>{var o,d,i,p;e.list=(o=u.data)==null?void 0:o.list,e.totalCount=(d=u.data)==null?void 0:d.totalCount,e.currentPage=(i=u.data)==null?void 0:i.currentPage,e.lastPage=(p=u.data)==null?void 0:p.lastPage,e.grid&&e.grid.updateSettings({data:e.list})},u=>{console.log(u)})},H=u=>{e.currentPage=u,C()},$=()=>{const u={...m.commonAddColumns,productNo:"",companyId:"",seasonPriceNo:"",productName:"",headCount:"",maxHeadCount:"",m2:"",isDisplay:"",isPet:"",isBBQ:"",isPickup:"",isStone:"",memo:"",fileNo:"",...m.auditAddColumns};e.list=m.add({newRow:u,list:e.list,grid:e.grid})},Q=()=>{m.del({selectedRow:s,grid:e.grid})},E=()=>{const u=m.valid({list:e.list,required:a.required});u&&k.setProductList(u).then(()=>{C()})};return L(()=>{const u=document.querySelector("#grid");e.grid=new F(u,{data:e.list,colHeaders:[...m.commonColumnNames,"상품번호","업체아이디","시즌가격번호","상품명","인원수","최대인원수","평형","전시여부","애완동물여부","바베큐여부","픽업여부","온돌여부","메모","파일번호",...m.auditColumnNames],hiddenColumns:m.hiddenColumns([]),columns:[...m.commonColumns,{data:"productNo",type:"numeric",width:150,readOnly:!0},{data:"companyId",type:"text",width:100,readOnly:!0},{data:"seasonPriceNo",type:"numeric",width:150},{data:"productName",type:"text",width:150,className:"underline"},{data:"headCount",type:"numeric",width:150},{data:"maxHeadCount",type:"numeric",width:150},{data:"m2",type:"numeric",width:150},{data:"isDisplay",type:"dropdown",width:150,source:function(o,d){var i;d((i=c.codeList.isDisplay)==null?void 0:i.map(p=>p.codeValue))}},{data:"isPet",type:"dropdown",width:150,source:function(o,d){var i;d((i=c.codeList.isPet)==null?void 0:i.map(p=>p.codeValue))}},{data:"isBBQ",type:"dropdown",width:150,source:function(o,d){var i;d((i=c.codeList.isBBQ)==null?void 0:i.map(p=>p.codeValue))}},{data:"isPickup",type:"dropdown",width:150,source:function(o,d){var i;d((i=c.codeList.isPickup)==null?void 0:i.map(p=>p.codeValue))}},{data:"isStone",type:"dropdown",width:150,source:function(o,d){var i;d((i=c.codeList.isStone)==null?void 0:i.map(p=>p.codeValue))}},{data:"memo",type:"text",width:150},{data:"fileNo",type:"numeric",width:150},...m.auditColumns],cells:function(o,d){return m.cellsEvent({row:o,col:d,grid:e.grid,self:this,pk:[]})},afterChange(o,d){m.afterChangeEvent({changes:o,source:d,gridProps:a,grid:e.grid,self:this})},afterSelectionEnd:function(o,d,i,p){s=o},afterOnCellMouseDown:(o,d)=>{const i=e.grid.getColHeader(d.col),p=e.grid.getSourceDataAtRow(d.row);i==="상품명"&&p&&(l.value=p,g.value=!0)},...m.defaultProps}),C()}),(u,o)=>(B(),q(R,null,[t("form",{class:"search",onSubmit:U,onKeyup:A(U,["enter"])},[t("fieldset",null,[o[19]||(o[19]=t("legend",null,"검색",-1)),t("table",null,[o[18]||(o[18]=t("colgroup",null,[t("col",{style:{width:"80px"}}),t("col",{style:{width:"30%"}}),t("col",{style:{width:"80px"}}),t("col")],-1)),t("tbody",null,[y(t("tr",null,[o[12]||(o[12]=t("th",{scope:"row"},"업체아이디",-1)),t("td",_,[y(t("input",{type:"text","onUpdate:modelValue":o[0]||(o[0]=d=>r.companyId=d)},null,512),[[P,r.companyId]])])],512),[[v,N(c).userInfo.companyId==="kaisa"]]),t("tr",null,[o[13]||(o[13]=t("th",{scope:"row"},"상품명",-1)),t("td",tt,[y(t("input",{type:"text","onUpdate:modelValue":o[1]||(o[1]=d=>r.productName=d)},null,512),[[P,r.productName]])])])]),y(t("tbody",at,[t("tr",null,[o[14]||(o[14]=t("th",{scope:"row"},"수정기간",-1)),t("td",ot,[w(j,{format:"yyyy-MM-dd",date:[r.startUpdateDt,r.endUpdateDt],onSetStartDate:o[2]||(o[2]=d=>{r.startUpdateDt=d.date}),onSetEndDate:o[3]||(o[3]=d=>{r.endUpdateDt=d.date})},null,8,["date"])])]),t("tr",null,[o[15]||(o[15]=t("th",{scope:"row"},"등록일",-1)),t("td",et,[w(J,{format:"yyyy-MM-dd",date:[r.createDt],onSetStartDate:o[4]||(o[4]=d=>{r.createDt=d.date})},null,8,["date"])])]),t("tr",null,[o[16]||(o[16]=t("th",{scope:"row"},"수정ID",-1)),t("td",null,[y(t("input",{type:"text","onUpdate:modelValue":o[5]||(o[5]=d=>r.updater=d)},null,512),[[P,r.updater]])]),o[17]||(o[17]=t("th",{scope:"row"},"등록ID",-1)),t("td",null,[y(t("input",{type:"text","onUpdate:modelValue":o[6]||(o[6]=d=>r.creator=d)},null,512),[[P,r.creator]])])])],512),[[v,e.audit]])])]),t("div",dt,[t("span",nt,[t("button",{type:"button",class:"button add",onClick:$},o[20]||(o[20]=[t("span",{class:"icon"},"",-1),b("추가")])),t("button",{type:"button",class:"button del",onClick:Q},o[21]||(o[21]=[t("span",{class:"icon"},"",-1),b("삭제")])),t("button",{type:"button",class:"button save",onClick:E},o[22]||(o[22]=[t("span",{class:"icon"},"",-1),b("저장")])),t("button",{type:"button",class:"button reset",onClick:o[7]||(o[7]=d=>N(m).reload())},o[23]||(o[23]=[t("span",{class:"icon"},'"',-1),b("초기화")]))]),t("button",{type:"button",class:"audit",onClick:o[8]||(o[8]=d=>e.audit=!e.audit)},"상세조회"),o[26]||(o[26]=t("button",{type:"submit",class:"button3"},[t("span",{class:"icon"},"")],-1)),t("button",{type:"reset",onClick:o[9]||(o[9]=d=>N(m).reload())},o[24]||(o[24]=[t("span",{class:"icon"},'"',-1)])),t("button",{type:"button",class:"button excel",onClick:o[10]||(o[10]=d=>N(T).excelExport(e.grid,"상품"))},o[25]||(o[25]=[t("span",{class:"icon"},"",-1)])),t("div",lt,"총 "+D(e.totalCount)+"건",1)])],32),o[27]||(o[27]=t("div",{id:"grid",class:"grid-container"},null,-1)),y(t("div",st,"조회 내역이 없습니다.",512),[[v,e.list.length===0]]),w(G,{currentPage:e.currentPage,lastPage:e.lastPage,"onUpdate:page":H},null,8,["currentPage","lastPage"]),g.value?(B(),O(W,{key:0,component:h,data:l.value,show:g.value,onClose:o[11]||(o[11]=d=>g.value=!1)},null,8,["data","show"])):K("",!0)],64))}});export{gt as default};
