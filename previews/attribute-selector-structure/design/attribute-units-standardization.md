# Design Document: Standardizing Attribute Units in CODAP Plugin

## Problem Statement
Currently, attribute units in our CODAP plugin are included as part of the attribute name (e.g., "Weight (kg)"). This approach is not ideal, as CODAP supports a dedicated property for attribute units. Including units in the name leads to inconsistencies in display, export, and downstream data processing. To align with CODAP's best practices and improve data integrity, we need to:

- Parse attribute names to extract units specified in parentheses.
- Remove the unit from the attribute name and title.
- Set the extracted unit as the value of the attribute's unit property.
- Ensure that exported data and UI representations use the proper attribute name and unit fields.

## Goals
- Standardize the handling of attribute units using CODAP's `unit` property.
- Improve data export and compatibility with CODAP and other tools.
- Maintain a user-friendly UI that clearly displays units where appropriate.

## Requirements
- All attributes with units in their names should be updated to use the `unit` property.
- The UI and export logic should reflect this change:
  - Names without units in top-level selections.
  - Names with units in parentheses in expanded attribute lists.
- The change should be backward-compatible for existing data where possible.

## Proposed Solution
1. **Parsing and Data Model Update**
   - Implement logic to detect and extract units from attribute names in the format `Name (unit)`.
   - Store the unit in the attribute's `unit` property.
   - Update the attribute's `name` and `title` to exclude the unit.
2. **UI/UX Adjustments**
   - In expanded attribute listings, display the attribute name followed by the unit in parentheses (e.g., `Weight (kg)`).
   - In top-level selected attributes for each subcategory, display only the attribute name (e.g., `Weight`).
3. **Export Logic**
   - Ensure that exported data uses the attribute name and unit fields correctly, with units not appended to the name.
4. **Backward Compatibility**
   - Provide migration logic for existing data if necessary.

## UI/UX Considerations
- Expanded attribute lists: `Name (unit)`
- Top-level selected attributes: `Name`
- No change to user workflow, only improved clarity and data structure.

## Risks and Mitigations
- **Risk:** Some attributes may not follow the `Name (unit)` pattern.
  - **Mitigation:** Only apply parsing when the pattern is detected; leave other names unchanged.
- **Risk:** Existing data may have inconsistencies.
  - **Mitigation:** Add migration or fallback logic as needed.

## Open Questions
- Are there any edge cases for unit extraction (e.g., nested parentheses, special characters)?
- Should we support multi-word units or units with symbols?
- Is there a need to update documentation or user training materials?

---

*Author: AI Assistant*
*Date: 2024-06-09* 