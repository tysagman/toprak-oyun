// Kök sayfa (APK buradan açılır): internet yoksa telefondaki kopya açılır, oyun/ klasörüne yönlendirir
const C="kok-v1";
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(["./","./index.html"])).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||r.mode!=="navigate")return;const u=new URL(r.url);if(/\/oyun\//.test(u.pathname))return;
  e.respondWith(fetch(r,{cache:"no-store"}).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put("./",cp)).catch(()=>{});return res}).catch(()=>caches.match("./").then(m=>m||caches.match("./index.html"))))});
