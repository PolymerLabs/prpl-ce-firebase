/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

class DetailViewElement extends HTMLElement {
  static get observedAttributes() {
    return ['path'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr !== 'path' || !newValue) {
      return;
    }

    this.innerHTML = '';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `/data${newValue}.json`);
    xhr.addEventListener('load', () => this.renderItems(JSON.parse(xhr.responseText)));
    xhr.addEventListener('error', () => this.showNetworkError());
    xhr.send();
  }

  renderItems(item) {
    this.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}">
      <a href="/" class="close-btn">&times;</a>
      <div>
        <h1>${item.name}</h1>
        <p>${item.description}</p>
      </div>`;
  }

  showNetworkError() {
    this.innerHTML = `
      <a href="/" class="close-btn">&times;</a>
      <p class="error">No network connection</p>`;
  }
}

customElements.define('detail-view', DetailViewElement);
