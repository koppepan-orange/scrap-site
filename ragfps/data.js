let Style = {
    iPhone:{ //16
        "width": "393px",
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
];

const Images = {
    systems:['error'],
    skins:['normal', 'teethcar'],
    blocks:['block', 'bleck', 'box', 'ice', 'water', 'apple', 'baloon', 'boost'],
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
    },
    {
        ind:0,
        name:'dsdss',
        arr:['d','s','d','s','s'],
        limit:'n',
        func: async function(){
            staF.randomap();
        }
    }
]

const Spaces = [
    { name:'stage', rank:2, back:'#f3fff0', sho:1 },
];



const States = [
    {
        name:'float',
        jpnm:"フユウ",
        desc:"重力を無視できます"
    },
    {
        name:"air_stair",
        jpnm:"空気階段",
        desc:"空中で何度もジャンプを使用できます（？）"
    }
]

const Blocks = [
    /*
    on:0/1 1ならonFで乗った時動作。...ん？「乗って、次に方向を入力したあと」に発動するはどうするんだ？
    今、あどゔぁいすをもらいましたーー、こんなんなんぼあってもいいですからね
    */

    {
        name: "block",
        jpnm: "普通のブロック",
        on: 0, // 何も起きない壁
    },
    {
        name: "bleck", //乗って、その後方向入力をすると壊れる。下ボタンでも上ボタンでも壊れるのでち
        jpnm: "壊れかけのレディオ",
        on: "atsk",
        onF: (x, y) => {
            // console.log(`${x}, ${y}のブロックが壊れました！`);
            staF.delmap(x, y);
        }
    },
    {
        name: "box", //特殊。押せる。ジャンプでも押せるし、下向きも押せる むずそ～～
        jpnm: "おせる箱",
        on: "osu",
        onF: () => {
            let p = staC.p;
            let dir = p.dir; // 0:上, 1:右, 2:下, 3:左
            let d = 1;


        }
    },
    {
        name: "ice", 
        jpnm: "つるつる床", //乗った時、最後に入力した方向にmoveさせる
        on: "step",
        onF: async() => {
            let p = staC.p;
            let dir = p.dir;

            let [xy, num] = staF.separate(dir)
            // console.log(xy, num)
            
            await staF.move(xy, num);
            staF.draw();
        }
    },
    {
        no: 1,
        name: "water", //水内なら自由に動けるが、水外に出ると戻る。
        jpnm: "お水",
        on: "step",
        onF: () => {
            p.state = "フユウ"; // 落下を無効化するバフ（デバフ？）を与える
        }
    },
    //つな 乗るとつかまれて、その場にとどまれる
    {
        name: "apple", //乗るとすぐに下方向に何かにぶつかるまでごと直進する。
        jpnm: "落ちるリンゴ",
        on: "step",
        onF: () => {
            // 下方向に障害物（searchで何か引っかかるか、画面外）にぶつかるまで
            // ループで p.y を増やし続ける
        }
    },
    {
        name: "baloon", //乗るとすぐに上方向に何かにぶつかるまでごと直進する。
        jpnm: "浮かぶ風船",
        on: "step",
        onF: () => {
            // appleの逆。上方向（yマイナス）にぶつかるまで直進！
        }
    },
    {
        name: "boost",  //左右の向いてる方向に何かにぶつかるまでごと直進する
        jpnm: "ぶおぉーん",
        on: "step",
        onF: async(x, y) => {
            let p = staC.p;
            let dir = p.dir;
            let edge = staC.row-1;
            let [xy, num] = staF.separate(dir);
            if(xy == y) return 1;

            let rest = 0;
            if(dir == 1) rest = edge - x;
            if(dir == 3) rest = x;

            for(let i=0; i<rest; i++){
                let tx = p.x + (xy == "x" ? num : 0);
                let ty = p.y+1;
                
                let res = staF.search(tx, ty);
                if(res) break;

                let self = staC.map[x][y];
                staC.map[x][y] = 0;

                x = tx;
                y = ty;
                self.x = x;
                self.y = y;

                staF.move("x", num);
                staC.map[x][y] = self;
            }


        }
    }
];


const Maps = [
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
]