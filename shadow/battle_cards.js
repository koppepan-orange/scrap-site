// =============================================
// シャドウバース風 カードデータ & サンプルデッキ
// =============================================

// カードタイプ
// type: 'follower' フォロワー(フィールドに出せるクリーチャー)
// type: 'spell'    スペル(即時効果、フィールドには残らない)
// type: 'amulet'   アミュレット(フィールドに残り継続効果を持つ)

// キーワード能力
// ward      ガード(ランダムではなく優先して攻撃される)
// storm     突進(召喚時に相手フォロワーorリーダーを攻撃可能)
// rush      疾走(召喚時に相手フォロワーのみ攻撃可能)
// drain     吸血(攻撃したダメージ分自リーダーを回復)
// bane      必殺(攻撃したフォロワーを破壊)
// ambush    潜伏(攻撃されず、自分から攻撃するまで対象にならない)
// cannot_attack 攻撃不可

const CardDB = [

  // ==================== ニュートラル ====================
  {
    id: 'n001', name: 'ゴブリン', craft: 'neutral', type: 'follower',
    cost: 1, atk: 1, def: 2, maxDef: 2,
    keywords: [],
    desc: 'バニラフォロワー。シンプルな戦力。',
    flavor: 'どこにでもいる、ありふれたゴブリン。'
  },
  {
    id: 'n002', name: 'コボルト', craft: 'neutral', type: 'follower',
    cost: 1, atk: 2, def: 1, maxDef: 1,
    keywords: [],
    desc: '攻撃特化の小型フォロワー。',
    flavor: '素早く、鋭い爪を持つ小さな戦士。'
  },
  {
    id: 'n003', name: 'マウンテンジャイアント', craft: 'neutral', type: 'follower',
    cost: 2, atk: 2, def: 3, maxDef: 3,
    keywords: [],
    desc: '2コストにして3/3。頼もしいフォロワー。',
    flavor: '山を揺るがす巨大な存在。'
  },
  {
    id: 'n004', name: 'ゾンビ', craft: 'neutral', type: 'follower',
    cost: 2, atk: 2, def: 2, maxDef: 2,
    keywords: [],
    desc: '死亡時: デッキからゾンビを1枚引く。',
    flavor: '死してなお、彷徨い続ける。',
    onDeath: (ctx, self) => {
      ctx.drawCardByName(self.owner, 'ゾンビ');
    }
  },
  {
    id: 'n005', name: 'ストーンゴーレム', craft: 'neutral', type: 'follower',
    cost: 3, atk: 3, def: 4, maxDef: 4,
    keywords: ['ward'],
    desc: 'ガード。頑丈な壁として機能する。',
    flavor: '石の体で仲間を守る守護者。'
  },
  {
    id: 'n006', name: 'スライム', craft: 'neutral', type: 'follower',
    cost: 1, atk: 1, def: 1, maxDef: 1,
    keywords: [],
    desc: '場に出た時: スライムを1体追加召喚する。',
    flavor: 'ぷよぷよ。',
    onPlay: (ctx, self) => {
      ctx.summonToken(self.owner, { id: 'n006_token', name: 'スライム', craft: 'neutral', type: 'follower', cost: 1, atk: 1, def: 1, maxDef: 1, keywords: [], desc: '', flavor: '' });
    }
  },
  {
    id: 'n007', name: 'ケルベロス', craft: 'neutral', type: 'follower',
    cost: 4, atk: 3, def: 3, maxDef: 3,
    keywords: ['rush'],
    desc: '疾走。召喚時に相手フォロワーに攻撃できる。',
    flavor: '三つ首の番犬が解き放たれた。'
  },
  {
    id: 'n008', name: 'フェニックス', craft: 'neutral', type: 'follower',
    cost: 5, atk: 4, def: 3, maxDef: 3,
    keywords: ['drain'],
    desc: '吸血。攻撃ダメージ分回復する。',
    flavor: '炎の翼は不滅の命を宿す。'
  },
  {
    id: 'n009', name: 'バシリスク', craft: 'neutral', type: 'follower',
    cost: 3, atk: 2, def: 2, maxDef: 2,
    keywords: ['bane'],
    desc: '必殺。攻撃したフォロワーを破壊する。',
    flavor: 'その瞳に映れば即死。'
  },
  {
    id: 'n010', name: 'ドラゴンライダー', craft: 'neutral', type: 'follower',
    cost: 6, atk: 5, def: 5, maxDef: 5,
    keywords: ['storm'],
    desc: '突進。召喚時すぐに攻撃できる。',
    flavor: '天を駆ける騎士と竜の絆。'
  },
  {
    id: 'n011', name: 'ヒーリングエンジェル', craft: 'neutral', type: 'follower',
    cost: 2, atk: 1, def: 1, maxDef: 1,
    keywords: [],
    desc: '場に出た時: 自分のリーダーを2回復する。',
    flavor: '癒しの光で傷を癒す天使。',
    onPlay: (ctx, self) => {
      ctx.healLeader(self.owner, 2);
    }
  },
  {
    id: 'n012', name: 'ゴーストライダー', craft: 'neutral', type: 'follower',
    cost: 3, atk: 3, def: 2, maxDef: 2,
    keywords: ['ambush'],
    desc: '潜伏。自分から攻撃するまで対象にならない。',
    flavor: '幽霊の騎士は誰にも見えない。'
  },
  {
    id: 'n013', name: 'ファイアーエレメンタル', craft: 'neutral', type: 'follower',
    cost: 4, atk: 4, def: 2, maxDef: 2,
    keywords: [],
    desc: '場に出た時: 相手フォロワー1体に2ダメージ。',
    flavor: '炎の精霊が宿る力。',
    onPlay: (ctx, self) => {
      ctx.damageRandomEnemy(self.owner, 2);
    }
  },
  {
    id: 'n014', name: 'アイスエレメンタル', craft: 'neutral', type: 'follower',
    cost: 3, atk: 2, def: 3, maxDef: 3,
    keywords: [],
    desc: '場に出た時: 相手フォロワー1体の攻撃力を次のターンまで0にする。',
    flavor: '氷の精霊が動きを封じる。',
    onPlay: (ctx, self) => {
      ctx.freezeRandomEnemy(self.owner);
    }
  },
  {
    id: 'n015', name: 'ダークナイト', craft: 'neutral', type: 'follower',
    cost: 5, atk: 4, def: 4, maxDef: 4,
    keywords: ['ward', 'drain'],
    desc: 'ガード・吸血。守りながら回復する。',
    flavor: '闇の騎士は倒れない。'
  },

  // ==================== ロイヤル (騎士・兵士テーマ) ====================
  {
    id: 'r001', name: 'ロイヤルセイバー・オーレリア', craft: 'royal', type: 'follower',
    cost: 7, atk: 5, def: 5, maxDef: 5,
    keywords: ['ward', 'storm'],
    desc: 'ガード・突進。場に出た時: 自軍フォロワー全員の攻撃力と防御力を+1する。',
    flavor: '剣聖の名を冠する最強の騎士。',
    onPlay: (ctx, self) => {
      ctx.buffAllFriendly(self.owner, 1, 1);
    }
  },
  {
    id: 'r002', name: 'アルベール', craft: 'royal', type: 'follower',
    cost: 5, atk: 4, def: 4, maxDef: 4,
    keywords: ['storm'],
    desc: '突進。攻撃時: 相手リーダーに攻撃した場合、もう1回攻撃できる。',
    flavor: '天才剣士の剣は止まらない。',
    multiAttack: true
  },
  {
    id: 'r003', name: '近衛騎士', craft: 'royal', type: 'follower',
    cost: 2, atk: 2, def: 2, maxDef: 2,
    keywords: ['ward'],
    desc: 'ガード。',
    flavor: '王を守護する精鋭の騎士。'
  },
  {
    id: 'r004', name: '剣士', craft: 'royal', type: 'follower',
    cost: 1, atk: 2, def: 1, maxDef: 1,
    keywords: [],
    desc: '場に出た時: 兵士1体を召喚する。',
    flavor: '戦場の最前線に立つ兵士。',
    onPlay: (ctx, self) => {
      ctx.summonToken(self.owner, { id: 'r004_token', name: '兵士', craft: 'royal', type: 'follower', cost: 1, atk: 1, def: 1, maxDef: 1, keywords: [], desc: '', flavor: '' });
    }
  },
  {
    id: 'r005', name: 'ホワイトパラディン', craft: 'royal', type: 'follower',
    cost: 4, atk: 3, def: 4, maxDef: 4,
    keywords: ['ward', 'drain'],
    desc: 'ガード・吸血。',
    flavor: '白の聖騎士は不滅の盾。'
  },
  {
    id: 'r006', name: 'ランサー', craft: 'royal', type: 'follower',
    cost: 3, atk: 3, def: 3, maxDef: 3,
    keywords: ['rush'],
    desc: '疾走。',
    flavor: '槍を構えた突撃兵。'
  },
  {
    id: 'r007', name: '戦列弓兵', craft: 'royal', type: 'follower',
    cost: 2, atk: 1, def: 2, maxDef: 2,
    keywords: [],
    desc: '場に出た時: 相手フォロワー1体に1ダメージ。ターン終了時にも1ダメージ。',
    flavor: '遠距離から的確に射抜く。',
    onPlay: (ctx, self) => {
      ctx.damageRandomEnemy(self.owner, 1);
    }
  },
  {
    id: 'r008', name: '王国の号令', craft: 'royal', type: 'spell',
    cost: 3,
    desc: '自軍フォロワー全員に+1/+1。ロイヤルフォロワーがいれば+2/+2。',
    flavor: '王の声が戦場を鼓舞する。',
    effect: (ctx, owner) => {
      let bonus = 1;
      if (ctx.hasCraftFollower(owner, 'royal')) bonus = 2;
      ctx.buffAllFriendly(owner, bonus, bonus);
    }
  },
  {
    id: 'r009', name: 'ロイヤルフラッグ', craft: 'royal', type: 'amulet',
    cost: 2,
    desc: '自軍フォロワーが場に出るたびに+1/+1を付与する。',
    flavor: '王旗の元に集う勇者たち。',
    onAllySummon: (ctx, amulet, summoned) => {
      ctx.buffFollower(summoned, 1, 1);
    }
  },
  {
    id: 'r010', name: 'ホーリーファルコン', craft: 'royal', type: 'follower',
    cost: 2, atk: 2, def: 1, maxDef: 1,
    keywords: ['storm'],
    desc: '突進。場に出た時: 自リーダーを1回復。',
    flavor: '聖なる鷹が救いをもたらす。',
    onPlay: (ctx, self) => {
      ctx.healLeader(self.owner, 1);
    }
  },

  // ==================== ウィッチ (魔法使いテーマ) ====================
  {
    id: 'w001', name: 'アリサ・フロストウィーバー', craft: 'witch', type: 'follower',
    cost: 6, atk: 5, def: 4, maxDef: 4,
    keywords: [],
    desc: '場に出た時: スペルを2枚引く。自分のスペルコストを-1する(このターン)。',
    flavor: '氷の魔法使いが紡ぐ絶対零度。',
    onPlay: (ctx, self) => {
      ctx.drawSpellCards(self.owner, 2);
      ctx.reduceCostThisTurn(self.owner, 1);
    }
  },
  {
    id: 'w002', name: 'スターリット・アストロロジャー', craft: 'witch', type: 'follower',
    cost: 2, atk: 2, def: 2, maxDef: 2,
    keywords: [],
    desc: '場に出た時: スペルを1枚引く。',
    flavor: '星の動きが全てを教えてくれる。',
    onPlay: (ctx, self) => {
      ctx.drawSpellCards(self.owner, 1);
    }
  },
  {
    id: 'w003', name: 'ファイアーボール', craft: 'witch', type: 'spell',
    cost: 2,
    desc: '相手フォロワー1体または相手リーダーに3ダメージ。',
    flavor: '燃え盛る炎の球。',
    targeted: true,
    canTargetLeader: true,
    effect: (ctx, owner, target) => {
      ctx.dealDamage(target, 3, owner);
    }
  },
  {
    id: 'w004', name: 'ブリザード', craft: 'witch', type: 'spell',
    cost: 3,
    desc: '相手フォロワー全体に2ダメージ。',
    flavor: '猛吹雪が全てを凍らせる。',
    effect: (ctx, owner) => {
      ctx.damageAllEnemies(owner, 2);
    }
  },
  {
    id: 'w005', name: 'サモン・スケルトン', craft: 'witch', type: 'spell',
    cost: 2,
    desc: 'スケルトンを2体召喚する。',
    flavor: '死者を使役する禁断の魔法。',
    effect: (ctx, owner) => {
      for (let i = 0; i < 2; i++) {
        ctx.summonToken(owner, { id: 'w005_token', name: 'スケルトン', craft: 'witch', type: 'follower', cost: 1, atk: 1, def: 1, maxDef: 1, keywords: [], desc: '', flavor: '' });
      }
    }
  },
  {
    id: 'w006', name: 'ルーンブレード・サモナー', craft: 'witch', type: 'follower',
    cost: 3, atk: 2, def: 3, maxDef: 3,
    keywords: [],
    desc: '場に出た時: 相手フォロワー1体に1ダメージ。自分がスペルを使うたびに+1/+0。',
    flavor: 'ルーン文字が剣を強くする。',
    onPlay: (ctx, self) => {
      ctx.damageRandomEnemy(self.owner, 1);
    },
    onAllySpell: (ctx, self) => {
      ctx.buffFollower(self, 1, 0);
    }
  },
  {
    id: 'w007', name: 'スペルブースト・マジシャン', craft: 'witch', type: 'follower',
    cost: 4, atk: 3, def: 3, maxDef: 3,
    keywords: [],
    desc: '自分がスペルを使うたびに+1/+1。',
    flavor: '魔法が力に変わる。',
    onAllySpell: (ctx, self) => {
      ctx.buffFollower(self, 1, 1);
    }
  },
  {
    id: 'w008', name: '雷撃の魔法', craft: 'witch', type: 'spell',
    cost: 1,
    desc: '相手フォロワー1体に2ダメージ。',
    flavor: '稲妻が標的を貫く。',
    targeted: true,
    canTargetLeader: false,
    effect: (ctx, owner, target) => {
      ctx.dealDamage(target, 2, owner);
    }
  },
  {
    id: 'w009', name: 'マナサークル', craft: 'witch', type: 'amulet',
    cost: 2,
    desc: 'スペルのコストを1減らす。自分のターン終了時に破壊される。',
    flavor: 'マナが濃縮された魔法陣。',
    reduceSpellCost: 1,
    destroyAtTurnEnd: true
  },
  {
    id: 'w010', name: 'フロストスパイク', craft: 'witch', type: 'spell',
    cost: 2,
    desc: '相手フォロワー1体を凍結する(1ターン攻撃不可)。2ダメージ。',
    flavor: '氷の刃が敵を貫く。',
    targeted: true,
    canTargetLeader: false,
    effect: (ctx, owner, target) => {
      ctx.freezeFollower(target);
      ctx.dealDamage(target, 2, owner);
    }
  },

  // ==================== ドラゴン ====================
  {
    id: 'd001', name: 'ジェネシスドラゴン', craft: 'dragon', type: 'follower',
    cost: 9, atk: 8, def: 8, maxDef: 8,
    keywords: ['storm', 'drain', 'ward'],
    desc: '突進・吸血・ガード。ゲームが終わる切り札。',
    flavor: '創世の竜が目覚めし時、全てが終わる。'
  },
  {
    id: 'd002', name: 'ドラゴニュート・シャーマン', craft: 'dragon', type: 'follower',
    cost: 3, atk: 2, def: 3, maxDef: 3,
    keywords: [],
    desc: '場に出た時: PPを1増やす(このゲーム中永続)。',
    flavor: 'ドラゴンの力を操るシャーマン。',
    onPlay: (ctx, self) => {
      ctx.increasePPMax(self.owner, 1);
    }
  },
  {
    id: 'd003', name: 'ドラゴンブレス', craft: 'dragon', type: 'spell',
    cost: 3,
    desc: '相手フォロワー1体に4ダメージ。龍の息吹が焼き尽くす。',
    flavor: '竜の吐息に逃げ場はない。',
    targeted: true,
    canTargetLeader: false,
    effect: (ctx, owner, target) => {
      ctx.dealDamage(target, 4, owner);
    }
  },
  {
    id: 'd004', name: 'ランページドラゴン', craft: 'dragon', type: 'follower',
    cost: 5, atk: 5, def: 4, maxDef: 4,
    keywords: ['rush'],
    desc: '疾走。自軍の最大PPが7以上の時: 突進も得る。',
    flavor: '怒り狂う竜を止められるものはいない。',
    getKeywords: (ctx, self) => {
      let keys = ['rush'];
      if (ctx.getMaxPP(self.owner) >= 7) keys.push('storm');
      return keys;
    }
  },
  {
    id: 'd005', name: 'ガイア・ドラゴン', craft: 'dragon', type: 'follower',
    cost: 7, atk: 6, def: 6, maxDef: 6,
    keywords: ['ward'],
    desc: 'ガード。場に出た時: 相手フォロワー全体に3ダメージ。',
    flavor: '大地を揺るがす大竜の咆哮。',
    onPlay: (ctx, self) => {
      ctx.damageAllEnemies(self.owner, 3);
    }
  },
  {
    id: 'd006', name: 'ファフニール', craft: 'dragon', type: 'follower',
    cost: 4, atk: 4, def: 3, maxDef: 3,
    keywords: [],
    desc: '場に出た時: 自分のPPが7以上の場合、相手リーダーに3ダメージ。',
    flavor: '呪われた竜の怒りは苛烈。',
    onPlay: (ctx, self) => {
      if (ctx.getMaxPP(self.owner) >= 7) ctx.damageLeader(ctx.getEnemy(self.owner), 3);
    }
  },
  {
    id: 'd007', name: 'ドラゴナイト', craft: 'dragon', type: 'follower',
    cost: 2, atk: 2, def: 2, maxDef: 2,
    keywords: [],
    desc: '場に出た時: PPを1増やす（このターンのみ）。',
    flavor: '竜の血を引く戦士。',
    onPlay: (ctx, self) => {
      ctx.gainPPThisTurn(self.owner, 1);
    }
  },
  {
    id: 'd008', name: 'ウォータードラゴン', craft: 'dragon', type: 'follower',
    cost: 6, atk: 5, def: 5, maxDef: 5,
    keywords: ['drain'],
    desc: '吸血。攻撃時: 相手フォロワー全体に1ダメージ。',
    flavor: '波濤の竜が嵐を引き起こす。',
    onAttack: (ctx, self, target) => {
      ctx.damageAllEnemies(self.owner, 1);
    }
  },

  // ==================== ネクロマンサー (死テーマ) ====================
  {
    id: 'nc001', name: 'サハクィエル', craft: 'necro', type: 'follower',
    cost: 7, atk: 6, def: 6, maxDef: 6,
    keywords: ['storm'],
    desc: '突進。場に出た時: 墓場のカード数だけ、相手リーダーにダメージ。(最大8)',
    flavor: '天使と悪魔の融合体が覚醒する。',
    onPlay: (ctx, self) => {
      let dmg = Math.min(ctx.getGraveyard(self.owner).length, 8);
      if (dmg > 0) ctx.damageLeader(ctx.getEnemy(self.owner), dmg);
    }
  },
  {
    id: 'nc002', name: 'ゾンビパーティー', craft: 'necro', type: 'spell',
    cost: 3,
    desc: '墓場のフォロワー1体を場に復活させる。',
    flavor: '死者は眠らない。',
    effect: (ctx, owner) => {
      ctx.reanimateBestFollower(owner, 3);
    }
  },
  {
    id: 'nc003', name: 'スケルトンウォリアー', craft: 'necro', type: 'follower',
    cost: 2, atk: 2, def: 2, maxDef: 2,
    keywords: [],
    desc: '死亡時: スケルトンを1体召喚する。',
    flavor: '骨の戦士は倒れても立ち上がる。',
    onDeath: (ctx, self) => {
      ctx.summonToken(self.owner, { id: 'nc003_token', name: 'スケルトン', craft: 'necro', type: 'follower', cost: 1, atk: 1, def: 1, maxDef: 1, keywords: [], desc: '', flavor: '' });
    }
  },
  {
    id: 'nc004', name: 'ネクロマンサー', craft: 'necro', type: 'follower',
    cost: 4, atk: 3, def: 4, maxDef: 4,
    keywords: [],
    desc: '場に出た時: 墓場のカード2枚につき、スケルトンを1体召喚する(最大3体)。',
    flavor: '死を操る者。',
    onPlay: (ctx, self) => {
      let count = Math.min(Math.floor(ctx.getGraveyard(self.owner).length / 2), 3);
      for (let i = 0; i < count; i++) {
        ctx.summonToken(self.owner, { id: 'nc004_token', name: 'スケルトン', craft: 'necro', type: 'follower', cost: 1, atk: 1, def: 1, maxDef: 1, keywords: [], desc: '', flavor: '' });
      }
    }
  },
  {
    id: 'nc005', name: 'バンシー', craft: 'necro', type: 'follower',
    cost: 3, atk: 2, def: 2, maxDef: 2,
    keywords: [],
    desc: '場に出た時: 相手フォロワー1体に2ダメージ。死亡時: カードを1枚引く。',
    flavor: '死の叫び声が敵を蝕む。',
    onPlay: (ctx, self) => {
      ctx.damageRandomEnemy(self.owner, 2);
    },
    onDeath: (ctx, self) => {
      ctx.drawCard(self.owner);
    }
  },
  {
    id: 'nc006', name: 'ソウルコンバージョン', craft: 'necro', type: 'spell',
    cost: 1,
    desc: '自軍フォロワー1体を破壊し、カードを2枚引く。',
    flavor: '魂を糧に知識を得る。',
    targeted: true,
    targetFriendly: true,
    effect: (ctx, owner, target) => {
      ctx.destroyFollower(target);
      ctx.drawCard(owner);
      ctx.drawCard(owner);
    }
  },
  {
    id: 'nc007', name: 'リッチ', craft: 'necro', type: 'follower',
    cost: 5, atk: 4, def: 5, maxDef: 5,
    keywords: ['ward'],
    desc: 'ガード。自軍フォロワーが死亡するたびに+1/+1。',
    flavor: '不死の王が全てを支配する。',
    onAllyDeath: (ctx, self, dead) => {
      ctx.buffFollower(self, 1, 1);
    }
  },
  {
    id: 'nc008', name: 'デスサイズ・リーパー', craft: 'necro', type: 'follower',
    cost: 6, atk: 5, def: 5, maxDef: 5,
    keywords: ['bane', 'rush'],
    desc: '必殺・疾走。',
    flavor: '死神の鎌が全てを刈り取る。'
  },

  // ==================== ビショップ (回復・守護テーマ) ====================
  {
    id: 'b001', name: 'イスラーフィール', craft: 'bishop', type: 'follower',
    cost: 8, atk: 7, def: 7, maxDef: 7,
    keywords: ['ward', 'drain'],
    desc: 'ガード・吸血。場に出た時: 自リーダーを5回復。全フォロワーを回復。',
    flavor: '癒しの大天使が舞い降りる。',
    onPlay: (ctx, self) => {
      ctx.healLeader(self.owner, 5);
      ctx.healAllFriendly(self.owner, 2);
    }
  },
  {
    id: 'b002', name: 'ホーリーライト', craft: 'bishop', type: 'spell',
    cost: 1,
    desc: '自リーダーを3回復する。',
    flavor: '聖なる光が傷を癒す。',
    effect: (ctx, owner) => {
      ctx.healLeader(owner, 3);
    }
  },
  {
    id: 'b003', name: 'プリースト・オブ・フュリー', craft: 'bishop', type: 'follower',
    cost: 2, atk: 1, def: 2, maxDef: 2,
    keywords: [],
    desc: '場に出た時: 自リーダーを2回復。自分が回復するたびにカードを1枚引く。',
    flavor: '怒れる司祭の祝福は恵みをもたらす。',
    onPlay: (ctx, self) => {
      ctx.healLeader(self.owner, 2);
    },
    onHeal: (ctx, self) => {
      ctx.drawCard(self.owner);
    }
  },
  {
    id: 'b004', name: 'ロイヤルセラフ', craft: 'bishop', type: 'follower',
    cost: 5, atk: 3, def: 5, maxDef: 5,
    keywords: ['ward'],
    desc: 'ガード。攻撃時: 自リーダーを2回復。',
    flavor: '天上の守護者が盾となる。',
    onAttack: (ctx, self, target) => {
      ctx.healLeader(self.owner, 2);
    }
  },
  {
    id: 'b005', name: '天使の祝福', craft: 'bishop', type: 'spell',
    cost: 2,
    desc: '自軍フォロワー1体に+2/+2と守護を付与する。',
    flavor: '天使の祝福が戦士を強くする。',
    targeted: true,
    targetFriendly: true,
    effect: (ctx, owner, target) => {
      ctx.buffFollower(target, 2, 2);
      ctx.addKeyword(target, 'ward');
    }
  },
  {
    id: 'b006', name: 'セラフ', craft: 'bishop', type: 'amulet',
    cost: 6,
    desc: '自ターン終了時: 自リーダーを2回復。自軍に回復不能フォロワーがいる間は効果が2倍。',
    flavor: '恵みの光が絶えず降り注ぐ。',
    onTurnEnd: (ctx, amulet) => {
      ctx.healLeader(amulet.owner, 2);
    }
  },
  {
    id: 'b007', name: 'キュア・オール', craft: 'bishop', type: 'spell',
    cost: 3,
    desc: '自リーダーを4回復。自軍フォロワー全員を2回復。',
    flavor: '全ての傷を癒す奇跡の光。',
    effect: (ctx, owner) => {
      ctx.healLeader(owner, 4);
      ctx.healAllFriendly(owner, 2);
    }
  },
  {
    id: 'b008', name: 'バニッシュ', craft: 'bishop', type: 'spell',
    cost: 3,
    desc: '相手フォロワー1体を消滅させる(死亡扱いにならない)。',
    flavor: '存在ごと消し去る聖なる力。',
    targeted: true,
    canTargetLeader: false,
    effect: (ctx, owner, target) => {
      ctx.banishFollower(target);
    }
  },

  // ==================== エルフ (自然・多枚テーマ) ====================
  {
    id: 'e001', name: 'アリア', craft: 'elf', type: 'follower',
    cost: 1, atk: 2, def: 1, maxDef: 1,
    keywords: [],
    desc: '場に出た時: デッキからカードを1枚引く。',
    flavor: '森の妖精が知恵を授ける。',
    onPlay: (ctx, self) => {
      ctx.drawCard(self.owner);
    }
  },
  {
    id: 'e002', name: 'フォレストウルフ', craft: 'elf', type: 'follower',
    cost: 2, atk: 2, def: 2, maxDef: 2,
    keywords: ['rush'],
    desc: '疾走。',
    flavor: '森の狼は素早く獲物を仕留める。'
  },
  {
    id: 'e003', name: 'ナテラの大樹', craft: 'elf', type: 'amulet',
    cost: 3,
    desc: '自ターン開始時: カードを1枚引く。自ターン終了時: 相手リーダーに1ダメージ。',
    flavor: '大地の力が宿る聖なる樹。',
    onTurnStart: (ctx, amulet) => {
      ctx.drawCard(amulet.owner);
    },
    onTurnEnd: (ctx, amulet) => {
      ctx.damageLeader(ctx.getEnemy(amulet.owner), 1);
    }
  },
  {
    id: 'e004', name: 'ウィンドブレード・エルフ', craft: 'elf', type: 'follower',
    cost: 3, atk: 3, def: 2, maxDef: 2,
    keywords: [],
    desc: '場に出た時: このターンにカードをプレイした枚数×1ダメージを相手リーダーに与える。',
    flavor: '風の刃で道を切り開く。',
    onPlay: (ctx, self) => {
      let dmg = ctx.getCardsPlayedThisTurn(self.owner);
      if (dmg > 0) ctx.damageLeader(ctx.getEnemy(self.owner), dmg);
    }
  },
  {
    id: 'e005', name: '一陣の風', craft: 'elf', type: 'spell',
    cost: 1,
    desc: 'カードを2枚引く。',
    flavor: '風が知識を運んでくる。',
    effect: (ctx, owner) => {
      ctx.drawCard(owner);
      ctx.drawCard(owner);
    }
  },
  {
    id: 'e006', name: 'マーキュリーイーグル', craft: 'elf', type: 'follower',
    cost: 4, atk: 4, def: 3, maxDef: 3,
    keywords: ['storm', 'rush'],
    desc: '突進・疾走。',
    flavor: '天空を駆ける最速の鷲。'
  },
  {
    id: 'e007', name: 'フェアリーサークル', craft: 'elf', type: 'spell',
    cost: 1,
    desc: 'フェアリーを2体召喚する。',
    flavor: '妖精たちが輪になって踊る。',
    effect: (ctx, owner) => {
      for (let i = 0; i < 2; i++) {
        ctx.summonToken(owner, { id: 'e007_token', name: 'フェアリー', craft: 'elf', type: 'follower', cost: 1, atk: 1, def: 1, maxDef: 1, keywords: [], desc: '', flavor: '' });
      }
    }
  },
  {
    id: 'e008', name: 'スプリングウッド・エルフ', craft: 'elf', type: 'follower',
    cost: 5, atk: 4, def: 4, maxDef: 4,
    keywords: ['ward'],
    desc: 'ガード。自軍フォロワー全員に疾走を付与する(このターンのみ)。',
    flavor: '春の森から現れた守護者。',
    onPlay: (ctx, self) => {
      ctx.grantAllFriendlyRush(self.owner);
    }
  },

  // ==================== ヴァンパイア ====================
  {
    id: 'v001', name: 'ヴァーミン・ハンター', craft: 'vampire', type: 'follower',
    cost: 2, atk: 3, def: 1, maxDef: 1,
    keywords: [],
    desc: '場に出た時: 自リーダーに1ダメージ。自分が受けたダメージ分攻撃力が上がる(このターン)。',
    flavor: '自らを傷つけて力を引き出す狩人。',
    onPlay: (ctx, self) => {
      ctx.damageLeader(self.owner, 1);
      let dmg = ctx.getLeaderDamageTaken(self.owner);
      ctx.buffFollower(self, Math.min(dmg, 5), 0);
    }
  },
  {
    id: 'v002', name: 'ブラッドウルフ', craft: 'vampire', type: 'follower',
    cost: 3, atk: 3, def: 3, maxDef: 3,
    keywords: ['drain'],
    desc: '吸血。自分がダメージを受けた時: 攻撃力+1。',
    flavor: '血を啜るたびに牙が鋭くなる。',
    onDamageTaken: (ctx, self, dmg) => {
      ctx.buffFollower(self, 1, 0);
    }
  },
  {
    id: 'v003', name: 'セクシーヴァンプ', craft: 'vampire', type: 'follower',
    cost: 4, atk: 3, def: 4, maxDef: 4,
    keywords: ['drain', 'bane'],
    desc: '吸血・必殺。',
    flavor: '美しき夜の女王。'
  },
  {
    id: 'v004', name: 'ブラッドバス', craft: 'vampire', type: 'spell',
    cost: 2,
    desc: '自リーダーに2ダメージ。相手フォロワー全体に3ダメージ。',
    flavor: '血の嵐が全てを飲み込む。',
    effect: (ctx, owner) => {
      ctx.damageLeader(owner, 2);
      ctx.damageAllEnemies(owner, 3);
    }
  },
  {
    id: 'v005', name: 'ルシファー', craft: 'vampire', type: 'follower',
    cost: 8, atk: 7, def: 7, maxDef: 7,
    keywords: ['storm', 'drain', 'bane'],
    desc: '突進・吸血・必殺。反逆の堕天使。',
    flavor: '天上より落ちし者の怒りは底知れない。'
  },
  {
    id: 'v006', name: 'ヴァンパイアブリード', craft: 'vampire', type: 'follower',
    cost: 1, atk: 2, def: 1, maxDef: 1,
    keywords: [],
    desc: 'ヴェンジェンス(自リーダーのHPが10以下)時に効果が発動: 突進を得る。',
    flavor: '血の渇望が眠れる力を覚醒させる。',
    getKeywords: (ctx, self) => {
      let keys = [];
      if (ctx.getLeaderHP(self.owner) <= 10) keys.push('rush');
      return keys;
    }
  },
  {
    id: 'v007', name: 'ダークソウル', craft: 'vampire', type: 'spell',
    cost: 3,
    desc: '自リーダーに3ダメージ。その後自リーダーを6回復。ヴェンジェンス中は2ダメージ追加。',
    flavor: '魂を削って力を得る禁術。',
    effect: (ctx, owner) => {
      ctx.damageLeader(owner, 3);
      ctx.healLeader(owner, 6);
      if (ctx.getLeaderHP(owner) <= 10) ctx.damageLeader(ctx.getEnemy(owner), 2);
    }
  },

  // ==================== ネメシス (機械テーマ) ====================
  {
    id: 'nm001', name: 'アーティファクト・コーリング', craft: 'nemesis', type: 'spell',
    cost: 2,
    desc: 'アーティファクトを2体召喚する。',
    flavor: '召喚陣から機械が生み出される。',
    effect: (ctx, owner) => {
      for (let i = 0; i < 2; i++) {
        ctx.summonToken(owner, { id: 'nm001_token', name: 'アーティファクト', craft: 'nemesis', type: 'follower', cost: 1, atk: 1, def: 1, maxDef: 1, keywords: [], desc: '', flavor: '' });
      }
    }
  },
  {
    id: 'nm002', name: 'メカニカルガンナー', craft: 'nemesis', type: 'follower',
    cost: 3, atk: 2, def: 3, maxDef: 3,
    keywords: [],
    desc: '場に出た時: アーティファクトが場にいる数×1ダメージを相手リーダーに与える。',
    flavor: '機械の狙撃手が精密射撃する。',
    onPlay: (ctx, self) => {
      let count = ctx.countFriendlyByName(self.owner, 'アーティファクト');
      if (count > 0) ctx.damageLeader(ctx.getEnemy(self.owner), count);
    }
  },
  {
    id: 'nm003', name: 'ギアゴーレム', craft: 'nemesis', type: 'follower',
    cost: 4, atk: 4, def: 4, maxDef: 4,
    keywords: ['ward'],
    desc: 'ガード。死亡時: アーティファクトを2体召喚する。',
    flavor: '歯車が絡み合う鉄の巨人。',
    onDeath: (ctx, self) => {
      for (let i = 0; i < 2; i++) {
        ctx.summonToken(self.owner, { id: 'nm003_token', name: 'アーティファクト', craft: 'nemesis', type: 'follower', cost: 1, atk: 1, def: 1, maxDef: 1, keywords: [], desc: '', flavor: '' });
      }
    }
  },
  {
    id: 'nm004', name: 'オーバーヒート', craft: 'nemesis', type: 'spell',
    cost: 3,
    desc: '相手フォロワー全体に2ダメージ。自軍アーティファクトの数だけ追加ダメージ。',
    flavor: '過熱した機械が爆発する。',
    effect: (ctx, owner) => {
      let bonus = ctx.countFriendlyByName(owner, 'アーティファクト');
      ctx.damageAllEnemies(owner, 2 + bonus);
    }
  },
  {
    id: 'nm005', name: 'プロジェクト・プロテウス', craft: 'nemesis', type: 'follower',
    cost: 6, atk: 5, def: 6, maxDef: 6,
    keywords: ['storm'],
    desc: '突進。場に出た時: アーティファクトを3体召喚する。',
    flavor: '究極の機械兵器が目覚める。',
    onPlay: (ctx, self) => {
      for (let i = 0; i < 3; i++) {
        ctx.summonToken(self.owner, { id: 'nm005_token', name: 'アーティファクト', craft: 'nemesis', type: 'follower', cost: 1, atk: 1, def: 1, maxDef: 1, keywords: [], desc: '', flavor: '' });
      }
    }
  },

  // ==================== ニュートラル追加 ====================
  {
    id: 'n016', name: '聖なる盾の騎士', craft: 'neutral', type: 'follower',
    cost: 4, atk: 2, def: 6, maxDef: 6,
    keywords: ['ward'],
    desc: 'ガード。攻撃を受けた後: 失ったHP分自リーダーを回復する。',
    flavor: '盾は折れず、魂も折れない。',
    onDamageTaken: (ctx, self, dmg) => {
      ctx.healLeader(self.owner, dmg);
    }
  },
  {
    id: 'n017', name: 'サンダーバード', craft: 'neutral', type: 'follower',
    cost: 5, atk: 4, def: 4, maxDef: 4,
    keywords: ['storm'],
    desc: '突進。場に出た時: 相手フォロワー1体に2ダメージ。',
    flavor: '雷を纏う伝説の鳥。',
    onPlay: (ctx, self) => {
      ctx.damageRandomEnemy(self.owner, 2);
    }
  },
  {
    id: 'n018', name: 'ミニゴブリンメイジ', craft: 'neutral', type: 'follower',
    cost: 1, atk: 1, def: 1, maxDef: 1,
    keywords: [],
    desc: '場に出た時: デッキからコスト1のカードを1枚引く。',
    flavor: '小さな魔法使いが秘術を探す。',
    onPlay: (ctx, self) => {
      ctx.drawCardByCost(self.owner, 1);
    }
  },
  {
    id: 'n019', name: 'ヴォルカニックドラゴン', craft: 'neutral', type: 'follower',
    cost: 7, atk: 7, def: 6, maxDef: 6,
    keywords: ['storm'],
    desc: '突進。場に出た時: 相手フォロワー全体に2ダメージ。',
    flavor: '噴火の竜が大地を揺るがす。',
    onPlay: (ctx, self) => {
      ctx.damageAllEnemies(self.owner, 2);
    }
  },
  {
    id: 'n020', name: 'ライフドレイン', craft: 'neutral', type: 'spell',
    cost: 3,
    desc: '相手リーダーに3ダメージ。自リーダーを3回復。',
    flavor: '命を奪い、命を補う。',
    effect: (ctx, owner) => {
      ctx.damageLeader(ctx.getEnemy(owner), 3);
      ctx.healLeader(owner, 3);
    }
  }
];

// =============================================
// サンプルデッキ定義 (各20枚)
// =============================================
const SampleDecks = [
  {
    name: '騎士の誓い',
    craft: 'royal',
    desc: '強力な騎士たちでフィールドを制圧するロイヤルデッキ。ガードと号令で圧倒する。',
    color: '#c8a200',
    leader: { name: 'ローラン王', hp: 20, maxHp: 20 },
    cards: [
      'r004', 'r004', 'r004',   // 剣士 x3
      'r010', 'r010',           // ホーリーファルコン x2
      'r003', 'r003', 'r003',   // 近衛騎士 x3
      'r006', 'r006',           // ランサー x2
      'r007', 'r007',           // 戦列弓兵 x2
      'r008', 'r008',           // 王国の号令 x2
      'r009',                   // ロイヤルフラッグ x1
      'r005', 'r005',           // ホワイトパラディン x2
      'r002',                   // アルベール x1
      'r001',                   // オーレリア x1
    ]
  },
  {
    name: '炎の魔法書',
    craft: 'witch',
    desc: 'スペルでボードをコントロールするウィッチデッキ。スペルブーストで強化していく。',
    color: '#8800cc',
    leader: { name: '魔法使いリネア', hp: 20, maxHp: 20 },
    cards: [
      'w008', 'w008', 'w008',   // 雷撃の魔法 x3
      'w002', 'w002',           // スターリット・アストロロジャー x2
      'w010', 'w010',           // フロストスパイク x2
      'w003', 'w003', 'w003',   // ファイアーボール x3
      'w006', 'w006',           // ルーンブレード・サモナー x2
      'w007', 'w007',           // スペルブースト・マジシャン x2
      'w004', 'w004',           // ブリザード x2
      'w005',                   // サモン・スケルトン x1
      'w009',                   // マナサークル x1
      'w001',                   // アリサ x1
                                // 計20
    ]
  },
  {
    name: '竜の咆哮',
    craft: 'dragon',
    desc: 'PPを加速してビッグドラゴンを早出しするドラゴンデッキ。後半が圧倒的に強い。',
    color: '#cc4400',
    leader: { name: 'ドラゴンマスター竜牙', hp: 20, maxHp: 20 },
    cards: [
      'd007', 'd007', 'd007',   // ドラゴナイト x3
      'd002', 'd002',           // ドラゴニュート・シャーマン x2
      'd003', 'd003',           // ドラゴンブレス x2
      'd004', 'd004',           // ランページドラゴン x2
      'd006', 'd006',           // ファフニール x2
      'd008',                   // ウォータードラゴン x1
      'd005', 'd005',           // ガイアドラゴン x2
      'n010', 'n010',           // ドラゴンライダー x2
      'd001',                   // ジェネシスドラゴン x1
      'n017', 'n017',           // サンダーバード x2
                                // 計20
    ]
  },
  {
    name: '死者の行進',
    craft: 'necro',
    desc: '仲間の死を利用して墓場を肥やしネクロマンサーの力を引き出す。',
    color: '#5500aa',
    leader: { name: '死霊術師デス', hp: 20, maxHp: 20 },
    cards: [
      'nc003', 'nc003', 'nc003', // スケルトンウォリアー x3
      'nc005', 'nc005',          // バンシー x2
      'nc006', 'nc006',          // ソウルコンバージョン x2
      'nc004', 'nc004',          // ネクロマンサー x2
      'nc007', 'nc007',          // リッチ x2
      'nc008', 'nc008',          // デスサイズ・リーパー x2
      'nc002', 'nc002',          // ゾンビパーティー x2
      'n004', 'n004',            // ゾンビ x2
      'nc001',                   // サハクィエル x1
      'n009', 'n009',            // バシリスク x2
                                 // 計22...修正
    ].slice(0, 20)
  },
  {
    name: '天使の祝福',
    craft: 'bishop',
    desc: '回復を繰り返しながら守護で固めるビショップデッキ。長期戦向き。',
    color: '#aaaa00',
    leader: { name: '大神官セラフィナ', hp: 20, maxHp: 20 },
    cards: [
      'b002', 'b002', 'b002',   // ホーリーライト x3
      'b003', 'b003',           // プリースト・オブ・フュリー x2
      'b005', 'b005',           // 天使の祝福 x2
      'b004', 'b004',           // ロイヤルセラフ x2
      'b007', 'b007',           // キュア・オール x2
      'b008', 'b008',           // バニッシュ x2
      'n005', 'n005',           // ストーンゴーレム x2
      'b006',                   // セラフ x1
      'b001',                   // イスラーフィール x1
      'n015', 'n015',           // ダークナイト x2
      'n016',                   // 聖なる盾の騎士 x1
                                // 計20
    ]
  },
  {
    name: '森のエルフ',
    craft: 'elf',
    desc: 'カードを大量に引いて速攻を仕掛けるアグロエルフデッキ。',
    color: '#00aa44',
    leader: { name: 'エルフ王アリア', hp: 20, maxHp: 20 },
    cards: [
      'e001', 'e001', 'e001',   // アリア x3
      'e005', 'e005', 'e005',   // 一陣の風 x3
      'e007', 'e007',           // フェアリーサークル x2
      'e002', 'e002',           // フォレストウルフ x2
      'e004', 'e004',           // ウィンドブレード・エルフ x2
      'n002', 'n002',           // コボルト x2
      'e006', 'e006',           // マーキュリーイーグル x2
      'e003',                   // ナテラの大樹 x1
      'e008',                   // スプリングウッド・エルフ x1
      'n010', 'n010',           // ドラゴンライダー x2 (突進)
                                // 計22...修正
    ].slice(0, 20)
  },
  {
    name: '血の渇望',
    craft: 'vampire',
    desc: '自分にダメージを与えながら強くなるヴァンパイアデッキ。ヴェンジェンスで覚醒。',
    color: '#cc0022',
    leader: { name: '吸血鬼ヴァルター', hp: 20, maxHp: 20 },
    cards: [
      'v006', 'v006', 'v006',   // ヴァンパイアブリード x3
      'v001', 'v001',           // ヴァーミン・ハンター x2
      'v004', 'v004',           // ブラッドバス x2
      'v002', 'v002',           // ブラッドウルフ x2
      'v007', 'v007',           // ダークソウル x2
      'v003', 'v003',           // セクシーヴァンプ x2
      'n008', 'n008',           // フェニックス x2
      'n009', 'n009',           // バシリスク x2
      'v005',                   // ルシファー x1
      'n020',                   // ライフドレイン x1
      'n015',                   // ダークナイト x1
                                // 計20
    ]
  },
  {
    name: '機械の軍勢',
    craft: 'nemesis',
    desc: 'アーティファクトを量産してボードを埋め尽くすネメシスデッキ。',
    color: '#005588',
    leader: { name: '機械皇帝ゼウス', hp: 20, maxHp: 20 },
    cards: [
      'nm001', 'nm001', 'nm001', // アーティファクト・コーリング x3
      'nm002', 'nm002',          // メカニカルガンナー x2
      'nm003', 'nm003',          // ギアゴーレム x2
      'nm004', 'nm004',          // オーバーヒート x2
      'nm005', 'nm005',          // プロジェクト・プロテウス x2
      'n003', 'n003', 'n003',    // マウンテンジャイアント x3
      'n005', 'n005',            // ストーンゴーレム x2
      'n017', 'n017',            // サンダーバード x2
                                 // 計20
    ]
  }
];
