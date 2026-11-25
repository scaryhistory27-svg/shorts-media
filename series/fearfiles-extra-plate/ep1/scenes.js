// FearFiles #9: Extra Plate — Thanksgiving: the skipped extra plate, an old man in a brown coat, candles out, family frozen smiling, he is in Grandma's 1952 photo.
const HERO={top:'#3b5a86',topD:'#2c4568'};const COAT='#6b4426',COATD='#4e2f19';
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
    ctx.strokeStyle='rgba(18,12,10,0.8)';ctx.lineWidth=3;ctx.beginPath();if(o.smile){ctx.arc(0,8,12,0.15*Math.PI,0.85*Math.PI)}else{ctx.moveTo(-8,14);ctx.lineTo(8,14)}ctx.stroke()}
  else{const bl=o.eyesClosed||(t%3.9)<0.12;ell(14+(o.look||0)*6,-2,4,bl?0.8:4.5,'#120c0a')}
  ctx.restore();ctx.restore()}
function chairsRow(y,s,xs,t,fill,o={}){xs.forEach((x,i)=>{if(fill&&fill[i]!=null)sitter(x,y,s,t,Object.assign({},fill[i]));else chair(x,y,s)})}
const TABLE_Y=1120;
function roomBg(t,o={}){const dk=o.dark||0;const g=ctx.createLinearGradient(0,150,0,TABLE_Y);g.addColorStop(0,'#2a1812');g.addColorStop(1,'#4a2a1b');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);
  ctx.strokeStyle='rgba(0,0,0,0.18)';ctx.lineWidth=3;for(let x=-60;x<W+100;x+=90){ctx.beginPath();ctx.moveTo(x,150);ctx.lineTo(x,TABLE_Y);ctx.stroke()} // wallpaper stripes
  ctx.fillStyle='#1f120c';ctx.fillRect(-100,TABLE_Y-40,W+200,H);
  // window with night + rain
  ctx.fillStyle='#0b1020';rr(80,380,220,300,8);ctx.fill();ctx.strokeStyle='#5a3a26';ctx.lineWidth=10;rr(80,380,220,300,8);ctx.stroke();ctx.beginPath();ctx.moveTo(190,380);ctx.lineTo(190,680);ctx.stroke();
  // framed photo (clue): Grandma + 2 people + a man in a brown coat
  photo(850,520,0.9,t,o.photoK||0);
  // chandelier
  ctx.strokeStyle='#2a1a10';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(540,150);ctx.lineTo(540,300);ctx.stroke();ell(540,310,60,16,'#8a6a3a');
  if(!dk){glow(540,330,520,'rgba(255,190,110,A)',0.22);lightCone(540,320,Math.PI/2,900,700,'255,210,150',0.08)}}
function photo(x,y,s,t,k){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#3a2414';rr(-120,-95,240,190,6);ctx.fill();ctx.fillStyle='#c9b08a';ctx.fillRect(-104,-80,208,160);
  ctx.fillStyle='rgba(80,55,30,0.85)';ctx.fillRect(-104,30,208,50); // table in photo
  for(const [px,col] of[[-62,'#6a5a48'],[-12,'#7a6a58'],[38,COAT]]){ell(px,-28,13,15,'#e0caa4');ctx.fillStyle=col;rr(px-17,-14,34,46,8);ctx.fill();ctx.fillStyle='#4a3828';ctx.beginPath();ctx.ellipse(px,-36,14,9,0,Math.PI,Math.PI*2);ctx.fill()}
  if(k>0){ell(38+4,-30,2,2,'#111');ell(38-4,-30,2,2,'#111');ctx.strokeStyle='#111';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(38,-24,5*k,0.15*Math.PI,0.85*Math.PI);ctx.stroke()}
  ctx.fillStyle='#3b2a1a';ctx.font='700 13px "JetBrains Mono"';ctx.textAlign='center';ctx.fillText('NOV 1952',0,72);
  ctx.fillStyle='rgba(120,80,40,0.18)';ctx.fillRect(-104,-80,208,160);ctx.restore()}
function candle(x,y,t,on){ctx.fillStyle='#efe6d0';rr(x-9,y-60,18,60,4);ctx.fill();if(on){const f=1+0.15*Math.sin(t*13+x);ctx.fillStyle='#ffcf6a';ctx.beginPath();ctx.ellipse(x,y-72,6*f,14*f,0,0,7);ctx.fill();glow(x,y-72,90,'rgba(255,180,80,A)',0.35)}
  else{ctx.strokeStyle='rgba(200,200,200,0.4)';ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<8;i++){const yy=y-64-i*12;ctx.lineTo(x+Math.sin(t*3+i)*6,yy)}ctx.stroke()}}
function table(t,o={}){const on=o.candles!==false;
  ctx.fillStyle='#e9e1cf';rr(80,TABLE_Y-70,920,170,16);ctx.fill();ctx.fillStyle='#d4ccba';ctx.fillRect(80,TABLE_Y+60,920,40);
  ctx.fillStyle='#c9a46a';ell(540,TABLE_Y-30,120,40,'#c9a46a');ell(540,TABLE_Y-58,82,46,'#9a5a26');ell(510,TABLE_Y-74,30,14,'rgba(255,220,170,0.4)'); // turkey
  for(const x of[210,360,720,870]){ell(x,TABLE_Y-20,52,16,'#f6f3ea');ell(x,TABLE_Y-20,34,10,'#e6dfcf')}
  if(o.extra)for(const x of[o.extra]){ell(x,TABLE_Y-20,52,16,'#fff8de');glow(x,TABLE_Y-20,120,'rgba(255,230,160,A)',0.25*(0.7+0.3*Math.sin(t*3)))}
  candle(420,TABLE_Y-40,t,on);candle(660,TABLE_Y-40,t,on)}
function family(t,o={}){const st=o.stare||0,still=!!o.still;
  [[260,'#7a3b3b'],[440,'#3f6a4a'],[640,'#6a5a8a'],[820,'#8a6a3a']].forEach(([x,top],i)=>sitter(x,TABLE_Y-30,0.95,t,{top,stare:st,smile:o.smile,look:still?0:Math.sin(t*1.2+i)*0.6,breathe:!still,gray:0}))}
const endCard=(seg,t)=>{const last=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>last+0.9){const a=ease(clamp((t-last-0.9)/0.5,0,1));ctx.fillStyle=`rgba(0,0,0,${0.8*a})`;ctx.fillRect(-100,-100,W+200,H+200);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 96px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}};
function frontDoor(t,o={}){ctx.fillStyle='#24140c';ctx.fillRect(-100,-100,W+200,H+200);const sh=shakeAt(t,['knock'],0.3,10);
  ctx.fillStyle='#120a06';ctx.fillRect(300,380,480,820);const op=o.open||0;
  if(op>0){const g=ctx.createLinearGradient(0,380,0,1200);g.addColorStop(0,'#0a0d18');g.addColorStop(1,'#151a28');ctx.fillStyle=g;ctx.fillRect(310,390,460,800);glow(540,420,300,'rgba(255,200,120,A)',0.35);lightCone(540,400,Math.PI/2,800,420,'255,210,140',0.12);
    if(o.man)walker(540,1180,1.25,t,{speed:0,top:COAT,topD:COATD,pants:'#2a2018',skin:'#d6bfa0',hair:'#cfc8bd',look:-1,reach:o.reach||0})}
  ctx.save();ctx.translate(310+sh,390);ctx.scale(1-op*0.85,1);ctx.fillStyle='#5a3220';ctx.fillRect(0,0,460,800);ctx.strokeStyle='#3e2115';ctx.lineWidth=10;for(const [px,py,pw,ph] of[[40,50,160,300],[260,50,160,300],[40,420,160,330],[260,420,160,330]])ctx.strokeRect(px,py,pw,ph);
  ell(410,420,14,14,'#d8b45a');ctx.restore();
  ctx.fillStyle='#d9a441';ell(540,340,26,8,'#d9a441');fog(t,900,H,'200,190,180',0.05)}
const SCN={
  hook:(lt,p,t,d,seg)=>{roomBg(t);family(t,{stare:seg===TL.segs[0]?0:1,still:seg!==TL.segs[0],smile:seg!==TL.segs[0]});table(t,{extra:540+280});
    sitter(1000,TABLE_Y-30,0.95,t,{gray:1,stare:1,breathe:false,look:-1});heartbeat(t,0.22);endCard(seg,t)},
  grandma:(lt,p,t)=>{roomBg(t);ctx.save();ctx.translate(540,TABLE_Y);ctx.scale(1.25,1.25);ctx.translate(-540,-TABLE_Y);table(t,{extra:870});ctx.restore();
    const a=clamp(lt/0.8,0,1);ctx.save();ctx.globalAlpha=a*0.85;walker(moveAlong(clamp(p*1.2,0,1),1150,900),TABLE_Y+120,1.1,t,{speed:p<0.8?1.2:0,top:'#8a5a7a',topD:'#6a3a5a',hair:'#e6e1d8',dir:-1,reach:p>0.75?1:0});ctx.restore()},
  skip:(lt,p,t)=>{roomBg(t);family(t);table(t);walker(moveAlong(p,-80,180),TABLE_Y+160,1.1,t,{speed:p<0.85?1.3:0,top:HERO.top,topD:HERO.topD,look:p>0.85?1:0})},
  knock:(lt,p,t)=>{frontDoor(t,{open:0});walker(170,1260,1.0,t,{speed:0,top:HERO.top,topD:HERO.topD,look:Math.sin(t*2)*0.3,scared:0.4})},
  guest:(lt,p,t,d,seg)=>{const first=seg.words[0].w==='An';frontDoor(t,{open:first?ease(clamp(lt/1.0,0,1)):1,man:true,reach:first&&p>0.5?0.6:0});
    walker(170,1270,1.05,t,{speed:0,top:HERO.top,topD:HERO.topD,look:1,scared:first?0.3:0.6})},
  smile:(lt,p,t)=>{ctx.fillStyle='#090b14';ctx.fillRect(-100,-100,W+200,H+200);glow(540,500,500,'rgba(255,200,120,A)',0.25);
    ctx.save();ctx.translate(540,820);ctx.scale(3.0,3.0);walker(0,240,1,t,{speed:0,top:COAT,topD:COATD,skin:'#d6bfa0',hair:'#cfc8bd',look:-1});ctx.restore();
    fog(t,900,H,'200,190,180',0.05)},
  dark:(lt,p,t)=>{roomBg(t,{dark:1});family(t);table(t,{candles:lt<0.35});ctx.fillStyle=`rgba(0,0,0,${clamp((lt-0.3)/0.3,0,1)*0.9})`;ctx.fillRect(-100,-100,W+200,H+200);
    if(lt>0.8)for(const x of[260,440,640,820]){ell(x-9,TABLE_Y-30-196,3,3,'rgba(255,240,200,0.8)');ell(x+9,TABLE_Y-30-196,3,3,'rgba(255,240,200,0.8)')}},
  still:(lt,p,t,d,seg)=>{roomBg(t);family(t,{stare:1,still:true,smile:seg.words[0].w==='My'});table(t,{candles:false});walker(1000,TABLE_Y+200,1.1,t,{speed:0,top:HERO.top,topD:HERO.topD,look:-1,scared:seg.words[0].w==='My'?1:0.4})},
  photo:(lt,p,t,d,seg)=>{roomBg(t,{photoK:seg.words[0].w==='The'?ease(clamp(lt/1.2,0,1)):0});ctx.fillStyle='rgba(0,0,0,0.55)';ctx.fillRect(-100,-100,W+200,H+200);photo(540,760,3.6,t,seg.words[0].w==='The'?ease(clamp(lt/1.2,0,1)):0);heartbeat(t,0.3)},
};
const CAM={hook:[1.08,1.0],grandma:[1.0,1.06],skip:[1.0,1.06],knock:[1.0,1.1],guest:[1.0,1.08],smile:[1.0,1.12],dark:[1.0,1.05],still:[1.06,1.0],photo:[1.0,1.15]};
