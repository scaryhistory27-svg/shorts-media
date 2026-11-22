// Strange Minute #13: What if you texted Voyager 1? (helpers copied from ep012)
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
function jupiter(x,y,r,t,o={}){ctx.save();glow(x,y,r*1.6,'rgba(255,200,140,A)',0.25);ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.clip();const cols=['#e9d2b0','#c99a6a','#f2e2c6','#b8784a','#e6c9a0','#a86a42','#f0dcc0','#c48a5a'];
  for(let i=0;i<16;i++){const yy=y-r+i*(2*r/16);ctx.fillStyle=cols[i%cols.length];ctx.beginPath();ctx.moveTo(x-r,yy);for(let xx=-r;xx<=r;xx+=20)ctx.lineTo(x+xx,yy+6*Math.sin((xx+t*40*(i%2?1:-1))*0.02+i));ctx.lineTo(x+r,yy+2*r/16+8);ctx.lineTo(x-r,yy+2*r/16+8);ctx.fill()}
  ctx.fillStyle='#c0503a';ctx.beginPath();ctx.ellipse(x+r*0.3,y+r*0.35,r*0.22,r*0.12,0,0,7);ctx.fill();ctx.strokeStyle='rgba(255,240,220,0.5)';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(x+r*0.3,y+r*0.35,r*0.15,r*0.07,t,0,5);ctx.stroke();
  const sh=ctx.createLinearGradient(x-r,0,x+r,0);sh.addColorStop(0,'rgba(0,0,0,0)');sh.addColorStop(0.7,'rgba(0,0,0,0.15)');sh.addColorStop(1,'rgba(0,0,20,0.6)');ctx.fillStyle=sh;ctx.fillRect(x-r,y-r,2*r,2*r);ctx.restore()}
function probe(x,y,s,t,heat){ctx.save();ctx.translate(x,y);ctx.scale(s,s);if(heat>0){for(let i=0;i<10;i++){const f=(t*3+i/10)%1;ctx.globalAlpha=heat*(1-f);ell(0,-60-f*260,40+f*60,30+f*40,i%2?'#ffb347':'#ff6a3d')}ctx.globalAlpha=1;glow(0,-40,200,'rgba(255,140,60,A)',0.8*heat)}
  ctx.fillStyle='#8a5a3a';ctx.beginPath();ctx.moveTo(-90,-20);ctx.quadraticCurveTo(0,-110,90,-20);ctx.closePath();ctx.fill();ctx.strokeStyle='#10243a';ctx.lineWidth=5;ctx.stroke();ctx.fillStyle='#c9d2dc';rr(-60,-20,120,70,14);ctx.fill();ctx.stroke();ell(0,15,14,14,Math.sin(t*6)>0?'#5fd4ff':'#1b4a6b');ctx.restore()}
function cloudLayer(t,y,col,sp,a=1){ctx.globalAlpha=a;for(let i=0;i<7;i++){const x=((i*220+t*sp)%(W+400))-200;ell(x,y+Math.sin(i)*30,170,60,col);ell(x+90,y-25,110,50,col)}ctx.globalAlpha=1}

function rock(x,y,r,t,col='#8a7a6a',seed=1){ctx.save();ctx.translate(x,y);ctx.rotate(t*0.2*seed);const rr2=rnd(seed);ctx.beginPath();for(let i=0;i<14;i++){const a=i/14*Math.PI*2,R=r*(0.82+rr2()*0.3);i?ctx.lineTo(Math.cos(a)*R,Math.sin(a)*R):ctx.moveTo(Math.cos(a)*R,Math.sin(a)*R)}ctx.closePath();
  const g=ctx.createRadialGradient(-r*0.3,-r*0.3,r*0.1,0,0,r);g.addColorStop(0,'#d8c8b0');g.addColorStop(1,col);ctx.fillStyle=g;ctx.fill();ctx.lineWidth=5;ctx.strokeStyle='#10243a';ctx.stroke();
  for(let i=0;i<5;i++)ell((rr2()-0.5)*r,(rr2()-0.5)*r,r*0.12,r*0.09,'rgba(60,50,40,0.45)');ctx.restore()}
function pair(t,cx,cy,s,ang){rock(cx,cy,180*s,t,'#7a6a5a',2);const a=ang??t*0.9;rock(cx+Math.cos(a)*330*s,cy+Math.sin(a)*120*s,55*s,t,'#8a7a6a',5);
  ctx.strokeStyle='rgba(95,212,255,0.5)';ctx.setLineDash([12,10]);ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(cx,cy,330*s,120*s,0,0,7);ctx.stroke();ctx.setLineDash([])}
function vend(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.lineWidth=5;ctx.strokeStyle='#10243a';rr(-70,-160,140,320,14);ctx.fillStyle='#ff5fa2';ctx.fill();ctx.stroke();ctx.fillStyle='#bfe9ff';rr(-50,-130,70,200,8);ctx.fill();ctx.stroke();for(let i=0;i<4;i++){ell(40,-110+i*40,10,10,'#ffd57a')}ctx.restore()}
// Voyager: big dish, bus, RTG boom, magnetometer boom
function voyager(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(Math.sin(t*0.4)*0.04);
  ctx.strokeStyle='#c9ced8';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(30,40);ctx.lineTo(260,150);ctx.moveTo(-30,40);ctx.lineTo(-330,-60);ctx.stroke();
  ctx.fillStyle='#8a6a3a';rr(230,135,70,40,8);ctx.fill();ell(-330,-60,10,10,'#c9ced8');
  ctx.fillStyle='#b8a06a';rr(-55,10,110,70,8);ctx.fill();ell(0,95,22,22,'#ffd57a');glow(0,95,40,'rgba(255,213,122,A)',0.4); // golden record
  ctx.fillStyle='#e8ecf2';ctx.beginPath();ctx.ellipse(0,0,160,48,0,Math.PI,0,true);ctx.fill();ctx.fillStyle='#cfd6e2';ctx.beginPath();ctx.ellipse(0,0,160,22,0,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#9aa4b4';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(0,-4);ctx.lineTo(0,-60);ctx.stroke();ell(0,-62,8,8,'#9aa4b4');
  if(o.beep){const f=(t*1.2)%1;ctx.strokeStyle=`rgba(95,212,255,${1-f})`;ctx.lineWidth=5;ctx.beginPath();ctx.arc(0,-60,30+f*120,-2.4,-0.7);ctx.stroke()}
  ctx.restore()}
function dish(x,y,s,t){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#d8dee8';ctx.fillRect(-20,0,40,160);ctx.fillRect(-90,150,180,30);ctx.save();ctx.rotate(-0.5+Math.sin(t*0.3)*0.05);ctx.beginPath();ctx.ellipse(0,-20,170,60,0,0,Math.PI);ctx.fillStyle='#eef2f8';ctx.fill();ctx.strokeStyle='#9aa4b4';ctx.lineWidth=5;ctx.stroke();ctx.beginPath();ctx.moveTo(0,30);ctx.lineTo(0,-110);ctx.stroke();ell(0,-112,10,10,'#9aa4b4');ctx.restore();ctx.restore()}
function textBubble(x,y,txt,mine,a=1){ctx.save();ctx.globalAlpha=a;ctx.font='800 44px Inter';const w=ctx.measureText(txt).width+60;rr(mine?x-w:x,y-40,w,80,36);ctx.fillStyle=mine?'#2f8cff':'#e8ecf2';ctx.fill();ctx.fillStyle=mine?'#fff':'#10243a';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(txt,mine?x-w/2:x+w/2,y+2);ctx.restore()}
function lightPulse(x0,y0,x1,y1,f,col='95,212,255'){const x=lerp(x0,x1,f),y=lerp(y0,y1,f);glow(x,y,60,`rgba(${col},A)`,0.9);ell(x,y,12,12,'#fff')}
const SCN={
 hook(lt,p,t,d,seg){spaceBg(t);voyager(700,560,1.2,t,{beep:true});phone(330,900,0.62,-0.12,()=>{ctx.fillStyle='#0b1626';ctx.fillRect(-200,-400,400,800);ctx.font='800 38px Inter';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText('VOYAGER 1',0,-300);textBubble(150,-120,'hi 👋',true,ease(clamp(p*3,0,1)))});
   label(540,300,'TEXT VOYAGER 1?',SM.gold,58);smTick(880,1060-Math.abs(Math.sin(t*6))*20,0.9,t,{wow:1})},
 record(lt,p,t,d,seg){spaceBg(t);earth(180,1250,120,t);voyager(lerp(700,820,ease(p)),560,0.9,t);ctx.strokeStyle='rgba(255,255,255,0.5)';ctx.lineWidth=5;ctx.setLineDash([16,12]);ctx.beginPath();ctx.moveTo(260,1160);ctx.lineTo(lerp(680,800,ease(p)),640);ctx.stroke();ctx.setLineDash([]);label(540,300,'NEW RECORD · NOV 18',SM.gold,52);smAstro(860,1180+Math.sin(t*2)*10,0.8,t)},
 lightday(lt,p,t,d,seg){spaceBg(t);earth(180,1100,110,t);voyager(880,560,0.6,t);ctx.strokeStyle='rgba(255,213,122,0.6)';ctx.lineWidth=4;ctx.setLineDash([12,10]);ctx.beginPath();ctx.moveTo(260,1040);ctx.lineTo(840,600);ctx.stroke();ctx.setLineDash([]);lightPulse(260,1040,840,600,(t*0.35)%1,'255,213,122');label(540,880,'1 LIGHT-DAY',SM.gold,64);timer(540,300,'24:00:00',SM.cyan)},
 send(lt,p,t,d,seg){const k=nth(seg);spaceBg(t);earth(230,1120,110,t);voyager(820,560,0.6,t,{beep:k===2});const f=k===0?ease(p)*0.5:k===1?0.5+ease(p)*0.5:1-ease(p);lightPulse(260,1040,840,600,f,k===2?'255,95,162':'95,212,255');
   timer(540,300,k===0?'00:00:01 … 12:00:00':k===1?'24:00:00 · ARRIVED':'+24:00:00 BACK',k===2?'#ff5fa2':SM.cyan);textBubble(k===2?620:520,1560,k===2?'hi back 👋':'hi 👋',k!==2);smGuy(860,1750,0.9,t,{hood:'#ff8a3d'})},
 total(lt,p,t,d,seg){daySky(t,0.2);ground(t);phone(540,860,1.0,0,()=>{ctx.fillStyle='#0b1626';ctx.fillRect(-200,-400,400,800);textBubble(150,-200,'hi 👋',true);ctx.font='700 28px Inter';ctx.fillStyle='#8aa';ctx.textAlign='center';ctx.fillText('MONDAY',0,-110);const a=clamp((p-0.3)*3,0,1);ctx.fillText('WEDNESDAY',0,-10);textBubble(-150,80,'hi back 👋',false,a)});label(540,300,'2 DAYS PER "HI"','#ff5fa2',58);smTick(880,1500-Math.abs(Math.sin(t*5))*16,0.9,t,{wow:0.6})},
 launch(lt,p,t,d,seg){spaceBg(t);const y=lerp(1500,500,ease(p));ctx.fillStyle='#eef2f8';rr(500,y-200,80,300,30);ctx.fill();ctx.fillStyle='#ff6a3d';ctx.beginPath();ctx.moveTo(500,y-200);ctx.lineTo(540,y-280);ctx.lineTo(580,y-200);ctx.fill();for(let i=0;i<8;i++){const f=(t*3+i/8)%1;ctx.globalAlpha=1-f;ell(540,y+120+f*300,30+f*50,30+f*40,i%2?'#ffb347':'#ff6a3d')}ctx.globalAlpha=1;label(540,300,'SEPT 5, 1977',SM.gold,58);timer(540,1700,'49 YEARS',SM.cyan)},
 speed(lt,p,t,d,seg){spaceBg(t);streaks(t,1.6,'255,255,255',200,1300);voyager(540,760,1.2,t);label(540,300,'38,000 MPH',SM.gold,64);label(540,1200,'16 BILLION MILES',SM.cyan,52)},
 bulb(lt,p,t,d,seg){spaceBg(t);voyager(330,700,0.9,t,{beep:true});const on=0.7+0.3*Math.sin(t*4);ctx.save();ctx.translate(780,720);glow(0,0,200,'rgba(255,240,180,A)',0.7*on);ell(0,0,80,95,'#fff4c8');ctx.fillStyle='#9aa4b4';rr(-40,80,80,70,10);ctx.fill();ctx.restore();ctx.font='900 90px Inter';ctx.fillStyle=SM.gold;ctx.textAlign='center';ctx.fillText('≈',560,740);label(540,300,'~23 WATTS',SM.gold,60)},
 hear(lt,p,t,d,seg){daySky(t,0.6);ground(t);dish(540,1100,1.6,t);const f=(t*0.5)%1;ctx.strokeStyle=`rgba(95,212,255,${1-f})`;ctx.lineWidth=6;ctx.beginPath();ctx.arc(700,500,40+f*200,2.0,3.4);ctx.stroke();label(540,300,'230-FOOT DISHES',SM.cyan,54);smAstro(200,1560+Math.sin(t*2)*8,0.7,t)},
 golden(lt,p,t,d,seg){spaceBg(t);ctx.save();ctx.translate(540,800);ctx.rotate(t*0.3);ell(0,0,300,300,'#d8a83a');ell(0,0,280,280,'#ffd57a');ctx.strokeStyle='rgba(120,80,20,0.4)';ctx.lineWidth=3;for(let r=60;r<280;r+=18){ctx.beginPath();ctx.arc(0,0,r,0,7);ctx.stroke()}ell(0,0,50,50,'#b8862a');ctx.restore();glow(540,800,400,'rgba(255,213,122,A)',0.25);label(540,300,'THE GOLDEN RECORD',SM.gold,54);smGuy(880,1450,0.9,t,{hood:'#ff8a3d'})},
 ask(lt,p,t,d,seg){spaceBg(t);earth(540,1350,300,t);voyager(540,560,0.8,t,{beep:true});phone(820,1080,0.4,0.15,()=>{ctx.fillStyle='#0b1626';ctx.fillRect(-200,-400,400,800);ctx.font='900 120px Inter';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText('?',0,40)});smTick(240,1100-Math.abs(Math.sin(t*5))*16,0.9,t,{wow:0.6});smEnd(seg,t)}
};
const CAM={hook:[1.06,1.0],record:[1,1.05],lightday:[1,1.05],send:[1,1.04],total:[1,1.05],launch:[1,1.05],speed:[1,1.06],bulb:[1,1.05],hear:[1,1.05],golden:[1,1.04],ask:[1,1.05]};
