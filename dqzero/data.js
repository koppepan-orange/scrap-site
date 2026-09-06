let Style = {
    iPhone:{ //16
        "width": "393px",
    },
    "batSt":{
        solid:"#2b2b2b",
        back:"#b2b2b2",
        aima:"#6f6f6f"
    },
    tekiou: function() {
        for (let section in this) {
            if (section == 'apply') continue;
            for (let key in this[section]) {
                document.documentElement.style
                    .setProperty(`--${section}-${key}`, this[section][key]);
            }
        }
    }
}

const Fonts = [
    {src:'comicsans', type:'ttf'},
    {src:'hangyaku', type:'ttf'},
    {src:'kurobara', type:'ttf'},
    {src:'cube12', type:'ttf'}
];

const Images = {
    systems:["error",'select','circle','mush','mush_high','phone','star1','star1_pre','star2','star2_pre','star3','star3_pre','dungeon'],
}

const Sounds = {
    se:['error', 'place'],
    // bgm:[],
}

const Secrates = [
    {
        ind:0,
        name:'koppepan',
        arr:['k','o','p','p','e','p','a','n'],
        limit:3,
        func: async function(){
            nicoText('なんにも起こらない＝ヨーン');
        }
    },
    {
        ind:0,
        name:'re',
        arr:['r','e'],
        limit:1,
        func: async function(){
            let img = document.createElement('img');
            img.id = 'hakaisatsu';
            img.src = 'assets/images/systems/hakai_1.png'
            img.dataset.phase = 1;
            document.querySelector('body').appendChild(img);

            setTimeout(() => {
                img.remove();
                this.ind = 0;
                this.limit = 1;
            }, 3000)

            return 0;
        }
    },
    {
        ind:0,
        name:'rere',
        arr:['r','e','r','e'],
        limit:1,
        func: async function(){
            let img = document.getElementById('hakaisatsu');
            if(!img) return;

            img.src = 'assets/images/systems/hakai_2.png'
            img.dataset.phase = 2;

            setTimeout(() => {
                img.remove();
                this.ind = 0;
                this.limit = 1;
            }, 3000)

            return 0;
        }
    },
    {
        ind:0,
        name:'rerere',
        arr:['r','e','r','e','r','e'],
        limit:1,
        func: async function(){
            let img = document.getElementById('hakaisatsu');
            if(!img) return 1;
            console.log(img.dataset.phase);
            if(img.dataset.phase != '2') return 1;
            location.reload();
        }
    },
    {
        ind:0,
        name:'wawawwa',
        arr:['w','a','w','a','w','w','a'],
        limit:'n',
        func: async function(){
            staF.resetP();
        }
    }
]

const Spaces = [
    { name:'home', rank:2, back:'#f0f8ff', sho:1 },
    { name:'batt', rank:2, back:'#faf0ff', sho:1 },
    { name:'gamble', rank:2, back:'#b4ddb8', sho:1 },
];


function SpeciusLight(){
    let stas0 = Stages.filter(a => !a.no).map(a => a.name);
    let stas = stas0.concat(['すべて']);
    
    Images.maps = {};
    Images.enemies = {};
    for(let sta of stas){
        if(!Images.maps[sta]) Images.maps[sta] = [];
        Objects.filter(a => a.in == sta).map(a => a.name).forEach(name => {
            loaC.imgT += 1;
            if(sta != 'すべて') Images.maps[sta].push(name);
            
            else for(let sta2 of stas0) Images.maps[sta2].push(name);
        });

        if(sta == 'すべて') continue;

        Stages.find(a => a.name == sta).tiles.forEach(name => {
            loaC.imgT += 1;
            Images.maps[sta].push(name);
        })

        if(!Images.enemies[sta]) Images.enemies[sta] = [];
        Enemies.filter(a => !a.no && (a.ins.includes(sta) || a.ins == 'すべて')).map(a => a.name).forEach(name => {
            loaC.imgT += 1;
            // Images.enemies.push(name);
            
            if(sta != 'すべて') Images.enemies[sta].push(name);
            else for(let sta2 of stas0) Images.enemies[sta2].push(name);
        });
    }

    Images.charas = [];
    for(let ch of Charas){
        let toku = 0;
        if(ch.name == "color_slime") toku = 1;
        if(toku == 0){
            let img = `${ch.img}`;
            Images.charas.push(img);
        }
        else{
            switch(ch.name){
                case "color_slime":
                    for(let c of ch.data.colors){
                        let img = `${ch.data.colorp}${c}`;
                        Images.charas.push(img);
                    }
            }
        }
    }
}

let Status = [
    // [whi] atkerはatker専用、逆はそれ専用、ないやつは汎用
    // [tri] ph:物理、mg:魔法、cn:間接、ないやつは汎用

    {
        name:"maxhp",
        jpnm:"最大体力",
        desc:"キャラクターの最大体力を示します",
        bas:100,
    },
    {
        name:"atk",
        jpnm:"攻撃力",
        desc:"攻撃！",
        whi:"atker",
        tri:"ph",
        bas:20,
    },
    {
        name:"def",
        jpnm:"防御力",
        desc:"守り力です",
        whi:"defer",
        tri:["ph", "cn"],
        bas:0,
    },

    {
        name:"matk",
        jpnm:"魔攻力",
        desc:"魔力とも言う",
        whi:"atker",
        tri:"mg",
        bas:10,
    },
    {
        name:"mdef",
        jpnm:"魔防力",
        desc:"魔力（防）とも言う ださっ",
        whi:"defer",
        tri:"mg",
        bas:0,
    },

    {
        name:"catk",
        jpnm:"銃力..?",
        desc:"しらねぇよ",
        whi:"atker",
        tri:"cn",
        bas:10,
    },

    {
        name:"power",
        jpnm:"攻撃倍率",
        desc:"そのまま。すべてに適用",
        whi:"atker",
        tri:"all",
        bas:1.0,
    },
    {
        name:"shell",
        jpnm:"防御倍率",
        desc:"そのまま。すべてに適用",
        whi:"defer",
        tri:"all",
        bas:1.0,
    },
    
    {
        name:"add",
        jpnm:"追加攻撃力",
        desc:"攻撃倍率に左右されない攻撃力を",
        whi:"atker",
        tri:"all",
        bas:0,
    },
    {
        name:"cut",
        jpnm:"追加防御力？",
        desc:"左右されないやつだけど、、これと80%カットは違うにした方がいいか？ん、、そんな気がする。てか追加攻撃力って何？いやそれは必要るか、ぅぅ....じゃあ追加防御力の名称考えないと",
        whi:"atker",
        tri:"all",
        bas:0,
    },

    {
        name:"maxmp",
        jpnm:"最大魔力",
        desc:"所持可能な最大魔素量。",
        bas:50,
    },
    
    {
        name:"maxep",
        jpnm:"ep最大",
        desc:"epっていう...まあスキルゲージだね、スキルのためのポイント",
        bas:100
    },

    {
        name:"crla",
        jpnm:"会心率",
        desc:"",
        whi:"atker",
        bas:3
    },
    {
        name:"crdm",
        jpnm:"会心倍率",
        desc:"",
        whi:"atker",
        bas:150
    },
    {
        name:"crrs",
        jpnm:"会心抵抗",
        desc:"",
        whi:"defer",
        bas:0
    },

    {
        name:"spd",
        jpnm:"速度",
        desc:"行動速度のあれ。計算がむずい",
        bas:50
    },

    {
        name:"dodge",
        jpnm:"回避率",
        desc:'攻撃を回避しやすくなる確率。基本0',
        whi:"defer",
        bas:0
    },
    {
        name:"targe",
        jpnm:"命中率",
        desc:'攻撃が"命中しやすい"確率。基本0',
        whi:"atker",
        bas:0
    }
]

let Charas = [
    {
        name:'wretch',
        jpnm:'持たざる者',
        img:'wretch',
        desc:'持たざる者。何もないが、何でもあるとも言える。\n平均的で普遍的。普通の凡才でただの人間。',
        ex:'null',
        ns:'null',
        ps:'null',
        stat:{
            atk:20,
            def:0,
            matk:10,
            mdef:0,
            maxhp:100,
            maxmp:50,
            crla:5,
            crdm:150,
            crrs:0,
            spd:50,   
        },
        buttonsolid:'#000000',
        buttonback:'#999999',
    },

    {
        name:'color_slime',
        jpnm:'ファン・ボイ・チャウ',
        img:'color_slime_green',
        data:{
            colorp:"color_slime_", //original
            color0:"green",
            colors:["green", "black", "blue", "purple", "red", "white", "yellow"]
        },
        desc:'スライム。...まだできてないから使わない方が吉',
        ex:'null',
        ns:'null',
        ps:'sthree',
        stat:{
            atk:20,
            def:0,
            matk:10,
            mdef:0,
            maxhp:100,
            maxmp:50,
            crla:0,
            crdm:150,
            crrs:'absolute',
            spd:35,
        },
        buttonsolid:'#000000',
        buttonback:'#999999',
    },

    {
        name:'mechanic',
        jpnm:'なんとか・アミー',
        img:'mechanic',
        desc:'メカニック。工具を用いて割となんでも作れる。\nそのせいか助手には大きく慕われている。\n打たれ弱いので繊細にね',
        ex:'placeturret',
        ns:'throwwrench',
        ps:'solplaceturret',
        stat:{
            atk:25,
            def:0,
            matk:20,
            mdef:20,
            maxhp:25,
            maxmp:30,
            crla:7,
            crdm:200,
            crrs:0,
            spd:65,
        },
        buttonsolid:'#ff7373',
        buttonback:'#fcffc0',
    },
    
    {
        name:'clown',
        jpnm:'週末の道化師',
        img:'clown',
        desc:'ピエロさん。ランダム要素多め。\n',
        ex:'trickyvaiavles',
        ns:'gambler',
        ps:'highsol',
        stat:{
            atk:20,
            def:0,
            matk:10,
            mdef:20,
            maxhp:100,
            maxmp:50,
            crla:9,
            crdm:300,
            crrs:10,
            spd:40,
        },
        buttonsolid:'#ffacf9',
        buttonback:'#acf8ff',
    },
    
    {
        name:'magodituono',
        jpnm:'スオーノ・フルマイン',
        img:'magodituono',
        desc:'雷電魔術師。"帯電"を用いて戦う\n将軍ではない。誰だ将軍って言ったやつは',
        ex:'lightningstorm',
        ns:'elecbarrier',
        ps:'elecshock',
        stat:{
            atk:10,
            def:0,
            matk:30,
            mdef:20,
            maxhp:40,
            maxmp:100,
            crla:5,
            crdm:200,
            crrs:5,
            spd:60,
        },
        buttonsolid:'#7f1184',
        buttonback:'#5f4894',
    },
]


/*

function processDots(who){
    let dots = {};
    for(let buff of who.buffs){
        let data = Buffs.find(a => a.name == buff.name);
        if(data && hask(data, 'dot')){
            let dot = data.dot;
            let val = buff.value[dot];
            if(typeof val == 'string' && val.endsWith('%')){
                val = Math.round(who.maxhp * val.slice(0, -1) / 100);
            }
            if(!dots[dot]) dots[dot] = 0;
            dots[dot] += val;
        }
    }
    Object.keys(dots).forEach(key => {
        let val = dots[key];
        console.log(`[dot] ${who.name}に${val}ダメージ(${key})`);
        who.hp -= val;
        if(who.hp <= 0) return dead(0, who);
    });

    return 0;
}

async function turnNext(who){
    // やりたいこと: dotダメージの処理, その後playerかenemieかでswitchで行動を促す
    
    // 行動不能系のチェックを先にやっちゃうね。動けないのにdotだけ食らうのは変だし！
    for(let buff of who.buffs){
        let data = buffData(buff.name);

        if(buff.name == 'onslime'){
            if(isCrit(buff.value)){
                buffremove(who, 'onslime');
                addtext('なんとかスライムを取り払った!!');
            } else {
                addtext('スライムが邪魔して動けない!!');
                turnBye(who);
                 // 動けないから次の人へパス
                return;
            }
        }
        if(buffhas(who, 'skip')){
            await logText(`>> はい${who.name}、お前スキップ〜〜`);
            turnBye(who);
            return;
        }
        if(hask(buff.value, 'palsy')){
            if(isCrit(buff.value.palsy)){
                data.name != 'stan'
                    ? addtext(`${who.cam}${who.me}は麻痺している..`)
                    : addtext(`${who.cam}${who.me}はスタンしている....`);
                turnBye(who);
                return;
            }
        }
        if(hask(buff.value, 'freeze')){
            if(!isCrit(buff.value.freeze)){
                addtext(`${who.name}は凍っている...`);
                turnBye(who);
                return;
            }
            await logText(`氷が溶けた！`);
            buffremove(who, 'freeze');
        }
    }

    // 前半のdotダメージ処理
    processDots(who);
    if(who.hp <= 0) return dead(0, who);

    console.log(`(${batC.turn}) 現在、[${who.cam}]${who.name}さんのターンです！`);

    switch (who.cam){
        case 'player':
            playerturn(who);
            break;
        case 'enemie':
            enemyturn(who);
            break;
    }
}

async function turnEnd(who, ares){
    // やりたいこと: luck系の"再行動"の判定, dotダメージの処理
    
    for(let i = who.buffs.length - 1; i >= 0; i--){
        who.buffs[i].time -= 1;
        if(who.buffs[i].time <= 0) who.buffs.splice(i, 1);
    }
    tekiou();

    let extraTurn = false;
    for(let buff of who.buffs){
        let data = buffData(buff.name);
        if(data && hask(data, 'luck')){
            if(isCrit(data.luck)){
                addtext('当たりが出たらもう一本！');
                extraTurn = true;
                break;
            }
        }
    }

    if(extraTurn){
        if(who.cam == 'player') playerturn(who);
        else enemyturn(who);
        return;
    }

    processDots(who);
    if(who.hp <= 0) return;

    turnBye(who);
}

*/

let Buffs = [
    {
        name:'luck',
        jpnm:'幸運',
        type:'buff',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        desc:'ターン終了時、確率でもう一回行動できる。',
        flav:"数々のゲーマーを狂わせてきたと噂されている。",
        lvs:[
            {luck:20},
            {luck:33},
            {luck:50},
            {luck:100},
        ],
        max:4
    },
    {
        name:'disappear',
        jpnm:'消滅',
        type:'buff',
        becauseof:'turn_end',
        hera:1,
        kiju:'none',
        desc:`姿を消し、攻撃を受けなくなる。\nもし範囲攻撃を受けたならば、そのダメージを受けたのちこの効果は解除される。`,
    },
    {
        name:'cheerup',
        jpnm:'応援！',
        type:'buff',
        becauseof:'turn_end',
        hera:1,
        kiju:'lv',
        desc:'応援されている状態。攻撃力と速度が上がり会心率が下がる。',
        flav:"嬉しいけどちょっと緊張しちゃうよね。わかるぞ",
        lvs:[
            {
                power:'+1.0',
                spd:'+20.0',
                crla:'-5.0'
            },
            {
                power: '+1.5',
                spd: '+25.0',
                crla: '-6.5'
            }
        ],
        max:2
    },
    {
        name:'poison',
        jpnm:'毒',
        type:'debuff',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        dot:'poison',
        desc:'ターン開始時、HP割合で防御貫通ダメージを受ける。',
        flav:"？？？「毒の苦しみもお好きなんですね」",
        lvs:[
            {poison:'3%'},
            {poison:'5%'},
            {poison:'7%'},
            {poison:'10%'},
        ],
        max:4
    },
    {
        name:'poison_deadly',
        jpnm:'猛毒',
        type:'debuff',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        dot:'poison',
        desc:'ターン開始時、HP割合で防御貫通ダメージを受けたあと、ランダムで他のバフ(良)の持続時間を1減少される。',
        lvs:[
            {poison:'7%'},
            {poison:'15%'},
        ],
        max:2
    },
    {
        name:'blood',
        jpnm:'出血',
        type:'debuff',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        dot:'blood',
        desc:`ターン終了時、固定ダメージを受ける。\n
        [1] 非攻撃時、この効果のダメージ量は現在の値のに1.5倍に増加する(ｷﾘｱｹﾞ)`,
        flav:"傷口が広がる、ってイメージ。ターン経過は酷だしな",
        lvs:[
            {blood:2},
            {blood:5},
            {blood:7},
            {blood:10},
        ],
        max:4
    },
    {
        name:'blood_born',
        jpnm:'血の誕生',
        type:'debuff',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        dot:'blood',
        desc:`ターン終了時、固定ダメージを受ける。
            [1] 非攻撃時、この効果のダメージ量は現在の値の2倍に増加する。`,
        flav:"私がやりたがってるゲーム。でも最初の盗賊団ですでに無理ってるから相当無理かも",
        lvs:[
            {blood:5},
            {blood:8},
            {blood:14},
        ],
        max:3
    },
    {
        name:'burn',
        jpnm:'火傷',
        type:'debuff',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        dot:'burn',
        desc:`ターン終了時、この効果の重複数に比例した固定ダメージを受ける。また、攻撃力が4下がる。\n
        [1] もし木製の装備を着ているならば、この効果で受けるダメージは2倍になる。`,
        flav:"追加効果が多い気がする、、まあいいか。木製装備へのメタになってくれ、君は",
        lvs:[
            {burn:"5n", atk:-4}
        ],
    },
    {
        no:1,
        name:'burn_out',
        jpnm:'燃え尽き症候群',
        type:'debuff',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        dot:'burn',
        desc:`ターン終了時、この効果の重複数に比例した固定ダメージを受ける。また、攻撃力が7下がる。\n
        [1] もし木製の装備を着ているならば、この効果で受けるダメージは2倍になる。\n
        [2] もしこのダメージで最後のキャラが死んで負けたならば、所持金が元の半分になる`,
        flav:"...だいじょぶかなぁ、、てあれ、これ死因も判定しないとなのでは？だ、だるくね、、？",
        lvs:[
            {burn:"5n", atk:-7}
        ],
        max:6
    },
    {
        new:1,
        name:"longrange",
        jpnm:"延焼"
    },
    {
        name:'elec',
        jpnm:'帯電',
        type:'debuff',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        dot:'elec',
        desc:`ターン開始時、固定ダメージを受け、さらに60%の確率で他の味方にこれが伝染する(1t)。\n
        [1] もし金属製の防具を着ているならばこの効果で受けるダメージは2倍になる。`,
        lvs:[
            {elec:4},
            {elec:7},
            {elec:12},
            {elec:17},
        ],
        max:4
    },
    {
        name:'elec_elec',
        jpnm:'帯電・帯電',
        type:'debuff',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        dot:'elec',
        desc:'ターン開始時、固定ダメージを受ける\nターン終了時、確率で他の味方に伝染する\nあと確率で「麻痺」lv1を自身に1t付与します\n帯電・帯電ってなんだよ',
        lvs:[
            {elec:7, palsy:33},
            {elec:11, palsy:50},
            {elec:17, palsy:100},
        ],
        max:3
    },
    {
        name:'injury',
        jpnm:'傷口',
        type:'debuff',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        dot:'injury',
        desc:'攻撃毎に固定ダメージ。\n連続攻撃/行動ビルドに大打撃\n私はこのデバフが最も嫌いです。まぢ無理',
        lvs:[
            {injury:3},
            {injury:5},
            {injury:9},
            {injury:15},
        ],
        max:4
    },
    {
        name:'injury_gore',
        jpnm:'裂痕',
        type:'debuff',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        dot:'injury',
        desc:'行動時固定ダメージ。\nあと被回復量が半減します。\n',
        lvs:[
            {injury:9},
            {injury:14},
            {injury:18},
        ],
        max:3
    },
    {
        new:1,
        name:"frostbite",
        jpnm:"凍傷",
        type:"debuff",
        becauseof:"turn_start",
        hera:1,
        kiju:"stack",
        desc:"spdが10低下する。さらに毎ターン開始時、1stackにつき5ダメージを受ける",
        flav:"凍傷の英語カッコよすぎ問題、あります",
        lvs:[
            {spd:-10, frostbite:"5n"} //初登場、n！endsWithのnで、掛け算されます
        ],
        max:1
    },
    {
        name:'freeze',
        jpnm:'氷結',
        type:'debuff',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        desc:'凍っている状態。\nターン開始時、n%の確率で解除されます\n炎属性の攻撃を受けても解除できます',
        lvs:[
            {freeze:75},
            {freeze:50},
            {freeze:33},
            {freeze:20},
        ],
        max:4
    },
    {
        name:'freeze_blue',
        jpnm:'凍結',
        type:'debuff',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        desc:'凍結されている状態。\nターン開始時、n%の確率で解除されます\n炎攻撃を受けても解除不可です',
        lvs:[
            {freeze:40},
            {freeze:18}, //ブルアカの星2
            {freeze:3}, //ブルアカの星3
        ],
        max:3
    },
    {
        name:'freeze_eternal',
        jpnm:'エターナルフリーズ',
        type:'debuff',
        becauseof:'turn_end',
        hera:2,
        kiju:'lv',
        desc:'ターン開始時、0%の確率で解除されます',
        lvs:[
            {freeze:0}
        ],
        max:1
    },
    {
        name:'palsy',
        jpnm:'麻痺',
        type:'debuff',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        desc:'麻痺ですね。これ好き',
        lvs:[
            {palsy:20},
            {palsy:25},
            {palsy:33},
            {palsy:50},
            {palsy:67},
            {palsy:99},
        ],
        max:6
    },
    {
        name:'stan',
        jpnm:'スタン',
        type:'debuff',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        desc:'スタンです。\n内部処理的には麻痺の延長',
        lvs:[
            {palsy:100}
        ],
        max:1
    },
    
    {
        name:'skip',
        jpnm:'スキップカード',
        type:'unique',
        becauseof:'turn_start',
        hera:1,
        kiju:'none',
        desc:"ターン開始時、手番をスキップされる",
        flav:"ゲーム終了間際で相手がこれを出してきた時の絶望感たるや"
    },
    {
        name:'sleepiness',
        jpnm:'睡魔',
        type:'debuff',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        desc:'ターン終了時、「sleepy」をnstack増加させる',
        flav:"睡魔..微熱魔じゃないです。あと決して湖のほとりの人じゃないです",
        lvs:[
            {sleepy:10},
            {sleepy:20},
            {sleepy:25},
        ],
        max:3
    },
    {
        name:'sleepy',
        jpnm:'眠気',
        type:'debuff',
        becauseof:'act',
        hera:10,
        kiju:'none',
        desc:`効果なし。\n
        [1] 100stack到達でこの効果は消え、「睡眠」に変化する。
        [2] 行動時、stackを10減らすことができる`,
        flav:"いやほんと、最近ちょっと寝不足で、、すみません。なんだよ幼馴染に依存してる水魔導士って、、なんだよチェスの駒で戦う魔導士って、、、、"
    },
    {
        name:'sleeping',
        jpnm:'睡眠',
        type:'debuff',
        becauseof:'be_attack', //be_は受身の意
        hera:10,
        kiju:'stack',
        desc:`ターン開始時\n
        [1] 攻撃された時、この効果は10stack減少する。`,
    },
    {
        name:'anger',
        
        type:'debuff',
        becauseof:'none',
        hera:1,
        kiju:'stack',
        desc:'すごいイラつかせてくる敵..?\nいやまあ普通にパクリですけれども\nで避けられてさらに煽られるみたいな',
    },
    {
        name:'onslime',
        type:'unique',
        becauseof:'none',
        hera:1,
        kiju:'stack',
        desc:'スライムが体に粘りついている状態です。やばいね(行動不可)',
        kaijo:"行動開始",
        kaijov:"",
        kaijoF:() => {
            if(hit(30)){
                logText('纏わりついたスライムが邪魔をして動けなかった！');
                return 1;
            }

            logText("スライムを何とか引きはがした！");
            return 0;
        }
    },
    {
        name:'stickyslime',
        type:'unique',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        desc:'スライムがくっついているおかげで行動するとダメージを受けます',
        flav:'連続行動ビルドに大打撃 part2',
        lvs:[
            {mg:10},
            {mg:20}
        ],
        max:2
    },
    {
        name:'letsthrow',
        type:'unique',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        desc:'レンチを投げる準備をしている状態。次の攻撃与ダメ2倍',
    },
    {
        name:'gambling',
        type:'unique',
        becauseof:'turn_start',
        hera:1,
        kiju:'lv',
        desc:'次の攻撃が0,2,4倍になる。これぞ醍醐味..ってやつ？',
    }
]

const Elements = [
    {
        name:"H",
        jpnm:"水素",
        desc:"これ自体はいくら存在していても何も引き起こさない。無臭で無害な気体。"
    },
    {
        name:"O",
        jpnm:"酸素",
        desc:"この世界においては、基本的には大気中に一切存在していない。これがフィールド上に10以上あるならば、酸素中毒によりターン終了時全キャラクターは最大HPの3%分のダメージを受ける。この割合はOが10から5上がるたびに3%ずつ増加する。"
    },
    {
        name:"H2O",
        jpnm:"水",
        desc:"正確には湿潤度。この世界では、いくらOとHがフィールド上にあったとしても、自然にH2Oになることはない。発火が発生しても同様。"
    },
    {
        name:"N",
        jpnm:"窒素",
        desc:"この世界においては、基本的には待機中に一切存在していない。"
    },
    {
        name:"NH3",
        jpnm:"アンモニア",
        desc:"これ自体はいくら存在していても何も引き起こさないが、、？"
    },
    {
        name:"pH",
        jpnm:"水素イオン濃度",
        desc:`この世界においてはHとは別物として扱う。\n
        [1] もしpHが5以下ならば、「金属製の防具を着ている」キャラクターの防御力を20%低下させる。基準値を5として1少なくなるたびに低下値は16%ずつ増加する。（0, 0, 20, 36, 52, …）\n
        [2] もしpHが9以上ならば、「防具を着ていない」キャラクターのターン開始時、それは4ダメージを受ける。基準値を9として1増えるたびにダメージは4ずつ増加する。（0, 0, 4, 8, 12, …）\n
        [3] もし何らかの要因でpHがちょうど7になったならば、全キャラクターに10だけダメージを与え、フィールド上にH2Oを3増加させる。`
        // ↑[]の形並んでんの美しすぎる
    },
    {
        name:"e",
        jpnm:"電荷",
        desc:"このゲームにおいてはフィールドに対してかかることになる。これが1以上の状態であるならば、V属性による攻撃が可能になる。ターン終了時、これは1減少する。"
    }
]

const Zokusay = [
    {
        name:"P",
        jpnm:"リン",
        desc:"〈O濃度:2〉これで攻撃すると発火を引き起こし、Oを1だけ消費する。"
    },
    {
        name:"S",
        jpnm:"硫黄",
        desc:"〈O濃度:7〉これで攻撃すると発火を引き起こし、Oを全て消費する。また、相手キャラクター全てに「毒」を3t1lv付与する。これは、消費したOの量が5を超えるたびにに1lvずつ上がる。"
    },
    {
        name:"C",
        jpnm:"炭素",
        desc:"〈O濃度:12〉これで攻撃すると発火を引き起こし、Oを全て消費する。また、相手キャラクター全てに「延焼」を1stack付与する。これは、消費したOの量が12を基準として4増えるたびに1stackずつ上がる。"
    },
    {
        name:"Mg",
        jpnm:"マグネシウム",
        desc:"〈O濃度:6〉これで攻撃すると発火を引き起こし、Oを4だけ消費する。また、相手キャラクター全体に「フラッシュ」を1t1lv付与する。"
    },
    {
        name:"Na",
        jpnm:"ナトリウム",
        desc:"〈H2O濃度:4〉これで攻撃すると水素爆発を引き起こし、H2Oを全て消費する。消費したH2Oに関わらず、発端者の攻撃力の23%で相手全体にダメージを3回にわたって与える。また、これは発火と同じように他の対象にも影響を与える。"
    },
    {
        name:"V",
        jpnm:"電圧",
        desc:"〈電荷:1〉これで攻撃すると、通電を引き起こす（eは消費しない）。"
    }
]

const Phenomenons = [
    {
        name:"conbute",
        jpnm:"発火",
        desc:`火が起こる現象のことで、P属性やS属性などで起こすことができる。その時の効果は引き起こした属性によって異なり、(自然発火でない場合)これを引き起こしたグループじゃない方全体が、発端者の攻撃力の60%の爆発ダメージを受ける。また、同時に「火傷」を2t付与される。このダメージやターン数は、この現象が発生した時に消費したOの量によって増加する。ダメージ量は消費したOの量が2を超えるたびに10%増加し、ターン数は消費したOの量は4を超えるたびに1t増加する。
        [1] もしこの現象が発生した際にフィールド上にNH3があるならば、NH3は全て消費して2度目の爆発が発生する。この爆発のダメージ量は、1度目の爆発のダメージの35% x 消費したNH3量で定まる。`
    },
    {
        name:"press",
        jpnm:"圧縮",
        desc:`高圧をかけること(かなり簡略化している)。これによって発生する反応はいくつかあるが、もしエリア内に"四酸化三鉄"で出来ているキャラクターがある場合、ハーボヨンが先行して実行される。その他の反応はその後。`
    },
    {
        name:"havoc",
        jpnm:"ハーボヨン",
        desc:`窒素と水素を圧縮することで、アンモニアを生成する動作のこと。これは圧縮によって連鎖的に発動される。もしフィールド上にN, Hがともに1以上あるならば、どちらか一方の低い方の数値分両方を減少させる。そしてNH3をHを減少させた分だけフィールド上に追加する。`,
        flav:"おや、知ってるのと違うって？訂正しろって？......ず、頭痛に効くのはアスピリン！"
    },
    {
        name:"freeze",
        jpnm:"凍結",
        desc:"窒素と水を圧縮することで液体窒素を生み出し、それにより瞬間的に冷却される反応のこと。場にNとH2Oが3以上ある状態で「圧縮」を行うと発生する。NとH2Oを3ずつ減らしたのち、全キャラクターに「凍傷」を3t付与する。また、フィールドに「発火が起こらない」を3t付与する。"
    },
    {
        name:"energize",
        jpnm:"通電",
        desc:"相手と自身の間に電位差が生じることによってそこに多大なる電流が流れる現象のこと。場にeが1以上ある状態で、V属性で攻撃を行うと発生する。対象に電圧量x発端者の攻撃力に、e x 15%分を上乗せしたダメージを与える。また、「感電」を1t付与する。"
    }
]

const Combos = [
    {
        name:"humid",
        jpnm:"酸素濃度と湿潤度",
        desc:"フィールド上のOとH2Oは、互いに相殺し合う関係。そのため、どちらかの計算時、かならずこの2つの差で実行される。もしその結果が負の数の場合、その行動は無効化される。",
        list:["O", "H2O"]
    },
]

const Monoze = [
    //モノズーノズパス
    {
        name:"oxygen_tank",
        jpnm:"酸素ガスタンク",
        desc: "ターン開始時に耐久を1消費し、フィールド上のOを3増加させる。回復させることができない。",
        hp:10,
        can:{}, //なんと、攻撃不可(??)
    },
    {
        name: "exprorrel",
        jpnm: "爆薬樽",
        desc: "攻撃を受ける、または発火が発生すると爆発し、全キャラクターに100ダメージを与える。",
        hp: 1,
        can:{
            attack:1
        },
    },
    {
        name: "armored_hiiragi",
        jpnm: "アーマード・柊",
        flav:"触ると痛い棘のついた木...の造形を模した鉄の塊。正式名称は四酸化三鉄らしい。",
        material: ["Fe3O4"],
        hp: 30,
        can:{
            attack:1
        },
    },
    {
        name:"de-hydrator",
        jpnm:"水を枯らすもの",
        hp:10,
        can:{
            attack:1
        },
        desc:"これが場にあるならば、フィールド上のH2Oは0として扱われる（実際に0になるわけではない）。",
        flav:"水を消しちゃうっ！っていうわりに消さない不思議ちゃん。"
    },
    {
        name:"con-dancer",
        jpnm:"今宵のダンサー",
        desc: "これが場にあるならば、ターン終了時にフィールド上のeを1増加させる。",
        flav: "嫌なことをすべて溜め込んで、溜め込む割に吐き出すのは苦手な踊り人間。扱いは繊細に。",
        hp:4,
        can:{
            attack:1
        },
    }
]

const Acts = [
    {
        name:'slash',
        jpnm:'斬る',
        desc:'対象に攻撃力の60%のダメージを与える。', //そのうち武士作ってこれ作りたい
        flav:"別に必中ではないが、必中みたいな扱いで使いがち（作者談）",
        aim:100,
        voi:60,
        mp:0,
        lv:1,
        tcam:'players',
        func:async function(who, are){
            if(await attack(who, are, this.voi, 'ph', this.aim)) return 1;

            //elseesに移行よろ
            if(who.ps == 'sthree' && hit(25)){
                await logText(`${who.name}は頑張った!`);
                if(await attack(who, are, this.voi, 'ph', this.aim)) return 1;
                if(await attack(who, are, this.voi, 'ph', this.aim)) return 1;
            }
            
            return 0;
        }
    },
    {
        name:'double slash',
        jpnm:'つばめ返し',
        desc:'対象に攻撃力の70%のダメージを2回与える。',
        flav:"命中判定は毎回ある。そのうち「ねずみざん」作りたいねぇ",
        aim: 85,
        voi:70,
        mp:0,
        lv:1,
        func:async function(who, are){
            if(await attack(who, are, this.voi, 'ph', this.aim)) return 1;
            if(await attack(who, are, this.voi, 'ph', this.aim)) return 1;

            return 0;
        }
    },
    {
        name:'slash of light',
        jpnm:'踏み込み斬り',//まじん斬り も作りたいね 霹靂一閃も
        desc:'対象に攻撃力の300%のダメージを与える。',
        voi: 300,
        aim: 40,
        mp:0,
        lv:1,
        func:async function(who, are){
            let aim = this.aim;
            let voi = this.voi;
            if(who.ps == 'highsol'){
                aim -= 20;
                voi *= 3;
            }

            if(await attack(who, are, voi, 'ph', aim)) return 1;

            // }else{
                //let result = letsHappen(tcam, target, cam, me, 'missed', 'sl', 'slashoflight');
                /*if(who.ps != 'solx5but'){
                        log.textContent = 'miss! ダメージを与えられない!';
                        await delay(1000);
                }else{
                        humans[cam][me].hp -= (humans[cam][me].atk + humans[cam][me].weapon.power);
                        if(humans[cam][me].hp <= 0){humans[cam][me].hp = 1;};
                        tekiou();
                        log.textContent = humans[cam][me].name+'は混乱して自分を殴った！';
                        await delay(1000);
                }*/

            return 0;
        }
    }
]

const Mags = [
    {
        name:'heal',
        jpnm:'heal',
        desc:'指定した味方の体力を20%回復する。',
        mp:4,
        lv:1,
        func:async function(who, are){
            if(await heal(who, are, '20%')) return 1;
            
            return 0;
        }
    },
    {
        name:'power',
        jpnm:'power',
        desc:'指定した味方に攻撃倍率増加(3t, 1lv)を付与する。',
        mp:5,
        lv:1,
        func:async function(who, are){
            await buffAdd(who, are,'power', 3,1);
            //soldatoのシステム応用しつつで
            return 0;
        }
    },
    {
        name:'shell',
        jpnm:'shell',
        desc:'指定した味方の防御力を1.25倍にします。\n実感あんまりないけど..',
        mp:5,
        lv:1,
        func:async function(who, are){
            await buffAdd(who, are,'shell', 3,1);
            return 0;
        }
    },
    {
        name:'poison',
        jpnm:'poison',
        desc:'指定した人に_毒_(4t,1lv)を付与する',
        mp:7,
        lv:3,
        func:async function(who, are){
            await buffAdd(who, are,'poison', 4,1);
            return 0;
        }
    },
    {
        name:'thundee',
        jpnm:'サンディ',
        desc:'牽制に使われがち',
        mp:3,
        lv:4,
        func:async function(who, are){
            if(await attack(who, are, 30, 'mg', 100, ["属性_雷"])) return 1;
            if(hit(2)) buffAdd(who, are, 'hirumi' , 1)
            return 0;
        }
    },
    {
        name:'garva',
        jpnm:'ガーヴァ',
        desc:'濁点多いと強そうだよね\nまれに火傷も',
        mp:4,
        lv:4,
        func:async function(who, are){
            if(await attack(who, are, 110, 'mg', 100, ["属性_炎"])) return 1;//火
            if(hit(10)) await buffAdd(who, are,'burn', 2, 1);
            return 0;
        }
    },
    {
        name:'healerthan',
        jpnm:'healer than',
        desc:'体力を40%回復します。healよりも強い。だから比較のthanなんですね〜',
        mp:8,
        lv:6,
        func:async function(who, are){
            if(await heal(who, are, '40%')) return 1;
            return 0;
        }
    },
    {
        name:'luck',
        jpnm:'luck',
        desc:'二回行動人間になれるかも？なやつ。\n欠けた運を施錠しましょう',
        mp:4,
        lv:7,
        func:async function(who, are){
            await buffAdd(who, are, 'luck', 4, 1);
            return 0;
        }
    },
    {
        name:'thundos',
        jpnm:'サンドス',
        desc:'二段目。\nサンドじゃないんです許してください',
        mp:8,
        lv:8,
        func:async function(who, are){
            if(await attack(who, are, 120, 'mg', 93, ["属性_雷"])) return 1;
            if(hit(10)) await buffAdd(who, are, 'hirumi',1)
            return 0
        }
    },
    {
        name:'morepower',
        jpnm:'more power',
        desc:'攻撃力が1.5倍になります。power使ってた人いるんかな',
        mp:8,
        lv:9,
        func:async function(who, are){
            await buffAdd(who, are,'power',3,2)
            return 0
        }
    },
    {
        name:'moreshell',
        jpnm:'more shell',
        desc:'防御力が1.5倍になります。けどあんまり実感はないよね',
        mp:8,
        lv:9,
        func:async function(who, are){
            await buffAdd(who, are, 'shellup', 3, 2)
            return 0
        }
    },
    {
        name:'deadlypoison',
        jpnm:'deadly poison',
        desc:'敵を猛毒にします。やったね！！！',
        mp:12,
        lv:10,
        func:async function(who, are){
            await buffAdd(who, are,'poison', 5,2);
            return 0;
        }
    },
    {
        name:'garvan',
        jpnm:'ガーヴァン',
        desc:'\nnotラージャン',
        mp:10,
        lv:11,
        func:async function(who, are){
            let result = await attack(who, are, 230, 'mg', 90, ["属性_炎"]);//火
            await buffAdd(who, are,'burn', 2,2);
            return result
        }
    },
    {
        name:'thehealest',
        jpnm:'the healest',
        desc:'60%回復。これ以上はない、っていう意味ですね。\nxyzじゃないよ',
        mp:12,
        lv:12,
        func:async function(who, are){
            if(await heal(who, are, '60%')) return 1;
            return 0
        }
    },
    {
        name:'luckgreat',
        jpnm:'luckgreat',
        desc:'luckよりも行動しやすいです。嬉しいね',
        mp:12,
        lv:14,
        func:async function(who, are){
            await buffAdd(who, are,'luck', 5,2);
            return 0
        }
    },
    {
        name:'merazoma',
        jpnm:'メラゾーマ',
        desc:'ぬわーーっっ!!ってしてやりましょうぜ(炎の大ダメージ)',//対パパス最強にしたいね、これ
        mp:12,
        lv:12,
        func:async function(who, are){
            let result = await attack(who, are, 3.5, 'mg',4);//雷
            await buffAdd(who, are, 'burn', 3,2);
            return result
        }
    },
    {
        name:'thoron',
        jpnm:'Thoron',
        desc:'当たったらラッキー、シールドでされたら空前で追撃なつよつよ技。\nけどギガサンダーの方が好き(雷の大ダメージ)',
        mp:20,
        lv:15,
        func:async function(who, are){
            let result = await attack(who, are,6,'mg',4);//雷
            return result
        }
    },
    {
        name:'random',
        jpnm:'Random',
        desc:'自身が覚えてる魔法からランダム(mpは5固定)。これぞ醍醐味ってやつよな',
        mp:5,
        lv:1,
        func:async function(who, are){
            // x = Object.keys(Mags).map(a => Mags[a].lv <= humans[cam][me].level ? Mags[a].name : null).filter(Boolean)
            // y = Math.floor(Math.random() * x.length);
            // log.textContent = x[y]+'が出た！';await delay(1000);
            // x[y](who, are);
            let arr = Mags.filter(a => a.lv <= who.level && a.mp <= who.mp).map(a => a.name);
            if(arr.length >= 1){
                let mg = arraySelect(arr);
                await logText(`${mg}が出た！`);
                await delay(500);
                let res = await Mags[mg].func(who, are);
                return res
            }else{
                await logText(`失敗！`)
                await logText(`マキシマイザ・マキシマイザー！！`);
                return 0;
            }
        }
    }, 
]

const Equips = [
    {
        no:1,
        name:'none',
        jpnm:'なし',
        type:"weapon",
        tri:"ph",
        atk:0,
        price:0,
        desc:'ないです。素手とか念とか自由に解釈しておk',
        ap:0,
        ce:0,
    },
    {
        name:'woodstick',
        jpnm:'木の棒',
        type:"weapon",
        tri:"ph",
        atk:2,
        price:10,
        desc:'初期装備あるあるの武器。値段に見合わず割と強い',
        //購入可能かどうか
        ap:0,
        ce:0,
    },
    {
        name:'woodsword',
        jpnm:'木刀',
        type:"weapon",
        tri:"ph",
        atk:4,
        price:20,
        desc:'木の棒よりも強い。言うなれば気の剣。',
        
        ap:0,
        ce:0,
    },
    {
        name:'bamboo_sword',
        jpnm:'竹刀',
        type:"weapon",
        tri:"ph",
        atk:6,
        price:30,
        desc:'さあ、剣道しようぜ！！',
        ap:0,
        ce:0,
    },
    {
        name:'stone',
        jpnm:'石ころ',
        type:"weapon",
        tri:"ph",
        atk:8,
        price:50,
        desc:'石です。よわよわ',
        ap:0,
        ce:0,
    },
    {
        name:'bigrock',
        jpnm:'大きな石',
        type:"weapon",
        tri:"ph",
        atk:21,
        price:80,
        desc:'岩です。つよつよ',
        ap:0,
        ce:0,
    },
    {
        name:'brick',
        jpnm:'レンガ',
        type:"weapon",
        tri:"ph",
        atk:12,
        price:100,
        desc:'岩にセメントつけたら強くなるのって意味わからなくね？',
        ap:0,
        ce:0,
    },
    {
        name:'thinpaper',
        jpnm:'薄めの紙',
        type:"weapon",
        tri:"ph",
        atk:20,
        price:5,
        desc:'薄い紙です。\nすって相手に切り付けて｢いたっ..｣ってさせる用です',
        ap:0,
        ce:1,
        bFunc:{ //攻撃前の効果
            crla: 70,
        }
    },
    {
        name:'card',
        jpnm:'カード',
        type:"weapon",
        tri:"ph",
        atk:'random(1, 13)',
        price:7,
        desc:'ちょっとした運要素。\n攻撃方法は切り付けなので弱い',
        ap:0,
        ce:0,
    },
    {
        name:'scissors',
        jpnm:'はさみ',
        type:"weapon",
        tri:"ph",
        atk:25,
        price:200,
        desc:'石には負けるけど紙には勝てます\n#金属製　#特に謎解きとかは無い',
        ap:0,
        ce:1,
        bFunc:{
            crdm: 4.0,
        }
    },
    {
        name:'knife',
        jpnm:'ほんもののナイフ',
        type:"weapon",
        tri:"ph",
        atk:40,
        price:300,
        desc:'つよつよ武器。\n花や骨に向かって振り回しましょう',
        ap:0,
        ce:1,
        bFunc:{
            crla: 10,
        }
    },

    {
        name:'blooddagger',
        jpnm:'ジェン・ソルテ',
        type:"weapon",
        tri:"ph",
        atk:0,
        price:150,
        desc:'紅き鮮血に染まりし剣..\n攻撃時相手の体力を吸い回復する\n変換効率は80%..水力発電とだいたい同じ',
        ap:1,
        aFunc:async function(who,are){
            if(await attack(who, are, ))
            logText('血を吸った！');
            tekiou();
            logText(`体力が${x}回復した!`);
            return 0;
        },
        ce:0,
    },
    {
        name:'timeontarget',
        jpnm:'time on target',
        type:"weapon",
        tri:"cn",
        atk:10,
        price:150,
        desc:'ナギサ様の手好き',
        ap:1,
        aFunc:async function(who,are,rate,kind,prop,dmg){
            logText(arraySelect(['トリニティの砲撃術は優秀ですから。','お口に合うと良いのですが..']));
            let result = await attack(who,are,0.4,kind,['unpursuit']);
            if(result) return 1;
            await buffAdd(who, are, 'shelldown', 3, 1);
            return 0;
        },
        ce:0,
    },
    {
        no: 1,
        name:'biggamble',
        jpnm:'大博打',
        type:"weapon",
        tri:"ph",
        atk:"random(1, 100)",
        price:150,
        desc:'前面に可動式の100面ダイスが埋め込まれた巨大ハンマー。',
        ap:0,
        ce:0,
    },
    {
        no: 1,
        name:'contrarian',
        jpnm:'天邪鬼',
        type:"weapon",
        tri:"ph",
        atk:80,
        price:150,
        desc:'名称変更予定。',
        ap:0,
        ce:1,
        bFunc:{
            crla: 60
        }
    },


    {
        no: 1,
        name:'none',
        jpnm:'なし',
        type:"shield",
        tri:"ph",
        def:0,
        price:0,
        desc:'ないです。\n筋肉とでも解釈してくれればおk',
        sp:0
    },
    {
        name:'mask',
        jpnm:'マスク',
        type:"shield",
        tri:"mg",
        def:0,
        price:1,
        // desc:'大事ですね。\n防御力は関係ありませんが病気にはならない',
        desc:'防御力はないです..が、\n精神的な防御力は激高です',
        sp:0
    },
    {
        name:'thinbook',
        jpnm:'薄い本',
        type:"shield",
        tri:"ph",
        def:1,
        price:5,
        desc:'**なのは駄目！！\n死刑！！！！',//コハルなのでセーフ
        sp:0
    },
    {
        name:'woodenplank',
        jpnm:'木の板',
        type:"shield",
        tri:"ph",
        def:5,
        price:20,
        desc:'これを使って最初はつるはしを作りましょう',
        sp:0
    },
    {
        name:'ironplate',
        jpnm:'テッパン',
        type:"shield",
        tri:"ph",
        def:10,
        price:30,
        desc:'突進してくるあいつ。\ nこいつに手間取ると他のが来てすぐしぬので注意',
        sp:0
    },
    {
        name:'potlid',
        jpnm:'鍋の蓋',
        type:"shield",
        tri:"ph",
        def:15,
        price:50,
        desc:'初期装備あるあるⅡですね。\n多分コスパ最強',
        sp:0
    },
    {
        name:'thickbook',
        jpnm:'厚めの本',
        type:"shield",
        tri:"ph",
        def:20,
        price:80,
        desc:'辞書とかなのかな。いや六法全書かも',
        sp:0
    },
    {
        name:'door',
        jpnm:'ドア',
        type:"shield",
        tri:"ph",
        def:25,
        price:100,
        desc:'え？木の板と一緒だって？\n君は知らないのかい...?\n木の板を6つ並べるとドアが3つできるってことを',
        sp:0
    },
    {
        name:'electricfan',
        jpnm:'扇風機',
        type:"shield",
        tri:["ph", "cn"],
        def:30,
        price:200,
        desc:'涼めるのに便利。\nまた武器にもなり、ついでに敵から身を守れる万能装備',
        sp:0
    },
    {
        name:'perorodoll',
        jpnm:'ペロロ様人形',
        type:"shield",
        tri:["ph", "cn"],
        def:50,
        price:400,
        desc:'ペロロ様の出番です！！\nhifumi daisuki',
        
        sp:0
    },

    {
        no: 1,
        name:'none',
        jpnm:'なし',
        desc:'なし',
        type:"ear",
        tri:"ph",
        atk:0,
        def:0,
        price:0,
        sp:0
    },
    
    {
        no: 1,
        name:'none',
        jpnm:'なし',
        desc:'なし',
        type:"neck",
        tri:"ph",
        atk:0,
        def:0,
        price:0,
        sp:0
    },

    {
        no: 1,
        name:'none',
        jpnm:'なし',
        desc:'なし',
        type:"tank", //魔素タンク。昔考えたあれだね
        tri:"ph",
        atk:0,
        def:0,
        price:0,
        sp:0
    }
]


const Tools = [
    {
        name:'aspirin',
        jpnm:'アスピリン',
        price:20,
        desc:'味方単体の体力を20%回復',
        flav:'おや、頭が痛いって？頭痛に効くのはアスピリン！',
        func:async function(who, are){
            if(await heal(who, are, "20%")) return 1;
            return 0;
        }
    },
    {
        name:'glucose',
        jpnm:'ブドウ糖',
        price:20,
        desc:'味方単体の体力を15%回復し、攻撃倍率を少し上昇させる。',
        flav:'これで少しは頑張れそう',
        func:async function(who,are){
            if(await heal(who, are, "15%")) return 1;
            await buffAdd(who, are, 'power', 1, 1);
            return 0;
        }
    },
    {
        name:'trypsin',
        jpnm:'トリプシン',
        name:'trypsin',
        price:50,
        desc:'味方単体の体力を50%回復するが、', //何使っとんねん..たぶん何か副作用入れようとしたんだろうな
        flav:'膵液に含まれる消化酵素の一種。\n薬ではない。',
        func:async function(who,are){
            if(await heal(who, are, "70%")) return 1;
            return 0;
        }
    },
    {
        name:'lulu',
        jpnm:'ルル',
        price:41,
        desc:'味方単体の体力を30%回復。50%の確率で再度40%回復。',
        flav:'sick sickな頭痛薬。\n毒が流るルルですね。',
        func:async function(who,are){
            //await logText(`求愛性 孤独 ドク 流るルル`)
            if(await heal(who, are, '30%')) return 1;
            if(hit(50)) return 0;

            await logText('愛をもっと')
            if(await heal(who, are, '40%')) return 1;
            return 0;
        }
    },
    {
        name:'potion',
        jpnm:'魔法薬',
        price:80,
        desc:'味方単体の体力を100%回復',
        flav:'投げつけたい。敵に（？）\n内部処理的にはHPを100%にセットしてます',
        func:async function(who,are){
            await logText("パワー...全開だ！！")
            if(await heal(who, are, '100%', ["set"])) return 1;
            return 0;
        }
    },
    {
        name:'throwknife',
        jpnm:'投げナイフ',
        price:15,
        desc:'指定した人単体の現在体力の5%分のダメージを与える',
        flav:'では、ナイフの錆にしてあげましょう',
        func:async function(who,are){
            if(await attack(who,are,"10%",'cn',["%!maxhp",'固定'])) return 1;
            return 0;
        }
    },
    {
        name:'bottlegrenade',
        jpnm:'ボトルグレネード',
        price:60,
        desc:'敵単体に攻撃力の20%分の間接ダメージを与えたのち、敵全体に火傷(3t,2lv)を付与する。',
        flav:'なんだかんだ初期からずっと好きな人/nレッドウィンターの問題児にしては上出来すぎる',
        func:async function(who,are){
            await logText('これはちょっと、スパイシーなやつだよ');
            if(await attack(who, are, 20, 'cn', [])) return 1;
            
            let are2 = selectJodou(who, 'are', 0, 0, 0); //敵 全体
            await buffAdd(who, are2, 'burn', 3, 2);
            return 0;
        }
    },
    {
        name:'bomb',
        jpnm:'爆弾',
        price:100,
        desc:'指定した人単体に、その最大体力の100%の固定貫通間接ダメージを与える。',
        flav:'エクスプローージョン！！！\n敵を確殺します。嬉しいね',
        func:async function(who,are){
            await logText('爆発オチなんてサイテー！！');
            if(await attack(who, are, "100%", 'cn', ['%!maxhp','追撃無し',"固定","貫通"])) return 1;
            
            return 0; //生きることもあります たぶん
        }
    },
    {
        name:'redcard',
        jpnm:'レッドカード',
        price:60,
        desc:'この次の人のターンを強制的にスキップさせます。',
        flav:'特にファールとかをしていなくても、これを見せるだけで合法的に人を減らすことができます。うれしいね',
        func:async function(who,are){
            await buffAdd(who, are,'skip',1,1);
            await logText('ピピッ、レッドカードが出ました');
            return 0;
        }
    },
    {
        name:'bluecard',
        jpnm:'ブルーカード',
        price:60,
        desc:'トランプのJでも代用可。\nなぜか知らないけど青色のイメージが強い',
        func:async function(who, are){
            await logText('これはリバースのモニュメントか？');
            aH = who.hp/who.maxhp * are.maxhp;//割合交換(そのうちゲージにする時用)
            wH = are.hp/are.maxhp * who.maxhp;
            if(await heal(who, are, aH, ["set"])) return 1;
            if(await heal(who, who, wH, ["set"])) return 1;

            return 0;
        }
    },

    {
        name: "crab_halve",
        jpnm: "ざりがにハーブ",
        desc: "指定した敵単体の防御力を3ターンの間半減させる。",
        // flav: "浅めの海から産出される、なぜか硬い甲羅に覆われ生育している海藻"
        flav: "海に隣接した森で産出される赤色の葉っぱ。なぜか葉の表皮の一部が硬化している。",
        price: 40,
        func: async function(who, are){
            buffAdd(who, are, "crabhalve", 3, 1);
        }
    },
    {
        no:1,
        name:"unsoluble_hagi", //un(否定) + soluble(可溶の)の造語。と思ったら一時期使われてたらしい
        jpnm:"ナンヨウ萩",
        desc:"指定した対象単体に「H2Oの影響を受けない」を3t付与する。これは中和反応や凍結だけでなく、発火にも影響する。",
        flav:"鮮やかな青と黄色で成る蝶のような見た目をした花。なぜか葉だけでなく根にも撥水性があるため、水をやっても無駄である。そのため、我々には未だ育てることは不可能である。…一説によると、茎内部で奇跡的に起きた中和反応によって細胞に水を届け続けることで花になる…?のだとか。"
    },
    {
        no:1,
        name:"nitro_booster",
        jpnm:"Nitro Booster",
        desc:`使用されたキャラクターはspd2倍、aim1.3倍を獲得する。戦闘終了時まで継続。
        [1] もし何らかの要因で発火が発生したならば、装備者はその現在体力の50%の自傷ダメージを受け、さらに「火傷」2tを付与されたのち、効果は解除される。`,
        flav:"Why dont we go to end of Infinity? （無限の終わりに一緒に行きませんか？）（敬語）（丁寧）（あの、すみませんバズさんー）（それは木の(状態)）"
    }
]

const Skills = [
    {
        no:1,
        type:'ex',
        name:'null',
        jpnm:'null',
        desc:'何もないです。\nまあこれが店頭に並ぶこともないでしょうけどね。\nはい論破',
        price:0,
    },
    {
        //変更予定
        type:'ex',
        name:'',
        jpnm:'',
        desc:``,
        price:50,
        
        exclusive:'color_slime',
        func:async function(who){
            return 0;
        }
    },
    {
        type:'ex',
        name:'placeturret',
        jpnm:'雷ちゃん、召喚',
        desc:'タレットを1つ配置する',
        price:95,
        
        func:async function(who){
            turretPlace(cam);
            return 0;
        }
    },
    {
        type:'ex',
        name:'trickyvariables',
        jpnm:'トリッキーな変数',
        desc:'爆弾を投げる。効果はランダム',
        price:95,
        
        func:async function(who){
            let [target, tcam] = await selectSyudou();
            await logText(`${humans[cam][me].jpnm}は爆弾を投げた...`);
            x = random(0,5)
            switch(x){
                case 0:{
                    await logText('しかし不発弾だった!!');
                    break;//これによる効果とかもあっていいかも
                };
                case 5:{
                    await logText('Lucky! 爆弾は焼夷弾だった!!!');
                    break;
                };
                case 4:{
                    await logText('爆弾は花火だった!');
                    break;
                };
                case 3:{
                    await logText('爆弾は毒ガス入りだった!!');
                    await buffAdd(who, are,'poison', 3,1);
                    break; //毒ガス入りだった場合
                };
                case 2:{
                    await logText('爆弾はスライム入りだった!!');
                    await buffAdd(who, are,'onslime', 2,1);
                    break;//スライム入りだった場合
                };
                case 1:{
                    await logText('爆発した..だがただの特殊な薬品だった!!');
                    break;
                };
            }
            let result = await attack(who,are,x,'ph',4);
            if(result == 'end'){return 1;}
            return 0;
        }
    },
    {
        type:'ex',
        name:'bigdiamond',
        jpnm:'私がかけた魔法だよ',
        desc:'敵に攻撃力の150%のダメージを与え、たまに凍らせる',
        price:80,
        
        func:async function(who){
            let [target, tcam] = await selectSyudou();
            await logText(
                arraySelect(
                    ['こんな大きなダイアモンド見たことないでしょ？あげるね～',
                        'あなた…それじゃあダメだよ',
                        'ちょっとは静かになさい！',
                        '私が誰だか知ってるの？'
                    ]
                )
            );
            let result = await attack(who,are,1.5,'ph',4);
            if(result == 'end'){return 1;}
            if(Math.floor(Math.random()*2)) await buffAdd(who, are,'freeze', 4,1)
            return 0;
        }
    },
    {
        type:'ex',
        name:'lightningstorm',
        jpnm:'ライニングストーム',
        desc:'敵全体に攻撃力の120%のダメージを与え、帯電にする\n帯電:自身の行動時自傷ダメージが入る',
        price:60,
        
        func:async function(who){
            let [target, tcam] = await selectSyudou(3);
            let result = await attack(who,are,1.5,'ph',4);
            if(result == 'end'){return 1;}
            await buffAdd(who, are,'elec', 2,1);
            return 0;
        }
    },
    {
        type:'ex',
        name:'kylieelison',
        jpnm:'Kylie Eleison',
        desc:'敵に攻撃力の200%のダメージ。もし敵の体力が70%以上ならば400%',
        price:110,
        
        func:async function(who){
            phase = 0; disappear();
            let target = await selectSyudou();
            x = 2;
            if(humans[target[1]][target].hp > humans[target[1]][target].maxhp * 0.7) x = 4;
            let result = await attack(who,target[1],target,x,'ph',4);
            if(result == 'end'){return 1;}
            return 0;
        }
    },
    {
        type:'ex',
        name:'standrone',
        jpnm:'自走式閃光ドローン',
        desc:'敵に攻撃力の75%のダメージを与え、スタンさせる',
        price:60,
        
        func:async function(who){
            phase = 0; disappear();
            let target = await selectSyudou();
            if(await attack(who,target[1],target,0.75,'ph',4)) return;
            await buffAdd(target[1],target,'stun', 1,1);
            return 0;
        }
    },
    {//仲間にした方がいいかも
        type:'ex',
        name:'recievechallenge',
        jpnm:'挑戦状を受け取ってください!!',
        desc:'敵の防御力を下げ、自身の攻撃力を上げる',
        price:90,
        
        func:async function(who){
            phase = 0; disappear();
            let [tcam, tme] = await selectSyudou();
            let result = await attack(who, are ,0.2, 'ph', 95);
            if(result == 'end'){return 1;}
            await buffAdd(who, are,'shell',3,1);
            await buffAdd(who, are,'power', 3,2);
            return 0;
        }
    },
    {//上に同じく
        type:'ex',
        name:'timedpursuit',
        jpnm:'小心者の観測',
        desc:'敵を弱点把握状態を付与する',
        price:50,
        
        func:async function(who){
            phase = 0; disappear();
            let [tcam, tme] = await selectSyudou();
            await logText(arraySelect(['わたしはその辺の小石...','わたしのことなんて、気にしないでください...','すみません、一人にさせてください......']));
            await buffAdd(who, are,'weaknessgrasp', 1,1);//弱点把握状態
            return 0;
        },
    },
    //bombeはしんだよ
    
    // ns
    {
        no:1,
        type:'ns',
        name:'null',
        jpnm:'null',
        desc:'(まじでnullです。効果無し。外れ。乙)',
        price:0,
        cool:0
    },
    {
        type:'ns',
        name:'throwslime',
        jpnm:'Attach!Slime!!',
        desc:'敵にスライムをくっつける',
        price:70,
        
        cool:3,
        func:async function(who){
            let are = selectJodou(who, 'are', 0, 'random');
            await buffAdd(who, are,'onslime', 1,1);
            await logText(`${are.name}にスライムが覆い被さった!`);
            return 0;
        }
    },
    {
        type:'ns',
        name:'throwwrench',
        jpnm:'匙を投げる？これはレンチだよ',
        desc:'レンチを投げる準備をし、次の攻撃が二倍になる',
        price:70,
        
        cool:4,
        func:async function(who){
            await buffAdd(who, who,'letsthrow', 2,1);
            await logText('wrenchを投げる準備ができた!');
            return 0;
        }
    },
    {
        type:'ns',
        name:'gambler',
        jpnm:'かけ上手',
        desc:'次の攻撃時に0,2,4倍の倍率がかかる',
        price:70,
        
        cool:3,
        func:async function(who){
            await buffAdd(who, who,'gambling', 1,1);
            logText('さあ、ギャンブルの時間だ!!');
            return 0;
        }
    },
    {
        type:'ns',
        name:'improve',
        jpnm:'改善が必要だよ',
        desc:'攻撃力を1.4倍に上昇させる',//変更予定,
        price:30, //"負荷"みたいにして、stackのbuffをつけて、攻撃力を上げさせる〜とかどう？
        
        cool:5,
        func:async function(who){
            await buffAdd(who, who,'improve', 4,1);
            await logText('パーツアップグレード。');
            return 0;
        }
    },
    {
        type:'ns',
        name:'elecbarrier',
        jpnm:'エレクトリックバリア',
        desc:'体力が最も低い味方に帯電バリアを付与する。\n帯電バリア:被攻撃時相手に帯電を付与する\n帯電:自身の行動時自傷ダメージが入る',
        price:70,
        
        cool:3,
        func:async function(who){
            let are = selectJodou(who, 'who', 'hp', 'low');
            await buffAdd(who, are,'elecshield', 2,1);
            await logText('帯電バリアを付与しました！');
            return 0;
        }
    },

    // ps
    {
        no:1,
        type:'ps',
        name:'null',
        jpnm:'null',
        desc:'(まじでnullです。効果無し。外れ。乙)',
        price:0,
    },
    {
        type:'ps',
        name:'sthree',
        jpnm:'DoYourBest!!',
        desc:'slash時、たまに3回攻撃する',
        price:90,
        
    },
    {
        type:'ps',
        name:'solplaceturret',
        jpnm:'雷ちゃん、もうちょっと',
        desc:'slash of light命中時、タレットを1つ配置する',
        price:90,
        
    },
    {
        type:'ps',
        name:'highsol',
        jpnm:'生粋の勝負師',
        desc:'slash of lightの命中率が下がるが、命中時3倍のダメージ',
        price:90,
        
    },
    {
        type:'ps',
        name:'enemy50%pursuit',
        jpnm:'一度限りの取引',
        desc:'攻撃によって敵の体力を50%以下だった場合、攻撃力の70%で追撃する',
        price:70,
        
    },
    {
        type:'ps',
        name:'elecshock',
        jpnm:'エレクトリック衝撃',
        desc:'会心時、相手に帯電を付与する。\n帯電:自身の行動時自傷ダメージが入る',
        price:90,
        
    }
]

const Stages = [
    {
        name:'草原',
        jpnm:'創生黎明の原野',
        color:"#8feb87",
        tiles: ['a','b'],
    },
    {
        // no:1,
        name:'砂漠',
        jpnm:'ガチェンレイゲスドゥールラート',
        tiles: ['b','c','d'],
    },
    {
        no:1,
        name:'遊園地',
        jpnm:'油淋鶏',
        tiles: ['c','d'],   
    }
];

// "物とか"
const Objects = [
    //0|1 able:登場不可|登場可 on:乗れない|乗れる 
    {
        no:1,
        name:'none',
        jpnm:'none',
        in:'すべて',
        on:1, //プレイヤーはこの上に乗れるか
        p:20, //出現確率 (基本:20)
        n:0, //最大出現数 (0なら逆に無制限)
        s:0, //歩行速度 (0に近づくほど速い)(0なら逆に動けない)
        ables:[], //可能なこと これは基本動くやつ向け
        sei:[], //性質 触れるだけで系とか。ここに何かがあれば関数も書くこと
        func:async function(){}
    },
    {
        name:'stair',
        jpnm:'階段',
        in:'すべて',
        on:1,
        p:20,
        n:1,
        s:0,
        ables:[],
        sei:[],
        func:async function(){
            nextFloor();
        }
    },
    {
        name:'door',
        jpnm:'ドア',
        in:'すべて',
        on:1,
        p:20,
        n:1,
        s:0,
        ables:[],
        sei:[],
        func:async function(){
            nextStage();
        }
    },
    {
        name:'enemy',
        jpnm:'敵',
        in:'すべて',
        on:0,
        p:20,
        n:0,
        s:0,
        ables:[],
        sei:[],
        func:async function(){
            encount();
        },
    },
    {
        name:'boss',
        jpnm:'上司',
        in:'すべて',
        on:0,
        p:20,
        n:1,
        s:0,
        ables:[],
        sei:[],
        func:async function(){
            BossEnemyAppear();
        }
    },
    {
        name:'fire_on',
        jpnm:'焚き火',
        in:'すべて',
        on:1,
        p:20,
        n:3, //気分
        s:0,
        ables:[],
        sei:[],
        func:async function(){
            let p = dunF.get();
            p.moving = 1;

            document.querySelector('#overfieldArea').style.display = 'none';
            document.querySelector('#eventArea').style.display = 'block';
            document.querySelector('#eventArea').innerHTML = `<button id="CampRest" onclick="Camprest()"></button>
            <button id="CampTrade" onclick="Camptrade()"></button>`
            log.textContent = '休憩できそうな場所を見つけた！';
            Camprestper = (Math.floor(Math.random() * 4)+3)/10;
            document.querySelector('#CampRest').textContent = '朝まで休む(' + Camprestper*100 + '%回復)';//30のときはスキルカード強化みたいなやつあってもいいかも
            switch(Math.floor(Math.random() * 3)+1){
                case 1:
                if(Math.floor(Math.random() * 3)+1) y = 10,document.querySelector('#CampTrade').textContent = '放浪武器商人に話しかける';
                else    y = 1, document.querySelector('#CampTrade').textContent = '武器商人に話しかける';
                break;
                case 2: y = 2; document.querySelector('#CampTrade').textContent = '防具取扱専門家に話しかける'; break;
                case 3: y = 3; document.querySelector('#CampTrade').textContent = '道具屋24に話しかける'; break;
            }
        }
    },
    {
        no:1,
        name:'fire_off',
        jpnm:'焚き火跡',
        in:'すべて',
        on:1,
        p:20,
        n:3,
        s:0,
        ables:[],
        sei:[],
        func:async function(){
            await logText(arrayGacha( //この重複感好き
                ['この焚き火はもう木炭になっている','まだ温かい..この辺りに誰かいるようだ'],
                [85,15]
            ));
        }
    },
    {
        name:'shop_skill',
        jpnm:'スキルショップ',
        in:'すべて',
        on:1,
        p:20,
        n:1,
        s:0,
        ables:[],
        sei:[],

        func:async function(){
            SkillShopOpen();
        }
    },
    {
        name:'chest_n',
        jpnm:'宝箱',
        in:'すべて',
        on:0,
        p:20,
        n:0,
        s:0,
        ables:[],
        sei:[],
        func:async function(){
            OpenChest(1);
        }
    },
    {
        name:'chest_r',
        jpnm:'レア宝箱',
        in:'すべて',
        on:0,
        p:20,
        n:2,
        s:0,
        ables:[],
        sei:[],
        func:async function(){
            OpenChest(2);
        }
    },
    {
        no:1,
        name:'hopebutton',
        jpnm:'救いのボタン',
        in:'草原',
        on:0,
        p:20,
        n:3,
        s:0,
        ables:[],
        sei:[],
        func:async function(){
            HopeButtonact();
        }
    },
    {
        name:'candytray',
        jpnm:'あめ置き場',
        in:'草原',
        on:1,
        p:30,
        n:1,
        s:0,
        ables:[],
        sei:[],
        func:async function(){
            Candytake();
        }
    },
    {
        name:'cookietray',
        jpnm:'クッキー置き場',
        in:'草原',
        on:1,
        p:15,
        n:4,
        s:0,
        ables:[],
        sei:[],
        func:async function(){
            Cookietake();
        }
    },
    {
        name:'scorpion',
        jpnm:'さそりさん',
        in:'砂漠',
        on:1,
        p:20,
        n:1,
        s:0,
        ables:[],
        sei:[],
        func:async function(){
            ScorpionAct(1);
        }
    },
    {
        name:'scorpion2',
        jpnm:'さそりさん2世',
        in:'砂漠',
        on:1,
        p:10,
        n:1,
        s:0,
        ables:[],
        sei:['乗る'],
        func:async function(){
            ScorpionAct(2);
        },
        乗る: async() => {
            ScorpionAct(2);
        }
    },
    {
        name:'cutras',
        jpnm:'さぼてんさん',
        in:'砂漠',
        on:0,
        p:20,
        n:1,
        s:0,
        ables:[],
        sei:['接触'],
        func:async function(){
            CatusAct();
        },
        接触: async() => {
            CatusAct();
        }
    },
    {
        name:'oasis',
        jpnm:'おあしす',
        in:'砂漠',
        on:1,
        p:18,
        n:2,
        s:0,
        ables:[],
        sei:[],
        func:async function(){
            OasisAct();
        }
    },
    {
        no:1,
        name:'sandstorm',
        jpnm:'砂嵐',
        in:'砂漠',
        on:1,
        p:20,
        k:0,
        s:0,
        ables:[],
        sei:[],
        func:async function(){}
    },
]

const Enemies = [
    {
        name:'蒼白の粘液',
        ins:['草原', '砂漠'],
        maxhp:'+15',
        atk:'+0',
        def:'-5',
        maxmp:'0',
        matk:'0',
        mdef:'-30',
        crla:'=absolute',
        crdm:'=0',
        crrs:'=absolute',
        spd:'40',
        acts:[
            {
                name:'粘液飛ばし',
                p:75,
                num:1,
                func:async function(who){
                    await logText(`${who.name}は粘液を飛ばしてきた！`);
                    let are = selectJodou(who, 'are', 'hp', 'high');
                    let res = await attack(who, are, 100, 'ph', 100);
                    if(res) return 1;
                    
                    return 0;
                }
            },
            {
                name:'粘液付与',
                p:25,
                num:3,
                func:async function(who){
                    await logText(`${who.name}は粘液を絡ませてきた！`);
                    let are = await selectJodou(who, "are", 'hp', 'high');
                    await buffAdd(who, are, 'stickyslime', 2, 1);
                    return 0;
                }
            }
        ]
    },
    {
        name:'翠嵐の風刃',
        ins:['草原'],
        maxhp:'-20',
        atk:'+10',
        def:'-20',
        maxmp:'0',
        matk:'+0',
        mdef:'+0',
        crla:'+30',
        crdm:'+0.5',
        crrs:'+0',
        spd:'85',
        acts:[
            {
                name:"体当たり",
                des:"攻撃力の70%のダメージを敵単体に与える。",
                flav:"速攻アタッカーらしい一撃。",
                p:70,
                aim:80,
                voi:70,
                num:1,
                func:async function(who){
                    await logText(`${who.name}は体当たりを仕掛けてきた！`);
                    let are = selectJodou(who, 'are', 'hp', 'low');
                    if(await attack(who, are, this.voi, 'ph', this.aim)) return 1;
                    return 0;
                }
            },
            {
                name:'体当たり・改',
                desc:"攻撃力の130%のダメージを敵単体に与える。",
                flav:"体当たりの強化版。当たりやすくなっただけでなく、遠心力により威力も上がった。",
                p:30,
                aim:95,
                voi:130,
                num:3,
                func:async function(who){
                    await logText(`${who.name}は回転しながら突進してきた！`);
                    let are = selectJodou(who, 'are', 'hp', 'low');
                    if(await attack(who, are, this.voi, 'ph', this.aim)) return 1;
                    return 0;
                }
            }
        ]
    },
    {
        name:'黄昏の穿影',
        ins:['草原'],
        maxhp:'-10',
        atk:'+15',
        def:'+0',
        maxmp:'=0',
        matk:'+0',
        mdef:'+0',
        crla:'+0',
        crdm:'+0',
        crrs:'+0',
        spd:'60',
        acts:[
            {
                name:'消滅',
                p:60,
                type:'',
                prop:['reInvisi'],
                num:1,
                func:async function(who){
                    await logText(`${who.name}は姿を消..あれどこ行った？`);
                    let are = selectJodou(who, 'who', 0, 'cen');
                    await buffAdd(who, are,'disappear', 2,1);
                    return 0;
                }
            },
            {
                name:'衝突',
                p:20,
                type:'',
                prop:['abInvisi'],
                num:2,
                func:async function(who){
                    let x = buffhas(who, 'disappear') ? (buffclear(who, 'disappear'), 200) : 100;
                    await logText(`${who.name}は突進してきた！`);
                    let are = selectJodou(who, 'are', 0, 'random');
                    let result = await attack(who, are, x, 'ph');
                    return result;
                }
            },
            {
                name:'ローキック',//ロストワンの号哭の号哭使いたいけど意味が泣くことらしい
                p:20,
                type:'none',
                num:3,
                func:async function(who){
                    await logText(`${who.name}はローキックしてきた！`)
                    let are = selectJodou(who, 'are', 'hp', 'low');
                    let result = await attack(who, are, 70, 'ph');
                    await buffAdd(who, are, 'spddown', 2, 1);
                    return result;
                }
            }
        ]
    },
    {
        name:'燐光の妖花',
        ins:['草原'],
        maxhp:'+0',
        atk:'-10',
        def:'+0',
        maxmp:'=0',
        matk:'+0',
        mdef:'+15',
        crla:'+0',
        crdm:'+0.5',
        crrs:'+10',
        spd:'50',
        acts:[
            {
                name:'しびれごな',
                p:30,
                type:'none',
                num:1,
                func:async function(who){
                    await logText(`${who.name}は痺れ粉を振りかけてきた！`)
                    let are = selectJodou(who, 'are', 'hp', 'high');
                    await buffAdd(who, are, 'palsy', 2, 1);
                    return 0;
                }
            },
            {
                name:'どくのこな',
                p:30,
                type:'none',
                num:2,
                func:async function(who){
                    await logText(`${who.name}は毒の粉を振りかけてきた！`)
                    let are = selectJodou(who, 'are', 'hp', 'high');
                    await buffAdd(who, are, 'poison', 2, 1);
                    return 0;
                }
            },
            {
                name:'ねむりごな',
                p:30,
                type:'none',
                num:3,
                func:async function(who){
                    await logText(`${who.name}は眠り粉を振りかけてきた！`)
                    let are = selectJodou(who, 'are', 'hp', 'high');
                    await buffAdd(who, are, 'sleeping', 1, 1);
                    return 0;
                }
            }
        ]
    },
    {
        no:1,
        name:'茎槍の狩人',
        ins:['草原'],
        maxhp:'+0',
        atk:'+10',
        def:'+2',
        maxmp:'0',
        matk:'+0',
        mdef:'+0',
        crla:'+0',
        crdm:'+0.5',
        crrs:'+10',
        spd:'50',
        acts:[
            {
                name:'急襲',
                p:30,
                type:'',
                num:3,
                    func:async function(who){
                    let are = selectJodou(who, 'are', 'def', 'low');
                    let res = await qte(1000,['a','d']); //0が失敗, 1が成功
                    switch(res){
                        case 0:
                            
                    }
                    return 0;
                }
            },
        ]
    }
];

let Prefixes = [
    {
        name:'furious',
        jpnm:'激昂',
        rare:1,
        effects:{
            atk: '=150%',
            def: '=75%',
            critrate: '=5'
        }
    },
    {
        name:'calm',
        jpnm:'冷静沈着な',
        rare:1,
        effects:{
            atk: '=75%',
            def: '=200%',
            critrate: '=5'
        },
    },
    {
        name:'gambler',
        jpnm:'ギャンブラーな',
        rare:1,
        effects:{
            crla: '+4',
            maxhp: '=200%'
        }
    },
    {
        name:'tough',
        jpnm:'守りが固い',
        rare:2,
        effects:{
            crrs: '+5',
            maxhp: '=125%',
            atk: '=30%',
            def: '=150%',
        }
    },
    {
        name:'wise',
        jpnm:'心眼持ちの',
        rare:3,
        effects:{
            crla: '=100',
            crdm: '=120',
            atk: '=30%',
        }
    },
]