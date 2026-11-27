// Usage: node pipeline/render.js <episode_dir> [preview t1 t2 ...]   -> <episode_dir>/build/final.mp4 (or prev_*.jpg)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const {spawnSync,spawn}=require('child_process');
const E=path.resolve(process.argv[2]),B=E+'/build',mode=process.argv[3];
(async()=>{const br=await chromium.launch();const pg=await br.newPage({viewport:{width:1080,height:1920}});
 if(fs.existsSync(B+'/img')){const m={};for(const f of fs.readdirSync(B+'/img'))if(/\.(jpe?g|png)$/i.test(f))m[f.replace(/\.[^.]+$/,'')]='data:image/'+(f.endsWith('png')?'png':'jpeg')+';base64,'+fs.readFileSync(B+'/img/'+f).toString('base64');await pg.addInitScript(d=>{window.IMGDATA=d},m)} // local images as data URLs (file:// would taint the canvas)
 pg.on('pageerror',e=>{console.log('PAGE ERROR',e.message);process.exitCode=1});
 const LIB=path.resolve(E,'..','lib.js'); // optional per-channel library (e.g. channels/detective/lib.js — pseudo-3D toolkit)
 await pg.goto('file://'+__dirname+'/anim.html?scenes='+encodeURIComponent('file://'+E+'/scenes.js')+(fs.existsSync(LIB)?'&lib='+encodeURIComponent('file://'+LIB):''));await pg.evaluate(()=>document.fonts.ready);
 const tl=JSON.parse(fs.readFileSync(B+'/timeline.json'));await pg.evaluate(j=>window.setTL(j),tl);
 await pg.evaluate(()=>window.ASSETS_READY||null); // scenes may preload images (e.g. official screenshots) before the first frame
 const grab=async t=>Buffer.from((await pg.evaluate(t=>{render(t);return document.getElementById('c').toDataURL('image/jpeg',0.93)},t)).split(',')[1],'base64');
 if(mode==='cover'){const ep=JSON.parse(fs.readFileSync(E+'/episode.json'));const c=ep.cover;if(!c){console.log('no cover in episode.json');process.exit(1)}
  const ct=typeof c.t==='number'?c.t:(()=>{const s=tl.segs[c.seg];return s.s+(s.e-s.s)*(c.frac??0.6)})();
  await pg.evaluate(c=>{window.COVER=c},c);fs.writeFileSync(E+'/build/cover.jpg',await grab(ct));console.log('cover',E+'/build/cover.jpg')}
 else if(mode==='preview'){let ts=process.argv.slice(4).map(Number);if(!ts.length)ts=tl.segs.map(s=>(s.s+s.e)/2);
  for(const f of fs.readdirSync(B))if(f.startsWith('prev_'))fs.unlinkSync(B+'/'+f);
  for(const [i,t] of ts.entries())fs.writeFileSync(`${B}/prev_${String(i).padStart(2,'0')}.jpg`,await grab(t));
  spawnSync('ffmpeg',['-v','error','-y','-i',B+'/prev_%02d.jpg','-vf','scale=270:480,tile=7x2','-frames:v','1',B+'/sheet.jpg']);console.log('sheet',B+'/sheet.jpg')}
 else{const n=Math.round(tl.total*tl.fps);const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate',String(tl.fps),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','16','-pix_fmt','yuv420p',B+'/raw.mp4'],{stdio:['pipe','inherit','inherit']});
  for(let i=0;i<n;i++){const b=await grab(i/tl.fps);if(!ff.stdin.write(b))await new Promise(r=>ff.stdin.once('drain',r));if(i%300==0)console.log('frame',i,'/',n)}
  ff.stdin.end();await new Promise(r=>ff.on('close',r));
  const r=spawnSync('ffmpeg',['-v','error','-y','-i',B+'/raw.mp4','-i',B+'/audio_master.wav','-c:v','libx264','-preset','slow','-crf','26','-maxrate','12M','-bufsize','24M','-pix_fmt','yuv420p','-ar','48000','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',B+'/final.mp4'],{stdio:'inherit'});
  console.log('done',B+'/final.mp4')}
 await br.close()})();
