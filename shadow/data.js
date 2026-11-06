// ==================================================
// data.js — データ定義ファイル
// スタイル・フォント・画像・サウンド・シークレット・スペース
// ==================================================

let Style = {
    iPhone: {
        "width": "393px",
    },
    ki: {
        "back":  "#000000",
        "bor":   "#ffffff",
        "aima":  "#808080"
    },
    tekiou: function () {
        for (let section in this) {
            if (section == 'tekiou') continue;
            for (let key in this[section]) {
                document.documentElement.style.setProperty(`--${section}-${key}`, this[section][key]);
            }
        }
    }
};

const Fonts = [
    { src: 'comicsans', type: 'ttf' },
    { src: 'papyrus',   type: 'ttf' },
    { src: 'cube12',    type: 'ttf' },
];

const Images = {
    systems: ['error'],
};

const Sounds = {
    // se: ['error'],
};

const Secrates = [
    {
        ind: 0, name: 'koppepan',
        arr: ['k','o','p','p','e','p','a','n'], limit: 3,
        func: async function () { nicoText('なんにも起こらない＝ヨーン'); }
    },
    {
        ind: 0, name: 're',
        arr: ['r','e'], limit: 1,
        func: async function () {
            let img = document.createElement('img');
            img.id = 'hakaisatsu';
            img.src = 'assets/images/systems/hakai_1.png';
            img.dataset.phase = 1;
            document.querySelector('body').appendChild(img);
            setTimeout(() => { img.remove(); this.ind = 0; this.limit = 1; }, 3000);
            return 0;
        }
    },
    {
        ind: 0, name: 'rere',
        arr: ['r','e','r','e'], limit: 1,
        func: async function () {
            let img = document.getElementById('hakaisatsu');
            if (!img) return;
            img.src = 'assets/images/systems/hakai_2.png';
            img.dataset.phase = 2;
            setTimeout(() => { img.remove(); this.ind = 0; this.limit = 1; }, 3000);
            return 0;
        }
    },
    {
        ind: 0, name: 'rerere',
        arr: ['r','e','r','e','r','e'], limit: 1,
        func: async function () {
            let img = document.getElementById('hakaisatsu');
            if (!img) return 1;
            if (img.dataset.phase != '2') return 1;
            location.reload();
        }
    }
];

const Spaces = [
    { name: 'home',   rank: 2, back: '#0a0a1a', sho: 1 },
    { name: 'battle', rank: 3, back: '#0a0a1a', sho: 0 },
];

// ==================================================
// カードDB — シャドウバース風カードデータ
// type: 'follower' / 'spell' / 'amulet'
// keywords: ward / storm / rush / drain / bane / ambush
// ==================================================
const CardDB = [

    // ======== ニュートラル ========
    {
        id:'n001', name:'ゴブリン', craft:'neutral', type:'follower',
        cost:1, atk:1, def:2, maxDef:2, keywords:[],
        desc:'バニラフォロワー。', flavor:'どこにでもいる、ありふれたゴブリン。'
    },
    {
        id:'n002', name:'コボルト', craft:'neutral', type:'follower',
        cost:1, atk:2, def:1, maxDef:1, keywords:[],
        desc:'攻撃特化の小型フォロワー。', flavor:'素早く鋭い爪を持つ小さな戦士。'
    },
    {
        id:'n003', name:'マウンテンジャイアント', craft:'neutral', type:'follower',
        cost:2, atk:2, def:3, maxDef:3, keywords:[],
        desc:'2コストにして3/3。', flavor:'山を揺るがす巨大な存在。'
    },
    {
        id:'n004', name:'ゾンビ', craft:'neutral', type:'follower',
        cost:2, atk:2, def:2, maxDef:2, keywords:[],
        desc:'死亡時: デッキからゾンビを1枚引く。', flavor:'死してなお、彷徨い続ける。',
        onDeath:(ctx,s)=>{ ctx.drawCardByName(s.owner,'ゾンビ'); }
    },
    {
        id:'n005', name:'ストーンゴーレム', craft:'neutral', type:'follower',
        cost:3, atk:3, def:4, maxDef:4, keywords:['ward'],
        desc:'ガード。', flavor:'石の体で仲間を守る守護者。'
    },
    {
        id:'n006', name:'スライム', craft:'neutral', type:'follower',
        cost:1, atk:1, def:1, maxDef:1, keywords:[],
        desc:'場に出た時: スライムを1体追加召喚する。', flavor:'ぷよぷよ。',
        onPlay:(ctx,s)=>{ ctx.summonToken(s.owner,{id:'n006t',name:'スライム',craft:'neutral',type:'follower',cost:1,atk:1,def:1,maxDef:1,keywords:[],desc:'',flavor:''}); }
    },
    {
        id:'n007', name:'ケルベロス', craft:'neutral', type:'follower',
        cost:4, atk:3, def:3, maxDef:3, keywords:['rush'],
        desc:'疾走。', flavor:'三つ首の番犬が解き放たれた。'
    },
    {
        id:'n008', name:'フェニックス', craft:'neutral', type:'follower',
        cost:5, atk:4, def:3, maxDef:3, keywords:['drain'],
        desc:'吸血。', flavor:'炎の翼は不滅の命を宿す。'
    },
    {
        id:'n009', name:'バシリスク', craft:'neutral', type:'follower',
        cost:3, atk:2, def:2, maxDef:2, keywords:['bane'],
        desc:'必殺。攻撃したフォロワーを破壊する。', flavor:'その瞳に映れば即死。'
    },
    {
        id:'n010', name:'ドラゴンライダー', craft:'neutral', type:'follower',
        cost:6, atk:5, def:5, maxDef:5, keywords:['storm'],
        desc:'突進。召喚時すぐに攻撃できる。', flavor:'天を駆ける騎士と竜の絆。'
    },
    {
        id:'n011', name:'ヒーリングエンジェル', craft:'neutral', type:'follower',
        cost:2, atk:1, def:1, maxDef:1, keywords:[],
        desc:'場に出た時: 自リーダーを2回復。', flavor:'癒しの光で傷を癒す天使。',
        onPlay:(ctx,s)=>{ ctx.healLeader(s.owner,2); }
    },
    {
        id:'n012', name:'ゴーストライダー', craft:'neutral', type:'follower',
        cost:3, atk:3, def:2, maxDef:2, keywords:['ambush'],
        desc:'潜伏。自分から攻撃するまで対象にならない。', flavor:'幽霊の騎士は誰にも見えない。'
    },
    {
        id:'n013', name:'ファイアーエレメンタル', craft:'neutral', type:'follower',
        cost:4, atk:4, def:2, maxDef:2, keywords:[],
        desc:'場に出た時: 相手フォロワー1体に2ダメージ。', flavor:'炎の精霊が宿る力。',
        onPlay:(ctx,s)=>{ ctx.damageRandomEnemy(s.owner,2); }
    },
    {
        id:'n014', name:'アイスエレメンタル', craft:'neutral', type:'follower',
        cost:3, atk:2, def:3, maxDef:3, keywords:[],
        desc:'場に出た時: 相手フォロワー1体を凍結する。', flavor:'氷の精霊が動きを封じる。',
        onPlay:(ctx,s)=>{ ctx.freezeRandomEnemy(s.owner); }
    },
    {
        id:'n015', name:'ダークナイト', craft:'neutral', type:'follower',
        cost:5, atk:4, def:4, maxDef:4, keywords:['ward','drain'],
        desc:'ガード・吸血。守りながら回復する。', flavor:'闇の騎士は倒れない。'
    },
    {
        id:'n016', name:'聖なる盾の騎士', craft:'neutral', type:'follower',
        cost:4, atk:2, def:6, maxDef:6, keywords:['ward'],
        desc:'ガード。ダメージを受けた時: その分自リーダーを回復。', flavor:'盾は折れず、魂も折れない。',
        onDamageTaken:(ctx,s,d)=>{ ctx.healLeader(s.owner,d); }
    },
    {
        id:'n017', name:'サンダーバード', craft:'neutral', type:'follower',
        cost:5, atk:4, def:4, maxDef:4, keywords:['storm'],
        desc:'突進。場に出た時: 相手フォロワー1体に2ダメージ。', flavor:'雷を纏う伝説の鳥。',
        onPlay:(ctx,s)=>{ ctx.damageRandomEnemy(s.owner,2); }
    },
    {
        id:'n018', name:'ミニゴブリンメイジ', craft:'neutral', type:'follower',
        cost:1, atk:1, def:1, maxDef:1, keywords:[],
        desc:'場に出た時: デッキからコスト1のカードを1枚引く。', flavor:'小さな魔法使いが秘術を探す。',
        onPlay:(ctx,s)=>{ ctx.drawCardByCost(s.owner,1); }
    },
    {
        id:'n019', name:'ヴォルカニックドラゴン', craft:'neutral', type:'follower',
        cost:7, atk:7, def:6, maxDef:6, keywords:['storm'],
        desc:'突進。場に出た時: 相手フォロワー全体に2ダメージ。', flavor:'噴火の竜が大地を揺るがす。',
        onPlay:(ctx,s)=>{ ctx.damageAllEnemies(s.owner,2); }
    },
    {
        id:'n020', name:'ライフドレイン', craft:'neutral', type:'spell',
        cost:3,
        desc:'相手リーダーに3ダメージ。自リーダーを3回復。', flavor:'命を奪い、命を補う。',
        effect:(ctx,o)=>{ ctx.damageLeader(ctx.getEnemy(o),3); ctx.healLeader(o,3); }
    },

    // ======== ロイヤル ========
    {
        id:'r001', name:'ロイヤルセイバー・オーレリア', craft:'royal', type:'follower',
        cost:7, atk:5, def:5, maxDef:5, keywords:['ward','storm'],
        desc:'ガード・突進。場に出た時: 自軍フォロワー全員+1/+1。', flavor:'剣聖の名を冠する最強の騎士。',
        onPlay:(ctx,s)=>{ ctx.buffAllFriendly(s.owner,1,1); }
    },
    {
        id:'r002', name:'アルベール', craft:'royal', type:'follower',
        cost:5, atk:4, def:4, maxDef:4, keywords:['storm'],
        desc:'突進。相手リーダーに攻撃した場合、もう1回攻撃できる。', flavor:'天才剣士の剣は止まらない。',
        multiAttack:true
    },
    {
        id:'r003', name:'近衛騎士', craft:'royal', type:'follower',
        cost:2, atk:2, def:2, maxDef:2, keywords:['ward'],
        desc:'ガード。', flavor:'王を守護する精鋭の騎士。'
    },
    {
        id:'r004', name:'剣士', craft:'royal', type:'follower',
        cost:1, atk:2, def:1, maxDef:1, keywords:[],
        desc:'場に出た時: 兵士1体を召喚する。', flavor:'戦場の最前線に立つ兵士。',
        onPlay:(ctx,s)=>{ ctx.summonToken(s.owner,{id:'r004t',name:'兵士',craft:'royal',type:'follower',cost:1,atk:1,def:1,maxDef:1,keywords:[],desc:'',flavor:''}); }
    },
    {
        id:'r005', name:'ホワイトパラディン', craft:'royal', type:'follower',
        cost:4, atk:3, def:4, maxDef:4, keywords:['ward','drain'],
        desc:'ガード・吸血。', flavor:'白の聖騎士は不滅の盾。'
    },
    {
        id:'r006', name:'ランサー', craft:'royal', type:'follower',
        cost:3, atk:3, def:3, maxDef:3, keywords:['rush'],
        desc:'疾走。', flavor:'槍を構えた突撃兵。'
    },
    {
        id:'r007', name:'戦列弓兵', craft:'royal', type:'follower',
        cost:2, atk:1, def:2, maxDef:2, keywords:[],
        desc:'場に出た時: 相手フォロワー1体に1ダメージ。', flavor:'遠距離から的確に射抜く。',
        onPlay:(ctx,s)=>{ ctx.damageRandomEnemy(s.owner,1); }
    },
    {
        id:'r008', name:'王国の号令', craft:'royal', type:'spell',
        cost:3,
        desc:'自軍全体+1/+1。ロイヤルフォロワーがいれば+2/+2。', flavor:'王の声が戦場を鼓舞する。',
        effect:(ctx,o)=>{ let b=ctx.hasCraftFollower(o,'royal')?2:1; ctx.buffAllFriendly(o,b,b); }
    },
    {
        id:'r009', name:'ロイヤルフラッグ', craft:'royal', type:'amulet',
        cost:2,
        desc:'自軍フォロワーが場に出るたびに+1/+1を付与する。', flavor:'王旗の元に集う勇者たち。',
        onAllySummon:(ctx,a,summoned)=>{ ctx.buffFollower(summoned,1,1); }
    },
    {
        id:'r010', name:'ホーリーファルコン', craft:'royal', type:'follower',
        cost:2, atk:2, def:1, maxDef:1, keywords:['storm'],
        desc:'突進。場に出た時: 自リーダーを1回復。', flavor:'聖なる鷹が救いをもたらす。',
        onPlay:(ctx,s)=>{ ctx.healLeader(s.owner,1); }
    },

    // ======== ウィッチ ========
    {
        id:'w001', name:'アリサ・フロストウィーバー', craft:'witch', type:'follower',
        cost:6, atk:5, def:4, maxDef:4, keywords:[],
        desc:'場に出た時: スペルを2枚引く。', flavor:'氷の魔法使いが紡ぐ絶対零度。',
        onPlay:(ctx,s)=>{ ctx.drawSpellCards(s.owner,2); }
    },
    {
        id:'w002', name:'スターリット・アストロロジャー', craft:'witch', type:'follower',
        cost:2, atk:2, def:2, maxDef:2, keywords:[],
        desc:'場に出た時: スペルを1枚引く。', flavor:'星の動きが全てを教えてくれる。',
        onPlay:(ctx,s)=>{ ctx.drawSpellCards(s.owner,1); }
    },
    {
        id:'w003', name:'ファイアーボール', craft:'witch', type:'spell',
        cost:2, targeted:true, canTargetLeader:true,
        desc:'相手フォロワー1体またはリーダーに3ダメージ。', flavor:'燃え盛る炎の球。',
        effect:(ctx,o,t)=>{ ctx.dealDamage(t,3,o); }
    },
    {
        id:'w004', name:'ブリザード', craft:'witch', type:'spell',
        cost:3,
        desc:'相手フォロワー全体に2ダメージ。', flavor:'猛吹雪が全てを凍らせる。',
        effect:(ctx,o)=>{ ctx.damageAllEnemies(o,2); }
    },
    {
        id:'w005', name:'サモン・スケルトン', craft:'witch', type:'spell',
        cost:2,
        desc:'スケルトンを2体召喚する。', flavor:'死者を使役する禁断の魔法。',
        effect:(ctx,o)=>{ for(let i=0;i<2;i++) ctx.summonToken(o,{id:'w005t',name:'スケルトン',craft:'witch',type:'follower',cost:1,atk:1,def:1,maxDef:1,keywords:[],desc:'',flavor:''}); }
    },
    {
        id:'w006', name:'ルーンブレード・サモナー', craft:'witch', type:'follower',
        cost:3, atk:2, def:3, maxDef:3, keywords:[],
        desc:'場に出た時: 相手1体に1ダメージ。自分がスペルを使うたびに+1/+0。', flavor:'ルーン文字が剣を強くする。',
        onPlay:(ctx,s)=>{ ctx.damageRandomEnemy(s.owner,1); },
        onAllySpell:(ctx,s)=>{ ctx.buffFollower(s,1,0); }
    },
    {
        id:'w007', name:'スペルブースト・マジシャン', craft:'witch', type:'follower',
        cost:4, atk:3, def:3, maxDef:3, keywords:[],
        desc:'自分がスペルを使うたびに+1/+1。', flavor:'魔法が力に変わる。',
        onAllySpell:(ctx,s)=>{ ctx.buffFollower(s,1,1); }
    },
    {
        id:'w008', name:'雷撃の魔法', craft:'witch', type:'spell',
        cost:1, targeted:true, canTargetLeader:false,
        desc:'相手フォロワー1体に2ダメージ。', flavor:'稲妻が標的を貫く。',
        effect:(ctx,o,t)=>{ ctx.dealDamage(t,2,o); }
    },
    {
        id:'w009', name:'マナサークル', craft:'witch', type:'amulet',
        cost:2, reduceSpellCost:1, destroyAtTurnEnd:true,
        desc:'スペルのコストを1減らす。自ターン終了時に破壊される。', flavor:'マナが濃縮された魔法陣。'
    },
    {
        id:'w010', name:'フロストスパイク', craft:'witch', type:'spell',
        cost:2, targeted:true, canTargetLeader:false,
        desc:'相手フォロワー1体を凍結(1ターン攻撃不可)＋2ダメージ。', flavor:'氷の刃が敵を貫く。',
        effect:(ctx,o,t)=>{ ctx.freezeFollower(t); ctx.dealDamage(t,2,o); }
    },

    // ======== ドラゴン ========
    {
        id:'d001', name:'ジェネシスドラゴン', craft:'dragon', type:'follower',
        cost:9, atk:8, def:8, maxDef:8, keywords:['storm','drain','ward'],
        desc:'突進・吸血・ガード。ゲームが終わる切り札。', flavor:'創世の竜が目覚めし時、全てが終わる。'
    },
    {
        id:'d002', name:'ドラゴニュート・シャーマン', craft:'dragon', type:'follower',
        cost:3, atk:2, def:3, maxDef:3, keywords:[],
        desc:'場に出た時: PPを1増やす(永続)。', flavor:'ドラゴンの力を操るシャーマン。',
        onPlay:(ctx,s)=>{ ctx.increasePPMax(s.owner,1); }
    },
    {
        id:'d003', name:'ドラゴンブレス', craft:'dragon', type:'spell',
        cost:3, targeted:true, canTargetLeader:false,
        desc:'相手フォロワー1体に4ダメージ。', flavor:'竜の吐息に逃げ場はない。',
        effect:(ctx,o,t)=>{ ctx.dealDamage(t,4,o); }
    },
    {
        id:'d004', name:'ランページドラゴン', craft:'dragon', type:'follower',
        cost:5, atk:5, def:4, maxDef:4, keywords:['rush'],
        desc:'疾走。最大PP7以上の時: 突進も得る。', flavor:'怒り狂う竜を止められるものはいない。',
        getKeywords:(ctx,s)=>{ let k=['rush']; if(ctx.getMaxPP(s.owner)>=7) k.push('storm'); return k; }
    },
    {
        id:'d005', name:'ガイア・ドラゴン', craft:'dragon', type:'follower',
        cost:7, atk:6, def:6, maxDef:6, keywords:['ward'],
        desc:'ガード。場に出た時: 相手フォロワー全体に3ダメージ。', flavor:'大地を揺るがす大竜の咆哮。',
        onPlay:(ctx,s)=>{ ctx.damageAllEnemies(s.owner,3); }
    },
    {
        id:'d006', name:'ファフニール', craft:'dragon', type:'follower',
        cost:4, atk:4, def:3, maxDef:3, keywords:[],
        desc:'場に出た時: 最大PP7以上なら相手リーダーに3ダメージ。', flavor:'呪われた竜の怒りは苛烈。',
        onPlay:(ctx,s)=>{ if(ctx.getMaxPP(s.owner)>=7) ctx.damageLeader(ctx.getEnemy(s.owner),3); }
    },
    {
        id:'d007', name:'ドラゴナイト', craft:'dragon', type:'follower',
        cost:2, atk:2, def:2, maxDef:2, keywords:[],
        desc:'場に出た時: PPを1増やす(このターンのみ)。', flavor:'竜の血を引く戦士。',
        onPlay:(ctx,s)=>{ ctx.gainPPThisTurn(s.owner,1); }
    },
    {
        id:'d008', name:'ウォータードラゴン', craft:'dragon', type:'follower',
        cost:6, atk:5, def:5, maxDef:5, keywords:['drain'],
        desc:'吸血。攻撃時: 相手フォロワー全体に1ダメージ。', flavor:'波濤の竜が嵐を引き起こす。',
        onAttack:(ctx,s,t)=>{ ctx.damageAllEnemies(s.owner,1); }
    },

    // ======== ネクロマンサー ========
    {
        id:'nc001', name:'サハクィエル', craft:'necro', type:'follower',
        cost:7, atk:6, def:6, maxDef:6, keywords:['storm'],
        desc:'突進。場に出た時: 墓場のカード数だけ相手リーダーにダメージ(最大8)。', flavor:'天使と悪魔の融合体が覚醒する。',
        onPlay:(ctx,s)=>{ let d=Math.min(ctx.getGraveyard(s.owner).length,8); if(d>0) ctx.damageLeader(ctx.getEnemy(s.owner),d); }
    },
    {
        id:'nc002', name:'ゾンビパーティー', craft:'necro', type:'spell',
        cost:3,
        desc:'墓場のフォロワーをコスト3以下で1体復活させる。', flavor:'死者は眠らない。',
        effect:(ctx,o)=>{ ctx.reanimateBestFollower(o,3); }
    },
    {
        id:'nc003', name:'スケルトンウォリアー', craft:'necro', type:'follower',
        cost:2, atk:2, def:2, maxDef:2, keywords:[],
        desc:'死亡時: スケルトンを1体召喚する。', flavor:'骨の戦士は倒れても立ち上がる。',
        onDeath:(ctx,s)=>{ ctx.summonToken(s.owner,{id:'nc003t',name:'スケルトン',craft:'necro',type:'follower',cost:1,atk:1,def:1,maxDef:1,keywords:[],desc:'',flavor:''}); }
    },
    {
        id:'nc004', name:'ネクロマンサー', craft:'necro', type:'follower',
        cost:4, atk:3, def:4, maxDef:4, keywords:[],
        desc:'場に出た時: 墓場2枚ごとにスケルトンを1体召喚(最大3体)。', flavor:'死を操る者。',
        onPlay:(ctx,s)=>{ let n=Math.min(Math.floor(ctx.getGraveyard(s.owner).length/2),3); for(let i=0;i<n;i++) ctx.summonToken(s.owner,{id:'nc004t',name:'スケルトン',craft:'necro',type:'follower',cost:1,atk:1,def:1,maxDef:1,keywords:[],desc:'',flavor:''}); }
    },
    {
        id:'nc005', name:'バンシー', craft:'necro', type:'follower',
        cost:3, atk:2, def:2, maxDef:2, keywords:[],
        desc:'場に出た時: 相手1体に2ダメージ。死亡時: カードを1枚引く。', flavor:'死の叫び声が敵を蝕む。',
        onPlay:(ctx,s)=>{ ctx.damageRandomEnemy(s.owner,2); },
        onDeath:(ctx,s)=>{ ctx.drawCard(s.owner); }
    },
    {
        id:'nc006', name:'ソウルコンバージョン', craft:'necro', type:'spell',
        cost:1, targeted:true, targetFriendly:true,
        desc:'自軍フォロワー1体を破壊し、カードを2枚引く。', flavor:'魂を糧に知識を得る。',
        effect:(ctx,o,t)=>{ ctx.destroyFollower(t); ctx.drawCard(o); ctx.drawCard(o); }
    },
    {
        id:'nc007', name:'リッチ', craft:'necro', type:'follower',
        cost:5, atk:4, def:5, maxDef:5, keywords:['ward'],
        desc:'ガード。自軍フォロワーが死亡するたびに+1/+1。', flavor:'不死の王が全てを支配する。',
        onAllyDeath:(ctx,s,d)=>{ ctx.buffFollower(s,1,1); }
    },
    {
        id:'nc008', name:'デスサイズ・リーパー', craft:'necro', type:'follower',
        cost:6, atk:5, def:5, maxDef:5, keywords:['bane','rush'],
        desc:'必殺・疾走。', flavor:'死神の鎌が全てを刈り取る。'
    },

    // ======== ビショップ ========
    {
        id:'b001', name:'イスラーフィール', craft:'bishop', type:'follower',
        cost:8, atk:7, def:7, maxDef:7, keywords:['ward','drain'],
        desc:'ガード・吸血。場に出た時: 自リーダーを5回復、自軍フォロワーを2回復。', flavor:'癒しの大天使が舞い降りる。',
        onPlay:(ctx,s)=>{ ctx.healLeader(s.owner,5); ctx.healAllFriendly(s.owner,2); }
    },
    {
        id:'b002', name:'ホーリーライト', craft:'bishop', type:'spell',
        cost:1,
        desc:'自リーダーを3回復する。', flavor:'聖なる光が傷を癒す。',
        effect:(ctx,o)=>{ ctx.healLeader(o,3); }
    },
    {
        id:'b003', name:'プリースト・オブ・フュリー', craft:'bishop', type:'follower',
        cost:2, atk:1, def:2, maxDef:2, keywords:[],
        desc:'場に出た時: 自リーダーを2回復。自分が回復するたびカードを1枚引く。', flavor:'怒れる司祭の祝福は恵みをもたらす。',
        onPlay:(ctx,s)=>{ ctx.healLeader(s.owner,2); },
        onHeal:(ctx,s)=>{ ctx.drawCard(s.owner); }
    },
    {
        id:'b004', name:'ロイヤルセラフ', craft:'bishop', type:'follower',
        cost:5, atk:3, def:5, maxDef:5, keywords:['ward'],
        desc:'ガード。攻撃時: 自リーダーを2回復。', flavor:'天上の守護者が盾となる。',
        onAttack:(ctx,s,t)=>{ ctx.healLeader(s.owner,2); }
    },
    {
        id:'b005', name:'天使の祝福', craft:'bishop', type:'spell',
        cost:2, targeted:true, targetFriendly:true,
        desc:'自軍フォロワー1体に+2/+2とガードを付与する。', flavor:'天使の祝福が戦士を強くする。',
        effect:(ctx,o,t)=>{ ctx.buffFollower(t,2,2); ctx.addKeyword(t,'ward'); }
    },
    {
        id:'b006', name:'セラフ', craft:'bishop', type:'amulet',
        cost:6,
        desc:'自ターン終了時: 自リーダーを2回復。', flavor:'恵みの光が絶えず降り注ぐ。',
        onTurnEnd:(ctx,a)=>{ ctx.healLeader(a.owner,2); }
    },
    {
        id:'b007', name:'キュア・オール', craft:'bishop', type:'spell',
        cost:3,
        desc:'自リーダーを4回復。自軍フォロワー全員を2回復。', flavor:'全ての傷を癒す奇跡の光。',
        effect:(ctx,o)=>{ ctx.healLeader(o,4); ctx.healAllFriendly(o,2); }
    },
    {
        id:'b008', name:'バニッシュ', craft:'bishop', type:'spell',
        cost:3, targeted:true, canTargetLeader:false,
        desc:'相手フォロワー1体を消滅させる(死亡扱いにならない)。', flavor:'存在ごと消し去る聖なる力。',
        effect:(ctx,o,t)=>{ ctx.banishFollower(t); }
    },

    // ======== エルフ ========
    {
        id:'e001', name:'アリア', craft:'elf', type:'follower',
        cost:1, atk:2, def:1, maxDef:1, keywords:[],
        desc:'場に出た時: デッキからカードを1枚引く。', flavor:'森の妖精が知恵を授ける。',
        onPlay:(ctx,s)=>{ ctx.drawCard(s.owner); }
    },
    {
        id:'e002', name:'フォレストウルフ', craft:'elf', type:'follower',
        cost:2, atk:2, def:2, maxDef:2, keywords:['rush'],
        desc:'疾走。', flavor:'森の狼は素早く獲物を仕留める。'
    },
    {
        id:'e003', name:'ナテラの大樹', craft:'elf', type:'amulet',
        cost:3,
        desc:'自ターン開始時: カードを1枚引く。自ターン終了時: 相手リーダーに1ダメージ。', flavor:'大地の力が宿る聖なる樹。',
        onTurnStart:(ctx,a)=>{ ctx.drawCard(a.owner); },
        onTurnEnd:(ctx,a)=>{ ctx.damageLeader(ctx.getEnemy(a.owner),1); }
    },
    {
        id:'e004', name:'ウィンドブレード・エルフ', craft:'elf', type:'follower',
        cost:3, atk:3, def:2, maxDef:2, keywords:[],
        desc:'場に出た時: このターンにプレイしたカード枚数×1ダメージを相手リーダーへ。', flavor:'風の刃で道を切り開く。',
        onPlay:(ctx,s)=>{ let d=ctx.getCardsPlayedThisTurn(s.owner); if(d>0) ctx.damageLeader(ctx.getEnemy(s.owner),d); }
    },
    {
        id:'e005', name:'一陣の風', craft:'elf', type:'spell',
        cost:1,
        desc:'カードを2枚引く。', flavor:'風が知識を運んでくる。',
        effect:(ctx,o)=>{ ctx.drawCard(o); ctx.drawCard(o); }
    },
    {
        id:'e006', name:'マーキュリーイーグル', craft:'elf', type:'follower',
        cost:4, atk:4, def:3, maxDef:3, keywords:['storm','rush'],
        desc:'突進・疾走。', flavor:'天空を駆ける最速の鷲。'
    },
    {
        id:'e007', name:'フェアリーサークル', craft:'elf', type:'spell',
        cost:1,
        desc:'フェアリーを2体召喚する。', flavor:'妖精たちが輪になって踊る。',
        effect:(ctx,o)=>{ for(let i=0;i<2;i++) ctx.summonToken(o,{id:'e007t',name:'フェアリー',craft:'elf',type:'follower',cost:1,atk:1,def:1,maxDef:1,keywords:[],desc:'',flavor:''}); }
    },
    {
        id:'e008', name:'スプリングウッド・エルフ', craft:'elf', type:'follower',
        cost:5, atk:4, def:4, maxDef:4, keywords:['ward'],
        desc:'ガード。自軍フォロワー全員に疾走を付与する(このターンのみ)。', flavor:'春の森から現れた守護者。',
        onPlay:(ctx,s)=>{ ctx.grantAllFriendlyRush(s.owner); }
    },

    // ======== ヴァンパイア ========
    {
        id:'v001', name:'ヴァーミン・ハンター', craft:'vampire', type:'follower',
        cost:2, atk:3, def:1, maxDef:1, keywords:[],
        desc:'場に出た時: 自リーダーに1ダメージ。受けたダメージ分攻撃力UP(このターン)。', flavor:'自らを傷つけて力を引き出す狩人。',
        onPlay:(ctx,s)=>{ ctx.damageLeader(s.owner,1); let d=Math.min(ctx.getLeaderDamageTaken(s.owner),5); ctx.buffFollower(s,d,0); }
    },
    {
        id:'v002', name:'ブラッドウルフ', craft:'vampire', type:'follower',
        cost:3, atk:3, def:3, maxDef:3, keywords:['drain'],
        desc:'吸血。ダメージを受けた時: 攻撃力+1。', flavor:'血を啜るたびに牙が鋭くなる。',
        onDamageTaken:(ctx,s,d)=>{ ctx.buffFollower(s,1,0); }
    },
    {
        id:'v003', name:'セクシーヴァンプ', craft:'vampire', type:'follower',
        cost:4, atk:3, def:4, maxDef:4, keywords:['drain','bane'],
        desc:'吸血・必殺。', flavor:'美しき夜の女王。'
    },
    {
        id:'v004', name:'ブラッドバス', craft:'vampire', type:'spell',
        cost:2,
        desc:'自リーダーに2ダメージ。相手フォロワー全体に3ダメージ。', flavor:'血の嵐が全てを飲み込む。',
        effect:(ctx,o)=>{ ctx.damageLeader(o,2); ctx.damageAllEnemies(o,3); }
    },
    {
        id:'v005', name:'ルシファー', craft:'vampire', type:'follower',
        cost:8, atk:7, def:7, maxDef:7, keywords:['storm','drain','bane'],
        desc:'突進・吸血・必殺。反逆の堕天使。', flavor:'天上より落ちし者の怒りは底知れない。'
    },
    {
        id:'v006', name:'ヴァンパイアブリード', craft:'vampire', type:'follower',
        cost:1, atk:2, def:1, maxDef:1, keywords:[],
        desc:'自リーダーのHPが10以下: 疾走を得る。', flavor:'血の渇望が眠れる力を覚醒させる。',
        getKeywords:(ctx,s)=>{ let k=[]; if(ctx.getLeaderHP(s.owner)<=10) k.push('rush'); return k; }
    },
    {
        id:'v007', name:'ダークソウル', craft:'vampire', type:'spell',
        cost:3,
        desc:'自リーダーに3ダメージ後、6回復。自リーダーHP10以下なら相手にも2ダメージ。', flavor:'魂を削って力を得る禁術。',
        effect:(ctx,o)=>{ ctx.damageLeader(o,3); ctx.healLeader(o,6); if(ctx.getLeaderHP(o)<=10) ctx.damageLeader(ctx.getEnemy(o),2); }
    },

    // ======== ネメシス ========
    {
        id:'nm001', name:'アーティファクト・コーリング', craft:'nemesis', type:'spell',
        cost:2,
        desc:'アーティファクトを2体召喚する。', flavor:'召喚陣から機械が生み出される。',
        effect:(ctx,o)=>{ for(let i=0;i<2;i++) ctx.summonToken(o,{id:'nm001t',name:'アーティファクト',craft:'nemesis',type:'follower',cost:1,atk:1,def:1,maxDef:1,keywords:[],desc:'',flavor:''}); }
    },
    {
        id:'nm002', name:'メカニカルガンナー', craft:'nemesis', type:'follower',
        cost:3, atk:2, def:3, maxDef:3, keywords:[],
        desc:'場に出た時: 自軍アーティファクトの数×1ダメージを相手リーダーに。', flavor:'機械の狙撃手が精密射撃する。',
        onPlay:(ctx,s)=>{ let n=ctx.countFriendlyByName(s.owner,'アーティファクト'); if(n>0) ctx.damageLeader(ctx.getEnemy(s.owner),n); }
    },
    {
        id:'nm003', name:'ギアゴーレム', craft:'nemesis', type:'follower',
        cost:4, atk:4, def:4, maxDef:4, keywords:['ward'],
        desc:'ガード。死亡時: アーティファクトを2体召喚する。', flavor:'歯車が絡み合う鉄の巨人。',
        onDeath:(ctx,s)=>{ for(let i=0;i<2;i++) ctx.summonToken(s.owner,{id:'nm003t',name:'アーティファクト',craft:'nemesis',type:'follower',cost:1,atk:1,def:1,maxDef:1,keywords:[],desc:'',flavor:''}); }
    },
    {
        id:'nm004', name:'オーバーヒート', craft:'nemesis', type:'spell',
        cost:3,
        desc:'相手フォロワー全体に2ダメージ＋自軍アーティファクト数ダメージ。', flavor:'過熱した機械が爆発する。',
        effect:(ctx,o)=>{ let b=ctx.countFriendlyByName(o,'アーティファクト'); ctx.damageAllEnemies(o,2+b); }
    },
    {
        id:'nm005', name:'プロジェクト・プロテウス', craft:'nemesis', type:'follower',
        cost:6, atk:5, def:6, maxDef:6, keywords:['storm'],
        desc:'突進。場に出た時: アーティファクトを3体召喚する。', flavor:'究極の機械兵器が目覚める。',
        onPlay:(ctx,s)=>{ for(let i=0;i<3;i++) ctx.summonToken(s.owner,{id:'nm005t',name:'アーティファクト',craft:'nemesis',type:'follower',cost:1,atk:1,def:1,maxDef:1,keywords:[],desc:'',flavor:''}); }
    },
];

// ==================================================
// サンプルデッキ定義 (各20枚)
// ==================================================
const SampleDecks = [
    {
        name:'騎士の誓い', craft:'royal', color:'#c8a200',
        desc:'ガードと号令でフィールドを制圧するロイヤルデッキ。',
        leader:{ name:'ローラン王', hp:20, maxHp:20 },
        cards:['r004','r004','r004','r010','r010','r003','r003','r003',
               'r006','r006','r007','r007','r008','r008','r009',
               'r005','r005','r002','r001','n005']
    },
    {
        name:'炎の魔法書', craft:'witch', color:'#8800cc',
        desc:'スペルでボードをコントロールするウィッチデッキ。スペルブーストで強化。',
        leader:{ name:'魔法使いリネア', hp:20, maxHp:20 },
        cards:['w008','w008','w008','w002','w002','w010','w010',
               'w003','w003','w003','w006','w006','w007','w007',
               'w004','w004','w005','w009','w001','n003']
    },
    {
        name:'竜の咆哮', craft:'dragon', color:'#cc4400',
        desc:'PPを加速してビッグドラゴンを早出しするデッキ。後半圧倒的。',
        leader:{ name:'ドラゴンマスター竜牙', hp:20, maxHp:20 },
        cards:['d007','d007','d007','d002','d002','d003','d003',
               'd004','d004','d006','d006','d008','d005','d005',
               'n010','n010','n017','n017','d001','n019']
    },
    {
        name:'死者の行進', craft:'necro', color:'#5500aa',
        desc:'仲間の死を利用して墓場を肥やすネクロデッキ。',
        leader:{ name:'死霊術師デス', hp:20, maxHp:20 },
        cards:['nc003','nc003','nc003','nc005','nc005','nc006','nc006',
               'nc004','nc004','nc007','nc007','nc008','nc008',
               'nc002','nc002','n004','n004','n009','n009','nc001']
    },
    {
        name:'天使の祝福', craft:'bishop', color:'#aaaa00',
        desc:'回復を繰り返しながら守護で固めるビショップデッキ。長期戦向き。',
        leader:{ name:'大神官セラフィナ', hp:20, maxHp:20 },
        cards:['b002','b002','b002','b003','b003','b005','b005',
               'b004','b004','b007','b007','b008','b008',
               'n005','n005','b006','b001','n015','n015','n016']
    },
    {
        name:'森のエルフ', craft:'elf', color:'#00aa44',
        desc:'カードを大量に引いて速攻を仕掛けるアグロエルフデッキ。',
        leader:{ name:'エルフ王アリア', hp:20, maxHp:20 },
        cards:['e001','e001','e001','e005','e005','e005','e007','e007',
               'e002','e002','e004','e004','n002','n002',
               'e006','e006','e003','e008','n010','n010']
    },
    {
        name:'血の渇望', craft:'vampire', color:'#cc0022',
        desc:'自分にダメージを与えながら強くなるヴァンパイアデッキ。ヴェンジェンスで覚醒。',
        leader:{ name:'吸血鬼ヴァルター', hp:20, maxHp:20 },
        cards:['v006','v006','v006','v001','v001','v004','v004',
               'v002','v002','v007','v007','v003','v003',
               'n008','n008','n009','n009','v005','n015','n020']
    },
    {
        name:'機械の軍勢', craft:'nemesis', color:'#005588',
        desc:'アーティファクトを量産してボードを埋め尽くすネメシスデッキ。',
        leader:{ name:'機械皇帝ゼウス', hp:20, maxHp:20 },
        cards:['nm001','nm001','nm001','nm002','nm002','nm003','nm003',
               'nm004','nm004','nm005','nm005','n003','n003','n003',
               'n005','n005','n017','n017','n013','n013']
    },
];
