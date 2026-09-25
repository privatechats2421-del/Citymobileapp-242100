
const CACHE_NAME = "citiymobile-v6";

const APP_FILES = [

    "./",

    "./index.html",

    "./dashboard.html",

    "./account.html",

    "./transactions.html",

    "./deposit.html",

    "./pay-bills.html",

    "./transfer.html",

    "./verification.html",

    "./security-verification.html",

    "./transaction-verification.html",

    "./authorization.html",

    "./confirmation.html",

    "./style.css",

    "./script.js",

    "./manifest.json",

    "./logo.jpg"

];

self.addEventListener("install", function (event) {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(function (cache) {

                return cache.addAll(APP_FILES);

            })

            .then(function () {

                return self.skipWaiting();

            })

    );

});

self.addEventListener("activate", function (event) {

    event.waitUntil(

        caches.keys().then(function (cacheNames) {

            return Promise.all(

                cacheNames.map(function (cacheName) {

                    if (cacheName !== CACHE_NAME) {

                        return caches.delete(cacheName);

                    }

                })

            );

        }).then(function () {

            return self.clients.claim();

        })

    );

});

self.addEventListener("fetch", function (event) {

    if (event.request.method !== "GET") {

        return;

    }

    event.respondWith(

        caches.match(event.request)

            .then(function (cachedResponse) {

                if (cachedResponse) {

                    return cachedResponse;

                }

                return fetch(event.request);

            })

            .catch(function () {

                return caches.match("./index.html");

            })

    );

});

