// Strange Minute GTA 6 secrets — official Rockstar screenshots (build/img, not committed) + our animated overlays
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
// ---- official screenshots (rockstargames.com/VI/downloads/screenshots), credited on screen ----
const IMGBASE=new URL('build/img/',new URLSearchParams(location.search).get('scenes'));const PICS={};
window.ASSETS_READY=Promise.all(['vice_sign','vice_aerial','vice_pool','jason_neon','keys_aerial','heist','couple','lucia_fight','motel','car_duo','gators'].map(n=>new Promise(res=>{const im=new Image();im.onload=()=>{PICS[n]=im;res()};im.onerror=()=>res();im.src=(window.IMGDATA&&window.IMGDATA[n])||new URL(n+'.jpg',IMGBASE).href})));
function still(name,t,p,o={}){const im=PICS[name];ctx.fillStyle='#050a14';ctx.fillRect(-100,-100,W+200,H+200);if(!im)return;
  // blurred, darkened full-screen backdrop
  ctx.save();ctx.filter='blur(28px) brightness(0.45)';const bs=H/im.height*1.1;ctx.drawImage(im,W/2-im.width*bs/2,H/2-im.height*bs/2,im.width*bs,im.height*bs);ctx.restore();
  // the card: full width, Ken Burns
  const cy=o.y||705,ch=710,z=(o.z0||1.0)+((o.z1||1.12)-(o.z0||1.0))*p,px=(o.px||0)*p,py=(o.py||0)*p;
  ctx.save();ctx.beginPath();rr(30,cy-ch/2,W-60,ch,28);ctx.clip();const fit=Math.max((W-60)/im.width,ch/im.height);const w=im.width*fit*z,h=im.height*fit*z;ctx.drawImage(im,W/2-w/2+px*w,cy-h/2+py*h,w,h);ctx.restore();
  ctx.save();ctx.lineWidth=6;ctx.strokeStyle='rgba(255,255,255,0.85)';rr(30,cy-ch/2,W-60,ch,28);ctx.stroke();ctx.font='700 22px Inter';ctx.textAlign='right';ctx.fillStyle='rgba(255,255,255,0.8)';ctx.fillText('IMAGE: ROCKSTAR GAMES',W-50,cy+ch/2+30);ctx.restore();
  if(o.label){ctx.save();ctx.translate(540,cy-ch/2-60);ctx.rotate(o.rot||-0.03);label(0,0,o.label,o.lc||SM.gold,o.ls||50);ctx.restore()}}
function carSideSM(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const sh=o.shake?Math.sin(t*45)*4:0;ctx.translate(sh,0);ctx.lineWidth=6;ctx.strokeStyle='#10243a';ctx.fillStyle=o.col||'#ff5fa2';
  ctx.beginPath();ctx.moveTo(-200,-20);ctx.lineTo(-190,-80);ctx.lineTo(-90,-90);ctx.lineTo(-40,-150);ctx.lineTo(90,-150);ctx.lineTo(140,-90);ctx.lineTo(210,-80);ctx.lineTo(215,-20);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='#1d3a5a';ctx.beginPath();ctx.moveTo(-30,-138);ctx.lineTo(35,-138);ctx.lineTo(35,-95);ctx.lineTo(-75,-95);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(48,-138);ctx.lineTo(85,-138);ctx.lineTo(125,-95);ctx.lineTo(48,-95);ctx.closePath();ctx.fill();
  if(o.cat!=null&&o.cat<1){const g=Math.sin(t*9)>0.8?1.4:1;ell(-5,-112,9*g,7,'#ffe66b');ell(18,-112,9*g,7,'#ffe66b');ell(-5,-112,2,6,'#111');ell(18,-112,2,6,'#111');ctx.fillStyle='#ffe66b';ctx.beginPath();ctx.moveTo(-18,-128);ctx.lineTo(-10,-140);ctx.lineTo(-2,-128);ctx.fill();ctx.beginPath();ctx.moveTo(14,-128);ctx.lineTo(22,-140);ctx.lineTo(30,-128);ctx.fill()}
  for(const wx of[-120,130]){ell(wx,-18,38,38,'#10243a');ell(wx,-18,16,16,'#9fb3c8')}ctx.restore()}
function cat(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(o.rot||0);ctx.scale(s,s);const c='#3a3a46';ctx.lineWidth=5;ctx.strokeStyle='#10243a';ctx.fillStyle=c;
  ctx.beginPath();ctx.ellipse(0,0,70,36,0,0,7);ctx.fill();ctx.stroke();ctx.beginPath();ctx.arc(70,-30,34,0,7);ctx.fill();ctx.stroke();for(const ex of[52,88]){ctx.beginPath();ctx.moveTo(ex-14,-55);ctx.lineTo(ex,-80);ctx.lineTo(ex+12,-55);ctx.fill();ctx.stroke()}
  ell(60,-34,8,9,'#ffe66b');ell(84,-34,8,9,'#ffe66b');ell(60,-34,2,7,'#111');ell(84,-34,2,7,'#111');ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(64,-14);ctx.lineTo(70,-6);ctx.lineTo(76,-14);ctx.stroke();
  ctx.strokeStyle=c;ctx.lineWidth=14;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-60,-10);ctx.quadraticCurveTo(-120,-60+Math.sin(t*12)*20,-100,-110);ctx.stroke();for(const lx of[-40,30])for(const k of[-1,1]){ctx.beginPath();ctx.moveTo(lx+k*8,24);ctx.lineTo(lx+k*8+Math.sin(t*20+lx)*10,60);ctx.stroke()}ctx.restore()}
function dogSki(x,y,s,t){ctx.save();ctx.translate(x,y+Math.sin(t*6)*6);ctx.scale(s,s);ctx.lineWidth=5;ctx.strokeStyle='#10243a';ctx.fillStyle='#ffd57a';ctx.beginPath();ctx.moveTo(-150,0);ctx.lineTo(140,0);ctx.quadraticCurveTo(180,-10,170,-40);ctx.lineTo(-120,-40);ctx.closePath();ctx.fill();ctx.stroke();
  for(let i=0;i<5;i++){const f=((t*1.5+i/5)%1);ctx.globalAlpha=0.6*(1-f);ell(-160-f*160,-10+Math.sin(i)*10,20+f*30,10+f*10,'#ffffff')}ctx.globalAlpha=1;
  ctx.fillStyle='#b5793e';ctx.beginPath();ctx.ellipse(10,-80,50,40,0,0,7);ctx.fill();ctx.stroke();ctx.beginPath();ctx.arc(60,-130,40,0,7);ctx.fill();ctx.stroke();ctx.beginPath();ctx.ellipse(28,-150,14,30,-0.5,0,7);ctx.fillStyle='#8a5a2a';ctx.fill();ctx.stroke();
  ctx.fillStyle='#5fd4ff';ctx.strokeStyle='#10243a';rr(48,-150,64,26,10);ctx.fill();ctx.stroke();ell(100,-112,10,8,'#10243a');ctx.strokeStyle='#ff5fa2';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(85,-95);ctx.quadraticCurveTo(95,-80+Math.sin(t*10)*6,92,-70);ctx.stroke();ctx.restore()}
const SCN={
 catcar(lt,p,t,d,seg){const k=nth(seg);still('jason_neon',t,k?0.5+p*0.5:p*0.5,{z0:1.02,z1:1.18,label:'GTA 6 SECRET',lc:SM.gold});
   if(!k){carSideSM(560,1230,1.15,t,{cat:0,shake:Math.sin(t*3)>0.6})}else{const j=ease(clamp(p*2.2,0,1));carSideSM(lerp(560,700,j),1230,1.15,t,{shake:true});cat(lerp(560,330,j),lerp(1100,1150,j)-Math.sin(j*Math.PI)*180,0.9,t,{rot:-0.3*(1-j)});smGuy(lerp(260,170,j),1250,1.1,t,{wow:1,look:0.2,dir:1})}},
 launch(lt,p,t,d,seg){still('vice_sign',t,p,{z0:1.0,z1:1.15,label:'OUT TODAY · NOV 19',lc:SM.cyan});smGuy(moveAlong(p,200,420),1260,1.15,t,{speed:p<0.9?1.5:0,look:-0.4});pad(780,1200,0.7,t,0.2);smTick(880,1230-Math.abs(Math.sin(t*7))*24,1.0,t,{hop:1,wow:1})},
 tower(lt,p,t,d,seg){const k=nth(seg);still('vice_aerial',t,k?0.5+p*0.5:p*0.5,{z0:1.0,z1:1.25,py:-0.08,label:'VICE CITY · TALLEST TOWER'});
   const pr=k?0.45+0.55*p:0.45*p;ctx.save();ctx.strokeStyle='#ffd57a';ctx.lineWidth=8;ctx.setLineDash([16,12]);ctx.beginPath();ctx.moveTo(200,1280);ctx.lineTo(200,1060);ctx.stroke();ctx.setLineDash([]);ctx.restore();
   smGuy(200+Math.sin(t*10)*4,1280-220*pr,0.55,t,{speed:1.6,look:-0.8});timer(620,1180,'0'+Math.floor(pr*6)+':'+String(Math.floor((pr*360)%60)).padStart(2,'0'),SM.gold)},
 nest(lt,p,t,d,seg){const k=nth(seg);still('vice_aerial',t,1,{z0:1.25,z1:1.35,py:-0.08,label:k?'SECRET CUTSCENE':'THE TOP',lc:k?'#ff5fa2':SM.gold});
   ctx.save();ctx.translate(540,1210);ctx.strokeStyle='#8a5a2a';ctx.lineWidth=9;for(let i=0;i<14;i++){ctx.beginPath();ctx.ellipse(0,0,150-i*2,48-i,i*0.2,0.1,Math.PI-0.1);ctx.stroke()}ctx.restore();
   if(!k){ell(540,1175,38,48,'#f7f1e0');ctx.strokeStyle='#10243a';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(540,1175,38,48,0,0,7);ctx.stroke();glow(540,1170,140,'rgba(255,240,200,A)',0.35+0.2*Math.sin(t*5))}
   else{const j=ease(clamp(p*1.6,0,1));const ex=540+j*260,ey=1175-Math.sin(j*Math.PI)*260+j*80;ctx.save();ctx.translate(ex,ey);ctx.rotate(j*8);ell(0,0,38,48,'#f7f1e0');ctx.strokeStyle='#10243a';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(0,0,38,48,0,0,7);ctx.stroke();ctx.restore();
     const e=lastEv(t,['chime']);if(e&&t-e.t<0.6){ctx.fillStyle=`rgba(255,255,255,${0.35*(1-(t-e.t)/0.6)})`;ctx.fillRect(0,0,W,H)}}
   smTick(860,1250-Math.abs(Math.sin(t*6))*20,1.0,t,{wow:1})},
 jetski(lt,p,t,d,seg){still('keys_aerial',t,p,{z0:1.0,z1:1.15,label:'LEONIDA KEYS'});dogSki(moveAlong(p,1250,520),1230,0.95,t);smGuy(180,1270,1.05,t,{wow:1,wave:Math.abs(Math.sin(t*4))})},
 choices(lt,p,t,d,seg){still('heist',t,p,{z0:1.0,z1:1.14,label:'CHOICES MATTER',lc:'#ff5fa2'});smGuy(300,1270,1.1,t,{look:-0.3,wow:0.4});smTick(780,1240,1.0,t,{wow:0.6,look:-0.4})},
 change(lt,p,t,d,seg){still('couple',t,p,{z0:1.0,z1:1.15,label:'JASON + LUCIA'});bar(160,1130,760,50,0.9-0.6*ease(p),p>0.6?'#ff5fa2':'#7fe38a','THEIR PERSONALITY')},
 noreturn(lt,p,t,d,seg){still('car_duo',t,p,{z0:1.05,z1:1.2,label:'POINT OF NO RETURN',lc:'#ff5fa2'});ctx.save();ctx.translate(540,1200);ctx.rotate(Math.sin(t*2)*0.04);rr(-190,-70,380,140,20);ctx.fillStyle='#ffffff';ctx.fill();ctx.strokeStyle='#10243a';ctx.lineWidth=6;ctx.stroke();ctx.fillStyle='#10243a';ctx.font='900 46px Inter';ctx.textAlign='center';ctx.fillText('NO U-TURN',0,16);ctx.restore()},
 wasted(lt,p,t,d,seg){still('motel',t,p,{z0:1.0,z1:1.15});const a=ease(clamp((p-0.45)*3,0,1));ctx.save();ctx.globalAlpha=a;ctx.fillStyle='rgba(0,0,0,0.35)';ctx.fillRect(30,350,W-60,710);ctx.font='900 140px Inter';ctx.textAlign='center';ctx.fillStyle='#ff3b3b';ctx.shadowColor='#000';ctx.shadowBlur=20;ctx.fillText('WASTED',540,750);ctx.restore();
   for(const [x,c] of[[360,'#ff3b3b'],[720,'#3b6bff']]){glow(x,1180,140,`rgba(${c==='#ff3b3b'?'255,59,59':'59,107,255'},A)`,Math.sin(t*12+(x>500?Math.PI:0))>0?0.7:0.1)}label(540,1200,'ARRESTED… OR WASTED',SM.gold,44)},
 prison(lt,p,t,d,seg){still('lucia_fight',t,p,{z0:1.0,z1:1.15,label:'LUCIA STARTS IN PRISON',lc:'#ff5fa2'});const sl=ease(clamp((p-0.4)*2,0,1));ctx.save();ctx.beginPath();ctx.rect(30,350,W-60,710);ctx.clip();for(let i=0;i<9;i++){ctx.fillStyle='rgba(140,150,170,0.9)';ctx.fillRect(70+i*115,lerp(-750,350,sl),20,710)}ctx.restore()},
 endq(lt,p,t,d,seg){still('jason_neon',t,p,{z0:1.1,z1:1.2,label:'YOUR CHOICE',lc:SM.cyan});carSideSM(640,1230,1.0,t,{cat:0,shake:Math.sin(t*3)>0.5});smGuy(250,1260,1.1,t,{look:0.1,point:0.6,wow:0.5});smEnd(seg,t)}
};
const CAM={catcar:[1.06,1],launch:[1,1.04],tower:[1,1.04],nest:[1,1.05],jetski:[1,1.04],choices:[1,1.04],change:[1,1.04],noreturn:[1,1.04],wasted:[1,1.05],prison:[1,1.05],endq:[1,1.03]};
