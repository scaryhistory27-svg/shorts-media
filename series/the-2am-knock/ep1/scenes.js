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
