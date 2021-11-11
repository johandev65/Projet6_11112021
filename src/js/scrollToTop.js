document.addEventListener("scroll", handleScroll);

let scrollToTopBtn = document.querySelector(".scrollToTopBtn");

function handleScroll() {
    let scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let ratio = 0.15;

    if ((document.documentElement.scrollTop / scrollableHeight ) > ratio) {
        //show button
        scrollToTopBtn.style.display = "block";
    } else {
        //hide button
        scrollToTopBtn.style.display = "none";
    }
}

scrollToTopBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}