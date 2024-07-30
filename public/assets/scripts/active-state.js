//NAVBAR
const navLinksElements = document.querySelectorAll('.menu-item');
const windowPathName = window.location.pathname;

navLinksElements.forEach(e => {
    const navLinkPathName = new URL(e.href).pathname;
    if(windowPathName === navLinkPathName){
        e.classList.add('active');
    }
});

const btnHamburguer = document.querySelector('.hamburger');
const navResponsive = document.querySelector('.nav-responsive');

btnHamburguer.addEventListener('click', function() {
    if (!navResponsive.classList.contains("active")){
        navResponsive.classList.add("active");
    }else{
        navResponsive.classList.remove("active");
    }
    
});


//BREADCRUMBS
const breadCrumbLinksElements = document.querySelectorAll('.breadcrumbs-link');

breadCrumbLinksElements.forEach(e => {
    const breadLinkPathName = new URL(e.href).pathname;
    if(windowPathName === breadLinkPathName){
        e.classList.add('active');
    }
});