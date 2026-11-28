// Strange Minute #24: Betelgeuse's hidden companion Siwarha (helpers from ep020)
// Strange Minute #15: What if you drank only energy drinks for a week? (helpers from ep012-014)
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
function can(x,y,s,t,col='#2bd46a',tilt=0){ctx.save();ctx.translate(x,y);ctx.rotate(tilt);ctx.scale(s,s);rr(-45,-130,90,260,18);ctx.fillStyle='#1a1d24';ctx.fill();rr(-45,-130,90,260,18);ctx.strokeStyle='#9aa4b4';ctx.lineWidth=4;ctx.stroke();
  ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(-30,-70);ctx.lineTo(10,-70);ctx.lineTo(-8,0);ctx.lineTo(24,0);ctx.lineTo(-20,80);ctx.lineTo(-4,10);ctx.lineTo(-34,10);ctx.closePath();ctx.fill();ell(0,-130,45,10,'#c9ced8');ctx.restore()}
function heart(x,y,s,t,bpm){const b=Math.pow(Math.max(0,Math.sin(t*Math.PI*bpm/60)),6);const k=s*(1+0.12*b);ctx.save();ctx.translate(x,y);ctx.scale(k,k);ctx.fillStyle='#ff4d6d';ctx.beginPath();ctx.moveTo(0,60);ctx.bezierCurveTo(-120,-20,-60,-110,0,-50);ctx.bezierCurveTo(60,-110,120,-20,0,60);ctx.fill();ctx.restore();glow(x,y,200*s,'rgba(255,77,109,A)',0.3*b)}
function gauge(x,y,r,v,col,txt){ctx.save();ctx.translate(x,y);ctx.lineWidth=26;ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.beginPath();ctx.arc(0,0,r,Math.PI,0);ctx.stroke();ctx.strokeStyle=col;ctx.beginPath();ctx.arc(0,0,r,Math.PI,Math.PI+Math.PI*v);ctx.stroke();const a=Math.PI+Math.PI*v;ctx.strokeStyle='#fff';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*(r-30),Math.sin(a)*(r-30));ctx.stroke();ell(0,0,16,16,'#fff');ctx.restore();label(x,y+80,txt,col,44)}
function cubes(x,y,n,t){for(let i=0;i<n;i++){const c=i%5,r=Math.floor(i/5);const yy=y-r*62+Math.min(0,0);ctx.fillStyle='#f4f1ea';rr(x+c*62,yy,56,56,6);ctx.fill();ctx.strokeStyle='#cfc8b8';ctx.lineWidth=3;ctx.stroke()}}
function tooth(x,y,s,t,wear){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#f4f1ea';ctx.beginPath();ctx.moveTo(-80,-80);ctx.quadraticCurveTo(0,-130,80,-80);ctx.lineTo(70,40);ctx.lineTo(40,140);ctx.lineTo(15,60);ctx.lineTo(-15,60);ctx.lineTo(-40,140);ctx.lineTo(-70,40);ctx.closePath();ctx.fill();
  for(let i=0;i<Math.floor(wear*8);i++){ell(-50+(i*37)%100,-60+(i*23)%90,10,7,'rgba(180,160,90,0.6)')}ctx.restore();for(let i=0;i<5;i++){const f=(t*0.8+i/5)%1;ell(x-60+i*30,y-260+f*160,8,12,`rgba(120,255,140,${1-f})`)}}
function battery(x,y,v){ctx.save();ctx.translate(x,y);rr(-160,-80,320,160,18);ctx.strokeStyle='#fff';ctx.lineWidth=8;ctx.stroke();ctx.fillStyle='#fff';ctx.fillRect(160,-30,20,60);ctx.fillStyle=v>0.3?'#2bd46a':'#ff4d6d';rr(-145,-65,290*v,130,10);ctx.fill();ctx.restore()}
// ---- Strange Minute #20: What if you ate a 3,000-calorie Thanksgiving dinner?
function dining(t,dark=0){const g=ctx.createLinearGradient(0,0,0,1300);g.addColorStop(0,'#3a5a8a');g.addColorStop(1,'#1d3352');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);
  ctx.fillStyle='#2a4468';for(let x=-60;x<W+100;x+=120)ctx.fillRect(x,150,6,1100);ctx.fillStyle='#14243c';ctx.fillRect(-100,1250,W+200,H);glow(540,500,600,'rgba(255,210,140,A)',0.25*(1-dark));
  if(dark){ctx.fillStyle=`rgba(3,10,22,${dark})`;ctx.fillRect(-100,-100,W+200,H+200)}}
function turkey(x,y,s,t){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,30,170,46,'#e8e2d4');ell(0,-10,120,80,'#b86a2a');ell(-30,-40,40,20,'rgba(255,220,170,0.45)');
  for(const sx of[-1,1]){ctx.fillStyle='#a85a22';ctx.save();ctx.translate(sx*110,10);ctx.rotate(sx*0.5);rr(-18,-14,70*sx>0?70:70,28,14);ctx.fill();ell(sx*70,0,16,16,'#f2ead8');ctx.restore()}
  const st=Math.sin(t*3);for(let i=0;i<3;i++){ctx.strokeStyle='rgba(255,255,255,0.4)';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-40+i*40,-100);ctx.quadraticCurveTo(-30+i*40+st*10,-140,-40+i*40,-180);ctx.stroke()}ctx.restore()}
function plate(x,y,s,full){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,0,150,46,'#f6f3ea');ell(0,-4,110,32,'#e6dfcf');
  if(full>0){const k=full;ell(-40,-14,50*k,24*k,'#c98a4a');ell(30,-18,46*k,26*k,'#f0e0b0');ell(10,4,40*k,18*k,'#7a2a2a');ell(-60,6,26*k,12*k,'#6aa04a')}ctx.restore()}
function stomach(x,y,s,k,t){ctx.save();ctx.translate(x,y);ctx.scale(s*(1+0.5*k),s*(1+0.3*k));ctx.fillStyle='#ff8fa3';ctx.beginPath();ctx.moveTo(-40,-120);ctx.bezierCurveTo(-140,-110,-160,60,-40,90);ctx.bezierCurveTo(60,120,140,40,110,-30);ctx.bezierCurveTo(90,-80,30,-60,10,-120);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#10243a';ctx.lineWidth=6;ctx.stroke();ctx.restore()}
function zzz(x,y,t){for(let i=0;i<3;i++){const k=(t*0.6+i/3)%1;ctx.save();ctx.globalAlpha=1-k;ctx.fillStyle='#ffd57a';ctx.font=`900 ${40+i*16}px Inter`;ctx.fillText('Z',x+i*40+k*40,y-k*160);ctx.restore()}}
function walkMap(t,k){ctx.fillStyle='#2a7a4a';ctx.fillRect(-100,700,W+200,H);ctx.strokeStyle='#e8e2d4';ctx.lineWidth=30;ctx.setLineDash([]);ctx.beginPath();ctx.moveTo(80,1250);ctx.bezierCurveTo(300,700,700,1300,1000,760);ctx.stroke();
  ctx.strokeStyle='#ffd57a';ctx.lineWidth=12;ctx.setLineDash([24,18]);ctx.beginPath();ctx.moveTo(80,1250);ctx.bezierCurveTo(300,700,700,1300,1000,760);ctx.stroke();ctx.setLineDash([])}
function redStar(x,y,r,t,o={}){ctx.save();const pul=1+0.03*Math.sin(t*1.5);glow(x,y,r*2.2*pul,'rgba(255,110,60,A)',0.45);const g=ctx.createRadialGradient(x-r*0.3,y-r*0.3,r*0.1,x,y,r*pul);g.addColorStop(0,'#ffd0a0');g.addColorStop(0.5,'#ff7a3a');g.addColorStop(1,'#a82a1a');ell(x,y,r*pul,r*pul,g);
  for(let i=0;i<7;i++){const a=i*0.9+t*0.2;ell(x+Math.cos(a)*r*0.5,y+Math.sin(a)*r*0.45,r*0.18,r*0.12,'rgba(255,220,160,0.25)')}ctx.restore()}
function companion(x,y,r,t,wake=0){if(wake){for(let i=0;i<14;i++){ctx.globalAlpha=(1-i/14)*0.5*wake;ell(x+i*r*0.9,y-i*r*0.25,r*(1+i*0.15),r*(0.7+i*0.1),'rgba(255,230,200,0.6)')}ctx.globalAlpha=1}glow(x,y,r*3,'rgba(190,220,255,A)',0.7);ell(x,y,r,r,'#eaf4ff')}
function orionSky(t){ctx.fillStyle='#04081a';ctx.fillRect(-100,-100,W+200,H+200);stars(t,1);const S=[[420,420,0],[700,460,1],[560,760,1],[600,780,1],[640,800,1],[420,1080,1],[740,1060,1]];
  ctx.strokeStyle='rgba(150,190,255,0.25)';ctx.lineWidth=3;ctx.beginPath();[[0,2],[1,4],[2,3],[3,4],[2,5],[4,6]].forEach(([a,b])=>{ctx.moveTo(S[a][0],S[a][1]);ctx.lineTo(S[b][0],S[b][1])});ctx.stroke();
  S.forEach(([x,y,c],i)=>{if(i===0){glow(x,y,70,'rgba(255,110,60,A)',0.9);ell(x,y,16,16,'#ff8a4a')}else{glow(x,y,40,'rgba(180,210,255,A)',0.7);ell(x,y,9,9,'#eaf4ff')}})}
const SCN={
  hook:(lt,p,t,d,seg)=>{spaceBg(t);redStar(560,760,300,t);const a=t*0.8;companion(560+Math.cos(a)*330,760+Math.sin(a)*120,26,t,0.6);label(540,1180,'BETELGEUSE + ???',SM.gold,46);smEnd(seg,t)},
  orion:(lt,p,t)=>{orionSky(t);label(420,330,'BETELGEUSE',SM.gold,40);ctx.fillStyle='#0a1426';ctx.fillRect(-100,1180,W+200,H);smGuy(800,1180,1.0,t,{look:-1})},
  size:(lt,p,t)=>{spaceBg(t);const k=ease(clamp(lt/2.2,0,1));redStar(lerp(540,700,k),760,lerp(60,520,k),t);bigSun(200,760,lerp(60,8,k),t);label(540,1180,'≈ 700 × WIDER',SM.gold,48)},
  swap:(lt,p,t)=>{spaceBg(t);const k=ease(clamp(lt/2.5,0,1));const R=lerp(30,360,k);const pl=[[70,'#b8b0a8',6,'MERCURY'],[110,'#e8c070',9,'VENUS'],[150,'#3a8ad8',10,'EARTH'],[230,'#c8603a',8,'MARS'],[330,'#d8b080',22,'JUPITER?']];
    pl.forEach(([d,c,r,n],i)=>{const a=t*0.4+i;ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(540,760,d*1.25,0,7);ctx.stroke();if(d*1.25>R)ell(540+Math.cos(a)*d*1.25,760+Math.sin(a)*d*1.25,r,r,c)});redStar(540,760,R,t);if(k>0.6)label(540,1180,i18('GOODBYE, EARTH'),'#ff6a5a',44)},
  dim:(lt,p,t)=>{spaceBg(t);const b=0.6+0.4*Math.sin(lt*2);ctx.globalAlpha=b;redStar(540,680,240,t);ctx.globalAlpha=1;ctx.strokeStyle=SM.cyan;ctx.lineWidth=6;ctx.beginPath();for(let x=0;x<=760;x+=10){const y=1100-40*Math.sin(x/760*Math.PI*4-lt*2);x?ctx.lineTo(160+x,y):ctx.moveTo(160+x,y)}ctx.stroke();ctx.fillStyle='#fff';ctx.font='800 32px Inter';ctx.textAlign='center';ctx.fillText('BRIGHTNESS · 6-YEAR RHYTHM',540,1000)},
  found:(lt,p,t)=>{spaceBg(t);redStar(460,760,260,t);const k=ease(clamp(lt/1.2,0,1));companion(820,700,28,t);if(k>0.3){ctx.strokeStyle=SM.gold;ctx.lineWidth=6;ctx.setLineDash([14,10]);ctx.lineDashOffset=-t*30;ctx.beginPath();ctx.arc(820,700,70,0,7);ctx.stroke();ctx.setLineDash([])}label(820,560,'SIWARHA',SM.cyan,40)},
  name:(lt,p,t)=>{spaceBg(t);redStar(540,760,180,t);const a=t*1.2;for(let i=0;i<24;i++){const b=a+i*0.26;ell(540+Math.cos(b)*300,760+Math.sin(b)*110,8,8,i%3?SM.gold:'#fff')}companion(540+Math.cos(a)*300,760+Math.sin(a)*110,22,t);label(540,1120,'"HER BRACELET"',SM.gold,48)},
  mass:(lt,p,t)=>{spaceBg(t);const k=ease(clamp(lt/1.5,0,1));ctx.strokeStyle='#c9d2dc';ctx.lineWidth=10;ctx.save();ctx.translate(540,820);ctx.rotate(lerp(0,-0.12,k));ctx.beginPath();ctx.moveTo(-340,0);ctx.lineTo(340,0);ctx.stroke();bigSun(-250,-70,60,t);companion(250,-80,40,t);ctx.restore();ctx.fillStyle='#c9d2dc';ctx.beginPath();ctx.moveTo(540,820);ctx.lineTo(500,900);ctx.lineTo(580,900);ctx.fill();label(540,1100,'≈ 1.5 × SUN',SM.gold,48)},
  plow:(lt,p,t)=>{spaceBg(t);redStar(400,760,420,t);const k=clamp(lt/3,0,1);companion(lerp(980,620,k),lerp(520,700,k),30,t,1);ctx.fillStyle='rgba(255,200,150,0.15)';for(let i=0;i<20;i++)ell(lerp(980,620,k)+(i%5)*10,lerp(520,700,k)+i*6,12,6,'rgba(255,200,150,0.2)')},
  wake:(lt,p,t)=>{spaceBg(t);redStar(540,760,250,t);const a=-Math.PI/2+lt*1.4;companion(540+Math.cos(a)*360,760+Math.sin(a)*160,26,t,1);timer(540,1150,'1 LAP = 6 YEARS')},
  merge:(lt,p,t)=>{spaceBg(t);const k=clamp(lt/3,0,1);const r=lerp(380,150,k),a=t*lerp(0.8,3,k);redStar(540,760,230,t);companion(540+Math.cos(a)*r,760+Math.sin(a)*r*0.5,24,t,0.5);timer(540,1150,'~9,000 YEARS')},
  boom:(lt,p,t)=>{daySky(t,0);const k=clamp((lt-0.6)/0.6,0,1);bigSun(820,300,70,t);glow(300,420,260*(0.5+k),'rgba(255,255,255,A)',0.9*k+0.1);ell(300,420,10+20*k,10+20*k,'#fff');grassField(t,0);smGuy(560,1180,1.1,t,{look:-1})},
  ask:(lt,p,t,d,seg)=>{orionSky(t);ctx.fillStyle='#0a1426';ctx.fillRect(-100,1180,W+200,H);smGuy(380,1180,1.1,t,{look:1});smAstro(700,1130,0.9,t);smEnd(seg,t)},
};
function i18(s){return s}
const CAM={hook:[1.08,1.0],orion:[1.0,1.06],size:[1.0,1.04],swap:[1.0,1.05],dim:[1.0,1.05],found:[1.0,1.08],name:[1.0,1.05],mass:[1.0,1.05],plow:[1.0,1.06],wake:[1.0,1.05],merge:[1.0,1.08],boom:[1.0,1.06],ask:[1.0,1.05]};
