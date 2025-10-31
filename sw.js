// Service Worker for ZSM Express Inc Website
const CACHE_NAME = 'zsm-express-v1';
const urlsToCache = [
    '/',
    '/styles.css',
    '/script.js',
    '/images/zsm-express-store-entrance-exterior.jpg',
    '/images/zsm-express-convenience-store-interior.jpg',
    '/images/zsm-express-snack-aisles-organized.jpg',
    '/images/zsm-express-cashier-counter-lottery.jpg',
    '/images/zsm-express-beverage-aisle-automotive.jpg',
    '/images/zsm-express-grocery-section-products.jpg',
    '/images/zsm-express-atm-service-area.jpg',
    '/images/zsm-express-checkout-counter-technology.jpg',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});