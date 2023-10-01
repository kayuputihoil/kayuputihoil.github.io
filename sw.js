// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

workbox.setConfig({
  debug: false, // Aktifkan mode debug untuk pengembangan
});

workbox.core.setCacheNameDetails({prefix:'workbox',suffix:'v5'})//jika ubah suffix jgn lupa ubah di suffix di event activate 

// Set cache expiration time (e.g., 7 days)
const cacheExpiration = 7 * 24 * 60 * 60; // in seconds

// Strategi runtime caching untuk permintaan yang cocok dengan kondisi tertentu
workbox.routing.registerRoute(
  // Kondisi pemfilteran permintaan
  // ({url}) => url.origin === 'https://kayuputihoil.github.io/', // khusus di url d baris ini
  // ({url}) => true, //untuk semua

  ({url}) => {
    return !url.pathname.match(/\.(jpg|jpeg|png|gif|svg)$/);
  },
  // Strategi caching yang digunakan
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'pracache-all',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
        // headers: {'Cache-Control': 'max-age=120'}
      })//,
      // new workbox.expiration.ExpirationPlugin({
      //   maxEntries: 50,
      //   maxAgeSeconds: cacheExpiration, //31536000 // Kadaluarsa cache diatur selama 86400 detik (1 hari)
      //   purgeOnQuotaError: true, // Menghapus entri-cache jika terjadi kesalahan kuota
      // })
    ]
  //   cacheName: 'workbox-runtime-v5', // Nama cache untuk file CSS
  // plugins: [
  //   new workbox.expiration.Plugin({
  //     maxAgeSeconds: 120,
  //     maxEntries: 50,
  //   }),
  // ]
  //   plugins: [
  //     new workbox.cacheableResponse.CacheableResponsePlugin({
  //       statuses: [200], // Hanya cache respons dengan status 200 (OK)
  //       maxAgeSeconds: 120 //kadaluarsa 1 tahun (31536000 detik = 1 tahun)
  //       // headers: {'Cache-Control': 'max-age=86400'} // Kadaluarsa cache diatur selama 86400 detik (1 hari)
  //     })

  //     // new workbox.expiration.ExpirationPlugin({
  //     //   statuses: [200], // Hanya cache respons dengan status 200 (OK)
  //     //   maxAgeSeconds: 1200, // Kadaluarsa cache diatur selama 86400 detik (1 hari)
  //     // }),
  //   ]
  })
  // new workbox.strategies.CacheFirst()
  // new workbox.strategies.NetworkFirst()
);

// Cache khusus untuk ekstensi gambar dengan strategi CacheFirst
workbox.routing.registerRoute(
  ({url}) => {
    return url.pathname.match(/\.(jpg|jpeg|png|gif|svg)$/);
  },
  new workbox.strategies.CacheFirst({
    cacheName: 'imagecache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      })//,
      // new workbox.expiration.ExpirationPlugin({
      //   maxEntries: 50,
      //   maxAgeSeconds: cacheExpiration,
      //   purgeOnQuotaError: true, 
      // })
    ]
  })
);

workbox.precaching.precacheAndRoute([
  // Daftar aset yang ingin Anda cache dan perbarui secara otomatis
  // Misalnya, '/index.html', '/styles.css', '/script.js', dll.
  // { url: 'https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js', revision: '1' },
  { url: 'https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js', revision: '1' },
  { url: 'https://kayuputihoil.github.io/', revision: '1' },
  { url: 'https://kayuputihoil.github.io/index.html', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/vendor/animate.css/animate.min.css', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/vendor/bootstrap/css/bootstrap.min.css', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/vendor/bootstrap-icons/bootstrap-icons.css', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/vendor/boxicons/css/boxicons.min.css', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/vendor/glightbox/css/glightbox.min.css', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/vendor/swiper/swiper-bundle.min.css', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/css/style.css', revision: '1' },
  { url: 'https://code.jquery.com/jquery-3.7.0.min.js', revision: '1' },
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
  { url: 'https://kayuputihoil.github.io/assets/img/eucalyptus/banner3.jpg', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/img/mkp620ml.png', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/img/mkp300ml.png', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/img/mkp120ml.jpeg', revision: '1' },
  { url: 'https://kayuputihoil.github.io/assets/img/ic-wa.webp', revision: '1' }
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
          return !key.startsWith('workbox') || !key.endsWith('v5');
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
    // caches.match(event.request) // ini kode baris utk cek response cache ada atau tdk //event.request merupakan code data yg di ambil dari jaringan
    // .then((response) => {
    //   return response || fetch(event.request);
    // })
    caches.match(event.request) // ini kode baris utk cek response cache ada atau tdk //event.request merupakan code data yg di ambil dari jaringan
    .then((response) => {
      const fetchPromise = fetch(event.request)
      .then(networkResponse => {
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      });
      return response || fetchPromise;
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

