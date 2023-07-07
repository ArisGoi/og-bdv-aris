self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('app-cache').then(function(cache) {
        return cache.add('manifest.json');
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    if (event.request.url.endsWith('manifest.json')) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    }
  });
  