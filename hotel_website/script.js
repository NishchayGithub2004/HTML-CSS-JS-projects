let nav = document.querySelector(".navbar");

window.onscroll = function () {
    if (document.documentElement.scrollTop > 50) {
        nav.classList.add("header-scrolled");
    } else {
        nav.classList.remove("header-scrolled");
    }
}

let navBar = document.querySelectorAll(".nav-link");

let navCollapse = document.querySelector(".navbar-collapse.collapse");

navBar.forEach(function (a) {
    a.addEventListener("click", function () {
        navCollapse.classList.remove("show");
    })
})

var swiper = new Swiper(".mySwiper", {
    direction: "horizontal",
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3500,
    },
});

var swiper = new Swiper(".our-partner", {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 2000,
    },
    
    breakpoints: {
        '991': {
            slidesPerView: 5,
            spaceBetween: 10,
        },
        '767': {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        '320': {
            slidesPerView: 2,
            spaceBetween: 8,
        },
    },
});

let subscribeButton = document.getElementsByClassName("subscribe-btn")[0];

subscribeButton.addEventListener("click", function () {
    if (subscribeButton.textContent == "Subscribed") {
        subscribeButton.textContent = "Subscribe";
        alert("You have successfully unsubscribed!");
    } else {
        subscribeButton.textContent = "Subscribed";
        alert("You have successfully subscribed!");
    }
});