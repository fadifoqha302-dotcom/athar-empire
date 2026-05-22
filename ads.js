// ==================== ads.js - نظام الإعلانات لـ أثر تايكون V20 ====================
class AdManager {
    constructor() {
        this.initialized = false;
        
        // استبدل هذه بالقيم الخاصة بك من AdMob
        this.config = {
            appId: 'ca-app-pub-3940256099942544~3347511713', // Test ID
            rewardedUnitId: 'ca-app-pub-3940256099942544/5224354917', // Rewarded Test
            interstitialUnitId: 'ca-app-pub-3940256099942544/1033173712', // Interstitial Test
            bannerUnitId: 'ca-app-pub-3940256099942544/6300978111' // Banner Test
        };
    }
    
    init() {
        if (this.initialized) return;
        
        // تحقق إذا كنا في تطبيق Cordova
        if (typeof admob !== 'undefined') {
            admob.start();
            this.initialized = true;
            console.log('✅ AdMob initialized');
        } else {
            console.log('⚠️ AdMob not available - running in browser');
        }
    }
    
    showRewardedAd(callback) {
        // للـ Cordova
        if (typeof admob !== 'undefined') {
            admob.rewardedVideo.load({ id: this.config.rewardedUnitId });
            
            admob.rewardedVideo.show().then(() => {
                callback(true); // نجح الإعلان
            }).catch((error) => {
                console.log('Ad failed:', error);
                callback(false); // فشل الإعلان
            });
        } else {
            // للمتصفح - إعلان وهمي للتجربة
            if (confirm('📺 إعلان تجريبي\n\nهل تريد مشاهدة إعلان للحصول على المكافأة؟')) {
                toast("⏳ جاري تحميل الإعلان...");
                setTimeout(() => {
                    callback(true);
                }, 2000);
            } else {
                callback(false);
            }
        }
    }
    
    showInterstitial() {
        if (typeof admob !== 'undefined') {
            admob.interstitial.load({ id: this.config.interstitialUnitId });
            admob.interstitial.show();
        }
    }
    
    showBanner() {
        if (typeof admob !== 'undefined') {
            admob.banner.show({ id: this.config.bannerUnitId });
        }
    }
    
    hideBanner() {
        if (typeof admob !== 'undefined') {
            admob.banner.hide();
        }
    }
}

// إنشاء كائن الإعلانات
const adManager = new AdManager();

// إعادة كتابة دالة watchAd الأصلية لاستخدام AdMob الحقيقي
const originalWatchAd = watchAd;

watchAd = function(type) {
    adManager.showRewardedAd((success) => {
        if (success) {
            // استخدم الدالة الأصلية للمكافآت
            originalWatchAd(type);
        } else {
            toast('❌ فشل تحميل الإعلان - حاول مجدداً');
        }
    });
};

// إعلان بيني يظهر كل 3 دقائق عند تغيير التبويب
let lastInterstitialTime = 0;
const originalSwitchTab = switchTab;

switchTab = function(tabId, el) {
    originalSwitchTab(tabId, el);
    
    // إظهار إعلان بيني كل 3 دقائق
    const now = Date.now();
    if (now - lastInterstitialTime > 180000) { // 3 دقائق
        setTimeout(() => {
            adManager.showInterstitial();
            lastInterstitialTime = now;
        }, 500);
    }
};

console.log('✅ نظام الإعلانات جاهز');
