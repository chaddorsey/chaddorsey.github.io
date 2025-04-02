// ==========================================================================
//
//  Author:   jsandoe
//
//  Copyright (c) 2024 by The Concord Consortium, Inc. All rights reserved.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
// ==========================================================================

/**
 * Manages the attribute selector UI component
 */

// State management for attribute selector
const attributeSelectorState = {
  categories: {
    health: {
      expanded: false,
      enabled: true,
      attributes: new Set() // Will store selected attributes
    },
    environment: {
      expanded: false,
      enabled: true,
      attributes: new Set()
    },
    education: {
      expanded: false,
      enabled: true,
      attributes: new Set()
    }
  }
};

/**
 * Initialize the attribute selector component
 */
function initializeAttributeSelector() {
  // Add click handlers for expansion indicators
  document.querySelectorAll('.fe-attribute-selector .expansion-indicator').forEach(indicator => {
    indicator.addEventListener('click', handleExpansionClick);
  });

  // Add change handlers for category toggles
  document.querySelectorAll('.fe-attribute-selector input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', handleCategoryToggle);
  });

  // Initialize all categories as collapsed
  document.querySelectorAll('.fe-attribute-selector .category-section').forEach(section => {
    section.classList.remove('expanded');
  });
}

/**
 * Handle click on expansion indicator
 * @param {Event} event - The click event
 */
function handleExpansionClick(event) {
  const indicator = event.target;
  const categorySection = indicator.closest('.category-section');
  const categoryId = categorySection.id.replace('-section', '');
  
  // Toggle expanded state
  const isExpanded = categorySection.classList.toggle('expanded');
  attributeSelectorState.categories[categoryId].expanded = isExpanded;
}

/**
 * Handle category checkbox toggle
 * @param {Event} event - The change event
 */
function handleCategoryToggle(event) {
  const checkbox = event.target;
  const categorySection = checkbox.closest('.category-section');
  const categoryId = categorySection.id.replace('-section', '');
  
  // Update state and UI
  attributeSelectorState.categories[categoryId].enabled = checkbox.checked;
  
  if (checkbox.checked) {
    categorySection.classList.remove('disabled');
    categorySection.querySelector('.attribute-count').innerHTML = 
      `<i>${getSelectedCount(categoryId)} of ${getTotalCount(categoryId)} attributes selected</i>`;
  } else {
    categorySection.classList.add('disabled');
    categorySection.querySelector('.attribute-count').innerHTML = 
      `<i>No attributes included</i>`;
  }
}

/**
 * Get the number of selected attributes for a category
 * @param {string} categoryId - The category identifier
 * @returns {number} The count of selected attributes
 */
function getSelectedCount(categoryId) {
  return attributeSelectorState.categories[categoryId].attributes.size;
}

/**
 * Get the total number of attributes for a category
 * @param {string} categoryId - The category identifier
 * @returns {number} The total count of attributes
 */
function getTotalCount(categoryId) {
  const counts = {
    health: 13,
    environment: 7,
    education: 5
  };
  return counts[categoryId] || 0;
}

// Export the public interface
export {
  initializeAttributeSelector,
  attributeSelectorState
}; 