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
    { name:'home', rank:2, back:'#f0f8ff', sho:1 },
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
        name:""
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
                func:(who, are, data = {}){
                    // 4回P属性の弱攻撃
                }
            },
            {
                type:"act", //アクティブスキル
                name:""
            }
        ]
    }
]
