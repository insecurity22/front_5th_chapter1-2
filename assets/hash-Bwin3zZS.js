import"./modulepreload-polyfill-B5Qt9EMX.js";import{c as h,r as s,a as t,g as o,H as l,U as w,b as a,P as u,F as b,L as f}from"./render-BragBjo9.js";const P=e=>{const{subscribe:i,notify:c}=h(),r=()=>window.location.hash?window.location.hash.slice(1):"/",g=()=>e[r()],n=d=>{window.location.hash=d};return window.addEventListener("hashchange",c),window.addEventListener("load",()=>{window.location.hash||n("/")}),{get path(){return r()},push:n,subscribe:i,getTarget:g}};s.set(P({"/":l,"/login":()=>{const{loggedIn:e}=o.getState();if(e)throw new b;return a(f,null)},"/profile":()=>{const{loggedIn:e}=o.getState();if(!e)throw new w;return a(u,null)}}));function m(){s.get().subscribe(t),o.subscribe(t),t()}m();
