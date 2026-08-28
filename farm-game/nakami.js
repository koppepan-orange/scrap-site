// #region main
let mainD = document.getElementById('main');
let mainC = {
    spa: null,
    
    mvlsD: document.getElementById('movlis'),
     mvlsLD: document.querySelector('#movlis .list'),
    mvlsi: 0,

    returnDs: mainD.querySelectorAll('.return'),
}
let mainF = {};
mainF.move = (to) => {
    console.log(`[move] ${to}`);
    if(mainC.spa == to) return console.log('どういうわけか もう そこにいる');
	if(!to) return console.error(`せんぱ〜い？${to}ってどこですか〜？笑`);
	
	for(let a of Spaces) document.getElementById(a.name).classList.remove('show');
    document.getElementById(to).classList.add('show');
    mainC.spa = to;

    switch(to){
        case "home":{
            homF.came();
            break;
        }
    }

    history.replaceState(null, "", `?${to}`);
}

mainF.load = () => {
    for(let spa of Spaces){
        let div = document.getElementById(spa.name);
        if(!div) continue;

        div.style.zIndex = spa.rank;
        div.style.background = spa.back;
    }

    for(let a of mainC.returnDs){
        let from = a.dataset.belong; //これが所属spaceのはず
        
        new fuyoNagaOSU(a, () => {
            mainF.move("home");
        }, 1000);
    }
}

//#region movlis
for(let n of Spaces){
    let li = document.createElement('div');
    li.textContent = n.name;
    li.className = 'item';

    li.addEventListener('click', () => mainF.move(n.name));

    mainC.mvlsLD.appendChild(li);
}
document.addEventListener('keydown', (e) => {
    if(e.key != 'm' || mainC.mvlsi) return;
    mainC.mvlsD.style.left = `${OBS.mx - mainC.mvlsD.offsetWidth/2}px`;
    mainC.mvlsD.style.top = `${OBS.my}px`;
    mainC.mvlsD.classList.add('tog');
    mainC.mvlsi = 1;
})
document.addEventListener('keyup',e => {
    if(e.key != 'm') return;
    mainC.mvlsD.classList.remove('tog');
    mainC.mvlsi = 0;
})
//#endregion

//#endregion main

// #region rimi
let rimi = 0;
let rimiD = document.querySelector("#rimi .num");
let rimiC = {
    cupD: document.getElementById('cup'),
    cuped: 0
}
let rimiF = {};

rimiF.tekiou = () => {
    rimiD.textContent = `Ɍ${rimi}`;
}
rimiF.inc = (num = 0) => {
    if(typeof num == 'string') return 0;
    rimi += num;
    rimiF.tekiou();

    return num;
}
rimiF.dec = (num = 0) => {
    if(typeof num == "string") return 0;
    if(rimi < num) num = rimi;
    rimi -= num;
    rimiF.tekiou();

    return num;
}
rimiF.set = (num = 0) => {
    if(typeof num == "string") return 0;
    if(num < 0) return 0;
    let diff = rimi - num;
    rimi = num;
    rimiF.tekiou();

    return diff;
}

rimiF.push = () => {
    mainF.move("home");
}
rimiD.addEventListener('click', rimiF.push);

rimiF.cupF = () => {
    rimiC.cuped += 1;
    rimiF.inc(100);
    rimiF.tekiou();

    let arr = [
        "情けなぁ〜く乞食をするのはこの男〜！",
        "プライドを捨てて貰うお金...嬉しい？",
        "だっさぁ〜♡",
        "そんなに必死に頼むよりもぉ、働いた方がいいと思いますよ〜？",
        "よわよわな物乞い、お疲れ様で〜す♡"
    ]
    let text = arraySelect(arr);
    console.log(`[beg](${rimiC.cuped}回目) ${text} `);
}
rimiC.cupD.addEventListener('click', rimiF.cupF);
// #endregion


// #region phone
let phoD = document.getElementById("phone");
let phoC = {
    Ds:{
        apps: phoD.querySelector(".apps"),
    },

    tog:0,
    now:0,
}
let phoF = {};
phoC.apps = [
    {
        name:"map",
        jpnm:"マップ",
        D: phoD.querySelector(".app.map")
    },
    {name:"error", jpnm:"error"},
    {
        name:"amonds",
        jpnm:"Amonds!",
        D: phoD.querySelector(".app.amonds")
    },
    {name:"error", jpnm:"error"},
    {name:"error", jpnm:"error"},
    {
        name:"nero",
        jpnm:"三石の民", //こっちは普通のBJ。BJDはDoorの方
        D: phoD.querySelector(".app.nero")
    },
];

phoF.tog = (code = "黙れ") => {
    if(!isNaN(+code)) phoC.tog = code;
    else phoC.tog = fl(phoC.tog);

    if(phoC.tog) phoD.classList.add("tog");
    else phoD.classList.remove("tog");
}
phoD.addEventListener("click", (e) => {
    let rect = phoD.getBoundingClientRect();
    let clickY = e.clientY - rect.top;

    if(0 <= clickY && clickY <= 40){
        phoF.tog();
    }
    
    if(rect.height - 40 <= clickY && clickY <= rect.height){
        phoF.home(); // ホームボタンって感じ
    }
});

phoF.load = () => {
    for(let ap of phoC.apps){
        let div = document.createElement("div");
        div.className = `ap ${ap.name}`;

        let img = images["apps"][ap.name].cloneNode();
         div.appendChild(img);

        let label = document.createElement("div");
         label.className = "label";
         label.textContent = ap.jpnm;
         div.appendChild(label);
        
        if(ap.name != "error"){
            div.addEventListener("click", () => {
                phoF.activate(ap.name);
            });
        }

        phoC.Ds["apps"].appendChild(div);
        
    }
}
phoF.activate = (name) => {
    console.log(`[app] ${name} を起動した4`);
    
    let arr = phoC.apps;
     for(let ap of phoC.apps.filter(a => a.name != "error")) ap.D.classList.remove("carryout");
    let tarD = phoC.apps.find(a => a.name == name || a.jpnm == name);
     tarD.D.classList.add("carryout");
    phoC.now = name;
    
    switch(name){
        case "map":
            
    }
}
phoF.home = () => {
    let name = phoC.now;
    let tarD = phoC.apps.find(a => a.name == name || a.jpnm == name);
     tarD.D.classList.remove("carryout");
}

phoC.mapD = phoD.querySelector(".app.map");
phoC.mapC = {
    Ds:{
        liver: phoC.mapD.querySelector(".liver"),

    }
}
phoC.mapF = {

}

// #endregion


// #region home
let homD = document.getElementById("home");

let homC = {
    Ds: {
        time: document.getElementById("time"),
        stroll: homD.querySelector(".bt.stroll"),
        shop: homD.querySelector(".bt.shop"),
    },

    goDs: {
        farm: homD.querySelector(".uni1 .farm"),
        cook: homD.querySelector(".uni1 .cook"),
        shop: homD.querySelector(".uni2 .shop"),
        door: homD.querySelector(".uni2 .door")
    },
    time: [6, 0], // [時, 分]
    canka: 1,
    pt: 0,
};

let homF = {};

// 画面到達時の処理
homF.came = () => {
    if(hit(6)) homC.goDs["cook"].textContent = "キッキンチキンに向かう";
};

homF.load = () => {
    window.setInterval(homF.time, homC.canka * 1000);

    for(let k of Object.keys(homC.goDs)){
        if(homC.goDs[k]) homC.goDs[k].addEventListener('click', () => mainF.move(k));
    }
};

// 時間更新処理（バグ修正済み）
homF.time = () => {
    homC.time[1] += 1;

    if(homC.time[1] >= 60){
        homC.time[1] = 0;
        homC.time[0] += 1;

        if(homC.time[0] > 27){
            homC.time[0] = 4; // 日付変更（アークナイツの更新時間：午前4時）
        }
    }

    let [hou, min] = homC.time;
    let format = (n) => String(n).padStart(2, "0");

    if(homC.Ds["time"]){
        homC.Ds["time"].innerHTML = `${format(hou)}:${format(min)}`;
    }
};

homF.goStroll = () => {
    roaF.start();
};
homC.Ds["stroll"].addEventListener("click", homF.goStroll);





// #endregion


function findGeneric(list, type, name, extraCheck = null){
    let data;
    if(extraCheck) data = extraCheck(list, name);
     else data = list.find(a => a.name == name || a.jpnm == name);
    if(data) return data;
    
    console.log(`[find] ${type}で、「${name}」っていうものはないらしいです`);
    return 0;
}
const findGomis = (name) => findGeneric(Gomis, "Gomis", name);
const findRoaBuffs = (name) => findGeneric(RoaBuffs, "RoaBuffs", name);
const findBuff = (name) => findGeneric(Buffs, "Buffs", name);
const findRacer = (name) => findGeneric(Racers, "Racers", name);


// #region farm
let farD = document.getElementById("farm");
let farC = {
    growing: 0
};
let farF = {};

farF.load = () => {
    
}

// #endregion

// #region road
let roaD = document.getElementById("road");
let roaC = {
    Ds:{
        log: roaD.querySelector(".log"),

        bU: roaD.querySelector(".bts .bt.u"),
        bL: roaD.querySelector(".bts .bt.l"),
        bR: roaD.querySelector(".bts .bt.r"),
    },
    ing: 0,
    
    wait:0,

    moves:[[0, -1], [1, 0], [0, 1], [-1, 0]],
    row: 20,
    heyaAll: 40,
    mas: 0,
    imgN: 0,

    // 以下reset要素
    x: 0, 
    y: 0, 
    has: [],
    have: 0, //缶を持ってる量
    trus: 0, //缶を捨てた量
    dir: 0, //向き。上右下左-0123
    buffs: [],
}
let roaF = {}

roaF.reset = () => {
    roaC.x = 0;
    roaC.trus = 0;
    roaC.have = 0;
}
roaF.start = async() => {
    if(roaC.ing) return 0;
    roaC.ing = 1;

    roaF.reset();
    roaC.imgN = "assets/images/systems/star.png";
    if(hit(3)){ //ブルアカのデフォの☆3確率
        roaC.imgN = "assets/images/systems/star_walk.png";
        logText_log("私こそが レプリカの");
        logText_log("スター ウォーカーだ");
    }
    
    roaF.mapMake();
    
    mainF.move("road");
    roaF.mapUpdate();
    roaF.log('Lets Go!');


    roaF.mapPDraw(); //仮
}

roaF.log = (text) => {
    let div0 = roaC.Ds["log"];
    let div = document.createElement("div");
     div.innerText = text;
    div0.appendChild(div);
     div0.scrollTop = div0.scrollHeight;
}

roaF.tekiou = () => {
    let has = roaC.has;
     roaC.have = has.length;
}

 // #region map
roaF.mapResize = () => {
    let div0 = phoC.mapC.Ds["liver"];
    let div = div0.querySelector(".cell");
    if(!div) return 0;

    roaC.mas = div.getBoundingClientRect().width;
}
// roaF.mapMake = () => {
//     let row = roaC.row;
//     let heya = roaC.heyaAll; 

//     let map = []
//     for(let i=0; i<row; i++){
//         map[i] = [0];
//         for(let i2=0; i2<row; i2++){
//             map[i][i2] = {id:0};
//         }
//     }

//     /*
//     #idについて
//      0 虚空
//      1 道～～～～
//      2 開始地点 (1, 2は同じものという扱い)
//      3 自販機のある（かもしれない）
//     */

//     // 開始地点選定
//     let x = random(1, row) -1;
//     let y = random(1, row) -1;
//     map[y][x] = { id:2, x, y, dist:0 };
//     roaC.x = x, roaC.y = y;
    
//     let heyas = [];
//     heyas.push({x, y}) 

//     // スネークさんに道を作ってもらう
//     let moves = roaC.moves;
//     while(heyas.length < heya){
//         let send = arraySelect(heyas); //選択ed
//         let dir = arraySelect(moves);
//         x = send.x + dir[0];
//         y = send.y + dir[1];

//         if(0 <= x && x < row && 0 <= y && y < row && !map[y][x]?.id) {
//             let dist = map[send.y][send.x].dist + 1;
//             map[y][x] = { id: 1, x, y, dist };
//             heyas.push({x, y});
//         }
//     }

    
//     let zihan = random(1, 3);
//     let zihaned = 0;
//     while(zihaned < zihan){
//         let send = arraySelect(heyas); //選択ed
//         let dir = arraySelect(moves);
//         x = send.x + dir[0];
//         y = send.y + dir[1];

//         if(0 <= x && x < row && 0 <= y && y < row && (map[y][x].id != 0 && map[y][x].id < 2)){
//             map[y][x].id = 3;
//             zihaned += 1;
//         }
//     }

//     roaC.map = map;
//     roaC.heyas = heyas;

//     roaF.mapResize();
// }
roaF.mapMake = () => {
    let row = roaC.row;
    let heya = roaC.heyaAll; 

    let map = [];
    for(let i = 0; i < row; i++){
        map[i] = [];
        for(let i2 = 0; i2 < row; i2++){
            map[i][i2] = { id: 0 };
        }
    }

    // 開始地点選定
    let x = random(1, row) - 1;
    let y = random(1, row) - 1;
    map[y][x] = { id: 2, x, y, dist: 0 };
    roaC.x = x; 
    roaC.y = y;
    
    let heyas = [];
    heyas.push({ x, y });

    let mx = x;
    let my = y;
    let mkdir = random(0, 3); // 最初に進むランダムな1方向を決定

    let moves = roaC.moves; // [[0, -1], [1, 0], [0, 1], [-1, 0]]

    // 67%の確率で直進、33%の確率で方向転換
    while(heyas.length < heya){
        if(hit(33)){
            // 転換：左右下の3方向（相対的に +1, +2, +3）からランダムに選ぶ
            let turn = arraySelect([1, 2, 3]);
            mkdir = (mkdir + turn) % 4;
        }

        // 次の位置を計算
        let dirMove = moves[mkdir];
        let nextX = mx + dirMove[0];
        let nextY = my + dirMove[1];

        // 枠内かつ未訪問のマス（id: 0）なら道（id: 1）にする
        if(0 <= nextX && nextX < row && 0 <= nextY && nextY < row){
            if(!map[nextY][nextX]?.id){
                let dist = map[my][mx].dist + 1;
                map[nextY][nextX] = { id: 1, x: nextX, y: nextY, dist };
                heyas.push({ x: nextX, y: nextY });
            }

            // 成功・失敗にかかわらずスネークの頭を移動（既訪問マスでも突き抜けて先へ進む）
            mx = nextX;
            my = nextY;
        }
        else{
            // 壁（外枠）にぶつかったら、既存の道の中からランダムに再スタート
            let respawn = arraySelect(heyas);
            mx = respawn.x;
            my = respawn.y;
            mkdir = random(0, 3);
        }
    }

    // 自販機の配置処理
    let zihan = random(1, 3);
    let zihaned = 0;
    while (zihaned < zihan) {
        let send = arraySelect(heyas);
        let dir = arraySelect(moves);
        x = send.x + dir[0];
        y = send.y + dir[1];

        if (0 <= x && x < row && 0 <= y && y < row && (map[y][x].id != 0 && map[y][x].id < 2)) {
            map[y][x].id = 3;
            zihaned += 1;
        }
    };

    roaC.map = map;
    roaC.heyas = heyas;

    roaF.mapResize();
};
roaF.mapUpdate = () => {
    let row = roaC.row;
    let map = roaC.map;
    let div0 = phoC.mapC.Ds["liver"];
    div0.innerHTML = "";
    for(let y = 0; y < row; y++){
        for(let x = 0; x < row; x++){
            let div = document.createElement('div');
            div.className = "cell";
            if(map[y][x]?.id){
                div.classList.add(`c${y}${x}`);
                div.classList.add("mas");
                div.classList.add(`m${map[y][x].id}`);
            }
            div0.appendChild(div);
        }
    }
}
roaF.mapPDraw = () => {
    let img = roaC.imgN;
    let dir = roaC.dir;

    let div0 = phoC.mapC.Ds["liver"];
    let img0 = div0.querySelector(".walker");
     if(img0) img0.remove();

    let cell = div0.querySelector(`.c${roaC.y}${roaC.x}`);
    if(cell){
        let img = document.createElement('img');
         img.src = roaC.imgN;
         img.className = `walker dir${dir}`
         cell.appendChild(img);
    }
}
 // #endregion 


roaF.happen = async(act) => {
    let bun = (oo) => oo.split(",");


    if(!hit(20)) return 0; //1/3の確率でイベント発生

    let arr0 = WalkEvents.filter(a => a.c == act);
    let arr = copy(arr0);
    console.log("うおおarr選別開始");
    arr = arr.filter(a => {
        // console.log(a)
         if(typeof a.p != "string") a.p = a.p.toString();

        let li = a.p.split("/");
         console.log(`li:: ${li.join(" / ")}`)
        let res = li.every(l => {
            console.log(l)
            if(!l) return console.error(li);
            if(l == 0) return 1;
            if(l.startsWith("所持")){
                let [, n, dir] = bun(l);
                if(dir == "より上" && n < roaC.have) return 1;
                if(dir == "より下" && roaC.have < n) return 1;
            }
            if(l.startsWith("状態")){
                let [, name] = bun(l);
                if(roaF.buffHas(name)) return 1;
            }

            return 0;
        });
        console.log(`　=> ${res}`);
        return res;
    });
    console.log(arr);
    
    let num = arrayGacha(
        [1, 2, 3],
        [79, 18, 3]//ブルアカと同じ
    );
    for(let i=0; i<num; i++){
        // for(let ev of arr){
        for(let i2=0; i2<arr.length; i2++){
            let ev = arr[i2];
            if(!hit(ev.h)){continue}; //だからEvents自身の順番が大事なんですね〜
            console.log(ev.jpnm);
           roaC.wait = 1;
            let res = await ev.func();
             if(res) return 1;
           roaC.wait = 0;

            arr.splice(i2, 1); //終わったら捨てる
        }
    }
}

// roaF.proceed = (ret = 0) => {
//     if(!roaC.ing) return 0;
    
//     let dir = roaC.dir;
//     let moves = roaC.moves; //[[0, 1], [1, 0], [0, -1], [-1, 0]]
//     if(!moves[dir]) return 1;
    
//     let ds = ["x", "y"];
//     for(let i=0; i<2; i++){
//         roaC[ds[i]] += moves[dir][i];
//          if(roaC[ds[i]] < 0) roaC[ds[i]] = 0;
//          if(roaC.row < roaC[ds[i]]) roaC[ds[i]] = roaC.row-1;
//         if(roaC.map[roaC.y][roaC.x].id == 0){
//             roaC[ds[i]] -= moves[dir][i];
//             // ここで、他に行ける道を上下左右で...「行ける道: 左 後」みたいのをlogText_log(text)で出力したい
//         }
//     }

//     roaF.mapPDraw();
// }
roaF.proceed = async(ret = 0) => {
    if(!roaC.ing) return 0;
    if(roaC.wait) return 0;

    let dir = roaC.dir;
    let moves = roaC.moves; //[[0, 1], [1, 0], [0, -1], [-1, 0]]

    let x = roaC.x + moves[dir][0];
    let y = roaC.y + moves[dir][1];

    if(0 <= x && x < roaC.row && 0 <= y && y < roaC.row && roaC.map[y][x].id){
        roaC.x = x;
        roaC.y = y;
    }
    else{
        let can = [];
        let names = ["前", "右", "後", "左"];

        for(let i = 0; i < 4; i++){
            let d = (dir + i) % 4;
            let nx = roaC.x + moves[d][0];
            let ny = roaC.y + moves[d][1];

            if(0 <= nx && nx < roaC.row && 0 <= ny && ny < roaC.row && roaC.map[ny][nx].id){
                can.push(names[i]);
            }
        }

        return logText_log(`行ける道: ${can.join(" ")}`);
    }

    roaF.mapPDraw();

    await roaF.happen("proceed");
}
roaC.Ds["bU"].addEventListener("click", roaF.proceed);
roaF.turnRL = async(code = "r") => {
    //codeが数字なら: 既定の方角へ
    //codeがrまたはl: dir += 1か -= 1

    if(!roaC.ing) return 0;
    if(roaC.wait) return 0;
    
    let dir = roaC.dir;
    if(typeof code == "number") dir = code;
    else{
        let d = 0;
        if(code == "r") d =  1;
        if(code == "l") d = -1;
        
        dir += d;
         if(dir < 0) dir = 3;
         if(3 < dir) dir = 0;
    }
    
    roaC.dir = dir;

    roaF.mapPDraw();
}
roaC.Ds["bR"].addEventListener("click", () => roaF.turnRL("r"));
roaC.Ds["bL"].addEventListener("click", () => roaF.turnRL("l"));

document.addEventListener("keydown", e => {
    let key = e.key.toLowerCase();
    if(key == " ") key = "space";

    let btn = null;
    if(key == "w" || key == "arrowup") btn = roaC.Ds["bU"];
    if(key == "d" || key == "arrowright") btn = roaC.Ds["bR"];
    if(key == "a" || key == "arrowleft") btn = roaC.Ds["bL"];

    if(btn) btn.classList.add("active");
});
document.addEventListener("keyup", e => {
    let key = e.key.toLowerCase();
    if(key == " ") key = "space";

    let btn = null;
    if(key == "w" || key == "arrowup") btn = roaC.Ds["bU"];
    if(key == "d" || key == "arrowright") btn = roaC.Ds["bR"];
    if(key == "a" || key == "arrowleft") btn = roaC.Ds["bL"];

    if(btn) {
        btn.classList.remove("active");
        btn.click();
    }
});


roaF.ochi53 = async(gomi, skip = 0, props = []) => {
    jump:{
        if(skip) break jump;
        
        roaF.log(`あ、${gomi.type}が落ちている！`);
    }
    
    phoF.tog(0);
    let tack = new TakushiSen(["拾う", "見捨てる"], "tate", {back:"#fcd8ff", backed:"#440a49"})
    let sen = await tack.select(mainD);
    console.log(sen);

    if(sen == "拾う") roaF.pickup(gomi, props);
    if(sen == "見捨てる") roaF.misute(gomi, props);
}
roaF.pickup = async(gomi, props) => {
    roaF.log(`${gomi.mayshow}の${gomi.type}を拾った`);
    roaC.has.push(gomi);
    roaF.tekiou();
}
roaF.misute = async(gomi, props) => {
    
}

roaF.buffAdd = async(name, lv = 1, time = 1) => {
    if(!name) return console.error(`[buff] ${name}`);

    // 重複は許可しよう！！

    let data = findRoaBuff(name);
    let buff = {
        name, 
        jpnm: data.jpnm,
        type: data.type ?? "foot",
        time,
        lv,
        data
    }

    roaC.buffs.push(buff);

    return buff;
}
roaF.buffDec = async(name, time = 1) => {
    if(!name) return console.error(`[buff] ${name}`);
    
    let buff = roaF.buffHas(name);
    buff.time -= time; //これ反映されてんのか？

    if(buff.time <= 0) roaC.buffs = roaC.buffs.filter(b => b != buff); //just

    return buff.time;
}
roaF.buffCle = async(name) => {
    if(!name) return console.error(`[buff] ${name}`);
    
    if(name == "all") roaC.buffs = [];
    else roaC.buffs = roaC.buffs.filter(a => a.name != name && a.jpnm != name);

    return 0;
}
roaF.buffHas = (name, lv = 0) => {
    if(!name) return console.error(`[buff] ${name}`);
    
    let buffs = roaC.buffs.filter(a => a.name == name || a.jpnm == name);
    let buff;
    if(lv) buff = buffs.find(a => a.lv == lv);
     else buff = buffs[0];

    return buff;
}


// #endregion

// #region door
let dooD = document.getElementById("door");
let dooC = {
    areus: [
        {
            name:"loby",
            jpnm:"ろびん",
            D:dooD.querySelector(".area.loby")
        },
        {
            name:"cryo",
            jpnm:"CryoLion",
            D:dooD.querySelector(".area.cryo"),
        },
        {
            name:"cave",
            jpnm:"ケバっ", //ここもどうにかしようかぁ
            D: dooD.querySelector(".area.cave")
        },
        {
            name:"jump",
            jpnm:"JumpUpStars", //怒られろ
            D: dooD.querySelector(".area.jump")
        },
        {
            name:"forage",
            jpnm:"Foraganer!",
            D: dooD.querySelector(".area.forage")
        }
    ],
};
let dooF = {};

dooF.came = () => {
    dooF.move("loby");
}
dooF.load = () => {
    for(let are of dooC.areus){
        let name = are.name;
         if(name == "loby") continue;
        
        let img = images.systems[name]?.cloneNode();
        let txt = El("div", "text");
         txt.textContent = name;
        let div = El("div", `paint ${name}`, [img, txt]);

        div.addEventListener("click", () => {
            dooF.move(name);
            // become系作るならばここ
        })
        dooC.lobC.paintsD.appendChild(div);
    }

    dooF.move("loby");
}
dooF.move = (to) => {
    if(dooC.now == to) return console.log('どういうわけか もう そこにいる');
	if(!to) return console.error(`せんぱ〜い？${to}ってどこですか〜？笑`);
	
    let arr = dooC.areus;
	 for(let a of arr) a.D.classList.remove('show');
    let ToDo = arr.find(a => a.name == to || a.jpnm == to);
     ToDo.D.classList.add('show');
    dooC.now = to;
}

// #region loby
// dooC.lobD = dooC.shoulD["loby"];
dooC.lobD = dooC.areus.find(a => a.name == "loby").D;
dooC.lobC = {
    paintsD: dooC.lobD.querySelector(".paints")
}
dooC.lobF = {};
// #endregion


// #region cryo
dooC.nerD = dooC.areus.find(a => a.name == "cryo").D;
dooC.nerC = {
    now: 0,
    waiting: 0,

    bet:0,

    dealer:{},
    player:{}
}
dooC.nerF = {};

/*
・ダブルアップ基調な、ダンジョン型デッキ構築ゲーム。
ミニゲームです。ゲーム内のポイ活アプリの中のゲーム。何それ
えー、、なので、できればサクサクな感じがいい。

#かんたん説明
5x5のマップをスネーク型マップ生成
部屋数は10で、最終到達点にボス部屋
ある部屋
ー雑魚敵 能力なし
ーイベント いろいろ。{あばりす}のイベント集から選抜
　　　　　　ここに「突然の脱出口」も追加すること。デメ無しとデメ有り、どっちもあっていいかも
ー休憩所(not変な意味)(世界観決まり次第名称変更) 体力50%回復・カード1枚焼却（たまに2枚）・（カード強化？あーー、、あれでいいかも*1）
ー店（世界観決まり次第名称変更）（そもそも存在未定）戦闘勝利時などに手に入る、ダンジョン内限定の通貨「{名称未定}」で売買が可能。これはイベントに用いられることもある。 カードに強化を付与することが可能。レリック買わせてもいいけど、、初期実装では無しで

#戦闘
差数は無視
 BJ出したら無条件で↓の2倍与える
 判定勝ちしたら攻撃力分のダメージを与える//初期は1
 ドローなら0ダメ与える
 バーストは相手の攻撃力分のダメ受ける
初期は2枚。
 それが21だったなら、相手は体力に関わらず即死する（ボス・イベント強敵なら普通の処理と同じく、2倍ダメ）
相手は現実のディーラーの動きをする
 初期は1枚表・1枚裏
 while17以上まで引く

#デッキ
初期は普通の52枚。ジョーカーは無し
戦闘終了後やイベントなどでカードを手に入れることが可能。カード枚数上限はない。
**強化**
これが核かも。カードは普通のなんだけど、追加効果を付与することができる。すでに付与されていることもある。
これの効果はまだ未定。


以下考察中
「ヒットでこれを引いたとき、直接相手に1ダメージ」とか？いや、、相手の体力基本1とか2,3だし死だろ...「これを引いたとき10%の確率で相手に」ならどうだ、、？
名称を変えようか。シャドバ式に〈ヒット〉（引いたとき）〈スタンド〉（これを出してある状態で、スタンドしたとき）
「〈ヒット〉20%の確率で2通貨を手に入れる」←この感じ、効果にはレア度を付与するべきかも


...これだとスレスパくらいの密度になりそうではないか？
もっと、こう、、気軽にやってもらいたい
ミニゲームだし。いや、だからこそかもしんないけど、、短めに
となると..カードは適当で、「武器」と「盾」にする？それらに特殊効果を付与みたいな。で、初期武器は木刀だけど、、イベントで武器拾うとか？そしたら前のやつは消えるけど、、継承機能？いやぁ、、、だるいかな その場合「持ち物」システムが必要だよね
んむ、、、わがんね あーーでもあれじゃん、レリックでどうせ必要じゃん ほんだらばいいかもしんねぇな
あとは頼むわ（マルナゲット）
*/

dooC.nerF.bet = (num) => {
    if(!num) return 0;
    if(typeof num == "string" && num.endsWith("%")){
        let vai = +num.slice(-1, 0);
        num = Math.floor(rimi*(vai/100));
    }

    if(rimi < num) return nicoText("だめ");
    dooC.nerC.bet = num;
}
dooC.nerF.start = () => {
    rimiF.dec(dooC.nerC.bet);
}
// #endregion


// #region cave
dooC.cavD = dooC.areus.find(a => a.name == "cave").D;
dooC.cavC = {
    btDs:{
        start: dooC.cavD.querySelector(".bts .bt.start"),
    },
    racersD: dooC.cavD.querySelector(".racers"),
    
    ing:0,
    waiting:0,

    time:0,
    timer:null,

    aflike: 2000, //後隙(あとすき):規定値2000ms
    num: 4,
    longleg: 15,
    racers:[],
}
dooC.cavF = {};

dooC.cavF.tekiou = () => {
    // timer
    if(dooC.cavC.timer) dooC.cavC.time = dooC.cavC.timer.time;

    for(let racer of dooC.cavC.racers){
        let div = racer.div;
        let at0 = div.querySelector(".at");
         if(at0) at0.remove();

        let pos = racer.pos;
        let at = document.createElement("img");
        at.className = "at";
        at.src = `assets/images/racers/${racer.name}.png`;
        div.querySelector(`.road${pos}`).appendChild(at);
        racer.atD = at;
    }
}



dooC.cavF.start = () => {
	jump:{
	    if(dooC.cavC.ing) break jump;
	    dooC.cavC.ing = 1;
		
	    console.log("[racer] 事前準備タイム")
	    dooC.cavC.racersD.innerHTML = "";
	    dooC.cavC.racers = [];
	
	    let num = dooC.cavC.num;
	    for(let i=0; i<num; i++){
	        let racer = dooC.cavF.racerMake(i);
	    }
	
	    dooC.cavF.tekiou();
	
	    dooC.cavC.timer = new Timer(0, 1);
	}

	//re:start
    for(let racer of dooC.cavC.racers){
        console.log(`[racer] ${racer.name}の行動ループを開始します`);

        (async () => {
            await delay(3000);

            while (dooC.cavC.ing){
                if(dooC.cavC.waiting){
                    await delay(10, racer);
                    continue;
                }

                // おわり？
                if(racer.pos == dooC.cavC.longleg-1 && dooC.cavF.goal(racer)) return 1;

                let wait = await dooC.cavF.act(racer) ?? dooC.cavC.aflike;
                await delay(wait, racer);
            }
        })();
    }

    dooC.cavC.timer.start();
}
dooC.cavF.restart = () => {
    if(!dooC.cavC.ing) return 0;
    dooC.cavC.waiting = 0;
    dooC.cavC.timer.start();
}
dooC.cavF.stop = () => {
    if(!dooC.cavC.ing) return 0;
    dooC.cavC.waiting = 1;
    dooC.cavC.timer.stop();

    for(let racer of dooC.cavC.racers){
        clearTimeout(racer.loop);
        racer.loop = null;
    }
}
dooC.cavC.btDs["start"].addEventListener("click", () => {
    if(!dooC.cavC.ing) dooC.cavF.start();
    else{
        if(!dooC.cavC.stop) dooC.cavF.stop();
        else dooC.cavF.restart();
    }
});

dooC.cavF.passi = (who, wuzzat = []) => {
    if(!who || !wuzzat) return;
    
    // wuzzat:: [act_pre] [buff_rem, stan] [buff_add, are, name, time]
    if((who.data.P??0) == wuzzat[0] && typeof who.data.PF == "function"){
        let res = who.data.PF(who, ...wuzzat.slice(1));
        if(res) return res;
    }
}


dooC.cavF.racerMake = (id, name = 0) => {
    if(!name) name = arraySelect(Racers.filter(a => !a.no)).name;
    let data = findRacer(name);

    let racer = {
        id,
        name,
        pos: 0,
        spd: data.spd,
        aga: data.aga,
        buffs: [],
        data
    }
    
    // div
    let div = El("div", `racer racer${id} ${name}`);
    let road = El("div", "road");
    for(let i=0; i<dooC.cavC.longleg; i++){
        let mich = road.cloneNode(true);
        mich.classList.add(`road${i}`);
         div.appendChild(mich);
    }
    dooC.cavC.racersD.appendChild(div);
    racer.div = div;

    dooC.cavC.racers.push(racer);

    return racer;
}

let has = (arr, name) => {
    if(arr.includes(name)) return name;
    let mono = arr.find(a => a.startsWith(name));
     if(mono) return mono;
    return "";
}
dooC.cavF.ri = (code, who) => {
    let arr = copy(dooC.cavC.racers.filter(a => !a.goaled))

    let res = 0;
    if(code == "me") res = who;
    if(code == "over") res = arr.filter(a => a.id != who.id);
    if(code == "all") res = arr;

    
    arr = arr.sort((a, b) => b.pos - a.pos);
    if(code == "fir") res = arr[0];
    if(code == "las") res = arr[arr.length-1];

    return res;
}
dooC.cavF.act = async(who) => {
    let data = findRacer(who.name);
    let actor = {...who};
    let aflike = dooC.cavC.aflike;

    let act = arraySelect(data.acts);
    let actL = act.split(",");

    // becauseof: act_pre
    for(let buff of who.buffs){
        // console.log(`[buff] ${who.name}の${buff.name}を確認します`);
        let data = findBuff(buff.name);
        if(data.becauseof == "act_pre") dooC.cavF.buffDec(who, buff.name, 1);
        let efs = data.efs ?? [];

        let 行動 = has(efs, "行動"); 
        if(行動){
            let li = 行動.split(",");
            if(行動 == "行動不可") return 10;
            if(行動.startsWith("行動阻害")){ //行動阻害,確率
                if(hit(+li[1])){
                    nicoText("[act] 麻痺った！")
                    return 1000;
                }
            }
        };

        let 後隙 = has(efs, "後隙");
        if(後隙){
            let li = 後隙.split(",");
            if(li[0].startsWith("後隙カット") || li[0].startsWith("後隙ヴァイ")){ //後隙〜〜〜,割合
                if(+li[2] && !hit(+li[2])) continue;
                
                let ryou = aflike*(+li[1]/100);
                if(li[0].startsWith("後隙カット")) aflike -= ryou;
                if(li[0].startsWith("後隙ヴァイ")) aflike += ryou;
            }
        }
    }
    
    let res = await dooC.cavF.passi(who, ["act_pre", ...actL.filter(a => !a.startsWith("%"))]);
     if(res) act = res, actL = res.split(",");
    

    if(actL[0].startsWith("%")){
        aflike = +actL[0].slice(1);
        actL.splice(0,1);
    }
    aflike =  Math.max(aflike - who.spd*10, 0); //敏捷による後隙減少
    

    // -# 複数いる場合はidが若い人を選択
    // me 自分自身 | over 自分以外の全員 | all 自分含む全員
    // fir 先頭の人 | las 最後尾の人
    let celeste = ["me", "over", "all", "fir", "las"]
    let li = actL.map((a) => {
        if(celeste.includes(a)) return dooC.cavF.ri(a, who);
        else return a;
    })

    // new super nintendo switchΩ
    let pref = li[0];
     tobiText(who.atD, pref)
    if(dooC.cavF.ri("fir").id == who.id){
        // console.log(li);
        console.log(`[act]{${who.id}} ${who.name}の行動: ${pref}[${li.slice(1).join(", ")}] | 後隙: ${aflike}ms`);
    }
    switch(pref){
        case "無":
        case "集中":
        case "転倒":
        case "大破":
        case "事故":{
            let [, atai] = li;
            if(pref == "集中") who.ep += +atai;
            if(pref == "事故") dooC.cavF.move(atai, -1);
            
            break;
        }

        case "移動":
        case "前進":
        case "転移":{
            let [, num] = li;
            // if(pref == "前進") console.warn("ごめんパズルやるね");
            let res = dooC.cavF.move(who, +num);
            //  if(res == 0) return "oh";
            break;
        }
        
        //buff
        case "効果":{
            let [, are, name, time] = li;
            // console.log(are)
            dooC.cavF.buffAdd(who, are, name, time);
            break;
        }
        case "効果解除":{
            let [, name] = li;
            dooC.cavF.buffRem(who, name);
            break;
        }
    }
    
    return aflike;
}

dooC.cavF.move = async(who, hos, props=[]) => {
    if(!who || !hos) return console.log(who, hos, props);

    let dir = 1;
     if(hos < 0) dir = -1;
    let num = Math.abs(hos);
    for(let i=0; i<num; i++){
        await dooC.cavF.moveGo(who, dir);
        await delay(200, who);
    }

    return dooC.cavC.aflike;
}
dooC.cavF.moveGo = async(who, dir, props=[]) => {
    let pos = who.pos + dir;
    if(pos < 0) pos = 0;
    if(dooC.cavC.longleg <= pos) pos = dooC.cavC.longleg-1;
    who.pos = pos;

    dooC.cavF.tekiou();
}


dooC.cavF.buffAdd = (who, are, name, time) => {
    console.log(who.name, are.name, name, time);
    console.log(are);
    let data = findBuff(name);
     name = data.name; //nameがjpnmで与えられている可能性有り

    let 効果F = (data, mono) => {
        let li = mono.split(",");
        if(li[0] == "効果無効" && (li[1] == name || li[1] == data.jpnm)){
            console.error("うおお効果無効！無効無効！！", are.name, name)
            return dooC.cavC.aflike;
        }
        
    }

    // あるかも？無効かも？？
    for(let buff of are.buffs){
        let data2 = findBuff(buff.name);
        if(buff.name == name) return dooC.cavC.aflike;
        let 効果 = has(data2.efs ?? [], "効果");
        if(効果) return 効果F(data, 効果);
    }
    for(let sei of are.data.sei ?? []){
        if(sei.startsWith("効果")) return 効果F(data, sei)
    }
    

    let buff = {
        name,
        type: data.type, //timeかstack
        time,
    }
    are.buffs.push(buff);
    if(name == "stan") kirameki(are.atD)

    return dooC.cavC.aflike;
}
dooC.cavF.buffRem = (who, name) => {
    let buff = who.buffs.filter(a => a.name == name);
     if(buff.length == 0) return 0;
    for(let b of buff) who.buffs.splice(who.buffs.indexOf(b), 1);

    let res = dooC.cavF.passi(who, ["buff_rem", name]);
     if(res) return res;

    return dooC.cavC.aflike;
}
dooC.cavF.buffDec = (who, name, time = 0) => {
    let buff = who.buffs.find(a => a.name == name);
     if(!buff) return 0;
    let data = findBuff(name);
    if(buff.type == "time") buff.time -= time ?? 1000;
    if(buff.type == "stack") buff.time -= data.heru ?? 1;
     if(buff.time <= 0) dooC.cavF.buffRem(who, name);

    return dooC.cavC.aflike;
}
dooC.cavF.buffDecZen = (who, time = 0) => {
    for(let buff of who.buffs) dooC.cavF.buffDec(who, buff.name, time);

    return dooC.cavC.aflike;
}

dooC.cavF.goal = (who) => {
    if(who.pos < dooC.cavC.longleg-1) return 0;
    
    // buffとかスキルでなんか阻害あったらここで判定

    who.goaled = 1;
    let len = dooC.cavC.racers.filter(a => a.goaled).length;
    console.error(`[racer] ${who.name}がゴールしました！(${len}位 /${dooC.cavC.num}人) タイム: ${dooC.cavC.timer.time}s`);

    // num-1人終わった？
    if(len >= dooC.cavC.num-1) dooC.cavF.end();

    return 1;
}
dooC.cavF.end = () => {
    dooC.cavC.waiing = 0;
    dooC.cavC.ing = 0;

    console.error("[racer] --- レース終了 ---");
    dooC.cavF.stop();
    dooC.cavC.timer.stop();

}

// #endregion 

// #region jump
/*
Jump up The STARS!!
6こDiceが振られるので、3個以上出目が揃ったら"継続"。
出目の合計xDice数の合計が獲得コイン

↑これが元のゲームなんだけど、、、、
これを「ギャンブルゲーム」にするにはどうしたらいいかな...
一旦素を作ります
*/

dooC.jumD = dooC.areus.find(a => a.name == "jump").D
dooC.jumC = {
    Ds:{
        gakuL: dooC.jumD.querySelector(".gaku .label"), //言うとしたら僕〜〜
        gakuN: dooC.jumD.querySelector(".gaku .num"),

        out: dooC.jumD.querySelector(".output"),

        vai: dooC.jumD.querySelector(".vai"), //押すたびに増えていく(あるならば)
        start: dooC.jumD.querySelector(".start"),
    },
    ing: 0,
    waitng: 0,

    kitie: 0, //期待値よりも高い価格。
    vai: 1, //倍率。1/10/100...
    x: 6, //規定
    ed: 0,

    lens:[],
}
dooC.jumF = {};

dooC.jumF.update = () => {
    dooC.jumC.kitie = fibo(dooC.jumC.ed+1)*10; //fibo(n): フィボナッチ数列のn番目を返す

    let vaiD = dooC.jumC.Ds["vai"];
    // vaiD.textContent = `${dooC.jumC.kitie} × ${dooC.jumC.vai}`;
    vaiD.textContent = `費用: Ɍ${dooC.jumC.kitie}`;
}

//序盤に金持ち込んで、Ɍ10*1000を元手にするみたいなことしたらぶち壊れたので...一旦ボツ
// dooC.jumF.vai = () => {
//     let kitie = dooC.jumC.kitie;
//     let vai = dooC.jumC.vai;
//     let hiyo = kitie*(vai*10);
    
//     if(rimi < hiyo) vai = 1;
//     else vai = vai*10;

//     dooC.jumC.vai = vai;

//     dooC.jumF.update();
// }
// dooC.jumC.Ds["vai"].addEventListener("click", dooC.jumF.vai);

dooC.jumF.tekiou = () => {
    let sum = 0;
    let cos = 0;

    for(let len of dooC.jumC.lens){
        let div0 = len.div;
         div0.innerHTML = "";
        let list = len.list;
        for(let li of list){
            let div = El("div", "dice");
            div.textContent = li.num;
            div0.appendChild(div);

            if(li.oo){
                div.classList.add("kira");
                if(!div0.classList.contains("oo")){
                    kirameki(div0);
                    div0.classList.add("oo");
                }
            }
            
            sum += li.num;
            cos += 1;
        }   
    }

    let gaku = sum*cos;

    if(dooC.jumC.gaku != gaku){
        dooC.jumC.Ds["gakuN"].textContent = gaku;
        dooC.jumC.gaku = gaku;
    }
}

dooC.jumF.reset = () => {
    dooC.jumC.waiting = 0;
    dooC.jumC.kawakita = 0;
    dooC.jumC.Ds["gakuN"].innerHTML = "";
    dooC.jumC.Ds["out"].innerHTML = "";

    let text = "合計";
    if(hit(20)){
        text = "ガク";
        dooC.jumC.kawakita = 1;
    }
    dooC.jumC.Ds["gakuL"].textContent = text;
    
    dooC.jumC.lens = [];
}

// dooC.jumF.roll = () => {
//     let ran = random(1, 6);
//     return ran
// }
dooC.jumF.start = async() => {
    if(dooC.jumC.ing) return 1;

    let bet = dooC.jumC["kitie"];
     if(rimi < bet) return nicoText("足りねぇっす"); // ないとおもうが
    
    dooC.jumC.ing = 1;
    dooC.jumF.reset();

    rimiF.dec(bet);

    let kai = dooC.jumC.x;
    let rollin = async(now = 0) => {
        // 6回回転、ソート、判定
        dooC.jumC.lens[now] = {};
        let len = dooC.jumC.lens[now];
        len.list = [];
        
        let div = El("div", `len l${now}`);
        len.div = div;
         dooC.jumC.Ds["out"].appendChild(div);
         
        let list = len.list;
        for(let i=0; i<kai; i++){
            let girl = random(1, 6); //ローリンガール
            let mono = {
                num: girl,
                oo: 0, // おお（感嘆）
            }
            list.push(mono);
             dooC.jumF.tekiou();
            await delay(200);
        }
        await delay(800);
        // console.log(list)

        list.sort((a,b) => a.num - b.num);
         dooC.jumF.tekiou();
        await delay(800);

        let counts = {};
        for(let mono of list) counts[mono.num] = (counts[mono.num]??0) + 1;
        for(let mono of list){
            if(counts[mono.num] >= 3) mono.oo = 1;
        }
         dooC.jumF.tekiou();

        let keizoku = async() => {
            console.log(`[${now}] 継続！`);
            tobiText(rimiD, "継続");
            await delay(500);
            await rollin(now+1);
        }

        let leng = list.filter(a => a.oo).length;
        if(leng){
            if(leng == 6){
                // 異常
                if(list.every(a => a.num == list[0].num)) for(let li of list) li.num *= 4;
                else for(let li of list) li.num *= 2;
            }
            // ooが1つ以上あるなら
            keizoku();
        }
        else{
            if(dooC.jumC.kawakita){
                if(hit(15)){
                    console.log("川北発動！！！")
                    await logText("はじめましての時以外も");
                    await logText("お願いしなくてはならない");
                    await logText("ならない");
                    keizoku();
                }
                else dooC.jumF.end(now+1);
            }
            else dooC.jumF.end(now+1);
        }
    }

    await rollin();

    return 0;
}
dooC.jumC.Ds["start"].addEventListener("click", dooC.jumF.start);

dooC.jumF.end = async(ed) => {
    console.log(`[jump] JumpUp終了！継続回数は ${ed} でした！`);
    
    let gaku = dooC.jumC.gaku;
    console.log(`　=> Ɍ${gaku}`);
    rimiF.inc(gaku);
    
    dooC.jumC.ed += 1;
     dooC.jumF.update();
    dooC.jumC.ing = 0;
}

/*
あとがき。
だめだねこれ 一旦 廃棄 シマス。
やるなればas a ポイ活 かなぁ、、、
ギャンブルにしてはリスクが低すぎる。序盤の。
フィボの定めとは言え流石にバランス調整下手すぎね
*/

// #endregion jump

// #region forage

/*

先に概要。
「森でキノコを採ろう!!」
*[水上都市]「（名称未定）」の裏の薄暗い店の一角にあるマシン。安っぽいロゴ*
キノコが10個あるので、そこからキノコを採ろうというゲーム。1つ取るたびに倍率が上がる
しかし、触れるだけで毒を出すキノコもある。それに触れたらゲームオーバー、倍率が0になる
（"ハズレキノコ"はそれとしてあるわけではない。最大獲得個数というものが定められていて、それが確率。ゆえに触れるたびに判定ではない）

*/

dooC.forD = dooC.areus.find(a => a.name == "forage").D;
dooC.forC = {
    gamenD: dooC.forD.querySelector('.gamen'),
    starteD: dooC.forD.querySelector('.gamen .dimee.started'),
    honD: dooC.forD.querySelector('.gamen .dimee.hondie'),
    mushsD: dooC.forD.querySelector('.gamen .dimee.hondie .mushes'),
    daiD: dooC.forD.querySelector('.gamen .dai'),
    irelD: dooC.forD.querySelector('.gamen .dai .irel'),
	 autoD: dooC.forD.querySelector(".gamen .dai .irel .auto"),
    otsuD: dooC.forD.querySelector('.gamen .dai .otsu'),
    dispD: dooC.forD.querySelector('.gamen .dai .disp'),
    btD: dooC.forD.querySelector('.gamen .dai .bottan'),
    getoutD: dooC.forD.querySelector('.gamen .dai .getout'),
    getoutID: dooC.forD.querySelector('.gamen .dai .getout img'),

	autoIrelF: null,
    autoRate: 1000,
    bet: 0,
    getout: 0,
    gamens: ["started", "hondie"],

    ing: 0,
    wait: 0,
    timer: null,
    
    rate: 1.0,
    cantake: 0,
    took: 0,

    // returnD: dooC.forD.querySelector('.return')
}
dooC.forF = {};

// dooC.forC.returnD.addEventListener('click', () => {
//     if(dooC.forC.ing || dooC.forC.wait) return 1;
//     dooF.move("loby");
// });

dooC.forF.update = () => {
    let bet = dooC.forC.bet;
    let disp = String(bet).padStart(9, "0");

    let dispD = dooC.forC.dispD;
    dispD.innerHTML = disp.split('').map(a => `<div>${a}</div>`).join('');
}

dooC.forF.gamenCH = (name) => {
    for(let ch of dooC.forC.gamens){
        if(ch == name) dooC.forC.gamenD.classList.add(ch);
        else dooC.forC.gamenD.classList.remove(ch);
    }
}
dooF.forage = () => {
    // enter
    dooC.forF.update();
}

dooC.forF.irel = () => {
    // ここでエフェクトを
    if(rimi < 100) return tobiText(dooC.forC.irelD, "金欠乙");

    dooC.forC.bet += 100;
    rimiF.dec(100);
    dooC.forF.update();
}
dooC.forC.irelD.addEventListener('click', dooC.forF.irel);
dooC.forF.irelAuto = () => {
	if(!dooC.forC.autoIrelF){
		dooC.forC.irelD.classList.add("activate");
		dooC.forC.autoIrelF = setInterval(() => {
			dooC.forF.irel();
		}, dooC.forC.autoRate)
	}
	else{
		dooC.forC.irelD.classList.remove("activate");
		clearInterval(dooC.forC.autoIrelF);
		dooC.forC.autoIrelF = null;
	}
}
dooC.forC.autoD.addEventListener("click", dooC.forF.irelAuto);

dooC.forC.otsuD.addEventListener('click', () => {
    let ryou = dooC.forC.bet;
    dooC.forC.bet = 0;
    dooC.forF.update();

    dooC.forF.getout_set(ryou);
})

dooC.forF.bt = () => {
    if(!(dooC.forC.ing || dooC.forC.wait)) dooC.forF.start();
    else dooC.forF.dropout();
    
}
dooC.forC.btD.addEventListener('click', dooC.forF.bt);

dooC.forF.start = async() => {
    if(dooC.forC.ing || dooC.forC.wait) return 1;

    dooC.forC.rate = 1.0;
    dooC.forC.took = 0;
    dooC.forC.timer = new Timer(0, 1, 1);

    let bet = dooC.forC.bet;
    if(bet <= 0) return nicoText("コインを入れてねっ♡")
    
    dooC.forC.ing = 1;
    dooC.forF.mushSet(10);
    dooC.forF.gamenCH('hondie');
    
    dooC.forC.wait = 1;
    await dooC.forF.mushPlace();
    dooC.forC.wait = 0;

    dooC.forC.timer.start();
    return 0;
}


dooC.forF.mushSet = (num = 10) => {
    let cantake = 0;
    let cack = 0.95; //←1個目だけ優しさを
    while(cantake < 10 && Math.random() < cack){
        cantake += 1;
        cack = 0.75;
    }
    // 単純に「0.75**${個数}」で確率
    /*
    現時点:2026/7/21
    0,1,2,3,4,5,6,7,8,9,10
    5.00,23.75,17.81,13.36,10.02,7.51,5.64,4.23,3.17,2.38,7.13
    */
    

    dooC.forC.cantake = cantake;
    
    console.log(`[mushSet] 今回のアカキノコは${cantake}個です`);
    if(cantake == 10) console.warn(`[mushSet] ん、10個？5.63%？？？`), console.warn(`[mushSet] いやまあ...ブルアカの☆3の確率3%よりは良い方か`);

    return 0;
}
dooC.forF.mushPlace = () => {
    let div0 = dooC.forC.mushsD;
    div0.innerHTML = "";

    let placed = [];
    for(let i=0; i<10; i++){
        let div = document.createElement('div');
        div.className = 'mush';
         let img = images.forages["mush"].cloneNode();
         div.appendChild(img);

        
        let bigger = 4;
        let width = (bigger/64)*100;
        div.style.width = `${width}%`;

        let gridX, gridY, ticca;
        let tried = 0;
        do{
            gridX = Math.floor(Math.random() * 50) + 1;
            gridY = Math.floor(Math.random() * 33) + 1;
            
            ticca = placed.some(pos => {
                return Math.abs(pos.x - gridX) < bigger && Math.abs(pos.y - gridY) < bigger;
            });
            tried++;
        } while(ticca && tried<23);

        placed.push({ x: gridX, y: gridY });

        let totalX = 6+gridX;
        let totalY = 6+gridY;

        let left = (totalX / 64) * 100;
        let top = (totalY / 48) * 100;

        div.style.left = `${left}%`;
        div.style.top = `${top}%`;

        div.dataset.index = i;

        div.addEventListener("click", () => {
            dooC.forF.mushGet();
            div.remove();
        });

        let acessment = "assets/images/forages/"
        div.addEventListener("pointerenter", () => img.src = `${acessment}mush_high.png`);
        div.addEventListener("pointerleave", () => img.src = `${acessment}mush.png`);

        div0.appendChild(div);
    }

    console.log(`[mushPlace] 配置完了。ご自由に、どうぞ？`)

    return 0;
}
dooC.forF.mushGet = () => {
    if(dooC.forC.wait) return;

    dooC.forC.took += 1;
    let tim = dooC.forC.timer.time;

    let took = dooC.forC.took;
    let cantake = dooC.forC.cantake;
    console.log(`[mushGet] ${took}/${cantake} (思考時間:${tim/100}s)`);

    if(cantake < took) return dooC.forF.sprayed();

    let up = random(5, 15)*0.1;
    let moto = dooC.forC.rate;
    dooC.forC.rate = Math.ceil((moto + up) *10) /10;


    console.log(`[mushGet] rate上昇↑↑ ${moto} => ${dooC.forC.rate}`);
    let alD = new alertD(`rate上昇↑↑ ${moto} => ${dooC.forC.rate}`);
    alD.appear();
    // ↑一旦の策

    dooC.forC.timer.reset();
}



dooC.forF.sprayed = () => {
    console.log(`[sprayed] 毒、噴射: ${dooC.forC.rate} => 0.0`);
    dooC.forC.rate = 0.0;
    kirameki(dooC.forC.btD);
    dooC.forF.dropout(1);
}
dooC.forF.dropout = (code = 0) => {
    if(!dooC.forC.ing) return 1;

    let rate = dooC.forC.rate;
    let bet = dooC.forC.bet;
    if(code == 0) console.log(`[dropout] 降りました！rateは${rate}, betは${bet}`);

    let get = Math.ceil(bet*rate);
    if(0 < get) dooC.forF.getout_set(get);

    dooC.forF.end();
}
dooC.forF.end = () => {
    dooC.forF.gamenCH("started");
    dooC.forC.ing = 0;
    dooC.forC.bet = 0;
    dooC.forC.timer.share();
     dooC.forC.timer = null;
    dooC.forF.update();
}

dooC.forF.getout_set = (ryou) => {
    // imgをgetout.png→getout_coin.pngにする。そしてdivが押されたら...imgをgetout.ongに戻し、rimiF.inc(ryou)をする

    let img = dooC.forC.getoutID;

    img.src = "assets/images/forages/getout_coin.png";
    dooC.forC.getout += ryou;
}
dooC.forF.getout_get = () => {
    let getout = dooC.forC.getout;
    if(typeof getout == "number" && getout <= 0) return;

    rimiF.inc(getout);
    console.log(`[getout] Ɍ${getout}を受け取りました`)

    let img = dooC.forC.getoutID;
    img.src = "assets/images/forages/getout.png";
    
    dooC.forC.getout = 0;
}
dooC.forC.getoutD.addEventListener('click', dooC.forF.getout_get);


// #endregion


// #endregion door



//#region start
function start(){
    Style.tekiou();
    OBS.load();

    mainF.load();
    phoF.load();
    homF.load();
    dooF.load();
    dooC.forF.update();

    rimiF.inc(255);

    let hash = location.search.replace("?", "");
    let space = Spaces.find(a => a.name == hash);
    if(!space) space = Spaces.find(a => a.sho);
    mainF.move(space.name);
}
//#endregion

//#region DOM
let LoadOfWait = async() => await loaF.load();
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", init);
}
else init();

async function init(){
    await LoadOfWait();
}
//#endregion

