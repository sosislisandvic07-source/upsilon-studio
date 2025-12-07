// takip.js - Sipariş Takip Mantığı (Supabase Entegre)

// 1. AYARLAR: Supabase bağlantı bilgileri
const SUPABASE_URL = 'https://vcbsxcrirxysdegbsarj.supabase.co'; // Senin URL'in
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjYnN4Y3Jpcnh5c2RlZ2JzYXJqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDk0NTg2NCwiZXhwIjoyMDgwNTIxODY0fQ.Ytra2pf5hgt33g8beesZAsMyFogQ2EmneOAQS1wHS9w'; // Anon Key (Sadece okuma yetkisi yeterli)
const TABLE_NAME = 'requests'; 
const API_ENDPOINT = `${SUPABASE_URL}/rest/v1/${TABLE_NAME}`;


document.addEventListener('DOMContentLoaded', () => {
    const sorgulaBtn = document.getElementById('sorgula-btn');
    const inputAlan = document.getElementById('proje-kodu');
    const sorgulamaAlani = document.querySelector('.sorgulama-alani');
    const sonucDiv = document.getElementById('proje-sonucu');

    // 2. URL'den Sipariş Kodunu Otomatik Çekme
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        inputAlan.value = code;
        sorgulamaAlani.insertAdjacentHTML('beforebegin', 
            `<div id="bilgilendirme" style="background: #2a2a47; padding: 10px; border-radius: 8px; margin-bottom: 20px; color: #fff;">
                ✅ Siparişiniz alındı! Takip kodunuz: <strong>${code}</strong>
            </div>`
        );
        setTimeout(() => {
            sorgulaBtn.click(); // Otomatik sorgulamayı başlat
        }, 500); 
    }
    
    // 3. SORGULAMA İŞLEVİ (SUPABASE'DEN VERİ ÇEKME)
    sorgulaBtn.addEventListener('click', async () => {
        const kod = inputAlan.value.toUpperCase().trim();

        if (!kod) {
            sonucDiv.innerHTML = `<p style="color:red; text-align: center;">Lütfen bir proje kodu girin.</p>`;
            return;
        }

        sonucDiv.innerHTML = `<p style="color:white; text-align: center;">Sorgulanıyor...</p>`;

        try {
            // Supabase API'ye GET isteği at (Project Code'a göre filtrele)
            const response = await fetch(`${API_ENDPOINT}?project_code=eq.${kod}&select=*`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_KEY
                }
            });

            if (!response.ok) {
                throw new Error(`API Hatası: ${response.status}`);
            }

            const projects = await response.json();

            if (projects.length === 0) {
                sonucDiv.innerHTML = `<p style="color:red; text-align: center;">Hata: "${kod}" kodlu aktif proje bulunamadı. Lütfen kodu kontrol edin.</p>`;
                return;
            }

            // Veri bulundu, ekrana yazdır
            const proje = projects[0];
            renderProjectDetails(proje, sonucDiv);

        } catch (error) {
            sonucDiv.innerHTML = `<p style="color:red; text-align: center;">Sunucu hatası oluştu: ${error.message}</p>`;
            console.error('Takip Sorgulama Hatası:', error);
        }
    });

    // 4. DETAYLARI EKRANA YAZMA İŞLEVİ
    function renderProjectDetails(proje, container) {
        let durumClass = proje.status === 'tamamlandı' ? 'tamamlandi' : proje.status === 'başladı' ? 'baslandi' : 'beklemede';
        let adminNotuHTML = proje.admin_note ? 
            `<div class="admin-notu"><i class="fas fa-info-circle"></i> Admin Notu: ${proje.admin_note}</div>` : '';
        
        // PHP'de ikon bilgisi olmadığı için, hizmet tipine göre ikon atıyoruz
        const getIconClass = (service) => {
            if (service.includes('Builder')) return 'fas fa-mountain';
            if (service.includes('GFX')) return 'fas fa-palette';
            if (service.includes('Yazılım')) return 'fas fa-code';
            return 'fas fa-tools';
        };

        container.innerHTML = `
            <div class="proje-icon"><i class="${getIconClass(proje.service_type)}"></i></div>
            <div class="proje-header">
                <h2>${proje.service_type}</h2>
                <span class="durum-tag ${durumClass}">${proje.status.charAt(0).toUpperCase() + proje.status.slice(1)}</span>
            </div>
            <p class="musteri-adi">Müşteri: ${proje.discord_username}</p>
            <div class="ilerleme-bar">
                <div class="ilerleme-fill" style="width: ${proje.progress}%;"></div>
            </div>
            <p class="ilerleme-yazi">İlerleme: %${proje.progress}</p>
            <p class="son-guncelleme">Kayıt Tarihi: ${new Date(proje.created_at).toLocaleString()}</p>
            ${adminNotuHTML}
        `;
    }
});