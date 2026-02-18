window.toggleProfile = function() {
    const panel = document.getElementById('company-profile');
    if (!panel) return;
    
    if (panel.classList.contains('translate-y-full')) {
        panel.classList.replace('translate-y-full', 'translate-y-0');
        document.body.style.overflow = 'hidden';
    } else {
        panel.classList.replace('translate-y-0', 'translate-y-full');
        document.body.style.overflow = 'auto';
    }
};

// Info Slide
let currentInfo = 0;
const infoItems = document.querySelectorAll('.info-fade');
setInterval(() => {
    if(infoItems.length) {
        infoItems[currentInfo].classList.remove('active');
        currentInfo = (currentInfo + 1) % infoItems.length;
        infoItems[currentInfo].classList.add('active');
    }
}, 4000);
