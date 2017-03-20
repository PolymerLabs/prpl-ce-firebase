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
  connectedCallback() {
    this.addEventListener('click', this.clickHandler);
    window.addEventListener('popstate', this.updateVisiblePage.bind(this));

    this.updateVisiblePage();
  }

  /**
   * Display the appropriate view based on the URL.
   */
  updateVisiblePage() {
    if (window.location.pathname.match('^/detail')) {
      this.loadElement('detail-view');
      document.body.classList.add('detail-view-active');
      this.querySelector('detail-view').setAttribute('path', window.location.pathname);
    } else {
      this.loadElement('list-view');
      document.body.classList.remove('detail-view-active');
    }
  }

  /**
   * A simple click handler for unmodified left-clicks on anchor tags.
   */
  clickHandler(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey) {
      return;
    }

    let element = event.target;
    while (element !== this) {
      if (element.tagName === 'A') {
        event.preventDefault();
        window.history.pushState(null, '', element.href);
        this.updateVisiblePage();
        return;
      }
      element = element.parentNode;
    }
  }

  constructor() {
    super();
    this.loadedElements = {};
  }

  /**
   * Loads an element definition if it has not been loaded yet.
   */
  loadElement(element) {
    if (this.loadedElements[element]) {
      return;
    }

    const script = document.createElement('script');
    script.src = `/elements/${element}.js`;
    document.head.appendChild(script);
    this.loadedElements[element] = script;
  }
}

customElements.define('my-app', MyAppElement);
