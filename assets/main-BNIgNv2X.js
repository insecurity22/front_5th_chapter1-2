import"./modulepreload-polyfill-B5Qt9EMX.js";import{c as d,r as c,a as o,g as a,H as p,U as w,b as s,P,F as b,L as f}from"./render-BragBjo9.js";function m(){var e;const t=(e=window.location.pathname)==null?void 0:e.replace(/\/$/,""),r=window.location.hash.substring(1),n=t+r;history.replaceState(null,null,n)}m();const i="/front_5th_chapter1-2/",S=t=>{const{subscribe:r,notify:n}=d(),e=()=>window.location.pathname.replace(i,"/"),l=()=>t[e()],u=h=>{const g=`${i}${h.replace("/","")}`;window.history.pushState(null,null,g),n()};return window.addEventListener("popstate",()=>n()),{get path(){return e()},push:u,subscribe:r,getTarget:l}};c.set(S({"/":p,"/login":()=>{const{loggedIn:t}=a.getState();if(t)throw new b;return s(f,null)},"/profile":()=>{const{loggedIn:t}=a.getState();if(!t)throw new w;return s(P,null)}}));function y(){c.get().subscribe(o),a.subscribe(o),o()}y();
