(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const l=`<svg class="paper-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
  viewBox="0 0 24 24"
  fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round"
  stroke-linejoin="round">
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
  <path d="M14 2 l4 0 q 2 0 2 2 l0 4" class="fold-corner" stroke-width="0.5" />
  <path d="M14 2 l6 6" class="show-up-line" stroke-width="0.1" />
</svg>`,d=[l],n=document.querySelector(".container");for(const s of d)if(n){n.innerHTML=s;const r=n.querySelector("svg");r&&r.addEventListener("mouseenter",function(){this.classList.add("has-been-hovered")})}
