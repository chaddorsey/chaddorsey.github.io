import { initializeApp } from './app.js';
import { initializeAttributeSelector } from './attributeSelector.js';

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    initializeAttributeSelector();
}); 