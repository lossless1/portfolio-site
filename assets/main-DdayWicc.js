(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const i=document.querySelector(".theme-toggle"),m=document.body,u=document.querySelector(".mobile-menu"),h=document.querySelector(".nav-links"),b=document.querySelectorAll(".nav-link"),v=document.querySelectorAll(".animate-text, .animate-image"),L=document.querySelectorAll(".skill-level"),E=document.querySelectorAll(".stat-number"),g=document.querySelectorAll(".filter-btn"),w=document.querySelectorAll(".project-card"),c=document.getElementById("contact-form"),d=(e,t=100)=>{const o=e.getBoundingClientRect();return o.top<=(window.innerHeight-t||document.documentElement.clientHeight-t)&&o.bottom>=0},S=()=>{m.classList.toggle("dark-mode"),m.classList.contains("dark-mode")?(i.innerHTML='<i class="fas fa-sun"></i>',localStorage.setItem("theme","dark")):(i.innerHTML='<i class="fas fa-moon"></i>',localStorage.setItem("theme","light"))};localStorage.getItem("theme")==="dark"?(m.classList.add("dark-mode"),i.innerHTML='<i class="fas fa-sun"></i>'):i.innerHTML='<i class="fas fa-moon"></i>';const p=()=>{h.classList.toggle("active"),u.classList.toggle("active"),u.querySelectorAll(".bar").forEach(t=>t.classList.toggle("animate"))},y=()=>{v.forEach(e=>{d(e)&&e.classList.add("show")}),L.forEach(e=>{if(d(e.parentElement)){const t=e.getAttribute("data-level");e.style.width=`${t}%`}}),E.forEach(e=>{if(d(e)&&!e.classList.contains("counted")){const t=parseInt(e.getAttribute("data-count"));let o=0;const a=setInterval(()=>{e.textContent=o,o>=t&&clearInterval(a),o=Math.ceil(o+t/30),o>t&&(o=t)},30);e.classList.add("counted")}})},I=e=>{w.forEach(t=>{const o=t.getAttribute("data-category");e==="all"||o===e?(t.style.display="block",setTimeout(()=>{t.style.opacity="1",t.style.transform="scale(1)"},10)):(t.style.opacity="0",t.style.transform="scale(0.8)",setTimeout(()=>{t.style.display="none"},300))})},T=e=>{const t=document.querySelector(e);window.scrollTo({top:t.offsetTop-80,behavior:"smooth"})},A=()=>{const t=new URLSearchParams(window.location.search).get("section");if(t){const o=document.getElementById(t);o&&setTimeout(()=>{window.scrollTo({top:o.offsetTop-80,behavior:"smooth"})},500)}},q=async e=>{e.preventDefault();const t=document.getElementById("name"),o=document.getElementById("email"),a=document.getElementById("subject"),s=document.getElementById("message"),r=c.querySelector('button[type="submit"]');let n=!0;if(t.value.trim()===""?(n=!1,t.classList.add("error")):t.classList.remove("error"),o.value.trim()===""||!x(o.value)?(n=!1,o.classList.add("error")):o.classList.remove("error"),a.value.trim()===""?(n=!1,a.classList.add("error")):a.classList.remove("error"),s.value.trim()===""?(n=!1,s.classList.add("error")):s.classList.remove("error"),n){r.disabled=!0,r.textContent="Sending...";try{if((await fetch("https://formspree.io/f/xgvznboz",{method:"POST",body:new FormData(c),headers:{Accept:"application/json"}})).ok){const l=document.createElement("div");l.className="success-message",l.textContent="Message sent successfully!",c.appendChild(l),c.reset(),setTimeout(()=>{l.remove()},3e3)}else throw new Error("Form submission failed")}catch(f){console.error("Error submitting form:",f),alert("There was an error sending your message. Please try again.")}finally{r.disabled=!1,r.textContent="Send Message"}}},x=e=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase()),M=()=>{const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e)};document.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>{y()},100),i.addEventListener("click",S),u.addEventListener("click",p),window.addEventListener("scroll",y),b.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const o=e.getAttribute("href");T(o),h.classList.contains("active")&&p()})}),g.forEach(e=>{e.addEventListener("click",()=>{g.forEach(o=>o.classList.remove("active")),e.classList.add("active");const t=e.getAttribute("data-filter");I(t)})}),c&&c.addEventListener("submit",q),M(),A()});window.addEventListener("popstate",e=>{if(e.state&&e.state.section){const t=document.getElementById(e.state.section);t&&window.scrollTo({top:t.offsetTop-80,behavior:"smooth"})}});window.addEventListener("load",()=>{const e=document.querySelector(".preloader");e&&(e.style.opacity="0",setTimeout(()=>{e.style.display="none"},500))});
