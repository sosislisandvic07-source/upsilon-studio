// --- AYARLAR ---
const SUPABASE_URL = 'https://xluhcznbhswnaerixihn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsdWhjem5iaHN3bmFlcml4aWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MjA5OTAsImV4cCI6MjA3OTQ5Njk5MH0.s8XLeknIwHitGN2qUSQkMiBoS9yCSQQsoUS7MN6fFHE';

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

function checkLogin() {
    if (document.getElementById('adminPass').value === "upsilon123") {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('dashboard-section').style.display = 'block';
        getOrders();
    } else {
        document.getElementById('login-msg').innerText = "Yanlış şifre!";
    }
}

async function getOrders() {
    const box = document.getElementById('orders-container');
    box.innerHTML = 'Yükleniyor...';
    
    const { data: reqs, error } = await sb.from('requests').select('*').order('created_at', { ascending: false });

    if (error) return box.innerHTML = 'Hata oluştu.';
    if (reqs.length === 0) return box.innerHTML = 'Sipariş yok.';

    box.innerHTML = '';
    reqs.forEach(r => {
        let stClass = r.status === 'Hazırlanıyor' ? 'st-hazirlaniyor' : (r.status === 'Tamamlandı' ? 'st-tamamlandi' : (r.status === 'İptal' ? 'st-iptal' : 'st-beklemede'));
        
        box.innerHTML += `
            <div class="card order-card">
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid #333; padding-bottom:10px;">
                    <span style="color:#0070f3;">#${r.id}</span>
                    <span class="status-badge ${stClass}">${r.status}</span>
                </div>
                <h3>${r.client_name}</h3>
                <p><i class="fab fa-discord"></i> ${r.discord_username}</p>
                <p><strong>Hizmet:</strong> ${r.service_type}</p>
                <div style="background:#111; padding:10px; margin:10px 0; border-radius:4px;">${r.details}</div>
                
                <div style="display:flex; gap:10px; align-items:center;">
                    <select id="sel-${r.id}" style="padding:5px; background:#222; color:white; border:1px solid #444;">
                        <option value="Beklemede" ${r.status === 'Beklemede' ? 'selected' : ''}>Beklemede</option>
                        <option value="Hazırlanıyor" ${r.status === 'Hazırlanıyor' ? 'selected' : ''}>Hazırlanıyor</option>
                        <option value="Tamamlandı" ${r.status === 'Tamamlandı' ? 'selected' : ''}>Tamamlandı</option>
                        <option value="İptal" ${r.status === 'İptal' ? 'selected' : ''}>İptal</option>
                    </select>
                    <button onclick="updateStatus(${r.id})" style="background:#0070f3; color:white; border:none; padding:5px 10px; cursor:pointer; border-radius:3px;">Kaydet</button>
                    
                    <button onclick="deleteOrder(${r.id})" style="background:#ff3333; color:white; border:none; padding:5px 10px; cursor:pointer; margin-left:auto; border-radius:3px;">
                        <i class="fa-solid fa-trash"></i> Sil
                    </button>
                </div>
            </div>
        `;
    });
}

async function updateStatus(id) {
    const newStatus = document.getElementById(`sel-${id}`).value;
    await sb.from('requests').update({ status: newStatus }).eq('id', id);
    alert("Durum güncellendi!");
    getOrders();
}

// SİLME FONKSİYONU
async function deleteOrder(id) {
    if (confirm("Bu siparişi kalıcı olarak silmek istediğinize emin misiniz?")) {
        const { error } = await sb.from('requests').delete().eq('id', id);
        if (!error) {
            alert("Sipariş silindi.");
            getOrders();
        } else {
            alert("Silinemedi.");
        }
    }
}