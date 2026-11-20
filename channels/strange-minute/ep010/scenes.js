// Strange Minute #10 — What if you did not sleep for 11 days? (Randy Gardner 1964) — Max + Tick, format v2
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
function bedroom(t,dark=0.6){const g=ctx.createLinearGradient(0,0,0,1300);g.addColorStop(0,'#1b2a4a');g.addColorStop(1,'#2e3f66');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,1400);
  ctx.fillStyle='#0b1630';rr(620,300,320,380,10);ctx.fill();stars(t,0.8);bigMoon(780,430,60,1);ctx.strokeStyle='#5a6a8a';ctx.lineWidth=12;rr(620,300,320,380,10);ctx.stroke();
  ctx.fillStyle='#3a4a6e';ctx.fillRect(-100,1150,W+200,900);ctx.fillStyle='#5a6a9a';rr(80,1000,520,170,20);ctx.fill();ctx.fillStyle='#e9eefc';rr(100,960,160,70,24);ctx.fill();
  if(dark)ctx.fillStyle=`rgba(5,10,25,${dark*0.4})`,ctx.fillRect(-100,-100,W+200,H+200)}
function dayCounter(x,y,n,col=SM.gold){timer(x,y,'DAY '+n,col)}
const SCN={
 hook(lt,p,t,d,seg){bedroom(t,0.3);const sh=Math.sin(t*30)*3;smGuy(560+sh,1240,1.5,t,{wow:1,look:0});for(const sx of[-1,1]){ctx.save();ctx.translate(560+sx*28,1240-1.5*262);ctx.fillStyle='rgba(120,0,0,0.35)';ctx.beginPath();ctx.ellipse(0,18,26,8,0,0,7);ctx.fill();ctx.restore()}
   dayCounter(300,500,11,'#ff5fa2');smTick(860,1210-Math.abs(Math.sin(t*9))*24,1.2,t,{wow:1,hop:1})},
 teen(lt,p,t,d,seg){bedroom(t,0);smGuy(moveAlong(p,140,420),1240,1.4,t,{speed:p<0.85?1.5:0,look:-0.2,wave:p>0.85?1:0});timer(780,520,'1964',SM.cyan);label(540,820,'AGE 17 · SCIENCE FAIR',SM.gold,40)},
 blur(lt,p,t,d,seg){bedroom(t,0.3);ctx.save();ctx.filter=`blur(${4+4*Math.sin(t*3)}px)`;smGuy(560,1240,1.5,t,{look:0.1,wow:0.4});ctx.restore();ctx.save();ctx.globalAlpha=0.35;smGuy(590,1240,1.5,t,{look:0.1});ctx.restore();dayCounter(540,500,2)},
 halluc(lt,p,t,d,seg){const k=nth(seg);bedroom(t,0.5);dayCounter(300,460,4,'#ff5fa2');
   if(!k){const a=ease(clamp(p*1.5,0,1));ctx.save();ctx.translate(820,1200);ctx.fillStyle='#8a93a6';ctx.fillRect(-8,-420,16,420);ctx.fillStyle='#2e8a48';rr(-110,-470,220,90,10);ctx.fill();ctx.fillStyle='#fff';ctx.font='900 40px Inter';ctx.textAlign='center';ctx.fillText('MAIN ST',0,-412);ctx.restore();
     ctx.save();ctx.globalAlpha=a;ctx.translate(820,1200);ell(0,-500,40,46,'#e0b08c');ell(-14,-506,6,8,'#111');ell(14,-506,6,8,'#111');ctx.restore();smGuy(360,1240,1.4,t,{wow:1,look:0,point:0.8})}
   else{smGuy(480,1240,1.5,t,{look:-0.2,wave:Math.abs(Math.sin(t*4))});ctx.save();ctx.translate(480,1240-1.5*262-30);ctx.fillStyle='#ff5fa2';ctx.beginPath();ctx.arc(0,0,70,Math.PI*1.05,Math.PI*1.95);ctx.lineTo(70,10);ctx.lineTo(-70,10);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(-60,-10);ctx.lineTo(60,-10);ctx.stroke();ctx.restore();
     for(let i=0;i<6;i++){const f=(t*0.7+i/6)%1;ctx.globalAlpha=1-f;label(150+i*160,1000-f*400,'★',SM.gold,30);ctx.globalAlpha=1}}},
 math(lt,p,t,d,seg){bedroom(t,0.6);dayCounter(300,460,11,'#ff5fa2');ctx.save();ctx.translate(540,760);rr(-330,-170,660,340,20);ctx.fillStyle='#14362a';ctx.fill();ctx.strokeStyle='#8a6a42';ctx.lineWidth=14;ctx.stroke();
   const seq=['100','93','86','79','72','65','...?'];const n=Math.min(seq.length,1+Math.floor(p*9));ctx.fillStyle='#f2f2e8';ctx.font='700 52px "JetBrains Mono"';ctx.textAlign='center';ctx.fillText(seq.slice(0,n).join('  '),0,10);ctx.restore();smGuy(540,1270,1.3,t,{look:-0.5,wow:p>0.7?1:0.3})},
 pinball(lt,p,t,d,seg){bedroom(t,0.2);ctx.save();ctx.translate(540,800);rr(-260,-300,520,600,30);ctx.fillStyle='#3a1a5a';ctx.fill();ctx.strokeStyle='#ff5fa2';ctx.lineWidth=10;ctx.stroke();for(let i=0;i<5;i++)ell(-150+i*75,-150+(i%2)*60,26,26,Math.sin(t*8+i)>0?'#ffd57a':'#5fd4ff');
   const bx=Math.sin(t*5)*200,by=Math.cos(t*3.3)*220;ell(bx,by,18,18,'#e9eefc');ctx.restore();label(540,440,'DAY 10 · WIN!',SM.gold,48);smGuy(260,1260,1.2,t,{wave:1,wow:0.5});smTick(860,1230-Math.abs(Math.sin(t*8))*24,1.0,t,{hop:1,wow:1})},
 sleep(lt,p,t,d,seg){bedroom(t,0.7);ctx.save();ctx.translate(600,1000);ctx.rotate(-1.45);smGuy(0,0,1.1,t,{look:0});ctx.restore();for(let i=0;i<3;i++){const f=(t*0.5+i/3)%1;ctx.globalAlpha=1-f;ctx.fillStyle='#e9eefc';ctx.font=`900 ${50+i*14}px Inter`;ctx.fillText('Z',420+f*120+i*30,880-f*260);ctx.globalAlpha=1}timer(780,520,'264 H AWAKE',SM.cyan);label(540,780,'SLEPT ~14 HOURS',SM.gold,44)},
 record(lt,p,t,d,seg){bedroom(t,0.4);ctx.save();ctx.translate(540,760);ctx.rotate(-0.05);rr(-260,-200,520,400,16);ctx.fillStyle='#1d4f7a';ctx.fill();ctx.fillStyle='#ffd57a';ctx.font='900 46px Inter';ctx.textAlign='center';ctx.fillText('RECORD BOOK',0,-110);ctx.fillStyle='#fff';ctx.font='700 34px Inter';ctx.fillText('Longest time awake',0,-40);
   const a=ease(clamp(p*2,0,1));ctx.save();ctx.rotate(-0.25);ctx.scale(2-a,2-a);ctx.globalAlpha=a;ctx.strokeStyle='#ff3b3b';ctx.lineWidth=10;rr(-220,20,440,110,12);ctx.stroke();ctx.fillStyle='#ff3b3b';ctx.font='900 54px Inter';ctx.fillText('CLOSED',0,98);ctx.restore();ctx.restore();smGuy(860,1260,1.1,t,{look:-0.4,wow:0.6,dir:-1})},
 insomnia(lt,p,t,d,seg){bedroom(t,0.8);timer(780,520,'3:'+String(Math.floor(t*4)%60).padStart(2,'0')+' AM','#ff5fa2');ctx.save();ctx.translate(330,1040);smGuy(0,200,1.2,t,{look:-0.8,wow:0.3});ctx.restore();ctx.fillStyle='#5a6a9a';rr(80,1080,520,90,20);ctx.fill()},
 endq(lt,p,t,d,seg){bedroom(t,0.4);dayCounter(540,520,'?','#ff5fa2');smGuy(400,1240,1.4,t,{look:0,point:0.8,wow:0.6});smTick(800,1210-Math.abs(Math.sin(t*5))*18,1.2,t,{wow:1});smEnd(seg,t)}
};
const CAM={hook:[1.08,1],teen:[1,1.04],blur:[1,1.06],halluc:[1,1.05],math:[1,1.05],pinball:[1,1.05],sleep:[1,1.06],record:[1,1.05],insomnia:[1,1.06],endq:[1,1.03]};
