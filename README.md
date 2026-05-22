            --battle-red: #f43f5e; --clan-blue: #38bdf8;
            --summer: #fb923c; --ocean: #2dd4bf; --sun: #fbbf24;
            --softcap: #f59e0b; --locked: #64748b;
            --glass-border: rgba(255, 255, 255, 0.08);
            --glass-bg: rgba(255, 255, 255, 0.02);
        }
        * {
            margin: 0; padding: 0; box-sizing: border-box;
            font-family: 'Tajawal', 'Changa', sans-serif;
            user-select: none; -webkit-user-select: none;
            touch-action: manipulation; -webkit-tap-highlight-color: transparent;
        }
        body {
            background: var(--bg); color: var(--text);
            display: flex; flex-direction: column;
            height: 100vh; height: 100dvh; overflow: hidden;
            padding-bottom: 80px;
            background-image: 
                radial-gradient(ellipse at 50% 30%, rgba(0, 229, 160, 0.08) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 20%, rgba(0, 200, 255, 0.04) 0%, transparent 40%);
            box-shadow: inset 0 0 200px rgba(0,0,0,0.8);
        }
        #bgCanvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; opacity: 0.5; }
        #splashScreen { position: fixed; inset: 0; background: #020008; z-index: 99999; display: flex; flex-direction: column; justify-content: center; align-items: center; transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.8s; }
        #splashScreen.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
        .splash-logo { font-size: 90px; animation: pulseLogo 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite, glowPulse 1.6s infinite; filter: drop-shadow(0 0 20px rgba(0, 229, 160, 0.3)); }
        @keyframes pulseLogo { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        @keyframes glowPulse { 0%, 100% { filter: drop-shadow(0 0 20px rgba(0, 229, 160, 0.3)); } 50% { filter: drop-shadow(0 0 40px rgba(250, 204, 21, 0.5)); } }
        .splash-title { font-family: 'Changa', sans-serif; font-size: 48px; font-weight: 800; background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 50%, var(--ultra) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-top: 20px; letter-spacing: 8px; animation: titleShine 2.5s infinite ease-in-out; }
        @keyframes titleShine { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.3); } }
        .splash-loading { width: 260px; height: 5px; background: rgba(255,255,255,0.03); border-radius: 10px; margin-top: 40px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
        .splash-loading-fill { height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent), var(--prestige)); width: 0%; animation: loadBar 2.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; border-radius: 10px; box-shadow: 0 0 25px rgba(0, 229, 160, 0.4); }
        @keyframes loadBar { to { width: 100%; } }
        .splash-version { position: absolute; bottom: 50px; color: #475569; font-size: 12px; letter-spacing: 3px; font-weight: 700; }
        .floating-text { position: fixed; pointer-events: none; z-index: 9999; font-weight: 800; font-size: 28px; font-family: 'Changa', sans-serif; color: var(--primary); text-shadow: 0 2px 10px rgba(0,0,0,0.9), 0 0 15px rgba(0, 229, 160, 0.6); animation: floatUpPhysics 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; white-space: nowrap; }
        @keyframes floatUpPhysics { 0% { transform: translate(0, 0) scale(0.6) rotate(calc(var(--rand-deg) * 0.3)); opacity: 0; } 20% { opacity: 1; transform: translate(var(--rand-x), var(--rand-y)) scale(1.2) rotate(var(--rand-deg)); } 100% { transform: translate(calc(var(--rand-x) * 1.8), calc(var(--rand-y) * 2.5 - 140px)) scale(0.7) rotate(calc(var(--rand-deg) * 1.6)); opacity: 0; } }
        .toast { position: fixed; top: -60px; left: 50%; transform: translateX(-50%); background: rgba(15, 15, 30, 0.9); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); color: #fff; padding: 12px 28px; border-radius: 30px; font-weight: 700; z-index: 99999; opacity: 0; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); text-align: center; pointer-events: none; font-size: 15px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 15px 40px rgba(0,0,0,0.6), 0 0 25px rgba(0, 229, 160, 0.2); white-space: nowrap; }
        .toast.show { opacity: 1; top: 50px; }
        .modal { position: fixed; inset: 0; background: rgba(3, 2, 10, 0.88); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); z-index: 9000; display: flex; justify-content: center; align-items: center; padding: 24px; animation: fadeIn 0.25s ease; }
        .hidden { display: none !important; }
        .modal-box { background: rgba(15, 15, 32, 0.8); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border: 1px solid var(--glass-border); padding: 30px; border-radius: 28px; text-align: center; width: 100%; max-width: 450px; box-shadow: 0 30px 60px rgba(0,0,0,0.7), inset 0 0 30px rgba(255,255,255,0.02); max-height: 85vh; overflow-y: auto; color: var(--text); }
        .btn { background: linear-gradient(135deg, var(--primary), #00b37e); color: #010105; border: none; padding: 16px 28px; border-radius: 16px; font-weight: 800; font-size: 16px; cursor: pointer; transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); width: 100%; letter-spacing: 0.5px; box-shadow: 0 8px 20px rgba(0, 229, 160, 0.15); position: relative; overflow: hidden; }
        .btn:active { transform: scale(0.96); }
        .btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none !important; background: #222538 !important; color: #64748b !important; box-shadow: none !important; }
        .btn-prestige { background: linear-gradient(135deg, var(--prestige), #7c3aed); color: #010105; box-shadow: 0 8px 20px rgba(167, 139, 250, 0.25); }
        .btn-ultra { background: linear-gradient(135deg, var(--ultra), #eab308); color: #010105; font-size: 18px; box-shadow: 0 8px 25px rgba(250, 204, 21, 0.4); }
        .btn-gem { background: linear-gradient(135deg, var(--gem), #e11d48); color: #fff; box-shadow: 0 8px 20px rgba(244, 63, 94, 0.25); }
        .btn-battle { background: linear-gradient(135deg, var(--battle-red), #e11d48); color: #fff; box-shadow: 0 8px 20px rgba(244, 63, 94, 0.25); }
        .btn-clan { background: linear-gradient(135deg, var(--clan-blue), #0284c7); color: #010105; box-shadow: 0 8px 20px rgba(56, 189, 248, 0.25); }
        .btn-summer { background: linear-gradient(135deg, var(--summer), #ea580c); color: #fff; box-shadow: 0 8px 20px rgba(251, 146, 60, 0.25); }
        .btn-sm { padding: 8px 14px; font-size: 13px; width: auto; display: inline-block; border-radius: 12px; box-shadow: none; }
        .header { background: rgba(8, 8, 22, 0.8); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); padding: 16px 20px; text-align: center; border-bottom: 1px solid var(--glass-border); z-index: 10; box-shadow: 0 8px 25px rgba(0,0,0,0.4); }
        .xp-bar-container { width: 100%; height: 6px; background: rgba(0,0,0,0.5); border-radius: 10px; overflow: hidden; margin-top: 10px; border: 1px solid var(--glass-border); }
        .xp-fill { height: 100%; background: linear-gradient(90deg, var(--xp), var(--accent)); transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 0 15px rgba(34, 211, 238, 0.5); border-radius: 10px; }
        .top-stats { display: flex; justify-content: space-around; font-size: 28px; font-weight: 800; margin-top: 10px; align-items: center; }
        .stat-money { color: var(--primary); text-shadow: 0 0 25px rgba(0, 229, 160, 0.35); font-variant-numeric: tabular-nums; }
        .stat-gems { color: var(--gem); font-size: 22px; font-variant-numeric: tabular-nums; }
        .clicker-section { height: 22vh; display: flex; justify-content: center; align-items: center; position: relative; z-index: 5; }
        .main-btn { width: 130px; height: 130px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #00e5a0 0%, #004d3a 100%); border: 3px solid rgba(255,255,255,0.15); box-shadow: 0 0 60px rgba(0, 229, 160, 0.3), 0 20px 40px rgba(0,0,0,0.7); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 5; transition: transform 0.08s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.1s; cursor: pointer; position: relative; overflow: hidden; }
        .main-btn::after { content: ''; position: absolute; inset: -12px; border-radius: 50%; border: 1px solid rgba(0, 200, 255, 0.2); animation: spin 10s linear infinite; opacity: 0.6; pointer-events: none; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .main-btn:active { transform: scale(0.88) translateY(4px); box-shadow: 0 0 30px rgba(0, 229, 160, 0.4), 0 10px 20px rgba(0,0,0,0.5); }
        .tab-content { flex: 1; overflow-y: auto; padding: 18px; display: none; padding-bottom: 40px; -webkit-overflow-scrolling: touch; z-index: 2; height: calc(100vh - 380px); }
        .tab-content.active { display: block; animation: tabFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes tabFadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .item-card { background: var(--card); border: 1px solid var(--glass-border); border-radius: 22px; padding: 16px; margin-bottom: 14px; display: flex; align-items: center; gap: 14px; transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); cursor: pointer; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
        .item-card:active { background: rgba(30, 30, 60, 0.5); border-color: var(--primary); transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,229,160,0.15); }
        .item-icon { font-size: 34px; min-width: 64px; height: 64px; background: rgba(0,0,0,0.4); border-radius: 16px; display: flex; justify-content: center; align-items: center; border: 1px solid var(--glass-border); }
        .item-info { flex: 1; text-align: initial; }
        .item-name { font-size: 16px; font-weight: 800; color: #fff; }
        .item-stats { font-size: 13px; font-weight: 700; color: var(--accent); margin-top: 2px; }
        .item-action { text-align: right; min-width: 90px; z-index: 2; }
        .item-cost { font-size: 15px; font-weight: 800; color: var(--primary); display: block; margin-bottom: 4px; }
        .ms-container { margin-top: 10px; background: rgba(0,0,0,0.5); height: 16px; border-radius: 10px; border: 1px solid var(--glass-border); position: relative; overflow: hidden; width: 100%; }
        .ms-fill { height: 100%; background: linear-gradient(90deg, var(--clan-blue), var(--primary), var(--accent)); transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .ms-text { position: absolute; inset: 0; text-align: center; font-size: 11px; font-weight: 800; color: #fff; line-height: 16px; text-shadow: 0 1px 4px #000; }
        .stock-card { border-left: 4px solid var(--primary); flex-direction: column; align-items: stretch; gap: 12px; }
        .stock-down { border-left-color: var(--danger); }
        .stock-header { display: flex; justify-content: space-between; align-items: center; }
        .news-ticker { background: rgba(251,191,36,0.08); border: 1px solid rgba(251,191,36,0.25); padding: 12px; border-radius: 16px; font-size: 14px; color: var(--gold); font-weight: 700; text-align: center; margin-bottom: 16px; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); }
        .skill-node { border: 1px solid var(--glass-border); background: var(--card); border-radius: 20px; padding: 16px; text-align: center; margin-bottom: 14px; }
        .daily-box { background: rgba(0,229,160,0.02); border: 1px solid var(--glass-border); padding: 20px; border-radius: 22px; margin-bottom: 18px; text-align: center; }
        .battle-card { border: 2px solid var(--battle-red); background: rgba(244,63,94,0.03); border-radius: 22px; padding: 18px; margin-bottom: 14px; text-align: center; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); }
        .hp-bar { width: 100%; height: 16px; background: rgba(0,0,0,0.6); border-radius: 10px; overflow: hidden; margin: 8px 0; border: 1px solid var(--glass-border); }
        .hp-fill { height: 100%; transition: width 0.25s ease; }
        .story-msg { background: linear-gradient(135deg, rgba(251,191,36,0.04), rgba(167,139,250,0.04)); border: 1px solid rgba(251,191,36,0.15); border-radius: 18px; padding: 16px; margin-bottom: 12px; text-align: initial; }
        .story-msg .s-title { color: var(--gold); font-weight: 800; font-size: 15px; }
        .story-msg .s-text { color: #94a3b8; font-size: 13px; margin: 6px 0; line-height: 1.6; }
        .wheel-container { text-align: center; padding: 22px; background: rgba(251,191,36,0.03); border: 1px solid rgba(251,191,36,0.25); border-radius: 24px; margin: 18px 0; }
        .wheel-prize { display: inline-block; width: 48px; height: 48px; border-radius: 50%; margin: 4px; text-align: center; line-height: 48px; font-size: 22px; background: #000; border: 2px solid rgba(255,255,255,0.1); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .wheel-prize.highlight { transform: scale(1.35); border-color: var(--ultra); box-shadow: 0 0 35px var(--ultra); z-index: 10; position: relative; }
        .dim-indicator { display: inline-block; background: rgba(245,158,11,0.15); color: var(--softcap); padding: 3px 9px; border-radius: 8px; font-size: 10px; font-weight: 800; margin-right: 6px; border: 1px solid rgba(245,158,11,0.25); }
        .locked-overlay { text-align: center; padding: 40px 24px; color: var(--locked); background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border-radius: 24px; border: 1px solid rgba(255,255,255,0.05); margin: 20px 0; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .locked-overlay .lock-icon { font-size: 70px; margin-bottom: 20px; filter: drop-shadow(0 8px 15px rgba(0,0,0,0.6)); }
        .locked-overlay h3 { color: #cbd5e1; margin-bottom: 12px; font-size: 20px; font-weight: 800; font-family: 'Changa', sans-serif; }
        .locked-overlay p { font-size: 14px; color: #94a3b8; line-height: 1.7; margin-bottom: 20px; }
        .locked-overlay .progress-lock { width: 80%; height: 8px; background: rgba(0,0,0,0.5); border-radius: 10px; margin: 20px auto; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); }
        .locked-overlay .progress-fill { height: 100%; background: linear-gradient(90deg, #475569, #94a3b8); transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1); border-radius: 10px; }
        .ad-banner { background: linear-gradient(90deg, var(--ad-color), var(--danger)); color: #010105; text-align: center; padding: 12px; font-weight: 800; border-radius: 14px; margin: 12px 0; cursor: pointer; animation: adGlow 1.8s infinite ease-in-out; font-size: 14px; box-shadow: 0 4px 15px rgba(249,115,22,0.2); }
        @keyframes adGlow { 0%,100% { box-shadow: 0 0 15px rgba(249,115,22,0.3); transform: scale(1); } 50% { box-shadow: 0 0 30px rgba(249,115,22,0.6); transform: scale(1.01); } }
        .lang-switch { display: inline-block; cursor: pointer; padding: 7px 14px; background: rgba(255,255,255,0.04); border-radius: 10px; font-size: 13px; font-weight: 700; color: var(--text); border: 1px solid var(--glass-border); margin: 5px; transition: 0.2s; }
        .lang-switch:active { background: rgba(255,255,255,0.1); }
        .bottom-nav { position: fixed; bottom: 0; left: 0; width: 100%; height: 80px; background: rgba(8, 8, 20, 0.8); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border-top: 1px solid var(--glass-border); display: flex; z-index: 50; overflow-x: auto; scrollbar-width: none; padding-bottom: env(safe-area-inset-bottom); box-shadow: 0 -10px 30px rgba(0,0,0,0.5); }
        .bottom-nav::-webkit-scrollbar { display: none; }
        .nav-item { flex: 0 0 auto; min-width: 70px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #64748b; cursor: pointer; padding: 0 6px; font-size: 10px; font-weight: 700; gap: 4px; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); position: relative; }
        .nav-item.active { color: var(--primary); transform: translateY(-8px); }
        .nav-item.locked { opacity: 0.4; pointer-events: auto; filter: grayscale(1); }
        .nav-item.locked .nav-icon::after { content: "🔒"; position: absolute; top: -6px; right: -4px; font-size: 10px; background: rgba(0,0,0,0.7); border-radius: 50%; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; line-height: 1; border: 1px solid rgba(255,255,255,0.1); }
        .nav-item.locked .nav-lvl-req { display: block; font-size: 8px; color: #94a3b8; position: absolute; bottom: 2px; font-weight: 900; }
        .nav-item.locked .nav-icon { position: relative; }
        .nav-icon { font-size: 22px; transition: transform 0.3s; position: relative; }
        .nav-item.active .nav-icon { transform: scale(1.2); filter: drop-shadow(0 0 12px rgba(0, 229, 160, 0.5)); }
        .nav-label { font-size: 9px; font-weight: 700; }
        .summer-progress { width: 100%; height: 11px; background: rgba(0,0,0,0.5); border-radius: 6px; overflow: hidden; margin-top: 10px; border: 1px solid var(--glass-border); }
        .summer-progress-fill { height: 100%; background: linear-gradient(90deg, var(--summer), var(--sun)); transition: width 0.4s; }
        .summer-event-card { background: var(--card); border: 1px solid rgba(251,146,60,0.3); padding: 16px; border-radius: 22px; text-align: center; margin-bottom: 16px; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); }
        @media (min-width: 768px) { body { max-width: 520px; margin: 0 auto; border-left: 1px solid var(--glass-border); border-right: 1px solid var(--glass-border); } .bottom-nav { max-width: 520px; left: 50%; transform: translateX(-50%); } .main-btn { width: 140px; height: 140px; } }
    </style>
</head>
<body>
<canvas id="bgCanvas"></canvas>

<div id="splashScreen"><div class="splash-logo">👑</div><div class="splash-title" id="splashTitle">أثــر</div><div class="splash-loading"><div class="splash-loading-fill"></div></div><div class="splash-version">V21.0 · النسخة المتوازنة</div></div>

<div id="dailyRewardModal" class="modal hidden"><div class="modal-box"><h2 style="color:var(--sun);" id="lblDailyRewardTitle">المكافأة اليومية 🎁</h2><div style="font-size:55px; margin: 15px 0;">☀️</div><div style="font-size:30px;color:#fff;font-weight:800;" id="dailyText">+10 Gems</div><div style="color:var(--ocean);margin-bottom:18px; font-weight: 700;"><span id="lblDailyStreak">اليوم</span> <span id="dailyStreak">1</span> 🔥</div><button class="btn btn-ultra" id="lblDailyClaimBtn" onclick="claimDailyReward()">استلام المكافأة</button></div></div>
<div id="startupModal" class="modal hidden"><div class="modal-box"><h2 style="color:var(--ultra);" id="lblStartupTitle">تأسيس الإمبراطورية 👑</h2><p style="color:#94a3b8; margin: 10px 0;" id="lblStartupDesc">أدخل اسم شركتك لبدء رحلتك نحو الأسطورة</p><input type="text" id="companyNameInput" class="modal-input" placeholder="اسم شركتك" maxlength="20" style="width:100%; padding:16px; border-radius:14px; background:rgba(0,0,0,0.4); border:1px solid var(--glass-border); color:#fff; text-align:center; font-size:18px; margin-bottom:20px;"><button class="btn btn-ultra" id="lblStartupBtn" onclick="startGame()">بدء اللعب 🚀</button></div></div>
<div id="settingsModal" class="modal hidden"><div class="modal-box"><h2 style="color:white; margin-bottom: 15px;" id="lblSettingsTitle">الإعدادات ⚙️</h2><button class="btn" style="background:var(--prestige);color:#010105;margin-bottom:12px;" onclick="toggleLang()">🌍 اللغة / Language</button><button class="btn btn-prestige" style="margin-bottom:12px;" onclick="openPrestigeModal()">🌌 إعادة التعيين الكوني (Prestige)</button><button class="btn btn-prestige" style="margin-bottom:12px;" id="lblGiftCode" onclick="let c=prompt(lang==='ar'?'أدخل الكود:':'Enter code:');if(c)redeemCode(c);">🎁 كود الهدايا</button><button class="btn" style="background:var(--danger);color:white;margin-bottom:12px;" id="lblResetData" onclick="hardReset()">⚠️ مسح البيانات</button><button class="btn" style="background:rgba(255,255,255,0.05);color:white; border: 1px solid var(--glass-border);" id="lblCloseSettings" onclick="document.getElementById('settingsModal').classList.add('hidden')">إغلاق</button></div></div>
<div id="offlineModal" class="modal hidden"><div class="modal-box" style="border-color:var(--gold);"><h2 style="color:var(--gold);" id="lblOfflineTitle">تقرير الأرباح وأنت غائب 🌙</h2><div style="font-size:42px;color:var(--primary);font-weight:800; margin: 20px 0;">+<span id="offlineAmount">0</span>💰</div><button class="btn" id="lblOfflineClaim" onclick="closeOfflineModal()">تحويل للخزينة</button></div></div>
<div id="battleResultModal" class="modal hidden"><div class="modal-box" id="battleResultContent"></div></div>
<div id="prestigeModal" class="modal hidden">
    <div class="modal-box" style="border: 1px solid rgba(167, 139, 250, 0.3);">
        <div style="font-size: 50px; margin-bottom: 15px;">🌌</div>
        <h2 style="color: var(--prestige); font-weight: 800; margin-bottom: 15px;"><span id="prestigeTitle">الارتقاء الكوني</span></h2>
        <p style="color: #cbd5e1; line-height: 1.8; margin-bottom: 20px; font-size: 15px;" id="prestigeDesc">
            إعادة التعيين الكوني ستعيد <span style="color: var(--danger); font-weight: bold;">ذهبك ومستوى إنتاجك إلى الصفر</span>،
            لكنها ستمنحك <span style="color: var(--prestige); font-weight: bold;">نقاط مهارة كونية (PP)!</span>
            <br>استخدم هذه النقاط لفتح تطويرات أسطورية دائمة.
        </p>
        <div style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 16px; margin-bottom: 20px; border: 1px solid var(--glass-border);">
            <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 8px;">
                <span>النقاط المكتسبة:</span>
                <span style="color: var(--prestige); font-weight: 800; font-size: 20px;" id="pendingPP">0</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 14px;">
                <span>إجمالي نقاطك:</span>
                <span style="color: var(--primary); font-weight: 800;" id="totalPPDisplay">0</span>
            </div>
        </div>
        <div style="display: flex; gap: 12px;">
            <button class="btn btn-prestige" id="confirmPrestigeBtn" onclick="confirmPrestige()" style="flex: 2;">تأكيد إعادة التعيين</button>
            <button class="btn" style="flex: 1; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--glass-border); box-shadow: none;" onclick="closePrestigeModal()">إلغاء</button>
        </div>
    </div>
</div>

<div class="toast" id="toastMsg"><span>تم!</span></div>

<div class="header">
    <div style="display:flex;justify-content:space-between;align-items:center;">
        <div style="display:flex;align-items:center;gap:8px;"><div style="color:var(--xp); font-weight: 800; font-size: 15px;">Lvl <span id="uiLevel">1</span></div><div id="uiTitle" style="color:#94a3b8;font-size:12px; font-weight: 700; background: rgba(255,255,255,0.03); padding: 2px 10px; border-radius: 12px;">[مبتدئ]</div></div>
        <div style="font-weight: 800; font-size: 16px; color: #fff; letter-spacing: 1px;" id="uiCompanyName">الشركة</div>
        <div style="display:flex;gap:6px;align-items:center;"><span class="lang-switch" onclick="toggleLang()" id="langBtn">🌍 EN</span><span style="cursor:pointer;font-size:20px;" onclick="document.getElementById('settingsModal').classList.remove('hidden')">⚙️</span></div>
    </div>
    <div class="xp-bar-container"><div class="xp-fill" id="xpBar" style="width:0%;"></div></div>
    <div class="top-stats"><div class="stat-money"><span id="moneyDisplay">0</span> 💰</div><div class="stat-gems"><span id="gemsDisplay">0</span> 💎</div></div>
    <div style="color:var(--gold);font-weight:700;background:rgba(251,191,36,0.08);padding:5px 16px;border-radius:16px;margin-top:8px;display:inline-block; font-size: 13px; border: 1px solid rgba(251,191,36,0.15);">+<span id="incomeDisplay">0</span>/s</div>
</div>

<div class="clicker-section" id="clickArea"><div class="main-btn" id="mainBtn" onpointerdown="handleClick(event)"><h2 style="color:white;font-size:24px; font-weight: 800; letter-spacing: 1px; text-shadow: 0 2px 10px rgba(0,0,0,0.5);" id="lblMainBtnText">أثــر</h2></div></div>

<div id="tab-buildings" class="tab-content active"><div style="display:flex;justify-content:space-between;margin-bottom:16px; align-items: center;"><h3 style="color:var(--text); font-weight: 800;" id="lblBuildingsTitle">المنشآت 🏭</h3><button class="btn btn-sm" style="background:rgba(255,255,255,0.03);border:1px solid var(--primary);color:var(--primary);" id="buyMultBtn" onclick="toggleBuyMult()">x1</button></div><div id="buildingsList"></div></div>
<div id="tab-skills" class="tab-content"><div id="skillsContent"></div></div>
<div id="tab-stocks" class="tab-content"><div id="stocksContent"></div></div>
<div id="tab-quests" class="tab-content"><div id="questsContent"></div></div>
<div id="tab-achievements" class="tab-content"><div id="achContent"></div></div>
<div id="tab-summer" class="tab-content"><div id="summerContent"></div></div>
<div id="tab-battle" class="tab-content"><div id="battleContent"></div></div>
<div id="tab-clan" class="tab-content"><div id="clanContent"></div></div>
<div id="tab-loot" class="tab-content"><div id="lootContent"></div></div>
<div id="tab-store" class="tab-content"><div id="storeContent"></div></div>

<div class="bottom-nav">
    <div class="nav-item active" onclick="switchTab('tab-buildings',this)"><div class="nav-icon">🏭</div><span class="nav-label" id="navLblBuildings">منشآت</span></div>
    <div class="nav-item locked" id="navSkills" data-unlock="3" onclick="handleLockedNav('skills', this)"><div class="nav-icon">🌳</div><span class="nav-label">مهارات</span><span class="nav-lvl-req">Lvl 3</span></div>
    <div class="nav-item locked" id="navStocks" data-unlock="5" onclick="handleLockedNav('stocks', this)"><div class="nav-icon">📈</div><span class="nav-label">بورصة</span><span class="nav-lvl-req">Lvl 5</span></div>
    <div class="nav-item locked" id="navQuests" data-unlock="1" onclick="handleLockedNav('quests', this)"><div class="nav-icon">📜</div><span class="nav-label">مهام</span><span class="nav-lvl-req">Lvl 1</span></div>
    <div class="nav-item locked" id="navAch" data-unlock="1" onclick="handleLockedNav('achievements', this)"><div class="nav-icon">⭐</div><span class="nav-label">إنجازات</span><span class="nav-lvl-req">Lvl 1</span></div>
    <div class="nav-item locked" id="navSummer" data-unlock="1" onclick="handleLockedNav('summer', this)"><div class="nav-icon">☀️</div><span class="nav-label">الصيف</span><span class="nav-lvl-req">Lvl 1</span></div>
    <div class="nav-item locked" id="navBattle" data-unlock="8" onclick="handleLockedNav('battle', this)"><div class="nav-icon">⚔️</div><span class="nav-label">معركة</span><span class="nav-lvl-req">Lvl 8</span></div>
    <div class="nav-item locked" id="navClan" data-unlock="15" onclick="handleLockedNav('clan', this)"><div class="nav-icon">🛡️</div><span class="nav-label">فصائل</span><span class="nav-lvl-req">Lvl 15</span></div>
    <div class="nav-item locked" id="navLoot" data-unlock="4" onclick="handleLockedNav('loot', this)"><div class="nav-icon">🎁</div><span class="nav-label">صناديق</span><span class="nav-lvl-req">Lvl 4</span></div>
    <div class="nav-item locked" id="navStore" data-unlock="1" onclick="handleLockedNav('store', this)"><div class="nav-icon">💎</div><span class="nav-label">متجر</span><span class="nav-lvl-req">Lvl 1</span></div>
</div>

<script>
    // ==================== V21 - النسخة المتوازنة ====================
    const canvas=document.getElementById('bgCanvas'),ctx=canvas.getContext('2d');
    let particles=[], mouse={x: null, y: null, radius: 110};
    function rc(){canvas.width=window.innerWidth;canvas.height=window.innerHeight}
    window.addEventListener('resize',rc);rc();
    window.addEventListener('pointermove', (e)=>{ mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('pointerleave', ()=>{ mouse.x = null; mouse.y = null; });
    for(let i=0;i<60;i++){particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.8+0.6,dx:(Math.random()-0.5)*0.4,dy:(Math.random()-0.5)*0.4,a:Math.random()*0.5+0.25});}
    function abg(){ctx.clearRect(0,0,canvas.width,canvas.height);particles.forEach(p=>{p.x+=p.dx; p.y+=p.dy;if(p.x<0||p.x>canvas.width)p.dx*=-1;if(p.y<0||p.y>canvas.height)p.dy*=-1;if(mouse.x != null && mouse.y != null) {let dx = p.x - mouse.x, dy = p.y - mouse.y, distance = Math.sqrt(dx*dx + dy*dy);if(distance < mouse.radius) {let force = (mouse.radius - distance) / mouse.radius * 3;p.x += (dx / distance) * force; p.y += (dy / distance) * force;}}ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(0,229,160,${p.a})`;ctx.fill();});requestAnimationFrame(abg);}
    abg();

    window.addEventListener('DOMContentLoaded',()=>{setTimeout(()=>{document.getElementById('splashScreen').classList.add('hidden');initGame()},2800)});

    const SFX=["","K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc"];
    function fmt(n){if(isNaN(n)||n<0||n===null)return"0";if(n<1000)return Math.floor(n).toString();let t=Math.log10(Math.abs(n))/3|0;if(t>=SFX.length)return n.toExponential(2);return(n/Math.pow(10,t*3)).toFixed(2)+SFX[t]}

    const LG={
        ar:{
            titles:[{l:1,n:"مبتدئ"},{l:5,n:"تاجر"},{l:15,n:"مستثمر"},{l:35,n:"ملياردير"},{l:60,n:"إمبراطور"},{l:110,n:"سيد الأبعاد"},{l:200,n:"خالق الأكوان"},{l:500,n:"حارس التوازن"}],
            invalidCode:"❌ كود غير صالح",codeSuccess:"🎁 تم التفعيل!",mainBtnText:"أثــر",
            dailyRewardTitle:"المكافأة اليومية 🎁",dailyStreak:"اليوم",dailyClaimBtn:"استلام",
            startupTitle:"تأسيس الإمبراطورية 👑",startupDesc:"أدخل اسم شركتك",startupBtn:"بدء اللعب 🚀",
            settingsTitle:"الإعدادات ⚙️",giftCode:"🎁 كود الهدايا",resetData:"⚠️ مسح البيانات",closeSettings:"إغلاق",
            offlineTitle:"تقرير الأرباح 🌙",offlineClaim:"تحويل للخزينة",buildingsTitle:"المنشآت 🏭",
            navBuildings:"منشآت",navSkills:"مهارات",navStocks:"بورصة",navQuests:"مهام",navAch:"إنجازات",navSummer:"الصيف",navBattle:"معركة",navClan:"فصائل",navLoot:"صناديق",navStore:"متجر"
        },
        en:{
            titles:[{l:1,n:"Novice"},{l:5,n:"Trader"},{l:15,n:"Investor"},{l:35,n:"Billionaire"},{l:60,n:"Emperor"},{l:110,n:"Lord"},{l:200,n:"Creator"},{l:500,n:"Keeper"}],
            invalidCode:"❌ Invalid Code",codeSuccess:"🎁 Activated!",mainBtnText:"Athar",
            dailyRewardTitle:"Daily Reward 🎁",dailyStreak:"Day",dailyClaimBtn:"Claim",
            startupTitle:"Found Empire 👑",startupDesc:"Enter company name",startupBtn:"Start Game 🚀",
            settingsTitle:"Settings ⚙️",giftCode:"🎁 Gift Code",resetData:"⚠️ Wipe Data",closeSettings:"Close",
            offlineTitle:"Earnings Report 🌙",offlineClaim:"Collect",buildingsTitle:"Buildings 🏭",
            navBuildings:"Build",navSkills:"Skills",navStocks:"Stocks",navQuests:"Quests",navAch:"Achv",navSummer:"Summer",navBattle:"Battle",navClan:"Clans",navLoot:"Loot",navStore:"Store"
        }
    };
    let lang=localStorage.getItem('athar_lang21')||'ar';
    function tk(k){return LG[lang][k]||k}
    function toggleLang(){
        lang=lang==='ar'?'en':'ar';localStorage.setItem('athar_lang21',lang);
        document.getElementById('htmlRoot').dir=lang==='ar'?'rtl':'ltr';
        document.getElementById('langBtn').innerText=lang==='ar'?'🌍 EN':'🌍 عربي';
        updateAllUI();updateAllNavLock();renderAll();
    }
    function updateTitle(){let tl=LG[lang].titles;let ti=tl[0].n;for(let i=tl.length-1;i>=0;i--){if(G.level>=tl[i].l){ti=tl[i].n;break}}document.getElementById('uiTitle').innerText='['+ti+']';}

    const UNLOCK={skills:3,stocks:5,quests:1,achievements:1,summer:1,battle:8,clan:15,loot:4,store:1};
    function isUnlocked(f){return G.level>=UNLOCK[f]}

    // ============ توازن جديد V21 ============
    const BDB=[
        {id:'b0',n:{ar:"جهد شخصي",en:"Manual"},icon:"🛠️",cost:10,mult:1.18,y:0.5,tm:0,tp:'click',sc:25},
        {id:'b1',n:{ar:"مكبس حراري",en:"Press"},icon:"👕",cost:150,mult:1.20,y:2,tm:3,tp:'auto',sc:20},
        {id:'b2',n:{ar:"خط مشروبات",en:"Drinks"},icon:"⚡",cost:2000,mult:1.22,y:40,tm:6,tp:'auto',sc:18},
        {id:'b3',n:{ar:"سكوتر توصيل",en:"Scooter"},icon:"🛵",cost:30000,mult:1.25,y:1200,tm:15,tp:'auto',sc:15},
        {id:'b4',n:{ar:"معرض أثر",en:"Store"},icon:"🏪",cost:600000,mult:1.28,y:20000,tm:30,tp:'auto',sc:12},
        {id:'b5',n:{ar:"أبحاث ذكاء",en:"AI Lab"},icon:"🤖",cost:15000000,mult:1.32,y:300000,tm:70,tp:'auto',sc:10},
        {id:'b6',n:{ar:"مدينة صناعية",en:"City"},icon:"🏙️",cost:5e9,mult:1.36,y:8e7,tm:150,tp:'auto',sc:8},
        {id:'b7',n:{ar:"محطة الزمكان",en:"Hub"},icon:"🌌",cost:2e12,mult:1.40,y:3e10,tm:600,tp:'auto',sc:7},
        {id:'b8',n:{ar:"تعدين فضائي",en:"Asteroid"},icon:"☄️",cost:2e16,mult:1.44,y:1e13,tm:1200,tp:'auto',sc:6},
        {id:'b9',n:{ar:"مصفوفة كمية",en:"Quantum"},icon:"💻",cost:5e19,mult:1.48,y:8e16,tm:3500,tp:'auto',sc:5},
        {id:'b10',n:{ar:"محاكي أكوان",en:"Multiverse"},icon:"🪐",cost:5e23,mult:1.50,y:1e20,tm:15000,tp:'auto',sc:4}
    ];

    const MS=[25,50,100,200,400,800,1500,3000,6000,12000,25000,50000];
    function dimFac(l,sc){if(l<=sc)return 1;return Math.pow(sc/l, 0.55)} // أقوى softcap
    function msBonus(l){let b=1;MS.forEach(m=>{if(l>=m)b*=1.35});return Math.min(b, 500)} // أبطأ

    const SDB=[
        {id:'s1',t:1,n:{ar:"قوة النقر",en:"Click"},d:{ar:"+35%",en:"+35%"},max:25,b:3,m:1.8},
        {id:'s2',t:1,n:{ar:"مفاوض",en:"Negotiator"},d:{ar:"-1.2%",en:"-1.2%"},max:30,b:5,m:1.9},
        {id:'s3',t:2,n:{ar:"أتمتة",en:"Automation"},d:{ar:"+3%",en:"+3%"},max:25,b:12,m:2.2},
        {id:'s4',t:2,n:{ar:"أوفلاين",en:"Offline"},d:{ar:"+8%",en:"+8%"},max:12,b:25,m:2.5},
        {id:'s5',t:3,n:{ar:"نقرة كونية",en:"Cosmic"},d:{ar:"+1%",en:"+1%"},max:10,b:80,m:2.8},
        {id:'s6',t:3,n:{ar:"لمسة ذهبية",en:"Golden"},d:{ar:"+20%",en:"+20%"},max:15,b:50,m:3.0},
        {id:'s7',t:4,n:{ar:"سرعة كونية",en:"Speed"},d:{ar:"+2%",en:"+2%"},max:8,b:150,m:3.5}
    ];

    let StDB=[{id:'s1',n:{ar:"عقارات",en:"Real Estate"},icon:"🏠",pr:30,tr:1,vl:0.025,ow:0,hs:[30,30,30,30,30]},{id:'s2',n:{ar:"تقنية",en:"Tech"},icon:"💻",pr:100,tr:1,vl:0.08,ow:0,hs:[100,100,100,100,100]},{id:'s3',n:{ar:"عملات",en:"Crypto"},icon:"🪙",pr:400,tr:-1,vl:0.25,ow:0,hs:[400,400,400,400,400]},{id:'s4',n:{ar:"طاقة",en:"Energy"},icon:"⚡",pr:180,tr:1,vl:0.06,ow:0,hs:[180,180,180,180,180]},{id:'s5',n:{ar:"ذهب",en:"Gold"},icon:"🥇",pr:600,tr:1,vl:0.04,ow:0,hs:[600,600,600,600,600]},{id:'s6',n:{ar:"صناعة",en:"Industry"},icon:"🏭",pr:75,tr:-1,vl:0.1,ow:0,hs:[75,75,75,75,75]},{id:'s7',n:{ar:"فضاء",en:"Space"},icon:"🚀",pr:2500,tr:2,vl:0.12,ow:0,hs:[2500,2500,2500,2500,2500]},{id:'s8',n:{ar:"غذاء",en:"Food"},icon:"🌾",pr:50,tr:1,vl:0.03,ow:0,hs:[50,50,50,50,50]},{id:'s9',n:{ar:"أدوية",en:"Pharma"},icon:"💊",pr:220,tr:1,vl:0.07,ow:0,hs:[220,220,220,220,220]},{id:'s10',n:{ar:"نفط",en:"Oil"},icon:"🛢️",pr:110,tr:-1,vl:0.18,ow:0,hs:[110,110,110,110,110]},{id:'s11',n:{ar:"تأمين",en:"Insurance"},icon:"🛡️",pr:140,tr:1,vl:0.05,ow:0,hs:[140,140,140,140,140]},{id:'s12',n:{ar:"تعليم",en:"Education"},icon:"📚",pr:65,tr:1,vl:0.06,ow:0,hs:[65,65,65,65,65]}];

    const EnDB=[
        {n:{ar:"لص الشركات",en:"Thief"},icon:"🦹",hp:800,dmg:6,rw:5000,tm:30,lv:8},
        {n:{ar:"هاكر الأسهم",en:"Hacker"},icon:"👨‍💻",hp:4000,dmg:18,rw:20000,tm:35,lv:12},
        {n:{ar:"وحش الاحتكار",en:"Monopoly"},icon:"👾",hp:25000,dmg:45,rw:100000,tm:40,lv:20},
        {n:{ar:"تنين البورصة",en:"Dragon"},icon:"🐉",hp:120000,dmg:100,rw:800000,tm:50,lv:35},
        {n:{ar:"إله الإفلاس",en:"Bankrupt"},icon:"💀",hp:1200000,dmg:250,rw:8000000,tm:55,lv:65},
        {n:{ar:"زعيم الأكوان",en:"Cosmic"},icon:"🌠",hp:12000000,dmg:600,rw:500000000,tm:60,lv:120}
    ];

    const CN=[{ar:"نسور الأثر",en:"Eagles"},{ar:"ذئاب البورصة",en:"Wolves"},{ar:"أباطرة المال",en:"Emperors"},{ar:"صقور الاستثمار",en:"Hawks"},{ar:"عتاة الاقتصاد",en:"Titans"}];
    const SCH=[{id:'ch1',tr:0,ti:{ar:"البداية",en:"Start"},tx:{ar:"في مدينة النيون...",en:"In neon city..."},rw:0},{id:'ch2',tr:50000,ti:{ar:"أول صفقة",en:"First Deal"},tx:{ar:"جاءك مستثمر...",en:"Investor came..."},rw:3000},{id:'ch3',tr:500000,ti:{ar:"ظهور المنافسين",en:"Rivals"},tx:{ar:"مع نمو إمبراطوريتك...",en:"Empire grew..."},rw:8000},{id:'ch4',tr:5000000,ti:{ar:"تحالف الأباطرة",en:"Alliance"},tx:{ar:"دعوة من تحالف...",en:"Invitation..."},rw:15000},{id:'ch5',tr:5e8,ti:{ar:"ذروة المجد",en:"Peak"},tx:{ar:"قمة برجك...",en:"Top of tower..."},rw:75000},{id:'ch6',tr:5e9,ti:{ar:"ما وراء النجوم",en:"Beyond"},tx:{ar:"الفضاء هو حدودك...",en:"Space frontier..."},rw:300,ig:true},{id:'ch7',tr:5e11,ti:{ar:"خالد",en:"Immortal"},tx:{ar:"اسمك محفور...",en:"Name etched..."},rw:1500,ig:true}];
    const ACDB=[{id:'a1',n:{ar:"البداية",en:"Start"},d:{ar:"5K💰",en:"5K"},tg:5000,tp:'earn',rw:8,icon:"🌟"},{id:'a2',n:{ar:"المستثمر",en:"Investor"},d:{ar:"5M💰",en:"5M"},tg:5e6,tp:'earn',rw:50,icon:"💼"},{id:'a3',n:{ar:"النقّار",en:"Clicker"},d:{ar:"2500x",en:"2500x"},tg:2500,tp:'click',rw:25,icon:"👆",sk:"clickEmoji"},{id:'a4',n:{ar:"البنّاء",en:"Builder"},d:{ar:"250 بناء",en:"250"},tg:250,tp:'build',rw:40,icon:"🏗️"},{id:'a5',n:{ar:"الملياردير",en:"Billionaire"},d:{ar:"5B💰",en:"5B"},tg:5e9,tp:'earn',rw:250,icon:"💎",sk:"goldenClick"},{id:'a6',n:{ar:"الإمبراطور",en:"Emperor"},d:{ar:"Lvl 75",en:"Lvl 75"},tg:75,tp:'level',rw:150,icon:"👑",sk:"crownEmoji"},{id:'a7',n:{ar:"ذئب البورصة",en:"Wolf"},d:{ar:"250K أسهم",en:"250K"},tg:250000,tp:'stock',rw:80,icon:"📈"},{id:'a8',n:{ar:"محارب",en:"Warrior"},d:{ar:"25 انتصار",en:"25"},tg:25,tp:'battle',rw:120,icon:"⚔️"},{id:'a9',n:{ar:"زعيم",en:"Leader"},d:{ar:"تبرع 50M",en:"50M"},tg:50000000,tp:'clan',rw:350,icon:"🛡️"},{id:'a10',n:{ar:"أسطورة",en:"Legend"},d:{ar:"Lvl 150",en:"150"},tg:150,tp:'level',rw:500,icon:"🌟",sk:"legendaryGlow"},{id:'a11',n:{ar:"خاتم الأكوان",en:"Ring"},d:{ar:"10T💰",en:"10T"},tg:1e13,tp:'earn',rw:1000,icon:"🌌"},{id:'a12',n:{ar:"الخالد",en:"Immortal"},d:{ar:"القصة كاملة",en:"Story"},tg:7,tp:'story',rw:2000,icon:"📜",sk:"immortalAura"}];
    const WP=[{icon:"💰",n:{ar:"250K",en:"250K"},rw:250000,tp:'money'},{icon:"💎",n:{ar:"75 جواهر",en:"75 Gems"},rw:75,tp:'gems'},{icon:"🎁",n:{ar:"صندوق أسطوري",en:"Legendary"},tp:'legendary'},{icon:"⚡",n:{ar:"x3 Boost",en:"x3"},tp:'boost',ml:3},{icon:"🏖️",n:{ar:"75 صدفة",en:"75 Shells"},tp:'shells',am:75},{icon:"👑",n:{ar:"تاج الصيف",en:"Crown"},tp:'crown'}];

    let G={company:"",money:0,gems:0,totalEarned:0,xp:0,level:1,buildings:{},timers:{},skills:{},pp:0,totalPP:0,codes:[],lastLogin:"",streak:0,stocks:{},quests:{date:"",list:[]},inbox:[],premium:1,dailyEarned:0,dailyClicked:0,dailyBuilt:0,dailyDate:"",totalClicks:0,totalBuilds:0,stockProfit:0,battlesWon:0,clan:{name:"",contrib:0,totalContrib:0,joined:false},achDone:[],achSkins:[],adBoost:0,boxUsedToday:false,summerShells:0,lastSaved:Date.now()};
    let cache={clickPwr:1,income:0,discount:0,speed:1,offline:1,crit:0.08,goldTouch:1};
    let buyMult=1,buyModes=[1,10,100,'max'],buyIdx=0,eventMult=1,eventTimer=0;
    let battle={active:false,enemy:null,eHP:0,eMax:0,pHP:0,pMax:0,reward:0,time:0,maxTime:0,dps:0,tick:0};
    let needsUpdate=false,wheelSpinning=false;

    function hapticFeedback(ms=15){if(navigator.vibrate)navigator.vibrate(ms);}
    function sCl(){hapticFeedback(12);} function sCr(){hapticFeedback(25);}
    function sCa(){hapticFeedback(20);} function sGe(){hapticFeedback(25);}
    function sUl(){hapticFeedback([30,20,30]);}

    function save(){G.lastSaved=Date.now();for(let i=0;i<12;i++){let sid='s'+(i+1);if(StDB[i])G.stocks[sid]=StDB[i].ow}try{let d=JSON.stringify(G);localStorage.setItem('AtharV21',d);localStorage.setItem('AtharV21_Bak',d)}catch(e){}}
    function load(){let r=localStorage.getItem('AtharV21');if(!r)r=localStorage.getItem('AtharV21_Bak');if(!r)return false;try{let s=JSON.parse(r);Object.assign(G,s);if(!G.clan)G.clan={name:"",contrib:0,totalContrib:0,joined:false};if(!G.achDone)G.achDone=[];if(!G.achSkins)G.achSkins=[];if(!G.battlesWon)G.battlesWon=0;if(!G.adBoost)G.adBoost=0;if(!G.boxUsedToday)G.boxUsedToday=false;if(!G.summerShells)G.summerShells=0;G.level=Math.max(1,G.level||1);G.money=Math.max(0,G.money||0);G.gems=Math.max(0,G.gems||0);BDB.forEach(b=>{if(!G.buildings[b.id])G.buildings[b.id]=0;if(!G.timers[b.id])G.timers[b.id]=0});SDB.forEach(s=>{if(!G.skills[s.id])G.skills[s.id]=0});for(let i=0;i<12;i++){let sid='s'+(i+1);if(StDB[i])StDB[i].ow=G.stocks[sid]||0}return true}catch(e){return false}}

    function initGame(){
        let has=load();
        if(!has){BDB.forEach(b=>{G.buildings[b.id]=0;G.timers[b.id]=0});SDB.forEach(s=>{G.skills[s.id]=0});document.getElementById('startupModal').classList.remove('hidden')}
        else{document.getElementById('uiCompanyName').innerText=G.company||"Company";document.getElementById('startupModal').classList.add('hidden')}
        lang=localStorage.getItem('athar_lang21')||'ar';document.getElementById('htmlRoot').dir=lang==='ar'?'rtl':'ltr';document.getElementById('langBtn').innerText=lang==='ar'?'🌍 EN':'🌍 عربي';
        resetDaily();calcStats();updateAllUI();updateAllNavLock();renderAll();checkOffline();checkDailyReward();
        setInterval(updateStocks,12000);setInterval(randomEvent,40000);requestAnimationFrame(gameLoop);setInterval(save,1500)
    }
    function startGame(){let n=document.getElementById('companyNameInput').value.trim();if(!n){alert(lang==='ar'?"الرجاء إدخال اسم الشركة":"Enter name");return}G.company=n;document.getElementById('uiCompanyName').innerText=n;document.getElementById('startupModal').classList.add('hidden');save();updateAllUI();sUl();toast("🚀 "+n+"!")}
    function resetDaily(){let td=new Date().toDateString();if(G.dailyDate!==td){G.dailyEarned=0;G.dailyClicked=0;G.dailyBuilt=0;G.dailyDate=td;G.boxUsedToday=false;generateQuests()}}
    function checkDailyReward(){let td=new Date().toDateString();if(G.lastLogin!==td){let y=new Date(Date.now()-86400000).toDateString();G.streak=G.lastLogin===y?G.streak+1:1;let r=Math.min(150,8+(G.streak*8));document.getElementById('dailyText').innerText=`+${r} Gems`;document.getElementById('dailyStreak').innerText=G.streak;document.getElementById('dailyRewardModal').classList.remove('hidden');G.lastLogin=td}}
    function claimDailyReward(){let r=Math.min(150,8+(G.streak*8));G.gems+=r;document.getElementById('dailyRewardModal').classList.add('hidden');save();updateAllUI();sUl()}
    function generateQuests(){G.quests={date:new Date().toDateString(),list:[{id:'q1',tp:'click',tg:250,pr:0,rw:20,cl:false},{id:'q2',tp:'build',tg:10,pr:0,rw:30,cl:false},{id:'q3',tp:'earn',tg:50000,pr:0,rw:35,cl:false}]}}

    function addMoney(a){if(a>0&&!isNaN(a)&&isFinite(a)){G.money+=a;G.totalEarned+=a;G.dailyEarned+=a;G.summerShells+=Math.floor(a/15000);needsUpdate=true;checkStory();checkAchievements()}}
    function addXP(a){G.xp+=a;checkLevel();needsUpdate=true}
    function checkLevel(){let r=Math.pow(G.level,2)*120;while(G.xp>=r){G.xp-=r;G.level++;r=Math.pow(G.level,2)*120;toast("🎉 Level "+G.level+"!");updateAllNavLock();checkAchievements()}}
    function getYield(b){let l=G.buildings[b.id]||0;if(l===0)return 0;return b.y*l*msBonus(l)*dimFac(l,b.sc||50)}
    function getNextMS(l){for(let i=0;i<MS.length;i++){if(l<MS[i])return MS[i]}return"MAX"}

    function calcStats(){
        G.skills=G.skills||{};cache.discount=Math.min(0.6,(G.skills['s2']||0)*0.012);cache.speed=Math.max(1,1+(G.skills['s3']||0)*0.03+(G.skills['s7']||0)*0.02);cache.offline=1+(G.skills['s4']||0)*0.08;cache.crit=0.08+(G.skills['s5']||0)*0.01;cache.goldTouch=1+(G.skills['s6']||0)*0.20;
        let cb=1;if(G.clan&&G.clan.joined)cb=1+Math.floor((G.clan.totalContrib||0)/2000000)/100;
        let base=G.buildings['b0']>0?getYield(BDB[0]):1;cache.clickPwr=base*(1+(G.skills['s1']||0)*0.35)*G.premium*cb*cache.goldTouch;
        cache.income=0;BDB.forEach(b=>{if(b.tp==='auto'&&G.buildings[b.id]>0)cache.income+=(getYield(b)*G.premium*cb)/(b.tm/cache.speed)})
    }

    function handleClick(e){
        let p=cache.clickPwr*(eventMult>1?eventMult:1);let crit=Math.random()<cache.crit;
        if(crit){p*=8;sCr()}else{sCl()}addMoney(p);addXP(1);G.totalClicks++;G.dailyClicked++;updateQuest('click',1);updateQuest('earn',p);
        let btn=document.getElementById('mainBtn');btn.style.transform="scale(0.88)";setTimeout(()=>btn.style.transform="none",70);
        let fText=document.createElement('div');fText.className='floating-text';fText.innerText=(crit?'🔥 ':'+')+fmt(p)+' 💰';
        let rx=(Math.random()-0.5)*140;let ry=-(Math.random()*60+60);let rd=(Math.random()-0.5)*40;
        fText.style.setProperty('--rand-x',`${rx}px`);fText.style.setProperty('--rand-y',`${ry}px`);fText.style.setProperty('--rand-deg',`${rd}deg`);
        let clientX=e.clientX||window.innerWidth/2;let clientY=e.clientY||window.innerHeight/2;
        fText.style.left=(clientX-35)+'px';fText.style.top=(clientY-35)+'px';
        document.body.appendChild(fText);setTimeout(()=>fText.remove(),750);
        if(G.achSkins.includes('clickEmoji')||G.achSkins.includes('crownEmoji')||G.achSkins.includes('goldenClick')){
            let em=document.createElement('div');em.style.position='fixed';em.style.fontSize='30px';em.style.pointerEvents='none';em.style.zIndex='9999';
            em.style.animation='floatUpPhysics 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            em.style.left=(clientX-15)+'px';em.style.top=(clientY-15)+'px';
            em.style.setProperty('--rand-x',`${(Math.random()-0.5)*160}px`);em.style.setProperty('--rand-y',`${-(Math.random()*80+40)}px`);em.style.setProperty('--rand-deg',`${(Math.random()-0.5)*60}deg`);
            let ems=['✨','💫','⚡'];if(G.achSkins.includes('crownEmoji'))ems=['👑','✨','💎'];if(G.achSkins.includes('goldenClick'))ems=['🪙','💎','💰'];
            em.innerText=ems[Math.floor(Math.random()*ems.length)];document.body.appendChild(em);setTimeout(()=>em.remove(),800);
        }
        if(battle.active){battle.eHP-=p;if(battle.eHP<=0)winBattle();renderBattle()}updateAllUI()
    }

    function buyBuilding(id){let b=BDB.find(x=>x.id===id);if(!b)return;let count=buyMult;if(buyMult==='max'){let l=G.buildings[id]||0,bc=b.cost*(1-cache.discount),c=bc*Math.pow(b.mult,l);if(G.money<c)count=0;else count=Math.max(0,Math.floor(Math.log((G.money*(b.mult-1)/c)+1)/Math.log(b.mult)))}if(count<=0)return;let l=G.buildings[id]||0,c=b.cost*Math.pow(b.mult,l)*(1-cache.discount),total=count===1?c:c*(Math.pow(b.mult,count)-1)/(b.mult-1);if(G.money>=total){G.money-=total;G.buildings[id]+=count;G.totalBuilds+=count;G.dailyBuilt+=count;addXP(2*count);updateQuest('build',count);calcStats();updateAllUI();renderBuildings();sCa()}}
    function toggleBuyMult(){buyIdx=(buyIdx+1)%buyModes.length;buyMult=buyModes[buyIdx];document.getElementById('buyMultBtn').innerText=buyMult==='max'?'Max':'x'+buyMult;renderBuildings();}
    function updateQuest(tp,a){if(!G.quests||!G.quests.list)return;G.quests.list.forEach(q=>{if(q.tp===tp&&!q.cl&&q.pr<q.tg){q.pr+=a;if(q.pr>=q.tg)toast("🏆 مهمة!")}});if(tp==='earn')G.quests.list.forEach(q=>{if(q.tp==='earn'&&!q.cl)q.pr=Math.min(q.tg,G.dailyEarned)});renderQuests()}
    function claimQuest(i){let q=G.quests.list[i];if(q&&q.pr>=q.tg&&!q.cl){q.cl=true;G.gems+=q.rw;save();updateAllUI();renderQuests();sGe()}}

    function calcPendingPP(){if(G.totalEarned<5e6)return 0;return Math.floor(Math.sqrt(G.totalEarned/5e6))} // أصعب
    function openPrestigeModal(){
        let pp=calcPendingPP();
        document.getElementById('pendingPP').innerText=pp;
        document.getElementById('totalPPDisplay').innerText=G.pp;
        document.getElementById('prestigeModal').classList.remove('hidden');
    }
    function closePrestigeModal(){document.getElementById('prestigeModal').classList.add('hidden')}
    function confirmPrestige(){
        let pp=calcPendingPP();
        if(pp<1){toast(lang==='ar'?"تحتاج 5 مليون!":"Need 5M!");return}
        G.pp+=pp;G.totalPP+=pp;G.money=0;G.totalEarned=0;G.xp=0;G.level=1;
        BDB.forEach(b=>{G.buildings[b.id]=0;G.timers[b.id]=0});
        calcStats();updateAllUI();updateAllNavLock();renderAll();save();
        closePrestigeModal();toast("🌌 +"+pp+" PP");sUl();
    }
    function buySkill(id){let s=SDB.find(x=>x.id===id);let l=G.skills[id]||0;if(l>=s.max)return;let c=Math.floor(s.b*Math.pow(s.m,l));if(G.pp>=c){G.pp-=c;G.skills[id]=l+1;calcStats();updateAllUI();renderSkills();save();sCa()}}

    function updateStocks(){StDB.forEach(s=>{s.pr=Math.max(1,Math.floor(s.pr*(1+(Math.random()-0.5)*s.vl*(G.adBoost>0?0.5:1))));if(Math.random()<0.18)s.tr*=-1;s.hs.push(s.pr);if(s.hs.length>5)s.hs.shift()});if(isUnlocked('stocks'))renderStocks();}
    function buyStock(id){let s=StDB.find(x=>x.id===id);if(G.money>=s.pr){G.money-=s.pr;s.ow++;save();updateAllUI();if(isUnlocked('stocks'))renderStocks();sCa();}else{hapticFeedback(50);}}
    function sellStock(id){let s=StDB.find(x=>x.id===id);if(s.ow>0){let p=Math.floor(s.pr*0.96);s.ow--;addMoney(p);G.stockProfit+=p;save();updateAllUI();if(isUnlocked('stocks'))renderStocks();sCa()}}

    function startBattle(){if(!isUnlocked('battle'))return toast("🔒 تحتاج مستوى "+UNLOCK.battle);if(battle.active)return;let a=EnDB.filter(e=>G.level>=e.lv);if(a.length===0)return toast("لا أعداء");let e=a[Math.floor(Math.random()*a.length)];battle.active=true;battle.enemy=e;battle.eHP=e.hp;battle.eMax=e.hp;battle.pHP=G.level*12+150;battle.pMax=battle.pHP;battle.reward=e.rw;battle.time=e.tm;battle.maxTime=e.tm;battle.dps=e.dmg;battle.tick=0;toast("⚔️ "+e.n[lang]);renderBattle()}
    function winBattle(){addMoney(battle.reward);G.gems+=Math.floor(battle.reward/800);G.battlesWon++;let b=Math.floor(battle.reward*(battle.pHP/battle.pMax)*0.4);addMoney(b);document.getElementById('battleResultContent').innerHTML=`<h2 style="color:#00ff87;">🏆 انتصار!</h2><div style="font-size:55px;">${battle.enemy.icon}</div><div style="color:var(--primary);">+${fmt(battle.reward)} 💰</div><button class="btn" onclick="closeBattleResult()">متابعة</button>`;document.getElementById('battleResultModal').classList.remove('hidden');battle.active=false;save();updateAllUI();renderBattle();checkAchievements();sUl()}
    function loseBattle(){let l=Math.floor(G.money*0.12);G.money=Math.max(0,G.money-l);document.getElementById('battleResultContent').innerHTML=`<h2 style="color:var(--danger);">💀 هزيمة</h2><div style="font-size:55px;">${battle.enemy?battle.enemy.icon:'👾'}</div><div style="color:var(--danger);">-${fmt(l)} 💰</div><button class="btn" style="background:#334155;" onclick="closeBattleResult()">متابعة</button>`;document.getElementById('battleResultModal').classList.remove('hidden');battle.active=false;save();updateAllUI();renderBattle()}
    function closeBattleResult(){document.getElementById('battleResultModal').classList.add('hidden')}
    function fleeBattle(){let l=Math.floor(G.money*0.04);G.money=Math.max(0,G.money-l);toast("🏃 -"+fmt(l)+" 💰");battle.active=false;save();updateAllUI();renderBattle()}
    function updateBattle(dt){if(!battle.active)return;battle.tick+=dt;if(battle.tick>=1){battle.tick-=1;battle.pHP-=battle.dps;if(battle.pHP<=0){loseBattle();return}}battle.time-=dt;if(battle.time<=0){loseBattle();return}renderBattle()}

    function joinClan(){if(!isUnlocked('clan'))return toast("🔒 تحتاج مستوى "+UNLOCK.clan);let n=CN[Math.floor(Math.random()*CN.length)];G.clan={name:n[lang],contrib:0,totalContrib:0,joined:true};calcStats();updateAllUI();renderClan();save();toast("🛡️ "+n[lang]);sUl()}
    function contributeClan(){if(!G.clan.joined)return;let a=Math.floor(G.money*0.04);if(a<100)return;G.money-=a;G.clan.contrib+=a;G.clan.totalContrib+=a;calcStats();updateAllUI();renderClan();renderBuildings();save();checkAchievements();toast("🤝 "+fmt(a)+" 💰")}
    function getClanBonus(){if(!G.clan.joined)return 0;return Math.floor((G.clan.totalContrib||0)/2000000)}

    function checkStory(){SCH.forEach(ch=>{if(G.totalEarned>=ch.tr&&!G.inbox.includes('story_'+ch.id)){G.inbox.push('story_'+ch.id);toast("📜 "+ch.ti[lang])}});renderStory()}
    function claimStory(id,r,g){if(G.inbox.includes('claimed_'+id))return;G.inbox.push('claimed_'+id);if(g)G.gems+=r;else addMoney(r);save();updateAllUI();renderStory();checkAchievements();sUl()}
    function checkAchievements(){ACDB.forEach(a=>{if(!G.achDone.includes(a.id)){let m=false;if(a.tp==='earn'&&G.totalEarned>=a.tg)m=true;if(a.tp==='click'&&G.totalClicks>=a.tg)m=true;if(a.tp==='build'&&G.totalBuilds>=a.tg)m=true;if(a.tp==='level'&&G.level>=a.tg)m=true;if(a.tp==='stock'&&G.stockProfit>=a.tg)m=true;if(a.tp==='battle'&&G.battlesWon>=a.tg)m=true;if(a.tp==='clan'&&(G.clan.totalContrib||0)>=a.tg)m=true;if(a.tp==='story'&&G.inbox.filter(x=>x.startsWith('claimed_ch')).length>=a.tg)m=true;if(m){G.achDone.push(a.id);G.gems+=a.rw;if(a.sk&&!G.achSkins.includes(a.sk))G.achSkins.push(a.sk);toast("🏅 "+a.n[lang]+"!");save();renderAchievements();sUl()}}})}

    function spinWheel(){if(wheelSpinning)return;wheelSpinning=true;toast("📺 جاري تحميل الإعلان...");setTimeout(()=>{let pi=Math.floor(Math.random()*WP.length);let prize=WP[pi];let stp=15;let s=0;document.querySelectorAll('.wheel-prize').forEach(el=>el.classList.remove('highlight'));let iv=setInterval(()=>{document.querySelectorAll('.wheel-prize').forEach(el=>el.classList.remove('highlight'));let ci=(pi+stp-s)%WP.length;let targetBox=document.getElementById('wp'+ci);if(targetBox)targetBox.classList.add('highlight');hapticFeedback(10);s++;if(s>=stp){clearInterval(iv);document.querySelectorAll('.wheel-prize').forEach(el=>el.classList.remove('highlight'));let finalBox=document.getElementById('wp'+pi);if(finalBox)finalBox.classList.add('highlight');awardPrize(prize);wheelSpinning=false}},120);},1200)}
    function awardPrize(prize){if(prize.tp==='money'){addMoney(prize.rw);toast("🎡 +"+fmt(prize.rw)+" 💰")}else if(prize.tp==='gems'){G.gems+=prize.rw;toast("🎡 +"+prize.rw+" 💎")}else if(prize.tp==='legendary'){openBox('legendary',true)}else if(prize.tp==='boost'){G.premium*=prize.ml;calcStats();toast("🎡 x"+prize.ml+" Boost!")}else if(prize.tp==='shells'){G.summerShells+=prize.am;toast("🎡 +"+prize.am+" Shells")}else if(prize.tp==='crown'){G.gems+=750;toast("🎡 👑 +750 💎")}save();updateAllUI();renderSummer();sUl()}

    function openBox(rarity,free){let rws={common:{g:[1,5],m:[100,5000]},rare:{g:[5,25],m:[5000,100000]},legendary:{g:[25,100],m:[100000,10000000]}};let r=rws[rarity],gems=Math.floor(Math.random()*(r.g[1]-r.g[0])+r.g[0]),money=Math.floor(Math.random()*(r.m[1]-r.m[0])+r.m[0]);G.gems+=gems;addMoney(money);save();updateAllUI();if(isUnlocked('loot'))renderLoot();sUl();toast("🎁 +"+fmt(money)+"💰 +"+gems+"💎")}
    function watchAd(type){toast("📺 تحميل العرض...");setTimeout(()=>{if(type==='stocks'){G.adBoost=600;toast("⚡ Stock x2 10min!")}else if(type==='loot'){if(G.boxUsedToday){toast("⚠️ مرة واحدة يومياً");return}G.boxUsedToday=true;openBox('rare',true)}else if(type==='gems'){G.gems+=15;toast("✅ +15 💎")}else if(type==='warp'){let e=1000;BDB.forEach(b=>{if(b.tp==='auto'&&G.buildings[b.id]>0)e+=Math.floor(1200/(b.tm/cache.speed))*getYield(b)*G.premium});addMoney(e*eventMult);toast("🚀 +"+fmt(e)+" 💰")}save();updateAllUI()},1200)}

    function checkOffline(){let n=Date.now(),d=(n-(G.lastSaved||n))/1000;if(d<0||isNaN(d)||d<60)return;if(d>43200)d=43200;calcStats();let e=0;BDB.forEach(b=>{if(b.tp==='auto'&&G.buildings[b.id]>0){let tt=G.timers[b.id]+(d*0.50*cache.offline),cy=Math.floor(tt/(b.tm/cache.speed));G.timers[b.id]=tt%(b.tm/cache.speed);e+=cy*getYield(b)*G.premium}});if(e>0){addMoney(e);document.getElementById('offlineAmount').innerText=fmt(e);document.getElementById('offlineModal').classList.remove('hidden')}}
    function closeOfflineModal(){document.getElementById('offlineModal').classList.add('hidden')}
    function randomEvent(){if(eventTimer>0)return;let r=Math.random();if(r<0.06){eventMult=3;toast("🚨 Boom x3!")}else if(r>0.06&&r<0.20){eventMult=0.55;toast("🚨 Crisis -45%!");eventTimer=20}else if(r>0.85){eventMult=3;toast("🚨 Cosmic x3!");eventTimer=30}}

    function handleLockedNav(feature, element) {
        const unlockLevel = parseInt(element.getAttribute('data-unlock'));
        const featureNamesAr = {
            skills: 'المهارات الإستراتيجية', stocks: 'بورصة الأسهم', battle: 'نظام المعارك', clan: 'فصائل المال', loot: 'صناديق الحظ',
            quests: 'المهام والقصص', achievements: 'لوحة الإنجازات', summer: 'فعاليات الصيف', store: 'المتجر الماسي'
        };
        const name = featureNamesAr[feature] || feature;
        toast(`🔒 ${name} · يُفتح عند المستوى ${unlockLevel}`);
        hapticFeedback(20);
    }
    
    function updateAllNavLock() {
        const navItems = document.querySelectorAll('.nav-item.locked');
        navItems.forEach(item => {
            const unlockLevel = parseInt(item.getAttribute('data-unlock'));
            if (G.level >= unlockLevel) {
                item.classList.remove('locked');
                const lvlReq = item.querySelector('.nav-lvl-req');
                if (lvlReq) lvlReq.remove();
                const featureMap = {
                    navSkills: 'tab-skills', navStocks: 'tab-stocks', navQuests: 'tab-quests', navAch: 'tab-achievements',
                    navSummer: 'tab-summer', navBattle: 'tab-battle', navClan: 'tab-clan', navLoot: 'tab-loot', navStore: 'tab-store'
                };
                item.onclick = function() { switchTab(featureMap[item.id], item); };
            }
        });
    }

    function renderAll(){
        renderBuildings();
        if(isUnlocked('skills')) renderSkills();
        if(isUnlocked('stocks')) renderStocks();
        if(isUnlocked('quests')){renderQuests();renderStory();}
        if(isUnlocked('achievements')) renderAchievements();
        if(isUnlocked('summer')) renderSummer();
        if(isUnlocked('battle')) renderBattle();
        if(isUnlocked('clan')) renderClan();
        if(isUnlocked('loot')) renderLoot();
        if(isUnlocked('store')) renderStore();
        updateAllNavLock();
    }

    function renderLockedScreen(featureName, unlockLevel) {
        let currentLevel = G.level;
        let progress = Math.min(100, (currentLevel / unlockLevel) * 100);
        let arName = { skills: "المهارات الإستراتيجية", stocks: "بورصة الأسهم", battle: "نظام المعارك", clan: "تحالفات وفصائل", loot: "صناديق الحظ", quests: "المهام", achievements: "الإنجازات", summer: "فعاليات الصيف", store: "المتجر" }[featureName] || featureName;
        return `
            <div class="locked-overlay">
                <div class="lock-icon">🔒</div>
                <h3>${arName}</h3>
                <p>يفتح هذا القسم تلقائياً عند بلوغك المستوى ${unlockLevel}</p>
                <div style="margin: 18px 0; background: rgba(0,0,0,0.3); padding: 14px; border-radius: 16px; border: 1px solid var(--glass-border);">
                    <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span>مستواك الحالي</span><span style="color: var(--primary); font-weight:800;">${currentLevel} / ${unlockLevel}</span></div>
                    <div class="progress-lock"><div class="progress-fill" style="width: ${progress}%; background: linear-gradient(90deg, var(--accent), var(--primary));"></div></div>
                    <p style="font-size: 12px; color: #64748b; margin-top: 8px; font-weight:bold;">متبقي ${unlockLevel - currentLevel} مستويات</p>
                </div>
            </div>`;
    }

    function renderBuildings(){
        let d=document.getElementById('buildingsList');if(!d)return;d.innerHTML='';
        BDB.forEach(b=>{
            let l=G.buildings[b.id]||0,y=getYield(b)*G.premium,txt=b.tp==='click'?'+'+fmt(y):'+'+fmt(y)+'/'+(b.tm/cache.speed).toFixed(1)+'s',nms=getNextMS(l),lms=0;
            for(let i=MS.length-1;i>=0;i--){if(l>=MS[i]){lms=MS[i];break}}
            let pct=nms==="MAX"?100:((l-lms)/(nms-lms))*100,count=buyMult;
            if(buyMult==='max'){let bc=b.cost*(1-cache.discount),c=bc*Math.pow(b.mult,l);count=G.money<c?0:Math.max(0,Math.floor(Math.log((G.money*(b.mult-1)/c)+1)/Math.log(b.mult)));}
            if(count<=0&&buyMult==='max')count=1;
            let cost=b.cost*Math.pow(b.mult,l)*(1-cache.discount),total=count<=1?cost:cost*(Math.pow(b.mult,count)-1)/(b.mult-1),can=G.money>=total&&count>0;
            let di=l>b.sc?` <span class="dim-indicator">Soft</span>`:'';
            d.innerHTML+=`<div class="item-card" style="flex-direction:column;${can?'':'opacity:0.45;'}" onclick="buyBuilding('${b.id}')"><div style="display:flex;align-items:center;gap:10px;width:100%;"><div class="item-icon">${b.icon}</div><div class="item-info"><div class="item-name">${b.n[lang]}${di}</div><div class="item-stats">⚡ ${txt}</div></div><div class="item-action"><span class="item-cost">${fmt(total)} 💰</span><span style="font-size:11px;color:var(--primary);font-weight:700;">Lvl ${l}</span></div></div><div class="ms-container"><div class="ms-fill" style="width:${pct}%"></div><div class="ms-text">${nms==="MAX"?"MAX":l+'/'+nms}</div></div></div>`
        })
    }

    function renderSkills(){
        let d=document.getElementById('skillsContent');if(!d)return;
        if(!isUnlocked('skills')){d.innerHTML=renderLockedScreen('skills',UNLOCK.skills);return}
        d.innerHTML=`<div style="text-align:center;margin-bottom:15px; background:rgba(0,0,0,0.2); padding:16px; border-radius:20px; border:1px solid var(--glass-border);"><div style="color:#94a3b8; font-weight:700;">نقاط المهارة 💠</div><div style="font-size:36px;color:var(--prestige);font-weight:800;">${G.pp}</div><button class="btn btn-prestige" style="margin:8px 0;" onclick="openPrestigeModal()">إعادة التعيين الكوني</button><div style="color:#64748b;">النقاط المتوقعة: <span style="color:var(--primary);">${calcPendingPP()}</span> 💠</div></div>`;
        for(let t=1;t<=4;t++){d.innerHTML+=`<div style="margin:14px 0 8px; font-weight:800; color:var(--accent);">Tier ${t}</div>`;SDB.filter(s=>s.t===t).forEach(s=>{let l=G.skills[s.id]||0,c=Math.floor(s.b*Math.pow(s.m,l)),mx=l>=s.max;d.innerHTML+=`<div class="skill-node"><div style="font-weight:800;color:var(--prestige);">${s.n[lang]} [${l}/${s.max}]</div><div style="font-size:12px;color:#94a3b8;">${s.d[lang]}</div><button class="btn btn-sm btn-prestige" ${mx?'disabled':''} onclick="buySkill('${s.id}')">${mx?'MAX':c+' PP'}</button></div>`})}
    }

    function renderStocks(){
        let d=document.getElementById('stocksContent');if(!d)return;
        if(!isUnlocked('stocks')){d.innerHTML=renderLockedScreen('stocks',UNLOCK.stocks);return}
        d.innerHTML=`<div class="ad-banner" onclick="watchAd('stocks')">📺 إعلان: مضاعف البورصة</div><div class="news-ticker">📢 أخبار السوق</div><div id="stocksList"></div>`;
        let sl=document.getElementById('stocksList');if(!sl)return;sl.innerHTML='';
        StDB.forEach(s=>{let up=s.tr>0;sl.innerHTML+=`<div class="item-card stock-card ${up?'':'stock-down'}"><div class="stock-header"><div><span>${s.icon}</span> ${s.n[lang]}</div><div style="color:${up?'var(--primary)':'var(--danger)'};">${fmt(s.pr)} 💰</div></div><div style="font-size:12px;">مملوك: ${s.ow||0}</div><div style="display:flex;gap:8px;"><button class="btn btn-sm" onclick="buyStock('${s.id}')">شراء</button><button class="btn btn-sm" style="background:rgba(255,255,255,0.05);" onclick="sellStock('${s.id}')">بيع</button></div></div>`})
    }

    function renderQuests(){
        let d=document.getElementById('questsContent');if(!d)return;
        if(!isUnlocked('quests')){d.innerHTML=renderLockedScreen('quests',UNLOCK.quests);return}
        d.innerHTML=`<h3 style="color:var(--gold);text-align:center;">المهام اليومية ⏳</h3><div id="dailyQuestsList"></div><h3 style="color:var(--accent);text-align:center;margin-top:24px;">القصة 📜</h3><div id="storyList"></div>`;
        let ql=document.getElementById('dailyQuestsList');
        if(ql&&G.quests&&G.quests.list){G.quests.list.forEach((q,i)=>{
            let desc=q.id==='q1'?'انقر 250 مرة':q.id==='q2'?'اشترِ 10 منشآت':'اربح 50,000 💰';
            let prog=q.id==='q3'?Math.min(q.tg,G.dailyEarned):q.pr;
            let btn=q.cl?`<button class="btn btn-sm" disabled>✅</button>`:(prog>=q.tg?`<button class="btn btn-sm btn-gem" onclick="claimQuest(${i})">+${q.rw}💎</button>`:`<span style="color:#64748b;">${fmt(prog)}/${fmt(q.tg)}</span>`);
            ql.innerHTML+=`<div class="daily-box"><div>${desc}</div><div>${btn}</div></div>`
        })}
        renderStory();
    }

    function renderStory(){let d=document.getElementById('storyList');if(!d)return;d.innerHTML='';SCH.forEach(ch=>{let u=G.totalEarned>=ch.tr,c=G.inbox.includes('claimed_'+ch.id);d.innerHTML+=`<div class="story-msg" style="${u?'':'opacity:0.4;'}"><div class="s-title">${ch.ti[lang]}</div><div class="s-text">${ch.tx[lang]}</div>${u&&!c&&ch.rw>0?`<button class="btn btn-sm" onclick="claimStory('${ch.id}',${ch.rw},${ch.ig||false})">+${ch.rw} ${ch.ig?'💎':'💰'}</button>`:c?'<div style="color:#00ff87;">✅</div>':''}</div>`})}
    function renderAchievements(){let d=document.getElementById('achContent');if(!d)return;if(!isUnlocked('achievements')){d.innerHTML=renderLockedScreen('achievements',UNLOCK.achievements);return}d.innerHTML=`<h3 style="color:var(--gold);text-align:center;">الإنجازات 🏆</h3><div id="achList"></div>`;let al=document.getElementById('achList');if(!al)return;al.innerHTML='';ACDB.forEach(a=>{let done=G.achDone.includes(a.id);al.innerHTML+=`<div class="item-card" style="${done?'border-left:4px solid var(--primary);':''}"><div class="item-icon">${a.icon}</div><div class="item-info"><div class="item-name">${a.n[lang]}</div><div class="item-stats">${a.d[lang]}</div></div><div style="color:var(--gem);">${done?'✅':'+'+a.rw+'💎'}</div></div>`})}
    function renderSummer(){let d=document.getElementById('summerContent');if(!d)return;if(!isUnlocked('summer')){d.innerHTML=renderLockedScreen('summer',UNLOCK.summer);return}let lvl=Math.floor(G.summerShells/150),pct=((G.summerShells%150)/150)*100;d.innerHTML=`<h3 style="color:var(--sun);text-align:center;">☀️ فعالية الصيف</h3><div class="summer-event-card"><div style="font-size:55px;">🏖️</div><h3>تحدي الصدف</h3><p>اجمع الأصداف عبر جمع الأموال</p><div style="display:flex;justify-content:space-between;"><span>🏖️ ${fmt(G.summerShells)}</span><span>مستوى ${lvl}</span></div><div class="summer-progress"><div class="summer-progress-fill" style="width:${pct}%"></div></div></div><div class="wheel-container"><h3>🎡 دولاب الحظ</h3><div style="margin:14px 0;">${WP.map((p,i)=>`<div class="wheel-prize" id="wp${i}">${p.icon}</div>`).join('')}</div><button class="btn btn-summer" onclick="spinWheel()">🎡 تدوير (إعلان)</button></div>`}
    function renderBattle(){let d=document.getElementById('battleContent');if(!d)return;if(!isUnlocked('battle')){d.innerHTML=renderLockedScreen('battle',UNLOCK.battle);return}if(battle.active){let e=battle.enemy;d.innerHTML=`<div class="battle-card"><div style="font-size:55px;">${e?e.icon:'👾'}</div><h3>${e?e.n[lang]:'عدو'}</h3><div style="color:var(--danger);">⏱️ ${Math.ceil(battle.time)}s</div><div class="hp-bar"><div class="hp-fill" style="width:${(battle.eHP/battle.eMax)*100}%;background:var(--battle-red);"></div></div><div class="hp-bar"><div class="hp-fill" style="width:${(battle.pHP/battle.pMax)*100}%;background:var(--primary);"></div></div><div>💰 ${fmt(battle.reward)}</div><button class="btn btn-sm" style="background:#334155;" onclick="fleeBattle()">🏃 هروب</button></div>`}else{let a=EnDB.filter(e=>G.level>=e.lv);d.innerHTML=`<div>${a.map(e=>`<div class="item-card"><div style="font-size:42px;">${e.icon}</div><div><div>${e.n[lang]}</div><div>❤️ ${fmt(e.hp)} | ⏱️ ${e.tm}s | 💰 ${fmt(e.rw)}</div></div></div>`).join('')}<button class="btn btn-battle" onclick="startBattle()">⚔️ بدء معركة</button></div>`}}
    function renderClan(){let d=document.getElementById('clanContent');if(!d)return;if(!isUnlocked('clan')){d.innerHTML=renderLockedScreen('clan',UNLOCK.clan);return}if(G.clan.joined){d.innerHTML=`<div class="item-card" style="flex-direction:column;text-align:center;border:2px solid var(--clan-blue);"><div style="font-size:45px;">🛡️</div><h3>${G.clan.name}</h3><div>تبرعات: ${fmt(G.clan.totalContrib)} 💰</div><div style="color:#00ffaa;">مضاعف: +${getClanBonus()}%</div><button class="btn btn-clan btn-sm" onclick="contributeClan()">🤝 تبرع (4%)</button></div>`}else{d.innerHTML=`<div><h3>اختر فصيلاً</h3>${CN.map(n=>`<div class="item-card" style="text-align:center;"><h4>${n[lang]}</h4><button class="btn btn-clan btn-sm" onclick="joinClan()">انضمام</button></div>`).join('')}</div>`}}
    function renderLoot(){let d=document.getElementById('lootContent');if(!d)return;if(!isUnlocked('loot')){d.innerHTML=renderLockedScreen('loot',UNLOCK.loot);return}d.innerHTML=`<div class="ad-banner" onclick="watchAd('loot')">📺 إعلان: صندوق نادر</div><div class="item-card"><div class="item-icon">📦</div><div>صندوق عادي</div><button class="btn btn-sm" ${G.boxUsedToday?'disabled':''} onclick="if(!G.boxUsedToday){G.boxUsedToday=true;openBox('common',true)}">${G.boxUsedToday?'تم':'فتح'}</button></div><div class="item-card"><div class="item-icon">💠</div><div>صندوق نادر</div><button class="btn btn-sm" style="background:var(--accent);" ${G.gems>=50?'':'disabled'} onclick="if(G.gems>=50){G.gems-=50;openBox('rare',false)}">50 💎</button></div><div class="item-card"><div class="item-icon">👑</div><div>صندوق أسطوري</div><button class="btn btn-sm" style="background:var(--gold);" ${G.gems>=200?'':'disabled'} onclick="if(G.gems>=200){G.gems-=200;openBox('legendary',false)}">200 💎</button></div>`}
    function renderStore(){let d=document.getElementById('storeContent');if(!d)return;if(!isUnlocked('store')){d.innerHTML=renderLockedScreen('store',UNLOCK.store);return}d.innerHTML=`<div class="ad-banner" onclick="watchAd('warp')">📺 إعلان: تسريع الزمن</div>`+[{id:'p1',n:"رخصة x2",c:35,m:2},{id:'p2',n:"درع x3",c:100,m:3},{id:'p3',n:"جوهرة x5",c:500,m:5}].map(p=>`<div class="item-card"><div>${p.n}</div><button class="btn btn-sm btn-gem" onclick="buyPremium(${p.c},${p.m})">${p.c} 💎</button></div>`).join('')}
    function buyPremium(cost,mult){if(G.gems>=cost){G.gems-=cost;G.premium*=mult;calcStats();updateAllUI();renderAll();save();sUl()}}

    function updateAllUI(){
        document.getElementById('moneyDisplay').innerText=fmt(G.money);
        document.getElementById('gemsDisplay').innerText=G.gems;
        document.getElementById('incomeDisplay').innerText=fmt(cache.income*(eventMult>1?eventMult:1));
        document.getElementById('uiLevel').innerText=G.level;
        document.getElementById('lblMainBtnText').innerText=tk('mainBtnText');
        document.getElementById('lblBuildingsTitle').innerText=tk('buildingsTitle');
        updateTitle();
        document.getElementById('xpBar').style.width=Math.min(100,(G.xp/(Math.pow(G.level,2)*120))*100)+'%';
        needsUpdate=false;
    }

    function switchTab(tabId,el){
        let unlocks={skills:'tab-skills',stocks:'tab-stocks',quests:'tab-quests',achievements:'tab-achievements',summer:'tab-summer',battle:'tab-battle',clan:'tab-clan',loot:'tab-loot',store:'tab-store'};
        let feature=Object.keys(unlocks).find(k=>unlocks[k]===tabId);
        if(feature&&!isUnlocked(feature)){
            handleLockedNav(feature, el || document.querySelector(`[onclick*="${tabId}"]`));
            return;
        }
        document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
        let tab=document.getElementById(tabId);if(tab)tab.classList.add('active');
        if(el)el.classList.add('active');
        renderAll();
    }

    function redeemCode(c){c=c.trim().toUpperCase();const codes={"MEGA":{m:1e12,g:500},"ATHAR":{m:1e6,g:30},"EMPIRE":{m:1e20,g:5000},"LEGEND":{m:1e30,g:50000}};if(codes[c]&&!G.codes.includes(c)){G.codes.push(c);addMoney(codes[c].m);G.gems+=codes[c].g;save();updateAllUI();toast(tk('codeSuccess'));sUl()}else{alert(tk('invalidCode'))}}
    function hardReset(){if(confirm(lang==='ar'?'مسح جميع البيانات؟':'Wipe all data?')){localStorage.removeItem('AtharV21');localStorage.removeItem('AtharV21_Bak');location.reload()}}
    function toast(msg){let t=document.getElementById('toastMsg');t.querySelector('span').innerText=msg;t.classList.add('show');clearTimeout(t._timeout);t._timeout=setTimeout(()=>t.classList.remove('show'),2000)}

    let lastTime=performance.now(),recalcTimer=0;
    function gameLoop(now){
        let dt=(now-lastTime)/1000;lastTime=now;if(dt>2||dt<=0)dt=0.016;
        if(eventTimer>0){eventTimer-=dt;if(eventTimer<=0)eventMult=1}
        if(G.adBoost>0){G.adBoost-=dt;if(G.adBoost<=0)G.adBoost=0}
        BDB.forEach(b=>{if(b.tp==='auto'&&G.buildings[b.id]>0){G.timers[b.id]+=dt;let cT=b.tm/cache.speed;if(G.timers[b.id]>=cT){let cy=Math.floor(G.timers[b.id]/cT);G.timers[b.id]-=cy*cT;addMoney(getYield(b)*G.premium*cy*eventMult)}}});
        updateBattle(dt);
        recalcTimer+=dt;
        if(recalcTimer>0.4){calcStats();updateAllUI();recalcTimer=0}
        else if(needsUpdate){updateAllUI()}
        requestAnimationFrame(gameLoop)
    }
</script>

<!-- ========== نظام الإعلانات ========== -->
<script src="ads.js"></script>
<script>
    document.addEventListener('deviceready', function() {
        if (typeof adManager !== 'undefined') {
            adManager.init();
            adManager.showBanner();
        }
    }, false);
</script>

</body>
</html>
