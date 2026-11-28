// HOW TO SURVIVE #02 — falling elevator
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
function sign3(x,y,w,h,lines,t){box3(x,y,w,h,14,'#e8e0cc',{dx:-0.3,dy:-0.4});ctx.fillStyle='#2a2620';ctx.textAlign='center';let yy=y+18;lines.forEach(([txt,size,col])=>{yy+=size+12;ctx.fillStyle=col||'#2a2620';ctx.font=`900 ${size}px "JetBrains Mono"`;ctx.fillText(txt,x+w/2,yy)})}
// elevator shaft cutaway: car at y (top of car), cables n (0..4), brakes 0..1
function shaft(t,o={}){layer(3,()=>{ctx.fillStyle='#1a1e26';ctx.fillRect(-300,-300,W+600,H+600);const g=ctx.createLinearGradient(300,0,780,0);g.addColorStop(0,'#2a303c');g.addColorStop(0.5,'#3a4250');g.addColorStop(1,'#2a303c');ctx.fillStyle=g;ctx.fillRect(300,-300,480,H+600);
    ctx.fillStyle='#6a7280';ctx.fillRect(310,-300,16,H+600);ctx.fillRect(754,-300,16,H+600);for(let i=0;i<12;i++){const y=((i*260+(o.scroll||0))%2600)-300;ctx.fillStyle='rgba(255,210,58,0.6)';ctx.fillRect(300,y,480,10);ctx.fillStyle='#9aa4b0';ctx.font='900 34px Inter';ctx.textAlign='left';ctx.fillText('F'+(20-i),330,y-14)}},1.2);
  const y=o.y??700;layer(1,()=>{const n=o.cables??4;for(let i=0;i<4;i++){ctx.strokeStyle=i<n?'#c9d2dc':'rgba(201,210,220,0.2)';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(470+i*45,-300);ctx.lineTo(470+i*45,y);ctx.stroke();if(i>=n){ctx.beginPath();ctx.moveTo(470+i*45,y);ctx.lineTo(470+i*45+Math.sin(t*6+i)*20,y-120);ctx.stroke()}}
    box3(350,y,380,440,60,'#8a929e',{dx:0,dy:-0.3});ctx.fillStyle='rgba(255,240,200,0.85)';ctx.fillRect(380,y+40,320,370);glow(540,y+200,260,'rgba(255,240,200,A)',0.25);
    const bk=o.brakes||0;for(const sx of[-1,1]){const bx=sx<0?330+20*(1-bk):750-20*(1-bk);ctx.fillStyle=bk>0.5?'#ff5a3a':'#d8a020';rr(bx-20,y+20,40,70,8);ctx.fill();if(bk>0.8){for(let i=0;i<5;i++)ell(bx+sx*-10,y+90+i*14+Math.random()*4,4,4,'#ffd23a')}}})}
function inCar(x,y,s,t,o){toon(x,y,s,t,{...BENNY,...o})}
// lying-flat x-ray with impact arrows
function bodyFlat(t,o={}){ctx.save();ctx.translate(540,1040);glow(0,0,420,'rgba(95,212,255,A)',0.15);ctx.fillStyle='rgba(95,212,255,0.12)';ctx.strokeStyle='rgba(150,230,255,0.8)';ctx.lineWidth=5;rr(-330,-70,520,140,70);ctx.fill();ctx.stroke();ctx.beginPath();ctx.arc(260,0,80,0,7);ctx.fill();ctx.stroke();
  ctx.strokeStyle='rgba(220,245,255,0.3)';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(-320,0);ctx.lineTo(190,0);ctx.stroke();ctx.restore();
  const n=o.arrows||0;for(let i=0;i<9;i++){const x=230+i*70,len=o.spread?60:(i===4?200:0);if(!len)continue;ctx.strokeStyle=o.spread?CY:'#ff4a4a';ctx.lineWidth=o.spread?8:18;ctx.beginPath();ctx.moveTo(x,1180+len);ctx.lineTo(x,1130);ctx.stroke();ctx.beginPath();ctx.moveTo(x-16,1150);ctx.lineTo(x,1124);ctx.lineTo(x+16,1150);ctx.stroke()}}
const SCN={
  hook:(lt,p,t,d,seg)=>{dolly(t,20,0);shaft(t,{y:620+Math.sin(t*20)*3,cables:4,scroll:t*600});layer(1,()=>inCar(540,1040,0.9,t,{look:0,brow:'raised',eyes:'wide'}));meter('SPEED','FALLING',t,'#ff5a5a');grade(0.05,0.3);endCard(seg,t)},
  snap:(lt,p,t)=>{const k=lt>1.2?1:0;shaft(t,{y:620+(k?Math.sin(t*40)*8:0),cables:k?0:4,scroll:k?(lt-1.2)*900:0});layer(1,()=>inCar(540,1040,0.9,t,{look:k?0.4:0,brow:k?'sad':'neutral',eyes:k?'wide':undefined}));meter('FLOOR','20',t,Y)},
  good:(lt,p,t)=>{labBg(t);ctx.save();ctx.textAlign='center';ctx.font='900 96px Inter';ctx.fillStyle=CY;ctx.fillText('ALMOST',540,700);ctx.fillText('NEVER',540,810);ctx.restore();toon(540,1300,1.2,t,{...BENNY,look:0,brow:'raised',talk:1})},
  cables:(lt,p,t)=>{const k=Math.min(4,1+Math.floor(lt*1.6));shaft(t,{y:780,cables:k});layer(1,()=>inCar(540,1200,0.9,t,{look:-0.3}));meter('STEEL CABLES',k+' × ✓',t,CY)},
  brakes:(lt,p,t)=>{const k=ease(clamp(lt/0.8,0,1));shaft(t,{y:700,cables:0,brakes:k,scroll:(1-k)*t*500});layer(1,()=>inCar(540,1120,0.9,t,{look:0,brow:'raised'}));meter('SAFETY BRAKES',k>0.9?'LOCKED':'…',t,'#aaff78')},
  history:(lt,p,t)=>{dolly(t,30,0);layer(3,()=>{ctx.fillStyle='#d8c8a0';ctx.fillRect(-300,-300,W+600,H+600);ctx.fillStyle='#b8a880';ctx.fillRect(-300,1150,W+600,H)},1);layer(1,()=>{box3(380,420,320,700,30,'#8a6a3a',{dx:-0.2,dy:-0.3});const y=lerp(500,560,Math.abs(Math.sin(t)));box3(420,y,240,200,30,'#c8a060',{dx:-0.2,dy:-0.3});sign3(300,1180,480,100,[['1850s · SAFETY BRAKE',38]],t);toon(820,1300,1.0,t,{...BENNY,look:-0.5,dir:-1})});grade(0.3,0.05)},
  jump:(lt,p,t)=>{shaft(t,{y:620,cables:0,scroll:t*900});layer(1,()=>{const j=Math.max(0,Math.sin(lt*3))*60;inCar(540,1040-j,0.9,t,{look:0,brow:'raised'})});meter('BRAKES','FAILED',t,'#ff5a5a')},
  nope:(lt,p,t)=>{labBg(t);const sp=Math.max(0,1-ease(clamp(lt/1.2,0,1))*0.13);ctx.save();ctx.textAlign='center';ctx.fillStyle='#fff';ctx.font='800 40px Inter';ctx.fillText('FALL SPEED',540,560);ctx.font='900 130px "JetBrains Mono"';ctx.fillStyle='#ff5a5a';ctx.fillText(Math.round(67*sp)+' MPH',540,720);ctx.font='800 40px Inter';ctx.fillStyle=CY;ctx.fillText('WITH A PERFECT JUMP: −9 MPH',540,820);ctx.restore();toon(540,1300,1.1,t,{...BENNY,look:0,brow:'sad'})},
  knees:(lt,p,t)=>{labBg(t);xrayStand(t);const fl=Math.sin(t*10)>0;ctx.fillStyle=fl?'rgba(255,60,60,0.6)':'rgba(255,60,60,0.3)';ell(500,1030,40,40,ctx.fillStyle);ell(580,1030,40,40,ctx.fillStyle);meter('IMPACT','ALL ON LEGS',t,'#ff5a5a')},
  flat:(lt,p,t)=>{dolly(t,20,0);shaft(t,{y:620,cables:0});layer(1,()=>{const k=ease(clamp(lt/1.2,0,1));ctx.save();ctx.translate(lerp(540,700,k),lerp(1040,1000,k));ctx.rotate(-k*Math.PI/2);toon(0,0,0.85,t,{...BENNY,look:0,brow:'neutral'});ctx.restore()});meter('POSE','FLAT ✓',t,'#aaff78')},
  spread:(lt,p,t)=>{labBg(t);bodyFlat(t,{spread:true});meter('IMPACT','SPREAD OUT',t,CY)},
  record:(lt,p,t)=>{dolly(t,30,0);layer(3,()=>{const g=ctx.createLinearGradient(0,0,0,1200);g.addColorStop(0,'#8aa8c8');g.addColorStop(1,'#d8e0e8');ctx.fillStyle=g;ctx.fillRect(-300,-300,W+600,H+600)},1);layer(1.4,()=>{box3(430,300,220,900,40,'#9aa0aa',{dx:-0.2,dy:-0.3});box3(470,140,140,180,30,'#aab0ba',{dx:-0.2,dy:-0.3});ctx.fillStyle='#c9d2dc';ctx.fillRect(536,40,8,110);for(let r=0;r<18;r++)for(let c=0;c<4;c++){ctx.fillStyle='rgba(255,230,160,0.5)';ctx.fillRect(445+c*50,330+r*48,28,26)}});
    layer(1,()=>{sign3(170,1180,740,110,[['1945 · 75 FLOORS · SURVIVED',38,'#2a6a2a']],t)});grade(0.15,0.15)},
  ask:(lt,p,t,d,seg)=>{dolly(t,20,0);shaft(t,{y:620,cables:4,brakes:1});layer(1,()=>inCar(540,1040,0.95,t,{look:0,talk:talkNow(seg,t),brow:'raised'}));grade(0.05,0.3);endCard(seg,t)},
};
function xrayStand(t){ctx.save();ctx.translate(540,1060);glow(0,-300,420,'rgba(95,212,255,A)',0.15);ctx.fillStyle='rgba(95,212,255,0.12)';ctx.strokeStyle='rgba(150,230,255,0.8)';ctx.lineWidth=5;ctx.beginPath();ctx.arc(0,-560,80,0,7);ctx.fill();ctx.stroke();rr(-120,-470,240,330,60);ctx.fill();ctx.stroke();rr(-90,-150,70,250,30);ctx.fill();ctx.stroke();rr(20,-150,70,250,30);ctx.fill();ctx.stroke();
  ctx.strokeStyle='rgba(220,245,255,0.35)';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(-55,-140);ctx.lineTo(-55,90);ctx.moveTo(55,-140);ctx.lineTo(55,90);ctx.stroke();ctx.restore();ctx.strokeStyle='#ff4a4a';ctx.lineWidth=18;for(const x of[485,595]){ctx.beginPath();ctx.moveTo(x,1260);ctx.lineTo(x,1180);ctx.stroke()}}
const CAM={hook:[1.08,1.0],snap:[1.0,1.06],good:[1.0,1.05],cables:[1.0,1.05],brakes:[1.0,1.06],history:[1.0,1.05],jump:[1.0,1.06],nope:[1.0,1.04],knees:[1.0,1.06],flat:[1.0,1.05],spread:[1.0,1.05],record:[1.0,1.06],ask:[1.06,1.0]};
