// #region main
let mainD = document.getElementById('main');
let mainC = {
    spa: null,
    
    mvlsD: document.getElementById('movlis'),
     mvlsLD: document.querySelector('#movlis .list'),
    mvlsi: 0
}
let mainF = {};
mainF.move = (to) => {
    if(mainC.spa == to) return console.log('どういうわけか もう そこにいる');
	if(!to) return console.error(`せんぱ〜い？${to}ってどこですか〜？笑`);
	
	for(let a of Spaces) document.getElementById(a.name).classList.remove('show');
    document.getElementById(to).classList.add('show');
    mainC.spa = to;
}

mainF.load = () => {
    for(let spa of Spaces){
        let div = document.getElementById(spa.name);
        if(!div) continue;

        div.style.zIndex = spa.rank;
        div.style.background = spa.back;
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


// #region home
let homD = document.getElementById('home');
let homC = {
    startD: homD.querySelector('.unit1 .venture'),
    gamD: homD.querySelector('.unit2 .gamble'),
    quitD: homD.querySelector('.unit3 .quit'),
    atukD: homD.querySelector('.unit3 .atukie'),

    started: 0,
};
let homF = {};

homF.start = async() => {
    if(homC.started) return 1;
    homC.started = 1;
    let charas = Charas.map(a => {
        return {
            name: a.name,
            img: `assets/images/charas/${a.name}.png`
        };
    });
    // let charas = Charas.map(a => `${a.jpnm} [${a.name}]`)
    let charaSen = new TakushiSen(charas, 'tate');
    let name = await charaSen.select(homD); //文字列が来るヨ
    console.log(name) //"color_slime"
    console.log(`選ばれたのは、[${name}]でした`); //"選ばれたのは、[undefined]でした"

    makeUnit("player", 0, name);
    batF.hasSet([
        ["aspirin", 3],
        ["throw_knife", 3],
        ["aspirin", 3],
    ])

    mainF.move('batt');

    encount();
}
homC.startD.addEventListener('click', homF.start);

homF.quit = async() => {
    await logText('え？もう帰っちゃうの？');
    let ls = ['ああ、もちろんさ', 'ゎ、ご、ごめんなさいぃっ'];
    let seen = new TakushiSen(ls, 'tate');
    let ans = await seen.select(homD);
    console.log(ans)
    // if(ans == 0) window.location.href = "https://game.koppepan-orange.com/"
    if(ans == 0){
        window.location.href = "../index.html";
        await logText("みんなも一緒にやってみようよ");
        await logText("いくよ？");
        await logText("ランランr");
        await logText("と思っていたのか");
        await logText("だにぃ？")
    }
    if(ans == 1) await logText("えへへ..よかった")
}
homC.quitD.addEventListener('click', homF.quit);

homF.atukie = () => {
    window.open("assets/txts/atukie.html", "_blank");
}
homC.atukD.addEventListener("click", homF.atukie)

homC.gamD.addEventListener('click', () => mainF.move('gamble'))
// #endregion home


// #region batt
let batD = document.getElementById('batt');
let batC = {
    turnD: batD.querySelector(".upui .turn .num"),
    killD: batD.querySelector(".upui .killen .num"),
    sesD:{
        enemie: batD.querySelector(".humans.enemies"),
        player: batD.querySelector(".humans.players"),
    },
    bts:[
        batD.querySelector(".bts .bt.bt0"),
        batD.querySelector(".bts .bt.bt1"),
        batD.querySelector(".bts .bt.bt2"),
        batD.querySelector(".bts .bt.bt3"),
    ],

    stage: "草原",
    turn: 0, //1巡すると++1
    actbar: [], //行動する順番
    acted: 0, //barの進行度。0からbar.length-1
};
batC.shokey = {
    acts: ['斬る', 'つばめ返し', '踏み込み斬り'],
    mags: ['heal', 'power', 'shell'],
    tool: ['aspirin', 'throw knife', 'redcard'],
    booth: ["act", "mags", "tool", "run"],
}
let batF = {};

let humans = [];
let has = [];
let hasM = [...Tools.map(a => a.name), ...Equips.map(a => a.name)];

batF.hasTekiou = () => {
    has.sort((a, b) => hasM.indexOf(a) - hasM.indexOf(b));
}
batF.hasAdd = (name, n = 1) => {
    console.log(`[has] hasに ${name} を${n}個追加しま〜す`);
    for(let i=0; i<n; i++) has.push(name);
    
    batF.hasTekiou();
}
batF.hasSet = (arr) => {
    // [[name, n], [name, n], ...]
    has = [];
    for(let v of arr){
        let [name, n] = v;
        batF.hasAdd(name, n);
    }

    batF.hasTekiou();
}


function tekiou(){
    for(let human of humans){
        let cam = human.cam;
        let chokkin = cam.substring(0,1);
        let div0 = batC.sesD[cam]
        let div = div0.querySelector(`.${cam}${human.me}`);

        let hd = 0;
        let srca = null;
        if(cam == 'enemie'){
            hd = Enemies.find(a => a.name == human.name);
            srca = `enemies/${batC.stage}/${hd.img ?? hd.name}.png`;
        }
        if(cam == 'player'){
            hd = Charas.find(a => a.name == human.name);
            // console.log(hd)
            if(hd) srca = `charas/${hd.img}.png`;
            if(!hd){
                hd = Friends.find(a => a.name == human.name);
                srca = `friends/${hd.img}.png`;
            }
            // console.log(srca)
        }

        // console.log(`${cam}${human.me}`)
        // console.log(human)
        // console.log(hd)

        // 小数やら
        let shos = ["hp", "maxhp", "atk", "def", "matk", "mdef", "catk"];
        human.hp = Math.round(human.hp);

        div.querySelector('.name').textContent = human.name;
        div.querySelector('.lv').textContent = `Lv.${human.lv}`;
        div.querySelector('.img').src = `assets/images/${srca}`;
        div.querySelector('.skill .naka').style.height = `${human.ep/human.maxep*100}%`;

        let [half, pinch] = [2, 4]

        let hpZ = div.querySelector('.bar0.hp');
        let [hp, maxhp] = [human.hp, human.maxhp];
        hpZ.querySelector('.text').textContent = `${hp}/${maxhp}`;
        hpZ.querySelector('.bar .inner').style.width = `${hp/maxhp*100}%`;
        if(hp < maxhp/pinch) div.classList.add("h-pinch");
        else div.classList.remove("h-pinch");
        if(hp < maxhp/half) div.classList.add("h-half");
        else div.classList.remove("h-half");

        let mpZ = div.querySelector('.mp');
        let [mp, maxmp] = [human.mp, human.maxmp]
        mpZ.querySelector('.text').textContent = `${mp}/${maxmp}`;
        mpZ.querySelector('.bar .inner').style.width = `${mp/maxmp*100}%`;
        if(mp < maxmp/pinch) div.classList.add("m-pinch");
        else div.classList.remove("m-pinch");
        if(mp < maxmp/half) div.classList.add("m-half");
        else div.classList.remove("m-half");

        // buff
        let buffD = div.querySelector('.buffs');
        buffD.innerHTML = "";
        for(let buff of human.buffs){
            let name = buff.name;
            let buD = El("div", "buff");
            let buID = El("img");
             buID.src = `assets/images/buffs/${name}.png`;
             buD.appendChild(buID);
            
            buffD.appendChild('buD')
        }
    }   
}

//#region 今日は何ーーーー
function whatdo(who, are, shu, name){
    console.log(`${who.name}が${are.name}に${shu}[${name}]をします`)
    let [cam, me] = [who.cam, who.me];
    
    let ares = copy(are);
    if(typeof ares == "object") ares = [ares];
    let ts = [];
    for(let ar of ares){
        let [tcam, tme] = [ar.cam, ar.me];
        ts.push([tcam, tme]);
    }
    
    let res = {
        cam,
        me,
        ts,
        shu,
        name
    }
    return res;
}
//#endregion どちらかと言うと youは何しに日本へ

// #region サーチ系
function findEquips(type, name){
    let arr = Equips.filter(a => a.type == type);
    let data = arr.find(a => a.name == name || a.jpnm == name);
    if(data) return data;
    return console.log(`[find] Equipの${type}で、「${name}」っていうものはないらしいです`), 0;
}

function findGeneric(list, type, name, extraCheck = null){
    let data;
    if(extraCheck) data = extraCheck(list, name);
     else data = list.find(a => a.name == name || a.jpnm == name);
    if(data) return data;
    
    console.log(`[find] ${type}で、「${name}」っていうものはないらしいです`);
    return 0;
}
const findChara = (name) => findGeneric(Charas, "Chara", name);
const findFriend = (name) => findGeneric(Friends, "Friend", name);
const findEnemie = (name) => findGeneric(Enemies, "Enemie", name);
const findActs = (name) => findGeneric(Acts, "Acts", name);
const findMags = (name) => findGeneric(Mags, "Mags", name);
const findTool = (name) => findGeneric(Tools, "Tool", name);
const findBuff = (name) => findGeneric(Buffs, "Buff", name);
// #endregion

// #region 人体工場
function makeUnit(cam, code = 0, name = 0){
    console.log(cam, code, name)
    let data = {};
    if(cam == 'player'){
        let data0 = Charas;
        if(code) Friends;
        data = data0.find(a => a.name == name);
    }
    if(cam == "enemie" && !name){
        data = arraySelect(Enemies.filter(a => !a.no));
        name = data?.name ?? 0;
    }
    if(!data) return console.log(`codeが[${code}]の${name}はいないらしい`);
    // console.log(data);

    let unit = {};
    if(cam == 'player'){
        // pleyerはデータをそのままコピー
        // Status.map(a => a.name).forEach(s => unit[s] = data[s]);
        for(let data0 of Status){
            let name = data0.name;
            unit[name] = data.stat[name] ??data0.bas;
        }

        
    }
    if(cam == "enemie"){
        // enemieはベース値から補正値で加工
        Status.map(a => a.name).forEach(s => {
            let vd = Status.find(a => a.name == s);
            unit[s] = vd.bas;

            let v = data[s];
            if(!v || 
               typeof v != 'string') v = "+0"
            if(v.startsWith('+') || v.startsWith('-')){
                let num = +v.slice(1);
                if(v.startsWith('-')) num *= -1;
                unit[s] += num;
            }
            if(v.startsWith('=')){
                unit[s] = +v.slice(1);
            }
        });
    }

    let me = humans.filter(a => a.cam == cam).length;;

    //commonの初期化
    unit.hp = unit.maxhp;
    unit.mp = unit.maxmp;
    unit.ep = 0;
    unit.joutie = 1;
    unit.buffs = [];
    unit.cam = cam;
    unit.me = me;

    //each otherの初期化
    if(cam == 'player'){
        unit.name = name;
        unit.lv = 1;
        unit.exp = 0;
        unit.sp = 0;
        unit.attr = [];
        unit.equips = {}
        
        unit.acts = unit.acts ?? batC.shokey.acts;
        unit.mags = unit.mags ?? batC.shokey.mags;
        unit.tool  = unit.tool ?? batC.shokey.tool;

        if(code == 0){
            unit.ex = data.ex;
            unit.ns = data.ns;
            unit.ps = data.ps;
            unit.ts = data.ts;

            Style.batSt.solid = data.buttonsolid;
            Style.batSt.back = data.buttonback;
            Style.batSt.aima = irohaMix(data.buttonsolid, data.buttonback);
            Style.tekiou();
        }
        if(code == 1){
            unit.e = data.e;
            unit.s = data.s;
            unit.n = data.p;
            unit.p = data.p;
            unit.t = data.t;
        }
    }
    if(cam == "enemie"){
        unit.name = data.name;
        unit.lv = random(1, 3);
        unit.attr = data.attr ?? [];
        unit.lasts = [];
        unit.equips = {};
    }


    let sd = Stages.find(a => a.name == batC.stage);

    let nameD = El('div', 'name');
     nameD.style.color = irohaMix('#b2b2b2', sd.color);
     
    let imgD = images["systems"].error.cloneNode(true);
     imgD.classList.add("img")
    let backD = El('div', "naka");
     let skillD = El('div', 'skill', [backD])
      skillD.style.borderColor = irohaMix('#2b2b2b', sd.color);
    
    let baa = (code) => {
        return El('div', `${code} bar0`, [
            El('div', 'text'),
            El('div', 'bar', [El('div', 'inner')])
        ]);
    }

    let div = El('div', `human ${cam}${me}`, [
        imgD,
        skillD,
        El('div', 'lv'),
        nameD,
        El('div', 'bars', [
            baa('hp'),
            baa('mp')
        ]),
        El('div', 'buffs')
    ]);

    unit.div = div;

    // let container = (cam == 'player') ? batC.pD : batC.eD;
    let belong = batC.sesD[cam];
    belong.appendChild(div);

    humans.push(unit)

    // return unit;
}

let makePlayer = (code, name) => makeUnit('player', code, name); //code: 0 == chara, 1 == friend
let makeEnemy  = () => makeUnit('enemy');
// #endregion

// #region 道との遭遇
function encount(){
    let enemiesD = batC.sesD["enemie"];
     enemiesD.innerHTML = "";
    let playersD = batC.sesD["player"];
     playersD.innerHTML = "";

    humans = humans.filter(a => a.cam == "player");
    let max = 1;
    let num = random(1, max);
    for(let i=0; i<num; i++){
        makeUnit("enemie");
    }

    let players = humans.filter(a => a.cam == "player");
    for(let unit of players){
        let div = unit.div;
        playersD.appendChild(div);
    };

    tekiou();

    turnNew()
}
batC.turnD.addEventListener('click', encount)
// #endregion

let context = {}; //consoleで変数見る用。正式実装の予定はない
// #region 攻撃！（自分以外のプレイヤー全員はカードはカードを1枚引く）（無関係）
async function attack(who, ares, voi, tri, aim, props = []){
    let hasp = (name) => {
        if(props.includes(name)) return name;
        let prop = props.find(a => a.startsWith(name));
         if(prop) return prop;
        return "";
    }

    // console.log(ares);
    console.log(`[attack] ${who.name}の攻撃！ ${voi} [${tri}] (${props.join(", ")})`)
     if((voi != 0 && !voi) || !tri || (aim != 0 && !aim)) return console.error("要素が足りないです");
    if(!Array.isArray(ares)) ares = [ares];


    let triA, triD;
    switch(tri){
     case "ph":
        //物理
        triA = "atk";
        triD = "def";
        break;
     case "mg":
        //魔法
        triA = "matk";
        triD = "mdef";
        break;
     case "cn":
        //間接
        triA = "catk";
        triD = "def"; //貫通するけどネ
        break;
    }
    let matchTri = (a, b) => {
        let [arrA, arrB] = [a, b];
        if(!Array.isArray(a)) arrA = [a];
        if(!Array.isArray(b)) arrB = [b];
        
        if(arrA.includes("all") || arrB.includes("all")) return 1;
        
        return arrA.some(element => arrB.includes(element)); //someです！everyの塩基対
    }


    for(let are of ares){
        console.log(`[attack] ${who.name} => ${are.name}`)


        // 攻撃側の targe と 防御側の dodge を加味して最終命中率をだす
        let atare = (aim+who.targe) - are.dodge;
        if(!hit(atare)){
            console.log(`[attack] ${who.name}の攻撃は外れた！(最終命中率: ${atare}%)`);
            tobiText(are.div, "miss", {back: "#b2b2b2"});
            await delay(500);
            continue;
        }

        let atker = copy(who); //atk+add * power + wepatk
        let defer = copy(are); //def * shell + cut + shldef
        
        let wepatk = 0, shldef = 0;
        let weapon = atker.weapon?.name ?? "none";
         let weaponD = findEquips("weapon", weapon);
        let shield = defer.shield?.name ?? "none";
         let shieldD = findEquips("shield", shield);
        if(matchTri(tri, weaponD.tri)) wepatk = weaponD.atk;
        if(matchTri(tri, shieldD.tri)) shldef = shieldD.def;

        let nisha = { //二者択一 似せたクイズ ダイバーシティに大抜擢 文学的なブーバキキ
            atker, defer
        };
        let accessment = ["ear", "neck", "tank"];
        for(let whi0 of Object.keys(nisha)){
            let whi = nisha[whi0];
            for(let access0 of accessment){
                let access = whi[access0] ?? "none";
                 let accessD = findEquips(access0, access);
                
                if(matchTri(tri, accessD.tri)){
                    wepatk += accessD.atk;
                    // console.log(`${accessD.atk}増加`);
                }
                if(matchTri(tri, accessD.tri)){
                    shldef += accessD.def;
                    // console.log(`${accessD.def}増加`);
                }
            } 
        }

        // console.log(atker), context["atker"] = atker;
        // console.log(defer), context["defer"] = defer;
        // console.log(wepatk, shldef), context["wepatk"] = wepatk, context["shldef"] = shldef;
        let atk = ((atker[triA]) * atker.power +atker.add + wepatk);
         atk *= (voi*0.01);
         if(atk < 0) atk = 0; //流石に回復は意味わからん
        let def = ((defer[triD]) * defer.shell +defer.cut + shldef);
         if(def < 0) def = 0; //流石に攻撃力強化は意味わからん

        // crit | atker.crla -defer.crrs +propのなんか（会心:）（会心固:） | hitで判定
        let cranus = atker.crla -defer.crrs;
        jump:{
            if(!hasp("会心")) break jump;
            
            let prop = hasp("会心固").slice(4); //会心固:num
            if(+prop){
                console.log(`[attack] prop「会心固」発動！会心率が強制的に "${prop}" になりました！`);
                cranus = +prop;
                break jump;
            }
            else return console.error(`[attack] prop{会心固:${prop}}で問題発生: 数値でないものが用いられてます`);
            
            prop = hasp("会心").slice(3); //会心:num
            if(+prop){
                console.log(`[attack] prop「会心」発動！会心率に以下の値を追加: ${prop}`);
                cranus += +prop;
                break jump;
            }
            else return console.error(`[attack] prop{会心:${prop}}で問題発生: 数値でないものが用いられてます`);
            
            console.log("え誰？お前誰？");
        }
        if(hit(cranus)){
            console.log(`[attack] 会心の一撃発生！dmgが${atker.crdm}%になりました！ (最終会心率: ${cranus})`);
            props.push("発生:会心");
            atk *= (atker.crdm/100);
        }

        // さあ
        let dmg = Math.max(atk - def, 1);

        console.log(`[attack] {${voi}%} ${who.name}(${atk})[${triA}] => ${are.name}(${def})[${triD}] | dmg:${dmg}`);
        
        if(await damage(who, are, dmg, tri, props)) return 1;

        // 大丈夫そうなら次の標的へ
    }
}
async function heal(who, ares, val0, props=[]){
    let hasp = (name) => {
        if(props.includes(name)) return name;
        let prop = props.find(a => a.startsWith(name));
        if(prop) return prop;
        
        return "";
    }
    console.log(`[heal] ${who.name}の回復！ | ${val0} [${props.join(", ")}]`);
    
    if(typeof val0 != "number" && !val0.endsWith("%")) return console.error(`[heal] valに ${val0} という文字列が謎に使われてます`);
    
    if(!Array.isArray(ares)) ares = [];
    for(let are of ares){
        console.log(`[heal] ${who.name} => ${are.name} | val: ${val0}`);
        let val = val0;
        
        if(typeof val == "string" && val.endsWith("%")){
            val = val.slice(0, -1); //最後の1文字を切り取る？
            if(+val){
                val = +val;
                let kiju = "maxhp";
                if(hasp("%:")) kiju = hasp("%:").slice(2);
                
                if(kiju == "maxhp") val = are[kiju] * (val/100);
                else val = who[kiju] * (val/100);
            }
            else console.error(`[heal] valに不明な文字列 ${val}% が用いられました。いやどないどない`);
        }
        
        let atker = copy(who);
        let defer = copy(are);
        
        //atker
        let stats = Status.map(a => a.name);
        for(let buff of atker.buffs){
            let data = buffFind(buff.name);
            
            for(let [k, v] of Object.entries(buff.value)){
                if(stats.includes(k)) atker[k] += v;
            }
        }
        
        let dmg = val;
        
        if(hasp("腐乱")) dmg *= -1;

        if(await damage(who, are, -dmg, "hl", props)) return 1;
    }
}
async function damage(who, are, dmg, tri, props = []){
    let hasp = (name) => {
        if(props.includes(name)) return name;
        let prop = props.find(a => a.startsWith(name));
         if(prop) return prop;
        return "";
    }

    let back = "#2b2b2b", mode = "kiki";
    jump:{
        switch(tri){
            case "ph": back = "#2b2b2b"; break;
            case "mg": back = "#edb7ff"; break;
            case "cn": back = "#bb5757"; break;
            case "hl": back = "#dfffc4"; mode = "booba"; break;
        }

        if(!hasp("発生")) break jump;

        if(hasp("発生:会心")){
            kirameki(are.div);
            back = "#ffeb86";
        }
    }

    // 一旦雑に
    dmg = Math.ceil(dmg);
    console.log(back, mode)
    tobiText(are.div, dmg, {back, mode});
    
    let atae = dmg;
    if(are.hp < dmg) atae = are.hp;
    are.hp -= atae;
    tekiou();

    await delay(500); //死を表してからの
    jump:{
        if(0 < are.hp) break jump;

        if(hasp("寸々")){ //最初はedgeにしようとしたけど...prop日本語で良くね理論を忘れていたのでパペットにしました
            are.hp = 1;
            tekiou();

            // await logText("んっ......♡♡"); // ←確信犯すぎる
            await logText(`${are.name}「あぶね死にかけたわ」`); // ←平和！！
            break jump;
        }

        if(hasp("復活")){
            are.hp = are.maxhp*0.5;
            tekiou();

            await logText(`${are.name}「ありがとジャンヌ」`); //ジャンヌ、#コンパスでHSを使うと味方が一回復活できる的なやつ
            break jump;
        }

        // これ以下は"死"です
        if(await dead(who, are, props)) return 1;
        return 0;
    }

    return 0;
}

// リンク
// sm45970682 | sm43363556

async function dead(who, are, props = 0){
    are.joutie = 0;

    let tcam = are.cam;
    let tes = cm(tcam);
    let res = tes.every(a => !a.joutie); //joutie:: 0:死 1:生 2↑:？？
    if(res) return await win(who.cam);
    
    // ここは何？

    return 0;
}
async function win(cam){
    await logText(`${cam}陣営の勝ち！`)
    encount();

    location.reload();
}
// #endregion

// #region buffとか
function buffHas(who, name){
    let data = buffFind(name);
    let buff = who.buffs.find(a => 
        a.name == name || 
        a.jpnm == name || 
        a.jpnm == data.jpnm || 
        a.startsWith(name)
    );
    if(!buff) return 0;

    return buff;
}
function buffHeraso(who, name, becauseof){
    let buff = buffHas(who, name);
    if(!buff) return 0;

    let data = findBuff(name);
    if(!data) return 0;

    if(data.stack == becauseof){
        let hera = data.hera; //numberなことが多いが、"=0"なこともある
        if(buffDec(who, name, hera)) return 1;
    }
    
    return 0;
}

function buffAdd(who, are, name, num, lv){
    console.log(`[buffAdd] ${who.name} => ${are.name} | ${name}[${lv}]を${num}stack`);
    let data = findBuff(name);
    if(!data) return console.error(`buff[${name}] は存在しないらしい`);

    let buff = {
        name,
        value: {},
        lv,
        data
    }

    are.buffs.push(buff);

    return 0;
}
function buffDec(who, name, num){
    if(num == "=0") return buffRem(who, name); //基本は数字
    if(typeof num == "string") num = +num.slice(1); //先頭の=を消す
     if(!num) return 0;
    console.log(`[buffDec] ${who.name}のbuff[${name}]を${num}stack減らす`);
    
    let buff = buffHas(who, name);
     if(!buff) return 0;
    buff.stack -= num;
     if(buff.stack <= 0) return buffRem(who, name);
    tekiou();
    
    return 1;
}
function buffRem(who, name){
    console.log(`[buffRem] ${who.name}のbuff[${name}]を解消します`);

    return 1;
}
function buffCalc(who, arr){
    for(let buff of who.buffs){
        let data = buffFind(buff.name);
        
        for(let [k, v] of Object.entries(buff.value)){
            if(arr.includes(k)) who[k] += v;
        }
    }
}


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
// #endregion

// #region ターゲティング

function cm(cam = '指定なし', me = '指定なし'){
    let who = 0;
    if(cam == '指定なし' && me == '指定なし') return humans.find(a => a.cam == 'player' && a.me == 0);
    
    if(me == '指定なし') return humans.filter(a => a.cam == cam);

    who = humans.find(a => a.cam == cam && a.me == me);
    if(Array.isArray(who)){
        console.log('↓findなのにarrayになってるふぉーぜ')
        console.log(who)
    }
    
    return who;
}
function selectSyudou(code = 1){
    //1:通常(1人) 2:選んだところと左右 3:選んだところと左右2人ずつ 4:選んだ陣営全員 5:全員
    return new Promise((resolve) => {
        let color = '#fff450';
        let pcolor= '#f7f7f7';

        let arrs = [
            ...humans.filter(a => a.cam == 'player').map(a => `player${a.me}`),
            ...humans.filter(a => a.cam == 'enemie').map(a => `enemie${a.me}`),
        ];

        let target = [];
        function handleClick(event){
            let div = event.target;

            // ↓ 天才です   天 天 天才
            while(!div.classList.contains('human')) div = div.parentElement;
            let lis = div.classList;

            let tcam = lis[1].substring(0, 6); //前半7文字(player / enemies)
            let tme = +lis[1].substring(6); //数字。数字です。
            // console.log(tcam, tme);

            arrs.forEach(a => {
                // console.log(a)
                // let div0 = batC[`${a.substring(0, 1)}D`];
                let div0 = batC.sesD[a.substring(0, 6)];
                let div = div0.querySelector(`.${a}`);
                
                div.removeEventListener('click', handleClick);
                div.classList.remove('sl')
            });

            target = [
                tme,
                tcam
            ]

            // console.log(target);

            if(code == 2){ //拡散-3
                let zin = humans.filter(a => a.cam == tcam && a.joutie);
                let pnum = (zin[tme-1]?.joutie??0) ? tme - 1 : null;
                let nnum = (zin[tme+1]?.joutie??0) ? tme + 1 : null;
                
                let cn = 1;
                if(pnum) cn += 1;
                if(nnum) cn += 1;
                
                let cams = Array(cn).fill(tcam);
                
                target = [
                    [tme-1,tme,tme+1],
                    cams
                ];
            }
            if(code == 3){// 拡散-5
                let zin = humans.filter(a => a.cam == tcam && a.joutie);
                let p2num = (zin[tme-2]?.joutie??0 == 1) ? tme - 2 : null;
                let pnum = (zin[tme-1]?.joutie??0 == 1) ? tme - 1 : null;
                let nnum = (zin[tme+1]?.joutie??0 == 1) ? tme + 1 : null;
                let n2num = (zin[tme+2]?.joutie??0 == 1) ? tme + 2 : null;
                
                let cn = 1;
                if(pnum) cn += 1;
                if(p2num) cn += 1;
                if(nnum) cn += 1;
                if(n2num) cn += 1;
                
                let cams = Array(cn).fill(tcam);
                
                target = [
                    [tme-2,tme-1,tme,tme+1,tme+2],
                    cams
                ];
            }
            if(code == 4){ //相手陣営全員
                let nums = cm(tcam).filter(a => a.cam == tcam && a.joutie);
                let cams = Array(nums.length).fill(tcam); //fillは全ての値を同じ値にするやつ。同数にするために使用されがち
                target = [
                    nums,
                    cams
                ];
            }
            if(code == 5){ //全員
                let tnums = cm(tcam).filter(a => a.joutie);
                let gyaku = fl(tcam, ['player','enemie']);
                let nums = cm(gyaku).filter(a => a.joutie);

                let awase = [...tnums, ...nums];
                
                // let cn = tnums.length + nums.length;

                let cams = [...Array(tnums.length).fill(tcam), ...Array(nums.length).fill(gyaku)];

                target = [
                    awase,
                    cams
                ];
            }

            // console.log(target);

            let cs = target[1];
             if(typeof cs == 'string') cs = [cs]
            let ns = target[0];
             if(typeof ns == 'string' || typeof ns == 'number') ns = [ns]
            // console.log(cs, ns)
            let whoes = [];
            for(let i = 0; i < cs.length; i++){
                let c = cs[i];
                let n = ns[i];
                console.log(`humans[${c}][${n}]を狙います！`);
                let cn = cm(c, n);
                // console.log(cn);
                whoes.push(cn);
            }

            // console.log(whoes);

            resolve(whoes);
        }

        arrs.forEach(a => {
            let div = document.querySelector(`.${a}`);
            div.addEventListener('click', handleClick);
            div.classList.add('sl')
        });
    });
}
//受動的な選択
function selectJodou(who, tar = "are", stat = "hp", hl = "low", spread = 1){
    let cam = who.cam;
    if(tar == "who") tar = cam;
    if(tar == "are") tar = fl(cam, ['player', 'enemie']);

    console.log(`[selectJodou] ${cam}${who.me} => ${tar}の${stat}順で${hl}なやつ！ (spread: ${spread})`)
    if(spread != 0 && spread % 2 == 0) return console.error('エラー発生 エラー発生 rangeに偶数を発見しました rangeに偶数を発見しました');

    /*
    who: それを実行した者
    tar: 標的軍団。基本whoかareで、whoなら自軍、areなら相手軍。players/enemiesも可。allで全体も可。
    stat: どのステータスで選ぶか。hpとかatkとか。
    hl: [high/low/cen/random]のどれかで、statの高い方を選ぶか低い方を選ぶか自分の正面を選ぶかランダムで選ぶか。
    spread: 1ならその一体だけ、3なら両隣も(いるなら)対象にする。5なら両隣2体も(いるなら)対象にする。2,4は存在しないぜ。0は何？全体？

    spreadを0にするならば、stat,hlは0にして省略してもおk
    つまり「敵全体」を表すならば selectJodou(who, 'are', 0, 0, 0); 無駄になげぇ まあいいけれども
    一応0の場合の処理もおいてはおきますけどね 私は優しいので
    */

    let list0 = null;
    if(tar != 'all') list0 = cm(tar);
    else list0 = [...cm('player'), ...cm('enemie')];
    let list = list0.filter(c => c.joutie); //not ソート
     if(list.length == 0) return console.error(`errored! ${tar} is inai desu war!!`);

    if(spread == 0) return list; //0は全体、そう決めたのです

    let listed;
    if(stat != 0) listed = copy(list).sort((a, b) => a[stat] - b[stat]); //ソートされたってことでed sortは元の子を破壊するらしい
    else listed = copy(list);
    // console.log(list);
    

    let zero;
    if(hl == 'low') zero = listed[0];
    if(hl == 'high') zero = listed[listed.length - 1];
    if(hl == 'random' || hl == 0) zero = arraySelect(listed);
    if(hl == 'cen'){
        let whol = cm(who.cam).filter(c => c.joutie);
        let whoi = whol.findIndex(c => c.me == who.me); //whoiが-1はまずありえん
        zero = list[whoi]; //これは正面に無いと失敗。拡散でも同じく。
    }
    if(!zero) return console.error('errored! な、なんかzeroが無かったッス！これはバグの発生ッス！');

    let tme = zero.me;
    let i = list.findIndex(c => c.me == tme);
    let range = (spread-1)/2;
     if(range < 0) range = 0;
    
    let ares = [];
    for(let i2 = i-range; i2 <= i+range; i2++){
        let are = list[i2];
        if(are) ares.push(are);
    }

    return ares; // [{...},{...},{...}]
}
// #endregion

batF.acts = async(who, i) => {
    // who.acts[i]を実行するやつ

    let name = who.acts[i];
    let data = findActs(name);
    if(!data) console.error(`${who.name}のacts[${i}]、${name}はガチ・存在しないらしいっす`);
    if(who.mp < data.mp) return tobiText(who.div, "mp is not enough");

    // Jammo ja
    selects(0);
    let ares = await selectSyudou(1);
    if(await data.func(who, ares)) return 1;
    
    // なければ
    turnEnd(who);
    return 0;
}
batF.mags = async(who, i) => {
    let name = who.mags[i];
    let data = findMags(name);
    if(!data) console.error(`${who.name}のmags[${i}]、${name}はガチ・存在しないらしいっす`)
    if(who.mp < data.mp) return tobiText(who.div, "mp is not enough");
    
    selects(0);
    let ares = await selectSyudou(1);
    
    if(await data.func(who, ares)) return 1;
    
    // なければ
    turnEnd(who);
    return 0;
}
batF.tool = async(who, i) => {

    let name = who.tool[i];
    let data = findTool(name);
    if(!data) console.error(`${who.name}のtool[${i}]、${name}はガチ・存在しないらしいっす`)
    if(!has.includes(name)) return tobiText(who.div, `${name} not enough`);
    
    selects(0);
    let ares = await selectSyudou(1);
    if(await data.func(who, ares)) return 1;
    
    // なければ
    turnEnd(who);
    return 0;
}
async function runaway(){
    // selects(0);

    logText("未実装");
}

// #region turnとかbarとかactedとか
function selects(arr = []) {
    if(arr == 0){
        selects([
            ["", 0],
            ["", 0],
            ["", 0],
            ["", 0]
        ])
        return;
    }

    let bts = batC.bts;
    for(let k=0; k<4; k++) {
        let youso = arr[k];
        bts[k].innerText = youso[0];
         let wid = bts[k].offsetWidth;
         let nag = (wid/youso[0].length) *0.8
         bts[k].style.fontSize = `${Math.min(nag, 23)}px`;
        bts[k].func = youso[1];

        if(!bts[k].seted){
            bts[k].addEventListener("click", (e) => {
                if (typeof e.currentTarget.func == "function") {
                    e.currentTarget.func();
                }
            });
            bts[k].seted = 1;
        }
    }
}

async function turnPlayer(who){
    // console.log(who);
    const makeMenu = (type) => [ //who.acts[0].data.jpnm
        ...[0,1,2].map(i => [who[type][i], () => batF[type](who, i)]),
        ["back", () => turnPlayer(who)]
    ];

    selects([
        ["acts", () => selects(makeMenu("acts"))],
        ["mags", () => selects(makeMenu("mags"))],
        ["tool", () => selects(makeMenu("tool"))],
        ["away", runaway]
    ]);
}


async function turnEnemy(who){
    let data = findEnemie(who.name);

    let are;
    if(data){
        let act = enemySelectAction(who);
		let res = await act.func(who);
         if(res.code) return 1; //こいつは特殊、というか切り札。return {code:0, are:ares}をつかいます
		are = res.are;
    }
	else{
		// ↓基本的なfuncの中身。さて
        await logText(`${who.name}は何かで攻撃した！`)
        are = selectJodou(who);
        if(await attack(who, are, 80, 'ph', 100)) return 1;
    }

    turnEnd(who, are);
}
function enemySelectAction(who){
    let data = Enemies.find(a => a.name == who.name);
    let acts = [];
    let pros = [];

    if(who.lasts.length != 0){
        //直前にreを実行していたならば、対応するabを確定実行するやつ
        who.lasts.forEach(last => {
            data.acts.forEach(a => {
                let props = a.prop;
                props.filter(b => b.startsWith('ab') && b.endsWith(last)).forEach(b => {
                    console.log(`ノア「re${last}が記録されていますので、ab${last}である${a.name}を実行しますね♪」`)
                    acts.push(a);
                    pros.push(a.p);
                });
            })
        })
        who.lasts = [];
    }
	else{
        data.acts.forEach(a => {
            acts.push(a);
            pros.push(a.p);
        })
    }
    // console.log(acts);
    // console.log(pros);

    //reをするとlastを記録
    let act = arrayGacha(acts, pros);
    // console.log(act);
    console.log(`act: 「${act.name}」(${act.p}%)`);
    let props = act.prop ?? [];
    props.forEach(p => {
        if(p.startsWith('re')){ // reInvisi
            console.log(`ノア「${item}を記録しました」`);
            let item = p.slice(2);
            who.lasts.push(item);
        }
    })

    return act;
}

async function turnNext(who){
    // やりたいこと: dotダメージの処理, その後playerかenemieかでswitchで行動を促す
    
    // 行動不能系のチェックを先にやっちゃうね。動けないのにdotだけ食らうのは変だし！
    for(let buff of who.buffs){
        let data = findBuff(buff.name);

        if(buff.name == 'onslime'){
            if(isCrit(buff.value)){
                buffremove(who, 'onslime');
                await logText('なんとかスライムを取り払った!!');
            }
            else{
                await logText('スライムが邪魔して動けない!!');
                turnBye(who);
                 // 動けないから次の人へパス
                return;
            }
        }
        if(buffhas(who, 'skip')){
            await logText(`>> はい${who.name}、お前スキップ〜〜`);
            turnBye(who);
            return;
        }
        if(hask(buff.value, 'palsy')){
            if(isCrit(buff.value.palsy)){
                data.name != 'stan'
                    ? await logText(`${who.cam}${who.me}は麻痺している..`)
                    : await logText(`${who.cam}${who.me}はスタンしている....`);
                turnBye(who);
                return;
            }
        }
        if(hask(buff.value, 'freeze')){
            if(!isCrit(buff.value.freeze)){
                await logText(`${who.name}は凍っている...`);
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

    switch(who.cam){
        case 'player':
            turnPlayer(who);
            break;
        case 'enemie':
            turnEnemy(who);
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
        let data = findBuff(buff.name);
        if(data && hask(data, 'luck')){
            if(isCrit(data.luck)){
                await logText('当たりが出たらもう一本！');
                extraTurn = true;
                break;
            }
        }
    }

    if(extraTurn){
        if(who.cam == 'player') turnPlayer(who);
        else turnEnemy(who);
        return;
    }

    processDots(who);
    if(who.hp <= 0) return;

    turnBye(who);
}

function turnBye(who){
    // やりたいこと: もしbar最後の行動だったならturnNewを実行
    batC.acted += 1;

    // 今回はbatC.actbarが配列だから、lengthと比較すれば一発だね
    if(batC.acted >= batC.actbar.length){
        turnNew();
    } else {
        // まだ残ってるなら、次のインデックスの奴のターンを開始
        let nextWho = batC.actbar[batC.acted];
        turnNext(nextWho);
    }
}

function turnNew(code = 0){
    // やりたいこと: barを再建, 0番の行動開始
    batC.turn += 1;

    // 前作のソート処理をそのまま持ってきたよ
    // batC.actbarには、前作みたいにcamとmeを分けるんじゃなくて、オブジェクトごと突っ込む配列にするのがイマドキ！
    let combined = humans.filter(a => a.joutie && a.hp > 0)
        .sort((a, b) => {
            if(b.spd == a.spd){
                if(a.cam == b.cam){
                    return a.me - b.me;
                }
                return a.cam == 'player' ? -1 : 1;
            }
            return b.spd - a.spd;
        });

    batC.actbar = combined;
    batC.acted = 0;

    // 新しいターンの、最初の奴の行動を開始！
    if(batC.actbar.length > 0){
        turnNext(batC.actbar[0]);
    }
}

// #endregion

// #endregion batt


//#region gamble
let gamD = document.getElementById('gamble');
let gamC = {
    open: 0,
    now: 'loby',
    moving: 0,
    togD: gamD.querySelector('.opener'),
    lobyD: gamD.querySelector('.loby'),
    blaD: gamD.querySelector('.blacky'),
    rouD: gamD.querySelector('.roulette'),

}
gamC.bashos = [
    {
        no: 1,
        name: "loby",
        color: "#f0f8ff",
    },
    {
        name: "blacky",
        color: "#f0f8ff"
    },
    {
        name: "rourou",
        color: "#f0f8ff"
    },
    {
        name: "forage",
        color: "#f0f8ff"
    }
]
let gamF = {};

gamF.load = () => {
    gamC.now = 'loby';

    let arr = gamC.bashos.filter(a => !a.no);
    for(let bas of arr){
        let div = document.createElement('div');
        div.className = `bt ${bas.name}`;
        
        let text = document.createElement('div');
         text.className = 'text';
         text.textContent = bas.name;
         div.appendChild(text);

        let img = document.createElement('img');
        // img.src = `assets/images/systems/${gam.name}.png`;
        img.src = `assets/images/systems/error.png`;
        div.appendChild(img);
        
        div.addEventListener('click', () => {
            gamF.move(bas.name);
        })

        gamC.lobyD.querySelector('.bashos').appendChild(div);
    }

    for(let tak of gamC.blaC.takushe){
        let div = El('div', `bt ${tak}`);
        div.textContent = tak;
        div.addEventListener('click', () => gamC.blaF.betSho(tak));

        gamC.blaC.shorD.appendChild(div);
    }
    gamC.blaF.tekiou();
    gamC.blaF.update();
}


gamF.move = (to) => {
    console.log(`[move] ${gamC.now} => ${to}`);
    if(gamC.now == to) return console.log('どういうわけか もう そこにいる');
	if(!to) return console.error(`せんぱ〜い？${to}ってどこですか〜？笑`);

	for(let a of gamC.bashos) gamD.querySelector(`.heya.${a.name}`).classList.remove('show');
    gamD.querySelector(`.heya.${to}`).classList.add('show');
    gamC.now = to;

    if(typeof gamF[to] == "function") gamF[to]();
}

//#region loby
//#endregion

//#region blacky
gamC.blaD = gamD.querySelector('.blacky');
gamC.blaC = {
    staD: gamC.blaD.querySelector('.start'),
    bacD: gamC.blaD.querySelector('.back'),

    hitD: gamC.blaD.querySelector('.bts .bt.hit'),
    stanD: gamC.blaD.querySelector('.bts .bt.stand'),
    douD: gamC.blaD.querySelector('.bts .bt.double'),

    bj: 21,
    bas: 17,
    ing: 0,
    wait: 0,
    stand: 0,

    bet: 0,
    betR: "min",
    betD: gamC.blaD.querySelector('.preing .bet .num'),
    takushe:["min", "1/8", "1/4", "1/2", "max"],
    shorD: gamC.blaD.querySelector(".preing .main .mono.shorts"),
    rangD: gamC.blaD.querySelector(".preing .main .mono.range"),

    upuD: gamD.querySelector('.upui'),
    diRD: gamD.querySelector('.upui .doo.diff .num'),
    bjRD: gamD.querySelector('.upui .doo.bj .num'),
    rate:{
        // 初期値
        diff: 1.50,
        bj: 2.00,

        //最小値
        min:{
            diff: 1.10,
            bj: 1.40
        },
    },

    sesD:{
        player: gamC.blaD.querySelector(".human.player .place"),
        dealer: gamC.blaD.querySelector(".human.dealer .place"),
    },
    gokD:{
        player: gamC.blaD.querySelector(".human.player .gok .num"),
        dealer: gamC.blaD.querySelector(".human.dealer .gok .num")
    },
    have:{
        player: [],
        dealer: [],
    },

    returnD: gamC.blaD.querySelector('.return')
}
gamC.blaF = {};

gamC.blaF.stext = (text = "おお、やるか？") => {
    gamC.blaC.staD.textContent = text;
}
gamC.blaF.btext = (text = "こんにちは。") => {
    gamC.blaC.bacD.textContent = text;
}

gamC.blaF.back = () => {
    if(gamC.blaC.ing ||
      !gamC.blaC.wait) return;
    
    gamC.blaC.wait = 0;
    gamC.blaD.classList.remove("ing")
    gamC.blaF.stext("っし、そろそろいくか？");
    gamC.blaF.btext("ご自由に");
}
gamC.blaC.bacD.addEventListener('click', gamC.blaF.back);

// #region Upper UI

gamC.blaF.update = () => {
    let rbj = gamC.blaC.rate.bj;
    let rdi = gamC.blaC.rate.diff
    gamC.blaC.bjRD.textContent = rbj.toFixed(2);
    gamC.blaC.diRD.textContent = rdi.toFixed(2);

    let bet = gamC.blaC.bet;
    gamC.blaC.betD.textContent = bet;
}

// #endregion

// #region pre ing
gamC.blaF.betSet = (num = 0) => {
    if(typeof num == "string") return console.error(`なんか、なんかnumが変です！！ {${num}}`);
    if(!num) console.log(`0っぽいけどだいじょうぶ？`)

    if(rimi < num) return console.error("多いっす。"), 1;
    
    gamC.blaC.bet = num; // == diff;
    gamC.blaF.update();

    return 0;
}
gamC.blaF.betKey10 = (code, which) => {
    // which: RならR Nならcodeをそのままbetに
    gamC.blaC.betR = 0;
    gamC.blaF.betSet(1);

    if(code == "min") code = 1, which = "N";
    switch(which){
        case "R": gamC.blaC.betR = code; break;
        case "N": gamC.blaF.betSet(code); break;
    }

    return 0;
}
gamC.blaF.betSho = (code = 0) => { //あれらを押された時の反応
    if(!code) return 1;
    if(typeof code == "number") code = code.toString();
    console.log(`code == ${code}`);

    gamC.blaF.betKey10(code, "R")

    console.log("shoのbetCalc実行！")
    let num = gamC.blaF.betCalc();
    gamC.blaF.betSet(num);
}
gamC.blaF.betCalc = () => {
    let bet = gamC.blaC.bet;
    let betR = gamC.blaC.betR;
    let 特別許可券 = 0;
    if(!betR && bet) 特別許可券 = 1;
    else if(!betR && !bet) return console.error("ど、どっちもないです...自分眠いんで寝ていいすか？"), 0;

    // takushe:["min", "1/8", "1/4", "1/2", "max"]
    let num = 0;
    jump:{
        if(betR == "min" || betR == "max" ||
           特別許可券) break jump;

        if(!betR.includes("/")) betR += "/1";
        let [A, B] = betR.split("/").map(a => {
            if(a == "min") return 1;
            if(a == "max") return rimi;
            return +a;
        });
        let Q = A/B;

        // let num = Math.floor((A*rimi) / B);
        num = Math.floor(rimi * Q);
    }

    if(betR == "max") num = rimi;
    if(betR == "min") num = 1;
    
    num = Math.max(1, Math.min(num, rimi));
    console.log(`[betCalc] bet == ${num}`)

    return num;
}
gamC.blaF.betHeler = async() => {
    console.log("helerのbetCalc実行！")
    let num = gamC.blaF.betCalc();

    if(rimi == 0){
        return logText("お客様？もうɌがございませんが...?"), 1;
        // 何度も押したらAll for Nothingにできる〜とか、そのうち作ってもいいかもね
    }
    else if(rimi < num){
        await logText("Ɍが足りないようでしたので、");
        await logText('**AllIn**、とさせていただきますね？');
        num = rimi;
    }

    gamC.blaF.betSet(num);
    let bet = gamC.blaC.bet;

    rimiF.dec(bet);

    return 0;
}

// #endregion

// #region to ing
gamC.blaF.tekiou = () => {
    let cams = ["player", "dealer"];
    for(let cam of cams){
        let hasD = gamC.blaC.sesD[cam];
        let has = gamC.blaC.have[cam];

        // hasDにカードを表示..毎回全消しして全生成するを何度もやる....?うっそー、絶対嘘、そうに決まってる....
        let all0 = hasD.querySelectorAll('.card').length;
        for(let i = all0; i < has.length; i++){
            gamC.blaF.add(cam, has[i]);
        }
        
        let gok = cardCalc(has, "bj");
        gamC.blaC.gokD[cam].innerText = gok;
    }
    
}
gamC.blaF.add = (cam, card) => {
    let hasD = gamC.blaC.sesD[cam];

    let num = El('div', 'atie num');
    num.textContent = card.num;
    num.dataset.val = card.val;

    let suit = El('div', 'atie suit')
    suit.textContent = card.suit;

    let div = El('div', 'card', [
        num,
        suit
    ]); //この書き方unityみたいで楽しい やったことないけど
    if(card.hide) div.classList.add("hide");
    
    div.dataset.india = card.india; //常に最新になるはず..?
    
    hasD.appendChild(div);

    return div;
}
gamC.blaF.rem = (cam, india) => {
    let hasD = gamC.blaC.sesD[cam];
    
    hasD.querySelector(`.card[data-india="${india}"]`)?.remove();

    return 0;
}

gamC.blaF.reset = () => {
    let cams = ["player", "dealer"];
    for(let cam of cams){
        gamC.blaC.sesD[cam].innerHTML = "";
        gamC.blaC.have[cam] = [];
    }

    gamC.blaC.stand = 0;

    gamC.blaF.tekiou();
}
gamC.blaF.start = async() => {
    if(gamC.blaC.ing) return 1;

    let res = gamC.blaF.betHeler(); //bet分rimiを減らす
    if(res) return 1; //減らせなかった場合

    gamC.blaC.ing = 1;
    gamC.blaC.wait = 1;
    gamC.blaD.classList.add("ing");


    gamC.blaF.reset();
    gamC.blaF.stext("おうよ、ま、がんばんな");
    gamC.blaF.btext("見てますね");

    let acts = [
        ["dealer"],
        ["dealer", 1],
        ["player"],
        ["player"]
    ]
    for(let act of acts){
        gamC.blaF.draw(...act);
        gamC.blaF.tekiou();
        await delay(500)
    }

    gamC.blaC.wait = 0;
    return 0;
}
gamC.blaC.staD.addEventListener('click', gamC.blaF.start)

gamC.blaF.draw = (cam, hide = 0, code = 0) => {
    if(!code || typeof code != "string") code = "";
    let [val0, suit0] = [0, 0]
    if(code.startsWith("指定:")){
        let arr = code.slice(3).split(',');
        if(arr[0]) val0 = +arr[0];
        if(arr[1]) suit0 = arr[1];
    }

    let has = gamC.blaC.have[cam];
    let gok = cardCalc(has, "bj");
    console.log(`[draw] ${cam}[${gok}]がカードを引くらしい`)

    if(code.startsWith("八百長")){
        let rest = gamC.blaC.bj - gok;
        if(code == "八百長") val0 = random(1, Math.min(rest, 13));
        else{
            let shetey = +code.slice(4);
            console.log(`[draw] おい、女王様は${shetey}をご所望だ`);
            rest = shetey - gok;
            if(rest < 0) console.log(`[draw] 無理だったでやんす`), val0 = 1;
            else{
                if(13 < rest) rest = 13;
                 val0 = rest;
            }
        }
    }
    
    let card = cardDraw(val0, suit0); //あっちでの基本引数は0, 0だから0, 0を入れても問題ないのだ
    if(hide) card.hide = 1; //dealerの2枚目、みたいな
    let all0 = has.length;
    card.india = all0
    
    has.push(card);
    souF.play('place');

    gamC.blaF.tekiou(); //適用関数
    console.log(`==> 値は${card.val}. 合計 becomes ${cardCalc(has, "bj")}`);

    return card;
}
gamC.blaF.onmyway = (cam, num = 0) => {
    if(!num) num = gamC.blaC.bj;

    let has = gamC.blaC.have[cam];
    let gok = cardCalc(has, "bj");

    let rest = num - gok;
    if(rest < 0) rest = -1;
    
    return rest;
}


gamC.blaF.hit = () => {
    if(gamC.blaC.stand ||
      !gamC.blaC.ing ||
       gamC.blaC.wait) return 1;

    let card = gamC.blaF.draw("player");
    gamC.blaF.tekiou();

    let gok = cardCalc(gamC.blaC.have["player"], "bj");
    let bj = gamC.blaC.bj;
    if(bj < gok) return gamC.blaF.stand(1), 1;

    return 0;
}
gamC.blaC.hitD.addEventListener('click', gamC.blaF.hit);

gamC.blaF.stand = async(owa = 0) => {
    if(gamC.blaC.stand ||
      !gamC.blaC.ing ||
       gamC.blaC.wait) return 1;
    gamC.blaC.stand = 1;

    jump:{
        if(owa) break jump;

        // dealer's turn
        let cam = "dealer";
        let bas = gamC.blaC.bas;
        let has = gamC.blaC.have[cam];
        let hasD = gamC.blaC.sesD[cam];
        has = cardUnwrap(has); //hideを解除
        
        let hasDs = hasD.querySelectorAll('.card');
        hasDs.forEach(a => a.classList.remove('hide'));

        let gok = cardCalc(has, "bj");
        gamC.blaF.tekiou();
        await delay(1000);

        while(gok <= bas){
            gamC.blaF.draw(cam);
            gok = cardCalc(has, "bj")
            await delay(500);
        }
    }

    gamC.blaF.judge();
}
gamC.blaC.stanD.addEventListener('click', () => gamC.blaF.stand(0));

gamC.blaF.double = () => {
    nicoText("まだ未実装だ、すまんな");
}
gamC.blaC.douD.addEventListener('click', gamC.blaF.double);

gamC.blaF.judge = () => {
    let bj = gamC.blaC.bj;
    let gokP = cardCalc(gamC.blaC.have["player"], "bj");
    let gokD = cardCalc(gamC.blaC.have["dealer"], "bj");

    if(gokP == bj) gamC.blaF.end("player", "bj");
    else if(gokD == bj) gamC.blaF.end("dealer", "bj");
    else if(bj < gokP) gamC.blaF.end("dealer", "burst");
    else if(bj < gokD) gamC.blaF.end("player", "burst");
    else{
        let diff = gokD - gokP
        if(0 < diff) gamC.blaF.end("dealer", "diff");
        if(diff < 0) gamC.blaF.end("player", "diff");
        if(diff == 0) gamC.blaF.end(0, "diff");
    }

    return 0;
}
gamC.blaF.end = async(cam = 0, yue = "error") => {
    console.log(`[end] ${0}が{${yue}}で勝利しました`);

    let mes = "";
    switch(cam){
        case "player":{
            if(yue == "bj") mes = "うーわ！うわーー！！！やってる！お兄さんやったね？？ついに！！";
            if(yue == "burst") mes = "ディーラーがバースト！お兄さんの勝ちだよ！";
            if(yue == "diff") mes = "お兄さんの勝ち！やるじゃん！"
        }
        break;

        case "dealer":{
            if(yue == "bj") mes = "あー......おにいさんやられたね、これは完全に仕組まれたね"
            if(yue == "burst") mes = "お兄さんがバースト！んまけ〜〜お兄さんのー？負け〜〜〜〜";
            if(yue == "diff") mes = "はいお兄さんの負け〜〜よわよわすぎ笑";
        }
        break;

        default:{
            if(yue == "diff") mes = "しょーもなーー......"
        }
    }

    let bet = gamC.blaC.bet;
    let rate = gamC.blaC.rate;
    let molie = 0;
    if(cam == "player"){
        if(yue == "bj") molie = bet * rate.bj
        else molie = bet * rate.diff;
        molie = Math.ceil(molie); //ceilは優しさ
    }
    if(cam == 0) molie = bet;
    rimiF.inc(molie);
    console.log(`[end] ${cam}が{${yue}}で勝利しました`);
    
    if(cam == "dealer"){
        let Ddiff = randomF(0.2, 0.4, 2);
        let Dbj = randomF(0.3, 0.5, 2);
        
        rate.diff += Ddiff;
        rate.bj += Dbj;
        console.log(`[rate] 倍率↑↑ diff:+${Ddiff} / bj:+${Dbj}`);
        
    }
    if(cam == "player"){
        let Ddiff = randomF(0.1, 0.3, 2);
        let Dbj = randomF(0.2, 0.4, 2);
        
        rate.diff = Math.max(1.10, rate.diff - Ddiff);
        rate.bj = Math.max(1.40, rate.bj - Dbj);
        console.log(`[rate] 倍率↓↓ diff:-${Ddiff} / bj:-${Dbj}`);
    }
    rate.diff = +rate.diff.toFixed(2); //小数点以下は2桁まで
    rate.bj = +rate.bj.toFixed(2);
    gamC.blaF.update();
    
    await logText(mes, "gamble");
    gamC.blaC.wait = 1;
    gamC.blaC.ing = 0;
    gamC.blaF.stext("もっかいやるか？");
    gamC.blaF.btext("ん、戻りますか？");
}
// #endregion


gamC.blaC.returnD.addEventListener('click', () => {
    if(gamC.blaC.ing || gamC.blaC.wait) return 1;
    gamF.move("loby");
});

//#endregion

// #region rourou
gamC.rouD = gamD.querySelector('.rourou');
gamC.rouC = {
    ing: 0,
    wait: 0,

    returnD: gamC.rouD.querySelector('.return')
}
gamC.rouF = {};

gamC.rouC.returnD.addEventListener('click', () => {
    if(gamC.rouC.ing || gamC.rouC.wait) return 1;
    gamF.move("loby");
});

// #endregion

// #region forage

/*

先に概要。
「森でキノコを採ろう!!」
*[水上都市]「（名称未定）」の裏の薄暗い店の一角にあるマシン。安っぽいロゴ*
キノコが10個あるので、そこからキノコを採ろうというゲーム。1つ取るたびに倍率が上がる
しかし、触れるだけで毒を出すキノコもある。それに触れたらゲームオーバー、倍率が0になる
（"ハズレキノコ"はそれとしてあるわけではない。最大獲得個数というものが定められていて、それが確率。ゆえに触れるたびに判定ではない）

*/

gamC.forD = gamD.querySelector('.forage');
gamC.forC = {
    gamenD: gamC.forD.querySelector('.gamen'),
    starteD: gamC.forD.querySelector('.gamen .dimee.started'),
    honD: gamC.forD.querySelector('.gamen .dimee.hondie'),
    mushsD: gamC.forD.querySelector('.gamen .dimee.hondie .mushes'),
    daiD: gamC.forD.querySelector('.gamen .dai'),
    irelD: gamC.forD.querySelector('.gamen .dai .irel'),
	 autoD: gamC.forD.querySelector(".gamen .dai .irel .auto"),
    otsuD: gamC.forD.querySelector('.gamen .dai .otsu'),
    dispD: gamC.forD.querySelector('.gamen .dai .disp'),
    btD: gamC.forD.querySelector('.gamen .dai .bottan'),
    getoutD: gamC.forD.querySelector('.gamen .dai .getout'),
    getoutID: gamC.forD.querySelector('.gamen .dai .getout img'),

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

    returnD: gamC.forD.querySelector('.return')
}
gamC.forF = {};

gamC.forC.returnD.addEventListener('click', () => {
    if(gamC.forC.ing || gamC.forC.wait) return 1;
    gamF.move("loby");
});

gamC.forF.update = () => {
    let bet = gamC.forC.bet;
    let disp = String(bet).padStart(9, "0");

    let dispD = gamC.forC.dispD;
    dispD.innerHTML = disp.split('').map(a => `<div>${a}</div>`).join('');
}

gamC.forF.gamenCH = (name) => {
    for(let ch of gamC.forC.gamens){
        if(ch == name) gamC.forC.gamenD.classList.add(ch);
        else gamC.forC.gamenD.classList.remove(ch);
    }
}
gamF.forage = () => {
    // enter
    gamC.forF.update();
}

gamC.forF.irel = () => {
    // ここでエフェクトを
    if(rimi < 100) return tobiText(gamC.forC.irelD, "金欠乙");

    gamC.forC.bet += 100;
    rimiF.dec(100);
    gamC.forF.update();
}
gamC.forC.irelD.addEventListener('click', gamC.forF.irel);
gamC.forF.irelAuto = () => {
	if(!gamC.forC.autoIrelF){
		gamC.forC.irelD.classList.add("activate");
		gamC.forC.autoIrelF = setInterval(() => {
			gamC.forF.irel();
		}, gamC.forC.autoRate)
	}
	else{
		gamC.forC.irelD.classList.remove("activate");
		clearInterval(gamC.forC.autoIrelF);
		gamC.forC.autoIrelF = null;
	}
}
gamC.forC.autoD.addEventListener("click", gamC.forF.irelAuto);

gamC.forC.otsuD.addEventListener('click', () => {
    let ryou = gamC.forC.bet;
    gamC.forC.bet = 0;
    gamC.forF.update();

    gamC.forF.getout_set(ryou);
})

gamC.forF.bt = () => {
    if(!(gamC.forC.ing || gamC.forC.wait)) gamC.forF.start();
    else gamC.forF.dropout();
    
}
gamC.forC.btD.addEventListener('click', gamC.forF.bt);

gamC.forF.start = async() => {
    if(gamC.forC.ing || gamC.forC.wait) return 1;

    gamC.forC.rate = 1.0;
    gamC.forC.took = 0;
    gamC.forC.timer = new Timer(0, 1, 1);

    let bet = gamC.forC.bet;
    if(bet <= 0) return nicoText("コインを入れてねっ♡")
    
    gamC.forC.ing = 1;
    gamC.forF.mushSet(10);
    gamC.forF.gamenCH('hondie');
    
    gamC.forC.wait = 1;
    await gamC.forF.mushPlace();
    gamC.forC.wait = 0;

    gamC.forC.timer.start();
    return 0;
}


gamC.forF.mushSet = (num = 10) => {
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
    

    gamC.forC.cantake = cantake;
    
    console.log(`[mushSet] 今回のアカキノコは${cantake}個です`);
    if(cantake == 10) console.warn(`[mushSet] ん、10個？5.63%？？？`), console.warn(`[mushSet] いやまあ...ブルアカの☆3の確率3%よりは良い方か`);

    return 0;
}
gamC.forF.mushPlace = () => {
    let div0 = gamC.forC.mushsD;
    div0.innerHTML = "";

    let placed = [];
    for(let i=0; i<10; i++){
        let div = document.createElement('div');
        div.className = 'mush';
         let img = images.systems["mush"].cloneNode();
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
            gamC.forF.mushGet();
            div.remove();
        });

        let acessment = "assets/images/systems/"
        div.addEventListener("pointerenter", () => img.src = `${acessment}mush_high.png`);
        div.addEventListener("pointerleave", () => img.src = `${acessment}mush.png`);

        div0.appendChild(div);
    }

    console.log(`[mushPlace] 配置完了。ご自由に、どうぞ？`)

    return 0;
}
gamC.forF.mushGet = () => {
    if(gamC.forC.wait) return;

    gamC.forC.took += 1;
    let tim = gamC.forC.timer.time;

    let took = gamC.forC.took;
    let cantake = gamC.forC.cantake;
    console.log(`[mushGet] ${took}/${cantake} (思考時間:${tim/100}s)`);

    if(cantake < took) return gamC.forF.sprayed();

    let up = random(5, 15)*0.1;
    let moto = gamC.forC.rate;
    gamC.forC.rate = Math.ceil((moto + up) *10) /10;


    console.log(`[mushGet] rate上昇↑↑ ${moto} => ${gamC.forC.rate}`);
    let alD = new alertD(`rate上昇↑↑ ${moto} => ${gamC.forC.rate}`);
    alD.appear();
    // ↑一旦の策

    gamC.forC.timer.reset();
}



gamC.forF.sprayed = () => {
    console.log(`[sprayed] 毒、噴射: ${gamC.forC.rate} => 0.0`);
    gamC.forC.rate = 0.0;
    kirameki(gamC.forC.btD);
    gamC.forF.dropout(1);
}
gamC.forF.dropout = (code = 0) => {
    if(!gamC.forC.ing) return 1;

    let rate = gamC.forC.rate;
    let bet = gamC.forC.bet;
    if(code == 0) console.log(`[dropout] 降りました！rateは${rate}, betは${bet}`);

    let get = Math.ceil(bet*rate);
    if(0 < get) gamC.forF.getout_set(get);

    gamC.forF.end();
}
gamC.forF.end = () => {
    gamC.forF.gamenCH("started");
    gamC.forC.ing = 0;
    gamC.forC.bet = 0;
    gamC.forC.timer.share();
     gamC.forC.timer = null;
    gamC.forF.update();
}

gamC.forF.getout_set = (ryou) => {
    // imgをgetout.png→getout_coin.pngにする。そしてdivが押されたら...imgをgetout.ongに戻し、rimiF.inc(ryou)をする

    let img = gamC.forC.getoutID;

    img.src = "assets/images/systems/getout_coin.png";
    gamC.forC.getout += ryou;
}
gamC.forF.getout_get = () => {
    let getout = gamC.forC.getout;
    if(typeof getout == "number" && getout <= 0) return;

    rimiF.inc(getout);
    console.log(`[getout] Ɍ${getout}を受け取りました`)

    let img = gamC.forC.getoutID;
    img.src = "assets/images/systems/getout.png";
    
    gamC.forC.getout = 0;
}
gamC.forC.getoutD.addEventListener('click', gamC.forF.getout_get);


// #endregion

//#endregion　リヴァーサル/syudou



//#region start
function start(){
    Style.tekiou();
    OBS.load();

    mainF.load();
    gamF.load();

    rimiF.inc(255)

    mainF.move('home');
}
//#endregion

//#region DOM
let LoadOfWait = async() => await loaF.load();
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", init);
}
else init();

async function init(){
    SpeciusLight(); //とくべちゅ、しよ？
    await LoadOfWait();
}
//#endregion



let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if(now - lastTouchEnd <= 300){
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);