// FearFiles: The Photo — Thanksgiving porch photo, one extra pale woman who gets closer in each timer shot; final upload: 8 people, and I'm not there.
const ME={top:'#3b6a46',topD:'#2c5034'};const FAM=[{top:'#8a3a3a',topD:'#6a2a2a'},{top:'#3a4a8a',topD:'#2a3a6a',hair:'#bbb'},{top:'#8a6a2a',topD:'#6a4a1a'},{top:'#5a3a6a',topD:'#42284e'},{top:'#2a6a7a',topD:'#1e505c'},{top:'#7a7a3a',topD:'#5c5c2a',hair:'#ddd'}];
const PALE={top:'#e8e4dc',topD:'#c8c4bc',skin:'#f4f0ea',hair:'#d8d2c8',pants:'#d8d4cc'};
const endCard=(seg,t)=>{const last=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>last+0.9){const a=ease(clamp((t-last-0.9)/0.5,0,1));ctx.fillStyle=`rgba(0,0,0,${0.93*a})`;ctx.fillRect(-100,-100,W+200,H+200);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 100px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}};
// family group photo: o.n = 0..1 how close the pale woman is (0 behind uncle, 1 hand on my shoulder), o.me false = I'm missing, o.nums
function group(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.fillStyle='#3a2a20';ctx.fillRect(-470,-560,940,600);ctx.fillStyle='#4a3828';for(let i=0;i<6;i++)ctx.fillRect(-470,-560+i*100,940,6);ctx.fillStyle='rgba(255,210,140,0.5)';ctx.fillRect(-120,-500,240,300);ctx.fillStyle='#2a1e16';ctx.fillRect(-470,0,940,60);
  const xs=[-360,-220,-80,80,220,360],fr=t*0.0;const n=o.n??0;const px=lerp(-140,o.me===false?140:180,n),py=lerp(-60,-8,n),ps=lerp(0.85,1,n);
  if(o.pale!==false&&n<0.5){ctx.save();ctx.globalAlpha=o.paleA??0.85;walker(px,py,ps,t,Object.assign({speed:0},PALE));ctx.restore()}
  xs.forEach((xx,i)=>{const back=i%2===0;walker(xx,back?-40:0,back?0.88:0.95,t,Object.assign({speed:0,look:0},FAM[i]))});
  if(o.me!==false)walker(180,10,0.95,t,Object.assign({speed:0,look:0,scared:o.scared||0},ME)); else walker(180,10,0.95,t,Object.assign({speed:0},FAM[2]));
  if(o.pale!==false&&n>=0.5){ctx.save();ctx.globalAlpha=o.paleA??0.9;walker(px,py,ps,t,Object.assign({speed:0,reach:n>0.9?1:0},PALE));ctx.restore()}
  if(o.nums){const ord=[[-360,-40],[-220,0],[-80,-40],[80,0],[220,-40],[360,0],[180,10],[px,py]];const k=Math.min(8,Math.floor(o.nums*8.99));for(let i=0;i<k;i++){const [nx,ny]=ord[i];ctx.fillStyle=i===7?'#ff3a3a':'#ffd23a';ctx.font='900 54px Inter';ctx.textAlign='center';ctx.fillText(i+1,nx,ny-290)}}
  ctx.restore()}
function photoFrame(x,y,w,h,t,draw){ctx.save();ctx.fillStyle='#f2efe6';ctx.fillRect(x-14,y-14,w+28,h+28);ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();ctx.fillStyle='#120e0c';ctx.fillRect(x,y,w,h);draw();ctx.restore()}
function darkRoom(t){ctx.fillStyle='#0b0d14';ctx.fillRect(-100,-100,W+200,H+200);glow(540,800,600,'rgba(120,160,255,A)',0.08)}
const SCN={
  hook:(lt,p,t,d,seg)=>{darkRoom(t);const first=seg===TL.segs[0];phone(540,900,1.6,Math.sin(t*1.2)*0.02,()=>{ctx.save();ctx.translate(-172,-362);ctx.fillStyle='#111';ctx.fillRect(0,0,344,724);ctx.save();ctx.beginPath();ctx.rect(0,150,344,300);ctx.clip();group(172,420,0.34,t,{n:first?0:0,paleA:first?0.35:0.9});ctx.restore();
      ctx.fillStyle='#fff';ctx.font='800 20px Inter';ctx.textAlign='left';ctx.fillText('Mom · Thanksgiving 🦃',16,130);ctx.fillStyle='#ff4a6a';ctx.fillText('♥ 23',16,490);ctx.restore()});heartbeat(t,0.2);endCard(seg,t)},
  porch:(lt,p,t)=>{ctx.fillStyle='#1a2030';ctx.fillRect(-100,-100,W+200,H+200);group(540,1180,1.0,t,{pale:false});ctx.fillStyle='#222';ctx.fillRect(520,1250,10,300);ctx.fillRect(470,1220,110,60);const fl=Math.floor(lt*2)%2;ell(560,1240,8,8,fl?'#ff3a3a':'#5a1010');
    walker(moveAlong(clamp(lt/1.6,0,1),700,180)+0,1200,0.95,t,Object.assign({speed:lt<1.6?1.2:0,dir:-1},ME))},
  post:(lt,p,t)=>{darkRoom(t);const sh=shakeAt(t,['buzz'],0.5,8);const z=lerp(1,1.8,ease(clamp((lt-0.8)/1,0,1)));phone(540+sh,900,1.6,0,()=>{ctx.save();ctx.translate(-172,-362);ctx.fillStyle='#111';ctx.fillRect(0,0,344,724);ctx.save();ctx.beginPath();ctx.rect(0,150,344,300);ctx.clip();ctx.translate(172,300);ctx.scale(z,z);ctx.translate(-172,-300);group(172,420,0.34,t,{paleA:0.8});ctx.restore();
      ctx.fillStyle='#fff';ctx.font='800 20px Inter';ctx.textAlign='left';ctx.fillText('Grandma: who is behind Ray?',16,520);ctx.restore()})},
  count:(lt,p,t)=>{ctx.fillStyle='#1a2030';ctx.fillRect(-100,-100,W+200,H+200);photoFrame(70,560,940,600,t,()=>group(540,1150,1.0,t,{nums:clamp(lt/1.6,0,1),paleA:0.85}));heartbeat(t,0.35)},
  face:(lt,p,t,d,seg)=>{darkRoom(t);const two=seg.words[0].w==='Nobody';photoFrame(140,420,800,800,t,()=>{ctx.save();ctx.translate(540,820);ctx.scale(2.4,2.4);ctx.translate(-400,-1080+80);group(540,1150,1.0,t,{paleA:0.95});ctx.restore()});if(two){ctx.fillStyle='rgba(255,40,40,0.1)';ctx.fillRect(140,420,800,800)};glow(420,700,200,'rgba(255,255,255,A)',0.05)},
  grid:(lt,p,t)=>{darkRoom(t);const k=Math.min(12,1+Math.floor(lt*5));for(let i=0;i<k;i++){const cx=210+(i%3)*330,cy=470+Math.floor(i/3)*230;photoFrame(cx-140,cy-90,280,180,t,()=>group(cx,cy+86,0.28,t,{n:i/11*0.95,paleA:0.9}))}},
  closer:(lt,p,t)=>{darkRoom(t);const n=clamp(0.3+lt/3*0.6,0,0.9);photoFrame(70,520,940,640,t,()=>group(540,1150,1.0,t,{n:jerky(n,6,2),paleA:0.95,scared:0}));heartbeat(t,0.4)},
  shoulder:(lt,p,t)=>{darkRoom(t);photoFrame(70,520,940,640,t,()=>{ctx.save();ctx.translate(700,880);ctx.scale(1.6,1.6);ctx.translate(-700,-880);group(540,1150,1.0,t,{n:1,paleA:1});ctx.restore()});heartbeat(t,0.45)},
  buzz:(lt,p,t)=>{ctx.fillStyle='#10131c';ctx.fillRect(-100,-100,W+200,H+200);ctx.fillStyle='#1c2230';ctx.fillRect(-100,1150,W+200,H);ctx.fillStyle='#2a3248';rr(80,1000,520,160,30);ctx.fill();const sh=shakeAt(t,['buzz'],0.6,10);
    walker(820,1300,1.15,t,Object.assign({speed:0,look:-1,scared:0.6,reach:0.6},ME));phone(560+sh,760,1.1,Math.sin(t*25)*0.02*(sh?1:0),()=>{ctx.fillStyle='#111';ctx.fillRect(-172,-362,344,724);ctx.fillStyle='#fff';ctx.font='900 26px Inter';ctx.textAlign='center';ctx.fillText('UPLOADING…',0,-40);
      ctx.fillStyle='#333';rr(-130,0,260,20,10);ctx.fill();ctx.fillStyle='#5fd4ff';rr(-130,0,260*clamp(lt/2.2,0,1),20,10);ctx.fill();ctx.fillStyle='#aaa';ctx.font='700 18px Inter';ctx.fillText('from: unknown device',0,70)})},
  family:(lt,p,t,d,seg)=>{darkRoom(t);const two=seg.words[0].w==='And';photoFrame(70,520,940,640,t,()=>group(540,1150,1.0,t,{me:false,n:0.55,paleA:1,nums:two?0:clamp(lt/1.6,0,1)}));if(two){ctx.fillStyle='rgba(255,40,40,0.12)';ctx.fillRect(70,520,940,640)}},
};
const CAM={hook:[1.08,1.0],porch:[1.0,1.06],post:[1.0,1.04],count:[1.0,1.06],face:[1.0,1.08],grid:[1.0,1.04],closer:[1.0,1.1],shoulder:[1.0,1.08],buzz:[1.0,1.06],family:[1.04,1.0]};
