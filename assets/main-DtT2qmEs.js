(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();const c=document.querySelector(".theme-toggle"),m=document.body,u=document.querySelector(".mobile-menu"),y=document.querySelector(".nav-links"),h=document.querySelectorAll(".nav-link"),v=document.querySelectorAll(".animate-text, .animate-image"),L=document.querySelectorAll(".skill-level"),b=document.querySelectorAll(".stat-number"),f=document.querySelectorAll(".filter-btn"),E=document.querySelectorAll(".project-card"),i=document.getElementById("contact-form"),d=(e,t=100)=>{const o=e.getBoundingClientRect();return o.top<=(window.innerHeight-t||document.documentElement.clientHeight-t)&&o.bottom>=0},w=()=>{m.classList.toggle("dark-mode"),m.classList.contains("dark-mode")?(c.innerHTML='<i class="fas fa-sun"></i>',localStorage.setItem("theme","dark")):(c.innerHTML='<i class="fas fa-moon"></i>',localStorage.setItem("theme","light"))};localStorage.getItem("theme")==="dark"?(m.classList.add("dark-mode"),c.innerHTML='<i class="fas fa-sun"></i>'):c.innerHTML='<i class="fas fa-moon"></i>';const g=()=>{y.classList.toggle("active"),u.classList.toggle("active"),u.querySelectorAll(".bar").forEach(t=>t.classList.toggle("animate"))},p=()=>{v.forEach(e=>{d(e)&&e.classList.add("show")}),L.forEach(e=>{if(d(e.parentElement)){const t=e.getAttribute("data-level");e.style.width=`${t}%`}}),b.forEach(e=>{if(d(e)&&!e.classList.contains("counted")){const t=parseInt(e.getAttribute("data-count"));let o=0;const r=setInterval(()=>{e.textContent=o,o>=t&&clearInterval(r),o=Math.ceil(o+t/30),o>t&&(o=t)},30);e.classList.add("counted")}})},S=e=>{E.forEach(t=>{const o=t.getAttribute("data-category");e==="all"||o===e?(t.style.display="block",setTimeout(()=>{t.style.opacity="1",t.style.transform="scale(1)"},10)):(t.style.opacity="0",t.style.transform="scale(0.8)",setTimeout(()=>{t.style.display="none"},300))})},I=e=>{const t=document.querySelector(e);window.scrollTo({top:t.offsetTop-80,behavior:"smooth"})},T=()=>{const t=new URLSearchParams(window.location.search).get("section");if(t){const o=document.getElementById(t);o&&setTimeout(()=>{window.scrollTo({top:o.offsetTop-80,behavior:"smooth"})},500)}},A=e=>{e.preventDefault();const t=document.getElementById("name"),o=document.getElementById("email"),r=document.getElementById("subject"),s=document.getElementById("message");let n=!0;if(t.value.trim()===""?(n=!1,t.classList.add("error")):t.classList.remove("error"),o.value.trim()===""||!q(o.value)?(n=!1,o.classList.add("error")):o.classList.remove("error"),r.value.trim()===""?(n=!1,r.classList.add("error")):r.classList.remove("error"),s.value.trim()===""?(n=!1,s.classList.add("error")):s.classList.remove("error"),n){const a={name:t.value,email:o.value,subject:r.value,message:s.value};console.log("Form submitted with data:",a);const l=document.createElement("div");l.className="success-message",l.textContent="Message sent successfully!",i.appendChild(l),i.reset(),setTimeout(()=>{l.remove()},3e3)}},q=e=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase()),M=()=>{const e=document.createElement("style");e.textContent=`
    .input-group input.error, .input-group textarea.error {
      border-color: var(--secondary-color);
      box-shadow: 0 0 0 3px rgba(255, 51, 102, 0.1);
    }
    
    .success-message {
      padding: 1rem;
      margin-top: 1rem;
      background-color: rgba(39, 174, 96, 0.1);
      color: #27ae60;
      border-radius: 5px;
      text-align: center;
      font-weight: 500;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .project-card {
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .mobile-menu .bar.animate:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }
    
    .mobile-menu .bar.animate:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu .bar.animate:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }
  `,document.head.appendChild(e)};document.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>{p()},100),c.addEventListener("click",w),u.addEventListener("click",g),window.addEventListener("scroll",p),h.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const o=e.getAttribute("href");I(o),y.classList.contains("active")&&g()})}),f.forEach(e=>{e.addEventListener("click",()=>{f.forEach(o=>o.classList.remove("active")),e.classList.add("active");const t=e.getAttribute("data-filter");S(t)})}),i&&i.addEventListener("submit",A),M(),T()});window.addEventListener("popstate",e=>{if(e.state&&e.state.section){const t=document.getElementById(e.state.section);t&&window.scrollTo({top:t.offsetTop-80,behavior:"smooth"})}});window.addEventListener("load",()=>{const e=document.querySelector(".preloader");e&&(e.style.opacity="0",setTimeout(()=>{e.style.display="none"},500))});
