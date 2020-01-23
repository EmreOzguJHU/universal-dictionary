import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('service-worker.js')
//         .then(function (registration) {
//             // Successful registration
//             console.log('Hooray. Registration successful, scope is:', registration.scope);
//         }).catch(function (err) {
//         // Failed registration, service worker won’t be installed
//         console.log('Whoops. Service worker registration failed, error:', err);
//     });
// }
//
// var CACHE_NAME = 'my-pwa-cache-v1';
// var urlsToCache = [
//     '/',
//     '/styles/styles.css',
//     '/script/webpack-bundle.js'
// ];
// self.addEventListener('install', function(event) {
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then(function(cache) {
//                 // Open a cache and cache our files
//                 return cache.addAll(urlsToCache);
//             })
//     );
// });
//
// self.addEventListener('fetch', function(event) {
//     console.log(event.request.url);
//     event.respondWith(
//         caches.match(event.request).then(function(response) {
//             return response || fetch(event.request);
//         })
//     );
// });