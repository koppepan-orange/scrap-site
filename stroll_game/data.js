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
        desc:"プラスチック製。燃やすと",
        flav:"ポリエチレンテレフタレートで作られているボトル。ちなみにポリエチレンテレフタレートはポリエステルという衣服の素材になったりする。ポリエチレンテレフタレートはPETとも略される。"
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
const Events = [
    {
        name:"find_inryo",
        jpnm:"飲み物のごみを発見",
        c:"zensen", //発火条件
        p:0, //条件 - P(x)
        h:75, //hit
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
            }

            roaF.ochi53(gomi);
        }
    },
    {
        name:"",
        jpnm:"",
        c:,
        p:,
        h:,
        func:async()=>{

        }
    },
    {
        name:"",
        jpnm:"",
        c:,
        p:,
        h:,
        func:async()=>{
            
        }
    },
    {
        name:"",
        jpnm:"",
        c:,
        p:,
        h:,
        func:async()=>{
            
        }
    },
    {
        name:"",
        jpnm:"",
        c:,
        p:,
        h:,
        func:async()=>{
            
        }
    },
    {
        name:"",
        jpnm:"",
        c:,
        p:,
        h:,
        func:async()=>{
            
        }
    },
    {
        name:"",
        jpnm:"",
        c:,
        p:,
        h:,
        func:async()=>{
            
        }
    }
]
