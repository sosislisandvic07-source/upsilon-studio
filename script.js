// --- AYARLAR ---
const SUPABASE_URL = 'https://xluhcznbhswnaerixihn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsdWhjem5iaHN3bmFlcml4aWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MjA5OTAsImV4cCI6MjA3OTQ5Njk5MH0.s8XLeknIwHitGN2qUSQkMiBoS9yCSQQsoUS7MN6fFHE';
const DISCORD_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1441523888952447006/5aW7iOLcKCabtM9SPB6g-fW-rL9qv5VHeTgrzUrn7i8UV2mBFYBtTH5sfElPanO-7hww';

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- DİL VERİLERİ (VİZYON/MİSYON DAHİL) ---
const translations = {
    tr: {
        status_open: "SİPARİŞ: <b>AÇIK</b>",
        nav_about: "Hakkımızda", nav_services: "Hizmetler", nav_pricing: "Fiyatlar", nav_calc: "Hesapla", nav_portfolio: "Galeri", nav_team: "Ekip", nav_contact: "Sipariş",
        hero_title: "Hayallerinizi Roblox'a Taşıyoruz", hero_desc: "Profesyonel Scripting, Building ve Tasarım Çözümleri.",
        hero_btn1: "Fiyatları Gör", hero_btn2: "Bize Ulaşın",
        announce_text: "🎉 YENİ BAŞLAYANLARA ÖZEL KAMPANYA!", announce_link: "Detaylar için tıkla.",
        stat_1: "Tamamlanan Proje", stat_2: "Uzman Personel", stat_3: "% Müşteri Memnuniyeti",
        about_title: "Vizyon & Misyon",
        vision_title: "Vizyonumuz", vision_desc: "Roblox evreninde sınırları zorlayan, yenilikçi ve global çapta tanınan lider bir oyun stüdyosu olmak.",
        mission_title: "Misyonumuz", mission_desc: "Her seviyeden geliştiriciye profesyonel, erişilebilir ve yaratıcı çözümler sunarak hayalleri gerçeğe dönüştürmek.",
        process_title: "Nasıl Çalışıyoruz?",
        proc_1_t: "Talep", proc_1_d: "Formu doldur.", proc_2_t: "Anlaşma", proc_2_d: "Fiyat ve kapora.",
        proc_3_t: "Geliştirme", proc_3_d: "Yapım aşaması.", proc_4_t: "Teslimat", proc_4_d: "Dosya teslimi.",
        serv_1_desc: "Ananas liderliğinde, hatasız sistemler, GUI ve AI kodlama.",
        serv_2_desc: "YsB imzalı haritalar ve Nakarat imzalı detaylı 3D modeller.",
        serv_3_desc: "Oyun kapakları, logolar ve kullanıcı arayüzü tasarımları.",
        price_std: "Standart Fiyatlar", price_camp: "🚀 Yeni Başlayan Kampanyası",
        p_sub_1: "Saatlik Ücret", p_sub_2: "Sistem Bazlı", p_sub_3: "Model Bazlı",
        camp_alert: "⚠️ DİKKAT: Bu fiyatlar sadece ilk kez oyun yapacaklar içindir.", time_left: "Kalan Süre:",
        nav_faq: "SSS", faq_q1: "Ödeme Yöntemleri?", faq_a1: "IBAN, Nitro, Hediye Kartı.", faq_q2: "Teslimat Süresi?", faq_a2: "1-10 gün.", faq_q3: "İade?", faq_a3: "Kapora iadesi yok.",
        calc_desc: "Tahmini fiyat aralığı.", calc_size: "Büyüklük", calc_extra: "Ekstralar", calc_total: "Tahmini Tutar:",
        form_name: "İsim", form_service: "Hizmet", form_details: "Detaylar", form_tos: "Hizmet Sözleşmesi'ni okudum.", form_submit: "Gönder"
    },
    en: {
        status_open: "ORDER: <b>OPEN</b>",
        nav_about: "About Us", nav_services: "Services", nav_pricing: "Pricing", nav_calc: "Calculator", nav_portfolio: "Gallery", nav_team: "Team", nav_contact: "Order",
        hero_title: "Bringing Dreams to Roblox", hero_desc: "Professional Scripting, Building, and Design Solutions.",
        hero_btn1: "See Prices", hero_btn2: "Contact Us",
        announce_text: "🎉 SPECIAL OFFER FOR BEGINNERS!", announce_link: "Click for details.",
        stat_1: "Completed Projects", stat_2: "Expert Staff", stat_3: "% Customer Satisfaction",
        about_title: "Vision & Mission",
        vision_title: "Our Vision", vision_desc: "To be a global leader pushing boundaries in the Roblox universe.",
        mission_title: "Our Mission", mission_desc: "Turning dreams into reality by providing professional solutions for all developers.",
        process_title: "How We Work?",
        proc_1_t: "Request", proc_1_d: "Fill the form.", proc_2_t: "Agreement", proc_2_d: "Price & Deposit.",
        proc_3_t: "Development", proc_3_d: "Building phase.", proc_4_t: "Delivery", proc_4_d: "File delivery.",
        serv_1_desc: "Bug-free systems, GUI, and AI coding led by Ananas.",
        serv_2_desc: "Detailed maps by YsB and 3D models by Nakarat.",
        serv_3_desc: "Game covers, logos, and user interface designs.",
        price_std: "Standard Prices", price_camp: "🚀 Beginner Campaign",
        p_sub_1: "Hourly Rate", p_sub_2: "System Based", p_sub_3: "Model Based",
        camp_alert: "⚠️ NOTICE: These prices are only for first-time developers.", time_left: "Time Left:",
        nav_faq: "FAQ", faq_q1: "Payment?", faq_a1: "Bank Transfer, Nitro, Gift Card.", faq_q2: "Delivery?", faq_a2: "1-10 days.", faq_q3: "Refund?", faq_a3: "No deposit refund.",
        calc_desc: "Estimated price range.", calc_size: "Size", calc_extra: "Extras", calc_total: "Estimated Total:",
        form_name: "Name", form_service: "Service", form_details: "Details", form_tos: "I read the TOS.", form_submit: "Submit"
    }
};

let currentLang = 'tr';

// --- DİL DEĞİŞTİRME ---
document.getElementById('lang-btn').addEventListener('click', () => {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    document.getElementById('lang-btn').innerText = currentLang === 'tr' ? 'EN' : 'TR';
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[currentLang][key]) el.innerHTML = translations[currentLang][key];
    });
});

// --- PRELOADER ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => { preloader.style.display = 'none'; }, 500);
    checkCookies();
});

// --- ÇEREZ KONTROLÜ ---
function checkCookies() {
    if (!localStorage.getItem('cookiesAccepted')) { document.getElementById('cookieBanner').style.display = 'flex'; } 
    else { document.getElementById('cookieBanner').style.display = 'none'; }
}
function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookieBanner').style.display = 'none';
}

// --- AKORDEON ---
window.toggleAcc = function(header) {
    const item = header.parentElement;
    const body = header.nextElementSibling;
    document.querySelectorAll('.acc-item').forEach(other => { if(other !== item) { other.classList.remove('active'); other.querySelector('.acc-body').style.maxHeight = null; } });
    item.classList.toggle('active');
    if (item.classList.contains('active')) { body.style.maxHeight = body.scrollHeight + "px"; } else { body.style.maxHeight = null; }
}

// --- MODALS ---
window.openModal = function(id) { document.getElementById(id).style.display = "flex"; }
window.closeModal = function(id) { document.getElementById(id).style.display = "none"; }
window.onclick = function(e) { if (e.target.classList.contains('modal')) e.target.style.display = "none"; }

// --- SAYAÇ ---
const countDownDate = new Date().getTime() + (90 * 24 * 60 * 60 * 1000); 
setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const elem = document.getElementById("countdown-timer");
    if(elem) elem.innerHTML = days + "g " + hours + "s " + minutes + "dk ";
}, 1000);

// --- FİYAT GEÇİŞİ ---
window.showPricing = function(type) {
    const std = document.getElementById('standard-pricing');
    const cmp = document.getElementById('campaign-pricing');
    const btns = document.querySelectorAll('.toggle-btn');
    if (type === 'campaign') { std.style.display = 'none'; cmp.style.display = 'grid'; btns[0].classList.remove('active'); btns[1].style.background = '#ffcc00'; btns[1].style.color = 'black'; } 
    else { cmp.style.display = 'none'; std.style.display = 'grid'; btns[1].style.background = '#111'; btns[1].style.color = '#888'; btns[0].classList.add('active'); }
}

// --- SCROLL TOP ---
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.onscroll = function() { scrollTopBtn.style.display = (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) ? "block" : "none"; };
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

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

// --- SİPARİŞ & TAKİP ---
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
    if (error) { alert("Hata!"); } 
    else {
        fetch(DISCORD_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: "📢 **Yeni Sipariş!**", embeds: [{ title: "Upsilon Sipariş", color: 3447003, fields: [{ name: "Müşteri", value: formData.client_name }, { name: "Hizmet", value: formData.service_type }] }] }) });
        alert("Alındı!"); document.getElementById('orderForm').reset();
    }
    btn.disabled = false; btn.innerText = currentLang === 'tr' ? "Gönder" : "Submit";
});

window.trackOrder = async function() {
    const username = document.getElementById('trackInput').value;
    const box = document.getElementById('trackResult');
    if (!username) return alert("İsim giriniz!");
    box.innerHTML = '<p style="color:var(--primary);">Aranıyor...</p>';
    const { data: orders } = await sb.from('requests').select('*').eq('discord_username', username).order('created_at', { ascending: false });
    if (!orders || orders.length === 0) { box.innerHTML = '<p>Sipariş bulunamadı.</p>'; return; }
    box.innerHTML = '';
    orders.forEach(o => {
        let color = o.status === 'Hazırlanıyor' ? 'var(--primary)' : (o.status === 'Tamamlandı' ? '#00cc66' : '#ffcc00');
        box.innerHTML += `<div style="background:#222; padding:15px; margin-bottom:10px; border-radius:5px; border-left:4px solid ${color}"><h3>${o.service_type} <span style="font-size:0.8rem; background:${color}; color:black; padding:2px 8px; border-radius:4px; float:right">${o.status}</span></h3><p style="color:#aaa; font-size:0.9rem;">${o.details}</p></div>`;
    });
}

// --- İSTATİSTİK SAYACI ---
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