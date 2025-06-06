// ==========================================================================
// Attribute configuration: single source of truth for all attribute metadata
// ==========================================================================

import { extractNameAndUnit } from './attributeUtils.js';

// Example groupings (expand as needed)
export const attributeGroups = [
  { id: 'demographics', title: 'Demographics' },
  { id: 'health', title: 'Health' },
  { id: 'environment', title: 'Environment' },
  { id: 'education', title: 'Education' },
  // Add more groups as needed
];

// Attribute definitions (expand as needed)
const rawAttributes = [
  { name: 'State', group: 'demographics' },
  { name: 'County', group: 'demographics' },
  { name: 'boundary', group: 'demographics', type: 'boundary', formula: 'lookupBoundary(US_county_boundaries, County + ", " + State)', description: 'Boundary for the county, used for mapping.', hidden: true },
  { name: 'Average Life Expectancy (years)', group: 'health', description: 'Average number of years from birth a person is expected to live' },
  { name: 'Days of Poor Physical Health (days/month)', group: 'health', description: 'Adults were asked the following question: "Thinking about your physical health, which includes physical illness and injury, for how many days during the past 30 days was your physical health not good?" The value represents the average number of days reported.' },
  { name: 'Days of Poor Mental Health (days/month)', group: 'health', description: 'Adults were asked the following question: "Thinking about your mental health, which includes stress, depression, and problems with emotions, for how many days during the past 30 days was your mental health not good?" The value represents the average number of days reported.' },
  { name: 'Students Graduating from High School (%)', group: 'education', description: 'Percentage of students that graduate from high school in 4 years.' },
  { name: 'Some College (%)', group: 'education', description: 'Percentage of people ages 25-44 with at least some education beyond high school.' },
  { name: 'Children in Poverty (%)', group: 'demographics', description: 'Percentage of people under age 18 living in a household whose income is below the poverty level.' },
  { name: 'Limited Access to Healthy Foods (%)', group: 'environment', description: 'Percentage of the population who are low-income and have no local grocery stores.' },
  { name: 'Air Pollution (fine particulate matter in micrograms/cubic meter of air)', group: 'environment', description: 'The average density of fine particulate matter (diameter less than 2.5 micrometers) in micrograms per cubic meter. The higher the number the worse the pollution.' },
  { name: 'Physically Inactive (%)', group: 'health', description: 'Percentage of adults that responded "no" to the question: "During the past month, other than your regular job, did you participate in any physical activities or exercises such as running, calisthenics, golf, gardening, or walking for exercise?"' },
  { name: 'Smokers (%)', group: 'health', description: 'Percentage of the adults who said they have smoked at least 100 cigarettes in their lifetime AND that they currently smoke every day or most days. The survey does not ask specifically about e-cigarettes.' },
  { name: 'Insufficient Sleep (%)', group: 'health', description: 'Percentage of adults who report that they sleep less than 7 hours per night on average.' },
  { name: 'Primary Care Doctor Rate (doctors/100,000)', group: 'health', description: 'Number of primary care physicians per 100,000 people.' },
  { name: 'Mental Health Providers (providers/ 100,000)', group: 'health', description: 'Number of mental health care providers per 100,000 people.' },
  { name: 'Median Household Income ($)', group: 'demographics', description: 'Median household income for adults.' },
  { name: 'Income Level', group: 'demographics' },
  { name: 'Homeowners (%)', group: 'demographics', description: 'Percentage of housing units that are owned by the occupants.' },
  { name: 'Rural Living (%)', group: 'environment', description: 'Percentage of population living in a rural area. A town with less than 2,500 residents is considered rural.' },
  { name: 'Mostly Rural', group: 'environment' },
  { name: 'Non-Hispanic Black (%)', group: 'demographics' },
  { name: 'Asian (%)', group: 'demographics' },
  { name: 'Hispanic (%)', group: 'demographics' },
  // STUB: Not present in current data, left for future use
  // { name: 'American Indian & Alaska Native (%)', dataKey: '% American Indian or Alaska Native', group: 'demographics', description: 'Percentage of the population that identifies as American Indian or Alaska Native. Source: County Health Rankings 2025.' },
  // { name: 'Native Hawaiian / Other Pacific Islander (%)', dataKey: '% Native Hawaiian or Other Pacific Islander', group: 'demographics', description: 'Percentage of the population that identifies as Native Hawaiian or Other Pacific Islander. Source: County Health Rankings 2025.' },
  { name: 'Non-Hispanic White (%)', group: 'demographics' },
  { name: 'Population', group: 'demographics', description: 'Total number of residents.' },
  { name: 'Motor Vehicle Death Rate (deaths/100,000 people)', group: 'health', description: 'Number of deaths caused by motor vehicle crashes per 100,000 people.' },
  { name: 'Drug Overdose Death Rate (deaths/100,000 people)', group: 'health', description: 'Number of drug poisoning deaths per 100,000 people.' },
  { name: 'Broadband Access (%)', group: 'environment', description: 'Percentage of households with broadband internet connection.' },
  { name: 'Teen Birth Rate (births/per teens)', group: 'health', description: 'Births per 1,000 females ages 15-19.' },
  { name: 'Firearm Death Rate (deaths/ 100,000 people)', group: 'health', description: 'Number of deaths due to firearms per 100,000 people.' },
  { name: 'Juvenile Arrest Rate (arrests/ 1,000 juveniles)', group: 'health', description: 'Delinquency cases per 1,000 juveniles.' },
  { name: 'Severe Housing Problems (%)', group: 'environment', description: 'Percentage of households with at least one of these problems: overcrowding, high housing costs, lack of kitchen facilities, or lack of plumbing facilities.' },
  { name: 'Proficient in English (%)', group: 'education', description: 'Percentage of the population that is proficient in the English language.' },
  { name: 'Youth Not in School or Employment (%)', group: 'education', description: 'Percentage of teens and young adults ages 16-19 who are neither working nor in school.' },
  // Add more attributes as needed
];

export const attributes = rawAttributes.map(attr => {
  const { name, unit } = extractNameAndUnit(attr.name);
  return unit ? { ...attr, name, unit } : { ...attr, name };
}); 