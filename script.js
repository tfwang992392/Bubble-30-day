// 開發模式：設為 true 可解鎖所有日期供預覽
const DEV_MODE = true;

// 每日內容資料
const dailyContent = {
    '2025-12-25': { weekday: '四', content: '在通勤途中，發覺五件你平常會忽略的事物。' },
    '2025-12-26': { weekday: '五', content: '閉上眼睛，用手觸摸三種不同的質地。' },
    '2025-12-27': { weekday: '六', content: '拍一段 1 分鐘的影片，記錄你此刻所在位置的風景。' },
    '2025-12-28': { weekday: '日', content: '快速畫一張你左手的素描。' },
    '2025-12-29': { weekday: '一', content: '留意周遭，找出十種不同的紫色。' },
    '2025-12-30': { weekday: '二', content: '不開燈洗澡。' },
    '2025-12-31': { weekday: '三', content: '像旁白一樣，大聲說出你正在做的事情。' },
    '2026-01-01': { weekday: '四', content: '花 2 分鐘看看一個新的 AI 工具，或學一點關於 AI 的新知。' },
    '2026-01-02': { weekday: '五', content: '拍一張你今天穿的鞋子的照片，傳給一位朋友。' },
    '2026-01-03': { weekday: '六', content: '去買一桶冰淇淋。' },
    '2026-01-04': { weekday: '日', content: '有哪一段記憶，是你現在最想重新經歷的？' },
    '2026-01-05': { weekday: '一', content: '整天用非英文、也非中文的其他語言說「你好」。' },
    '2026-01-06': { weekday: '二', content: '你最常拼錯的一個單字是什麼？' },
    '2026-01-07': { weekday: '三', content: '哪一本書改變了你對人生的看法？' },
    '2026-01-08': { weekday: '四', content: '你最常吃的療癒系食物是什麼？為什麼？' },
    '2026-01-09': { weekday: '五', content: '你聽過最糟糕的一個建議是什麼？' },
    '2026-01-10': { weekday: '六', content: '去麥當勞，點一樣你從來沒點過的東西。' },
    '2026-01-11': { weekday: '日', content: '你會信任哪一種食物，幫你保守秘密？' },
    '2026-01-12': { weekday: '一', content: '試著猜測你下一個看到的人的職業。' },
    '2026-01-13': { weekday: '二', content: '用一種你從未用過的風格，重新寫一次你的名字。' },
    '2026-01-14': { weekday: '三', content: '錄下自己 30 秒的聲音，然後播放來聽。' },
    '2026-01-15': { weekday: '四', content: '穿兩隻不同顏色的襪子。' },
    '2026-01-16': { weekday: '五', content: '對一株植物低聲說一個秘密。' },
    '2026-01-17': { weekday: '六', content: '把一段真實的回憶，改寫成一篇小說。' },
    '2026-01-18': { weekday: '日', content: '任命你身體的一個部位為 CEO，讓它替你做今天所有的決定。' },
    '2026-01-19': { weekday: '一', content: '把家中一個無生命的物品，升級到更高的社會地位。' },
    '2026-01-20': { weekday: '二', content: '像是剛降落在新星球一樣，向最近的物品介紹你自己。' },
    '2026-01-21': { weekday: '三', content: '找出今天你做過最不重要的一個決定，並用科學家的方式分析它。' },
    '2026-01-22': { weekday: '四', content: '如果你今天的心情是一種麵條，它會是什麼麵？' },
    '2026-01-23': { weekday: '五', content: '刻意改變今天日常生活中的一個小習慣。' }
};

// 起始日期和結束日期
const startDate = new Date('2025-12-25T00:00:00+08:00');
const endDate = new Date('2026-01-23T23:59:59+08:00');

// 獲取台灣時間（UTC+8）
function getTaiwanTime() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const taiwanTime = new Date(utc + (8 * 3600000));
    return taiwanTime;
}

// 格式化日期為 YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 格式化日期顯示（Dec 25, 2025）
function formatDateDisplay(dateStr) {
    const date = new Date(dateStr + 'T00:00:00+08:00');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}

// 格式化星期顯示（Thursday）
function formatWeekday(dateStr) {
    const date = new Date(dateStr + 'T00:00:00+08:00');
    const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 
                          'Thursday', 'Friday', 'Saturday'];
    return weekdayNames[date.getDay()];
}

// 檢查日期是否已解鎖
function isDateUnlocked(dateStr) {
    // 開發模式下解鎖所有日期
    if (DEV_MODE) {
        return true;
    }
    const taiwanTime = getTaiwanTime();
    const today = formatDate(taiwanTime);
    return dateStr <= today;
}

// 生成所有日期
function generateDates() {
    const dates = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
        dates.push(formatDate(current));
        current.setDate(current.getDate() + 1);
    }
    
    return dates;
}

// 格式化日期為簡短格式（Dec 25）
function formatShortDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00+08:00');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}`;
}

// 更新珍珠圖片
function updatePearlImage(pearl, dateStr) {
    const isCompleted = localStorage.getItem(`completed_${dateStr}`) === 'true';
    const isUnlocked = isDateUnlocked(dateStr);
    
    if (!isUnlocked) {
        // 鎖定狀態：使用 Raw Bubble，調整為240%，降低透明度
        pearl.style.backgroundImage = 'url("Raw Bubble.jpg")';
        pearl.style.backgroundSize = '240%';
        pearl.style.opacity = '0.4';
    } else if (isCompleted) {
        // 已完成：使用 Cooked Bubble，保持200%
        pearl.style.backgroundImage = 'url("Cooked Bubble.png")';
        pearl.style.backgroundSize = '200%';
        pearl.style.opacity = '1';
    } else {
        // 未完成：使用 Raw Bubble，調整為240%
        pearl.style.backgroundImage = 'url("Raw Bubble.jpg")';
        pearl.style.backgroundSize = '240%';
        pearl.style.opacity = '1';
    }
}

// 創建珍珠元素
function createPearl(dateStr, index) {
    const pearl = document.createElement('div');
    pearl.className = 'pearl';
    pearl.dataset.date = dateStr;
    
    const numberContainer = document.createElement('div');
    numberContainer.className = 'pearl-number';
    
    const dayLabel = document.createElement('div');
    dayLabel.className = 'pearl-day';
    dayLabel.textContent = `Day ${index + 1}`;
    
    const dateLabel = document.createElement('div');
    dateLabel.className = 'pearl-date';
    dateLabel.textContent = formatShortDate(dateStr);
    
    numberContainer.appendChild(dayLabel);
    numberContainer.appendChild(dateLabel);
    pearl.appendChild(numberContainer);
    
    // 檢查是否已解鎖
    if (!isDateUnlocked(dateStr)) {
        pearl.classList.add('locked');
    }
    
    // 檢查是否已完成
    if (isCompleted(dateStr)) {
        pearl.classList.add('completed');
    }
    
    // 設置珍珠圖片
    updatePearlImage(pearl, dateStr);
    
    // 添加點擊事件
    pearl.addEventListener('click', function() {
        if (!this.classList.contains('locked')) {
            showModal(dateStr);
            // 添加點擊動畫
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 600);
        }
    });
    
    return pearl;
}

// 從 localStorage 獲取回饋
function getFeedback(dateStr) {
    const feedback = localStorage.getItem(`feedback_${dateStr}`);
    return feedback || '';
}

// 保存回饋到 localStorage
function saveFeedback(dateStr, feedback) {
    localStorage.setItem(`feedback_${dateStr}`, feedback);
}

// 檢查是否已完成
function isCompleted(dateStr) {
    const completed = localStorage.getItem(`completed_${dateStr}`);
    return completed === 'true';
}

// 設置完成狀態
function setCompleted(dateStr, completed) {
    localStorage.setItem(`completed_${dateStr}`, completed ? 'true' : 'false');
    // 更新珍珠的視覺狀態
    const pearl = document.querySelector(`.pearl[data-date="${dateStr}"]`);
    if (pearl) {
        if (completed) {
            pearl.classList.add('completed');
        } else {
            pearl.classList.remove('completed');
        }
        // 更新珍珠圖片
        updatePearlImage(pearl, dateStr);
    }
}

// 顯示 Modal
function showModal(dateStr) {
    const modal = document.getElementById('modal');
    const modalDate = document.getElementById('modalDate');
    const modalWeekday = document.getElementById('modalWeekday');
    const modalContent = document.getElementById('modalContent');
    const feedbackInput = document.getElementById('feedbackInput');
    const completeBtn = document.getElementById('completeBtn');
    
    const content = dailyContent[dateStr];
    if (content) {
        modalDate.textContent = formatDateDisplay(dateStr);
        modalWeekday.textContent = formatWeekday(dateStr);
        
        // 檢查是否為特殊日期，顯示對應圖片
        const modalImage = document.getElementById('modalImage');
        if (dateStr === '2025-12-25') {
            modalImage.src = 'Xmas.png';
            modalImage.alt = 'Xmas';
            modalImage.style.display = 'block';
        } else if (dateStr === '2026-01-01') {
            modalImage.src = 'New Year.png';
            modalImage.alt = 'New Year';
            modalImage.style.display = 'block';
        } else {
            modalImage.style.display = 'none';
        }
        
        modalContent.textContent = content.content;
        
        // 載入回饋
        feedbackInput.value = getFeedback(dateStr);
        
        // 設置完成狀態
        const completed = isCompleted(dateStr);
        if (completed) {
            completeBtn.classList.add('completed');
            completeBtn.querySelector('.complete-text').textContent = '已完成';
        } else {
            completeBtn.classList.remove('completed');
            completeBtn.querySelector('.complete-text').textContent = '完成';
        }
        
        // 設置完成按鈕事件（只設置一次，避免重複綁定）
        completeBtn.onclick = function() {
            const isCurrentlyCompleted = isCompleted(dateStr);
            const newCompletedState = !isCurrentlyCompleted;
            setCompleted(dateStr, newCompletedState);
            
            if (newCompletedState) {
                completeBtn.classList.add('completed');
                completeBtn.querySelector('.complete-text').textContent = '已完成';
            } else {
                completeBtn.classList.remove('completed');
                completeBtn.querySelector('.complete-text').textContent = '完成';
            }
        };
        
        // 設置回饋自動保存（延遲保存）
        let saveTimeout;
        feedbackInput.oninput = function() {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                saveFeedback(dateStr, feedbackInput.value);
            }, 500);
        };
        
        modal.style.display = 'block';
    }
}

// 關閉 Modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// 初始化
function init() {
    const container = document.getElementById('pearlsContainer');
    const dates = generateDates();
    
    dates.forEach((dateStr, index) => {
        const pearl = createPearl(dateStr, index);
        container.appendChild(pearl);
    });
    
    // 關閉 Modal 事件
    const closeBtn = document.getElementById('closeModal');
    closeBtn.addEventListener('click', closeModal);
    
    // 點擊 Modal 外部關閉
    const modal = document.getElementById('modal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC 鍵關閉
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// 載入圖片（嘗試多種可能的檔名）
function loadBubbleTeaImage() {
    const img = document.getElementById('bubbleTeaImg');
    if (!img) return;
    
    const possibleNames = [
        'Bubble Tea Image.png',
        'bubble-tea.png',
        'bubble-tea.jpg',
        'bubble-tea.jpeg',
        'bubble-tea.webp',
        'bubble_tea.png',
        'bubble_tea.jpg',
        'image.png',
        'image.jpg'
    ];
    
    let currentIndex = 0;
    
    function tryNextImage() {
        if (currentIndex >= possibleNames.length) {
            // 所有檔名都試過了，顯示提示
            img.style.display = 'none';
            const container = img.parentElement;
            container.innerHTML = '<p style="text-align:center; color:#8b6f47; padding:20px; font-size:1.1rem;">請將珍珠奶茶圖片檔案放在此目錄中<br>支援的檔名：bubble-tea.png, bubble-tea.jpg 等</p>';
            return;
        }
        
        const testImg = new Image();
        testImg.onload = function() {
            img.src = possibleNames[currentIndex];
        };
        testImg.onerror = function() {
            currentIndex++;
            tryNextImage();
        };
        testImg.src = possibleNames[currentIndex];
    }
    
    tryNextImage();
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', function() {
    init();
    loadBubbleTeaImage();
});

