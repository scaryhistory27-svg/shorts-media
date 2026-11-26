// FearFiles #11: The Package — a box with no sender; inside a phone recording the living room one minute in the future.
const HERO={top:'#3b5a86',topD:'#2c4568'};
const endCard=(seg,t)=>{const last=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>last+0.9){const a=ease(clamp((t-last-0.9)/0.5,0,1));ctx.fillStyle=`rgba(0,0,0,${0.93*a})`;ctx.fillRect(-100,-100,W+200,H+200);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 100px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}};
function box(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const op=o.open||0;
  ctx.fillStyle='#9a6a3a';ctx.fillRect(-160,-110,320,220);ctx.fillStyle='#7a5028';ctx.fillRect(-160,-110,320,30);ctx.fillStyle='#c9a46a';ctx.fillRect(-20,-110,40,220);
  if(!op&&!o.noLabel){ctx.fillStyle='#f2efe6';rr(30,-60,110,80,6);ctx.fill();ctx.fillStyle='#222';ctx.fillRect(40,-48,80,5);ctx.fillRect(40,-38,60,5);ctx.fillStyle='#b3121a';ctx.font='800 9px "JetBrains Mono"';ctx.fillText('11:58 PM',42,8)}
  else{ctx.fillStyle='#6a4420';ctx.save();ctx.translate(-160,-110);ctx.rotate(-op*1.2);ctx.fillRect(0,-60,160,60);ctx.restore();ctx.save();ctx.translate(160,-110);ctx.rotate(op*1.2);ctx.fillRect(-160,-60,160,60);ctx.restore();
    glow(0,-110,200,'rgba(150,200,255,A)',0.5*op)}
  ctx.restore()}
function porchBg(t){const g=ctx.createLinearGradient(0,0,0,1300);g.addColorStop(0,'#06080f');g.addColorStop(1,'#151b2a');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);
  ctx.fillStyle='#2a2320';ctx.fillRect(-100,1150,W+200,H);ctx.fillStyle='#3a2f2a';for(let i=0;i<8;i++)ctx.fillRect(-100,1150+i*90,W+200,6);
  door(540,760,0);const f=life.flicker(t*0.6);ell(840,420,22,22,`rgba(255,220,150,${f})`);lightCone(840,430,Math.PI/2,900,500,'255,220,160',0.12*f);fog(t,1000,H,'200,200,220',0.05)}
function living(t,o={}){ctx.fillStyle='#14161d';ctx.fillRect(-100,-100,W+200,H+200);ctx.fillStyle='#1d212b';ctx.fillRect(-100,-100,W+200,1150);ctx.fillStyle='#0e1016';ctx.fillRect(-100,1150,W+200,H);
  // window + tv glow
  ctx.fillStyle='#0a1222';rr(120,330,260,330,8);ctx.fill();ctx.strokeStyle='#2c3444';ctx.lineWidth=8;rr(120,330,260,330,8);ctx.stroke();
  // couch
  const cx=o.cx??540,cy=o.cy??1080,s=o.s??1;ctx.save();ctx.translate(cx,cy);ctx.scale(s,s);ctx.fillStyle='#4a3a5a';rr(-300,-190,600,150,40);ctx.fill();ctx.fillStyle='#5a4a6c';rr(-330,-80,660,110,30);ctx.fill();rr(-360,-150,80,180,30);ctx.fill();rr(280,-150,80,180,30);ctx.fill();ctx.restore();
  glow(540,800,600,'rgba(120,160,255,A)',0.08)}
function sleeper(x,y,s,t){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=HERO.top;rr(-120,-60,200,70,30);ctx.fill();ell(110,-40,34,30,C.skin);ctx.fillStyle='#1d1512';ctx.beginPath();ctx.ellipse(118,-56,34,20,0,Math.PI,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#120c0a';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(100,-38);ctx.lineTo(112,-38);ctx.stroke();ctx.fillStyle='#1f2733';rr(-200,-40,110,40,18);ctx.fill();const b=Math.sin(t*1.6)*3;ctx.restore();}
function phoneVideo(t,o={}){phone(540,o.y??860,o.s??1.45,0,()=>{ctx.save();ctx.translate(-172,-362);ctx.scale(344/1080,724/1520);ctx.translate(0,-200);
    living(t,{cx:540,cy:1180,s:0.9});sleeper(470,1110,1.3,t);if(o.fig){const k=o.fig;const x=lerp(1100,700,clamp(k*1.5,0,1));ctx.save();glow(x,980,260,'rgba(255,60,60,A)',0.25);creature(x,1120-80*clamp((k-0.6)/0.4,0,1),1.0,t);ctx.restore()}ctx.restore();
    ctx.fillStyle='rgba(0,0,0,0.5)';ctx.fillRect(-172,-362,344,60);ell(-140,-332,8,8,Math.floor(t*2)%2?'#ff3a3a':'#5a1010');ctx.fillStyle='#fff';ctx.font='800 22px "JetBrains Mono"';ctx.textAlign='left';ctx.fillText('REC',-124,-324);ctx.textAlign='right';ctx.fillText(o.ts||'11:57 PM',160,-324)})}
const SCN={
  hook:(lt,p,t,d,seg)=>{porchBg(t);box(540,1230,1.1,t);ctx.save();ctx.globalAlpha=0.9;walker(280,1300,1.1,t,{speed:0,top:HERO.top,topD:HERO.topD,look:1,reach:0.3});ctx.restore();heartbeat(t,0.2);endCard(seg,t)},
  porch:(lt,p,t)=>{porchBg(t);box(540,1230,1.1,t);const op=ease(clamp(lt/0.9,0,1));ctx.save();ctx.translate(lerp(-200,0,op),0);walker(300,1300,1.1,t,{speed:op<1?1:0,top:HERO.top,topD:HERO.topD,look:1});ctx.restore()},
  label:(lt,p,t)=>{ctx.fillStyle='#0b0d14';ctx.fillRect(-100,-100,W+200,H+200);ctx.save();ctx.translate(540,820);ctx.scale(3.4,3.4);ctx.translate(-540,-820);box(540,850,1,t,{noLabel:true});ctx.restore();
    ctx.fillStyle='#f2efe6';rr(300,560,480,420,16);ctx.fill();ctx.fillStyle='#111';ctx.font='900 34px "JetBrains Mono"';ctx.textAlign='left';ctx.fillText('TO: ME',340,640);ctx.fillText('MY ADDRESS',340,700);ctx.fillStyle='#b3121a';ctx.fillText('FROM: —',340,790);ctx.fillStyle='#444';ctx.font='800 24px "JetBrains Mono"';ctx.fillText('DELIVER: NOV 26',340,880);ctx.fillText('11:58 PM',340,920)},
  unbox:(lt,p,t)=>{ctx.fillStyle='#0b0d14';ctx.fillRect(-100,-100,W+200,H+200);const op=ease(clamp(lt/1.0,0,1));box(540,1050,2.2,t,{open:op});const sh=shakeAt(t,['buzz'],0.6,8);
    phone(540+sh,lerp(1050,760,op),0.7,Math.sin(t*20)*0.02*(sh>0),()=>{ctx.fillStyle='#111';ctx.fillRect(-172,-362,344,724);ell(0,0,40,40,'#ff3a3a');ctx.fillStyle='#fff';ctx.font='900 40px Inter';ctx.textAlign='center';ctx.fillText('REC',0,100)})},
  screen:(lt,p,t)=>{ctx.fillStyle='#07080c';ctx.fillRect(-100,-100,W+200,H+200);glow(540,820,700,'rgba(120,160,255,A)',0.15);phoneVideo(t)},
  figure:(lt,p,t)=>{ctx.fillStyle='#07080c';ctx.fillRect(-100,-100,W+200,H+200);glow(540,820,700,'rgba(255,60,60,A)',0.15);phoneVideo(t,{fig:clamp(lt/(1.6),0,1)})},
  stamp:(lt,p,t)=>{ctx.fillStyle='#07080c';ctx.fillRect(-100,-100,W+200,H+200);ctx.save();ctx.globalAlpha=0.45;phoneVideo(t,{fig:1,ts:'11:58 PM',y:960,s:1.2});ctx.restore();clock('11:58',540,560,120,'#ff3a3a',t,'PM');ctx.fillStyle='#ff9a9a';ctx.font='800 34px "JetBrains Mono"';ctx.textAlign='center';ctx.fillText('VIDEO TIMESTAMP',540,720)},
  clock:(lt,p,t)=>{living(t);clock('11:57',540,560,130,'#ff3a3a',t,'PM');walker(540,1300,1.15,t,{speed:0,top:HERO.top,topD:HERO.topD,look:0,scared:0.8});heartbeat(t,0.35)},
  couch:(lt,p,t)=>{living(t,{cy:1000,s:0.9});const k=ease(clamp(lt/1.4,0,1));ctx.save();ctx.globalAlpha=k;glow(620,800,260,'rgba(255,60,60,A)',0.2);creature(620,960-k*40,0.9,t);ctx.restore();
    walker(300,1330,1.2,t,{speed:0,top:HERO.top,topD:HERO.topD,look:k>0.5?1:-1,scared:1})},
};
const CAM={hook:[1.08,1.0],porch:[1.0,1.06],label:[1.0,1.06],unbox:[1.0,1.08],screen:[1.0,1.06],figure:[1.0,1.1],stamp:[1.0,1.08],clock:[1.0,1.1],couch:[1.12,1.0]};
