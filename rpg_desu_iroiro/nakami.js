//#region komagome
function delay(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
};

async function nicoText(mes){
    console.log(`[nico] ${mes}`);
    let div = document.createElement('div');
    div.textContent = mes;
    div.className = 'nicotext';
    document.querySelector('body').appendChild(div);

    let wid = div.offsetWidth;
    div.style.top = `calc(${random(0, 100)}vh - 20px)`;
    div.style.right = `-${wid}px`;

    requestAnimationFrame(() => div.style.right = `${window.innerWidth + wid}px`);
    
    await delay(5000); 
    div.remove();
};
function tobiText(youso, mes){
    let el = youso;
    if(typeof el == 'string') el = document.querySelector(youso);
    if(!el) return console.error('せんぱ〜い？この要素壊れてますよ〜〜？');

    console.log(`[tobi] ${mes}`);

    let rect = el.getBoundingClientRect();
    let left = rect.left + window.scrollX + rect.width / 2;
    let top = rect.top + window.scrollY + rect.height / 2;

    let node = document.createElement('div');
    node.className = 'tobitext';
    node.innerText = mes;
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
function copytext(text){
    console.log(`[copy] ${text}`);
    navigator.clipboard.writeText(text)
}
async function kirameki(div0, zukey = 'star', n = 20, time = 2000, col){
    let taioued = ['star', 'heart'];
    if(!taioued.includes(zukey)) return console.log(`図形が対応していません。現在対応しているのは[${taioued.join(', ')}]だけであります。`);
    let rect = div0.getBoundingClientRect();
    let cenX = rect.left + rect.width / 2 + window.scrollX;
    let cenY = rect.top + rect.height / 2 + window.scrollY;

    let divs = [];
    for(let i=0; i<n; i++){
        let div = document.createElement('div');
        div.className = `kirameki p_${zukey}`;
        // 初期は中央にpxで置く（CSS側で position:absolute を想定）
        div.style.left = `${cenX}px`;
        div.style.top = `${cenY}px`;
        if(zukey == 'star') div.style.transform = `rotate(${Math.random() * 360}deg)`;
        if(col) div.style.background = col;
        document.body.appendChild(div);
        divs.push(div);
    }

    divs.forEach(div => {
        let angle = Math.random() * 2 * Math.PI;
        let speed = Math.random() * 2 + 1;
        let velocityX = Math.cos(angle) * speed;
        let velocityY = Math.sin(angle) * speed;

        let start = performance.now();
        function animate(now){
            let elapsed = now - start;
            if(elapsed >= time){
                div.remove();
                return;
            }
            // 滑らかなイージング
            let t = elapsed / time;
            let e = 1 - Math.pow(1 - t, 3);
            // 少し拡散するように速度を掛ける
            div.style.left = `${cenX + velocityX * (elapsed / 16)}px`;
            div.style.top = `${cenY + velocityY * (elapsed / 16)}px`;
            div.style.opacity = String(1 - t);
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    });
}
function El(tag, cls, children = []){
    let e = document.createElement(tag);
    if(cls) e.className = cls;
    children.forEach(c => e.appendChild(c));
    return e;
}
function awase(div, max = 28, code = "innerText"){
    if(max == 0) max = 28; //skipと仮定する
    if(!code) return console.error(`せんぱ〜い..? ${code}なんていうよくわからないものは使わないでくださ〜い笑`);

    let wid = div.clientWidth;
    let len = div[code].length;
     if(len == 0) return;
    let px = wid/len;
     if(max < px) px = max;
    div.style.fontSize = `${px}px`;
}
function kaijou(num){
    if(num == 0) return 1;
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
    let end2 = sta2 + row - 1;
    if(end2 > end) end2 = end;

    let arr = [];
    for(let i = sta2; i <= end2; i++) arr.push(i);

    return arr;
};
async function tousa(moto, key, d, n, wait = 0, s = 0){
    // type:: kouならi<n madeならwhileでif抜け
	let a = moto[key]; //初項
	if(a != 0 && (!a || typeof a != "number")) return console.error("..それ数字じゃないです...."), 1;
	if(d == 0) return console.error("む、むむ無限が..見えますっ...."), 1;
	
	if(!wait) wait = 10;
	if(s) n = (s-a)/d; //うわがき ほんとは等差数列の和の公式を使いたかった
    if(n < 0) d = -d;
    n = Math.ceil(Math.abs(n));
	
    for(let i=0; i<n; i++){
        await delay(wait);
        moto[key] += d;
    }
}
async function touhi(moto, key, r, n, wait = 0, s = 0){
    // type:: kouならi<n madeならwhileでif抜け
	let a = moto[key]; //初項
	if(a != 0 && (!a || typeof a != "number")) return console.error("..それ数字じゃないです...."), 1;
    if(a == 0) return console.error("初項0の等比数列、、？"), 0;
	if(r == 0) return console.error("...これは何？"), 0;
    if(r == 1) return console.error("あ、あの...これも無限が見えます..."), 1;
	
	if(!wait) wait = 10;
	if(s) n = Math.log(s/a) / Math.log(r); //うわがき ほんとは等比数列の和の公式を使いたかった
    if(n < 0) r = 1/r;
    n = Math.ceil(Math.abs(n));
	
    for(let i=0; i<n; i++){
        await delay(wait);
        moto[key] *= r;
    }
}
function dogma(matu, shiki, k = 1){
    let res = 0;

    for(let i = k; i <= matu; i++){
        res += shiki(i);
        console.log(i, shiki(i));
    }

    return res;
}
function ketasu(num){
    if(num == 0) return 1;
    num = Math.abs(num);
    let res = Math.floor(Math.log10(num))+1;
    return res;
}
function whethPoint(num){
    let str = num.toString();
    if(0 <= str.indexOf('.')) return true;
    
    return false;
}

function arraySelect(array){
    let select = Math.floor(Math.random()*array.length);
    return array[select];
};
function arrayToggle(array, name){
    let array2 = copy(array);
    let index = array2.indexOf(name);
    if(index == -1) array2.push(name);
    else array2.splice(index, 1);
    
    return array2;
}
function arrayShuffle(array){
    let ato = copy(array);
    for(let i=(ato.length-1); i>0; i--){
        let i2 = Math.floor(Math.random() * (i + 1));
        [ato[i], ato[i2]] = [ato[i2], ato[i]];
    };
    return ato;
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
    let res = Object.prototype.hasOwnProperty.call(obj, key)
    if(res) return 1;
    return 0;
};
function copy(moto){
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
function hit(num){
    return +(Math.random()*100 <= num);
    //例:num == 20 → randomが20以内なら1, elseなら0を返す
};
function roll(n, m){
    let res = 0;
    for(let i=0; i<n; i++) res += random(1, m);

    if(3 < m && res == n*m) console.log('ファンブル！');
    if(3 < m && res == n) console.log('クリティカル！');
    return res;
    //例:n = 1, m = 100 => 100面ダイスを1回振った出目の合計を返す
}
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
    for(let a of Object.keys(optcou)){
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
// LocalStorage(Data) => lsd
function lsdSet(name, value){
    if(Array.isArray(value) ||
       typeof value == 'object') value = JSON.stringify(value);
    localStorage.setItem(name, value || "");
};
function lsdGet(name){
    let res = localStorage.getItem(name);
    if(!res) return null;
    try{
        res = JSON.parse(res);
        return res;
    }catch(e){
        return res;
    };
};
function lsdRem(name){
    localStorage.removeItem(name);
}
function lsdShow(){
    let itemCount = localStorage.length;
    console.error(`-- LocalStorageのアイテム数: ${itemCount} --`);
    for(let i = 0; i < itemCount; i++){
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        // nicoText(`キー: ${key}, 値: ${value}`);
        console.log(`キー: ${key}, 値: ${value}`);
    }
    console.error(`-- 以上 --`);
}

function irohaHo(color){
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
function irohaMix(c1, c2, ratio = 0.5){
    let toRGB = c => {
        c = c.replace('#', '');
        if(c.length === 3) c = c.split('').map(x => x + x).join('');
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
function irohaRan(){
    let r = random(0, 255);
    let g = random(0, 255);
    let b = random(0, 255);
    let ato = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    return ato;
};
function irohaDark(color){
    color = color.replace('#', '');
    if(color.length === 3) color = color.split('').map(x => x + x).join('');
    
    let r = parseInt(color.slice(0, 2), 16);
    let g = parseInt(color.slice(2, 4), 16);
    let b = parseInt(color.slice(4, 6), 16);

    // 相対輝度の近似計算
    // 0.2126 * R + 0.7152 * G + 0.0722 * B
    let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    
    return luma < 128; // 暗い色ならtrue
}

function timeDiff(kako){
    if(typeof kako == 'number') kako = kako.toString();
    let now = new Date();
    let past = new Date(
        kako.slice(0, 4),
        kako.slice(4, 6) - 1,
        kako.slice(6, 8),
        kako.slice(8, 10),
        kako.slice(10, 12)
    );

    let diff = now - past;
    let d = {
        minute:Math.floor(diff / (1000 * 60)),
        hour:Math.floor(diff / (1000 * 60 * 60)),
        day:Math.floor(diff / (1000 * 60 * 60 * 24)),
        month:(now.getFullYear() - past.getFullYear()) * 12 + now.getMonth() - past.getMonth(),
        year:now.getFullYear() - past.getFullYear()
    };

    if(d.minute < 60){
        return `${d.minute}分前`;
    }else if(d.hour < 24){
        return `${d.hour}時間前`;
    }else if(d.day < 30){
        return `${d.day}日前`; //30日未満なら「日」
    }else if(d.month < 12){
        return `${d.month}ヶ月前`; //12ヶ月未満なら「月」
    }else{
        return `${d.year}年前`; //それ以上なら「年」
    }
}
function timeToshow(date){ //見る用
    if(!date) console.error('日付がありませんぜ旦那！');
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
}
function timeTodata(date = new Date()){ //データ保存用
    if(!date) date = new Date(), console.warn('あなた、日付を入れ忘れてるわよ');
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let time = `${year}${month}${day}${hours}${minutes}`;
    return +time;
}

function cursorSelect(){
    let selected = window.getSelection();
    let res = '';
    if(0 >= selected.rangeCount) return '';

    res = selected.toString();
    return res;
}
function cursorEnd(){
    let selected = window.getSelection();
    if(0 >= selected.rangeCount) return 1;
    selected.collapseToEnd();
    return 0;
}
function cursorActive(){
    let el = document.activeElement;
    let res = 0;
    if(el.tagName == 'INPUT') res = 1;
    if(el.tagName == 'TEXTAREA') res = 2; //改行可
    if(el.isContentEditable) res = 1;
    return res;
}
function cursorHas(){
    let selected = window.getSelection();
    let text = selected.toString();
    if(text.length <= 0) return 0;
    return text;
}
function cursorRect(){
    let selection = window.getSelection();
    if(selection.rangeCount == 0) return 0;
    
    let range = selection.getRangeAt(0);
    return range.getBoundingClientRect();
}

async function error(text = 'errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'){
    await logText(text);
    await delay(2000);
    // window.open('about:blank', '_self').close();
};
//#endregion
//#region log&text
let logD = document.getElementById('log');
let logC = {
    mainD: logD.querySelector('.main'),
    togD: logD.querySelector('.opener'),
    textD: logD.querySelector('.text'),
    autoDelay: 1,
    skipText: 0,
    clearText: 0,
    loopText: 0,
    ing: 0,
    queue: []
}
logC.colors = [
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
let logF = {};

logF.cc = (raw) => {
    let text = [];
    let color = null;

    for(let i = 0; i < raw.length; i++){
        let sym = 0;
        for(let c of logC.colors){
            if(raw[i] == c.sym && raw[i + 1] == c.sym){
                console.log(`→${raw[i]}← 発見！ ${c.name}色です`);
                color = color ? null : c.col;
                i++;
                sym = 1;
                break;
            }
        };
        if(sym) continue;

        text.push({
            char: raw[i],
            color: color
        });
    }
    return text;
};

logF.waitfor = async() => {
    let len = logC.queue.length;

    if(len == 0) logC.loopText = 0;
    else logC.loopText = 1;

    if(!logC.loopText) return;
    requestAnimationFrame(logF.waitfor);

    if(logC.ing) return;
    let raw = logC.queue.shift();
    // console.log(`${raw}を送信します`);
    // console.log(`残り: (${len - 1})[${logC.queue}]`);
    await logText(raw);
};
async function logText(raw){
    if(!raw) return console.log('「内容が？内容が〜〜？ないよ〜〜〜つってwwww直せ」');
    if(typeof raw != 'string') raw = String(raw);

    if(logC.ing){
        logC.queue.push(raw);

        if(!logC.loopText) logF.waitfor();
        return;
    };
    
    logC.ing = 1;
    text = logF.cc(raw);
    logC.textD.innerHTML = "";
    logC.textD.style.display = "block";
    logC.clearT = 0;

    let index = 0;
    return new Promise((resolve) => {
        async function type(){
            if(index < text.length){
                if(logC.skipT){
                    while(index < text.length){
                        let span = document.createElement("span");
                        span.textContent = text[index].char;
                        if(text[index].color) span.style.color = text[index].color;
                        logC.textD.appendChild(span);

                        index++;
                    }
                    index = text.length;
                    logC.skipT = 0;
                    setTimeout(type, 10);
                }else{
                    let span = document.createElement("span");
                    span.textContent = text[index].char;
                    if(text[index].color) span.style.color = text[index].color;
                    logC.textD.appendChild(span);

                    index++;
                    setTimeout(type, 80); // 次の文字を表示する間隔
                }
            }else{
                logText_log(logC.textD.innerHTML);
                let waitTime = logC.autoDelay * 1000;
                let timeout = new Promise(resolve => setTimeout(resolve, waitTime));
                let userAction = new Promise(resolve => {

                    function waitToClear(event){
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
                    logC.textD.textContent = "";
                    logC.textD.style.display = "none";
                    logC.clearT = 1;
                    logC.skipT = 0
                    logC.ing = 0;
                    resolve('end');
                });
            }
        };
        type();
    });
};
document.addEventListener('keydown', (e) => {
    if(e.key === 'z' || e.key === 'Enter') logC.skipT = 1;
});
document.addEventListener('keyup', (e) => {
    if(e.key === 'z' || e.key === 'Enter') logC.skipT = 0;
});
document.addEventListener('click', () => {
    logC.skipT = 1;
    setTimeout(() => logC.skipT = 0, 50); // 一時的にスキップを有効化
});

logF.tog = (code = NaN) => {
    if(isNaN(code)){
        logD.classList.toggle('tog');
        logC.togD.textContent = logD.classList.contains('tog') ? '<' : '>';
    }
    else{
        if(code == 1){
            logD.classList.add('tog');
            logC.togD.textContent = '<';
        };
        if(code == 0){
            logD.classList.remove('tog');
            logC.togD.textContent = '>';
        };
    }

    let isTog = logD.classList.contains('tog');
    let isHid = logD.classList.contains('hid');
    if(isTog && isHid) logF.woah(0);
};
logC.togD.addEventListener('click', logF.tog);

logF.woah = (code = NaN) => {
    if(isNaN(code)){
        logD.classList.toggle('hid');
    }
    else{
        if(code == 1) logD.classList.add('hid');
        if(code == 0) logD.classList.remove('hid');
    }

    let isTog = logD.classList.contains('tog');
    let isHid = logD.classList.contains('hid');
    if(isTog && isHid) logF.tog(0);
};

function logText_log(text){
    logC.mainD.innerHTML += text + '<br>';
    logC.mainD.scrollTop = logC.mainD.scrollHeight;
};
//#endregion
//#region description
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
    
    while(div && !div.classList.contains('draggable')){
        if(div.tagName == 'BODY') return; //戻りすぎね
        div = div.parentElement;
    }

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
    constructor(type, x = 'half', y = 'half', w = window.innerWidth/2, h = window.innerWidth/2){
        let youso = document.createElement(type);
        youso.className = `tk ${type}`;

        let contex = {x, y, w, h};

        let yoko = ['x', 'w'];
        for(let n of yoko){
            // console.log(n);
            if(typeof contex[n] != 'string' || typeof contex[n] == 'string' && !contex[n].endsWith('%')) continue;
            let num = contex[n].slice(0, -1);
            contex[n] = num * window.innerWidth / 100;
        }

        let tate = ['y', 'h'];
        for(let n of tate){
            if(typeof contex[n] != 'string' || typeof contex[n] == 'string' && !contex[n].endsWith('%')) continue;
            let num = contex[n].slice(0, -1);
            contex[n] = num * window.innerHeight / 100;
        }

        console.log(contex);

        youso.style.width = `${contex.x}px`;
        youso.style.height = `${contex.h}px`;

        youso.style.left = `${contex.x}px`;
        youso.style.top = `${contex.y}px`;
        
        if(contex.x == 'half' && contex.y == 'half') youso.classList.add('cenXY');
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
        }

        if(typeof dict != 'object') return 1;

        for(let key in dict) this.youso.setAttribute(key, dict[key]);

        return 0;
    }

    styleAdd(dict){
        for(let key in dict) this.youso.style[key] = dict[key];
    }

    classAdd(name){this.youso.classList.add(name)};
    classRem(name){this.youso.classList.remove(name)};
    classTog(name){this.youso.classList.toggle(name)};
    classHas(name){
        let is = this.youso.classList.contains(name);
        return is;
    }

    evAdd(type, func){
        this.youso.addEventListener(type, func);
    }

    yousoAdd(youso){
        this.youso.appendChild(youso);
    }

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

    mono.evAdd('click', function(){
        nicoText('clicked');
    });

    mono.append();
}
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
//#region CheckBox feat.Slider
class Checkbox {
    constructor(
        name = "テキストを入力してください",
        kitei = 0,
        func = 0,
        data = 0
    ){
        this.name = name;
        this.kitei = kitei;
        this.func = func;

        if(!data) data = {
            back: '#b2b2b2',
            backed: '#2b2b2b'
        }
        this.data = data; //固有。func用だったりするのかも

        this.make();
        // ここでこいつをreturnしたらinstanceが消える(このclassの他の関数を作れなくなる)
    }
    make(){
        let div = document.createElement('div');
        div.className = 'checkbox';
        if(this.kitei) div.classList.add('tog');
        div.dataset.cl = this.kitei; //0がoff..のはず

        let [cBack, cBacked] = [this.data.back, this.data.backed];
        div.style.setProperty('--back', cBack);
            div.style.setProperty('--back-col', irohaHo(cBack));
        div.style.setProperty('--backed', cBacked);
            div.style.setProperty('--backed-col', irohaHo(cBacked));
        
        let text = document.createElement('div');
        text.className = 'text';
        text.textContent = this.name;
        div.appendChild(text);

        let clcl = async () => {
            div.dataset.cl = fl(div.dataset.cl);
            div.classList.toggle('tog', div.dataset.cl == 1);

            if(this.func) this.func();
        };
        div.addEventListener('click', clcl);

        this.div = div;
    };

    append(parent){
        parent.appendChild(this.div);
    }
};

class Slider {
    constructor(
        name = "テキストを入力してくださ",
        kitei = 50,
        func = 0,
        data = 0
    ){
        this.name = name;
        this.kitei = kitei;
        this.func = func;

        if(!data) data = {
            back: '#b2b2b2',
            backed: '#2b2b2b'
        }
        this.data = data;

        this.make();
    }

    make(){
        let div = document.createElement('div');
        div.className = `slider ${this.name}`;
        
        let text = document.createElement('div');
        text.className = 'label';
        text.textContent = `${this.name}:`;
        div.appendChild(text);
        
        let range = document.createElement('input')
        range.type = "range"
        range.min = 0;
        range.max = 100;
        range.value = this.kitei;
        range.step = 1;
        range.addEventListener('input', (e) => {
            let val = e.target.value;
            let [A, B] = [this.data.back, this.data.backed];
            /*
            // 全体変え
            let per = val / 100;
            let mix = irohaMix(A, B, per);
            range.style.setProperty('--tsuma', irohaHo(mix));
            range.style.background = mix;
            */

            // つまみの位置で変え
            let per = val;
            let mix = irohaMix(A, B, 0.5);
            range.style.setProperty('--tsuma', mix);
            range.style.background = `
                linear-gradient(to right,
                    ${A} 0%,
                    ${A} ${per - 10}%,
                    ${mix} ${per}%,
                    ${B} ${per + 10}%,
                    ${B} 100%
                )
            `;


            if(this.func) this.func(val);
        })
        div.appendChild(range);

        this.div = div;
        this.range = range;
    }

    append(parent){
        parent.appendChild(this.div);
        this.range.dispatchEvent(new Event('input'));
    }
}
// #endregion
//#region takushiSen
class TakushiSen {
    constructor(choices, mode = "tate", data = 0){
        this.choices = choices; // [{name, img}, {name, img}, ...]
        this.mode = mode;

        if(!data) data = {
            back: '#b2b2b2',
            backed: '#2b2b2b'
        };
        this.data = data;

        this.make();
    }

    make(){
        let div = document.createElement('div');
        div.className = `mode ${this.mode}`;
        
        let [b, bEd] = [this.data.back, this.data.backed];
        div.style.setProperty('--botan', b);
        div.style.setProperty('--botan-col', irohaHo(b));
        div.style.setProperty('--botan-ed', bEd);
        div.style.setProperty('--botan-col-ed', irohaHo(bEd));

        this.choices.forEach(ma => {
            let [name, gazou] = [ma.name, ma.img];
            if(typeof ma === 'string') name = ma;

            let item = document.createElement('div');
            item.className = `item ${name}`;
            item.textContent = name;
            item.dataset.name = name;

            // 画像があるならば
            if(gazou){
                let img = document.createElement('img');
                img.src = gazou;
                item.appendChild(img);
            }
            div.appendChild(item);
        });

        this.div = div;
        return div;
    }

    // ここがメイン！await で待ち受けるやつ
    async select(parent){
        return new Promise(resolve => {
            let div = this.make();
            parent.appendChild(div);

            div.addEventListener('click', (e) => {
                let target = e.target.closest('.item');
                if(target){
                    div.remove();
                    resolve(target.dataset.name);
                }
            });
        });
    }
}
//#endregion
//#region Tenshee
class Tenshee {
    // 天使なカノジョ です(??)
    constructor(){
        this.resolved = 0;
    }

    reset(){
        tensheeC.now = "";
        tensheeC.max = 0;
        tensheeC.mode = "";
        this.tekiou();
    }

    plzinput(max = 0, mode = 0){
        if(tensheeC.ing) return;
        tensheeC.ing = 1;
        this.reset();

        if(max) tensheeC.max = max;
        if(mode) tensheeC.mode = mode;
        tensheeD.classList.add('show');
        return new Promise((resolve) => {
            this.resolved = resolve;
        });
    }

    tekiou(){
        let disp = tensheeC.dispD;
        let now = tensheeC.now;

        if(tensheeC.mode == "pass") disp.textContent = '*'.repeat(now.length);
        else disp.textContent = now;
    }

    num(num){
        let now = tensheeC.now;
        let max = tensheeC.max;
        if(max != 0 && now.length >= max) return;
        
        now += num;
        tensheeC.now = now;
        this.tekiou();
    }

    del(){
        let now = tensheeC.now;
        if(now == "") return;

        now = now.slice(0, -1);
        tensheeC.now = now;
        this.tekiou();
    }

    confirm(){
        tensheeD.classList.remove('show');
        let now = tensheeC.now;
        console.log(`天カノ結果:: ${now}`)
        if(now == "") console.error('入力されてないっすね');
        if(this.resolved){
            this.resolved(now);
            this.resolved = 0;
            tensheeC.ing = 0;
        }
    }
}
let tensheeD = document.getElementById('tenshee');
let tensheeC = {
    ing: 0,
    now: "",
    dispD: tensheeD.querySelector('.disp')
}
let tensheeF = {};
const tenshee = new Tenshee();
tensheeD.querySelectorAll('.bt').forEach(bt => {
    bt.addEventListener('click', () => {
        if(bt.classList.contains('num')) tenshee.num(bt.dataset.num)
        if(bt.classList.contains('del')) tenshee.del();
        if(bt.classList.contains('ok')) tenshee.confirm();
    });
})

//#endregion
//#region OBS
let OBS = {
    keys: {},
    cling: 0,
    cring: 0,
    mx: 0,
    my: 0
}

OBS.KeysA = (e) => {
    let key = e.key.toLowerCase();
    if(e.key == ' ') key = 'space';
    OBS.keys[key] = 1;
};
OBS.KeysR = (e) => {
    let key = e.key.toLowerCase();
    if(e.key == ' ') key = 'space';
    OBS.keys[key] = 0;
};

OBS.PonD = (e) => {
    if(e.buttons == 0) OBS.cling = 1;
    if(e.buttons == 2) OBS.cring = 1;
};
OBS.PonU = (e) => {
    if(e.buttons == 0) OBS.cling = 0;
    if(e.buttons == 2) OBS.cring = 0;
};
OBS.ponC = (e) => {
    if(e.buttons == 0) OBS.cling = 0;
    if(e.buttons == 2) OBS.cring = 0;
};
OBS.PonB = () => {
    OBS.cling = 0;
    OBS.cring = 0;
}

OBS.Mouse = (e) => {
    OBS.mx = e.clientX;
    OBS.my = e.clientY;
};


OBS.Paste = (event) => {
    // プレーンペーストに強制的にするやつ？
    event.preventDefault();
    let text = event.clipboardData.getData("text/plain");
    let selection = window.getSelection();
    if(!selection.rangeCount) return;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(text));
    selection.collapseToEnd();
};

OBS.load = () => {
    let sts = {
        "Keys": 1,
        "Mouse": 1,
        "Click": 1,
        "Paste": 0,
        "Context": 1,
    }

    if(sts["Keys"]){
        window.addEventListener('keydown', OBS.KeysA);
        window.addEventListener('keyup', OBS.KeysR);
    }

    if(sts["Mouse"]){
        window.addEventListener('mousemove', OBS.Mouse);
    }

    if(sts["Click"]){
        window.addEventListener('pointerdown', OBS.PonD);
        window.addEventListener('pointerup', OBS.PonU);
        window.addEventListener('pointercancel', OBS.ponC);
        window.addEventListener('blur', OBS.PonB);
    }

    if(sts["Paste"]){
        window.addEventListener('paste', OBS.Paste);
    }

    if(sts["Context"]){
        window.addEventListener('contextmenu', e => e.preventDefault());
    }
}

//#endregion
//#region fonts
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
//#region images & sounds
let images = {};
let sounds = {};
let loaC = {
    imgT: 0, imgD: 0,
    souT: 0, souD: 0,
    erd: 0
}
let loaF = {};
loaC.imgT = Object.values(Images).reduce((a,b) => a + b.length, 0);
loaC.souT = Object.values(Sounds).reduce((a,b) => a + b.length, 0);

loaF.load = async() => {
    console.log("loadを開始しました。少々お待ちください");
    if(await loaF.loadI()) return 1;
    return 0;
}
loaF.loadI = async() => {
    let kasan = () => {
        loaC.imgD++;
        if(loaC.imgD == loaC.imgT) loaF.loadS();
    }

    if(loaC.imgT == 0) return loaF.loadS();
    for(let belong in Images){
        images[belong] = {};

        for(let name of Images[belong]){
            let img = new Image();
            img.src = `assets/images/${belong}/${name}.png`;
            img.onload = kasan;
            img.onerror = () => {
                console.error(`Image assets/images/${belong}/${name}.png failed to load.`);
                loaC.erd += 1;
                 if(loaC.erd > 20) return console.error('さすがにやりすぎbonus'), 1;
                img.src = `assets/images/systems/error.png`;
                kasan();
            };
            
            images[belong][name] = img;
        }   
    }
}

loaF.loadS = async() => {
    let kasan = () => {
        loaC.souD += 1;
        if(loaC.souD == loaC.souT) loaF.end();
    }
    
    if(loaC.souT == 0) return loaF.end();
    for(let belong in Sounds){
        sounds[belong] = {};

        for(let name of Sounds[belong]){
            let sound = new Audio();
            sound.preload = 'auto';
            sound.src = `assets/sounds/${belong}/${name}.mp3`;
            if(belong == 'bgm'){
                sound.loop = 1;
                sound.dataset.type = 'bgm';
                sound.volume = souC.bgm;
            }
            if(belong == 'se'){
                sound.dataset.type = 'se';
                sound.volume = souC.se;
            }
            sound.addEventListener('canplaythrough', () => {
                kasan();
            }, {once: 1});
            sound.onerror = () => {
                console.error(`Sound assets/sounds/${belong}/${name} failed to load.`);
                loaC.erd += 1;
                 if(loaC.erd > 20) return console.error('さすがにやりすぎbonus'), 1;
                sound.src = `assets/sounds/se/error.mp3`;
                kasan();
            };

            sounds[belong][name] = sound;
        }
    };
}
loaF.end = () => {
    console.log(`images & sounds loaded! (error: ${loaC.erd})`);
    soundVolume(50);
    start();
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
        let clone = proto.cloneNode(1);
        clone.volume = souC.se;
        clone.dataset.type = 'se';
        clone.addEventListener('ended', ()=> {
            try{clone.src = '';}catch(e){}
        });
        clone.play().catch(e => console.warn('SE 再生エラー', e));
    }
}
function soundStop(){
    Object.keys(sounds).forEach(k => {
        try{
            sounds[k].pause();
            sounds[k].currentTime = 0;
        }catch(e){}
    });
    souC.nowBgm = null;
    document.querySelectorAll('audio,video').forEach(el => { el.pause(); el.currentTime = 0; });
}
function soundVolume(code, val){
    if(typeof code == 'number' && typeof val == 'undefined') val = code, code = 'both';
    if(typeof val !== 'number') return console.error('val は数値にして');
    let v = val;
    if(v > 1) v = Math.max(0, Math.min(1, v/100)); // 0-100 指定を 0-1 に
    v = Math.max(0, Math.min(1, v));

    if(code == 'se' || code == 'both'){
        souC.se = v;

        for(let belong in sounds){
            for(let name in sounds[belong]){
                let sound = sounds[belong][name];
                if(sound.dataset.type == 'se'){
                    sound.volume = souC.se;
                }
            }
        }
    }

    if(code == 'bgm' || code == 'both'){
        souC.bgm = v;

        for(let belong in sounds){
            for(let name in sounds[belong]){
                let sound = sounds[belong][name];
                if(sound.dataset.type == 'bgm'){
                    sound.volume = souC.bgm;
                }
            }
        }

        if(souC.nowBgm && sounds.bgm[souC.nowBgm]){
            sounds.bgm[souC.nowBgm].volume = souC.bgm;
        }
    }

    console.log(`[soundVolume] se:${souC.se} bgm:${souC.bgm}`);
}

//#endregion
//#region 幸せになれる隠しコマンドがあるらしい
let secrates = [
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
const secrateses = [];
function secratesP(key){
    secrateses.push(key);

    let lenlen = secrates.sort((a,b) => b.arr.length - a.arr.length);
    let len = lenlen[0].arr.length;
    secrateses.splice(0, secrateses.length - len);
    
    secratesC();
}
async function secratesC(){
    for(let sec of secrates){
        if(sec.limit == 0) continue;

        let len = sec.arr.length;
        if(secrateses.length < len) continue;

        let tail = secrateses.slice(-len);

        if(tail.join() == sec.arr.join()){
            console.log(`${sec.name}発動！！[${sec.arr.join(' ')}]`);
            let res = await sec.func();
            if(!res && sec.limit != 'n') sec.limit -= 1;
        }
    }
}
document.addEventListener('keydown', async function(e){
    let key = e.key.toLowerCase();
    if(key == 'escape') loop = 0;

    if(document.activeElement.tagName == 'INPUT') return;
    if(document.activeElement.tagName == 'TEXTAREA') return;

    secratesP(key);
})
//#endregion

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
	
    console.log(`スペース移動: ${mainC.spa} → ${to}`);
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



let playername = 'player';
let playernametrick = 0;
let money = 0;
let bankmoney = 0;
let playerhealth = 0;
let playermaxhealth = 0;
let playerattack = 1;
let playerattackincrease = 0;
let playerattackincreasebefore = 0;
let playerdefense = 0;
let playerdefenseincrease = 0;
let playerdefenseincreasebefore = 0;
let playerexp = 0;
let playerbuff = 0;
let playerskillbuff = 0;
let playerskilldebuff = 0;
let playerpower = 1;
let playershell = 1;
let playermp = 0;
let playermaxmp = 10;
let enemyhealth = 0;
let enemymaxhealth = 0;
let enemydebuff = 0;
let enemyskilldebuff = 0;
let enemyskillbuff = 0;
let playerlevel = 1;
let enemylevel = 1;
let turn = 0;
let turncount = 0;
let phase = 0;
let w = 0;
let x = 0;
let y = 0;
let z = 0;
let damage = 0;
let magic1 = 0;
let magic2 = 0;
let magic3 = 0;
let learnedmagic = 0;
let learnmagic = 0;
let potion = 3;
let bomb = 3;
let skipcard = 3;
let enemyname = 0;
let enemynames =  ["ピンクな先輩", "ブルーな後輩", "過激派のハッカー", "反旗を翻したアンドロイド", "腐敗した落武者", "アスピリン中毒者",
                   "彷徨わない亡霊", "地上の月兎", "悠々自適なクラス委員", "大胆不敵な問題児", "兎角のシルバージャグラー", "デスブリンガー・ナース",
                   "古書館の魔術師", "トラブルメーカーな天才少女", "誰もが恐れる風紀委員長", "自称清楚系超天才病弱美少女ハッカー",'黒服',
                   "大量発生中のツインテ", "ああああ"];
                   // 名前の元!紹介! 1行目-cybercodeonline 2行目-東方ロストワード 3行目-ブルーアーカイブ 4行目-スプラトゥーン3 & 勇者あるある
let enemyprefixe1 = 0;
let enemyprefixe2 = 0;
let enemyprefixes1 = ['コッペパン好きな','猫耳の','メイド服を着た','かっこいい','ボカロ好きの','頭のおかしくなった','マカロンが好きな','ダークモカチップクリームフラペチーノを持った','猫になった'
                     ,'ドンファイのマスターフルコンを目指す','どっちかっていうと猫派な','犬が嫌いな','借り暮らしの','その日暮らしの','手に何か持ってないと落ち着かない','元','課題に追われる','白水色が好きな','承認欲求高めの'
                     ,'「ぼっち・ざ・ろっく」が好きな', '「よふかしのうた」が好きな','「らき☆すた」が好きな','Minecraftが好きな','弾幕ゲームが好きな','ブルーアーカイブが好きな','第五人格が好きな','プロセカが好きな','#コンパスが好きな'
                     ,];
let enemyprefixes2 = ['Discord信者','勇者','魔王','ゾンビ','先生','ドクター','マスター','西の高校生探偵','東の高校生探偵'
                     ,'ツインテ狩り','モス通い','ルフレ使い','真のヒロイン','バカ','天才','戦犯','這い寄る脅威'
                     ,'Mac依存症','ぬいぐるみ依存症','レモンティー依存症','ヘッドフォン依存症','ZEPETO依存症','つぶグミ依存症','黒ピンク依存症','白水色依存症','モバイルバッテリー依存症']
let saydefeats = 0;
let NStimeout = 0;
let skillcooldown = 0;
function tekiou(){
    document.getElementById('EnemyHealth').textContent = enemyhealth;
    document.getElementById('PlayerHealth').textContent = playerhealth;

    if(enemydebuff == 0){document.getElementById('EnemyDebuff').textContent = '';}
    if(enemydebuff == 1){document.getElementById('EnemyDebuff').textContent = 'poison';}
    if(enemydebuff == 2){document.getElementById('EnemyDebuff').textContent = 'deadly poison';}
    if(playerbuff == 0){document.getElementById('PlayerBuff').textContent = '';}
    if(playerbuff == 1){document.getElementById('PlayerBuff').textContent = 'power';}
    if(playerbuff == 2){document.getElementById('PlayerBuff').textContent = 'morepower';}
    if(playerbuff == 3){document.getElementById('PlayerBuff').textContent = 'shell';}
    if(playerbuff == 4){document.getElementById('PlayerBuff').textContent = 'moreshell';}
    if(playerbuff == 5){document.getElementById('PlayerBuff').textContent = 'luck';}
    if(playerbuff == 6){document.getElementById('PlayerBuff').textContent = 'great luck';}
    if(enemyskilldebuff == 0){document.getElementById('EnemySkillDebuff').textContent = '';}
    if(enemyskilldebuff == 1){document.getElementById('EnemySkillDebuff').textContent = 'onslimed';}
    if(playerskillbuff == 0){document.getElementById('PlayerSkillBuff').textContent = '';}
    if(playerskillbuff == 1){document.getElementById('PlayerSkillBuff').textContent = 'spliting';}
    if(playerskillbuff == 2){document.getElementById('PlayerSkillBuff').textContent = 'throw wrench';}
    if(playerskillbuff == 3){document.getElementById('PlayerSkillBuff').textContent = 'gambling';}
    if(playerskillbuff == 4){document.getElementById('PlayerSkillBuff').textContent = 'highing';}
    if(playerskillbuff == 5){document.getElementById('PlayerSkillBuff').textContent = 'motivated';}
    if(playerskilldebuff == 1){document.getElementById('PlayerSkillDebuff').textContent = 'stucking slime';}
    if(playerskilldebuff == 2){document.getElementById('PlayerSkillDebuff').textContent = 'Melted Brain';}
}

let DOM = document.getElementById('main');
let dom = {
    turn: DOM.querySelector('.turn .num'),
}

// beginで名前とか全部やります
function begin(){
    if(document.getElementById('NameInputText').value !== ''){playername = document.getElementById('NameInputText').value;}
    document.getElementById('PlayerName').textContent = playername;
    if(playername == 'greenslime'){
        playernametrick = 1;
        document.getElementById('Skillbutton').innerHTML = '<button class="button" onclick="skillact()">skill</button>';
        document.getElementById('ButtonStyle').textContent = '.button{border: 2px solid #4da856;padding: 2px 3px;background: #bfffc5;cursor: pointer;}';
        //"greenslime"
        // EX 体力を消費して自分のコピーを出し、ダメージを代わりに受けさせる。コピーが倒されると少し回復する。
        // NS 3の倍数のターンの時、敵にスライムを被せる。スライムが被さると攻撃が当たらなくなる。
        // PS 攻撃時、たまに2回ヒットする。
    }else if(playername == 'mechanic'){
        playernametrick = 1;
        document.getElementById('Skillbutton').innerHTML = '<button class="button" onclick="skillact()">skill</button>';
        document.getElementById('ButtonStyle').textContent = '.button{border: 2px solid #ff7373;padding: 2px 3px;background: #fcffc0;cursor: pointer;}';
        // "mechanic"
        // EX タレットを後ろに設置し、追加で攻撃力の0.5倍(四捨五入)のダメージを与える。重複設置可能。
        // NS 2の倍数のターンの時、レンチを投げる。(攻撃力が2倍に)
        // PS 敵の攻撃時、たまにスタンさせて攻撃を無効化する。
    }else if(playername == 'clown'){
        playernametrick = 1;
        document.getElementById('Skillbutton').innerHTML = '<button class="button" onclick="skillact()">skill</button>';
        document.getElementById('ButtonStyle').textContent = '.button{border: 2px solid #FFACF9;padding: 2px 3px;background: #ACF8FF;cursor: pointer;}';
        // "clown"
        // EX 攻撃力の0~5の倍率のダメージを与える爆弾を敵に投げる。
        // NS 3の倍数のターンの時、攻撃の倍率を0倍/2倍/4倍にする。
        // PS slash of lightの当たる確率が下がるが、ダメージは9倍になる。
    }else if(playername == 'zombie'){
        playernametrick = 1;
        document.getElementById('Skillbutton').innerHTML = '<button class="button" onclick="skillact()">skill</button>';
        document.getElementById('ButtonStyle').textContent = '.button{border: 2px solid #6D8346;padding: 2px 3px;background: #32C7D1;cursor: pointer;}';
        // "zombie"
        // EX 敵の体力が半分以下ならば、そのまま味方にすることができる。重複した場合、古い方は消滅する。
        // NS 4の倍数のターンの時、敵を毒にする。
        // PS 死んだ際、1度生き返る。potionを使うと復活回数が増加する。
    }else if(playername == 'touzoku'){
        playernametrick = 1;
        document.getElementById('Skillbutton').innerHTML = '<button class="button" onclick="skillact()">skill</button>';
        document.getElementById('ButtonStyle').textContent = '.button{border: 2px solid #D1B89A;padding: 2px 3px;background: #E4E280;cursor: pointer;}';
        // "touzoku"
        // EX ansatusyaになる。この時にslashを当てると1/2の確率で即死させる。
        // NS 3の倍数のターンの時、2回行動できる。
        // PS doubleslashが確率で4回攻撃になる。
    }else if(playername == 'bomer'){
        playernametrick = 1;
        document.getElementById('Skillbutton').innerHTML = '<button class="button" onclick="skillact()">skill</button>';
        document.getElementById('ButtonStyle').textContent = '.button{border: 2px solid #ff7373;padding: 2px 3px;background: #CBCBCB;cursor: pointer;}';
        document.getElementById('AdditionalPlayerPoint').innerHTML = '<br><i>テンション:</i><i id="BomerTension"></i>';
        bomertekiou()
        // "bomer"
        // EX テンションが10以上あれば、bombを作成できる。テンションは0になる。
        // NS 3の倍数のターンの時、やる気が湧く(1ターン継続)。この状態の時に敵を倒すとテンションが3上がる。
        // PS 敵を倒すとテンションが2上がり、bombを使うとテンションが5上がる。
    }else if(playername == 'zomusan'){
        playernametrick = 1;
        document.getElementById('Skillbutton').innerHTML = '<button class="button" onclick="skillact()">skill</button>';
        document.getElementById('ButtonStyle').textContent = '.button{border: 2px solid #000000;padding: 2px 3px;background: #50C878;cursor: pointer;}';
        // "zomusan"    
        // EX clownみたいな感じで爆弾投げ。普通、水、マグマ、閃光弾
        // NS 4の倍数のターンの時、強制的にエレキギターで殴る。攻撃力の3倍のダメージを与える。
        // PS slashoflightを使った際、当たれば5倍だが、外れれば自分にダメージを与える。
        // SS slashoflightが当たるとたまに脳が溶ける。1ターン制御不能になる
    }else if(playername == 'shaosan'){
        playernametrick = 1;
        document.getElementById('Skillbutton').innerHTML = '<button class="button" onclick="skillact()">skill</button>';
        document.getElementById('ButtonStyle').textContent = '.button{border: 2px solid #ff7373;padding: 2px 3px;background: #fcffc0;cursor: pointer;}';
        // "shaosan"
        // EX 攻撃力を上げるが、相手のレベル(攻撃力)も上がる。
        // NS 5の倍数のターンの時、攻撃力を上げる。
        // PS ダメージを受けた時、攻撃力が上がる。
        // SS 5ターン経過時、攻撃力(増加したやつ)を0にする。
    }else if(playername == 'tontonsan'){
        playernametrick = 1;
        document.getElementById('Skillbutton').innerHTML = '<button class="button" onclick="skillact()">skill</button>';
        document.getElementById('ButtonStyle').textContent = '.button{border: 2px solid #397148;padding: 2px 3px;background: #E14976;cursor: pointer;}';
        // "tontonsan"
        // EX タネマシンガン。1~5あたる。多すぎ
        // NS 6の倍数のターンの時、相手と自分の体力を半分にする。
        // PS 体力が1割以下の場合、beautiful starlinになる
    }else if(playername == 'utusen'){
        playernametrick = 1;
        document.getElementById('Skillbutton').innerHTML = '<button class="button" onclick="skillact()">skill</button>';
        document.getElementById('ButtonStyle').textContent = '.button{border: 2px solid #4c6cb3;padding: 2px 3px;background: #949495;cursor: pointer;}';
        // "utusen"
        // EX 相手の体力が半分以下なら仲間にする｡でなければ､攻撃力の1.5倍のダメージ
        // NS 3の倍数のターンの時、相手か自分の体力を半分にする。運ゲー
        // PS 逆TA(相手より体力がめちゃ低いとダメージを喰らわない)
        // SS 
    }else if(playername == 'emisan'){
        playernametrick = 1;
        //document.getElementById('Skillbutton').innerHTML = '<button class="button" onclick="skillact()">skill</button>';
        document.getElementById('ButtonStyle').textContent = '.button{border: 2px solid #887446;padding: 2px 3px;background: #D4BF8F;cursor: pointer;}';
        // "emisan"
        // EX 
        // NS 
        // PS 
        // SS スキル使用時、たまにミスする。
    }
    document.getElementById('Thisdisappearsafterthegamestartbegin').innerHTML = ' ';
    document.getElementById('Thisdisappearsafterthegamestartnameinput').innerHTML = ' ';
    document.getElementById('BackButtonDesu').innerHTML = '<button align="center" class="button" onclick="GoToCity()">Back</button>';
    reset()
}
function reset(){
    money = 0;
    turn = 0;
    turncount = 0;
    bossbattlenow = 0;
    playerhealth = 0;
    playermaxhealth = 0;
    playerattack = 1;
    playerdefense = 0;
    playerexp = 0;
    playerpower = 1;
    playershell = 1;
    enemyhealth = 0;
    enemymaxhealth = 0;
    playerlevel = 1;
    enemylevel = 1;
    x = 0;
    y = 0;
    magic1 = 0;
    magic2 = 0;
    magic3 = 0;
    learnedmagic = 0;
    potion = 3;
    bomb = 3;
    skipcard = 3;
    skillcooldown = 0;
    zombieresurrections = 1; //ゾンビの復活回数です。
    bomertension = 0; // ボマーのテンションです。
    zomubrain = 0;zomupower = 1; //ゾムの攻撃強化です。
    shaopower = 0; //シャオさんの攻撃強化です。
    tontonevo = 1; //トントンさんの進化可能判定用関数です。
    tekiou()
    document.getElementById('log').textContent = 'ゲーム開始です！！';
    window.setTimeout(start,1000);
    if(playerskillbuff == 1){greenslimecopybreak();};
    if(playername == 'mechanic'){mechanicturretbreak();};
}
function restart(){document.getElementById('PlayerName').textContent = playername;SkillCooldownDecrease();zombieresurrections = 1;bomertension = 0;zomupower = 1;tekiou();document.getElementById('log').textContent = 'バトル再開です！';if(playerskillbuff == 1){greenslimecopybreak();};if(playername == 'mechanic'){mechanicturretbreak();};window.setTimeout(playerturn,500);}
function start(){
    playerhealth = 10;
    playermaxhealth = 10;
    playermp = playermaxmp;
    enemyhealth = 5;
    enemymaxhealth = 5;
    enemyname = enemynames[Math.floor(Math.random() * enemynames.length)];
    document.getElementById("EnemyName").textContent = enemyname;
    playerbuff = 0;
    playerskillbuff = 0;
    enemydebuff = 0;
    enemyskilldebuff = 0;
    if(playername == 'greenslime'){playermaxmp = 8; playermp = playermaxmp;}
    if(playername == 'mechanic'){playerhealth = 5; playermaxhealth = 5;}
    if(playername == 'zombie'){playermaxmp = 5; playermp = playermaxmp;}
    if(playername == 'touzoku'){playerhealth = 3; playermaxhealth = 3;}
    if(playername == 'bomer'){playermaxmp = 7; playermp = playermaxmp; document.getElementById('Skillbutton').innerHTML = '';}
    document.getElementById('EnemyLevel').textContent = enemylevel;
    document.getElementById('PlayerLevel').textContent = playerlevel;
    document.getElementById('PlayerMaxHealth').textContent = playermaxhealth;
    document.getElementById('EnemyMaxHealth').textContent = enemymaxhealth;
    tekiou();
    TurnCountPhase()
    playerturn();
}
let lowedplayerattack = 0; let lowedplayerdefense = 0; let lowedplayermaxmp = 0; let lowedplayermaxhealth = 0; let lowedplayerlevel = 0;
function GoToBattle(){
    document.getElementById('omo').innerHTML = '<span>turn:</span><span id="TurnCount">0</span><br><b id="EnemyName">enemy</b>   <i>Lv.</i><i id="EnemyLevel">1</i>   <u id="EnemyDebuff"></u>   <u id="EnemySkillDebuff"></u><br><span id="EnemyHealth">0</span>/<span id="EnemyMaxHealth">0</span><span id="PlayerFriendFront"></span><br><br><b id="PlayerName">player</b>   <i>Lv.</i><i id="PlayerLevel">1</i>   <u id="PlayerBuff"></u>   <u id="PlayerSkillBuff"></u><span id="AdditionalPlayerPoint"></span><br><span id="PlayerHealth">0</span>/<span id="PlayerMaxHealth">0</span><span id="PlayerFriendBack"></span><br><br><br><button class="button" id="select1" onclick="select1()">attack</button>  <button class="button" id="select2" onclick="select2()">magic</button>  <button class="button" id="select3" onclick="select3()">tools</button>  <button class="button" id="back" onclick="back()">pass</button>  <br><span id="Skillbutton"> </span><br><br><span align="center" id="log">pless "reset" to game start</span><br><span id="StatusAppearDisappear"><button class="button" id="StatusButton" onclick="StatusAppear()">status</button></span><br><span id="Status"> </span><br><br><br><br><span id="BackButtonDesu"><button align="center" class="button" onclick="GoToCity()">Back</button></span>';
    dom.turn.textContent = turncount;
    document.getElementById('EnemyLevel').textContent = enemylevel;
    document.getElementById('PlayerLevel').textContent = playerlevel;
    document.getElementById('PlayerMaxHealth').textContent = playermaxhealth;
    document.getElementById('EnemyMaxHealth').textContent = enemymaxhealth;
    tekiou();
    TurnCountPhase()
    playerturn();
}
async function TurnCountPhase(){
turncount += 1;
dom.turn.textContent = turncount;
if(playernametrick == 1){
    if(skillcooldown > 0){skillcooldown -= 1;};
    if(skillcooldown == 0){document.getElementById('Skillbutton').innerHTML = '<button class="button" onclick="skillact()">skill</button>';};
    if(skillcooldown == 'bomernull'){if(bomertension >= 10){document.getElementById('Skillbutton').innerHTML = '<button class="button" onclick="skillact()">skill</button>';}};
        if((turncount % 3) == 0 && playername == 'greenslime'){
            if(enemyskilldebuff !== 1){
            enemyskilldebuff = 1;
            tekiou();
            document.getElementById('log').textContent = enemyname + 'にスライムが覆い被さった!';
            NStimeout = 1;
            };
        }else if((turncount % 4) == 0 && playername == 'mechanic'){
            playerskillbuff = 2;
            tekiou();
            document.getElementById('log').textContent = 'wrenchを投げる準備ができた!';
            NStimeout = 1;
        }else if((turncount % 3) == 0 && playername == 'clown'){
            playerskillbuff = 3;
            tekiou();
            document.getElementById('log').textContent = 'さあ、ギャンブルの時間だ!!';
            NStimeout = 1;
        }else if((turncount % 4) == 0 && playername == 'zombie'){
            enemydebuff = 1;
            tekiou();
            document.getElementById('log').textContent = enemyname + 'は毒になった!';
            NStimeout = 1;
        }else if((turncount % 3) == 0 && playername == 'touzoku'){
            playerskillbuff = 4;
            turn = 3;
            document.getElementById('log').textContent = 'ちょっとハイになった!';
            NStimeout = 1;
        }else if((turncount % 3) == 0 && playername == 'bomer'){
            playerskillbuff = 5;
            document.getElementById('log').textContent = 'やる気が湧いてきた!!';
            NStimeout = 1;
        }else if((turncount % 4) == 0 && playername == 'zomusan'){
            disappear();
            x = enemyhealth;
            y = enemyhealth;
            z = (playerattack * playerpower * zomupower * 2);
            x -= z;
            x = Math.ceil(x);
            damage = y - x;
            if(damage < 0){damage = 0};
            if(damage > y){damage = y};
            enemyhealth -= damage;
            document.getElementById('log').textContent = zomuNSvoice[Math.floor(Math.random() * zomuNSvoice.length)];
            await delay(1000);
            document.getElementById('log').textContent = 'zomusanはエレキギターで' + enemyname + 'を殴った!';
            await delay(1000);
            tekiou();
            document.getElementById('log').textContent = enemyname + 'に' + damage + 'のダメージ!';
            if(enemyhealth <= 0){enemyhealth = 0; tekiou();};
            if(enemyhealth == 0){window.setTimeout(killedenemy,1000);}
            else {window.setTimeout(enemieturn,1000);}
        }else if((turncount % 5) == 0 && playername == 'shaosan'){
            shaopower += 1;
            document.getElementById('log').textContent = shaoNSvoice[Math.floor(Math.random() * shaoNSvoice.length)];
            NStimeout = 1;
        }else if((turncount % 6) == 0 && playername == 'tontonsan'){
            document.getElementById('log').textContent = tontonNSvoice[Math.floor(Math.random() * tontonNSvoice.length)];
            playerhealth *= 0.5; playerhealth = Math.ceil(playerhealth);
            enemyhealth *= 0.5;  enemyhealth  = Math.ceil(enemyhealth);
            tekiou();
            NStimeout = 1;
        }else if((turncount % 3) == 0 && playername == 'beautiful starlin'){

        }else if((turncount % 3) == 0 && playername == 'utusen'){
            document.getElementById('log').textContent = utuNSvoice[Math.floor(Math.random() * utuNSvoice.length)];
            await delay(1000);
            x = Math.floor(Math.random() * 2);
            if(x == 0){playerhealth *= 0.5;}else{enemyhealth *= 0.5;}//にぶいち
            tekiou();
            NStimeout = 1;
        }
}
    if(NStimeout == 1){await delay(1000); NStimeout = 0;}
    playerturn();
}
async function playerturn(){
    w = 0;
    if(playerskilldebuff == 1){
        x = Math.floor(Math.random() * 3);
        if(x !== 0){
            playerskilldebuff = 0;
            tekiou();
            document.getElementById('log').textContent = 'なんとかスライムを取り払った!!'
        }
        else{
            document.getElementById('log').textContent = 'スライムが邪魔して動けない!!';
            w = 1;
        };
    }
    if(zomubrain == 1){
        document.getElementById('log').textContent = '脳が溶けた!!';
        playerskilldebuff = 2;
        tekiou();
        zomubrain = 0;};
    if(playername == 'tontonsan'){
        x = Math.floor(playermaxhealth * 0.1);
        if(playerhealth <= x && tontonevo == 1){
            document.getElementById('log').textContent = tontonPSvoice[Math.floor(Math.random() * tontonPSvoice.length)];
            await delay(1000);
            playername = 'beautiful starlin';
            document.getElementById('PlayerName').textContent = playername;
            document.getElementById('Skillbutton').innerHTML = '<button class="button" onclick="skillact()">skill</button>';
            document.getElementById('ButtonStyle').textContent = '.button{border: 2px solid #887446;padding: 2px 3px;background: #D4BF8F;cursor: pointer;}';
            tontonevo = 0;
            tontonevotime = 3;
        }}
    if(playername == 'beautiful starlin' && tontonevotime > 0){tontonevotime -= 1;}
    else if(playername == 'beautiful starlin' && tontonevotime == 0){
        playername = 'tontonsan';
        document.getElementById('PlayerName').textContent = playername;
        document.getElementById('Skillbutton').innerHTML = '<button class="button" onclick="skillact()">skill</button>';
        document.getElementById('ButtonStyle').textContent = '.button{border: 2px solid #887446;padding: 2px 3px;background: #D4BF8F;cursor: pointer;}';
    }
    if(w == 0){
    if(playername == 'mechanic'){mechanicturretattack = Math.round(playerattack * 0.5);};
    if(playername == 'touzoku'){touzokufourthslash = Math.floor(Math.random() * 4);}; //1/4でdoubleslashがfourthslashになります 
    if(playername == 'shaosan' && turncount == 6){shaopower = 0; document.getElementById('log').textContent = '疲れた!!';};
    if(turn !== 3){turn = 1;};
    phase = 1;
    document.getElementById('log').textContent = 'あなたのターンです！';
    document.getElementById('select1').textContent = 'attack';
    document.getElementById('select2').textContent = 'magic';
    document.getElementById('select3').textContent = 'tools';
    document.getElementById('back').textContent = 'pass';
    document.getElementById('BackButtonDesu').innerHTML = '<button align="center" class="button" onclick="GoToCity()">Back</button>';
    errorcheck();
    }else if(w == 1){window.setTimeout(enemyorplayer, 1000)}
};
// 選択ボタン
async function select1(){
    if(phase == 1){
        document.getElementById('log').textContent = 'どうやって攻撃する？';
        document.getElementById('select1').textContent = 'slash';
        document.getElementById('select2').textContent = 'double slash';
        document.getElementById('select3').textContent = 'slash of light';
        document.getElementById('back').textContent = 'back';
        phase = 2;
    }else if(phase == 2){
        disappear()
        document.getElementById('log').textContent = playername + 'の攻撃!';
        window.setTimeout(slash, 1000)
    }else if(phase == 3){
        disappear()
        if(magic1 !== 0){
            z = magic1
            magic()
        }else {
            document.getElementById('log').textContent = 'you dont have magic...';
            window.setTimeout(playerturn, 1000)
        }
    }else if(phase == 4){
        disappear()
        if(potion > 0){
            document.getElementById('log').textContent = playername + 'はpotionを使用した!!';
            window.setTimeout(Potion, 1000)
        }else {
            document.getElementById('log').textContent = 'not enough potion...';
            window.setTimeout(playerturn, 1000)
        }
    }else if(phase == 5){
        disappear()
        playerattack += 1;
        document.getElementById('log').textContent = '攻撃力が上がった!';
        if(bossbattlenow == 1){window.setTimeout(GoToCity,1000)}
        else window.setTimeout(nextenemy,1000)
    }else if(phase == 6){
        disappear()
        document.getElementById('log').textContent = magic1 + 'を忘れ、' + learnmagic + 'を覚えた!!';
        magic1 = learnmagic
        if(bossbattlenow == 1){window.setTimeout(GoToCity,1000)}
        else window.setTimeout(nextenemy,1000)
    }
}
async function select2(){
    if(phase == 1){
        document.getElementById('log').textContent = 'どうする？';
        document.getElementById('select1').textContent = magic1;
        document.getElementById('select2').textContent = magic2;
        document.getElementById('select3').textContent = magic3;
        document.getElementById('back').textContent = 'back';
        phase = 3;
    }else if(phase == 2){
        disappear()
        document.getElementById('log').textContent = playername + 'の攻撃!!';
        window.setTimeout(doubleslash, 1000)
    }else if(phase == 3){
        disappear()
        if(magic2 !== 0){
            z = magic2
            magic()
        }else {
            document.getElementById('log').textContent = 'you dont have magic...';
            window.setTimeout(playerturn, 1000)
        }
    }else if(phase == 4){
        disappear()
        if(bomb > 0){
            document.getElementById('log').textContent = playername + 'はbombを使用した!!';
            window.setTimeout(Bomb, 1000)
        }else {
            document.getElementById('log').textContent = 'not enough bomb...';
            window.setTimeout(playerturn, 1000)
        }
        
    }else if(phase == 5){
        disappear()
        phase = 0;
        playerdefense += 1;
        document.getElementById('log').textContent = '防御力が上がった!';
        if(bossbattlenow == 1){window.setTimeout(GoToCity,1000)}
        else window.setTimeout(nextenemy, 1000)
    }else if(phase == 6){
        disappear()
        document.getElementById('log').textContent = magic2 + 'を忘れ、' + learnmagic + 'を覚えた!!';
        magic2 = learnmagic
        if(bossbattlenow == 1){window.setTimeout(GoToCity,1000)}
        else window.setTimeout(nextenemy, 1000)
    }
}
function select3(){
    if(phase == 1){
        document.getElementById('log').textContent = 'どうやって攻撃する？';
        document.getElementById('select1').textContent = 'potion x' + potion;
        document.getElementById('select2').textContent = 'bomb x' + bomb;
        document.getElementById('select3').textContent = 'skipcard x' + skipcard;
        document.getElementById('back').textContent = 'back';
        phase = 4;
    }else if(phase == 2){
        disappear()
        document.getElementById('log').textContent = playername + 'の一閃!!';
        window.setTimeout(slashoflight, 1000)
    }else if(phase == 3){
        disappear()
        if(magic3 !== 0){
            z = magic3
            magic()
        }else {
            document.getElementById('log').textContent = 'you dont have magic...';
            window.setTimeout(playerturn, 1000)
        }
    }else if(phase == 4){
        disappear()
        if(skipcard > 0){
            document.getElementById('log').textContent = playername + 'はskipcardを使用した!!';
            window.setTimeout(Skipcard, 1000)
        }else {
            document.getElementById('log').textContent = 'not enough skipcard...';
            window.setTimeout(playerturn, 1000)
        }
    }else if(phase == 5){
        phase = 0;
        if(learnedmagic == 1){learnmagic = 'heal'}
        else if(learnedmagic == 2){learnmagic = 'power'}
        else if(learnedmagic == 3){learnmagic = 'shell'}
        else if(learnedmagic == 4){learnmagic = 'poison'}
        else if(learnedmagic == 5){learnmagic = 'healer than'}
        else if(learnedmagic == 6){learnmagic = 'luck'}
        else if(learnedmagic == 7){learnmagic = 'more power'}
        else if(learnedmagic == 8){learnmagic = 'more shell'}
        else if(learnedmagic == 9){learnmagic = 'deadly poison'}
        else if(learnedmagic == 10){learnmagic = 'the healest'}
        else if(learnedmagic == 11){learnmagic = 'greatluck'}
        else {
            learnmagic = 'random'
            document.getElementById('log').textcontent = '魔法は見つからなかった...しかしrandomを思いついた!';
            playersutefuri()
        }
        document.getElementById('log').textContent = learnmagic + 'を見つけた!!';
        document.getElementById('select1').textContent = magic1;
        document.getElementById('select2').textContent = magic2;
        document.getElementById('select3').textContent = magic3;
        document.getElementById('back').textContent = 'pass';
        phase = 6;
    }else if(phase == 6){
    disappear()
        document.getElementById('log').textContent = magic3 + 'を忘れ、' + learnmagic + 'を覚えた!!';
        magic3 = learnmagic
        if(bossbattlenow == 1){window.setTimeout(GoToCity,1000)}
        else window.setTimeout(nextenemy, 1000)
    }
}
// 一個選択肢を戻るやつ
function back(){
    if(phase == 1){
    disappear()
        enemieturn();
    }else if(phase == 2){
        playerturn();
    }else if(phase == 3){
        playerturn();
    }else if(phase == 4){
        playerturn();
    }else if(phase == 5){
    disappear()
        phase = 0;
        enemylevel += 1
        document.getElementById('log').textContent = '敵のレベルが上がった!';
        window.setTimeout(nextenemy, 1000)
    }else if(phase == 6){
        window.setTimeout(enemyorplayer, 1000)
    }
    
}
function disappear(){
    document.getElementById('select1').textContent = ' ';
    document.getElementById('select2').textContent = ' ';
    document.getElementById('select3').textContent = ' ';
    document.getElementById('back').textContent = '';
    document.getElementById('BackButtonDesu').innerHTML = '';
    phase = 'null';
}
// playerの攻撃たち
// playerの斬撃攻撃
async function slash(){
    x = enemyhealth;
    y = enemyhealth;
    x -= (playerattack * playerpower + weaponpower * zomupower + shaopower);
    x = Math.ceil(x);
    damage = y - x;
    if(playerskillbuff == 2){
        damage = damage * 2;
        playerskillbuff = 0;
        tekiou();
    };
    if(playerskillbuff == 3){
        z = clowngambling[Math.floor(Math.random() * clowngambling.length)];
        damage = damage * z;
        playerskillbuff = 0;
        tekiou();
        document.getElementById('log').textContent = 'ダメージは' + z + '倍になった!!';
        await delay(1000);
    };
    if(playername == 'touzoku' && touzokuansatusya == 1){z = Math.floor(Math.random() * 2); if(z == 0){damage = enemyhealth;if(bossbattlenow == 1){damage = (Math.floor(enemymaxhealth * 0.1))} document.getElementById('log').textContent = 'ansatusyaの這い寄る一撃!!'; await delay(1000); document.getElementById('PlayerName').textContent = 'touzoku'; touzokuansatusya = 0;}else{damage = 0; document.getElementById('log').textContent = 'ansatusyaは攻撃する前に気づかれた!!'; await delay(1000); document.getElementById('PlayerName').textContent = 'touzoku'; touzokuansatusya = 0;}}
    if(damage < 0){damage = 0};
    if(damage > y){damage = y};
    enemyhealth -= damage;
    document.getElementById('log').textContent = enemyname + 'に' + damage + 'のダメージ!';
    if(enemyhealth < 0){enemyhealth = 0};
    tekiou();
    x = Math.floor(Math.random() * 5); // 1/5の確率
    if(enemyhealth == 0){
        window.setTimeout(killedenemy, 1000);
    }else   if(playername == 'greenslime' && x == 0){
            await delay(1000)
            document.getElementById('log').textContent = 'greenslimeは頑張った!';
            await delay(500)
            x = enemyhealth;
            y = enemyhealth;
            x -= (playerattack * playerpower);
            x = Math.ceil(x);
            damage = y - x;
            if(damage < 0){damage = 0};
            if(damage > y){damage = y};
            enemyhealth -= damage;
            document.getElementById('log').textContent = enemyname + 'に' + damage + 'のダメージ!';
            if(enemyhealth < 0){enemyhealth = 0 }
            tekiou();
            if(enemyhealth == 0){window.setTimeout(killedenemy, 1000)}
            else{
                await delay(1000)
                x = enemyhealth;
                y = enemyhealth;
                x -= (playerattack * playerpower);
                x = Math.ceil(x);
                damage = y - x;
                if(damage < 0){damage = 0};
                if(damage > y){damage = y};
                enemyhealth -= damage;
                document.getElementById('log').textContent = enemyname + 'に' + damage + 'のダメージ!';
                if(enemyhealth < 0){enemyhealth = 0 }
                tekiou();
                if(enemyhealth == 0){window.setTimeout(killedenemy, 1000)}
                else {window.setTimeout(enemyorplayer, 1000)}
                };
    }else {window.setTimeout(enemyorplayer, 1000)};
}
async function doubleslash(){
    x = Math.floor(Math.random() * 3);
        if(x == 0){
            damage = 0
        }else {
            x = enemyhealth;
            y = enemyhealth;
            x -= (playerattack * playerpower + weaponpower * zomupower + shaopower);
            x = Math.ceil(x);
            damage = y - x;
            if(playerskillbuff == 2){damage = damage * 2; playerskillbuff = 0; tekiou();}
            if(playerskillbuff == 3){z = clowngambling[Math.floor(Math.random() * clowngambling.length)]; damage = damage * z; playerskillbuff = 0; tekiou(); document.getElementById('log').textContent = 'ダメージは' + z + '倍になった!!'; await delay(1000);};
            if(damage < 0){damage = 0};
            if(damage > y){damage = y};
            enemyhealth -= damage;
        }
    if(damage == 0){
        document.getElementById('log').textContent = 'miss! ダメージを与えられない!';
    }else {
    document.getElementById('log').textContent = enemyname + 'に' + damage + 'のダメージ!';
    if(enemyhealth < 0){
        enemyhealth = 0
    }
    }
    tekiou();
    if(enemyhealth == 0){
        window.setTimeout(killedenemy, 1000)
    }else {
        x = Math.floor(Math.random() * 3);
        if(x == 0){
            damage = 0
        }else {
            x = enemyhealth;
            y = enemyhealth;
            x -= (playerattack * playerpower + weaponpower * zomupower + shaopower);
            x = Math.ceil(x);
            damage = y - x;
            if(playerskillbuff == 2){damage = damage * 2; playerskillbuff = 0; tekiou();}
            if(playerskillbuff == 3){z = clowngambling[Math.floor(Math.random() * clowngambling.length)]; damage = damage * z; playerskillbuff = 0; tekiou(); document.getElementById('log').textContent = 'ダメージは' + z + '倍になった!!'; await delay(1000);};
            if(damage < 0){damage = 0};
            if(damage > y){damage = y};
            enemyhealth -= damage;
        }
        if(damage == 0){
            await delay(1000);
            document.getElementById('log').textContent = 'miss! ダメージを与えられない!';
        }else {
            await delay(1000);
            document.getElementById('log').textContent = enemyname + 'に' + damage + 'のダメージ!';
                if(enemyhealth < 0){
                    enemyhealth = 0
                }
                if(enemyhealth == 0){
                    window.setTimeout(killedenemy, 1000)
                }   
                tekiou();
        }
        if(playername == 'touzoku' && touzokufourthslash == 1){
            touzokufourthslash == 0;
            await delay(1000);
            document.getElementById('log').textContent = 'touzokuは頑張った!!';
            window.setTimeout(doubleslash, 1000)
        }else
        window.setTimeout(enemyorplayer, 1000)
    }
}
async function slashoflight(){
    if(playername == 'zomusan'){
    x = Math.floor(Math.random() * 3);
    if(x == 0){
        x = Math.ceil(playerattack * playerpower * 5 + weaponpower * zomupower);
        if(x < 0){x = 0}; if(x > enemyhealth){x = enemyhealth};
        enemyhealth -= x; tekiou();
        document.getElementById('log').textContent = enemyname + 'に' + x + 'のダメージ!';
        zomubrain = 1;
        if(enemyhealth == 0){window.setTimeout(killedenemy,1000)}
        else{window.setTimeout(enemyorplayer,1000)};
    }else {
    x = Math.ceil(playerattack * playerpower); //流石に5倍のダメージ与えたら死んじゃうからね、掛け算が少ないのは私の優しさなのだ
    if(x < 0){x = 0}; if(x > playerhealth){x = playerhealth};
    playerhealth -= x; tekiou();
    document.getElementById('log').textContent = 'zomusanに' + x + 'のダメージ!';
    if(playerhealth == 0){window.setTimeout(defeat, 1000)}
    else{window.setTimeout(enemyorplayer, 1000)};
    } // zomusanのslash of lightの様子だね。賭けすぎるかな 
    }else{
    x = Math.floor(Math.random() * 3); // 1/3です
    if(playername == 'clown'){x = Math.floor(Math.random() * 5);} // 1/5です。
    if(x == 0){
        x = Math.ceil(playerattack * playerpower * 3 + weaponpower * zomupower);
        if(playerskillbuff == 2){x *= 2; playerskillbuff = 0; tekiou();}
        if(playerskillbuff == 3){z = clowngambling[Math.floor(Math.random() * clowngambling.length)]; x *= z; playerskillbuff = 0; tekiou(); document.getElementById('log').textContent = 'ダメージは' + z + '倍になった!!'; await delay(1000);};
        if(playername == 'clown') x *= 3; //こちら最高倍率36倍の台です(4x9)
        if(x < 0){x = 0}; if(x > enemyhealth){x = enemyhealth};
        enemyhealth -= x; tekiou();
        document.getElementById('log').textContent = enemyname + 'に' + x + 'のダメージ!';
        if(enemyhealth == 0){window.setTimeout(killedenemy, 1000)}
    }else {document.getElementById('log').textContent = 'miss! ダメージを与えられない!';}
    window.setTimeout(enemyorplayer, 1000)
    }
}
// playerの魔法
// 魔法の一覧です
// heal　20%回復
// power　attack 1.5倍 code:1
// shell　defence 1.5倍 code:3
// poison　敵に毒を付与　毎ターン5%ダメージ code:1
// healerthan　40%回復
// luck　ターン終了時、1/5の確率でターン継続 code:5
// morepower　attack 2倍 code:2
// moreshell defence 2倍 code:4
// deadlypoison　敵に毒を付与　毎ターン10%ダメージ code:2
// thehealest　60%回復
// greatluck　ターン終了後、1/2の確率でターン継続 code:6
// random ランダムな魔法を使用する
function magic(){
    if(playermp > 0){
    if(z == 'heal'){Heal();}
    else if(z == 'power'){Power();}
    else if(z == 'shell'){Shell();}
    else if(z == 'poison'){Poison();}
    else if(z == 'healer than'){Healerthan();}
    else if(z == 'luck'){Luck();}
    else if(z == 'more power'){Morepower();}
    else if(z == 'more shell'){Moreshell();}
    else if(z == 'deadly poison'){Deadlypoison();}
    else if(z == 'the healest'){Thehealest();}
    else if(z == 'greatluck'){Greatluck();}
    else if(z == 'random'){Random();};
    playermp -= 1;
    }else {
        document.getElementById('log').textContent = 'not enough mp...';
        window.setTimeout(playerturn, 1000)
    };
}
function Heal(){
    x = playerhealth
    playerhealth += Math.round(playermaxhealth * 0.2)
    y = playerhealth - x;
    document.getElementById('log').textContent = playername + 'はhealを唱え、' + y + '回復した!';
    if(playerhealth > playermaxhealth){
        playerhealth = playermaxhealth;
    }
    tekiou();
    window.setTimeout(enemyorplayer, 1000)
}
function Power(){
    playerbuff = 1
    playerpower = 1.5
    bufftekiou()
    document.getElementById('log').textContent = playername + 'はpowerを唱えた!';
    window.setTimeout(enemyorplayer, 1000)
}
function Shell(){
    playerbuff = 3
    playershell = 1.5
    bufftekiou()
    document.getElementById('log').textContent = playername + 'はshellを唱えた!';
    window.setTimeout(enemyorplayer, 1000)
}
function Poison(){
    enemydebuff = 1
    bufftekiou()
    document.getElementById('log').textContent = playername + 'はpoisonを唱えた!';
    window.setTimeout(enemyorplayer, 1000)
}
function Healerthan(){
    x = playerhealth
    playerhealth += Math.round(playermaxhealth * 0.4)
    y = playerhealth - x;
    document.getElementById('log').textContent = playername + 'はhealer thanを唱え、' + y + '回復した!!';
    if(playerhealth > playermaxhealth){
        playerhealth = playermaxhealth;
    }
    tekiou();
    window.setTimeout(enemyorplayer, 1000)
}
function Luck(){
    playerbuff = 5
    bufftekiou()
    document.getElementById('log').textContent = playername + 'はluckを唱えた!';
    window.setTimeout(enemyorplayer, 1000)
}
function Morepower(){
    playerbuff = 2
    playerpower = 2
    bufftekiou()
    document.getElementById('log').textContent = playername + 'はmore powerを唱えた!';
    window.setTimeout(enemyorplayer, 1000)
}
function Moreshell(){
    playerbuff = 4
    playershell = 2
    bufftekiou()
    document.getElementById('log').textContent = playername + 'はmore shellを唱えた!';
    window.setTimeout(enemyorplayer, 1000)
}
function Deadlypoison(){
    enemydebuff = 2
    bufftekiou()
    document.getElementById('log').textContent = playername + 'はdeadly poisonを唱えた!';
    window.setTimeout(enemyorplayer, 1000)
}
function Thehealest(){
    x = playerhealth
    playerhealth += Math.round(playermaxhealth * 0.6)
    y = playerhealth - x;
    document.getElementById('log').textContent = playername + 'はthe healestを唱え、' + y + '回復した!!!';
    if(playerhealth > playermaxhealth){
        playerhealth = playermaxhealth;
    }
    tekiou();
    window.setTimeout(enemyorplayer, 1000)
}
function Greatluck(){
    playerbuff = 6
    bufftekiou()
    document.getElementById('log').textContent = playername + 'はgreatluckを唱えた!';
    window.setTimeout(enemyorplayer, 1000)
}
async function Random(){
    document.getElementById('log').textContent = '.........';
    await delay(1000);
    x = Math.floor(Math.random() * 11)
    if(x == 0){
        document.getElementById('log').textContent = 'healが出た!';
        window.setTimeout(Heal, 1000)
    }else if(x == 1){
        document.getElementById('log').textContent = 'powerが出た!';
        window.setTimeout(Power, 1000)
    }else if(x == 2){
        document.getElementById('log').textContent = 'shellが出た!';
        window.setTimeout(Shell, 1000)
    }else if(x == 3){
        document.getElementById('log').textContent = 'poisonが出た!';
        window.setTimeout(Poison, 1000)
    }else if(x == 4){
        document.getElementById('log').textContent = 'healer thanが出た!';
        window.setTimeout(Healerthan, 1000)
    }else if(x == 5){
        document.getElementById('log').textContent = 'luckが出た!';
        window.setTimeout(Luck, 1000)
    }else if(x == 6){
        document.getElementById('log').textContent = 'more powerが出た!';
        window.setTimeout(Morepower, 1000)
    }else if(x == 7){
        document.getElementById('log').textContent = 'more shellが出た!';
        window.setTimeout(Moreshell, 1000)
    }else if(x == 8){
        document.getElementById('log').textContent = 'deadly poisonが出た!';
        window.setTimeout(Deadlypoison, 1000)
    }else if(x == 9){
        document.getElementById('log').textContent = 'the healestが出た!';
        window.setTimeout(Thehealest, 1000)
    }else if(x == 10){
        document.getElementById('log').textContent = 'greatluckが出た!';
        window.setTimeout(Greatluck, 1000)
    }
}

// playerの道具
function Potion(){
    playerhealth = playermaxhealth
    tekiou();
    document.getElementById('log').textContent = '　　　全　　　回　　　復　　　';
    if(playername == 'zombie'){zombieresurrections += 1 };
    potion -= 1;
    window.setTimeout(playerturn, 1000)
}
function Bomb(){
    if(bossbattlenow == 0){enemyhealth = 0;}
    else {enemyhealth -= Math.floor(enemyhealth * 0.2)}
    tekiou();
    if(bossbattlenow == 0){document.getElementById('log').textContent = '私のファイナルエターナルラストアタック!!相手は死ぬ!!!';}
    else {document.getElementById('log').textContent = 'あんまりくらわなさそうだけどいいや!いけ!!クリーパー!!!';};
    bomb -= 1;
    if(playername == 'bomer'){bomerbombused = 1;};
    if(bossbattlenow == 0)window.setTimeout(killedenemy, 1000)
    else window.setTimeout(enemyorplayer, 1000)
}
function Skipcard(){
    turn = 3;
    document.getElementById('log').textContent = 'カードを仕込みました!';
    skipcard -= 1;
    window.setTimeout(playerturn, 1000)
}
let greenslimecopyhealth = 0;
let greenslimecopymaxhealth = 0;
let mechanicturret = 0;
let mechanicturretattack = 0;
let clowngambling = ['0','0','2','2','2','4'];
let zombieresurrections = 0;
let zombiefriendname = 0;
let zombiefriendlevel = 0;
let zombiefriendhealth = 0;
let zombiefriendmaxhealth = 0;
let touzokuansatusya = 0;
let touzokufourthslash = 0;
let bomertension = 0;
let bomerbombused = 0;
let zomupower = 1;
let zomubrain = 0;
let zomuEXvoice = ['死にたくなったら言ってください。助けるんで','出てこいよ、そんなところで芋ってないでさ！','箪笥の中に隠れちゃダメっすよぉw','ま､見えない敵に怯えてな','俺がなんとかするからな'];
let zomuNSvoice = ['ぶしゅしゅしゅしゅ！！','お前の考えなんて読めるんだよ','かまってぇや、マジで','雑魚がよぉ','クソ王子、あなたの目はクソですか','正義は為された'];
let shaopower = 1;
let shaoEXvoice = ['甘いぜオイ、雑魚乙','雑魚乙','お前ぶっ殺すぞ！？','俺が人狼だぜ、かかってこいよ！','夢見んなよクソ視聴者'];
let shaoNSvoice = ['パーティの始まりだぜ！！','煽りキャラ返せこの野郎！！','夢の橋を渡ってください'];
let shaoPSvoice = ['どや､逆転サヨナラホームラン','どう嫌いになった?','強欲だからな','熱い声援ありがとう､グッバイ✩','雑魚乙','皆さんに嫌われようと思います']
let tontonEXvoice = ['ぐう無能、死んでどうぞ','俺はドゥーチェ！','勝てるわけねえだろ！！いい加減にしろ！！','蹄でどつくぞ！','ご主人様以外は早く死んでいいぞ','ゴッドオブトントンマジトントン']
let tontonNSvoice = ['君ひょっとしてトロツキーじゃない？','ゴットオブトントンまじトントン','トンめっちゃ可愛くないですか？']//ここにはましゅやくの方のセリフ入れたい。なんかあったらよろ
let tontonPSvoice = ['かの偉い人は言いました、2倍の数には勝てない','ここからやないか、ここからが楽しいんやろ？さあやろうぜ','高いハードルはくぐれば大丈夫です','無駄死にですねぇ！','怯えて眠れ？']
let tontonevo = 0,tontonevotime = 0;
let utuEXvoice1 = ['いい男ってのは､','手前のケツは手前で拭けるやつのことを','言うんだぜ']
let utuEXvoice2 = ['あ〜死ぬ前に','クッソ可愛い言うこと何でも聞いてくれる浮気に寛容な奥さん持って','隠れ家的パン屋やりたかっっった−−−−−−']
let utuEXvoice3 = ['善悪という考え方自体が､','僕のような強者の足を引っ張るための､','弱者による嫉妬の考えであると']
let utuNSvoice = ['ただの狂った人だyo!','静寂と闇が俺を包み込む','光が俺を照らす','許さない絶対に許さない','お見通しですね','強者に縋る。これが賢い生き方や','「偉そう」ちゃうねん「偉い」ねん']
let utuPSvoice = ['ごめんな、痛いな、いいんだ、心配は、かけていいんだ','こんの腐れがぁ！','悪は勝つ','豚だらけやこんなところ','フランスよ永遠なれ','組織には闇が必要']
// skillの手続き
async function skillact(){
    if(phase == 1){
    if(skillcooldown == 0){
        if(playername == 'greenslime'){
        if(playerhealth > Math.floor(playermaxhealth * 0.5)){
        playerskillbuff = 1;
        bufftekiou()
        x = Math.floor(playermaxhealth * 0.5);
        playerhealth -= x;
        document.getElementById('PlayerFriendFront').innerHTML = '<br><br><b><font color="#2EFE2E">greenslimeのコピー</font></b>  <br><span id="GreenSlimeCopyHealth">0</span>/<span id="GreenSlimeCopyMaxHealth">0</span>';
        greenslimecopymaxhealth = x;
        greenslimecopyhealth = x;
        greenslimecopytekiou()
        document.getElementById('log').textContent = 'greenslimeは分裂した!!';
        tekiou()
        document.getElementById('Skillbutton').innerHTML = '';
        }else {document.getElementById('log').textContent = 'tairyoku ga sukunai desu...';}
    }else if(playername == 'mechanic'){
        document.getElementById('PlayerFriendBack').innerHTML = '<br><br><b><font color="#DF0101">turret</font><span id="MechanicTurret"></span></b>';
        mechanicturret += 1;
        mechanicturrettekiou()
        mechanicturretattack = Math.round(playerattack * 0.5);
        document.getElementById('Skillbutton').innerHTML = '';
        document.getElementById('log').textContent = 'mechacicはturretを設置した!';
        skillcooldown = 3;
    }else if(playername == 'clown'){
        phase = 0;
        disappear();
        document.getElementById('log').textContent = 'clownは爆弾を投げた...';
        document.getElementById('Skillbutton').innerHTML = '';
        window.setTimeout(clownbomb, 1000)
        skillcooldown = 3;
    }else if(playername == 'zombie'){
        if(enemyhealth <= Math.floor(enemymaxhealth * 0.5)){
        if(bossbattlenow == 1){if(enemyhealth <= Math.floor(enemymaxhealth * 0.1)){
        disappear();
        zombiefriendbreak();
        document.getElementById('PlayerFriendFront').innerHTML = '<br><br><b><font id="ZombieFriendName" color="#6D8346"></font></b>   <u>zombied</u>  <br><span id="ZombieFriendHealth">0</span>/<span id="ZombieFriendMaxHealth">0</span>';
        zombiefriendname = enemyname;
        zombiefriendlevel = enemylevel;
        document.getElementById('ZombieFriendName').textContent = zombiefriendname;
        zombiefriendhealth = enemyhealth;
        zombiefriendmaxhealth = enemyhealth;
        enemyhealth = 0;
        tekiou()
        zombiefriendtekiou()
        document.getElementById('log').textContent = 'zombieは' + enemyname + 'に噛みつき、仲間にした!';
        document.getElementById('Skillbutton').innerHTML = '';
        skillcooldown = 4;
        window.setTimeout(killedenemy,1000)
        }}}
    }else if(playername == 'touzoku'){
        touzokuansatusya = 1;
        document.getElementById('PlayerName').textContent = 'ansatusya';
        document.getElementById('log').textContent = 'touzokuはansatusyaになった!!';
        document.getElementById('Skillbutton').innerHTML = '';
        skillcooldown = 8;
    }else if(playername == 'bomer'){
        if(bomertension >= 10){
        bomertension = 0;
        document.getElementById('log').textContent = 'bomerはbombを作成した!!';
        bomertekiou()
        bomb += 1;
        skillcooldown = 'bomernull';
        } 
        else document.getElementById('log').textContent = 'まだテンションが低い...!!';
    }else if(playername == 'zomusan'){
        phase = 0;
        disappear();
        document.getElementById('log').textContent = zomuEXvoice[Math.floor(Math.random() * zomuEXvoice.length)];
        document.getElementById('Skillbutton').innerHTML = '';
        window.setTimeout(zomubomb, 1000)
        skillcooldown = 3;
    }else if(playername == 'shaosan'){
        document.getElementById('log').textContent = shaoEXvoice[Math.floor(Math.random() * shaoEXvoice.length)];
        document.getElementById('Skillbutton').innerHTML = '';
        skillcooldown = 3;
        await delay(1000);
        shaopower += 2;
        enemylevel += 2;
        enemymaxhealth += 10;
        enemyhealth = enemymaxhealth;
        tekiou();
        document.getElementById('EnemyLevel').textContent = enemylevel;
        await delay(1000);
        window.setTimeout(playerturn, 1000)
    }else if(playername == 'tontonsan'){
        document.getElementById('log').textContent = tontonEXvoice[Math.floor(Math.random() * tontonEXvoice.length)];
        await delay(1000);
        document.getElementById('Skillbutton').innerHTML = '';
        skillcooldown = 8;
        x = Math.floor(Math.random() * 5) + 1;
        for(i = 0; i < x; i++){
            if(enemyhealth >= playerattack){
            enemyhealth -= playerattack;
            document.getElementById('log').textContent = enemyname + 'に' + playerattack + 'のダメージを与えた!';
            tekiou()
            await delay(500);
            }else if(enemyhealth < playerattack){
            enemyhealth = 0;
            document.getElementById('log').textContent = enemyname + 'に' + playerattack + 'のダメージを与えた!';
            }
        }
        if(enemyhealth == 0){window.setTimeout(killedenemy,1000);}
        else {window.setTimeout(enemyorplayer, 1000)}
    }else if(playername == 'beautiful starlin'){
        enemyhealth = Math.floor(enemyhealth * 0.5);
        tekiou();
        document.getElementById('log').textContent = '　波　動　拳　';
        document.getElementById('Skillbutton').innerHTML = '';
        skillcooldown = 2;
        window.setTimeout(enemyorplayer, 1000)
    }else if(playername == 'utusen'){
        if(enemyhealth <= Math.floor(enemymaxhealth * 0.5)){
            x = Math.floor(Math.random() * 3)+1;
                 if(x ==1){document.getElementById('log').textContent = utuEXvoice1[0];await delay(1000);document.getElementById('log').textContent = utuEXvoice1[1];await delay(1000);document.getElementById('log').textContent = utuEXvoice1[2];await delay(1000);}
            else if(x ==2){document.getElementById('log').textContent = utuEXvoice2[0];await delay(1000);document.getElementById('log').textContent = utuEXvoice2[1];await delay(1000);document.getElementById('log').textContent = utuEXvoice2[2];await delay(1000);}
            else if(x ==3){document.getElementById('log').textContent = utuEXvoice3[0];await delay(1000);document.getElementById('log').textContent = utuEXvoice3[1];await delay(1000);document.getElementById('log').textContent = utuEXvoice3[2];await delay(1000);}
            disappear(); zombiefriendbreak();
            document.getElementById('PlayerFriendFront').innerHTML = '<br><br><b><font id="ZombieFriendName" color="#4c6cb3"></font></b>   <u>friended</u>  <br><span id="ZombieFriendHealth">0</span>/<span id="ZombieFriendMaxHealth">0</span>';
            zombiefriendname = enemyname;
            zombiefriendlevel = enemylevel;
            document.getElementById('ZombieFriendName').textContent = zombiefriendname;
            zombiefriendhealth = enemyhealth;
            zombiefriendmaxhealth = enemyhealth;
            enemyhealth = 0;
            tekiou(); zombiefriendtekiou();
            document.getElementById('log').textContent = 'utusenは' + enemyname + 'を仲間にした!';
            document.getElementById('Skillbutton').innerHTML = ''; skillcooldown = 4;
            document.getElementById('EnemyName').textContent = '???';
            window.setTimeout(killedenemy,1000);
            }else {
                document.getElementById('log').textContent = '仲間になる気がないなら殺します';//適当セリフ　「「「適当セリフ」」」
                await delay(1000);
                x = Math.ceil(playerattack * (playerpower * 2) + (weaponpower * 3));//武器の攻撃力が三倍乗ります　これいいね　倍率高まるやつ
                if(x < 0){x = 0}; if(x > enemyhealth){x = enemyhealth};
                enemyhealth -= x; tekiou(); if(enemyhealth < 0){enemyhealth = 0};
                document.getElementById('log').textContent = enemyname + 'に' + x + 'のダメージ!';
                document.getElementById('Skillbutton').innerHTML = ''; skillcooldown = 2;
                window.setTimeout(enemyorplayer, 1000)
            }
    }
    }else {
      document.getElementById('log').textContent = 'skill is not ready...';}
    }
}
function greenslimecopytekiou(){
    document.getElementById('GreenSlimeCopyHealth').textContent = greenslimecopyhealth;
    document.getElementById('GreenSlimeCopyMaxHealth').textContent = greenslimecopymaxhealth;
    }
function greenslimecopybreak(){
    playerskillbuff = 0;
    bufftekiou()
    x = Math.floor(greenslimecopymaxhealth * 0.7);
    playerhealth += x;
    if(playerhealth > playermaxhealth){playerhealth = playermaxhealth;}
    document.getElementById('PlayerFriendFront').innerHTML = ' ';
    greenslimecopymaxhealth = 0;
    greenslimecopyhealth = 0;
    skillcooldown = 5;
    document.getElementById('log').textContent = 'greenslimeのコピーは倒された...';
}
function mechanicturrettekiou(){
    document.getElementById('MechanicTurret').textContent = 'x' + mechanicturret;
    }
function mechanicturretbreak(){
    document.getElementById('PlayerFriendBack').innerHTML = '';
    mechanicturret = 0;
    mechanicturretattack = 0;
}
function clownbomb(){
    x = Math.floor(Math.random() * 6);
    if(x == 0){
        document.getElementById('log').textContent = 'しかし不発弾だった!!';
        phase = 1; window.setTimeout(playerturn, 1000);
    }else if(x == 5){
        document.getElementById('log').textContent = 'Lucky! 爆弾は焼夷弾だった!!!';
        window.setTimeout(clownbombexplosion, 1000)
    }else if(x == 4){
        document.getElementById('log').textContent = '爆弾は花火だった!';
        window.setTimeout(clownbombexplosion, 1000)
    }else if(x == 3){
        document.getElementById('log').textContent = '爆弾は毒ガス入りだった!!';
        enemydebuff = 1; // 毒ガス入りだった場合
        tekiou();
        window.setTimeout(clownbombexplosion, 1000)
    }else if(x == 2){
        document.getElementById('log').textContent = '爆弾はスライム入りだった!!';
        enemyskilldebuff = 1; // スライム入りだった場合
        tekiou();
        window.setTimeout(clownbombexplosion, 1000)
    }else if(x == 1){
        document.getElementById('log').textContent = '爆発した..だがただの特殊な薬品だった!!';
        window.setTimeout(clownbombexplosion, 1000)
    }
}
function clownbombexplosion(){
    y = Math.floor(x * playerattack);
    if(y > enemyhealth){y = enemyhealth;};
    enemyhealth -= y;
    if(enemyhealth < 0){enemyhealth = 0};
    tekiou();
    document.getElementById('log').textContent = '敵に' + y + 'のダメージを与えた!';
    if(enemyhealth == 0){window.setTimeout(killedenemy,1000);;}
    else {phase = 1; window.setTimeout(enemyorplayer, 1000)};
}
function zombiefriendtekiou(){
    document.getElementById('ZombieFriendHealth').textContent = zombiefriendhealth;
    document.getElementById('ZombieFriendMaxHealth').textContent = zombiefriendmaxhealth;
}
function zombiefriendbreak(){
    zombiefriendname = 0;
    document.getElementById('PlayerFriendFront').innerHTML = '';
}
function bomertekiou(){
    document.getElementById('BomerTension').textContent = bomertension;
}
function zomubomb(){
    x = Math.floor(Math.random() * 4);
    if(x == 0){
        document.getElementById('log').textContent = 'どっっっっっかーん!!';
        window.setTimeout(zomubombexplosion, 1000)
    }else if(x == 3){
        document.getElementById('log').textContent = '祈祷師の涙だー!!';
        window.setTimeout(zomubombexplosion, 1000)
    }else if(x == 2){
        document.getElementById('log').textContent = '爆弾は閃光弾だった!!';
        window.setTimeout(zomubombexplosion, 1000)
    }else if(x == 1){
        document.getElementById('log').textContent = '溶岩遊泳が出た!!';
        window.setTimeout(zomubombexplosion, 1000)
    }
}
function zomubombexplosion(){
    y = 0;
    if(x == 0){y = Math.floor(1.5 * playerattack);}
    if(x == 1){y = Math.floor(3 * playerattack);}
    if(x == 2){y = 1}
    if(y > enemyhealth){y = enemyhealth;};
    enemyhealth -= y; tekiou();
    if(x == 3){y = 0}
    else{document.getElementById('log').textContent = '敵に' + y + 'のダメージを与えた!';}
    if(enemyhealth == 0){window.setTimeout(killedenemy,1000);}
    else if(x == 2){document.getElementById('log').textContent = enemyname + 'は目が眩んでいる!'; turn = 3; window.setTimeout(playerturn, 1000);}
    else if(x == 3){document.getElementById('log').textContent = enemyname + 'は流されて行った!'; window.setTimeout(nextenemy, 1000);}
    else {phase = 1; window.setTimeout(enemyorplayer, 1000)};
}
// enemieturnまでの道のり
function enemyorplayer(){
    if(turn == 1){
        y = 1;
        if(playerbuff == 5){y = Math.floor(Math.random() * 5);}
        if(playerbuff == 6){y = Math.floor(Math.random() * 3);}
        if(y == 0){
            document.getElementById('log').textContent = 'Lucky♪';
            window.setTimeout(playerturn, 1000)
        }else if(bossbattlenow == 0){enemieturn()}else{bossenemyturn()}
        }else if(turn == 3){
            document.getElementById('log').textContent = 'スキップ!!!';
            window.setTimeout(playerturn, 1000)
            turn = 1;
        }
}
// enemyの手続き
async function enemieturn(){
    if(playername == 'mechanic' && mechanicturret > 0){
        document.getElementById('log').textContent = 'turretの攻撃!';
        await delay(1000);
        x = enemyhealth;
        y = enemyhealth;
        x -= (mechanicturretattack * mechanicturret);
        x = Math.floor(x);
        damage = y - x;
        if(damage < 0){damage = 0};
        if(damage > y){damage = y};
            enemyhealth -= damage;
        document.getElementById('log').textContent = enemyname + 'に' + damage + 'のダメージ!!';
        if(enemyhealth < 0){enemyhealth = 0};
        tekiou();
        await delay(1000);
        }
    if(enemyhealth == 0){killedenemy();}
    else {
    turn = 2;
    document.getElementById('log').textContent = '敵のターンです!';
    if(playername == 'shaosan' && shaopower > 0){shaopower -= 1};//学マスの好印象みたいな感じ。毎ターン減る
    window.setTimeout(Enemyattack, 1000);
    }
}
async function Enemyattack(){
    w = 1;
    x = playerhealth;
    y = playerhealth;
    x -= enemylevel;
    x += (playerdefense * playershell + armorshell);
    damage = playerhealth - x;
    if(damage < 0){damage = 0;};
    if(enemyskilldebuff == 1){damage = 0;};
    if(playername == 'utusen' && (enemyhealth - playerhealth) > 3){damage = 0; document.getElementById('log').textContent = utuPSvoice[Math.floor(Math.random() * utuPSvoice.length)]; await delay(1000);};//こちら逆TAです
    if(playername == 'mechanic'){w = Math.floor(Math.random() * 5);}; // mechanicのPSのスタンの動き(1/5)
    if(w == 0){damage = 0;};
    if(playerskillbuff == 1){y = greenslimecopyhealth; greenslimecopyhealth -= damage; if(greenslimecopyhealth < 0){greenslimecopyhealth = 0} greenslimecopytekiou(); greenslimecopyhealth = Math.floor(greenslimecopyhealth); z = y - greenslimecopyhealth; if(greenslimecopyhealth == 0){greenslimecopybreak(); await delay(1000)};}
    else if(zombiefriendname !== 0){y = zombiefriendhealth; zombiefriendhealth -= damage; if(zombiefriendhealth < 0){zombiefriendhealth = 0} zombiefriendtekiou(); zombiefriendhealth = Math.floor(zombiefriendhealth); z = y - zombiefriendhealth; if(zombiefriendhealth == 0){zombiefriendbreak(); await delay(1000)};}
    else {playerhealth -= damage; playerhealth = Math.floor(playerhealth); z = y - playerhealth;};
    if(w == 0){document.getElementById('log').textContent = enemyname + 'はスタンした!!';}
    else if(z == 0){document.getElementById('log').textContent = 'miss! ' + playername + 'にダメージを与えられない!';}
    else {
        if(playername == 'bomer' && bomertension > 0){bomertension -= 1; bomertekiou()}; // bomerのtensionを下げる動き
        document.getElementById('log').textContent = playername + 'に' + z + 'のダメージ!';
        if(playerhealth < 0){playerhealth = 0};
        if(playerhealth == 0){defeat();turn = 0;}
        tekiou();
        if(turn == 2){
        if(playername == 'shaosan'){tekiou(); await delay(1000); shaopower += 1; shaopower = Math.floor(shaopower * 10) / 10; document.getElementById('log').textContent = shaoPSvoice[Math.floor(Math.random() * shaoPSvoice.length)];};// shaosanのpowerを上げる動き
        if(playername == 'beautiful starlin'){
            await delay(1000);
            document.getElementById('log').tectContent = '「同志スターリンのドキドキNKVD尋問ゲーム」を見ていい感じにつけようと思います。';
            await delay(1000);
            document.getElementById('log').textContent = 'もうちょい待ってな';
            await delay(1000);
            x = enemyhealth; x = (playerattack * 0.8 * playerpower + weaponpower);//0.8倍のダメージ
            x = Math.ceil(x); damage = x;
            if(damage < 0){damage = 0}; if(damage > enemyhealth){damage = enemyhealth};
            enemyhealth -= damage;
            document.getElementById('log').textContent = enemyname + 'に' + damage + 'のダメージ!';
        }}
    };
    if(enemyskilldebuff == 1){await delay(1000);enemyskilldebuff = 0;tekiou();document.getElementById('log').textContent = enemyname + 'からスライムが剥がれた!';};
    if(turn == 2){
    if(enemydebuff == 1){
        x = enemyhealth;
        enemyhealth -= enemymaxhealth * 0.05
        enemyhealth = Math.floor(enemyhealth)
        if(enemyhealth < 0){enemyhealth = 0}
        y = x - enemyhealth;
    }else if(enemydebuff == 2){
        x = enemyhealth;
        enemyhealth -= enemymaxhealth * 0.1
        enemyhealth = Math.floor(enemyhealth)
        if(enemyhealth < 0){enemyhealth = 0}
        y = x - enemyhealth;
    } 
    if(enemydebuff == 1 || enemydebuff == 2){await delay(1000);document.getElementById('log').textContent = enemyname + 'は毒で' + y + 'のダメージ!';};
    tekiou();
    if(enemyhealth < 0){enemyhealth = 0}
    if(enemyhealth == 0){window.setTimeout(killedenemy, 1000)}
    else {
        if(playerskillbuff == 5){await delay(1000); playerskillbuff = 0; document.getElementById('log').textContent = 'やる気が落ち着いた!';}
        await delay(1000);
        TurnCountPhase()
    }
}
}
// ゲームの判定のお話
async function killedenemy(){
    if(bossbattlenow == 1){killedbossenemy();}
    else{
    turn = 0;
    x = playerexp
    playerexp += enemylevel;
    y = playerexp - x;
    document.getElementById('log').textContent = enemyname + 'を倒した!';
    if(playername == 'bomer'){z = 0; z += 2; if(playerskillbuff == 5){z += 1; playerskillbuff = 0; tekiou();}; if(bomerbombused == 1){z += 3; bomerbombused = 0;}; await delay(1000); bomertension += z; document.getElementById('log').textContent =  'bomerはテンションが' + z + '上がった!'; bomertekiou();};
    if(playername == 'zomusan'){zomupower = 1;};
    if(playername == 'tontonsan'){tontonevo = 1;};
    await delay(1000);
    z = Math.floor(Math.random() * 11) + 1;
    money += z;
    document.getElementById('log').textContent =  z + '€を獲得した!';
    window.setTimeout(expget, 1000);
    }
}
function expget(){
    document.getElementById('log').textContent = y + 'の経験値を奪った!';
    window.setTimeout(playerlevelup, 1000)
}
function playerlevelup(){
    if(playerexp >= playerlevel){
        playerlevel += 1;
        playerexp = 0;
        learnedmagic += 1
        playermaxhealth += 1;
        playerhealth = playermaxhealth;
        document.getElementById('PlayerLevel').textContent = playerlevel;
        document.getElementById('PlayerHealth').textContent = playerhealth;
        document.getElementById('PlayerMaxHealth').textContent = playermaxhealth;
        document.getElementById('log').textContent = 'レベルアップ!!';
        window.setTimeout(playersutefuri, 1000)
    }else nextenemy();
}
function nextenemy(){
    turncount = 0;
    dom.turn.textContent = turncount;
    playermp = playermaxmp;
    playerbuff = 0;
    playerpower = 1;
    playershell = 1;
    x = 0;
    if(playerskillbuff == 1){x = 1}
    playerskillbuff = 0;
    if(x == 1){playerskillbuff = 1}
    enemydebuff = 0;
    enemyskilldebuff = 0;
    bufftekiou()
    mechanicturretbreak();
    enemylevel += (Math.floor(Math.random() * 3) - 1); // -1 ~ +1 
    if(playernametrick = 1){enemylevel += (Math.floor(Math.random() * 2));} // 0 ~ +1} // 名前付きのつよつよplayerのためのセプテット(?)(level)
    if(enemylevel < 1){enemylevel = 1}
    enemymaxhealth += 1;
    if(playernametrick = 1){enemymaxhealth += (Math.floor(Math.random() * 2)); enemymaxhealth += (Math.floor(Math.random() * 2));} // 0 ~ +2} // 名前付きのつよつよplayerのためのセプテット(?)(health)
    enemyhealth = enemymaxhealth;
    enemyname = 0;
    enemyprefixe1 = 0;
    enemyprefixe2 = 0;
    enemyname = enemynames[Math.floor(Math.random() * enemynames.length)]; // 敵の名前を決めます
    y = Math.floor(Math.random() * 3); // 1/2
    if(y !== 0){enemyprefixe1 = enemyprefixes1[Math.floor(Math.random() * enemyprefixes1.length)]}
    y = Math.floor(Math.random() * 3); // 1/2
    if(y !== 0){enemyprefixe2 = enemyprefixes2[Math.floor(Math.random() * enemyprefixes2.length)]}
    if(enemyprefixe1 !== 0 && enemyprefixe2 !== 0){enemyname = enemyprefixe1 + ' ' + enemyprefixe2 + ' ' + enemyname} // これが理想の幻想郷(?)
    else if(enemyprefixe1 !== 0 && enemyprefixe2 == 0){enemyname = enemyprefixe1 + ' ' + enemyname}
    else if(enemyprefixe1 == 0 && enemyprefixe2 !== 0){enemyname = enemyname}
    else {enemyname = enemyname}; // 敵に接頭辞を確率で付与します。意味はありません。じゃあなんでつけるんって思うよね。それはね、おもしろいからだよ　ひとえに愛だよ
    document.getElementById("EnemyName").textContent = enemyname;
    document.getElementById('log').textContent = enemyname + 'が現れた!';
    document.getElementById('EnemyLevel').textContent = enemylevel;
    document.getElementById('EnemyMaxHealth').textContent = enemymaxhealth;
    tekiou();
    window.setTimeout(TurnCountPhase, 1000);
}   
function playersutefuri(){
    document.getElementById('log').textContent = 'どの能力を上げますか?';
    document.getElementById('select1').textContent = 'attack';
    document.getElementById('select2').textContent = 'defense';
    document.getElementById('select3').textContent = 'magic';
    document.getElementById('back').textContent = 'enemy';
    phase = 5;
}
function defeat(){
    if(playername == 'zombie' && zombieresurrections > 0){
        zombieresurrections -= 1;
        document.getElementById('log').textContent = 'zombieはなんとか復活しました!!';
        playerhealth = Math.floor(playermaxhealth * 0.5)
        window.setTimeout(playerturn, 1000);}
    else
    if(playerlevel < 3){saydefeats = ['あはは..負けちゃいましたね....防御力を上げると良いですよ!', 'あはは..負けちゃいましたね....double slashは運要素も少ないので強いですよ!', 'あはは..負けちゃいましたね....魔法にターン数制限はありません!いっぱい使っちゃいましょう!','あはは..負けちゃいましたね....mechanicは防御全振りで戦うと良いですよ!','あはは..負けちゃいましたね....zombieは生き返ることができるのでそれで慣れると良いですよ!'];}
    else {saydefeats = [playername + 'は力尽きた...残念でしたね！にはははは〜！', playername + 'は..まけました', '残念だったね!すごい惜しかったね!!', 'まけちゃったか..ねぇ、もう一回、やってみない?','あれあれ〜？まけちゃったんですか〜？？よっわw'];}
    document.getElementById('log').textContent = saydefeats[Math.floor(Math.random() * saydefeats.length)];
    window.setTimeout(reset, 2000)
}
async function errorcheck(){if(playerattack == Infinity || playerdefense == Infinity || playerhealth == Infinity ||  playermaxhealth == Infinity || playerlevel == Infinity || playerpower == Infinity || playermaxmp == Infinity || playershell == Infinity || isNaN(playerhealth) || isNaN(playermaxhealth) || isNaN(playerattack) || isNaN(playerdefense) || isNaN(playermaxmp) || isNaN(playerpower) || isNaN(playershell) || isNaN(playerlevel) || potion == Infinity || money == Infinity || bomb == Infinity || skipcard == Infinity || isNaN(potion) || isNaN(money) || isNaN(bomb) || isNaN(skipcard)){document.getElementById('log').textContent = 'error100が発生しました。'; await delay(1000); document.getElementById('log').textContent = 'リブートを開始します。'; await delay(1000); open('about:blank', '_self').close();}} //おっとこれは...?}
function StatusAppear(){
    document.getElementById('StatusAppearDisappear').innerHTML = '<button class="button" id="StatusButton" onclick="StatusDisappear()">status</button>';
    document.getElementById('Status').innerHTML = '攻撃力:' + playerattack + '   防御力:' + playerdefense + '   魔力:' + playermp + '<br>' + '   経験値:' + playerexp + '   お金' + money + '€';
}
function StatusDisappear(){
    document.getElementById('StatusAppearDisappear').innerHTML = '<button class="button" id="StatusButton" onclick="StatusAppear()">status</button>';
    document.getElementById('Status').textContent = '';
}
// こっからcityとかbossとかのやつです
function GoToCity(){
    document.getElementById('omo').innerHTML = '<button class="button" id="GoToBattle" onclick="GoToBattle()">Go To Battle</button><br><br><br><button class="button" id="GoToBossBattle" onclick="GoToBossBattle()">Go To Boss Battle</button><br><br><br><button class="button" id="GoToCityBattle" onclick="GoToShop()">Go To Shop</button><br><br><br>';
} // document.getElementById("LevelPlate").src = 'level_plate_' + x + '.png';
let nowshop = 0;
let haveweapons = [];
let havearmors = [];
let havetools = [];
let equipweapon = 0;
let equiparmor = 0;
let equiptool1 = 0;
let equiptool2 = 0;
let equiptool3 = 0;
let weaponpower = 0;
let armorshell = 0;
function GoToShop(){
    nowshop = 0;
    document.getElementById('omo').innerHTML = '<span id="InShopScene"><button class="button" id="ShopBuyWeapons" onclick="ShopBuyWeapons()">Buy Weapons</button><br><br><button class="button" id="ShopBuyArmors" onclick="ShopBuyArmors()">Buy Armors</button><br><br><button class="button" id="ShopBuyTools" onclick="ShopBuyTools()">Buy Tools</button><br><br><button class="button" id="ShopEquip" onclick="GoToEquip()">Equip Center</button></span><br><br><br><br><button class="button" id="BackToCity" onclick="GoToCity()">Back To City</button>';
}
function ShopBuyWeapons(){
    nowshop = 1;
    document.getElementById('omo').innerHTML = '<span id="InShopScene"><span id="SHOPMONEY"></span><p>ここにはこんなものがあるけど、どうする？<br><iframe height="230" width="200" src="https://koppepan-orange-game.github.io/game_daisuki/clicker_of_mugen_shop_weapons.txt"></iframe><br><input type="text" id="ShopInputText" minlength="2" maxlength="2" size="16" placeholder="write number here"><button class="button" onclick="ShopBuyButton()">Buy</button><br><span id="SHOPlog"></span></p><button class="button" id="BakcToShop" onclick="GoToShop()">Back To Shop</button></span>';
    SHOPmoneytekiou();
}
function ShopBuyArmors(){
    nowshop = 2;
    document.getElementById('omo').innerHTML = '<span id="InShopScene"><span id="SHOPMONEY"></span><p>うちの店ではこんなものが売ってるよ<br><iframe height="230" width="200" src="https://koppepan-orange-game.github.io/game_daisuki/clicker_of_mugen_shop_armors.txt"></iframe><br><input type="text" id="ShopInputText" minlength="2" maxlength="2" size="16" placeholder="write number here"><button class="button" onclick="ShopBuyButton()">Buy</button><br><span id="SHOPlog"></span></p><button class="button" id="BakcToShop" onclick="GoToShop()">Back To Shop</button></span>';
    SHOPmoneytekiou();
}
function ShopBuyTools(){
    nowshop = 3;
    document.getElementById('omo').innerHTML = '<span id="InShopScene"><span id="SHOPMONEY"></span><p>いらっしゃいませぇぇぇぇぇ？？ご注文をどうぞ！！！！<br><iframe height="230" width="200" src="https://koppepan-orange-game.github.io/game_daisuki/clicker_of_mugen_shop_tools.txt"></iframe><br><input type="text" id="ShopInputText" minlength="2" maxlength="2" size="16" placeholder="write number here"><button class="button" onclick="ShopBuyButton()">Buy</button><br><span id="SHOPlog"></span></p><br><br><br><br><button class="button" id="BackToShop" onclick="GoToShop()">Back To Shop</button></span>';
    SHOPmoneytekiou();
}
function ShopBuyButton(){
    shopinputtext = document.getElementById('ShopInputText').value;
    switch(shopinputtext){
      case '01':
        if(nowshop == 1){
        if(haveweapons.includes("木の棒")){document.getElementById('SHOPlog').textContent = 'you already have a it!';}
        else{
        if(money >= 20){money -= 20; haveweapons.push('木の棒');document.getElementById('SHOPlog').textContent = '木の棒を購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        }
        break;
        }else if(nowshop == 2){
        if(havearmors.includes("マスク")){document.getElementById('SHOPlog').textContent = 'you already have a it!';}
        else{
        if(money >= 10){money -= 10; havearmors.push('マスク');document.getElementById('SHOPlog').textContent = 'マスクを購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        }
        break;
        }else if(nowshop == 3){
        if(money >= 30){money -= 30; havetools.push('アスピリン');document.getElementById('SHOPlog').textContent = 'アスピリンを購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        break;
        }
      case '02':
        if(nowshop == 1){
        if(haveweapons.includes("木刀")){document.getElementById('SHOPlog').textContent = 'you already have a it!';}
        else{
        if(money >= 50){money -= 50; haveweapons.push('木刀');document.getElementById('SHOPlog').textContent = '木刀を購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        }
        break;
        }else if(nowshop == 2){
        if(havearmors.includes("薄めの本")){document.getElementById('SHOPlog').textContent = 'you already have a it!';}
        else{
        if(money >= 20){money -= 20; havearmors.push('薄めの本');document.getElementById('SHOPlog').textContent = '薄い本を購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        }
        break;
        }else if(nowshop == 3){
        if(money >= 50){money -= 50; havetools.push('パブロン');document.getElementById('SHOPlog').textContent = 'パブロンを購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        break;
        }
      case '03':
        if(nowshop == 1){
        if(haveweapons.includes("竹刀")){document.getElementById('SHOPlog').textContent = 'you already have a it!';}
        else{
        if(money >= 100){money -= 100; haveweapons.push('竹刀');document.getElementById('SHOPlog').textContent = '竹刀を購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        }
        break;
        }else if(nowshop == 2){
        if(havearmors.includes("木の板")){document.getElementById('SHOPlog').textContent = 'you already have a it!';}
        else{
        if(money >= 50){money -= 50; havearmors.push('木の板');document.getElementById('SHOPlog').textContent = '木の板を購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        }
        break;
        }else if(nowshop == 3){
        if(money >= 100){money -= 100; havetools.push('トリプシン');document.getElementById('SHOPlog').textContent = 'トリプシンを購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        break;
        }
      case '04':
        if(nowshop == 1){
        if(haveweapons.includes("石ころ")){document.getElementById('SHOPlog').textContent = 'you already have a it!';}
        else{
        if(money >= 200){money -= 200; haveweapons.push('石ころ');document.getElementById('SHOPlog').textContent = '石ころを購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        }
        break;
        }else if(nowshop == 2){
        if(havearmors.includes("テッパン")){document.getElementById('SHOPlog').textContent = 'you already have a it!';}
        else{
        if(money >= 100){money -= 100; havearmors.push('テッパン');document.getElementById('SHOPlog').textContent = 'テッパンを購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        }
        break;
        }else if(nowshop == 3){
        if(money >= 500){money -= 500; havetools.push('ルル');document.getElementById('SHOPlog').textContent = 'ルルを購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        break;
        }
      case '05':
        if(nowshop == 1){
        if(haveweapons.includes("大きな石")){document.getElementById('SHOPlog').textContent = 'you already have a it!';}
        else{
        if(money >= 300){money -= 300; haveweapons.push('大きな石');document.getElementById('SHOPlog').textContent = '大きな石を購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        }
        break;
        }else if(nowshop == 2){
        if(havearmors.includes("鍋の蓋")){document.getElementById('SHOPlog').textContent = 'you already have a it!';}
        else{
        if(money >= 300){money -= 300; havearmors.push('鍋の蓋');document.getElementById('SHOPlog').textContent = '鍋の蓋を購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        }
        break;
        }
      case '06':
        if(nowshop == 1){
        if(haveweapons.includes("レンガ")){document.getElementById('SHOPlog').textContent = 'you already have a it!';}
        else{
        if(money >= 500){money -= 500; haveweapons.push('レンガ');document.getElementById('SHOPlog').textContent = 'レンガを購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        }
        break;
        }else if(nowshop == 2){
        if(havearmors.includes("厚めの本")){document.getElementById('SHOPlog').textContent = 'you already have a it!';}
        else{
        if(money >= 500){money -= 500; havearmors.push('厚めの本');document.getElementById('SHOPlog').textContent = '厚めの本を購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        }
        break;
        }
      case '07':
        if(nowshop == 1){
        if(haveweapons.includes("薄めの紙")){document.getElementById('SHOPlog').textContent = 'you already have a it!';}
        else{
        if(money >= 20){money -= 20; haveweapons.push('薄めの紙');document.getElementById('SHOPlog').textContent = '薄めの紙を購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        }
        break;
        }else if(nowshop == 2){
        if(havearmors.includes("ドア")){document.getElementById('SHOPlog').textContent = 'you already have a it!';}
        else{
        if(money >= 1000){money -= 1000; havearmors.push('ドア');document.getElementById('SHOPlog').textContent = 'ドアを購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        }
        break;
        }
      case '08':
        if(nowshop == 1){
        if(haveweapons.includes("カード")){document.getElementById('SHOPlog').textContent = 'you already have a it!';}
        else{
        if(money >= 77){money -= 77; haveweapons.push('カード');document.getElementById('SHOPlog').textContent = 'カードを購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        }
        break;
      }
      case '09':
        if(nowshop == 1){
        if(haveweapons.includes("ハサミ")){document.getElementById('SHOPlog').textContent = 'you already have a it!';}
        else{
        if(money >= 600){money -= 600; haveweapons.push('はさみ');document.getElementById('SHOPlog').textContent = 'はさみを購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        }
        break;
        }
      case '10':
        if(nowshop == 1){
        if(haveweapons.includes("ナイフ")){document.getElementById('SHOPlog').textContent = 'you already have a it!';}
        else{
        if(money >= 1000){money -= 1000; haveweapons.push('ナイフ');document.getElementById('SHOPlog').textContent = 'ナイフを購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        }
        break;
        }
      case '11':
        if(nowshop == 3){
        if(money >= 40){money -= 40; havetools.push('投げナイフ');document.getElementById('SHOPlog').textContent = '投げナイフを購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        break;
        } // 4 8 12 30
      case '12':
        if(nowshop == 3){
        if(money >= 80){money -= 80; havetools.push('トリッキーな変数');document.getElementById('SHOPlog').textContent = 'トリッキーな変数を購入しました!にはははは〜!!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        break;
        }
      case '13':
        if(nowshop == 3){
        if(money >= 120){money -= 120; havetools.push('援護射撃');document.getElementById('SHOPlog').textContent = '援護射撃ライセンスを購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        break;
        }
      case '14':
        if(nowshop == 3){
        if(money >= 300){money -= 300; havetools.push('ガラスの破片');document.getElementById('SHOPlog').textContent = 'ガラスの破片を購入しました!';}
        else{document.getElementById('SHOPlog').textContent = 'not enough money..';};
        break;
        }
      default:
        document.getElementById('SHOPlog').textContent = 'id doesnt exist...';
        break;
    }
    SHOPmoneytekiou();
    document.getElementById('ShopInputText').value = '';
  }
  function SHOPmoneytekiou(){
    document.getElementById('SHOPMONEY').textContent = money + '€';
  }
let appearweapons = '';
let appeararmors = '';
let appeartools = '';
function GoToEquip(){
    document.getElementById('omo').innerHTML = '<span id="InShopScene"><p><button class="button"onclick="GoToEquipWeapon()">Equip Weapon</button><br><br><button class="button"onclick="GoToEquipArmor()">Equip Armor</button><br><br><button class="button"onclick="GoToEquipTool()">Equip Tool</button></p><br><br><br><br><button class="button" id="BakcToShop" onclick="GoToShop()">Back To Shop</button></span>'
}
function GoToEquipWeapon(){
    nowshop = 4;
    document.getElementById('omo').innerHTML = '<span id="InShopScene"><p><span id="AppearShops"></span><br><br><input type="text" id="ShopInputText" minlength="2" maxlength="2" size="16" placeholder="write number here"><button class="button" onclick="ShopEquipButton()">Equip</button></p><br><br><span id="SHOPlog"></span><br><br><br><button class="button" id="BakcToShop" onclick="GoToShop()">Back To Shop</button></span>';
    appearweapons = '';
    x = 0;
    if(haveweapons.includes("木の棒")){x += 1;}
    if(haveweapons.includes("木刀")){x += 10;}
    if(haveweapons.includes("竹刀")){x += 100;}
    if(haveweapons.includes("石ころ")){x += 1000;}
    if(haveweapons.includes("大きな石")){x += 10000;}
    if(haveweapons.includes("レンガ")){x += 100000;}
    if(haveweapons.includes("薄めの紙")){x += 1000000;}
    if(haveweapons.includes("カード")){x += 10000000;}
    if(haveweapons.includes("はさみ")){x += 100000000;}
    if(haveweapons.includes("ナイフ")){x += 1000000000;}
    if(x >= 1000000000){x -= 1000000000; appearweapons = '10 ナイフ';}
    if(x >= 100000000){x -= 100000000; appearweapons = '09 はさみ'+ '<br>' + appearweapons;}
    if(x >= 10000000){x -= 10000000; appearweapons = '08 カード'+ '<br>' + appearweapons;}
    if(x >= 1000000){x -= 1000000; appearweapons = '07 薄めの紙'+ '<br>' + appearweapons;}
    if(x >= 100000){x -= 100000; appearweapons = '06 レンガ' + '<br>' + appearweapons;}
    if(x >= 10000){x -= 10000; appearweapons = '05 大きな石' + '<br>' + appearweapons;}
    if(x >= 1000){x -= 1000; appearweapons = '04 石ころ' + '<br>' + appearweapons;}
    if(x >= 100){x -= 100; appearweapons = '03 竹刀' + '<br>' + appearweapons;}
    if(x >= 10){x -= 10; appearweapons = '02 木刀' + '<br>' + appearweapons;}
    if(x >= 1){x -= 1; appearweapons = '01 木の棒' + '<br>' + appearweapons;}
    document.getElementById('AppearShops').innerHTML = appearweapons;
  }
  function GoToEquipArmor(){
    nowshop = 5;
    appeararmors = '';
    x = 0;
    if(havearmors.includes("マスク")){x += 1;}
    if(havearmors.includes("薄めの本")){x += 10;}
    if(havearmors.includes("木の板")){x += 100;}
    if(havearmors.includes("テッパン")){x += 1000;}
    if(havearmors.includes("鍋の蓋")){x += 10000;}
    if(havearmors.includes("厚めの本")){x += 100000;}
    if(havearmors.includes("ドア")){x += 1000000;}
    if(x >= 1000000){x -= 1000000; appeararmors = '07 ドア'+ '<br>' + appeararmors;}
    if(x >= 100000){x -= 100000; appeararmors = '06 厚めの本'+ '<br>' + appeararmors;}
    if(x >= 10000){x -= 10000; appeararmors = '05 鍋の蓋'+ '<br>' + appeararmors;}
    if(x >= 1000){x -= 1000; appeararmors = '04 テッパン'+ '<br>' + appeararmors;}
    if(x >= 100){x -= 100; appeararmors = '03 木の板'+ '<br>' + appeararmors;}
    if(x >= 10){x -= 10; appeararmors = '02 薄めの本'+ '<br>' + appeararmors;}
    if(x >= 1){x -= 1; appeararmors = '01 マスク'+ '<br>' + appeararmors;}
    document.getElementById('AppearShops').innerHTML = appeararmors;
  }
  function GoToEquipTool(){
    nowshop = 6;
    document.getElementById('omo').innerHTML = '<span>えーっと...開発期間が短かったです！テスト期間と重なってたし<br>なのでもうちょい待ってね〜<br>magicの動きを応用すればすぐにできるから<br>あ、メモwebのネタ帳に"もはやただのあれ"を追加したから、暇だったらみてね<br>配信者さんはguraさんしかみないのです</span><br><br><button onclick="GoToCity()">Back</button><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><a href="https://scratch.mit.edu/projects/1000452587/">wait....what?!</a>'; //この文たちは消しといてね
  }
function ShopEquipButton(){
  shopinputtext = document.getElementById('ShopInputText').value;
  switch(shopinputtext){
    case '01':
      if(nowshop == 4){
      if(haveweapons.includes("木の棒")){
        document.getElementById('SHOPlog').textContent = 'あなたは木の棒を装備しました！';
        equipweapon = 1;
        weaponpower = 1;
      }
      else{document.getElementById('SHOPlog').textContent = 'you dont have it!';}
      break;
      }else if(nowshop == 5){
      if(havearmors.includes("マスク")){
        document.getElementById('SHOPlog').textContent = 'あなたはマスクを装備しました！';
        equiparmor = 1;
        armorshell = 0;
      }
      else{document.getElementById('SHOPlog').textContent = 'you dont have it!';}
      break;
      };
    case '02':
      if(nowshop == 4){
      if(haveweapons.includes("木刀")){
        document.getElementById('SHOPlog').textContent = 'あなたは木刀を装備しました！';
        equipweapon = 2;
        weaponpower = 2;
      }
      else{document.getElementById('SHOPlog').textContent = 'you dont have it!';}
      break;
      }else if(nowshop == 5){
      if(havearmors.includes("薄めの本")){
        document.getElementById('SHOPlog').textContent = 'あなたは薄い本を装備しました！';
        equiparmor = 2;
        armorshell = 0;
      }
      else{document.getElementById('SHOPlog').textContent = 'you dont have it!';}
      break;
      };
    case '03':
      if(nowshop == 4){
        if(haveweapons.includes("竹刀")){
          document.getElementById('SHOPlog').textContent = 'あなたは竹刀を装備しました！';
          equipweapon = 3;
        weaponpower = 3;
        }
        }
      else if(nowshop == 5){
      if(havearmors.includes("木の板")){
        document.getElementById('SHOPlog').textContent = 'あなたは木の板を装備しました！';
        equiparmor = 3;
        armorshell = 1;
      }
      else{document.getElementById('SHOPlog').textContent = 'you dont have it!';}
      break;
      };
    case '04':
      if(nowshop == 4){
        if(haveweapons.includes("石ころ")){
          document.getElementById('SHOPlog').textContent = 'あなたは石ころを装備しました！';
          equipweapon = 4;
          weaponpower = 4;
        } 
        } 
      else if(nowshop == 5){
      if(havearmors.includes("テッパン")){
        document.getElementById('SHOPlog').textContent = 'あなたはテッパンを装備しました！';
        equiparmor = 4;
        armorshell = 2;
      }
      else{document.getElementById('SHOPlog').textContent = 'you dont have it!';}
      break;
      };
    case '05':
      if(nowshop == 4){
        if(haveweapons.includes("大きな石")){
          document.getElementById('SHOPlog').textContent = 'あなたは大きな石を装備しました！';
          equipweapon = 5;
          weaponpower = 5;
        }
        }
      else if(nowshop == 5){
      if(havearmors.includes("鍋の蓋")){
        document.getElementById('SHOPlog').textContent = 'あなたは鍋の蓋を装備しました！';
        equiparmor = 5;
        armorshell = 3;
      }
      else{document.getElementById('SHOPlog').textContent = 'you dont have it!';}
      break;
      };
    case '06':
      if(nowshop == 4){
        if(haveweapons.includes("レンガ")){
          document.getElementById('SHOPlog').textContent = 'あなたはレンガを装備しました！';
          equipweapon = 6;
          weaponpower = 6;
        }

        }
    else if(nowshop == 5){
      if(haveweapons.includes("厚めの本")){
        document.getElementById('SHOPlog').textContent = 'あなたは厚めの本を装備しました！';
        equiparmor = 6;
        armorshell = 4;
      }
      else{document.getElementById('SHOPlog').textContent = 'you dont have it!';}
      break;
      };
    case '07':
      if(nowshop == 4){
        if(haveweapons.includes("薄めの紙")){
          document.getElementById('SHOPlog').textContent = 'あなたは薄めの紙を装備しました！';
          equipweapon = 7;
          weaponpower = 1;
        }
        }
      else if(nowshop == 5){
        if(haveweapons.includes("ドア")){
          document.getElementById('SHOPlog').textContent = 'あなたはドアを装備しました！';
          equiparmor = 7;
          armorshell = 5;
        }
        else{document.getElementById('SHOPlog').textContent = 'you dont have it!';}
        break;
        };
    case '08':
      if(nowshop == 4){
        if(haveweapons.includes("カード")){
          document.getElementById('SHOPlog').textContent = 'あなたはカードを装備しました！';
          equipweapon = 8;
          weaponpower = 1;
        }
          break;
        };
    case '09':
      if(nowshop == 4){
        if(haveweapons.includes("はさみ")){
          document.getElementById('SHOPlog').textContent = 'あなたははさみを装備しました！';
          equipweapon = 9;
          weaponpower = 7;
        }
          break;
        };
    case '10':
      if(nowshop == 4){
        if(haveweapons.includes("ナイフ")){
          document.getElementById('SHOPlog').textContent = 'あなたはナイフを装備しました！';
          equipweapon = 10;
          weaponpower = 8;
        }
          break;
        };
    }
    document.getElementById('ShopInputText').value = '';
}
function GoToBossBattle(){
    document.getElementById('omo').innerHTML = '<button class="button" onclick="TenBossBattleStart()">10LV Boss</button><br><br><br><br><button class="button" id="GoToCity" onclick="BackToCityFromBossBattle()">Go To City</button>';
}
let bossbattlenow = 0; // killenemyとかの動きをなんとかするようですね。scratchでもやってたわこれ
let bossbattlenumber = 0;
let bossenemyprefixes1 = ['とても','めっちゃ'];
let bossenemyprefixe1 = 0;
let bossenemyprefixes2 = ['強い','頭のおかしい'];
let bossenemyprefixe2 = 0;
function TenBossBattleStart(){
    // document.getElementById('omo').innerHTML = '<span>turn:</span><span id="TurnCount">0</span><br><b id="EnemyName">enemy</b>   <i>Lv.</i><i id="EnemyLevel">20</i>   <u id="EnemyDebuff"></u>   <u id="EnemySkillDebuff"></u>   <u id="EnemySkillBuff"></u><br><span id="EnemyHealth">0</span>/<span id="EnemyMaxHealth">0</span><span id="EnemyFriendFront"></span><span id="PlayerFriendFront"></span><br><br><b id="PlayerName">player</b>   <i>Lv.</i><i id="PlayerLevel">1</i>   <u id="PlayerBuff"></u>   <u id="PlayerSkillBuff"></u>   <u id="PlayerSkillDebuff"></u><span id="AdditionalPlayerPoint"></span><br><span id="PlayerHealth">0</span>/<span id="PlayerMaxHealth">0</span><span id="PlayerFriendBack"></span><br><br><br><button class="button" id="select1" onclick="select1()">attack</button>  <button class="button" id="select2" onclick="select2()">magic</button>  <button class="button" id="select3" onclick="select3()">tools</button>  <button class="button" id="back" onclick="back()">pass</button>  <br><span id="Skillbutton"> </span><br><br><span align="center" id="log">lets kill boss!</span><br><span id="StatusAppearDisappear"><button class="button" id="StatusButton" onclick="StatusAppear()">status</button></span><br><span id="Status"> </span><br><br><br><br><span id="BackButtonDesu"><button align="center" class="button" onclick="GoToCity()">Back</button></span>';
    GoToBattle();
    turncount = 0;
    dom.turn.textContent = turncount;
    playermp = playermaxmp;
    playerbuff = 0;
    playerpower = 1;
    playershell = 1;
    x = 0;if(playerskillbuff == 1) x = 1;
    playerskillbuff = 0;
    if(x == 1) playerskillbuff = 1;
    enemydebuff = 0;
    enemyskilldebuff = 0;
    tekiou();
    mechanicturretbreak();
    bossbattlenow = 1;
    bossbattlenumber = 1;
    enemymaxhealth = 80 + (playerattack * 5);
    enemyhealth = enemymaxhealth;
    enemylevel = 10;
    enemyhealth = enemymaxhealth;
    bossenemyprefixe1 = 0;
    bossenemyprefixe2 = 0;enemyname = 'blueslime';
    y = Math.floor(Math.random() * 3);
    if(y !== 0) bossenemyprefixe1 = arraySelect(bossenemyprefixes1);
    y = Math.floor(Math.random() * 3);
    if(y !== 0) bossenemyprefixe2 = arraySelect(bossenemyprefixes2);
    document.getElementById('PlayerMaxHealth').textContent = playermaxhealth;
    window.setTimeout(playerturn, 750);
    TurnCountPhase();
}
async function bossenemyturn(){
    if(playerskilldebuff == 1){playerskilldebuff = 0;tekiou();document.getElementById('log').textContent = playername + 'からスライムが剥がれた!';await delay(1000);};
    if(playername == 'mechanic' && mechanicturret > 0){document.getElementById('log').textContent = 'turretの攻撃!';await delay(1000);x = enemyhealth;y = enemyhealth;x -= (mechanicturretattack * mechanicturret);x = Math.floor(x);damage = y - x;if(damage < 0){damage = 0};if(damage > y){damage = y};enemyhealth -= damage;document.getElementById('log').textContent = enemyname + 'に' + damage + 'のダメージ!!';if(enemyhealth < 0){enemyhealth = 0};tekiou();await delay(1000);}if(enemyhealth == 0){killedenemy();}
    else {turn = 2;document.getElementById('log').textContent = '敵のターンです!';window.setTimeout(Bossenemyattack, 1000);}
}
async function Bossenemyattack(){
    w = 'null';
    if(playername == 'mechanic'){w = Math.floor(Math.random() * 5);};
    if(enemyskilldebuff == 1){w = 10;};
    z = Math.floor(Math.random() * 3);
    if(z == 0){
            x = playerhealth;
            y = playerhealth;
            x -= enemylevel;
            x += playerdefense * playershell;
            damage = playerhealth - x;
            if(damage < 0){damage = 0;};
            if(w == 0 || w == 10){damage = 0;};
            if(playerskillbuff == 1){y = greenslimecopyhealth; greenslimecopyhealth -= damage; if(greenslimecopyhealth < 0){greenslimecopyhealth = 0} greenslimecopytekiou(); greenslimecopyhealth = Math.floor(greenslimecopyhealth); z = y - greenslimecopyhealth; if(greenslimecopyhealth == 0){greenslimecopybreak(); await delay(1000)};}
            else if(zombiefriendname !== 0){y = zombiefriendhealth; zombiefriendhealth -= damage; if(zombiefriendhealth < 0){zombiefriendhealth = 0} zombiefriendtekiou(); zombiefriendhealth = Math.floor(zombiefriendhealth); z = y - zombiefriendhealth; if(zombiefriendhealth == 0){zombiefriendbreak(); await delay(1000)};}
            else {playerhealth -= damage; playerhealth = Math.floor(playerhealth); z = y - playerhealth;};
            if(w == 0){document.getElementById('log').textContent = enemyname + 'はスタンした!!';}
            else if(w == 10){document.getElementById('log').textContent = 'blueslimeはくっついたスライムを吸収した!'; enemyskilldebuff = 0; tekiou(); await delay(1000);}
            else if(z == 0){document.getElementById('log').textContent = 'miss! ' + playername + 'にダメージを与えられない!';}
            else {
                if(playername == 'bomer' && bomertension > 0){bomertension -= 1; bomertekiou()}; // bomerのtensionを下げる動き
                if(playername == 'shaosan'){shaopower += 0.2; document.getElementById('log').textContent = '何やっとんねん チンピラどもーーーーッ';};// shaosanのpowerを上げる動き
                document.getElementById('log').textContent = playername + 'に' + z + 'のダメージ!';
            };
            if(playerhealth < 0){playerhealth = 0};
            if(playerhealth == 0){defeat();turn = 0;}
            tekiou();
            if(enemyskilldebuff == 1){await delay(1000);enemyskilldebuff = 0;tekiou();document.getElementById('log').textContent = enemyname + 'からスライムが剥がれた!';};
    } //bossの通常攻撃ですこちら
        else if(z == 1){if(bossbattlenumber==1){
            if(w == 10){document.getElementById('log').textContent = 'blueslimeはくっついたスライムを吸収した!'; enemyskilldebuff = 0; tekiou(); await delay(1000);}
            if(w == 0){document.getElementById('log').textContent = enemyname + 'はスタンした!!';}
            else
            document.getElementById('log').textContent = 'blueslimeは' + playername + 'にスライムをくっつけてきた！';
            playerskilldebuff = 1; tekiou();
            if(playername == 'greenslime'){await delay(1000);playerskilldebuff = 0; tekiou();document.getElementById('log').textContent = 'greenslimeはスライムを吸収した!';};
            await delay(1000);
            document.getElementById('log').textContent = playername + 'に' + 2 + 'のダメージ！';
            x = (Math.floor(playerhealth*0.05));if(x==0){x=1};
            playerhealth -= x;
            if(playerhealth <= 0){playerhealth = 0; defeat();turn = 0;};
            if(playername == 'bomer' && bomertension > 0){bomertension -= 1; bomertekiou()}; // bomerのtensionを下げる動き
            if(playername == 'shaosan'){shaopower += 0.2; document.getElementById('log').textContent = '何やっとんねん チンピラどもーーーーッ';};// shaosanのpowerを上げる動き
            tekiou();
        } // こちらはスタン+固定2
    }else if(z == 2){
        if(bossbattlenumber == 1){
            if(w == 10){document.getElementById('log').textContent = 'blueslimeはくっついたスライムを吸収した!'; enemyskilldebuff = 0; tekiou(); await delay(1000);}
            if(w == 0){document.getElementById('log').textContent = enemyname + 'はスタンした!!';}
            else
            playerdefense -= 1; lowedplayerdefense += 1;
            if(playerdefense < 0){playerdefense = 0; lowedplayerdefense -= 1;}
            document.getElementById('log').textContent = 'blueslimeは' + playername + 'の防御力を下げてきた!';
            if(playername == 'shaosan'){shaopower += 0.2; document.getElementById('log').textContent = '何やっとんねん チンピラどもーーーーッ';};// shaosanのpowerを上げる動き
        }// こちらは防御下げ
    }
    if(turn == 2){
        if(enemydebuff == 1){
            x = enemyhealth;
            enemyhealth -= enemymaxhealth * 0.05
            enemyhealth = Math.floor(enemyhealth)
            if(enemyhealth < 0){enemyhealth = 0}
            y = x - enemyhealth;
        }else if(enemydebuff == 2){
            x = enemyhealth;
            enemyhealth -= enemymaxhealth * 0.1
            enemyhealth = Math.floor(enemyhealth)
            if(enemyhealth < 0){enemyhealth = 0}
            y = x - enemyhealth;
        } 
        if(enemydebuff == 1 || enemydebuff == 2){await delay(1000);document.getElementById('log').textContent = enemyname + 'は毒で' + y + 'のダメージ!';};
        tekiou();
        if(enemyhealth < 0){enemyhealth = 0}
        if(enemyhealth == 0){window.setTimeout(killedenemy, 1000)}
        else {
            if(playerskillbuff == 5){await delay(1000); playerskillbuff = 0; document.getElementById('log').textContent = 'やる気が落ち着いた!';}
            await delay(1000);
            playerturn()
            turncountincrease()
            SkillCooldownDecrease()
            NSaction()
        }
    }
}
async function killedbossenemy(){
    turn = 0;
    x = playerexp
    playerexp += (enemylevel * 0.5 + 5 * 2);
    y = playerexp - x;
    document.getElementById('log').textContent = enemyname + 'を倒した!やったね!!';
    if(playername == 'bomer'){z = 0; z += 2; if(playerskillbuff == 5){z += 1; playerskillbuff = 0; tekiou();}; if(bomerbombused == 1){z += 3; bomerbombused = 0;}; await delay(1000); bomertension += z; document.getElementById('log').textContent =  'bomerはテンションが' + z + '上がった!'; bomertekiou();};
    if(playername == 'zomusan'){zomupower = 1;};
    await delay(1000);
    z = Math.floor(Math.random() * 11) + 5;
    z *= (enemylevel * 0.5 + 5);
    z = Math.floor(z);
    money += z;
    document.getElementById('log').textContent =  z + '€を獲得した!!';
    await delay(1000);
    document.getElementById('log').textContent = y + 'の経験値を奪った!';
    window.setTimeout(playersutefuri, 1000)
}
function BackToCityFromBossBattle(){
    playerattack += lowedplayerattack;
    playerdefense += lowedplayerdefense;
    playermaxmp += lowedplayermaxmp;
    playermaxhealth += lowedplayermaxhealth;
    playerlevel += lowedplayerlevel;
    document.getElementById('omo').innerHTML = '<button class="button" id="GoToBattle" onclick="GoToBattle()">Go To Battle</button><br><br><br><button class="button" id="GoToBossBattle" onclick="GoToBossBattle()">Go To Boss Battle</button><br><br><br><button class="button" id="GoToCityBattle" onclick="GoToShop()">Go To Shop</button><br><br><br>';
} // 色々下げられてたら戻すよっていう動き。戻さない敵とかもいていいかも..っておもったけどそれはさすがにあれか？


//#region start
function start(){
    Style.tekiou();
    OBS.load();

    mainF.load();

    mainF.move('omo');
}
//#endregion

//#region DOM
let LoadOfWait = async() => await loaF.load();
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", init);
}
else LoadOfWait();

async function init(){
    await LoadOfWait();
    start();
}
//#endregion


