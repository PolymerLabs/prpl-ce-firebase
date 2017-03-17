/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

class MyAppElement extends HTMLElement {
  constructor() {
    super();
    this._loadedElements = {};
  }

  connectedCallback() {
    this.addEventListener('click', this._click);
    window.addEventListener('popstate', this._updateVisiblePage.bind(this));

    this._listView = this.querySelector('list-view');
    this._detailView = this.querySelector('detail-view');

    this._updateVisiblePage();
  }

  /**
   * Display the appropriate view based on the URL.
   */
  _updateVisiblePage() {
    if (window.location.pathname.match('^/detail')) {
      this._loadElement('detail-view');
      document.body.classList.add('detail-view-active');
      this._detailView.setAttribute('path', window.location.pathname);
    } else {
      this._loadElement('list-view');
      document.body.classList.remove('detail-view-active');
    }
  }

  /**
   * Loads an element definition if it has not been loaded yet.
   */
  _loadElement(element) {
    if (this._loadedElements[element]) {
      return;
    }

    const script = document.createElement('script');
    script.src = `/elements/${element}.js`;
    document.head.appendChild(script);
    this._loadedElements[element] = script;
  }

  /**
   * A simple click handler for unmodified left-clicks on anchor tags..
   */
  _click(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey) {
      return;
    }

    let element = event.target;
    while (element !== this) {
    // for (let i = 0; i < event.path.length; i++) {
      // const element = event.path[i];
      if (element.tagName === 'A') {
        event.preventDefault();
        window.history.pushState(null, '', element.href);
        this._updateVisiblePage();
        return;
      }
      element = element.parentNode;
    }
  }
}

customElements.define('my-app', MyAppElement);
