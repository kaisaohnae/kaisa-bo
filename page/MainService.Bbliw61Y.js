import{a as r}from"./apiConfig.Cb5X9RbM.js";class s{async dashboard(a){return(await r("/common/dashboard",a||{})).data}async calendar(a){return(await r("/common/calendar",a||{})).data}}const c=new s;export{c as M};