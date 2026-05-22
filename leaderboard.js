// ==================== leaderboard.js - لوحة المتصدرين ====================
class Leaderboard {
    constructor() {
        // ✅ نستخدم Access Key وليس Master Key
        this.apiKey = '$2a$10$QRwMeIGBbbhVZMCO..rgguhTN517crA/9EjNppb.Emi.7t2NzOuOy';
        this.binId = '6a0fed31ee5a733b12fd8e4e';
        this.apiUrl = `https://api.jsonbin.io/v3/b/${this.binId}`;
        this.headers = {
            'X-Access-Key': this.apiKey, // تم تغييره إلى X-Access-Key
            'Content-Type': 'application/json'
        };
        this.refreshInterval = 30000;
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
            console.log('⚠️ لا يوجد اتصال بالإنترنت');
            return null;
        }
    }

    // إرسال نتيجة اللاعب للسيرفر
    async submitScore(playerName, totalEarned, level, pp) {
        try {
            let currentData = await this.fetchLeaderboard();
            if (!currentData) currentData = [];
            
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
                if (totalEarned > currentData[playerIndex].money) {
                    currentData[playerIndex] = playerData;
                }
            } else {
                currentData.push(playerData);
            }
            
            currentData.sort((a, b) => b.money - a.money);
            currentData = currentData.slice(0, 50);
            
            await fetch(this.apiUrl, {
                headers: this.headers,
                method: 'PUT',
                body: JSON.stringify({ leaderboard: currentData })
            });
            
            return true;
            
        } catch (error) {
            console.log('⚠️ لا يمكن إرسال النتيجة');
            return false;
        }
    }

    getDeviceId() {
        let deviceId = localStorage.getItem('device_id');
        if (!deviceId) {
            deviceId = 'dev_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
            localStorage.setItem('device_id', deviceId);
        }
        return deviceId;
    }

    rankPlayers(players) {
        return players
            .sort((a, b) => b.money - a.money)
            .map((player, index) => ({
                ...player,
                rank: index + 1
            }));
    }
}

const leaderboard = new Leaderboard();

// عرض لوحة المتصدرين
async function showLeaderboard() {
    const modal = document.getElementById('leaderboardModal');
    const content = document.getElementById('leaderboardContent');
    
    if (!modal || !content) return;
    
    content.innerHTML = '<div style="text-align:center;color:var(--gold);">⏳ جاري تحميل لوحة المتصدرين...</div>';
    modal.classList.remove('hidden');
    
    await leaderboard.submitScore(
        G.company || 'مجهول',
        G.totalEarned,
        G.level,
        G.totalPP || 0
    );
    
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
    
    const ranked = leaderboard.rankPlayers(players);
    const myDeviceId = leaderboard.getDeviceId();
    const myRank = ranked.findIndex(p => p.deviceId === myDeviceId) + 1;
    
    let html = `
        <h2 style="color:var(--gold);text-align:center;">🏆 لوحة المتصدرين</h2>
        <p style="text-align:center;color:#94a3b8;margin-bottom:15px;">أفضل 10 أباطرة المال</p>
    `;
    
    if (myRank > 0) {
        html += `
            <div style="background:rgba(0,229,160,0.1);border:2px solid var(--primary);border-radius:16px;padding:12px;margin-bottom:20px;text-align:center;">
                <div style="color:var(--primary);font-weight:800;">👑 ترتيبك الحالي</div>
                <div style="font-size:24px;font-weight:800;">#${myRank}</div>
                <button class="btn btn-sm" onclick="submitMyScore()" style="margin-top:8px;">📤 تحديث نتيجتي</button>
            </div>
        `;
    }
    
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
    
    html += `
        <div style="text-align:center;margin-top:15px;">
            <button class="btn btn-sm" style="background:rgba(255,255,255,0.05);" onclick="showLeaderboard()">🔄 تحديث</button>
            <button class="btn btn-sm" style="background:rgba(255,255,255,0.05);" onclick="document.getElementById('leaderboardModal').classList.add('hidden')">إغلاق</button>
        </div>
    `;
    
    content.innerHTML = html;
}

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
        showLeaderboard();
    } else {
        toast('❌ فشل الإرسال - تحقق من الإنترنت');
    }
}

setInterval(() => {
    if (G.totalEarned > 1000) {
        leaderboard.submitScore(
            G.company || 'مجهول',
            G.totalEarned,
            G.level,
            G.totalPP || 0
        );
    }
}, 300000);

console.log('✅ نظام المتصدرين جاهز وآمن');
