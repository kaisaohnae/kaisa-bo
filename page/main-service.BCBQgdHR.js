import{a as r}from"./api-config.6OFjWcER.js";class s{async dashboard(a){return(await r("/common/dashboard",a||{})).data}async calendar(a){return(await r("/common/calendar",a||{})).data}}const c=new s;export{c as M};
