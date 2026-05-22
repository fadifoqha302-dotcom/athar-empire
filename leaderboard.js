// ==================== leaderboard.js - لوحة المتصدرين ====================
class Leaderboard {
    constructor() {
        this.apiKey = '$2a$10$TxUfVQPULESE4tJXvh1ceDregGmQeG6uK31m..j7us6QQzARw/d6';
        this.binId = '6a0fed31ee5a733b12fd8e4e';
        this.apiUrl = `https://api.jsonbin.io/v3/b/${this.binId}`;
        this.headers = {
            'X-Master-Key': this.apiKey,
            'Content-Type': 'application/json'
        };
        this.refreshInterval = 30000; // تحديث كل 30 ثانية
    }

    // جلب لوحة المتصدرين من السيرفر
    async fetchLeaderboard() {
        try {
            const response = await fetch(this.apiUrl, {
                headers: this.headers,
                method: 'GET'
            });
            
            if (!response.ok) throw new Error('فشل الاتصال');
            
            const data = await response.json();
            return data.record.leaderboard || [];
            
        } catch (error) {
            console.log('⚠️ لا يوجد اتصال بالإنترنت - عرض محلي');
            return null;
        }
    }

    // إرسال نتيجة اللاعب للسيرفر
    async submitScore(playerName, totalEarned, level, pp) {
        try {
            // جلب البيانات الحالية
            let currentData = await this.fetchLeaderboard();
            if (!currentData) currentData = [];
            
            // البحث عن اللاعب وإذا كان موجوداً
            const playerIndex = currentData.findIndex(p => p.name === playerName);
            
            const playerData = {
                name: playerName,
                money: totalEarned,
                level: level,
                pp: pp || 0,
                lastUpdate: new Date().toISOString(),
                deviceId: this.getDeviceId()
            };
            
            if (playerIndex >= 0) {
                // تحديث بيانات اللاعب الموجود
                if (totalEarned > currentData[playerIndex].money) {
                    currentData[playerIndex] = playerData;
                }
            } else {
                // إضافة لاعب جديد
                currentData.push(playerData);
            }
            
            // ترتيب حسب الأموال (تنازلي)
            currentData.sort((a, b) => b.money - a.money);
            
            // الاحتفاظ بأفضل 50 لاعب
            currentData = currentData.slice(0, 50);
            
            // إرسال البيانات للسيرفر
            await fetch(this.apiUrl, {
                headers: {
                    ...this.headers,
                    'X-Bin-Versioning': 'false'
                },
                method: 'PUT',
                body: JSON.stringify({ leaderboard: currentData })
            });
            
            return true;
            
        } catch (error) {
            console.log('⚠️ لا يمكن إرسال النتيجة - لا يوجد اتصال');
            return false;
        }
    }

    // الحصول على معرف فريد للجهاز
    getDeviceId() {
        let deviceId = localStorage.getItem('device_id');
        if (!deviceId) {
            deviceId = 'dev_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
            localStorage.setItem('device_id', deviceId);
        }
        return deviceId;
    }

    // ترتيب اللاعبين
    rankPlayers(players) {
        return players
            .sort((a, b) => b.money - a.money)
            .map((player, index) => ({
                ...player,
                rank: index + 1
            }));
    }
}

// ==================== تهيئة لوحة المتصدرين ====================
const leaderboard = new Leaderboard();

// عرض لوحة المتصدرين
async function showLeaderboard() {
    const modal = document.getElementById('leaderboardModal');
    const content = document.getElementById('leaderboardContent');
    
    if (!modal || !content) {
        console.log('❌ عناصر المتصدرين غير موجودة');
        return;
    }
    
    content.innerHTML = '<div style="text-align:center;color:var(--gold);">⏳ جاري تحميل لوحة المتصدرين...</div>';
    modal.classList.remove('hidden');
    
    // محاولة إرسال نتيجة اللاعب الحالي
    await leaderboard.submitScore(
        G.company || 'مجهول',
        G.totalEarned,
        G.level,
        G.totalPP || 0
    );
    
    // جلب لوحة المتصدرين
    const players = await leaderboard.fetchLeaderboard();
    
    if (!players || players.length === 0) {
        content.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <div style="font-size:50px;">🏆</div>
                <h3>لا يوجد لاعبين بعد</h3>
                <p style="color:#94a3b8;">كن أول لاعب في لوحة المتصدرين!</p>
                <button class="btn" onclick="submitMyScore()">📤 إرسال نتيجتي</button>
                <button class="btn btn-sm" style="background:rgba(255,255,255,0.05);margin-top:8px;" onclick="document.getElementById('leaderboardModal').classList.add('hidden')">إغلاق</button>
            </div>
        `;
        return;
    }
    
    // ترتيب اللاعبين
    const ranked = leaderboard.rankPlayers(players);
    
    // البحث عن ترتيب اللاعب الحالي
    const myDeviceId = leaderboard.getDeviceId();
    const myRank = ranked.findIndex(p => p.deviceId === myDeviceId) + 1;
    
    // بناء HTML لوحة المتصدرين
    let html = `
        <h2 style="color:var(--gold);text-align:center;">🏆 لوحة المتصدرين</h2>
        <p style="text-align:center;color:#94a3b8;margin-bottom:15px;">أفضل 10 أباطرة المال</p>
    `;
    
    // عرض ترتيب اللاعب الحالي
    if (myRank > 0) {
        html += `
            <div style="background:rgba(0,229,160,0.1);border:2px solid var(--primary);border-radius:16px;padding:12px;margin-bottom:20px;text-align:center;">
                <div style="color:var(--primary);font-weight:800;">👑 ترتيبك الحالي</div>
                <div style="font-size:24px;font-weight:800;">#${myRank}</div>
                <button class="btn btn-sm" onclick="submitMyScore()" style="margin-top:8px;">📤 تحديث نتيجتي</button>
            </div>
        `;
    } else {
        html += `
            <div style="text-align:center;margin-bottom:20px;">
                <button class="btn btn-sm btn-prestige" onclick="submitMyScore()">📤 إرسال نتيجتي</button>
            </div>
        `;
    }
    
    // عرض أعلى 10 لاعبين
    html += '<div style="max-height:400px;overflow-y:auto;">';
    
    ranked.slice(0, 10).forEach((player, index) => {
        const isMe = player.deviceId === myDeviceId;
        const medals = ['🥇', '🥈', '🥉'];
        const rankIcon = index < 3 ? medals[index] : `#${index + 1}`;
        const bgColor = isMe ? 'background:rgba(0,229,160,0.15);border:2px solid var(--primary);' : '';
        
        html += `
            <div class="item-card" style="${bgColor}">
                <div style="font-size:28px;font-weight:800;min-width:50px;text-align:center;">${rankIcon}</div>
                <div style="flex:1;">
                    <div style="font-weight:800;${isMe ? 'color:var(--primary);' : ''}">
                        ${isMe ? '👈 ' : ''}${player.name}
                    </div>
                    <div style="font-size:12px;color:#94a3b8;">
                        💰 ${fmt(player.money)} | Lvl ${player.level} | 🌌 ${player.pp || 0}
                    </div>
                </div>
                ${isMe ? '<div style="color:var(--primary);font-weight:800;">أنت!</div>' : ''}
            </div>
        `;
    });
    
    html += '</div>';
    
    // زر التحديث والإغلاق
    html += `
        <div style="text-align:center;margin-top:15px;">
            <button class="btn btn-sm" style="background:rgba(255,255,255,0.05);" onclick="showLeaderboard()">🔄 تحديث</button>
            <button class="btn btn-sm" style="background:rgba(255,255,255,0.05);" onclick="document.getElementById('leaderboardModal').classList.add('hidden')">إغلاق</button>
        </div>
    `;
    
    content.innerHTML = html;
}

// إرسال النتيجة يدوياً
async function submitMyScore() {
    toast('📤 جاري إرسال النتيجة...');
    const success = await leaderboard.submitScore(
        G.company || 'مجهول',
        G.totalEarned,
        G.level,
        G.totalPP || 0
    );
    
    if (success) {
        toast('✅ تم إرسال نتيجتك!');
        // تحديث العرض
        showLeaderboard();
    } else {
        toast('❌ فشل الإرسال - تحقق من الإنترنت');
    }
}

// إرسال النتيجة تلقائياً كل 5 دقائق
setInterval(() => {
    if (G.totalEarned > 1000) { // فقط إذا كان هناك تقدم
        leaderboard.submitScore(
            G.company || 'مجهول',
            G.totalEarned,
            G.level,
            G.totalPP || 0
        );
    }
}, 300000); // كل 5 دقائق

console.log('✅ نظام المتصدرين جاهز');
console.log('🔑 API Key:', '$2a$10$TxUfVQPULESE4tJXvh1ceDregGmQeG6uK31m..j7us6QQzARw/d6');
console.log('📦 Bin ID:', '6a0fed31ee5a733b12fd8e4e');
