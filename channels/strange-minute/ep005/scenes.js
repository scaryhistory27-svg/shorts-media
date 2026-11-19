// Strange Minute #5 — What if GTA 6 broke the internet? (launch day Nov 19 2026) — Max + Tick, original art only (no game assets/logos)
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
const SCN={
 hook(lt,p,t,d,seg){sunsetNeon(t);neonSkyline(t,1210);palm(110,1230,1.1,t);palm(980,1240,1.0,t+1);
   ctx.save();const sh=lt>1.2?Math.sin(t*60)*6:0;ctx.translate(sh,0);console5(540,1000,1.9,t,{shake:lt>1.2?1:0.3});ctx.restore();
   ctx.save();ctx.translate(540,330);ctx.rotate(-0.06+Math.sin(t*3)*0.02);label(0,0,'GTA 6 · LAUNCH DAY',SM.gold,58);ctx.restore();
   for(let i=0;i<8;i++){const a=t*2+i*0.8,r2=220+60*Math.sin(t*3+i);ctx.font='800 40px Inter';ctx.fillStyle=i%2?NEON3:NEON1;ctx.globalAlpha=0.8;ctx.fillText(['ERROR','404','LAG','!!!'][i%4],540+Math.cos(a)*(r2+80)-40,760+Math.sin(a)*r2*0.7);ctx.globalAlpha=1}
   smGuy(200,1240,1.3,t,{wow:1,look:-0.3,point:0.7});smTick(860,1200-Math.abs(Math.sin(t*7))*26,1.2,t,{wow:1,hop:1})},
 calendar(lt,p,t,d,seg){daySky(t,0.25);ground(t,'#1d5a3a');calPage(330,620,1.0,'MAY',"26",'2026',{rot:-0.12,cross:ease(clamp(p*3,0,1)),col:'#9fb3c8'});
   const a=ease(clamp(p*2-0.4,0,1));ctx.save();ctx.globalAlpha=a;calPage(740,640+(1-a)*200,1.15,'NOV',"19",'2026',{rot:0.08,col:'#ff5fa2'});ctx.restore();
   smGuy(moveAlong(p,120,420),1230,1.3,t,{speed:p<0.9?1.6:0,look:-0.4,wow:a});smTick(900,1200-Math.abs(Math.sin(t*6))*20*a,1.1,t,{hop:a,wow:a})},
 midnight(lt,p,t,d,seg){spaceBg(t);const ex=540,ey=760;earth(ex,ey,300,t*3,0.2);const ang=t*0.9;ctx.save();ctx.translate(ex,ey);ctx.beginPath();ctx.arc(0,0,300,0,7);ctx.clip();ctx.rotate(ang);
   ctx.fillStyle='rgba(5,10,30,0.55)';ctx.fillRect(0,-320,330,640);ctx.strokeStyle='#ffd57a';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(0,-310);ctx.lineTo(0,310);ctx.stroke();ctx.restore();
   const r=rnd(8);for(let i=0;i<40;i++){const a2=r()*Math.PI*2,rr2=r()*270;const x=ex+Math.cos(a2)*rr2,y=ey+Math.sin(a2)*rr2;const on=Math.sin(t*4+i)>0.2;if(on)glow(x,y,22,'rgba(95,212,255,A)',0.9)}
   label(540,1180,'12:00 AM → 12:00 AM → 12:00 AM',SM.gold,40)},
 trailer(lt,p,t,d,seg){const k=nth(seg);sunsetNeon(t,0.6);neonSkyline(t,1260);ctx.save();ctx.translate(540,700);ctx.rotate(-0.05);rr(-230,-420,460,840,50);ctx.fillStyle='#10131c';ctx.fill();ctx.strokeStyle='#2b3550';ctx.lineWidth=10;ctx.stroke();
   rr(-200,-380,400,240,16);const g=ctx.createLinearGradient(0,-380,0,-140);g.addColorStop(0,'#c2407a');g.addColorStop(1,'#ffb35c');ctx.fillStyle=g;ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(-26,-300);ctx.lineTo(34,-260);ctx.lineTo(-26,-220);ctx.fill();
   const v=k?90:Math.floor(90*ease(clamp(p*1.2,0,1)));ctx.textAlign='center';ctx.fillStyle='#fff';ctx.font='900 92px Inter';ctx.fillText(v+',000,000',0,-20);ctx.font='700 40px Inter';ctx.fillStyle='#9fb3c8';ctx.fillText('views · 24 hours',0,40);
   if(k){ctx.save();ctx.translate(0,200);ctx.rotate(Math.sin(t*3)*0.05);ctx.scale(1+0.05*Math.sin(t*6),1+0.05*Math.sin(t*6));label(0,0,'NON-MUSIC RECORD',SM.gold,46);ctx.restore()}ctx.restore();
   smTick(900,1260-Math.abs(Math.sin(t*6))*30,1.1,t,{wow:1,hop:1})},
 money(lt,p,t,d,seg){const k=nth(seg);ctx.fillStyle='#071a33';ctx.fillRect(-100,-100,W+200,H+200);stars(t,0.5);
   for(let i=0;i<14;i++){const f=((t*0.4+i/14)%1);const x=120+((i*137)%840),y=200+f*900;ctx.save();ctx.translate(x,y);ctx.rotate(t*2+i);ctx.fillStyle='#7fe38a';rr(-40,-20,80,40,6);ctx.fill();ctx.fillStyle='#2e8a48';ctx.font='900 26px Inter';ctx.textAlign='center';ctx.fillText('$',0,9);ctx.restore()}
   label(540,420,k?'≈ $1.8 BILLION':'≈ 19,000,000 COPIES',SM.gold,60);label(540,530,'ESTIMATE · SENSOR TOWER',SM.cyan,30);
   smGuy(360,1230,1.4,t,{wow:1,look:-0.4,wave:k?0:Math.abs(Math.sin(t*3))});smTick(760,1200-Math.abs(Math.sin(t*8))*26,1.2,t,{wow:1,hop:1})},
 record(lt,p,t,d,seg){ctx.fillStyle='#071a33';ctx.fillRect(-100,-100,W+200,H+200);stars(t,0.4);const a=ease(clamp(p*1.5,0,1));
   bar(160,520,760,70,0.45*a,'#5fd4ff','GTA 5 · DAY ONE (2013) · $815.7M');bar(160,720,760,70,Math.min(1,a*1.2),'#ff5fa2','GTA 6 · PRE-ORDERS (EST.) · ~$1.8B');
   ctx.save();ctx.translate(540,1000);ctx.rotate(Math.sin(t*2)*0.05);ctx.fillStyle='#ffd57a';ctx.strokeStyle='#10243a';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(-80,-120);ctx.lineTo(80,-120);ctx.quadraticCurveTo(80,20,0,30);ctx.quadraticCurveTo(-80,20,-80,-120);ctx.fill();ctx.stroke();rr(-20,30,40,50,6);ctx.fill();ctx.stroke();rr(-70,80,140,30,8);ctx.fill();ctx.stroke();glow(0,-50,220,'rgba(255,213,122,A)',0.3);ctx.restore();
   smTick(860,1230-Math.abs(Math.sin(t*6))*20,1.0,t,{wow:1})},
 stack(lt,p,t,d,seg){daySky(t,0.3);ground(t,'#1d5a3a');const n=Math.floor(4+ease(p)*16);for(let i=0;i<n;i++){const x=270+(i%4)*180,y=1150-Math.floor(i/4)*120;ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(i)*0.05);rr(-75,-55,150,110,10);ctx.fillStyle=i%2?'#2b3550':'#3d4a6b';ctx.fill();ctx.strokeStyle='#10243a';ctx.lineWidth=5;ctx.stroke();ctx.fillStyle='#ffd57a';ctx.font='900 30px Inter';ctx.textAlign='center';ctx.fillText('GTA 5',0,10);ctx.restore()}
   label(540,360,'230,000,000+ COPIES',SM.gold,58);smGuy(moveAlong(p,1050,985),1230,1.2,t,{speed:p<0.8?1.4:0,dir:-1,look:-0.6,wow:0.7})},
 servers(lt,p,t,d,seg){ctx.fillStyle='#08101e';ctx.fillRect(-100,-100,W+200,H+200);for(let i=0;i<5;i++)serverRack(140+i*200,1150,1.0,t,true);
   ctx.save();ctx.translate(540,520);ctx.scale(1+0.03*Math.sin(t*8),1+0.03*Math.sin(t*8));rr(-300,-110,600,220,30);ctx.fillStyle='rgba(60,10,20,0.92)';ctx.fill();ctx.strokeStyle='#ff4d4d';ctx.lineWidth=6;ctx.stroke();ctx.fillStyle='#ff6b6b';ctx.font='900 58px Inter';ctx.textAlign='center';ctx.fillText('SIGN-IN ERROR',0,-10);ctx.fillStyle='#ffd0d0';ctx.font='700 32px Inter';ctx.fillText('please try again later…',0,50);ctx.restore();
   const e=lastEv(t,['pop']);if(e&&t-e.t<0.4){ctx.fillStyle='rgba(255,60,60,0.15)';ctx.fillRect(0,0,W,H)}
   smGuy(320,1300,1.3,t,{wow:1,look:-0.2});pad(420,1150,0.6,t,0.3);smTick(800,1270-Math.abs(Math.sin(t*9))*20,1.1,t,{wow:1})},
 years(lt,p,t,d,seg){const k=nth(seg);daySky(t,0.2);ground(t,'#1d5a3a');calPage(540,560,0.95,k?'2026':'2013',k?'13':'GTA 5',k?'YEARS LATER':'RELEASE',{col:k?'#ff5fa2':'#5fd4ff'});
   if(!k){smGuy(540,1230,0.75,t,{look:-0.4,wow:0.5})}else{const g2=ease(clamp(p*1.5,0,1));smGuy(lerp(540,420,g2),1230,lerp(0.75,1.4,g2),t,{look:-0.4,wow:0.6});pad(470,1050,0.6*lerp(0.75,1.4,g2)/1.4,t,0.2)}
   smTick(860,1200,1.1,t,{look:-0.5,wow:k?1:0.3})},
 endq(lt,p,t,d,seg){sunsetNeon(t,0.5);ctx.fillStyle='rgba(10,5,30,0.55)';ctx.fillRect(-100,-100,W+200,1400);neonSkyline(t,1210);
   ctx.save();ctx.translate(540,640);rr(-330,-200,660,400,20);ctx.fillStyle='#0b0f1c';ctx.fill();ctx.strokeStyle='#2b3550';ctx.lineWidth=12;ctx.stroke();const g=ctx.createLinearGradient(-310,-180,310,180);g.addColorStop(0,'#c2407a');g.addColorStop(1,'#ffb35c');rr(-310,-180,620,360,10);ctx.fillStyle=g;ctx.fill();
   for(let i=0;i<5;i++){ctx.fillStyle='#1b1040';ctx.fillRect(-310+((i*150+t*120)%620),40-i*14,60,140)}ctx.fillStyle='#fff';ctx.font='900 46px Inter';ctx.textAlign='center';ctx.fillText('PRESS START',0,-60+Math.sin(t*6)*4);ctx.restore();glow(540,640,520,'rgba(255,140,120,A)',0.15);
   ctx.fillStyle='#3a2a55';rr(160,1040,760,170,40);ctx.fill();smGuy(440,1230,1.3,t,{look:-0.3});pad(560,1060,0.8,t,0.1);smTick(800,1200-Math.abs(Math.sin(t*5))*16,1.1,t,{wow:0.6});smEnd(seg,t)}
};
const CAM={hook:[1.08,1],calendar:[1,1.05],midnight:[1,1.06],trailer:[1,1.06],money:[1,1.05],record:[1,1.05],stack:[1,1.06],servers:[1,1.05],years:[1,1.06],endq:[1,1.04]};
