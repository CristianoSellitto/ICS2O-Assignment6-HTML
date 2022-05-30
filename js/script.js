// Cristiano
// ICS2O-Unit0-00-HTML
// Date 2022

'use strict'
/**
 * Check service worker.
 */
if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/<RESPITORY>/sw.js", {
    scope: "/<RESPITORY>/",
  })
}

/**
 * Alerts "Hello, World!"
 */
function onButtonClick() {
  alert("Hello, World!")
}
