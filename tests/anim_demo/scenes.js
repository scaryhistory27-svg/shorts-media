const SCN={
 walk(lt,p,t,d){sky('#090c12','#121924');ctx.fillStyle='#0a0e14';ctx.fillRect(0,1240,W,700);
   for(let i=0;i<4;i++){const x=((i*360-t*90)%1440+1440)%1440-180;ctx.fillStyle='#1a212d';ctx.fillRect(x,560,200,600);glow(x+100,520,200,'rgba(255,214,140,A)',0.25*life.flicker(t+i))}
   walker(moveAlong(p,180,900),1240,1.9,t,{speed:1.6,dir:1,look:0})},
 turn(lt,p,t,d){sky('#090c12','#121924');ctx.fillStyle='#0a0e14';ctx.fillRect(0,1240,W,700);
   const cx=moveAlong(p,-200,300);glow(cx,1000,380,'rgba(170,20,30,A)',0.45);crawler(cx,1050,0.55,t,1.4);const turned=p>0.45;
   walker(760,1240,1.9,t,{speed:0,dir:turned?-1:1,look:turned?0.6:0,scared:turned?1:0,reach:turned?0.6:0})}};
const CAM={walk:[1,1.04],turn:[1,1.08]};
