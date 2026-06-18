// ভার্সন v1 থেকে v2 তে আপডেট করলাম যাতে পুরনো ডাটা ক্লিয়ার হয়
const CACHE_NAME = "travel-partner-bd-v2";

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                "/",
                "/index.html"
            ]);
        })
    );
});

self.addEventListener("activate", (event) => {
    // পুরনো ক্যাশ ফাইলগুলো ডিলিট করে নতুন ভার্সন এক্টিভ করা
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});