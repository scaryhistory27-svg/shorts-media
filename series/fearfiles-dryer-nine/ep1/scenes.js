// FearFiles: Dryer Nine — standalone. 24-h laundromat, 11:52 PM: voicemail from my own number; dryer nine; doppelgänger in the glass.
const ME={top:'#4a6a8a',topD:'#3a5470',hair:'#1d1512',skin:'#d9a882',pants:'#22283a'};
const nth=seg=>{const i=TL.segs.indexOf(seg);let n=0;for(let j=0;j<i;j++)if(TL.segs[j].scene===seg.scene)n++;return n};
function me(x,y,s,t,o={}){walker(x,y,s,t,Object.assign({},ME,o))}
const tubeOn=(t,i)=>Math.sin(t*17+i*3.1)>-0.92?1:0.25;
// wide laundromat: back wall with night window + rain, perspective row of dryers on the right, tiles, flickering tubes
function laundro(t,o={}){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#141a1c');g.addColorStop(1,'#20282a');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);
  const vx=470,vy=760;
  // back wall + street window with rain
  ctx.fillStyle='#253033';ctx.fillRect(vx-300,vy-420,600,600);ctx.fillStyle='#070a12';ctx.fillRect(vx-250,vy-370,500,330);
  ctx.strokeStyle='rgba(160,190,220,0.35)';ctx.lineWidth=2;const r=rnd(5);for(let i=0;i<40;i++){const x=vx-250+r()*500,y=vy-370+((r()*330+t*420*(0.7+r()*0.6))%330);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-4,y+18);ctx.stroke()}
  glow(vx+120,vy-200,120,'rgba(255,120,80,A)',0.25*(0.7+0.3*Math.sin(t*2)));ctx.strokeStyle='#0b0e10';ctx.lineWidth=12;ctx.strokeRect(vx-250,vy-370,500,330);
  // wall clock (shows 11:52)
  ctx.save();ctx.translate(vx-170,vy-470+60);ell(0,0,46,46,'#e8e4da');ctx.strokeStyle='#111';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.sin(-0.15)*24,-Math.cos(-0.15)*24);ctx.moveTo(0,0);ctx.lineTo(Math.sin(5.45)*36,-Math.cos(5.45)*36);ctx.stroke();ctx.restore();
  // left wall + floor
  ctx.fillStyle='#1c2426';ctx.beginPath();ctx.moveTo(-100,-100);ctx.lineTo(vx-300,vy-420);ctx.lineTo(vx-300,vy+180);ctx.lineTo(-100,H+100);ctx.fill();
  ctx.fillStyle='#2c3436';ctx.beginPath();ctx.moveTo(vx-300,vy+180);ctx.lineTo(vx+300,vy+180);ctx.lineTo(W+600,H+100);ctx.lineTo(-600,H+100);ctx.fill();
  ctx.strokeStyle='rgba(0,0,0,0.28)';ctx.lineWidth=3;for(let i=-8;i<=8;i++){ctx.beginPath();ctx.moveTo(vx+i*38,vy+180);ctx.lineTo(vx+i*260,H+100);ctx.stroke()}for(let k=1;k<7;k++){const y=vy+180+Math.pow(k/7,1.8)*(H-vy);ctx.beginPath();ctx.moveTo(-100,y);ctx.lineTo(W+100,y);ctx.stroke()}
  // right wall: dryers in perspective (nearest = biggest). index 9 is o.nine-th from back
  ctx.fillStyle='#1a2224';ctx.beginPath();ctx.moveTo(W+100,-100);ctx.lineTo(vx+300,vy-420);ctx.lineTo(vx+300,vy+180);ctx.lineTo(W+100,H+100);ctx.fill();
  for(let i=0;i<5;i++){const k=i/5,k2=(i+1)/5;const x0=vx+300+(W+60-(vx+300))*Math.pow(k,1.3),x1=vx+300+(W+60-(vx+300))*Math.pow(k2,1.3);const sc=(x1-x0)/120;
    const yt=vy-80-(i*60),yb=vy+180+i*130;ctx.fillStyle='#c9cfd2';ctx.beginPath();ctx.moveTo(x0,yt+i*8);ctx.lineTo(x1,yt-30*sc);ctx.lineTo(x1,yb+30*sc);ctx.lineTo(x0,yb);ctx.fill();
    const cx=(x0+x1)/2,cy=(yt+yb)/2,R=Math.min(x1-x0,yb-yt)*0.32;const nine=i===(o.nineAt??2);ell(cx,cy,R,R*1.15,'#3a4448');
    ctx.save();ctx.beginPath();ctx.ellipse(cx,cy,R*0.85,R,0,0,7);ctx.clip();ctx.fillStyle='#0c1012';ctx.fillRect(cx-R,cy-R*1.2,R*2,R*2.4);
    if(nine&&o.spin){for(let j=0;j<3;j++){const a=t*7+j*2.1;ell(cx+Math.cos(a)*R*0.45,cy+Math.sin(a)*R*0.5,R*0.3,R*0.22,j===1&&o.clue?'#4a6a8a':'#262e30')}}ctx.restore();
    ctx.fillStyle=nine?'#ff4d4d':'#333';ctx.font=`900 ${Math.max(14,22*sc)}px Inter`;ctx.textAlign='center';ctx.fillText(String(13-i*2+(nine?0:0)),cx,yt+30*sc);
    if(nine){ctx.fillStyle='#ff4d4d';ctx.fillText('9',cx,yt+30*sc)}}
  // fluorescent tubes
  for(let i=0;i<3;i++){const y=vy-500-(2-i)*150,w=160+i*120,on=tubeOn(t,i);ctx.fillStyle=`rgba(230,255,245,${on})`;rr(vx-w/2,y,w,14,7);ctx.fill();glow(vx,y,w,'rgba(200,255,235,A)',0.22*on);lightCone(vx,y,0,1200,w*1.2,'200,255,235',0.06*on)}
  fog(t,vy,H,'190,220,215',0.04)}
// bench in front
function bench(x,y){ctx.fillStyle='#5a4632';rr(x-200,y-40,400,30,8);ctx.fill();ctx.fillStyle='#2a2018';ctx.fillRect(x-180,y-10,18,90);ctx.fillRect(x+162,y-10,18,90)}
// big dryer close-up: drum window, glass reflection layer
function dryer(t,o={}){ctx.fillStyle='#10161a';ctx.fillRect(-100,-100,W+200,H+200);glow(540,300,700,'rgba(200,255,235,A)',0.08*tubeOn(t,1));
  ctx.fillStyle='#cfd5d8';rr(90,260,900,1300,40);ctx.fill();ctx.fillStyle='#b5bcbf';rr(90,260,900,190,40);ctx.fill();ctx.fillStyle='#ff4d4d';ctx.font='900 120px Inter';ctx.textAlign='center';ctx.fillText('9',540,400);
  ell(800,355,36,36,'#2a2f33');ell(800,355,10,10,o.on?'#4dff8a':'#552');
  const cx=540,cy=930,R=330,doorA=o.open||0;
  ell(cx,cy,R+40,R+40,'#8e979b');ctx.save();ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.clip();ctx.fillStyle='#07090b';ctx.fillRect(cx-R,cy-R,R*2,R*2);
  const sp=o.spin??0;ctx.strokeStyle='rgba(120,130,135,0.25)';ctx.lineWidth=4;for(let i=0;i<12;i++){const a=i/12*7+t*sp*6;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);ctx.stroke()}
  if(o.inside)o.inside(cx,cy,R);
  // glass sheen + reflection
  if(o.refl)o.refl(cx,cy,R);const gg=ctx.createLinearGradient(cx-R,cy-R,cx+R,cy+R);gg.addColorStop(0,'rgba(255,255,255,0.16)');gg.addColorStop(0.4,'rgba(255,255,255,0.02)');gg.addColorStop(1,'rgba(255,255,255,0.08)');ctx.fillStyle=gg;ctx.fillRect(cx-R,cy-R,R*2,R*2);ctx.restore();
  if(doorA>0){ctx.save();ctx.translate(cx-R-40,cy);ctx.scale(1-doorA*0.85,1);ctx.translate(-(cx-R-40),-cy);ell(cx,cy,R+40,R+40,'#a7b0b4');ell(cx,cy,R,R,'rgba(30,40,45,0.85)');ctx.restore()}}
function vmScreen(t,o={}){ctx.fillStyle='#0b0f17';ctx.fillRect(-200,-400,400,800);ctx.textAlign='center';ctx.fillStyle='#9fb3c8';ctx.font='700 26px Inter';ctx.fillText('VOICEMAIL',0,-300);
  ctx.fillStyle='#fff';ctx.font='900 44px Inter';ctx.fillText('ME',0,-230);ctx.fillStyle='#ff6b6b';ctx.font='800 26px Inter';ctx.fillText('(your number)',0,-190);
  ctx.fillStyle=o.red?'#ff6b6b':'#e8eef7';ctx.font='700 21px Inter';ctx.fillText(o.when||'Sent: TOMORROW · 11:52 PM',0,-140);
  for(let i=0;i<16;i++){const h=o.play?8+Math.abs(Math.sin(t*12+i*1.7))*70:8;ctx.fillStyle=o.red?'#ff6b6b':'#5fbfff';ctx.fillRect(-150+i*19,40-h/2,11,h)}
  ell(0,250,62,62,o.play?'#e33':'#2a8a4a');ctx.fillStyle='#fff';if(o.play){ctx.fillRect(-18,228,12,44);ctx.fillRect(6,228,12,44)}else{ctx.beginPath();ctx.moveTo(-14,226);ctx.lineTo(24,250);ctx.lineTo(-14,274);ctx.fill()}}
function hand(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#d9a882';rr(-70,0,140,220,50);ctx.fill();for(let i=0;i<4;i++){rr(-200,-30+i*48,80,40,20);ctx.fill()}ctx.fillStyle=ME.top;rr(-90,180,180,200,20);ctx.fill();ctx.restore()}
const endCard=(seg,t)=>{const last=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>last+0.9){const a=ease((t-last-0.9)/0.5);ctx.fillStyle=`rgba(0,0,0,${0.8*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 104px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}};
const SCN={
 hookPhone(lt,p,t,d,seg){const k=nth(seg);laundro(t,{spin:true});ctx.fillStyle='rgba(0,0,0,0.55)';ctx.fillRect(-100,-100,W+200,H+200);
   const buzz=Math.sin(t*60)*(lt<1.2?5:1.5);hand(540+buzz,1060,1.0);phone(540+buzz,820,1.12,-0.04+Math.sin(t*1.4)*0.02,()=>{vmScreen(t,{red:true});
     // hidden clue: second face in the black glass for the first 0.5 s
     if(k===0&&lt<0.5){ctx.globalAlpha=0.28;mom(60,-60,0.5,{creepy:0.8,blink:0});ctx.globalAlpha=1}});
   heartbeat(t,0.35);if(k)endCard(seg,t)},
 laundro(lt,p,t,d,seg){const k=nth(seg);laundro(t,{spin:k>0||lt>1.5,clue:false});bench(330,1500);
   if(k===0){me(330,1500,1.8,t,{speed:0,dir:1,look:0.3,reach:0.35+0.1*Math.sin(t*2)});const bz=Math.sin(t*55)*4;phone(440+bz,1150,0.22,0.3,()=>{ctx.fillStyle='#5fbfff';ctx.fillRect(-200,-400,400,800)})}
   else if(k===1){const x=moveAlong(p,330,160);me(x,1500,1.8,t,{speed:p<0.8?-0.9:0,dir:1,look:0.4,scared:0.6});const bz=Math.sin(t*55)*5;phone(x+110+bz,1150,0.22,0.3,()=>{ctx.fillStyle='#ff6b6b';ctx.fillRect(-200,-400,400,800)})}
   else{me(330,1500,1.8,t,{speed:0,dir:1,look:0.5,scared:0.8})}heartbeat(t,0.3)},
 playVM(lt,p,t,d,seg){const k=nth(seg);laundro(t,{spin:true});ctx.fillStyle='rgba(0,0,0,0.6)';ctx.fillRect(-100,-100,W+200,H+200);
   hand(540,1040,1.0);phone(540,800,1.12,-0.03+Math.sin(t*1.3)*0.015,()=>{vmScreen(t,{play:true,red:k===1,when:k?'Sent: TOMORROW · 11:53 PM':'Sent: TOMORROW · 11:52 PM'});ctx.fillStyle=k?'#ff6b6b':'#e8eef7';ctx.font='italic 800 30px Inter';ctx.textAlign='center';
     const txt=k?['"If it stops,','don\'t open it."']:['"Don\'t look in','dryer nine."'];const n=Math.floor(clamp(p*1.6,0,1)*txt.join(' ').length);let used=0;txt.forEach((l,i)=>{const s=l.slice(0,Math.max(0,n-used));used+=l.length+1;ctx.fillText(s,0,140+i*42)})});
   heartbeat(t,0.35+0.1*k)},
 row(lt,p,t,d,seg){laundro(t,{spin:true,clue:lt>1.0&&lt<1.4});const x=moveAlong(p,120,520);me(x,1620,2.0,t,{speed:p<0.9?1.1:0,dir:1,look:0.4});heartbeat(t,0.25)},
 dryerClose(lt,p,t,d,seg){const k=nth(seg);const hit=k===1?lastEv(t,['knock']):null;const ht=hit?t-hit.t:9;
   dryer(t,{on:true,spin:1,inside:(cx,cy,R)=>{if(k===1&&ht<9){const a=clamp(1-ht/1.2,0.25,1);ctx.save();ctx.globalAlpha=a;ctx.fillStyle='#d9a882';const hx=cx+20,hy=cy-30;rr(hx-60,hy-40,120,150,40);ctx.fill();for(let i=0;i<4;i++){rr(hx-62+i*34,hy-120,26,90,13);ctx.fill()}ctx.restore()}}});
   glow(540,930,420,'rgba(200,255,235,A)',0.06);heartbeat(t,0.3+0.15*k)},
 dryerOpen(lt,p,t,d,seg){const op=ease(clamp((p-0.35)/0.4,0,1));dryer(t,{on:p<0.3,spin:Math.max(0,1-p*3),open:op,inside:(cx,cy,R)=>{glow(cx,cy,R,'rgba(255,240,210,A)',0.12*op)}});heartbeat(t,0.4)},
 hoodie(lt,p,t,d,seg){dryer(t,{open:1,inside:(cx,cy,R)=>{ctx.save();ctx.translate(cx,cy+60);ctx.rotate(-0.2+Math.sin(t*0.8)*0.03);ctx.fillStyle=ME.top;rr(-170,-110,340,230,60);ctx.fill();ctx.fillStyle=ME.topD;rr(-60,-160,120,90,40);ctx.fill();ctx.fillRect(-230,-60,70,180);ctx.fillRect(160,-60,70,180);
     for(let i=0;i<6;i++){const y=-120-((t*40+i*30)%120);ctx.strokeStyle='rgba(255,255,255,0.18)';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-80+i*30,y);ctx.quadraticCurveTo(-60+i*30,y-20,-80+i*30,y-40);ctx.stroke()}ctx.restore()}});
   me(moveAlong(p,900,820),1900,1.45,t,{speed:0,dir:-1,look:0.6,scared:0.7,reach:0.4*p});heartbeat(t,0.4)},
 reflect(lt,p,t,d,seg){const k=nth(seg);const shake=Math.sin(t*40)*(k?6:4);
   dryer(t,{open:0,refl:(cx,cy,R)=>{ctx.save();ctx.globalAlpha=0.75;glow(cx,cy+40,R,'rgba(255,60,60,A)',0.2+0.15*k);
     // reflection: frozen self, then lifts phone
     walker(cx,cy+R*1.55,2.3,0,Object.assign({},ME,{speed:0,dir:1,look:0,reach:k?0.9*ease(clamp(p*1.5,0,1)):0,freeze:0}));
     ctx.globalAlpha=0.9;
     ctx.restore()}});
   // the real me in foreground, shaking
   ctx.save();ctx.translate(shake,0);me(900,1900,1.45,t,{speed:0,dir:-1,look:0.2,scared:1});ctx.restore();heartbeat(t,0.5)},
 lightsOut(lt,p,t,d,seg){laundro(t,{spin:true});const off=p>0.55;if(off){ctx.fillStyle='rgba(0,0,0,0.85)';ctx.fillRect(-100,-100,W+200,H+200);glow(760,820,160,'rgba(255,60,60,A)',0.35)}
   me(400,1650,2.0,t,{speed:0,dir:1,look:0.4,scared:0.9});phone(490,1320,0.26,0.3,()=>{ctx.fillStyle='#ff4d4d';ctx.fillRect(-200,-400,400,800);ctx.fillStyle='#fff';ctx.font='900 90px Inter';ctx.textAlign='center';ctx.fillText('● REC',0,20)});
   ctx.fillStyle='rgba(255,90,90,'+(0.6+0.4*Math.sin(t*6))+')';ctx.font='800 56px "JetBrains Mono"';ctx.textAlign='center';ctx.shadowColor='#f33';ctx.shadowBlur=20;ctx.fillText('RECORDING',540,420);ctx.fillText('VOICEMAIL…',540,490);ctx.shadowBlur=0;heartbeat(t,0.45)}
};
const CAM={hookPhone:[1.06,1.0],laundro:[1,1.05],playVM:[1,1.07],row:[1,1.06],dryerClose:[1,1.08],dryerOpen:[1,1.05],hoodie:[1,1.06],reflect:[1,1.1],lightsOut:[1,1.06]};
