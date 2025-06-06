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

// Import base URL helper if needed for asset loading
import { getBaseURL } from './app.js';

/**
 * Manages the attribute selector UI component
 */

// Define the attributes for each category
const attributeDefinitions = {
  health: [
    { id: 'life-expectancy', name: 'Average Life Expectancy (years)' },
    { id: 'poor-physical-health', name: 'Days of Poor Physical Health (days/month)' },
    { id: 'poor-mental-health', name: 'Days of Poor Mental Health (days/month)' },
    { id: 'primary-care-rate', name: 'Primary Care Doctor Rate (doctors/100,000)' },
    { id: 'mental-health-providers', name: 'Mental Health Providers (providers/100,000)' },
    { id: 'physically-inactive', name: 'Physically Inactive (%)' },
    { id: 'smokers', name: 'Smokers (%)' },
    { id: 'insufficient-sleep', name: 'Insufficient Sleep (%)' },
    { id: 'drug-overdose-rate', name: 'Drug Overdose Death Rate (deaths/100,000 people)' },
    { id: 'motor-vehicle-death-rate', name: 'Motor Vehicle Death Rate (deaths/100,000 people)' },
    { id: 'firearm-death-rate', name: 'Firearm Death Rate (deaths/100,000 people)' },
    { id: 'teen-birth-rate', name: 'Teen Birth Rate (births/per teens)' },
    { id: 'limited-healthy-foods', name: 'Limited Access to Healthy Foods (%)' }
  ],
  environment: [
    { id: 'air-pollution', name: 'Air Pollution (fine particulate matter in micrograms/cubic meter of air)' },
    { id: 'rural-living', name: 'Rural Living (%)' },
    { id: 'broadband-access', name: 'Broadband Access (%)' },
    { id: 'severe-housing-problems', name: 'Severe Housing Problems (%)' },
    { id: 'homeowners', name: 'Homeowners (%)' },
    { id: 'median-household-income', name: 'Median Household Income ($)' },
    { id: 'children-in-poverty', name: 'Children in Poverty (%)' }
  ],
  education: [
    { id: 'high-school-graduation', name: 'Students Graduating from High School (%)' },
    { id: 'some-college', name: 'Some College (%)' },
    { id: 'proficient-in-english', name: 'Proficient in English (%)' },
    { id: 'youth-not-in-school', name: 'Youth Not in School or Employment (%)' },
    { id: 'juvenile-arrest-rate', name: 'Juvenile Arrest Rate (arrests/1,000 juveniles)' }
  ]
};

// State management for attribute selector
const attributeSelectorState = {
  categories: {
    health: {
      expanded: false,
      enabled: true,
      allSelected: true,
      attributes: new Set() // Will store selected attributes
    },
    environment: {
      expanded: false,
      enabled: true,
      allSelected: true,
      attributes: new Set()
    },
    education: {
      expanded: false,
      enabled: true,
      allSelected: true,
      attributes: new Set()
    }
  }
};

/**
 * Initialize the attribute selector component
 */
function initializeAttributeSelector() {
  console.log('[DEBUG] initializeAttributeSelector called');
  // Initialize all attributes as selected
  initializeAttributeState();
  console.log('[DEBUG] attributeSelectorState after initialize:', JSON.stringify(attributeSelectorState));
  // Generate checkboxes
  generateAttributeCheckboxes();
  // Add dropdown header click handlers
  const headers = document.querySelectorAll('.wx-dropdown-header');
  console.log('[DEBUG] Found', headers.length, 'dropdown headers');
  headers.forEach(header => {
    header.addEventListener('click', handleDropdownHeaderClick);
    console.log('[DEBUG] Attached click handler to header:', header);
  });
  // Initialize selection summaries and counts
  for (const categoryId in attributeDefinitions) {
    updateCategorySelectionSummary(categoryId);
    updateCategorySelectionCount(categoryId);
  }
  // Update summary area
  updateSummaryArea();
}

/**
 * Initialize the attribute state for all categories
 */
function initializeAttributeState() {
  // Select all attributes by default
  for (const categoryId in attributeDefinitions) {
    const attributes = attributeDefinitions[categoryId];
    attributes.forEach(attr => {
      attributeSelectorState.categories[categoryId].attributes.add(attr.id);
    });
    attributeSelectorState.categories[categoryId].allSelected = true;
  }
}

/**
 * Generate attribute checkboxes for all categories (new UI)
 */
function generateAttributeCheckboxes() {
  console.log('[DEBUG] generateAttributeCheckboxes called');
  for (const categoryId in attributeDefinitions) {
    const container = document.getElementById(`${categoryId}-attributes`);
    console.log(`[DEBUG] For category '${categoryId}', found container:`, container);
    const attributes = attributeDefinitions[categoryId];
    // Clear any existing rows
    container.innerHTML = '';
    attributes.forEach(attr => {
      const row = document.createElement('tr');
      // Checkbox cell
      const tdCheckbox = document.createElement('td');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `attr-${attr.id}`;
      checkbox.checked = attributeSelectorState.categories[categoryId].attributes.has(attr.id);
      checkbox.addEventListener('change', (event) => handleAttributeCheckboxChange(event, categoryId, attr.id));
      tdCheckbox.appendChild(checkbox);
      // Label and description cell
      const tdLabel = document.createElement('td');
      const label = document.createElement('label');
      label.htmlFor = `attr-${attr.id}`;
      label.textContent = attr.name;
      // Placeholder for description
      const desc = document.createElement('span');
      desc.className = 'attr-description';
      desc.textContent = ' [Description placeholder]';
      tdLabel.appendChild(label);
      tdLabel.appendChild(desc);
      row.appendChild(tdCheckbox);
      row.appendChild(tdLabel);
      container.appendChild(row);
      console.log(`[DEBUG] Rendered checkbox for '${attr.name}' in category '${categoryId}'`);
    });
  }
}

/**
 * Handle attribute checkbox change
 */
function handleAttributeCheckboxChange(event, categoryId, attributeId) {
  const checked = event.target.checked;
  if (checked) {
    attributeSelectorState.categories[categoryId].attributes.add(attributeId);
  } else {
    attributeSelectorState.categories[categoryId].attributes.delete(attributeId);
  }
  updateCategorySelectionSummary(categoryId);
  updateCategorySelectionCount(categoryId);
  updateSummaryArea();
  notifyAttributeSelectionChanged();
}

/**
 * Update the selection summary for a category
 */
function updateCategorySelectionSummary(categoryId) {
  const userSelection = document.querySelector(`#${categoryId}-section .wx-user-selection`);
  const selected = Array.from(attributeSelectorState.categories[categoryId].attributes);
  const names = selected.map(id => {
    const attr = attributeDefinitions[categoryId].find(a => a.id === id);
    return attr ? attr.name : id;
  });
  userSelection.textContent = names.slice(0, 3).join(', ') + (names.length > 3 ? ', ...' : '');
}

/**
 * Update the selection count for a category
 */
function updateCategorySelectionCount(categoryId) {
  const countSpan = document.querySelector(`#${categoryId}-section .wx-selection-count`);
  const selectedCount = attributeSelectorState.categories[categoryId].attributes.size;
  const totalCount = attributeDefinitions[categoryId].length;
  countSpan.textContent = `${selectedCount} / ${totalCount}`;
}

/**
 * Update the summary area at the bottom
 */
function updateSummaryArea() {
  const msg = document.querySelector('.wx-message-area');
  const getDataButton = document.querySelector('.fe-fetch-button');
  const hasAttributes = hasSelectedAttributes();
  // You may want to check for state selection as well
  if (hasAttributes) {
    msg.textContent = 'Ready to fetch';
    getDataButton.removeAttribute('disabled');
  } else {
    msg.textContent = 'Select at least one attribute';
    getDataButton.setAttribute('disabled', 'disabled');
  }
}

/**
 * Handle dropdown header click (expand/collapse)
 */
function handleDropdownHeaderClick(event) {
  event.stopPropagation();
  console.log('[DEBUG] Dropdown header clicked!', event.target);
  const dropdown = event.target.closest('.wx-dropdown');
  console.log('[DEBUG] Closest .wx-dropdown:', dropdown);
  if (dropdown.classList.contains('wx-up')) {
    dropdown.classList.remove('wx-up');
    dropdown.classList.add('wx-down');
    console.log('[DEBUG] Toggled to wx-down:', dropdown.classList.value);
  } else {
    dropdown.classList.remove('wx-down');
    dropdown.classList.add('wx-up');
    console.log('[DEBUG] Toggled to wx-up:', dropdown.classList.value);
  }
}

/**
 * Notify that attribute selection has changed
 */
function notifyAttributeSelectionChanged() {
  // Create and dispatch a custom event
  const event = new CustomEvent('attribute-selection-changed', {
    bubbles: true,
    detail: { hasSelectedAttributes: hasSelectedAttributes() }
  });
  document.dispatchEvent(event);
}

/**
 * Get all selected attribute names across all categories
 * @returns {string[]} Array of selected attribute names
 */
function getSelectedAttributes() {
  const selectedAttributes = [];
  
  // Iterate through all categories
  for (const categoryId in attributeDefinitions) {
    // Skip disabled categories
    if (!attributeSelectorState.categories[categoryId].enabled) {
      console.log(`Category ${categoryId} is disabled, skipping`);
      continue;
    }
    
    // Get attributes for this category
    const categoryAttributes = getSelectedAttributesForCategory(categoryId);
    console.log(`Category ${categoryId}: selected ${categoryAttributes.length} attributes`);
    selectedAttributes.push(...categoryAttributes);
  }
  
  // Add core attributes that should always be included
  const coreAttributes = [
    'State',
    'FIPS',
    'County',
    'County_Full',
    'boundary'
  ];
  
  // Combine core and selected attributes (avoiding duplicates)
  const finalAttributes = [...new Set([...coreAttributes, ...selectedAttributes])];
  console.log(`Total selected attributes: ${finalAttributes.length} (${selectedAttributes.length} category attributes + ${coreAttributes.length} core attributes)`);
  return finalAttributes;
}

/**
 * Get selected attribute names for a specific category
 * @param {string} categoryId - The category identifier
 * @returns {string[]} Array of selected attribute names for the category
 */
function getSelectedAttributesForCategory(categoryId) {
  // If category is disabled, return empty array
  if (!isCategoryEnabled(categoryId)) {
    return [];
  }
  
  // If "All" is selected for this category, return all attribute names
  if (attributeSelectorState.categories[categoryId].allSelected) {
    return attributeDefinitions[categoryId].map(attr => attr.name);
  }
  
  // Otherwise, map the selected IDs to names
  const selectedAttributeIds = Array.from(attributeSelectorState.categories[categoryId].attributes);
  const attributes = attributeDefinitions[categoryId];
  
  console.log(`Category ${categoryId}: has ${selectedAttributeIds.length} IDs selected out of ${attributes.length} total`);
  
  // Map IDs to actual attribute names
  const result = selectedAttributeIds.map(id => {
    const attribute = attributes.find(attr => attr.id === id);
    if (!attribute) {
      console.warn(`Warning: No attribute found with ID "${id}" in category "${categoryId}"`);
      return null;
    }
    return attribute.name;
  }).filter(name => name !== null);
  
  console.log(`Category ${categoryId}: mapped ${result.length} names from ${selectedAttributeIds.length} IDs`);
  return result;
}

/**
 * Check if a category is enabled
 * @param {string} categoryId - The category identifier
 * @returns {boolean} True if the category is enabled
 */
function isCategoryEnabled(categoryId) {
  return attributeSelectorState.categories[categoryId]?.enabled || false;
}

/**
 * Check if there are any selected attributes across all categories
 * @returns {boolean} True if at least one attribute is selected
 */
function hasSelectedAttributes() {
  for (const categoryId in attributeSelectorState.categories) {
    if (isCategoryEnabled(categoryId) && attributeSelectorState.categories[categoryId].attributes.size > 0) {
      return true;
    }
  }
  return false;
}

// Export the public interface
export {
  initializeAttributeSelector,
  attributeSelectorState,
  getSelectedAttributes,
  getSelectedAttributesForCategory,
  isCategoryEnabled,
  hasSelectedAttributes
}; 