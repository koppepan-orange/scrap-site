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

    switch(to){
        case "bato":
            batF.prepare();
            break;
        
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

function findGeneric(list, type, name, extraCheck = null){
    let data;
    if(extraCheck) data = extraCheck(list, name);
     else data = list.find(a => a.name == name || a.jpnm == name);
    if(data) return data;
    
    console.log(`[find] ${type}で、「${name}」っていうものはないらしいです`);
    return 0;
}
// const findKaris = (name) => findGeneric(Karis, "Karis", name);

let lobD = document.getElementById("loby");
let lobC = {
    //やりたいこと: 戦闘遷移、パーティ編成、ガチャ...だけかな。育成はなし、カジノもなし
    Ds:{
        bat: lobD.querySelector(".bat"),
        party: lobD.querySelector(".party"),
    },

    party:[],
}
let lobF = {};

lobF.load = () => {
    //初期セットアップ
    for(let i=0; i<4; i++){
        let chara = Charas.filter(a => !a.no)[i];
        lobC.party.push(chara.name);
    }
}

lobF.bat = () => {
    //if(lobC.party.length <= 0) return 
    mainF.move("bato");
}


let batD = document.getElementById("bato");
let batC = {

}
let batF = {};
class batA_human{
    constructor(cam, data = {}){
        if(!cam) return 0;
        this.id = batC.hs.length;
        this.cam = cam;

        for(let stat of Stats){
            let name = stat.name;
            this[name] = data[name] ?? stat.bas; //??なら0は0として通すはず
        }

        this.buffs = [];
        this.equips = [];
        
        if(cam == "player" && !data.name) return 0;
        if(cam == "enemie" && !data.name){
            let arr = Enemies.filter(a => a.live.include("all") || a.live.include(batC.stage));
            data.name = arraySelect(arr);
        }
        this.name = data.name;
        if(cam == "player") this.data = findChara(this.name);
        if(cam == "enemie") this.data = findEnemie(this.name);


        this.add();
    }
    add(){
        batC.hs.push(this); //thisにまたdiv追加したり編集したらちゃんとhsの方にも伝わるよな.....?   
    }

    make(){

    }
}
batF.prepare = () => {
    let list = copy(lobC.party);

}


//#region start
function start(){
    Style.tekiou();
    OBS.load();

    mainF.load();

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

