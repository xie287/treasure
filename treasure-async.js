// 游戏状态
const gameState = {
    health: 100,
    luck: 50,
    gold: 0,
    items: [],
    hasMapFragment: false,
    hasMagicSeal: false,
    metWitch: false,
    metElf: false,
    metDragon: false,
    metVillager: false
};

// 工具函数
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function addLog(message, type = 'info') {
    const log = document.getElementById('log');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.innerHTML = message;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
}

function showProgressBar(duration) {
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');
    
    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';
    
    let width = 0;
    const interval = duration / 100;
    const timer = setInterval(() => {
        if (width >= 100) {
            clearInterval(timer);
            setTimeout(() => {
                progressContainer.style.display = 'none';
            }, 500);
        } else {
            width++;
            progressBar.style.width = width + '%';
        }
    }, interval);
}

function animateAdventurer(animation) {
    const adventurer = document.getElementById('adventurer');
    adventurer.style.animation = `${animation} 0.5s`;
    
    setTimeout(() => {
        adventurer.style.animation = 'adventurerIdle 3s infinite';
    }, 500);
}

function showTreasureEffect() {
    const effect = document.getElementById('treasureEffect');
    effect.textContent = '💎';
    effect.style.animation = 'treasureReveal 2s forwards';
    
    setTimeout(() => {
        effect.style.animation = '';
        effect.style.opacity = '0';
    }, 3000);
}

function showCharacterEffect(character) {
    const effect = document.getElementById('characterEffect');
    effect.textContent = character;
    effect.style.animation = 'characterAppear 1.5s forwards';
    
    setTimeout(() => {
        effect.style.animation = '';
        effect.style.opacity = '0';
    }, 2000);
}

function showChoice(text, choices) {
    const container = document.getElementById('choiceContainer');
    const choiceText = document.getElementById('choiceText');
    const choiceButtons = document.getElementById('choiceButtons');
    
    choiceText.innerHTML = text;
    choiceButtons.innerHTML = '';
    
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice.text;
        button.onclick = () => {
            container.style.display = 'none';
            choice.action();
        };
        choiceButtons.appendChild(button);
    });
    
    container.style.display = 'block';
}

function updateStats() {
    document.getElementById('healthValue').textContent = gameState.health;
    document.getElementById('luckValue').textContent = gameState.luck;
    document.getElementById('goldValue').textContent = gameState.gold;
}

// 创建背景
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // 随机位置和大小
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // 随机动画延迟
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starsContainer.appendChild(star);
    }
}

// 寻宝
class TreasureMap {
    static async getInitialClue() {
        await delay(1000);
        return "在古老的图书馆里找到了第一个线索...";
    }
    
    static async decodeAncientScript(clue) {
        await delay(1500);
        if (!clue) throw new Error("没有线索可以解码!");
        return "解码成功!宝藏在一座古老的神庙中...";
    }
    
    static async searchTemple(location) {
        await delay(2000);
        const random = Math.random();
        if (random < 0.3) throw new Error("糟糕!遇到了神庙守卫!");
        return "找到了一个神秘的箱子...";
    }
    
    static async openTreasureBox() {
        await delay(1000);
        return "恭喜!你找到了传说中的宝藏!";
    }
    
    // 新增情节
    static async findMapFragment() {
        await delay(1200);
        return "在古堡的密室里发现了藏宝图碎片...";
    }
    
    static async breakMagicSeal() {
        await delay(1800);
        const success = Math.random() < 0.7;
        if (success) return "成功解开魔法封印!通往宝藏的道路打开了...";
        throw new Error("魔法封印太强大了!需要寻找更强的魔法道具...");
    }
    
    static async crossMistyForest() {
        await delay(1600);
        return "勇敢地穿越了迷雾森林，发现了一条隐秘的小路...";
    }
    
    static async solveAncientPuzzle() {
        await delay(2200);
        const solved = Math.random() < 0.6;
        if (solved) return "成功解开了古老谜题!获得了关键线索...";
        throw new Error("谜题太难了!需要更多时间思考...");
    }
}

// 随机事件
class RandomEvents {
    // 遇见女巫
    static async meetWitch() {
        return new Promise((resolve) => {
            showChoice(
                "在迷雾森林中，你遇见了一位神秘的女巫。她给了你两瓶药水：一瓶紫色一瓶绿色。",
                [
                    { text: "喝紫色药水", action: () => { 
                        gameState.health -= 30;
                        gameState.luck += 10;
                        updateStats();
                        resolve("💜 你喝了紫色药水，感觉一阵剧痛！生命值减少30点，但幸运值增加了10点。女巫大笑着消失了..."); 
                    }},
                    { text: "喝绿色药水", action: () => { 
                        gameState.health += 20;
                        gameState.luck += 20;
                        updateStats();
                        resolve("💚 你喝了绿色药水，感觉精力充沛！生命值增加20点，幸运值增加20点。女巫祝福你后消失了..."); 
                    }},
                    { text: "都不喝，直接离开", action: () => { 
                        resolve("🚫 你谨慎地拒绝了女巫的药水，继续前进。女巫不满地哼了一声消失了..."); 
                    }}
                ]
            );
        });
    }
    
    // 遇见精灵
    static async meetElf() {
        return new Promise((resolve) => {
            showChoice(
                "在森林深处，你遇见了一位优雅的精灵。她愿意帮助你，但需要你回答一个问题。",
                [
                    { text: "接受精灵的帮助", action: () => { 
                        const correct = Math.random() < 0.7;
                        if (correct) {
                            gameState.luck += 25;
                            updateStats();
                            resolve("🧚 你正确回答了精灵的问题！精灵赐予你幸运祝福，幸运值增加25点。"); 
                        } else {
                            gameState.luck -= 10;
                            updateStats();
                            resolve("❌ 你回答错误，精灵失望地离开了。你的幸运值减少了10点。"); 
                        }
                    }},
                    { text: "拒绝精灵的帮助", action: () => { 
                        resolve("🚫 你礼貌地拒绝了精灵的帮助，继续独自冒险。"); 
                    }}
                ]
            );
        });
    }
    
    // 遇见龙
    static async meetDragon() {
        return new Promise((resolve) => {
            showChoice(
                "你遇到了一条沉睡的巨龙！它守护着一个宝箱。",
                [
                    { text: "悄悄偷走宝箱", action: () => { 
                        const success = Math.random() < (gameState.luck / 100);
                        if (success) {
                            gameState.gold += 100;
                            updateStats();
                            resolve("💰 你成功偷走了宝箱！获得100金币。巨龙仍在沉睡..."); 
                        } else {
                            gameState.health -= 40;
                            updateStats();
                            resolve("🔥 巨龙醒了！你被龙焰烧伤，生命值减少40点。"); 
                        }
                    }},
                    { text: "尝试与龙交谈", action: () => { 
                        const friendly = Math.random() < 0.3;
                        if (friendly) {
                            gameState.gold += 50;
                            updateStats();
                            resolve("🐉 巨龙很友好，它给了你50金币作为礼物！"); 
                        } else {
                            gameState.health -= 20;
                            updateStats();
                            resolve("🔥 巨龙对你喷火！生命值减少20点。"); 
                        }
                    }},
                    { text: "悄悄离开", action: () => { 
                        resolve("🚶 你决定不冒险，悄悄离开了巨龙的巢穴。"); 
                    }}
                ]
            );
        });
    }
    
    // 遇见村民
    static async meetVillager() {
        return new Promise((resolve) => {
            showChoice(
                "你遇到了一个友好的村民，他愿意提供帮助。",
                [
                    { text: "购买地图", action: () => { 
                        if (gameState.gold >= 30) {
                            gameState.gold -= 30;
                            gameState.hasMapFragment = true;
                            updateStats();
                            resolve("🗺️ 你花费30金币购买了地图。现在你有了藏宝图碎片！"); 
                        } else {
                            resolve("💸 你没有足够的金币购买地图。村民同情地给了你10金币。");
                            gameState.gold += 10;
                            updateStats();
                        }
                    }},
                    { text: "接受食物", action: () => { 
                        gameState.health += 15;
                        updateStats();
                        resolve("🍎 村民给了你食物，生命值恢复15点。"); 
                    }},
                    { text: "询问宝藏线索", action: () => { 
                        gameState.luck += 15;
                        updateStats();
                        resolve("💡 村民告诉你一些有用的线索，幸运值增加15点。"); 
                    }}
                ]
            );
        });
    }
    
    // 随机事件触发器
    static async triggerRandomEvent() {
        const events = [
            { name: "witch", probability: 0.3, func: this.meetWitch },
            { name: "elf", probability: 0.25, func: this.meetElf },
            { name: "dragon", probability: 0.2, func: this.meetDragon },
            { name: "villager", probability: 0.4, func: this.meetVillager }
        ];
        
        // 增加幸运值对事件概率的影响
        const luckBonus = gameState.luck / 200;
        
        for (const event of events) {
            if (!gameState[`met${event.name.charAt(0).toUpperCase() + event.name.slice(1)}`] && 
                Math.random() < event.probability + luckBonus) {
                gameState[`met${event.name.charAt(0).toUpperCase() + event.name.slice(1)}`] = true;
                return await event.func();
            }
        }
        
        return null;
    }
}

// 寻宝冒险主函数
async function startAdventure() {
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    startBtn.disabled = true;
    resetBtn.disabled = true;
    
    try {
        addLog('🚀 开始寻宝冒险...', 'info');
        animateAdventurer('adventurerIdle');
        
        // 检查是否有随机事件
        const randomEventResult = await RandomEvents.triggerRandomEvent();
        if (randomEventResult) {
            addLog('🎲 ' + randomEventResult, 'purple');
            
            // 显示角色特效
            if (randomEventResult.includes('女巫')) showCharacterEffect('🧙‍♀️');
            else if (randomEventResult.includes('精灵')) showCharacterEffect('🧚');
            else if (randomEventResult.includes('巨龙')) showCharacterEffect('🐉');
            else if (randomEventResult.includes('村民')) showCharacterEffect('👨‍🌾');
        }
        
        // 情节1: 寻找藏宝图碎片
        addLog('🔍 正在寻找藏宝图碎片...', 'info');
        showProgressBar(1200);
        const fragment = await TreasureMap.findMapFragment();
        addLog('📜 ' + fragment, 'success');
        animateAdventurer('adventurerIdle');
        
        // 情节2: 获取初始线索
        addLog('🔎 正在分析藏宝图...', 'info');
        showProgressBar(1000);
        const clue = await TreasureMap.getInitialClue();
        addLog('🗺️ ' + clue, 'success');
        animateAdventurer('adventurerIdle');
        
        // 情节3: 解码古老手稿
        addLog('📖 正在解码古老手稿...', 'info');
        showProgressBar(1500);
        const location = await TreasureMap.decodeAncientScript(clue);
        addLog('✨ ' + location, 'success');
        animateAdventurer('adventurerIdle');
        
        // 情节4: 穿越迷雾森林
        addLog('🌲 正在穿越迷雾森林...', 'info');
        showProgressBar(1600);
        const forest = await TreasureMap.crossMistyForest();
        addLog('🛤️ ' + forest, 'success');
        animateAdventurer('adventurerIdle');
        
        // 检查是否有随机事件
        const forestEventResult = await RandomEvents.triggerRandomEvent();
        if (forestEventResult) {
            addLog('🎲 ' + forestEventResult, 'purple');
            
            // 显示角色特效
            if (forestEventResult.includes('女巫')) showCharacterEffect('🧙‍♀️');
            else if (forestEventResult.includes('精灵')) showCharacterEffect('🧚');
            else if (forestEventResult.includes('巨龙')) showCharacterEffect('🐉');
            else if (forestEventResult.includes('村民')) showCharacterEffect('👨‍🌾');
        }
        
        // 情节5: 解开魔法封印
        addLog('🔮 正在尝试解开魔法封印...', 'warning');
        showProgressBar(1800);
        const seal = await TreasureMap.breakMagicSeal();
        addLog('⚡ ' + seal, 'success');
        animateAdventurer('adventurerIdle');
        
        // 情节6: 解开古老谜题
        addLog('🧩 正在解开古老谜题...', 'warning');
        showProgressBar(2200);
        const puzzle = await TreasureMap.solveAncientPuzzle();
        addLog('🎯 ' + puzzle, 'success');
        animateAdventurer('adventurerIdle');
        
        // 情节7: 搜索神庙
        addLog('🏛️ 正在搜索古老神庙...', 'info');
        showProgressBar(2000);
        const box = await TreasureMap.searchTemple(location);
        addLog('📦 ' + box, 'success');
        animateAdventurer('adventurerIdle');
        
        // 情节8: 打开宝箱
        addLog('🔑 正在打开宝箱...', 'warning');
        showProgressBar(1000);
        const treasure = await TreasureMap.openTreasureBox();
        addLog('💎 ' + treasure, 'success');
        
        // 显示宝藏特效
        showTreasureEffect();
        animateAdventurer('adventurerIdle');
        
        // 根据游戏状态给出不同的结局
        let ending = '';
        if (gameState.health <= 0) {
            ending = "尽管找到了宝藏，但你的生命值已耗尽。这真是一场悲壮的冒险...";
        } else if (gameState.luck >= 80) {
            ending = "凭借极高的幸运值，你不仅找到了宝藏，还发现了额外的神秘宝物！";
            gameState.gold += 200;
        } else if (gameState.gold >= 150) {
            ending = "你带着大量金币和宝藏凯旋而归，成为了传奇冒险家！";
        } else {
            ending = "寻宝任务圆满完成! 你是真正的冒险家!";
        }
        
        addLog('🎉 <strong>' + ending + '</strong>', 'success');
        updateStats();
        
    } catch (error) {
        addLog('💥 冒险失败: ' + error.message, 'danger');
        addLog('🔄 点击"重新开始"再次尝试冒险!', 'info');
        animateAdventurer('adventurerIdle');
    } finally {
        resetBtn.disabled = false;
    }
}

function resetAdventure() {
    const log = document.getElementById('log');
    log.innerHTML = '<div class="log-entry info">🚀 欢迎来到寻宝冒险！点击开始按钮启程...</div>';
    
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    startBtn.disabled = false;
    resetBtn.disabled = true;
    
    // 重置游戏状态
    gameState.health = 100;
    gameState.luck = 50;
    gameState.gold = 0;
    gameState.items = [];
    gameState.hasMapFragment = false;
    gameState.hasMagicSeal = false;
    gameState.metWitch = false;
    gameState.metElf = false;
    gameState.metDragon = false;
    gameState.metVillager = false;
    
    updateStats();
    
    // 重置冒险者动画
    animateAdventurer('adventurerIdle');
}

// 初始化
window.onload = function() {
    createStars();
    updateStats();
    
    // 绑定按钮事件
    document.getElementById('startBtn').addEventListener('click', startAdventure);
    document.getElementById('resetBtn').addEventListener('click', resetAdventure);
};