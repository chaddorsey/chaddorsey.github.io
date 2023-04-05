// Replace with your own Purple Air API key
const PURPLE_AIR_API_KEY = '541AD436-D35F-11ED-B6F4-42010A800007';

// The Purple Air API URL
const PURPLE_AIR_API_URL = `https://api.purpleair.com/v1/sensors?fields=latitude,longitude,pm2.5,pm2.5_aqi&api_key=${PURPLE_AIR_API_KEY}`;

// Initialize the CODAP plugin
const codapInterface = new iframePhone.IframePhoneRpcEndpoint(
  function () {},
  'data-interactive',
  window.parent
);

// Function to fetch Purple Air data
async function fetchPurpleAirData() {
  const response = await fetch(PURPLE_AIR_API_URL);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  const data = await response.json();
  return data.data;
}

// Function to create a dataset in CODAP
async function createDataset() {
    const datasetSpec = {
      name: 'PurpleAirData',
      title: 'Purple Air Data',
      collections: [
        {
          name: 'measurements',
          labels: {
            pluralCase: 'measurements',
            setOfCasesWithArticle: 'a set of measurements',
          },
          attrs: [
            { name: 'latitude', type: 'numeric', description: 'Latitude' },
            { name: 'longitude', type: 'numeric', description: 'Longitude' },
            { name: 'pm25', type: 'numeric', description: 'PM2.5' },
            { name: 'aqi', type: 'numeric', description: 'AQI' },
          ],
        },
      ],
    };
    await codapInterface.sendRequest({
      action: 'create',
      resource: 'dataContext',
      values: datasetSpec,
    });
  }
  

// Function to add Purple Air data to the CODAP dataset
async function addDataToDataset(purpleAirData) {
    const items = purpleAirData.map((item) => {
      return {
        latitude: item[0],
        longitude: item[1],
        pm25: item[2],
        aqi: item[3],
      };
    });
  
    await codapInterface.sendRequest({
      action: 'create',
      resource: 'dataContext[PurpleAirData].item',
      values: items,
    });
  }
  

// Main function to load Purple Air data into CODAP
async function loadPurpleAirData() {
  try {
    const purpleAirData = await fetchPurpleAirData();
    await createDataset();
    await addDataToDataset(purpleAirData);
    alert('Purple Air data loaded successfully!');
  } catch (error) {
    alert(`Error loading Purple Air data: ${error.message}`);
  }
}

// Attach event listener to the Load Data button
document.getElementById('loadData').addEventListener('click', loadPurpleAirData);
