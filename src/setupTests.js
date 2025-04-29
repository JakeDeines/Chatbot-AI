// src/setupTests.js
import '@testing-library/jest-dom';

beforeAll(() => {
  // Mock scrollIntoView
  window.HTMLElement.prototype.scrollIntoView = function() {};

  // Mock IntersectionObserver
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    disconnect() {}
  };
});
