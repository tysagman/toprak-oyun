const C="miras-v497",F=["./","./index.html","./three.min.js","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
// Oyun sayfası: önce internetten en yenisi (güncelleme hemen gelir), internet yoksa telefondaki kopya
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);if(u.pathname.includes("/app/")||u.pathname.endsWith("version.json")||u.pathname.endsWith("changelog.json"))return;
  const page=r.mode==="navigate"||u.pathname.endsWith("/")||u.pathname.endsWith(".html");
  if(page){e.respondWith(fetch(r,{cache:"no-store"}).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{});return res}).catch(()=>caches.match(r).then(m=>m||caches.match("./index.html"))));return}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{});return res})))});
