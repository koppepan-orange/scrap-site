(function(){
    let ooD = document.getElementById('logOutput');
    if(ooD.classList.contains("off")) return 0;
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
        "back": "#b2b2b2",
        "bor":  "#2b2b2b",
        "aima": "#808080"
    },
    kPhone:{
        "bc-hontai": "#000000",
        "bc-jouge": "#1f1f1f",
        "waku": "#381204",
    },
    "batSt":{
        bor:"#2b2b2b",
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
    {src:'cube12', type:'ttf'},
    {src:"craft", type:"otf "}
];

const Images = {
    systems:["error",'select','circle','mush','mush_high','phone','star1','star1_pre','star2','star2_pre','star3','star3_pre','dungeon', "heart", "heart_blank"],
    apps:["map", "amon", "error", "uwub"],
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
            let img = ch.img ?? ch.name;
            Images.charas.push(img);
        }
        else{
            switch(ch.name){
                case "color_slime":
                    for(let c of ch.idios.colorList["col"]){
                        let img = `${ch.idios.colorIorg}${c}`;
                        Images.charas.push(img);
                    }
            }
        }
    }
}

const Stats = [
    {
        name:"maxhp",
        bas:100,
    },
    
    {
        name:"atk",
        bas:10,
    },
    {
        name:"def",
        bas:0,
    },
    {
        name:"matk",
        bas:10,
    },
    {
        name:"mdef",
        bas:10,
    },
    // 間接攻撃力も昔はあったけど、それは0にした。防御力のみ計算で、攻撃力は武器攻撃力に完全依存する形へ

    {
        name:"crla",
        desc:"crit-rate",
        bas:3,
    },
    {
        name:"crdm",
        desc:"crit-damage",
        bas:150,
    },
    {
        name:"crrs",
        desc:"crit-resist",
        bas:0,
    },

    {
        name:"pow",
        desc:"攻撃倍率。主にバフ用",
        bas:100, //%
    },
    {
        name:"she",
        desc:"防御倍率。ガチ主にバフ用",
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
        name:"spd",
        desc:"行動順。ターン開始時、spdの高い順に行動する",
        bas:50,
    },

    {
        name:"maxmp",
        desc:"魔素タンクの残量。え、ずっと最大値の人がいる？？それは...な、なんだろねー......", //魔人間です。希少だし[王都]アトモスフィアでは迫害対象
        bas:0, //ふつうは持ってないので
    },

    {
        name:"maxkp",
        desc:"kpの最大値です",
        bas:100,
        // 「これを下げる」効果も作りたいねぇ...その場合「余剰分のkpはcutに変換される」とかもつけてあげんとか ...待てよ、それ効果切れたら上がるよな？その場合「溜まってない」ことになる...っし、maxを上げる処理をしたら、その分kpも上がるようにしちゃおうか ゆるゆるでいこう
    }
]



const Phenons = {
    "発火":{
        key:"発火",
        desc:`火が起こる現象のこと。うちでは爆発として取り扱う。\n
P属性やS属性などで起こすことができ、その時の効果は引き起こした属性によって異なる。\n
対象は発端者の攻撃力の{60%}の爆発ダメージを受け、「火傷」を{2t}付与される。このダメージやターン数は、この現象で消費したOの量によって増加する。ダメージ量は消費したOの量が0から2を超えるたびに10%増加し、ターン数は消費したOの量は0から3を超えるたびに1t増加する。/n
また、この現象が発生した際にフィールド上にNH3があるならば、2度目の爆発が発生し、NH3は全て消滅する。この2度目の爆発は対象グループ全体に影響し、ダメージ量は1度目の爆発ダメージの50%x消費したNH3量となる。`,
        occur:["P", "S", "Mg", "C"],
        occurs:{
            "P":{
                key:"P",
                desc:""
            }
        }
    }
}

/*
type: 
　stackは自然消滅しない。代わりに、アイコン右下に必ず"x1"というような表記が出る。
　turnはstackにturn_end:decl(1)を付けただけ。代わりに、右下には表示はなく、左下に必ず"1t"というような表記が出る。

*/
const Buffs = [
    {
        name: "攻撃倍率20%上昇",
        img:"攻撃",
        type: "turn",
        gb:" g",
        efs:{
            "fanfare":{
                func:async(who, are, data, buff) => {
                    are.pow += 20;
                }
            },
            "lastword":{
                func:async(who, are, data, buff) => {
                    are.pow -= 20;
                }
            }
        }
    },
    {
        name: "攻撃倍率40%上昇",
        img:"攻撃",
        type: "turn",
        gb:" g",
        efs:{
            "fanfare":{
                func:async(who, are, data, buff) => {
                    are.pow += 40;
                }
            },
            "lastword":{
                func:async(who, are, data, buff) => {
                    are.pow -= 40;
                }
            }
        }
    },
    {
        name: "防御倍率20%上昇",
        img:"防御",
        type: "turn",
        gb:" g",
        efs:{
            "fanfare":{
                func:async(who, are, data, buff) => {
                    are.she += 20;
                }
            },
            "lastword":{
                func:async(who, are, data, buff) => {
                    are.she -= 20;
                }
            }
        }
    },
    {
        name: "防御倍率40%上昇",
        img:"防御",
        type: "turn",
        gb:" g",
        efs:{
            "fanfare":{
                func:async(who, are, data, buff) => {
                    are.she += 40;
                }
            },
            "lastword":{
                func:async(who, are, data, buff) => {
                    are.she -= 40;
                }
            }
        }
    },

    {
        name: "傷口",
        type: "stack",
        gb: "b",
        desc: "行動時に5ダメージを受ける。連続攻撃や行動回数の多い相手に対して危険。",
        flav: "私はこのデバフが最も嫌いです。まぢ無理",
        efs: {
            "attack_ed": {
                func: async(who, are, data, buff) => {
                    data["攻撃者"] = "傷口";
                    data["ダメージ"] = "効果";
                    if(await damage(who, who, 5, data)) return 1;
                    return 0;
                }
            }
        }
    },

    {
        name: "自然の循環",
        type: "turn",
        gb: "g",
        desc: "Oを消費する時、50%の確率で消費しない。",
        efs: {
            "attack_pre": {
                func: async(who, are, data, buff) => {
                    buff.saved["O"] = batC.field["O"];
                }
            },
            "attack_ed": {
                func: async(who, are, data, buff) => {
                    let now = batC.field["O"];
                    let diff = now - buff.saved["O"];

                    if(0 < diff) return 0;
                    if(hit(50)) await elemenAdd("O", diff);
                }
            }
        }
    },

    {
        name: "幸運",
        type: "turn",
        desc: "ターン終了時、20%の確率でもう一回行動できる。",
        flav: "数々のゲーマーを狂わせてきたと噂されている。",
        efs: {
            "turn_end": {
                func: async(who, ares, data, buff) => {
                    if(hask(data, "内定:もう1度だ")) return 0;
                    if(!hit(20)) return 0;

                    let arr = [
                        "うーわ茶柱立ったわ/お茶飲んでないのに",
                        "え、家に蜘蛛いるやん。今朝なのに/ここ家じゃないけど",
                        "うわ綺麗な虹で草",
                        "左の手のひらが痒いんですけど",
                        "靴紐が解けたんですけど"
                    ];

                    let text = arraySelect(arr);
                    for(let t of text.split("/")) {
                        logText(t.trim());
                    }

                    return "もう1度だ";
                }
            }
        }
    },

    {
        name: "影化",
        type: "turn",
        desc: "姿を消し、選択の対象にならなくなる。範囲攻撃を受けた場合は、ダメージを受けた後に解除される。",
        efs: {
            "target_ing": {
                no: 1
            },
            "attack_ed": {
                func: async(who, are, data, buff) => {
                    if(data["範囲攻撃"]) buff.vanish(data);
                }
            }
        }
    },

    {
        name: "光学迷彩",
        type: "turn",
        desc: "姿を消し、選択の対象にならなくなる。範囲攻撃を受けた場合は、ダメージを受けた後に解除される。",
        efs: {
            "target_ing": {
                no: 1
            },
            "attack_ed": {
                func: async(who, are, data, buff) => {
                    if(data["範囲攻撃"]) buff.vanish(data);
                }
            }
        }
    },

    {
        name: "応援！",
        type: "stack",
        gb: "g",
        desc: "応援されている状態。攻撃倍率と速度が上がり、会心率が下がる。",
        flav: "嬉しいけどちょっと緊張しちゃうよね。わかるぞ",
        efs: {
            "fanfare": {
                func: async(who, are, data, buff) => {
                    are.spd += 20;
                }
            },
            "attack_pre": {
                func: async(atker, defer, data, buff) => {
                    atker.pow += 100;
                    atker.crla -= 5;
                }
            },
            "attack_ed": {
                func: async(who, are, data, buff) => {
                    buff.add(-1, data);
                }
            },
            "lastword": {
                func: async(who, are, data, buff) => {
                    are.spd -= 20;
                }
            }
        }
    },

    {
        name: "毒",
        type: "turn",
        gb: "b",
        desc: "ターン開始時、最大HPの4%分、シールドを貫通したダメージを受ける。",
        flav: "？？？「毒の苦しみもお好きなんですね」",
        efs: {
            "turn_end": {
                func: async(who, ares, data, buff) => {
                    let val = Math.max(Math.floor(who.maxhp * 0.04), 1);

                    data["攻撃者"] = "病原体";
                    data["ダメージ"] = "効果";

                    if(await damage(who, who, val, "mg", ["無視:シールド"], data)) return 1;
                    return 0;
                }
            }
        }
    },

    {
        name: "猛毒",
        type: "turn",
        gb: "b",
        desc: "ターン開始時、最大HPの7%分、シールドを貫通したダメージを受ける。その後、ランダムな自身の良いバフの持続時間が1減少する。",
        efs: {
            "turn_end": {
                func: async(who, ares, data, buff) => {
                    let val = Math.max(Math.floor(who.maxhp * 0.07), 1);

                    data["攻撃者"] = "病原体";
                    data["ダメージ"] = "効果";

                    if(await damage(who, who, val, "mg", ["無視:シールド"], data)) return 1;

                    let buffs = who.buffs.filter(a =>
                        a.data.gb == "g" &&
                        a.data.type == "turn"
                    );

                    if(0 < buffs.length) {
                        let target = arraySelect(buffs);
                        target.add(-1, data);
                    }

                    return 0;
                }
            }
        }
    },

    {
        name: "もう毒",
        type: "stack",
        gb: "b",
        desc: "ターン開始時、最大HPの1%分、シールドを貫通したダメージを受ける。その後、このバフのstack数が2倍になる。",
        flav: "えぐ",
        efs: {
            "turn_end": {
                func: async(who, ares, data, buff) => {
                    let val = Math.max(Math.floor(who.maxhp * 0.07), 1);

                    data["攻撃者"] = "病原体";
                    data["ダメージ"] = "効果";

                    if(await damage(who, who, val, "mg", ["無視:シールド"], data)) return 1;

                    buff.time *= 2;
                    return 0;
                }
            }
        }
    },

    {
        name: "出血",
        type: "turn",
        gb: "b",
        desc: `ターン終了時、固定ダメージ6を受ける。
            [1] 被攻撃時、この効果の時間が1増加する。物理攻撃を受けた場合、ダメージ量が1.5倍になる(ｷﾘｱｹﾞ)`,
        flav: "傷口が広がる、ってイメージ。ターン経過は酷だしな",
        efs: {
            "fanfare": {
                func: async(who, are, data, buff) => {
                    buff.saved["val"] = 6;
                }
            },
            "turn_end": {
                func: async(who, ares, data, buff) => {
                    let val = buff.saved["val"];

                    data["攻撃者"] = "傷";
                    data["ダメージ"] = "効果";

                    if(await damage(who, who, val, "ph", [], data)) return 1;
                    return 0;
                }
            },
            "attack_ed": {
                func: async(who, are, data, buff) => {
                    buff.time += 1;

                    if(data["tri"] == "ph") {
                        buff.saved["val"] = Math.ceil(buff.saved["val"] * 1.5);
                    }
                }
            }
        }
    },

    {
        name: "血の誕生",
        type: "turn",
        desc: `ターン終了時、固定ダメージを受ける。
            [1] 被攻撃時、この効果の時間が1増加する。物理攻撃を受けた場合、ダメージ量が2.5倍になる(ｷﾘｱｹﾞ)`,
        flav: "私がやりたがってるゲーム。でも最初の盗賊団ですでに無理ってるから相当無理かも",
        efs: {
            "fanfare": {
                func: async(who, are, data, buff) => {
                    buff.saved["val"] = 6;
                }
            },
            "turn_end": {
                func: async(who, ares, data, buff) => {
                    let val = buff.saved["val"];

                    data["攻撃者"] = "傷";
                    data["ダメージ"] = "効果";

                    if(await damage(who, who, val, "ph", [], data)) return 1;
                    return 0;
                }
            },
            "attack_ed": {
                func: async(who, are, data, buff) => {
                    buff.time += 1;

                    if(data["tri"] == "ph") {
                        buff.saved["val"] = Math.ceil(buff.saved["val"] * 1.5);
                    }
                }
            }
        }
    },

    {
        name: "火傷",
        type: "stack",
        desc: `ターン終了時、stack数に比例した固定ダメージを受ける。また、攻撃力が4下がる。
            [1] 木製の装備を着ている場合、この効果のダメージは2倍になる。`,
        flav: "追加効果が多い気がする、、まあいいか。木製装備へのメタになってくれ、君は",
        efs: {
            "fanfare": {
                func: async(who, are, data, buff) => {
                    buff.saved["atk"] = are.atk;
                    are.atk -= 4;
                }
            },
            "turn_end": {
                func: async(who, ares, data, buff) => {
                    let val = 5 * buff.time;

                    let hasWood = Array.isArray(who.equips) &&
                        who.equips.some(e => {
                            try {
                                return /木|wood/i.test(JSON.stringify(e));
                            } catch {
                                return false;
                            }
                        });

                    if(hasWood) val *= 2;

                    data["攻撃者"] = "火傷";
                    data["ダメージ"] = "効果";

                    if(await damage(who, who, val, "ph", [], data)) return 1;
                    return 0;
                }
            },
            "lastword": {
                func: async(who, are, data, buff) => {
                    are.atk = buff.saved["atk"];
                }
            }
        }
    },

    {
        name: "燃え尽き症候群",
        type: "stack",
        desc: `ターン終了時、stack数に比例した固定ダメージを受ける。また、攻撃力が7下がる。
            [1] 木製の装備を着ている場合、この効果のダメージは2倍になる。
            [2] このダメージで最後のキャラクターが死亡して敗北した場合、所持金が半分になる。`,
        flav: "...だいじょぶかなぁ、、てあれ、これ死因も判定しないとなのでは？だ、だるくね、、？",
        efs: {
            "fanfare": {
                func: async(who, are, data, buff) => {
                    buff.saved["atk"] = are.atk;
                    are.atk -= 7;
                }
            },
            "turn_end": {
                func: async(who, ares, data, buff) => {
                    let val = 5 * buff.time;

                    let hasWood = Array.isArray(who.equips) &&
                        who.equips.some(e => {
                            try {
                                return /木|wood/i.test(JSON.stringify(e));
                            } catch {
                                return false;
                            }
                        });

                    if(hasWood) val *= 2;

                    data["攻撃者"] = "燃え尽き症候群";
                    data["ダメージ"] = "効果";

                    if(await damage(who, who, val, "ph", [], data)) return 1;
                    return 0;
                }
            },
            "lastword": {
                func: async(who, are, data, buff) => {
                    are.atk = buff.saved["atk"];
                }
            }
        }
    },

    {
        name: "延焼",
        type: "turn",
        desc: "火傷状態のキャラクターから、同じ陣営の別のキャラクターへ火傷を伝染させる。",
        efs: {
            "turn_end": {
                func: async(who, ares, data, buff) => {
                    let burns = who.buffs.filter(a => a.data.name == "火傷");
                    if(!burns.length) return 0;

                    let targets = humans.filter(a =>
                        a.cam == who.cam &&
                        a.id != who.id &&
                        a.hp > 0
                    );

                    if(!targets.length || !hit(30)) return 0;

                    await buffAdd(who, arraySelect(targets), "火傷", 1);
                    return 0;
                }
            }
        }
    },

    {
        name: "帯電",
        type: "turn",
        desc: `ターン開始時、固定ダメージを受ける。
            [1] 60%の確率で同じ陣営の別のキャラクターに1ターン伝染する。
            [2] 金属製の防具を着ている場合、ダメージは2倍になる。`,
        efs: {
            "turn_start": {
                func: async(who, are, data, buff) => {
                    let val = 4;

                    let hasMetal = Array.isArray(who.equips) &&
                        who.equips.some(e => {
                            try {
                                return /金属|metal/i.test(JSON.stringify(e));
                            } catch {
                                return false;
                            }
                        });

                    if(hasMetal) val *= 2;

                    data["攻撃者"] = "帯電";
                    data["ダメージ"] = "効果";

                    if(await damage(who, who, val, "mg", [], data)) return 1;

                    let targets = humans.filter(a =>
                        a.cam == who.cam &&
                        a.id != who.id &&
                        a.hp > 0
                    );

                    if(targets.length && hit(60)) {
                        await buffAdd(who, arraySelect(targets), "帯電", 1);
                    }

                    return 0;
                }
            }
        }
    },

    {
        name: "帯電・帯電",
        type: "turn",
        desc: `ターン開始時、固定ダメージを受ける。
            [1] ターン終了時、確率で同じ陣営の別のキャラクターに伝染する。
            [2] さらに確率で自身に「麻痺」を付与する。`,
        flav: "帯電・帯電ってなんだよ",
        efs: {
            "turn_start": {
                func: async(who, are, data, buff) => {
                    data["攻撃者"] = "帯電・帯電";
                    data["ダメージ"] = "効果";

                    if(await damage(who, who, 7, "mg", [], data)) return 1;

                    if(hit(33)) await buffAdd(who, who, "麻痺", 1);
                    return 0;
                }
            },
            "turn_end": {
                func: async(who, ares, data, buff) => {
                    let targets = humans.filter(a =>
                        a.cam == who.cam &&
                        a.id != who.id &&
                        a.hp > 0
                    );

                    if(targets.length && hit(30)) {
                        await buffAdd(who, arraySelect(targets), "帯電・帯電", 1);
                    }

                    return 0;
                }
            }
        }
    },

    {
        name: "裂痕",
        type: "stack",
        desc: "行動時に固定ダメージを受ける。また、受ける回復量が半減する。",
        efs: {
            "attack_ed": {
                func: async(who, are, data, buff) => {
                    data["攻撃者"] = "裂痕";
                    data["ダメージ"] = "効果";

                    if(await damage(who, who, 9, "ph", [], data)) return 1;
                    return 0;
                }
            },
            "heal_pre": {
                func: async(who, are, data, buff) => {
                    if(typeof data["回復量"] == "number") {
                        data["回復量"] = Math.floor(data["回復量"] / 2);
                    }
                }
            }
        }
    },

    {
        name: "凍傷",
        type: "stack",
        desc: "速度が10低下する。さらにターン開始時、stack1つにつき5ダメージを受ける。",
        flav: "凍傷の英語カッコよすぎ問題、あります",
        efs: {
            "fanfare": {
                func: async(who, are, data, buff) => {
                    are.spd -= 10;
                }
            },
            "turn_start": {
                func: async(who, are, data, buff) => {
                    let val = Math.max(buff.time, 1) * 5;

                    data["攻撃者"] = "凍傷";
                    data["ダメージ"] = "効果";

                    if(await damage(who, who, val, "ph", [], data)) return 1;
                    return 0;
                }
            },
            "lastword": {
                func: async(who, are, data, buff) => {
                    are.spd += 10;
                }
            }
        }
    },

    {
        name: "氷結",
        img:"凍結",
        type: "turn",
        desc: "凍っている状態。ターン開始時、75%の確率で解除される。炎属性の攻撃を受けても解除される。",
        efs: {
            "turn_start": {
                func: async(who, are, data, buff) => {
                    if(hit(75)) {
                        buff.vanish(data);
                        return 0;
                    }

                    if(data["内定:行動不可"]) return 0;

                    return "行動不可";
                }
            },
            "beattack_ed": {
                func: async(who, are, data, buff) => {
                    if(data["tri"] == "fi" || data["属性"] == "炎") {
                        buff.vanish(data);
                    }
                }
            }
        }
    },

    {
        name: "凍結",
        type: "turn",
        desc: "凍結されている状態。ターン開始時、40%の確率で解除される。炎属性の攻撃を受けても解除されない。",
        efs: {
            "turn_start": {
                func: async(who, are, data, buff) => {
                    if(hit(40)) {
                        buff.vanish(data);
                        return 0;
                    }

                    if(data["内定:行動不可"]) return 0;

                    return "行動不可";
                }
            }
        }
    },

    {
        name: "エターナルフリーズ",
        img:"凍結",
        type: "stack",
        desc: "解除されない凍結状態。",
        efs: {
            "turn_start": {
                func: async(who, are, data, buff) => {
                    if(data["内定:行動不可"]) return 0;
                    return "行動不可";
                }
            }
        }
    },

    {
        name: "麻痺",
        type: "turn",
        desc: "ターン開始時、確率で行動できなくなる。",
        flav: "麻痺ですね。これ好き",
        efs: {
            "turn_start": {
                func: async(who, are, data, buff) => {
                    if(data["内定:行動不可"]) return 0;
                    
                    if(hit(20)){
                        await logText("麻痺った！");
                        return "行動不可";
                    }
                    return 0;
                }
            }
        }
    },

    {
        name: "スタン",
        type: "turn",
        desc: "行動できなくなる。内部処理的には麻痺の延長。",
        efs: {
            "turn_start": {
                func: async(who, are, data, buff) => {
                    if(data["内定:行動不可"]) return 0;
                    return "行動不可";
                }
            }
        }
    },

    {
        name: "スキップカード",
        type: "turn",
        desc: "ターン開始時、手番をスキップされる。",
        flav: "ゲーム終了間際で相手がこれを出してきた時の絶望感たるや",
        efs: {
            "turn_start": {
                func: async(who, are, data, buff) => {
                    if(data["内定:行動不可"]) return 0;
                    return "行動不可";
                }
            }
        }
    },

    {
        name: "睡魔",
        type: "turn",
        desc: "ターン終了時、「眠気」を50stack増加させる。",
        flav: "睡魔..微熱魔じゃないです。あと決して湖のほとりの人じゃないです",
        efs: {
            "turn_end": {
                func: async(who, ares, data, buff) => {
                    await buffAdd(who, who, "眠気", 10);
                    return 0;
                }
            }
        }
    },

    {
        name: "眠気",
        type: "stack",
        desc: `100stack到達でこの効果は100stack減少し、「睡眠」(3t)に変化する。
            [1] 行動時、stackを7減らすことができる。`,
        flav: "いやほんと、最近ちょっと寝不足で、、すみません。なんだよ幼馴染に依存してる水魔導士って、、なんだよチェスの駒で戦う魔導士って、、、、",
        efs: {
            "turn_end": {
                defer: 1,
                func: async(who, ares, data, buff) => {
                    console.log("あ、ども。俺お前の眠気の権化です");
                    console.log(`現在私たちは${buff.time}人います`)
                    if(100 <= buff.time){
                        console.log("うおお発動")
                        buff.add(-100, data);
                        await buffAdd(who, who, "睡眠", 3);
                    }

                    return 0;
                }
            },
            "act_ed": {
                func: async(who, are, data, buff) => {
                    buff.add(-7, data);
                }
            }
        }
    },

    {
        name: "睡眠",
        type: "turn",
        desc: "行動できなくなる。攻撃された時、30%の確率でこのバフは解消される",
        efs: {
            "turn_start": {
                func: async(who, are, data, buff) => {
                    if(data["内定:行動不可"]) return 0;
                    await logText("寝てます。");
                    return "行動不可";
                }
            },
            "beattack_ed": {
                func: async(who, are, data, buff) => {
                    if(hit(30)) buff.vanish(data);
                    return 0;
                }
            }
        }
    },

    {
        name: "怒り",
        type: "stack",
        desc: "怒り状態。攻撃を回避されると、さらに煽られたように感じる。",
        flav: "すごいイラつかせてくる敵..? いやまあ普通にパクリですけれども。で避けられてさらに煽られるみたいな",
        efs: {
            "attack_ed": {
                func: async(who, are, data, buff) => {
                    logText(`${who.name}は攻撃を避けられ、さらに怒った。`);
                }
            }
        }
    },

    {
        name:"満腹感",
        type:"turn",
        desc:"うわあ食べたなー！という状態。毎ターンhpが10ずつ回復する。",
        efs:{
            "turn_ed":{
                func:async(who, ares, data, buff) => {
                    if(await heal(who, who, 10, data)) return 1;

                    return 0;
                }
            }
        }
    },

    {
        name:"共通因数",
        type:"stack",
        desc:`共通因数。100になるとよくないことが起こる。毎ターン2ずつ減少する。
        [2] もし60以上になったならば、命中率が5下がる。
        [3] もし90以上になったならば、命中率が20下がり、会心率が30下がる。
        [4] もし100になったならば、これは0になる。それと同時に攻撃力・防御力が一時的に下がる。しかし、魔法攻撃力は上がる。`,
        efs:{
            "fanfare":{ //追加された時
                func:async(who, are, data, buff)=>{
                    // whoが付与した側, areが付与された側
                    let num = buff.time;
                    if(100 <= num){
                        await logText("共通因数 が100に到達！");
                        buffAdd(are, are, "共通因数の存在しない解", 3, data);
                        buff.vanish(data);
                    }
                    else if(90 <= num){
                        are.aim -= 20;
                        are.crit -= 30;
                        buff.stat = "っ...";
                    }
                    else if(num >= 60){
                        are.aim -= 5;
                        buff.stat = "な、なに？";
                    }
                }
            },
            "turn_ed":{
                func:async(who, ares, data, buff)=>{
                    buff.add(-2, data); //calm_down
                    return 0;
                }
            },
            "lastword":{
                func:async(who, are, data, buff)=>{
                    if(buff.stat == "っ..."){
                        are.aim += 20;
                        are.crit += 30;
                    }
                    if(buff.stat == "な、なに？"){
                        are.aim += 5;
                    }
                }
            }
        }
    },
    {
        name:"共通因数の存在しない解",
        type:2,
        desc:"攻撃倍率と防御倍率が下がり、魔法攻撃力が上がる。また、「共通因数」が付与されなくなる",
        efs:{
            "fanfare":{
                func:async(who, are, data, buff)=>{
                    are.pow -= 30;
                    are.she -= 50;
                    are.matk += 60;
                }
            },
            "add_pre":{
                func:async(who, are, name, time, data, buff) => {
                    // こっちが「自分でないものが追加される時」

                    if(data["内定:だめ"]) return 0;

                    if(name == "共通因数") return "だめ";
                }
            },
            "lastword":{
                func:async(who, are, data, buff)=>{
                    are.pow += 30;
                    are.she += 50;
                    are.matk -= 60;
                }
            }
        }
    }
];





let Charas = [
    {
        name:'wretch',
        jpnm:'持たざる者',
        img:'wretch',
        desc:'持たざる者。何もないが、何でもあるとも言える。\n平均的で普遍的。普通の凡才でただの人間。',

        ks:{
            name:"none",
            func:async(who)=>{}
        },
        ns:{
            name:"none",
            func:async(who)=>{}
        },
        ps:{
            name:"none",
            efs:[]
        },
        
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

        col:{
            bor:"#000000",
            back:"#999999"
        },
    },

    {
        name:'greenslime',
        jpnm:'ファン・ボイ・チャウ',
        img:'greenslime',
        desc:'スライム。旧姿。まずはここから再現。これさへできれば応用できる。',
        key:"m",
        
        acts: ["小突く", "小突く", "小突く"],
        
        ks:{
            name:"none",
            func:async(who)=>{}
        },
        ns:{
            name:"邪魔してやんよ",
            type:"turn",
            time:3,
            desc:"4の倍数のターン開始時に、ランダムな敵の頭に「粘着質なスライム」を1stack付与する。（粘着質なスライム: 攻撃時に発動し、攻撃を無効化する。無効化したならば、これは1stack減少する。）",
            func:async(who)=>{
                let are = selectJodou(who, "are", 0, "random", 1);
                buffAdd(who, are, "頭にくっつくスライム", 1)
            }
        },
        ps:{
            name:"二度漬けならぬ三度漬け",
            desc:`actsの小突く使用時、20%の確率でさらに2回殴る。`,
            efs:{
                "attack_ed":{
                    func:async(who, are, data = {})=>{
                        if(data["名称_行動"] != "Acts" || data["名称_技名"] != "小突く") return 0;
                        if(data["流石に五度漬けはだめ"]) return 0;
                        
                        if(!hit(20)) return 0;

                        await logText(`${who.name} は 頑張った！`)

                        data["流石に五度漬けはだめ"] = 1;
                        data["are指定"] = data["are"];
                        
                        let act = findActs("小突く");
                        if(await act.func(who, data)) return 1;
                        if(await act.func(who, data)) return 1;
                    }
                }
            }
        },

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
        buffs:[
            {
                name:'頭にくっつくスライム',
                type:'stack',
                gb:"b",
                desc:'スライムが体に粘りついている状態です。やばいね(行動不可)',
                efs:{
                    "turn_start":{
                        func:async(who, are, data = {}, buff) => {
                            if(data["行動不可"]) return 0;

                            await logText("んっ、でっ、ぜぇいっ！！ (スライムを引き剥がす音)");
                            buff.add(-1, data);

                            return "行動不可";
                        }
                        
                    }
                }
            },
            {
                name:"吸着質なスライム",
                type:'turn',
                desc:'スライムがくっついているおかげで行動するとダメージを受けます',
                flav:'連続行動ビルドに大打撃 part2',
                efs:{
                    "act_ed":{
                        func:async(who, ares, data = {}, buff)=>{
                            data["攻撃者"] = "スライム";
                            if(await damage(who, who, 6, "mg", data)); return 1;

                            return 0;
                        }
                    }
                }
            },
        ],

        col:{
            bor:"#206e1a",
            back:"#5ed15e"
        },
    },

    {
        name:"color_slime",
        jpnm:"Silly Slimy",
        img:"color_slime-white",
        desc:"周りに流されがちで小柄なスライム。色に応じて相手にデバフを与えたりする。",
        key:"m",

        tags:["スライム", "魔胞"],

        idios:{
            color:"white", //original
            colorIorg:"color_slime-", 
            colorList:{
                col: ["green", "yellow", "red", "purple"],
                buff:["毒", "麻痺", "火傷", "帯電"]
            },

            supply:async(who, are, num = 1, data = {})=>{
                let idios = who.data.idios;
                let color = idios.color;
                if(!idios.colorList["col"].includes(color)) return 0; //whiteが該当。これは無を意味するので
                
                let i = idios.colorList["col"].indexOf(color);
                let name = idios.colorList[i];
                let time = num + idios.addtime;
                if(await buffAdd(who, are, name, time, data)) return 1;

                return 0;
            },
            
            addtime: 0,
        },

        ks:{
            name:"べちょ",
            desc:"自身の色をランダムに変更し、敵全体にデバフ2t付与",
            func:async(who)=>{
                let idios = who.data.idios;
                let pre = idios.color;
                let color;
                do{
                    color = arraySelect(idios.colorList["col"]);
                }while(pre != color);
                console.log(`[SillySlimy] 色変更 / ${pre} => ${color}`);

                let ares = await selectJodou(who, "are", 0, "random", 0); //最後の0は全体への証
                for(let are of ares){
                    if(await who.data.idios.supply(who, are, 2)) return 1;
                }
                
                return 0;
            }
        },
        ns:{
            name:"あげるね",
            type:"turn",
            time:"2",
            desc:"敵陣からランダムな1人にデバフ2t付与",
            func:async(who)=>{
                let are = await selectJodou(who, "are", 0, "random", 1);
                if(await who.data.idios.supply(who, are, 2)) return 1;
            }
        },
        ps:{
            name:"うにゅぅ",
            desc:"会心/被会心無効。攻撃時、20%の確率でその対象にデバフ1t付与",
            efs:{
                "attack_ed":{
                    func:async(who, are, data)=>{
                        if(!hit(20)) return 0;

                        if(await who.data.idios.supply(who, are, 1)) return 1;
                        return 0;
                    }
                }
            },
        },

        ts:[
            {
                name:"ts1",
                desc:"自身が与えるデバフの継続時間を+1する",
                func:async(who)=>{
                    who.data.idios.addtime += 1;
                }
            },
            {
                name:"ts2",
                desc:"デバフを受けている敵から自身が受ける物理ダメージを35%軽減する。",
                func:async(who)=>{
                    let sore = {
                        jun:90,
                        func:async(who, are, data)=>{
                            if(who.buffs.every(a => a.data.gb != "b")) return 0;
                            if(data["tri"] != "ph") return 0;

                            let dmg = data["dmg"] * 0.5;
                            return `dmg変更:${dmg}`;
                        }
                    }

                    who.data.ps.efs["be-attack_ing"] = sore;
                    return 0;
                }
            },
            {
                name:"ts3",
                desc:"緑色のデバフ「毒」を「猛毒」に変更",
                func:async(who)=>{
                    who.data.idios.colorList["buff"][0] = "猛毒";
                    return 0;
                }
            },
            {
                name:"ts4",
                desc:"色に水色（デバフ: 睡魔）を追加",
                func:async(who)=>{
                    who.data.idios.colorList["col"].push("alice");
                    who.data.idios.colorList["buff"].push("睡魔");
                    return 0;
                }
            },
            {
                name:"ts5",
                desc:"自身が与えるデバフの継続時間を+1する",
                func:async(who)=>{
                    who.data.idios.addtime += 1;
                    return 0;
                }
            },
            {
                name:"ts6",
                desc:"黄色のデバフ「麻痺」を「スタン」に変更",
                func:async(who)=>{
                    who.data.idios.colorList["buff"][1] = "スタン";
                    return 0;
                }
            }
        ],

        stat:{
            atk:20,
            def:5,
            matk:30,
            mdef:40,
            maxhp:45,
            maxmp:15,
            crla:0,
            crdm:100,
            crrs:"absolute",
            spd:90,
        },

        col:{
            bor:"#cfe9ff",
            back:"#def0ff"
        }
    },

    {
        name:'mechanic',
        jpnm:'なんとか・アミー',
        img:'mechanic',
        desc:'メカニック。工具を用いて割となんでも作れる。\nそのせいか助手には大きく慕われている。\n打たれ弱いので繊細にね',
        key:"n",

        ks:'placeturret',
        ns:'throwwrench',
        ps:'solplaceturret',
        stat:{
            atk:25,
            def:10,
            matk:20,
            mdef:20,
            maxhp:25,
            maxmp:30,
            crla:7,
            crdm:200,
            crrs:0,
            spd:65,
        },
        buffs:[
            {
                name:"レンチ殴りモード、起動",
                type:"stack",
                gb:"g",
                desc:'レンチを投げる準備をしている状態。次の攻撃与ダメ2倍',
                efs:{
                    "attack_ing":{
                        func:(who, are, data = {}, buff)=>{
                            logText("レンチを装備したよっ！");
                            return `dmg変更:${data["dmg"]*2}`;
                        }
                    }
                }
            }
        ],

        col:{
            back:"#fcffc0",
            bor:"#ff7373"
        },
    },
    
    {
        name:'clown',
        jpnm:'週末の道化師',
        img:'clown',
        desc:'ピエロさん。ランダム要素多め。\n',
        key:"n",
        ks:'trickyvaiavles',
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
        buffs:[
            {
                name:'gambling',
                type:"turn",
                desc:"次の攻撃が0,2,4倍になる。これぞ醍醐味..ってやつ？",
                efs:{
                    "attack_ing":{
                        func:async(who, are, data = {}, buff) => {
                            let rate = arrayGacha([0, 2, 4], [20, 70, 10]);
                            data["dmg"] = `*${rate}`;
                        }
                    }
                }
            }
        ],
        color:{
            bor:"#ffacf9",
            back:"#acf8ff",
        }
    },
    
    {
        name:'magodituono',
        jpnm:'スオーノ・フルマイン',
        img:'magodituono',
        desc:'雷電魔術師。"帯電"を用いて戦う\n将軍ではない。誰だ将軍って言ったやつは',
        key:"n",
        ks:'lightningstorm',
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
        
        col:{
            back:"#5f4894",
            bor:"#7f1184"
        },
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
        if(buffHas(who, 'skip')){
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
        name:'斬る',
        desc:`対象に攻撃力の${this.voi}%のダメージを与える。`,
        flav:"別に必中ではないが、必中みたいな扱いで使いがち（作者談）",
        aim:100,
        voi:60,
        mp:0,
        lv:1,
        tcam:'players',
        func:async function(who, data = {}){
            let are = await selectSyudou(1);

            if(await attack(who, are, this.voi, 'ph', this.aim)) return 1;
            return 0;
        }
    },
    {
        name:'つばめ返し',
        desc:`対象に攻撃力の${this.voi}%のダメージを2回与える。`,
        flav:"命中判定は毎回です。そのうち「ねずみざん」作りたいねぇ",
        aim: 85,
        voi:70,
        mp:0,
        lv:1,
        func:async function(who, data = {}){
            let are = await selectSyudou(1);

            if(await attack(who, are, this.voi, 'ph', this.aim)) return 1;
            if(await attack(who, are, this.voi, 'ph', this.aim)) return 1;

            return 0;
        }
    },
    {
        name:'踏み込み斬り',//まじん斬り も作りたいね 霹靂一閃も
        desc:'対象に攻撃力の300%のダメージを与える。',
        voi: 300,
        aim: 40,
        mp:0,
        lv:1,
        func:async function(who, data = {}){
            let are = await selectSyudou(1);

            let aim = this.aim;
            let voi = this.voi;
            if(who.data.ps.name == 'highsol'){
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
    },

    {
        name:'小突く',
        desc:`対象に攻撃力の${this.voi}%のダメージを与える。武器攻撃力を加算しない。`,
        flav:"ぺちって感じ",
        aim:100,
        voi:50,
        lv:1,
        tcam:'players',
        func:async function(who, data = {}){
            let are;
            if(data["are指定"]) are = data["are指定"];
            else are = await selectSyudou(1);

            data["素手"] = 1;
            if(await attack(who, are, this.voi, "ph", this.aim, data)) return 1;
            return 0;
        }
    },
]

const Mags = [
    {
        name:'heal',
        jpnm:'heal',
        desc:'指定した味方の体力を20%回復する。',
        mp:4,
        lv:1,
        func:async function(who){
            let are = await selectSyudou(1);
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
        func:async function(who){
            let are = await selectSyudou(1);
            await buffAdd(who, are, "攻撃倍率20%上昇", 3);
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
        func:async function(who){
            let are = await selectSyudou(1);
            await buffAdd(who, are, "防御倍率20%上昇", 3);
            return 0;
        }
    },
    {
        name:'poison',
        jpnm:'ぽいぞね', //うーん日常組
        desc:'指定した人に_毒_(4t,1lv)を付与する',
        mp:7,
        lv:3,
        func:async function(who){
            let are = await selectSyudou(1);
            await buffAdd(who, are,'毒', 4,1);
            return 0;
        }
    },
    {
        name:'thundee',
        jpnm:'サンディ',
        desc:'牽制に使われがち',
        mp:3,
        lv:4,
        func:async function(who){
            let are = await selectSyudou(1);
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
        func:async function(who){
            let are = await selectSyudou(1);
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
        func:async function(who){
            let are = await selectSyudou(1);
            if(await heal(who, are, "40%")) return 1;
            return 0;
        }
    },
    {
        name:'luck',
        jpnm:'luck',
        desc:'二回行動人間になれるかも？なやつ。\n欠けた運を施錠しましょう',
        mp:4,
        lv:7,
        func:async function(who){
            let are = await selectSyudou(1);
            await buffAdd(who, are, "幸運", 4);
            return 0;
        }
    },
    {
        name:'thundos',
        jpnm:'サンドス',
        desc:'二段目。\nサンドじゃないんです許してください',
        mp:8,
        lv:8,
        func:async function(who){
            let are = await selectSyudou(1);
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
        func:async function(who){
            let are = await selectSyudou(1);
            await buffAdd(who, are,'攻撃倍率40%増加',3,2)
            return 0
        }
    },
    {
        name:'moreshell',
        jpnm:'more shell',
        desc:'防御力が1.5倍になります。けどあんまり実感はないよね',
        mp:8,
        lv:9,
        func:async function(who){
            let are = await selectSyudou(1);
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
        func:async function(who){
            let are = await selectSyudou(1);
            await buffAdd(who, are,'猛毒', 5);
            return 0;
        }
    },
    {
        name:'garvan',
        jpnm:'ガーヴァン',
        desc:'\nnotラージャン',
        mp:10,
        lv:11,
        func:async function(who){
            let are = await selectSyudou(1);
            if(await attack(who, are, 230, 'mg', 90, ["属性_炎"])) return 1;;//火

            await buffAdd(who, are,'burn', 2,2);
            return 0;
        }
    },
    {
        name:'thehealest',
        jpnm:'the healest',
        desc:'60%回復。これ以上はない、っていう意味ですね。\nxyzじゃないよ',
        mp:12,
        lv:12,
        func:async function(who){
            let are = await selectSyudou(1);
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
        func:async function(who){
            let are = await selectSyudou(1);
            await buffAdd(who, are,'luck', 5, 2);
            return 0
        }
    },
    {
        name:'merazoma',
        jpnm:'メラゾーマ',
        desc:'ぬわーーっっ!!ってしてやりましょうぜ(炎の大ダメージ)',//対パパス最強にしたいね、これ
        mp:12,
        lv:12,
        func:async function(who){
            let are = await selectSyudou(1);
            if(await attack(who, are, 3.5, 'mg',4)) return 1;//雷

            await buffAdd(who, are, 'burn', 3,2);
            return 0;
        }
    },
    {
        name:'thoron',
        jpnm:'Thoron',
        desc:'当たったらラッキー、シールドでされたら空前で追撃なつよつよ技。\nけどギガサンダーの方が好き(雷の大ダメージ)',
        mp:20,
        lv:15,
        func:async function(who){
            let are = await selectSyudou(1);
            if(await attack(who, are,6,'mg',4)) return 1;//雷
            return 0;
        }
    },
    {
        name:'random',
        jpnm:'Random',
        desc:'自身が覚えてる魔法からランダム(mpは5固定)。これぞ醍醐味ってやつよな',
        mp:5,
        lv:1,
        func:async function(who){
            // x = Object.keys(Mags).map(a => Mags[a].lv <= humans[cam][me].level ? Mags[a].name : null).filter(Boolean)
            // y = Math.floor(Math.random() * x.length);
            // log.textContent = x[y]+'が出た！';await delay(1000);
            // x[y](who, are);

            let are = await selectSyudou(1);

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
        func:async function(who){
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
        func:async function(who){
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
            turretPlace(who.cam);
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
                    await buffAdd(who, are,'毒', 3);
                    break; //毒ガス入りだった場合
                };
                case 2:{
                    await logText('爆弾はスライム入りだった!!');
                    await buffAdd(who, are,'onslime', 2);
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
        jpnm:'ベストを尽くすよ！',
        desc:`slash時、${this.h}%の確率でさらに2回攻撃する`,
        flav:"しゅいーん？べんっべんっ",
        when:"ato",
        p:"name,slash",
        h:25,
        price:90,
        func:async function(who, are, data){
            if(!hit(this.h)) return 0;
            
            await logText(`${who.jpnm}は頑張った！`);
            let slash = findActs("slash");
             if(!slash) console.error("じゃあなんでこれは実行されてんだよ");
            if(await slash.func()) return 1;
            if(await slash.func()) return 1;
            return 0;
        }
    },
    {
        type:'ps',
        name:'solplaceturret',
        jpnm:'雷ちゃん、もうちょっと',
        desc:'slash of light命中時、味方陣営にタレットを1つ配置する',
        when:"ato",
        p:"name,slash_of_light",
        h:"-",
        price:90,
        func:async function(who, are, data){
            if(data.dmg??0 <= 0) return 0;
            turretPlace(who.cam);
        }
        
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
                    console.log(are)
                    await buffAdd(who, are, '頭にくっつくスライム', 1);
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
        def:'-30',
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
                    console.log(are)
                    await buffAdd(who, are,'影化', 2,1);
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
                    let x = 80;
                    let buff = buffHas(who, '影化');
                    if(buff){
                        buff.vanish();
                        x = 190;
                    }

                    await logText(`${who.name}は突進してきた！`);
                    let are = selectJodou(who, 'are', 0, 'random');
                    if(await attack(who, are, x, "ph", 100)) return 1;
                    return 0;
                }
            },
            {
                name:'ローキック',//ロストワンの号哭の号哭使いたいけど意味が"泣くこと"らしい むりすぎ
                p:20,
                type:'none',
                num:3,
                func:async function(who){
                    await logText(`${who.name}はローキックしてきた！`)
                    let are = selectJodou(who, 'are', 'hp', 'low');
                    if(await attack(who, are, 70, "ph", 100)) return 1;
                    await buffAdd(who, are, 'spddown', 2, 1);
                    return 0;
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
                    let are = selectJodou(who, "are", "hp", "high");
                    await buffAdd(who, are, "麻痺", 2);
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
                    let are = selectJodou(who, "are", "hp", "high");
                    await buffAdd(who, are, "毒", 2);
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
                    let are = selectJodou(who, "are", "hp", "high");
                    await buffAdd(who, are, '睡魔', 2);
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
    },
    {
        no:1,
        name:"顎のあいつ"
    },

    // 不思議ゾーン 本でもいいけど別のとこでもいい可能性はある
    {
        no:1,
        name:"未定_不思議01",
        maxhp:"-10",
        def:'-5',
        mdef:'+5',
        acts:[
            // セリフは基本ちゃんのイメージ
            {
                i:1,
                name:"① シンプル",
                p:"60",
                type:"none",
                func:async(who)=>{
                    await logText("ちょっと失礼するね〜？"); //23
                    
                    let are = selectJodou(who, "are", "maxhp", "high", 1, {"優先": "data:key:a"});

                    data = {};
                    
                    let waits = [1000, 300, 800];
                    for(let i=0; i<3; i++){
                        if(await attack(who, are, 90, "mg", 100, data)) return 1;

                        buffAdd(who, are, "共通因数", 2);
                        await delay(waits[i]);
                    }

                    return 0;
                }
            },
            {
                i:2,
                name:"② 防御無視とか_お嬢様のアレみたいな",
                p:"24",
                type:"none",
                func:async(who)=>{
                    await logText("防御してもむだむだぁ♡"); //ちょっと...露骨か？いやいいか。他場所で♡を増やせばよい
                    
                    let are = selectJodou(who, "are", "maxhp", "high", 1, {"優先": "data:key:a"});

                    data = {};
                    data["貫通"] = 1;
                    
                    let waits = [1000, 500, 500];
                    for(let i=0; i<3; i++){
                        if(await attack(who, are, 85, "mg", 100, data)) return 1;

                        buffAdd(who, are, "共通因数", 2);
                        await delay(waits[i]);
                    }
                }
            }
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
            crdm: '=90',
            atk: '-70%',
        }
    },
]

// =====================================================================
// data_changed.js  ― 科学システム導入パッチ(データ側)
// 使い方: data.js の【一番最後】にそのまま貼る (or data.js の直後に別ファイルで読む)
//   ・const の配列(Zokusay / Phenomenons)は中身を入れ替える形なので、元の宣言は消さなくてOK
//   ・Buffs は同名があれば上書き、なければ追加(buffUpsert)
//   ・Acts / Charas は push で追加
// =====================================================================


// ---------------------------------------------------------------------
// フィールド初期値 (戦闘開始のたびにこれに戻る)
// ---------------------------------------------------------------------
const FieldInit = {
    O: 0,
    H: 0,
    H2O: 0,
    N: 0,
    NH3: 0,
    pH: 7,
    e: 0,
};


// ---------------------------------------------------------------------
// 属性 (Zokusay) ― need.key:  "O" = O実効(O-H2O) / "H2O" = 湿潤実効(H2O-O) / "e" = 電荷そのまま
//                  use: 数値 = その分だけ消費 / "all" = 全部 / 0 = 消費しない
// 濃度の数値は今のdata.jsに入ってたやつ(P2, S7, C12, Mg6, Na4, V1)をそのまま採用
// ---------------------------------------------------------------------
Zokusay.length = 0;
Zokusay.push(
    {
        name: "P",
        jpnm: "リン",
        desc: "〈O濃度:2〉これで攻撃すると発火を引き起こし、Oを1だけ消費する。",
        need: { key: "O", n: 2 },
        use: 1,
        mode: "fire",
    },
    {
        name: "S",
        jpnm: "硫黄",
        desc: "〈O濃度:7〉これで攻撃すると発火を引き起こし、Oを全て消費する。また、相手キャラクター全てに「毒」を3t1lv付与する。これは、消費したOの量が5を超えるたびに1lvずつ上がる。",
        need: { key: "O", n: 7 },
        use: "all",
        mode: "fire",
    },
    {
        name: "C",
        jpnm: "炭素",
        desc: "〈O濃度:12〉これで攻撃すると発火を引き起こし、Oを全て消費する。また、相手キャラクター全てに「延焼」を付与する。これは、消費したOの量が12を基準として4増えるたびに1ずつ長くなる。",
        need: { key: "O", n: 12 },
        use: "all",
        mode: "fire",
    },
    {
        name: "Mg",
        jpnm: "マグネシウム",
        desc: "〈O濃度:6〉これで攻撃すると発火を引き起こし、Oを4だけ消費する。また、相手キャラクター全体に「フラッシュ」を1t付与する。",
        need: { key: "O", n: 6 },
        use: 4,
        mode: "fire",
    },
    {
        name: "Na",
        jpnm: "ナトリウム",
        desc: "〈H2O濃度:4〉これで攻撃すると水素爆発を引き起こし、H2Oを全て消費する。消費したH2Oに関わらず、発端者の攻撃力の23%で相手全体にダメージを3回にわたって与える。また、これは発火と同じように他の対象にも影響を与える。",
        need: { key: "H2O", n: 4 },
        use: "all",
        mode: "hydrogen",
    },
    {
        name: "V",
        jpnm: "電圧",
        desc: "〈電荷:1〉これで攻撃すると、通電を引き起こす（eは消費しない）。",
        need: { key: "e", n: 1 },
        use: 0,
        mode: "energize",
    }
);


// ---------------------------------------------------------------------
// 現象 (Phenomenons) ― 説明文の更新。実処理は nakami_changed.js 側
// ---------------------------------------------------------------------
Phenomenons.length = 0;
Phenomenons.push(
    {
        name: "conbute",
        jpnm: "発火",
        desc: `火が起こる現象。(自然発火でない場合)攻撃を受けた陣営の全体が、発端者の攻撃力の60%の爆発ダメージを受け、「火傷」を2t付与される。ダメージは消費したOが2を超えるたびに10%、ターン数は4を超えるたびに1t増える。「水濡れ」の相手はダメージ半減。
        [1] 発生時にフィールドにNH3があるならば、NH3を全て消費して2度目の爆発が起こる。ダメージは1度目の35% x 消費したNH3量。
        [2] 「発火が起こらない」状態では発生しない。`,
    },
    {
        name: "hydrogen",
        jpnm: "水素爆発",
        desc: "Na属性で起こる。発端者の攻撃力の23%を相手全体に3回。発火と同じ扱いで、NH3への引火・発火無効の影響を受ける(火傷は付かない)。",
    },
    {
        name: "press",
        jpnm: "圧縮",
        desc: "高圧をかけること。「凍結」と「ハーボヨン」が連鎖する。エリア内に四酸化三鉄製のキャラクターがいる場合はハーボヨンが先、いなければ凍結が先。",
    },
    {
        name: "havoc",
        jpnm: "ハーボヨン",
        desc: "N,Hがともに1以上あるとき、低い方の値の分だけ両方を減らし、同じ量のNH3をフィールドに追加する。",
        flav: "おや、知ってるのと違うって？訂正しろって？......ず、頭痛に効くのはアスピリン！",
    },
    {
        name: "freeze",
        jpnm: "凍結",
        desc: "場にNとH2Oが3以上ある状態で圧縮を行うと発生。NとH2Oを3ずつ減らし、全キャラクターに「凍傷」3、フィールドに「発火が起こらない」3tを付与する。",
    },
    {
        name: "expand",
        jpnm: "膨張",
        desc: "低圧化すること。フィールドのH2Oが5以上ならば「降雨」が連鎖する。",
    },
    {
        name: "rain",
        jpnm: "降雨",
        desc: "膨張でH2Oが5以上のとき発生。H2Oを3減らし、4ターンの間、ラウンド終了時にH2Oが1ずつ増える。",
    },
    {
        name: "energize",
        jpnm: "通電",
        desc: "場にeが1以上ある状態でV属性で攻撃すると発生。通常ダメージに e x 15% を上乗せし、「感電」を1t付与する。「水濡れ」の相手はV属性のダメージが2倍。",
    },
    {
        name: "electrolysis",
        jpnm: "電気分解",
        desc: "通電が発生したとき〈H2O濃度:1〉H2Oを1消費し、pHを2下降させ、Oを1増加させる。",
    },
    {
        name: "neutral",
        jpnm: "中和",
        desc: "何らかの要因でpHがちょうど7になったとき、全キャラクターに10ダメージを与え、H2Oを3増加させる。",
    }
);


// ---------------------------------------------------------------------
// Buff のアップサート (同名なら上書き / なければ追加)
// ---------------------------------------------------------------------
function buffUpsert(b){
    let i = Buffs.findIndex(a => a.name == b.name);
    if(i < 0) Buffs.push(b);
    else Buffs[i] = b;
}

// 木製装備チェック(火傷用)。元のdata.jsと同じ判定
const _hasWoodEquip = (who) => Array.isArray(who.equips)
    ? who.equips.some(e => { try { return /木|wood/i.test(JSON.stringify(e)); } catch { return false; } })
    : /木|wood/i.test(JSON.stringify(who.equips ?? {}));

// 毒: レベル(buff.lv)比例に。最大HPの4% x lv
buffUpsert({
    name: "毒",
    type: "turn",
    gb: "b",
    desc: "ターン終了時、最大HPの4%分(x Lv)、シールドを貫通したダメージを受ける。",
    flav: "？？？「毒の苦しみもお好きなんですね」",
    efs: {
        "turn_end": {
            func: async(who, ares, data, buff) => {
                let lv = buff?.lv ?? 1;
                let val = Math.max(Math.floor(who.maxhp * 0.04 * lv), 1);

                data["攻撃者"] = "病原体";
                data["ダメージ"] = "効果";

                if(await damage(who, who, val, "mg", ["無視:シールド"], data)) return 1;
                return 0;
            }
        }
    }
});

// 火傷: stack → turn(発火で「2t」付与のため)。ダメージ = 5 x Lv
buffUpsert({
    name: "火傷",
    type: "turn",
    gb: "b",
    desc: `ターン終了時、Lvに比例した固定ダメージ(5 x Lv)を受ける。また、攻撃力が4下がる。
            [1] 木製の装備を着ている場合、この効果のダメージは2倍になる。`,
    flav: "木製装備へのメタになってくれ、君は",
    efs: {
        "fanfare": {
            func: async(who, are, data, buff) => {
                are.atk -= 4;
            }
        },
        "turn_end": {
            func: async(who, ares, data, buff) => {
                let val = 5 * (buff?.lv ?? 1);
                if(_hasWoodEquip(who)) val *= 2;

                data["攻撃者"] = "火傷";
                data["ダメージ"] = "効果";

                if(await damage(who, who, val, "ph", [], data)) return 1;
                return 0;
            }
        },
        "lastword": {
            func: async(who, are, data, buff) => {
                are.atk += 4;
            }
        }
    }
});

// 凍傷: ターン開始時にstackが1減る(メモ準拠)
buffUpsert({
    name: "凍傷",
    type: "stack",
    gb: "b",
    desc: "速度が10低下する。さらにターン開始時、stack1つにつき5ダメージを受け、その後stackが1減る。",
    flav: "凍傷の英語カッコよすぎ問題、あります",
    efs: {
        "fanfare": {
            func: async(who, are, data, buff) => {
                are.spd -= 10;
            }
        },
        "turn_start": {
            func: async(who, are, data, buff) => {
                let val = Math.max(buff.time, 1) * 5;

                data["攻撃者"] = "凍傷";
                data["ダメージ"] = "効果";

                if(await damage(who, who, val, "ph", [], data)) return 1;
                await buff.add(-1, data);
                return 0;
            }
        },
        "lastword": {
            func: async(who, are, data, buff) => {
                are.spd += 10;
            }
        }
    }
});

// 自然の循環: 元素消費の前後フック(genso_pre / genso_ed)で判定するように修正
buffUpsert({
    name: "自然の循環",
    type: "turn",
    gb: "g",
    desc: "Oを消費する時、50%の確率で消費しない。",
    efs: {
        "genso_pre": {
            func: async(who, are, data, buff) => {
                buff.saved["O"] = batC.field["O"];
            }
        },
        "genso_ed": {
            func: async(who, are, data, buff) => {
                let diff = buff.saved["O"] - batC.field["O"];
                if(diff <= 0) return 0;
                if(hit(50)) await elemenAdd("O", diff, who);
                return 0;
            }
        }
    }
});

// 水濡れ: 発火ダメージ半減(nakami側のisWetで判定) / V属性ダメージ2倍
buffUpsert({
    name: "水濡れ",
    type: "turn",
    gb: "b",
    desc: "発火によるダメージを半減させるが、V属性によるダメージは2倍受けるようになってしまう。",
    efs: {
        "be-attack_ing": {
            func: async(who, are, data, buff) => {
                if(data["元素"] == "V") return `dmg変更:${data["dmg"] * 2}`;
                return 0;
            }
        }
    }
});

// うるるんぼでぃ: 水濡れの常駐版。mpが尽きたら解消
buffUpsert({
    name: "うるるんぼでぃ",
    type: "stack",
    gb: "g",
    desc: "発火によるダメージを半減させるが、V属性によるダメージは2倍受けるようになってしまう。自身のmpが0以下になると解消される。",
    efs: {
        "be-attack_ing": {
            func: async(who, are, data, buff) => {
                if(data["元素"] == "V") return `dmg変更:${data["dmg"] * 2}`;
                return 0;
            }
        },
        "turn_end": {
            func: async(who, are, data, buff) => {
                if(who.mp <= 0) await buff.vanish(data);
                return 0;
            }
        }
    }
});

// フラッシュ: aim -90
buffUpsert({
    name: "フラッシュ",
    type: "turn",
    gb: "b",
    desc: "命中率(aim)が90低下する。",
    efs: {
        "fanfare": {
            func: async(who, are, data, buff) => { are.aim -= 90; }
        },
        "lastword": {
            func: async(who, are, data, buff) => { are.aim += 90; }
        }
    }
});

// 感電: 通電の追加効果(メモに詳細が無かったので仮: spd -20)
buffUpsert({
    name: "感電",
    type: "turn",
    gb: "b",
    desc: "感電している。速度が20低下する。(仮)",
    efs: {
        "fanfare": {
            func: async(who, are, data, buff) => { are.spd -= 20; }
        },
        "lastword": {
            func: async(who, are, data, buff) => { are.spd += 20; }
        }
    }
});


// ---------------------------------------------------------------------
// Acts 追加 ― 元素攻撃 / フィールド操作
// ---------------------------------------------------------------------

// 元素攻撃: [技名, 属性, 威力%, 命中, フレーバー]
[
    ["リン弾",         "P",  60, 100, "いちばん素直な発火。燃費がよい"],
    ["硫黄弾",         "S",  50, 100, "くっさい。でも毒が痛い"],
    ["炭素弾",         "C",  70, 100, "O、貯めに貯めて、ドーン"],
    ["マグネ弾",       "Mg", 40, 100, "まぶしい。とにかくまぶしい"],
    ["ナトリウム弾",   "Na", 50, 100, "水に入れちゃダメなやつ。入れるけど"],
    ["電圧弾",         "V",  60, 100, "e が溜まっていれば、ビリビリ"],
].forEach(([name, zoku, voi, aim, flav]) => {
    Acts.push({
        name,
        desc: `対象に攻撃力の${voi}%の魔法ダメージを与える。${zoku}属性。`,
        flav,
        aim,
        voi,
        mp: 0,
        lv: 1,
        func: async function(who, data = {}){
            let are = await selectSyudou(1);
            data["元素"] = zoku;
            if(await attack(who, are, this.voi, "mg", this.aim, data)) return 1;
            return 0;
        }
    });
});

// フィールド操作: [技名, 説明, フレーバー, 処理]
[
    ["酸素放出", "フィールドのOを4増やす。", "酸素ボンベをぷしゅー",
        async(who) => { await elemenAdd("O", 4, who); }],
    ["水素放出", "フィールドのHを4増やす。", "無臭で無害。ほんとに？",
        async(who) => { await elemenAdd("H", 4, who); }],
    ["窒素放出", "フィールドのNを4増やす。", "待機中には一切存在しないので、ここで足す",
        async(who) => { await elemenAdd("N", 4, who); }],
    ["給水", "フィールドのH2Oを3増やす。", "湿潤度、上昇中",
        async(who) => { await elemenAdd("H2O", 3, who); }],
    ["帯電", "フィールドのeを2増やす。", "静電気って実はけっこう痛い",
        async(who) => { await elemenAdd("e", 2, who); }],
    ["酸添加", "フィールドのpHを2下げる。", "すっぱい",
        async(who) => { await elemenAdd("pH", -2, who); }],
    ["塩基添加", "フィールドのpHを2上げる。", "ぬるぬる",
        async(who) => { await elemenAdd("pH", 2, who); }],
    ["水撒き", "フィールドのH2Oを2増やし、敵単体に「水濡れ」を3t付与する。", "びしょびしょ",
        async(who) => {
            let are = await selectSyudou(1);
            await elemenAdd("H2O", 2, who);
            await buffAdd(who, are, "水濡れ", 3);
        }],
    ["圧縮", "フィールドに高圧をかける。(凍結・ハーボヨンが連鎖)", "ぎゅっ",
        async(who) => { return await atsuryoku(who, "compress"); }],
    ["膨張", "フィールドを低圧化する。(H2O5以上で降雨が連鎖)", "ふわっ",
        async(who) => { return await atsuryoku(who, "expand"); }],
].forEach(([name, desc, flav, fn]) => {
    Acts.push({
        name,
        desc,
        flav,
        aim: 100,
        voi: 0,
        mp: 0,
        lv: 1,
        func: async function(who, data = {}){
            if(await fn(who)) return 1;
            return 0;
        }
    });
});


// ---------------------------------------------------------------------
// 動作確認用キャラ (各属性1人ずつ + 水濡れ担当)  ※acts は3つまで表示される仕様
// [name, jpnm, desc, acts, bor, back]
// ---------------------------------------------------------------------
[
    ["ignis",   "イグニス",   "P属性の見習い。Oを溜めてリン弾。",              ["リン弾", "酸素放出", "小突く"],           "#ff7373", "#fff0e0"],
    ["sulfa",   "サルファ",   "S属性の見習い。毒で殴る。",                    ["硫黄弾", "酸素放出", "小突く"],           "#c9a800", "#fffbd0"],
    ["tangent", "タンジェント", "C属性の見習い。Oを溜めて溜めて、炭素弾。",       ["炭素弾", "酸素放出", "小突く"],           "#2b2b2b", "#d8d8d8"],
    ["magne",   "マグネ",     "Mg属性の見習い。目潰し担当。",                  ["マグネ弾", "酸素放出", "小突く"],         "#b0b0ff", "#ffffff"],
    ["natrium", "ナトリ",     "Na属性の見習い。水を撒いて、爆発。",             ["ナトリウム弾", "給水", "膨張"],           "#ff9f43", "#fff2e0"],
    ["volta",   "ボルタ",     "V属性の見習い。eを溜めてビリビリ。",             ["電圧弾", "帯電", "給水"],                 "#7f1184", "#f0e6ff"],
    ["frost",   "フロスト",   "N担当。圧縮でNH3を作ったり凍らせたり。",         ["窒素放出", "水素放出", "圧縮"],           "#3a7bd5", "#e6f4ff"],
    ["aqua",    "アクア",     "水濡れ担当。pHもいじる。",                      ["水撒き", "酸添加", "塩基添加"],           "#2fa8cc", "#e0f9ff"],
].forEach(([name, jpnm, desc, acts, bor, back]) => {
    Charas.push({
        name,
        jpnm,
        img: name,
        desc,
        key: "n",
        acts,
        stat: {
            atk: 20, def: 5, matk: 30, mdef: 10,
            maxhp: 80, maxmp: 50,
            crla: 5, crdm: 150, crrs: 0,
            spd: 50,
        },
        col: { bor, back },
    });
});
