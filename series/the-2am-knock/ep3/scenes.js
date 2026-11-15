// Scenes for The 2 AM Knock - Part 1 (uses helpers from pipeline/engine.js)
const SCN={
 hook(lt,p,t){sky('#05070b','#0f1520');ctx.fillStyle='#10161f';ctx.fillRect(140,380,800,460);ctx.save();ctx.beginPath();ctx.rect(160,400,760,420);ctx.clip();sky('#06090f','#18213a');stars(t,0.7);moon(780,520,48);ctx.restore();
   ctx.fillStyle='#0d1219';ctx.fillRect(530,400,20,420);ctx.fillRect(160,600,760,16);
   ctx.fillStyle='#0a0d13';ctx.fillRect(0,1080,W,840);ctx.fillStyle='#1a202b';ctx.fillRect(200,1000,680,40);ctx.fillRect(240,1040,30,300);ctx.fillRect(810,1040,30,300);
   glow(540,880,520,'rgba(255,40,40,A)',0.18);clock('2:00',540,880,190,'#ff3b3b',t)},
 building(lt,p,t,d){sky('#04060a','#111a2a');stars(t);moon(830,330,60);
   const z=lerp(1,1.9,ease(p));const fx=lerp(540,700,ease(p)),fy=lerp(960,880,ease(p));ctx.save();ctx.translate(W/2,H/2);ctx.scale(z,z);ctx.translate(-fx,-fy);
   ctx.fillStyle='#0b1018';for(let i=0;i<12;i++){const bx=i*100-40,bh=300+((i*37)%5)*90;ctx.fillRect(bx,1500-bh,90,bh+500)}
   building(300,500,480,9,4,[9,3],t,1);ctx.fillStyle='#06080c';ctx.fillRect(-200,1490,W+400,600);ctx.restore()},
 door(lt,p,t){sky('#090c12','#121924');const sh=shakeAt(t,['knock'],0.3,16)*(Math.random()-.5)*2;
   ctx.fillStyle='#0a0e14';ctx.fillRect(0,1240,W,700);const d=door(540,860,sh);
   const fl=0.75+0.25*Math.sin(t*9)*Math.sin(t*3.3);ctx.fillStyle=`rgba(245,194,107,${0.8*fl})`;ctx.fillRect(d.x+10,d.y+d.h-6,d.w-20,8);
   const g=ctx.createLinearGradient(0,1280,0,1600);g.addColorStop(0,`rgba(245,194,107,${0.25*fl})`);g.addColorStop(1,'rgba(245,194,107,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(d.x+10,1280);ctx.lineTo(d.x+d.w-10,1280);ctx.lineTo(d.x+d.w+180,1620);ctx.lineTo(d.x-180,1620);ctx.fill();
   const e=lastEv(t,['knock']);if(e&&t-e.t<0.6){const a=(t-e.t)/0.6;ctx.strokeStyle=`rgba(255,255,255,${0.5*(1-a)})`;ctx.lineWidth=6;for(let k=0;k<2;k++){ctx.beginPath();ctx.arc(540,760,60+a*300+k*60,0,Math.PI*2);ctx.stroke()}}},
 peep(lt,p,t,d,o={}){ctx.fillStyle='#000';ctx.fillRect(-100,-100,W+200,H+200);const cx=540,cy=820,R=400;
   ctx.save();ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.clip();
   ctx.translate(cx,cy);ctx.scale(1.12,1.12);ctx.translate(-cx,-cy);
   const flick=o.cold?(Math.sin(t*23)>0.7?0.4:1):1;
   ctx.fillStyle=o.cold?'#2a3038':'#4a3f2e';ctx.fillRect(0,0,W,H);ctx.fillStyle=o.cold?'#1d2229':'#3a3124';ctx.fillRect(0,1000,W,600);
   glow(540,430,520,'rgba(255,214,140,A)',0.45*flick);ell(540,430,60,14,'#fff3d0');
   const zs=o.zoom??0.9;mom(540,720,zs,{smile:o.smile??0.5,talk:o.talk??0,creepy:o.creepy??0,blink:o.blink??0});
   if(o.cold){ctx.fillStyle='rgba(20,40,80,0.35)';ctx.fillRect(0,0,W,H);ctx.fillStyle=`rgba(0,0,0,${1-flick})`;ctx.fillRect(0,0,W,H)}
   ctx.restore();const g=ctx.createRadialGradient(cx,cy,R*0.45,cx,cy,R);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.95)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.fill();
   ctx.strokeStyle='rgba(255,255,255,0.12)';ctx.lineWidth=10;ctx.beginPath();ctx.arc(cx,cy,R-40,-2.6,-1.9);ctx.stroke()},
 mom(lt,p,t,d){const talking=lt>d*0.25&&lt<d*0.95;const talk=talking?Math.abs(Math.sin(lt*14))*0.9:0;
   SCN.peep(lt,p,t,d,{zoom:1.35+0.15*p,talk,smile:0.6,blink:(lt%2.6<0.12)?1:0})},
 hand(lt,p,t){sky('#0a0d13','#141b26');ctx.save();ctx.translate(540,800);ctx.scale(2.2,2.2);ctx.translate(-690,-800);door(540,860,0);ctx.restore();
   const a=ease(p*1.4);const hx=lerp(1250,640,a)+Math.sin(t*20)*2,hy=lerp(1500,1010,a);
   ctx.save();ctx.strokeStyle=C.hood;ctx.lineWidth=170;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(1300,1900);ctx.lineTo(hx+90,hy+120);ctx.stroke();
   ctx.strokeStyle=C.hoodD;ctx.lineWidth=40;ctx.beginPath();ctx.moveTo(hx+130,hy+60);ctx.lineTo(hx+40,hy+170);ctx.stroke();
   ctx.translate(hx,hy);ctx.rotate(-0.6);ell(0,0,70,95,C.skin);ctx.fillStyle=C.skin;for(let f=0;f<4;f++){rr(-60+f*32,-150,28,90,14);ctx.fill()}rr(-110,-40,80,30,15);ctx.fill();ctx.restore()},
 phone(lt,p,t,d){sky('#06080c','#0e131b');const b=lastEv(t,['buzz']);const on=!!b;const sh=shakeAt(t,['buzz'],0.28,12)*(Math.random()-.5)*2;
   if(on)glow(540,900,700,'rgba(120,160,255,A)',0.16);
   phone(540+sh,920,1.25,-0.05,()=>{if(!on){ctx.fillStyle='#050608';ctx.fillRect(-200,-400,400,800);return}
     const g=ctx.createLinearGradient(0,-380,0,380);g.addColorStop(0,'#1b2a4a');g.addColorStop(1,'#3a1f3d');ctx.fillStyle=g;ctx.fillRect(-200,-400,400,800);
     ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font='300 120px Inter';ctx.fillText('2:03',0,-170);ctx.font='500 24px Inter';ctx.fillText('Saturday, November 14',0,-120);
     const a=ease((t-b.t)/0.3);ctx.globalAlpha=a;rr(-155,-60+(1-a)*30,310,120,26);ctx.fillStyle='rgba(255,255,255,0.88)';ctx.fill();
     ctx.fillStyle='#111';ctx.textAlign='left';ctx.font='800 26px Inter';ctx.fillText('Mom ❤️',-130,-18+(1-a)*30);ctx.font='500 21px Inter';ctx.fillStyle='#333';ctx.fillText('Can’t sleep. Love you…',-130,18+(1-a)*30);ctx.fillStyle='#888';ctx.font='500 18px Inter';ctx.textAlign='right';ctx.fillText('now',135,-18+(1-a)*30);ctx.globalAlpha=1})},
 phone2(lt,p,t,d,seg){sky('#06080c','#0e131b');glow(540,900,700,'rgba(120,160,255,A)',0.14);
   const ws=seg.words;const bub=[[ws[0].s,"Can’t sleep 😴"],[ws[2].s,"Love you ❤️"],[ws[4].s,"Goodnight from Chicago 🌃"]];
   phone(540,900,1.7,0,()=>{ctx.fillStyle='#0b0b0d';ctx.fillRect(-200,-400,400,800);ctx.fillStyle='#17181c';ctx.fillRect(-200,-400,400,120);
     ell(0,-320,26,26,'#7b4f63');ctx.fillStyle='#fff';ctx.font='700 24px Inter';ctx.textAlign='center';ctx.fillText('M',0,-312);ctx.font='600 18px Inter';ctx.fillText('Mom ❤️',0,-276);
     let y=-200;for(const [s,txt] of bub){if(t<s)continue;const a=ease((t-s)/0.2);ctx.globalAlpha=a;ctx.font='500 22px Inter';const w=ctx.measureText(txt).width+40;rr(-160,y+(1-a)*20,w,54,26);ctx.fillStyle='#2b2d33';ctx.fill();ctx.fillStyle='#fff';ctx.textAlign='left';ctx.fillText(txt,-140,y+35+(1-a)*20);ctx.globalAlpha=1;y+=70}
     if(t>bub[2][0]+0.4){ctx.globalAlpha=ease((t-bub[2][0]-0.4)/0.3);ctx.font='600 17px Inter';ctx.fillStyle='#ff6b6b';ctx.textAlign='left';ctx.fillText('📍 Chicago, IL · 700 mi away',-150,y+20);ctx.globalAlpha=1}})},
 peep2(lt,p,t,d){SCN.peep(lt,p,t,d,{cold:1,zoom:1.0+0.5*ease(p),smile:1,creepy:0.25+0.3*p})},
 face(lt,p,t,d){ctx.fillStyle='#14171c';ctx.fillRect(-100,-100,W+200,H+200);glow(540,300,700,'rgba(200,210,230,A)',0.12);
   const hb=TL.events.find(e=>e.type==='heart');const beat=hb?Math.max(0,Math.sin((t-hb.t)*Math.PI*2*78/60))**8:0;
   mom(540,820,3.6+0.3*p,{creepy:0.55+0.45*ease(p),smile:1});
   ctx.fillStyle=`rgba(120,0,0,${0.12+0.15*beat})`;ctx.fillRect(0,0,W,H)},
 face2(lt,p,t,d){ctx.fillStyle='#0b0c0f';ctx.fillRect(-100,-100,W+200,H+200);const fl=Math.sin(t*31)>0.85?0.3:1;
   mom(540,960,6.2+0.6*p,{creepy:1,smile:1,glow:ease(p*1.5)});ctx.fillStyle=`rgba(0,0,0,${1-fl})`;ctx.fillRect(0,0,W,H);ctx.fillStyle='rgba(120,0,0,0.18)';ctx.fillRect(0,0,W,H)},
 window(lt,p,t,d){sky('#0a0d14','#121a26');const sh=shakeAt(t,['knockglass'],0.3,10)*(Math.random()-.5)*2;
   const x=200,y=380,w=680,h=820;ctx.save();ctx.translate(sh,0);ctx.fillStyle='#0c1018';ctx.fillRect(x-30,y-30,w+60,h+60);
   ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();sky('#04060b','#0f1a30');stars(t);moon(720,520,44);ctx.fillStyle='#070a10';for(let i=0;i<9;i++){const bh=180+((i*53)%4)*80;ctx.fillRect(x+i*80,y+h-bh,70,bh);for(let k=0;k<5;k++)if((i+k)%3==0){ctx.fillStyle='#3a3420';ctx.fillRect(x+i*80+15,y+h-bh+20+k*40,14,18);ctx.fillStyle='#070a10'}}
   const evs=TL.events.filter(e=>e.type==='knockglass'&&t>=e.t);if(evs.length>=3){const a=ease((t-evs[2].t)/0.5);ctx.globalAlpha=0.55*a;ctx.fillStyle='#c9d2de';ctx.save();ctx.translate(560,820);ell(0,0,70,80,'#c9d2de');for(let f=0;f<4;f++){ctx.save();ctx.rotate(-0.35+f*0.23);rr(-11,-260,22,200,11);ctx.fill();ctx.restore()}ctx.rotate(1.1);rr(-10,-170,20,120,10);ctx.fill();ctx.restore();ctx.globalAlpha=1}
   ctx.restore();ctx.fillStyle='#0c1018';ctx.fillRect(x+w/2-10,y,20,h);ctx.fillRect(x,y+h/2-10,w,20);ctx.restore();
   const e=lastEv(t,['knockglass']);if(e&&t-e.t<0.5){const a=(t-e.t)/0.5;ctx.strokeStyle=`rgba(200,220,255,${0.6*(1-a)})`;ctx.lineWidth=5;ctx.beginPath();ctx.arc(560,800,40+a*260,0,Math.PI*2);ctx.stroke()}
   ctx.fillStyle='#0a0d13';ctx.fillRect(0,1250,W,700);ctx.fillStyle='#1d2636';rr(-60,1180,620,240,30);ctx.fill();ctx.fillStyle='#e6e1d6';rr(-40,1150,220,90,40);ctx.fill();ctx.fillStyle='#2b3a55';ctx.fillRect(-60,1240,620,180)},
 outside(lt,p,t,d){sky('#04060a','#101826');stars(t);const z=lerp(1.6,2.6,ease(p*1.3));ctx.save();ctx.translate(W/2,H/2);ctx.scale(z,z);ctx.translate(-700,-610);
   building(300,500,480,9,4,[9,3],t,1);creature(820,600,0.32,t);ctx.restore();
   const a=Math.max(0,1-lt/0.5);ctx.fillStyle=`rgba(255,30,30,${0.45*a})`;ctx.fillRect(0,0,W,H)},
 end(lt,p,t,d,seg){sky('#030406','#0a0d13');const sh=shakeAt(t,['knock'],0.3,20);ctx.save();ctx.translate((Math.random()-.5)*2*sh,(Math.random()-.5)*sh);
   glow(540,880,520,'rgba(255,40,40,A)',0.16);clock('1:59',540,880,190,'#ff3b3b',t);ctx.restore();
   const last=seg.words[seg.words.length-1].s;if(t>last+0.9){const a=ease((t-last-0.9)/0.5);ctx.fillStyle=`rgba(0,0,0,${0.75*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 110px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle||'PART 2?',540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub||'',540,990);ctx.globalAlpha=1}}
};
const CAM={hook:[1.0,1.08],building:[1,1],door:[1.0,1.1],peep:[1.0,1.08],mom:[1,1.04],hand:[1,1.06],phone:[1.05,1.15],phone2:[1,1.06],peep2:[1,1.05],face:[1,1.05],face2:[1,1.04],window:[1,1.1],outside:[1,1],end:[1,1.12]};

// ===== Part 2 scenes =====
function hero(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s); // back view, origin = head center
  ctx.fillStyle=C.hood;ctx.beginPath();ctx.moveTo(-90,60);ctx.quadraticCurveTo(-260,90,-280,400);ctx.lineTo(-300,900);ctx.lineTo(300,900);ctx.lineTo(280,400);ctx.quadraticCurveTo(260,90,90,60);ctx.closePath();ctx.fill();
  ctx.fillStyle=C.hoodD;ctx.beginPath();ctx.ellipse(0,40,120,70,0,0,Math.PI*2);ctx.fill();
  ell(0,-20,88,100,'#1a1310');ctx.fillStyle='#120d0b';ctx.beginPath();ctx.ellipse(0,-60,80,60,0,Math.PI,Math.PI*2);ctx.fill();
  ell(-86,0,12,20,C.skinD);ell(86,0,12,20,C.skinD);ctx.restore()}
function cctvView(t,o={}){ // grayscale security camera view of the hallway
  ctx.fillStyle='#2b2f33';ctx.fillRect(0,0,W,H);ctx.save();if(o.zoom){const z=o.zoom;ctx.translate(W/2,900);ctx.scale(z,z);ctx.translate(-(o.fx||540),-(o.fy||900))}ctx.fillStyle='#202428';ctx.beginPath();ctx.moveTo(0,1400);ctx.lineTo(W,1400);ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.fill();
  ctx.fillStyle='#3a3f44';ctx.beginPath();ctx.moveTo(0,300);ctx.lineTo(260,560);ctx.lineTo(260,1250);ctx.lineTo(0,1400);ctx.fill();ctx.beginPath();ctx.moveTo(W,300);ctx.lineTo(820,560);ctx.lineTo(820,1250);ctx.lineTo(W,1400);ctx.fill();
  ctx.fillStyle='#33383d';ctx.fillRect(260,560,560,690);
  glow(540,560,500,'rgba(230,230,230,A)',0.25);
  // door on the right wall (narrator's door)
  ctx.fillStyle='#1d2024';ctx.beginPath();ctx.moveTo(870,600);ctx.lineTo(990,520);ctx.lineTo(990,1330);ctx.lineTo(870,1270);ctx.fill();
  if(o.open){const a=ease(o.open);ctx.fillStyle='#050505';ctx.beginPath();ctx.moveTo(870,600);ctx.lineTo(990,520);ctx.lineTo(990,1330);ctx.lineTo(870,1270);ctx.fill();
    ctx.fillStyle='#1d2024';ctx.beginPath();ctx.moveTo(870,600);ctx.lineTo(870-140*a,560);ctx.lineTo(870-140*a,1310);ctx.lineTo(870,1270);ctx.fill();
    if(o.figures){ctx.save();ctx.beginPath();ctx.moveTo(870,600);ctx.lineTo(990,520);ctx.lineTo(990,1330);ctx.lineTo(870,1270);ctx.clip();
      ell(925,980,26,30,'#6a7078');ctx.fillStyle='#4d535a';rr(895,1005,62,180,20);ctx.fill();
      ctx.fillStyle='#000';ell(950,800,24,30,'#000');rr(925,825,50,330,20);ctx.fill();ell(942,795,4,4,'#fff');ell(956,795,4,4,'#fff');ctx.restore()}}
  ctx.restore();
  // scanlines + noise + overlays
  ctx.fillStyle='rgba(0,0,0,0.18)';for(let y=0;y<H;y+=6)ctx.fillRect(0,y,W,2);
  const yb=(t*300)%H;ctx.fillStyle='rgba(255,255,255,0.05)';ctx.fillRect(0,yb,W,40);
  ctx.save();ctx.font='700 40px "JetBrains Mono"';ctx.fillStyle='#e8e8e8';ctx.textAlign='left';ctx.fillText('CAM 09 · HALLWAY',60,300);
  ctx.textAlign='right';const s=Math.floor(t)%60;ctx.fillText('02:0'+(4+Math.floor(t/60))+':'+String(s).padStart(2,'0'),W-60,300);
  if(Math.floor(t*2)%2===0){ell(80,370,12,12,C.red);ctx.textAlign='left';ctx.fillStyle=C.red;ctx.fillText('REC',104,384)}ctx.restore();
  ctx.strokeStyle='rgba(255,255,255,0.5)';ctx.lineWidth=5;for(const [x,y,dx,dy] of[[40,240,1,1],[W-40,240,-1,1],[40,1500,1,-1],[W-40,1500,-1,-1]]){ctx.beginPath();ctx.moveTo(x+dx*70,y);ctx.lineTo(x,y);ctx.lineTo(x,y+dy*70);ctx.stroke()}}
Object.assign(SCN,{
 recap(lt,p,t,d){SCN.peep(lt,p,t,d,{cold:1,zoom:1.3+0.3*p,smile:1,creepy:0.7});ctx.fillStyle='rgba(0,0,0,0.25)';ctx.fillRect(0,0,W,H)},
 door2(lt,p,t,d){SCN.door(lt,p,t,d);ctx.save();ctx.fillStyle='#d9d2b8';ctx.translate(540,520);ctx.rotate(0.5);ctx.fillRect(-60,-12,120,24);ctx.rotate(-1);ctx.fillRect(-60,-12,120,24);ctx.restore()},
 tape(lt,p,t,d){sky('#0a0d13','#141b26');ctx.save();ctx.translate(540,820);ctx.scale(3,3);ctx.translate(-540,-520);door(540,860,0);ctx.restore();
   const a=ease(p*2.2),b=ease(p*2.2-0.5);ctx.save();ctx.translate(540,820);ctx.fillStyle='#d9d2b8';ctx.globalAlpha=0.95;
   ctx.save();ctx.rotate(0.5);ctx.fillRect(-180,-35,360*a,70);ctx.restore();ctx.save();ctx.rotate(-0.5);ctx.fillRect(-180,-35,360*b,70);ctx.restore();ctx.restore()},
 call(lt,p,t,d){sky('#06080c','#0e131b');glow(540,900,700,'rgba(80,220,140,A)',0.12);const sh=shakeAt(t,['buzz'],0.28,8)*(Math.random()-.5)*2;
   phone(540+sh,920,1.3,0.04,()=>{const g=ctx.createLinearGradient(0,-380,0,380);g.addColorStop(0,'#1d2833');g.addColorStop(1,'#0c1116');ctx.fillStyle=g;ctx.fillRect(-200,-400,400,800);
     ell(0,-170,70,70,'#3a4654');ctx.fillStyle='#fff';ctx.font='700 64px Inter';ctx.textAlign='center';ctx.fillText('🛡️',0,-148);
     ctx.font='700 32px Inter';ctx.fillText('Building Security',0,-50);ctx.font='500 24px Inter';ctx.fillStyle='#9aa7b4';ctx.fillText(lt<0.9?'calling…':'00:0'+Math.floor(lt),0,-10);
     ell(0,250,48,48,lt<0.9?'#2ecc71':'#e5484d');ctx.fillStyle='#fff';ctx.font='700 40px Inter';ctx.fillText('✆',0,265)})},
 cctv(lt,p,t,d){cctvView(t,{})},
 cctvopen(lt,p,t,d,seg){const w=seg.words.find(x=>x.w==='Sir...');cctvView(t,{open:w?clamp((t-w.s)/0.8,0,1):0})},
 cctvbehind(lt,p,t,d){const zz=lerp(2.2,2.8,ease(p));cctvView(t,{open:1,figures:1,zoom:zz,fx:935,fy:950});const z=ease(p*2);ctx.strokeStyle=`rgba(255,77,79,${0.9*z})`;ctx.lineWidth=6;ctx.strokeRect(540-zz*75,900-zz*190,zz*150,zz*420);
   ctx.font='700 34px "JetBrains Mono"';ctx.fillStyle=`rgba(255,77,79,${z})`;ctx.textAlign='center';ctx.fillText('MOTION: 2 PERSONS',540,900-zz*190-24)},
 lock(lt,p,t,d){sky('#090c12','#121924');ctx.fillStyle='#0a0e14';ctx.fillRect(0,1240,W,700);const dd=door(540,860,0);
   ctx.strokeStyle='#b8963f';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(dd.x+dd.w-70,dd.y+300);ctx.quadraticCurveTo(dd.x+dd.w+10,dd.y+360,dd.x+dd.w+20,dd.y+300);ctx.stroke();
   ctx.save();ctx.fillStyle='#d9d2b8';ctx.translate(540,dd.y+200);ctx.rotate(0.5);ctx.fillRect(-50,-10,100,20);ctx.rotate(-1);ctx.fillRect(-50,-10,100,20);ctx.restore()},
 behind(lt,p,t,d){sky('#050608','#0d1118');glow(540,700,600,'rgba(120,140,180,A)',0.08);
   const a=ease((p-0.25)*2);ctx.globalAlpha=a;creature(540,640,1.05+0.1*p,t);ctx.globalAlpha=1;hero(540,1150,1.3);
   const hb=TL.events.find(e=>e.type==='heart');const beat=hb?Math.max(0,Math.sin((t-hb.t)*Math.PI*2*78/60))**8:0;ctx.fillStyle=`rgba(120,0,0,${0.1+0.15*beat})`;ctx.fillRect(0,0,W,H)},
 whisper(lt,p,t,d,seg){ctx.fillStyle='#030304';ctx.fillRect(-100,-100,W+200,H+200);ctx.save();ctx.translate(540,900);ctx.scale(3.2+0.6*p,3.2+0.6*p);creature(0,130,1,t);ctx.restore();
   ctx.fillStyle='rgba(140,0,0,0.22)';ctx.fillRect(0,0,W,H);
   const last=seg.words[seg.words.length-1].s;if(t>last+0.9){const a=ease((t-last-0.9)/0.5);ctx.fillStyle=`rgba(0,0,0,${0.8*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 110px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}}
});
Object.assign(CAM,{recap:[1,1.06],door2:[1.02,1.1],tape:[1,1.05],call:[1,1.08],cctv:[1,1.06],cctvopen:[1.04,1.12],cctvbehind:[1,1.03],lock:[1,1.06],behind:[1,1.1],whisper:[1,1.08]});

// ===== Part 3 scenes =====
function paper(cx,cy,w,h,rot,t,o={}){ctx.save();ctx.translate(cx,cy);ctx.rotate(rot);
  ctx.shadowColor='rgba(0,0,0,0.6)';ctx.shadowBlur=40;const g=ctx.createLinearGradient(-w/2,-h/2,w/2,h/2);g.addColorStop(0,'#e9dfc4');g.addColorStop(1,'#b9a985');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);ctx.shadowBlur=0;
  ctx.strokeStyle='rgba(120,100,70,0.25)';ctx.lineWidth=2;for(let y=-h/2+90;y<h/2-30;y+=58){ctx.beginPath();ctx.moveTo(-w/2+40,y);ctx.lineTo(w/2-40,y);ctx.stroke()}
  ctx.fillStyle='#2a1a14';ctx.textAlign='left';ctx.font=`italic 700 ${o.fs||64}px "Bitstream Charter", serif`;
  (o.lines||[]).forEach((l,i)=>{ctx.save();ctx.translate(-w/2+60,-h/2+140+i*(o.lh||90));ctx.rotate(-0.02+0.01*i);ctx.fillStyle=l.c||'#2a1a14';ctx.fillText(l.t,0,0);ctx.restore()});
  if(o.sig){ctx.globalAlpha=o.sig;ctx.font='italic 700 46px "Bitstream Charter", serif';ctx.fillStyle='#5a2a20';ctx.fillText('— me',w/2-230,h/2-60);ctx.globalAlpha=1}
  ctx.restore()}
function closet(cx,cy,sh){const w=560,h=900,x=cx-w/2+sh,y=cy-h/2;ctx.fillStyle='#0d1219';ctx.fillRect(x-30,y-30,w+60,h+30);
  for(const dx of[0,w/2+4]){ctx.fillStyle='#4a3a2e';ctx.fillRect(x+dx,y,w/2-4,h);ctx.fillStyle='#2e231b';for(let k=0;k<15;k++)ctx.fillRect(x+dx+30,y+50+k*55,w/2-64,18)}
  ell(cx-22+sh,cy+20,12,12,'#c9a64a');ell(cx+22+sh,cy+20,12,12,'#c9a64a');
  ctx.fillStyle='rgba(0,0,0,0.85)';ctx.fillRect(cx-3+sh,y,6,h)}
Object.assign(SCN,{
 note(lt,p,t,d){sky('#0b0807','#17110d');glow(540,900,700,'rgba(255,190,110,A)',0.12);
   paper(540,760,860,920,-0.04,t,{lines:[{t:'IT ONLY COMES IN'},{t:'IF YOU ANSWER.'},{t:''},{t:'NEVER ANSWER.',c:'#7a0d0d'},{t:'Not even to say no.',c:'#7a0d0d'}],sig:0.18})},
 notefind(lt,p,t,d){sky('#07090c','#101418');ctx.fillStyle='#2b2f36';ctx.fillRect(140,520,800,900);ctx.fillStyle='#14171b';ctx.fillRect(180,600,720,780);
   ctx.fillStyle='#8a9097';ctx.fillRect(470,600,26,380);ctx.fillRect(470,960,150,26);ctx.fillStyle='#3a3f46';ctx.fillRect(140,520,800,40);
   const a=ease(p*1.6);paper(700,1140,300,220,0.12,t,{lines:[{t:'never answer'}],fs:30,lh:40});
   ctx.fillStyle='rgba(255,240,200,0.07)';ctx.beginPath();ctx.moveTo(1080,300);ctx.lineTo(560,1000+a*40);ctx.lineTo(860,1260);ctx.closePath();ctx.fill();glow(700,1140,260,'rgba(255,235,190,A)',0.25)},
 creepface(lt,p,t,d){ctx.fillStyle='#030304';ctx.fillRect(-100,-100,W+200,H+200);ctx.save();ctx.translate(540,880);ctx.scale(3.0+0.5*p,3.0+0.5*p);creature(0,130,1,t);ctx.restore();ctx.fillStyle='rgba(140,0,0,0.22)';ctx.fillRect(0,0,W,H)},
 closet(lt,p,t,d){sky('#06080c','#0f131a');const sh=shakeAt(t,['knock'],0.3,14)*(Math.random()-.5)*2;ctx.fillStyle='#0a0d12';ctx.fillRect(0,1300,W,700);closet(540,860,sh);
   const e=lastEv(t,['knock']);if(e&&t-e.t<0.6){const a=(t-e.t)/0.6;ctx.strokeStyle=`rgba(255,255,255,${0.5*(1-a)})`;ctx.lineWidth=6;ctx.beginPath();ctx.arc(540,800,60+a*320,0,Math.PI*2);ctx.stroke()}
   ctx.fillStyle='rgba(0,0,0,0.9)';ctx.fillRect(537,410,6,900);glow(540,860,120,'rgba(255,0,0,A)',0.08+0.06*Math.sin(t*3))},
 phone3(lt,p,t,d,seg){sky('#06080c','#0e131b');glow(540,900,700,'rgba(120,160,255,A)',0.14);const sh=shakeAt(t,['buzz'],0.28,10)*(Math.random()-.5)*2;
   const showMsg=TL.segs.findIndex(s=>s===seg)>=9||lt>d*0.55;
   phone(540+sh,900,1.6,0,()=>{ctx.fillStyle='#0b0b0d';ctx.fillRect(-200,-400,400,800);ctx.fillStyle='#17181c';ctx.fillRect(-200,-400,400,120);
     ell(0,-320,26,26,'#2f4a7a');ctx.fillStyle='#fff';ctx.font='700 22px Inter';ctx.textAlign='center';ctx.fillText('ME',0,-313);ctx.font='600 16px Inter';ctx.fillText('My Number',0,-276);
     if(showMsg){const a=ease((lt-d*0.55)/0.3);ctx.globalAlpha=TL.segs.findIndex(s=>s===seg)>=9?1:a;ctx.font='600 22px Inter';rr(-160,-200,300,92,26);ctx.fillStyle='#2b2d33';ctx.fill();ctx.fillStyle='#fff';ctx.textAlign='left';ctx.fillText('Never open the door',-140,-160);ctx.fillText('at 2 AM.',-140,-130);ctx.globalAlpha=1;
       ctx.font='500 15px Inter';ctx.fillStyle='#888';ctx.fillText('Delivered 1:58 AM',-155,-90)}})},
 note2(lt,p,t,d){sky('#0b0807','#17110d');glow(540,900,700,'rgba(255,60,60,A)',0.12);const z=1+0.25*ease(p);ctx.save();ctx.translate(540,900);ctx.scale(z,z);ctx.translate(-540,-900);
   paper(540,760,860,920,-0.04,t,{lines:[{t:'IT ONLY COMES IN'},{t:'IF YOU ANSWER.'},{t:''},{t:'NEVER ANSWER.',c:'#7a0d0d'},{t:'Not even to say no.',c:'#7a0d0d'}],sig:Math.min(1,0.18+p*2)});ctx.restore();
   if(p>0.45){const a=ease((p-0.45)*3);ctx.strokeStyle=`rgba(255,40,40,${0.9*a})`;ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(800,1150,170,70,-0.05,0,Math.PI*2);ctx.stroke()}}
});
Object.assign(CAM,{note:[1,1.06],notefind:[1,1.08],creepface:[1,1.05],closet:[1,1.1],phone3:[1,1.06],note2:[1,1]});
