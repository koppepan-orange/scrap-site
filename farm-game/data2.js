const Style = {
    iPhone:{ //16
        "width": "393px",
    },
    kPhone:{
        "bc-hontai": "#000000",
        "bc-jouge": "#1f1f1f",
        "waku": "#381204",
    },
    tekiou: function(){
        for(let section in this){
            if(section == 'tekiou') continue;
            for(let key in this[section]){
                document.documentElement.style.setProperty(`--${section}-${key}`, this[section][key]);
            }
        }
    }
}

const Fonts = [
    {src:'comicsans', type:'ttf'},
    {src:'papyrus', type:'ttf'},
    {src:'cube12', type:'ttf'},
    {src:'hangyaku', type:'ttf'},
    {src:'craft', type:'otf'},
];

const Images = {
    systems:['error', "loby", "cryo", "cave", "jump", "forage"],
    apps:["map", "amonds", "error","uwub"],
    forages:["mush"]
}

const Sounds = {
    // se:['error'],
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
    { name:'farm', rank:2, back:'#fff8e2' },
    { name:'cook', rank:2, back:'#fff8e2' },
    { name:'road', rank:2, back:'#dcffda' },
    { name:'shop', rank:2, back:'#daf9ff' },
    { name:'door', rank:2, back:'#ffe4be' },
];

// #region farm-cool

/*
農作業から料理場まで（意味がわからなさすぎるイギリス）
rimi: それをそのまま売った時の値段

(typeによって若干データが異なる。)
#type:1
一次産業による産出。appe
fromについては、材料名_nとすることで、n個必要になる
*/

const Foods = [
	{
		name:"wheat",
		jpnm:"小麦",
        type:1,
		appe:0.5,
		rimi:0,
		desc:``,
		flav:"",
	},
    {
        name:"flour",
        jpnm:"小麦粉",
        san:10, //産出量。1の場合は無記入
        type:2,
        from:["wheat"], //材料。複数可
        act:"grind" //調理法（原則1つ）
    },
    {
        name:"dough_flour",
        jpnm:"薄ベージュ色の生地",
        type:2,
        from:["flour"],
        act:"knead"
    },
    {
        name:"bread",
        jpnm:"パァン",
        type:2,
        from:["flour"],
        act: "bake",
        //need:"oven" //必要ならばの調理器具
    },
    {
        name:"egg",
        jpnm:"卵",
        rimi:[200, 10],
        type:1,
        kind:"動物",
        //appe...?
        of:"chicken",
    },
    {
        name:"dough_flouregg",
        jpnm:"薄黄土色の生地",
        type:2,
        from:["flour", "egg"],
        act:"knead"
    },
	{
		name:"carrot",
		jpnm:"にんじん",
        rimi:[98, 3],
        type:1,
		appe:0.5,
		desc:``,
		flav:"",
	},
	{
		name:"potato",
		jpnm:"ばれいしょ",
        rimi:[126, 5],
        type:1,
		appe:1.0,
		desc:``,
		flav:"",
	},
	{
		name:"sweet_potato",
		jpnm:"さつまいも",
        rimi:126,
        type:1,
		appe:1.0,
		desc:``,
		flav:"",
	},
    {
        name:"baked_sweet_potato",
        jpnm:"スイートポテト",
        type:2,
        from:["sweet_potato"],
        act:"bake", //steamか...?
        
        
    }
];

const Animals = [
    {
        name:"chicken",
        jpnm:"にわとり",
        pet:["egg", "feather"], //撫でられた際に落とす素材
         cool:40, //撫でられてから次のアイテムを出すまでのクール
    }
]

const Recipes = [
    
    {

    },
    {
        name:"pancake",
        type:2,
        from:["dough_flouregg", "milk"],
        act: "bake",
    },
    {
        name:"hotcake",
        type:2,
        from:["egg", "flour", "milk", "suger"],
        act: "bake",
    }
];
const pre_Recipes = [
    {
        name:"flour",
        madefrom:"wheat",
        acts:["grind"]
    },
    {
        name:"suger",
        madefrom:"suger_cane",
        acts:["grind"]
    },
    
    {
        name:"baked sweet_potato",
        madefrom:"sweet_potato",
        acts:["bake"]
    },
    {
        name:"bread",
        madefrom:"flour",
        acts:["wet", "knead", "bake"]
    },
    {
        name:"eat_bread", //食パン
        madefrom:"bread",
        acts:["cut"]
    },
    {
        name:"choco_cream",
        madefrom:"cacao",
        madeof:["milk", "suger"],
        acts:["dry", "roast", "smash", "knead"], //kneadは"練る"
    },
    {
        name:"chocolate",
        madefrom:"choco_cream",
        acts:["mold", "cold"],//←押韻すぎる
    },
    {
        name:"choco_cake",
        madefrom:"cake",
        madeof:["choco_cream"]
    }
]
// #endregion

// #region road
const Gomis = [
    {
        name:"pet_bottle",
        jpnm:"ペットボトル",
        egs:["綾鷹", "綾鷹", "損茶", "ブルー ダ・KE・DO", "おい！おいって！お茶", "Que", "アクアリオ", "海の汗"],
        desc:"プラスチック製。",
        flav:"ポリエチレンテレフタレートで作られているボトル。ちなみにポリエチレンテレフタレートはポリエステルという衣服の素材になったりする。ポリエチレンテレフタレートはPETとも略される。"
    },
    {
        name:"can",
        jpnm:"缶",
        egs:["コーンポタージュ", "ココア！！", "ナタデココ入り炭酸のアレ"], //ん急に真面目っ（唐突なアドレナリンの供給停止。づがれ″だぁぁ（これはシャドバのなんか、人））
        desc:"アルミ製のとスチール製のがある。スチール製は売ればお小遣いが貰える",
        flav:"「まさか英語もcanとは思わんかったよね。びっくりびっくりよ」\n「それ繰り返すタイプのオノマトペちゃうで」", //これはぼくわた
    },
    {
        name:"bin", //違う
        jpnm:"瓶",
        egs:["賞金首", "源三"], 
        desc:"普通には捨てられない曲者。バッグから使用すると、粉砕して楽しむことができる。",
        flav:"幸せな時に発する言葉の最初。え？ちがうって？", //キヨのネコトモ実況のソレ。源三が何度も言っていた記憶
    },
    {
        name:"",
        jpnm:"",
        egs:[],
        desc:"",
        flav:"",
    },
    {
        name:"",
        jpnm:"",
        egs:[],
        desc:"",
        flav:"",
    },
    {
        name:"",
        jpnm:"",
        egs:[],
        desc:"",
        flav:"",
    },
    {
        name:"",
        jpnm:"",
        egs:[],
        desc:"",
        flav:"",
    }
]
const WalkEvents = [
    {
        name:"becauseof_tree", //木のせい
        jpnm:"なんか腕に虫がいる気がする",
        c:"proceed",
        p:"状態,過負荷/所持,1,より下",
        h:7,
        func:async()=>{
            if(roaC.insectSearch) return 0;
           roaC.insectSearch = 1;
            roaF.log("わっ！なんか、、なんかぞわっとした！！");
            roaF.log("腕かな");
            await delay(2000);
            roaF.log("いないわ");
            roaF.log("じゃあ...あ、首！首っぽい！");
            await delay(2400)
            roaF.log("いないわ");
            roaF.log("...気のせいか");
           roaC.insectSearch = 0;

            // 激キモイベントやなぁ、、、笑
        }
    },
    // {
    //     name:"",
    //     jpnm:"",
    //     c:,
    //     p:,
    //     h:,
    //     func:async()=>{
            
    //     }
    // },
    // {
    //     name:"",
    //     jpnm:"",
    //     c:,
    //     p:,
    //     h:,
    //     func:async()=>{
            
    //     }
    // },
    // {
    //     name:"",
    //     jpnm:"",
    //     c:,
    //     p:,
    //     h:,
    //     func:async()=>{
            
    //     }
    // },
    // {
    //     name:"",
    //     jpnm:"",
    //     c:,
    //     p:,
    //     h:,
    //     func:async()=>{
            
    //     }
    // },
    // {
    //     name:"",
    //     jpnm:"",
    //     c:,
    //     p:,
    //     h:,
    //     func:async()=>{
            
    //     }
    // },
    {
        name:"find_inryo",
        jpnm:"飲み物のごみを発見",
        c:"proceed", //発火条件
        p:0, //条件 - P(x)
        h:66, //hit
        func:async()=>{
            let gacha = [
                ["ペットボトル", "缶", "瓶"], //いつかここに"紙パック"も追加しようね
                [47, 44, 9]
            ];
            let type = arrayGacha(...gacha);
            let data = findGomis(type);
             let name = arraySelect(data.egs);

            let gomi = {
                type,
                mayshow: name, //名称
                data
            }

            await roaF.ochi53(gomi);
        }
    },
]
const RoaBuffs = [
    {
        name:"overload",
        jpnm:"過負荷",
        desc:"疲れが溜まり始めた状態です。",
        flav:"ぼんっ",
        type:""
    }
]
// #endregion

// #region door
const Racers = [
    /*


    #ヨウ素
    ・後隙 任意の行動後の時間のこと。 規定値は2000。%n,{行動}でその行動は後隙がnにできる
    ・ep ExPt（名称変更するかも） maxは固定値100で、行動後に5増加し、他者から"悪い効果"を受けた時にはstat["aga"]/10増加する。100になると、後隙を無視して固有のEXスキルが発動。
    ・P パッシブ。固有だし、ない奴もいる

    #ステータスの制度を設ける？やるなら4つは欲しいし、規定値？基準値？は100にしたい
    ・敏捷 行動後の後隙を値*10分減少させます。
    ・抵抗 他者から"悪い効果"を受けた際に増加するepを値/10にします。

    #対象
    -# 複数いる場合はidが若い人を選択
    me 自分自身 | over 自分以外の全員 | all 自分含む全員
    fir 先頭の人 | las 最後尾の人

    #行動 禁止 行動
    ・移動,歩数 {歩数}分進みます。abs(1)超過ならgap200msで移動 //←言い方カッコヨ スギ
    ・無 今日はなーんにもしません！
    ・集中,値 無の上位互換 自身のepを{値}分上昇させます
    ・効果,人,名称,時間 人に「{名称}」({時間})を付与します。
    ・効果削除,人,名称 人の「{名称}」を解消します。
    */
    {
        // no:1,
        name:"ningen",
        jpnm:"人",
        flav:"普遍的なステータス。普通、人間はこうもなれない",
        acts:[ //後隙が終わり次第ランダム選択行動
            "前進,1",
            "前進,1",
            "%1000,無",
        ],
        spd:100, //100*10で1000ms↓↓
        aga:100, //100/10で10↑↑
    },

    {
        // no:1,
        name:"human",
        jpnm:"人間",
        flav:"すみません...",
        acts:[
            "前進,1",
            "前進,1",
            "%1500,前進,1",
            "%750,効果,me,奮起,3",
            "%500,転倒"
        ],
        spd:110,
        aga:50,

        P:"自分が転倒した", //ここ未定〜。{対象}が{行動}をしたなら、か？いや、、いいや。簡易的に...ifでゴリ押そう
        PF:(who) => { //if(typeof PF == "function")
            buffRemove(who, "奮起");
            buffAdd(who, "焦燥", 4);
        }
    },

    {
        // no:1,
        name: "alice",
        jpnm: "青春アリス",
         moto: "#コンパス",
        flav: "不思議の優しさでマイペースに進む少女",
        acts: [
            "前進,1",
            "前進,1",
            "前進,2",
            "%1500,無",
        ],
        spd: 110,
        aga: 60,
        P:"act_pre", //P: 自分が1位なら、2位以下になるまで待つ（行動を「無」にするなど）
        PF:(who) => {
            let top = dooC.cavF.ri(who, "fir");
            if(top.id == who.id){
                nicoText("ちょっとお茶にしましょう？");
                return "無";
            }
        }
    },

    {
        // no:1,
        name: "bob",
        jpnm: "ビッグ・ボブ",
         moto: "アークナイツ",
        flav: "重装備ゆえに動きが遅い。しかしその分スタン耐性がある",
        acts: [
            "前進,1",
            "前進,1",
            "前進,1",
        ],
        spd: 50,
        aga: 200,
        sei: ["効果無効,スタン", "強制移動無効"],
    },

    {
        // no: 1,
        name: "highlander",
        jpnm: "ハイランダー姉妹",
         moto: "ブルーアーカイブ",
        flav: "法定速度以上だが脱線はしない列車。高速で動くが、まあまあ事故る",
        acts: [
            "前進,1",
            "前進,1",
            "%0,効果,me,スタン,10000",
        ],
        spd: 160,
        aga: 30,
        // P: パニック（自身のスタン解除時、4秒間スタン無効+速度低下）
        P: "buff_rem",
        PF:(who, name) => {
            if(name == "スタン" || name == "stan"){
                dooC.cavF.buffAdd(who, who, "カイ＝キスク", 6000);
                dooC.cavF.buffAdd(who, who, "慎重", 3);
            }
        }
    },
    
    {
        no:1,
        name:"ky_kiske",
        jpnm:"カイ＝キスク",
         moto: "ギルティギア",
        flav:"スタンディッパー！！",
        acts:[
            "%1500,無",
            "前進,1",
            "効果,fir,スタン,2000",
        ],
        spd: 80,
        aga: 80,
        sei: ["効果無効,スタン"],
    }
]

const Buffs = [
    /*
    #type
    ・time
     時間経過で減少。減少はsetIntervalを10で回す？

    ・stack
    　becauseof（減る理由）
    　func（減るよって時の挙動）
    */
    {
        name:"stan",
        jpnm:"スタン",
        type:"time",
        efs:["行動不可"],
        desc:"行動不可",
        flav:"うん。"
    },
    {
        name:"palsy",
        jpnm:"麻痺",
        type:"stack",
        becauseof:"act_pre",
        decl:1,
        desc:`行動開始時、30%の確率で行動を"無"に変更します`,
        flav:"難しいこと言ってるけど、つまりは麻痺ったら規定値2000ms動けないってことねぇ〜ん",
        efs:["行動阻害,30"],
    },
    {
        name:"inspire",
        jpnm:"奮起",
        type:"stack",
        becauseof:"act_end",
        decl:1,
        desc:"後隙を50%カットします", //これもifでやります
        flav:"最近アプデで、野良でも扱いやすくなったスキルです まじ可愛いけど地雷がちとか言われるからあんまり=あんまり"
    },
    {
        name:"shy",
        jpnm:"焦燥",
        type:"stack",
        becauseof:"act_pre",
        decl:1,
        desc:`後隙が25%カットされる。また行動開始時、50%の確率で行動を"無"に変更します`,
        flav:"うぅ..まじ無理全員去れガチ見ないで見ないで見ないで",
        efs:["後隙カット,25", "行動阻害,50"],
    },
    {
        name:"cautious",
        jpnm:"慎重",
        type:"stack",
        becauseof:"act_pre",
        decl:1,
        desc:"後隙が50%上乗せされる",
        flav:"こ、これを壊す？壊すのかな、大丈夫かな...",
        efs:["後隙ヴァイ,50"], //vai, vai!(二人称命令形)
    },
    {
        name:"ky_kiske",
        jpnm:"カイ＝キスク",
        type:"time",
        desc:"スタン無効になる",
        flav:"私はただ、自らが正しいと信じる道を歩むだけです。",
        efs:["効果無効,スタン"],
    }
]
// #endregion

