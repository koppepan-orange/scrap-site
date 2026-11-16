/* LAST LIGHT - solo top-down survival arena */
let Arena = {
    width: 393,
    height: 0,
    canvas: null,
    ctx: null,
    root: null,
    home: null,
    raf: 0,
    running: 0,
    finished: 0,
    lastFrame: 0,
    matchStart: 0,
    now: 0,
    map: null,
    player: null,
    bots: [],
    monsters: [],
    projectiles: [],
    pickups: [],
    doors: [],
    warnings: [],
    feed: [],
    camera: {x:0, y:0},
    observer: {x:0, y:0},
    keys: {},
    movePad: {x:0, y:0, active:0, id:null},
    aimPad: {x:0, y:0, active:0, id:null},
    firing: 0,
    foodHoldAt: 0,
    foodConsumed: 0,
    nextWeaponSpawn: 0,
    nextMonsterSpawn: 0,
    nextZoneDamage: 0,
    zone: null,
    kills: 0,
    uiTick: 0,
    botNames: ['カラス','ヒバリ','トタン','ネオン','モグラ','シグレ','ハコ','ユラ','ノイズ'],
    behaviorList: ['エゴイスト','百姓','姑息','アサシン','レッカー車','一般人A'],
    behaviorColors: {
        'エゴイスト':'#ff6b70',
        '百姓':'#b9d78b',
        '姑息':'#d0b4ff',
        'アサシン':'#8da9ff',
        'レッカー車':'#ffbd72',
        '一般人A':'#8edbd0'
    },
    weapons: {
        smg: {id:'smg',name:'SMG',short:'SMG',icon:'▥',type:'gun',mag:25,damage:7,rate:105,reload:1450,speed:610,range:460,spread:0.075,pellets:1,score:3},
        scar: {id:'scar',name:'SCAR',short:'SCAR',icon:'╱',type:'gun',mag:40,damage:15,rate:235,reload:1750,speed:790,range:620,spread:0.018,pellets:1,score:5},
        dual_pistols: {id:'dual_pistols',name:'二丁拳銃',short:'DUAL',icon:'Ⅱ',type:'gun',mag:18,damage:6,rate:245,reload:1150,speed:650,range:390,spread:0.10,pellets:2,score:4},
        shotgun: {id:'shotgun',name:'ショットガン',short:'SG',icon:'▤',type:'gun',mag:6,damage:8,rate:620,reload:2050,speed:570,range:270,spread:0.31,pellets:6,score:4},
        knife: {id:'knife',name:'ナイフ',short:'KNIFE',icon:'⌁',type:'melee',mag:1,damage:24,rate:520,reload:690,range:48,arc:0.95,score:3},
        hammer: {id:'hammer',name:'デカハンマー',short:'HAMMER',icon:'▰',type:'melee',mag:1,damage:38,rate:870,reload:1450,range:62,arc:1.05,score:4}
    },
    monsterTypes: [
        {id:'knocker',name:'徘徊体《ノッカー》',short:'ノッカー',color:'#b66d78',type:'melee',hp:72,speed:54,damage:10},
        {id:'lamp_eye',name:'射手《ランプアイ》',short:'ランプアイ',color:'#d1b06c',type:'ranged',hp:58,speed:42,damage:9},
        {id:'burst_seed',name:'爆ぜ種《バースト》',short:'バースト',color:'#df875c',type:'bomber',hp:52,speed:67,damage:29},
        {id:'skipper',name:'突進体《スキッパー》',short:'スキッパー',color:'#a58bd2',type:'diver',hp:64,speed:49,damage:14}
    ],

    rand(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    choose(arr){
        return arr[Math.floor(Math.random() * arr.length)];
    },
    loadedImage(category,name){
        if(typeof images == 'undefined' || !images[category] || !images[category][name]) return null;
        let img=images[category][name];
        if(img.complete && img.naturalWidth > 0) return img;
        return null;
    },
    clamp(v, min, max){
        return Math.max(min, Math.min(max, v));
    },
    dist(a, b){
        return Math.hypot(a.x - b.x, a.y - b.y);
    },
    angleTo(a, b){
        return Math.atan2(b.y - a.y, b.x - a.x);
    },
    angleDiff(a, b){
        let d = (b - a + Math.PI * 3) % (Math.PI * 2) - Math.PI;
        return d;
    },
    rotateTo(from, to, amount){
        return from + this.clamp(this.angleDiff(from, to), -amount, amount);
    },
    mount(){
        this.home = document.getElementById('home');
        if(!this.home) return;
        this.home.classList.add('show');
        this.home.innerHTML = `
            <div id="arena">
                <canvas id="arenaCanvas"></canvas>
                <div class="arena-topbar">
                    <div class="arena-brand">LAST <b>LIGHT</b><span>SOLO ARENA</span></div>
                    <div class="arena-stats">
                        <div><small>ALIVE</small><b id="aliveCount">10</b></div>
                        <div><small>TIME</small><b id="matchTime">00:00</b></div>
                        <div><small>ZONE</small><b id="zoneTime">--</b></div>
                    </div>
                </div>
                <div id="arenaFeed" class="arena-feed"></div>
                <div class="arena-controls">
                    <div id="movePad" class="arena-pad move-pad"><div class="pad-ring"></div><div class="pad-knob"></div><span>MOVE</span></div>
                    <div id="aimPad" class="arena-pad aim-pad"><div class="pad-ring"></div><div class="pad-knob"></div><span>AIM</span></div>
                </div>
                <div class="arena-bottom-hud">
                    <button id="weaponButton" class="arena-round weapon-round" type="button" aria-label="武器を発射">
                        <span class="round-symbol" id="weaponSymbol">拳</span>
                        <img id="weaponArt" class="arena-round-art" alt="">
                        <span class="round-tag" id="weaponTag">FIST</span>
                        <span class="reload-cover" id="reloadCover"></span>
                    </button>
                    <div class="arena-health">
                        <div class="health-caption"><span>HP</span><b id="hpText">100 / 100</b></div>
                        <div class="health-track"><div id="hpFill"></div></div>
                        <div class="ammo-caption" id="ammoText">近接攻撃</div>
                    </div>
                    <button id="foodButton" class="arena-round food-round" type="button" aria-label="食べ物を3秒長押しして回復">
                        <span class="round-symbol" id="foodSymbol">✚</span>
                        <img id="foodArt" class="arena-round-art food-art" alt="">
                        <span class="round-count" id="foodCount">×0</span>
                        <span class="hold-ring" id="holdRing"></span>
                    </button>
                </div>
                <div class="arena-start-screen" id="startScreen">
                    <div class="start-card">
                        <div class="start-kicker">TOP-DOWN SURVIVAL / 001</div>
                        <h1>LAST <b>LIGHT</b></h1>
                        <p class="start-sub">最後のひとりになるまで。</p>
                        <div class="start-rule"><span>10</span> PARTICIPANTS <i>·</i> <span>9</span> CPU <i>·</i> PvPvE</div>
                        <p class="start-desc">武器を拾い、モンスターを倒し、時には他の参加者を出し抜く。<br>視界は光の届く範囲だけ。安全地帯は時間とともに縮小します。</p>
                        <button id="startButton" class="arena-start-button" type="button">ゲーム開始</button>
                        <div class="start-controls">PC：WASD移動 / マウス照準 / 武器ボタンで射撃<br>スマホ：左スティック移動 / 右パッド照準 / 武器ボタンで射撃</div>
                    </div>
                </div>
                <div class="arena-end-screen" id="endScreen">
                    <div class="end-card">
                        <div class="start-kicker" id="resultKicker">MATCH END</div>
                        <h2 id="resultTitle">ELIMINATED</h2>
                        <p id="resultText"></p>
                        <div class="result-stats" id="resultStats"></div>
                        <button id="restartButton" class="arena-start-button" type="button">もう一度プレイ</button>
                    </div>
                </div>
                <div id="arenaToast" class="arena-toast"></div>
            </div>
        `;
        this.root = document.getElementById('arena');
        this.canvas = document.getElementById('arenaCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.bindUI();
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('keydown', e => this.keyDown(e));
        window.addEventListener('keyup', e => this.keyUp(e));
        this.canvas.addEventListener('pointermove', e => this.pointerMove(e));
        this.canvas.addEventListener('pointerdown', e => this.canvasPointerDown(e));
        this.canvas.addEventListener('contextmenu', e => e.preventDefault());
        this.setCamera(0, 0);
        this.drawMenuBackdrop();
        if(!this.raf) this.raf = requestAnimationFrame(t => this.loop(t));
    },
    bindUI(){
        document.getElementById('startButton').addEventListener('click', () => this.newMatch());
        document.getElementById('restartButton').addEventListener('click', () => this.newMatch());
        let fire = document.getElementById('weaponButton');
        fire.addEventListener('pointerdown', e => {
            e.preventDefault();
            try{fire.setPointerCapture(e.pointerId)}catch(err){}
            if(!this.running || this.finished || !this.player || !this.player.alive) return;
            this.firing = 1;
            this.fireEntity(this.player, null, this.now, 1);
            fire.classList.add('pressed');
        });
        let stopFire = () => {
            this.firing = 0;
            fire.classList.remove('pressed');
        };
        fire.addEventListener('pointerup', stopFire);
        fire.addEventListener('pointercancel', stopFire);
        fire.addEventListener('lostpointercapture', stopFire);
        let food = document.getElementById('foodButton');
        food.addEventListener('pointerdown', e => {
            e.preventDefault();
            this.beginFoodHold();
            try{food.setPointerCapture(e.pointerId)}catch(err){}
        });
        food.addEventListener('pointerup', () => this.endFoodHold());
        food.addEventListener('pointercancel', () => this.endFoodHold());
        this.bindPad('movePad', 'movePad');
        this.bindPad('aimPad', 'aimPad');
    },
    bindPad(id, key){
        let pad = document.getElementById(id);
        let knob = pad.querySelector('.pad-knob');
        let update = e => {
            let rect = pad.getBoundingClientRect();
            let cx = rect.left + rect.width / 2;
            let cy = rect.top + rect.height / 2;
            let dx = e.clientX - cx;
            let dy = e.clientY - cy;
            let len = Math.hypot(dx, dy);
            let max = 33;
            if(len > max){dx = dx / len * max; dy = dy / len * max; len = max;}
            this[key].x = dx / max;
            this[key].y = dy / max;
            knob.style.transform = `translate(${dx}px, ${dy}px)`;
            if(key == 'aimPad' && len > 5) this.playerAngleFromVector(dx, dy);
        };
        pad.addEventListener('pointerdown', e => {
            e.preventDefault();
            this[key].active = 1;
            this[key].id = e.pointerId;
            try{pad.setPointerCapture(e.pointerId)}catch(err){}
            update(e);
            pad.classList.add('active');
        });
        pad.addEventListener('pointermove', e => {
            if(!this[key].active || this[key].id != e.pointerId) return;
            update(e);
        });
        let release = e => {
            if(this[key].id != e.pointerId) return;
            this[key].active = 0;
            this[key].id = null;
            this[key].x = 0;
            this[key].y = 0;
            knob.style.transform = 'translate(0px, 0px)';
            pad.classList.remove('active');
        };
        pad.addEventListener('pointerup', release);
        pad.addEventListener('pointercancel', release);
        pad.addEventListener('lostpointercapture', release);
    },
    resize(){
        if(!this.canvas) return;
        this.height = Math.max(420, window.innerHeight);
        let dpr = Math.min(window.devicePixelRatio || 1, 2.5);
        this.canvas.width = Math.round(this.width * dpr);
        this.canvas.height = Math.round(this.height * dpr);
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if(this.root) this.root.style.height = `${this.height}px`;
        if(this.map && this.player){
            this.setCamera(this.player.alive ? this.player.x : this.observer.x, this.player.alive ? this.player.y : this.observer.y);
        }
    },
    keyDown(e){
        let key = e.key.toLowerCase();
        if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(key)) e.preventDefault();
        this.keys[key] = 1;
        if(key == 'h' && !e.repeat) this.beginFoodHold();
        if(key == ' ' && !e.repeat && this.running && this.player && this.player.alive){
            this.firing = 1;
            this.fireEntity(this.player, null, this.now, 1);
        }
    },
    keyUp(e){
        let key = e.key.toLowerCase();
        this.keys[key] = 0;
        if(key == 'h') this.endFoodHold();
        if(key == ' ') this.firing = 0;
    },
    canvasPointerDown(e){
        if(e.pointerType == 'mouse') this.setAimFromScreen(e.clientX, e.clientY);
        if(e.pointerType == 'touch' && e.clientX > window.innerWidth / 2){
            this.setAimFromScreen(e.clientX, e.clientY);
        }
    },
    pointerMove(e){
        if(e.pointerType == 'mouse') this.setAimFromScreen(e.clientX, e.clientY);
        if(e.pointerType == 'touch' && e.buttons && e.clientX > window.innerWidth / 2){
            this.setAimFromScreen(e.clientX, e.clientY);
        }
    },
    setAimFromScreen(clientX, clientY){
        if(!this.player || !this.player.alive || !this.running) return;
        let rect = this.canvas.getBoundingClientRect();
        let wx = clientX - rect.left + this.camera.x - this.width / 2;
        let wy = clientY - rect.top + this.camera.y - this.height / 2;
        this.player.angle = this.angleTo(this.player, {x:wx, y:wy});
    },
    playerAngleFromVector(x, y){
        if(!this.player || !this.player.alive) return;
        this.player.angle = Math.atan2(y, x);
    },
    beginFoodHold(){
        if(!this.running || this.finished || !this.player || !this.player.alive) return;
        if(this.player.food <= 0){
            this.toast('食べ物がありません');
            return;
        }
        this.foodHoldAt = performance.now();
        this.foodConsumed = 0;
        document.getElementById('foodButton').classList.add('pressed');
    },
    endFoodHold(){
        this.foodHoldAt = 0;
        this.foodConsumed = 0;
        if(document.getElementById('foodButton')) document.getElementById('foodButton').classList.remove('pressed');
        this.updateHud();
    },
    useFood(entity, forced){
        if(!entity || entity.food <= 0 || !entity.alive) return 0;
        if(!forced && entity.hp >= entity.maxHp) return 0;
        entity.food -= 1;
        let before = entity.hp;
        entity.hp = Math.min(entity.maxHp, entity.hp + entity.maxHp * 0.30);
        entity.combatUntil = Math.max(entity.combatUntil || 0, this.now + 1800);
        if(entity.isPlayer) this.toast(`食べ物を使用：HP +${Math.round(entity.hp - before)}`);
        return 1;
    },
    newMatch(){
        this.running = 0;
        this.finished = 0;
        this.firing = 0;
        this.foodHoldAt = 0;
        this.foodConsumed = 0;
        this.keys = {};
        this.movePad.x = 0;
        this.movePad.y = 0;
        this.aimPad.x = 0;
        this.aimPad.y = 0;
        this.kills = 0;
        this.feed = [];
        this.monsters = [];
        this.bots = [];
        this.projectiles = [];
        this.pickups = [];
        this.doors = [];
        this.warnings = [];
        this.makeMap();
        let playerPoint = this.randomFloorPoint(null, 0, 1);
        this.player = this.makeParticipant('player', 'YOU', playerPoint.x, playerPoint.y, 1);
        let used = [{x:playerPoint.x,y:playerPoint.y}];
        for(let i=0; i<9; i++){
            let pt = this.randomFloorPoint(used, 180, 0);
            used.push(pt);
            let behavior = this.choose(this.behaviorList);
            let bot = this.makeParticipant(`bot_${i+1}`, this.botNames[i], pt.x, pt.y, 0);
            bot.behavior = behavior;
            bot.color = this.behaviorColors[behavior];
            bot.personalityIndex = i;
            bot.exploreAt = performance.now() + this.rand(1500, 5000);
            bot.nextSense = 0;
            this.bots.push(bot);
        }
        let zonePt = this.choose(this.map.rooms).center;
        this.zone = {
            x:zonePt.x * this.map.tile + this.map.tile / 2,
            y:zonePt.y * this.map.tile + this.map.tile / 2,
            initial:Math.hypot(this.map.width, this.map.height) * 1.03,
            final:95,
            duration:240000,
            radius:Math.hypot(this.map.width, this.map.height) * 0.78
        };
        this.matchStart = performance.now();
        this.now = this.matchStart;
        this.lastFrame = this.matchStart;
        this.nextWeaponSpawn = this.now + this.rand(3500, 8000);
        this.nextMonsterSpawn = this.now + this.rand(7500, 13000);
        this.nextZoneDamage = this.now + 1000;
        this.setCamera(this.player.x, this.player.y);
        this.running = 1;
        document.getElementById('startScreen').classList.add('gone');
        document.getElementById('endScreen').classList.remove('show');
        this.addFeed('マッチ開始。最後のひとりを目指せ。');
        this.toast('武器と食べ物を探してください');
        this.updateHud();
    },
    makeMap(){
        let cols = 56;
        let rows = 40;
        let tile = 32;
        let grid = [];
        for(let y=0; y<rows; y++) grid.push(new Array(cols).fill(0));
        let rooms = [];
        let roomCols = 4;
        let roomRows = 3;
        let slotW = 14;
        let slotH = 13;
        for(let ry=0; ry<roomRows; ry++){
            for(let rx=0; rx<roomCols; rx++){
                let x = rx * slotW + this.rand(1, 3);
                let y = ry * slotH + this.rand(1, 2);
                let w = this.rand(8, 10);
                let h = this.rand(7, 9);
                let room = {id:rooms.length,x1:x,y1:y,x2:Math.min(cols-2,x+w),y2:Math.min(rows-2,y+h)};
                room.cx = Math.floor((room.x1 + room.x2) / 2);
                room.cy = Math.floor((room.y1 + room.y2) / 2);
                room.center = {x:room.cx,y:room.cy};
                rooms.push(room);
                this.stampRoom(grid, room);
            }
        }
        let doors = [];
        for(let ry=0; ry<roomRows; ry++){
            for(let rx=0; rx<roomCols; rx++){
                let index = ry * roomCols + rx;
                let room = rooms[index];
                if(rx < roomCols-1){
                    let next = rooms[index+1];
                    this.connectRooms(grid, room, next, 1);
                    doors.push(this.makeDoor((room.x2+1)*tile, (room.cy+1)*tile, Math.PI/2));
                    doors.push(this.makeDoor(next.x1*tile, (next.cy+1)*tile, Math.PI/2));
                }
                if(ry < roomRows-1){
                    let next = rooms[index+roomCols];
                    this.connectRooms(grid, room, next, 0);
                    doors.push(this.makeDoor((room.cx+1)*tile, (room.y2+1)*tile, 0));
                    doors.push(this.makeDoor((next.cx+1)*tile, next.y1*tile, 0));
                }
            }
        }
        this.map = {cols,rows,tile,grid,width:cols*tile,height:rows*tile,rooms};
        this.doors = doors;
    },
    stampRoom(grid, room){
        for(let y=room.y1; y<=room.y2; y++){
            for(let x=room.x1; x<=room.x2; x++) grid[y][x] = 1;
        }
    },
    stampCorridor(grid, x1, y1, x2, y2){
        let dx = Math.sign(x2-x1);
        let dy = Math.sign(y2-y1);
        let x = x1;
        let y = y1;
        if(dx){
            while(x != x2){
                for(let oy=0; oy<2; oy++) if(grid[y+oy] && grid[y+oy][x] != undefined) grid[y+oy][x] = 1;
                x += dx;
            }
            for(let oy=0; oy<2; oy++) if(grid[y+oy] && grid[y+oy][x] != undefined) grid[y+oy][x] = 1;
        }
        if(dy){
            while(y != y2){
                for(let ox=0; ox<2; ox++) if(grid[y] && grid[y][x+ox] != undefined) grid[y][x+ox] = 1;
                y += dy;
            }
            for(let ox=0; ox<2; ox++) if(grid[y] && grid[y][x+ox] != undefined) grid[y][x+ox] = 1;
        }
    },
    connectRooms(grid, a, b, horizontalFirst){
        let ax = a.cx;
        let ay = a.cy;
        let bx = b.cx;
        let by = b.cy;
        if(horizontalFirst){
            let mx = Math.floor((ax + bx) / 2);
            this.stampCorridor(grid, ax, ay, mx, ay);
            this.stampCorridor(grid, mx, ay, mx, by);
            this.stampCorridor(grid, mx, by, bx, by);
        }else{
            let my = Math.floor((ay + by) / 2);
            this.stampCorridor(grid, ax, ay, ax, my);
            this.stampCorridor(grid, ax, my, bx, my);
            this.stampCorridor(grid, bx, my, bx, by);
        }
    },
    makeDoor(x, y, angle){
        return {x,y,angle,length:82,open:0,openUntil:0};
    },
    randomFloorPoint(used, minDistance, edgeOnly){
        let grid = this.map.grid;
        let cols = this.map.cols;
        let rows = this.map.rows;
        let pt = null;
        for(let i=0; i<1500; i++){
            let x = this.rand(1, cols-2);
            let y = this.rand(1, rows-2);
            if(!grid[y][x]) continue;
            if(edgeOnly && Math.min(x, cols-1-x, y, rows-1-y) > 7) continue;
            let candidate = {x:(x+0.5)*this.map.tile,y:(y+0.5)*this.map.tile};
            if(used && used.some(p => this.dist(candidate,p) < minDistance)) continue;
            pt = candidate;
            break;
        }
        if(!pt){
            let room = this.choose(this.map.rooms);
            pt = {x:(room.cx+0.5)*this.map.tile,y:(room.cy+0.5)*this.map.tile};
        }
        return pt;
    },
    makeParticipant(id, name, x, y, isPlayer){
        return {
            id,name,isPlayer:!!isPlayer,x,y,r:10,angle:Math.random()*Math.PI*2,
            hp:100,maxHp:100,alive:1,food:0,weapon:null,ammo:0,reloading:0,reloadUntil:0,
            nextShot:0,lastShot:0,combatUntil:0,lastAttacker:null,wasAttacked:0,
            kills:0,damageTaken:0,behavior:null,color:isPlayer?'#cfe9ff':'#b5c0c9',
            visibleParticipants:[],visibleMonsters:[],visiblePickups:[],
            memory:null,nextSense:0,goal:null,path:[],pathAt:0,stuck:0,
            targetEntity:null,goalMode:'explore',exploreAt:0,wanderAt:0,ambushAt:0,hidePoint:null,
            nextAttack:0,strafe:0,scanAt:0,scanDirection:1
        };
    },
    loop(t){
        if(!this.home) return;
        let dt = this.lastFrame ? Math.min(0.04, (t - this.lastFrame) / 1000) : 0.016;
        this.lastFrame = t;
        this.now = t;
        if(this.running && !this.finished) this.update(dt);
        this.render();
        this.raf = requestAnimationFrame(n => this.loop(n));
    },
    update(dt){
        let elapsed = this.now - this.matchStart;
        this.zone.radius = Math.max(this.zone.final, this.zone.initial - (this.zone.initial-this.zone.final) * this.clamp(elapsed / this.zone.duration, 0, 1));
        if(this.now >= this.nextWeaponSpawn){
            if(this.pickups.filter(p => p.kind == 'weapon').length < 18){
                let pt = this.randomFloorPoint(null,0,0);
                this.spawnWeapon(this.choose(Object.keys(this.weapons)),pt.x,pt.y);
            }
            this.nextWeaponSpawn = this.now + this.rand(7800, 15500);
        }
        if(this.now >= this.nextMonsterSpawn){
            if(this.monsters.length < 9) this.prepareMonsterSpawn();
            this.nextMonsterSpawn = this.now + this.rand(9000, 16500);
        }
        this.updateWarnings();
        this.updateDoors();
        this.updatePlayer(dt);
        for(let bot of this.bots){
            if(bot.alive) this.updateBot(bot,dt);
        }
        this.updateMonsters(dt);
        this.updateProjectiles(dt);
        this.updatePickups();
        if(this.now >= this.nextZoneDamage){
            this.nextZoneDamage = this.now + 1000;
            this.applyZoneDamage();
        }
        this.updateCamera(dt);
        this.checkMatchEnd();
        if(this.now - this.uiTick > 100){
            this.uiTick = this.now;
            this.updateHud();
        }
    },
    updatePlayer(dt){
        let p = this.player;
        if(!p) return;
        if(this.foodHoldAt && !this.foodConsumed){
            let progress = (this.now - this.foodHoldAt) / 3000;
            document.getElementById('holdRing').style.setProperty('--progress',`${this.clamp(progress,0,1)*100}%`);
            if(progress >= 1){
                this.useFood(p,1);
                this.foodConsumed = 1;
            }
        }
        if(!p.alive){
            let mx = (this.keys['d'] || this.keys['arrowright'] ? 1:0) - (this.keys['a'] || this.keys['arrowleft'] ? 1:0) + this.movePad.x;
            let my = (this.keys['s'] || this.keys['arrowdown'] ? 1:0) - (this.keys['w'] || this.keys['arrowup'] ? 1:0) + this.movePad.y;
            let len = Math.hypot(mx,my);
            if(len > 1){mx/=len;my/=len;}
            this.observer.x = this.clamp(this.observer.x + mx * 220 * dt, 0, this.map.width);
            this.observer.y = this.clamp(this.observer.y + my * 220 * dt, 0, this.map.height);
            return;
        }
        let mx = (this.keys['d'] || this.keys['arrowright'] ? 1:0) - (this.keys['a'] || this.keys['arrowleft'] ? 1:0) + this.movePad.x;
        let my = (this.keys['s'] || this.keys['arrowdown'] ? 1:0) - (this.keys['w'] || this.keys['arrowup'] ? 1:0) + this.movePad.y;
        let len = Math.hypot(mx,my);
        if(len > 1){mx/=len;my/=len;}
        if(this.foodHoldAt){mx = 0;my = 0;}
        if(len > 0.08) this.moveEntity(p,mx,my,150,dt);
        if(this.firing && !this.foodHoldAt) this.fireEntity(p,null,this.now,0);
        this.updateReload(p);
    },
    updateCamera(dt){
        let targetX = this.player.alive ? this.player.x : this.observer.x;
        let targetY = this.player.alive ? this.player.y : this.observer.y;
        this.camera.x += (targetX - this.camera.x) * Math.min(1,dt*8);
        this.camera.y += (targetY - this.camera.y) * Math.min(1,dt*8);
        this.setCamera(this.camera.x,this.camera.y);
    },
    setCamera(x,y){
        if(!this.map) return;
        this.camera.x = this.clamp(x,0,this.map.width);
        this.camera.y = this.clamp(y,0,this.map.height);
    },
    moveEntity(entity, mx, my, speed, dt){
        if(!mx && !my) return;
        let len = Math.hypot(mx,my) || 1;
        mx/=len; my/=len;
        let nx = entity.x + mx*speed*dt;
        let ny = entity.y + my*speed*dt;
        let moved = 0;
        if(!this.circleCollides(nx,entity.y,entity.r || 10)){
            entity.x = nx;
            moved = 1;
        }
        if(!this.circleCollides(entity.x,ny,entity.r || 10)){
            entity.y = ny;
            moved = 1;
        }
        if(!moved) entity.stuck = (entity.stuck || 0) + dt;
        else entity.stuck = 0;
    },
    circleCollides(x,y,r){
        let tile = this.map.tile;
        let minX = Math.floor((x-r)/tile);
        let maxX = Math.floor((x+r)/tile);
        let minY = Math.floor((y-r)/tile);
        let maxY = Math.floor((y+r)/tile);
        if(x-r < 0 || y-r < 0 || x+r > this.map.width || y+r > this.map.height) return 1;
        for(let cy=minY; cy<=maxY; cy++){
            for(let cx=minX; cx<=maxX; cx++){
                if(this.tileAt(cx,cy)) continue;
                let rx = cx*tile;
                let ry = cy*tile;
                let px = this.clamp(x,rx,rx+tile);
                let py = this.clamp(y,ry,ry+tile);
                if((x-px)*(x-px)+(y-py)*(y-py) < r*r) return 1;
            }
        }
        for(let door of this.doors){
            if(door.open) continue;
            if(this.pointSegmentDistance(x,y,door) < r+4) return 1;
        }
        return 0;
    },
    pointSegmentDistance(x,y,door){
        let dx = Math.cos(door.angle)*door.length/2;
        let dy = Math.sin(door.angle)*door.length/2;
        let ax=door.x-dx, ay=door.y-dy, bx=door.x+dx, by=door.y+dy;
        let vx=bx-ax, vy=by-ay;
        let t=this.clamp(((x-ax)*vx+(y-ay)*vy)/(vx*vx+vy*vy || 1),0,1);
        return Math.hypot(x-(ax+t*vx),y-(ay+t*vy));
    },
    tileAt(x,y){
        if(!this.map || x<0 || y<0 || x>=this.map.cols || y>=this.map.rows) return 0;
        return this.map.grid[y][x];
    },
    isSolidPoint(x,y){
        let tile = this.map.tile;
        if(!this.tileAt(Math.floor(x/tile),Math.floor(y/tile))) return 1;
        for(let door of this.doors){
            if(!door.open && this.pointSegmentDistance(x,y,door) < 2.5) return 1;
        }
        return 0;
    },
    lineClear(a,b){
        let dx=b.x-a.x,dy=b.y-a.y;
        let len=Math.hypot(dx,dy);
        let steps=Math.ceil(len/9);
        for(let i=1;i<steps;i++){
            let t=i/steps;
            if(this.isSolidPoint(a.x+dx*t,a.y+dy*t)) return 0;
        }
        return 1;
    },
    updateDoors(){
        for(let door of this.doors){
            let near = 0;
            for(let p of [this.player,...this.bots,...this.monsters]){
                if(!p || !p.alive) continue;
                if(Math.hypot(p.x-door.x,p.y-door.y) < 62){near=1;break;}
            }
            if(near){door.open=1;door.openUntil=this.now+1000;}
            else if(door.open && this.now > door.openUntil) door.open=0;
        }
    },
    visible(observer,target,range,fov){
        if(!observer || !target || target.alive == 0) return 0;
        let d=this.dist(observer,target);
        if(d>range) return 0;
        let a=this.angleTo(observer,target);
        if(Math.abs(this.angleDiff(observer.angle,a)) > fov/2) return 0;
        return this.lineClear(observer,target);
    },
    sense(bot){
        if(this.now < bot.nextSense) return;
        bot.nextSense = this.now + 180;
        bot.visibleParticipants = [];
        bot.visibleMonsters = [];
        bot.visiblePickups = [];
        for(let p of [this.player,...this.bots]){
            if(!p || p.id == bot.id || !p.alive) continue;
            if(this.visible(bot,p,340,1.75)) bot.visibleParticipants.push(p);
        }
        for(let m of this.monsters){
            if(m.alive && this.visible(bot,m,300,1.85)) bot.visibleMonsters.push(m);
        }
        for(let item of this.pickups){
            if(this.dist(bot,item) < 235 && this.inFront(bot,item,1.9) && this.lineClear(bot,item)) bot.visiblePickups.push(item);
        }
    },
    inFront(a,b,fov){
        return Math.abs(this.angleDiff(a.angle,this.angleTo(a,b))) <= fov/2;
    },
    updateBot(bot,dt){
        this.updateReload(bot);
        if(this.now > bot.combatUntil) bot.wasAttacked=0;
        this.sense(bot);
        let behavior = bot.behavior;
        let zoneDistance = Math.hypot(bot.x-this.zone.x,bot.y-this.zone.y);
        if(zoneDistance > this.zone.radius-85){
            let a = Math.atan2(bot.y-this.zone.y,bot.x-this.zone.x);
            let r = Math.max(0,this.zone.radius-95);
            let zoneGoal = {x:this.zone.x+Math.cos(a)*r,y:this.zone.y+Math.sin(a)*r};
            bot.goalMode='zone';
            bot.targetEntity=null;
            this.navigateBot(bot,zoneGoal,dt);
            this.botHealing(bot,behavior,0);
            return;
        }
        let visiblePlayers = bot.visibleParticipants;
        let visibleMonsters = bot.visibleMonsters;
        let visibleItems = bot.visiblePickups;
        let finalPhase = this.aliveCount() <= 2;
        let enemy = null;
        let monster = null;
        let fleeTarget = null;
        let goal = null;
        let shouldFight = 0;
        let shouldFlee = 0;
        let targetMemory = bot.memory;

        if(targetMemory && this.now-targetMemory.time > 10000) bot.memory = null;
        targetMemory = bot.memory;

        if(finalPhase){
            if(visiblePlayers.length){
                enemy = this.nearest(bot,visiblePlayers);
                bot.memory = {kind:'participant',id:enemy.id,x:enemy.x,y:enemy.y,time:this.now};
            }else if(targetMemory && targetMemory.kind == 'participant'){
                goal = {x:targetMemory.x,y:targetMemory.y};
            }
            shouldFight = 1;
        }else if(behavior == 'エゴイスト'){
            if(visiblePlayers.length){
                enemy = this.nearest(bot,visiblePlayers);
                bot.memory = {kind:'participant',id:enemy.id,x:enemy.x,y:enemy.y,time:this.now};
            }else if(visibleMonsters.length){
                monster = this.nearest(bot,visibleMonsters);
                bot.memory = {kind:'monster',id:monster.id,x:monster.x,y:monster.y,time:this.now};
            }else if(targetMemory){
                goal = {x:targetMemory.x,y:targetMemory.y};
            }
            shouldFight = 1;
        }else if(behavior == '百姓'){
            let ready = bot.weapon && bot.food >= 7;
            if(visiblePlayers.length && !ready){
                fleeTarget = this.nearest(bot,visiblePlayers);
                shouldFlee = 1;
                if(Math.random() < 0.018) bot.lookBackUntil = this.now + 450;
            }else if(ready && visiblePlayers.length){
                enemy = this.nearest(bot,visiblePlayers);
                shouldFight = 1;
                bot.memory = {kind:'participant',id:enemy.id,x:enemy.x,y:enemy.y,time:this.now};
            }else if(visibleMonsters.length){
                monster = this.nearest(bot,visibleMonsters);
                shouldFight = 1;
                bot.memory = {kind:'monster',id:monster.id,x:monster.x,y:monster.y,time:this.now};
            }else if(targetMemory && targetMemory.kind == 'monster' && this.now-targetMemory.time < 10000){
                goal = {x:targetMemory.x,y:targetMemory.y};
            }
            if(!enemy && !monster){
                let item = this.pickUsefulItem(bot,visibleItems,ready);
                if(item) goal = {x:item.x,y:item.y,item};
            }
        }else if(behavior == '姑息'){
            if(visiblePlayers.length){
                let vulnerable = visiblePlayers.filter(p => p.hp < 50 || p.combatUntil > this.now);
                if(vulnerable.length){
                    enemy = this.nearest(bot,vulnerable);
                    shouldFight = 1;
                    bot.memory = {kind:'participant',id:enemy.id,x:enemy.x,y:enemy.y,time:this.now};
                }else if(bot.weapon && this.dist(bot,this.nearest(bot,visiblePlayers)) > 155){
                    let watcher=this.nearest(bot,visiblePlayers);
                    let side=this.angleTo(watcher,bot)+Math.PI/2;
                    goal={x:watcher.x+Math.cos(side)*185,y:watcher.y+Math.sin(side)*185};
                    bot.angle=this.rotateTo(bot.angle,this.angleTo(bot,watcher),dt*3);
                }else{
                    fleeTarget = this.nearest(bot,visiblePlayers);
                    shouldFlee = 1;
                }
            }else if(targetMemory && targetMemory.kind == 'participant' && this.now-targetMemory.time < 10000){
                goal = {x:targetMemory.x,y:targetMemory.y};
            }
            if(!enemy && !fleeTarget){
                let item = this.pickUsefulItem(bot,visibleItems,0);
                if(item) goal = {x:item.x,y:item.y,item};
            }
        }else if(behavior == 'アサシン'){
            let preferred = visibleItems.filter(a => a.kind == 'weapon' && (a.weapon == 'knife' || a.weapon == 'hammer'));
            if(!bot.weapon || (bot.weapon.id != 'knife' && bot.weapon.id != 'hammer')){
                if(preferred.length){let item=this.nearest(bot,preferred);goal={x:item.x,y:item.y,item};}
            }
            if(visiblePlayers.length){
                let close = visiblePlayers.filter(p => this.dist(bot,p) < 59);
                if(close.length && bot.weapon && bot.weapon.type == 'melee' && !bot.wasAttacked && bot.hp >= 40){
                    enemy=this.nearest(bot,close);shouldFight=1;
                    bot.memory={kind:'participant',id:enemy.id,x:enemy.x,y:enemy.y,time:this.now};
                }else if(bot.wasAttacked || bot.hp < 40){
                    enemy=this.nearest(bot,visiblePlayers);shouldFight=1;shouldFlee=1;fleeTarget=enemy;
                }
            }
            if(!enemy && !goal && bot.weapon){
                if(!bot.hidePoint || this.now >= bot.ambushAt){
                    bot.hidePoint=this.randomHidePoint(bot);
                    bot.ambushAt=this.now+30000;
                }
                goal={x:bot.hidePoint.x,y:bot.hidePoint.y};
                if(this.now < bot.ambushAt && this.dist(bot,goal)<18) bot.goalMode='ambush';
            }
            if(!enemy && !goal){
                let item=this.pickUsefulItem(bot,visibleItems,0);
                if(item) goal={x:item.x,y:item.y,item};
            }
        }else if(behavior == 'レッカー車'){
            if(visibleMonsters.length){
                monster=this.nearest(bot,visibleMonsters);
                shouldFight=1;
                bot.memory={kind:'monster',id:monster.id,x:monster.x,y:monster.y,time:this.now};
                let nearPlayers=visiblePlayers.filter(p=>this.dist(p,monster)<190);
                if(nearPlayers.length){
                    let nearestP=this.nearest(bot,nearPlayers);
                    if(this.dist(bot,nearestP)<125 && bot.weapon) enemy=nearestP;
                }
            }else if(targetMemory && targetMemory.kind=='monster' && this.now-targetMemory.time<10000){
                goal={x:targetMemory.x,y:targetMemory.y};
            }
            if(!monster && visiblePlayers.length && !enemy){
                fleeTarget=this.nearest(bot,visiblePlayers);shouldFlee=1;
            }
            if(!enemy && !monster){
                let item=this.pickUsefulItem(bot,visibleItems,0);
                if(item) goal={x:item.x,y:item.y,item};
            }
        }else if(behavior == '一般人A'){
            if(visiblePlayers.length){
                let candidate=this.nearest(bot,visiblePlayers);
                let advantage=bot.weapon && bot.hp > candidate.hp + (candidate.weapon?25:0);
                if(advantage && bot.hp >= 50){enemy=candidate;shouldFight=1;bot.memory={kind:'participant',id:enemy.id,x:enemy.x,y:enemy.y,time:this.now};}
                else{fleeTarget=candidate;shouldFlee=1;}
            }
            if(bot.hp<50){
                if(!bot.hidePoint || this.dist(bot,bot.hidePoint)<22) bot.hidePoint=this.randomHidePoint(bot);
                goal=bot.hidePoint;
            }else{
                bot.hidePoint=null;
                if(!enemy && !fleeTarget){
                    let item=this.pickUsefulItem(bot,visibleItems,bot.food>=3);
                    if(item) goal={x:item.x,y:item.y,item};
                }
            }
        }

        if(finalPhase && !enemy && visiblePlayers.length){
            enemy=this.nearest(bot,visiblePlayers);
            shouldFight=1;
            shouldFlee=0;
        }

        let target = enemy || monster;
        if(target){
            bot.memory = {kind:enemy?'participant':'monster',id:target.id,x:target.x,y:target.y,time:this.now};
            bot.angle=this.rotateTo(bot.angle,this.angleTo(bot,target),dt*5.5);
            goal={x:target.x,y:target.y};
            if(shouldFight){
                let range = this.botWeaponRange(bot);
                if(this.dist(bot,target) <= range && this.lineClear(bot,target)) this.fireEntity(bot,target,this.now,0);
            }
        }else if(targetMemory && this.now-targetMemory.time < 10000 && !goal && !fleeTarget){
            goal={x:targetMemory.x,y:targetMemory.y};
        }

        if(shouldFlee && fleeTarget){
            let a=this.angleTo(fleeTarget,bot);
            let destination={x:this.clamp(bot.x+Math.cos(a)*240,20,this.map.width-20),y:this.clamp(bot.y+Math.sin(a)*240,20,this.map.height-20)};
            if(behavior=='一般人A' && bot.hp<50){
                if(!bot.hidePoint) bot.hidePoint=this.randomHidePoint(bot);
                goal=bot.hidePoint;
            }else goal=destination;
            bot.angle=this.rotateTo(bot.angle,this.angleTo(bot,fleeTarget),dt*3.2);
            if(behavior=='百姓' && bot.lookBackUntil > this.now) bot.angle=this.rotateTo(bot.angle,this.angleTo(bot,fleeTarget),dt*9);
        }

        if(!goal && !target && !fleeTarget){
            let item=this.pickUsefulItem(bot,visibleItems,0);
            if(item) goal={x:item.x,y:item.y,item};
        }
        if(!goal && !target && !fleeTarget){
            if(!bot.goal || this.now > bot.wanderAt || this.dist(bot,bot.goal)<30){
                bot.goal=bot.behavior=='一般人A'?this.randomWallPoint(bot):this.randomFloorPoint(null,0,0);
                bot.wanderAt=this.now+this.rand(4500,9000);
                bot.pathAt=0;
            }
            goal=bot.goal;
        }
        if(goal){
            this.navigateBot(bot,goal,dt);
        }else if(!target && !fleeTarget){
            this.navigateBot(bot,{x:bot.x,y:bot.y},dt);
        }

        if(behavior=='一般人A' && !target && !fleeTarget){
            if(this.now > bot.scanAt){bot.scanDirection *= -1;bot.scanAt=this.now+700;}
            bot.angle += bot.scanDirection * dt * 0.35;
        }
        if(behavior=='百姓' && shouldFlee && this.now > (bot.lookBackUntil||0)){
            bot.angle += Math.sin(this.now/260)*dt*0.12;
        }
        this.botHealing(bot,behavior,!!target);
        if(bot.weapon && bot.weapon.type=='gun') this.updateReload(bot);
    },
    pickUsefulItem(bot,items,ready){
        let filtered=items.filter(item => {
            if(item.kind=='food') return bot.food< (bot.behavior=='百姓'?7:3);
            if(item.kind=='weapon'){
                let next=this.weapons[item.weapon];
                if(!next) return 0;
                if(bot.behavior=='アサシン'){
                    if(next.type=='melee') return !bot.weapon || bot.weapon.type!='melee' || next.score>bot.weapon.score;
                    return !bot.weapon;
                }
                return !bot.weapon || next.score>bot.weapon.score;
            }
            return 0;
        });
        return filtered.length?this.nearest(bot,filtered):null;
    },
    randomWallPoint(bot){
        let room=this.nearestRoom(bot);
        let options=[
            {x:room.cx,y:room.y1+1},{x:room.cx,y:room.y2-1},
            {x:room.x1+1,y:room.cy},{x:room.x2-1,y:room.cy}
        ];
        let point=this.choose(options);
        return {x:(point.x+0.5)*this.map.tile,y:(point.y+0.5)*this.map.tile};
    },
    randomHidePoint(bot){
        let room=this.nearestRoom(bot);
        let x=this.rand(room.x1+1,room.x2-1);
        let y=this.rand(room.y1+1,room.y2-1);
        let corners=[
            {x:room.x1+1,y:room.y1+1},{x:room.x2-1,y:room.y1+1},
            {x:room.x1+1,y:room.y2-1},{x:room.x2-1,y:room.y2-1},
            {x,y}
        ];
        let pt=this.choose(corners);
        return {x:(pt.x+0.5)*this.map.tile,y:(pt.y+0.5)*this.map.tile};
    },
    nearestRoom(entity){
        let tile=this.map.tile;
        return this.map.rooms.reduce((best,room)=>{
            let center={x:(room.cx+0.5)*tile,y:(room.cy+0.5)*tile};
            if(!best || this.dist(entity,center)<best.d) return {room,d:this.dist(entity,center)};
            return best;
        },null).room;
    },
    botWeaponRange(bot){
        if(!bot.weapon) return 27;
        return bot.weapon.type=='melee'?bot.weapon.range+8:420;
    },
    botHealing(bot,behavior,inCombat){
        if(!bot.alive || bot.food<=0) return;
        let nonCombat=this.now > bot.combatUntil && !inCombat;
        let must=bot.hp<15 || (nonCombat && bot.hp<90);
        let desire=0;
        if(behavior=='百姓' && nonCombat && bot.hp<65) desire=1;
        if(behavior=='アサシン' && bot.hp<40) desire=1;
        if(behavior=='一般人A' && nonCombat && bot.hp<68) desire=1;
        if(behavior=='姑息' && nonCombat && bot.hp<78) desire=1;
        if((must && bot.hp<15) || ((must || desire) && this.now > (bot.healAt||0))){
            this.useFood(bot,1);
            bot.healAt=this.now+6000;
        }
    },
    navigateBot(bot,goal,dt){
        if(!goal) return;
        let change=!bot.goal || Math.hypot(bot.goal.x-goal.x,bot.goal.y-goal.y)>42;
        if(change || this.now > bot.pathAt || bot.stuck>0.6){
            bot.goal={x:goal.x,y:goal.y};
            bot.path=this.findPath(bot.x,bot.y,goal.x,goal.y);
            bot.pathIndex=0;
            bot.pathAt=this.now+this.rand(750,1250);
            bot.stuck=0;
        }
        let waypoint=bot.path && bot.path[bot.pathIndex||0];
        if(waypoint && Math.hypot(bot.x-waypoint.x,bot.y-waypoint.y)<18){
            bot.pathIndex=(bot.pathIndex||0)+1;
            waypoint=bot.path[bot.pathIndex];
        }
        if(!waypoint) waypoint=goal;
        let dx=waypoint.x-bot.x,dy=waypoint.y-bot.y;
        let d=Math.hypot(dx,dy);
        if(d>1){
            let facing=this.angleTo(bot,waypoint);
            if(!bot.targetEntity) bot.angle=this.rotateTo(bot.angle,facing,dt*4.5);
            let speed=bot.behavior=='アサシン' && bot.goalMode=='ambush' ? 0 : 75;
            if(bot.behavior=='百姓' && bot.lookBackUntil>this.now) speed=85;
            if(bot.behavior=='エゴイスト') speed=91;
            if(bot.behavior=='一般人A') speed=68;
            if(bot.behavior=='姑息' && bot.goalMode=='flee') speed=106;
            if(bot.behavior=='レッカー車') speed=77;
            this.moveEntity(bot,dx/d,dy/d,speed,dt);
        }
    },
    findPath(sx,sy,gx,gy){
        let tile=this.map.tile;
        let startX=this.clamp(Math.floor(sx/tile),1,this.map.cols-2);
        let startY=this.clamp(Math.floor(sy/tile),1,this.map.rows-2);
        let endX=this.clamp(Math.floor(gx/tile),1,this.map.cols-2);
        let endY=this.clamp(Math.floor(gy/tile),1,this.map.rows-2);
        if(!this.tileAt(endX,endY)){
            let found=0;
            for(let r=1;r<8 && !found;r++){
                for(let oy=-r;oy<=r;oy++){
                    for(let ox=-r;ox<=r;ox++){
                        if(this.tileAt(endX+ox,endY+oy)){endX+=ox;endY+=oy;found=1;break;}
                    }
                    if(found) break;
                }
            }
        }
        let cols=this.map.cols,rows=this.map.rows;
        let start=startY*cols+startX;
        let end=endY*cols+endX;
        if(start==end) return [{x:(endX+0.5)*tile,y:(endY+0.5)*tile}];
        let total=cols*rows;
        let came=new Int32Array(total);
        came.fill(-1);
        let queue=new Int32Array(total);
        let head=0,tail=0;
        queue[tail++]=start;
        came[start]=start;
        let dirs=[1,-1,cols,-cols];
        while(head<tail){
            let cur=queue[head++];
            if(cur==end) break;
            for(let d of dirs){
                let next=cur+d;
                let x=next%cols;
                let y=Math.floor(next/cols);
                if(x<1 || y<1 || x>=cols-1 || y>=rows-1 || came[next]!=-1) continue;
                if(!this.tileAt(x,y)) continue;
                came[next]=cur;
                queue[tail++]=next;
            }
        }
        if(came[end]==-1) return [];
        let path=[];
        let at=end;
        while(at!=start){
            path.push({x:((at%cols)+0.5)*tile,y:(Math.floor(at/cols)+0.5)*tile});
            at=came[at];
        }
        path.reverse();
        return path;
    },
    nearest(origin,arr){
        let best=null;
        let bestD=Infinity;
        for(let item of arr){let d=this.dist(origin,item);if(d<bestD){bestD=d;best=item;}}
        return best;
    },
    updateReload(entity){
        if(!entity.weapon) return;
        let w=entity.weapon;
        if(entity.reloading && this.now >= entity.reloadUntil){
            entity.reloading=0;
            entity.ammo=w.mag;
        }
        if(!entity.reloading && entity.lastShot && this.now-entity.lastShot>=5000 && entity.ammo<w.mag){
            this.startReload(entity);
        }
    },
    startReload(entity){
        if(!entity.weapon || entity.reloading) return;
        entity.reloading=1;
        entity.reloadUntil=this.now+entity.weapon.reload;
        if(entity.isPlayer) this.toast('自動リロード中');
    },
    fireEntity(entity,target,now,force){
        if(!entity || !entity.alive || !this.running || this.finished) return;
        let weapon=entity.weapon;
        if(!weapon){
            if(now < entity.nextShot) return;
            entity.nextShot=now+510;
            entity.lastShot=now;
            let aim=entity.angle;
            let candidates=this.allTargets(entity);
            let hit=null;
            for(let candidate of candidates){
                let d=this.dist(entity,candidate);
                let a=Math.abs(this.angleDiff(aim,this.angleTo(entity,candidate)));
                if(d<=27 && a<0.95 && this.lineClear(entity,candidate)){hit=candidate;break;}
            }
            if(hit) this.damage(hit,3,entity);
            return;
        }
        this.updateReload(entity);
        if(entity.reloading || now < entity.nextShot) return;
        if(entity.ammo<=0){this.startReload(entity);return;}
        if(target && target.alive){
            entity.angle=this.angleTo(entity,target);
        }
        entity.lastShot=now;
        entity.nextShot=now+weapon.rate;
        entity.ammo -= 1;
        if(weapon.type=='melee'){
            let candidates=this.allTargets(entity);
            let hit=null;
            for(let candidate of candidates){
                let d=this.dist(entity,candidate);
                let a=Math.abs(this.angleDiff(entity.angle,this.angleTo(entity,candidate)));
                if(d<=weapon.range && a<=weapon.arc/2 && this.lineClear(entity,candidate)){
                    if(!hit || d<this.dist(entity,hit)) hit=candidate;
                }
            }
            if(hit){
                this.damage(hit,weapon.damage,entity);
                if(weapon.id=='hammer'){
                    let a=this.angleTo(entity,hit);
                    this.moveEntity(hit,Math.cos(a),Math.sin(a),105,0.12);
                }
            }
        }else{
            let pellets=weapon.pellets||1;
            for(let i=0;i<pellets;i++){
                let spread=(Math.random()-0.5)*weapon.spread;
                let angle=entity.angle+spread;
                let speed=weapon.speed;
                this.projectiles.push({
                    x:entity.x+Math.cos(angle)*14,y:entity.y+Math.sin(angle)*14,
                    vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,
                    damage:weapon.damage,r:weapon.id=='shotgun'?3:2.5,
                    owner:entity.id,ownerIsMonster:0,life:weapon.range/speed,
                    color:entity.isPlayer?'#d8f1ff':'#ffd9a8'
                });
            }
        }
        if(entity.ammo<=0) this.startReload(entity);
    },
    allTargets(attacker){
        let arr=[];
        if(attacker.isMonster){
            if(this.player.alive) arr.push(this.player);
            for(let bot of this.bots) if(bot.alive) arr.push(bot);
        }else{
            if(this.player.alive && attacker.id!='player') arr.push(this.player);
            if(attacker.id=='player' || attacker.id.indexOf('bot_')==0){
                for(let bot of this.bots) if(bot.alive && bot.id!=attacker.id) arr.push(bot);
            }
            for(let monster of this.monsters) if(monster.alive) arr.push(monster);
        }
        return arr;
    },
    damage(target,amount,attacker){
        if(!target || !target.alive) return;
        target.hp-=amount;
        target.combatUntil=this.now+7000;
        target.damageTaken=(target.damageTaken||0)+amount;
        if(target.isPlayer || target.behavior) target.wasAttacked=1;
        if(attacker && !attacker.isMonster){attacker.combatUntil=this.now+5000;}
        if(target.hp<=0){
            target.hp=0;
            target.alive=0;
            if(attacker){attacker.kills=(attacker.kills||0)+1;if(attacker.isPlayer)this.kills+=1;}
            let killer=attacker?attacker.name:'不明';
            this.addFeed(`${killer} → ${target.name||target.type||'対象'}`);
            if(target.isMonster){
                this.dropFood(target.x,target.y,1+(Math.random()<0.28?1:0));
                this.monsters=this.monsters.filter(m=>m.alive);
            }
            if(target.isPlayer){
                this.observer.x=target.x;
                this.observer.y=target.y;
                this.firing=0;
                this.endFoodHold();
                this.toast('脱落。観戦モードに移行します');
            }
        }
    },
    prepareMonsterSpawn(){
        let pt=null;
        for(let i=0;i<120;i++){
            let edge=Math.random()<0.62;
            let candidate=edge?this.randomFloorPoint(null,0,1):this.randomCenterFloorPoint();
            let tooNear=[this.player,...this.bots].some(p=>p.alive && this.dist(p,candidate)<285);
            if(tooNear) continue;
            let inView=[this.player,...this.bots].some(p=>p.alive && this.visible(p,candidate,330,1.25));
            if(inView) continue;
            pt=candidate;
            break;
        }
        if(!pt) pt=this.randomFloorPoint(null,0,0);
        this.warnings.push({x:pt.x,y:pt.y,ends:this.now+1650,type:this.choose(this.monsterTypes)});
        this.addFeed('不明な反応を検知。出現予兆。');
    },
    randomCenterFloorPoint(){
        let minX=Math.floor(this.map.cols*0.29);
        let maxX=Math.floor(this.map.cols*0.71);
        let minY=Math.floor(this.map.rows*0.25);
        let maxY=Math.floor(this.map.rows*0.75);
        for(let i=0;i<500;i++){
            let x=this.rand(minX,maxX);
            let y=this.rand(minY,maxY);
            if(this.tileAt(x,y)) return {x:(x+0.5)*this.map.tile,y:(y+0.5)*this.map.tile};
        }
        return this.randomFloorPoint(null,0,0);
    },
    updateWarnings(){
        for(let i=this.warnings.length-1;i>=0;i--){
            let warning=this.warnings[i];
            if(this.now>=warning.ends){
                this.spawnMonster(warning.type,warning.x,warning.y);
                this.warnings.splice(i,1);
            }
        }
    },
    spawnMonster(type,x,y){
        let m={
            id:`monster_${Math.floor(Math.random()*1e9)}`,name:type.name,short:type.short,type:type.type,imageId:type.id,color:type.color,
            x,y,r:13,hp:type.hp,maxHp:type.hp,speed:type.speed,damage:type.damage,alive:1,isMonster:1,
            angle:Math.random()*Math.PI*2,nextAttack:0,dashUntil:0,dashAngle:0,combatUntil:0
        };
        this.monsters.push(m);
        this.addFeed(`${type.short} が出現した`);
    },
    updateMonsters(dt){
        for(let m of this.monsters){
            if(!m.alive) continue;
            let candidates=[this.player,...this.bots].filter(p=>p.alive && this.dist(m,p)<390 && this.lineClear(m,p));
            if(!candidates.length) continue;
            let target=this.nearest(m,candidates);
            let d=this.dist(m,target);
            m.angle=this.angleTo(m,target);
            if(m.type=='melee'){
                if(d<24 && this.now>=m.nextAttack){this.damage(target,m.damage,m);m.nextAttack=this.now+1150;}
                else if(d>19)this.moveEntity(m,Math.cos(m.angle),Math.sin(m.angle),m.speed,dt);
            }
            if(m.type=='ranged'){
                if(d>185)this.moveEntity(m,Math.cos(m.angle),Math.sin(m.angle),m.speed,dt);
                else if(d<125)this.moveEntity(m,-Math.cos(m.angle),-Math.sin(m.angle),m.speed*0.65,dt);
                if(d<320 && this.now>=m.nextAttack){
                    let a=m.angle+(Math.random()-0.5)*0.07;
                    this.projectiles.push({x:m.x+Math.cos(a)*15,y:m.y+Math.sin(a)*15,vx:Math.cos(a)*370,vy:Math.sin(a)*370,damage:m.damage,r:3,owner:m.id,ownerIsMonster:1,life:0.9,color:'#e8bd79'});
                    m.nextAttack=this.now+1450;
                }
            }
            if(m.type=='bomber'){
                if(d<43){
                    for(let p of [this.player,...this.bots]){
                        if(p.alive && this.dist(m,p)<75) this.damage(p,m.damage*(1-this.dist(m,p)/130),m);
                    }
                    m.hp=0;m.alive=0;
                    this.monsters=this.monsters.filter(a=>a.alive);
                    this.addFeed('バーストが爆発した');
                    this.dropFood(m.x,m.y,1);
                }else this.moveEntity(m,Math.cos(m.angle),Math.sin(m.angle),m.speed,dt);
            }
            if(m.type=='diver'){
                if(d>22){
                    let speed=m.speed;
                    if(d<205 && this.now>=m.dashUntil){m.dashUntil=this.now+2400;m.dashAngle=m.angle;}
                    if(this.now<m.dashUntil && d<235) speed=205;
                    this.moveEntity(m,Math.cos(m.angle),Math.sin(m.angle),speed,dt);
                }else if(this.now>=m.nextAttack){
                    this.damage(target,m.damage,m);
                    m.nextAttack=this.now+950;
                }
            }
        }
    },
    updateProjectiles(dt){
        for(let i=this.projectiles.length-1;i>=0;i--){
            let b=this.projectiles[i];
            b.x+=b.vx*dt;
            b.y+=b.vy*dt;
            b.life-=dt;
            if(b.life<=0 || this.isSolidPoint(b.x,b.y)){
                this.projectiles.splice(i,1);
                continue;
            }
            let candidates=b.ownerIsMonster ? [this.player,...this.bots].filter(p=>p.alive) : [...this.bots,this.player,...this.monsters].filter(p=>p.alive && p.id!=b.owner);
            let hit=null;
            for(let target of candidates){
                if(target.id==b.owner) continue;
                if(Math.hypot(target.x-b.x,target.y-b.y)<(target.r||12)+b.r){hit=target;break;}
            }
            if(hit){
                let attacker=[this.player,...this.bots,...this.monsters].find(p=>p.id==b.owner);
                this.damage(hit,b.damage,attacker);
                this.projectiles.splice(i,1);
            }
        }
    },
    spawnWeapon(id,x,y){
        this.pickups.push({id:`weapon_${Math.floor(Math.random()*1e9)}`,kind:'weapon',weapon:id,x,y,r:12});
    },
    dropFood(x,y,count){
        for(let i=0;i<count;i++){
            this.pickups.push({id:`food_${Math.floor(Math.random()*1e9)}`,kind:'food',x:x+(Math.random()-0.5)*15,y:y+(Math.random()-0.5)*15,r:10});
        }
    },
    updatePickups(){
        let participants=[this.player,...this.bots].filter(p=>p.alive);
        for(let i=this.pickups.length-1;i>=0;i--){
            let item=this.pickups[i];
            let picker=participants.find(p=>this.dist(p,item)<23 && (item.kind=='food' || (p.isPlayer ? (!p.weapon || p.weapon.id!=item.weapon) : (!p.weapon || this.weapons[item.weapon].score>p.weapon.score || (p.behavior=='アサシン' && this.weapons[item.weapon].type=='melee' && p.weapon.type!='melee'))))); 
            if(!picker) continue;
            if(item.kind=='food') picker.food+=1;
            if(item.kind=='weapon'){
                picker.weapon=this.weapons[item.weapon];
                picker.ammo=picker.weapon.mag;
                picker.reloading=0;
                picker.reloadUntil=0;
                picker.lastShot=0;
                if(picker.isPlayer) this.toast(`${picker.weapon.name} を拾いました`);
            }
            if(picker.isPlayer && item.kind=='food') this.toast('食べ物を拾いました');
            this.pickups.splice(i,1);
        }
    },
    applyZoneDamage(){
        for(let p of [this.player,...this.bots]){
            if(!p || !p.alive) continue;
            if(Math.hypot(p.x-this.zone.x,p.y-this.zone.y)>this.zone.radius){
                this.damage(p,p.maxHp*0.05,{id:'zone',name:'安全地帯',isMonster:1});
                if(p.isPlayer) this.toast('安全地帯の外です！');
            }
        }
    },
    aliveCount(){
        return [this.player,...this.bots].filter(p=>p && p.alive).length;
    },
    checkMatchEnd(){
        let alive=this.aliveCount();
        if(alive<=1 && !this.finished){
            this.finished=1;
            this.running=0;
            let winner=[this.player,...this.bots].find(p=>p && p.alive);
            let title=document.getElementById('resultTitle');
            let text=document.getElementById('resultText');
            if(winner && winner.isPlayer){
                title.textContent='LAST SURVIVOR';
                document.getElementById('resultKicker').textContent='VICTORY';
                text.textContent='最後のひとりになりました。';
            }else{
                title.textContent='ELIMINATED';
                document.getElementById('resultKicker').textContent='MATCH END';
                text.textContent=`勝者：${winner?winner.name:'なし'}`;
            }
            document.getElementById('resultStats').innerHTML=`<div><b>${this.kills}</b><small>PLAYER KILLS</small></div><div><b>${Math.floor((this.now-this.matchStart)/1000)}s</b><small>SURVIVAL TIME</small></div>`;
            document.getElementById('endScreen').classList.add('show');
        }
    },
    addFeed(text){
        this.feed.unshift({text,time:this.now||performance.now()});
        this.feed=this.feed.slice(0,4);
        let el=document.getElementById('arenaFeed');
        if(el) el.innerHTML=this.feed.map((f,i)=>`<div class="feed-line f${i}">${f.text}</div>`).join('');
    },
    toast(text){
        let el=document.getElementById('arenaToast');
        if(!el) return;
        el.textContent=text;
        el.classList.add('show');
        clearTimeout(this.toastTimer);
        this.toastTimer=setTimeout(()=>el.classList.remove('show'),1700);
    },
    updateHud(){
        if(!this.player) return;
        let p=this.player;
        document.getElementById('aliveCount').textContent=this.aliveCount();
        let seconds=Math.floor((this.now-this.matchStart)/1000);
        document.getElementById('matchTime').textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
        document.getElementById('zoneTime').textContent=Math.ceil(this.zone.radius/this.zone.initial*240)+'s';
        document.getElementById('hpText').textContent=`${Math.ceil(p.hp)} / ${p.maxHp}`;
        document.getElementById('hpFill').style.width=`${this.clamp(p.hp/p.maxHp*100,0,100)}%`;
        document.getElementById('foodCount').textContent=`×${p.food}`;
        let weaponArt=document.getElementById('weaponArt');
        let weaponButton=document.getElementById('weaponButton');
        if(p.weapon){
            document.getElementById('weaponSymbol').textContent=p.weapon.icon;
            document.getElementById('weaponTag').textContent=p.weapon.short;
            document.getElementById('ammoText').textContent=p.reloading?'自動リロード中':`${p.ammo} / ${p.weapon.mag}　残弾 ∞`;
            let img=this.loadedImage('weapons',p.weapon.id);
            if(img){weaponArt.src=img.src;weaponButton.classList.add('has-art');}
            else{weaponArt.removeAttribute('src');weaponButton.classList.remove('has-art');}
        }else{
            document.getElementById('weaponSymbol').textContent='拳';
            document.getElementById('weaponTag').textContent='FIST';
            document.getElementById('ammoText').textContent='超至近距離 / 威力 小';
            weaponArt.removeAttribute('src');weaponButton.classList.remove('has-art');
        }
        let foodImg=this.loadedImage('foods','food');
        let foodArt=document.getElementById('foodArt');
        if(foodImg){foodArt.src=foodImg.src;document.getElementById('foodButton').classList.add('has-art');}
        else{foodArt.removeAttribute('src');document.getElementById('foodButton').classList.remove('has-art');}
        document.getElementById('reloadCover').classList.toggle('show',!!p.reloading);
        document.getElementById('weaponButton').classList.toggle('empty',!p.weapon);
        document.getElementById('foodButton').classList.toggle('empty',p.food<=0);
        if(!this.foodHoldAt) document.getElementById('holdRing').style.setProperty('--progress','0%');
        if(!p.alive){
            document.getElementById('ammoText').textContent='観戦中 / WASD・スティックで移動';
            document.getElementById('weaponTag').textContent='SPECTATE';
        }
    },
    drawMenuBackdrop(){
        if(!this.ctx) return;
        let ctx=this.ctx;
        ctx.fillStyle='#0a1118';ctx.fillRect(0,0,this.width,this.height);
        for(let i=0;i<28;i++){
            let x=(i*73)%this.width;
            let y=(i*127)%this.height;
            ctx.fillStyle='rgba(136,172,190,0.055)';
            ctx.fillRect(x,y,32,32);
        }
    },
    render(){
        if(!this.map){this.drawMenuBackdrop();return;}
        let ctx=this.ctx;
        let w=this.width,h=this.height;
        ctx.clearRect(0,0,w,h);
        ctx.fillStyle='#060b10';ctx.fillRect(0,0,w,h);
        this.drawMap(0);
        this.drawZone();
        let observerMode=!this.player.alive;
        if(observerMode){
            this.drawMap(1);
            this.drawDoors();
            this.drawWarnings();
            this.drawPickupsOnMap();
            this.drawEntities();
            this.drawProjectiles();
            this.drawGhost();
        }else{
            let rays=this.visionPolygon(this.player,this.player.angle,1.22,350);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(this.toScreenX(this.player.x),this.toScreenY(this.player.y));
            for(let pt of rays) ctx.lineTo(this.toScreenX(pt.x),this.toScreenY(pt.y));
            ctx.closePath();
            ctx.clip();
            this.drawMap(1);
            this.drawDoors();
            this.drawWarnings();
            this.drawPickupsOnMap();
            this.drawEntities();
            this.drawProjectiles();
            let sx=this.toScreenX(this.player.x),sy=this.toScreenY(this.player.y);
            let grad=ctx.createRadialGradient(sx,sy,8,sx,sy,355);
            grad.addColorStop(0,'rgba(210,235,255,0.14)');
            grad.addColorStop(0.55,'rgba(190,223,245,0.055)');
            grad.addColorStop(1,'rgba(170,210,238,0)');
            ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
            ctx.restore();
        }
        this.drawZoneEdge();
        if(observerMode) this.drawObserverMarker();
        this.drawCrosshair();
    },
    toScreenX(x){return x-this.camera.x+this.width/2;},
    toScreenY(y){return y-this.camera.y+this.height/2;},
    drawMap(bright){
        let ctx=this.ctx;
        let tile=this.map.tile;
        let left=Math.max(0,Math.floor((this.camera.x-this.width/2)/tile)-1);
        let right=Math.min(this.map.cols-1,Math.ceil((this.camera.x+this.width/2)/tile)+1);
        let top=Math.max(0,Math.floor((this.camera.y-this.height/2)/tile)-1);
        let bottom=Math.min(this.map.rows-1,Math.ceil((this.camera.y+this.height/2)/tile)+1);
        for(let y=top;y<=bottom;y++){
            for(let x=left;x<=right;x++){
                let sx=this.toScreenX(x*tile);
                let sy=this.toScreenY(y*tile);
                if(this.map.grid[y][x]){
                    ctx.fillStyle=bright?'#2a3941':'#121a21';
                    ctx.fillRect(sx,sy,tile+0.5,tile+0.5);
                    ctx.strokeStyle=bright?'rgba(190,215,225,0.045)':'rgba(110,140,160,0.025)';
                    ctx.lineWidth=1;
                    ctx.strokeRect(sx+0.5,sy+0.5,tile-1,tile-1);
                    if(bright){
                        ctx.fillStyle='rgba(210,230,239,0.025)';
                        ctx.fillRect(sx+4,sy+4,3,3);
                    }
                }else{
                    let adj=this.tileAt(x+1,y)||this.tileAt(x-1,y)||this.tileAt(x,y+1)||this.tileAt(x,y-1);
                    if(!adj) continue;
                    ctx.fillStyle=bright?'#52636b':'#080e14';
                    ctx.fillRect(sx,sy,tile+0.5,tile+0.5);
                    ctx.strokeStyle=bright?'#6d7c82':'#202c34';
                    ctx.lineWidth=bright?1.5:1;
                    ctx.strokeRect(sx+0.5,sy+0.5,tile-1,tile-1);
                    ctx.fillStyle=bright?'rgba(220,236,242,0.1)':'rgba(160,190,205,0.035)';
                    ctx.fillRect(sx+2,sy+2,tile-4,2);
                }
            }
        }
    },
    drawZone(){
        if(!this.zone) return;
        let ctx=this.ctx;
        ctx.save();
        ctx.strokeStyle='rgba(116,205,228,0.14)';
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.arc(this.toScreenX(this.zone.x),this.toScreenY(this.zone.y),this.zone.radius,0,Math.PI*2);
        ctx.stroke();
        ctx.restore();
    },
    drawZoneEdge(){
        if(!this.zone) return;
        let ctx=this.ctx;
        ctx.save();
        ctx.strokeStyle='rgba(132,225,240,0.82)';
        ctx.lineWidth=2;
        ctx.setLineDash([9,7]);
        ctx.beginPath();
        ctx.arc(this.toScreenX(this.zone.x),this.toScreenY(this.zone.y),this.zone.radius,0,Math.PI*2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
    },
    visionPolygon(entity,angle,fov,range){
        let pts=[];
        let steps=52;
        for(let i=0;i<=steps;i++){
            let a=angle-fov/2+fov*i/steps;
            let end={x:entity.x+Math.cos(a)*range,y:entity.y+Math.sin(a)*range};
            let d=this.rayDistance(entity,a,range);
            pts.push({x:entity.x+Math.cos(a)*d,y:entity.y+Math.sin(a)*d});
        }
        return pts;
    },
    rayDistance(entity,angle,range){
        let step=5;
        for(let d=step;d<=range;d+=step){
            let x=entity.x+Math.cos(angle)*d;
            let y=entity.y+Math.sin(angle)*d;
            if(this.isSolidPoint(x,y)) return Math.max(0,d-step);
        }
        return range;
    },
    drawDoors(){
        let ctx=this.ctx;
        for(let door of this.doors){
            if(Math.abs(door.x-this.camera.x)>this.width/2+70 || Math.abs(door.y-this.camera.y)>this.height/2+70) continue;
            let sx=this.toScreenX(door.x),sy=this.toScreenY(door.y);
            let dx=Math.cos(door.angle)*door.length/2;
            let dy=Math.sin(door.angle)*door.length/2;
            ctx.save();
            ctx.lineWidth=5;
            ctx.lineCap='round';
            ctx.strokeStyle=door.open?'rgba(186,158,116,0.55)':'#c5a574';
            ctx.beginPath();
            if(door.open){
                ctx.moveTo(sx-dx*0.75,sy-dy*0.75);
                ctx.lineTo(sx-dx*0.75+Math.cos(door.angle+1.05)*door.length*0.75,sy-dy*0.75+Math.sin(door.angle+1.05)*door.length*0.75);
            }else{
                ctx.moveTo(sx-dx,sy-dy);ctx.lineTo(sx+dx,sy+dy);
            }
            ctx.stroke();
            ctx.fillStyle='#ead7ae';ctx.beginPath();ctx.arc(sx-dx,sy-dy,2.5,0,Math.PI*2);ctx.fill();
            ctx.restore();
        }
    },
    drawWarnings(){
        let ctx=this.ctx;
        for(let w of this.warnings){
            let t=(w.ends-this.now)/1650;
            let r=17+Math.sin(this.now/90)*4;
            let x=this.toScreenX(w.x),y=this.toScreenY(w.y);
            ctx.save();
            ctx.strokeStyle=`rgba(255,105,95,${0.45+0.45*(1-t)})`;
            ctx.lineWidth=2;
            ctx.setLineDash([4,4]);
            ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle='rgba(255,95,90,0.12)';ctx.beginPath();ctx.arc(x,y,7,0,Math.PI*2);ctx.fill();
            ctx.restore();
        }
    },
    drawPickupsOnMap(){
        let ctx=this.ctx;
        for(let item of this.pickups){
            let x=this.toScreenX(item.x),y=this.toScreenY(item.y);
            ctx.save();
            let sprite=item.kind=='food'?this.loadedImage('foods','food'):this.loadedImage('weapons',item.weapon);
            if(sprite){
                ctx.drawImage(sprite,x-13,y-13,26,26);
                if(item.kind=='weapon'){
                    ctx.fillStyle='#e8f2f5';ctx.font='bold 8px Arial';ctx.textAlign='center';ctx.fillText(this.weapons[item.weapon].short,x,y+19);
                }
                ctx.restore();
                continue;
            }
            if(item.kind=='food'){
                ctx.fillStyle='#ff8d9a';ctx.beginPath();ctx.arc(x,y,7,0,Math.PI*2);ctx.fill();
                ctx.fillStyle='#ffcfb5';ctx.beginPath();ctx.arc(x-2,y-2,2,0,Math.PI*2);ctx.fill();
                ctx.fillStyle='#b4d99a';ctx.fillRect(x+1,y-10,3,5);
            }else{
                ctx.translate(x,y);ctx.rotate(Math.PI/4);
                ctx.fillStyle='#c7d9e0';ctx.fillRect(-7,-7,14,14);
                ctx.fillStyle='#647d89';ctx.fillRect(-4,-4,8,8);
                ctx.restore();ctx.save();
                ctx.fillStyle='#e8f2f5';ctx.font='bold 8px Arial';ctx.textAlign='center';ctx.fillText(this.weapons[item.weapon].short,x,y+19);
            }
            ctx.restore();
        }
    },
    drawEntities(){
        let ctx=this.ctx;
        for(let m of this.monsters){if(m.alive)this.drawMonster(m);}
        for(let bot of this.bots){if(bot.alive)this.drawParticipant(bot);}
        if(this.player && this.player.alive) this.drawParticipant(this.player);
    },
    drawMonster(m){
        let ctx=this.ctx;
        let x=this.toScreenX(m.x),y=this.toScreenY(m.y);
        ctx.save();
        ctx.translate(x,y);ctx.rotate(m.angle);
        ctx.fillStyle=m.color;
        let sprite=this.loadedImage('monsters',m.imageId);
        if(sprite){
            ctx.drawImage(sprite,-17,-17,34,34);
        }else if(m.type=='diver'){
            ctx.beginPath();ctx.moveTo(17,0);ctx.lineTo(-8,-12);ctx.lineTo(-5,0);ctx.lineTo(-8,12);ctx.closePath();ctx.fill();
        }else if(m.type=='bomber'){
            ctx.beginPath();
            for(let i=0;i<8;i++){
                let a=i*Math.PI/4;let r=i%2?9:15;
                if(!i)ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r);else ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);
            }
            ctx.closePath();ctx.fill();
        }else if(m.type=='ranged'){
            ctx.beginPath();ctx.moveTo(14,0);ctx.lineTo(-10,-10);ctx.lineTo(-7,0);ctx.lineTo(-10,10);ctx.closePath();ctx.fill();
        }else{
            ctx.beginPath();ctx.arc(0,0,13,0,Math.PI*2);ctx.fill();
            ctx.fillStyle='#f3c1bd';ctx.fillRect(4,-3,8,6);
        }
        ctx.restore();
        ctx.fillStyle='rgba(0,0,0,0.6)';ctx.fillRect(x-12,y-20,24,3);
        ctx.fillStyle='#e78c88';ctx.fillRect(x-12,y-20,24*this.clamp(m.hp/m.maxHp,0,1),3);
        ctx.fillStyle='#f0c7c2';ctx.font='9px Arial';ctx.textAlign='center';ctx.fillText(m.short,x,y+24);
    },
    drawParticipant(p){
        let ctx=this.ctx;
        let x=this.toScreenX(p.x),y=this.toScreenY(p.y);
        ctx.save();
        ctx.translate(x,y);ctx.rotate(p.angle);
        ctx.fillStyle=p.color || '#a8b6c0';
        ctx.beginPath();ctx.arc(0,0,p.r,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle='rgba(5,12,17,0.9)';ctx.lineWidth=2;ctx.stroke();
        ctx.fillStyle='#15232b';
        ctx.beginPath();ctx.moveTo(p.r+6,0);ctx.lineTo(p.r-1,-4);ctx.lineTo(p.r-1,4);ctx.closePath();ctx.fill();
        ctx.restore();
        if(p.weapon){
            ctx.strokeStyle='rgba(225,240,245,0.7)';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,p.r+3,0,Math.PI*2);ctx.stroke();
        }
        ctx.fillStyle='rgba(0,0,0,0.7)';ctx.fillRect(x-13,y-18,26,3);
        ctx.fillStyle=p.hp<35?'#ec827a':'#c5e5cb';ctx.fillRect(x-13,y-18,26*this.clamp(p.hp/p.maxHp,0,1),3);
        ctx.fillStyle=p.isPlayer?'#d8efff':'#dde4e8';
        ctx.font='bold 9px Arial';ctx.textAlign='center';ctx.fillText(p.name,x,y+23);
    },
    drawPlayer(){
        if(!this.player) return;
        this.drawParticipant(this.player);
        let ctx=this.ctx;
        let x=this.toScreenX(this.player.x),y=this.toScreenY(this.player.y);
        ctx.save();ctx.strokeStyle='rgba(207,233,255,0.22)';ctx.lineWidth=1;
        ctx.beginPath();ctx.arc(x,y,20,0,Math.PI*2);ctx.stroke();ctx.restore();
    },
    drawGhost(){
        if(!this.player || this.player.alive) return;
        let x=this.toScreenX(this.player.x),y=this.toScreenY(this.player.y);
        let ctx=this.ctx;
        ctx.save();ctx.globalAlpha=0.35;ctx.fillStyle='#cfe9ff';ctx.beginPath();ctx.arc(x,y,10,0,Math.PI*2);ctx.fill();ctx.restore();
    },
    drawObserverMarker(){
        let x=this.width/2,y=this.height/2;
        let ctx=this.ctx;
        ctx.save();ctx.strokeStyle='rgba(207,233,255,0.5)';ctx.setLineDash([3,4]);ctx.beginPath();ctx.arc(x,y,15,0,Math.PI*2);ctx.stroke();ctx.restore();
    },
    drawProjectiles(){
        let ctx=this.ctx;
        for(let b of this.projectiles){
            let x=this.toScreenX(b.x),y=this.toScreenY(b.y);
            ctx.strokeStyle=b.color;ctx.lineWidth=2;
            ctx.beginPath();ctx.moveTo(x-b.vx*0.022,y-b.vy*0.022);ctx.lineTo(x,y);ctx.stroke();
            ctx.fillStyle=b.color;ctx.beginPath();ctx.arc(x,y,b.r,0,Math.PI*2);ctx.fill();
        }
    },
    drawCrosshair(){
        if(!this.player || !this.player.alive) return;
        let ctx=this.ctx;
        let x=this.toScreenX(this.player.x+Math.cos(this.player.angle)*115);
        let y=this.toScreenY(this.player.y+Math.sin(this.player.angle)*115);
        ctx.save();ctx.strokeStyle='rgba(215,238,250,0.48)';ctx.lineWidth=1;
        ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.moveTo(x-9,y);ctx.lineTo(x-4,y);ctx.moveTo(x+4,y);ctx.lineTo(x+9,y);ctx.moveTo(x,y-9);ctx.lineTo(x,y-4);ctx.moveTo(x,y+4);ctx.lineTo(x,y+9);ctx.stroke();ctx.restore();
    }
};

document.addEventListener('DOMContentLoaded', () => Arena.mount());
