// api/discord-webhook.js (Bu kod Node.js üzerinde Vercel'de çalışır)

// Vercel'in fetch'i (istek gönderme)
const fetch = require('node-fetch'); 

// 1. GİZLİ WEBHOOK LİNKİ (Vercel Ortam Değişkenlerinden Alınacak)
const DISCORD_URL = process.env.DISCORD_WEBHOOK_URL; 

// 2. Ana İşlem (POST isteğini yakala)
module.exports = async (req, res) => {
    // Sadece POST isteklerini kabul et
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Method Not Allowed' });
    }

    // Gelen JSON verisini al
    const data = req.body; 

    // Veri kontrolü
    if (!data || !data.id) {
        return res.status(400).send({ message: 'Eksik sipariş verisi.' });
    }
    
    // 3. Discord JSON Payload'unu Hazırla
    const color = data.promo !== "Yok" ? 16766720 : 5814783;

    const payload = {
        username: "Upsilon Sipariş Botu (Vercel)",
        embeds: [{
            title: "🔔 YENİ SİPARİŞ GELDİ!",
            color: color,
            fields: [
                { name: "Kod", value: "`" + data.id + "`", inline: true },
                { name: "Müşteri", value: data.customer, inline: true },
                { name: "Hizmet", value: data.service, inline: true },
                { name: "Bütçe", value: data.price, inline: true },
                { name: "🎟️ İndirim Kodu", value: data.promo, inline: true },
                { name: "Detaylar", value: data.details, inline: false }
            ],
            timestamp: new Date()
        }]
    };

    // 4. Discord'a Güvenli Gönderim
    try {
        await fetch(DISCORD_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        // Başarılı cevap gönder
        res.status(200).send({ status: 'success', message: 'Discord bildirimi iletildi.' });
        
    } catch (error) {
        console.error('Discord Gönderim Hatası:', error);
        res.status(500).send({ status: 'error', message: 'Webhook sunucu hatası.' });
    }
};
