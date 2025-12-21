# Developer Manual

## Installation
1) Clone repository: 
      git clone https://github.com/mkrisha1/INST377-Final-Project.git
2) Frontend: open index.html or local server

## Running Application
Open index.html in a browser or run a local server.

The application features:

Display a random meal

Search meals by name

Filter meals by category

View recipe details

## Running Tests
Manual Tests:
- Random Meal: Open the page and check that a random meal is displayed.
- Search / Category: Enter a search term or select a category; verify results appear.
- Recipe Details: Click “View Recipe” on any meal card and verify details load.

## API Endpoints
Method	Endpoint	Description: 

- GET	/random.php	Returns a random meal
- GET	/search.php?s=<query>	Search meals by name
- GET	/filter.php?c=<category>	Filter meals by category
- GET	/lookup.php?i=<id>	Get full recipe by meal ID

## Known Bugs
Random meal selection may disappear after using the search filter

## Future Development
- Add automated testing
- Improve UX/UI
