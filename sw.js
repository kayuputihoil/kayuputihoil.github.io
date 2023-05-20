// /sw.js
self.addEventListener('install', (event) => {
  const cacheKey = 'CacheMKP_v2';

  event.waitUntil(caches.open(cacheKey).then((cache) => {
    // Add all the assets in the array to the 'CacheMKP_v1'
    // `Cache` instance for later use.
    return cache.addAll([
      '/',
      '/assets/vendor/animate.css/animate.min.css',
      '/assets/vendor/bootstrap/css/bootstrap.min.css',
      '/assets/vendor/bootstrap-icons/bootstrap-icons.css',
      '/assets/vendor/boxicons/css/boxicons.min.css',
      '/assets/vendor/glightbox/css/glightbox.min.css',
      '/assets/vendor/swiper/swiper-bundle.min.css',
      '/assets/css/style.css',
      'https://code.jquery.com/jquery-3.6.3.min.js',
      '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
      '/assets/vendor/isotope-layout/isotope.pkgd.min.js',
      '/assets/vendor/glightbox/js/glightbox.min.js',
      '/assets/vendor/swiper/swiper-bundle.min.js',
      '/assets/vendor/php-email-form/validate.js',
      '/assets/js/main.js',
      '/assets/img/daun_kayuputih.png'
    ]);
  }));
});


self.addEventListener('activate', (event) => {
  //remove outdated caches
  // event.waitUntil(
  //   caches.keys().then(keyList => {
  //     return Promise.all(keyList.map(key => {
  //       if (key !== cacheKey) {
  //         return caches.delete(key);// menghapus semua cache yang tidak cocok dengan cache now
  //       }
  //     }));
  //   })
  // );
  // return self.clients.claim();

  console.log('activate event');
});

// Pilihan 1
self.addEventListener('fetch', (event) => {
  //retrieve with network fallback (caches first)
  // event.respondWith(
  //   //agar tdk lama loading
  //   caches.match(event.request)  //event.request merupakan code data yg di ambil dari jaringan
  //   .then((response) => {
      
  //     // return response || fetch(event.request);

  //     //jika asset ditemukan dalam cache, maka return yg ada di cache
  //     if(response){
  //       return response;
  //     }

  //     //jika asset tidak ditemukan dalam cache, maka ambil dari jaringan
  //     return fetch(event.request);
  //   })
  // );
  console.log('fetch intercepted for: ', event.request.url);

});