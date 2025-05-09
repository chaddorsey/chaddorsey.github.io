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
  // Initialize all attributes as selected
  initializeAttributeState();
  
  // Generate attribute buttons
  generateAttributeButtons();
  
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
 * Generate attribute buttons for all categories
 */
function generateAttributeButtons() {
  for (const categoryId in attributeDefinitions) {
    const container = document.getElementById(`${categoryId}-attributes`);
    const attributes = attributeDefinitions[categoryId];
    
    // Clear any existing buttons
    container.innerHTML = '';
    
    // Create "All" button first
    const allButton = document.createElement('button');
    allButton.classList.add('attribute-button', 'all-button');
    allButton.setAttribute('data-attribute-id', 'all');
    allButton.setAttribute('title', 'Select all attributes');
    
    // Check if "All" is selected in state
    if (attributeSelectorState.categories[categoryId].allSelected) {
      allButton.classList.add('selected');
    }
    
    allButton.textContent = 'All';
    
    // Add click handler
    allButton.addEventListener('click', handleAllButtonClick);
    
    container.appendChild(allButton);
    
    // Generate button for each attribute
    attributes.forEach(attr => {
      const button = document.createElement('button');
      button.classList.add('attribute-button');
      button.setAttribute('data-attribute-id', attr.id);
      button.setAttribute('title', attr.name);
      
      // Check if attribute is selected in state
      if (attributeSelectorState.categories[categoryId].attributes.has(attr.id)) {
        button.classList.add('selected');
      }
      
      button.textContent = attr.name;
      
      // Add click handler
      button.addEventListener('click', handleAttributeButtonClick);
      
      container.appendChild(button);
    });
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
 * Handle click on the "All" button
 * @param {Event} event - The click event
 */
function handleAllButtonClick(event) {
  const button = event.target;
  const categorySection = button.closest('.category-section');
  const categoryId = categorySection.id.replace('-section', '');
  const attributes = attributeDefinitions[categoryId];
  
  // Toggle "All" selection state
  const isAllCurrentlySelected = button.classList.contains('selected');
  
  if (isAllCurrentlySelected) {
    // If All is already selected, deselect it and all attribute buttons
    button.classList.remove('selected');
    attributeSelectorState.categories[categoryId].allSelected = false;
    
    // Clear all attribute selections
    attributeSelectorState.categories[categoryId].attributes.clear();
    
    // Update attribute buttons
    const attributeButtons = categorySection.querySelectorAll('.attribute-button:not(.all-button)');
    attributeButtons.forEach(attrButton => {
      attrButton.classList.remove('selected');
    });
  } else {
    // If All is not selected, select it and all attribute buttons
    button.classList.add('selected');
    attributeSelectorState.categories[categoryId].allSelected = true;
    
    // Select all attributes
    const attributeButtons = categorySection.querySelectorAll('.attribute-button:not(.all-button)');
    attributeButtons.forEach((attrButton, index) => {
      const attributeId = attributes[index].id;
      attrButton.classList.add('selected');
      attributeSelectorState.categories[categoryId].attributes.add(attributeId);
    });
  }
  
  // Update attribute count display
  updateAttributeCount(categoryId);
  
  // Notify attribute selection changed
  notifyAttributeSelectionChanged();
}

/**
 * Handle click on attribute button
 * @param {Event} event - The click event
 */
function handleAttributeButtonClick(event) {
  const button = event.target;
  const attributeId = button.getAttribute('data-attribute-id');
  const categorySection = button.closest('.category-section');
  const categoryId = categorySection.id.replace('-section', '');
  const allButton = categorySection.querySelector('.attribute-button.all-button');
  const attributeButtons = categorySection.querySelectorAll('.attribute-button:not(.all-button)');
  
  // Check current state of the button and the All button
  const isCurrentlySelected = button.classList.contains('selected');
  const isAllCurrentlySelected = allButton.classList.contains('selected');
  
  if (isAllCurrentlySelected) {
    // If All is currently selected:
    // 1. Deselect All button
    // 2. Deselect all attribute buttons
    // 3. Select only the clicked button
    allButton.classList.remove('selected');
    attributeSelectorState.categories[categoryId].allSelected = false;
    
    // Clear all existing selections
    attributeSelectorState.categories[categoryId].attributes.clear();
    
    // Deselect all attribute buttons
    attributeButtons.forEach(btn => {
      btn.classList.remove('selected');
    });
    
    // Select only the clicked button
    button.classList.add('selected');
    attributeSelectorState.categories[categoryId].attributes.add(attributeId);
  } else if (isCurrentlySelected) {
    // If the button is already selected, just deselect it
    button.classList.remove('selected');
    attributeSelectorState.categories[categoryId].attributes.delete(attributeId);
  } else {
    // If the button is not selected and All is not selected, 
    // simply select this button (adding to existing selections)
    button.classList.add('selected');
    attributeSelectorState.categories[categoryId].attributes.add(attributeId);
  }
  
  // Check if all attributes are now selected
  const totalAttributes = attributeDefinitions[categoryId].length;
  const selectedCount = attributeSelectorState.categories[categoryId].attributes.size;
  
  if (selectedCount === totalAttributes) {
    // All attributes are selected, also select the "All" button
    allButton.classList.add('selected');
    attributeSelectorState.categories[categoryId].allSelected = true;
  } else if (selectedCount === 0) {
    // No attributes are selected, make sure the count shows 0
    updateAttributeCount(categoryId);
  }
  
  // Update attribute count display
  updateAttributeCount(categoryId);
  
  // Notify attribute selection changed
  notifyAttributeSelectionChanged();
}

/**
 * Update the attribute count display for a category
 * @param {string} categoryId - The category identifier
 */
function updateAttributeCount(categoryId) {
  const categorySection = document.getElementById(`${categoryId}-section`);
  const countElement = categorySection.querySelector('.attribute-count');
  
  if (attributeSelectorState.categories[categoryId].enabled) {
    countElement.innerHTML = 
      `<i>${getSelectedCount(categoryId)} of ${getTotalCount(categoryId)} attributes selected</i>`;
  } else {
    countElement.innerHTML = `<i>No attributes included</i>`;
  }
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
    updateAttributeCount(categoryId);
  } else {
    categorySection.classList.add('disabled');
    categorySection.querySelector('.attribute-count').innerHTML = 
      `<i>No attributes included</i>`;
  }
  
  // Notify attribute selection changed
  notifyAttributeSelectionChanged();
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
  return attributeDefinitions[categoryId]?.length || 0;
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