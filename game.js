// ==================== CANVAS BACKGROUND ====================
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 35; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.6,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    a: Math.random() * 0.5 + 0.25
  });
}

function animateBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 229, 160, ${p.a})`;
    ctx.fill();
  });
  requestAnimationFrame(animateBackground);
}
animateBackground();

// ==================== DIFFICULTY SYSTEM ====================
const DIFFICULTIES = {
  easy: { name: 'مبتدئ', icon: '🌱', prodMult: 1.0, costMult: 1.0, xpMult: 1.0, color: '#00ff87', prestigeReq: 500000 },
  normal: { name: 'محارب', icon: '⚔️', prodMult: 0.7, costMult: 1.3, xpMult: 0.8, color: '#fbbf24', prestigeReq: 1000000 },
  hard: { name: 'أسطوري', icon: '💀', prodMult: 0.45, costMult: 1.7, xpMult: 0.6, color: '#ff4444', prestigeReq: 2000000 },
  nightmare: { name: 'كابوس', icon: '🌑', prodMult: 0.25, costMult: 2.2, xpMult: 0.4, color: '#a855f7', prestigeReq: 5000000 }
};

let selectedDifficulty = 'normal';

const UNLOCK = {
  skills: 3, stocks: 5, quests: 2, achievements: 1,
  summer: 4, battle: 8, clan: 15, loot: 6, store: 1
};

function selectDifficulty(diff) {
  selectedDifficulty = diff;
  document.querySelectorAll('.difficulty-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('diff' + diff.charAt(0).toUpperCase() + diff.slice(1)).classList.add('selected');
}

function confirmDifficulty() {
  if (!G.company) {
    document.getElementById('difficultyModal').classList.add('hidden');
    document.getElementById('startupModal').classList.remove('hidden');
  } else {
    startGameWithDifficulty();
  }
}

// ==================== GAME DATA ====================
const BDB = [
  { id: 'b0', n: 'جهد شخصي', icon: '🛠️', cost: 15, mult: 1.10, y: 1, tm: 0, tp: 'click', sc: 250 },
  { id: 'b1', n: 'مكبس حراري', icon: '👕', cost: 100, mult: 1.12, y: 3, tm: 2.5, tp: 'auto', sc: 120 },
  { id: 'b2', n: 'خط مشروبات', icon: '⚡', cost: 1200, mult: 1.14, y: 50, tm: 5, tp: 'auto', sc: 80 },
  { id: 'b3', n: 'سكوتر توصيل', icon: '🛵', cost: 15000, mult: 1.16, y: 1500, tm: 12, tp: 'auto', sc: 60 },
  { id: 'b4', n: 'معرض أثر', icon: '🏪', cost: 250000, mult: 1.18, y: 28000, tm: 25, tp: 'auto', sc: 50 },
  { id: 'b5', n: 'أبحاث ذكاء', icon: '🤖', cost: 5000000, mult: 1.20, y: 450000, tm: 55, tp: 'auto', sc: 42 },
  { id: 'b6', n: 'مدينة صناعية', icon: '🏙️', cost: 2000000000, mult: 1.22, y: 150000000, tm: 120, tp: 'auto', sc: 35 },
  { id: 'b7', n: 'محطة الزمكان', icon: '🌌', cost: 1500000000000, mult: 1.25, y: 80000000000, tm: 500, tp: 'auto', sc: 30 },
  { id: 'b8', n: 'تعدين فضائي', icon: '☄️', cost: 5000000000000000, mult: 1.28, y: 50000000000000, tm: 1000, tp: 'auto', sc: 25 },
  { id: 'b9', n: 'مصفوفة كمية', icon: '💻', cost: 2e19, mult: 1.31, y: 3e17, tm: 3500, tp: 'auto', sc: 22 },
  { id: 'b10', n: 'محاكي أكوان', icon: '🪐', cost: 1e23, mult: 1.34, y: 5e21, tm: 12000, tp: 'auto', sc: 18 }
];

const MS = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000];

function dimFac(l, sc) {
  if (l <= sc) return 1;
  return Math.pow(sc / l, 0.4);
}

function msBonus(l) {
  let b = 1;
  MS.forEach(m => { if (l >= m) b *= 1.6; });
  return Math.min(b, 800);
}

const SDB = [
  { id: 's1', t: 1, n: 'قوة النقر', d: '+35%', max: 30, b: 2, m: 1.45 },
  { id: 's2', t: 1, n: 'مفاوض', d: '-1.2%', max: 35, b: 3, m: 1.35 },
  { id: 's3', t: 2, n: 'أتمتة', d: '+3.5%', max: 28, b: 5, m: 1.55 },
  { id: 's4', t: 2, n: 'أوفلاين', d: '+9%', max: 14, b: 8, m: 1.85 },
  { id: 's5', t: 3, n: 'نقرة كونية', d: '+1.1%', max: 12, b: 22, m: 2.3 },
  { id: 's6', t: 3, n: 'لمسة ذهبية', d: '+22%', max: 20, b: 18, m: 1.85 },
  { id: 's7', t: 4, n: 'سرعة كونية', d: '+2.5%', max: 10, b: 55, m: 2.7 }
];

let StDB = [
  { id: 's1', n: 'عقارات', icon: '🏠', pr: 30, tr: 1, vl: 0.025, ow: 0, hs: [30, 30, 30] },
  { id: 's2', n: 'تقنية', icon: '💻', pr: 100, tr: 1, vl: 0.08, ow: 0, hs: [100, 100, 100] },
  { id: 's3', n: 'عملات', icon: '🪙', pr: 400, tr: -1, vl: 0.25, ow: 0, hs: [400, 400, 400] },
  { id: 's4', n: 'طاقة', icon: '⚡', pr: 180, tr: 1, vl: 0.06, ow: 0, hs: [180, 180, 180] },
  { id: 's5', n: 'ذهب', icon: '🥇', pr: 600, tr: 1, vl: 0.04, ow: 0, hs: [600, 600, 600] },
  { id: 's6', n: 'صناعة', icon: '🏭', pr: 75, tr: -1, vl: 0.1, ow: 0, hs: [75, 75, 75] },
  { id: 's7', n: 'فضاء', icon: '🚀', pr: 2500, tr: 2, vl: 0.12, ow: 0, hs: [2500, 2500, 2500] },
  { id: 's8', n: 'غذاء', icon: '🌾', pr: 50, tr: 1, vl: 0.03, ow: 0, hs: [50, 50, 50] },
  { id: 's9', n: 'أدوية', icon: '💊', pr: 220, tr: 1, vl: 0.07, ow: 0, hs: [220, 220, 220] },
  { id: 's10', n: 'نفط', icon: '🛢️', pr: 110, tr: -1, vl: 0.18, ow: 0, hs: [110, 110, 110] }
];

const EnDB = [
  { n: 'لص الشركات', icon: '🦹', hp: 350, dmg: 3, rw: 10000, tm: 22, lv: 5 },
  { n: 'هاكر الأسهم', icon: '👨‍💻', hp: 1800, dmg: 8, rw: 40000, tm: 28, lv: 8 },
  { n: 'وحش الاحتكار', icon: '👾', hp: 10000, dmg: 22, rw: 250000, tm: 33, lv: 15 },
  { n: 'تنين البورصة', icon: '🐉', hp: 50000, dmg: 55, rw: 1800000, tm: 38, lv: 30 },
  { n: 'إله الإفلاس', icon: '💀', hp: 500000, dmg: 140, rw: 18000000, tm: 43, lv: 60 },
  { n: 'زعيم الأكوان', icon: '🌠', hp: 5000000, dmg: 320, rw: 900000000, tm: 48, lv: 110 }
];

const CN = ['نسور الأثر', 'ذئاب البورصة', 'أباطرة المال', 'صقور الاستثمار', 'عتاة الاقتصاد'];

const WP = [
  { icon: '💰', rw: 500000, tp: 'money' },
  { icon: '💎', rw: 100, tp: 'gems' },
  { icon: '🎁', tp: 'legendary' },
  { icon: '⚡', tp: 'boost', ml: 4 },
  { icon: '🏖️', tp: 'shells', am: 100 },
  { icon: '👑', tp: 'crown' }
];

// ==================== GAME STATE ====================
let G = {
  company: '', money: 0, gems: 0, totalEarned: 0, xp: 0, level: 1,
  buildings: {}, timers: {}, skills: {}, pp: 0, totalPP: 0,
  difficulty: 'normal', lastSaved: Date.now(), lastLogin: '', streak: 0,
  stocks: {}, quests: { date: '', list: [] }, inbox: [], premium: 1,
  dailyEarned: 0, dailyClicked: 0, dailyBuilt: 0, dailyDate: '',
  totalClicks: 0, totalBuilds: 0, stockProfit: 0, battlesWon: 0,
  clan: { name: '', contrib: 0, totalContrib: 0, joined: false },
  achDone: [], achSkins: [], adBoost: 0, boxUsedToday: false, summerShells: 0, codes: []
};

let cache = { clickPwr: 1, income: 0, discount: 0, speed: 1, offline: 1, crit: 0.06, goldTouch: 1 };
let buyMult = 1;
let buyModes = [1, 10, 100, 'max'];
let buyIdx = 0;
let eventMult = 1;
let eventTimer = 0;
let battle = { active: false, enemy: null, eHP: 0, eMax: 0, pHP: 0, pMax: 0, reward: 0, time: 0, maxTime: 0, dps: 0, tick: 0 };
let needsUpdate = false;
let wheelSpinning = false;

function getDiff() { return DIFFICULTIES[G.difficulty]; }
function isUnlocked(f) { return G.level >= UNLOCK[f]; }

// ==================== SAVE/LOAD ====================
function save() {
  G.lastSaved = Date.now();
  for (let i = 0; i < 10; i++) {
    let sid = 's' + (i + 1);
    if (StDB[i]) G.stocks[sid] = StDB[i].ow;
  }
  try { localStorage.setItem('AtharV23_Split', JSON.stringify(G)); } catch (e) {}
}

function load() {
  let r = localStorage.getItem('AtharV23_Split');
  if (!r) return false;
  try {
    let s = JSON.parse(r);
    Object.assign(G, s);
    G.level = Math.max(1, G.level || 1);
    G.money = Math.max(0, G.money || 0);
    G.gems = Math.max(0, G.gems || 0);
    BDB.forEach(b => {
      if (!G.buildings[b.id]) G.buildings[b.id] = 0;
      if (!G.timers[b.id]) G.timers[b.id] = 0;
    });
    SDB.forEach(s => { if (!G.skills[s.id]) G.skills[s.id] = 0; });
    for (let i = 0; i < 10; i++) {
      let sid = 's' + (i + 1);
      if (StDB[i]) StDB[i].ow = G.stocks[sid] || 0;
    }
    if (!G.clan) G.clan = { name: '', contrib: 0, totalContrib: 0, joined: false };
    if (!G.achDone) G.achDone = [];
    return true;
  } catch (e) { return false; }
}

// ==================== INITIALIZATION ====================
function initGame() {
  let hasData = load();
  if (!hasData) {
    BDB.forEach(b => { G.buildings[b.id] = 0; G.timers[b.id] = 0; });
    SDB.forEach(s => { G.skills[s.id] = 0; });
    document.getElementById('difficultyModal').classList.remove('hidden');
  } else {
    document.getElementById('difficultyModal').classList.add('hidden');
    document.getElementById('startupModal').classList.add('hidden');
    document.getElementById('uiCompanyName').innerText = G.company;
    document.getElementById('diffBadge').innerText = getDiff().icon + ' ' + getDiff().name;
    document.getElementById('diffBadge').style.color = getDiff().color;
    startFullGame();
  }
}

function startGame() {
  let n = document.getElementById('companyNameInput').value.trim();
  if (!n) { alert('الرجاء إدخال اسم الشركة'); return; }
  G.company = n;
  document.getElementById('uiCompanyName').innerText = n;
  document.getElementById('startupModal').classList.add('hidden');
  startGameWithDifficulty();
}

function startGameWithDifficulty() {
  G.difficulty = selectedDifficulty;
  document.getElementById('difficultyModal').classList.add('hidden');
  document.getElementById('diffBadge').innerText = getDiff().icon + ' ' + getDiff().name;
  document.getElementById('diffBadge').style.color = getDiff().color;
  startFullGame();
  toast('🚀 ' + G.company + ' | ' + getDiff().name);
}

function startFullGame() {
  resetDaily();
  calcStats();
  updateAllUI();
  updateAllNavLock();
  renderAll();
  checkOffline();
  checkDailyReward();
  save();
  setInterval(updateStocks, 10000);
  setInterval(randomEvent, 35000);
  requestAnimationFrame(gameLoop);
  setInterval(save, 2000);
}

function resetDaily() {
  let td = new Date().toDateString();
  if (G.dailyDate !== td) {
    G.dailyEarned = 0;
    G.dailyClicked = 0;
    G.dailyBuilt = 0;
    G.dailyDate = td;
    G.boxUsedToday = false;
    generateQuests();
  }
}

function checkDailyReward() {
  let td = new Date().toDateString();
  if (G.lastLogin !== td) {
    let y = new Date(Date.now() - 86400000).toDateString();
    G.streak = G.lastLogin === y ? G.streak + 1 : 1;
    let r = Math.min(200, 5 + (G.streak * 6));
    document.getElementById('dailyText').innerText = '+' + r + ' Gems';
    document.getElementById('dailyStreak').innerText = G.streak;
    document.getElementById('dailyRewardModal').classList.remove('hidden');
    G.lastLogin = td;
  }
}

function claimDailyReward() {
  let r = Math.min(200, 5 + (G.streak * 6));
  G.gems += r;
  document.getElementById('dailyRewardModal').classList.add('hidden');
  save();
  updateAllUI();
}

function generateQuests() {
  G.quests = {
    date: new Date().toDateString(),
    list: [
      { id: 'q1', tp: 'click', tg: 200, pr: 0, rw: 25, cl: false },
      { id: 'q2', tp: 'build', tg: 8, pr: 0, rw: 35, cl: false },
      { id: 'q3', tp: 'earn', tg: 75000, pr: 0, rw: 45, cl: false }
    ]
  };
}

// ==================== HELPERS ====================
const SFX = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc'];

function fmt(n) {
  if (isNaN(n) || n < 0 || n === null) return '0';
  if (n < 1000) return Math.floor(n).toString();
  let t = Math.log10(Math.abs(n)) / 3 | 0;
  if (t >= SFX.length) return n.toExponential(2);
  return (n / Math.pow(10, t * 3)).toFixed(2) + SFX[t];
}

// ==================== CORE MECHANICS ====================
function addMoney(a) {
  if (a > 0 && !isNaN(a) && isFinite(a)) {
    G.money += a;
    G.totalEarned += a;
    G.dailyEarned += a;
    G.summerShells += Math.floor(a / 12000);
    needsUpdate = true;
  }
}

function addXP(a) {
  G.xp += a * (getDiff().xpMult || 0.6);
  checkLevel();
  needsUpdate = true;
}

function checkLevel() {
  let req = Math.pow(G.level, 2.1) * 90;
  while (G.xp >= req) {
    G.xp -= req;
    G.level++;
    req = Math.pow(G.level, 2.1) * 90;
    toast('🎉 Level ' + G.level + '!');
    updateAllNavLock();
  }
}

function getYield(b) {
  let l = G.buildings[b.id] || 0;
  if (l === 0) return 0;
  return b.y * l * msBonus(l) * dimFac(l, b.sc || 50) * getDiff().prodMult;
}

function calcStats() {
  G.skills = G.skills || {};
  cache.discount = Math.min(0.55, (G.skills['s2'] || 0) * 0.012);
  cache.speed = Math.max(1, 1 + (G.skills['s3'] || 0) * 0.035 + (G.skills['s7'] || 0) * 0.025);
  cache.offline = 1 + (G.skills['s4'] || 0) * 0.09;
  cache.crit = 0.06 + (G.skills['s5'] || 0) * 0.011;
  cache.goldTouch = 1 + (G.skills['s6'] || 0) * 0.22;
  let cb = 1;
  if (G.clan && G.clan.joined) cb = 1 + Math.floor((G.clan.totalContrib || 0) / 1500000) / 100;
  let base = G.buildings['b0'] > 0 ? getYield(BDB[0]) : 1;
  cache.clickPwr = base * (1 + (G.skills['s1'] || 0) * 0.35) * G.premium * cb * cache.goldTouch;
  cache.income = 0;
  BDB.forEach(b => {
    if (b.tp === 'auto' && G.buildings[b.id] > 0)
      cache.income += (getYield(b) * G.premium * cb) / (b.tm / cache.speed);
  });
}

function handleClick(e) {
  let p = cache.clickPwr * (eventMult > 1 ? eventMult : 1);
  let crit = Math.random() < cache.crit;
  if (crit) p *= 7;
  addMoney(p);
  addXP(1);
  G.totalClicks++;
  G.dailyClicked++;
  updateQuest('click', 1);
  updateQuest('earn', p);
  
  let btn = document.getElementById('mainBtn');
  btn.style.transform = 'scale(0.88)';
  setTimeout(() => btn.style.transform = 'none', 70);
  
  let fText = document.createElement('div');
  fText.className = 'floating-text';
  fText.innerText = (crit ? '🔥 ' : '+') + fmt(p) + ' 💰';
  let rx = (Math.random() - 0.5) * 120;
  let ry = -(Math.random() * 55 + 55);
  fText.style.setProperty('--rand-x', `${rx}px`);
  fText.style.setProperty('--rand-y', `${ry}px`);
  fText.style.left = (e.clientX - 30) + 'px';
  fText.style.top = (e.clientY - 30) + 'px';
  document.body.appendChild(fText);
  setTimeout(() => fText.remove(), 750);
  
  if (battle.active) {
    battle.eHP -= p;
    if (battle.eHP <= 0) winBattle();
    renderBattle();
  }
  updateAllUI();
}

function buyBuilding(id) {
  let b = BDB.find(x => x.id === id);
  if (!b) return;
  let count = buyMult;
  if (buyMult === 'max') {
    let l = G.buildings[id] || 0;
    let bc = b.cost * (1 - cache.discount) * getDiff().costMult;
    let c = bc * Math.pow(b.mult, l);
    if (G.money < c) count = 0;
    else count = Math.max(0, Math.floor(Math.log((G.money * (b.mult - 1) / c) + 1) / Math.log(b.mult)));
  }
  if (count <= 0) return;
  let l = G.buildings[id] || 0;
  let totalCost = 0;
  for (let i = 0; i < count; i++) {
    totalCost += Math.floor(b.cost * Math.pow(b.mult, l + i) * getDiff().costMult * (1 - cache.discount));
  }
  if (G.money >= totalCost) {
    G.money -= totalCost;
    G.buildings[id] += count;
    G.totalBuilds += count;
    G.dailyBuilt += count;
    addXP(2 * count);
    updateQuest('build', count);
    calcStats();
    updateAllUI();
    renderBuildings();
  }
}

function toggleBuyMult() {
  buyIdx = (buyIdx + 1) % buyModes.length;
  buyMult = buyModes[buyIdx];
  document.getElementById('buyMultBtn').innerText = buyMult === 'max' ? 'Max' : 'x' + buyMult;
  renderBuildings();
}

function updateQuest(tp, a) {
  if (!G.quests || !G.quests.list) return;
  G.quests.list.forEach(q => {
    if (q.tp === tp && !q.cl && q.pr < q.tg) {
      q.pr += a;
      if (q.pr >= q.tg) toast('🏆 مهمة!');
    }
  });
  if (tp === 'earn') G.quests.list.forEach(q => {
    if (q.tp === 'earn' && !q.cl) q.pr = Math.min(q.tg, G.dailyEarned);
  });
  renderQuests();
}

function claimQuest(i) {
  let q = G.quests.list[i];
  if (q && q.pr >= q.tg && !q.cl) {
    q.cl = true;
    G.gems += q.rw;
    save();
    updateAllUI();
    renderQuests();
  }
}

// ==================== PRESTIGE ====================
function calcPendingPP() {
  let req = getDiff().prestigeReq;
  if (G.totalEarned < req) return 0;
  return Math.floor(Math.sqrt(G.totalEarned / req) * 1.2);
}

function openPrestigeModal() {
  document.getElementById('pendingPP').innerText = calcPendingPP();
  document.getElementById('totalPPDisplay').innerText = G.pp;
  document.getElementById('prestigeModal').classList.remove('hidden');
}

function closePrestigeModal() {
  document.getElementById('prestigeModal').classList.add('hidden');
}

function confirmPrestige() {
  let pp = calcPendingPP();
  if (pp < 1) {
    toast('تحتاج ' + fmt(getDiff().prestigeReq) + ' ذهب!');
    return;
  }
  G.pp += pp;
  G.totalPP += pp;
  G.money = 0;
  G.totalEarned = 0;
  G.xp = 0;
  G.level = 1;
  BDB.forEach(b => { G.buildings[b.id] = 0; G.timers[b.id] = 0; });
  calcStats();
  updateAllUI();
  updateAllNavLock();
  renderAll();
  save();
  closePrestigeModal();
  toast('🌌 +' + pp + ' PP');
}

function buySkill(id) {
  let s = SDB.find(x => x.id === id);
  let l = G.skills[id] || 0;
  if (l >= s.max) return;
  let c = Math.floor(s.b * Math.pow(s.m, l));
  if (G.pp >= c) {
    G.pp -= c;
    G.skills[id] = l + 1;
    calcStats();
    updateAllUI();
    renderSkills();
    save();
  }
}

// ==================== STOCKS ====================
function updateStocks() {
  StDB.forEach(s => {
    s.pr = Math.max(1, Math.floor(s.pr * (1 + (Math.random() - 0.5) * s.vl * (G.adBoost > 0 ? 0.5 : 1))));
    if (Math.random() < 0.2) s.tr *= -1;
    s.hs.push(s.pr);
    if (s.hs.length > 3) s.hs.shift();
  });
  if (isUnlocked('stocks')) renderStocks();
}

function buyStock(id) {
  let s = StDB.find(x => x.id === id);
  if (G.money >= s.pr) {
    G.money -= s.pr;
    s.ow++;
    save();
    updateAllUI();
    if (isUnlocked('stocks')) renderStocks();
  }
}

function sellStock(id) {
  let s = StDB.find(x => x.id === id);
  if (s.ow > 0) {
    let p = Math.floor(s.pr * 0.96);
    s.ow--;
    addMoney(p);
    G.stockProfit += p;
    save();
    updateAllUI();
    if (isUnlocked('stocks')) renderStocks();
  }
}

// ==================== BATTLE ====================
function startBattle() {
  if (!isUnlocked('battle')) return toast('🔒 تحتاج مستوى ' + UNLOCK.battle);
  if (battle.active) return;
  let a = EnDB.filter(e => G.level >= e.lv);
  if (a.length === 0) return toast('لا أعداء متاحين');
  let e = a[Math.floor(Math.random() * a.length)];
  battle.active = true;
  battle.enemy = e;
  battle.eHP = Math.floor(e.hp * (1 + (getDiff().costMult - 1) * 0.5));
  battle.eMax = battle.eHP;
  battle.pHP = G.level * 14 + 180;
  battle.pMax = battle.pHP;
  battle.reward = e.rw;
  battle.time = e.tm;
  battle.maxTime = e.tm;
  battle.dps = Math.floor(e.dmg * (1 + (getDiff().costMult - 1) * 0.3));
  battle.tick = 0;
  toast('⚔️ ' + e.n);
  renderBattle();
}

function winBattle() {
  addMoney(battle.reward);
  G.gems += Math.floor(battle.reward / 600);
  G.battlesWon++;
  let bonus = Math.floor(battle.reward * (battle.pHP / battle.pMax) * 0.45);
  addMoney(bonus);
  document.getElementById('battleResultContent').innerHTML = `
    <h2 style="color:#00ff87;">🏆 انتصار!</h2>
    <div style="font-size:55px;">${battle.enemy.icon}</div>
    <div style="color:var(--primary);">+${fmt(battle.reward)} 💰</div>
    <div style="color:#94a3b8;">مكافأة إضافية: +${fmt(bonus)} 💰</div>
    <button class="btn" onclick="closeBattleResult()">متابعة</button>
  `;
  document.getElementById('battleResultModal').classList.remove('hidden');
  battle.active = false;
  save();
  updateAllUI();
  renderBattle();
}

function loseBattle() {
  let l = Math.floor(G.money * 0.1);
  G.money = Math.max(0, G.money - l);
  document.getElementById('battleResultContent').innerHTML = `
    <h2 style="color:var(--danger);">💀 هزيمة</h2>
    <div style="font-size:55px;">${battle.enemy ? battle.enemy.icon : '👾'}</div>
    <div style="color:var(--danger);">-${fmt(l)} 💰</div>
    <button class="btn" style="background:#334155;" onclick="closeBattleResult()">متابعة</button>
  `;
  document.getElementById('battleResultModal').classList.remove('hidden');
  battle.active = false;
  save();
  updateAllUI();
  renderBattle();
}

function closeBattleResult() {
  document.getElementById('battleResultModal').classList.add('hidden');
}

function fleeBattle() {
  let l = Math.floor(G.money * 0.03);
  G.money = Math.max(0, G.money - l);
  toast('🏃 -' + fmt(l) + ' 💰');
  battle.active = false;
  save();
  updateAllUI();
  renderBattle();
}

function updateBattle(dt) {
  if (!battle.active) return;
  battle.tick += dt;
  if (battle.tick >= 1) {
    battle.tick -= 1;
    battle.pHP -= battle.dps;
    if (battle.pHP <= 0) { loseBattle(); return; }
  }
  battle.time -= dt;
  if (battle.time <= 0) { loseBattle(); return; }
  renderBattle();
}

// ==================== CLAN ====================
function joinClan() {
  if (!isUnlocked('clan')) return toast('🔒 تحتاج مستوى ' + UNLOCK.clan);
  let n = CN[Math.floor(Math.random() * CN.length)];
  G.clan = { name: n, contrib: 0, totalContrib: 0, joined: true };
  calcStats();
  updateAllUI();
  renderClan();
  save();
  toast('🛡️ ' + n);
}

function contributeClan() {
  if (!G.clan.joined) return;
  let a = Math.floor(G.money * 0.04);
  if (a < 100) return;
  G.money -= a;
  G.clan.contrib += a;
  G.clan.totalContrib += a;
  calcStats();
  updateAllUI();
  renderClan();
  save();
  toast('🤝 ' + fmt(a) + ' 💰');
}

// ==================== WHEEL & BOXES ====================
function spinWheel() {
  if (wheelSpinning) return;
  wheelSpinning = true;
  toast('📺 جاري التحميل...');
  setTimeout(() => {
    let pi = Math.floor(Math.random() * WP.length);
    let prize = WP[pi];
    document.querySelectorAll('.wheel-prize').forEach(el => el.classList.remove('highlight'));
    let fb = document.getElementById('wp' + pi);
    if (fb) fb.classList.add('highlight');
    awardPrize(prize);
    wheelSpinning = false;
  }, 1000);
}

function awardPrize(prize) {
  if (prize.tp === 'money') { addMoney(prize.rw); toast('🎡 +' + fmt(prize.rw) + ' 💰'); }
  else if (prize.tp === 'gems') { G.gems += prize.rw; toast('🎡 +' + prize.rw + ' 💎'); }
  else if (prize.tp === 'legendary') { openBox('legendary', true); }
  else if (prize.tp === 'boost') { G.premium *= prize.ml; calcStats(); toast('🎡 x' + prize.ml + ' Boost!'); }
  else if (prize.tp === 'shells') { G.summerShells += prize.am; toast('🎡 +' + prize.am + ' Shells'); }
  else if (prize.tp === 'crown') { G.gems += 1000; toast('🎡 👑 +1000 💎'); }
  save();
  updateAllUI();
  renderSummer();
}

function openBox(rarity, free) {
  let rws = {
    common: { g: [2, 8], m: [200, 8000] },
    rare: { g: [8, 35], m: [8000, 150000] },
    legendary: { g: [35, 150], m: [150000, 15000000] }
  };
  let r = rws[rarity];
  let gems = Math.floor(Math.random() * (r.g[1] - r.g[0]) + r.g[0]);
  let money = Math.floor(Math.random() * (r.m[1] - r.m[0]) + r.m[0]);
  G.gems += gems;
  addMoney(money);
  save();
  updateAllUI();
  if (isUnlocked('loot')) renderLoot();
  toast('🎁 +' + fmt(money) + '💰 +' + gems + '💎');
}

function watchAd(type) {
  toast('📺 تحميل العرض...');
  setTimeout(() => {
    if (type === 'stocks') { G.adBoost = 600; toast('⚡ Stock x2 10min!'); }
    else if (type === 'loot') {
      if (G.boxUsedToday) { toast('⚠️ مرة واحدة يومياً'); return; }
      G.boxUsedToday = true;
      openBox('rare', true);
    }
    else if (type === 'gems') { G.gems += 20; toast('✅ +20 💎'); }
    else if (type === 'warp') {
      let e = 1500;
      BDB.forEach(b => {
        if (b.tp === 'auto' && G.buildings[b.id] > 0)
          e += Math.floor(1500 / (b.tm / cache.speed)) * getYield(b) * G.premium;
      });
      addMoney(e * eventMult);
      toast('🚀 +' + fmt(e) + ' 💰');
    }
    save();
    updateAllUI();
  }, 800);
}

// ==================== OFFLINE & EVENTS ====================
function checkOffline() {
  let n = Date.now();
  let d = (n - (G.lastSaved || n)) / 1000;
  if (d < 0 || isNaN(d) || d < 50) return;
  if (d > 43200) d = 43200;
  calcStats();
  let e = 0;
  BDB.forEach(b => {
    if (b.tp === 'auto' && G.buildings[b.id] > 0) {
      let tt = G.timers[b.id] + (d * 0.55 * cache.offline);
      let cy = Math.floor(tt / (b.tm / cache.speed));
      G.timers[b.id] = tt % (b.tm / cache.speed);
      e += cy * getYield(b) * G.premium;
    }
  });
  if (e > 0) {
    addMoney(e);
    document.getElementById('offlineAmount').innerText = fmt(e);
    document.getElementById('offlineModal').classList.remove('hidden');
  }
}

function closeOfflineModal() {
  document.getElementById('offlineModal').classList.add('hidden');
}

function randomEvent() {
  if (eventTimer > 0) return;
  let r = Math.random();
  if (r < 0.07) { eventMult = 3; toast('🚨 Boom x3!'); }
  else if (r > 0.07 && r < 0.18) { eventMult = 0.5; toast('🚨 Crisis -50%!'); eventTimer = 18; }
  else if (r > 0.82) { eventMult = 3.5; toast('🚨 Cosmic x3.5!'); eventTimer = 25; }
}

// ==================== NAVIGATION ====================
function handleLockedNav(feature, el) {
  let names = {
    skills: 'المهارات الإستراتيجية',
    stocks: 'بورصة الأسهم',
    quests: 'المهام والقصص',
    achievements: 'لوحة الإنجازات',
    summer: 'فعاليات الصيف',
    battle: 'نظام المعارك',
    clan: 'تحالفات وفصائل',
    loot: 'صناديق الحظ',
    store: 'المتجر الماسي'
  };
  toast('🔒 ' + names[feature] + ' · يُفتح عند المستوى ' + UNLOCK[feature]);
}

function updateAllNavLock() {
  document.querySelectorAll('.nav-item.locked').forEach(item => {
    let feature = item.id.replace('nav', '').toLowerCase();
    if (feature === 'ach') feature = 'achievements';
    if (G.level >= UNLOCK[feature]) {
      item.classList.remove('locked');
      item.onclick = function() { switchTab('tab-' + feature, item); };
    }
  });
}

function renderAll() {
  renderBuildings();
  if (isUnlocked('skills')) renderSkills();
  if (isUnlocked('stocks')) renderStocks();
  if (isUnlocked('quests')) renderQuests();
  if (isUnlocked('achievements')) renderAchievements();
  if (isUnlocked('summer')) renderSummer();
  if (isUnlocked('battle')) renderBattle();
  if (isUnlocked('clan')) renderClan();
  if (isUnlocked('loot')) renderLoot();
  if (isUnlocked('store')) renderStore();
}

// ==================== RENDER FUNCTIONS ====================
function renderBuildings() {
  let d = document.getElementById('buildingsList');
  if (!d) return;
  d.innerHTML = '';
  BDB.forEach(b => {
    let l = G.buildings[b.id] || 0;
    let y = getYield(b) * G.premium;
    let txt = b.tp === 'click' ? '+' + fmt(y) : '+' + fmt(y) + '/' + (b.tm / cache.speed).toFixed(1) + 's';
    let cost = Math.floor(b.cost * Math.pow(b.mult, l) * getDiff().costMult * (1 - cache.discount));
    let can = G.money >= cost;
    d.innerHTML += `
      <div class="item-card" style="flex-direction:column;${can ? '' : 'opacity:0.45;'}" onclick="buyBuilding('${b.id}')">
        <div style="display:flex;align-items:center;gap:10px;width:100%;">
          <div class="item-icon">${b.icon}</div>
          <div class="item-info">
            <div class="item-name">${b.n}</div>
            <div class="item-stats">⚡ ${txt}</div>
          </div>
          <div class="item-action">
            <span class="item-cost">${fmt(cost)} 💰</span>
            <span style="font-size:11px;">Lvl ${l}</span>
          </div>
        </div>
      </div>`;
  });
}

function renderSkills() {
  let d = document.getElementById('skillsContent');
  if (!d) return;
  if (!isUnlocked('skills')) {
    d.innerHTML = '<div style="text-align:center;padding:40px;">🔒 يفتح عند المستوى ' + UNLOCK.skills + '</div>';
    return;
  }
  d.innerHTML = `
    <div style="text-align:center;margin-bottom:15px;background:rgba(0,0,0,0.2);padding:16px;border-radius:20px;">
      <div style="color:#94a3b8;">نقاط المهارة 💠</div>
      <div style="font-size:36px;color:var(--prestige);">${G.pp}</div>
      <button class="btn btn-prestige" style="margin:8px 0;" onclick="openPrestigeModal()">إعادة التعيين الكوني</button>
      <div>النقاط المتوقعة: <span style="color:var(--primary);">${calcPendingPP()}</span></div>
    </div>`;
  for (let t = 1; t <= 4; t++) {
    d.innerHTML += '<div style="margin:14px 0 8px;font-weight:800;color:var(--accent);">Tier ' + t + '</div>';
    SDB.filter(s => s.t === t).forEach(s => {
      let l = G.skills[s.id] || 0;
      let c = Math.floor(s.b * Math.pow(s.m, l));
      let mx = l >= s.max;
      d.innerHTML += `
        <div class="skill-node">
          <div style="font-weight:800;">${s.n} [${l}/${s.max}]</div>
          <div style="font-size:12px;color:#94a3b8;">${s.d}</div>
          <button class="btn btn-sm btn-prestige" ${mx ? 'disabled' : ''} onclick="buySkill('${s.id}')">${mx ? 'MAX' : c + ' PP'}</button>
        </div>`;
    });
  }
}

function renderStocks() {
  let d = document.getElementById('stocksContent');
  if (!d) return;
  if (!isUnlocked('stocks')) {
    d.innerHTML = '<div style="text-align:center;padding:40px;">🔒 يفتح عند المستوى ' + UNLOCK.stocks + '</div>';
    return;
  }
  d.innerHTML = '<div class="ad-banner" onclick="watchAd(\'stocks\')">📺 إعلان: مضاعف البورصة</div><div class="news-ticker">📢 أخبار السوق المالية</div><div id="stocksList"></div>';
  let sl = document.getElementById('stocksList');
  if (!sl) return;
  sl.innerHTML = '';
  StDB.forEach(s => {
    let up = s.tr > 0;
    sl.innerHTML += `
      <div class="item-card" style="border-left:4px solid ${up ? 'var(--primary)' : 'var(--danger)'};flex-direction:column;">
        <div style="display:flex;justify-content:space-between;">
          <div><span>${s.icon}</span> ${s.n}</div>
          <div style="color:${up ? 'var(--primary)' : 'var(--danger)'};">${fmt(s.pr)} 💰</div>
        </div>
        <div style="font-size:12px;">مملوك: ${s.ow || 0}</div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-sm" onclick="buyStock('${s.id}')">شراء</button>
          <button class="btn btn-sm" style="background:rgba(255,255,255,0.05);" onclick="sellStock('${s.id}')">بيع</button>
        </div>
      </div>`;
  });
}

function renderQuests() {
  let d = document.getElementById('questsContent');
  if (!d) return;
  if (!isUnlocked('quests')) {
    d.innerHTML = '<div style="text-align:center;padding:40px;">🔒 يفتح عند المستوى ' + UNLOCK.quests + '</div>';
    return;
  }
  d.innerHTML = '<h3 style="color:var(--gold);text-align:center;">المهام اليومية ⏳</h3><div id="dailyQuestsList"></div>';
  let ql = document.getElementById('dailyQuestsList');
  if (ql && G.quests && G.quests.list) {
    G.quests.list.forEach((q, i) => {
      let desc = q.id === 'q1' ? 'انقر 200 مرة' : q.id === 'q2' ? 'اشترِ 8 منشآت' : 'اربح 75,000 💰';
      let prog = q.id === 'q3' ? Math.min(q.tg, G.dailyEarned) : q.pr;
      let btn = q.cl ? '<button class="btn btn-sm" disabled>✅</button>' :
        (prog >= q.tg ? '<button class="btn btn-sm btn-gem" onclick="claimQuest(' + i + ')">+' + q.rw + '💎</button>' :
        '<span style="color:#64748b;">' + fmt(prog) + '/' + fmt(q.tg) + '</span>');
      ql.innerHTML += '<div style="background:rgba(0,229,160,0.02);border:1px solid var(--glass-border);padding:20px;border-radius:22px;margin-bottom:18px;text-align:center;"><div>' + desc + '</div><div>' + btn + '</div></div>';
    });
  }
}

function renderAchievements() {
  let d = document.getElementById('achContent');
  if (!d) return;
  if (!isUnlocked('achievements')) {
    d.innerHTML = '<div style="text-align:center;padding:40px;">🔒 يفتح عند المستوى ' + UNLOCK.achievements + '</div>';
    return;
  }
  d.innerHTML = '<h3 style="color:var(--gold);text-align:center;">الإنجازات 🏆</h3><p style="text-align:center;color:#94a3b8;">قريباً...</p>';
}

function renderSummer() {
  let d = document.getElementById('summerContent');
  if (!d) return;
  if (!isUnlocked('summer')) {
    d.innerHTML = '<div style="text-align:center;padding:40px;">🔒 يفتح عند المستوى ' + UNLOCK.summer + '</div>';
    return;
  }
  let lvl = Math.floor(G.summerShells / 130);
  let pct = ((G.summerShells % 130) / 130) * 100;
  d.innerHTML = '<h3 style="color:var(--sun);text-align:center;">☀️ فعالية الصيف</h3>' +
    '<div style="text-align:center;padding:16px;background:var(--card);border-radius:22px;">' +
    '<div style="font-size:55px;">🏖️</div><h3>تحدي الصدف</h3>' +
    '<div>🏖️ ' + fmt(G.summerShells) + ' | مستوى ' + lvl + '</div></div>' +
    '<div class="wheel-container"><h3>🎡 دولاب الحظ</h3>' +
    '<div style="margin:14px 0;">' + WP.map((p, i) => '<div class="wheel-prize" id="wp' + i + '">' + p.icon + '</div>').join('') + '</div>' +
    '<button class="btn btn-summer" onclick="spinWheel()">🎡 تدوير (إعلان)</button></div>';
}

function renderBattle() {
  let d = document.getElementById('battleContent');
  if (!d) return;
  if (!isUnlocked('battle')) {
    d.innerHTML = '<div style="text-align:center;padding:40px;">🔒 يفتح عند المستوى ' + UNLOCK.battle + '</div>';
    return;
  }
  if (battle.active) {
    let e = battle.enemy;
    d.innerHTML = '<div class="battle-card"><div style="font-size:55px;">' + (e ? e.icon : '👾') + '</div>' +
      '<h3>' + (e ? e.n : 'عدو') + '</h3><div style="color:var(--danger);">⏱️ ' + Math.ceil(battle.time) + 's</div>' +
      '<div class="hp-bar"><div class="hp-fill" style="width:' + (battle.eHP / battle.eMax * 100) + '%;background:var(--battle-red);"></div></div>' +
      '<div class="hp-bar"><div class="hp-fill" style="width:' + (battle.pHP / battle.pMax * 100) + '%;background:var(--primary);"></div></div>' +
      '<div>💰 ' + fmt(battle.reward) + '</div>' +
      '<button class="btn btn-sm" style="background:#334155;" onclick="fleeBattle()">🏃 هروب (3%)</button></div>';
  } else {
    let a = EnDB.filter(e => G.level >= e.lv);
    d.innerHTML = '<div>' + a.map(e => '<div class="item-card"><div style="font-size:42px;">' + e.icon + '</div><div><div style="font-weight:800;">' + e.n + '</div><div>❤️ ' + fmt(e.hp) + ' | 💰 ' + fmt(e.rw) + '</div></div></div>').join('') +
      '<button class="btn btn-battle" onclick="startBattle()">⚔️ بدء معركة</button></div>';
  }
}

function renderClan() {
  let d = document.getElementById('clanContent');
  if (!d) return;
  if (!isUnlocked('clan')) {
    d.innerHTML = '<div style="text-align:center;padding:40px;">🔒 يفتح عند المستوى ' + UNLOCK.clan + '</div>';
    return;
  }
  if (G.clan.joined) {
    d.innerHTML = '<div class="item-card" style="flex-direction:column;text-align:center;border:2px solid var(--clan-blue);">' +
      '<div style="font-size:45px;">🛡️</div><h3>' + G.clan.name + '</h3>' +
      '<div>تبرعات: ' + fmt(G.clan.totalContrib) + ' 💰</div>' +
      '<button class="btn btn-clan btn-sm" onclick="contributeClan()">🤝 تبرع (4%)</button></div>';
  } else {
    d.innerHTML = '<div><h3>اختر فصيلاً</h3>' + CN.map(n => '<div class="item-card" style="text-align:center;"><h4>' + n + '</h4><button class="btn btn-clan btn-sm" onclick="joinClan()">انضمام</button></div>').join('') + '</div>';
  }
}

function renderLoot() {
  let d = document.getElementById('lootContent');
  if (!d) return;
  if (!isUnlocked('loot')) {
    d.innerHTML = '<div style="text-align:center;padding:40px;">🔒 يفتح عند المستوى ' + UNLOCK.loot + '</div>';
    return;
  }
  d.innerHTML = '<div class="ad-banner" onclick="watchAd(\'loot\')">📺 إعلان: صندوق نادر</div>' +
    '<div class="item-card"><div class="item-icon">📦</div><div>صندوق عادي</div><button class="btn btn-sm" ' + (G.boxUsedToday ? 'disabled' : '') + ' onclick="if(!G.boxUsedToday){G.boxUsedToday=true;openBox(\'common\',true)}">' + (G.boxUsedToday ? 'تم' : 'فتح') + '</button></div>' +
    '<div class="item-card"><div class="item-icon">💠</div><div>صندوق نادر</div><button class="btn btn-sm" style="background:var(--accent);" ' + (G.gems >= 40 ? '' : 'disabled') + ' onclick="if(G.gems>=40){G.gems-=40;openBox(\'rare\',false)}">40 💎</button></div>' +
    '<div class="item-card"><div class="item-icon">👑</div><div>صندوق أسطوري</div><button class="btn btn-sm" style="background:var(--gold);" ' + (G.gems >= 180 ? '' : 'disabled') + ' onclick="if(G.gems>=180){G.gems-=180;openBox(\'legendary\',false)}">180 💎</button></div>';
}

function renderStore() {
  let d = document.getElementById('storeContent');
  if (!d) return;
  if (!isUnlocked('store')) {
    d.innerHTML = '<div style="text-align:center;padding:40px;">🔒 يفتح عند المستوى ' + UNLOCK.store + '</div>';
    return;
  }
  let items = [
    { n: 'رخصة x2', c: 30, m: 2 },
    { n: 'درع x3', c: 90, m: 3 },
    { n: 'جوهرة x5', c: 450, m: 5 }
  ];
  d.innerHTML = '<div class="ad-banner" onclick="watchAd(\'warp\')">📺 إعلان: تسريع الزمن</div>' +
    items.map(p => '<div class="item-card"><div>' + p.n + '</div><button class="btn btn-sm btn-gem" onclick="if(G.gems>=' + p.c + '){G.gems-=' + p.c + ';G.premium*=' + p.m + ';calcStats();updateAllUI();renderAll();save();}">' + p.c + ' 💎</button></div>').join('');
}

// ==================== UI UPDATES ====================
function updateAllUI() {
  document.getElementById('moneyDisplay').innerText = fmt(G.money);
  document.getElementById('gemsDisplay').innerText = G.gems;
  document.getElementById('incomeDisplay').innerText = fmt(cache.income * (eventMult > 1 ? eventMult : 1));
  document.getElementById('uiLevel').innerText = G.level;
  let titles = [
    { l: 1, n: 'مبتدئ' }, { l: 5, n: 'تاجر' }, { l: 15, n: 'مستثمر' },
    { l: 35, n: 'ملياردير' }, { l: 60, n: 'إمبراطور' }, { l: 110, n: 'سيد الأبعاد' }, { l: 200, n: 'خالق الأكوان' }
  ];
  let ti = 'مبتدئ';
  for (let i = titles.length - 1; i >= 0; i--) { if (G.level >= titles[i].l) { ti = titles[i].n; break; } }
  document.getElementById('uiTitle').innerText = '[' + ti + ']';
  document.getElementById('xpBar').style.width = Math.min(100, (G.xp / (Math.pow(G.level, 2.1) * 90)) * 100) + '%';
  needsUpdate = false;
}

function switchTab(tabId, el) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  if (el) el.classList.add('active');
  renderAll();
}

function openSettings() {
  let html = '<div class="modal-box"><h2>الإعدادات ⚙️</h2>' +
    '<button class="btn btn-prestige" style="margin:10px 0;" onclick="openPrestigeModal()">🌌 Prestige</button>' +
    '<button class="btn" style="background:var(--danger);color:white;margin:10px 0;" onclick="hardReset()">⚠️ مسح البيانات</button>' +
    '<button class="btn btn-cancel" onclick="this.parentElement.parentElement.remove()">إغلاق</button></div>';
  let modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = html;
  document.body.appendChild(modal);
}

function toast(msg) {
  let t = document.getElementById('toastMsg');
  t.querySelector('span').innerText = msg;
  t.classList.add('show');
  clearTimeout(t._timeout);
  t._timeout = setTimeout(() => t.classList.remove('show'), 2000);
}

function hardReset() {
  if (confirm('مسح جميع البيانات؟')) {
    localStorage.removeItem('AtharV23_Split');
    location.reload();
  }
}

// ==================== GAME LOOP ====================
let lastTime = performance.now();
let recalcTimer = 0;

function gameLoop(now) {
  let dt = (now - lastTime) / 1000;
  lastTime = now;
  if (dt > 2 || dt <= 0) dt = 0.016;
  
  if (eventTimer > 0) { eventTimer -= dt; if (eventTimer <= 0) eventMult = 1; }
  if (G.adBoost > 0) { G.adBoost -= dt; if (G.adBoost <= 0) G.adBoost = 0; }
  
  BDB.forEach(b => {
    if (b.tp === 'auto' && G.buildings[b.id] > 0) {
      G.timers[b.id] += dt;
      let cT = b.tm / cache.speed;
      if (G.timers[b.id] >= cT) {
        let cy = Math.floor(G.timers[b.id] / cT);
        G.timers[b.id] -= cy * cT;
        addMoney(getYield(b) * G.premium * cy * eventMult);
      }
    }
  });
  
  updateBattle(dt);
  
  recalcTimer += dt;
  if (recalcTimer > 0.4) { calcStats(); updateAllUI(); recalcTimer = 0; }
  else if (needsUpdate) { updateAllUI(); }
  
  requestAnimationFrame(gameLoop);
}

// ==================== START ====================
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('splashScreen').classList.add('hidden');
    initGame();
  }, 2500);
});
