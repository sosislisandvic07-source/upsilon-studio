// --- AYARLAR ---
const SUPABASE_URL = 'https://xluhcznbhswnaerixihn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsdWhjem5iaHN3bmFlcml4aWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MjA5OTAsImV4cCI6MjA3OTQ5Njk5MH0.s8XLeknIwHitGN2qUSQkMiBoS9yCSQQsoUS7MN6fFHE';
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1441523888952447006/5aW7iOLcKCabtM9SPB6g-fW-rL9qv5VHeTgrzUrn7i8UV2mBFYBtTH5sfElPanO-7hww';

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- DİL DEĞİŞTİRME ---
const translations = {
    tr: { status_open: "SİPARİŞ: <b>AÇIK</b>" },
    en: { status_open: "ORDER: <b>OPEN</b>" }
};
let currentLang = 'tr';
document.getElementById('lang-btn').addEventListener('click', () => {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    document.getElementById('lang-btn').innerText = currentLang === 'tr' ? 'EN' : 'TR';
    // Dil değiştirme mantığı buraya eklenebilir (Şimdilik basit tuttum)
});

// --- PRELOADER ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if(preloader) { preloader.style.opacity = '0'; setTimeout(() => { preloader.style.display = 'none'; }, 500); }
    checkCookies();
});

// --- ÇEREZ ---
function checkCookies() {
    if (!localStorage.getItem('cookiesAccepted')) { document.getElementById('cookieBanner').style.display = 'flex'; } 
    else { document.getElementById('cookieBanner').style.display = 'none'; }
}
function acceptCookies() { localStorage.setItem('cookiesAccepted', 'true'); document.getElementById('cookieBanner').style.display = 'none'; }

// --- SAYAÇ ---
const countDownDate = new Date().getTime() + (90 * 24 * 60 * 60 * 1000); 
setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const elem = document.getElementById("countdown-timer");
    if(elem) elem.innerHTML = days + "g " + hours + "s ";
}, 1000);

// --- FİYAT GEÇİŞİ ---
window.showPricing = function(type) {
    const std = document.getElementById('standard-pricing');
    const cmp = document.getElementById('campaign-pricing');
    const btns = document.querySelectorAll('.toggle-btn');
    if (type === 'campaign') { std.style.display = 'none'; cmp.style.display = 'grid'; btns[0].classList.remove('active'); btns[1].style.background = '#ffcc00'; btns[1].style.color = 'black'; } 
    else { cmp.style.display = 'none'; std.style.display = 'grid'; btns[1].style.background = '#111'; btns[1].style.color = '#888'; btns[0].classList.add('active'); }
}

// --- AKORDEON ---
window.toggleAcc = function(header) {
    const item = header.parentElement;
    const body = header.nextElementSibling;
    item.classList.toggle('active');
    if (item.classList.contains('active')) { body.style.maxHeight = body.scrollHeight + "px"; } else { body.style.maxHeight = null; }
}

// --- MODAL ---
window.openModal = function(id) { document.getElementById(id).style.display = "flex"; }
window.closeModal = function(id) { document.getElementById(id).style.display = "none"; }
window.onclick = function(e) { if (e.target.classList.contains('modal')) e.target.style.display = "none"; }

// --- HESAPLAYICI ---
window.calculatePrice = function() {
    const servicePrice = parseFloat(document.getElementById('calcService').value) || 0;
    const sizeMultiplier = parseFloat(document.getElementById('calcSize').value) || 1;
    let extrasTotal = 0;
    document.querySelectorAll('.calc-extra:checked').forEach(cb => extrasTotal += parseFloat(cb.value));
    let total = (servicePrice * sizeMultiplier) + extrasTotal;
    const display = document.getElementById('totalPrice');
    if (servicePrice === 0) { display.innerText = "0 ₺"; } 
    else { let minPrice = total; let maxPrice = total * 1.3; display.innerText = `${minPrice} - ${Math.floor(maxPrice)} ₺`; }
}

// --- SİPARİŞ GÖNDERME ---
document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.querySelector('button[type="submit"]');
    btn.disabled = true; btn.innerText = "...";
    const formData = {
        client_name: document.getElementById('clientName').value,
        discord_username: document.getElementById('discordUser').value,
        service_type: document.getElementById('serviceType').value,
        details: document.getElementById('projectDetails').value
    };
    const { error } = await sb.from('requests').insert({ ...formData, status: 'Beklemede' });
    if (error) { alert("Hata! Lütfen tekrar deneyin."); console.error(error); } 
    else {
        fetch(DISCORD_WEBHOOK_URL, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: "📢 **Yeni Sipariş!** @everyone",
                embeds: [{ title: "Upsilon Sipariş", color: 3447003, fields: [{ name: "Müşteri", value: formData.client_name }, { name: "Hizmet", value: formData.service_type }] }]
            })
        });
        alert("Talebiniz alındı!"); document.getElementById('orderForm').reset();
    }
    btn.disabled = false; btn.innerText = "Gönder";
});

// --- SİPARİŞ TAKİP (BU EKSİKTİ, GERİ GELDİ!) ---
window.trackOrder = async function() {
    const username = document.getElementById('trackInput').value;
    const box = document.getElementById('trackResult');
    if (!username) return alert("İsim giriniz!");
    box.innerHTML = '<p style="color:var(--primary);">Aranıyor...</p>';
    const { data: orders } = await sb.from('requests').select('*').eq('discord_username', username).order('created_at', { ascending: false });
    if (!orders || orders.length === 0) { box.innerHTML = '<p>Sipariş bulunamadı.</p>'; return; }
    box.innerHTML = '';
    orders.forEach(o => {
        let color = o.status === 'Hazırlanıyor' ? 'var(--primary)' : (o.status === 'Tamamlandı' ? '#00cc66' : (o.status === 'İptal' ? '#ff3333' : '#ffcc00'));
        box.innerHTML += `<div style="background:#222; padding:15px; margin-bottom:10px; border-radius:5px; border-left:4px solid ${color}"><h3>${o.service_type} <span style="font-size:0.8rem; background:${color}; color:black; padding:2px 8px; border-radius:4px; float:right">${o.status}</span></h3><p style="color:#aaa; font-size:0.9rem;">${o.details}</p></div>`;
    });
}

// --- SAYAÇ ANİMASYON ---
const counters = document.querySelectorAll('.counter');
const speed = 200;
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;
        if (count < target) { counter.innerText = Math.ceil(count + inc); setTimeout(updateCount, 40); } 
        else { counter.innerText = target === 5 ? "5+" : target === 100 ? "%100" : target; }
    };
    let observer = new IntersectionObserver((entries) => { if(entries[0].isIntersecting) updateCount(); });
    observer.observe(counter);
});

// --- MOUSE ---
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');
if(cursor && cursor2){
    document.addEventListener('mousemove', (e) => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; setTimeout(() => { cursor2.style.left = e.clientX + 'px'; cursor2.style.top = e.clientY + 'px'; }, 50); });
    document.addEventListener('mousedown', () => cursor2.classList.add('click-anim'));
    document.addEventListener('mouseup', () => cursor2.classList.remove('click-anim'));
}