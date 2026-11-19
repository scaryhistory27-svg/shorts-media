// Strange Minute GTA 6 part 2 — what is inside the game (owner request) — original art only, no game assets/logos
// Caption band y≈1250–1470 stays free of key objects.
const SM={sky1:'#0e2a4a',sky2:'#1d4f7a',gold:'#ffd57a',cyan:'#5fd4ff',sea:'#0f5d86',sea2:'#0a3d5c',sand:'#e8c88f'};
function label(x,y,txt,col=SM.cyan,size=44){ctx.save();ctx.font=`800 ${size}px Inter`;ctx.textAlign='center';ctx.textBaseline='middle';
  const w=ctx.measureText(txt).width+50;rr(x-w/2,y-size*0.85,w,size*1.7,size*0.85);ctx.fillStyle='rgba(5,20,40,0.75)';ctx.fill();
  ctx.lineWidth=3;ctx.strokeStyle=col;ctx.stroke();ctx.fillStyle=col;ctx.fillText(txt,x,y);ctx.restore()}
function bigMoon(x,y,r,a=1){ctx.save();ctx.globalAlpha=a;glow(x,y,r*2.6,'rgba(255,235,180,A)',0.35);
  const g=ctx.createRadialGradient(x-r*0.35,y-r*0.35,r*0.1,x,y,r);g.addColorStop(0,'#fff6d8');g.addColorStop(0.7,'#e9d79c');g.addColorStop(1,'#bfa86a');ell(x,y,r,r,g);
  for(const [dx,dy,rr2] of[[-.35,-.2,.17],[.33,.25,.12],[.1,-.48,.09],[-.15,.4,.13],[.45,-.15,.07]])ell(x+dx*r,y+dy*r,rr2*r,rr2*r,'rgba(160,135,80,0.55)');ctx.restore()}
function skyline(t,lit=1,yb=1250){const r=rnd(4);let x=-40;while(x<W+40){const w=90+r()*110,h=180+r()*420;ctx.fillStyle='#0a1626';ctx.fillRect(x,yb-h,w,h+700);
  for(let yy=yb-h+30;yy<yb-20;yy+=46)for(let xx=x+16;xx<x+w-24;xx+=34)if(r()<0.45){const f=Math.sin(t*0.7+xx*0.3+yy)>0.97?0.3:1;ctx.fillStyle=`rgba(255,213,122,${0.75*lit*f})`;ctx.fillRect(xx,yy,16,22)}x+=w+6}}
function earth(x,y,r,t,tilt=0.41){ctx.save();ctx.translate(x,y);glow(0,0,r*1.7,'rgba(95,212,255,A)',0.25);ctx.rotate(tilt);
  ctx.beginPath();ctx.arc(0,0,r,0,7);ctx.save();ctx.clip();ctx.fillStyle='#1c6fb0';ctx.fillRect(-r,-r,2*r,2*r);
  const off=(t*0.18*r)%(r*4);for(const k of[-1,0,1])for(const [cx,cy,rx,ry] of[[-0.3,-0.3,0.35,0.25],[0.5,0.1,0.28,0.4],[1.2,-0.4,0.3,0.2],[1.6,0.35,0.35,0.22]]){
    ell(cx*r*2+off-r*4*k-r*1.5,cy*r,rx*r,ry*r,'#3e9a5a')}
  ell(0,-r*0.92,r*0.55,r*0.16,'#eef6ff');ell(0,r*0.92,r*0.55,r*0.16,'#eef6ff');
  const sh=ctx.createLinearGradient(-r,0,r,0);sh.addColorStop(0,'rgba(0,0,0,0)');sh.addColorStop(0.55,'rgba(0,0,0,0.1)');sh.addColorStop(1,'rgba(0,10,30,0.75)');ctx.fillStyle=sh;ctx.fillRect(-r,-r,2*r,2*r);ctx.restore();
  ctx.strokeStyle='rgba(255,255,255,0.8)';ctx.lineWidth=5;ctx.setLineDash([16,12]);ctx.beginPath();ctx.moveTo(0,-r*1.35);ctx.lineTo(0,r*1.35);ctx.stroke();ctx.setLineDash([]);ctx.restore()}
function turtle(x,y,s,t,ph=0){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const k=Math.sin(t*7+ph);
  ctx.fillStyle='#2e5f3a';for(const [a,b] of[[-1,-1],[1,-1],[-1,1],[1,1]]){ctx.save();ctx.translate(a*22,b*16);ctx.rotate(a*b*(0.5+0.4*k*a));ell(a*10,0,16,7,'#3f7d4c');ctx.restore()}
  ell(36,0,13,11,'#4c8f5a');ell(41,-4,2.5,2.5,'#111');ell(0,0,30,24,'#2b5233');ell(0,0,22,17,'#3b6e45');ctx.restore()}

function nth(seg){let n=0;for(const x of TL.segs){if(x===seg)return n;if(x.scene===seg.scene)n++}return n}
function ground(t,col='#0b2238'){ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(-100,1180);ctx.quadraticCurveTo(540,1130,W+100,1180);ctx.lineTo(W+100,H+100);ctx.lineTo(-100,H+100);ctx.fill()}
function streaks(t,k,col='255,255,255',y0=200,y1=1150){const r=rnd(5);for(let i=0;i<60*k;i++){const y=y0+r()*(y1-y0),L=80+r()*260,x=((r()*W*2+t*(900+r()*900)*k)%(W+L*2))-L;ctx.strokeStyle=`rgba(${col},${0.15+0.35*r()})`;ctx.lineWidth=2+r()*4;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+L,y);ctx.stroke()}}
function bar(x,y,w,h,v,col,txt){rr(x,y,w,h,h/2);ctx.fillStyle='rgba(255,255,255,0.12)';ctx.fill();rr(x,y,Math.max(h,w*v),h,h/2);ctx.fillStyle=col;ctx.fill();ctx.font='800 34px Inter';ctx.fillStyle='#fff';ctx.textAlign='left';ctx.fillText(txt,x,y-16)}
function mug(x,y,s,t,tilt=0){ctx.save();ctx.translate(x,y);ctx.rotate(tilt);ctx.scale(s,s);ctx.lineWidth=5;ctx.strokeStyle='#10243a';rr(-40,-80,80,80,10);ctx.fillStyle='#ff8a3d';ctx.fill();ctx.stroke();ctx.beginPath();ctx.arc(44,-40,18,-1.4,1.4);ctx.stroke();
  for(let i=0;i<3;i++){ctx.strokeStyle=`rgba(255,255,255,${0.4})`;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-20+i*20,-90);ctx.quadraticCurveTo(-30+i*20+Math.sin(t*3+i)*10,-120,-20+i*20,-150);ctx.stroke()}ctx.restore()}

const DAY1='#2f8fd8',DAY2='#a6dcff';
function daySky(t,dark=0){const g=ctx.createLinearGradient(0,0,0,1200);g.addColorStop(0,DAY1);g.addColorStop(1,DAY2);ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,1400);
  if(dark>0){ctx.fillStyle=`rgba(4,10,24,${dark})`;ctx.fillRect(-100,-100,W+200,1400);if(dark>0.6)stars(t,(dark-0.6)/0.4)}}
function bigSun(x,y,r,t,a=1){if(a<=0)return;ctx.save();ctx.globalAlpha=a;glow(x,y,r*3,'rgba(255,210,90,A)',0.45);ctx.translate(x,y);ctx.rotate(t*0.25);
  ctx.strokeStyle='rgba(255,213,122,0.8)';ctx.lineCap='round';ctx.lineWidth=r*0.09;for(let i=0;i<12;i++){ctx.rotate(Math.PI/6);const k=1.25+0.08*Math.sin(t*4+i);ctx.beginPath();ctx.moveTo(0,r*1.12);ctx.lineTo(0,r*k+r*0.15);ctx.stroke()}
  const g=ctx.createRadialGradient(-r*0.3,-r*0.3,r*0.1,0,0,r);g.addColorStop(0,'#fff7d0');g.addColorStop(0.6,'#ffd04a');g.addColorStop(1,'#ff9a2a');ell(0,0,r,r,g);ctx.restore()}
function deadSun(x,y,r){ell(x,y,r,r,'#141820');ctx.strokeStyle='rgba(95,212,255,0.35)';ctx.lineWidth=4;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.stroke()}
function grassField(t,dark=0){ctx.fillStyle=dark>0.5?'#0b2a1c':'#3aa05a';ctx.beginPath();ctx.moveTo(-100,1180);ctx.quadraticCurveTo(540,1120,W+100,1180);ctx.lineTo(W+100,H+100);ctx.lineTo(-100,H+100);ctx.fill();
  if(dark>0&&dark<=0.5){ctx.fillStyle=`rgba(4,10,24,${dark})`;ctx.fillRect(-100,1100,W+200,900)}
  for(let i=0;i<40;i++){const x=i*28+10,s=Math.sin(t*2+i)*6;ctx.strokeStyle=dark>0.5?'#0f3a26':'#2e8a48';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x,1190);ctx.quadraticCurveTo(x+s,1165,x+s*1.6,1145);ctx.stroke()}}
function spaceBg(t){ctx.fillStyle='#050b18';ctx.fillRect(-100,-100,W+200,H+200);stars(t,1)}
function photons(x0,y0,x1,y1,t,k=1,col='255,213,122'){for(let i=0;i<14;i++){const f=((t*0.35+i/14)%1);const x=x0+(x1-x0)*f,y=y0+(y1-y0)*f+Math.sin(f*20+i)*10;glow(x,y,26,`rgba(${col},A)`,0.8*k);ell(x,y,7,7,`rgba(${col},${k})`)}}
function timer(x,y,txt,col=SM.gold){ctx.save();ctx.font='800 64px "JetBrains Mono"';ctx.textAlign='center';ctx.textBaseline='middle';const w=ctx.measureText(txt).width+60;rr(x-w/2,y-55,w,110,30);ctx.fillStyle='rgba(5,20,40,0.8)';ctx.fill();ctx.strokeStyle=col;ctx.lineWidth=4;ctx.stroke();ctx.fillStyle=col;ctx.fillText(txt,x,y+3);ctx.restore()}
function mmss(sec){sec=Math.max(0,Math.floor(sec));return Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0')}
function bird(x,y,s,t,still){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const f=still?0:Math.sin(t*14)*0.6;ctx.fillStyle='#9fc3e6';ell(0,0,22,14,'#9fc3e6');ell(18,-10,10,10,'#9fc3e6');ctx.beginPath();ctx.moveTo(26,-10);ctx.lineTo(38,-6);ctx.lineTo(26,-4);ctx.fill();
  ctx.save();ctx.rotate(-0.3-f);ctx.beginPath();ctx.ellipse(-6,-8,20,7,-0.4,0,7);ctx.fill();ctx.restore();ctx.restore()}
function plant(x,y,s,t,close=0){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.strokeStyle='#2e7d45';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(Math.sin(t)*6,-80,0,-160);ctx.stroke();
  for(const [yy,k] of[[-60,-1],[-100,1],[-140,-1]]){ctx.save();ctx.translate(0,yy);ctx.rotate(k*(1.1-0.9*close)+Math.sin(t*2+yy)*0.05);ctx.fillStyle='#45b35f';ctx.beginPath();ctx.ellipse(k*30,0,34,13,0,0,7);ctx.fill();ctx.restore()}ctx.restore()}
function smEnd(seg,t){const lw=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>lw+0.9){const a=ease((t-lw-0.9)/0.5);ctx.fillStyle=`rgba(3,10,22,${0.82*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';
   ctx.font='900 110px Inter';ctx.fillStyle=SM.gold;ctx.shadowColor=SM.gold;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}}
const NEON1='#ff5fa2',NEON2='#ffb35c',NEON3='#5fd4ff';
function sunsetNeon(t,k=1){const g=ctx.createLinearGradient(0,0,0,1200);g.addColorStop(0,'#1b1040');g.addColorStop(0.55,'#c2407a');g.addColorStop(1,'#ffb35c');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,1400);
  glow(540,900,520,'rgba(255,180,90,A)',0.5*k);ell(540,930,170,170,'rgba(255,214,120,0.95)');ctx.fillStyle='#1b1040';for(let i=0;i<6;i++)ctx.fillRect(330,860+i*26,420,6+i*2)}
function palm(x,y,s,t){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.strokeStyle='#120a24';ctx.lineWidth=18;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(20,-160,-10,-330);ctx.stroke();
  ctx.fillStyle='#120a24';for(let i=0;i<7;i++){ctx.save();ctx.translate(-10,-330);ctx.rotate(-2.6+i*0.75+Math.sin(t*1.5+i)*0.06);ctx.beginPath();ctx.ellipse(0,-80,22,95,0,0,7);ctx.fill();ctx.restore()}ctx.restore()}
function neonSkyline(t,yb=1200){const r=rnd(21);let x=-30;while(x<W+40){const w=80+r()*120,h=160+r()*380;ctx.fillStyle='#140b2a';ctx.fillRect(x,yb-h,w,h+800);ctx.strokeStyle=r()<0.5?NEON1:NEON3;ctx.globalAlpha=0.5+0.3*Math.sin(t*3+x);ctx.lineWidth=3;ctx.strokeRect(x+6,yb-h+6,w-12,h);ctx.globalAlpha=1;
  for(let yy=yb-h+30;yy<yb-20;yy+=44)for(let xx=x+16;xx<x+w-24;xx+=30)if(r()<0.4){ctx.fillStyle=`rgba(255,${180+r()*60|0},120,0.8)`;ctx.fillRect(xx,yy,14,20)}x+=w+8}}
function console5(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const shake=o.shake?Math.sin(t*50)*o.shake*6:0;ctx.translate(shake,0);
  glow(0,-120,260,`rgba(${o.err?'255,80,80':'95,212,255'},A)`,0.35);ctx.lineWidth=6;ctx.strokeStyle='#10243a';rr(-90,-260,180,260,26);ctx.fillStyle='#eef3fa';ctx.fill();ctx.stroke();ctx.fillStyle='#10243a';rr(-14,-250,28,240,10);ctx.fill();
  ell(0,-40,10,10,o.err?(Math.sin(t*10)>0?'#ff4d4d':'#601010'):(Math.sin(t*4)>0?'#5fd4ff':'#1b4a6b'));ctx.restore()}
function pad(x,y,s,t,rot=0){ctx.save();ctx.translate(x,y);ctx.rotate(rot+Math.sin(t*3)*0.05);ctx.scale(s,s);ctx.lineWidth=6;ctx.strokeStyle='#10243a';ctx.fillStyle='#2b3550';ctx.beginPath();ctx.moveTo(-110,-30);ctx.quadraticCurveTo(0,-60,110,-30);ctx.quadraticCurveTo(150,60,100,70);ctx.quadraticCurveTo(60,40,0,40);ctx.quadraticCurveTo(-60,40,-100,70);ctx.quadraticCurveTo(-150,60,-110,-30);ctx.closePath();ctx.fill();ctx.stroke();
  for(const [bx,by,c] of[[60,-20,'#5fd4ff'],[85,0,'#ff5fa2'],[60,20,'#ffd57a'],[35,0,'#7fe38a']]){ell(bx,by,10,10,Math.sin(t*6+bx)>0.6?'#fff':c)}ctx.fillStyle='#10243a';ctx.fillRect(-75,-6,40,12);ctx.fillRect(-61,-20,12,40);ctx.restore()}
function calPage(x,y,s,top,mid,bot,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(o.rot||0);ctx.scale(s,s);ctx.lineWidth=6;ctx.strokeStyle='#10243a';rr(-150,-170,300,340,24);ctx.fillStyle='#ffffff';ctx.fill();ctx.stroke();ctx.fillStyle=o.col||'#ff5fa2';rr(-150,-170,300,80,24);ctx.fill();ctx.fillRect(-150,-120,300,30);
  ctx.fillStyle='#fff';ctx.font='900 44px Inter';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(top,0,-128);ctx.fillStyle='#10243a';ctx.font='900 120px Inter';ctx.fillText(mid,0,10);ctx.font='800 40px Inter';ctx.fillText(bot,0,120);
  if(o.cross){ctx.strokeStyle='#ff3b3b';ctx.lineWidth=14;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-120,-60);ctx.lineTo(120,150);ctx.moveTo(120,-60);ctx.lineTo(-120,150);ctx.globalAlpha=o.cross;ctx.stroke()}ctx.restore()}
function serverRack(x,y,s,t,err){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-80,-420,160,420,12);ctx.fillStyle='#16233a';ctx.fill();ctx.strokeStyle='#5f7f9f';ctx.lineWidth=4;ctx.stroke();
  for(let i=0;i<9;i++){ctx.fillStyle='#0c1424';ctx.fillRect(-64,-400+i*44,128,34);for(let j=0;j<4;j++){const on=Math.sin(t*(8+j)+i*1.7+x)>0;ell(-44+j*22,-383+i*44,5,5,err&&(i+j)%3==0?(on?'#ff4d4d':'#401010'):(on?'#5fd4ff':'#123048'))}}ctx.restore()}
const REG=[['VICE CITY',640,980,'#ff5fa2'],['LEONIDA KEYS',520,1150,'#5fd4ff'],['GRASSRIVERS',470,900,'#7fe38a'],['PORT GELLHORN',300,560,'#ffb35c'],['AMBROSIA',470,620,'#c9a0ff'],['MOUNT KALAGA',300,400,'#9fe0c0']];
function stateMap(t,o={}){ctx.fillStyle='#0d4a78';ctx.fillRect(-100,-100,W+200,H+200);for(let i=0;i<30;i++){const y=(i*67+t*20)%H;ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,y);ctx.quadraticCurveTo(540,y+20*Math.sin(t+i),W,y);ctx.stroke()}
  ctx.save();ctx.fillStyle='#e8c88f';ctx.strokeStyle='#10243a';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(120,300);ctx.lineTo(820,300);ctx.lineTo(800,420);ctx.quadraticCurveTo(700,520,690,700);ctx.quadraticCurveTo(720,900,680,1060);ctx.quadraticCurveTo(620,1120,560,1040);
  ctx.quadraticCurveTo(420,860,400,700);ctx.quadraticCurveTo(360,560,220,470);ctx.lineTo(120,430);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#7fbf6a';ctx.globalAlpha=0.55;ctx.beginPath();ctx.ellipse(470,880,90,120,0.2,0,7);ctx.fill();ctx.beginPath();ctx.ellipse(300,410,110,60,0,0,7);ctx.fill();ctx.globalAlpha=1;
  for(let i=0;i<6;i++){ell(560-i*40+Math.sin(i)*20,1150+i*14,16-i*1.5,10-i,'#e8c88f')}ctx.restore();
  const n=o.pins??0;REG.forEach(([nm,x,y,c],i)=>{const a=clamp(n-i,0,1);if(a<=0)return;const b=1+0.3*Math.max(0,1-(n-i)*3);ctx.save();ctx.globalAlpha=a;glow(x,y,70,`rgba(255,255,255,A)`,0.3);ctx.translate(x,y);ctx.scale(b,b);ctx.fillStyle=c;ctx.strokeStyle='#10243a';ctx.lineWidth=5;ctx.beginPath();ctx.arc(0,-34,22,Math.PI,0);ctx.lineTo(0,0);ctx.closePath();ctx.fill();ctx.stroke();ell(0,-36,8,8,'#10243a');
    ctx.font='900 34px Inter';ctx.textAlign='left';ctx.lineWidth=8;ctx.strokeStyle='rgba(5,20,40,0.9)';ctx.strokeText(nm,30,-30);ctx.fillStyle='#fff';ctx.fillText(nm,30,-30);ctx.restore()})}
function sea(t,y0=1000,c1='#1c8fd0',c2='#0d4a78'){const g=ctx.createLinearGradient(0,y0,0,H);g.addColorStop(0,c1);g.addColorStop(1,c2);ctx.fillStyle=g;ctx.fillRect(-100,y0,W+200,H);for(let i=0;i<12;i++){ctx.strokeStyle='rgba(255,255,255,0.25)';ctx.lineWidth=4;const y=y0+30+i*60,x=((i*170+t*60)%(W+200))-100;ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+40,y-12,x+80,y);ctx.stroke()}}
function gator(x,y,s,t){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#7fae5a';glow(40,-10,240,'rgba(255,255,200,A)',0.2);ctx.beginPath();ctx.ellipse(0,0,160,22,0,0,7);ctx.fill();ctx.beginPath();ctx.ellipse(160,-4,70,14,0,0,7);ctx.fill();for(const ex of[100,130]){ell(ex,-20,12,10,'#7fae5a');ell(ex,-22,6,6,Math.sin(t*1.3)>0.95?'#7fae5a':'#ffe66b');ell(ex,-22,2,5,'#111')}
  for(let i=0;i<6;i++){ctx.beginPath();ctx.moveTo(-120+i*40,-18);ctx.lineTo(-105+i*40,-34);ctx.lineTo(-90+i*40,-18);ctx.fill()}ctx.restore()}
function pine(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#4a3020';ctx.fillRect(-8,-30,16,30);ctx.fillStyle='#1f6b4a';for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(0,-200+i*50);ctx.lineTo(-70+i*-8,-60+i*12);ctx.lineTo(70+i*8,-60+i*12);ctx.closePath();ctx.fill()}ctx.restore()}
function duoPair(x,y,s,t,o={}){walker(x-70*s,y,s,t,{speed:o.speed??0,dir:1,look:0.2,top:'#c2407a',topD:'#9a2f60',hair:'#2a1a12',skin:'#d9a07a',pants:'#22304a'});ctx.save();ctx.fillStyle='#2a1a12';ell(x-70*s-26*s,y-262*s+4*s,10*s,30*s,'#2a1a12');ctx.restore();
  walker(x+70*s,y,s*1.05,t,{speed:o.speed??0,dir:1,look:-0.2,top:'#3d5a80',topD:'#2b4060',hair:'#5a3a22',skin:'#e8b48c',pants:'#1a2233'})}
const SCN={
 start(lt,p,t,d,seg){sunsetNeon(t);neonSkyline(t,1210);palm(110,1230,1.1,t);palm(980,1240,1.0,t+1);
   ctx.save();ctx.translate(540,560);rr(-330,-200,660,400,20);ctx.fillStyle='#0b0f1c';ctx.fill();ctx.strokeStyle='#2b3550';ctx.lineWidth=12;ctx.stroke();const g=ctx.createLinearGradient(-310,-180,310,180);g.addColorStop(0,'#c2407a');g.addColorStop(1,'#ffb35c');rr(-310,-180,620,360,10);ctx.fillStyle=g;ctx.fill();
   ctx.fillStyle='#fff';ctx.font='900 64px Inter';ctx.textAlign='center';ctx.fillText('GTA 6',0,-20);ctx.font='800 36px Inter';ctx.fillText(Math.floor(t*2)%2?'PRESS START':'',0,60);const lb=ease(clamp(lt/2.4,0,1));rr(-200,110,400,22,11);ctx.fillStyle='rgba(255,255,255,0.3)';ctx.fill();rr(-200,110,400*lb,22,11);ctx.fillStyle='#fff';ctx.fill();ctx.restore();
   smGuy(260,1240,1.35,t,{wow:0.6,look:-0.4,point:0.6});pad(360,1080,0.6,t,0.2);smTick(840,1210-Math.abs(Math.sin(t*7))*24,1.2,t,{wow:1,hop:1})},
 map(lt,p,t,d,seg){const k=nth(seg);stateMap(t,{pins:k?ease(p)*6.2:0});if(!k){const y=lerp(150,820,ease(clamp(p*1.2,0,1)));ctx.save();ctx.translate(640,y);ctx.strokeStyle='#10243a';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-90,-250);ctx.lineTo(0,-60);ctx.moveTo(90,-250);ctx.lineTo(0,-60);ctx.stroke();
   ctx.fillStyle='#ff5fa2';ctx.beginPath();ctx.arc(0,-250,95,Math.PI,0);ctx.fill();ctx.strokeStyle='#10243a';ctx.lineWidth=5;ctx.stroke();smGuy(0,40,0.8,t,{wow:0.8,look:0.6});ctx.restore();label(540,1250,'LEONIDA',SM.gold,56)}else label(540,1250,'6 REGIONS',SM.gold,56)},
 vice(lt,p,t,d,seg){const k=nth(seg);sunsetNeon(t);neonSkyline(t,1150);sea(t,1150,'#2aa8d0','#1d4f7a');ctx.fillStyle='#e8c88f';ctx.fillRect(-100,1185,W+200,110);ctx.fillStyle='rgba(255,255,255,0.35)';ctx.fillRect(-100,1185,W+200,6);palm(100,1200,1.2,t);palm(990,1210,1.1,t+2);
   for(let i=0;i<3;i++){const x=((t*(220+i*80)+i*400)%(W+400))-200;ctx.fillStyle=['#ff5fa2','#5fd4ff','#ffd57a'][i];rr(x,1070+i*20,120,40,14);ctx.fill();ell(x+25,1112+i*20,12,12,'#10243a');ell(x+95,1112+i*20,12,12,'#10243a')}
   label(540,380,k?'INSPIRED BY MIAMI':'VICE CITY',k?SM.cyan:SM.gold,58);smGuy(moveAlong(p,300,520),1240,1.25,t,{speed:p<0.9?1.4:0,look:-0.3,wow:0.4})},
 keys(lt,p,t,d,seg){daySky(t);sea(t,850);for(const [x,y,s] of[[220,900,1],[560,960,1.4],[880,910,0.9]]){ell(x,y,110*s,30*s,'#e8c88f');palm(x,y,0.55*s,t+x)}
   label(540,380,'LEONIDA KEYS',SM.cyan,56);ctx.save();ctx.translate(moveAlong(p,-100,1100),1100);ctx.fillStyle='#fff';rr(-90,-30,180,50,20);ctx.fill();ctx.fillStyle='#ff5fa2';ctx.fillRect(-60,-60,60,32);ctx.restore();smTick(800,1240-Math.abs(Math.sin(t*6))*20,1.1,t,{hop:1})},
 swamp(lt,p,t,d,seg){const g=ctx.createLinearGradient(0,0,0,1000);g.addColorStop(0,'#7fb8a8');g.addColorStop(1,'#c9d9a0');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,1100);sea(t,950,'#4a6b3a','#2a4020');
   for(let i=0;i<9;i++){ctx.strokeStyle='#3a5a2a';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(60+i*120,960);ctx.quadraticCurveTo(70+i*120+Math.sin(t+i)*10,800,50+i*120,700);ctx.stroke()}
   const gy=lerp(1060,990,ease(clamp(p*2,0,1)));gator(moveAlong(p,760,430),gy-20,1.9,t);label(540,380,'GRASSRIVERS',SM.gold,56);smGuy(880,1240,1.2,t,{wow:1,look:0.4,dir:-1})},
 port(lt,p,t,d,seg){daySky(t,0.15);sea(t,1100,'#5fa8c8','#2a6b8a');ctx.fillStyle='#e8c88f';ctx.fillRect(-100,1040,W+200,70);
   ctx.save();ctx.translate(560,760);ctx.fillStyle='#d9b38c';ctx.fillRect(-280,-120,560,280);ctx.fillStyle='#8a6a4a';for(let i=0;i<5;i++)ctx.fillRect(-250+i*110,-60,70,110);ctx.restore();
   ctx.save();ctx.translate(840,520);ctx.rotate(0.08+Math.sin(t*2)*0.02);rr(-110,-60,220,120,14);ctx.fillStyle='#10243a';ctx.fill();ctx.font='900 40px Inter';ctx.textAlign='center';ctx.fillStyle=Math.sin(t*5)>0.3?'#ff5fa2':'#5a2a40';ctx.fillText('MOTEL',0,0);ctx.font='800 26px Inter';ctx.fillStyle=Math.sin(t*3)>0?'#5fd4ff':'#1d4f7a';ctx.fillText('VACANCY',0,36);ctx.restore();
   label(540,380,'PORT GELLHORN',SM.gold,54);smGuy(moveAlong(p,150,330),1240,1.2,t,{speed:p<0.9?1.3:0,look:-0.2})},
 ambrosia(lt,p,t,d,seg){const g=ctx.createLinearGradient(0,0,0,1100);g.addColorStop(0,'#f2c98a');g.addColorStop(1,'#d9a060');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,1200);ctx.fillStyle='#b98a50';ctx.fillRect(-100,1100,W+200,900);
   ctx.fillStyle='#6b5a4a';ctx.fillRect(560,620,300,480);ctx.fillRect(620,440,50,200);ctx.fillRect(740,480,50,160);for(let i=0;i<6;i++){const f=((t*0.3+i/6)%1);ctx.globalAlpha=0.5*(1-f);ell(645+f*40,430-f*260,30+f*50,24+f*40,'#ffffff');ell(765+f*30,470-f*240,26+f*40,20+f*30,'#ffffff')}ctx.globalAlpha=1;
   ctx.save();ctx.translate(moveAlong(p,-150,1200),1190);ell(-60,0,34,34,'#10243a');ell(60,0,34,34,'#10243a');ctx.fillStyle='#3a3a40';ctx.beginPath();ctx.moveTo(-60,-10);ctx.lineTo(60,-10);ctx.lineTo(30,-50);ctx.lineTo(-30,-40);ctx.fill();walker(0,-10,0.7,t,{speed:0,top:'#2a2a2a',topD:'#1a1a1a',pants:'#22304a',reach:0.6});ctx.restore();
   label(540,380,'AMBROSIA',SM.gold,56)},
 mountain(lt,p,t,d,seg){daySky(t,0.1);ctx.fillStyle='#5a7a6a';ctx.beginPath();ctx.moveTo(-100,1150);ctx.lineTo(300,500);ctx.lineTo(560,860);ctx.lineTo(760,560);ctx.lineTo(1180,1150);ctx.fill();ctx.fillStyle='#eef6ff';ctx.beginPath();ctx.moveTo(300,500);ctx.lineTo(250,580);ctx.lineTo(350,580);ctx.fill();ctx.beginPath();ctx.moveTo(760,560);ctx.lineTo(715,630);ctx.lineTo(805,630);ctx.fill();
   ctx.fillStyle='#2e6b4a';ctx.fillRect(-100,1100,W+200,900);for(let i=0;i<10;i++)pine(40+i*110,1130+(i%2)*30,0.9+(i%3)*0.15);label(540,380,'MOUNT KALAGA',SM.cyan,56);smGuy(moveAlong(p,200,480),1250,1.2,t,{speed:p<0.9?1.3:0,look:-0.5})},
 duo(lt,p,t,d,seg){const k=nth(seg);sunsetNeon(t,0.7);neonSkyline(t,1210);duoPair(k?moveAlong(p,420,600):540,1250,1.5,t,{speed:k&&p<0.9?1.2:0});label(540,380,k?'PARTNERS IN CRIME':'LUCIA + JASON',SM.gold,54)},
 consoles(lt,p,t,d,seg){ctx.fillStyle='#071a33';ctx.fillRect(-100,-100,W+200,H+200);stars(t,0.4);console5(300,1050,1.3,t);ctx.save();ctx.translate(560,1050);ctx.scale(1.3,1.3);ctx.fillStyle='#1a1d22';ctx.strokeStyle='#10243a';ctx.lineWidth=6;rr(-70,-240,140,240,14);ctx.fill();ctx.stroke();ell(0,-200,26,26,'#2a2f36');ell(0,-200,14,14,Math.sin(t*4)>0?'#7fe38a':'#2a4a2a');ctx.restore();
   ctx.save();ctx.translate(840,1050);ctx.scale(1.2,1.2);ctx.globalAlpha=0.6;ctx.fillStyle='#3a3f4a';rr(-80,-300,160,300,10);ctx.fill();ctx.globalAlpha=1;const x=ease(clamp(p*2,0,1));ctx.strokeStyle='#ff3b3b';ctx.lineWidth=16;ctx.lineCap='round';ctx.globalAlpha=x;ctx.beginPath();ctx.moveTo(-90,-280);ctx.lineTo(90,-20);ctx.moveTo(90,-280);ctx.lineTo(-90,-20);ctx.stroke();ctx.restore();
   label(300,620,'PS5',SM.cyan,46);label(560,620,'XBOX',SM.cyan,46);label(840,620,'PC?',SM.gold,46)},
 prison(lt,p,t,d,seg){ctx.fillStyle='#2a2f3a';ctx.fillRect(-100,-100,W+200,H+200);lightCone(540,150,0,1100,320,'255,240,200',0.18);ctx.fillStyle='#1f232c';ctx.fillRect(-100,1150,W+200,900);
   walker(540,1180,1.6,t,{speed:0,look:Math.sin(t*0.8)*0.4,top:'#ff8a3d',topD:'#d96a20',pants:'#ff8a3d',hair:'#2a1a12',skin:'#d9a07a'});ctx.fillStyle='#2a1a12';ell(540-26*1.6,1180-262*1.6+6,10*1.6,30*1.6,'#2a1a12');
   const sl=ease(clamp(p*2.2,0,1));for(let i=0;i<9;i++){ctx.fillStyle='#8a93a6';ctx.fillRect(110+i*110,lerp(-1300,200,sl),22,1000);ell(121+i*110,lerp(-300,1200,sl),14,8,'#6a7386')}ctx.fillStyle='#8a93a6';ctx.fillRect(80,lerp(-1300,200,sl)+60,920,20);
   label(540,380,'TRAILER 1 · OPENING SHOT',SM.gold,44)},
 endq(lt,p,t,d,seg){stateMap(t,{pins:6});ctx.fillStyle='rgba(5,20,40,0.35)';ctx.fillRect(-100,-100,W+200,H+200);const i=Math.floor(t*2)%6;const [nm,x,y]=REG[i];glow(x,y-30,160,'rgba(255,213,122,A)',0.6);
   smGuy(840,1250,1.3,t,{look:-0.3,point:0.8,wow:0.5,dir:-1});smTick(200,1220-Math.abs(Math.sin(t*5))*16,1.2,t,{wow:0.8});smEnd(seg,t)}
};
const CAM={start:[1.08,1],map:[1,1.06],vice:[1,1.06],keys:[1,1.05],swamp:[1,1.06],port:[1,1.05],ambrosia:[1,1.05],mountain:[1,1.06],duo:[1,1.06],consoles:[1,1.05],prison:[1,1.08],endq:[1,1.04]};
