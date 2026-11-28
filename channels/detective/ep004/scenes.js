// WHAT HAPPENS IF #01 — swallowed gum (format v2: pseudo-3D toolkit lib.js, host Benny, X-ray cutaway, status meter)
const Y='#ffd23a',PINK='#ff5fa8',CY='#5fd4ff';
const BENNY={coat:'#ff7a2a',hair:'#6a3a1e',skin:'#f0c29a',iris:'#3a6a9a',pants:'#2a3a5a'};
const DOC={coat:'#f2f4f6',hair:'#2a2a2a',skin:'#c99a78',glasses:true,tie:'#2a6a9a'};
const talkNow=(seg,t)=>{const w=seg.words;return t>=w[0].s&&t<=w[w.length-1].s+0.3?1:0};
function nth(seg){let n=0;for(const x of TL.segs){if(x===seg)return n;if(x.scene===seg.scene)n++}return n}
const PATH=[[0,-520],[4,-430],[8,-330],[14,-265],[60,-215],[85,-190],[40,-150],[-60,-120],[60,-90],[-60,-60],[60,-30],[-40,0],[-120,-10],[-130,-120],[0,-140],[130,-120],[130,40],[40,70],[0,130]];
const PK=[0,0.05,0.1,0.15,0.3,0.35,0.42,0.48,0.54,0.6,0.66,0.72,0.77,0.82,0.86,0.9,0.95,0.98,1];
function along(k){k=clamp(k,0,1);let i=0;while(i<PK.length-2&&PK[i+1]<k)i++;const f=(k-PK[i])/Math.max(1e-6,PK[i+1]-PK[i]);return[lerp(PATH[i][0],PATH[i+1][0],f),lerp(PATH[i][1],PATH[i+1][1],f)]}
function xray(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  glow(0,-200,520,'rgba(95,212,255,A)',0.18);ctx.fillStyle='rgba(95,212,255,0.10)';ctx.strokeStyle='rgba(150,230,255,0.75)';ctx.lineWidth=5;
  ctx.beginPath();ctx.arc(0,-600,105,0,7);ctx.fill();ctx.stroke();rr(-48,-505,96,70,20);ctx.fill();rr(-200,-445,400,600,120);ctx.fill();ctx.stroke();
  // ribs + spine (soft)
  ctx.strokeStyle='rgba(220,245,255,0.25)';ctx.lineWidth=8;for(let i=0;i<5;i++){ctx.beginPath();ctx.ellipse(0,-380+i*38,150-i*8,26,0,Math.PI*0.05,Math.PI*0.95);ctx.stroke()}ctx.beginPath();ctx.moveTo(0,-440);ctx.lineTo(0,120);ctx.stroke();
  // esophagus
  ctx.strokeStyle='rgba(255,170,190,0.7)';ctx.lineWidth=22;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,-520);ctx.quadraticCurveTo(8,-380,14,-262);ctx.stroke();
  // stomach
  const sq=o.squeeze?Math.sin(t*6)*6:0;ctx.fillStyle='rgba(255,140,160,0.55)';ctx.beginPath();ctx.ellipse(62,-205,100+sq,70-sq*0.5,0.35,0,7);ctx.fill();ctx.strokeStyle='rgba(255,200,210,0.9)';ctx.lineWidth=5;ctx.stroke();
  if(o.acid)for(let i=0;i<9;i++){const a=t*2+i*0.7;ell(62+Math.cos(a)*60,-200+Math.sin(a*1.3)*35,8,8,'rgba(170,255,120,0.75)')}
  // small intestine (zig-zag tube) + large intestine (frame)
  ctx.strokeStyle='rgba(255,190,150,0.7)';ctx.lineWidth=18;ctx.beginPath();ctx.moveTo(85,-190);[[40,-150],[-60,-120],[60,-90],[-60,-60],[60,-30],[-40,0]].forEach(p=>ctx.lineTo(p[0],p[1]+(o.squeeze?Math.sin(t*5+p[1])*3:0)));ctx.stroke();
  ctx.strokeStyle='rgba(230,160,110,0.75)';ctx.lineWidth=30;ctx.beginPath();ctx.moveTo(-40,0);ctx.lineTo(-120,-10);ctx.lineTo(-130,-120);ctx.lineTo(0,-140);ctx.lineTo(130,-120);ctx.lineTo(130,40);ctx.lineTo(40,70);ctx.lineTo(0,130);ctx.stroke();
  // gum
  if(o.k!=null){const [gx,gy]=along(o.k);glow(gx,gy,70,'rgba(255,95,168,A)',0.8);sph(gx,gy,o.gr||24,PINK)}
  ctx.restore()}
function meter(lab,val,t,col=PINK){ctx.save();const x=660,y=480;rr(x,y,380,120,24);ctx.fillStyle='rgba(8,16,30,0.82)';ctx.fill();ctx.strokeStyle=col;ctx.lineWidth=4;ctx.stroke();ctx.fillStyle='#9fb8cc';ctx.font='800 26px "JetBrains Mono"';ctx.textAlign='left';ctx.fillText(lab,x+22,y+44);
  ctx.fillStyle=col;ctx.font='900 40px Inter';ctx.fillText(val,x+22,y+96);ell(x+350,y+30,8,8,Math.floor(t*2)%2?col:'#333');ctx.restore()}
function timerBox(txt){ctx.save();ctx.font='900 58px "JetBrains Mono"';ctx.textAlign='center';const w=ctx.measureText(txt).width+60;rr(540-w/2,1120,w,96,30);ctx.fillStyle='rgba(8,16,30,0.85)';ctx.fill();ctx.strokeStyle=Y;ctx.lineWidth=4;ctx.stroke();ctx.fillStyle=Y;ctx.fillText(txt,540,1188);ctx.restore()}
function labBg(t){ctx.fillStyle='#071222';ctx.fillRect(-200,-200,W+400,H+400);ctx.strokeStyle='rgba(95,212,255,0.08)';ctx.lineWidth=2;for(let i=-2;i<14;i++){ctx.beginPath();ctx.moveTo(i*90+((t*20)%90),0);ctx.lineTo(i*90+((t*20)%90),H);ctx.stroke();ctx.beginPath();ctx.moveTo(0,i*150);ctx.lineTo(W,i*150);ctx.stroke()}}
function kitchen(t){layer(3,()=>{room3(t,{wall:'#e8d9c0',floor:'#a8875a',back:[220,420,860,1060]});box3(240,820,600,240,60,'#c8d4dc',{dx:0,dy:-0.4});ctx.fillStyle='#8aa8bc';ctx.fillRect(260,840,560,30);ctx.fillStyle='#6a8aa0';ctx.fillRect(300,520,200,200);ctx.fillStyle='#bfe4ff';ctx.fillRect(310,530,180,180)},1.5);layer(1.6,()=>pendant(540,300,t))}
const endCard=(seg,t)=>{const last=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>last+0.6){const k=t-last-0.6,a=ease(clamp(k/0.4,0,1));ctx.fillStyle=`rgba(6,12,24,${0.86*a})`;ctx.fillRect(-200,-200,W+400,H+400);
  ctx.save();ctx.globalAlpha=a;ctx.textAlign='center';const sc=lerp(1.6,1,ease(clamp(k/0.3,0,1)));ctx.translate(540,860);ctx.scale(sc,sc);ctx.font='900 92px Inter';ctx.fillStyle=Y;ctx.shadowColor=Y;ctx.shadowBlur=30;ctx.fillText(TL.endTitle,0,0);ctx.restore();
  ctx.save();ctx.globalAlpha=ease(clamp((k-0.5)/0.4,0,1));ctx.textAlign='center';ctx.font='800 44px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,960);ctx.font='800 36px "JetBrains Mono"';ctx.fillStyle=CY;ctx.fillText('+ SUBSCRIBE FOR MORE WHAT-IFS',540,1060);ctx.restore()}};
const SCN={
  hook:(lt,p,t,d,seg)=>{dolly(t,30,0);labBg(t);layer(1,()=>{xray(560,1010,1.0,t,{k:0.02+0.04*Math.sin(t*2)**2});toon(250,1290,1.0,t,{...BENNY,look:0.5,talk:1,brow:'raised',eyes:'wide'})});meter('GUM LOCATION','MOUTH',t);grade(0.05,0.3);endCard(seg,t)},
  gulp:(lt,p,t)=>{dolly(t,40,0);kitchen(t);layer(1,()=>{const k=ease(clamp(lt/1.2,0,1));toon(540,1290,1.25,t,{...BENNY,look:0,talk:lt<1.2?1:0,nod:lt>1.2&&lt<1.6?1:0,brow:'raised',eyes:lt>1.3?'wide':undefined});if(k<1){glow(560,lerp(860,930,k),40,'rgba(255,95,168,A)',0.7);sph(560,lerp(860,930,k),lerp(18,8,k),PINK)}});grade(0.15,0.1)},
  throat:(lt,p,t)=>{labBg(t);xray(540,1050,1.05,t,{k:lerp(0.02,0.3,ease(clamp(lt/2.2,0,1)))});meter('GUM LOCATION',lt<1.6?'THROAT':'STOMACH',t);timerBox('T+0:0'+Math.min(9,Math.floor(lt*3))) },
  stomach:(lt,p,t)=>{labBg(t);ctx.save();ctx.translate(605,835);ctx.scale(1.5,1.5);ctx.translate(-605,-835);xray(540,1050,1.05,t,{k:0.32+Math.sin(t*3)*0.01,acid:true,squeeze:true});ctx.restore();meter('STOMACH pH','≈ 2 · ACID',t,'#aaff78')},
  absorb:(lt,p,t)=>{labBg(t);const k=clamp(lt/2.2,0,1);glow(540,760,300,'rgba(255,95,168,A)',0.3);sph(540,760,lerp(110,90,k),PINK);for(let i=0;i<14;i++){const a=i*0.45+t,r=120+k*260+i*6;ctx.globalAlpha=1-k*0.8;ell(540+Math.cos(a)*r,760+Math.sin(a)*r*0.8,10,10,i%2?Y:CY);ctx.globalAlpha=1}
    meter('SUGAR + FLAVOR',Math.round((1-k)*100)+'%',t,Y)},
  rubber:(lt,p,t)=>{dolly(t,30,0);labBg(t);layer(1,()=>{sph(330,780,110,'#c89aa8');ctx.save();ctx.translate(760,780);ctx.rotate(t*0.8);ctx.strokeStyle='#2a2a2e';ctx.lineWidth=60;ctx.beginPath();ctx.arc(0,0,120,0,7);ctx.stroke();ctx.strokeStyle='#4a4a52';ctx.lineWidth=8;for(let i=0;i<12;i++){ctx.rotate(Math.PI/6);ctx.beginPath();ctx.moveTo(95,0);ctx.lineTo(148,0);ctx.stroke()}ctx.restore();
    ctx.fillStyle='#fff';ctx.font='900 80px Inter';ctx.textAlign='center';ctx.fillText('≈',545,805);sign3(250,480,580,110,[['GUM BASE = POLYMER',40]],t);toon(540,1310,0.95,t,{...BENNY,look:Math.sin(t*1.5)*0.6,brow:'raised'})});grade(0.05,0.3)},
  myth:(lt,p,t)=>{labBg(t);const k=ease(clamp((lt-0.6)/0.5,0,1));ctx.save();ctx.textAlign='center';ctx.font='900 140px Inter';ctx.fillStyle='#fff';ctx.fillText('7 YEARS?',540,820);ctx.restore();
    if(k>0){ctx.save();ctx.translate(540,760);ctx.rotate(-0.12);ctx.globalAlpha=k;ctx.strokeStyle='#ff4a4a';ctx.lineWidth=24;ctx.beginPath();ctx.moveTo(-420,40);ctx.lineTo(420,-40);ctx.stroke();ctx.font='900 90px Inter';ctx.fillStyle='#ff4a4a';ctx.textAlign='center';ctx.fillText('MYTH',0,220);ctx.restore()}toon(860,1310,0.9,t,{...BENNY,look:-0.6,dir:-1,brow:'raised',talk:1})},
  push:(lt,p,t)=>{labBg(t);xray(540,1050,1.05,t,{k:lerp(0.35,0.55,ease(clamp(lt/2.6,0,1))),squeeze:true});meter('GUM LOCATION','SMALL INTESTINE',t)},
  tubes:(lt,p,t)=>{labBg(t);const k=ease(clamp(lt/2.8,0,1));xray(540,1050,1.05,t,{k:lerp(0.55,0.95,k),squeeze:true});meter('GUM LOCATION',k<0.4?'SMALL INTESTINE':'LARGE INTESTINE',t);timerBox(k<0.5?'DAY 1':'DAY 2')},
  exit:(lt,p,t)=>{dolly(t,40,0);layer(3,()=>{room3(t,{wall:'#bfe0e8',floor:'#8aa8b0',back:[220,420,860,1060]});box3(420,520,240,540,30,'#f2f4f6',{dx:-0.2,dy:-0.3});ctx.fillStyle='#2a6a9a';ctx.font='900 40px Inter';ctx.textAlign='center';ctx.fillText('WC',540,600)},1.5);
    layer(1,()=>{const k=ease(clamp(lt/2,0,1));toon(lerp(540,260,k),1300,1.2,t,{...BENNY,walk:k<1?1:0,dir:-1,look:0.4,brow:'raised'});sign3(640,820,320,100,[['DAY 3 ✓',48,'#2a8a3a']],t)});grade(0.1,0.15)},
  danger:(lt,p,t)=>{dolly(t,40,0);kitchen(t);layer(1,()=>{for(let i=0;i<12;i++){const x=300+(i%6)*80,y=1000-Math.floor(i/6)*50;box3(x,y,70,40,20,i%2?'#3aa0d8':'#ff5fa8',{dx:-0.2,dy:-0.4})}
    sign3(330,640,420,110,[['× 20 PIECES / DAY',40,'#b82a2a']],t);toon(830,1300,1.1,t,{...BENNY,look:-0.6,dir:-1,brow:'sad',eyes:'wide'})});grade(0.15,0.1)},
  doctor:(lt,p,t,d,seg)=>{dolly(t,40,0);layer(3,()=>{room3(t,{wall:'#dfe8ec',floor:'#9aa8b0',back:[220,420,860,1060]});box3(440,500,380,300,30,'#1a2230',{dx:-0.2,dy:-0.3});ctx.save();ctx.beginPath();ctx.rect(460,520,340,260);ctx.clip();ctx.fillStyle='#0a1830';ctx.fillRect(460,520,340,260);xray(630,860,0.38,t,{k:0.5,gr:40});ctx.restore()},1.5);
    layer(1,()=>{toon(300,1300,1.2,t,{...DOC,look:0.5,talk:talkNow(seg,t),brow:'neutral'});evidence(630,850,60,t)});grade(0.05,0.2)},
  ask:(lt,p,t,d,seg)=>{dolly(t,30,0);kitchen(t);layer(1,()=>{toon(540,1300,1.3,t,{...BENNY,look:0,talk:talkNow(seg,t),brow:'raised'});const y=980+Math.sin(t*3)*6;glow(700,y,50,'rgba(255,95,168,A)',0.6);sph(700,y,22,PINK)});grade(0.15,0.1);endCard(seg,t)},
};
const CAM={hook:[1.08,1.0],gulp:[1.0,1.06],throat:[1.0,1.05],stomach:[1.0,1.06],absorb:[1.0,1.08],rubber:[1.0,1.05],myth:[1.06,1.0],push:[1.0,1.05],tubes:[1.0,1.06],exit:[1.0,1.05],danger:[1.0,1.06],doctor:[1.0,1.05],ask:[1.06,1.0]};
function sign3(x,y,w,h,lines,t){box3(x,y,w,h,14,'#e8e0cc',{dx:-0.3,dy:-0.4});ctx.fillStyle='#2a2620';ctx.textAlign='center';let yy=y+18;lines.forEach(([txt,size,col])=>{yy+=size+12;ctx.fillStyle=col||'#2a2620';ctx.font=`900 ${size}px "JetBrains Mono"`;ctx.fillText(txt,x+w/2,yy)})}
