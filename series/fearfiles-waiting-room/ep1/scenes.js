// FearFiles #8: Waiting Room — ticket 47, the screen stuck on 12, fall asleep, wake at 3 AM with every chair full, the double takes 48.
const HERO={top:'#3b5a86',topD:'#2c4568',pants:'#1f2733'};
const WALL_Y=980; // where back wall meets the floor
function roomBg(t,o={}){const dim=o.dim||0;
  const g=ctx.createLinearGradient(0,200,0,WALL_Y);g.addColorStop(0,'#1d2a26');g.addColorStop(1,'#2f3f37');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,WALL_Y+100);
  // wainscot
  ctx.fillStyle='#24302b';ctx.fillRect(-100,WALL_Y-160,W+200,160);ctx.fillStyle='rgba(0,0,0,0.25)';ctx.fillRect(-100,WALL_Y-164,W+200,6);
  // floor with perspective tiles
  const fg=ctx.createLinearGradient(0,WALL_Y,0,H);fg.addColorStop(0,'#3a3f3a');fg.addColorStop(1,'#151816');ctx.fillStyle=fg;ctx.fillRect(-100,WALL_Y,W+200,H-WALL_Y+100);
  ctx.strokeStyle='rgba(0,0,0,0.35)';ctx.lineWidth=3;for(let i=-8;i<=8;i++){ctx.beginPath();ctx.moveTo(540+i*70,WALL_Y);ctx.lineTo(540+i*420,H+100);ctx.stroke()}
  for(let k=1;k<9;k++){const y=WALL_Y+(H-WALL_Y)*Math.pow(k/9,1.7);ctx.beginPath();ctx.moveTo(-100,y);ctx.lineTo(W+100,y);ctx.stroke()}
  // window (left) — dark night glass
  if(!o.noWindow){ctx.fillStyle='#0b111c';rr(70,420,250,330,10);ctx.fill();ctx.strokeStyle='#4a5a52';ctx.lineWidth=10;rr(70,420,250,330,10);ctx.stroke();ctx.beginPath();ctx.moveTo(195,420);ctx.lineTo(195,750);ctx.stroke();
    ctx.fillStyle='rgba(160,190,220,0.08)';ctx.beginPath();ctx.moveTo(90,440);ctx.lineTo(170,440);ctx.lineTo(100,600);ctx.fill();
    if(o.reflect){ctx.save();ctx.beginPath();rr(75,425,240,320,8);ctx.clip();ctx.globalAlpha=o.reflect*0.55;for(let r=0;r<2;r++)for(let c=0;c<4;c++){const x=105+c*60,y=640+r*70;ctx.fillStyle='#8fa6b8';ell(x,y-38,12,14,'#8fa6b8');rr(x-14,y-26,28,40,8);ctx.fill();ell(x-4,y-40,2.5,2.5,'#fff');ell(x+4,y-40,2.5,2.5,'#fff')}ctx.restore()}}
  // door (back wall, right of centre)
  if(!o.noDoor){ctx.fillStyle='#1a2420';ctx.fillRect(590,560,190,WALL_Y-560);ctx.fillStyle='#3e4b44';ctx.fillRect(600,570,170,WALL_Y-570);ctx.fillStyle='#c9cfc4';ell(750,780,7,7,'#c9cfc4');
    ctx.fillStyle='#d9dfd2';ctx.font='800 22px Inter';ctx.textAlign='center';ctx.fillText('EXAM 1',685,610)}
  // fluorescent panels
  for(const x of[270,810]){const f=o.flick?life.flicker(t+x):1;ctx.fillStyle=`rgba(225,245,225,${0.9*f*(1-dim)})`;rr(x-120,236,240,26,6);ctx.fill();if(f>0.5&&dim<0.9)lightCone(x,262,Math.PI/2,760,520,'210,240,210',0.10*(1-dim))}
  if(dim){ctx.fillStyle=`rgba(3,6,10,${dim})`;ctx.fillRect(-100,-100,W+200,H+200)}}
function screenBox(x,y,s,num,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#0a0c0f';rr(-150,-80,300,160,14);ctx.fill();ctx.strokeStyle='#59625c';ctx.lineWidth=6;rr(-150,-80,300,160,14);ctx.stroke();
  ctx.fillStyle='#ff9a3a';ctx.font='800 26px "JetBrains Mono"';ctx.textAlign='center';ctx.fillText('NOW SERVING',0,-40);
  const col=o.red?'#ff2a2a':'#ffb347';const on=!o.blink||Math.floor(t*4)%2===0;if(on){ctx.shadowColor=col;ctx.shadowBlur=40;ctx.fillStyle=col;ctx.font='900 92px "JetBrains Mono"';ctx.fillText(String(num),0,52);ctx.shadowBlur=0}
  ctx.restore()}
function chair(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#5a3b2b';rr(-46,-150,92,100,14);ctx.fill();ctx.fillStyle='#6b4834';rr(-50,-60,100,26,8);ctx.fill();
  ctx.strokeStyle='#202422';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(-38,-34);ctx.lineTo(-42,0);ctx.moveTo(38,-34);ctx.lineTo(42,0);ctx.stroke();ctx.restore()}
// seated person: o = {top, skin, hair, gray (ghost 0..1), look (-1..1), stare (0..1 face to camera, white eyes), nod (0..1 head drop), eyesClosed, breathe}
function sitter(x,y,s,t,o={}){chair(x,y,s);ctx.save();ctx.translate(x,y);ctx.scale(s,s);const g=o.gray||0;
  const mix=(c1,c2)=>g>0?c2:c1;const top=mix(o.top||'#6b5a4a','#5f6b70'),skin=mix(o.skin||C.skin,'#9aa7ad'),hair=mix(o.hair||'#1d1512','#3c464b');
  const br=o.breathe===false?0:Math.sin(t*2.2)*2;
  ctx.strokeStyle=o.pants||(g?'#3f494e':'#1f2733');ctx.lineWidth=24;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-8,-62);ctx.lineTo(34,-62);ctx.lineTo(38,-4);ctx.stroke();
  ctx.fillStyle=top;rr(-30,-176+br,60,120,22);ctx.fill();ctx.fillStyle='rgba(0,0,0,0.25)';rr(-30,-176+br,60,14,8);ctx.fill();
  ctx.strokeStyle=shade(top,0.75);ctx.lineWidth=18;ctx.beginPath();ctx.moveTo(18,-160+br);ctx.lineTo(36,-110+br);ctx.lineTo(44,-74);ctx.stroke();ell(46,-72,9,9,skin);
  const nod=o.nod||0,hx=(o.look||0)*6,hy=-206+br+nod*26;ctx.save();ctx.translate(hx,hy);ctx.rotate(nod*0.35);
  ell(0,0,26,30,skin);ctx.fillStyle=hair;ctx.beginPath();ctx.ellipse(-2,-10,28,24,0,Math.PI*0.95,Math.PI*2.05);ctx.fill();
  const st=o.stare||0;
  if(st>0.5){ell(-9,-2,4.5,o.eyesClosed?0.8:5,g?'#f4f7f2':'#120c0a');ell(9,-2,4.5,o.eyesClosed?0.8:5,g?'#f4f7f2':'#120c0a');if(g){glow(0,-2,40,'rgba(230,255,240,A)',0.12)}
    ctx.strokeStyle='rgba(18,12,10,0.6)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-8,14);ctx.lineTo(8,14);ctx.stroke()}
  else{const bl=o.eyesClosed||(t%3.9)<0.12;ell(14+(o.look||0)*6,-2,4,bl?0.8:4.5,'#120c0a')}
  ctx.restore();ctx.restore()}
function chairsRow(y,s,xs,t,fill,o={}){xs.forEach((x,i)=>{if(fill&&fill[i]!=null)sitter(x,y,s,t,Object.assign({},fill[i]));else chair(x,y,s)})}
function ticketDispenser(x,y,s,t){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#2a2f2c';ctx.fillRect(-8,0,16,240);ctx.fillStyle='#b3201c';rr(-70,-120,140,140,18);ctx.fill();
  ctx.fillStyle='#fff';ctx.font='900 24px Inter';ctx.textAlign='center';ctx.fillText('TAKE A',0,-74);ctx.fillText('NUMBER',0,-46);ctx.fillStyle='#111';rr(-40,-10,80,14,4);ctx.fill();ctx.restore()}
function ticketPaper(x,y,s,num,rot){ctx.save();ctx.translate(x,y);ctx.rotate(rot||0);ctx.scale(s,s);ctx.fillStyle='#f1ecdc';rr(-60,-90,120,180,6);ctx.fill();ctx.strokeStyle='rgba(0,0,0,0.25)';ctx.setLineDash([6,6]);ctx.beginPath();ctx.moveTo(-56,-62);ctx.lineTo(56,-62);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle='#555';ctx.font='700 18px Inter';ctx.textAlign='center';ctx.fillText('YOUR NUMBER',0,-70);ctx.fillStyle='#b3201c';ctx.font='900 76px "JetBrains Mono"';ctx.fillText(String(num),0,30);ctx.restore()}
const FRONT=[190,365,540,715,890],BACK=[260,420,580,740];
function crowd(t,o={}){ // every chair full of gray staring people (they turn to camera with jerky stop-motion)
  const turn=o.turn??1;
  chairsRow(WALL_Y+40,0.72,BACK,t,BACK.map((x,i)=>({gray:1,stare:jerky(clamp(turn*1.4-i*0.12,0,1),5,i+3)>0.5?1:0,look:-0.6,breathe:false})));
  chairsRow(WALL_Y+300,1.0,FRONT,t,FRONT.map((x,i)=>i===2?null:({gray:1,stare:jerky(clamp(turn*1.3-i*0.1,0,1),5,i+7)>0.5?1:0,look:0.6,breathe:false})));}
const endCard=(seg,t)=>{const last=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>last+0.9){const a=ease(clamp((t-last-0.9)/0.5,0,1));ctx.fillStyle=`rgba(0,0,0,${0.8*a})`;ctx.fillRect(-100,-100,W+200,H+200);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 104px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}};
const SCN={
  hook:(lt,p,t,d,seg)=>{roomBg(t,{flick:true});screenBox(830,420,1,12,t);crowd(t,{turn:clamp(lt/1.2,0,1)});
    sitter(540,WALL_Y+300,1.0,t,{top:HERO.top,stare:0,look:Math.sin(t*1.6)*0.8});heartbeat(t,0.25);fog(t,WALL_Y-100,H,'190,220,200',0.05);endCard(seg,t)},
  ticket:(lt,p,t)=>{roomBg(t,{noWindow:true});ticketDispenser(420,760,2.2,t);const pull=ease(clamp(lt/1.2,0,1));
    ticketPaper(420,760+pull*230,1.6,47,Math.sin(t*1.4)*0.05);ctx.fillStyle=C.skin;ell(470,760+pull*230+150,40,34,C.skin);ctx.fillStyle=HERO.top;rr(440,760+pull*230+170,90,260,30);ctx.fill();fog(t,800,H,'190,220,200',0.04)},
  screen:(lt,p,t)=>{roomBg(t,{flick:true,noDoor:true,noWindow:true});screenBox(540,560,2.0,12,t);
    walker(540,1250,1.1,t,{speed:0,top:HERO.top,topD:HERO.topD,look:Math.sin(t*0.9)*0.3});glow(540,560,500,'rgba(255,170,70,A)',0.12)},
  room:(lt,p,t,d)=>{const r=Math.abs(p-0.55)<0.07?1:0;roomBg(t,{reflect:r});screenBox(830,420,1,12,t);
    chairsRow(WALL_Y+40,0.72,BACK,t,[{gray:0.0,top:'#4d4d55',breathe:false,look:-0.2},null,null,{top:'#6a4b3c',breathe:false,look:0.3}]);
    chairsRow(WALL_Y+300,1.0,FRONT,t,[null,{top:'#505a46',breathe:false},{top:HERO.top,look:Math.sin(lt*1.8)*0.9},null,{top:'#5b4a62',breathe:false,look:-0.4}]);fog(t,WALL_Y-100,H,'190,220,200',0.05)},
  sleep:(lt,p,t)=>{roomBg(t,{dim:0.15+p*0.55,noWindow:true});const nod=ease(clamp((p-0.25)/0.6,0,1));
    ctx.save();ctx.translate(540,1000);ctx.scale(1.7,1.7);ctx.translate(-540,-1000);sitter(540,1150,1,t,{top:HERO.top,nod,eyesClosed:p>0.3});ctx.restore()},
  clock:(lt,p,t)=>{roomBg(t,{dim:0.5,flick:true,noWindow:true,noDoor:true});const cx=540,cy=640,R=230;ell(cx,cy,R+18,R+18,'#2b2f2c');ell(cx,cy,R,R,'#e8e6da');
    ctx.strokeStyle='#222';for(let i=0;i<12;i++){const a=i/12*Math.PI*2;ctx.lineWidth=i%3?4:9;ctx.beginPath();ctx.moveTo(cx+Math.sin(a)*R*0.82,cy-Math.cos(a)*R*0.82);ctx.lineTo(cx+Math.sin(a)*R*0.94,cy-Math.cos(a)*R*0.94);ctx.stroke()}
    const spin=1-ease(clamp(lt/1.4,0,1));const ha=(3/12)*Math.PI*2+spin*12,ma=spin*60;
    ctx.lineCap='round';ctx.lineWidth=14;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.sin(ha)*R*0.5,cy-Math.cos(ha)*R*0.5);ctx.stroke();ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.sin(ma)*R*0.78,cy-Math.cos(ma)*R*0.78);ctx.stroke();ell(cx,cy,14,14,'#b3201c');
    sitter(540,1240,1.0,t,{top:HERO.top,stare:0,look:Math.sin(t*3)*0.4})},
  full:(lt,p,t)=>{roomBg(t,{dim:0.25,flick:true});screenBox(830,420,1,12,t);crowd(t,{turn:clamp(lt/1.0,0,1)});
    sitter(540,WALL_Y+300,1.0,t,{top:HERO.top,look:Math.sin(t*5)*0.9});heartbeat(t,0.4);fog(t,WALL_Y-100,H,'190,220,200',0.06)},
  serving:(lt,p,t)=>{roomBg(t,{dim:0.35,flick:true,noWindow:true,noDoor:true});screenBox(540,600,2.1,47,t,{red:true,blink:true});glow(540,600,560,'rgba(255,40,40,A)',0.18);
    crowd(t,{turn:1})},
  door:(lt,p,t)=>{roomBg(t,{dim:0.3,noWindow:true});const op=ease(clamp(lt/1.1,0,1));ctx.save();ctx.fillStyle='#f3f6ea';ctx.globalAlpha=op;ctx.fillRect(600,570,170,WALL_Y-570);ctx.restore();
    lightCone(685,600,Math.PI/2,900,600*op+1,'240,250,230',0.16*op);ctx.fillStyle='#3e4b44';ctx.beginPath();ctx.moveTo(600,570);ctx.lineTo(600+170*(1-op*0.8),570+30*op);ctx.lineTo(600+170*(1-op*0.8),WALL_Y-30*op);ctx.lineTo(600,WALL_Y);ctx.fill();
    if(op>0.3){ctx.save();ctx.globalAlpha=clamp((op-0.3)/0.4,0,1);walker(690,WALL_Y-10,0.95,t,{speed:0,top:'#e9efe6',topD:'#c9d1c6',pants:'#d9dfd4',skin:'#c8b4a0',hair:'#2a1e18'});
      const sm=clamp((lt-1.1)/0.6,0,1);ctx.strokeStyle='#120c0a';ctx.lineWidth=3;ctx.beginPath();ctx.arc(690+12,WALL_Y-10-262*0.95+18,10*sm+0.1,0.15*Math.PI,0.85*Math.PI);ctx.stroke();ctx.restore()}
    sitter(300,WALL_Y+360,1.15,t,{top:HERO.top,look:0.9})},
  double:(lt,p,t,d,seg)=>{roomBg(t,{dim:0.2});ticketDispenser(250,760,1.2,t);const reach=clamp(lt/1.0,0,1);
    const H2=seg.words[0].w==='He';const turn=H2?ease(clamp(lt/0.8,0,1)):0;
    walker(330,WALL_Y+80,1.05,t,{speed:0,top:HERO.top,topD:HERO.topD,reach:reach*(1-turn),look:-1+turn*2});
    if(reach>0.6&&!H2)ticketPaper(255,800+20*(reach-0.6),0.6,48,0);
    if(H2)ticketPaper(410,WALL_Y-110,0.7,48,0.2);
    ctx.save();ctx.translate(820,1000);walker(0,300,1.35,t,{speed:0,top:HERO.top,topD:HERO.topD,look:-1,scared:H2?1:0.3});ctx.restore();fog(t,WALL_Y-100,H,'190,220,200',0.05)},
};
const CAM={hook:[1.08,1.0],ticket:[1.0,1.08],screen:[1.0,1.1],room:[1.0,1.06],sleep:[1.0,1.1],clock:[1.0,1.12],full:[1.12,1.0],serving:[1.0,1.15],door:[1.0,1.1],double:[1.0,1.08]};
