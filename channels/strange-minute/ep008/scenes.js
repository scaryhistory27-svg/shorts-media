// Strange Minute #8 — What if you fell into Jupiter? — astronaut + Tick + Max (light style)
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
const SCN={
 hook(lt,p,t,d,seg){spaceBg(t);jupiter(540,1450,640,t);smAstro(540+Math.sin(t*1.3)*40,760+ease(p)*80,1.3,t);label(540,300,'NO GROUND?',SM.gold,58);smTick(860,420-Math.abs(Math.sin(t*6))*20,0.9,t,{wow:1})},
 noground(lt,p,t,d,seg){const k=nth(seg);spaceBg(t);jupiter(540,k?1150:1350,k?440:560,t);smAstro(k?300:540,k?700:700+p*60,1.1,t);label(540,300,k?'90% HYDROGEN GAS':'NOTHING TO STAND ON',SM.cyan,48);if(!k){ctx.strokeStyle='#ff5fa2';ctx.lineWidth=10;ctx.setLineDash([20,14]);ctx.beginPath();ctx.moveTo(380,790);ctx.lineTo(700,790);ctx.stroke();ctx.setLineDash([]);ctx.font='900 60px Inter';ctx.fillStyle='#ff5fa2';ctx.textAlign='center';ctx.fillText('?',720,770)}
   else for(let i=0;i<12;i++){const f=((t*0.6+i/12)%1);ell(540+Math.cos(i*2)*360*(1-f),1150-440-50+f*380+Math.sin(i)*20,6,6,'rgba(255,255,255,'+(1-f)+')')}},
 gravity(lt,p,t,d,seg){spaceBg(t);earth(270,640,110,t);jupiter(790,700,250,t);bar(150,1000,780,52,0.4,'#5fd4ff','EARTH · 1×');bar(150,1150,780,52,Math.min(1,0.4*2.5*ease(p)+0.4*(1-ease(p))),'#ffb35c','JUPITER · 2.5×');smAstro(540,480+Math.sin(t*3)*10+ease(p)*60,0.8,t)},
 probe(lt,p,t,d,seg){const k=nth(seg);spaceBg(t);jupiter(540,1500,900,t);probe(lerp(220,560,k?ease(p):0.2*p),lerp(560,800,k?ease(p):0.1*p),1.3,t,k?ease(clamp(p*2-0.5,0,1)):0);label(540,300,k?'GALILEO · 1995':'NASA ALREADY TRIED',SM.gold,52)},
 entry(lt,p,t,d,seg){const k=nth(seg);const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#3a1a10');g.addColorStop(1,'#c96a3a');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);streaks(t,1.5,'255,200,150',100,1300);
   probe(540+Math.sin(t*30)*6,760,1.8,t,1);label(540,300,k?'28,000°F':'106,000 MPH',k?'#ff5fa2':SM.gold,64);if(k)timer(540,1160,'228 G',SM.cyan)},
 clouds(lt,p,t,d,seg){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#e9d2b0');g.addColorStop(1,'#8a5a3a');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);cloudLayer(t,300,'#ffffff',60,0.8);cloudLayer(t*1.4,700,'#f2e6d0',90,0.7);
   smAstro(540,lerp(700,950,ease(p)),1.15,t);cloudLayer(t*1.8,1100,'#e0cdb0',120,0.9);label(540,260,'AMMONIA ICE CLOUDS',SM.cyan,48)},
 storm(lt,p,t,d,seg){ctx.fillStyle='#b8784a';ctx.fillRect(-100,-100,W+200,H+200);ctx.save();ctx.translate(540,760);for(let i=0;i<10;i++){ctx.rotate(t*0.4);ctx.strokeStyle=`rgba(${200+i*5},${80+i*8},${60+i*6},0.7)`;ctx.lineWidth=40;ctx.beginPath();ctx.ellipse(0,0,420-i*36,260-i*22,0,i*0.7,i*0.7+4.2);ctx.stroke()}ctx.restore();
   earth(860,1120,80,t);label(860,990,'EARTH',SM.cyan,34);smAstro(lerp(150,300,p),1150,0.7,t);label(540,300,'BIGGER THAN EARTH',SM.gold,52)},
 pressure(lt,p,t,d,seg){const k=nth(seg);ctx.fillStyle=k?'#2a1208':'#5a2a14';ctx.fillRect(-100,-100,W+200,H+200);glow(540,700,700,'rgba(255,120,60,A)',0.2);
   const sq=1-0.25*ease(k?1:p);ctx.save();ctx.translate(540,900);ctx.scale(1/sq*0.9,sq);probe(0,0,1.6,t,0);ctx.restore();bar(150,1150,780,52,k?1:0.3+0.7*ease(p),'#ff5fa2','PRESSURE');
   if(k){timer(540,450,p<0.7?'00:'+String(Math.floor(40+p*26)).padStart(2,'0')+':00':'NO SIGNAL',p<0.7?SM.cyan:'#ff5fa2')}else label(540,300,'SQUEEZE',SM.gold,56)},
 metal(lt,p,t,d,seg){const k=nth(seg);ctx.fillStyle='#0b0f1a';ctx.fillRect(-100,-100,W+200,H+200);const g=ctx.createLinearGradient(0,800,0,H);g.addColorStop(0,'#c9d6e6');g.addColorStop(1,'#5a6a80');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-100,900);for(let x=-100;x<=W+100;x+=30)ctx.lineTo(x,900+18*Math.sin(x*0.02+t*3));ctx.lineTo(W+100,H+100);ctx.lineTo(-100,H+100);ctx.fill();
   for(let i=0;i<20;i++){const x=(i*97+t*40)%W;ell(x,940+((i*53)%300),4,4,'rgba(255,255,255,0.7)')}glow(540,950,600,'rgba(200,220,255,A)',0.25);label(540,300,k?'NO BOTTOM':'LIQUID METAL HYDROGEN',k?'#ff5fa2':SM.cyan,48);
   smAstro(540,lerp(k?820:720,k?1000:820,ease(p)),1.1,t);if(k){ctx.fillStyle=`rgba(200,220,255,${0.4*ease(p)})`;ctx.fillRect(-100,950,W+200,H)}},
 endq(lt,p,t,d,seg){spaceBg(t);jupiter(540,1200,560,t);smAstro(540+Math.sin(t)*30,720,1.1,t);smTick(860,560-Math.abs(Math.sin(t*5))*16,0.9,t,{wow:0.6});smEnd(seg,t)}
};
const CAM={hook:[1.08,1],noground:[1,1.05],gravity:[1,1.05],probe:[1,1.05],entry:[1,1.08],clouds:[1,1.05],storm:[1,1.06],pressure:[1,1.06],metal:[1,1.05],endq:[1,1.04]};
