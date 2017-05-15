/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

importScripts('/workbox-sw.prod.v0.0.2.js');
const workboxSW = new WorkboxSW();

/**
 * Activate this service worker on all active clients without reloading the page.
 */
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

/**
 * Precache all static assets. Note that revision will need to be updated here
 * to bust the service worker cache.
 */
workboxSW.precache([
  {
    url: '/elements/my-app.js',
    revision: 'f6cfd5c1c19c16266636a57a4704c09e'
  },
  {
    url: '/elements/list-view.js',
    revision: 'c67ff3c519e7026524e99fa46e72ee65'
  },
  {
    url: '/elements/detail-view.js',
    revision: '74cb8d634cfab3dc639dbc6172dc45fe'
  },
  {
    url: '/style.css',
    revision: '136144651ad43b738bee8feeaef6dd93'
  },
  {
    url: '/manifest.json',
    revision: 'fc9108e8da8e47ef91277ada694f3a03'
  },
  {
    url: '/',
    revision: '2a6102028bf7c9774318544307073dd7'
  }
]);

/**
 * All "/detail/*" paths should also respond with the same content as "/".
 * Construct a new Response object with no link headers so that the browser
 * doesn't try to preload list view assets.
 */
const detailViewHandler = () => caches.match('/')
  .then(response => new Response(response.body));
workboxSW.router.registerRoute('/detail/*', detailViewHandler);

/**
 * Use the "network-first" strategy for data. This means users will always get
 * up-to-date data if they have a reliable network connection, but falls back to
 * cached content otherwise.
 */
workboxSW.router.registerRoute('/data/*', workboxSW.strategies.networkFirst());

/**
 * Use the "cache-first" strategy for images. This means that once an image is
 * cached, it will not be updated and waste the user's data. To update the image,
 * you would need to revision the image (e.g. by changing the filename).
 *
 * Cross-origin requests will always return a status of 0 - this needs to be
 * explicitly specified as cacheable when creating the handler.
 */
const assetsRegex = new RegExp('^https://prpl-ce-firebase\.firebaseapp\.com/images/');
const corsCacheFirst = workboxSW.strategies.cacheFirst({
  cacheableResponse: {
    statuses: [0, 200]
  }
});
workboxSW.router.registerRoute(assetsRegex, corsCacheFirst);
