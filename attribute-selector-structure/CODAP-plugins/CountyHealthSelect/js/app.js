// ==========================================================================
//
//  Author:   jsandoe
//
//  Copyright (c) 2021 by The Concord Consortium, Inc. All rights reserved.
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
// import {calendar} from './calendar.js';
/*global Papa:true*/
import {COUNTY_POPULATION_DATA, STATE_POPULATION_DATA} from './data.js';
import * as ui from './ui.js'
import { getSelectedAttributes, hasSelectedAttributes } from './attributeSelector.js';

const CURRENT_DATA_YEAR = '2025'; // Define current data year
const APP_NAME = `County Health Datasets (${CURRENT_DATA_YEAR})`;

// Helper function to get base URL for assets
function getBaseURL() {
  // Get the current script's path
  const scripts = document.getElementsByTagName('script');
  const scriptPath = scripts[scripts.length - 1].src;
  
  // Extract base path from script URL (removes the js/script.js part)
  const basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/js/'));
  
  console.log('Base path for assets:', basePath);
  return basePath;
}

// noinspection SqlResolve
const DATASETS = [
  {
    id: 'CountyHealthByState',
    name: `County Health Indicators 2023, By State`,
    documentation: 'https://countyhealth.org',
    endpoint: `assets/data/2023/csv`,
    selectedAttributeNames: [
      'State',
      'FIPS',
      'County',
      'County_Full',
      'boundary',
      'Average Life Expectancy (years)',
      'Days of Poor Physical Health (days/month)',
      'Days of Poor Mental Health (days/month)',
      'Students Graduating from High School (%)',
      'Some College (%)',
      'Children in Poverty (%)',
      'Limited Access to Healthy Foods (%)',
      'Air Pollution (fine particulate matter in micrograms/cubic meter of air)',
      'Physically Inactive (%)',
      'Smokers (%)',
      'Insufficient Sleep (%)',
      'Primary Care Doctor Rate (doctors/100,000)',
      'Mental Health Providers (providers/ 100,000)',
      'Median Household Income ($)',
      'Income Level',
      'Homeowners (%)',
      'Rural Living (%)',
      'Mostly Rural',
      'Non-Hispanic Black (%)',
      'Asian (%)',
      'Hispanic (%)',
      'Non-Hispanic White (%)',
      'Majority Minority',
      'Population',
      'Motor Vehicle Death Rate (deaths/100,000 people)',
      'Drug Overdose Death Rate (deaths/100,000 people)',
      'Broadband Access (%)',
      'Teen Birth Rate (births/per teens)',
      'Firearm Death Rate (deaths/ 100,000 people)',
      'Juvenile Arrest Rate (arrests/ 1,000 juveniles)',
      'Severe Housing Problems (%)',
      'Proficient in English (%)',
      'Youth Not in School or Employment (%)',
      'Income Level'
  ],  
  overriddenAttributes: [
    {
      name: 'State',
    },
    {
      name: 'County',
    },
    {
      name: 'FIPS',
    },
    {
      name: 'County_Full',
      formula: 'concat(County, ", ", State)',
    },
    {
      name: 'County',
    },
    {
      name: 'boundary',
      formula: 'lookupBoundary(US_county_boundaries,County_Full)',
    },
    {
      name: 'Average Life Expectancy (years)',
      description: 'Average number of years from birth a person is expected to live',
    },
    {
      name: 'Days of Poor Physical Health (days/month)',
      description: 'Adults were asked the following question: "Thinking about your physical health&comma; which includes physical illness and injury&comma; for how many days during the past 30 days was your physical health not good?" The value represents the average number of days reported.',
    },
    {
      name: 'Days of Poor Mental Health (days/month)',
      description: 'Adults were asked the following question: "Thinking about your mental health&comma; which includes stress&comma; depression&comma; and problems with emotions&comma; for how many days during the past 30 days was your mental health not good?" The value represents the average number of days reported.',
    },
    {
      name: 'Students Graduating from High School (%)',
      description: 'Percentage of students that graduate from high school in 4 years.',
    },
    {
      name: 'Some College (%)',
      description: 'Percentage of people ages 25-44 with at least some education beyond high school.',
    },
    {
      name: 'Children in Poverty (%)',
      description: 'Percentage of people under age 18 living in a household whose income is below the poverty level.',
    },
    {
      name: 'Limited Access to Healthy Foods (%)',
      description: 'Percentage of the population who are low-income and have no local grocery stores.',
    },
    {
      name: 'Physically Inactive (%)',
      description: 'Percentage of adults that responded "no" to the question: "During the past month&comma; other than your regular job&comma; did you participate in any physical activities or exercises such as running&comma; calisthenics&comma; golf&comma; gardening&comma; or walking for exercise?"',
    },
    {
      name: 'Insufficient Sleep (%)',
      description: 'Percentage of adults who report that they sleep less than 7 hours per night on average.',
    },
    {
      name: 'Primary Care Doctor Rate (doctors/100,000)',
      description: 'Number of primary care physicians per 100&comma;000 people.',
    },
    {
      name: 'Mental Health Providers (providers/ 100,000)',
      description: 'Number of mental health care providers per 100&comma;000 people.',
    },
    {
      name: 'Median Household Income ($)',
      description: 'Median household income for adults.',
    },
    {
      name: 'Homeowners (%)',
      description: 'Percentage of housing units that are owned by the occupants.',
    },
    {
      name: 'Rural Living (%)',
      description: 'Percentage of population living in a rural area. A town with less than 2&comma;500 residents is considered rural.',
    },
    {
      name: 'Motor Vehicle Death Rate (deaths/100,000 people)',
      description: 'Number of deaths caused by motor vehicle crashes per 100&comma;000 people.',
    },
    {
      name: 'Drug Overdose Death Rate (deaths/100,000 people)',
      description: 'Number of drug poisoning deaths per 100&comma;000 people.',
    },
    {
      name: 'Broadband Access (%)',
      description: 'Percentage of households with broadband internet connection.',
    },
    {
      name: 'Teen Birth Rate (births/per teens)',
      description: 'Births per 1,000 females ages 15-19.',
    },
    {
      name: 'Firearm Death Rate (deaths/ 100,000 people)',
      description: 'Number of deaths due to firearms per 100&comma;000 people.',
    },
    {
      name: 'Juvenile Arrest Rate (arrests/ 1,000 juveniles)',
      description: 'Delinquency cases per 1&comma;000 juveniles.',
    },
    {
      name: 'Severe Housing Problems (%)',
      description: 'Percentage of households with at least one of these problems: overcrowding&comma; high housing costs&comma; lack of kitchen facilities&comma; or lack of plumbing facilities.',
    },
    {
      name: 'Proficient in English (%)',
      description: 'Percentage of the population that is proficient in the English language.',
    },
    {
      name: 'Air Pollution (fine particulate matter in micrograms/cubic meter of air)',
      description: 'The average density of fine particulate matter (diameter less than 2.5 micrometers) in micrograms per cubic meter. The higher the number the worse the pollution.',
    },
    {
      name: 'Smokers (%)',
      description: 'Percentage of the adults who said they have smoked at least 100 cigarettes in their lifetime AND that they currently smoke every day or most days. The survey does not ask specifically about e-cigarettes.',
    },
    {
      name: 'Youth Not in School or Employment (%)',
      description: 'Percentage of teens and young adults ages 16-19 who are neither working nor in school.',
    },
  ],
    uiComponents: [
      {
        type: 'instruction',
        text: `Select a state below to retrieve data from the ${CURRENT_DATA_YEAR} County Health` +
            " dataset. You can add additional states or more data later."
      },
      {
        type: 'select',
        name: 'State',
        label: 'Select State',
        optionList: [
          'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL',
          'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA',
          'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE',
          'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI',
          'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV',
          'WY'
        ]
      }
    ],
    makeURL: function () {
      try {
        let stateCode = document.querySelector('#state-select').value;
        const basePath = getBaseURL();
        const url = `${basePath}/assets/data/2023/csv/2023-CountyHealth-${stateCode}.csv`;
        return url;
      } catch (error) {
        console.error('Error creating URL:', error);
        return null;
      }
    },
    parentAttributes: ['State', 'population'],
    parentCollectionName: 'States',
    childCollectionName: 'CountyHealth',
    preprocess: [
      {type: 'mergePopulation', dataKey: 'State', mergeKey: 'USPS Code'},
    ],
    preclear: {key: 'State', selector: '#state-select'}
  }
]

const DEFAULT_DISPLAYED_DATASETS = [
  'CountyHealthByState',
];
const DEFAULT_DATASET = 'CountyHealthByState';
const CHILD_COLLECTION_NAME = 'cases';
const PARENT_COLLECTION_NAME = 'groups';

let displayedDatasets = DEFAULT_DISPLAYED_DATASETS;
let isInFetch = false;

/**
 * Data transform to create an additional property, being the year extracted
 * from a date string.
 * @param data [{object}]
 * @param dateAttr
 * @param yearAttr
 * @return {*}
 */
function computeYear(data, dateAttr, yearAttr) {
  data.forEach(obj => {
    let date = new Date(obj[dateAttr]);
    if (date) {
      obj[yearAttr] = date.getFullYear();
    }
  });
  return data;
}

/**
 * A data transform to merge state population stats with a dataset.
 * @param data {[object]} attribute keyed data
 * @param referenceKeyAttr {string} the name of the attribute in the merged into dataset that
 *                         is a foreign key into the population dataset.
 * @param correlatedKey    {string} the corresponding key in the population dataset
 * @return {[object]} the data object modified
 */
function mergePopulation(data, referenceKeyAttr, correlatedKey) {
  let cached = null;
  console.log('Data:')
  console.log(data)
  data.forEach(function(dataItem) {
    let key = dataItem[referenceKeyAttr];
    //if (!key) {return;}

    if (!key){
      console.log('no key');
      return;
    }
    if (!cached || (cached[correlatedKey] !== key)) {
      cached = STATE_POPULATION_DATA.find(function (st) {
        return st[correlatedKey] === key.toLocaleUpperCase();
      })
    }
    if (cached) {
      dataItem.population = cached.Population;
    }
  });
  return data;
}

/**
 * A data transform to merge state and county population stats with a dataset.
 * @param data {[object]} attribute keyed dataset
 * @param referenceState {string} the name of the attribute in the dataset that identifies the state.
 * @param referenceCty {string} the name of the attribute in the dataset that identifies the county.
 * @param correlatedState {string} the attribute in the population dataset that matches the state attribute in the passed in dataset
 * @param correlatedCty {string} the attribute in the population dataset that matches the county attribute in the passed in dataset
 * @return {[object]} the data object modified
 */
function mergeCountyPopulation(data, referenceState, referenceCty, correlatedState, correlatedCty) {
  let cachedPopRecord = null;
  data.forEach(function(dataItem) {
    let stateKey = dataItem[referenceState];
    let countyKey = dataItem[referenceCty];
    if (!cachedPopRecord || (cachedPopRecord[correlatedState] !== stateKey) || (cachedPopRecord[correlatedCty] !== countyKey)) {
      cachedPopRecord = COUNTY_POPULATION_DATA.find(function (item) {
        return item[correlatedState] === stateKey && item[correlatedCty] === countyKey;
      })
    }
    if (cachedPopRecord) {
      dataItem.population = cachedPopRecord.POPESTIMATE2019;
    }
  });
  return data;
}

/**
 * A data transform to sort a dataset on a date attribute.
 * @param data {[object]}
 * @param attr {string}
 * @return {[object]} 'data' sorted
 */
function sortOnDateAttr(data, attr) {
  return data.sort(function (a, b) {
    return (new Date(a[attr])) - (new Date(b[attr]));
  })
}

/**
 * A data transform: copy's value of old property to new, then deletes old.
 * @param data
 * @param oldKey
 * @param newKey
 * @return {*}
 */
function renameAttribute(data, oldKey, newKey) {
  data.forEach(function (item) {
    item[newKey] = item[oldKey];
    delete item[oldKey];
  });
  return data;
}

/**
 * A utility to convert a string to capitalize the first letter of each word
 * and lowercase each succeeding letter. A word is considered to be a string
 * separated from other words by space characters.
 * @param str {string}
 * @return {string}
 */
function toInitialCaps(str) {
  return str.split(/ +/)
      .map(function (w) {
        return w.toLowerCase().replace(/./, w[0].toUpperCase());
      }).join(' ');
}

/**
 * CODAP API Helper: deletes values in dataset matching attribute and value
 */
function preclearDataGroup(attributeName, value, collectionSpec, datasetName) {
  // find collection for attribute
  let col = collectionSpec.find(collection =>
      collection.attrs.find(attr => attr.name === attributeName));
  let resourceName = `dataContext[${datasetName}].itemSearch[${attributeName}==${value}]`;
  let req = {
    action: 'delete',
    resource: resourceName,
  }
  return codapInterface.sendRequest(req);
}

/**
 * CODAP API Helper: Creates a dataset
 *
 * @param datasetName {string}
 * @param collectionList {[object]}
 * @param url {string}
 * @return {{collections: [{name: string, attrs: *}], name, title}}
 */
function specifyDataset(datasetName, collectionList, url) {
  return {
    name: datasetName,
    title: datasetName,
    collections: collectionList,
    metadata: {
      source: url,
      importDate: new Date().toLocaleString()
    }
  };
}

/**
 * Guarantees that the CODAP dataset has all the attributes required by the
 * collectionList.
 * @param existingDatasetSpec an iExistingDataSetSpec
 * @param collectionList an array of iCollectionSpecs
 */
function guaranteeAttributes(existingDatasetSpec, collectionList) {
  let allAttributesArePresent = true;
  console.log('Checking attributes in existing dataset vs requested attrs');
  
  // Create a map for easy lookup of existing collections
  const existingCollections = {};
  existingDatasetSpec.collections.forEach(coll => {
    existingCollections[coll.name] = coll;
  });
  
  // Build a list of all attribute creation requests
  const attributeRequests = [];
  
  collectionList.forEach(function (collection) {
    const existingCollection = existingCollections[collection.name];
    
    // Create collection if it does not exist
    if (!existingCollection) {
      allAttributesArePresent = false;
      attributeRequests.push({
        action: 'create',
        resource: `dataContext[${existingDatasetSpec.name}].collection`,
        values: {
          name: collection.name,
          parent: collection.parent
        }
      });
      
      // Add all attributes for this new collection
      collection.attrs.forEach(function(attr) {
        attributeRequests.push({
          action: 'create',
          resource: `dataContext[${existingDatasetSpec.name}].collection[${collection.name}].attribute`,
          values: attr
        });
      });
    } 
    // Collection exists, check for missing attributes
    else {
      // Create a map for easy lookup of existing attributes
      const existingAttrs = {};
      existingCollection.attrs.forEach(attr => {
        existingAttrs[attr.name] = attr;
      });
      
      // Check for each required attribute
      collection.attrs.forEach(function (attr) {
        if (!existingAttrs[attr.name]) {
          allAttributesArePresent = false;
          attributeRequests.push({
            action: 'create',
            resource: `dataContext[${existingDatasetSpec.name}].collection[${collection.name}].attribute`,
            values: attr
          });
        }
      });
    }
  });
  
  // If all attributes are already present, nothing to do
  if (allAttributesArePresent) {
    console.log('All required attributes are already present in dataset');
    return Promise.resolve();
  }
  
  // Send attribute creation requests in sequence
  console.log(`Creating ${attributeRequests.length} missing attributes`);
  return attributeRequests.reduce(function (chain, request) {
    return chain.then(function () {
      return codapInterface.sendRequest(request);
    });
  }, Promise.resolve());
}

/**
 * CODAP API Helper: Creates a dataset only if it does not exist.
 * @param datasetName {string}
 * @param collectionList {[object]}
 * @param url {string}
 * @return Promise
 */
function guaranteeDataset(datasetName, collectionList, url) {
  // Store a hash of the current collection to detect changes
  const collectionHash = JSON.stringify(collectionList);
  const shouldForceRecreate = false; // Set to true to force recreation when testing
  
  return codapInterface.sendRequest({action: 'get', resource: `dataContext[${datasetName}]`})
      .then(function (result) {
        if (result && result.success) {
          // Dataset exists, check if we need to delete and recreate it
          // because the attribute set has changed
          if (shouldForceRecreate) {
            console.log('Forcing dataset recreation');
            return codapInterface.sendRequest({
              action: 'delete',
              resource: `dataContext[${datasetName}]`
            }).then(function() {
              return codapInterface.sendRequest({
                action: 'create',
                resource: 'dataContext',
                values: specifyDataset(datasetName, collectionList, url)
              });
            });
          } else {
            // Keep the existing dataset but update attributes if needed
            return guaranteeAttributes(result.values, collectionList);
          }
        } else {
          // Dataset doesn't exist, create it
          return codapInterface.sendRequest({
            action: 'create',
            resource: 'dataContext',
            values: specifyDataset(datasetName, collectionList, url)
          });
        }
      });
}

/**
 * CODAP API Helper: Returns whether there is a graph in CODAP displaying
 * the named dataset.
 * @param datasetName
 */
async function getGraphForDataset(datasetName) {
  let componentListResult = await codapInterface.sendRequest({
    action: 'get',
    resource: 'componentList'
  });
  let graphSpec = null;
  let componentList = componentListResult && componentListResult.success && componentListResult.values;
  if (componentList) {
    let graphIds = componentList.filter((c) => c.type === 'graph');
    if (graphIds && graphIds.length) {
      let graphRequests = graphIds.map((graphId) => {
        return {
          action: 'get', resource: `component[${graphId.id}]`
        };
      });
      let graphSpecResults = await codapInterface.sendRequest(graphRequests);
      let graphSpecResult = graphSpecResults.find((result) => {
        return result.success && result.values.dataContext === datasetName
      });
      if (graphSpecResult) {
        graphSpec = graphSpecResult.values;
      }
    }
  }
  return graphSpec;
}

/**
 * CODAP API Helper: Create graph, initializes x-axis
 * @param datasetName
 * @param tsAttributeName
 * @return {Promise<*>}
 */
async function createTimeSeriesGraph(datasetName, tsAttributeName) {
  let foundGraph = await getGraphForDataset(datasetName);
  if (!foundGraph) {
    let result = await codapInterface.sendRequest({
      action: 'create', resource: `component`, values: {
        type: "graph", dataContext: datasetName, xAttributeName: tsAttributeName
      }
    });
    if (result.success) {
      let id = result.values.id;
      return await codapInterface.sendRequest({
        "action": "notify",
        "resource": `component[${id}]`,
        "values": {
          "request": "autoScale"
        }
      });
    }
  }
}

/**
 * CODAP API Helper: Create a Map component
 */
function createMap() {
  codapInterface.sendRequest({
    action: 'get',
    resource: 'componentList'
  }).then(function (result) {
    if (result && result.values && !result.values.find(function (v) {return v.type === 'map';})) {
      return codapInterface.sendRequest({
        action: 'create', resource: `component`, values: {
          type: "map"
        }
      });
    } else {
      return Promise.resolve(result);
    }
  }).then(function (result) {
    if (result.success) {
      let componentID = result.values.id;
      if (componentID != null) {
        return codapInterface.sendRequest({
          action: 'notify',
          resource: `component[${componentID}]`,
          values: {request: 'autoScale'}
        })
      }
    }
  });
}

/**
 * CODAP API Helper: Create an (optionally) autoscaled Case Table Component in CODAP
 * @param datasetName {string}
 * @param dimensions {{x: number, y: number}}
 * @param autoscale {boolean} whether to autoscale the case table
 * @return {Promise<object>}
 */
function createCaseTable(datasetName, dimensions, autoscale) {
  return codapInterface.sendRequest({
    action: 'create',
    resource: `component`,
    values: {
      type: "caseTable",
      dataContext: datasetName,
      dimensions: dimensions
    }
  })
  .then(function (result) {
    if (result.success) {
      if (autoscale) {
        let componentID = result.values.id;
        if (componentID) {
          return codapInterface.sendRequest({
            action: 'notify',
            resource: `component[${componentID}]`,
            values: {request: 'autoScale'}
          })
        }
      }
      else {
        return Promise.resolve(result);
      }
    }
  });
}

/**
 * CODAP API Helper: Send an array of data items to CODAP
 * @param datasetName {string}
 * @param data {[object]}
 * @return {Promise}
 */
function sendItemsToCODAP(datasetName, data) {
  return codapInterface.sendRequest({
    action: 'create',
    resource: `dataContext[${datasetName}].item`,
    values: data
  });
}

/**
 * UI Handler: determine checked dataset option
 */
function selectDatasetHandler(/*ev*/) {
  // this is the selected event
  document.querySelectorAll('.datasource').forEach((el) => el.classList.remove('selected-source'));
  this.parentElement.parentElement.classList.add('selected-source');
}

/**
 * UI Handler: Manages whether buttons are active
 * @param isBusy
 */
function setBusy(isBusy) {
  ui.setBusyIndicator(isBusy);
  isInFetch = isBusy;
}

/**
 * UI Handler: Responds to a 'fetch' button press. Normally, of course, this would initiate
 * a fetch of the selected data from the selected data source and its transfer to
 * CODAP.
 */
function fetchHandler(/*ev*/) {
  if (!isInFetch)
  setBusy(true);
  fetchDataAndProcess().then(
      function (result) {
        if (result && !result.success) {
          ui.setTransferStatus('failure',
              `Import to CODAP failed. ${result.values.error}`)
        } else if (result && result.success) {
          ui.setTransferStatus('success', 'Ready')
        }
        setBusy(false)
      },
      function (err) {
        ui.setTransferStatus('failure', err)
        setBusy(false)
      }
  );
}

/**
 * UI Handler: When plugin is clicked on, cause it to become the selected component in CODAP.
 */
let myCODAPId;
async function selectHandler() {
  console.log('select!');
  if (myCODAPId == null) {
    let r1 = await codapInterface.sendRequest({action: 'get', resource: 'interactiveFrame'});
    if (r1.success) {
      myCODAPId = r1.values.id;
    }
  }
  if (myCODAPId != null) {
    return await selectComponent(myCODAPId);
  }
}

/**
 * CODAP API Helper: Deletes all cases from the named dataset.
 * @param datasetName {string}
 * @return {Promise<*|{success: boolean}>}
 */
async function clearDataByName(datasetName) {
  console.log('Clearing data for dataset:', datasetName);
  let result = await codapInterface.sendRequest({
    action: 'get', resource: `dataContext[${datasetName}]`
  });

  if (result.success) {
    let dc = result.values;
    let lastCollection = dc.collections[dc.collections.length-1];
    return await codapInterface.sendRequest({
      action: 'delete',
      resource: `dataContext[${datasetName}].collection[${lastCollection.name}].allCases`
    });
  } else {
    return Promise.resolve({success: true});
  }
}

/**
 * UI Handler: clear data button
 * @return {Promise<never>}
 */
async function clearDataHandler() {
  let currDatasetSpec = getCurrentDatasetSpec();
  if (!currDatasetSpec) {
    ui.setTransferStatus('inactive', 'Pick a source')
    return Promise.reject('No source selected');
  }
  clearData(currDatasetSpec.name);
}

/**
 * CODAP API Helper: Select (bring forward) a component
 * @param componentID
 * @return {Promise<*>}
 */
async function selectComponent(componentID) {
  return await codapInterface.sendRequest({
    action: 'notify',
    resource: `component[${componentID}]`,
    values: {request: 'select'
    }
  });
}

/**
 * Update the fetch button state based on attribute selections
 */
function updateFetchButtonState() {
  const hasAttributes = hasSelectedAttributes();
  const stateSelect = document.querySelector('#state-select');
  const hasState = stateSelect && stateSelect.value;
  const getDataButton = document.querySelector('.fe-fetch-button');

  if (!getDataButton) {
    console.error('Get Data button not found');
    return;
  }

  if (hasAttributes && hasState) {
    getDataButton.removeAttribute('disabled');
    getDataButton.title = 'Get data and send to CODAP';
    getDataButton.style.opacity = '1';
    getDataButton.style.cursor = 'pointer';
  } else {
    getDataButton.setAttribute('disabled', 'disabled');
    getDataButton.title = hasState ? 'Select at least one attribute first' : 'Select a state first';
    getDataButton.style.opacity = '0.5';
    getDataButton.style.cursor = 'not-allowed';
  }
}

/**
 * Initializes the web application
 *   * Connects with CODAP
 *   * Creates UI
 */
function initializeApp() {
  // Set up the CODAP connection
  return codapInterface.init({
    name: APP_NAME,
    title: APP_NAME,
    version: "0.1",
    dimensions: {
      width: 400,
      height: 600
    },
    preventDataContextReorg: false
  }).then(createUI)
  .then(() => {
    // Add resize handler that maintains minimum dimensions
    window.addEventListener('resize', function() {
      // Get current dimensions
      const width = Math.max(window.innerWidth, 400);
      const height = Math.max(window.innerHeight, 600);
      
      // Update the iframe dimensions when window size changes
      codapInterface.sendRequest({
        action: 'update',
        resource: 'interactiveFrame',
        values: {
          dimensions: {
            width: width,
            height: height
          }
        }
      });
    });
    
    // Ensure we have sufficient initial height
    codapInterface.sendRequest({
      action: 'update',
      resource: 'interactiveFrame',
      values: {
        dimensions: {
          width: Math.max(window.innerWidth, 400),
          height: Math.max(window.innerHeight, 600)
        }
      }
    });
  });
  
  // Listen for attribute selection changes
  document.addEventListener('attribute-selection-changed', function(event) {
    console.log('Attribute selection changed event received');
    updateFetchButtonState();
  });
}

/**
 * Creates the UI
 */
function createUI() {
  console.log('Creating UI');
  
  // Set up event listener for state selection
  const stateSelect = document.querySelector('#state-select');
  if (stateSelect) {
    stateSelect.addEventListener('change', function() {
      console.log('State selection changed to:', this.value);
      updateFetchButtonState();
    });
  } else {
    console.error('State select element not found');
  }

  // Set up event listeners for get data button
  let getDataButton = document.querySelector('.fe-fetch-button');
  if (getDataButton) {
    console.log('Found fetch button:', getDataButton);
    
    // Handle fetch button click
    getDataButton.addEventListener('click', function(ev) {
      console.log('Fetch button clicked');
      ev.preventDefault();
      ev.stopPropagation();
      if (!isInFetch) {
        isInFetch = true;
        fetchDataAndProcess().then(function() {
          isInFetch = false;
        }).catch(function(reason) {
          isInFetch = false;
          console.log(`Fetch or processing failed: ${reason}.`);
          ui.setTransferStatus('error', `Fetch of data failed: ${reason}`);
        });
      }
    });
  } else {
    console.error('Fetch button not found');
  }
  
  // Set up event listeners for clear button
  let clearButton = document.querySelector('.fe-clear-button');
  if (clearButton) {
    clearButton.addEventListener('click', function(ev) {
      console.log('Clear button clicked');
      ev.preventDefault();
      ev.stopPropagation();
      let datasetSpec = getCurrentDatasetSpec();
      if (datasetSpec) {
        clearDataByName(datasetSpec.name);
      }
    });
  }
  
  // Initialize the UI module
  ui.initialize({
    selectHandler: selectHandler,
    clearData: clearDataHandler
  });
  
  // Update the fetch button state based on attribute selections
  updateFetchButtonState();
  
  // Listen for attribute selection changes
  document.addEventListener('attribute-selection-changed', function(event) {
    console.log('Attribute selection changed event received');
    updateFetchButtonState();
  });
  
  // Set initial status
  ui.setTransferStatus("success", "Ready");
}

/**
 * Utility: Is passed an array of objects. Returns the keys of all the objects.
 * @param array {object[]}
 * @return {string[]}
 */
function getAttributeNamesFromData(array) {
  if (!Array.isArray(array) || !array[0] || (typeof array[0] !== "object")) {
    return [];
  }
  let attrMap = {};
  array.forEach((item) => {
    Object.keys(item).forEach((key) => {attrMap[key] = true;});
  });
  return Object.keys(attrMap);
}

/**
 * CODAP API Utility that makes an array of CODAP Attribute Specs from the
 * dataset definition and the attribute names discovered in the data.
 *
 * @param datasetSpec
 * @param attributeNames
 * @return {[object] | undefined}
 */
function resolveAttributes(datasetSpec, attributeNames) {
  let omittedAttributeNames = datasetSpec.omittedAttributeNames || [];
  let selectedAttributeNames = datasetSpec.selectedAttributeNames;
  
  console.log('Resolving attributes. All attributes found in data:', attributeNames.length);
  console.log('Selected attributes:', selectedAttributeNames ? selectedAttributeNames.length : 'none specified');
  
  // Only use attributes that are either explicitly selected or not in the omitted list
  // Make sure we only include attributes that are in both the data and the selected list
  attributeNames = selectedAttributeNames ? 
    selectedAttributeNames.filter(name => attributeNames.includes(name)) : 
    attributeNames.filter(
      function (attrName) {
        return !omittedAttributeNames.includes(attrName);
      });
      
  console.log('Filtered attribute names:', attributeNames.length);
  
  if (attributeNames) {
    let attributeList = attributeNames.map(function (attrName) {
      return {name: attrName};
    })
    
    if (datasetSpec.overriddenAttributes) {
      // Only include overrides for attributes we're actually using
      datasetSpec.overriddenAttributes.forEach(function (overrideAttr) {
        if (attributeNames.includes(overrideAttr.name)) {
          let attr = attributeList.find(function (attr) {
            return attr.name === overrideAttr.name;
          });
          if (attr) {
            Object.assign(attr, overrideAttr);
          }
        }
      })
    }
    
    if (datasetSpec.additionalAttributes) {
      // Filter any additional attributes to only those needed
      let relevantAdditionalAttrs = datasetSpec.additionalAttributes.filter(
        attr => attributeNames.includes(attr.name)
      );
      attributeList = attributeList.concat(relevantAdditionalAttrs);
    }
    
    console.log('Final attribute list length:', attributeList.length);
    return attributeList;
  }
}

/**
 * CODAP API Utility to construct a collection list
 * @param datasetSpec
 * @param attributeNames
 * @return {*[]}
 */
function resolveCollectionList(datasetSpec, attributeNames) {
  // Get the filtered and resolved attribute list based on selected attributes
  let attributeList = resolveAttributes(datasetSpec, attributeNames);
  console.log('Resolved attributes for collections:', attributeList ? attributeList.length : 0);
  
  // If we have attributes to include
  if (attributeList) {
    let collectionsList = [];
    let childCollection = {
      name: datasetSpec.childCollectionName || CHILD_COLLECTION_NAME,
      attrs: []
    }
    let parentCollection;
    
    // Set up parent collection if needed
    if (datasetSpec.parentAttributes) {
      parentCollection = {
        name: datasetSpec.parentCollectionName || PARENT_COLLECTION_NAME,
        attrs: []
      }
      collectionsList.push(parentCollection);
      childCollection.parent = datasetSpec.parentCollectionName || PARENT_COLLECTION_NAME;
    }
    collectionsList.push(childCollection);

    // Distribute attributes to appropriate collections
    attributeList.forEach(function (attr) {
      if (datasetSpec.parentAttributes && datasetSpec.parentAttributes.includes(attr.name)) {
        parentCollection.attrs.push(attr);
      } else {
        childCollection.attrs.push(attr);
      }
    });
    
    console.log('Created collections:', collectionsList.length);
    console.log('Parent collection attributes:', parentCollection ? parentCollection.attrs.length : 0);
    console.log('Child collection attributes:', childCollection.attrs.length);
    
    return collectionsList;
  }
  return undefined;
}

/**
 * A utility to convert and array of arrays (e.g. from CSV) to an equivalent
 * array of objects. Property names taken from first row.
 * @param data
 * @return {*}
 */
function csvToJSON(data) {
  let headers = data.shift();
  return data.map(d => {
    let out = {}
    d.forEach((v, ix) => {
      out[headers[ix]] = v;
    });
    return out;
  });
}

/**
 * UI/model Utility: determine selected dataset and look it up
 * @return {Object} The dataset specification
 */
function getCurrentDatasetSpec() {
  // Always use the first dataset since we only have one
  let sourceIX = 0;
  
  // First get the original dataset spec
  const originalDataset = DATASETS[sourceIX];
  
  // Create a deep copy of dataset properties (except functions)
  const datasetSpec = JSON.parse(JSON.stringify(DATASETS[sourceIX]));
  
  // Manually copy functions that are lost in JSON stringification
  datasetSpec.makeURL = originalDataset.makeURL;
  if (originalDataset.preprocess) datasetSpec.preprocess = originalDataset.preprocess;
  if (originalDataset.postprocess) datasetSpec.postprocess = originalDataset.postprocess;
  if (originalDataset.uiCreate) datasetSpec.uiCreate = originalDataset.uiCreate;
  
  // Use attribute selector to get currently selected attributes
  datasetSpec.selectedAttributeNames = getSelectedAttributes();
  
  console.log(`Retrieved ${datasetSpec.selectedAttributeNames.length} selected attributes`);
  
  // Filter overriddenAttributes to only include those in selectedAttributeNames
  if (datasetSpec.overriddenAttributes && datasetSpec.selectedAttributeNames) {
    datasetSpec.overriddenAttributes = datasetSpec.overriddenAttributes.filter(
      attr => datasetSpec.selectedAttributeNames.includes(attr.name)
    );
    
    // Always include the core attributes
    const coreAttributes = ['State', 'FIPS', 'County', 'County_Full', 'boundary'];
    coreAttributes.forEach(attrName => {
      if (!datasetSpec.overriddenAttributes.some(attr => attr.name === attrName)) {
        const originalAttr = DATASETS[sourceIX].overriddenAttributes.find(attr => attr.name === attrName);
        if (originalAttr) {
          datasetSpec.overriddenAttributes.push(originalAttr);
        }
      }
    });
  }
  
  return datasetSpec;
}

/**
 * Preprocesses dataset before converting to CODAP format.
 * @param data
 * @param preprocessActions
 * @return {*}
 */
function preprocessData(data, preprocessActions) {
  if (Array.isArray(preprocessActions)) {
    preprocessActions.forEach(action => {
      switch (action.type) {
        case 'rename':
          renameAttribute(data, action.oldKey, action.newKey);
          break;
        case 'mergePopulation':
          mergePopulation(data, action.dataKey, action.mergeKey);
          break;
        case 'sortOnDateAttr':
          sortOnDateAttr(data, action.dataKey);
          break;
        case 'computeYear':
          computeYear(data, action.dateKey, action.yearKey);
          break;
      }
    });
  } else if (typeof preprocessActions === "function") {
    preprocessActions(data);
  }
  return data;
}

/**
 * Fetches data from the selected dataset and sends it to CODAP.
 * @return {Promise<Response>}
 */
function fetchDataAndProcess() {
  let datasetSpec = getCurrentDatasetSpec();
  console.log('Fetching data with dataset spec:', datasetSpec);
  if (!datasetSpec) {
    ui.setTransferStatus('inactive', 'Pick a source')
    return Promise.reject('No source selected');
  }

  // fetch the data
  try {
    if (typeof datasetSpec.makeURL !== 'function') {
      console.error('makeURL is not a function:', datasetSpec.makeURL);
      ui.setTransferStatus('error', 'Configuration error: makeURL is not a function');
      return Promise.reject('Configuration error: makeURL is not a function');
    }
    
    let url = datasetSpec.makeURL();
    console.log('Fetching from URL:', url);
    
    if (!url) { 
      ui.setTransferStatus('error', 'Invalid URL');
      return Promise.reject("Invalid URL"); 
    }
    
    let headers = new Headers();
    if (datasetSpec.apiToken) {
      headers.append('X-App-Token', datasetSpec.apiToken);
    }
    
    ui.setTransferStatus('busy', `Fetching data...`)
    
    return fetch(url, {headers: headers}).then(function (response) {
      if (response.ok) {
        ui.setTransferStatus('busy', 'Converting...')
        return response.text().then(function (data) {
          let dataSet = Papa.parse(data, {skipEmptyLines: true});
          let nData = csvToJSON(dataSet.data);
          
          // Validate and log selected attributes
          console.log('Selected attribute names:', datasetSpec.selectedAttributeNames);
          
          // preprocess the data
          if (datasetSpec.preprocess) {
            nData = preprocessData(nData, datasetSpec.preprocess);
            console.log('After preprocess step:', nData.length, 'rows');
          }
          
          // Filter the data to only include selected attributes
          if (datasetSpec.selectedAttributeNames && datasetSpec.selectedAttributeNames.length > 0) {
            // Apply attribute filtering to each data row
            nData = nData.map(row => {
              const filteredRow = {};
              datasetSpec.selectedAttributeNames.forEach(attrName => {
                if (row.hasOwnProperty(attrName)) {
                  filteredRow[attrName] = row[attrName];
                }
              });
              return filteredRow;
            });
            
            // Log data shape after filtering
            if (nData.length > 0) {
              console.log('After attribute filtering:', 
                Object.keys(nData[0]).length, 'columns,', 
                nData.length, 'rows');
              console.log('Filtered columns:', Object.keys(nData[0]));
            }
          }
          
          // Only use the attribute names that are actually in the filtered data
          let availableAttributeNames = nData.length > 0 ? 
            getAttributeNamesFromData(nData) : [];
          
          console.log('Available attributes in filtered data:', availableAttributeNames);
          
          // create the specification of the CODAP collections
          let collectionList = resolveCollectionList(datasetSpec, availableAttributeNames);
          
          if (collectionList) {
            // create the dataset, if needed.
            return guaranteeDataset(datasetSpec.name, collectionList, datasetSpec.documentation)
                // send the data
                .then(function () {
                  if (datasetSpec.preclear) {
                    let matchValue = document.querySelector(datasetSpec.preclear.selector).value;
                    return preclearDataGroup(datasetSpec.preclear.key, matchValue, collectionList, datasetSpec.name);
                  }
                  else return Promise.resolve();
                })
                .then(function () {
                  ui.setTransferStatus('busy', 'Sending data to CODAP')
                  return sendItemsToCODAP(datasetSpec.name, nData);
                })
                // Update attribute visibility to show only selected attributes
                .then(function() {
                  ui.setTransferStatus('busy', 'Updating attribute visibility');
                  return updateAttributeVisibility(datasetSpec.name, datasetSpec.selectedAttributeNames);
                })
                // create a Case Table Component to show the data
                .then(function () {
                  ui.setTransferStatus('busy', 'creating a case table')
                  let dimensions = datasetSpec.caseTableDimensions || undefined;
                  return createCaseTable(datasetSpec.name, dimensions);
                })
                .then(function () {
                  ui.setTransferStatus('success', 'Ready')
                  if (datasetSpec.postprocess) {
                    datasetSpec.postprocess(datasetSpec);
                  }
                });
          }
          else {
            return Promise.reject('Data processing resulted in no valid collections');
          }
        });
      } else {
        return Promise.reject(response.statusText);
      }
    });
  } catch (error) {
    console.error('Error in fetchDataAndProcess:', error);
    ui.setTransferStatus('error', 'An error occurred while fetching data');
    return Promise.reject('An error occurred while fetching data');
  }
}

/**
 * Updates the visibility of attributes in CODAP based on selected attributes.
 * Only ensures that newly added attributes are visible, never hides existing ones.
 * @param {string} datasetName - The name of the dataset
 * @param {Array<string>} selectedAttributes - List of attributes that should be visible
 * @returns {Promise} - Promise resolving when visibility updates are complete
 */
function updateAttributeVisibility(datasetName, selectedAttributes) {
  console.log('Updating attribute visibility in CODAP');
  
  // First get all collections in dataset
  return codapInterface.sendRequest({
    action: 'get',
    resource: `dataContext[${datasetName}]`
  }).then(function(result) {
    if (!result.success) {
      console.error('Failed to get dataset:', result.values);
      return Promise.reject('Failed to get dataset info');
    }
    
    const collections = result.values.collections;
    const visibilityRequests = [];
    
    // For each collection, only make sure that selected attributes are visible
    // Never hide attributes that might contain data from previous requests
    collections.forEach(collection => {
      collection.attrs.forEach(attr => {
        // Only make hidden attributes visible if they're in our current selection
        if (attr.hidden && selectedAttributes.includes(attr.name)) {
          visibilityRequests.push({
            action: 'update',
            resource: `dataContext[${datasetName}].collection[${collection.name}].attribute[${attr.name}]`,
            values: {
              hidden: false
            }
          });
        }
      });
    });
    
    console.log(`Sending ${visibilityRequests.length} visibility update requests`);
    
    // Send all visibility updates in sequence
    return visibilityRequests.reduce(function(chain, request) {
      return chain.then(function() {
        return codapInterface.sendRequest(request);
      });
    }, Promise.resolve());
  });
}

// No longer auto-initialize on window load
// window.addEventListener('load', init);

// Export the public interface
export { 
  initializeApp,
  hasSelectedAttributes,
  updateFetchButtonState,
  getCurrentDatasetSpec,
  getBaseURL
};
