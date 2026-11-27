// FearFiles: The Lights — Christmas lights blink S.O.S. while unplugged; the whole street joins; the message spells my name.
const HERO={top:'#7a2e2e',topD:'#5a2020'};const NB={top:'#4a5a3a',topD:'#36422a',hair:'#bbb'};
const BULB=['#ff4a4a','#4aff7a','#ffd23a','#4ab0ff','#ff7ad0'];
const endCard=(seg,t)=>{const last=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>last+0.9){const a=ease(clamp((t-last-0.9)/0.5,0,1));ctx.fillStyle=`rgba(0,0,0,${0.93*a})`;ctx.fillRect(-100,-100,W+200,H+200);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 96px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}};
// morse S.O.S: ... --- ...  -> on/off as function of time
function sos(t,rate){const seq=[1,0,1,0,1,0,0,0,1,1,1,0,1,1,1,0,1,1,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0];return seq[Math.floor(t*rate)%seq.length]}
function snowFx(t,n=60){ctx.fillStyle='rgba(255,255,255,0.7)';for(let i=0;i<n;i++){const x=(i*137.5+Math.sin(t*0.7+i)*30)%W,y=((i*91)+t*(60+i%5*20))%H;ctx.beginPath();ctx.arc(x,y,2+i%3,0,7);ctx.fill()}}
function bulbs(x0,y0,x1,y1,n,t,on,o={}){ctx.strokeStyle='#1a1a1a';ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<=n;i++){const k=i/n,x=lerp(x0,x1,k),y=lerp(y0,y1,k)+Math.sin(k*Math.PI*n/2)*10;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke();
  for(let i=0;i<n;i++){const k=(i+0.5)/n,x=lerp(x0,x1,k),y=lerp(y0,y1,k)+12+Math.sin(k*Math.PI*n/2)*10,c=o.red?'#ff3a3a':BULB[i%5],s=o.s||1;
    if(on){glow(x,y,26*s,c.replace('#','').length?hexA(c):c,0.55)}ell(x,y,7*s,10*s,on?c:'#2a2a2a')}}
function hexA(c){const n=parseInt(c.slice(1),16);return `rgba(${n>>16},${(n>>8)&255},${n&255},A)`}
function house(x,y,s,t,on,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=o.col||'#1e2433';ctx.fillRect(-200,-260,400,260);ctx.fillStyle='#141824';ctx.beginPath();ctx.moveTo(-230,-260);ctx.lineTo(0,-420);ctx.lineTo(230,-260);ctx.fill();
  ctx.fillStyle='#e8eef5';ctx.beginPath();ctx.moveTo(-236,-258);ctx.lineTo(0,-424);ctx.lineTo(236,-258);ctx.lineTo(226,-250);ctx.lineTo(0,-410);ctx.lineTo(-226,-250);ctx.fill();
  const w=o.win??0.35;ctx.fillStyle=`rgba(255,210,140,${w})`;ctx.fillRect(-150,-200,110,100);ctx.fillRect(40,-200,110,100);ctx.fillStyle='#2a2018';ctx.fillRect(-40,-140,80,140);
  if(o.lights!==false){bulbs(-230,-262,0,-420,8,t,on,{red:o.red});bulbs(0,-420,230,-262,8,t,on,{red:o.red});bulbs(-200,-262,200,-262,10,t,on,{red:o.red})}
  ctx.restore()}
function streetBg(t){const g=ctx.createLinearGradient(0,0,0,1300);g.addColorStop(0,'#04060c');g.addColorStop(1,'#162033');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);stars(t,0.5);moon(860,250,50);
  ctx.fillStyle='#dfe6ee';ctx.fillRect(-100,1250,W+200,H);ctx.fillStyle='#c3ccd8';for(let i=0;i<5;i++)ctx.fillRect(-100,1290+i*120,W+200,3)}
function window2(x,y,t,o={}){ctx.fillStyle='#11151f';ctx.fillRect(x-170,y-200,340,400);ctx.fillStyle=`rgba(255,200,130,${o.lit??0.5})`;ctx.fillRect(x-140,y-170,280,340);
  if(o.man){ctx.save();ctx.beginPath();ctx.rect(x-140,y-170,280,340);ctx.clip();walker(x,y+330,1.05,t,Object.assign({speed:0,look:o.look||0,scared:o.scared||0},NB));ctx.restore()}
  ctx.strokeStyle='#3a3226';ctx.lineWidth=12;ctx.strokeRect(x-140,y-170,280,340);ctx.beginPath();ctx.moveTo(x,y-170);ctx.lineTo(x,y+170);ctx.moveTo(x-140,y);ctx.lineTo(x+140,y);ctx.stroke()}
const SCN={
  hook:(lt,p,t,d,seg)=>{streetBg(t);const on=sos(t,4);house(380,1250,1.3,t,on,{red:seg===TL.segs[TL.segs.length-1]});
    // hidden clue: neighbor's window across the street, a figure for a moment
    window2(900,700,t,{lit:0.25,man:lt<0.6&&seg===TL.segs[0]});
    const cx=moveAlong(clamp(lt/2,0,1),620,560);ctx.fillStyle='#ddd';ctx.lineWidth=5;ctx.strokeStyle='#333';ctx.beginPath();ctx.moveTo(140,1250);ctx.quadraticCurveTo(300,1420,cx,1400);ctx.stroke();ctx.fillStyle='#555';rr(cx-14,1388,40,24,6);ctx.fill();
    walker(800,1255,1.1,t,{speed:0,top:HERO.top,topD:HERO.topD,look:-1,scared:0.6});snowFx(t);heartbeat(t,0.2);endCard(seg,t)},
  ladder:(lt,p,t)=>{const g=ctx.createLinearGradient(0,0,0,1300);g.addColorStop(0,'#7a8aa8');g.addColorStop(1,'#c8ccd4');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);ctx.fillStyle='#e8ecf2';ctx.fillRect(-100,1250,W+200,H);
    house(540,1250,1.4,t,false,{col:'#5a6478',win:0.15});const k=clamp(p,0,1);ctx.strokeStyle='#8a6a3a';ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(760,1250);ctx.lineTo(700,780);ctx.moveTo(860,1250);ctx.lineTo(800,780);ctx.stroke();for(let i=0;i<7;i++){const y=1220-i*70;ctx.beginPath();ctx.moveTo(756-i*8,y);ctx.lineTo(856-i*8,y);ctx.stroke()}
    walker(780,lerp(1180,1010,k),1.0,t,{speed:0,top:HERO.top,topD:HERO.topD,look:-1,reach:0.5+0.5*Math.sin(t*3)})},
  on:(lt,p,t)=>{streetBg(t);const on=lt>0.7?sos(t,4):0;house(540,1250,1.4,t,on,{win:0.05});if(lt>0.7&&lt<0.9)punchAt&&0;walker(150,1255,1.1,t,{speed:0,top:HERO.top,topD:HERO.topD,look:1,scared:on?0.8:0});snowFx(t)},
  morse:(lt,p,t)=>{ctx.fillStyle='#05070c';ctx.fillRect(-100,-100,W+200,H+200);const on=sos(t,4);ctx.save();ctx.translate(540,800);ctx.scale(4,4);ctx.translate(-540,-800);bulbs(380,780,700,780,5,t,on);ctx.restore();
    const seq='... --- ...';const k=Math.floor(clamp(lt/2.2,0,1)*seq.length);ctx.fillStyle='#ffd23a';ctx.font='900 110px "JetBrains Mono"';ctx.textAlign='center';ctx.fillText(seq.slice(0,k)||' ',540,1220)},
  neighbor:(lt,p,t,d,seg)=>{ctx.fillStyle='#1a1f2c';ctx.fillRect(-100,-100,W+200,H+200);ctx.fillStyle='#232a3a';ctx.fillRect(-100,1200,W+200,H);const two=seg.words[0].w.startsWith('"');
    window2(540,760,t,{lit:0.55,man:true,look:two?0.3:0,scared:two?1:0.6});const on=sos(t,4);glow(540,760,420,'rgba(255,60,60,A)',on?0.18:0.04);
    if(two){ctx.fillStyle='rgba(255,255,255,0.08)';ctx.fillRect(400,560,280,6)}},
  plug:(lt,p,t)=>{ctx.fillStyle='#d8d2c4';ctx.fillRect(-100,-100,W+200,H+200);ctx.fillStyle='#b8b0a0';ctx.fillRect(-100,1300,W+200,H);ctx.fillStyle='#f5f2ea';rr(420,640,240,340,20);ctx.fill();ctx.fillStyle='#333';for(const y of[720,860]){ctx.fillRect(500,y,14,40);ctx.fillRect(566,y,14,40);ell(540,y+60,10,10,'#333')}
    const k=ease(clamp((lt-0.5)/0.6,0,1));const px=lerp(540,820,k),py=lerp(780,820,k);ctx.strokeStyle='#1a1a1a';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(px,py);ctx.quadraticCurveTo(900,1100,1200,1000);ctx.stroke();ctx.fillStyle='#e8e8e8';rr(px-50,py-30,100,60,10);ctx.fill();
    ctx.fillStyle=C.skin;ell(px+40,py,50,40,C.skin);ctx.fillStyle=HERO.top;ctx.fillRect(px+70,py-40,300,80)},
  faster:(lt,p,t)=>{streetBg(t);const on=sos(t,4+lt*4);house(540,1250,1.4,t,on);ctx.strokeStyle='#111';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(300,1250);ctx.quadraticCurveTo(320,1400,450,1420);ctx.stroke();ctx.fillStyle='#e8e8e8';rr(450,1400,60,40,8);ctx.fill();
    walker(820+Math.sin(t*30)*3,1255,1.1,t,{speed:0,top:HERO.top,topD:HERO.topD,look:-1,scared:1,reach:0.4});snowFx(t)},
  street:(lt,p,t,d,seg)=>{streetBg(t);const two=seg.words[0].w==='Same';const n=Math.min(5,1+Math.floor(lt*(two?6:2.5)));
    for(let i=4;i>=0;i--){const s=0.45+i*0.15,x=180+i*190,y=1000+i*70;house(x,y,s,t,i<n?sos(t-i*0.25,5):0,{red:two})}
    walker(940,1290,0.95,t,{speed:0,top:HERO.top,topD:HERO.topD,look:-1,scared:1});snowFx(t,40);heartbeat(t,0.3)},
  empty:(lt,p,t)=>{ctx.fillStyle='#1a1f2c';ctx.fillRect(-100,-100,W+200,H+200);ctx.fillStyle='#232a3a';ctx.fillRect(-100,1200,W+200,H);window2(540,760,t,{lit:0.55,man:false});
    const sw=life.sway(t,0.6);ctx.fillStyle='rgba(140,30,30,0.6)';ctx.fillRect(400+sw*10,590,40,340);glow(540,760,420,'rgba(255,60,60,A)',0.12*sos(t,5));walker(540,1600,1.0,t,{speed:0,top:HERO.top,topD:HERO.topD,look:0,scared:1})},
  name:(lt,p,t)=>{streetBg(t);const rows=[[0,1,1,1,0,1,0,0,0,1,1,1,0],[1,0,0,0,0,1,0,0,0,1,0,0,0],[1,0,1,1,0,1,0,0,0,1,1,0,0],[1,0,0,1,0,1,0,0,0,1,0,0,0],[0,1,1,0,0,1,1,1,0,1,1,1,0]];
    const k=clamp(lt/1.6,0,1);for(let r=0;r<5;r++)for(let c=0;c<13;c++){const x=150+c*65,y=520+r*80,on=rows[r][c]&&(c/13)<k*1.2;if(on)glow(x,y,30,'rgba(255,60,60,A)',0.6);ell(x,y,12,14,on?'#ff3a3a':'#202430')}
    ctx.fillStyle='rgba(5,8,14,0.8)';ctx.fillRect(130,480,830,1);house(540,1300,0.9,t,1,{red:true,lights:true});walker(900,1300,1.0,t,{speed:0.6,dir:1,top:HERO.top,topD:HERO.topD,look:-1,scared:1})},
};
const CAM={hook:[1.08,1.0],ladder:[1.0,1.06],on:[1.0,1.08],morse:[1.0,1.1],neighbor:[1.0,1.08],plug:[1.0,1.06],faster:[1.0,1.1],street:[1.12,1.0],empty:[1.0,1.08],name:[1.0,1.06]};
