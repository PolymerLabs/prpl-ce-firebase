module.exports = {
  "globDirectory": "public/",
  "globPatterns": [
    "**/*.{js,ico,html,css}"
  ],
  "swDest": "public/sw.js",
  "globIgnores": [
    "../workbox-cli-config.js"
  ],

  /**
   * Added config options below. Don't forget the trailing comma (,) above.
   */

  /**
   * Activate this service worker on all active clients without reloading the page.
   */
  "skipWaiting": true,
  "clientsClaim": true,

  /**
   * All navigate requests should serve the contents of "index.html".
   */
  "navigateFallback": "index.html",

  /**
   * Runtime caching options.
   */
  "runtimeCaching": [
    /**
     * Use the "network-first" strategy for data. This means users will always get
     * up-to-date data if they have a reliable network connection, but falls back to
     * cached content otherwise.
     */
    {
      "urlPattern": "/data/*",
      "handler": "networkFirst"
    },

    /**
     * Use the "cache-first" strategy for images. This means that once an image is
     * cached, it will not be updated and waste the user's data. To update the image,
     * you would need to revision the image (e.g. by changing the filename).
     *
     * Cross-origin requests will always return a status of 0 - this needs to be
     * explicitly specified as cacheable when creating the handler.
     */
    {
      "urlPattern": /^https:\/\/prpl-ce-firebase\.firebaseapp\.com\/images\//,
      "handler": "cacheFirst",
      "options": {
        "cacheableResponse": {
          "statuses": [0, 200]
        }
      },
    }
  ]
};
