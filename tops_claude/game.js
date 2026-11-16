// 真上見下ろしPvPvE。data.js→komagome.js→game.js→nakami.js の順で読み込む
(()=>{
const T=40,N=40,W=T*N,CW=393,now=()=>performance.now(),DIR=[[1,0],[-1,0],[0,1],[0,-1]];
const WPS=[
{id:'fist',n:'拳',melee:1,d:4,cd:350,rg:26,mag:0,rl:0},
{id:'knife',n:'ナイフ',melee:1,d:14,cd:300,rg:36,mag:0,rl:0},
{id:'hammer',n:'デカハンマー',melee:1,d:42,cd:950,rg:48,mag:0,rl:0},
{id:'smg',n:'SMG',d:7,cd:75,rg:300,mag:30,rl:1500,sp:.12},
{id:'scar',n:'SCAR',d:15,cd:130,rg:430,mag:20,rl:2000,sp:.05},
{id:'dual',n:'二丁拳銃',d:9,cd:170,rg:280,mag:24,rl:1700,sp:.1,pel:2},
{id:'sg',n:'SG',d:8,cd:850,rg:170,mag:2,rl:1800,sp:.3,pel:7},
{id:'snip',n:'スナイパー',d:70,cd:100,rg:560,mag:1,rl:2300,sp:.01}];
WPS.forEach(w=>{w.pel=w.pel||1;w.sc=w.d*w.pel/((w.cd+(w.mag?w.rl/w.mag:0))/1000)});
const MD=[
{id:'slime',n:'スライム',hp:30,sp:70,r:11,c:'#7fdc7f',k:'melee',d:8,rg:22,sh:0},
{id:'gunner',n:'ガンナー',hp:28,sp:55,r:11,c:'#e07fe0',k:'range',d:7,rg:240,bs:300,sh:1},
{id:'wisp',n:'ウィスプ',hp:16,sp:90,r:9,c:'#7fe0e0',k:'range',d:5,rg:200,bs:450,sh:2},
{id:'bomber',n:'ボンバ',hp:22,sp:95,r:11,c:'#ff8040',k:'bomb',d:45,rg:28,sh:3},
{id:'diver',n:'ダイバー',hp:24,sp:60,r:10,c:'#ff4060',k:'dive',d:16,rg:24,sh:3},
{id:'golem',n:'ゴーレム',hp:130,sp:38,r:16,c:'#a0a0a0',k:'melee',d:20,rg:30,sh:1}];
const NORMS={'エゴイスト':'#ff6b6b','百姓':'#c9a063','姑息':'#b58cff','アサシン':'#8fa3b5','レッカー車':'#ffd23f','一般人A':'#9be28b'};
const NEED={'百姓':7,'一般人A':3};
const G={run:0,spec:0,end:0,joy:null,mouse:0,mx:0,my:0,ox:0,oy:0,cam:{x:0,y:0}};
let M,O,rooms,floors,fEdge,fCen,ps,ms,items,bl,fx,Z,me,cv,cx,UI,last,nextW,nextM,FC,FCt,DT=0,hold={w:0,f:0},H=700;
const D=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),ang=(a,b)=>Math.atan2(b.y-a.y,b.x-a.x);
const adiff=(a,b)=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b)));
const turn=(a,b,s)=>a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*Math.min(1,s);
const tt=v=>Math.max(0,Math.min(N-1,Math.floor(v/T)));
const mi=(x,y)=>{let tx=Math.floor(x/T),ty=Math.floor(y/T);return(tx<0||ty<0||tx>=N||ty>=N)?-1:ty*N+tx};
const wall=(x,y)=>{let i=mi(x,y);return i<0||M[i]==1};
const solid=(x,y)=>{let i=mi(x,y);return i<0||M[i]==1||(M[i]==2&&!O[i])};
const blk=(x,y,r)=>wall(x-r,y-r)||wall(x+r,y-r)||wall(x-r,y+r)||wall(x+r,y+r);
const los=(x1,y1,x2,y2)=>{let n=Math.ceil(Math.hypot(x2-x1,y2-y1)/8);for(let i=1;i<n;i++){let t=i/n;if(solid(x1+(x2-x1)*t,y1+(y2-y1)*t))return 0}return 1};
const sees=(a,x,y)=>{let d=Math.hypot(x-a.x,y-a.y);if(d>300)return 0;if(d>55&&adiff(a.face,Math.atan2(y-a.y,x-a.x))>.62)return 0;return los(a.x,a.y,x,y)};
const mv=(o,dx,dy)=>{if(!blk(o.x+dx,o.y,o.r))o.x+=dx;if(!blk(o.x,o.y+dy,o.r))o.y+=dy};
const tc=v=>v*T+T/2;
const im=(f,n)=>{let i=images[f]&&images[f][n];return i&&i.complete&&i.naturalWidth&&!i.src.includes('error.png')?i:null};

// ---------- マップ生成 ----------
function gen(){
 M=new Uint8Array(N*N).fill(1);O=new Uint8Array(N*N);rooms=[];
 for(let gy=0;gy<4;gy++)for(let gx=0;gx<4;gx++){
  let w=random(4,7),h=random(4,7),x=gx*10+random(1,9-w),y=gy*10+random(1,9-h);
  for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)M[j*N+i]=0;
  rooms.push({gx,gy,x,y,w,h,cx:Math.floor(x+w/2),cy:Math.floor(y+h/2)});
 }
 let carve=(a,b)=>{let x=a.cx,y=a.cy,sx=Math.sign(b.cx-x),sy=Math.sign(b.cy-y);
  while(x!=b.cx){if(M[y*N+x]==1)M[y*N+x]=3;x+=sx}
  while(y!=b.cy){if(M[y*N+x]==1)M[y*N+x]=3;y+=sy}};
 for(let gy=0;gy<4;gy++)for(let gx=0;gx<4;gx++){let a=rooms[gy*4+gx];
  if(gx<3)carve(a,rooms[gy*4+gx+1]);
  if(gy<3&&(gx==0||hit(55)))carve(a,rooms[gy*4+gx+4]);}
 let ds=[];
 for(let y=1;y<N-1;y++)for(let x=1;x<N-1;x++){let i=y*N+x;if(M[i]!=3)continue;
  let l=M[i-1],r=M[i+1],u=M[i-N],d=M[i+N];
  if(u==1&&d==1&&(l==0||r==0))ds.push(i);else if(l==1&&r==1&&(u==0||d==0))ds.push(i);}
 ds.forEach(i=>M[i]=2);
 floors=[];for(let i=0;i<N*N;i++)if(M[i]==0||M[i]==3)floors.push({x:i%N,y:(i/N)|0});
 fEdge=floors.filter(f=>f.x<5||f.y<5||f.x>34||f.y>34);fCen=floors.filter(f=>f.x>12&&f.x<27&&f.y>12&&f.y<27);
}
const rf=()=>{let f=arraySelect(floors);return{x:tc(f.x),y:tc(f.y)}};
const nearFloor=(p)=>{let b=null,bd=1e9;for(let f of floors){let d=Math.hypot(tc(f.x)-p.x,tc(f.y)-p.y);if(d<bd){bd=d;b=f}}return{x:tc(b.x),y:tc(b.y)}};

// ---------- 参加者 ----------
function mkP(x,y,pl,norm){return{x,y,r:10,hp:100,mh:100,face:Math.random()*6.28,w:WPS[0],mag:0,rt:0,lf:0,ls:now(),food:0,alive:1,pl,norm,col:pl?'#cfe9ff':NORMS[norm],
 eat:0,hl:0,cmb:-9e9,vm:-9e9,hurtT:-9e9,kn:new Set(),fo:null,ft:0,lp:null,mode:'explore',nt:now()+random(0,300),fg:null,fgt:0,eg:null,et:0,sp:null,at:0,zg:null,gl:0}}
function spawnParts(){
 ps=[];let pos=[];
 for(let k=0;k<10;k++){let p,tr=0;do{p=rf();tr++}while(tr<300&&pos.some(q=>Math.hypot(q.x-p.x,q.y-p.y)<350));pos.push(p)}
 me=mkP(pos[0].x,pos[0].y,1,'');ps.push(me);
 for(let k=1;k<10;k++)ps.push(mkP(pos[k].x,pos[k].y,0,arraySelect(Object.keys(NORMS))));
}
function hurt(v,d,by){
 if(!v.alive)return;let t=now();v.hp-=d;v.hurtT=t;
 if(v.norm!==undefined){v.cmb=t;if(by&&by.df)v.vm=t}
 if(by&&by.norm!==undefined){by.cmb=t;if(v.df)by.vm=t}
 if(v.hp<=0)kill(v,by);
}
function kill(v,by){
 v.alive=0;
 if(v.norm!==undefined){
  if(v.w.id!='fist')items.push({k:'w',w:v.w,x:v.x,y:v.y});
  if(v.food)items.push({k:'f',n:v.food,x:v.x,y:v.y});
  if(v.pl){G.spec=1;G.cam={x:v.x,y:v.y}}
  console.log(`[kill] ${v.pl?'あなた':v.norm}が脱落`);
  if(ps.filter(p=>p.alive).length<=1)finish();
 }else if(!v.nodrop)items.push({k:'f',n:1,x:v.x,y:v.y});
}
// ---------- 戦闘 ----------
function fire(o){
 let t=now(),w=o.w;if(o.rt||t-o.lf<w.cd)return;o.lf=t;o.ls=t;
 if(w.melee){for(let v of ps.concat(ms)){if(v==o||!v.alive)continue;if(D(o,v)<w.rg+v.r&&adiff(o.face,ang(o,v))<.9)hurt(v,w.d,o)}
  fx.push({k:'sw',x:o.x,y:o.y,a:o.face,r:w.rg,t:t+120});return}
 for(let i=0;i<w.pel;i++){let a=o.face+(Math.random()-.5)*w.sp*2,off=w.id=='dual'?(i?6:-6):0,c=Math.cos(o.face),s=Math.sin(o.face);
  bl.push({x:o.x+c*12-s*off,y:o.y+s*12+c*off,vx:Math.cos(a)*650,vy:Math.sin(a)*650,d:w.d,rem:w.rg,o,m:0})}
 if(--o.mag<=0)o.rt=t+w.rl;
}
function common(o,dt,t){
 if(o.eat){o.hl+=dt;if(o.hl>=3){o.hp=Math.min(o.mh,o.hp+o.mh*.3);o.food--;o.hl=0;if(o.food<=0)o.eat=0}}else o.hl=0;
 if(o.rt&&t>=o.rt){o.rt=0;o.mag=o.w.mag}
 if(o.w.mag&&!o.rt&&t-o.ls>5000&&o.mag<o.w.mag)o.rt=t+o.w.rl;
 for(let i=items.length-1;i>=0;i--){let it=items[i];if(Math.hypot(it.x-o.x,it.y-o.y)>20)continue;
  if(it.k=='f'){o.food+=it.n;items.splice(i,1)}
  else if(o.w.id=='fist'||scr(o,it.w)>scr(o,o.w)*1.2){o.w=it.w;o.mag=it.w.mag;o.rt=0;o.ls=t;items.splice(i,1)}}
 if(!o.pl&&o.hp>0&&D(o,Z)>Z.r){}
}
const scr=(o,w)=>w.sc*(o.norm=='アサシン'&&w.melee?2.5:1)*(w.id=='fist'?.1:1);
// ---------- エネミーAI ----------
function bfs(gx,gy){let f=new Int16Array(N*N).fill(-1),q=[gy*N+gx];f[q[0]]=0;
 for(let h=0;h<q.length;h++){let i=q[h],x=i%N,y=(i/N)|0,v=f[i];for(let[dx,dy]of DIR){let nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=N||ny>=N)continue;let j=ny*N+nx;if(f[j]<0&&M[j]!=1){f[j]=v+1;q.push(j)}}}return f}
function go(e,tx,ty,sp,nf){
 let gx=tt(tx),gy=tt(ty),k=gy*N+gx,f=FC.get(k);if(!f){f=bfs(gx,gy);FC.set(k,f)}
 let cxt=tt(e.x),cyt=tt(e.y),d=f[cyt*N+cxt],px=tx,py=ty;
 if(d>0){let b=d;for(let[dx,dy]of DIR){let nx=cxt+dx,ny=cyt+dy;if(nx<0||ny<0||nx>=N||ny>=N)continue;let v=f[ny*N+nx];if(v>=0&&v<b){b=v;px=tc(nx);py=tc(ny)}}}
 else if(d<0){px=e.x+Math.cos(e.face)*40;py=e.y+Math.sin(e.face)*40;if(blk(px,py,e.r))e.face+=1.3}
 let a=Math.atan2(py-e.y,px-e.x);
 if(Math.hypot(px-e.x,py-e.y)>3)mv(e,Math.cos(a)*sp*DT,Math.sin(a)*sp*DT);
 if(!nf)e.face=turn(e.face,a,DT*8);
}
function think(e,t){
 let fin=ps.filter(p=>p.alive).length<=2;
 let seen=a=>{let b=null,bd=1e9;for(let o of a){if(!o.alive||o==e)continue;let d=D(e,o);if(d<bd&&sees(e,o.x,o.y)){b=o;bd=d}}return b};
 let P=seen(ps),Mo=seen(ms);
 for(let it of items)if(!e.kn.has(it)&&sees(e,it.x,it.y))e.kn.add(it);
 for(let it of e.kn)if(!items.includes(it))e.kn.delete(it);
 if(Mo)e.mlp={x:Mo.x,y:Mo.y};
 let S=P||Mo;
 if(S){e.fo=S;e.ft=t;e.lp={x:S.x,y:S.y}}else if(e.fo&&(t-e.ft>10000||!e.fo.alive))e.fo=null;
 let wp=e.w.id!='fist',cmb=t-e.cmb<4000,mode='explore',fo=null,n=e.norm,pw=P&&P.w.id!='fist';
 if(n=='エゴイスト'){fo=P||Mo;if(fo)mode='fight'}
 else if(n=='百姓'){fo=P;if(P)mode=(e.food>=7&&wp)?'fight':'flee';else if(Mo){mode='fight';fo=Mo}}
 else if(n=='姑息'){if(P){fo=P;mode=(wp&&(P.hp<P.mh*.5||t-P.vm<3000))?'fight':'flee'}}
 else if(n=='アサシン'){fo=P||Mo;let hu=t-e.hurtT<3000||e.hp<e.mh*.4;
  if(hu&&fo)mode='flee';else if(fo&&wp&&D(e,fo)<48)mode='fight';else if(wp)mode='ambush'}
 else if(n=='レッカー車'){if(Mo){mode='fight';fo=Mo}else if(P){mode='flee';fo=P}}
 else{if(P){fo=P;mode=(e.hp>=e.mh*.5&&(!pw||e.hp>P.hp))?'fight':'flee'}else if(Mo&&e.hp>=e.mh*.5){mode='fight';fo=Mo}}
 if(fin&&P){mode='fight';fo=P}
 if(mode=='explore'&&!S&&e.fo&&(e.mode=='fight'||e.mode=='chase'))mode='chase';
 if(e.food>0&&(e.hp<e.mh*.15||(!cmb&&!S&&e.hp<e.mh*.9)))mode='heal';
 if(D(e,Z)>Z.r-35&&!(mode=='heal'&&e.hp<e.mh*.15)){mode='zone';if(!e.zg||t-e.zt>1000){e.zg=nearFloor(Z);e.zt=t}}
 e.mode=mode;e.fo2=fo;
}
function act(e,dt,t){
 let m=e.mode,fo=e.fo2,sp=110,n=e.norm;e.eat=0;
 if(m=='heal'){e.eat=1;return}
 if(m=='zone')return go(e,e.zg.x,e.zg.y,sp+10);
 if(m=='fight'&&fo&&fo.alive){let d=D(e,fo),w=e.w,a=ang(e,fo);e.face=turn(e.face,a,dt*10);
  if(w.melee){if(d>w.rg+fo.r-6)go(e,fo.x,fo.y,sp,1);else if(adiff(e.face,a)<.5)fire(e)}
  else{if(d>w.rg*.75)go(e,fo.x,fo.y,sp,1);else if(d<w.rg*.3)mv(e,-Math.cos(a)*sp*dt*.6,-Math.sin(a)*sp*dt*.6);
   if(d<w.rg*1.05&&adiff(e.face,a)<.2&&los(e.x,e.y,fo.x,fo.y))fire(e)}
  return}
 if(m=='chase'&&e.lp)return D(e,e.lp)<20?(e.fo=null):go(e,e.lp.x,e.lp.y,sp);
 if(m=='flee'&&fo){
  if(!e.fg||t-e.fgt>2500||D(e,e.fg)<30){let b=null,bs=-1e9;
   if(n=='レッカー車'&&e.mlp)b={x:e.mlp.x,y:e.mlp.y};
   else for(let k=0;k<5;k++){let r=arraySelect(rooms),p={x:tc(r.cx),y:tc(r.cy)},s=D(p,fo)-D(p,e)*.3;if(s>bs){bs=s;b=p}}
   e.fg=b;e.fgt=t}
  let g=(t%2200)<300&&n=='百姓';
  go(e,e.fg.x,e.fg.y,sp+5,g);if(g)e.face=turn(e.face,ang(e,fo),dt*12);
  if(n=='アサシン'&&e.w.id!='fist'&&sees(e,fo.x,fo.y)){e.face=turn(e.face,ang(e,fo),dt*10);if(adiff(e.face,ang(e,fo))<.2||D(e,fo)<e.w.rg)fire(e)}
  return}
 if(m=='ambush'){
  if(!e.sp||t-e.at>30000){let r=arraySelect(rooms);e.sp={x:tc(r.x+(hit(50)?r.w-1:0)),y:tc(r.y+(hit(50)?r.h-1:0)),r};e.at=t}
  if(D(e,e.sp)>14)go(e,e.sp.x,e.sp.y,sp);else e.face=turn(e.face,ang(e,{x:tc(e.sp.r.cx),y:tc(e.sp.r.cy)}),dt*4);
  return}
 // explore / loot
 let need=NEED[n]||4,best=null,bd=1e9;
 for(let it of e.kn){let ok=it.k=='w'?(e.w.id=='fist'||scr(e,it.w)>scr(e,e.w)*1.2):e.food<need;if(!ok)continue;let d=D(e,it);if(d<bd){bd=d;best=it}}
 if(best)go(e,best.x,best.y,sp);
 else{if(!e.eg||D(e,e.eg)<30||t>e.et){let r=arraySelect(rooms);e.eg={x:tc(r.cx),y:tc(r.cy)};e.et=t+15000}go(e,e.eg.x,e.eg.y,sp)}
 if(n=='一般人A')e.face+=Math.sin(t/350)*.04;
}
// ---------- モンスター ----------
function mkM(x,y,df){return{x,y,r:df.r,hp:df.hp,mh:df.hp,alive:1,df,face:0,wt:0,wa:0,at:0,dt:0,dash:0,fz:0}}
function mUpd(m,dt,t){
 let tg=null,bd=1e9,df=m.df,sp=df.sp;
 for(let p of ps){if(!p.alive)continue;let d=D(m,p);if(d<bd&&d<300&&los(m.x,m.y,p.x,p.y)){tg=p;bd=d}}
 if(!tg){m.wt-=dt;if(m.wt<=0){m.wa=Math.random()*6.28;m.wt=random(1,3)}mv(m,Math.cos(m.wa)*sp*.5*dt,Math.sin(m.wa)*sp*.5*dt);return}
 let a=ang(m,tg);m.face=a;
 if(m.dash>0){m.dash-=dt;sp=380}
 else if(df.k=='dive'&&bd<220&&t>m.dt){m.dash=.35;m.dt=t+2500}
 else if(df.k=='range'){if(bd<df.rg*.5)sp=-sp*.8;else if(bd<df.rg*.85)sp=0;
  if(t>m.at&&bd<df.rg){m.at=t+1300;bl.push({x:m.x,y:m.y,vx:Math.cos(a)*df.bs,vy:Math.sin(a)*df.bs,d:df.d,rem:df.rg*1.2,o:m,m:1})}}
 if(df.k=='bomb'&&bd<df.rg+10&&!m.fz)m.fz=t+600;
 if(m.fz&&t>m.fz){m.alive=0;m.nodrop=1;fx.push({k:'bm',x:m.x,y:m.y,t:t+300});
  for(let p of ps)if(p.alive&&D(m,p)<65)hurt(p,df.d,m);return}
 if(sp)mv(m,Math.cos(a)*sp*dt,Math.sin(a)*sp*dt);
 if((df.k=='melee'||df.k=='dive')&&bd<df.rg+tg.r&&t>m.at){m.at=t+800;hurt(tg,df.d,m)}
}
function spawnPos(){
 for(let k=0;k<40;k++){let f=arraySelect(hit(50)?fEdge:fCen),p={x:tc(f.x),y:tc(f.y)};
  if(!ps.some(q=>q.alive&&D(q,p)<320))return p}return null}
// ---------- 更新 ----------
function update(dt,t){
 DT=dt;
 if(t-FCt>1500){FC.clear();FCt=t}
 for(let i=0;i<N*N;i++)if(M[i]==2)O[i]=0;
 for(let o of ps.concat(ms)){if(!o.alive)continue;let i=mi(o.x,o.y);for(let[dx,dy]of[[0,0],...DIR.map(d=>[d[0]*T,d[1]*T])]){let j=mi(o.x+dx*.9,o.y+dy*.9);if(j>=0&&M[j]==2)O[j]=1}}
 // ゾーン
 if(t>Z.nx){let nr=Math.max(50,Z.r*.65),a=Math.random()*6.28,dd=Math.random()*(Z.r-nr)*.9;
  Z.sx=Z.x;Z.sy=Z.y;Z.sr=Z.r;Z.tx=Z.x+Math.cos(a)*dd;Z.ty=Z.y+Math.sin(a)*dd;Z.tr=nr;Z.t0=t;Z.t1=t+15000;Z.nx=t+40000}
 if(Z.t1&&t<Z.t1){let k=(t-Z.t0)/15000;Z.x=Z.sx+(Z.tx-Z.sx)*k;Z.y=Z.sy+(Z.ty-Z.sy)*k;Z.r=Z.sr+(Z.tr-Z.sr)*k}
 // 武器ドロップ・モンスター予兆
 if(t>nextW){if(items.filter(i=>i.k=='w').length<18){let p=rf();items.push({k:'w',w:arraySelect(WPS.slice(1)),x:p.x,y:p.y})}nextW=t+random(3000,7000)}
 if(t>nextM){if(ms.filter(m=>m.alive).length<12){let p=spawnPos();if(p)fx.push({k:'tele',x:p.x,y:p.y,t:t+1300,df:arraySelect(MD)})}nextM=t+random(3500,8000)}
 for(let i=fx.length-1;i>=0;i--){let f=fx[i];if(t>f.t){if(f.k=='tele')ms.push(mkM(f.x,f.y,f.df));fx.splice(i,1)}}
 // プレイヤー
 let K=OBS.keys;
 if(me.alive){
  let vx=(K.d||K.arrowright?1:0)-(K.a||K.arrowleft?1:0),vy=(K.s||K.arrowdown?1:0)-(K.w||K.arrowup?1:0);
  if(G.joy){let dx=G.joy.x-G.joy.x0,dy=G.joy.y-G.joy.y0,l=Math.hypot(dx,dy);if(l>8){vx=dx/Math.max(l,50);vy=dy/Math.max(l,50)}}
  let l=Math.hypot(vx,vy);if(l>1){vx/=l;vy/=l}
  me.eat=(hold.f||K.h)&&me.food>0?1:0;
  if(!me.eat&&l>0){mv(me,vx*120*dt,vy*120*dt);if(!G.mouse)me.face=turn(me.face,Math.atan2(vy,vx),dt*12)}
  if(G.mouse)me.face=Math.atan2(G.my+G.oy-me.y,G.mx+G.ox-me.x);
  if((hold.w||K.space)&&!me.eat){let b=null,bd=1e9;
   for(let o of ps.concat(ms)){if(!o.alive||o==me)continue;let d=D(me,o);if(d<bd&&adiff(me.face,ang(me,o))<.3&&sees(me,o.x,o.y)){b=o;bd=d}}
   if(b)me.face=ang(me,b);fire(me)}
 }else{
  let vx=(K.d||K.arrowright?1:0)-(K.a||K.arrowleft?1:0),vy=(K.s||K.arrowdown?1:0)-(K.w||K.arrowup?1:0);
  if(G.joy){vx=(G.joy.x-G.joy.x0)/50;vy=(G.joy.y-G.joy.y0)/50}
  let l=Math.hypot(vx,vy);if(l>1){vx/=l;vy/=l}G.cam.x+=vx*260*dt;G.cam.y+=vy*260*dt;
 }
 for(let p of ps){if(!p.alive)continue;
  if(!p.pl){if(t>p.nt){p.nt=t+250;think(p,t)}act(p,dt,t)}
  common(p,dt,t);
  if(D(p,Z)>Z.r){p.hp-=p.mh*.05*dt;if(p.hp<=0)kill(p,null)}}
 for(let m of ms)if(m.alive)mUpd(m,dt,t);
 ms=ms.filter(m=>m.alive);
 let all=ps.concat(ms);
 for(let i=bl.length-1;i>=0;i--){let b=bl[i];b.x+=b.vx*dt;b.y+=b.vy*dt;b.rem-=Math.hypot(b.vx,b.vy)*dt;
  let dead=b.rem<=0||solid(b.x,b.y);
  if(!dead)for(let v of(b.m?ps:all)){if(!v.alive||v==b.o)continue;if(Math.hypot(v.x-b.x,v.y-b.y)<v.r+2){hurt(v,b.d,b.o);dead=1;break}}
  if(dead)bl.splice(i,1)}
}
// ---------- 描画 ----------
function tiles(ox,oy,lit){
 for(let ty=tt(oy);ty<=tt(oy+H);ty++)for(let tx=tt(ox);tx<=tt(ox+CW);tx++){let m=M[ty*N+tx],i=ty*N+tx;
  cx.fillStyle=m==1?(lit?'#9fb7d9':'#262f42'):m==2?(lit?'#ffb347':'#4a3b22'):(lit?(m==3?'#2d3d56':'#26344d'):'#0b0f17');
  if(m==2&&O[i]){cx.fillStyle=lit?'#26344d':'#0b0f17';cx.fillRect(tx*T,ty*T,T,T);cx.strokeStyle=lit?'#ffb347':'#4a3b22';cx.strokeRect(tx*T+3,ty*T+3,T-6,T-6);continue}
  cx.fillRect(tx*T,ty*T,T,T);
  if(m!=1){cx.strokeStyle=lit?'#ffffff10':'#ffffff05';cx.strokeRect(tx*T,ty*T,T,T)}}
}
function circ(o,fill){cx.fillStyle=fill;cx.beginPath();cx.arc(o.x,o.y,o.r,0,6.2832);cx.fill();
 cx.strokeStyle='#fff';cx.lineWidth=2;cx.beginPath();cx.moveTo(o.x,o.y);cx.lineTo(o.x+Math.cos(o.face)*(o.r+8),o.y+Math.sin(o.face)*(o.r+8));cx.stroke()}
function bar(o){cx.fillStyle='#000a';cx.fillRect(o.x-12,o.y-o.r-9,24,4);cx.fillStyle='#6fdc8c';cx.fillRect(o.x-12,o.y-o.r-9,24*Math.max(0,o.hp/o.mh),4)}
function draw(){
 let c0=G.spec?G.cam:me,ox=c0.x-CW/2,oy=c0.y-H*.45,t=now();G.ox=ox;G.oy=oy;
 cx.setTransform(1,0,0,1,0,0);cx.fillStyle='#000';cx.fillRect(0,0,CW,H);cx.translate(-ox,-oy);
 tiles(ox,oy,0);cx.save();
 if(!G.spec){cx.beginPath();
  for(let i=0;i<180;i++){let a=i/180*6.2832,R=adiff(a,me.face)<.61?300:55,px=me.x,py=me.y;
   for(let r=8;r<=R;r+=8){px=me.x+Math.cos(a)*r;py=me.y+Math.sin(a)*r;if(solid(px,py))break}
   i?cx.lineTo(px,py):cx.moveTo(px,py)}
  cx.closePath();cx.clip()}
 tiles(ox,oy,1);
 for(let it of items){if(it.k=='f'){cx.fillStyle='#ffb347';cx.beginPath();cx.arc(it.x,it.y,6,0,6.2832);cx.fill();cx.fillStyle='#fff';cx.font='9px sans-serif';cx.textAlign='center';cx.fillText('食',it.x,it.y+3)}
  else{let g=im('weapons',it.w.id);if(g)cx.drawImage(g,it.x-11,it.y-11,22,22);else{cx.fillStyle='#ffe066';cx.beginPath();cx.moveTo(it.x,it.y-8);cx.lineTo(it.x+8,it.y);cx.lineTo(it.x,it.y+8);cx.lineTo(it.x-8,it.y);cx.fill()}
   cx.fillStyle='#fff';cx.font='8px sans-serif';cx.textAlign='center';cx.fillText(it.w.n,it.x,it.y+18)}}
 for(let f of fx){if(f.k=='tele'){cx.strokeStyle='#ff3355';cx.lineWidth=2;cx.beginPath();cx.arc(f.x,f.y,10+((f.t-t)/1300)*16,0,6.2832);cx.stroke();cx.fillStyle='#ff3355';cx.font='bold 14px sans-serif';cx.textAlign='center';cx.fillText('!',f.x,f.y+5)}
  else if(f.k=='sw'){cx.strokeStyle='#fff';cx.lineWidth=3;cx.beginPath();cx.arc(f.x,f.y,f.r,f.a-.8,f.a+.8);cx.stroke()}
  else if(f.k=='bm'){cx.fillStyle='#ff804088';cx.beginPath();cx.arc(f.x,f.y,65,0,6.2832);cx.fill()}}
 for(let m of ms){let g=im('monsters',m.df.id);cx.save();cx.translate(m.x,m.y);
  if(g)cx.drawImage(g,-m.r-4,-m.r-4,m.r*2+8,m.r*2+8);
  else{cx.rotate(m.face);cx.fillStyle=m.fz&&Math.floor(t/100)%2?'#fff':m.df.c;cx.beginPath();
   if(m.df.sh==0)cx.arc(0,0,m.r,0,6.2832);else if(m.df.sh==1)cx.rect(-m.r,-m.r,m.r*2,m.r*2);
   else if(m.df.sh==2){cx.moveTo(m.r+2,0);cx.lineTo(0,m.r);cx.lineTo(-m.r,0);cx.lineTo(0,-m.r)}
   else{cx.moveTo(m.r+3,0);cx.lineTo(-m.r,m.r);cx.lineTo(-m.r,-m.r)}cx.fill()}
  cx.restore();bar(m);cx.fillStyle='#fff';cx.font='8px sans-serif';cx.textAlign='center';cx.fillText(m.df.n,m.x,m.y+m.r+10)}
 for(let p of ps){if(!p.alive||p==me)continue;circ(p,p.col);bar(p);cx.fillStyle='#fff';cx.font='8px sans-serif';cx.textAlign='center';cx.fillText(p.norm,p.x,p.y+p.r+10)}
 cx.fillStyle='#fff';for(let b of bl){cx.fillStyle=b.m?'#ff7799':'#fff';cx.fillRect(b.x-2,b.y-2,4,4)}
 cx.restore();
 if(me.alive){circ(me,me.col);bar(me)}else{cx.globalAlpha=.5;circ(me,me.col);cx.globalAlpha=1;cx.fillStyle='#cfe9ff88';cx.beginPath();cx.arc(G.cam.x,G.cam.y,6,0,6.2832);cx.fill()}
 // ゾーン
 cx.fillStyle='#ff224433';cx.beginPath();cx.rect(ox-50,oy-50,CW+100,H+100);cx.arc(Z.x,Z.y,Z.r,0,6.2832,true);cx.fill('evenodd');
 cx.strokeStyle='#ff4466';cx.lineWidth=3;cx.beginPath();cx.arc(Z.x,Z.y,Z.r,0,6.2832);cx.stroke();
 cx.setTransform(1,0,0,1,0,0);
 if(G.joy){cx.strokeStyle='#fff6';cx.lineWidth=2;cx.beginPath();cx.arc(G.joy.x0,G.joy.y0,50,0,6.2832);cx.stroke();
  let dx=G.joy.x-G.joy.x0,dy=G.joy.y-G.joy.y0,l=Math.min(50,Math.hypot(dx,dy)),a=Math.atan2(dy,dx);
  cx.fillStyle='#fff6';cx.beginPath();cx.arc(G.joy.x0+Math.cos(a)*l,G.joy.y0+Math.sin(a)*l,18,0,6.2832);cx.fill()}
 hud();
}
function hud(){
 let al=ps.filter(p=>p.alive).length,w=me.w;
 UI.top.textContent=`残り ${al}人 ／ ゾーン半径 ${Z.r|0}`+(me.alive?'':' ／ 観戦中');
 UI.wb.textContent=`${w.n}\n${w.mag?(me.rt?'リロード':me.mag+'/'+w.mag):'∞'}`;
 let g=im('weapons',w.id);UI.wb.style.backgroundImage=g?`url(${g.src})`:'';
 UI.hp.firstChild.style.width=Math.max(0,me.hp/me.mh*100)+'%';UI.hpt.textContent=Math.max(0,me.hp|0);
 let fi=im('items','food');UI.fb.textContent=`食\n×${me.food}`;
 UI.fb.style.background=`${fi?`url(${fi.src}) center/60% no-repeat,`:''}conic-gradient(#ffb347 ${me.hl/3*360}deg,#101a2a 0)`;
}
function finish(){
 if(G.end)return;G.end=1;let w=ps.find(p=>p.alive);
 let d=El('div','gend');d.innerHTML=`<div>${me.alive?'勝利！！ 最後の1人':'ゲーム終了 勝者: '+(w?w.norm:'なし')}</div>`;
 let b=El('div','botan');b.textContent='もどる';b.onclick=()=>{G.run=0;d.remove();mainF.move('home')};d.appendChild(b);document.getElementById('game').appendChild(d);
}
function tick(){if(!G.run)return;let t=now(),dt=Math.min(.05,(t-last)/1000);last=t;if(!G.end)update(dt,t);draw();requestAnimationFrame(tick)}
function startGame(){
 if(G.run)return;mainF.move('game');
 let g=document.getElementById('game');H=g.clientHeight||window.innerHeight;cv.width=CW;cv.height=H;
 gen();spawnParts();ms=[];items=[];bl=[];fx=[];FC=new Map();FCt=0;G.spec=0;G.end=0;G.joy=null;
 let t=now();Z={x:W/2,y:W/2,r:1150,nx:t+25000,t1:0};nextW=t+3000;nextM=t+5000;
 for(let i=0;i<10;i++){let p=rf();items.push({k:'w',w:arraySelect(WPS.slice(1)),x:p.x,y:p.y})}
 G.run=1;last=t;requestAnimationFrame(tick);
}
// ---------- DOM ----------
function setup(){
 let st=El('style');st.textContent=`#game{padding:0}#game canvas{position:absolute;left:0;top:0;touch-action:none}
.gtop{position:absolute;top:6px;left:0;right:0;text-align:center;color:#cfe9ff;font:14px sans-serif;pointer-events:none}
.gbar{position:absolute;left:0;right:0;bottom:8px;display:flex;align-items:center;gap:8px;padding:0 8px;box-sizing:border-box}
.gbtn{width:68px;height:68px;border-radius:50%;border:3px solid #cfe9ff;color:#cfe9ff;font:11px/1.2 sans-serif;white-space:pre;display:flex;align-items:center;justify-content:center;text-align:center;background:#101a2a center/cover;flex:none;box-sizing:border-box;touch-action:none}
.ghp{flex:1;height:20px;border:2px solid #cfe9ff;border-radius:10px;overflow:hidden;position:relative;box-sizing:border-box}.ghp i{display:block;height:100%;background:#6fdc8c}
.ghp span{position:absolute;inset:0;text-align:center;font:11px/16px sans-serif;color:#fff}
.gend{position:absolute;inset:0;display:flex;flex-direction:column;gap:16px;align-items:center;justify-content:center;background:#000a;color:#fff;font:20px sans-serif;z-index:5}`;
 document.head.appendChild(st);
 let main=document.getElementById('main'),g=El('div','space');g.id='game';main.appendChild(g);
 Spaces.push({name:'game',rank:3,back:'#05070b'});
 cv=El('canvas');cx=cv.getContext('2d');g.appendChild(cv);
 UI={top:El('div','gtop'),wb:El('div','gbtn'),fb:El('div','gbtn'),hp:El('div','ghp',[El('i')]),hpt:El('span')};UI.hp.appendChild(UI.hpt);
 g.appendChild(UI.top);g.appendChild(El('div','gbar',[UI.wb,UI.hp,UI.fb]));
 let hd=(el,k)=>{el.addEventListener('pointerdown',e=>{e.preventDefault();hold[k]=1});['pointerup','pointercancel','pointerleave'].forEach(v=>el.addEventListener(v,()=>hold[k]=0))};
 hd(UI.wb,'w');hd(UI.fb,'f');window.addEventListener('blur',()=>hold.w=hold.f=0);
 cv.addEventListener('pointerdown',e=>{if(e.pointerType!='mouse'){G.joy={id:e.pointerId,x0:e.offsetX,y0:e.offsetY,x:e.offsetX,y:e.offsetY};cv.setPointerCapture(e.pointerId)}});
 cv.addEventListener('pointermove',e=>{if(e.pointerType=='mouse'){G.mouse=1;G.mx=e.offsetX;G.my=e.offsetY}else if(G.joy&&G.joy.id==e.pointerId){G.joy.x=e.offsetX;G.joy.y=e.offsetY}});
 ['pointerup','pointercancel'].forEach(v=>cv.addEventListener(v,e=>{if(G.joy&&G.joy.id==e.pointerId)G.joy=null}));
 let home=document.getElementById('home'),ti=El('div');ti.textContent='Stone Trader Game Desu';ti.style.cssText='font-size:22px;margin:40px 0 24px';
 let b=El('div','botan');b.textContent='ゲーム開始';b.onclick=startGame;home.appendChild(ti);home.appendChild(b);
}
setup();
})();
