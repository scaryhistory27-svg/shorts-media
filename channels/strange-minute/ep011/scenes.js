// Strange Minute #11 — What if you stood on Mars without a suit? (helpers from #8) — astronaut + Tick + Max (light style)
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
function mars(t,o={}){const g=ctx.createLinearGradient(0,0,0,1200);g.addColorStop(0,o.dark?'#2a1410':'#c98a5e');g.addColorStop(1,o.dark?'#5a2a1a':'#e8b48a');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,1400);
  // small pale sun + dust
  ell(820,330,36,36,'rgba(255,245,225,0.9)');glow(820,330,160,'rgba(255,230,200,A)',0.3);
  ctx.fillStyle='#a8583a';ctx.beginPath();ctx.moveTo(-100,1080);for(let x=-100;x<=W+100;x+=60)ctx.lineTo(x,1000-60*Math.sin(x*0.006+1)-40*Math.sin(x*0.017));ctx.lineTo(W+100,1400);ctx.lineTo(-100,1400);ctx.fill();
  ctx.fillStyle='#c06a44';ctx.beginPath();ctx.moveTo(-100,1180);ctx.quadraticCurveTo(540,1120,W+100,1180);ctx.lineTo(W+100,H+100);ctx.lineTo(-100,H+100);ctx.fill();
  const r=rnd(9);for(let i=0;i<14;i++){const x=r()*W,y=1200+r()*600;ell(x,y,20+r()*40,8+r()*14,'#8e4528')}
  for(let i=0;i<30;i++){const x=(r()*W+t*(60+r()*80))%(W+40)-20,y=600+r()*700;ell(x,y,2.5,2.5,'rgba(255,210,170,0.5)')}}
function lander(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.lineWidth=5;ctx.strokeStyle='#10243a';ctx.fillStyle='#e8eef2';rr(-90,-160,180,130,20);ctx.fill();ctx.stroke();ctx.fillStyle='#5fd4ff';ell(0,-100,32,32,'#5fd4ff');ctx.beginPath();ctx.moveTo(-80,-30);ctx.lineTo(-130,40);ctx.moveTo(80,-30);ctx.lineTo(130,40);ctx.stroke();ctx.restore()}
const SCN={
 hook(lt,p,t,d,seg){mars(t);lander(220,1080,1.0);smGuy(moveAlong(clamp(p*1.3,0,1),360,560),1150,1.5,t,{speed:p<0.75?1.2:0,hood:'#ff8a3d'});label(540,300,'NO SPACESUIT?!',SM.gold,58);smTick(860,930-Math.abs(Math.sin(t*6))*20,0.9,t,{wow:1})},
 air(lt,p,t,d,seg){const k=nth(seg);mars(t);smGuy(540,1150,1.5,t,{hood:'#ff8a3d'});if(!k){for(let i=0;i<16;i++){const a=i*0.9+t*0.5,R=200+((t*60+i*40)%260);ctx.font='800 34px Inter';ctx.fillStyle='rgba(255,255,255,0.75)';ctx.textAlign='center';ctx.fillText('CO₂',540+Math.cos(a)*R,760+Math.sin(a)*R*0.6)}label(540,300,'95% CO₂',SM.gold,64)}
   else{bar(150,420,780,52,1,'#5fd4ff','EARTH AIR · 100%');bar(150,560,780,52,0.01+0.005*Math.sin(t*4),'#ff5fa2','MARS AIR · 0.6%')}},
 lungs(lt,p,t,d,seg){mars(t);const sh=Math.sin(t*30)*4;smGuy(540+sh,1150,1.6,t,{hood:'#ff8a3d'});for(let i=0;i<14;i++){const f=((t*1.6+i/14)%1);ell(560+f*360,700+Math.sin(i*3)*60*f,8+f*14,8+f*14,`rgba(255,255,255,${0.7*(1-f)})`)}label(540,300,'AIR RUSHES OUT',SM.cyan,54)},
 boil(lt,p,t,d,seg){ctx.fillStyle='#2a1410';ctx.fillRect(-100,-100,W+200,H+200);glow(540,760,600,'rgba(255,120,80,A)',0.2);
   // big mouth/tongue close-up with bubbles
   ell(540,760,330,230,'#5a1a1a');ell(540,860,250,120,'#e06a7a');const r=rnd(3);for(let i=0;i<26;i++){const ph=(t*1.4+r())%1;const x=330+r()*420,y=860-ph*260;ell(x,y,6+ph*16,6+ph*16,`rgba(255,255,255,${0.8*(1-ph)})`)}
   ctx.fillStyle='#fff';for(let i=0;i<6;i++){rr(330+i*66,560,56,60,12);ctx.fill()}label(540,300,'BOILS AT 98.6°F',SM.gold,56);timer(540,1150,'0.6% PRESSURE','#ff5fa2')},
 nasa(lt,p,t,d,seg){const k=nth(seg);ctx.fillStyle='#14202e';ctx.fillRect(-100,-100,W+200,H+200);
   // vacuum chamber: big cylinder with window
   ctx.fillStyle='#5a6a7a';rr(170,400,740,820,60);ctx.fill();ctx.fillStyle='#0a0f16';ell(540,800,260,260,'#0a0f16');ctx.save();ctx.beginPath();ctx.arc(540,800,250,0,7);ctx.clip();glow(540,800,260,'rgba(95,212,255,A)',0.2);
   smAstro(540,850+(k&&p>0.6?60*ease((p-0.6)/0.4):0),1.0,t);if(k){for(let i=0;i<8;i++){const f=(t*1.2+i/8)%1;ell(560+Math.sin(i)*30,760-f*120,5,5,`rgba(255,255,255,${1-f})`)}}ctx.restore();
   ctx.strokeStyle='#8a9aaa';ctx.lineWidth=18;ctx.beginPath();ctx.arc(540,800,262,0,7);ctx.stroke();label(540,300,k?'CONSCIOUS ~15 SEC':'NASA · 1966',k?'#ff5fa2':SM.gold,54);
   if(!k&&p>0.4&&Math.sin(t*10)>0){ctx.fillStyle='#ff5fa2';ctx.font='900 50px Inter';ctx.textAlign='center';ctx.fillText('⚠ SUIT LEAK',540,1320)}},
 blackout(lt,p,t,d,seg){mars(t);const a=ease(p);smGuy(540,1150,1.6,t,{hood:'#ff8a3d'});ctx.fillStyle=`rgba(0,0,0,${0.85*a})`;ctx.fillRect(-100,-100,W+200,H+200);timer(540,560,'00:'+String(Math.min(15,Math.floor(p*16))).padStart(2,'0'),a>0.5?'#ff5fa2':SM.cyan)},
 swell(lt,p,t,d,seg){mars(t);const s=1.5+0.18*Math.abs(Math.sin(t*2));ctx.save();ctx.translate(540,1260);ctx.scale(s/1.5*1.0,1);ctx.translate(-540,-1260);smGuy(540,1150,1.5,t,{hood:'#ff8a3d'});ctx.restore();label(540,300,'SWELL ≠ EXPLODE',SM.cyan,54);smTick(860,960-Math.abs(Math.sin(t*5))*18,0.85,t,{wow:0.6})},
 cold(lt,p,t,d,seg){mars(t,{dark:true});const sh=Math.sin(t*35)*5;smGuy(540+sh,1150,1.6,t,{hood:'#ff8a3d'});for(let i=0;i<30;i++){const x=(i*71+t*30)%W,y=(i*137+t*90)%1300;ell(x,y,4,4,'rgba(220,240,255,0.8)')}label(540,300,'−80°F',SM.cyan,80);
   ctx.fillStyle='#5fd4ff';rr(880,500,40,420,20);ctx.fill();ctx.fillStyle='#fff';rr(888,880-ease(p)*300,24,40+ease(p)*0,12);ctx.fill()},
 uv(lt,p,t,d,seg){mars(t);for(let i=0;i<10;i++){const a=-2.2+i*0.12;ctx.strokeStyle=`rgba(190,120,255,${0.35+0.25*Math.sin(t*6+i)})`;ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(820,330);ctx.lineTo(820+Math.cos(a)*1400,330-Math.sin(a)*1400);ctx.stroke()}
   smGuy(540,1150,1.6,t,{hood:'#ff8a3d',skin:p>0.5?'#ff9a8a':'#f2c29b'});label(540,300,'NO OZONE · RAW UV','#c98aff',50)},
 jump(lt,p,t,d,seg){const k=nth(seg);mars(t);const h=k?Math.abs(Math.sin(t*2.2))*520:Math.abs(Math.sin(t*3))*140;smGuy(540,1150-h,1.5,t,{hood:'#ff8a3d'});ell(540,1160,90-h*0.1,18,'rgba(0,0,0,0.3)');
   if(k){ctx.strokeStyle='rgba(255,255,255,0.6)';ctx.setLineDash([14,10]);ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(760,1150);ctx.lineTo(760,630);ctx.stroke();ctx.setLineDash([]);ctx.font='900 60px Inter';ctx.fillStyle=SM.gold;ctx.textAlign='center';ctx.fillText('×3',840,760)}label(540,300,k?'JUMP ×3':'GRAVITY 38%',SM.gold,58);smTick(220,960-Math.abs(Math.sin(t*5))*30,0.8,t,{wow:1})},
 endq(lt,p,t,d,seg){mars(t);lander(220,1080,1.0);smGuy(540,1150,1.5,t,{hood:'#ff8a3d'});timer(540,520,mmss?mmss(Math.max(0,120-p*120)):'02:00','#ff5fa2');smTick(860,960-Math.abs(Math.sin(t*5))*16,0.9,t,{wow:0.6});smEnd(seg,t)}
};
const CAM={hook:[1.06,1.0],air:[1,1.05],lungs:[1,1.06],boil:[1,1.08],nasa:[1,1.06],blackout:[1,1.05],swell:[1,1.05],cold:[1,1.06],uv:[1,1.05],jump:[1,1.04],endq:[1,1.05]};
