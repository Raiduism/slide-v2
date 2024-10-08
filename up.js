
const scrollTopBtn = document.getElementById("scrollTopBtn");

 
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }

    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
        const rect = highlight.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            highlight.classList.add('animate-highlight');
        } else {
            highlight.classList.remove('animate-highlight');
        }
    });
};


scrollTopBtn.onclick = function() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
};