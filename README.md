# realtor-cavern-server


Projects.csv  - Contains information about the approved and running projects

name    - TItle of the project
Location - Location of the Project
Latitude - Latitude of the project location
Longitude - Longitude of the project location
Exec - Executing Agency
Cost - Projected Cost in crores
Timespan - Timespan of the project in years
Project_id - Unique id of the project
Goal - Goals of the project
Start_date - Date of project start
Completion - Percentage of project completed
Actual_cost - Actual cost of the project to date

Proposals.csv - Contains information regarding the proposed project ideas

name    - TItle of the project
Location - Location of the Project
Latitude - Latitude of the project
Longitude - Longitude of the project
Exec - Executing Agency
Cost - Projected Cost in crores
Timespan - Timespan of the project in years
Project_id - unique id of the project
Goal - Objective of the project
proposal_date    - When was the project proposed

Components.csv -  Contains information about components of the project and dependency relationships among the project components. 

Project_id - Reference to project in projects.csv or proposals.csv
Executing_agency - Executing Agency
component_id    - Unique id of the component
Component_type - Type of the component
depends_on - 

There will be interdependencies among the project components. For example, component 1 of project 1 must be finished before component 5 of project 2, and so on and so forth.
budget ratio - Ratio of project budget allocated for this component

Agencies.csv - Contains the look-up information for various agencies. These values must be used to verify and authorize various approval processes done by respective agency users. All agencies listed in projects.csv (point #1) and proposals.csv (point #2) will be present in this file.

Code - Shortcode for the agency
Name - Name of the agency
Type - Type of the agency
Description - Description of the objective of the agency

Constraints.csv - Contains the constraints to be applied when evaluating the optimal timeframes for the proposals.


executing_agency_limit -There will be a limit on the number of project components an executing agency can run at the same timelocation_limit 

-There will be a limit on the number of project components that can be run in the same location.
yearly_funding-There will be a limit on the yearly funding an executing agency can spend

User Types.csv - Contains the different types of users in your application

code    - Unique Code for this user type
Committee - Name of the group of this user type
Description - Description of user type
