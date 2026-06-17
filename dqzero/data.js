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
    
];

const Images = {
    systems:["error",'select','circle','phone','star1','star1_pre','star2','star2_pre','star3','star3_pre','dungeon'],
}

const Sounds = {
    se:['error', 'place'],
    // bgm:[],
}

const Spaces = [
    { name:'home', rank:2, back:'#f0f8ff', sho:1 },
    { name:'batt', rank:2, back:'#faf0ff', sho:1 },
    { name:'gamble', rank:2, back:'#b4ddb8', sho:1 },
];




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
        desc:"攻撃を回避する確率。\n基本0",
        whi:"defer",
        bas:0
    },
    {
        name:"targe",
        jpnm:"命中率",
        desc:"攻撃が命中する確率。\n基本100",
        whi:"atker",
        bas:100
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
            colorp:"color_slime_",
            color0:"green",
            colors:["green", "black", "blue", "purple", "red", "white", "yellow"]
        },
        desc:'スライム。...まだできてないから使わない方が吉',
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
            mdef:0,
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


let Buffs = [
    { //if value < 0, それはデバフ扱い
        name:'power', //keyと同じものを
        jpnm:'攻撃倍率',
        type:'buff', // buff/debuff/handle/unique
        kind:'turn',
        mode:'free', // turn/stack/actは付与時に決定。kindはfixe（Lv依存で値決定）かfree（付与時の引数で値決定）を定める用に。 poison/deadpoisonはfixe、burnもfixe。cheerupはfixe。atkup等能力値上昇系はfree。
                                 // if(data.kind??'fixed')ってすべきかも。あんまないと思うけど
        agemono:'power',
         //turn/actならばvalueが等しいならtimeを増加新を削除、等しくないならば新しいものを追加。stackならばtimeがvalueだからかどうかあがいても加算。同名が増えるこたぁない。
        desc:'攻撃倍率が上がる。やったね！',
    },
    {
        name:'shell',
        jpnm:'防御倍率',
        type:'buff',
        kind:'turn',
        mode:'free',
        agemono:'shell',
        desc:'防御倍率が上がる。あんまり実感しづらい。',
    },
    {
        name:'luck',
        jpnm:'幸運',
        type:'buff',
        kind:'turn',
        mode:'fixe',
        desc:'ターン終了時、確率でもう一回行動できる。\nLv7ならば確定。\n願うと起きやすいです',
        lvs:[
            {luck:'+20'},
            {luck:'+33'},
            {luck:'+50'},
            {luck:'+67'},
            {luck:'+80'},
            {luck:'+90'},
            {luck:'+100'},
        ],
        max:7
    },
    {
        name:'disappear',
        jpnm:'消滅',
        type:'buff',
        kind:'turn',
        mode:'fixe',
        desc:'姿を消し、攻撃を受けなくなる。\nしかし範囲攻撃はちゃんと当たる。\nLv1ならば範囲攻撃で解除される。',
    },
    {
        name:'cheerup',
        jpnm:'応援！',//多分「攻撃！」モチーフ
        type:'buff',
        kind:'turn',
        mode:'fixe',
        desc:'応援されている状態。攻撃力と速度が上がり会心率が下がる。\nちょっと緊張しちゃうよね、わかる',
        lvs:[
            {
                power:'+1.0',
                spd:'+20.0',
                crla:'-5.0'
            },
            {
                power: '+1.5',
                spd: '+25.0',
                crla: '+-6.5'
            }
        ],
        max:2
    },
    {
        name:'poison',
        jpnm:'毒',
        type:'debuff',
        kind:'turn',
        mode:'fixe',
        dot:'poison',
        desc:'ターン終了時HP割合で防御貫通ダメージ。\n毒の苦しみもお好きなんですね',
        //ターン終了時体力のx%のダメージ
        lvs:[
            {poison:'5%'},
            {poison:'7%'},
            {poison:'10%'},
            {poison:'15%'},
            {poison:'20%'},
        ],
        max:5
    },
    {
        name:'poison_deadly',
        jpnm:'猛毒',
        type:'debuff',
        kind:'turn',
        mode:'fixe',
        dot:'poison',
        desc:'ターン終了時HP割合で防御貫通ダメージ。\nついでにランダムで他のバフ(良)の持続時間を1減少\n徐々〜に蝕まれて終わります。解消を推奨す',
        lvs:[
            {poison:'7%'},
            {poison:'10%'},
            {poison:'15%'},
            {poison:'20%'},
            {poison:'25%'}, //4ターンで死にますね、これ。終わってる
        ],
        max:5
    },
    {
        name:'blood',
        jpnm:'出血',
        type:'debuff',
        kind:'turn',
        mode:'fixe',
        dot:'blood',
        desc:'ターン終了時固定ダメージ、非攻撃毎に1.5倍に増加。\nそのままにしとくと普通に死にます',
        //ターン終了時nダメージ、ダメージ喰らい後2倍に増加
        lvs:[
            {blood:2},
            {blood:5},
            {blood:7},
            {blood:10},
            {blood:20},
            {blood:35},
        ],
        max:6
    },
    {
        name:'blood_born', //大怒られしそうな名前だなこれ
        jpnm:'血の誕生',
        type:'debuff',
        kind:'turn',
        mode:'fixe',
        dot:'blood',
        desc:'ターン終了時固定ダメージ、ターン終了毎に2.0倍に増加。\nガチで死にかねん故早めに解除しよう',
        //ターン終了時nダメージ、ターン終了後2倍に増加
        lvs:[
            {blood:5},
            {blood:7},
            {blood:10},
            {blood:20},
            {blood:35},
            {blood:50}, //だめだろ。50→100→200→400→800→1600は。殺戮用
        ],
        max:6
    },
    {
        name:'burn',
        jpnm:'火傷',
        type:'debuff',
        kind:'turn',
        mode:'fixe',
        dot:'burn',
        desc:'ターン終了時固定ダメージ\nマイクラだとすごいギリで耐えるか死ぬかのやつよね',
        //ターン終了時nダメージ
        lvs:[
            {burn:5},
            {burn:10},
            {burn:20},
            {burn:35, atk:'-5'},
            {burn:50, atk:'-10'},
        ],
        max:5
    },
    {
        name:'burn_out',
        jpnm:'燃え尽き症候群', //...結構ぴったりよな、俺の雑々ネーミングセンス
        type:'debuff',
        kind:'turn',
        mode:'fixe',
        dot:'burn',
        desc:'ターン終了時固定ダメージ。\nあと...このデバフのダメージで死んだ場合、お金が半分燃えて消えます\n珍しいしょ〜〜戦闘外干渉系',
         //ほんっとお前...もしこのゲームがローグライクカードゲームだったらカードを一枚ランダムに燃やしてたからな？？？ガチ感謝しろよ？？？
        //ターン終了時nダメージ
        lvs:[
            {burn:10},
            {burn:20},
            {burn:35, atk:'-5'},
            {burn:45, atk:'-10'},
            {burn:55, atk:'-15'},
            {burn:75, atk:'-25'},
        ],
        max:6
    },
    {
        name:'elec',
        jpnm:'帯電',
        type:'debuff',
        kind:'turn',
        mode:'fixe',
        dot:'elec',
        desc:'ターン終了時固定ダメージ\nターン終了時、確率で他の味方に伝染する', //"風邪"とかの方が良かったか...?
        //ターン終了時n1ダメージ、n2%の確率で他の味方に伝染
        lvs:[
            {elec:5, spread:10},
            {elec:10, spread:20},
            {elec:20, spread:35},
            {elec:30, spread:50},
            {elec:45, spread:80},
            {elec:60, spread:99},
        ],
        max:6
    },
    {
        name:'elec_elec',
        jpnm:'帯電・帯電',
        type:'debuff',
        kind:'turn',
        mode:'fixe',
        dot:'elec',
        desc:'ターン終了時固定ダメージ\nターン終了時、確率で他の味方に伝染する\nあと確率で麻痺のデバフを自身に付与します\n帯電・帯電ってなんだよ',
        //ターン終了時n1ダメージ、n2%の確率で他の味方に伝染
        lvs:[
            {elec:10, spread:20, palsy:10},
            {elec:20, spread:35, palsy:25},
            {elec:30, spread:50, palsy:33},
            {elec:45, spread:80, palsy:50},
            {elec:60, spread:99, palsy:67},
            {elec:80, spread:100, palsy:100},
        ],
        max:6
    },
    {
        name:'injury',
        jpnm:'傷口',
        type:'debuff',
        kind:'turn',
        mode:'fixe',
        dot:'injury',
        desc:'攻撃毎に固定ダメージ。\n連続攻撃/行動ビルドに大打撃\n私はこのデバフが最も嫌いです。まぢ無理',
        //攻撃毎にnダメージ
        lvs:[
            {injury:10},
            {injury:25},
            {injury:40},
            {injury:55},
        ],
        max:4
    },
    {
        name:'injury_gore',
        jpnm:'裂痕', //れっこん..ほぼ造語。中国語にはあるらしい
        type:'debuff',
        kind:'turn',
        mode:'fixe',
        dot:'injury',
        desc:'行動時固定ダメージ。\nあと被回復量が半減します。\nさっさと解除せんと結構やばいです',
        //攻撃毎にnダメージ
        lvs:[
            {injury:25},
            {injury:40},
            {injury:55},
            {injury:70},
        ],
        max:4
    },

    {
        name:'freeze',
        jpnm:'氷結', //レモンサワーじゃないです
        type:'handle',
        kind:'turn',
        mode:'fixe',
        desc:'凍っている状態。\nターン開始時、n%の確率で解除されます\n炎属性の攻撃を受けても解除できます',
        // n/100の確率で解除
        lvs:[
            {freeze:75},
            {freeze:67},
            {freeze:50},
            {freeze:33},
            {freeze:20},
            {freeze:5},
        ],
        max:5
    },
    {
        name:'freeze_blue',
        jpnm:'凍結', //blueの真意に気づけるかな〜〜？？
        type:'handle',
        kind:'turn',
        mode:'fixe',
        desc:'凍結されている状態。\nターン開始時、n%の確率で解除されます\n炎攻撃を受けても解除不可です',
        // n/100の確率で解除
        lvs:[
            {freeze:67},
            {freeze:50},
            {freeze:33},
            {freeze:20},
            {freeze:5},
            {freeze:1},
        ],
        max:6
    },
    {
        name:'freeze_eternal',
        jpnm:'エターナルフリーズ',
        type:'handle',
        kind:'turn',
        mode:'fixe',
        desc:'エターナルフリーズ！！', //どうあがいても解除不可です。この先、デバフ解除が有効だ
        // n/100の確率で解除
        lvs:[
            {freeze:0}
        ],
        max:1
    },
    {
        name:'palsy',
        jpnm:'麻痺',
        type:'handle',
        kind:'turn',
        mode:'fixe',
        desc:'麻痺ですね。これ好き',
        // n/100の確率で行動不可
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
        type:'handle',
        kind:'turn',
        mode:'fixe',
        desc:'スタンです。\n内部処理的には麻痺の延長',
        // n/100の確率で行動不可
        lvs:[
            {palsy:100}
        ],
        max:1
    },
    {
        name:'skip',
        jpnm:'スキップ',
        type:'handle',
        kind:'turn',
        mode:'fixe',
        desc:'はいお前スキップ〜〜笑笑\nぴえん超えてだっさぁですね\nえ？違う？',
    },
    {
        name:'sleepiness',
        jpnm:'睡魔',
        type:'handle',
        kind:'turn',
        mode:'fixe',
        desc:'睡魔..微熱魔じゃないです\nターン終了時にsleepyをnstack増加さかせます',
        // sleepy:sleepyをnstack増加
        lvs:[
            {sleepy:10}, //ほとんど1で。
            {sleepy:20},
            {sleepy:25},
        ],
        max:3
    },
    {
        name:'sleepy',
        jpnm:'眠気',
        type:'handle',
        kind:'stack',
        mode:'fixe',
        desc:'眠くなってる状態..です....\n100stack到達でsleepingに変化します....\n変化後のsleepingのLvはsleepinessに寄りけりです\nあと、行動時にsleepyをnstack減少できます....',
        lvs:[ //-と捉へよ
            {sleepy:6},
            {sleepy:9},
            {sleepy:12},
        ],
        max:3
    },
    {
        name:'sleeping',
        jpnm:'睡眠',
        type:'handle',
        kind:'stack',
        mode:'fixe',
        desc:'攻撃されると..ちょっと....起きます......\nzzz...',
        lvs:[
            {sleepy:50},
            {sleepy:65},
            {sleepy:80},
            {sleepy:90},
            {sleepy:95},
            {sleepy:100},
        ],
        max:6
    },
    //この3つ、どれかは固定値にした方がいいかも。これだとLv4, 5が1眠後一緒になる。
    /*
        sleepy → sleeping 案

        ・sleepiness（睡魔）[stack]-[デバフ解除]
        ターン終了時に、sleepyをnstack増加

        ・sleepy（眠気）[stack]-[戦闘終了時解消]
        行動時にn1%の確率でn2stack減少（眠気の覚め）
        100stack到達でこのbuffを消去、sleepingを追加。Lvはsleepiness依存

        ・sleeping（睡眠）[stack]-[戦闘終了時解消]
        行動不能100%
        ダメージ受けたらn1%の確率で「sleepy(n2stack)に戻る」
        → これなら"直接解除"じゃないし、眠気が残るから再び寝落ちしやすい

        ↑これ、なんかのボス専用にした方がいいか？..否、それだとふつーのゲームと同じ。普遍を着飾っていこうず
    */
    {
        name:'anger',
        type:'handle',
        kind:'stack',
        mode:'fixe',
        desc:'すごいイラつかせてくる敵..?\nいやまあ普通にパクリですけれども\nで避けられてさらに煽られるみたいな',
        // 攻撃力が上がり最大体力、防御力が下がる
    },

    //unique
    {
        name:'onslime',
        type:'unique',
        kind:'stack',
        mode:'fixe',
        desc:'スライムが体に粘りついている状態です。やばいね(行動不可)',
        kaijo:"行動開始",
        kaijov:"All",
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
        kind:'turn',
        mode:'fixe',
        desc:'スライムがくっついているおかげで行動するとダメージを受けます',
        flav:'連続行動ビルドに大打撃 part2',
        //行動時ダメージ(固定)
        lvs:[
            {mg:10},
            {mg:20}
        ],
        max:2
    },
    {
        name:'letsthrow',
        type:'unique',
        kind:'turn',
        mode:'fixe',
        desc:'レンチを投げる準備をしている状態。次の攻撃与ダメ2倍',
    },
    {
        name:'gambling',
        type:'unique',
        kind:'turn',
        mode:'fixe',
        desc:'次の攻撃が0,2,4倍になる。これぞ醍醐味..ってやつ？',
    }
]

let Attacks = [
    {
        name:'slash',
        jpnm:'シンプル斬り',
        desc:'必中ー倍単体刹那斬', //そのうち武士作ってこれ作りたい
        mp:0,
        lv:1,
        tcam:'players',
        func:async function(who, are){
            if(await damage(who, are, 100, 'ph')) return 1;

            //elseesに移行よろ
            if(who.ps == 'sthree' && hit(25)){
                await logText(`${who.name}は頑張った!`);
                if(await damage(who, are, 100, 'ph')) return 1;
                if(await damage(who, are, 100, 'ph')) return 1;
            }
            
            return 0;
        }
    },
    {
        name:'double slash',
        jpnm:'つばめ返し',
        desc:'二回攻撃。あたらないこともあるけど現環境最強',
        mp:0,
        lv:1,
        func:async function(who, are){
            if(await damage(who, are, 100, 'ph')) return 1;
            if(await damage(who, are, 100, 'ph')) return 1;

            return 0;
        }
    },
    {
        name:'slash of light',
        jpnm:'一閃',//まじん斬り も作りたいね 霹靂一閃も
        desc:'初期のロマン技。\n当たれば幸い的な感じで打ったほうが楽',
        mp:0,
        lv:1,
        func:async function(who, are){
            let pro = 33;
            if(who.ps == 'highsol') pro = 20;

            let result = 0;
            if(hit(pro)){
                result = await damage(who, are,300,'ph');
                if(result) return dead;
            }else{
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
                if(result) return 1;
            }
            return 0;
        }
    }
]

let Magics = [
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
            await buffadd(who, are,'power', 3,1);
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
            await buffadd(who, are,'shell', 3,1);
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
            await buffadd(who, are,'poison', 4,1);
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
            if(await damage(who, are, 30, 'mg')) return 1;
            if(hit(2)) buffadd(who, are, 'hirumi' , 1)
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
            let result = await damage(who, are,110,'mg',2);//火
            if(result) return 1;
            if(hit(10)) await buffadd(who, are,'burn', 2,1);
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
            await buffadd(who, are, 'luck', 4, 1);
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
            damage(who, are,120,'mg',4);//雷
            if(hit(5)) buffadd(who, are,'hirumi',1)
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
            await buffadd(who, are,'power',3,2)
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
            await buffadd(who, are, 'shellup',3,2)
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
            await buffadd(who, are,'poison', 5,2);
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
            let result = await damage(who, are,230,'mg',2);//火
            await buffadd(who, are,'burn', 2,2);
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
            await buffadd(who, are,'luck', 5,2);
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
            let result = await damage(who, are, 3.5, 'mg',4);//雷
            await buffadd(who, are, 'burn', 3,2);
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
            let result = await damage(who, are,6,'mg',4);//雷
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
            // x = Object.keys(Magics).map(a => Magics[a].lv <= humans[cam][me].level ? Magics[a].name : null).filter(Boolean)
            // y = Math.floor(Math.random() * x.length);
            // log.textContent = x[y]+'が出た！';await delay(1000);
            // x[y](who, are);
            let arr = Magics.filter(a => a.lv <= who.level && a.mp <= who.mp).map(a => a.name);
            if(arr.length >= 1){
                let mg = arraySelect(arr);
                await logText(`${mg}が出た！`);
                await delay(500);
                let res = await Magics[mg].func(who, are);
                return res
            }else{
                await logText(`失敗！`)
                await logText(`マキシマイザ・マキシマイザー！！`);
                return 0;
            }
        }
    }, 
]

let Equips = [
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
            if(await damage(who, are, ))
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
            let result = await damage(who,are,0.4,kind,['unpursuit']);
            if(result) return 1;
            await buffadd(who, are, 'shelldown', 3, 1);
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

let Tools = [
    {
        name:'aspirin',
        jpnm:'アスピリン',
        price:20,
        desc:'味方単体の体力を20%回復',
        flav:'おや、頭が痛いって？\n痛みに効くのはアスピリン！',
        func:async function(who, are){
            if(await heal(who, are, "20%")) return 1;
            return 0;
        }
    },
    {
        name:'glucose',
        jpnm:'ブドウ糖',
        price:25,
        desc:'味方単体の体力を15%回復し、攻撃倍率を少し上昇させる。',
        flav:'これで少しは頑張れそう',
        func:async function(who,are){
            if(await heal(who, are, "15%")) return 1;
            await buffadd(who, are, 'power', 1, 1);
            return 0;
        }
    },
    {
        name:'trypsin',
        jpnm:'トリプシン',
        name:'trypsin',
        price:60,
        desc:'味方単体の体力を50%回復するが、',
        flav:'膵液に含まれる消化酵素の一種。\n薬ではない。',
        func:async function(who,are){
            if(await heal(who, are, "70%")) return 1;
            return 0;
        }
    },
    {
        name:'lulu',
        jpnm:'ルル',
        price:80,
        desc:'味方単体の体力を40%回復。50%の確率で再度40%回復。',
        flav:'sick sickな頭痛薬。\n毒が流るルルですね。',
        func:async function(who,are){
            //await logText(`求愛性 孤独 ドク 流るルル`)
            if(await heal(who, are, '40%')) return 1;
            if(hit(50)) return 0;

            await logText('愛をもっと')
            if(await heal(who, are, '40%')) return 1;
            return 0;
        }
    },
    {
        name:'potion',
        jpnm:'魔法薬',
        price:120,
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
        price:20,
        desc:'指定した人単体の現在体力の10%分のダメージを与える',
        flav:'十六夜さんが投げるあれ\n「では、ナイフの錆にしてあげましょう」',
        func:async function(who,are){
            if(await damage(who,are,"10%",'cn',["%!maxhp",'固定'])) return 1;
            return 0;
        }
    },
    {
        name:'trickyvariables',
        jpnm:'トリッキーな変数',
        price:40,
        desc:'敵全体に攻撃力のn%分の間接ダメージを与える。nは10%, 25%, 40%からランダムに選ばれる。',
        flav:'黒崎コユキ、きちゃいました！！\nなんか面白いことないですか？',
        contex:{
            bai:[10, 25, 40],
            p:[54, 28, 18],
            serif:['ま、これでいいですよね？','結果良ければすべてオッケー！ってね？','これぞ醍醐味、ってやつ？'],
        },
        func:async function(who,are){
            let bai = arrayGacha(this.contex.bai, this.contex.p);
            bai /= 100;
            if(await damage(who, are, x, 'cn',[])) return 1
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
            if(await damage(who, are, 20, 'cn', [])) return 1;
            
            let are2 = selectJodou(who, 'are', 0, 0, 0); //敵 全体
            await buffadd(who, are2, 'burn', 3, 2);
            return 0;
        }
    },
    {
        name:'coveringfire',
        jpnm:'援護射撃',
        price:80,
        desc:'指定した敵に、その現在の体力の75%分のダメージを与える。',
        flav:'ゴミ箱に隠れてる人。\nかわいいね',
        func:async function(who,are){
            // await logText('え、援護します...');
            if(await damage(who, are, "75%", 'cn', ['%!hp'])) return 1;
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
            if(await damage(who, are, "100%", 'cn', ['%!maxhp','追撃無し',"固定","貫通"])) return 1;
            
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
            await buffadd(who, are,'skip',1,1);
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
        name:'greencard',
        jpnm:'グリーンカード',
        price:60,
        desc:'バフを2個ランダムでつける。つよい',
        func:async function(who,are){
            let buffs = arrayShuffle(['power','shellup','luck']);
            for(let i=0; i<2; i++) await buffadd(who, are, buffs[i], 3, random(1, 3));
            await logText(`${are.name}に良い効果を2個つけました！！`);
            return 0;
        }
    },
    {
        name:'blackcard',
        jpnm:'ブラックカード',
        price:60,
        desc:'デバフを2個つける。割とつよい',

        func:async function(who,are){
            buffs = arrayShuffle(['powerdown','shelldown','poison','burn','freeze']);
            for(let i=0; i<2; i++) await buffadd(who, are, buffs[i], 3, random(1, 3));
            await logText(`${are.name}にわるわる効果を2個つけました！！`);
            return 0;
        }
    },

    {
        name: "crab halve",
        jpnm: "ざりがにハーブ",
        // flav: "浅めの海から産出される、なぜか硬い甲羅に覆われ生育している海藻"
        flav: "海に隣接した森で産出される、少し赤みがかった、緑色の葉っぱ。なぜか葉の表皮の一部が硬化している。",
        desc: "指定した敵単体の防御力を3ターンの間半減させる。",
        price: 40,
        func: async function(who, are){
            buffadd(who, are, "crabhalve", 3, 1);
        }
    }
]

let Skills = [
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
                    await buffadd(who, are,'poison', 3,1);
                    break; //毒ガス入りだった場合
                };
                case 2:{
                    await logText('爆弾はスライム入りだった!!');
                    await buffadd(who, are,'onslime', 2,1);
                    break;//スライム入りだった場合
                };
                case 1:{
                    await logText('爆発した..だがただの特殊な薬品だった!!');
                    break;
                };
            }
            let result = await damage(who,are,x,'ph',4);
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
            let result = await damage(who,are,1.5,'ph',4);
            if(result == 'end'){return 1;}
            if(Math.floor(Math.random()*2)) await buffadd(who, are,'freeze', 4,1)
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
            let result = await damage(who,are,1.5,'ph',4);
            if(result == 'end'){return 1;}
            await buffadd(who, are,'elec', 2,1);
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
            let result = await damage(who,target[1],target,x,'ph',4);
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
            if(await damage(who,target[1],target,0.75,'ph',4)) return;
            await buffadd(target[1],target,'stun', 1,1);
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
            let result = await damage(who,are,0.2,'ph',4);
            if(result == 'end'){return 1;}
            await buffadd(who, are,'shell',3,1);
            await buffadd(who, are,'power', 3,2);
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
            await buffadd(who, are,'weaknessgrasp', 1,1);//弱点把握状態
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
            await buffadd(who, are,'onslime', 1,1);
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
            await buffadd(who, who,'letsthrow', 2,1);
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
            await buffadd(who, who,'gambling', 1,1);
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
            await buffadd(who, who,'improve', 4,1);
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
            await buffadd(who, are,'elecshield', 2,1);
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

let Stages = [
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

let Objects = [
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
            document.querySelector('#eventArea').innerHTML = '<button id="CampRest" onclick="Camprest()"></button>\n<button id="CampTrade" onclick="Camptrade()"></button>'
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

let Enemies = [
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
                    let res = await damage(who, are, 100, 'ph');
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
                    let are = selectJodou(who, 'are', 'hp', 'high');
                    await buffadd(who, are, 'stickyslime', 2, 1);
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
        spd:'75',
        acts:[
            {
                name:'体当たり',
                p:70,
                num:1,
                func:async function(who){
                    await logText(`${who.name}は体当たりを仕掛けてきた！`);
                    let are = selectJodou(who, 'are', 'hp', 'low');
                    let result = await damage(who, are, 100, 'ph');
                    if(result) return 1;
                    return 0;
                }
            },
            {
                name:'体当たり・改',
                p:30,
                num:3,
                func:async function(who){
                    await logText(`${who.name}は回転しながら突進してきた！`);
                    let are = selectJodou(who, 'are', 'hp', 'low');
                    let result = await damage(who,are,150,'ph');
                    if(result) return 1;
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
                    await buffadd(who, are,'disappear', 2,1);
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
                    let result = await damage(who, are, x, 'ph');
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
                    let result = await damage(who, are, 70, 'ph');
                    await buffadd(who, are, 'spddown', 2, 1);
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
                    await buffadd(who, are, 'palsy', 2, 1);
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
                    await buffadd(who, are, 'poison', 2, 1);
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
                    await buffadd(who, are, 'sleeping', 1, 1);
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