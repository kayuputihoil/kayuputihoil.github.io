importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.setConfig({
  debug: true, // Aktifkan mode debug untuk pengembangan
});

workbox.core.setCacheNameDetails({prefix:'workbox',suffix:'v1'})//jika ubah suffix jgn lupa ubah di suffix di event activate 

// Strategi runtime caching untuk permintaan yang cocok dengan kondisi tertentu
workbox.routing.registerRoute(
  // Kondisi pemfilteran permintaan
  // ({url}) => url.origin === 'https://kayuputihoil.github.io/', // khusus di url d baris ini
  ({url}) => true, //untuk semua
  // Strategi caching yang digunakan
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'workbox-runtime-v1', // Nama cache untuk file CSS
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200], // Hanya cache respons dengan status 200 (OK)
        headers: {'Cache-Control': 'max-age=86400'} // Kadaluarsa cache diatur selama 86400 detik (1 hari)
      })
    ]
  })
  // new workbox.strategies.CacheFirst()
  // new workbox.strategies.NetworkFirst()
);

workbox.precaching.precacheAndRoute([
  // Daftar aset yang ingin Anda cache dan perbarui secara otomatis
  // Misalnya, '/index.html', '/styles.css', '/script.js', dll.
  { url: 'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js', revision: '1' },
  { url: 'https://kayuputihoil.github.io/', revision: '1' },
  { url: 'https://kayuputihoil.github.io/index.html', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/vendor/animate.css/animate.min.css', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/vendor/bootstrap/css/bootstrap.min.css', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/vendor/bootstrap-icons/bootstrap-icons.css', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/vendor/boxicons/css/boxicons.min.css', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/vendor/glightbox/css/glightbox.min.css', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/vendor/swiper/swiper-bundle.min.css', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/css/style.css', revision: '1' },
  { url: 'https://code.jquery.com/jquery-3.6.3.min.js', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/vendor/bootstrap/js/bootstrap.bundle.min.js', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/vendor/isotope-layout/isotope.pkgd.min.js', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/vendor/glightbox/js/glightbox.min.js', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/vendor/swiper/swiper-bundle.min.js', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/vendor/php-email-form/validate.js', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/js/main.js', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/img/daun_kayuputih.png', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/img/daun_kayuputih512.png', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/img/daun_kayuputih256.png', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/img/daun_kayuputih192.png', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/img/eucalyptus/banner2.jpg', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/img/eucalyptus/banner3.jpg', revision: '1' }
]);

// /sw.js
self.addEventListener('install', (event) => {
 event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
// t4 buat agar perubahan apa saja yang ada di file cache akan diupdate cachenya
  //remove outdated caches
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.filter(key => {
          // return true;
          // return !workbox.core.keyList.includes(key);
          return !key.startsWith('workbox') || !key.endsWith('v1');
        }).map(key => {
            console.log(key);
            return caches.delete(key);
        })
      );
    })
  );
  return self.clients.claim();
});



// Pilihan 1
// dalam fetch request object dan response object
self.addEventListener('fetch', (event) => {
  //retrieve with network fallback (caches first)
  event.respondWith(
    //agar tdk lama loading
    caches.match(event.request) // ini kode baris utk cek response cache ada atau tdk //event.request merupakan code data yg di ambil dari jaringan
    .then((response) => {

      return response || fetch(event.request);

    })
  );
});



self.addEventListener('push', (event) => {
  let data = {};

  //get data dari push message
  if (event.data) {
    data = JSON.parse(event.data.text());
  }
  const title = data.title || 'Minyak Kayu Putih';
  const options = {
    // body: event.data.text(),
    body: data.body || 'Harga terbaru dan terjangkau.',
    icon: '/assets/img/daun_kayuputih.png',
    badge: '/assets/img/daun_kayuputih.png',
    tag: 'simple-push-tag'
  };
  
   event.waitUntil(self.registration.showNotification(title, options));

});

