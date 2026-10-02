/* Service worker : met l'application en cache pour un fonctionnement hors ligne. */
var VERSION = "liste-courses-v1";
var COQUILLE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-180.png"
];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(VERSION).then(function(c){
      return c.addAll(COQUILLE);
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(noms){
      return Promise.all(noms.map(function(n){
        if(n !== VERSION) return caches.delete(n);
        return null;
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;

  /* Les polices Google : on sert le cache et on rafraichit en arriere-plan. */
  if(req.url.indexOf("fonts.googleapis.com") > -1 || req.url.indexOf("fonts.gstatic.com") > -1){
    e.respondWith(
      caches.open(VERSION).then(function(c){
        return c.match(req).then(function(hit){
          var reseau = fetch(req).then(function(rep){
            if(rep && (rep.ok || rep.type === "opaque")) c.put(req, rep.clone());
            return rep;
          }).catch(function(){ return hit; });
          return hit || reseau;
        });
      })
    );
    return;
  }

  /* L'application elle-meme : cache d'abord, reseau ensuite. */
  e.respondWith(
    caches.match(req).then(function(hit){
      if(hit) return hit;
      return fetch(req).then(function(rep){
        if(rep && rep.ok && rep.type === "basic"){
          var copie = rep.clone();
          caches.open(VERSION).then(function(c){ c.put(req, copie); });
        }
        return rep;
      }).catch(function(){
        if(req.mode === "navigate") return caches.match("./index.html");
        return new Response("", {status:503, statusText:"hors ligne"});
      });
    })
  );
});
