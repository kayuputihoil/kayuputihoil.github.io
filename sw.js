importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.setConfig({
  debug: true, // Aktifkan mode debug untuk pengembangan
});

workbox.core.setCacheNameDetails({prefix:'workbox',suffix:'v1'})

workbox.precaching.precacheAndRoute([
  // Daftar aset yang ingin Anda cache dan perbarui secara otomatis
  // Misalnya, '/index.html', '/styles.css', '/script.js', dll.
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js',
  'http://127.0.0.1/marketingmkp/',
  'http://127.0.0.1/marketingmkp/index.html',
  'http://127.0.0.1/marketingmkp/assets/vendor/animate.css/animate.min.css',
  'http://127.0.0.1/marketingmkp/assets/vendor/bootstrap/css/bootstrap.min.css',
  'http://127.0.0.1/marketingmkp/assets/vendor/bootstrap-icons/bootstrap-icons.css',
  'http://127.0.0.1/marketingmkp/assets/vendor/boxicons/css/boxicons.min.css',
  'http://127.0.0.1/marketingmkp/assets/vendor/glightbox/css/glightbox.min.css',
  'http://127.0.0.1/marketingmkp/assets/vendor/swiper/swiper-bundle.min.css',
  'http://127.0.0.1/marketingmkp/assets/css/style.css',
  'https://code.jquery.com/jquery-3.6.3.min.js',
  'http://127.0.0.1/marketingmkp/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
  'http://127.0.0.1/marketingmkp/assets/vendor/isotope-layout/isotope.pkgd.min.js',
  'http://127.0.0.1/marketingmkp/assets/vendor/glightbox/js/glightbox.min.js',
  'http://127.0.0.1/marketingmkp/assets/vendor/swiper/swiper-bundle.min.js',
  'http://127.0.0.1/marketingmkp/assets/vendor/php-email-form/validate.js',
  'http://127.0.0.1/marketingmkp/assets/js/main.js',
  'http://127.0.0.1/marketingmkp/assets/img/daun_kayuputih.png',
  'http://127.0.0.1/marketingmkp/assets/img/daun_kayuputih512.png',
  'http://127.0.0.1/marketingmkp/assets/img/daun_kayuputih256.png',
  'http://127.0.0.1/marketingmkp/assets/img/daun_kayuputih192.png',
  'http://127.0.0.1/marketingmkp/assets/img/eucalyptus/banner2.jpg',
  'http://127.0.0.1/marketingmkp/assets/img/eucalyptus/banner3.jpg'
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


// Strategi runtime caching untuk permintaan yang cocok dengan kondisi tertentu
workbox.routing.registerRoute(
  // Kondisi pemfilteran permintaan
  // ({url}) => url.origin === 'http://127.0.0.1/marketingmkp/', // khusus di url d baris ini
  ({url}) => true, //untuk semua
  // Strategi caching yang digunakan
  new workbox.strategies.StaleWhileRevalidate()
  // new workbox.strategies.CacheFirst()
  // new workbox.strategies.NetworkFirst()
);