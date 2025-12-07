// --- VERİ YÖNETİMİ (LOCAL STORAGE) ---

// Hafızadan verileri çek
function getOrders() {
    const stored = localStorage.getItem("upsilonOrders");
    return stored ? JSON.parse(stored) : [];
}

// Verileri hafızaya kaydet
function saveOrders(orders) {
    localStorage.setItem("upsilonOrders", JSON.stringify(orders));
}

let currentEditingId = null;

// SAYFA YÜKLENİNCE
document.addEventListener('DOMContentLoaded', function() {
    
    // Giriş Butonu
    const loginBtn = document.getElementById("loginBtn");
    const passInput = document.getElementById("adminPass");

    if(loginBtn) {
        loginBtn.addEventListener('click', tryLogin);
    }
    if(passInput) {
        passInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') tryLogin(); });
    }

    // Menü Geçişleri
    setupMenuNavigation();
});

// --- GLOBAL FONKSİYONLAR (PENCEREYE AÇIK) ---

// 1. GİRİŞ YAP
window.tryLogin = function() {
    const passInput = document.getElementById("adminPass");
    const errorText = document.getElementById("errorText");
    const loginScreen = document.getElementById("loginScreen");
    const adminPanel = document.getElementById("adminPanel");

    if(passInput.value === "UpsilonDev2025") {
        loginScreen.style.opacity = "0";
        setTimeout(() => {
            loginScreen.style.display = "none";
            adminPanel.style.display = "flex";
            renderCustomers(); // Tabloyu doldur
        }, 500);
    } else {
        errorText.innerText = "Hatalı şifre!";
        passInput.style.borderColor = "red";
    }
};

// 2. TABLOYU ÇİZ (Müşterileri Listele)
window.renderCustomers = function() {
    const tbody = document.getElementById("customerTableBody");
    const dashBody = document.getElementById("dashboardTableBody");
    
    if(!tbody) return;

    tbody.innerHTML = "";
    if(dashBody) dashBody.innerHTML = "";

    const orders = getOrders(); // Güncel veriyi çek

    // Müşteriler Sayfası Tablosu
    orders.forEach(order => {
        let statusColor = "active";
        if(order.status === "Bekliyor") statusColor = "pending";
        if(order.status === "Tamamlandı") statusColor = "completed";
        if(order.status === "İptal") statusColor = "pending"; 

        const row = `
            <tr>
                <td><strong>${order.id}</strong></td>
                <td>${order.customer}</td>
                <td>${order.service}</td>
                <td>${order.date}</td>
                <td>${order.price}</td>
                <td><span class="status ${statusColor}">${order.status}</span></td>
                <td>
                    <button class="action-btn" onclick="openEditModal('${order.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    // Dashboard'daki Kısa Tablo (Sadece son 5)
    if(dashBody) {
        orders.slice(0, 5).forEach(order => {
            let statusColor = "active";
            if(order.status === "Bekliyor") statusColor = "pending";
            if(order.status === "Tamamlandı") statusColor = "completed";
            
            const row = `<tr><td>${order.id}</td><td>${order.customer}</td><td>${order.service}</td><td><span class="status ${statusColor}">${order.status}</span></td></tr>`;
            dashBody.innerHTML += row;
        });
    }
};

// admin.js içindeki openEditModal fonksiyonunu bununla değiştir:

window.openEditModal = function(id) {
    const orders = getOrders();
    const order = orders.find(o => o.id === id);
    if(!order) return;

    currentEditingId = id;
    
    document.getElementById("modalID").value = order.id;
    document.getElementById("modalCustomer").value = order.customer;
    document.getElementById("modalStatus").value = order.status;
    
    // YENİ: İndirim Kodunu Getir
    document.getElementById("modalPromo").value = order.promo || "Yok";
    
    document.getElementById("modalProgress").value = order.progressStep || "1";
    document.getElementById("modalEndDate").value = order.endDate || "";
    document.getElementById("modalNote").value = order.adminNote || "";
    
    document.getElementById("editModal").style.display = "flex";
};

// 4. MODAL KAPAT
window.closeModal = function() {
    document.getElementById("editModal").style.display = "none";
    currentEditingId = null;
};

// 5. KAYDET (HAFIZAYI GÜNCELLE)
window.saveChanges = function() {
    if(!currentEditingId) return;

    let orders = getOrders();
    const index = orders.findIndex(o => o.id === currentEditingId);
    
    if(index !== -1) {
        orders[index].status = document.getElementById("modalStatus").value;
        orders[index].progressStep = document.getElementById("modalProgress").value;
        orders[index].endDate = document.getElementById("modalEndDate").value;
        orders[index].adminNote = document.getElementById("modalNote").value;
        
        saveOrders(orders); // Kalıcı kaydet
        
        alert("Sipariş güncellendi!");
        closeModal();
        renderCustomers();
    }
};

// 6. SİL (HAFIZADAN SİL)
window.deleteOrder = function() {
    if(!currentEditingId) return;

    if(confirm("Bu siparişi kalıcı olarak silmek istiyor musunuz?")) {
        let orders = getOrders();
        orders = orders.filter(o => o.id !== currentEditingId); // ID'si eşleşmeyeni tut (silme işlemi)
        saveOrders(orders); // Kalıcı sil
        
        closeModal();
        renderCustomers();
    }
};

// MENÜ GEÇİŞLERİ
function setupMenuNavigation() {
    const menuDash = document.getElementById("menu-dashboard");
    const menuCust = document.getElementById("menu-customers");
    const viewDash = document.getElementById("view-dashboard");
    const viewCust = document.getElementById("view-customers");
    const pageTitle = document.getElementById("page-title");

    if(menuDash && menuCust) {
        menuDash.addEventListener('click', () => {
            viewDash.style.display = "block";
            viewCust.style.display = "none";
            pageTitle.innerText = "Genel Bakış";
            menuDash.classList.add("active");
            menuCust.classList.remove("active");
        });

        menuCust.addEventListener('click', () => {
            viewDash.style.display = "none";
            viewCust.style.display = "block";
            pageTitle.innerText = "Sipariş Yönetimi";
            menuCust.classList.add("active");
            menuDash.classList.remove("active");
            renderCustomers();
        });
    }
}