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
            // homF.came();
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

let playername = 'player';

// #region home
let homD = document.getElementById("home");
let homC = {
    Ds:{
        // 全般も載せちゃおう
        time: document.getElementById("time"),

        go: homD.querySelector(".bt.go"),
        shop: homD.querySelector(".bt.shop"),
    },

    time: [6, 0], //[時, 分]
     canka: 1,
    pt: 0,
}
let homF = {};

homF.load = () => {
    
    window.setInterval(homF.time, homC.canka*1000)
}

homF.time = () => {
    homC.time[1] += 1;

    if(60 < homC.time[1]){
        // うおお時の変動
        homC.time[1] = 0;
        homC.time[0] += 1;

        if(27 < homC.time[0]){
            // うおお日付変更
            homC.time[0] = 4; //👈アークナイツの更新時間
        }
    }

    let [hou, min] = homC.time;
    let format = (n) => String(n).padStart(2, "0");

    homC.Ds["time"].innerHTML = `${format(hou)}:${format(min)}`;
}

homF.goF = async() => {
    console.log("あぁgoならあちらですね～");
    roaF.start();
}
homC.Ds["go"].addEventListener("click", homF.goF)
 
// #endregion

// #region road
let roaD = document.getElementById("road");
let roaC = {
    Ds:{
        liver: roaD.querySelector(".liver"),

        bU: roaD.querySelector(".bts .bt.u"),
        bL: roaD.querySelector(".bts .bt.l"),
        bR: roaD.querySelector(".bts .bt.r"),
    },
    ing: 0,

    moves:[[0, -1], [1, 0], [0, 1], [-1, 0]],
    row: 6,
    heyaAll: 15,
    mas: 0,
    imgN: 0,

    // 以下reset要素
    x: 0, 
    y: 0, 
    have: 0, //缶を持ってる量
    trus: 0, //缶を捨てた量
    dir: 0, //向き。上右下左-0123
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
    if(hit(16)) roaC.imgN = "assets/images/systems/star_walk.png";
    
    tekiou();
    roaF.mapMake();
    
    mainF.move("road");
    roaF.mapUpdate();
    logText_log('Lets Go!');


    roaF.mapPDraw(); //仮
}

roaF.mapResize = () => {
    let div0 = roaC.Ds["liver"];
    let div = div0.querySelector(".cell");
    if(!div) return 0;

    roaC.mas = div.getBoundingClientRect().width;
}
roaF.mapMake = () => {
    let row = roaC.row;
    let heya = roaC.heyaAll; 

    let map = []
    for(let i=0; i<row; i++){
        map[i] = [0];
        for(let i2=0; i2<row; i2++){
            map[i][i2] = {id:0};
        }
    }

    /*
    #idについて
     0 虚空
     1 道～～～～
     2 開始地点 (1, 2は同じものという扱い)
     3 自販機のある（かもしれない）
    */

    // 開始地点選定
    let x = random(1, row) -1;
    let y = random(1, row) -1;
    map[y][x] = { id:2, x, y, dist:0 };
    roaC.x = x, roaC.y = y;
    
    let heyas = [];
    heyas.push({x, y}) 

    // スネークさんに道を作ってもらう
    let moves = roaC.moves;
    while(heyas.length < heya){
        let send = arraySelect(heyas); //選択ed
        let dir = arraySelect(moves);
        x = send.x + dir[0];
        y = send.y + dir[1];

        if(0 <= x && x < row && 0 <= y && y < row && !map[y][x]?.id) {
            let dist = map[send.y][send.x].dist + 1;
            map[y][x] = { id: 1, x, y, dist };
            heyas.push({x, y});
        }
    }

    
    let zihan = random(1, 3);
    let zihaned = 0;
    while(zihaned < zihan){
        let send = arraySelect(heyas); //選択ed
        let dir = arraySelect(moves);
        x = send.x + dir[0];
        y = send.y + dir[1];

        if(0 <= x && x < row && 0 <= y && y < row && (map[y][x].id != 0 && map[y][x].id < 2)){
            map[y][x].id = 3;
            zihaned += 1;
        }
    }

    roaC.map = map;
    roaC.heyas = heyas;

    roaF.mapResize();
}
roaF.mapUpdate = () => {
    let row = roaC.row;
    let map = roaC.map;
    let div0 = roaC.Ds["liver"];
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

    let div0 = roaC.Ds["liver"];
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


roaF.zensen = (ret = 0) => {
    if(!roaC.ing) return 0;
    
    let dir = roaC.dir;
    let moves = roaC.moves; //[[0, 1], [1, 0], [0, -1], [-1, 0]]
    if(!moves[dir]) return 1;
    
    let ds = ["x", "y"];
    for(let i=0; i<2; i++){
        roaC[ds[i]] += moves[dir][i];
         if(roaC[ds[i]] < 0) roaC[ds[i]] = 0;
         if(roaC.row < roaC[ds[i]]) roaC[ds[i]] = roaC.row-1
    }

    roaF.mapPDraw();
}
roaC.Ds["bU"].addEventListener("click", roaF.zensen);
roaF.turnRL = (code = "r") => {
    //codeが数字なら: 既定の方角へ
    //codeがrまたはl: dir += 1か -= 1

    if(!roaC.ing) return 0;
    
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



// #endregion


let x = 0;
let y = 0;  
let z = 0;
let pt = 0;
let ptkari = 0;
let have = 0;
let hour = 14
let min = 0;
let traveled = 0;
let traveledmax = 0;
let strollnow = 0;
let gohomeroot = 0;
let gohomenow = 0;
let phase = 0;
const gostraightmove = '<button class="button" id="Select1" onclick="select1()">go straight</button><br><br><button class="button" id="Select2" onclick="select2()">return home</button>';
const lobyscreen = '<button class="button" onclick="LetsStroll()">Go to stroll</button><br><br><button class="button" onclick-"GoShop()">Shop</button>';
let vendingnum = []

function disappear(){document.getElementById('Select1').textContent = '';document.getElementById('Select2').textContent = '';}
//起動時にやっちゃいます！
playername = 'player'; reset();
async function reset(){
    x = 0; y = 0; z = 0;
    pt = 0; ptkari = 0;
    have = 0; traveled = 0;
    gohomeroot = 0; gohomenow = 0;
    hour = 14; min = 0; phase = 0;
    vendingnum = [];
    window.setTimeout(BackToLoby,1000)
}
async function tekiou(){
    if(strollnow == 0){
        document.getElementById('UI1').textContent = '所持ポイント:' + pt + 'pt';
        document.getElementById('UI2').textContent = '';
        document.getElementById('UI3').textContent = '';
    }else if(strollnow == 1){
        document.getElementById('UI1').textContent = '持っているゴミ:' + have + '個';
        if(gohomenow == 0){x = '家からの距離'}else if(gohomenow == 1){x = '家までの距離'};
        document.getElementById('UI2').textContent = x + ':' + traveled + 'km';
        document.getElementById('UI3').textContent = '獲得予定ポイント:' + ptkari + 'pt';
    }
    
    // if(hour == 18 && strollnow == 1){
    //     logText_log('あなたは家に帰れなかった....');
    //     await delay(2000);
    //     reset()
    // }
}

async function LetsStroll(){
    strollnow = 1;
    x = 0; y = 0; z = 0;
    pt = 0; ptkari = 0;
    have = 0; traveled = 0;
    gohomeroot = 0; gohomenow = 0;
    hour = 14; min = 0; tekiou();;
    vendingnum = [];
    for(i = 0; i < 8; i++){vendingnum.push((Math.floor(Math.random()*6)+1)+(6*i));};
    logText_log('Lets Go!');
    await delay(1000);
    document.getElementById('scene').innerHTML = gostraightmove;
    yourturn();
}
function yourturn(){
    tekiou();
    if(gohomenow == 0){
        x = gostraightmove;
        document.getElementById('Select1').textContent = 'go straight';
        document.getElementById('Select2').textContent = 'return home';
        phase = 1;
    }else if(gohomenow = 1){
        x = gostraightmove;
        document.getElementById('Select1').textContent = 'go straight';
        document.getElementById('Select2').textContent = '';
        phase = 3;
    };
    logText_log('さあ、どうしようか？');
}
async function select1(){
    disappear();
    if(phase == 1){
        phase = 0;
        traveled += 1;
        min += 5;
        if(have < 4 && Math.floor(Math.random()*4) == 0){
            min -= 5;
            logText_log('るんるる〜ん♪');
            await delay(500);
        }//3個以下ならたまにスキップする
        else if(6 > have > 3 && Math.floor(Math.random()*5)  == 0){
            logText_log('すこしゴミを落としてしまった！');
            await delay(500);
            min += 5;
            tekiou();;
            logText_log('全て拾い終えた!');
            await delay(500);
        }//4個以上ならたまに時間ロス
        else if(have > 6 && Math.floor(Math.random()*2)  == 0){
            logText_log('すこしゴミを落としてしまった！');
            await delay(500);
            min += 5;
            tekiou();;
            logText_log('全て拾い終えた!');
            await delay(500);
        }//4個以上ならすごい時間ロス
        tekiou();;
        tekiou();
        if(Math.floor(Math.random()*2) == 0){
            x = Math.floor(Math.random()*6);
            if(x == 6){y = '瓶'}else if(x == 5){y = '空き缶'}else{y = 'ペットボトル'};
            logText_log(y + 'を発見した！');//缶、瓶とか増やして難易度上げてもいいかも
            document.getElementById('Select1').textContent = 'Pick Up';
            document.getElementById('Select2').textContent = 'Leave It';
            phase = 2;
        } else {
            logText_log('何も見つからなかった..');
            window.setTimeout(vending,500)
        }
    } else if(phase == 2){
        phase = 0;
        if(have < 10){
            have += 1;
            logText_log(playername + 'は'+ y +'を拾った！');
            tekiou();
            window.setTimeout(vending,500);
        }else{
            logText_log('もう持てない...!!');
            phase = 2;
            document.getElementById('Select1').textContent = 'Pick Up';
            document.getElementById('Select2').textContent = 'Leave It';
        };
    } else if(phase == 3){
        phase = 0;
        traveled -= 1;
        min += 5;
        if(traveled > 0){
            tekiou(); tekiou();;
            if(Math.floor(Math.random()*4) == 0){
            logText_log('なんとペットボトルを発見した！');
            document.getElementById('Select1').textContent = 'Pick Up';
            document.getElementById('Select2').textContent = 'Leave It';
            phase = 2;
            } else {
                logText_log('進んだ...');
                window.setTimeout(vending,100);
            }
        } else if(traveled == 0){
            tekiou(); strollnow = 0;
            tekiou();;
            logText_log(`${playername}は家に帰りました!`);
            await delay(1500);
            document.getElementById('scene').innerHTML = '<span id="PointScore"></span><br><span id="MovedScore"></span><br><span id="TimeScore"></span><br><br><button class="button" onclick="BackToLoby()">Back to loby</button>'
            document.getElementById('PointScore').textContent = 'ポイント:' + ptkari + 'pt';
            document.getElementById('MovedScore').textContent = '移動距離:' + traveledmax + 'km';
            if(min == 0) x = '00'
            else if(min == 5) x = '05'
            else x = min;
            document.getElementById('TimeScore').textContent = '帰宅時間:' + hour + ':' + x;
            logText_log('これが今回のスコア!');
            pt += ptkari; ptkari = 0;
        }
    }
    else if(phase == 4){
        phase = 0;

        if(have < 10){
            have += 1;
            logText_log(`${playername}はペットボトルを拾った！`);
            tekiou();
            window.setTimeout(vending,500);
        }
        else logText_log('もう持てない...!!');
    }
}
function select2(){
    disappear();
    if(phase == 1){
        phase = 0;
        gohomenow = 1;
        traveledmax = traveled;
        logText_log('さあ、家に帰ろう！');
        window.setTimeout(yourturn,500)
    } else if(phase == 2){
        phase = 0;
        logText_log('見捨てることにした！');
        window.setTimeout(vending,1000);
    } else if(phase == 3){
        phase = 0;
        yourturn();
    } else if(phase == 4){
        phase = 0;
        logText_log('見捨てることにした！');
        window.setTimeout(vending,1000);
    }   
}
async function vending(){
    phase = 0;
    disappear();
    if(vendingnum.includes(traveled)){
        logText_log('自動販売機を発見した！');
    if(have > 0){
        await delay(500);
        logText_log(`${playername}はすべてのペットボトルを捨て、`);
        x = ptkari
        ptkari += have;
        y = ptkari - x
        have = 0;
        await delay(500);
        logText_log(`${y}ptを得た!`);
        tekiou();
    }
    await delay(750);
    };
    yourturn();
}
function BackToLoby(){
    tekiou();
    document.getElementById('scene').innerHTML = lobyscreen;
    logText_log('さて、何をしようか?');
}
function GoShop(){
}

//#region start
function start(){
    Style.tekiou();
    OBS.load();

    mainF.load();
    homF.load();

    logF.tog();

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

async function init() {
    await LoadOfWait();
}
//#endregion

