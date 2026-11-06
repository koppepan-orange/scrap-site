// =============================================
// シャドウバース風 戦闘システム本体
// =============================================

// ---- グローバル変数 ----
let battleD = null;
let battleState = null; // ゲーム状態
let battleAnim = false; // アニメ中フラグ

// ---- カードの絵文字マッピング ----
const CardArt = {
  // クラフト別デフォルト
  royal:   '⚔️',
  witch:   '🔮',
  dragon:  '🐉',
  necro:   '💀',
  bishop:  '✨',
  elf:     '🌿',
  vampire: '🦇',
  nemesis: '⚙️',
  neutral: '🃏',

  // 個別カード
  'n001': '👺',  // ゴブリン
  'n002': '🐾',  // コボルト
  'n003': '🗿',  // マウンテンジャイアント
  'n004': '🧟',  // ゾンビ
  'n005': '🗿',  // ストーンゴーレム
  'n006': '🟢',  // スライム
  'n007': '🐕',  // ケルベロス
  'n008': '🦅',  // フェニックス
  'n009': '🦎',  // バシリスク
  'n010': '🐲',  // ドラゴンライダー
  'n011': '👼',  // ヒーリングエンジェル
  'n012': '👻',  // ゴーストライダー
  'n013': '🔥',  // ファイアーエレメンタル
  'n014': '❄️',  // アイスエレメンタル
  'n015': '🛡️', // ダークナイト
  'n016': '🛡️', // 聖なる盾の騎士
  'n017': '⚡',  // サンダーバード
  'n018': '🧙',  // ミニゴブリンメイジ
  'n019': '🌋',  // ヴォルカニックドラゴン
  'n020': '🩸',  // ライフドレイン
  'r001': '👑',  // オーレリア
  'r002': '🗡️', // アルベール
  'r003': '🛡️', // 近衛騎士
  'r004': '⚔️',  // 剣士
  'r005': '🌟',  // ホワイトパラディン
  'r006': '🏹',  // ランサー
  'r007': '🏹',  // 戦列弓兵
  'r008': '📯',  // 王国の号令 (spell)
  'r009': '🚩',  // ロイヤルフラッグ (amulet)
  'r010': '🦅',  // ホーリーファルコン
  'w001': '🧊',  // アリサ
  'w002': '⭐',  // スターリット
  'w003': '🔥',  // ファイアーボール
  'w004': '❄️',  // ブリザード
  'w005': '💀',  // サモン・スケルトン
  'w006': '📖',  // ルーンブレード
  'w007': '🔮',  // スペルブースト
  'w008': '⚡',  // 雷撃の魔法
  'w009': '🌀',  // マナサークル
  'w010': '🧊',  // フロストスパイク
  'd001': '🐉',  // ジェネシスドラゴン
  'd002': '🧿',  // シャーマン
  'd003': '🔥',  // ドラゴンブレス
  'd004': '🐲',  // ランページドラゴン
  'd005': '🌍',  // ガイアドラゴン
  'd006': '🐍',  // ファフニール
  'd007': '🗡️', // ドラゴナイト
  'd008': '🌊',  // ウォータードラゴン
  'nc001':'😇',  // サハクィエル
  'nc002':'⚰️',  // ゾンビパーティー
  'nc003':'💀',  // スケルトンウォリアー
  'nc004':'🧟',  // ネクロマンサー
  'nc005':'👹',  // バンシー
  'nc006':'💜',  // ソウルコンバージョン
  'nc007':'👑',  // リッチ
  'nc008':'⚰️',  // デスサイズ
  'b001': '😇',  // イスラーフィール
  'b002': '✨',  // ホーリーライト
  'b003': '😊',  // プリースト
  'b004': '🌟',  // ロイヤルセラフ
  'b005': '🕊️', // 天使の祝福
  'b006': '🌈',  // セラフ
  'b007': '💊',  // キュア・オール
  'b008': '🌞',  // バニッシュ
  'e001': '🧚',  // アリア
  'e002': '🐺',  // フォレストウルフ
  'e003': '🌳',  // ナテラの大樹
  'e004': '💨',  // ウィンドブレード
  'e005': '🍃',  // 一陣の風
  'e006': '🦅',  // マーキュリーイーグル
  'e007': '🧚',  // フェアリーサークル
  'e008': '🌲',  // スプリングウッド
  'v001': '🎯',  // ヴァーミン
  'v002': '🐺',  // ブラッドウルフ
  'v003': '🧛',  // セクシーヴァンプ
  'v004': '🩸',  // ブラッドバス
  'v005': '😈',  // ルシファー
  'v006': '🦇',  // ヴァンパイアブリード
  'v007': '💀',  // ダークソウル
  'nm001':'🤖',  // アーティファクト・コーリング
  'nm002':'🔫',  // メカニカルガンナー
  'nm003':'⚙️',  // ギアゴーレム
  'nm004':'💥',  // オーバーヒート
  'nm005':'🤖',  // プロジェクト・プロテウス
};

function getCardArt(card) {
  return CardArt[card.id] || CardArt[card.craft] || '🃏';
}

// キーワード表示名
const KeywordNames = {
  ward:          'ガード',
  storm:         '突進',
  rush:          '疾走',
  drain:         '吸血',
  bane:          '必殺',
  ambush:        '潜伏',
  cannot_attack: '攻撃不可',
};

// =============================================
// ゲームコンテキスト (ctx) - カード効果から呼び出す関数群
// =============================================
function createBattleContext(state) {
  return {
    // --- 情報取得 ---
    getEnemy(owner) {
      return owner === 'player' ? 'enemy' : 'player';
    },
    getField(who) {
      return state[who].field;
    },
    getHand(who) {
      return state[who].hand;
    },
    getGraveyard(who) {
      return state[who].graveyard;
    },
    getLeaderHP(who) {
      return state[who].leader.hp;
    },
    getMaxPP(who) {
      return state[who].ppMax;
    },
    getCardsPlayedThisTurn(who) {
      return state[who].cardsPlayedThisTurn || 0;
    },
    countFriendlyByName(who, name) {
      return state[who].field.filter(f => f.name === name).length;
    },
    hasCraftFollower(who, craft) {
      return state[who].field.some(f => f.craft === craft);
    },
    getLeaderDamageTaken(who) {
      return state[who].damageTakenThisGame || 0;
    },

    // --- カードドロー ---
    drawCard(who) {
      if (state[who].deck.length === 0) {
        // 疲弊ダメージ
        const dmg = state[who].fatigueDamage || 1;
        state[who].leader.hp -= dmg;
        state[who].fatigueDamage = dmg + 1;
        battleLog(`${who === 'player' ? 'あなた' : '敵'}はデッキ切れで${dmg}ダメージ！`, 'damage');
        checkGameEnd();
        renderBattle();
        return;
      }
      const card = state[who].deck.shift();
      if (state[who].hand.length < 9) {
        state[who].hand.push(card);
      } else {
        state[who].graveyard.push(card);
        battleLog(`${who === 'player' ? 'あなた' : '敵'}の手札が溢れた！`, 'system');
      }
      if (who === 'player') {
        battleLog(`カードを引いた：${card.name}`, 'draw');
      }
      renderBattle();
    },
    drawSpellCards(who, count) {
      let drawn = 0;
      let tries = 0;
      const maxTry = state[who].deck.length;
      while (drawn < count && tries < maxTry) {
        tries++;
        const idx = state[who].deck.findIndex(c => c.type === 'spell');
        if (idx === -1) break;
        const [card] = state[who].deck.splice(idx, 1);
        if (state[who].hand.length < 9) {
          state[who].hand.push(card);
          drawn++;
          if (who === 'player') battleLog(`スペルを引いた：${card.name}`, 'draw');
        }
      }
      renderBattle();
    },
    drawCardByCost(who, cost) {
      const idx = state[who].deck.findIndex(c => c.cost === cost);
      if (idx === -1) return;
      const [card] = state[who].deck.splice(idx, 1);
      if (state[who].hand.length < 9) {
        state[who].hand.push(card);
        if (who === 'player') battleLog(`コスト${cost}のカードを引いた：${card.name}`, 'draw');
      }
      renderBattle();
    },
    drawCardByName(who, name) {
      const idx = state[who].deck.findIndex(c => c.name === name);
      if (idx === -1) return;
      const [card] = state[who].deck.splice(idx, 1);
      if (state[who].hand.length < 9) {
        state[who].hand.push(card);
        if (who === 'player') battleLog(`${name}を引いた！`, 'draw');
      }
      renderBattle();
    },

    // --- ダメージ ---
    dealDamage(target, amount, attackerOwner) {
      if (!target || !target.alive) return;
      if (target.type === 'leader') {
        this.damageLeader(target.owner, amount);
      } else {
        this.damageFollower(target, amount, attackerOwner);
      }
    },
    damageFollower(follower, amount, attackerOwner) {
      if (!follower || !follower.alive) return;
      follower.def -= amount;
      showDamagePopup(follower.uid, amount, false);
      battleLog(`${follower.name}に${amount}ダメージ`, 'damage');
      if (follower.def <= 0) {
        scheduleFollowerDeath(follower, attackerOwner);
      }
      renderBattle();
    },
    damageLeader(who, amount) {
      state[who].leader.hp = Math.max(0, state[who].leader.hp - amount);
      state[who].damageTakenThisGame = (state[who].damageTakenThisGame || 0) + amount;
      showDamagePopup(`leader-${who}`, amount, false);
      battleLog(`${who === 'player' ? 'あなた' : '敵'}リーダーに${amount}ダメージ！`, 'damage');
      checkGameEnd();
      renderBattle();
    },
    damageRandomEnemy(who, amount) {
      const enemies = state[this.getEnemy(who)].field.filter(f => f.alive);
      if (enemies.length === 0) return;
      const target = enemies[Math.floor(Math.random() * enemies.length)];
      this.damageFollower(target, amount, who);
    },
    damageAllEnemies(who, amount) {
      const enemy = this.getEnemy(who);
      const enemies = [...state[enemy].field.filter(f => f.alive)];
      enemies.forEach(f => this.damageFollower(f, amount, who));
    },

    // --- 回復 ---
    healLeader(who, amount) {
      const max = state[who].leader.maxHp;
      const old = state[who].leader.hp;
      state[who].leader.hp = Math.min(max, old + amount);
      const actual = state[who].leader.hp - old;
      if (actual > 0) {
        showDamagePopup(`leader-${who}`, actual, true);
        battleLog(`${who === 'player' ? 'あなた' : '敵'}リーダーを${actual}回復`, 'heal');
        // onHeal トリガー
        state[who].field.forEach(f => {
          if (f.alive && f.onHeal) f.onHeal(this, f);
        });
      }
      renderBattle();
    },
    healFollower(follower, amount) {
      if (!follower || !follower.alive) return;
      follower.def = Math.min(follower.maxDef, follower.def + amount);
      renderBattle();
    },
    healAllFriendly(who, amount) {
      state[who].field.filter(f => f.alive).forEach(f => this.healFollower(f, amount));
    },

    // --- バフ ---
    buffFollower(follower, atkAdd, defAdd) {
      if (!follower || !follower.alive) return;
      follower.atk = Math.max(0, follower.atk + atkAdd);
      follower.def += defAdd;
      follower.maxDef += defAdd;
      renderBattle();
    },
    buffAllFriendly(who, atkAdd, defAdd) {
      state[who].field.filter(f => f.alive).forEach(f => this.buffFollower(f, atkAdd, defAdd));
    },
    addKeyword(follower, kw) {
      if (!follower || !follower.alive) return;
      if (!follower.keywords.includes(kw)) follower.keywords.push(kw);
      renderBattle();
    },
    grantAllFriendlyRush(who) {
      state[who].field.filter(f => f.alive && !f.hasSummonSick).forEach(f => {
        if (!f.keywords.includes('rush')) {
          f._tempRush = true;
        }
      });
      renderBattle();
    },

    // --- フリーズ ---
    freezeFollower(follower) {
      if (!follower || !follower.alive) return;
      follower.frozen = true;
      follower.frozenAtk = follower.atk;
      follower.atk = 0;
      battleLog(`${follower.name}が凍結した！`, 'system');
      renderBattle();
    },
    freezeRandomEnemy(who) {
      const enemy = this.getEnemy(who);
      const enemies = state[enemy].field.filter(f => f.alive && !f.frozen);
      if (enemies.length === 0) return;
      const target = enemies[Math.floor(Math.random() * enemies.length)];
      this.freezeFollower(target);
    },

    // --- 破壊・消滅 ---
    destroyFollower(follower) {
      if (!follower || !follower.alive) return;
      follower.def = 0;
      scheduleFollowerDeath(follower, null);
    },
    banishFollower(follower) {
      if (!follower || !follower.alive) return;
      follower.alive = false;
      follower.banished = true;
      const who = getFollowerOwner(follower);
      state[who].field = state[who].field.filter(f => f.uid !== follower.uid);
      battleLog(`${follower.name}が消滅した！`, 'death');
      renderBattle();
    },

    // --- 召喚 ---
    summonToken(who, tokenData) {
      if (state[who].field.length >= 5) return;
      const token = makeFollowerInstance(tokenData, who);
      token.hasSummonSick = true;
      state[who].field.push(token);
      triggerOnSummon(token, who, this);
      battleLog(`${token.name}が召喚された！`, 'play');
      renderBattle();
    },

    // --- PP ---
    increasePPMax(who, amount) {
      state[who].ppMax = Math.min(10, state[who].ppMax + amount);
      state[who].pp = Math.min(state[who].ppMax, state[who].pp + amount);
      renderBattle();
    },
    gainPPThisTurn(who, amount) {
      state[who].pp = Math.min(state[who].ppMax + amount, state[who].pp + amount);
      state[who]._tempPP = (state[who]._tempPP || 0) + amount;
      renderBattle();
    },
    reduceCostThisTurn(who, amount) {
      state[who]._costReduction = (state[who]._costReduction || 0) + amount;
      renderBattle();
    },

    // --- リアニメイト ---
    reanimateBestFollower(who, maxCost) {
      const grave = state[who].graveyard.filter(c => c.type === 'follower' && c.cost <= maxCost);
      if (grave.length === 0) return;
      const best = grave.sort((a, b) => b.cost - a.cost)[0];
      this.summonToken(who, best);
    },
  };
}

// =============================================
// フォロワーインスタンス生成
// =============================================
let _uidCounter = 0;
function makeFollowerInstance(cardData, owner) {
  const data = CardDB.find(c => c.id === cardData.id) || cardData;
  return {
    uid: `follower_${++_uidCounter}`,
    id: data.id,
    name: data.name,
    craft: data.craft,
    type: data.type,
    cost: data.cost,
    atk: data.atk || 0,
    def: data.def || 0,
    maxDef: data.maxDef || data.def || 0,
    keywords: [...(data.keywords || [])],
    desc: data.desc || '',
    flavor: data.flavor || '',
    alive: true,
    hasSummonSick: true,
    exhausted: false,
    frozen: false,
    owner: owner,
    // 効果関数 (データから引き継ぐ)
    onPlay: data.onPlay,
    onDeath: data.onDeath,
    onDamageTaken: data.onDamageTaken,
    onAttack: data.onAttack,
    onAllySummon: data.onAllySummon,
    onAllySpell: data.onAllySpell,
    onAllyDeath: data.onAllyDeath,
    onHeal: data.onHeal,
    onTurnStart: data.onTurnStart,
    onTurnEnd: data.onTurnEnd,
    getKeywords: data.getKeywords,
    multiAttack: data.multiAttack || false,
    reduceSpellCost: data.reduceSpellCost || 0,
    destroyAtTurnEnd: data.destroyAtTurnEnd || false,
  };
}

// アミュレットインスタンス生成
function makeAmuletInstance(cardData, owner) {
  const data = CardDB.find(c => c.id === cardData.id) || cardData;
  return {
    uid: `amulet_${++_uidCounter}`,
    id: data.id,
    name: data.name,
    craft: data.craft,
    type: 'amulet',
    cost: data.cost,
    desc: data.desc || '',
    alive: true,
    owner: owner,
    onAllySummon: data.onAllySummon,
    onTurnStart: data.onTurnStart,
    onTurnEnd: data.onTurnEnd,
    reduceSpellCost: data.reduceSpellCost || 0,
    destroyAtTurnEnd: data.destroyAtTurnEnd || false,
  };
}

// =============================================
// ゲーム状態初期化
// =============================================
function initBattleState(playerDeckDef, enemyDeckDef) {
  _uidCounter = 0;
  
  function buildDeck(deckDef) {
    return arrayShuffle(
      deckDef.cards
        .map(id => CardDB.find(c => c.id === id))
        .filter(Boolean)
    );
  }

  const state = {
    turn: 1,
    currentTurn: 'player', // 先攻はプレイヤー
    phase: 'main', // main | target_follower | target_spell | end
    selectedCardIndex: null,  // 選択中の手札インデックス
    selectedFollower: null,   // 攻撃するフォロワー
    targetingSpell: null,     // 対象選択中のスペルカード
    targetingForBuff: false,  // バフ対象選択中
    amulets: { player: [], enemy: [] },
    player: {
      leader: { ...playerDeckDef.leader, maxHp: playerDeckDef.leader.hp },
      deck: buildDeck(playerDeckDef),
      hand: [],
      field: [],
      graveyard: [],
      pp: 1,
      ppMax: 1,
      cardsPlayedThisTurn: 0,
      damageTakenThisGame: 0,
      fatigueDamage: 1,
      _costReduction: 0,
      _tempPP: 0,
    },
    enemy: {
      leader: { ...enemyDeckDef.leader, maxHp: enemyDeckDef.leader.hp },
      deck: buildDeck(enemyDeckDef),
      hand: [],
      field: [],
      graveyard: [],
      pp: 0, // 後攻は先に手札+1
      ppMax: 0,
      cardsPlayedThisTurn: 0,
      damageTakenThisGame: 0,
      fatigueDamage: 1,
      _costReduction: 0,
      _tempPP: 0,
    },
    gameOver: false,
    winner: null,
    logs: [],
  };

  // 初期手札: プレイヤー3枚、敵4枚(後攻+1)
  const ctx = createBattleContext(state);
  for (let i = 0; i < 3; i++) ctx.drawCard('player');
  for (let i = 0; i < 4; i++) ctx.drawCard('enemy');

  return state;
}

// =============================================
// フォロワーの所有者を取得
// =============================================
function getFollowerOwner(follower) {
  return follower.owner;
}

// =============================================
// キーワード取得 (動的)
// =============================================
function getFollowerKeywords(follower, ctx) {
  if (follower.getKeywords) {
    return follower.getKeywords(ctx, follower);
  }
  const keys = [...follower.keywords];
  if (follower._tempRush) keys.push('rush');
  return keys;
}

function hasKeyword(follower, kw, ctx) {
  return getFollowerKeywords(follower, ctx).includes(kw);
}

// =============================================
// 召喚時トリガー
// =============================================
function triggerOnSummon(summoned, who, ctx) {
  // アミュレットのonAllySummon
  battleState.amulets[who].forEach(a => {
    if (a.alive && a.onAllySummon) a.onAllySummon(ctx, a, summoned);
  });
  // ロイヤルフラッグ等 フォロワーのonAllySummon
  battleState[who].field.forEach(f => {
    if (f.alive && f !== summoned && f.onAllySummon) {
      f.onAllySummon(ctx, f, summoned);
    }
  });
}

// =============================================
// フォロワー死亡処理
// =============================================
const _pendingDeaths = new Set();

function scheduleFollowerDeath(follower, attackerOwner) {
  if (_pendingDeaths.has(follower.uid)) return;
  _pendingDeaths.add(follower.uid);
  setTimeout(() => processFollowerDeath(follower, attackerOwner), 50);
}

function processFollowerDeath(follower, attackerOwner) {
  if (!follower.alive) return;
  follower.alive = false;
  _pendingDeaths.delete(follower.uid);

  const who = follower.owner;
  const ctx = createBattleContext(battleState);

  // 死亡エフェクト
  const el = document.querySelector(`[data-uid="${follower.uid}"]`);
  if (el) {
    el.classList.add('dying');
    setTimeout(() => el.remove(), 400);
  }

  // フィールドから除去
  battleState[who].field = battleState[who].field.filter(f => f.uid !== follower.uid);

  // 墓場へ(消滅でない場合)
  if (!follower.banished) {
    battleState[who].graveyard.push(follower);
  }

  battleLog(`${follower.name}が倒された！`, 'death');

  // 死亡時効果
  if (follower.onDeath) {
    try { follower.onDeath(ctx, follower); } catch(e) { console.error(e); }
  }

  // 他フォロワーのonAllyDeath
  battleState[who].field.forEach(f => {
    if (f.alive && f.onAllyDeath) {
      try { f.onAllyDeath(ctx, f, follower); } catch(e) { console.error(e); }
    }
  });

  checkGameEnd();
  renderBattle();
}

// =============================================
// ゲーム終了チェック
// =============================================
function checkGameEnd() {
  if (battleState.gameOver) return;
  if (battleState.player.leader.hp <= 0) {
    battleState.gameOver = true;
    battleState.winner = 'enemy';
    setTimeout(() => showBattleResult('lose'), 600);
  } else if (battleState.enemy.leader.hp <= 0) {
    battleState.gameOver = true;
    battleState.winner = 'player';
    setTimeout(() => showBattleResult('win'), 600);
  }
}

// =============================================
// ログ
// =============================================
function battleLog(text, type = 'system') {
  if (!battleState) return;
  battleState.logs.push({ text, type });
  if (battleState.logs.length > 30) battleState.logs.shift();
  renderLog();
}

function renderLog() {
  const logD = document.getElementById('battleLog');
  if (!logD) return;
  logD.innerHTML = battleState.logs.slice(-10).map(l =>
    `<div class="log-entry ${l.type}">${l.text}</div>`
  ).join('');
  logD.scrollTop = logD.scrollHeight;
}

// =============================================
// スペルコスト取得
// =============================================
function getCardCost(card, who) {
  let cost = card.cost;
  cost -= (battleState[who]._costReduction || 0);
  // アミュレットの効果
  battleState.amulets[who].forEach(a => {
    if (a.alive && a.reduceSpellCost && card.type === 'spell') {
      cost -= a.reduceSpellCost;
    }
  });
  return Math.max(0, cost);
}

// =============================================
// ターン処理
// =============================================
async function startPlayerTurn() {
  if (battleState.gameOver) return;
  battleState.currentTurn = 'player';
  battleState.phase = 'main';
  battleState.selectedCardIndex = null;
  battleState.selectedFollower = null;

  // PP回復・増加
  battleState.player.ppMax = Math.min(10, battleState.player.ppMax + 1);
  battleState.player.pp = battleState.player.ppMax;
  battleState.player._costReduction = 0;
  battleState.player.cardsPlayedThisTurn = 0;
  battleState.player._tempPP = 0;

  // 召喚酔い解除
  battleState.player.field.forEach(f => {
    f.hasSummonSick = false;
    f.exhausted = false;
    // 凍結解除
    if (f.frozen) {
      f.frozen = false;
      f.atk = f.frozenAtk || f.atk;
      delete f.frozenAtk;
    }
    // 一時疾走クリア
    delete f._tempRush;
  });

  // ターン開始時効果
  const ctx = createBattleContext(battleState);
  [...battleState.player.field].forEach(f => {
    if (f.alive && f.onTurnStart) {
      try { f.onTurnStart(ctx, f); } catch(e) { console.error(e); }
    }
  });
  [...battleState.amulets.player].forEach(a => {
    if (a.alive && a.onTurnStart) {
      try { a.onTurnStart(ctx, a); } catch(e) { console.error(e); }
    }
  });

  // ドロー
  ctx.drawCard('player');

  showTurnBanner('あなたのターン');
  battleLog(`=== ターン ${battleState.turn} (あなた) ===`, 'system');
  renderBattle();
}

async function endPlayerTurn() {
  if (battleState.gameOver) return;
  if (battleState.currentTurn !== 'player') return;
  battleState.phase = 'end';

  // ターン終了時効果
  const ctx = createBattleContext(battleState);
  [...battleState.player.field].forEach(f => {
    if (f.alive && f.onTurnEnd) {
      try { f.onTurnEnd(ctx, f); } catch(e) { console.error(e); }
    }
    // 一時疾走クリア
    delete f._tempRush;
  });
  [...battleState.amulets.player].forEach(a => {
    if (a.alive && a.onTurnEnd) {
      try { a.onTurnEnd(ctx, a); } catch(e) { console.error(e); }
      if (a.destroyAtTurnEnd) {
        a.alive = false;
        battleState.amulets.player = battleState.amulets.player.filter(x => x.uid !== a.uid);
      }
    }
  });

  renderBattle();
  if (battleState.gameOver) return;

  await delay(600);
  startEnemyTurn();
}

// =============================================
// 敵AIターン
// =============================================
async function startEnemyTurn() {
  if (battleState.gameOver) return;
  battleState.currentTurn = 'enemy';
  battleState.turn++;

  // PP回復
  battleState.enemy.ppMax = Math.min(10, battleState.enemy.ppMax + 1);
  battleState.enemy.pp = battleState.enemy.ppMax;
  battleState.enemy._costReduction = 0;
  battleState.enemy.cardsPlayedThisTurn = 0;
  battleState.enemy._tempPP = 0;

  // 召喚酔い解除
  battleState.enemy.field.forEach(f => {
    f.hasSummonSick = false;
    f.exhausted = false;
    if (f.frozen) {
      f.frozen = false;
      f.atk = f.frozenAtk || f.atk;
      delete f.frozenAtk;
    }
    delete f._tempRush;
  });

  const ctx = createBattleContext(battleState);

  // ターン開始時効果
  [...battleState.enemy.field].forEach(f => {
    if (f.alive && f.onTurnStart) {
      try { f.onTurnStart(ctx, f); } catch(e) {}
    }
  });
  [...battleState.amulets.enemy].forEach(a => {
    if (a.alive && a.onTurnStart) {
      try { a.onTurnStart(ctx, a); } catch(e) {}
    }
  });

  ctx.drawCard('enemy');

  showTurnBanner('敵のターン');
  battleLog(`=== ターン ${battleState.turn} (敵) ===`, 'system');
  renderBattle();

  // AI行動インジケーター
  const aiIndicator = document.querySelector('.ai-thinking');
  if (aiIndicator) aiIndicator.classList.add('show');

  await delay(1000);
  await runEnemyAI();

  if (aiIndicator) aiIndicator.classList.remove('show');

  if (battleState.gameOver) return;

  // ターン終了時効果
  [...battleState.enemy.field].forEach(f => {
    if (f.alive && f.onTurnEnd) {
      try { f.onTurnEnd(ctx, f); } catch(e) {}
    }
    delete f._tempRush;
  });
  [...battleState.amulets.enemy].forEach(a => {
    if (a.alive && a.onTurnEnd) {
      try { a.onTurnEnd(ctx, a); } catch(e) {}
      if (a.destroyAtTurnEnd) {
        a.alive = false;
        battleState.amulets.enemy = battleState.amulets.enemy.filter(x => x.uid !== a.uid);
      }
    }
  });

  renderBattle();
  if (battleState.gameOver) return;

  await delay(600);
  startPlayerTurn();
}

// =============================================
// 敵AI行動ロジック
// =============================================
async function runEnemyAI() {
  const ctx = createBattleContext(battleState);
  let acted = true;

  while (acted && !battleState.gameOver) {
    acted = false;
    await delay(400);

    // ======= フェーズ1: カードプレイ =======
    // プレイアブルなカードを評価
    const playable = battleState.enemy.hand
      .map((card, idx) => ({ card, idx, cost: getCardCost(card, 'enemy') }))
      .filter(({ cost }) => cost <= battleState.enemy.pp)
      .sort((a, b) => aiCardPriority(b.card, battleState) - aiCardPriority(a.card, battleState));

    if (playable.length > 0) {
      const { card, idx } = playable[0];
      acted = true;
      await aiPlayCard(card, idx, ctx);
      continue;
    }

    // ======= フェーズ2: 攻撃 =======
    const attackers = battleState.enemy.field.filter(f => {
      if (!f.alive) return false;
      if (f.hasSummonSick) {
        const kws = getFollowerKeywords(f, ctx);
        if (!kws.includes('storm') && !kws.includes('rush') && !f._tempRush) return false;
      }
      return !f.exhausted;
    });

    if (attackers.length > 0) {
      acted = true;
      for (const attacker of attackers) {
        if (battleState.gameOver) break;
        await delay(400);
        await aiDoAttack(attacker, ctx);
      }
    }
  }
}

// AIカード優先度スコア
function aiCardPriority(card, state) {
  const ctx = createBattleContext(state);
  let score = card.cost * 2;

  if (card.type === 'follower') {
    score += (card.atk || 0) + (card.def || 0);
    if (card.keywords.includes('ward')) score += 3;
    if (card.keywords.includes('storm')) score += 5;
    if (card.keywords.includes('drain')) score += 2;
  } else if (card.type === 'spell') {
    score += 3;
    // 敵フォロワーへの除去スペル優先
    if (state.player.field.length > 0) score += 4;
  } else if (card.type === 'amulet') {
    score += 2;
  }

  // 相手リーダーを倒せるか
  const kws = card.keywords || [];
  if ((kws.includes('storm') && card.atk >= state.player.leader.hp)) score += 20;

  // フィールドが空なら直接攻撃できる
  if (state.player.field.length === 0) score += 2;

  return score;
}

// AIカードプレイ実行
async function aiPlayCard(card, idx, ctx) {
  battleState.enemy.hand.splice(idx, 1);
  const cost = getCardCost(card, 'enemy');
  battleState.enemy.pp -= cost;
  battleState.enemy.cardsPlayedThisTurn = (battleState.enemy.cardsPlayedThisTurn || 0) + 1;

  battleLog(`敵が${card.name}を使用！`, 'play');

  if (card.type === 'follower') {
    if (battleState.enemy.field.length < 5) {
      const follower = makeFollowerInstance(card, 'enemy');
      follower.hasSummonSick = true;
      battleState.enemy.field.push(follower);
      triggerOnSummon(follower, 'enemy', ctx);

      // 疾走/突進チェック
      const kws = getFollowerKeywords(follower, ctx);
      if (kws.includes('storm') || kws.includes('rush')) {
        follower.hasSummonSick = false;
      }

      if (follower.onPlay) {
        try { follower.onPlay(ctx, follower); } catch(e) { console.error(e); }
      }

      // スペル使用時の味方フォロワーonAllySpell
      battleState.enemy.field.forEach(f => {
        if (f.alive && f !== follower && f.onAllySpell) {
          // spellじゃないのでスキップ
        }
      });
    }
  } else if (card.type === 'spell') {
    // ターゲット付きスペル
    if (card.targeted && !card.targetFriendly) {
      // ランダムに対象選択
      const targets = battleState.player.field.filter(f => f.alive);
      let target = null;
      if (targets.length > 0) {
        // ward優先
        const wards = targets.filter(f => hasKeyword(f, 'ward', ctx));
        target = wards.length > 0 ? wards[0] : targets[Math.floor(Math.random() * targets.length)];
      } else if (card.canTargetLeader) {
        target = { type: 'leader', owner: 'player' };
      }
      if (target) {
        try { card.effect(ctx, 'enemy', target); } catch(e) { console.error(e); }
      }
    } else if (card.targetFriendly) {
      const targets = battleState.enemy.field.filter(f => f.alive);
      if (targets.length > 0) {
        const target = targets[0];
        try { card.effect(ctx, 'enemy', target); } catch(e) { console.error(e); }
      }
    } else {
      try { card.effect(ctx, 'enemy'); } catch(e) { console.error(e); }
    }

    // スペル使用時のフォロワー効果
    battleState.enemy.field.forEach(f => {
      if (f.alive && f.onAllySpell) {
        try { f.onAllySpell(ctx, f); } catch(e) {}
      }
    });

    battleState.enemy.graveyard.push(card);
  } else if (card.type === 'amulet') {
    const amulet = makeAmuletInstance(card, 'enemy');
    battleState.amulets.enemy.push(amulet);
  }

  renderBattle();
  await delay(300);
}

// AI攻撃実行
async function aiDoAttack(attacker, ctx) {
  if (!attacker.alive || attacker.exhausted) return;

  const kws = getFollowerKeywords(attacker, ctx);
  const playerField = battleState.player.field.filter(f => f.alive);
  const hasWard = playerField.some(f => hasKeyword(f, 'ward', ctx));

  let target = null;

  if (hasWard) {
    // ward持ちを攻撃
    target = playerField.find(f => hasKeyword(f, 'ward', ctx));
  } else if (playerField.length > 0 && !kws.includes('storm')) {
    // rush: フォロワーのみ
    // 最も倒せるターゲットを選ぶ (atk >= def)
    const killable = playerField.filter(f => attacker.atk >= f.def);
    if (killable.length > 0) {
      target = killable.sort((a, b) => b.atk - a.atk)[0]; // 一番強いのを倒す
    } else {
      target = playerField.sort((a, b) => a.def - b.def)[0]; // 一番削れそうなのを
    }
  } else if (kws.includes('storm') || playerField.length === 0) {
    // リーダー攻撃
    target = { type: 'leader', owner: 'player' };
  } else {
    target = playerField[0];
  }

  if (!target) return;

  await executeAttack(attacker, target, 'enemy', ctx);
}

// =============================================
// 攻撃実行
// =============================================
async function executeAttack(attacker, target, attackerOwner, ctx) {
  if (!attacker.alive) return;

  const defenderOwner = attackerOwner === 'player' ? 'enemy' : 'player';
  const kws = getFollowerKeywords(attacker, ctx);

  // 攻撃アニメ
  const attackerEl = document.querySelector(`[data-uid="${attacker.uid}"]`);
  if (attackerEl) {
    attackerEl.classList.add('attacking');
    setTimeout(() => attackerEl.classList.remove('attacking'), 300);
  }

  await delay(250);

  // 攻撃コールバック
  if (attacker.onAttack) {
    try { attacker.onAttack(ctx, attacker, target); } catch(e) {}
  }

  if (target.type === 'leader') {
    // リーダーへの攻撃
    ctx.damageLeader(defenderOwner, attacker.atk);
    if (kws.includes('drain')) ctx.healLeader(attackerOwner, attacker.atk);
    battleLog(`${attacker.name}が${defenderOwner === 'player' ? 'あなた' : '敵'}リーダーに${attacker.atk}ダメージ！`, 'damage');
  } else {
    // フォロワーへの攻撃
    const attackerAtk = attacker.atk;
    const targetAtk  = target.atk;
    const attackerDef = attacker.def;
    const targetDef  = target.def;

    // 必殺
    if (kws.includes('bane') && targetDef > 0) {
      target.def = 0;
      scheduleFollowerDeath(target, attackerOwner);
    } else {
      ctx.damageFollower(target, attackerAtk, attackerOwner);
    }

    // 反撃ダメージ (標的がまだ生きていれば)
    if (target.alive && targetAtk > 0) {
      const targetKws = getFollowerKeywords(target, ctx);
      if (targetKws.includes('bane')) {
        attacker.def = 0;
        scheduleFollowerDeath(attacker, defenderOwner);
      } else {
        ctx.damageFollower(attacker, targetAtk, defenderOwner);
      }
    }

    // 吸血
    if (kws.includes('drain') && attackerAtk > 0) {
      ctx.healLeader(attackerOwner, attackerAtk);
    }

    // 攻撃者のonDamageTaken
    if (target.alive && targetAtk > 0 && attacker.alive && attacker.onDamageTaken) {
      try { attacker.onDamageTaken(ctx, attacker, targetAtk); } catch(e) {}
    }
    // 防御者のonDamageTaken
    if (target.alive && attackerAtk > 0 && target.onDamageTaken) {
      try { target.onDamageTaken(ctx, target, attackerAtk); } catch(e) {}
    }

    battleLog(`${attacker.name}が${target.name}を攻撃！`, 'damage');
  }

  attacker.exhausted = true;

  // マルチアタック(アルベール)
  if (attacker.multiAttack && target.type === 'leader' && attacker.alive) {
    await delay(300);
    if (!battleState.gameOver) {
      await executeAttack(attacker, { type: 'leader', owner: defenderOwner }, attackerOwner, ctx);
    }
    return;
  }

  renderBattle();
}

// =============================================
// カードプレイ (プレイヤー)
// =============================================
async function playCard(cardIdx) {
  if (battleState.currentTurn !== 'player') return;
  if (battleState.gameOver) return;
  if (battleState.phase !== 'main') return;

  const card = battleState.player.hand[cardIdx];
  if (!card) return;

  const cost = getCardCost(card, 'player');
  if (cost > battleState.player.pp) {
    battleLog('PPが足りない！', 'system');
    return;
  }

  if (card.type === 'follower' && battleState.player.field.length >= 5) {
    battleLog('フィールドが満員です！', 'system');
    return;
  }

  // ターゲット選択が必要か
  if (card.targeted) {
    battleState.selectedCardIndex = cardIdx;
    battleState.targetingSpell = card;
    battleState.targetingForBuff = !!card.targetFriendly;
    battleState.phase = 'target_spell';
    renderBattle();
    return;
  }

  // プレイ実行
  await executePlayCard(cardIdx, null);
}

async function executePlayCard(cardIdx, target) {
  const card = battleState.player.hand[cardIdx];
  const cost = getCardCost(card, 'player');

  battleState.player.hand.splice(cardIdx, 1);
  battleState.player.pp -= cost;
  battleState.player.cardsPlayedThisTurn = (battleState.player.cardsPlayedThisTurn || 0) + 1;
  battleState.phase = 'main';
  battleState.selectedCardIndex = null;
  battleState.targetingSpell = null;
  battleState.targetingForBuff = false;

  const ctx = createBattleContext(battleState);
  battleLog(`${card.name}をプレイ！`, 'play');

  // スペルエフェクト演出
  if (card.type === 'spell') {
    showSpellFlash();
  }

  if (card.type === 'follower') {
    if (battleState.player.field.length < 5) {
      const follower = makeFollowerInstance(card, 'player');
      follower.hasSummonSick = true;
      battleState.player.field.push(follower);
      triggerOnSummon(follower, 'player', ctx);

      const kws = getFollowerKeywords(follower, ctx);
      if (kws.includes('storm') || kws.includes('rush')) {
        follower.hasSummonSick = false;
      }

      if (follower.onPlay) {
        try { follower.onPlay(ctx, follower); } catch(e) { console.error(e); }
      }
    }
  } else if (card.type === 'spell') {
    if (card.effect) {
      try { card.effect(ctx, 'player', target); } catch(e) { console.error(e); }
    }

    // スペル使用時のフォロワー効果
    battleState.player.field.forEach(f => {
      if (f.alive && f.onAllySpell) {
        try { f.onAllySpell(ctx, f); } catch(e) {}
      }
    });

    battleState.player.graveyard.push(card);
  } else if (card.type === 'amulet') {
    const amulet = makeAmuletInstance(card, 'player');
    battleState.amulets.player.push(amulet);
  }

  renderBattle();
}

// =============================================
// フォロワー攻撃 (プレイヤー操作)
// =============================================
function selectFollowerToAttack(follower) {
  if (battleState.currentTurn !== 'player') return;
  if (battleState.gameOver) return;
  if (!follower.alive || follower.exhausted) return;

  const ctx = createBattleContext(battleState);
  const kws = getFollowerKeywords(follower, ctx);

  if (follower.hasSummonSick && !kws.includes('storm') && !kws.includes('rush') && !follower._tempRush) {
    battleLog('召喚酔い中は攻撃できません！', 'system');
    return;
  }

  if (battleState.selectedFollower === follower) {
    // 選択解除
    battleState.selectedFollower = null;
    battleState.phase = 'main';
  } else {
    battleState.selectedFollower = follower;
    battleState.phase = 'target_follower';
  }

  renderBattle();
}

async function selectAttackTarget(target) {
  if (battleState.phase !== 'target_follower') return;
  if (!battleState.selectedFollower) return;

  const attacker = battleState.selectedFollower;
  const ctx = createBattleContext(battleState);
  const kws = getFollowerKeywords(attacker, ctx);

  // wardチェック
  const enemyField = battleState.enemy.field.filter(f => f.alive);
  const hasWard = enemyField.some(f => hasKeyword(f, 'ward', ctx));

  if (hasWard && target.type !== 'leader') {
    // ward持ちを選んでいるか確認
    if (!hasKeyword(target, 'ward', ctx)) {
      battleLog('ガード持ちのフォロワーを先に攻撃してください！', 'system');
      return;
    }
  }

  if (target.type === 'leader' && hasWard) {
    battleLog('ガード持ちのフォロワーを先に攻撃してください！', 'system');
    return;
  }

  // rush: リーダー攻撃不可(召喚酔い明け最初のターン)
  if (attacker.hasSummonSick === false && kws.includes('rush') && !kws.includes('storm')) {
    if (target.type === 'leader') {
      battleLog('疾走フォロワーはフォロワーにしか攻撃できません！', 'system');
      return;
    }
  }

  battleState.selectedFollower = null;
  battleState.phase = 'main';

  await executeAttack(attacker, target, 'player', ctx);
  renderBattle();
}

// =============================================
// スペルターゲット選択
// =============================================
async function selectSpellTarget(target) {
  if (battleState.phase !== 'target_spell') return;

  const cardIdx = battleState.selectedCardIndex;
  const card = battleState.player.hand[cardIdx];
  if (!card) return;

  // ターゲット検証
  if (!battleState.targetingForBuff) {
    // 敵へのスペル
    if (target.type === 'leader' && !card.canTargetLeader) {
      battleLog('リーダーを対象にできません！', 'system');
      return;
    }
    if (target.owner === 'player') {
      battleLog('味方は対象にできません！', 'system');
      return;
    }
  } else {
    // 味方へのスペル
    if (target.owner !== 'player') {
      battleLog('味方フォロワーを選んでください！', 'system');
      return;
    }
  }

  await executePlayCard(cardIdx, target);
}

// =============================================
// 勝敗表示
// =============================================
function showBattleResult(result) {
  const resultD = document.getElementById('battleResult');
  if (!resultD) return;
  const textD = resultD.querySelector('.result-text');
  const subD  = resultD.querySelector('.result-sub');

  if (result === 'win') {
    textD.textContent = '🎉 勝利！';
    textD.className = 'result-text win';
    subD.textContent = '敵リーダーを撃破した！';
  } else {
    textD.textContent = '💀 敗北...';
    textD.className = 'result-text lose';
    subD.textContent = 'リーダーが倒れた...';
  }

  resultD.classList.add('show');
}

// =============================================
// ターンバナー
// =============================================
function showTurnBanner(text) {
  const existing = battleD.querySelector('.turn-banner');
  if (existing) existing.remove();

  const banner = document.createElement('div');
  banner.className = 'turn-banner';
  banner.textContent = text;
  battleD.appendChild(banner);

  setTimeout(() => banner.remove(), 1500);
}

// =============================================
// スペルエフェクト
// =============================================
function showSpellFlash() {
  const flash = document.createElement('div');
  flash.className = 'spell-flash';
  battleD.appendChild(flash);
  setTimeout(() => flash.remove(), 500);
}

function showHealFlash() {
  const flash = document.createElement('div');
  flash.className = 'heal-flash';
  battleD.appendChild(flash);
  setTimeout(() => flash.remove(), 500);
}

// =============================================
// ダメージポップアップ
// =============================================
function showDamagePopup(uid, amount, isHeal) {
  let el;
  if (uid.startsWith('leader-')) {
    el = document.querySelector(`[data-leader="${uid.replace('leader-', '')}"]`);
  } else {
    el = document.querySelector(`[data-uid="${uid}"]`);
  }
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const popup = document.createElement('div');
  popup.className = `damage-popup${isHeal ? ' heal' : ''}`;
  popup.textContent = isHeal ? `+${amount}` : `-${amount}`;
  popup.style.left = `${rect.left + rect.width/2 - 15}px`;
  popup.style.top  = `${rect.top + rect.height/2 - 15}px`;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 800);
}

// =============================================
// カード詳細ポップアップ
// =============================================
function showCardDetail(card) {
  const ctx = createBattleContext(battleState);
  const detailD = document.getElementById('battleCardDetail');
  if (!detailD) return;

  const kws = card.keywords || [];
  const kwHtml = kws.map(k =>
    `<span class="detail-kw kw-badge ${k}">${KeywordNames[k] || k}</span>`
  ).join('');

  detailD.innerHTML = `
    <div class="detail-name">${card.name}</div>
    <div class="detail-cost">コスト: ${card.cost}</div>
    ${card.type === 'follower' ? `<div class="detail-stats"><span class="detail-atk">⚔️${card.atk}</span><span class="detail-def">❤️${card.def}</span></div>` : ''}
    <div class="detail-keywords">${kwHtml}</div>
    <div class="detail-desc">${card.desc}</div>
    <div class="detail-flavor">"${card.flavor}"</div>
    <div class="detail-close" id="battleDetailClose">閉じる</div>
  `;
  detailD.classList.add('show');

  document.getElementById('battleDetailClose').addEventListener('click', () => {
    detailD.classList.remove('show');
  });
}

// =============================================
// レンダリング
// =============================================
function renderBattle() {
  if (!battleD || !battleState) return;

  const ctx = createBattleContext(battleState);

  // ---- 敵リーダー ----
  renderLeader('enemy');

  // ---- 敵フィールド ----
  renderField('enemy', ctx);

  // ---- 敵手札 ----
  renderEnemyHand();

  // ---- PP表示 ----
  renderPP();

  // ---- ターン情報 ----
  renderTurnInfo();

  // ---- プレイヤーフィールド ----
  renderField('player', ctx);

  // ---- プレイヤー手札 ----
  renderPlayerHand(ctx);

  // ---- プレイヤーリーダー ----
  renderLeader('player');

  // ---- ターゲットガイド ----
  renderTargetGuide();

  // ---- エンドターンボタン ----
  const endBtn = battleD.querySelector('.end-turn-btn');
  if (endBtn) {
    if (battleState.currentTurn === 'player' && !battleState.gameOver) {
      endBtn.classList.remove('disabled');
    } else {
      endBtn.classList.add('disabled');
    }
  }

  // アミュレット表示
  renderAmulets('player');
  renderAmulets('enemy');
}

function renderLeader(who) {
  const icon = battleD.querySelector(`[data-leader-icon="${who}"]`);
  const hpEl = battleD.querySelector(`[data-leader-hp="${who}"]`);
  const deckEl = battleD.querySelector(`[data-leader-deck="${who}"]`);
  if (!icon || !hpEl) return;

  const leader = battleState[who].leader;
  hpEl.textContent = `❤️${leader.hp}`;

  if (deckEl) deckEl.textContent = `📚${battleState[who].deck.length}`;

  // ターゲット可能ハイライト
  const ctx = createBattleContext(battleState);
  const isTargetable = shouldHighlightLeader(who, ctx);
  icon.classList.toggle('targetable', isTargetable);
  icon.dataset.leader = who;
}

function shouldHighlightLeader(who, ctx) {
  if (who !== 'enemy') return false;
  if (battleState.currentTurn !== 'player') return false;
  if (battleState.phase === 'target_follower') {
    const attacker = battleState.selectedFollower;
    if (!attacker) return false;
    const kws = getFollowerKeywords(attacker, ctx);
    const hasStorm = kws.includes('storm');
    const isRushOnly = kws.includes('rush') && !hasStorm;
    if (isRushOnly) return false;
    const enemyField = battleState.enemy.field.filter(f => f.alive);
    const hasWard = enemyField.some(f => hasKeyword(f, 'ward', ctx));
    return !hasWard;
  }
  if (battleState.phase === 'target_spell') {
    const card = battleState.player.hand[battleState.selectedCardIndex];
    return card && card.canTargetLeader && !battleState.targetingForBuff;
  }
  return false;
}

function renderField(who, ctx) {
  const fieldEl = battleD.querySelector(`.field-area.${who}-field`);
  if (!fieldEl) return;

  fieldEl.innerHTML = '';

  battleState[who].field.forEach(follower => {
    if (!follower.alive) return;

    const kws = getFollowerKeywords(follower, ctx);
    const isPlayer = who === 'player';
    const isMyTurn = battleState.currentTurn === 'player';

    // 攻撃可能?
    const canAttack = isPlayer && isMyTurn &&
      !follower.exhausted && follower.alive &&
      (!follower.hasSummonSick || kws.includes('storm') || kws.includes('rush') || follower._tempRush);

    // ターゲット可能?
    let isTargetable = false;
    if (!isPlayer && battleState.phase === 'target_follower' && battleState.selectedFollower) {
      const enemyField = battleState.enemy.field.filter(f => f.alive);
      const hasWard = enemyField.some(f => hasKeyword(f, 'ward', ctx));
      if (hasWard) {
        isTargetable = kws.includes('ward');
      } else {
        const targetKws = getFollowerKeywords(follower, ctx);
        isTargetable = !targetKws.includes('ambush');
      }
    }
    if (!isPlayer && battleState.phase === 'target_spell' && !battleState.targetingForBuff) {
      isTargetable = true;
    }
    if (isPlayer && battleState.phase === 'target_spell' && battleState.targetingForBuff) {
      isTargetable = true;
    }
    if (isPlayer && battleState.phase === 'target_spell' && !battleState.targetingForBuff && !battleState.targetingForBuff) {
      // 敵向けスペルで味方はターゲットにならない
      isTargetable = false;
    }

    const isSelected = battleState.selectedFollower === follower;
    const hasWard = kws.includes('ward');
    const isAmbush = kws.includes('ambush') && !isPlayer;

    const card = document.createElement('div');
    card.className = [
      'follower-card',
      canAttack && !isSelected ? 'can-attack' : '',
      isSelected ? 'selected' : '',
      isTargetable ? 'targetable' : '',
      follower.exhausted ? 'exhausted' : '',
      follower.frozen ? 'frozen' : '',
      follower.hasSummonSick && !kws.includes('storm') && !kws.includes('rush') ? 'sleeping' : '',
      hasWard ? 'ward-glow' : '',
    ].filter(Boolean).join(' ');

    card.dataset.uid = follower.uid;

    // 潜伏中は敵に見えない
    if (isAmbush) {
      card.innerHTML = `
        <div class="card-name-field">???</div>
        <div class="card-art">🌫️</div>
        <div class="card-stats">
          <span class="stat-atk">?</span>
          <span class="stat-def">?</span>
        </div>
      `;
    } else {
      const kwBadges = kws.slice(0, 3).map(k =>
        `<span class="kw-badge ${k}">${KeywordNames[k]?.slice(0,2) || k}</span>`
      ).join('');

      card.innerHTML = `
        <div class="card-name-field">${follower.name}</div>
        <div class="card-art">${getCardArt(follower)}</div>
        <div class="card-stats">
          <span class="stat-atk">${follower.atk}</span>
          <span class="stat-def">${follower.def}</span>
        </div>
        <div class="keyword-badges">${kwBadges}</div>
      `;
    }

    // クリックイベント
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      handleFollowerClick(follower, who, ctx);
    });

    // 長押しで詳細
    new fuyoNagaOSU(card, () => showCardDetail(follower), 600);

    fieldEl.appendChild(card);
  });
}

function handleFollowerClick(follower, who, ctx) {
  if (battleState.gameOver) return;
  const isPlayer = who === 'player';

  if (battleState.phase === 'target_follower') {
    if (!isPlayer) {
      selectAttackTarget(follower);
    } else {
      // 自分のを選びなおし
      selectFollowerToAttack(follower);
    }
  } else if (battleState.phase === 'target_spell') {
    if (battleState.targetingForBuff && isPlayer) {
      selectSpellTarget(follower);
    } else if (!battleState.targetingForBuff && !isPlayer) {
      selectSpellTarget(follower);
    } else {
      // キャンセル
      battleState.phase = 'main';
      battleState.selectedCardIndex = null;
      battleState.targetingSpell = null;
      battleState.selectedFollower = null;
      battleState.targetingForBuff = false;
      renderBattle();
    }
  } else if (battleState.phase === 'main' && isPlayer) {
    selectFollowerToAttack(follower);
  }
}

function renderEnemyHand() {
  const handEl = battleD.querySelector('.enemy-hand');
  if (!handEl) return;
  handEl.innerHTML = '';

  battleState.enemy.hand.forEach(() => {
    const card = document.createElement('div');
    card.className = 'hand-card';
    card.innerHTML = `<div class="card-art" style="font-size:28px;margin-top:16px;">🂠</div>`;
    handEl.appendChild(card);
  });
}

function renderPlayerHand(ctx) {
  const handEl = battleD.querySelector('.player-hand');
  if (!handEl) return;
  handEl.innerHTML = '';

  battleState.player.hand.forEach((card, idx) => {
    const cost = getCardCost(card, 'player');
    const affordable = cost <= battleState.player.pp;
    const isSelected = battleState.selectedCardIndex === idx;

    const el = document.createElement('div');
    el.className = [
      'hand-card',
      `type-${card.type}`,
      affordable ? '' : 'unplayable',
      isSelected ? 'selected-hand' : '',
    ].filter(Boolean).join(' ');

    el.innerHTML = `
      <div class="cost-badge ${affordable ? 'affordable' : ''}">${cost}</div>
      <div class="hand-art">${getCardArt(card)}</div>
      <div class="hand-name">${card.name}</div>
      ${card.type === 'follower' ? `<div class="hand-stats"><span class="hand-atk">${card.atk}</span><span class="hand-def">${card.def}</span></div>` : ''}
    `;

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      if (battleState.currentTurn !== 'player') return;
      if (battleState.gameOver) return;

      if (isSelected) {
        // 選択解除
        battleState.selectedCardIndex = null;
        battleState.targetingSpell = null;
        battleState.phase = 'main';
        battleState.selectedFollower = null;
        renderBattle();
      } else if (affordable && battleState.phase === 'main') {
        playCard(idx);
      }
    });

    new fuyoNagaOSU(el, () => showCardDetail(card), 600);

    handEl.appendChild(el);
  });
}

function renderPP() {
  const ppGems = battleD.querySelector('.pp-gems');
  if (!ppGems) return;

  const pp = battleState.player.pp;
  const ppMax = battleState.player.ppMax;

  ppGems.innerHTML = '';
  for (let i = 0; i < ppMax; i++) {
    const gem = document.createElement('div');
    gem.className = `pp-gem${i < pp ? ' active' : ''}`;
    ppGems.appendChild(gem);
  }

  const ppLabel = battleD.querySelector('.pp-label');
  if (ppLabel) ppLabel.textContent = `${pp}/${ppMax} PP`;
}

function renderTurnInfo() {
  const turnNum = battleD.querySelector('.turn-num');
  const turnPlayer = battleD.querySelector('.turn-player');
  if (turnNum) turnNum.textContent = `ターン ${battleState.turn}`;
  if (turnPlayer) turnPlayer.textContent = battleState.currentTurn === 'player' ? 'あなたのターン' : '敵のターン';
}

function renderTargetGuide() {
  const guide = battleD.querySelector('.target-guide');
  if (!guide) return;

  if (battleState.phase === 'target_follower') {
    guide.textContent = '攻撃対象を選んでください（敵フォロワーまたはリーダー）';
    guide.classList.add('show');
  } else if (battleState.phase === 'target_spell') {
    const card = battleState.player.hand[battleState.selectedCardIndex];
    if (card) {
      guide.textContent = battleState.targetingForBuff
        ? '効果対象の味方フォロワーを選んでください'
        : '効果対象を選んでください';
      guide.classList.add('show');
    }
  } else {
    guide.classList.remove('show');
  }
}

function renderAmulets(who) {
  // アミュレットはフィールドに簡易表示（field-areaの隅に表示）
  const fieldEl = battleD.querySelector(`.field-area.${who}-field`);
  if (!fieldEl) return;

  // 既存のアミュレット要素を除去
  fieldEl.querySelectorAll('.amulet-card').forEach(el => el.remove());

  battleState.amulets[who].forEach(amulet => {
    if (!amulet.alive) return;
    const el = document.createElement('div');
    el.className = 'amulet-card';
    el.innerHTML = `
      <div class="amulet-art">🌀</div>
      <div class="amulet-name">${amulet.name}</div>
    `;
    new fuyoNagaOSU(el, () => showCardDetail(amulet), 600);
    fieldEl.appendChild(el);
  });
}

// =============================================
// バトル画面構築
// =============================================
function buildBattleUI() {
  battleD = document.getElementById('battle');
  if (!battleD) {
    battleD = document.createElement('div');
    battleD.id = 'battle';
    battleD.className = 'space';
    document.getElementById('main').appendChild(battleD);
  }

  battleD.innerHTML = `
    <!-- ゲーム結果 -->
    <div id="battleResult">
      <div class="result-text win">🎉 勝利！</div>
      <div class="result-sub"></div>
      <div class="result-btn" id="battleRetryBtn">もう一度</div>
    </div>

    <!-- デッキ選択 -->
    <div id="deckSelect">
      <div class="ds-title">⚔️ デッキを選択</div>
      <div class="ds-subtitle">長押しでデッキ詳細を確認</div>
      <div id="deckListContainer"></div>
    </div>

    <!-- AI思考中 -->
    <div class="ai-thinking">敵が考えています...</div>

    <!-- バトルログ -->
    <div id="battleLog"></div>

    <!-- カード詳細 -->
    <div id="battleCardDetail"></div>

    <!-- ターゲットガイド -->
    <div class="target-guide"></div>

    <!-- 敵エリア (上) -->
    <div class="enemy-area">
      <div class="leader-row">
        <div class="leader-icon" data-leader-icon="enemy">👿</div>
        <div class="leader-hp" data-leader-hp="enemy">❤️20</div>
        <div class="leader-name" data-leader-name="enemy">敵リーダー</div>
        <div class="leader-deck-count" data-leader-deck="enemy">📚20</div>
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
      <div class="end-turn-btn" id="endTurnBtn">ターン終了</div>
    </div>

    <!-- プレイヤーエリア (下) -->
    <div class="player-area">
      <div class="field-area player-field"></div>
      <div class="hand-area player-hand"></div>
      <div class="leader-row">
        <div class="leader-icon" data-leader-icon="player">😊</div>
        <div class="leader-hp" data-leader-hp="player">❤️20</div>
        <div class="leader-name" data-leader-name="player">あなた</div>
        <div class="leader-deck-count" data-leader-deck="player">📚20</div>
      </div>
    </div>
  `;

  // イベント登録
  document.getElementById('endTurnBtn').addEventListener('click', () => {
    if (battleState.currentTurn === 'player' && !battleState.gameOver) {
      endPlayerTurn();
    }
  });

  document.getElementById('battleRetryBtn').addEventListener('click', () => {
    document.getElementById('battleResult').classList.remove('show');
    showDeckSelect();
  });

  // 敵リーダークリック
  battleD.querySelector('[data-leader-icon="enemy"]').addEventListener('click', () => {
    if (battleState.phase === 'target_follower') {
      selectAttackTarget({ type: 'leader', owner: 'enemy' });
    } else if (battleState.phase === 'target_spell' && !battleState.targetingForBuff) {
      selectSpellTarget({ type: 'leader', owner: 'enemy' });
    }
  });

  // 背景クリックでキャンセル
  battleD.addEventListener('click', (e) => {
    if (e.target === battleD) {
      cancelSelection();
    }
  });
}

function cancelSelection() {
  if (battleState.phase !== 'main') {
    battleState.phase = 'main';
    battleState.selectedCardIndex = null;
    battleState.selectedFollower = null;
    battleState.targetingSpell = null;
    battleState.targetingForBuff = false;
    renderBattle();
  }
}

// =============================================
// デッキ選択画面
// =============================================
function showDeckSelect() {
  const deckSelectD = document.getElementById('deckSelect');
  if (!deckSelectD) return;
  deckSelectD.classList.add('show');

  const container = document.getElementById('deckListContainer');
  container.innerHTML = '';

  SampleDecks.forEach((deck, idx) => {
    const item = document.createElement('div');
    item.className = 'deck-item';
    item.innerHTML = `
      <div class="di-name">${deck.name}</div>
      <div class="di-craft craft-${deck.craft}">${getCraftName(deck.craft)}</div>
      <div class="di-leader">リーダー: ${deck.leader.name}</div>
      <div class="di-desc">${deck.desc}</div>
    `;

    item.addEventListener('click', () => {
      deckSelectD.classList.remove('show');
      startBattle(idx);
    });

    container.appendChild(item);
  });
}

function getCraftName(craft) {
  const names = {
    royal: 'ロイヤル', witch: 'ウィッチ', dragon: 'ドラゴン',
    necro: 'ネクロマンサー', bishop: 'ビショップ', elf: 'エルフ',
    vampire: 'ヴァンパイア', nemesis: 'ネメシス', neutral: 'ニュートラル'
  };
  return names[craft] || craft;
}

// =============================================
// バトル開始
// =============================================
function startBattle(playerDeckIdx) {
  // 敵AIはランダムにデッキを選ぶ (プレイヤーと違うデッキ)
  let enemyDeckIdx;
  do { enemyDeckIdx = Math.floor(Math.random() * SampleDecks.length); }
  while (enemyDeckIdx === playerDeckIdx && SampleDecks.length > 1);

  const playerDeck = SampleDecks[playerDeckIdx];
  const enemyDeck = SampleDecks[enemyDeckIdx];

  battleLog(`あなた: ${playerDeck.name} vs 敵: ${enemyDeck.name}`, 'system');

  // リーダーアイコン更新
  const enemyNameEl = battleD.querySelector('[data-leader-name="enemy"]');
  if (enemyNameEl) enemyNameEl.textContent = enemyDeck.leader.name;
  const playerNameEl = battleD.querySelector('[data-leader-name="player"]');
  if (playerNameEl) playerNameEl.textContent = playerDeck.leader.name;

  battleState = initBattleState(playerDeck, enemyDeck);
  renderBattle();

  // 先攻プレイヤーターン開始
  startPlayerTurn();
}

// =============================================
// スペース登録 & 初期化
// =============================================
(function registerBattleSpace() {
  // Spacesに追加
  if (!Spaces.find(s => s.name === 'battle')) {
    Spaces.push({ name: 'battle', rank: 3, back: '#0a0a1a', sho: 0 });
  }

  // CSSロード
  if (!document.getElementById('battle-css')) {
    const link = document.createElement('link');
    link.id = 'battle-css';
    link.rel = 'stylesheet';
    link.href = `battle.css?v=${Date.now()}`;
    document.head.appendChild(link);
  }

  // battle divをhtmlに追加 (spaceとして)
  if (!document.getElementById('battle')) {
    const div = document.createElement('div');
    div.id = 'battle';
    div.className = 'space';
    document.getElementById('main').appendChild(div);
  }

  // ホーム画面にバトルボタン追加
  const homeD = document.getElementById('home');
  if (homeD && !document.getElementById('goBattleBtn')) {
    homeD.style.display = 'flex';
    homeD.style.alignItems = 'center';
    homeD.style.justifyContent = 'center';

    const btn = document.createElement('div');
    btn.id = 'goBattleBtn';
    btn.style.cssText = `
      padding: 16px 32px;
      background: linear-gradient(135deg, #2255aa, #114488);
      border: 2px solid #55aaff;
      border-radius: 12px;
      color: #fff;
      font-size: 18px;
      font-family: cube12, monospace;
      cursor: pointer;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0,100,255,0.3);
    `;
    btn.innerHTML = '⚔️<br>バトル開始';
    btn.addEventListener('click', () => {
      buildBattleUI();
      mainF.move('battle');
      showDeckSelect();
    });
    homeD.appendChild(btn);
  }

  // movlistにbattleを追加
  const mvlsLD = document.querySelector('#movlis .list');
  if (mvlsLD && !document.querySelector('#movlis .list .item[data-name="battle"]')) {
    const li = document.createElement('div');
    li.textContent = 'battle';
    li.className = 'item';
    li.dataset.name = 'battle';
    li.addEventListener('click', () => {
      if (!battleD) {
        buildBattleUI();
        showDeckSelect();
      }
      mainF.move('battle');
    });
    mvlsLD.appendChild(li);
  }
})();
