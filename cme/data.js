(function(){
    let ooD = document.getElementById('logOutput');
    ooD.addEventListener("dblclick", () => ooD.classList.remove("on"));

    let div0 = ooD.querySelector(".logs")
    function hookConsole(type){
        let oldFunc = console[type];
        console[type] = function(){
            oldFunc.apply(console, arguments);

            let text = Array.from(arguments)
            .map(a => {
                if(typeof a == "object") return JSON.stringify(a);
                else return a;
            }).join(" ");

            let div = document.createElement("div");
             div.className = type
             div.innerText = text;
             div0.appendChild(div);
            div0.scrollTop = div0.scrollHeight;

            let arr = div0.children;
            while(40 < arr.length){
                div0.firstElementChild.remove();
            }
        };
    }
    hookConsole("log");
    hookConsole("error");
    hookConsole("warn");

    let codeInput = ooD.querySelector("textarea")
    let runBtn = ooD.querySelector(".bt")

    function executeCode(){
        let code = codeInput.value;
         if(!code) return;

        console.log("> " + code);

        try {
            let result = eval(code);
            console.log(result);
        }
        catch(err){
            // 文法エラーや実行時エラーのキャッチ
            console.error(err);
        }

        codeInput.value = "";
    }

    runBtn.addEventListener('click', executeCode);
    codeInput.addEventListener('keydown', function(e){
        if(e.key == "Enter" && !(e.ctrlKey || e.metaKey || e.shiftKey)){
            e.preventDefault();
            executeCode();
        }
    })
    codeInput.addEventListener("resize", () => {
        runBtn.style.height = codeInput.offsetWidth;
    })
})();

let Style = {
    iPhone:{ //16
        "width": "393px",
    },
    ki:{
        "back": "#000000",
        "bor":  "#ffffff",
        "aima": "#808080"
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
];

const Images = {
    systems:['error'],
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
    { name:'lobyw', rank:2, back:'#f0f8ff', sho:1 },
];


const Stats = [
    {
        name:"maxhp",
        bas:100,
    },
    
    {
        name:"atk",
        bas:20,
    },
    {
        name:"def",
        bas:10,
    },
    
    {
        name:"pow",
        bas:100, //%
    },
    {
        name:"she",
        bas:100,
    },
    
    {
        name:"add",
        desc:"atk-defの計算をしたのち、最後にdmgに足される値です",
        bas:0,
    },
    {
        name:"cut",
        desc:"atk-defの計算をしたのち、最後にdmgから引かれる値です",
        bas:0,
    },

    {
        name:"aim",
        desc:"命中率。判定時はhit(aim-dod)をする",
        bas:95,
    },
    {
        name:"dod",
        desc:"回避率。判定時はhit(aim-dod)をする",
        bas:5,
    },

    {
        name:"maxmp",
        desc:"魔素タンクの残量。え、ずっと最大値の人がいる？？それは...な、なんだろねー......", //魔人間です。希少だし[王都]アトモスフィアでは迫害対象
        bas:0, //ふつうは持ってないので
    }
]

const Charas = [
    {
        name:"基本ちゃん",
        desc:"白い布を被った正体不明のモブ。特に何をするわけでもないが、なんとなく場にいる。",
        clothe:"白いでかい布を被った人間。ぼでぃらいんなどが見えているわけではなく、素性は不明だが...とにかく、前面にでかでかと「基本」と書かれていることは確かだ",
        speak:"声は高めで元気め。一歩間違えればただのモブである。否、モブである",
        
        maxhp:"+0",
        def:"+0",
        dod:"+0",

        acts:[
            {
                type:"normal",
                name:"ぺしぺし",
                desc:"攻撃力の100%で、無属性の物理攻撃を行う。",
                func:async(who, are, data = {}) => {
                    data["擬音"] = "ペシッ";
                    await attack(who, are, 100, "物理", data);
                }
            },
            {
                type:"act",
                cool:2,
                name:"挨拶",
                desc:"味方全員に「元気だね」を1t付与する。",
                func:async(who, are, data = {}) => {
                    for(let ally of batC.getAllies(who)){
                        await buffAdd(who, ally, "元気だね", 1);
                    }
                }
            }
        ],

        buffs:[
            {
                name:"元気だね",
                gb:"g",
                desc:"効果なし（ただ元気がでる）。",
                efs:{}
            }
        ]
    },

    {
        //clothesとspeakはまとめてflav(or)にする予定。つまり今の状態は俺へのメモだね
        name:"",
        desc:"自前の筋肉を盾に、チェンソー型レプリークの圧倒的連続攻撃を叩き込むタフなガイ。",
        clothe:"激でか体。アークナイツの伐採者のような見た目で、貧相な装備だがチェンソーを持っている。あとターバンをかぶっている。前が見えているのかはわからないが、とにかく命の危険だけは感じる。",
        speak:"しゃべらない。寡黙。死ぬときでさえ。生きてんのかもわからない",
        
        maxhp:"+150",
        def:"-10",
        dod:"-20",

        acts:[
            {
                type:"normal", //通常攻撃
                name:"切断", /* お母さん系キャラ、またはロボ系キャラにも使えるか？否お母さん系かも */
                desc:"攻撃力の20%で、P属性の攻撃を4回行う。",
                flav:"いやOを4消費は痛いか？ほんだらば消費無しのやつと強付加効果のやつを作るか...「Oご消費されるたび」系のキャラを別で作ってもいいかもね。そうなるとペアリングもしたい...が、こいつに中身を作れるかどうか......んまあそれは追々か",
                flav2:"！！！！！！！！！！！！気づいた、ロボット説！！！！！！！マッドなサイエンが友好擬態殺戮兵器として作り、野に離した設定.....???!!でそのペアリング相手はマッドなサイエンでいいんじゃないか？！？！？？？？？神だ、、、、あとはそのお相手が男子か女性かだなぁ、、どっちの方が映えるか......",
                func:async(who, are, data = {}) => {
                    data["擬音"] = "ギャリ";
                    //data["派生"] //斬り系だしつけようかと思ったけどいらない気もする
                    data["属性"] = "P";
                    //いつかSetupっていう{}変数作ってdata = Setup["剣"].func()ってやったら楽に「擬音:スパ」とか「派生:斬撃」とかつけれるようにしてもいいかも
                    
                    // 4回P属性の弱攻撃
                    for(let i=0; i<4; i++){
                        //who, are, 倍率, 物理/化学/間接, data
                        await attack(who, are, 20, "物理", data);
                    }
                }
            },
            {
                type:"act", //アクティブスキル
                cool:3,
                name:"砥石",
                desc:"自身に「鋭利な鎖鋸」1tを付与し、すぐに自身の通常攻撃を対象に向けて実行する。",
                func:async(who, are, data = {}) => {
                    await buffAdd(who, who, "鋭利な鎖鋸", 1);
                    await who.data.acts[0].func(who, are, data);
                }
            },
            {
                type:"act",
                cool:3,
                name:"節制", //節制はダメな気がする、、アルカナじゃんね
                desc:"自身に「自然の循環」を1t付与し、すぐに自身の通常攻撃を対象に向けて実行する。",
                func:async(who, are, data = {}) => {
                    await buffAdd(who, who, "自然の循環", 1);
                    await who.data.acts[0].func(who, are, data);
                }
            }
        ],
        
        buffs:[
            //キャラ固有のものがある場合ここに記述。load時に全体変数Buffsに編入
            {
                name:"鋭利な鎖鋸",
                desc:"攻撃時に10の追加ダメージを与えつつ、「傷口」を1stack与える。",
                
                gb:"g",
                efs:{
                    "attack_pre":{
                        func:async(atker, defer, data = {}) => {
                            atker.add += 30;
                            return 0;
                        }
                    },
                    "attack_ed":{
                        func:async(who, are, data = {}) => {
                            atker.add -= 30;
                            await buffAdd(who, are, "傷口", 1);
                            return 0;
                        }
                    },
                }
            }
        ]
    },

    {
        name:"リバティ・メロウ",
        desc:"水流系レプリークをぶん回すハイテンションな少女。戦場を水浸しにして感電の準備を整える。",
        clothe:"クリアブルーの透ける素材のコートを着た少女。水滴を模した装飾と、身の丈ほどある高圧放水砲型レプリークを背負っている。",
        speak:"「はいはーい！水撒きのお時間だよ〜！」「みんなまとめてびしょ濡れ決定っしょ！」",
        
        maxhp:"+50",
        def:"+10",
        dod:"+5",

        acts:[
            {
                type:"normal",
                name:"ウォータースプラッシュ",
                desc:"攻撃力の80%で攻撃。〈H2O濃度:1〉消費し、対象に「水濡れ」を2t付与する。",
                func:async(who, are, data = {}) => {
                    data["擬音"] = "バシャッ";
                    await attack(who, are, 80, "物理", data);
                    if(batC.field["H2O"] >= 1){
                        await elemenSub("H2O", 1);
                        await buffAdd(who, are, "水濡れ", 2);
                    }
                }
            },
            {
                type:"act",
                cool:2,
                name:"ハイドロブラスト",
                desc:"攻撃力の120%で攻撃。フィールドのH2Oを2増加させ、対象に「水濡れ」を1t付与する。",
                func:async(who, are, data = {}) => {
                    data["擬音"] = "ドバババ！";
                    await attack(who, are, 120, "物理", data);
                    await elemenAdd("H2O", 2);
                    await buffAdd(who, are, "水濡れ", 1);
                }
            }
        ],

        buffs:[
            {
                name:"水濡れ",
                gb:"b",
                desc:"発火ダメージを半減し、V属性から受けるダメージが2倍になる。",
                efs:{
                    "damaged_pre":{
                        func:async(atker, defer, data = {}) => {
                            if(data["属性"] === "V"){
                                data["倍率"] *= 2;
                            }
                            if(data["現象"] === "発火"){
                                data["倍率"] *= 0.5;
                            }
                        }
                    }
                }
            }
        ]
    },

    {
        name:"Dr.テスラ",
        desc:"電位差と電荷の可能性に狂わされた研究者。場にeを溜め込み、凄まじい通電ダメージを狙う。",
        clothe:"ボロボロの白衣に巨大な絶縁グローブ。背中には不気味に青白く光る真空管型魔素タンクを背負い、巨大なテスラコイル状のレプリークを掲げている。",
        speak:"「ヒヒッ！素晴らしい電位差だ！しびれるだろう！」「電荷が足りない…もっとだ、もっと刺激をくれぇ！」",

        maxhp:"-20",
        def:"-5",
        dod:"+15",

        acts:[
            {
                type:"normal",
                name:"ボルトショック",
                desc:"攻撃力の90%でV属性攻撃を行う。フィールドの「e」を1増加させる。",
                func:async(who, are, data = {}) => {
                    data["擬音"] = "バチッ！";
                    data["属性"] = "V";
                    await attack(who, are, 90, "化学", data);
                    await elemenAdd("e", 1);
                }
            },
            {
                type:"act",
                cool:2,
                name:"スパークチャージ",
                desc:"自身に「高電圧」1tを付与し、フィールドの「e」を2増加させる。",
                func:async(who, are, data = {}) => {
                    await buffAdd(who, who, "高電圧", 1);
                    await elemenAdd("e", 2);
                }
            },
            {
                type:"act",
                cool:4,
                name:"プラズマディスチャージ",
                desc:"攻撃力の150%でV属性攻撃。対象に「感電」1tを付与する。",
                func:async(who, are, data = {}) => {
                    data["擬音"] = "ドカンッ☆（放電音）";
                    data["属性"] = "V";
                    await attack(who, are, 150, "化学", data);
                    await buffAdd(who, are, "感電", 1);
                }
            }
        ],

        buffs:[
            {
                name:"高電圧",
                gb:"g",
                desc:"V属性攻撃の与ダメージ+30%。",
                efs:{
                    "attack_pre":{
                        func:async(atker, defer, data = {}) => {
                            if(data["属性"] === "V"){
                                atker.rate += 30;
                            }
                        }
                    }
                }
            }
        ]
    },

    {
        name:"ヴィンセント",
        desc:"化学反応を医療に応用する野戦病院の医師。魔法ではなく「洗浄と中和」で傷を癒やす。",
        clothe:"シミのついた白衣に、注射器型のサントル投与器を装備。ベルトには大量のろ過フラスコを吊り下げている。",
        speak:"「応援で傷が塞がるなら医者は要らんのよ。ほら動くな、過酸化水素を吹きかけるぞ」",
        
        maxhp:"+80",
        def:"+15",
        dod:"-10",

        acts:[
            {
                type:"normal",
                name:"消毒スプレー",
                desc:"攻撃力の60%で攻撃。〈H2O濃度:1〉消費し、対象のデバフを1つ解除する。",
                func:async(who, are, data = {}) => {
                    data["擬音"] = "シューッ";
                    await attack(who, are, 60, "化学", data);
                    if(batC.field["H2O"] >= 1){
                        await elemenSub("H2O", 1);
                        await buffRemove(are, "bad_one");
                    }
                }
            },
            {
                type:"act",
                cool:3,
                name:"過酸化水素処置",
                desc:"〈O濃度:1〉〈H2O濃度:1〉消費。味方一人のHPを(攻撃力×120%)回復し、「細胞活性」1tを付与。",
                func:async(who, are, data = {}) => {
                    if(batC.field["O"] >= 1 && batC.field["H2O"] >= 1){
                        await elemenSub("O", 1);
                        await elemenSub("H2O", 1);
                        await heal(who, are, who.atk * 1.2);
                        await buffAdd(who, are, "細胞活性", 1);
                    }
                }
            },
            {
                type:"act",
                cool:4,
                name:"アルカリ中和噴霧",
                desc:"フィールドのpHを中性(7)へ近づけ、味方全体のHPを(攻撃力×80%)回復する。",
                func:async(who, are, data = {}) => {
                    let curPh = batC.field["pH"];
                    if(curPh < 7) await elemenAdd("pH", Math.min(2, 7 - curPh));
                    if(curPh > 7) await elemenSub("pH", Math.min(2, curPh - 7));
                    
                    for(let ally of batC.getAllies(who)){
                        await heal(who, ally, who.atk * 0.8);
                    }
                }
            }
        ],

        buffs:[
            {
                name:"細胞活性",
                gb:"g",
                desc:"被ダメージを20%軽減し、ターン開始時に最大HPの5%分回復する。",
                efs:{
                    "damaged_pre":{
                        func:async(atker, defer, data = {}) => {
                            data["倍率"] *= 0.8;
                        }
                    }
                }
            }
        ]
    },

    {
        name:"シャルロット",
        desc:"最新型ハイプレッシャー・魔素タンクを背負い、大気を直接書き換える高圧魔法使い。",
        clothe:"背中にピカピカの4連メタクリル樹脂製魔素タンク。パイプが両袖まで伸びており、手甲のバルブで噴射量を精密制御する。",
        speak:"「サントルを介すからロスが生まれるの！直接タンクの圧力を叩き込むのが一番効率的でしょ！？」",

        maxhp:"-10",
        def:"+0",
        dod:"+20",

        acts:[
            {
                type:"normal",
                name:"高圧エアブロー",
                desc:"攻撃力の100%で攻撃。フィールドの「O」を1増加させる。",
                func:async(who, are, data = {}) => {
                    data["擬音"] = "シューッ！";
                    await attack(who, are, 100, "物理", data);
                    await elemenAdd("O", 1);
                }
            },
            {
                type:"act",
                cool:3,
                name:"ナイトロジェン・ヴェール",
                desc:"フィールドの「N」を3増加させ、自身に「極冷シールド」1tを付与する。",
                func:async(who, are, data = {}) => {
                    await elemenAdd("N", 3);
                    await buffAdd(who, who, "極冷シールド", 1);
                }
            },
            {
                type:"act",
                cool:4,
                name:"環境パージ",
                desc:"場の[O, H, N]の半数を消費し、消費した総数×30%のダメージを敵全体に与える。",
                func:async(who, are, data = {}) => {
                    let o = Math.floor(batC.field["O"] / 2);
                    let h = Math.floor(batC.field["H"] / 2);
                    let n = Math.floor(batC.field["N"] / 2);
                    
                    await elemenSub("O", o);
                    await elemenSub("H", h);
                    await elemenSub("N", n);

                    let total = o + h + n;
                    data["擬音"] = "プシューーッ！！";
                    for(let enemy of batC.getEnemies(who)){
                        await attack(who, enemy, total * 30, "化学", data);
                    }
                }
            }
        ],

        buffs:[
            {
                name:"極冷シールド",
                gb:"g",
                desc:"物理ダメージを30%軽減し、攻撃してきた相手に「凍傷」1lvを付与する。",
                efs:{
                    "damaged_ed":{
                        func:async(who, are, data = {}) => {
                            await buffAdd(who, are, "凍傷", 1);
                        }
                    }
                }
            }
        ]
    },

    {
        name:"イグニス",
        desc:"Mgの閃光とCの猛火で戦場を焼き尽くす重火器兵。高濃度のOを求めて大気を喰らい尽くす。",
        clothe:"黒くススけた重厚な耐火アーマー。身の丈を超える巨大なマグネシウム投射筒（レプリーク）を携えている。",
        speak:"「酸素が足りねぇぞ！もっと酸素を放り込め！最高の爆発を見せてやる！」",

        maxhp:"+120",
        def:"+20",
        dod:"-25",

        acts:[
            {
                type:"normal",
                name:"マグネシウム・ブレア",
                desc:"攻撃力の90%でMg属性攻撃。〈O濃度:6〉でOを4消費し敵全体に「フラッシュ」1t付与。",
                func:async(who, are, data = {}) => {
                    data["擬音"] = "カーッ！！（眩光）";
                    data["属性"] = "Mg";
                    await attack(who, are, 90, "化学", data);
                    if(batC.field["O"] >= 6){
                        await elemenSub("O", 4);
                        for(let enemy of batC.getEnemies(who)){
                            await buffAdd(who, enemy, "フラッシュ", 1);
                        }
                    }
                }
            },
            {
                type:"act",
                cool:3,
                name:"カーボン・バースト",
                desc:"攻撃力の140%でC属性攻撃。〈O濃度:12〉でOを全消費し「延焼」1stackと発火を引き起こす。",
                func:async(who, are, data = {}) => {
                    data["擬音"] = "ドガァァン！";
                    data["属性"] = "C";
                    await attack(who, are, 140, "化学", data);
                    if(batC.field["O"] >= 12){
                        let consumedO = batC.field["O"];
                        await elemenSub("O", consumedO);
                        
                        let stacks = 1 + (consumedO > 6 ? Math.floor((consumedO - 6) / 6) : 0);
                        for(let enemy of batC.getEnemies(who)){
                            await buffAdd(who, enemy, "延焼", stacks);
                        }
                        // 発火の追加処理
                        await triggerIgnition(who, are, consumedO);
                    }
                }
            }
        ],

        buffs:[]
    },

    {
        name:"ピノ",
        desc:"ピンクツインテールから繰り出される容赦なき大槌の一撃！反応性の高い軽金属爆破で全てを粉砕する。",
        clothe:"ビビットピンクのツインテールにゴシック調の衣装。自分の身長を超える超ド級の重ハンマー型レプリークを肩に担いでいる。",
        speak:"「へへっ、ピノのハンマーはちょっと重いぞ〜？耐えられるかなっ！『ペチャンコ』になぁれ〜！」",

        maxhp:"+60",
        def:"+10",
        dod:"-15",

        acts:[
            {
                type:"normal",
                name:"フルスイング",
                desc:"攻撃力の120%で物理攻撃。〈O濃度:2〉消費時、ダメージが1.3倍になり「スタン」1tを付与する。",
                func:async(who, are, data = {}) => {
                    data["擬音"] = "ドガァン！";
                    data["派生"] = "打撃";
                    let rate = 120;
                    
                    if(batC.field["O"] >= 2){
                        await elemenSub("O", 2);
                        rate *= 1.3;
                        await buffAdd(who, are, "スタン", 1);
                    }
                    
                    await attack(who, are, rate, "物理", data);
                }
            },
            {
                type:"act",
                cool:3,
                name:"リチウム・インパクト",
                desc:"攻撃力の180%で物理攻撃。〈H2O濃度:2〉消費し、即座に「水素爆発」を引き起こす。",
                func:async(who, are, data = {}) => {
                    data["擬音"] = "ズドンッッ！！";
                    data["派生"] = "打撃";
                    await attack(who, are, 180, "物理", data);
                    
                    if(batC.field["H2O"] >= 2){
                        await elemenSub("H2O", 2);
                        // 水素爆発の追加処理（発端者の攻撃力23%×3回ダメージ）
                        await triggerHydrogenExplosion(who);
                    }
                }
            },
            {
                type:"act",
                cool:3,
                name:"高圧チャージ",
                desc:"自身に「超高圧充填」1tを付与し、さらにフィールドの「O」を2増加させる。",
                func:async(who, are, data = {}) => {
                    data["擬音"] = "ガコンッ！";
                    await buffAdd(who, who, "超高圧充填", 1);
                    await elemenAdd("O", 2);
                }
            }
        ],

        buffs:[
            {
                name:"超高圧充填",
                gb:"g",
                desc:"次に行う物理攻撃のダメージ+50%。",
                efs:{
                    "attack_pre":{
                        func:async(atker, defer, data = {}) => {
                            if(data["種別"] === "物理"){
                                atker.rate += 50;
                            }
                        }
                    }
                }
            }
        ]
    },
]

const Buffs = [
    {
        name:"傷口",
        gb:"b", //good|umm|bad
        desc:"行動時に5ダメージを受ける",
        efs:{
            "attack_ed":{
                func:async(who, are, data = {}) => {
                    data["攻撃者"] = "傷口";
                    data["ダメージ"] = "効果";
                    if(await damage(who, who, 5, data)) return 1;
                    
                    return 0;
                }
            }
        }
    },
    {
        name:"自然の循環",
        gb:"g",
        desc:"Oを消費する時、50%の確率で消費しない。",
        efs:{
            "attack_pre":{
                func:async(atker, defer, data = {}) => {
                    this.O = batC.field["O"];
                },
            },
            "attack_ed":{
                func:async(who, are, data = {}) => {
                    let now = batC.field["O"];
                    let diff = now - this.O;
                    if(0 < diff) return 0;
                    //ここに来るのは、「減った」とき。
                    if(hit(50)) await elemenAdd("O", diff);
                }
            }
        }
    }
]
