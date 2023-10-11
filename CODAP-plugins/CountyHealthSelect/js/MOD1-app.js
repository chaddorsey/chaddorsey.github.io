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

const APP_NAME = 'County Health Datasets';

// noinspection SqlResolve
const DATASETS = [
  {
    id: 'CountyHealthByState',
    name: 'County Health Indicators, By State',
    documentation: 'https://countyhealth.org',
    // endpoint: '/https://fatalencounters.now.sh/api',
    endpoint: './assets/data',
    selectedAttributeNames: [
      'State',
      'population',
      'Unique ID',
      'County',
      'boundary',
      'Average Life Expectancy',
      'Days of Poor Physical Health',
      'Days of Poor Mental Health',
      'Students Graduating from High School',
      'Some College',
      'Children in Poverty',
      'Limited Access to Healthy Foods',
      'Air Pollution',
      'Physically Inactive',
      'Smokers',
      'Insufficient Sleep',
      'Primary Care Doctor Rate',
      'Mental Health Providers',
      'Median Household Income',
      'Income Level',
      'Homeowners',
      'Rural Living',
      'Mostly Rural',
      'Non-Hispanic Black',
      'Asian',
      'Hispanic',
      'Non-Hispanic white',
      'Majority Minority',
      'Population',
      'Motor Vehicle Death Rate',
      'Drug Overdose Death Rate',
      'Broadband Access',
      'Teen Births Rate',
      'Firearm Death Rate',
      'Juvenile Arrest Rate',
      'Severe Housing Problems',
      'Proficient in English',
      'Youth Not in School or Employment',
    ],
    overriddenAttributes: [
      {
        name: 'State',
      },
      {
        name: 'boundary',
        formula: 'lookupBoundary(US_county_boundaries,County)',
      },
      {
        name: 'population',
      },
      {
        name: 'Unique ID',
      },
      {
          name: 'Average Life Expectancy',
          description: 'Average number of years from birth a person is expected to live.',
      },
      {
          name: 'Days of Poor Physical Health',
          description: 'Adults were asked the following question: “Thinking about your physical health&comma; which includes physical illness and injury&comma; for how many days during the past 30 days was your physical health not good?” The value represents the average number of days reported.',
      },
      {
          name: 'Days of Poor Mental Health',
          description: 'Adults were asked the following question: "Thinking about your mental health&comma; which includes stress&comma; depression&comma; and problems with emotions&comma; for how many days during the past 30 days was your mental health not good?" The value represents the average number of days reported.',
      },
      {
          name: 'Students Graduating from High School',
          description: 'Percentage of students that graduate from high school in 4 years.',
      },
      {
          name: 'Some College',
          description: 'Percentage of people ages 25-44 with at least some education beyond high school.',
      },
      {
          name: 'Children in Poverty',
          description: 'Percentage of people under age 18 living in a household whose income is below the poverty level.',
      },
      {
          name: 'Limited Access to Healthy Foods',
          description: 'Percentage of the population who are low-income and have no local grocery stores.',
      },
      {
          name: 'Air Pollution',
          description: 'The average density of fine particulate matter (diameter less than 2.5 micrometers) in micrograms per cubic meter. The higher the number the worse the pollution.',
      },
      {
          name: 'Physically Inactive',
          description: 'Percentage of adults that responded "no" to the question: "During the past month&comma; other than your regular job&comma; did you participate in any physical activities or exercises such as running&comma; calisthenics&comma; golf&comma; gardening&comma; or walking for exercise?"',
      },
      {
          name: 'Smokers',
          description: 'Percentage of the adults who said they have smoked at least 100 cigarettes in their lifetime AND that they currently smoke every day or most days. The survey does not ask specifically about e-cigarettes.',
      },
      {
          name: 'Insufficient Sleep',
          description: 'Percentage of adults who report that they sleep less than 7 hours per night on average.',
      },
      {
          name: 'Primary Care Doctor Rate',
          description: 'Number of primary care physicians per 100&comma;000 people.',
      },
      {
          name: 'Mental Health Providers',
          description: 'Number of mental health care providers per 100&comma;000 people.',
      },
      {
          name: 'Median Household Income',
          description: 'Median household income for adults.',
      },
      {
          name: 'Income Level',
          description: 'Counties classified as low have average household incomes below the median for the state and those classified as high are above the median.',
      },
      {
          name: 'Homeowners',
          description: 'Percentage of housing units that are owned by the occupants.',
      },
      {
          name: 'Rural Living',
          description: 'Percentage of population living in a rural area. A town with less than 2&comma;500 residents is considered rural.',
      },
      {
          name: 'Mostly Rural',
          description: 'Counties are classified as mostly rural if 60% of the population lives in a rural area.',
      },
      {
          name: 'Non-Hispanic Black',
          description: 'Percentage of the population that is non-Hispanic Black or African American.',
      },
      {
          name: 'Asian',
          description: 'Percentage of the population that is Asian.',
      },
      {
          name: 'Hispanic',
          description: 'Percentage of the population that is Hispanic.',
      },
      {
          name: 'Non-Hispanic white',
          description: 'Percentage of the population that is non-Hispanic White.',
      },
      {
          name: 'Majority Minority',
          description: 'If less than 50% of the population is non-Hispanic white&comma; the county is classified as majority minority.',
      },
      {
          name: 'Population',
          description: 'Total number of residents.',
      },
      {
          name: 'Motor Vehicle Death Rate',
          description: 'Number of deaths caused by motor vehicle crashes per 100&comma;000 people.',
      },
      {
          name: 'Drug Overdose Death Rate',
          description: 'Number of drug poisoning deaths per 100&comma;000 people.',
      },
      {
          name: 'Broadband Access',
          description: 'Percentage of households with broadband internet connection.',
      },
      {
          name: 'Teen Births Rate',
          description: 'Births per 1&comma;000 females ages 15-19.',
      },
      {
          name: 'Firearm Death Rate',
          description: 'Number of deaths due to firearms per 100&comma;000 people.',
      },
      {
          name: 'Juvenile Arrest Rate',
          description: 'Delinquency cases per 1&comma;000 juveniles.',
      },
      {
          name: 'Severe Housing Problems',
          description: 'Percentage of households with at least one of these problems: overcrowding&comma; high housing costs&comma; lack of kitchen facilities&comma; or lack of plumbing facilities',
      },
      {
          name: 'Proficient in English',
          description: 'Percentage of the population that is proficient in the English language.',
      },
      {
          name: 'Youth Not in School or Employment',
          description: 'Percentage of teens and young adults ages 16-19 who are neither working nor in school.',
      },
    ],
    uiComponents: [
      {
        type: 'instruction',
        text: "Select a state below to retrieve data from the County Health" +
            " dataset. You may choose more than one state?!"
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
      let stateCode = document.querySelector(`#CountyHealthByState [name=State]`).value;
      return `${this.endpoint}/CountyHealth-${stateCode}.csv`;
    },
    parentAttributes: ['State', 'population'],
    parentCollectionName: 'States',
    childCollectionName: 'CountyHealth',
    preprocess: [
      {type: 'mergePopulation', dataKey: 'State', mergeKey: 'USPS Code'},
    ],
    preclear: {key: 'State', selector: '#CountyHealthByState [name=State]'}
  }
]

const DEFAULT_DISPLAYED_DATASETS = [
  'CountyHealthByState',
];
const DEFAULT_DATASET = 'CountyHealthByState';
const DOWNSAMPLE_GOAL_DEFAULT = 1000;
const DOWNSAMPLE_GOAL_MAX = 1000;
const CHILD_COLLECTION_NAME = 'cases';
const PARENT_COLLECTION_NAME = 'groups';

let displayedDatasets = DEFAULT_DISPLAYED_DATASETS;
let downsampleGoal = DOWNSAMPLE_GOAL_DEFAULT;
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
 * CODAP API Helper: Creates or updates dataset attributes
 * @param existingDataset
 * @param desiredCollectionDefs
 * @return {Promise|Promise<{success: boolean}>}
 */
function guaranteeAttributes(existingDataset, desiredCollectionDefs) {
  let datasetName = existingDataset.name;
  let existingCollections = existingDataset.collections;
  let childMostCollectionName = existingCollections[existingCollections.length-1].name;
  let existingAttributes = [];
  existingCollections.forEach(function (collection) {
      existingAttributes = existingAttributes.concat(collection.attrs);
    });
  let desiredAttributes = [];
    desiredCollectionDefs.forEach(function (collection) {
      desiredAttributes = desiredAttributes.concat( collection.attrs);
    });
  let missingAttributes = desiredAttributes.filter(function (dAttr) {
    return !existingAttributes.find(function (eAttr) {
      return eAttr.name === dAttr.name;
    })
  });
  if (missingAttributes.length) {
    return codapInterface.sendRequest({
      action: 'create',
      resource: `dataContext[${datasetName}].collection[${childMostCollectionName}].attribute`,
      values: missingAttributes
    });
  } else {
    return Promise.resolve({success: true});
  }
}

/**
 * CODAP API Helper: Creates a dataset only if it does not exist.
 * @param datasetName {string}
 * @param collectionList {[object]}
 * @param url {string}
 * @return Promise
 */
function guaranteeDataset(datasetName, collectionList, url) {
  return codapInterface.sendRequest({action: 'get', resource: `dataContext[${datasetName}]`})
      .then(function (result) {
        if (result && result.success) {
          return guaranteeAttributes(result.values, collectionList);
        } else {
          return codapInterface.sendRequest({
            action: 'create',
            resource: 'dataContext',
            values: specifyDataset(datasetName, collectionList, url)
          });
        }
      })
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
async function clearData (datasetName) {
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
 * Creates the plugin UI and associates the correct event handlers.
 */
function createUI () {
  let anchor = document.querySelector('.contents');
  displayedDatasets.forEach(function (dsId) {
    let ix = DATASETS.findIndex(function (d) {return d.id === dsId});
    if (ix>=0) {
      let ds = DATASETS[ix]
      let el = ui.createDatasetSelector(ds.id, ds.name, ix);

      if (ds.uiCreate) {
        ds.uiCreate(el);
      } else {
        ui.createDatasetUI(el, ds);
      }
      anchor.append(el);
      if (ds.id === DEFAULT_DATASET) {
        let input = el.querySelector('input');
        input.checked = true;
        el.classList.add('selected-source')
      }
    }
  })
  document.querySelectorAll('input[type=radio][name=source]')
      .forEach((el) => el.addEventListener('click', selectDatasetHandler))
  document.querySelectorAll('input[type=text]')
      .forEach(function (el) { el.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter') {
          fetchHandler(ev);
        }
      })})
  let button = document.querySelector('button.fe-fetch-button');
  button.addEventListener('click', fetchHandler);
  ui.initialize({
    selectHandler: selectHandler,
    clearData: clearDataHandler
  });
  ui.setTransferStatus("success", "Ready")
}

/**
 * Initializes the web application
 *   * Connects with CODAP
 *   * Creates UI
 */
function init() {
  let datasets = (new URL(document.location)).searchParams.get('datasets');
  if (datasets) {
    if (datasets === 'all') {
      datasets = DATASETS.map(function (ds) { return ds.id; });
    } else {
      datasets = datasets.split(',');
    }
    displayedDatasets = datasets;
  }

  codapInterface.init({
    name: APP_NAME,
    title: APP_NAME,
    dimensions:{width: 360, height: 440},
    preventDataContextReorg: false
  }).then(createUI);

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
 * A utility to downsample a dataset by selecting a random subset without
 * replacement.
 * @param data
 * @param targetCount
 * @param start
 * @return {*[]}
 */
function downsampleRandom(data, targetCount, start) {
  let dataLength = data.length - start;
  let ct = Math.min(dataLength, Math.max(0, targetCount));
  let randomAreSelected = ct < (dataLength/2);
  let pickArray = new Array(dataLength).fill(!randomAreSelected);
  if (!randomAreSelected) {
    ct = dataLength - ct;
  }

  // construct an array of selection choices
  let i = 0;
  while (i < ct) {
    let value = Math.floor(Math.random()*dataLength);
    if (pickArray[value] !== randomAreSelected) {
      i++;
      pickArray[value] = randomAreSelected;
    }
  }

  let newData = [];
  // copy the non-data rows
  for (let ix = 0; ix < start; ix += 1) {
    newData.push(data[ix]);
  }
  // use pick array to determine if we should add each row of original table to new
  pickArray.forEach(function(shouldPick, ix) {
    if (shouldPick) newData.push(data[ix + start]);
  });

  return newData;
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
  attributeNames = selectedAttributeNames || attributeNames.filter(
      function (attrName) {
        return !omittedAttributeNames.includes(attrName);
      });
  if (attributeNames) {
    let attributeList = attributeNames.map(function (attrName) {
      return {name: attrName};
    })
    if (datasetSpec.overriddenAttributes) {
      datasetSpec.overriddenAttributes.forEach(function (overrideAttr) {
        let attr = attributeList.find(function (attr) {
          return attr.name === overrideAttr.name;
        });
        if (attr) {
          Object.assign(attr, overrideAttr);
        }
      })
    }
    if (datasetSpec.additionalAttributes) {
      attributeList = attributeList.concat(datasetSpec.additionalAttributes);
    }
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
  let attributeList = resolveAttributes(datasetSpec, attributeNames);
  console.log('attrs',attributeList)
  let collectionsList = [];
  let childCollection = {
    name: datasetSpec.childCollectionName || CHILD_COLLECTION_NAME,
    attrs: []
  }
  let parentCollection;
  if (datasetSpec.parentAttributes) {
    parentCollection = {
      name: datasetSpec.parentCollectionName || PARENT_COLLECTION_NAME,
      attrs: []
    }
    collectionsList.push(parentCollection);
    childCollection.parent = datasetSpec.parentCollectionName || PARENT_COLLECTION_NAME;
  }
  collectionsList.push(childCollection);

  attributeList.forEach(function (attr) {
    if (datasetSpec.parentAttributes && datasetSpec.parentAttributes.includes(attr.name)) {
      parentCollection.attrs.push(attr);
    } else {
      childCollection.attrs.push(attr);
    }
  });
  return collectionsList;
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
 * @return {{selectedAttributeNames: string[], makeURL: (function(): string), endpoint: string, preprocess: [{oldKey: string, newKey: string, type: string}, {oldKey: string, newKey: string, type: string}, {dataKey: string, type: string, mergeKey: string}, {dataKey: string, type: string}, {yearKey: string, dateKey: string, type: string}], documentation: string, name: string, id: string, overriddenAttributes: [{name: string}, {name: string}, {name: string, description: string}, {name: string, description: string}, {precision: string, name: string, description: string, type: string}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], timeSeriesAttribute: string, uiComponents: [{text: string, type: string}, {lister: (function(): (string)[]), name: string, label: string, type: string}], parentAttributes: string[]}|{selectedAttributeNames: string[], makeURL: (function(): string), endpoint: string, preprocess: [{oldKey: string, newKey: string, type: string}, {oldKey: string, newKey: string, type: string}, {dataKey: string, type: string, mergeKey: string}, {dataKey: string, type: string}, {yearKey: string, dateKey: string, type: string}], documentation: string, name: string, id: string, overriddenAttributes: [{name: string}, {name: string}, {name: string, description: string}, {name: string, description: string}, {precision: string, name: string, description: string, type: string}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], timeSeriesAttribute: string, uiComponents: [{text: string, type: string}, {lister: (function(): *[]), name: string, label: string, type: string}], parentAttributes: string[]}}
 */
function getCurrentDatasetSpec() {
  let sourceSelect = document.querySelector('input[name=source]:checked');
  if (!sourceSelect) {
    return;
  }
  //console.log(`sourceSelect: ${sourceSelect}`)
  //console.dir(sourceSelect)
  //let sourceIX = Number(sourceSelect.value);
  let sourceIX = 0;
  return DATASETS[sourceIX];
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
  console.log(datasetSpec)
  if (!datasetSpec) {
    ui.setTransferStatus('inactive', 'Pick a source')
    return Promise.reject('No source selected');
  }

  // fetch the data
  let url = datasetSpec.makeURL();
  console.log(url)
  let headers = new Headers();
  if (datasetSpec.apiToken) {
    headers.append('X-App-Token', datasetSpec.apiToken);
  }
  if (!url) { return Promise.reject("fetch failed"); }
  //  console.log(`source: ${sourceIX}:${datasetSpec.name}, url: ${url}`);
  ui.setTransferStatus('busy', `Fetching data...`)
  return fetch(url, {headers: headers}).then(function (response) {

    if (response.ok) {
      ui.setTransferStatus('busy', 'Converting...')
      return response.text().then(function (data) {
        let dataSet = Papa.parse(data, {skipEmptyLines: true});
        let nData = csvToJSON(dataSet.data);
        // preprocess the data: this is guided by the datasetSpec and may include,
        // for example sorting and filtering
        if (datasetSpec.preprocess) {
          nData = preprocessData(nData, datasetSpec.preprocess);
          console.log('Preprocess step', nData)
        }
        // downsample the data, if necessary
        if (ui.getCheckboxValue('#fe-downsample') && downsampleGoal) {
          nData = downsampleRandom(nData, downsampleGoal, 0);
        }
        // create the specification of the CODAP collections
        let collectionList = resolveCollectionList(datasetSpec, getAttributeNamesFromData(
            nData));
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
          return Promise.reject('CDC Server returned no data');
        }
      });
    } else {
      return Promise.reject(response.statusText);
    }
  });
}

// And off we go...
window.addEventListener('load', init);
