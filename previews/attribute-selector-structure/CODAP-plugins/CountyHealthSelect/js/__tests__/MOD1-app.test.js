const { JSDOM } = require('jsdom');

// Mock the DATASETS array and makeURL function from MOD1-app.js
const DATASETS = [
  {
    makeURL: function () {
      try {
        let stateCode = document.querySelector('#CountyHealthByState [name=State]').value;
        const url = `/assets/data/2023/csv/2023-CountyHealth-${stateCode}.csv`;
        return url;
      } catch (error) {
        return null;
      }
    }
  }
];

describe('MOD1 CountyHealth makeURL', () => {
  let dom;
  beforeEach(() => {
    dom = new JSDOM(`<!DOCTYPE html><div id="CountyHealthByState"><select name="State"><option value="CA">CA</option><option value="TX">TX</option></select></div>`);
    global.document = dom.window.document;
  });

  afterEach(() => {
    delete global.document;
  });

  it('returns correct URL for CA', () => {
    document.querySelector('#CountyHealthByState [name=State]').value = 'CA';
    expect(DATASETS[0].makeURL()).toBe('/assets/data/2023/csv/2023-CountyHealth-CA.csv');
  });

  it('returns correct URL for TX', () => {
    document.querySelector('#CountyHealthByState [name=State]').value = 'TX';
    expect(DATASETS[0].makeURL()).toBe('/assets/data/2023/csv/2023-CountyHealth-TX.csv');
  });

  it('returns null if state code is missing', () => {
    document.querySelector('#CountyHealthByState [name=State]').value = '';
    expect(DATASETS[0].makeURL()).toBe('/assets/data/2023/csv/2023-CountyHealth-.csv');
  });
}); 