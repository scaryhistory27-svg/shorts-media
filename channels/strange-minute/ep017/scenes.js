// Strange Minute #14: What if you spent one day on Mercury? (helpers copied from ep012/013)
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
function mercury(x,y,r,t,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(t*0.05);const g=ctx.createRadialGradient(-r*0.3,-r*0.3,r*0.1,0,0,r);g.addColorStop(0,'#bdb7ae');g.addColorStop(1,'#5d5750');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,r,0,7);ctx.fill();
  const q=rnd(9);for(let i=0;i<22;i++){const a=q()*7,d=q()*r*0.85,cr=r*(0.04+q()*0.1);ell(Math.cos(a)*d,Math.sin(a)*d,cr,cr,'rgba(70,64,58,0.55)');ell(Math.cos(a)*d+cr*0.2,Math.sin(a)*d+cr*0.2,cr*0.7,cr*0.7,'rgba(150,142,132,0.5)')}
  if(o.split){ctx.fillStyle='rgba(5,10,25,0.75)';ctx.beginPath();ctx.arc(0,0,r,Math.PI/2-t*0.05,Math.PI*1.5-t*0.05);ctx.fill()}ctx.restore()}
function surface(t,o={}){const hot=o.hot||0,cold=o.cold||0;ctx.fillStyle=cold?'#02040a':'#0a0a12';ctx.fillRect(-200,-200,W+400,H+400);if(!cold)stars(t,0.6);
  ctx.fillStyle=hot?`rgb(${120+hot*90},${90+hot*20},${70})`:cold?'#3a4050':'#7a736a';ctx.beginPath();ctx.moveTo(-200,1250);for(let x=-200;x<=W+200;x+=60)ctx.lineTo(x,1250+Math.sin(x*0.013)*30+Math.sin(x*0.05)*10);ctx.lineTo(W+200,H+200);ctx.lineTo(-200,H+200);ctx.fill();
  for(let i=0;i<6;i++){const x=80+i*190,y=1420+(i%2)*120;ell(x,y,70,22,hot?'rgba(90,40,20,0.5)':'rgba(40,40,46,0.5)')}
  if(hot){for(let i=0;i<10;i++){const f=(t*0.8+i/10)%1;ctx.strokeStyle=`rgba(255,200,140,${0.25*(1-f)})`;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(i*110,1250-f*300);ctx.quadraticCurveTo(i*110+20,1200-f*300,i*110,1150-f*300);ctx.stroke()}}
  if(cold){const q=rnd(3);for(let i=0;i<40;i++)ell(q()*W,1280+q()*600,3,3,'rgba(200,230,255,0.6)')}}
function thermo(x,y,v,col,txt){ctx.save();ctx.translate(x,y);rr(-26,-300,52,320,26);ctx.fillStyle='rgba(255,255,255,0.15)';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=4;ctx.stroke();rr(-14,-290+280*(1-v),28,280*v+10,14);ctx.fillStyle=col;ctx.fill();ell(0,30,44,44,col);ctx.strokeStyle='#fff';ctx.beginPath();ctx.arc(0,30,44,0,7);ctx.stroke();ctx.restore();label(x,y+120,txt,col,52)}
function calendar(x,y,n,flip){ctx.save();ctx.translate(x,y);rr(-130,-150,260,300,20);ctx.fillStyle='#fff';ctx.fill();ctx.fillStyle='#ff5fa2';rr(-130,-150,260,70,20);ctx.fill();ctx.fillRect(-130,-100,260,20);ctx.font='900 110px Inter';ctx.fillStyle='#10243a';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(String(n),0,40);
  if(flip>0){ctx.save();ctx.translate(0,-80);ctx.scale(1,1-flip);ctx.fillStyle='#f0f0f0';rr(-130,0,260,230,20);ctx.fill();ctx.restore()}ctx.restore()}
// ---- Strange Minute #17: What if Earth had rings like Saturn?
function ringBands(cx,cy,rx,ry,half,a=1){ // half: 'back' (top arc) | 'front' (bottom arc) | 'all'
  const bands=[[1.25,'rgba(230,215,190,0.55)',18],[1.42,'rgba(205,185,155,0.75)',26],[1.6,'rgba(240,228,205,0.6)',14],[1.75,'rgba(190,170,140,0.45)',20]];
  ctx.save();ctx.globalAlpha=a;for(const [k,col,w] of bands){ctx.strokeStyle=col;ctx.lineWidth=w*(ry/rx*4+0.6);ctx.beginPath();
    if(half==='back')ctx.ellipse(cx,cy,rx*k,ry*k,0,Math.PI,Math.PI*2);else if(half==='front')ctx.ellipse(cx,cy,rx*k,ry*k,0,0,Math.PI);else ctx.ellipse(cx,cy,rx*k,ry*k,0,0,Math.PI*2);ctx.stroke()}ctx.restore()}
function ringedEarth(x,y,r,t,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(o.tilt??-0.25);ringBands(0,0,r,r*0.22,'back',o.ringA??1);ctx.restore();earth(x,y,r,t,0.41);ctx.save();ctx.translate(x,y);ctx.rotate(o.tilt??-0.25);ringBands(0,0,r,r*0.22,'front',o.ringA??1);ctx.restore()}
function skyArch(t,o={}){ // the ring seen from the ground: a huge bright arch across the sky
  const h=o.h??760,cx=540,cy=1260;ctx.save();ctx.globalAlpha=o.a??1;
  for(const [dr,col,w] of[[0,'rgba(245,235,215,0.85)',26],[38,'rgba(215,195,165,0.7)',34],[80,'rgba(250,240,220,0.55)',18],[110,'rgba(200,180,150,0.45)',22]]){ctx.strokeStyle=col;ctx.lineWidth=w;ctx.beginPath();ctx.ellipse(cx,cy,820+dr,h+dr*0.6,0,Math.PI,Math.PI*2);ctx.stroke()}
  if(o.shadow){ctx.strokeStyle='rgba(10,20,40,0.55)';ctx.lineWidth=60;ctx.beginPath();ctx.ellipse(cx,cy,860,h+20,0,Math.PI*1.35,Math.PI*1.55);ctx.stroke()}ctx.restore()}
function meteor(x,y,t,k){const L=180;ctx.save();ctx.strokeStyle='rgba(255,230,180,0.9)';ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+L*0.7,y-L*0.7);ctx.stroke();glow(x,y,60,'rgba(255,200,120,A)',0.6);ctx.restore()}
function rocketS(x,y,s,t){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#e8eef6';rr(-22,-120,44,130,18);ctx.fill();ctx.fillStyle='#ff5fa2';ctx.beginPath();ctx.moveTo(-22,-100);ctx.lineTo(0,-150);ctx.lineTo(22,-100);ctx.fill();
  ctx.fillStyle='#5fd4ff';ell(0,-70,10,10,'#5fd4ff');const f=1+0.25*Math.sin(t*30);ctx.fillStyle='#ffb347';ctx.beginPath();ctx.moveTo(-16,10);ctx.lineTo(0,10+70*f);ctx.lineTo(16,10);ctx.fill();ctx.restore()}
const SCN={
 hook(lt,p,t,d,seg){spaceBg(t);ringedEarth(540,860,300,t,{ringA:ease(clamp(lt/0.8,0,1))});label(540,300,'EARTH WITH RINGS?',SM.gold,58);smTick(880,1450-Math.abs(Math.sin(t*6))*20,0.9,t,{wow:1})},
 past(lt,p,t,d,seg){spaceBg(t);ringedEarth(540,860,280,t,{ringA:0.5+0.5*Math.sin(t*2)});const k=ease(p);timer(540,300,Math.round(lerp(0,466,k))+' MILLION YEARS AGO',SM.gold);
   for(let i=0;i<5;i++){const tt=(t*0.7+i*0.2)%1;meteor(200+i*170,700+tt*400,t,tt)}label(540,1450,'MONASH UNIVERSITY STUDY · 2024',SM.cyan,36)},
 thin(lt,p,t,d,seg){spaceBg(t);ctx.save();ctx.translate(540,860);ctx.rotate(-0.25+p*0.25);ringBands(0,0,300,300*lerp(0.22,0.01,ease(p)),'all');ctx.restore();
   label(540,300,'175,000 MILES WIDE',SM.gold,56);label(540,1450,'~30 FEET THICK',SM.cyan,56);smAstro(lerp(200,860,p),1150,0.5,t)},
 equator(lt,p,t,d,seg){spaceBg(t);ringedEarth(540,860,300,t,{tilt:0});ctx.strokeStyle='rgba(255,213,122,0.9)';ctx.lineWidth=6;ctx.setLineDash([14,10]);ctx.beginPath();ctx.moveTo(220,860);ctx.lineTo(860,860);ctx.stroke();ctx.setLineDash([]);label(540,300,'ABOVE THE EQUATOR',SM.gold,56)},
 line(lt,p,t,d,seg){daySky(t);ctx.strokeStyle='rgba(250,240,220,0.9)';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(540,360);ctx.lineTo(540,1300);ctx.stroke();grassField(t);smGuy(moveAlong(p,260,420),1250,0.85,t,{look:-1});label(540,300,'AT THE EQUATOR',SM.cyan,48)},
 arch(lt,p,t,d,seg){daySky(t);skyArch(t,{h:lerp(500,900,ease(p))});grassField(t);smGuy(300,1250,0.85,t,{look:-1,wow:1});smTick(820,1260-Math.abs(Math.sin(t*5))*16,0.8,t,{wow:1});label(540,300,'FARTHER NORTH',SM.cyan,48)},
 night(lt,p,t,d,seg){daySky(t,0.9);stars(t,1);skyArch(t,{h:600,a:0.9});glow(540,900,700,'rgba(255,240,210,A)',0.15);skyline(t,0.6,1800);label(540,300,'NIGHTS GLOW',SM.gold,56)},
 shadow(lt,p,t,d,seg){spaceBg(t);bigSun(140,860,80,t);ringedEarth(620,860,280,t,{tilt:0.35});ctx.save();ctx.globalAlpha=0.55*ease(clamp(lt/0.8,0,1));ctx.fillStyle='#05080f';ctx.beginPath();ctx.ellipse(640,1000,200,60,0.35,0,7);ctx.fill();ctx.restore();label(540,300,'WINTER SHADOW',SM.cyan,56)},
 cold(lt,p,t,d,seg){daySky(t,0.4);skyArch(t,{h:520,shadow:true});grassField(t,0.3);for(let i=0;i<40;i++){const x=(i*97+t*40)%W,y=(i*211+t*160)%1400;ell(x,y,5,5,'rgba(255,255,255,0.9)')}smGuy(300,1250,0.85,t,{look:0});label(540,300,'COLDER WINTERS',SM.cyan,56)},
 rockets(lt,p,t,d,seg){daySky(t,0.2);skyArch(t,{h:560});grassField(t);rocketS(540,lerp(1500,500,ease(p)),1.3,t);for(let i=0;i<6;i++)rock(300+i*90,560+Math.sin(t+i)*40,14,t,'#b8a68a',i);label(540,300,'DODGE THE DEBRIS',SM.gold,52)},
 meteors(lt,p,t,d,seg){daySky(t,0.85);stars(t,1);skyArch(t,{h:600,a:0.8});for(let i=0;i<4;i++){const tt=((t*0.6+i*0.27)%1);meteor(200+i*220-tt*300,400+tt*700,t,tt)}skyline(t,0.6,1800);label(540,300,'RING METEORS',SM.gold,56)},
 ask(lt,p,t,d,seg){spaceBg(t);ringedEarth(540,860,300,t);label(300,1450,'RING SKY',SM.gold,44);label(780,1450,'WARM WINTERS',SM.cyan,44);smTick(880,1700-Math.abs(Math.sin(t*5))*16,0.9,t,{wow:0.6});smEnd(seg,t)}
};
const CAM={hook:[1.06,1.0],past:[1,1.05],thin:[1,1.04],equator:[1,1.05],line:[1,1.05],arch:[1,1.06],night:[1,1.05],shadow:[1,1.05],cold:[1,1.04],rockets:[1,1.05],meteors:[1,1.05],ask:[1,1.05]};
