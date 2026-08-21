let Style = {
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
    {src:"cinecaption226", type:"ttf"},
];

const Images = {
    systems:['error'],
    apps:["map", "amonds", "error"]
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
    { name:'road', rank:2, back:'#f1fff0' },
];


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
            if(roaC.wait) return 0;
            roaC.wait = 1;

            roaF.log("わっ！なんか、、なんかぞわっとした！！");
            roaF.log("腕かな");
            await delay(2000);
            roaF.log("いないわ");
            roaF.log("じゃあ...あ、首！首っぽい！");
            await delay(2400)
            roaF.log("いないわ");
            roaF.log("...気のせいか");

            roaC.wait = 0;

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

