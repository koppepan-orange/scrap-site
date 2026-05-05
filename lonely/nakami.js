//#region komagome
function delay(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
};
async function nicoText(mes){
    let newDiv = document.createElement('div');
    newDiv.textContent = mes;
    newDiv.className = 'nicotext';
    newDiv.style.top = `calc(${random(0, 100)}vh - 20px)`;
    newDiv.style.right = '0px';
    document.querySelector('body').appendChild(newDiv);

    requestAnimationFrame(() => newDiv.style.right = `${window.innerWidth + newDiv.offsetWidth}px`);
    
    await delay(2000); 
    newDiv.remove();
};
function tobiText(youso, mes) {
    let el = youso;
    if(typeof el == 'string') el = document.querySelector(youso);
    if(!el) return console.error('せんぱ〜い？この要素壊れてますよ〜〜？');

    let rect = el.getBoundingClientRect();
    let left = rect.left + window.scrollX + rect.width / 2;
    let top = rect.top + window.scrollY + rect.height / 2;

    let node = document.createElement('div');
    node.className = 'tobitext';
    node.textContent = mes;
    node.style.top = `${top}px`;
    node.style.left = `${left}px`;

    document.body.appendChild(node);

    let duration = 1200;
    let distance = -48;
    let jitter = (Math.random() - 0.5) * 10;

    let start = performance.now();

    let easeOutCubic = (t) => {return 1 - Math.pow(1 - t, 3)};

    function frame(now){
        let t = Math.min(1, (now - start) / duration);
        let e = easeOutCubic(t);
        let tsY = distance * e;
        let tsX = jitter * (1 - e);
        node.style.transform = `translate(-50%, -50%) translateY(${tsY}px) translateX(${tsX}px)`;
        node.style.opacity = String(1 - t);
        if(t < 1) requestAnimationFrame(frame);
        else node.remove();
    };

    requestAnimationFrame(frame);
};
function kaijou(num){
    if(num == 0) return 0;
    if(num == 1) return 1;
    return num * kaijou(num - 1);
};
function kaikyu(sta, end, row, val){
    if(typeof sta != 'number' || typeof end != 'number' || typeof row != 'number' || typeof val != 'number') return console.error('えっと、できれば..引数は全て数字にして欲しい...です......');
    if(row <= 0) return console.error(`row${row}でしたけど...大丈夫ですか？`);
    if(sta > end) return console.error('え、えっと...多分、逆です......');
    if(val < sta || val > end) return console.error('こ、この値..枠から外れてます....');

    let kari = Math.floor((val-sta) / row);
    let sta2 = sta + kari*row;
    let end2 = sta + row-1;
    if(end2 > end) end2 = end;

    let arr = [];
    for(let i = sta2; i <= end2; i++) arr.push(i);

    return arr;
};
function arraySelect(array){
    let select = Math.floor(Math.random()*array.length);
    return array[select];
};
function arrayShuffle(array) {
    for(let i = array.length - 1; i > 0; i--) {
        let i2 = Math.floor(Math.random() * (i + 1));
        [array[i], array[i2]] = [array[i2], array[i]];
    };
    return array;
};
function arraySize(array){
    let res = new Set(array).size;
    return res;
};
function arrayCount(array){
    let counts = {};
    for(let value of array){
        counts[value] = (counts[value] || 0) + 1;
    };
    return counts;
};
function arrayMult(array){
    return array.reduce((a, v) => a * v, 1);
};
function arrayGacha(array, prob){
    if(array.length != prob.length) throw new Error("長さがあってないっす！先輩、ちゃんとチェックした方がいいっすよ〜？");
    let total = prob.reduce((sum, p) => sum + p, 0);
    let random = Math.random() * total;
    for (let i = 0; i < array.length; i++){
        if(random < prob[i]) return array[i];
        random -= prob[i];
    };
};
function hask(obj, key){
    let res = obj.hasOwnProperty(key);
    res = res ? 1 : 0;
    return res;
};
function copy(moto) {
    if(Array.isArray(moto)){
        let arr = [];
        for(let i = 0; i < moto.length; i++){
            arr.push(copy(moto[i]));
        }
        return arr;
    }else if(moto != null && typeof moto == 'object'){
        let obj = {};
        for(let key in moto){
            if(moto.hasOwnProperty(key)){
                obj[key] = copy(moto[key]);
            }
        };
        return obj;
    }else{
        return moto;
    };
};
function probability(num){
    return Math.random()*100 <= num;
    //例:num == 20 → randomが20以内ならtrue,elseならfalseを返す
};
function random(min, max){
    if(max < min) [min, max] = [max, min];
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return Math.floor(num);
};
function fl(val, arr = [0, 1]){
    let res = val == arr[0] ? arr[1] : arr[0];
    return res;
};
function anagramSaySay(text, loop = 10, bet = '<br>'){
    let menjo = 0;
    let len = text.length;
    if(len < 4) menjo = 1, console.log('長さが3以下なんで最大6っす');
    
    let optout = text.split('');
    let optcou = arrayCount(optout);
    let optvals = [];
    for(a of Object.keys(optcou)){
        let b = optcou[a];
        b = kaijou(b);
        optvals.push(b);
    };
    let optmat = arrayMult(optvals);
    let cal = (kaijou(len) / optmat) - 1;

    let loopen = loop;
    // console.log(`総数:${cal} 回数:${loopen}`);
    if(cal < loopen) menjo = 1;
    
    let reses = [];
    while(loopen > 0){
        loopen -= 1;
        let res = arrayShuffle(optout).join(''); 
        if(reses.includes(res)){loopen += 1; continue};
        
        if(res == text && !menjo){loopen += 1; continue;}

        if(res == text && menjo && reses.length < cal){loopen += 1; continue}
        else if(res == text && menjo) res = '[重複エラー]';

        reses.push(res);
    };
    
    return reses.join(bet);
};
function anagramCan(mae, ato){
    if(mae.length != ato.length) return 0;

    let count = {};
    for(let ch of mae) count[ch] = (count[ch] || 0) + 1;

    for(let ch of ato){
        if(!count[ch]) return 0;
        count[ch] -= 1;
    };

    return 1;
};
function setLocalStorage(name, value){
    localStorage.setItem(name, value || "");
};
function getLocalStorage(name){
    return localStorage.getItem(name);
};
async function error(text = 'errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'){
    addtext(text);
    await delay(2000);
    // window.open('about:blank', '_self').close();
};
function hoshoku(color){
    color = color.replace(/^#/, '');

    if(color.length != 6) return console.log('カラーコードは6桁、ですよ〜？楽しないでくださいね♪');

    let r = parseInt(color.slice(0, 2), 16);
    let g = parseInt(color.slice(2, 4), 16);
    let b = parseInt(color.slice(4, 6), 16);

    let compR = (255 - r).toString(16).padStart(2, '0');
    let compG = (255 - g).toString(16).padStart(2, '0');
    let compB = (255 - b).toString(16).padStart(2, '0');

    let ato = `#${compR}${compG}${compB}`;

    return ato;
};
function mixshoku(c1, c2, ratio = 0.5){
    let toRGB = c => {
        c = c.replace('#', '');
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        let n = parseInt(c, 16);
        return [n >> 16, (n >> 8) & 255, n & 255];
    };

    let [r1, g1, b1] = toRGB(c1);
    let [r2, g2, b2] = toRGB(c2);

    let r = Math.round(r1 + (r2 - r1) * ratio);
    let g = Math.round(g1 + (g2 - g1) * ratio);
    let b = Math.round(b1 + (b2 - b1) * ratio);

    let ato = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

    return ato;
};
function ranshoku(){
    let r = random(0, 255);
    let g = random(0, 255);
    let b = random(0, 255);
    let ato = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    return ato;
};
//#endregion
//#region log&text
let textDiv = document.querySelector('#text');
let autoDelay = 1;
let skipText = false;
let clearText = false;
let textShowing = 0;

function colorcheck(rawtext) {
    let text = [];
    let color = null;
    let colors = [
        {
            name: 'red',
            sym: '*',
            col: '#ff4040'
        },
        {
            name: 'pink',
            sym: '&',
            col: '#ff80bf'
        },
        {
            name: 'yell',
            sym: '^',
            col: '#ffff40'
        }
    ];

    for(let i = 0; i < rawtext.length; i++){
        let sym = false;
        for(let c of colors){
            if(rawtext[i] == c.sym && rawtext[i + 1] == c.sym){
                console.log(`→${rawtext[i]}← 発見！ ${c.name}色です`);
                color = color ? null : c.col;
                i++;
                sym = true;
                break;
            }
        };

        if(sym) continue;
        if(color) console.log(color);
        text.push({
            char: rawtext[i],
            color: color
        });
    }
    return text;
};

let queueAddtext = [];
let loopAddtext = 0;
async function waitforAddtext(){
    let len = queueAddtext.length;

    if(len == 0) loopAddtext = 0;
    else loopAddtext = 1;

    if(!loopAddtext) return console.log('loopがないんでしゅーりょー');
    requestAnimationFrame(waitforAddtext);

    if(textShowing) return console.log('文字表示されたんでスキップ');
    
    let raw = queueAddtext.shift();
    // console.log(`${raw}を送信します`);
    // console.log(`残り: (${len - 1})[${queueAddtext}]`);
    await addtext(raw);
};
async function addtext(raw){
    if(!raw) return console.log('「内容が？内容が〜〜？ないよ〜〜〜つってwwww直せ」');

    if(textShowing){
        queueAddtext.push(raw);

        if(!loopAddtext) waitforAddtext();
        return;
    };
    
    textShowing = 1;
    text = colorcheck(raw);
    textDiv.innerHTML = "";
    textDiv.style.display = "block";
    let index = 0;
    clearText = false;

    return new Promise((resolve) => {
        async function type(){
            if(index < text.length){
                if(skipText){
                    while (index < text.length) {
                        let span = document.createElement("span");
                        span.textContent = text[index].char;
                        if(text[index].color) span.classList.add(`color-${text[index].color}`);
                        textDiv.appendChild(span);

                        index++;
                    }
                    index = text.length;
                    skipText = false;
                    setTimeout(type, 10);
                }else{
                    let span = document.createElement("span");
                    span.textContent = text[index].char;
                    if(text[index].color) span.classList.add(`color-${text[index].color}`);
                    textDiv.appendChild(span);

                    index++;
                    setTimeout(type, 80); // 次の文字を表示する間隔
                }
            }else{
                addlog(textDiv.innerHTML);
                let waitTime = autoDelay * 1000;
                let timeout = new Promise(resolve => setTimeout(resolve, waitTime));
                let userAction = new Promise(resolve => {
                    function waitToClear(event) {
                        if(event.type === 'click' || event.key === 'z' || event.key === 'Enter'){
                            document.removeEventListener('click', waitToClear);
                            document.removeEventListener('keydown', waitToClear);
                            resolve();
                        }
                    }
                    document.addEventListener('click', waitToClear);
                    document.addEventListener('keydown', waitToClear);
                });

                Promise.race([timeout, userAction]).then(() => {
                    textDiv.textContent = "";
                    textDiv.style.display = "none";
                    clearText = true;
                    skipText = false
                    textShowing = 0;
                    resolve('end');
                });
            }
        };
        type();
    });
};
document.addEventListener('keydown', (e) => {
    if(e.key === 'z' || e.key === 'Enter'){
        skipText = true;
    }
});
document.addEventListener('keyup', (e) => {
    if(e.key === 'z' || e.key === 'Enter'){
        skipText = false;
    }
});
document.addEventListener('click', () => {
    skipText = true;
    setTimeout(() => skipText = false, 50); // 一時的にスキップを有効化
});

let logOOmoto = document.querySelector('#log');
let log = document.querySelector('#log .log');
let logOpener = document.querySelector('#log .opener');
let log_open = (code = NaN) => {
    jump:{
        if(!isNaN(code)) break jump;

        logOOmoto.classList.toggle('tog');
        logOpener.textContent = logOOmoto.classList.contains('tog') ? '<' : '>';
        return;
    };

    if(code == 1){
        logOOmoto.classList.add('tog');
        logOpener.textContent = '<';
    };
    if(code == 0){
        logOOmoto.classList.remove('tog');
        logOpener.textContent = '>';
    };

};
logOpener.addEventListener('click', log_open);

function addlog(text){
    log.innerHTML += text + '<br>';
    log.scrollTop = log.scrollHeight;
};
//#endregion
//#region description
/*
要素に、data-descriptionをつけると、その要素にホバーした時に指定した文字列を表示させられます。
ステータスとかバフの詳しい説明用とかに良き
*/
let mobileDesc = document.getElementById('mobileDesc');
document.addEventListener('mousemove', (e) => {
    mobileDesc.style.left = `${e.clientX + 10}px`;
    mobileDesc.style.top = `${e.clientY + 10}px`;
});
document.addEventListener('mouseover', (e) => {
    let descTarget = e.target.closest('[data-description]');
    if(descTarget){
        let desc = descTarget.dataset.description;
        mobileDesc.innerText = desc;
        mobileDesc.classList.add('show');
    }
});
document.addEventListener('mouseout', (e) => {
    let descTarget = e.target.closest('[data-description]');
    if(descTarget){
        mobileDesc.innerText = '';
        mobileDesc.classList.remove('show');
    }
});
//#endregion
//#region draggable
document.addEventListener('mousedown', e => {
    // let descTarget = e.target.closest('[data-description]');
    let div = e.target;
    
    if(!div.classList.contains('draggable')) return;
    offsetX = e.clientX - div.getBoundingClientRect().left;
    offsetY = e.clientY - div.getBoundingClientRect().top;
    
    function onMouseMove(e){
        div.style.left = `${e.clientX - offsetX}px`;
        div.style.top = `${e.clientY - offsetY}px`;
    };

    function onMouseUp(){
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});
//#endregion 
//#region tk
class tk{
    letructor(type, x = 'half', y = 'half', w = window.innerWidth/2, h = window.innerWidth/2){
        let youso = document.createElement(type);
        youso.className = `tk ${type}`;

        let yoko = ['x', 'w'];
        for(let n of yoko){
            if(typeof eval(n) != 'string' || typeof eval(n) == 'string' && !eval(n).endsWith('%')) continue;
            let num = eval(n).slice(0, -1);
            eval(n) = num * window.innerWidth / 100;
        };

        let tate = ['y', 'h'];
        for(let n of tate){
            if(typeof eval(n) != 'string' || typeof eval(n) == 'string' && !eval(n).endsWith('%')) continue;
            let num = eval(n).slice(0, -1);
            eval(n) = num * window.innerHeight / 100;
        };

        console.log(x, y, w, h);

        youso.style.width = `${w}px`;
        youso.style.height = `${h}px`;

        youso.style.left = `${x}px`;
        youso.style.top = `${y}px`;
        
        if(x == 'half' && y == 'half') youso.classList.add('cenXY');
         else if(x == 'half') youso.classList.add('cenX');
         else if(y == 'half') youso.classList.add('cenY');

        this.youso = youso;
    };

    attrAdd(dict = 'none'){
        if(dict == 'none') return;
        
        if(typeof dict == 'string'){
            //attr: nanka
            let [key, val] = dict.split(':');
             key = key.trim();
             val = val.trim();
            this.youso.setAttribute(key, val);
            return 0;
        };

        if(typeof dict != 'object') return 1;

        for(let key in dict) this.youso.setAttribute(key, dict[key]);

        return 0;
    };

    styleAdd(dict){
        for(let key in dict) this.youso.style[key] = dict[key];
    };

    classAdd(name){this.youso.classList.add(name)};
    classRem(name){this.youso.classList.remove(name)};
    classTog(name){this.youso.classList.toggle(name)};
    classHas(name){
        let is = this.youso.classList.contains(name);
        return is;
    };

    evAdd(type, func){
        this.youso.addEventListener(type, func);
    };

    yousoAdd(youso){
        this.youso.appendChild(youso);
    };

    append(){
        document.body.appendChild(this.youso);
    };

    remove(){
        this.youso.remove();
    };
}

function tkTest(){
    let mono = new tk('div', 'half', 'half');
    mono.classAdd('draggable');
    mono.styleAdd({background: '#f0f8ff'});

    let mono2 = new tk('div', 'half', 'half');
    mono2.styleAdd({background: '#cfe9ff'});

    mono.yousoAdd(mono2.div);

    mono.evAdd('click', () => nicoText('clicked'));

    mono.append();
};

//#endregion
//#region alertD
class alertD{
    constructor(text, elses = {}){
        this.text = text;
        for(let key in elses) this[key] = elses[key];
        /*
            back: 背景色
            barc: barの色
            time: 消えるまでの時間[s]
            data-...: data-...をそのままsetAttribute
        */

        this.datas = [];
        //data-を
        for(let key in elses){
            if(!key.startsWith('data-')) continue;
            this.datas.push({key: key, val: elses[key]});
        }
    };
    x(aru){
        this.x = aru;
    };
    appear(){
        let back = this.back || '#ffffff';
        let barc = this.barc || '#80ff80';

        let div = document.createElement('div');
        div.classList.add('alertD');
        div.style.background = back;
        div.style.boxShadow = `${hoshoku(back)} 5px 5px 20px`;

        let row = document.createElement('div');
        row.classList.add('row');
         let icon = document.createElement('div');
         icon.classList.add('icon');
         icon.style.background = barc;
         icon.style.color = back;
         icon.textContent = '！';
         row.appendChild(icon);

         let text = document.createElement('div');
         text.innerText = this.text;
         text.style.color = hoshoku(back);
         row.appendChild(text);
        div.appendChild(row);

        let x = document.createElement('div');
        x.className = 'x';
        x.innerText = '×';
        x.style.color = hoshoku(back);
        x.addEventListener('click', () => this.delete());
        div.appendChild(x);
        
        let bar = document.createElement('div');
        bar.classList.add('bar');
         let inner = document.createElement('div');
         inner.classList.add('inner');
         inner.style.background = barc;
         bar.appendChild(inner);
        div.appendChild(bar);

        //data
        for(let data of this.datas){
            div.setAttribute(data.key, data.val);
        }

        document.body.appendChild(div);
        this.div = div;

        setTimeout(() => {
            div.classList.add('show');
        }, 100);

        // pointerが乗ってる間はthis.loopを0にする
        div.addEventListener('pointerenter', () => this.loop = 0);
        div.addEventListener('pointerleave', () => this.loop = 1);

        let time = 0;
        let limit = 500;
         if(this.time) limit = this.time*100;
        this.loop = 1;
        this.interval = setInterval(() => {
            if(this.loop) time++;
            inner.style.width = `${time/limit*100}%`;
            
            if(time == limit) this.delete();
        }, 10);
    };
    delete(){
        clearInterval(this.interval);
        let div = this.div;
        div.classList.remove('show');
        setTimeout(() => div.remove(), 1000);
    };
};
//#endregion
//#region observer
let keys = {};
document.addEventListener('keydown', e => {
    let key = e.key.toLowerCase();
    if(e.key == ' ') key = 'space';
    keys[key] = true;
});
document.addEventListener('keyup', e => {
    let key = e.key.toLowerCase();
    if(e.key == ' ') key = 'space';
    keys[key] = false;
});

let clicking = false;
let cricking = false;
document.addEventListener('pointerdown', (e) => {
    if(e.buttons == 0) clicking = true;
    if(e.buttons == 2) cricking = true;
});
document.addEventListener('pointerup', (e) => {
    if(e.buttons == 0) clicking = false;
    if(e.buttons == 2) cricking = false;
});
document.addEventListener('pointercancel', (e) => {
    if(e.buttons == 0) clicking = false;
    if(e.buttons == 2) cricking = false;
});
window.addEventListener('blur', () => {clicking = cricking = false});

let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
//#endregion
//#region fonts
const Fonts = [
    {src:'misaki', type:'ttf'},
    {src:'cube12', type:'ttf'},
    {src:'starrysky', type:'otf'},
];
function fontsLoad(){
    let id = "font_load_css";
    let existing = document.getElementById(id);
    if(existing) existing.remove();

    let css = Fonts.map(f => {
        let src = `url('assets/fonts/${f.src}.${f.type}')`;
        let weight = f.weight ?? 'normal';
        return `@font-face{
            font-family:'${f.src}';
            src: ${src};
            font-weight: ${weight};
            font-style: normal;
            font-display: swap;
        }`;
    }).join('\n');

    let el = document.createElement('style');
    el.id = id;
    el.type = 'text/css';
    el.appendChild(document.createTextNode(css));
    document.head.appendChild(el);
}
fontsLoad();
//#endregion

document.addEventListener('contextmenu', e => e.preventDefault()); //今回は使い所がないので禁止

let main = document.getElementById('main');
let areC = {
    now:null
}
let areF = {};
areF.move = (to) => {
    console.log(`[move] ${areC.now} => ${to}`);
    areC.now = to;
    
    main.querySelectorAll('.area').forEach(el => el.classList.remove('show'));
    main.querySelector(`#${to}.area`).classList.add('show');
}

// #region title
let titD = document.getElementById('title');
let titC = {
    startD: titD.querySelector('.start'),
    achD: titD.querySelector('.achieve'),
    setD: titD.querySelector('.set'),
}
let titF = {};
titC.startD.addEventListener('click', () => {areF.move('select')});
// #endregion

// #region select
let seleD = document.getElementById('select');
let seleC = {
    listD: seleD.querySelector('.list'),
}
seleC.list = [
    {
        name:"2x2",
        level:"☆☆☆★★",
        desc:'最初はこれをやってみよう！\n慣れないうちは絶対戸惑うと思う'
    },
    {
        name:"3x3",
        level:"☆★★★★",
        desc:'2x2には慣れたかい？じゃあこちらを！\n難易度があほほど上がるので注意\n'
    },
    {
        name:"4x4",
        level:"★★★★★",
        desc:'んも〜〜ここをマスターできたらあんたは天才だ\nちなみに作者のハイスコアは2です'
    }
]
let seleF = {};
seleF.load = () => {
    for(let sele of seleC.list){
        let div = document.createElement('div');
        div.className = `sele s_${sele.name}`;

        div.innerHTML = `
            <div class="upper">
                <div class="name">${sele.name}</div>
                <div class="column">
                    <div class="high">${NaN}</div>
                    <div class="level">${sele.level}</div>
                </div>
            </div>

            <div class="under">
                <div class="desc"></div>
                <div class="start">Go</div>
            </div>
        `
        div.querySelector('.desc').innerText = sele.desc;

        div.querySelector('.upper').addEventListener('click', () => seleF.tog(sele.name));

        div.querySelector('.start').addEventListener('click', () => {
            areF.move('play');
            plaF.start(sele.name);
        });

        seleC.listD.appendChild(div);
    }
}
seleF.tog = (name) => {
    seleC.listD.querySelectorAll('.tog').forEach(el => el.classList.remove('tog'));
    seleC.listD.querySelector(`.sele.s_${name}`).classList.add('tog');
}
// #endregion

// #region play
let plaD = document.getElementById('play');
let plaC = {
    upperD: plaD.querySelector('.upper'),
     nameD: plaD.querySelector('.upper .name'),
     timeD: plaD.querySelector('.upper .time'),
     scoreD: plaD.querySelector('.upper .score'),
    mainD: plaD.querySelector('.main'),
     dotsD: plaD.querySelector('.main .dots'),
     numsD: plaD.querySelector('.main .nums'),
    logD: plaD.querySelector('.log'),

    time: 0,
    timer: null, //eventListener

    list:[]
}
let plaF = {};

plaF.timer = (code) => {
    if(!code) return console.log('codeがないですわ〜〜！！')
    switch(code){
        case 'tekiou':{
            let [hun, byo] = [plaC.time%60, Math.floor(plaC.time/60)]
                .map(a => a.toFixed(0).padStart(2, '0'));
            plaC.timeD.textContent = `${byo}:${hun}`;
            break;
        }

        case 'start':{
            plaC.timer = setInterval(() => {
                plaC.time += 1;
                plaF.timer('tekiou');
            }, 1000);
            break;
        }

        case 'stop':{
            if(plaC.timer) clearInterval(plaC.timer);
            break;
        }

        case 'reset':{
            if(plaC.timer) clearInterval(raceC.timer);
            plaC.time = 0;
            break;
        }
    }
}

plaF.start = (name) => {
    plaC.nameD.innerText = name;
    plaC.scoreD.innerText = 0;
    plaF.timer('reset');
    plaF.timer('tekiou');
    plaF.timer('start');

    let size = +name.slice(0,1) + 1;
    plaC.size = size;

    plaF.build();
    
    plaF.next();
}

plaF.build = () => {
    plaC.dotsD.style.gridTemplateColumns = `repeat(${plaC.size}, 1fr)`;
    plaC.dotsD.style.gridTemplateRows = `repeat(${plaC.size}, 1fr)`;

    plaC.numsD.style.gridTemplateColumns = `repeat(${plaC.size-1}, 1fr)`;
    plaC.numsD.style.gridTemplateRows = `repeat(${plaC.size-1}, 1fr)`;
    
    let num = plaC.size**2;
    plaC.list = Array(num).fill(false);

    for(let i=0; i<num; i++){
        let div = document.createElement('div');
        div.className = `mar m${i}`;

        div.addEventListener('click', () => {
            plaF.tog(i);
        })

        plaC.dotsD.appendChild(div);
    }
    
}
plaF.tog = (i) => {
    let mar = document.querySelector(`.mar.m${i}`);
    mar.classList.toggle('tog');
    plaC.list[i] = !plaC.list[i];

    /* クリックされたとき、波紋状にborderの色で波が広がるanimation */
    jump:{
        if(mar.classList.contains('hamon')) break jump;
        mar.classList.add('hamon');
        mar.addEventListener('animationend', () => mar.classList.remove('hamon'));
        return;
    }
    mar.classList.add('hamon2')
    mar.addEventListener('animationend', () => mar.classList.remove('hamon2'));
}

plaF.next = () => {
    let size = plaC.size;
    // let 
}

// #endregion

function start(){
    console.log('load完了ed');
    Style.tekiou();
    seleF.load();

    areF.move('title');
    main.classList.remove('ban');
}

//#region 画像と音声のロード
let images = {};
let sounds = {};
let loaC = {
    imgT: 0,
    imgD: 0,
    souT: 0,
    souD: 0,
    erd: 0
}
let loaF = {};
loaC.imgL = {
    systems:['error'],
}

loaC.souL = ['error', 'break', 'break_fast']
loaC.souT = Object.values(loaC.souL).length;

loaF.load = async() => {
    if(await loaF.loadI()) return 'error';
    else '終わり'
}
loaF.loadI = async() => {
    let loaloa = (arr, route) => {
        // console.log("Arrayでした lets 読み込み")
        let src = "assets/images/";
        for(let r of route) src += `${r}/`;
        // console.log(src)

        let tar = images;
        for(let r of route){
            // console.log(r, tar)
            if(!tar[r]) tar[r] = {};
            tar = tar[r];
        }
        for(let mono of arr){
            let img = new Image();
            img.src = `${src}${mono}.png`;
            img.onload = () => {
                loaC.imgD++;
                if(loaC.imgD == loaC.imgT) loaF.loadS();
            };
            img.onerror = () => {
                console.error(`Image ${src}${mono}.png failed to load.`);
                loaC.erd += 1;
                if(loaC.erd > 20) return console.error('さすがにやりすぎbonus'), 1;
                img.src = `assets/images/systems/error.png`;
                loaC.imgD++;
                if(loaC.imgD == loaC.imgT) loaF.loadS();
            };
            
            tar[mono] = img;
            if(loaC.imgD >= loaC.imgT) loaF.loadS();
        }

        // console.log('読み込み完了 これよりユグドラシルに帰還する')
        return 0;
    }

    // let gensho = Object.keys(loaC.imgL);
    let loaloa0 = async(mono, route = []) => {
        let sink = route.length ? 1 : 0
        // if(sink) console.log("not Arrayでした lets 再帰");
        
        // console.log("[loaloa0] route:[" + route + "]");
        // console.log('次:monoです')
        // console.log(mono)
        for(let key in mono){
            // console.log(`key:${key} (all:[${Object.keys(mono)}])`)
            if(key == 'すべて'){
                // console.error('"すべて"だったのでスキップ');
                route.pop()
                continue;
            }

            route.push(key);
            // console.log("[loaloa0ed] route:[" + route + "]");
            
            let val = mono[key]??null;
            if(!val) return console.error('↓↓null↓↓'), console.log(tar), console.log(mono), console.log(key), console.error('↑↑null↑↑');
            // console.log("次、valです");
            // console.log(val);
            // console.log("↑Arrayかな? 結果 => "+Array.isArray(val));
            if(Array.isArray(val)){
                if(await loaloa(val, route)) return console.error('南ノ南');
                route.pop()
                // console.log(`帰還成功、${route.pop()}を排除`)
            }//arrayなら => ロードへ
            else await loaloa0(val, route); //まだオブジェクトなら => もっかい
        }

    }
    

    loaloa0(loaC.imgL);

}

loaF.loadS = async() => {
    loaC.souL.forEach(name => {
        let sound = new Audio();
        sound.preload = 'auto';
        sound.src = `assets/sounds/${name}.mp3`;
        if(name.startsWith('bgm_')){
            sound.loop = true;
            sound.dataset.type = 'bgm';
            sound.volume = souC.bgm;
        }
        else{
            sound.dataset.type = 'se';
            sound.volume = souC.se;
        }
        sound.addEventListener('canplaythrough', () => {
            // console.log(`Sound ${num} loaded.`);
            loaC.souD += 1;
            if(loaC.souD == loaC.souT) start();
        }, {once: 1});
        sound.onerror = () => {
            console.error(`Sound assets/sounds/${name} failed to load.`);
            loaC.erd += 1;
            if(loaC.erd > 20) return console.error('さすがにやりすぎbonus'), 1;
            sound.src = `assets/sounds/error.mp3`;
            loaC.souD += 1;
            if(loaC.souD == loaC.souT) start();
        };
        sounds[name] = sound;
    });
}

let souC = {
    se: 0.5,
    bgm: 0.5,
    nowBgm: null
}

function soundPlay(name){
    if(!sounds[name]) return soundPlay('error');
    let proto = sounds[name];
    if(proto.dataset.type == 'bgm'){
        if(souC.nowBgm == name && !proto.paused) return;
        if(souC.nowBgm && sounds[souC.nowBgm] && !sounds[souC.nowBgm].paused){
            sounds[souC.nowBgm].pause();
            sounds[souC.nowBgm].currentTime = 0;
        }
        proto.volume = souC.bgm;
        proto.play().catch(e => console.warn('BGM 再生エラー', e));
        souC.nowBgm = name;
    }else{
        let clone = proto.cloneNode(true);
        clone.volume = souC.se;
        clone.dataset.type = 'se';
        clone.addEventListener('ended', ()=> {
            try{clone.src = '';}catch(e){}
        });
        clone.play().catch(e => console.warn('SE 再生エラー', e));
    }
}


function soundStop(){
    // sounds オブジェクトに入ってる原型は止めてリセット
    Object.keys(sounds).forEach(k => {
        try{
            sounds[k].pause();
            sounds[k].currentTime = 0;
        }catch(e){}
    });
    souC.nowBgm = null;

    // ページ上の他の <audio> を全部止めたいなら下を有効に
    // document.querySelectorAll('audio,video').forEach(el => { el.pause(); el.currentTime = 0; });
}

function soundVolume(code, val){
    if(typeof code == 'number' && typeof val == 'undefined'){
        val = code;
        code = 'both';
    }
    if(typeof val !== 'number') return console.error('val は数値にして');
    let v = val;
    if(v > 1) v = Math.max(0, Math.min(1, v/100)); // 0-100 指定を 0-1 に
    v = Math.max(0, Math.min(1, v));

    if(code == 'se' || code == 'both'){
        souC.se = v;
        Object.keys(sounds).forEach(k => {
            if(sounds[k].dataset.type == 'se') sounds[k].volume = souC.se;
        });
    }
    if(code == 'bgm' || code == 'both'){
        souC.bgm = v;
        Object.keys(sounds).forEach(k => {
            if(sounds[k].dataset.type == 'bgm') sounds[k].volume = souC.bgm;
        });
        if(souC.nowBgm && sounds[souC.nowBgm]) sounds[souC.nowBgm].volume = souC.bgm;
    }

    console.log(`[soundVolume] se:${souC.se} bgm:${souC.bgm}`);
}
soundVolume(50);

//#endregion
document.addEventListener('DOMContentLoaded', async() => {
    await loaF.load();
})

