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
function jouyo(A, B){
    let Q = Math.floor(A / B);
    let R = A % B;
    let res = {Q, R}
    console.log(`${A} / ${B} = ${Q} ... ${R}`);
    
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
    for(let i = 0; i < array.length; i++){
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
function randomF(min, max, keta = 0){
    if(max < min) [min, max] = [max, min];

    let scale = 10 ** keta;
    let num = Math.floor(
        Math.random() * ((max - min) * scale + 1)
    ) + min * scale;

    return num / scale;
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

function cardDraw(val0 = 0, suit0 = 0){
    let val = random(1, 13);
    let suit = arraySelect(['♡', '♤', '♢', '♧']);
    if(val0) val = val0;
    if(suit0) suit = suit0;
    
    let hyou = val;
    if(val == 1)  hyou = 'A';
    if(val == 10) hyou = 'X';
    if(val == 11) hyou = 'J';
    if(val == 12) hyou = 'Q';
    if(val == 13) hyou = 'K';
    
    let card = {    
        suit,
        val,
        num: hyou
    }

    return card;
}
function cardCalc(arr, code = 0){
    // code: bj == 1が11にもなる
    if(!Array.isArray(arr)) return console.error('えっと...ごめん！これ配列じゃないと計算できないっ！！'), 0;
    
    let sum = 0;
    let As = 0;

    for(let card of arr){
        if(card.hide) continue;
        let v = card.val;
        if(code == "bj"){
            if(10 <= v) v = 10; //bjなら10に矯正
            if(v == 1) As++;
        }
        sum += v;
    }

    if(code == "bj"){
        while(21 < sum && 0 < As){
            sum -= 10; //特殊すぎる
            As--;
        }
    }

    return sum;
}
function cardUnwrap(arr){
    for(let card of arr){
        if(card.hide) card.hide = 0;
    }
    return arr;
}

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
    await logtext(text);
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
    skipT: 0,
    clearT: 0,
    loopT: 0,
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
    if(logC.ing ||
        logC.queue.length == 0) return;

    let raw0 = logC.queue.shift();
    // console.log(`${raw0[0]}を送信します`);
    await logtext(...raw0);
};
async function logtext(raw, code = ""){
    if(!raw) return console.log('「内容が？内容が〜〜？ないよ〜〜〜つってwwww直せ」');
    if(typeof raw != 'string') raw = String(raw);

    if(logC.ing){
        logC.queue.push([raw, code]);

        logF.waitfor();
        return;
    };
    
    logC.ing = 1;
    let text = logF.cc(raw);
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
                    type();
                }else{
                    let span = document.createElement("span");
                    span.textContent = text[index].char;
                    if(text[index].color) span.style.color = text[index].color;
                    logC.textD.appendChild(span);

                    index++;
                    setTimeout(type, 80); // 次の文字を表示する間隔
                }
            }else{
                let das = `[${code}] `;
                das += logC.textD.innerHTML;
                addtext(das);
                let waitTime = logC.autoDelay * 1000;
                
                let cleanupListeners = () => {};
                let timeout = new Promise(resolveTimeout => {
                    let timer = setTimeout(() => {
                        cleanupListeners();
                        resolveTimeout();
                    }, waitTime);
                    
                    cleanupListeners = () => clearTimeout(timer);
                });

                let userAction = new Promise(resolveUser => {

                    function waitToClear(event){
                        if(event.type === 'click' || event.key === 'z' || event.key === 'Enter'){
                            document.removeEventListener('click', waitToClear);
                            document.removeEventListener('keydown', waitToClear);
                            cleanupListeners();
                            resolveUser();
                        }
                    }
                    document.addEventListener('click', waitToClear);
                    document.addEventListener('keydown', waitToClear);

                    let oldCleanup = cleanupListeners;
                    cleanupListeners = () => {
                        oldCleanup();
                        document.removeEventListener('click', waitToClear);
                        document.removeEventListener('keydown', waitToClear);
                    };
                });

                Promise.race([timeout, userAction]).then(() => {
                    logC.textD.textContent = "";
                    logC.textD.style.display = "none";
                    logC.clearT = 1;
                    logC.skipT = 0
                    logC.ing = 0;
                    resolve('end');

                    logF.waitfor();
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

function addtext(text){
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

        this.choices.forEach((ma, india) => {
            let [name, gazou] = [ma.name, ma.img];
            if(typeof ma === 'string') name = ma;

            let item = document.createElement('div');
            item.className = `item ${name}`;
            item.textContent = name;
            // item.dataset.name = name;
            item.dataset.india = india;

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
                    // resolve(target.dataset.name);
                    resolve(target.dataset.india);
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
/*
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
*/
loaF.loadI = async() => {
    let stas0 = Stages.filter(a => !a.no).map(a => a.name);
    let stas = stas0.concat(['すべて']);
    
    Images.maps = {};
    Images.enemies = {};
    for(let sta of stas){
        if(!Images.maps[sta]) Images.maps[sta] = [];
        Objects.filter(a => a.in == sta).map(a => a.name).forEach(name => {
            loaC.imgT += 1;
            if(sta != 'すべて') Images.maps[sta].push(name);
            
            else for(let sta2 of stas0) Images.maps[sta2].push(name);
        });

        if(sta == 'すべて') continue;

        Stages.find(a => a.name == sta).tiles.forEach(name => {
            loaC.imgT += 1;
            Images.maps[sta].push(name);
        })

        if(!Images.enemies[sta]) Images.enemies[sta] = [];
        Enemies.filter(a => !a.no && (a.ins.includes(sta) || a.ins == 'すべて')).map(a => a.name).forEach(name => {
            loaC.imgT += 1;
            // Images.enemies.push(name);
            
            if(sta != 'すべて') Images.enemies[sta].push(name);
            else for(let sta2 of stas0) Images.enemies[sta2].push(name);
        });
    }

    Images.charas = [];
    for(let ch of Charas){
        let toku = 0;
        if(ch.name == "color_slime") toku = 1;
        if(toku == 0){
            let img = `${ch.img}`;
            Images.charas.push(img);
        }
        else{
            switch(ch.name){
                case "color_slime":
                    for(let c of ch.data.colors){
                        let img = `${ch.data.colorp}${c}`;
                        Images.charas.push(img);
                    }
            }
        }
    }
    

    // console.log('LETS GOOOOOOOOOOO!!')
    let T1 = (Tk) => {
        let Tv = Images[Tk];
        if(Array.isArray(Tv)) return loaC.imgT += Tv.length;
        
        T0(Tv);
    }
    let T0 = (moto) => {
        for(let key in moto){
            // T1(key);
            T1(moto[key])
        }
    }

    let loaloa = async(arr, route) => {
        // console.log("Arrayでした lets 読み込み")
        let src = "assets/images/";
        for(let r of route) src += `${r}/`;
        // console.log(src)

        let yomi = (mono, img) => {
            loaC.imgD += 1;
            tar[mono] = img;
            if(loaC.imgD == loaC.imgT) return loaF.loadS(), 4;
        }

        let tar = images;
        for(let r of route){
            // console.log(r, tar)
            if(!tar[r]) tar[r] = {};
            tar = tar[r];
        }
        // console.log("終わり", tar)
        // console.log(images)
        // console.log(arr);
        // console.log(route);
        // console.log(images);

        let all = arr.length;
        // console.error(`--- ${route.join('/')}:${all} ---`)
        for(let mono of arr){
            // console.log(mono);
            let img = new Image();
            img.src = `${src}${mono}.png`;
            img.onload = () => {
                yomi(mono, img);
            }

            img.onerror = () => {
                console.error(`Image ${src}${mono}.png failed to load.`);
                loaC.erd += 1;
                 if(loaC.erd > 50) return console.error('さすがにやりすぎbonus'), loaC.kokokomai = 32
                img.src = `assets/images/systems/error.png`;
                yomi(mono, img);
                erd = 1
            };
        }

        // console.log('読み込み完了 これよりユグドラシルに帰還する')
        return 0;
    }

    // let gensho = Object.keys(Images);
    let loaloa0 = async(mono, route = []) => {
        let sink = route.length ? 1 : 0
        // if(sink) console.log("not Arrayでした lets 再帰");
        let hzd = loaC.deep;
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
            loaC.deep += 1;
            // console.log(`[loaloa0ed] route:[${route}]`);
            
            let val = mono[key]??null;
            if(!val) return console.error('↓↓null↓↓'), console.log(tar), console.log(mono), console.log(key), console.error('↑↑null↑↑');
            // console.log("次、valです");
            // console.log(val);
            // console.log("↑Arrayかな? 結果 => "+Array.isArray(val));
            if(Array.isArray(val)){
                if(await loaloa(val, route)) return console.error('南ノ南');
                let pop = route.pop()
                // console.log(`帰還成功、${pop}を排除`)
                loaC.deep -= 1;
            }//arrayなら => ロードへ
            else await loaloa0(val, route); //まだオブジェクトなら => もっかい
        }
        route.pop();
        loaC.deep -= 1;
    }

    loaloa0(Images);

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
    let proto = null;
    let category = null;

    for(let belong in sounds){
        if(sounds[belong][name]){
            proto = sounds[belong][name];
            category = belong;
            break;
        }
    }

    // 見つからない場合はerrorを呼び出す
    if(!proto){
        if(name !== 'error') return soundPlay('error');
        return;
    }

    if(proto.dataset.type === 'bgm'){
        // 現在のBGMを止める処理
        if(souC.nowBgm){
            // souC.nowBgm からカテゴリを特定して停止する
            for(let belong in sounds){
                if(sounds[belong][souC.nowBgm]){
                    let oldBgm = sounds[belong][souC.nowBgm];
                    if(!oldBgm.paused){
                        oldBgm.pause();
                        oldBgm.currentTime = 0;
                    }
                    break;
                }
            }
        }
        
        proto.volume = souC.bgm;
        proto.play().catch(e => console.warn('BGM 再生エラー', e));
        souC.nowBgm = name;
    } else {
        let clone = proto.cloneNode(true);
        clone.volume = souC.se;
        clone.dataset.type = 'se';
        clone.addEventListener('ended', () => { clone.src = ''; });
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
    // return logtext('バカめ！！作者はもう逃げて遊んでるぜ！！！！');
    // let charas = Charas.map(a => [a.jpnm, a.img]);
    let charas = Charas.map(a => `${a.jpnm} [${a.name}]`)
    let charaSen = new TakushiSen(charas, 'tate');
    let charaI = await charaSen.select(homD);
     charaI = +charaI;
    let charaN = charas[charaI];
    let chara = Charas[charaI]
    console.log(`選ばれたのは、[${chara.name}]でした`);

    makeUnit("player", 0, chara.name);

    mainF.move('batt');

    encount();
}
homC.startD.addEventListener('click', homF.start);

homF.quit = async() => {
    logtext('え？もう帰っちゃうの？');
    let ls = ['ああ、もちろんさ', 'ゎ、ご、ごめんなさいぃっ'];
    let seen = new TakushiSen(ls, 'tate');
    let ans = await seen.select(homD);
    console.log(ans)
    // if(ans == 0) window.location.href = "https://game.koppepan-orange.com/"
    if(ans == 0){
        window.location.href = "../index.html";
        logtext("みんなも一緒にやってみようよ");
        logtext("いくよ？");
        logtext("ランランr");
        logtext("と思っていたのか");
        logtext("だにぃ？")
    }
    if(ans == 1) logtext("えへへ..よかった")
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
    slash: ['slash', 'double slash', 'slash of light'],
    magic: ['heal', 'power', 'shell'],
    tool: ['aspirin', 'throw knife', 'redcard'],
}
let batF = {};

let humans = [];


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
            console.log(hd)
            if(hd) srca = `charas/${hd.img}.png`;
            if(!hd){
                hd = Friends.find(a => a.name == human.name);
                srca = `friends/${hd.img}.png`;
            }
            console.log(srca)
        }

        // console.log(`${cam}${human.me}`)
        // console.log(human)
        // console.log(hd)

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
    let arr = Equips.filter()
}
// #endregion

function selects(arr){
    // selects([[], [], [], []])
    // ["ここにテキストを入力", () => {/kill @e}]

    let bts = batC.bts;
    for(let k=0; k<4; k++){
        let youso = arr[k];
        bts[k].innerText = youso[0];

        bts[k].func = youso[1];
        jump:{
            if(bts[k].seted) break jump;
            bts[k].addEventListener("click", (e) => {
                if(typeof e.currentTarget.func == "function"){
                    e.currentTarget.func();
                };
            });
            bts[k].seted = 1;
        }
    }
}

function makeUnit(cam, code, name){
    let data = {};
    if(cam == 'player'){
        let data0 = Charas;
        if(code) Friends;
        data = data0.find(a => a.name == name);
    }
    if(cam == "enemie"){
        data = arraySelect(Enemies.filter(a => !a.no));
    }
    if(!data) return console.log(`codeが[${code}]の${name}はいないらしい`);
    console.log(data);

    let unit = {};
    if(cam == 'player'){
        // pleyerはデータをそのままコピー
        // Status.map(a => a.name).forEach(s => unit[s] = data[s]);
        for(let data0 of Status){
            let name = data0.name;
            unit[name] = data[name] ?? data0.bas;
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
        
        unit.slash = unit.slash ?? batC.shokey.slash;
        unit.magic = unit.magic ?? batC.shokey.magic;
        unit.tool  = unit.tool ?? batC.shokey.tool;

        if(!code){
            unit.ex = data.ex;
            unit.ns = data.ns;
            unit.ps = data.ps;
            unit.ts = data.ts;

            Style.batSt.solid = data.buttonsolid;
            Style.batSt.back = data.buttonback;
            Style.batSt.aima = irohaMix(data.buttonsolid, data.buttonback);
            Style.tekiou();
        }else{
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

// #region 攻撃！（自分以外のプレイヤー全員はカードはカードを1枚引く）（無関係）
function attack(who, ares, tri, voi, prop = []){
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
            triD = "def";
            break;
    }

    for(let are of ares){
        let atker = copy(who); //atk+add * power + wepatk
        let defer = copy(are); //def * shell + cut + shldef
        
        let wepatk = 0, shldef = 0;
        let weapon = atker.weapon;
         let weaponD = findEquips("weapon", weapon);
        let shield = defer.shield;
         let shieldD = findEquips("shield", shield);
        if(tri == weaponD.tri ||
           weaponD.tri.contains(tri) ||
           weaponD.tri == "all") wepatk = weaponD.atk;
        if(tri == shieldD.tri ||
           shieldD.tri.contains(tri) ||
           shieldD.tri == "all") shldef = shieldD.def;

        let nisha = ["atker", "defer"];
        let accessment = ["ear", "neck", "tank"];
        for(let whi of nisha){
            for(let access0 of accessment){
                let access = whi[access0];
                 let accessD = findEquips(access0, access);
                
                if(tri == accessD.tri ||
                   accessD.tri.contains(tri) ||
                   accessD.tri == "all") wepatk += accessD.atk;
                if(tri == accessD.tri ||
                   accessD.tri.contains(tri) ||
                   accessD.tri == "all") shldef += accessD.def;
            } 
        }

        let atk = ((atker[triA]) * atker.power +atker.add + wepatk);
        let def = ((defer[triD]) * defer.shell +defer.cut + shldef);

        
    }
}
// #endregion

// #region buffとか
function buffGet(who, name){
    let buff = who.buffs.find(a => a.name == name);
    if(!buff) return 0;

    return buff;
}
function buffData(name){
    let data = Buffs.find(a => a.name == name);
    if(!data) return 0;

    return data;
}

function buffHeraso(who, name, becauseof){
    let buff = buffGet(who, name);
    if(!buff) return 0;

    let data = buffData(name);
    if(!data) return 0;

    if(data.stack == becauseof){
        let hera = data.hera; //numberなことが多いが、"=0"なこともある
        if(buffDec(who, name, hera)) return 1;
    }
    
    return 0;
}

function buffAdd(who, are, name, num, lv){
    console.log(`[buffAdd] ${who.name} => ${are.name} | ${name}[${lv}]を${num}stack`);
    let data = buffData(name);
    if(!data) return console.error(`buff[${name}]は存在しないらしい`);



    let buff = {
        name,
        value: {},
        lv
    }


}

function buffDec(who, name, num){
    if(num == "=0") return buffRem(who, name);
    console.log(`[buffDec] ${who.name}のbuff[${name}]を${num}stack減らす`);

    
    return 1;
}

function buffRem(who, name){
    console.log(`[buffRem] ${who.name}のbuff[${name}]を解消します`);

    return 1;
}
// #endregion

// #region turnとかbarとかactedとか

/*
// これはblank
function turnNext(who){
    // 1. dotダメージの処理
    // ここで who のステータスを見て、毒とかの計算をするんだよ
    console.log(who + " のdotダメージ処理");

    // 2. playerかenemieかでswitchで行動を促す
    switch(who){
        case 'player':
            // プレイヤーのボタン（batC.bts）を活性化させたり、入力を待つ処理
            console.log("プレイヤーの行動選択を促すよ。よわよわ行動はナシね！");
            break;
            
        case 'enemie':{
            // 敵のAI（自動行動）の処理を呼び出す
            console.log("enemie の自動行動を選択中...");
            break;
        }
    }
}

function turnEnd(who, ares){
    let reAct = 0; // ここに確率計算とかを入れる
    
    if(reAct){
        console.log(`再行動・${who.name}`);
        turnNext(who);
        return; 
    }

    // 2. dotダメージの処理（ターンの最後にもあるの？重複に気をつけてね）
    console.log(who + " のターン終了時のdot処理");

    turnBye(who);
}

function turnBye(who){
    // 1. もしbar最後の行動だったなら turnNew を実行
    // batC.acted が 進行度で、batC.actbar.length - 1 と等しいか比べる
    if(batC.acted >= batC.actbar.length - 1){
        console.log("このターンのbarは全員おしまい！次のターンへ");
        turnNew(0); // 新しいbarを作る
    } else {
        // まだ残ってるなら進行度を1進めて、次のキャラの行動へ
        batC.acted++;
        let nextWho = batC.actbar[batC.acted]; // 次に行動するキャラ（'player' とか 'enemie'）
        turnNext(nextWho);
    }
}

function turnNew(code = 0){
    // 1. turn数をカウントアップ（1巡したからね）
    batC.turn++;
    batC.turnD.innerText = batC.turn; // 画面の表示も更新しちゃう

    // 2. barを再建（actbarに行動順の配列をセットする）
    // 例: 素早さ順とかで ['player', 'enemie', 'enemie'] みたいに並べる
    batC.actbar = ['player', 'enemie']; // ここは仮ね、お兄さんがルールを決めて
    
    // 3. 進行度を初期化
    batC.acted = 0;

    console.log("ターン " + batC.turn + " 開始！");

    // 4. 0番の行動開始
    let firstWho = batC.actbar[0];
    turnNext(firstWho);
}
*/


// これは全部渡した拡張
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

async function turnNext(who){
    // やりたいこと: dotダメージの処理, その後playerかenemieかでswitchで行動を促す
    
    // 行動不能系のチェックを先にやっちゃうね。動けないのにdotだけ食らうのは変だし！
    for(let buff of who.buffs){
        let data = buffData(buff.name);

        if(buff.name == 'onslime'){
            if(isCrit(buff.value)){
                buffremove(who, 'onslime');
                addtext('なんとかスライムを取り払った!!');
            } else {
                addtext('スライムが邪魔して動けない!!');
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
                    ? addtext(`${who.cam}${who.me}は麻痺している..`)
                    : addtext(`${who.cam}${who.me}はスタンしている....`);
                turnBye(who);
                return;
            }
        }
        if(hask(buff.value, 'freeze')){
            if(!isCrit(buff.value.freeze)){
                addtext(`${who.name}は凍っている...`);
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

    switch (who.cam){
        case 'player':
            playerturn(who);
            break;
        case 'enemie':
            enemyturn(who);
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
        let data = buffData(buff.name);
        if(data && hask(data, 'luck')){
            if(isCrit(data.luck)){
                addtext('当たりが出たらもう一本！');
                extraTurn = true;
                break;
            }
        }
    }

    if(extraTurn){
        if(who.cam == 'player') playerturn(who);
        else enemyturn(who);
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
            gamF.move(bas.name)
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
    if(gamC.now == to) return console.log('どういうわけか もう そこにいる');
	if(!to) return console.error(`せんぱ〜い？${to}ってどこですか〜？笑`);
	
	for(let a of gamC.bashos) gamD.querySelector(`.heya.${a.name}`).classList.remove('show');
    gamD.querySelector(`.heya.${to}`).classList.add('show');
    gamC.now = to;
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
    waiting: 0,
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
      !gamC.blaC.waiting) return;
    
    gamC.blaC.waiting = 0;
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
gamC.blaF.betHeler = () => {
    console.log("helerのbetCalc実行！")
    let num = gamC.blaF.betCalc();

    if(rimi == 0){
        return logtext("お客様？もうɌがございませんが...?"), 1;
        // 何度も押したらAll for Nothingにできる〜とか、そのうち作ってもいいかもね
    }
    else if(rimi < num){
        logtext("Ɍが足りないようでしたので、");
        logtext('**AllIn**、とさせていただきますね？');
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
    gamC.blaC.waiting = 1;
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

    gamC.blaC.waiting = 0;
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
    soundPlay('place');

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
       gamC.blaC.waiting) return 1;

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
       gamC.blaC.waiting) return 1;
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
gamC.blaF.end = (cam = 0, yue = "error") => {
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
    
    logtext(mes, "gamble");
    gamC.blaC.waiting = 1;
    gamC.blaC.ing = 0;
    gamC.blaF.stext("もっかいやるか？");
    gamC.blaF.btext("ん、戻りますか？");
}
// #endregion


gamC.blaC.returnD.addEventListener('click', () => {
    if(gamC.blaC.ing || gamC.blaC.waiting) return 1;
    gamF.move("loby");
});

//#endregion

// #region rourou
gamC.rouD = gamD.querySelector('.rourou');
gamC.rouC = {
    ing: 0,
    waiting: 0,

    returnD: gamC.rouD.querySelector('.return')
}
gamC.rouF = {};

gamC.rouC.returnD.addEventListener('click', () => {
    if(gamC.rouC.ing || gamC.rouC.waiting) return 1;
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
    ing: 0,
    waiting: 0,

    cantake: 0,

    returnD: gamC.forD.querySelector('.return')
}
gamC.forF = {};

gamC.forC.returnD.addEventListener('click', () => {
    if(gamC.forC.ing || gamC.forC.waiting) return 1;
    gamF.move("loby");
});


gamC.forF.enter = () => {
    
}

gamC.forF.start = () => {
    if(gamC.forC.ing || gamC.forC.waiting) return 1;
}

gamC.forF.setMush = (num = 10) => {
    while(gamC.forC.cantake < 10 && Math.random() < 0.75) {
        gamC.forC.cantake += 1;
    }
    
    console.log(`[setMush] 今回のアカキノコは${gamC.forC.cantake}個です`);
}

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
else LoadOfWait();

async function init(){
    await LoadOfWait();
    start();
}
//#endregion

