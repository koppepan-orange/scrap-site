// ==================================================
// nakami.js — メイン処理
// komagome.js の関数・クラス群を前提とする
// ==================================================

// #region ---- スペース管理 ----
let mainD = document.getElementById('main');
let mainC = {
    spa: null,
    mvlsD:  document.getElementById('movlis'),
    mvlsLD: document.querySelector('#movlis .list'),
    mvlsi: 0,
};
let mainF = {};

mainF.move = (to) => {
    if (mainC.spa == to) return;
    if (!to) return console.error(`${to}というスペースはない`);
    for (let a of Spaces) {
        let d = document.getElementById(a.name);
        if (d) d.classList.remove('show');
    }
    let d = document.getElementById(to);
    if (d) d.classList.add('show');
    mainC.spa = to;
    history.replaceState(null, '', `?${to}`);
};

mainF.load = () => {
    for (let spa of Spaces) {
        let d = document.getElementById(spa.name);
        if (!d) continue;
        d.style.zIndex  = spa.rank;
        d.style.background = spa.back;
    }
};

// movlis
for (let n of Spaces) {
    let li = document.createElement('div');
    li.textContent = n.name;
    li.className = 'item';
    li.addEventListener('click', () => mainF.move(n.name));
    mainC.mvlsLD.appendChild(li);
}
document.addEventListener('keydown', (e) => {
    if (e.key != 'm' || mainC.mvlsi) return;
    mainC.mvlsD.style.left = `${OBS.mx - mainC.mvlsD.offsetWidth / 2}px`;
    mainC.mvlsD.style.top  = `${OBS.my}px`;
    mainC.mvlsD.classList.add('tog');
    mainC.mvlsi = 1;
});
document.addEventListener('keyup', e => {
    if (e.key != 'm') return;
    mainC.mvlsD.classList.remove('tog');
    mainC.mvlsi = 0;
});
// #endregion

// #region ---- start ----
function start() {
    Style.tekiou();
    OBS.load();
    mainF.load();

    // battle CSS を動的にロード
    if (!document.getElementById('battle-css')) {
        let link = document.createElement('link');
        link.id   = 'battle-css';
        link.rel  = 'stylesheet';
        link.href = `battle.css?v=${Date.now()}`;
        document.head.appendChild(link);
    }

    // ホーム画面にバトルボタンを追加
    buildHomeScreen();

    let hash  = location.search.replace('?', '');
    let space = Spaces.find(a => a.name == hash) || Spaces.find(a => a.sho);
    mainF.move(space.name);
}

function buildHomeScreen() {
    let homeD = document.getElementById('home');
    if (!homeD || homeD.dataset.built) return;
    homeD.dataset.built = '1';

    Object.assign(homeD.style, {
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '20px'
    });

    let title = document.createElement('div');
    title.textContent = '⚔️ シャドウバース風TCG';
    Object.assign(title.style, {
        fontSize: '20px', color: '#88aaff',
        fontFamily: 'cube12, monospace', textAlign: 'center'
    });
    homeD.appendChild(title);

    let btn = document.createElement('div');
    btn.textContent = 'バトル開始';
    Object.assign(btn.style, {
        padding: '14px 32px',
        background: 'linear-gradient(135deg,#2255aa,#114488)',
        border: '2px solid #55aaff', borderRadius: '12px',
        color: '#fff', fontSize: '18px',
        fontFamily: 'cube12, monospace', cursor: 'pointer',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,100,255,0.3)',
    });
    btn.addEventListener('pointerdown', () => btn.style.transform = 'scale(0.95)');
    btn.addEventListener('pointerup',   () => btn.style.transform = '');
    btn.addEventListener('click', () => {
        buildBattleUI();
        mainF.move('battle');
        bF.showDeckSelect();
    });
    homeD.appendChild(btn);
}
// #endregion

// #region ---- DOM 準備完了 ----
let LoadOfWait = async () => await loaF.load();
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
async function init() {
    await LoadOfWait();
}
// #endregion


// ==================================================
// BATTLE SYSTEM
// ==================================================

// ---- 定数 ----
const MAX_FIELD = 5;
const MAX_HAND  = 9;
const MAX_PP    = 10;
const KW_NAMES  = {
    ward:'ガード', storm:'突進', rush:'疾走',
    drain:'吸血', bane:'必殺', ambush:'潜伏'
};
const CARD_ART  = {
    neutral:'🃏', royal:'⚔️', witch:'🔮', dragon:'🐉',
    necro:'💀', bishop:'✨', elf:'🌿', vampire:'🦇', nemesis:'⚙️',
    // 個別
    n001:'👺', n002:'🐾', n003:'🗿', n004:'🧟', n005:'🗿',
    n006:'🟢', n007:'🐕', n008:'🦅', n009:'🦎', n010:'🐲',
    n011:'👼', n012:'👻', n013:'🔥', n014:'❄️', n015:'🛡️',
    n016:'🛡️', n017:'⚡', n018:'🧙', n019:'🌋', n020:'🩸',
    r001:'👑', r002:'🗡️', r003:'🛡️', r004:'⚔️', r005:'🌟',
    r006:'🏹', r007:'🏹', r008:'📯', r009:'🚩', r010:'🦅',
    w001:'🧊', w002:'⭐', w003:'🔥', w004:'❄️', w005:'💀',
    w006:'📖', w007:'🔮', w008:'⚡', w009:'🌀', w010:'🧊',
    d001:'🐉', d002:'🧿', d003:'🔥', d004:'🐲', d005:'🌍',
    d006:'🐍', d007:'🗡️', d008:'🌊',
    nc001:'😇', nc002:'⚰️', nc003:'💀', nc004:'🧟', nc005:'👹',
    nc006:'💜', nc007:'👑', nc008:'⚰️',
    b001:'😇', b002:'✨', b003:'😊', b004:'🌟', b005:'🕊️',
    b006:'🌈', b007:'💊', b008:'🌞',
    e001:'🧚', e002:'🐺', e003:'🌳', e004:'💨', e005:'🍃',
    e006:'🦅', e007:'🧚', e008:'🌲',
    v001:'🎯', v002:'🐺', v003:'🧛', v004:'🩸', v005:'😈',
    v006:'🦇', v007:'💀',
    nm001:'🤖', nm002:'🔫', nm003:'⚙️', nm004:'💥', nm005:'🤖',
};

function getArt(card) { return CARD_ART[card.id] || CARD_ART[card.craft] || '🃏'; }
function getCraftName(craft) {
    return { royal:'ロイヤル', witch:'ウィッチ', dragon:'ドラゴン',
             necro:'ネクロマンサー', bishop:'ビショップ', elf:'エルフ',
             vampire:'ヴァンパイア', nemesis:'ネメシス', neutral:'ニュートラル' }[craft] || craft;
}


// ---- ゲーム状態 ----
let bS = null;   // battle state
let bD = null;   // battle DOM root
let bF = {};     // battle functions

// ---- UIDカウンタ ----
let _uid = 0;
function uid() { return ++_uid; }


// ==================================================
// コンテキスト (カード効果から呼ぶAPI群)
// ==================================================
function makeCtx(state) {
    return {
        // 情報
        getEnemy: (who) => who === 'player' ? 'enemy' : 'player',
        getField:  (who) => state[who].field,
        getHand:   (who) => state[who].hand,
        getGraveyard: (who) => state[who].graveyard,
        getLeaderHP:  (who) => state[who].leader.hp,
        getMaxPP:     (who) => state[who].ppMax,
        getCardsPlayedThisTurn: (who) => state[who].cardsPlayed || 0,
        countFriendlyByName: (who, name) => state[who].field.filter(f => f.name === name).length,
        hasCraftFollower:    (who, craft) => state[who].field.some(f => f.craft === craft),
        getLeaderDamageTaken:(who) => state[who].damageTaken || 0,

        // ドロー
        drawCard(who) {
            if (!state[who].deck.length) {
                let d = state[who].fatigue || 1;
                state[who].leader.hp = Math.max(0, state[who].leader.hp - d);
                state[who].fatigue = d + 1;
                bLog(`${who==='player'?'あなた':'敵'}はデッキ切れで${d}ダメージ！`, 'damage');
                checkEnd(); bRender(); return;
            }
            let card = state[who].deck.shift();
            if (state[who].hand.length < MAX_HAND) {
                state[who].hand.push(card);
                if (who === 'player') bLog(`ドロー: ${card.name}`, 'draw');
            } else {
                state[who].graveyard.push(card);
                bLog(`手札あふれ: ${card.name}`, 'system');
            }
            bRender();
        },
        drawSpellCards(who, count) {
            let n = 0;
            for (let i = state[who].deck.length - 1; i >= 0 && n < count; i--) {
                if (state[who].deck[i].type === 'spell') {
                    let [card] = state[who].deck.splice(i, 1);
                    if (state[who].hand.length < MAX_HAND) { state[who].hand.push(card); n++; }
                }
            }
            bRender();
        },
        drawCardByCost(who, cost) {
            let idx = state[who].deck.findIndex(c => c.cost === cost);
            if (idx === -1) return;
            let [card] = state[who].deck.splice(idx, 1);
            if (state[who].hand.length < MAX_HAND) state[who].hand.push(card);
            bRender();
        },
        drawCardByName(who, name) {
            let idx = state[who].deck.findIndex(c => c.name === name);
            if (idx === -1) return;
            let [card] = state[who].deck.splice(idx, 1);
            if (state[who].hand.length < MAX_HAND) state[who].hand.push(card);
            bRender();
        },

        // ダメージ
        dealDamage(target, amount, ownerWho) {
            if (!target) return;
            if (target.type === 'leader') this.damageLeader(target.owner, amount);
            else this.damageFollower(target, amount, ownerWho);
        },
        damageFollower(f, amount, ownerWho) {
            if (!f || !f.alive) return;
            f.def -= amount;
            showDmgPop(f.uid, amount, false);
            bLog(`${f.name}に${amount}ダメージ`, 'damage');
            if (f.def <= 0) schedDeath(f, ownerWho);
            bRender();
        },
        damageLeader(who, amount) {
            state[who].leader.hp = Math.max(0, state[who].leader.hp - amount);
            state[who].damageTaken = (state[who].damageTaken || 0) + amount;
            showDmgPop('leader-' + who, amount, false);
            bLog(`${who==='player'?'あなた':'敵'}リーダーに${amount}ダメージ！`, 'damage');
            checkEnd(); bRender();
        },
        damageRandomEnemy(who, amount) {
            let arr = state[this.getEnemy(who)].field.filter(f => f.alive);
            if (!arr.length) return;
            this.damageFollower(arr[Math.floor(Math.random() * arr.length)], amount, who);
        },
        damageAllEnemies(who, amount) {
            let enemy = this.getEnemy(who);
            [...state[enemy].field.filter(f => f.alive)].forEach(f => this.damageFollower(f, amount, who));
        },

        // 回復
        healLeader(who, amount) {
            let old = state[who].leader.hp;
            state[who].leader.hp = Math.min(state[who].leader.maxHp, old + amount);
            let actual = state[who].leader.hp - old;
            if (actual > 0) {
                showDmgPop('leader-' + who, actual, true);
                bLog(`${who==='player'?'あなた':'敵'}リーダーを${actual}回復`, 'heal');
                // onHealトリガー
                state[who].field.forEach(f => { if (f.alive && f.onHeal) try { f.onHeal(this, f); } catch(e){} });
            }
            bRender();
        },
        healFollower(f, amount) {
            if (!f || !f.alive) return;
            f.def = Math.min(f.maxDef, f.def + amount);
            bRender();
        },
        healAllFriendly(who, amount) {
            state[who].field.filter(f => f.alive).forEach(f => this.healFollower(f, amount));
        },

        // バフ
        buffFollower(f, atkAdd, defAdd) {
            if (!f || !f.alive) return;
            f.atk = Math.max(0, f.atk + atkAdd);
            f.def += defAdd; f.maxDef += defAdd;
            bRender();
        },
        buffAllFriendly(who, atkAdd, defAdd) {
            state[who].field.filter(f => f.alive).forEach(f => this.buffFollower(f, atkAdd, defAdd));
        },
        addKeyword(f, kw) {
            if (!f || !f.alive || f.keywords.includes(kw)) return;
            f.keywords.push(kw); bRender();
        },
        grantAllFriendlyRush(who) {
            state[who].field.filter(f => f.alive && !f.summonSick).forEach(f => { f._tempRush = true; });
            bRender();
        },

        // フリーズ
        freezeFollower(f) {
            if (!f || !f.alive || f.frozen) return;
            f.frozen = true; f._frozenAtk = f.atk; f.atk = 0;
            bLog(`${f.name}が凍結！`, 'system'); bRender();
        },
        freezeRandomEnemy(who) {
            let arr = state[this.getEnemy(who)].field.filter(f => f.alive && !f.frozen);
            if (!arr.length) return;
            this.freezeFollower(arr[Math.floor(Math.random() * arr.length)]);
        },

        // 破壊・消滅
        destroyFollower(f) {
            if (!f || !f.alive) return;
            f.def = 0; schedDeath(f, null);
        },
        banishFollower(f) {
            if (!f || !f.alive) return;
            f.alive = false; f.banished = true;
            let who = f.owner;
            state[who].field = state[who].field.filter(x => x.uid !== f.uid);
            bLog(`${f.name}が消滅！`, 'death'); bRender();
        },

        // 召喚
        summonToken(who, data) {
            if (state[who].field.length >= MAX_FIELD) return;
            let f = makeFollower(data, who);
            f.summonSick = true;
            state[who].field.push(f);
            triggerOnSummon(f, who, this);
            bLog(`${f.name}が召喚された！`, 'play'); bRender();
        },

        // PP
        increasePPMax(who, n) {
            state[who].ppMax = Math.min(MAX_PP, state[who].ppMax + n);
            state[who].pp = Math.min(state[who].ppMax, state[who].pp + n);
            bRender();
        },
        gainPPThisTurn(who, n) {
            state[who].pp = Math.min(state[who].ppMax + n, state[who].pp + n);
            bRender();
        },

        // リアニメイト
        reanimateBestFollower(who, maxCost) {
            let arr = state[who].graveyard.filter(c => c.type === 'follower' && c.cost <= maxCost);
            if (!arr.length) return;
            let best = arr.sort((a, b) => b.cost - a.cost)[0];
            this.summonToken(who, best);
        },
    };
}


// ==================================================
// フォロワー生成
// ==================================================
function makeFollower(data, owner) {
    let src = CardDB.find(c => c.id === data.id) || data;
    return {
        uid: uid(),
        id: src.id, name: src.name, craft: src.craft, type: src.type,
        cost: src.cost, atk: src.atk || 0,
        def: src.def || 0, maxDef: src.maxDef || src.def || 0,
        keywords: [...(src.keywords || [])],
        desc: src.desc || '', flavor: src.flavor || '',
        alive: true, summonSick: true, exhausted: false, frozen: false,
        owner,
        // 効果
        onPlay: src.onPlay, onDeath: src.onDeath,
        onDamageTaken: src.onDamageTaken, onAttack: src.onAttack,
        onAllySummon: src.onAllySummon, onAllySpell: src.onAllySpell,
        onAllyDeath: src.onAllyDeath, onHeal: src.onHeal,
        onTurnStart: src.onTurnStart, onTurnEnd: src.onTurnEnd,
        getKeywords: src.getKeywords,
        multiAttack: src.multiAttack || false,
    };
}

function makeAmulet(data, owner) {
    let src = CardDB.find(c => c.id === data.id) || data;
    return {
        uid: uid(), id: src.id, name: src.name, craft: src.craft, type: 'amulet',
        cost: src.cost, desc: src.desc || '', alive: true, owner,
        onAllySummon: src.onAllySummon,
        onTurnStart: src.onTurnStart, onTurnEnd: src.onTurnEnd,
        reduceSpellCost: src.reduceSpellCost || 0,
        destroyAtTurnEnd: src.destroyAtTurnEnd || false,
    };
}

function getKeywords(f, ctx) {
    if (f.getKeywords) return f.getKeywords(ctx, f);
    let k = [...f.keywords];
    if (f._tempRush) k.push('rush');
    return k;
}
function hasKw(f, kw, ctx) { return getKeywords(f, ctx).includes(kw); }


// ==================================================
// 状態初期化
// ==================================================
function initState(pDeck, eDeck) {
    _uid = 0;
    function build(deckDef) {
        return arrayShuffle(
            deckDef.cards.map(id => CardDB.find(c => c.id === id)).filter(Boolean)
        );
    }
    return {
        turn: 1,
        currentTurn: 'player',
        phase: 'main', // main | sel_attacker | sel_spell_target
        selCard: null,       // 選択中の手札インデックス
        selFollower: null,   // 攻撃するフォロワー
        spellCard: null,     // 対象選択中スペル
        buffTarget: false,   // 味方対象スペルか
        gameOver: false, winner: null,
        amulets: { player: [], enemy: [] },
        logs: [],
        player: {
            leader: { ...pDeck.leader },
            deck: build(pDeck), hand: [], field: [], graveyard: [],
            pp: 1, ppMax: 1,
            cardsPlayed: 0, damageTaken: 0, fatigue: 1,
        },
        enemy: {
            leader: { ...eDeck.leader },
            deck: build(eDeck), hand: [], field: [], graveyard: [],
            pp: 0, ppMax: 0,
            cardsPlayed: 0, damageTaken: 0, fatigue: 1,
        },
    };
}


// ==================================================
// 死亡処理
// ==================================================
const _dying = new Set();
function schedDeath(f, attackerOwner) {
    if (_dying.has(f.uid)) return;
    _dying.add(f.uid);
    setTimeout(() => processDeath(f, attackerOwner), 50);
}
function processDeath(f, attackerOwner) {
    if (!f.alive) return;
    f.alive = false; _dying.delete(f.uid);
    let who = f.owner;
    let ctx = makeCtx(bS);
    // エフェクト
    let el = document.querySelector(`[data-uid="${f.uid}"]`);
    if (el) { el.classList.add('dying'); setTimeout(() => el.remove(), 400); }
    // フィールドから除外
    bS[who].field = bS[who].field.filter(x => x.uid !== f.uid);
    if (!f.banished) bS[who].graveyard.push(f);
    bLog(`${f.name}が倒れた！`, 'death');
    if (f.onDeath) try { f.onDeath(ctx, f); } catch(e) {}
    bS[who].field.forEach(x => { if (x.alive && x.onAllyDeath) try { x.onAllyDeath(ctx, x, f); } catch(e) {} });
    checkEnd(); bRender();
}

function checkEnd() {
    if (!bS || bS.gameOver) return;
    if (bS.player.leader.hp <= 0) { bS.gameOver = true; bS.winner = 'enemy'; setTimeout(() => showResult('lose'), 600); }
    else if (bS.enemy.leader.hp <= 0) { bS.gameOver = true; bS.winner = 'player'; setTimeout(() => showResult('win'), 600); }
}

function triggerOnSummon(summoned, who, ctx) {
    bS.amulets[who].forEach(a => { if (a.alive && a.onAllySummon) try { a.onAllySummon(ctx, a, summoned); } catch(e) {} });
    bS[who].field.forEach(f => { if (f.alive && f !== summoned && f.onAllySummon) try { f.onAllySummon(ctx, f, summoned); } catch(e) {} });
}


// ==================================================
// ログ
// ==================================================
function bLog(text, type = 'system') {
    if (!bS) return;
    bS.logs.push({ text, type });
    if (bS.logs.length > 30) bS.logs.shift();
    renderLog();
}
function renderLog() {
    let logD = document.getElementById('bLog');
    if (!logD) return;
    logD.innerHTML = bS.logs.slice(-10).map(l =>
        `<div class="log-entry ${l.type}">${l.text}</div>`
    ).join('');
    logD.scrollTop = logD.scrollHeight;
}


// ==================================================
// コスト計算
// ==================================================
function realCost(card, who) {
    let c = card.cost;
    bS.amulets[who].forEach(a => { if (a.alive && a.reduceSpellCost && card.type === 'spell') c -= a.reduceSpellCost; });
    return Math.max(0, c);
}


// ==================================================
// ターン: プレイヤー
// ==================================================
async function startPlayerTurn() {
    if (bS.gameOver) return;
    bS.currentTurn = 'player';
    bS.phase = 'main';
    bS.selCard = null; bS.selFollower = null;

    bS.player.ppMax = Math.min(MAX_PP, bS.player.ppMax + 1);
    bS.player.pp    = bS.player.ppMax;
    bS.player.cardsPlayed = 0;

    let ctx = makeCtx(bS);
    bS.player.field.forEach(f => {
        f.summonSick = false; f.exhausted = false;
        delete f._tempRush;
        if (f.frozen) { f.frozen = false; f.atk = f._frozenAtk || f.atk; delete f._frozenAtk; }
        if (f.alive && f.onTurnStart) try { f.onTurnStart(ctx, f); } catch(e) {}
    });
    bS.amulets.player.forEach(a => { if (a.alive && a.onTurnStart) try { a.onTurnStart(ctx, a); } catch(e) {} });

    ctx.drawCard('player');
    showBanner('あなたのターン');
    bLog(`=== ターン ${bS.turn} (あなた) ===`, 'system');
    bRender();
}

async function endPlayerTurn() {
    if (bS.gameOver || bS.currentTurn !== 'player') return;
    bS.phase = 'main';
    bS.selCard = null; bS.selFollower = null;

    let ctx = makeCtx(bS);
    bS.player.field.forEach(f => {
        delete f._tempRush;
        if (f.alive && f.onTurnEnd) try { f.onTurnEnd(ctx, f); } catch(e) {}
    });
    [...bS.amulets.player].forEach(a => {
        if (!a.alive) return;
        if (a.onTurnEnd) try { a.onTurnEnd(ctx, a); } catch(e) {}
        if (a.destroyAtTurnEnd) { a.alive = false; bS.amulets.player = bS.amulets.player.filter(x => x.uid !== a.uid); }
    });

    bRender();
    if (bS.gameOver) return;
    await delay(600);
    startEnemyTurn();
}


// ==================================================
// ターン: 敵AI
// ==================================================
async function startEnemyTurn() {
    if (bS.gameOver) return;
    bS.currentTurn = 'enemy';
    bS.turn++;

    bS.enemy.ppMax = Math.min(MAX_PP, bS.enemy.ppMax + 1);
    bS.enemy.pp    = bS.enemy.ppMax;
    bS.enemy.cardsPlayed = 0;

    let ctx = makeCtx(bS);
    bS.enemy.field.forEach(f => {
        f.summonSick = false; f.exhausted = false;
        delete f._tempRush;
        if (f.frozen) { f.frozen = false; f.atk = f._frozenAtk || f.atk; delete f._frozenAtk; }
        if (f.alive && f.onTurnStart) try { f.onTurnStart(ctx, f); } catch(e) {}
    });
    bS.amulets.enemy.forEach(a => { if (a.alive && a.onTurnStart) try { a.onTurnStart(ctx, a); } catch(e) {} });

    ctx.drawCard('enemy');
    showBanner('敵のターン');
    bLog(`=== ターン ${bS.turn} (敵) ===`, 'system');
    bRender();

    let ind = bD.querySelector('.ai-thinking');
    if (ind) ind.classList.add('show');
    await delay(800);
    await runAI();
    if (ind) ind.classList.remove('show');

    if (bS.gameOver) return;

    ctx = makeCtx(bS);
    bS.enemy.field.forEach(f => {
        delete f._tempRush;
        if (f.alive && f.onTurnEnd) try { f.onTurnEnd(ctx, f); } catch(e) {}
    });
    [...bS.amulets.enemy].forEach(a => {
        if (!a.alive) return;
        if (a.onTurnEnd) try { a.onTurnEnd(ctx, a); } catch(e) {}
        if (a.destroyAtTurnEnd) { a.alive = false; bS.amulets.enemy = bS.amulets.enemy.filter(x => x.uid !== a.uid); }
    });
    bRender();
    if (bS.gameOver) return;
    await delay(600);
    startPlayerTurn();
}

// AI メインループ
async function runAI() {
    let ctx = makeCtx(bS);
    let acted = true;
    while (acted && !bS.gameOver) {
        acted = false;
        await delay(350);

        // --- カードプレイ ---
        let playable = bS.enemy.hand
            .map((card, i) => ({ card, i, cost: realCost(card, 'enemy') }))
            .filter(({ cost }) => cost <= bS.enemy.pp)
            .sort((a, b) => aiScore(b.card) - aiScore(a.card));

        if (playable.length) {
            let { card, i } = playable[0];
            await aiPlay(card, i, ctx);
            acted = true; continue;
        }

        // --- 攻撃 ---
        let attackers = bS.enemy.field.filter(f => {
            if (!f.alive || f.exhausted) return false;
            if (f.summonSick) {
                let k = getKeywords(f, ctx);
                return k.includes('storm') || k.includes('rush');
            }
            return true;
        });

        if (attackers.length) {
            acted = true;
            for (let att of attackers) {
                if (bS.gameOver) break;
                await delay(350);
                await aiAttack(att, ctx);
            }
        }
    }
}

function aiScore(card) {
    let s = card.cost * 2;
    if (card.type === 'follower') {
        s += (card.atk || 0) + (card.def || 0);
        if ((card.keywords || []).includes('ward'))  s += 3;
        if ((card.keywords || []).includes('storm')) s += 5;
        if ((card.keywords || []).includes('drain')) s += 2;
    } else if (card.type === 'spell') {
        s += 3;
        if (bS.player.field.length > 0) s += 4;
    }
    // 相手リーダーを即倒せるなら最優先
    let kws = card.keywords || [];
    if (kws.includes('storm') && (card.atk || 0) >= bS.player.leader.hp) s += 20;
    return s;
}

async function aiPlay(card, idx, ctx) {
    bS.enemy.hand.splice(idx, 1);
    let cost = realCost(card, 'enemy');
    bS.enemy.pp -= cost;
    bS.enemy.cardsPlayed = (bS.enemy.cardsPlayed || 0) + 1;
    bLog(`敵が${card.name}を使用！`, 'play');

    if (card.type === 'follower') {
        if (bS.enemy.field.length < MAX_FIELD) {
            let f = makeFollower(card, 'enemy');
            f.summonSick = true;
            bS.enemy.field.push(f);
            triggerOnSummon(f, 'enemy', ctx);
            let kws = getKeywords(f, ctx);
            if (kws.includes('storm') || kws.includes('rush')) f.summonSick = false;
            if (f.onPlay) try { f.onPlay(ctx, f); } catch(e) {}
        }
    } else if (card.type === 'spell') {
        // ターゲット付き
        if (card.targeted && !card.targetFriendly) {
            let targets = bS.player.field.filter(f => f.alive);
            let target = null;
            if (targets.length) {
                let wards = targets.filter(f => hasKw(f, 'ward', ctx));
                target = wards.length ? wards[0] : targets.sort((a,b) => b.atk - a.atk)[0];
            } else if (card.canTargetLeader) {
                target = { type: 'leader', owner: 'player' };
            }
            if (target && card.effect) try { card.effect(ctx, 'enemy', target); } catch(e) {}
        } else if (card.targetFriendly) {
            let targets = bS.enemy.field.filter(f => f.alive);
            if (targets.length && card.effect) try { card.effect(ctx, 'enemy', targets[0]); } catch(e) {}
        } else {
            if (card.effect) try { card.effect(ctx, 'enemy'); } catch(e) {}
        }
        bS.enemy.field.forEach(f => { if (f.alive && f.onAllySpell) try { f.onAllySpell(ctx, f); } catch(e) {} });
        bS.enemy.graveyard.push(card);
    } else if (card.type === 'amulet') {
        bS.amulets.enemy.push(makeAmulet(card, 'enemy'));
    }
    bRender();
    await delay(250);
}

async function aiAttack(att, ctx) {
    if (!att.alive || att.exhausted) return;
    let kws = getKeywords(att, ctx);
    let pField = bS.player.field.filter(f => f.alive);
    let hasWard = pField.some(f => hasKw(f, 'ward', ctx));
    let target;

    if (hasWard) {
        target = pField.find(f => hasKw(f, 'ward', ctx));
    } else if (pField.length && !kws.includes('storm')) {
        // 倒せるものを優先、なければ削れるもの
        let killable = pField.filter(f => att.atk >= f.def);
        target = killable.length
            ? killable.sort((a,b) => b.atk - a.atk)[0]
            : pField.sort((a,b) => a.def - b.def)[0];
    } else {
        target = { type: 'leader', owner: 'player' };
    }

    if (target) await doAttack(att, target, 'enemy', ctx);
}


// ==================================================
// 攻撃実行
// ==================================================
async function doAttack(att, target, attOwner, ctx) {
    if (!att.alive) return;
    let defOwner = attOwner === 'player' ? 'enemy' : 'player';
    let kws = getKeywords(att, ctx);

    // アニメ
    let el = document.querySelector(`[data-uid="${att.uid}"]`);
    if (el) { el.classList.add('attacking'); setTimeout(() => el.classList.remove('attacking'), 300); }
    await delay(220);

    if (att.onAttack) try { att.onAttack(ctx, att, target); } catch(e) {}

    if (target.type === 'leader') {
        ctx.damageLeader(defOwner, att.atk);
        if (kws.includes('drain')) ctx.healLeader(attOwner, att.atk);
    } else {
        // 相互戦闘
        let attAtkVal = att.atk, defAtkVal = target.atk;
        if (kws.includes('bane') && target.def > 0) {
            target.def = 0; schedDeath(target, attOwner);
        } else {
            ctx.damageFollower(target, attAtkVal, attOwner);
        }
        if (target.alive && defAtkVal > 0) {
            if (hasKw(target, 'bane', ctx)) { att.def = 0; schedDeath(att, defOwner); }
            else { ctx.damageFollower(att, defAtkVal, defOwner); }
        }
        if (kws.includes('drain') && attAtkVal > 0) ctx.healLeader(attOwner, attAtkVal);
        // onDamageTaken
        if (att.alive && defAtkVal > 0 && att.onDamageTaken) try { att.onDamageTaken(ctx, att, defAtkVal); } catch(e) {}
        if (target.alive && attAtkVal > 0 && target.onDamageTaken) try { target.onDamageTaken(ctx, target, attAtkVal); } catch(e) {}

        bLog(`${att.name}が${target.name}を攻撃！`, 'damage');
    }

    att.exhausted = true;

    // マルチアタック(アルベール)
    if (att.multiAttack && target.type === 'leader' && att.alive && !bS.gameOver) {
        await delay(300);
        await doAttack(att, { type: 'leader', owner: defOwner }, attOwner, ctx);
        return;
    }
    bRender();
}


// ==================================================
// カードプレイ (プレイヤー)
// ==================================================
async function playerPlayCard(idx) {
    if (bS.currentTurn !== 'player' || bS.gameOver || bS.phase !== 'main') return;
    let card = bS.player.hand[idx];
    if (!card) return;
    let cost = realCost(card, 'player');
    if (cost > bS.player.pp) { bLog('PPが足りない！', 'system'); return; }
    if (card.type === 'follower' && bS.player.field.length >= MAX_FIELD) { bLog('フィールドが満員！', 'system'); return; }

    if (card.targeted) {
        bS.selCard = idx;
        bS.spellCard = card;
        bS.buffTarget = !!card.targetFriendly;
        bS.phase = 'sel_spell_target';
        bRender(); return;
    }
    await execPlay(idx, null);
}

async function execPlay(idx, target) {
    let card = bS.player.hand[idx];
    let cost = realCost(card, 'player');
    bS.player.hand.splice(idx, 1);
    bS.player.pp -= cost;
    bS.player.cardsPlayed = (bS.player.cardsPlayed || 0) + 1;
    bS.phase = 'main'; bS.selCard = null; bS.spellCard = null; bS.buffTarget = false;

    let ctx = makeCtx(bS);
    bLog(`${card.name}をプレイ！`, 'play');

    if (card.type === 'follower') {
        if (bS.player.field.length < MAX_FIELD) {
            let f = makeFollower(card, 'player');
            f.summonSick = true;
            bS.player.field.push(f);
            triggerOnSummon(f, 'player', ctx);
            let kws = getKeywords(f, ctx);
            if (kws.includes('storm') || kws.includes('rush')) f.summonSick = false;
            if (f.onPlay) try { f.onPlay(ctx, f); } catch(e) {}
        }
    } else if (card.type === 'spell') {
        if (card.effect) try { card.effect(ctx, 'player', target); } catch(e) { console.error(e); }
        bS.player.field.forEach(f => { if (f.alive && f.onAllySpell) try { f.onAllySpell(ctx, f); } catch(e) {} });
        bS.player.graveyard.push(card);
        spellFlash();
    } else if (card.type === 'amulet') {
        bS.amulets.player.push(makeAmulet(card, 'player'));
    }
    bRender();
}


// ==================================================
// フォロワー攻撃 (プレイヤー操作)
// ==================================================
function playerSelectAttacker(f) {
    if (bS.currentTurn !== 'player' || bS.gameOver) return;
    if (!f.alive || f.exhausted) return;
    let ctx = makeCtx(bS);
    let kws = getKeywords(f, ctx);
    if (f.summonSick && !kws.includes('storm') && !kws.includes('rush') && !f._tempRush) {
        bLog('召喚酔い中は攻撃できません！', 'system'); return;
    }
    if (bS.selFollower === f) {
        bS.selFollower = null; bS.phase = 'main';
    } else {
        bS.selFollower = f; bS.phase = 'sel_attacker';
    }
    bRender();
}

async function playerSelectTarget(target) {
    if (bS.phase !== 'sel_attacker' || !bS.selFollower) return;
    let att = bS.selFollower;
    let ctx = makeCtx(bS);
    let kws = getKeywords(att, ctx);
    let eField = bS.enemy.field.filter(f => f.alive);
    let hasWard = eField.some(f => hasKw(f, 'ward', ctx));

    if (hasWard && target.type !== 'leader' && !hasKw(target, 'ward', ctx)) {
        bLog('ガード持ちを先に攻撃してください！', 'system'); return;
    }
    if (hasWard && target.type === 'leader') {
        bLog('ガード持ちを先に攻撃してください！', 'system'); return;
    }
    if (target.type === 'leader' && !kws.includes('storm') && kws.includes('rush')) {
        bLog('疾走はフォロワーにしか攻撃できません！', 'system'); return;
    }

    bS.selFollower = null; bS.phase = 'main';
    await doAttack(att, target, 'player', ctx);
    bRender();
}

async function playerSelectSpellTarget(target) {
    if (bS.phase !== 'sel_spell_target') return;
    let idx = bS.selCard;
    let card = bS.player.hand[idx];
    if (!card) return;

    if (bS.buffTarget) {
        if (target.owner !== 'player') { bLog('味方フォロワーを選んでください！', 'system'); return; }
    } else {
        if (target.owner === 'player') { bLog('敵フォロワーまたはリーダーを選んでください！', 'system'); return; }
        if (target.type === 'leader' && !card.canTargetLeader) { bLog('リーダーは対象外！', 'system'); return; }
    }
    await execPlay(idx, target);
}

function cancelSel() {
    if (bS.phase === 'main') return;
    bS.phase = 'main'; bS.selCard = null; bS.selFollower = null; bS.spellCard = null; bS.buffTarget = false;
    bRender();
}


// ==================================================
// エフェクト
// ==================================================
function showDmgPop(uid, amount, isHeal) {
    let el = uid.startsWith('leader-')
        ? document.querySelector(`[data-leader="${uid.replace('leader-','')}"]`)
        : document.querySelector(`[data-uid="${uid}"]`);
    if (!el) return;
    let rect = el.getBoundingClientRect();
    let pop = document.createElement('div');
    pop.className = `damage-popup${isHeal ? ' heal' : ''}`;
    pop.textContent = isHeal ? `+${amount}` : `-${amount}`;
    pop.style.left = `${rect.left + rect.width/2 - 15}px`;
    pop.style.top  = `${rect.top + rect.height/2 - 15}px`;
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 800);
}
function showBanner(text) {
    let old = bD.querySelector('.turn-banner');
    if (old) old.remove();
    let b = document.createElement('div');
    b.className = 'turn-banner'; b.textContent = text;
    bD.appendChild(b);
    setTimeout(() => b.remove(), 1500);
}
function spellFlash() {
    let f = document.createElement('div');
    f.className = 'spell-flash'; bD.appendChild(f);
    setTimeout(() => f.remove(), 500);
}


// ==================================================
// 結果表示
// ==================================================
function showResult(result) {
    let r = document.getElementById('bResult');
    if (!r) return;
    r.querySelector('.result-text').textContent = result === 'win' ? '🎉 勝利！' : '💀 敗北...';
    r.querySelector('.result-text').className   = `result-text ${result}`;
    r.querySelector('.result-sub').textContent  = result === 'win' ? '敵リーダーを撃破した！' : 'リーダーが倒れた...';
    r.classList.add('show');
}


// ==================================================
// レンダリング
// ==================================================
function bRender() {
    if (!bD || !bS) return;
    let ctx = makeCtx(bS);

    // ---- リーダー ----
    for (let who of ['player', 'enemy']) {
        let icon  = bD.querySelector(`[data-leader-icon="${who}"]`);
        let hpEl  = bD.querySelector(`[data-leader-hp="${who}"]`);
        let deckEl = bD.querySelector(`[data-leader-deck="${who}"]`);
        if (hpEl)   hpEl.textContent  = `❤️ ${bS[who].leader.hp}`;
        if (deckEl) deckEl.textContent = `📚 ${bS[who].deck.length}`;
        if (icon)   icon.dataset.leader = who;

        // ターゲット可ハイライト
        let targetable = false;
        if (who === 'enemy') {
            if (bS.phase === 'sel_attacker' && bS.selFollower) {
                let kws = getKeywords(bS.selFollower, ctx);
                let eField = bS.enemy.field.filter(f => f.alive);
                let hasWard = eField.some(f => hasKw(f, 'ward', ctx));
                let rushOnly = kws.includes('rush') && !kws.includes('storm');
                targetable = !hasWard && !rushOnly;
            } else if (bS.phase === 'sel_spell_target' && !bS.buffTarget) {
                let card = bS.player.hand[bS.selCard];
                targetable = card && card.canTargetLeader;
            }
        }
        if (icon) icon.classList.toggle('targetable', targetable);
    }

    // ---- PP ----
    let ppGems = bD.querySelector('.pp-gems');
    if (ppGems) {
        ppGems.innerHTML = '';
        let { pp, ppMax } = bS.player;
        for (let i = 0; i < ppMax; i++) {
            let g = document.createElement('div');
            g.className = `pp-gem${i < pp ? ' active' : ''}`;
            ppGems.appendChild(g);
        }
    }
    let ppLabel = bD.querySelector('.pp-label');
    if (ppLabel) ppLabel.textContent = `${bS.player.pp}/${bS.player.ppMax} PP`;

    // ---- ターン情報 ----
    let turnNum = bD.querySelector('.turn-num');
    let turnPl  = bD.querySelector('.turn-player');
    if (turnNum) turnNum.textContent = `ターン ${bS.turn}`;
    if (turnPl)  turnPl.textContent  = bS.currentTurn === 'player' ? 'あなたのターン' : '敵のターン';

    // ---- エンドボタン ----
    let endBtn = bD.querySelector('.end-turn-btn');
    if (endBtn) endBtn.classList.toggle('disabled', bS.currentTurn !== 'player' || bS.gameOver);

    // ---- ターゲットガイド ----
    let guide = bD.querySelector('.target-guide');
    if (guide) {
        if (bS.phase === 'sel_attacker') {
            guide.textContent = '攻撃対象を選んでください（敵フォロワーまたはリーダー）';
            guide.classList.add('show');
        } else if (bS.phase === 'sel_spell_target') {
            guide.textContent = bS.buffTarget
                ? '味方フォロワーを選んでください'
                : '効果対象を選んでください（フォロワーまたはリーダー）';
            guide.classList.add('show');
        } else {
            guide.classList.remove('show');
        }
    }

    // ---- フィールド ----
    for (let who of ['player', 'enemy']) renderField(who, ctx);

    // ---- 手札 ----
    renderEnemyHand();
    renderPlayerHand(ctx);

    // ---- アミュレット ----
    for (let who of ['player', 'enemy']) renderAmulets(who);

    // ---- ログ ----
    renderLog();
}

function renderField(who, ctx) {
    let fieldEl = bD.querySelector(`.field-area.${who}-field`);
    if (!fieldEl) return;
    fieldEl.innerHTML = '';

    bS[who].field.forEach(f => {
        if (!f.alive) return;
        let kws = getKeywords(f, ctx);
        let isPlayer = (who === 'player');
        let myTurn   = (bS.currentTurn === 'player');

        let canAttack = isPlayer && myTurn && !f.exhausted &&
            (!f.summonSick || kws.includes('storm') || kws.includes('rush') || f._tempRush);

        // ターゲット可
        let targetable = false;
        if (!isPlayer && bS.phase === 'sel_attacker' && bS.selFollower) {
            let eField = bS.enemy.field.filter(x => x.alive);
            let hasWard = eField.some(x => hasKw(x, 'ward', ctx));
            targetable = hasWard ? hasKw(f, 'ward', ctx) : !hasKw(f, 'ambush', ctx);
        }
        if (!isPlayer && bS.phase === 'sel_spell_target' && !bS.buffTarget) targetable = true;
        if (isPlayer  && bS.phase === 'sel_spell_target' &&  bS.buffTarget) targetable = true;

        let isSelected = bS.selFollower === f;
        let isAmbush   = hasKw(f, 'ambush', ctx) && !isPlayer;

        let el = document.createElement('div');
        el.className = [
            'follower-card',
            (canAttack && !isSelected) ? 'can-attack' : '',
            isSelected ? 'selected' : '',
            targetable ? 'targetable' : '',
            f.exhausted ? 'exhausted' : '',
            f.frozen ? 'frozen' : '',
            (f.summonSick && !kws.includes('storm') && !kws.includes('rush')) ? 'sleeping' : '',
            hasKw(f, 'ward', ctx) ? 'ward-glow' : '',
        ].filter(Boolean).join(' ');
        el.dataset.uid = f.uid;

        if (isAmbush) {
            el.innerHTML = `<div class="card-name-field">???</div><div class="card-art">🌫️</div><div class="card-stats"><span class="stat-atk">?</span><span class="stat-def">?</span></div>`;
        } else {
            let badges = kws.slice(0,3).map(k => `<span class="kw-badge ${k}">${(KW_NAMES[k]||k).slice(0,2)}</span>`).join('');
            el.innerHTML = `
                <div class="card-name-field">${f.name}</div>
                <div class="card-art">${getArt(f)}</div>
                <div class="card-stats"><span class="stat-atk">${f.atk}</span><span class="stat-def">${f.def}</span></div>
                <div class="keyword-badges">${badges}</div>`;
        }

        el.addEventListener('click', e => { e.stopPropagation(); handleFollowerClick(f, who, ctx); });
        new fuyoNagaOSU(el, () => showCardDetail(f), 600);
        fieldEl.appendChild(el);
    });
}

function handleFollowerClick(f, who, ctx) {
    if (bS.gameOver) return;
    let isPlayer = (who === 'player');
    if (bS.phase === 'sel_attacker') {
        if (!isPlayer) playerSelectTarget(f);
        else playerSelectAttacker(f);
    } else if (bS.phase === 'sel_spell_target') {
        if (bS.buffTarget && isPlayer)   playerSelectSpellTarget(f);
        else if (!bS.buffTarget && !isPlayer) playerSelectSpellTarget(f);
        else cancelSel();
    } else if (bS.phase === 'main' && isPlayer) {
        playerSelectAttacker(f);
    }
}

function renderEnemyHand() {
    let el = bD.querySelector('.enemy-hand');
    if (!el) return;
    el.innerHTML = bS.enemy.hand.map(() =>
        `<div class="hand-card"><div class="card-art" style="font-size:28px;margin-top:16px;">🂠</div></div>`
    ).join('');
}

function renderPlayerHand(ctx) {
    let el = bD.querySelector('.player-hand');
    if (!el) return;
    el.innerHTML = '';
    bS.player.hand.forEach((card, idx) => {
        let cost = realCost(card, 'player');
        let affordable = cost <= bS.player.pp;
        let isSelected = bS.selCard === idx;

        let d = document.createElement('div');
        d.className = ['hand-card', `type-${card.type}`,
            affordable ? '' : 'unplayable', isSelected ? 'selected-hand' : ''].filter(Boolean).join(' ');
        d.innerHTML = `
            <div class="cost-badge ${affordable?'affordable':''}">${cost}</div>
            <div class="hand-art">${getArt(card)}</div>
            <div class="hand-name">${card.name}</div>
            ${card.type==='follower' ? `<div class="hand-stats"><span class="hand-atk">${card.atk}</span><span class="hand-def">${card.def}</span></div>` : ''}`;

        d.addEventListener('click', e => {
            e.stopPropagation();
            if (bS.currentTurn !== 'player' || bS.gameOver) return;
            if (isSelected) { cancelSel(); return; }
            if (affordable && bS.phase === 'main') playerPlayCard(idx);
        });
        new fuyoNagaOSU(d, () => showCardDetail(card), 600);
        el.appendChild(d);
    });
}

function renderAmulets(who) {
    let fieldEl = bD.querySelector(`.field-area.${who}-field`);
    if (!fieldEl) return;
    fieldEl.querySelectorAll('.amulet-card').forEach(e => e.remove());
    bS.amulets[who].forEach(a => {
        if (!a.alive) return;
        let el = document.createElement('div');
        el.className = 'amulet-card';
        el.innerHTML = `<div class="amulet-art">🌀</div><div class="amulet-name">${a.name}</div>`;
        new fuyoNagaOSU(el, () => showCardDetail(a), 600);
        fieldEl.appendChild(el);
    });
}

function showCardDetail(card) {
    let d = document.getElementById('bCardDetail');
    if (!d) return;
    let kws = card.keywords || [];
    let kwHtml = kws.map(k => `<span class="detail-kw kw-badge ${k}">${KW_NAMES[k]||k}</span>`).join('');
    d.innerHTML = `
        <div class="detail-name">${card.name}</div>
        <div class="detail-cost">コスト: ${card.cost}</div>
        ${card.type==='follower'?`<div class="detail-stats"><span class="detail-atk">⚔️${card.atk}</span><span class="detail-def">❤️${card.def}</span></div>`:''}
        <div class="detail-keywords">${kwHtml}</div>
        <div class="detail-desc">${card.desc||''}</div>
        <div class="detail-flavor">"${card.flavor||''}"</div>
        <div class="detail-close" id="bDetailClose">閉じる ✕</div>`;
    d.classList.add('show');
    document.getElementById('bDetailClose').onclick = () => d.classList.remove('show');
}


// ==================================================
// バトルUI構築
// ==================================================
function buildBattleUI() {
    bD = document.getElementById('battle');
    if (!bD) return;
    bD.innerHTML = `
        <!-- 結果 -->
        <div id="bResult">
            <div class="result-text win"></div>
            <div class="result-sub"></div>
            <div class="result-btn" id="bRetryBtn">もう一度</div>
        </div>
        <!-- デッキ選択 -->
        <div id="bDeckSelect">
            <div class="ds-title">⚔️ デッキを選択</div>
            <div class="ds-subtitle">長押しでデッキ詳細</div>
            <div id="bDeckList"></div>
        </div>
        <!-- AI思考 -->
        <div class="ai-thinking">敵が考えています...</div>
        <!-- ログ -->
        <div id="bLog"></div>
        <!-- カード詳細 -->
        <div id="bCardDetail"></div>
        <!-- ターゲットガイド -->
        <div class="target-guide"></div>

        <!-- 敵エリア (上) -->
        <div class="enemy-area">
            <div class="leader-row">
                <div class="leader-icon" data-leader-icon="enemy">👿</div>
                <div class="leader-hp" data-leader-hp="enemy">❤️ 20</div>
                <div class="leader-name" data-leader-name="enemy">敵リーダー</div>
                <div class="leader-deck-count" data-leader-deck="enemy">📚 20</div>
            </div>
            <div class="hand-area enemy-hand"></div>
            <div class="field-area enemy-field"></div>
        </div>

        <!-- 中央バー -->
        <div class="mid-bar">
            <div class="pp-display">
                <div class="pp-label">PP</div>
                <div class="pp-gems"></div>
            </div>
            <div class="turn-info">
                <div class="turn-num">ターン 1</div>
                <div class="turn-player">あなたのターン</div>
            </div>
            <div class="end-turn-btn" id="bEndTurnBtn">ターン終了</div>
        </div>

        <!-- プレイヤーエリア (下) -->
        <div class="player-area">
            <div class="field-area player-field"></div>
            <div class="hand-area player-hand"></div>
            <div class="leader-row">
                <div class="leader-icon" data-leader-icon="player">😊</div>
                <div class="leader-hp" data-leader-hp="player">❤️ 20</div>
                <div class="leader-name" data-leader-name="player">あなた</div>
                <div class="leader-deck-count" data-leader-deck="player">📚 20</div>
            </div>
        </div>`;

    // イベント
    document.getElementById('bEndTurnBtn').addEventListener('click', () => {
        if (bS && bS.currentTurn === 'player' && !bS.gameOver) endPlayerTurn();
    });
    document.getElementById('bRetryBtn').addEventListener('click', () => {
        document.getElementById('bResult').classList.remove('show');
        bF.showDeckSelect();
    });
    bD.querySelector('[data-leader-icon="enemy"]').addEventListener('click', () => {
        if (bS.phase === 'sel_attacker')      playerSelectTarget({ type:'leader', owner:'enemy' });
        else if (bS.phase === 'sel_spell_target' && !bS.buffTarget) playerSelectSpellTarget({ type:'leader', owner:'enemy' });
    });
    bD.addEventListener('click', e => { if (e.target === bD) cancelSel(); });
}

// デッキ選択
bF.showDeckSelect = function() {
    let d = document.getElementById('bDeckSelect');
    if (!d) { buildBattleUI(); d = document.getElementById('bDeckSelect'); }
    d.classList.add('show');
    let list = document.getElementById('bDeckList');
    list.innerHTML = '';
    SampleDecks.forEach((deck, idx) => {
        let item = document.createElement('div');
        item.className = 'deck-item';
        item.innerHTML = `
            <div class="di-name">${deck.name}</div>
            <div class="di-craft craft-${deck.craft}">${getCraftName(deck.craft)}</div>
            <div class="di-leader">リーダー: ${deck.leader.name}</div>
            <div class="di-desc">${deck.desc}</div>`;
        item.addEventListener('click', () => { d.classList.remove('show'); startBattle(idx); });
        list.appendChild(item);
    });
};

function startBattle(playerDeckIdx) {
    let enemyIdx;
    do { enemyIdx = Math.floor(Math.random() * SampleDecks.length); }
    while (enemyIdx === playerDeckIdx && SampleDecks.length > 1);

    let pDeck = SampleDecks[playerDeckIdx];
    let eDeck = SampleDecks[enemyIdx];

    bS = initState(pDeck, eDeck);

    // リーダー情報更新
    let enameEl = bD.querySelector('[data-leader-name="enemy"]');
    if (enameEl) enameEl.textContent = eDeck.leader.name;
    let pnameEl = bD.querySelector('[data-leader-name="player"]');
    if (pnameEl) pnameEl.textContent = pDeck.leader.name;

    // 初期ドロー: プレイヤー3枚, 敵4枚
    let ctx = makeCtx(bS);
    for (let i = 0; i < 3; i++) ctx.drawCard('player');
    for (let i = 0; i < 4; i++) ctx.drawCard('enemy');

    bLog(`あなた: ${pDeck.name}  vs  敵: ${eDeck.name}`, 'system');
    bRender();
    startPlayerTurn();
}
