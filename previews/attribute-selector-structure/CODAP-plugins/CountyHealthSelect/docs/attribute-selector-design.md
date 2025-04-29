# County Health Select Plugin: Attribute Selector Feature Design

## Overview
This document outlines the design for adding an attribute selection feature to the County Health Select CODAP plugin. The feature will allow users to selectively import specific health, environment, and education indicators when retrieving county-level data.

## User Interface Design

### Location and Layout
- New section to be placed between the datasource selected-source div and fe-summary-section div
- Organized into three collapsible subsections: Health, Environment, and Education
- Each subsection contains:
  - Triangular expansion facet (solid blue-green)
  - Checkbox for toggling entire category
  - Category title
  - Status text showing "X of Y attributes selected" in italics
  - Expandable panel containing attribute selection buttons

### Visual Elements
- Color Scheme:
  - Selected buttons: Blue (matching screenshot example)
  - Unselected buttons: Gray (matching screenshot example)
  - Hover state: Darker shade of the button's current color
  - Category titles: Standard text color
  - Disabled category titles: Grayed out
- Button Style:
  - Rectangular buttons with rounded corners
  - Toggle behavior (selected/unselected state)
  - Clear visual distinction between states
  - Responsive layout with multiple buttons per row where space permits
  - Maintains consistent overall plugin width
- Expansion Indicators:
  - Standard HTML/CSS triangles
  - Solid blue-green color
  - Points right when collapsed, down when expanded
  - No transition animations

### Default States
- Initial Load:
  - All categories collapsed
  - All category checkboxes checked
  - All attributes selected
  - Status text shows "13 of 13 attributes selected" for Health, "7 of 7 attributes selected" for Environment, and "5 of 5 attributes selected" for Education

## Attribute Categories

### Core Geographic (Always Included)
- State
- FIPS
- County
- County_Full
- boundary

### Health Indicators
1. Average Life Expectancy (years)
2. Days of Poor Physical Health (days/month)
3. Days of Poor Mental Health (days/month)
4. Primary Care Doctor Rate (doctors/100,000)
5. Mental Health Providers (providers/100,000)
6. Physically Inactive (%)
7. Smokers (%)
8. Insufficient Sleep (%)
9. Drug Overdose Death Rate (deaths/100,000 people)
10. Motor Vehicle Death Rate (deaths/100,000 people)
11. Firearm Death Rate (deaths/100,000 people)
12. Teen Birth Rate (births/per teens)
13. Limited Access to Healthy Foods (%)

### Environment Indicators
1. Air Pollution (fine particulate matter in micrograms/cubic meter of air)
2. Rural Living (%)
3. Broadband Access (%)
4. Severe Housing Problems (%)
5. Homeowners (%)
6. Median Household Income ($)
7. Children in Poverty (%)

### Education Indicators
1. Students Graduating from High School (%)
2. Some College (%)
3. Proficient in English (%)
4. Youth Not in School or Employment (%)
5. Juvenile Arrest Rate (arrests/1,000 juveniles)

## Interaction Behavior

### Category Checkbox Behavior
- When unchecked:
  - Grays out category title
  - Adds "No attributes included" text
  - Excludes all attributes in category from data import
  - Maintains but disables individual attribute selections
- When re-checked:
  - Restores category title appearance
  - Removes "No attributes included" text
  - Re-enables stored attribute selections
  - Includes selected attributes in next data import

### Selection Persistence
- Attribute selections persist when:
  - Switching between states in the data source dropdown
  - Toggling category checkboxes off and on
  - Collapsing and expanding sections
- Selections reset only on page reload

### Data Import Behavior
- New data imports reflect current attribute selections
- Previously imported state data remains unchanged
- Core geographic attributes always included
- Adding new attributes for a state:
  - Creates new columns in CODAP
  - Populates only for newly imported state
  - Previous states show empty values for new columns
- Removing attributes:
  - Affects only new imports
  - Maintains existing data in CODAP
- Get Data button:
  - Disabled when no attributes are selected across all categories
  - Enabled when at least one attribute is selected

## Technical Implementation Notes

### HTML Structure
```html
<div class="attribute-selector-container">
  <div class="category-section" id="health-section">
    <!-- Health category content -->
  </div>
  <div class="category-section" id="environment-section">
    <!-- Environment category content -->
  </div>
  <div class="category-section" id="education-section">
    <!-- Education category content -->
  </div>
</div>
```

### State Management
- Track selections in a persistent state object
- Maintain separate selection states for each category
- Update CODAP interface based on selection changes
- Handle category toggle states independently

### Data Processing
- Filter CSV data based on selected attributes
- Maintain core geographic attributes
- Handle column addition/removal in CODAP
- Manage data consistency across multiple imports

## Future Considerations
- Addition of "Select All" / "Clear All" options per category
- Custom icons for expansion indicators
- Attribute count badges
- Search/filter functionality for attributes
- Attribute grouping within categories 