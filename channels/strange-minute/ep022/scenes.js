// Strange Minute #22: Venus at its brightest this week + why it's the worst planet (helpers from ep020)
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
function venus(x,y,r,t,o={}){ctx.save();glow(x,y,r*1.8,'rgba(255,220,140,A)',0.35);ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.clip();const g=ctx.createRadialGradient(x-r*0.3,y-r*0.3,r*0.1,x,y,r);g.addColorStop(0,'#fff0c0');g.addColorStop(0.6,'#e8c070');g.addColorStop(1,'#b8823a');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,2*r,2*r);
  for(let i=0;i<7;i++){ctx.strokeStyle=`rgba(255,250,220,${0.25})`;ctx.lineWidth=r*0.08;ctx.beginPath();const yy=y-r+i*r*0.3;for(let xx=-r;xx<=r;xx+=12)ctx.lineTo(x+xx,yy+Math.sin((xx+t*30*(i%2?1:-1))*0.02+i)*r*0.06);ctx.stroke()}
  const sh=ctx.createLinearGradient(x-r,0,x+r,0);sh.addColorStop(0,'rgba(0,0,0,0)');sh.addColorStop(0.7,'rgba(0,0,0,0.1)');sh.addColorStop(1,'rgba(0,0,20,0.55)');ctx.fillStyle=sh;ctx.fillRect(x-r,y-r,2*r,2*r);ctx.restore()}
function dawn(t,k=0){const g=ctx.createLinearGradient(0,0,0,1200);g.addColorStop(0,'#071530');g.addColorStop(0.7,'#1d3a6a');g.addColorStop(1,k?'#e88a5a':'#5a4a7a');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,1400);stars(t,0.6)}
function hills(col='#0b1a2e'){ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(-100,1200);for(let x=-100;x<=W+100;x+=60)ctx.lineTo(x,1150+Math.sin(x*0.01)*40);ctx.lineTo(W+100,H+100);ctx.lineTo(-100,H+100);ctx.fill()}
function hell(t){const g=ctx.createLinearGradient(0,0,0,1300);g.addColorStop(0,'#c8782a');g.addColorStop(1,'#7a3a12');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);ctx.fillStyle='#4a200a';ctx.beginPath();ctx.moveTo(-100,1180);for(let x=-100;x<=W+100;x+=50)ctx.lineTo(x,1160+Math.sin(x*0.03+1)*20);ctx.lineTo(W+100,H+100);ctx.lineTo(-100,H+100);ctx.fill();
  for(let i=0;i<20;i++){const x=(i*97+t*40)%W,y=(1150-((t*80+i*61)%900));ctx.fillStyle='rgba(255,200,120,0.25)';ell(x,y,6,6,'rgba(255,200,120,0.25)')}}
function tLine(x,y,txt){ctx.fillStyle='#fff';ctx.font='800 40px Inter';ctx.textAlign='center';ctx.fillText(txt,x,y)}
const SCN={
  hook:(lt,p,t,d,seg)=>{dawn(t,0);hills();const f=0.8+0.2*Math.sin(t*3);glow(760,430,200,'rgba(255,245,210,A)',0.9*f);ell(760,430,16,16,'#fffbe8');ctx.strokeStyle=`rgba(255,250,230,${0.6*f})`;ctx.lineWidth=3;for(let i=0;i<4;i++){const a=i*Math.PI/4;ctx.beginPath();ctx.moveTo(760-Math.cos(a)*50,430-Math.sin(a)*50);ctx.lineTo(760+Math.cos(a)*50,430+Math.sin(a)*50);ctx.stroke()}
    smGuy(380,1180,1.1,t,{look:1});label(760,560,'VENUS',SM.gold,44);smEnd(seg,t)},
  east:(lt,p,t)=>{dawn(t,1);hills();const k=ease(clamp(lt/2,0,1));glow(540,lerp(700,520,k),160,'rgba(255,245,210,A)',0.9);ell(540,lerp(700,520,k),14,14,'#fffbe8');label(560,950,'EAST · BEFORE SUNRISE',SM.cyan,40);smGuy(150,1180,1.0,t,{look:1,speed:0.4})},
  peak:(lt,p,t)=>{spaceBg(t);ctx.fillStyle='#fff';ctx.font='900 46px Inter';ctx.textAlign='center';const days=[25,26,27,28,29,30,1];days.forEach((d,i)=>{const x=150+i*130,v=1-Math.abs(i-4)/6,on=clamp(lt*3-i*0.4,0,1);
    rr(x-45,1050-v*500*on,90,v*500*on+4,14);ctx.fillStyle=i===4?SM.gold:'rgba(95,212,255,0.6)';ctx.fill();ctx.fillStyle='#fff';ctx.font='700 32px Inter';ctx.fillText((i<6?'NOV ':'DEC ')+d,x,1110)});label(670,440,'BRIGHTEST',SM.gold,44)},
  moon:(lt,p,t)=>{dawn(t,0);hills();bigMoon(300,480,110);const f=0.8+0.2*Math.sin(t*3);glow(780,620,120,'rgba(255,245,210,A)',0.9*f);ell(780,620,12,12,'#fffbe8');label(300,690,'#1',SM.gold,40);label(780,760,'#2',SM.cyan,40)},
  zoom:(lt,p,t)=>{spaceBg(t);const k=ease(clamp(lt/2.2,0,1));venus(540,700,lerp(20,360,k),t)},
  heat:(lt,p,t)=>{hell(t);ctx.fillStyle='#fff';rr(780,380,70,560,35);ctx.fill();const k=ease(clamp(lt/1.6,0,1));rr(795,940-500*k,40,500*k,20);ctx.fillStyle='#ff3a2a';ctx.fill();ell(815,960,60,60,'#ff3a2a');tLine(815,340,Math.round(k*870)+'°F');
    ctx.save();const m=clamp((lt-1.6)/1.5,0,1);ctx.fillStyle='#9aa6b4';ctx.beginPath();ctx.moveTo(260,1160);ctx.lineTo(260,1160-140*(1-m));ctx.lineTo(460,1160-140*(1-m));ctx.lineTo(460,1160);ctx.closePath();ctx.fill();ell(360,1170,100+120*m,20+8*m,'#b8c2cc');ctx.fillStyle='#10243a';ctx.font='800 34px Inter';ctx.textAlign='center';if(m<0.5)ctx.fillText('LEAD',360,1110);ctx.restore()},
  deep:(lt,p,t)=>{const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0a5a8a');g.addColorStop(1,'#020a1a');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);for(let i=0;i<14;i++){const y=(1200-((t*90+i*80)%1000));ell(200+i*55,y,8,8,'rgba(255,255,255,0.4)')}
    const k=ease(clamp(lt/2.5,0,1));smAstro(540,lerp(520,900,k),1.0,t);ctx.strokeStyle='rgba(255,255,255,0.5)';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(900,440);ctx.lineTo(900,1140);ctx.stroke();for(let i=0;i<=3;i++){ctx.fillStyle='#fff';ctx.font='700 30px Inter';ctx.textAlign='right';ctx.fillText((i*1000)+' FT',880,450+i*230)}},
  acid:(lt,p,t)=>{const g=ctx.createLinearGradient(0,0,0,1300);g.addColorStop(0,'#c8b04a');g.addColorStop(1,'#8a6a2a');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);cloudLayer(t,420,'rgba(230,220,120,0.9)',60);cloudLayer(t+5,560,'rgba(200,190,90,0.8)',-40);
    for(let i=0;i<40;i++){const x=(i*53)%W,y=600+((t*400+i*97)%600);ctx.strokeStyle='rgba(190,255,90,0.7)';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-6,y+24);ctx.stroke()}label(540,1000,'H₂SO₄',SM.gold,60)},
  clock:(lt,p,t)=>{spaceBg(t);const k=clamp(lt/3,0,1);for(const [x,lab,n,c] of[[300,'1 DAY',243,SM.gold],[780,'1 YEAR',225,SM.cyan]]){ctx.strokeStyle=c;ctx.lineWidth=10;ctx.beginPath();ctx.arc(x,680,170,0,7);ctx.stroke();ctx.save();ctx.translate(x,680);ctx.rotate(k*Math.PI*2*(n/243));ctx.fillStyle=c;ctx.fillRect(-5,-150,10,150);ctx.restore();
    tLine(x,460,lab);ctx.fillStyle=c;ctx.font='900 54px Inter';ctx.fillText(Math.round(n*k)+' DAYS',x,940)}},
  west:(lt,p,t)=>{const k=ease(clamp(lt/2.6,0,1));const g=ctx.createLinearGradient(0,0,0,1200);g.addColorStop(0,'#c8782a');g.addColorStop(1,'#e8b06a');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,1400);bigSun(lerp(140,420,k),lerp(1100,560,k),90,t);hills('#5a2a0e');label(160,1000,'W',SM.gold,50);label(920,1000,'E',SM.cyan,50);
    ctx.strokeStyle='#fff';ctx.lineWidth=6;ctx.beginPath();ctx.arc(540,1100,360,Math.PI*1.05,Math.PI*1.45);ctx.stroke()},
  lander:(lt,p,t)=>{hell(t);const k=clamp(lt/3,0,1);ctx.save();ctx.translate(540,1080);ctx.fillStyle='#9aa6b4';ell(0,-60,110,110,'#9aa6b4');ctx.fillStyle='#c9d2dc';rr(-150,-10,300,40,10);ctx.fill();ctx.strokeStyle='#10243a';ctx.lineWidth=5;ctx.beginPath();ctx.arc(0,-60,110,0,7);ctx.stroke();ell(-30,-80,16,16,Math.sin(t*6)>0&&k<0.95?'#5fd4ff':'#333');ctx.restore();
    glow(540,1000,260,'rgba(255,90,30,A)',0.4*k);const mn=Math.floor(k*127);timer(540,560,Math.floor(mn/60)+'h '+String(mn%60).padStart(2,'0')+'m');},
  ask:(lt,p,t,d,seg)=>{dawn(t,1);hills();const f=0.8+0.2*Math.sin(t*3);glow(780,420,140,'rgba(255,245,210,A)',0.9*f);ell(780,420,13,13,'#fffbe8');smGuy(380,1180,1.1,t,{look:1});ctx.save();ctx.translate(560,1010);ctx.fillStyle='#ff8a3d';rr(-40,-50,80,90,18);ctx.fill();ell(0,-5,28,28,'#fff');ctx.strokeStyle='#10243a';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(0,-5);ctx.lineTo(0,-22);ctx.moveTo(0,-5);ctx.lineTo(12,2);ctx.stroke();ctx.restore();smEnd(seg,t)},
};
const CAM={hook:[1.08,1.0],east:[1.0,1.06],peak:[1.0,1.05],moon:[1.0,1.06],zoom:[1.0,1.04],heat:[1.0,1.08],deep:[1.0,1.06],acid:[1.0,1.08],clock:[1.0,1.05],west:[1.0,1.06],lander:[1.0,1.1],ask:[1.0,1.06]};
