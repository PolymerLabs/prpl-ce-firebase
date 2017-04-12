/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

class ListViewElement extends HTMLElement {
  connectedCallback() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/data/list.json');
    xhr.addEventListener('load', () => this.renderItems(JSON.parse(xhr.responseText)));
    xhr.addEventListener('error', () => this.showNetworkError());
    xhr.send();
  }

  renderItems(items) {
    this.innerHTML = items.reduce((a, item) => a + `
      <a href="/detail/${item.id}">
        <img src="${item.imageUrl}" alt="${item.name}">
        <div>${item.name}</div>
      </a>`, '');
  }

  showNetworkError() {
    this.innerHTML = `
      <p class="error">No network connection</p>`;
  }
}

customElements.define('list-view', ListViewElement);
