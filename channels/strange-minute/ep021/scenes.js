// Strange Minute #21: Voyager 1 reaches one light-day from Earth (helpers from ep020)
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
function voyager(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(o.r??-0.25);const OL='#10243a';ctx.lineWidth=5;ctx.strokeStyle=OL;
  ctx.strokeStyle='#c9d2dc';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(0,40);ctx.lineTo(-220,120);ctx.moveTo(0,40);ctx.lineTo(200,90);ctx.moveTo(0,40);ctx.lineTo(60,260);ctx.stroke();
  ctx.fillStyle='#9aa6b4';rr(-200,110,40,40,6);ctx.fill();ell(60,262,14,14,'#7a8696');
  ctx.strokeStyle=OL;ctx.lineWidth=5;ctx.fillStyle='#c98a3a';ctx.beginPath();rr(-60,10,120,70,10);ctx.fill();ctx.stroke();
  ctx.fillStyle='#eef2f7';ctx.beginPath();ctx.ellipse(0,0,150,46,0,Math.PI,2*Math.PI);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#dfe6ee';ctx.beginPath();ctx.ellipse(0,0,150,20,0,0,7);ctx.fill();ctx.stroke();
  ctx.strokeStyle='#c9d2dc';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(0,-2);ctx.lineTo(0,-60);ctx.stroke();ell(0,-62,8,8,'#c9d2dc');
  if(o.rec){ctx.save();ctx.translate(0,45);ctx.rotate(t);ell(0,0,26,26,'#e6b84a');ell(0,0,6,6,'#8a6a2a');ctx.restore()}
  ell(-40,45,7,7,Math.sin(t*5)>0?'#5fd4ff':'#1b4a6b');ctx.restore()}
function rocket(x,y,s,t,f){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const OL='#10243a';ctx.lineWidth=5;ctx.strokeStyle=OL;for(let i=0;i<8;i++){const k=(t*4+i/8)%1;ctx.globalAlpha=f*(1-k);ell((i%2?-1:1)*k*30,140+k*260,30+k*40,40+k*60,i%2?'#ffb347':'#ff6a3d')}ctx.globalAlpha=1;
  ctx.fillStyle='#eef2f7';ctx.beginPath();ctx.moveTo(-40,140);ctx.lineTo(-40,-180);ctx.quadraticCurveTo(0,-300,40,-180);ctx.lineTo(40,140);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#ff8a3d';ctx.fillRect(-40,-40,80,24);ctx.strokeRect(-40,-40,80,24);
  for(const k of[-1,1]){ctx.beginPath();ctx.moveTo(k*40,60);ctx.lineTo(k*80,150);ctx.lineTo(k*40,140);ctx.closePath();ctx.fillStyle='#5fd4ff';ctx.fill();ctx.stroke()}ctx.restore()}
const SCN={
  hook:(lt,p,t,d,seg)=>{spaceBg(t);earth(170,1020,70,t);const k=ease(clamp(lt/2,0,1));photons(230,990,780,560,t,1,'255,240,200');voyager(800,520,0.95,t);label(540,880,'1 LIGHT-DAY',SM.gold,58);timer(540,1060,'24:00:00');smEnd(seg,t)},
  launch:(lt,p,t)=>{daySky(t,0.15);ground(t,'#2a5a3a');const k=ease(clamp(lt/2.6,0,1));rocket(540,lerp(1000,380,k),0.9,t,1);ctx.fillStyle='#555';ctx.fillRect(400,1000,30,200);label(540,380,'SEPT 5, 1977',SM.gold,52);
    for(let i=0;i<2;i++){const x=200+i*680;smGuy(x,1180,1.0,t,{look:i?-1:1,hood:i?'#5fd4ff':'#ff8a3d'})}},
  speed:(lt,p,t)=>{spaceBg(t);streaks(t,1.2,'180,220,255',300,1150);voyager(540,700,1.1,t,{r:-0.1+Math.sin(t)*0.03});timer(540,1080,Math.floor(36000+lt*600).toLocaleString('en-US')+' MPH')},
  light:(lt,p,t)=>{spaceBg(t);earth(160,700,90,t);voyager(900,640,0.55,t);const k=clamp(lt/3.2,0,1);const x=lerp(260,860,k);glow(x,680,60,'rgba(255,240,200,A)',0.9);ell(x,680,12,12,'#fff');
    ctx.strokeStyle='rgba(255,240,200,0.5)';ctx.setLineDash([10,14]);ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(260,680);ctx.lineTo(x,680);ctx.stroke();ctx.setLineDash([]);timer(540,1000,(Math.floor(k*24)+'').padStart(2,'0')+':00 HOURS')},
  distance:(lt,p,t)=>{spaceBg(t);const k=ease(clamp(lt/2.5,0,1));earth(110,700,40,t);ell(300,700,10,10,'#c96a3a');ell(520,700,20,20,'#e9c98a');ell(700,700,8,8,'#b0c8e0');
    ctx.fillStyle='#fff';ctx.font='700 28px Inter';ctx.textAlign='center';ctx.fillText('MARS',300,650);ctx.fillText('SATURN',520,640);ctx.fillText('PLUTO',700,650);voyager(lerp(780,960,k),700,0.3,t);
    label(540,960,Math.round(k*16)+' BILLION MILES',SM.gold,52)},
  car:(lt,p,t)=>{spaceBg(t);ctx.fillStyle='#1b2a3e';ctx.beginPath();ctx.moveTo(-100,1220);ctx.lineTo(540,700);ctx.lineTo(W+100,1220);ctx.fill();ctx.strokeStyle='#ffd57a';ctx.lineWidth=8;ctx.setLineDash([40,40]);ctx.lineDashOffset=-t*200;ctx.beginPath();ctx.moveTo(540,1220);ctx.lineTo(540,720);ctx.stroke();ctx.setLineDash([]);
    const b=Math.sin(t*12)*3;ctx.save();ctx.translate(540,1080+b);ctx.fillStyle='#ff8a3d';rr(-140,-60,280,90,24);ctx.fill();ctx.fillStyle='#5fd4ff';rr(-90,-110,180,60,18);ctx.fill();ell(-90,30,30,30,'#10243a');ell(90,30,30,30,'#10243a');ctx.restore();
    voyager(540,640,0.18,t);timer(540,420,Math.floor(clamp(lt/2.8,0,1)*28000).toLocaleString('en-US')+' YEARS')},
  radio:(lt,p,t,d,seg)=>{spaceBg(t);if(nth(seg)===0){voyager(300,780,0.7,t);ctx.fillStyle='#e8eef7';rr(640,560,240,420,20);ctx.fill();const f=0.6+0.4*Math.sin(t*3);glow(760,700,150,'rgba(255,240,180,A)',0.8*f);ell(760,700,40,52,'#fff6c8');ctx.fillStyle='#10243a';ctx.font='800 34px Inter';ctx.textAlign='center';ctx.fillText('≈ 22 W',760,920);}
    else{ctx.fillStyle='#0b2238';ctx.fillRect(-100,1050,W+200,900);ctx.save();ctx.translate(540,830);ctx.rotate(-0.5+Math.sin(t*0.5)*0.05);ctx.fillStyle='#eef2f7';ctx.beginPath();ctx.ellipse(0,0,300,90,0,Math.PI,2*Math.PI);ctx.fill();ctx.restore();ctx.fillStyle='#c9d2dc';ctx.fillRect(520,830,40,220);
      for(let i=0;i<3;i++){ctx.strokeStyle=`rgba(95,212,255,${0.7-0.2*i})`;ctx.lineWidth=5;ctx.beginPath();ctx.arc(780,420,40+i*40+((t*50)%40),2.4,3.6);ctx.stroke()}smGuy(860,1180,0.9,t,{look:-1})}},
  battery:(lt,p,t)=>{spaceBg(t);voyager(330,640,0.6,t);const k=1-clamp(lt/3,0,1)*0.4;ctx.strokeStyle='#fff';ctx.lineWidth=8;rr(620,420,260,480,30);ctx.stroke();ctx.fillStyle='#fff';ctx.fillRect(710,390,80,30);
    const h=440*k*0.35;ctx.fillStyle=k<0.7?'#ff5a5a':'#ffd57a';rr(640,880-h,220,h,18);ctx.fill();label(750,1000,Math.round(k*35)+'% LEFT',k<0.7?'#ff5a5a':SM.gold,44)},
  switch:(lt,p,t)=>{spaceBg(t);const names=['CAMERA','PLASMA','INFRARED','COSMIC RAYS','MAGNET'];const off=Math.floor(lt*1.6);names.forEach((n,i)=>{const y=420+i*130,on=i>=off;rr(250,y-45,580,90,45);ctx.fillStyle='rgba(5,20,40,0.8)';ctx.fill();ctx.fillStyle='#fff';ctx.font='800 40px Inter';ctx.textAlign='left';ctx.fillText(n,290,y+14);
    rr(690,y-28,110,56,28);ctx.fillStyle=on?'#3ad07a':'#55607a';ctx.fill();ell(on?772:718,y,22,22,'#fff')});smTick&&0},
  record:(lt,p,t)=>{spaceBg(t);ctx.save();ctx.translate(540,720);ctx.rotate(t*0.8);glow(0,0,380,'rgba(255,213,122,A)',0.35);ell(0,0,300,300,'#d6a83a');for(let i=1;i<9;i++){ctx.strokeStyle='rgba(120,80,20,0.4)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,40+i*30,0,7);ctx.stroke()}ell(0,0,40,40,'#8a6a2a');ctx.restore();
    for(let i=0;i<4;i++){const a=t*1.2+i*1.57;ctx.fillStyle='#fff';ctx.font='900 60px Inter';ctx.textAlign='center';ctx.fillText('♪',540+Math.cos(a)*400,740+Math.sin(a)*400)}},
  drift:(lt,p,t)=>{spaceBg(t);const k=clamp(lt/4,0,1);ctx.globalAlpha=1-k*0.6;voyager(lerp(380,700,k),lerp(800,520,k),lerp(0.7,0.25,k),t,{rec:true});ctx.globalAlpha=1;stars(t+3,0.8)},
  ask:(lt,p,t,d,seg)=>{daySky(t,0.92);grassField(t,1);smGuy(380,1180,1.1,t,{look:1});smAstro(720,1120,1.0,t);glow(800,360,60,'rgba(255,255,255,A)',0.6);ell(800,360,6,6,'#fff');smEnd(seg,t)},
};
const CAM={hook:[1.08,1.0],launch:[1.0,1.06],speed:[1.0,1.1],light:[1.0,1.06],distance:[1.0,1.08],car:[1.0,1.06],radio:[1.0,1.08],battery:[1.0,1.06],switch:[1.0,1.05],record:[1.0,1.1],drift:[1.1,1.0],ask:[1.0,1.06]};
