// =======================================
// Upsilon Dev Studio - Dinamik Efektler
// =======================================

// 1. AKICI KAYDIRMA (SMOOTH SCROLL) - Sadece Index sayfasında çalışacak
if (document.querySelector('.features-section')) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}


// 2. FEATURE BOX IŞIK HAREKETİ (Fare Takibi) - Sadece Index sayfasında çalışacak
document.querySelectorAll('.feature-box').forEach(box => {
    box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        box.style.setProperty('--mouse-x', `${x}px`);
        box.style.setProperty('--mouse-y', `${y}px`);
    });
});


// 3. SCROLL REVEAL (Kutuların Kayarak Belirmesi) - Sadece Index sayfasında çalışacak
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1 
});

document.querySelectorAll('.feature-box').forEach(box => {
    box.classList.add('scroll-animate');
    observer.observe(box);
});