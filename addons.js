// ==================== addons.js - جميع الإضافات ====================

// ============ 1️⃣ نظام الإنجازات المخفية ============
const SECRET_ACH = [
    {id:'sec1',n:{ar:"الليلة الكبيرة",en:"Big Night"},d:{ar:"اربح 1M في نقرة واحدة",en:"Earn 1M in one click"},tg:1000000,tp:'click_single',rw:500,icon:"🌙"},
    {id:'sec2',n:{ar:"مليونير بالفطرة",en:"Natural"},d:{ar:"لا تشتري أي منشأة لمدة 10 دقائق",en:"No buildings for 10 min"},tg:600,tp:'no_build_time',rw:250,icon:"⏰"},
    {id:'sec3',n:{ar:"مقامر",en:"Gambler"},d:{ar:"اربح 500K من البورصة",en:"Earn 500K from stocks"},tg:500000,tp:'stock_profit_single',rw:300,icon:"🎰"},
    {id:'sec4',n:{ar:"مدمن نقر",en:"Click Addict"},d:{ar:"انقر 10,000 مرة",en:"Click 10,000 times"},tg:10000,tp:'click',rw:1000,icon:"👆"},
    {id:'sec5',n:{ar:"رجل أعمال حذر",en:"Cautious"},d:{ar:"وفر 100M بدون صرف",en:"Save 100M"},tg:100000000,tp:'save',rw:750,icon:"🏦"},
    {id:'sec6',n:{ar:"مستثمر جريء",en:"Bold Investor"},d:{ar:"اشتري 50 سهماً في صفقة",en:"Buy 50 stocks at once"},tg:50,tp:'stock_buy_bulk',rw:600,icon:"💼"},
    {id:'sec7',n:{ar:"محارب لا يقهر",en:"Invincible"},d:{ar:"اربح 10 معارك متتالية",en:"Win 10 battles in a row"},tg:10,tp:'battle_streak',rw:800,icon:"⚔️"},
    {id:'sec8',n:{ar:"ملك التبرعات",en:"Donation King"},d:{ar:"تبرع 100M للفصيل",en:"Donate 100M to clan"},tg:100000000,tp:'clan_donate',rw:500,icon:"🤝"}
];

// متغيرات الإنجازات المخفية
G.secretAchDone = G.secretAchDone || [];
G.noBuildTimer = G.noBuildTimer || 0;
G.noBuildStart = G.noBuildStart || 0;
G.battleStreak = G.battleStreak || 0;
G.lastClickAmount = G.lastClickAmount || 0;
G.stockBuyBulk = G.stockBuyBulk || 0;

function checkSecretAchievements() {
    SECRET_ACH.forEach(ach => {
        if (G.secretAchDone.includes(ach.id)) return;
        
        let achieved = false;
        
        switch(ach.tp) {
            case 'click_single':
                if (G.lastClickAmount >= ach.tg) achieved = true;
                break;
            case 'no_build_time':
                if (G.noBuildTimer >= ach.tg) achieved = true;
                break;
            case 'stock_profit_single':
                if (G.stockProfit >= ach.tg) achieved = true;
                break;
            case 'click':
                if (G.totalClicks >= ach.tg) achieved = true;
                break;
            case 'save':
                if (G.money >= ach.tg) achieved = true;
                break;
            case 'battle_streak':
                if (G.battleStreak >= ach.tg) achieved = true;
                break;
            case 'clan_donate':
                if ((G.clan?.totalContrib || 0) >= ach.tg) achieved = true;
                break;
        }
        
        if (achieved) {
            G.secretAchDone.push(ach.id);
            G.gems += ach.rw;
            save();
            toast(`🌟 إنجاز مخفي! ${ach.n[lang]} (+${ach.rw} 💎)`);
            sUl();
        }
    });
}

// تتبع وقت عدم الشراء
setInterval(() => {
    if (G.totalBuilds === (G._lastBuildCount || 0)) {
        G.noBuildTimer += 1;
    } else {
        G.noBuildTimer = 0;
    }
    G._lastBuildCount = G.totalBuilds;
    checkSecretAchievements();
}, 1000);


// ============ 2️⃣ نظام Lucky Spin المجاني ============
let freeSpinAvailable = true;
let lastFreeSpinDate = localStorage.getItem('lastFreeSpinDate') || '';

function checkFreeSpin() {
    const today = new Date().toDateString();
    if (lastFreeSpinDate !== today) {
        freeSpinAvailable = true;
        lastFreeSpinDate = today;
        localStorage.setItem('lastFreeSpinDate', today);
    }
}

function freeDailySpin() {
    checkFreeSpin();
    
    if (!freeSpinAvailable) {
        toast('⚠️ جرب بكرة! مرة واحدة يومياً');
        return;
    }
    
    if (wheelSpinning) return;
    
    freeSpinAvailable = false;
    wheelSpinning = true;
    
    toast("🎡 لف مجاني!");
    
    setTimeout(() => {
        let pi = Math.floor(Math.random() * WP.length);
        let prize = WP[pi];
        let stp = 12;
        let s = 0;
        
        document.querySelectorAll('.wheel-prize').forEach(el => el.classList.remove('highlight'));
        
        let iv = setInterval(() => {
            document.querySelectorAll('.wheel-prize').forEach(el => el.classList.remove('highlight'));
            let ci = (pi + stp - s) % WP.length;
            let targetBox = document.getElementById('wp' + ci);
            if (targetBox) targetBox.classList.add('highlight');
            hapticFeedback(8);
            s++;
            
            if (s >= stp) {
                clearInterval(iv);
                document.querySelectorAll('.wheel-prize').forEach(el => el.classList.remove('highlight'));
                let finalBox = document.getElementById('wp' + pi);
                if (finalBox) finalBox.classList.add('highlight');
                awardPrize(prize);
                wheelSpinning = false;
                toast("🎉 مبروك! لف مجاني ناجح");
            }
        }, 100);
    }, 1000);
}


// ============ 3️⃣ نظام الإحصائيات المتقدمة ============
G.totalPlayTime = G.totalPlayTime || 0;

function showStats() {
    const modal = document.getElementById('statsModal');
    const content = document.getElementById('statsContent');
    
    if (!modal || !content) return;
    
    const totalPlayTime = G.totalPlayTime || 0;
    const hours = Math.floor(totalPlayTime / 3600);
    const minutes = Math.floor((totalPlayTime % 3600) / 60);
    const seconds = Math.floor(totalPlayTime % 60);
    
    const stats = `
        <div style="text-align:center;margin-bottom:20px;">
            <div style="font-size:50px;">📊</div>
            <h2 style="color:var(--gold);">إحصائياتك</h2>
        </div>
        <div class="item-card">
            <div class="item-icon">💰</div>
            <div class="item-info">
                <div class="item-name">إجمالي الأرباح</div>
                <div class="item-stats">كل الفلوس اللي ربحتها</div>
            </div>
            <div style="color:var(--primary);font-weight:800;">${fmt(G.totalEarned)}</div>
        </div>
        <div class="item-card">
            <div class="item-icon">👆</div>
            <div class="item-info">
                <div class="item-name">إجمالي النقرات</div>
                <div class="item-stats">عدد مرات النقر</div>
            </div>
            <div style="color:var(--primary);font-weight:800;">${fmt(G.totalClicks)}</div>
        </div>
        <div class="item-card">
            <div class="item-icon">🏭</div>
            <div class="item-info">
                <div class="item-name">إجمالي المنشآت</div>
                <div class="item-stats">كل المنشآت اللي بنيتها</div>
            </div>
            <div style="color:var(--primary);font-weight:800;">${fmt(G.totalBuilds)}</div>
        </div>
        <div class="item-card">
            <div class="item-icon">⚔️</div>
            <div class="item-info">
                <div class="item-name">المعارك المنتصرة</div>
                <div class="item-stats">انتصاراتك في المعارك</div>
            </div>
            <div style="color:var(--battle-red);font-weight:800;">${G.battlesWon}</div>
        </div>
        <div class="item-card">
            <div class="item-icon">🌌</div>
            <div class="item-info">
                <div class="item-name">نقاط البريستيج</div>
                <div class="item-stats">إجمالي النقاط الكونية</div>
            </div>
            <div style="color:var(--prestige);font-weight:800;">${G.totalPP}</div>
        </div>
        <div class="item-card">
            <div class="item-icon">🏆</div>
            <div class="item-info">
                <div class="item-name">الإنجازات</div>
                <div class="item-stats">من 12 إنجاز</div>
            </div>
            <div style="color:var(--gold);font-weight:800;">${G.achDone.length}/12</div>
        </div>
        <div class="item-card">
            <div class="item-icon">🌟</div>
            <div class="item-info">
                <div class="item-name">إنجازات مخفية</div>
                <div class="item-stats">إنجازات سرية</div>
            </div>
            <div style="color:var(--ultra);font-weight:800;">${(G.secretAchDone || []).length}/${SECRET_ACH.length}</div>
        </div>
        <div class="item-card">
            <div class="item-icon">⏱️</div>
            <div class="item-info">
                <div class="item-name">وقت اللعب</div>
                <div class="item-stats">الوقت الكلي</div>
            </div>
            <div style="color:var(--accent);font-weight:800;">${hours}h ${minutes}m ${seconds}s</div>
        </div>
        <div class="item-card">
            <div class="item-icon">📈</div>
            <div class="item-info">
                <div class="item-name">أرباح البورصة</div>
                <div class="item-stats">أرباح الأسهم</div>
            </div>
            <div style="color:var(--ocean);font-weight:800;">${fmt(G.stockProfit || 0)}</div>
        </div>
        <div class="item-card">
            <div class="item-icon">🏖️</div>
            <div class="item-info">
                <div class="item-name">أصداف الصيف</div>
                <div class="item-stats">مجموع الأصداف</div>
            </div>
            <div style="color:var(--summer);font-weight:800;">${fmt(G.summerShells || 0)}</div>
        </div>
    `;
    
    content.innerHTML = stats;
    modal.classList.remove('hidden');
}


// ============ 4️⃣ نظام المؤثرات الصوتية ============
class SoundFX {
    constructor() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.enabled = !(localStorage.getItem('soundOff') === 'true');
        } catch(e) {
            this.enabled = false;
        }
    }
    
    play(type) {
        if (!this.enabled) return;
        
        try {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.connect(gain);
            gain.connect(this.audioContext.destination);
            
            switch(type) {
                case 'click':
                    osc.type = 'sine';
                    osc.frequency.value = 800;
                    gain.gain.value = 0.08;
                    osc.start();
                    gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);
                    osc.stop(this.audioContext.currentTime + 0.06);
                    break;
                    
                case 'buy':
                    osc.type = 'square';
                    osc.frequency.value = 600;
                    gain.gain.value = 0.1;
                    osc.start();
                    osc.frequency.linearRampToValueAtTime(900, this.audioContext.currentTime + 0.1);
                    osc.stop(this.audioContext.currentTime + 0.15);
                    break;
                    
                case 'levelup':
                    osc.type = 'sine';
                    osc.frequency.value = 523;
                    gain.gain.value = 0.15;
                    osc.start();
                    osc.frequency.setValueAtTime(659, this.audioContext.currentTime + 0.1);
                    osc.frequency.setValueAtTime(784, this.audioContext.currentTime + 0.2);
                    osc.stop(this.audioContext.currentTime + 0.35);
                    break;
                    
                case 'prestige':
                    osc.type = 'triangle';
                    osc.frequency.value = 400;
                    gain.gain.value = 0.2;
                    osc.start();
                    osc.frequency.linearRampToValueAtTime(1200, this.audioContext.currentTime + 0.5);
                    gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.6);
                    osc.stop(this.audioContext.currentTime + 0.65);
                    break;
                    
                case 'achievement':
                    osc.type = 'sine';
                    osc.frequency.value = 880;
                    gain.gain.value = 0.12;
                    osc.start();
                    osc.frequency.setValueAtTime(1100, this.audioContext.currentTime + 0.15);
                    osc.frequency.setValueAtTime(1320, this.audioContext.currentTime + 0.3);
                    osc.stop(this.audioContext.currentTime + 0.45);
                    break;
                    
                case 'battle':
                    osc.type = 'sawtooth';
                    osc.frequency.value = 200;
                    gain.gain.value = 0.1;
                    osc.start();
                    osc.frequency.linearRampToValueAtTime(100, this.audioContext.currentTime + 0.2);
                    osc.stop(this.audioContext.currentTime + 0.25);
                    break;
                    
                case 'spin':
                    osc.type = 'sine';
                    osc.frequency.value = 300;
                    gain.gain.value = 0.06;
                    osc.start();
                    for (let i = 0; i < 5; i++) {
                        osc.frequency.setValueAtTime(300 + i * 100, this.audioContext.currentTime + i * 0.05);
                    }
                    osc.stop(this.audioContext.currentTime + 0.3);
                    break;
            }
        } catch(e) {
            // فشل الصوت - تجاهل
        }
    }
    
    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('soundOff', !this.enabled);
        toast(this.enabled ? '🔊 الصوت مفعل' : '🔇 الصوت مكتوم');
    }
}

const sfx = new SoundFX();

// ربط المؤثرات الصوتية بالأحداث
const originalHandleClick = handleClick;
handleClick = function(e) {
    originalHandleClick(e);
    sfx.play('click');
};

const originalBuyBuilding = buyBuilding;
buyBuilding = function(id) {
    originalBuyBuilding(id);
    if (G.buildings[id] > 0) sfx.play('buy');
};

const originalWinBattle = winBattle;
winBattle = function() {
    originalWinBattle();
    sfx.play('battle');
};


// ============ 5️⃣ نظام الرسائل التحفيزية ============
const MOTIVATIONAL = {
    ar: [
        "💪 استمر! كل إمبراطورية تبدأ بخطوة",
        "📈 الاستثمار الذكي يصنع الفرق",
        "🏔️ لا تستسلم! القمة قريبة",
        "✨ كل نقرة تقربك من حلمك",
        "💰 الأثرياء لا يعملون للمال، المال يعمل لهم",
        "📊 خطر ببالك تستثمر في البورصة؟",
        "🌟 وفر فلوسك، الجايات أحلى",
        "🏛️ تذكر: روما لم تبنى في يوم واحد",
        "🎯 ركز على أهدافك توصل",
        "🔥 الشغف سر النجاح",
        "💎 الجواهر تخليك أقوى",
        "🚀 كل ما تلعب أكثر، توصل أبعد",
        "👑 الأباطرة يصنعون ولا يولدون",
        "⚡ اليوم يوم أرباح كبيرة!",
        "🌈 بعد العسر يسر"
    ],
    en: [
        "💪 Keep going! Every empire starts with one step",
        "📈 Smart investment makes the difference",
        "🏔️ Don't give up! The peak is near",
        "✨ Every click brings you closer to your dream",
        "💰 The rich don't work for money, money works for them",
        "📊 Thought about investing in stocks?",
        "🌟 Save your money, the best is yet to come",
        "🏛️ Remember: Rome wasn't built in a day",
        "🎯 Focus on your goals",
        "🔥 Passion is the secret to success",
        "💎 Gems make you stronger",
        "🚀 The more you play, the further you go",
        "👑 Emperors are made, not born",
        "⚡ Today is a big profit day!",
        "🌈 After hardship comes ease"
    ]
};

let lastMotivational = 0;

function showMotivational() {
    const now = Date.now();
    if (now - lastMotivational < 180000) return; // كل 3 دقائق
    
    const msgs = MOTIVATIONAL[lang] || MOTIVATIONAL.ar;
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    toast(msg);
    lastMotivational = now;
}


// ============ تحديث Game Loop ============
const originalGameLoop = gameLoop;
gameLoop = function(now) {
    originalGameLoop(now);
    
    // تحديث وقت اللعب
    if (!G._lastLoopTime) G._lastLoopTime = now;
    const dt = (now - G._lastLoopTime) / 1000;
    if (dt > 0 && dt < 5) {
        G.totalPlayTime = (G.totalPlayTime || 0) + dt;
    }
    G._lastLoopTime = now;
    
    // رسائل تحفيزية
    showMotivational();
};


// ============ ربط الأصوات بالإنجازات ============
const originalCheckAchievements = checkAchievements;
checkAchievements = function() {
    const before = G.achDone.length;
    originalCheckAchievements();
    const after = G.achDone.length;
    if (after > before) sfx.play('achievement');
    checkSecretAchievements();
};


// ============ ربط الأصوات بالمستوى ============
const originalCheckLevel = checkLevel;
checkLevel = function() {
    const before = G.level;
    originalCheckLevel();
    if (G.level > before) sfx.play('levelup');
};


// ============ إضافة زر الصوت في الإعدادات ============
function addSoundButton() {
    const settingsModal = document.getElementById('settingsModal');
    if (!settingsModal) return;
    
    const modalBox = settingsModal.querySelector('.modal-box');
    if (!modalBox) return;
    
    // البحث عن زر موجود لإضافة زر الصوت بعده
    const langBtn = modalBox.querySelector('button[onclick="toggleLang()"]');
    if (!langBtn) return;
    
    // التأكد من عدم وجود زر الصوت مسبقاً
    if (document.getElementById('soundBtn')) return;
    
    const soundBtn = document.createElement('button');
    soundBtn.id = 'soundBtn';
    soundBtn.className = 'btn';
    soundBtn.style.cssText = 'background:rgba(255,255,255,0.08);color:white;margin-bottom:12px;';
    soundBtn.textContent = sfx.enabled ? '🔊 الصوت مفعل' : '🔇 الصوت مكتوم';
    soundBtn.onclick = function() {
        sfx.toggle();
        soundBtn.textContent = sfx.enabled ? '🔊 الصوت مفعل' : '🔇 الصوت مكتوم';
    };
    
    // إضافة الزر بعد زر اللغة
    langBtn.parentNode.insertBefore(soundBtn, langBtn.nextSibling);
}


// ============ تهيئة كل الإضافات ============
function initAddons() {
    checkFreeSpin();
    addSoundButton();
    console.log('✅ جميع الإضافات جاهزة');
    console.log('  🏆 إنجازات مخفية');
    console.log('  🎰 Lucky Spin يومي');
    console.log('  📊 إحصائيات متقدمة');
    console.log('  🎵 مؤثرات صوتية');
    console.log('  💬 رسائل تحفيزية');
}

// تشغيل الإضافات بعد تحميل اللعبة
setTimeout(initAddons, 3000);
