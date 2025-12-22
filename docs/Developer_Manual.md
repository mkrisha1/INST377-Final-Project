## Developer Manual
### Installation
1) Clone repository: 
      git clone https://github.com/mkrisha1/INST377-Final-Project.git
2) Install dependencies: npm install
3) Open the repository in Virtual Studio Code (or local server) and open index.html.

### Running Application
In terminal enter: npm start
Open index.html in a browser or run a local server.

The application features:
- Display a random meal
- Search meals by name
- Filter meals by category
- View recipe details

### Running Tests
Manual Tests:
- Random Meal: Open the page and check that a random meal is displayed each time the "Surprise Me!" button is clicked.
- Search / Category: Enter a search term (Home page) or select a category (Meals page); verify results appear.
- Recipe Details: Click “View Recipe” on any meal card and verify details load.

### API Endpoints
Base URL: https://www.themealdb.com/api/json/v1/1/

Method;	  Endpoint;	                Description 

- GET;	  random.php;	            Returns a random meal
- GET;	  search.php?s=<query>;	    Search meals by name
- GET;	  filter.php?c=<category>;	Filter meals by category
- GET;	  lookup.php?i=<id>;	    Get full recipe by meal ID
- GET;    categories.php;           List all categories


Backend
Base URL: http://localhost:3000/api

Method;          Endpoint;        Description            

- GET;            /api/help;       Get all help requests  
- POST;           /api/help;       Submit help request    
- GET;            shopping;        listNoneArray of items

### Known Bugs
- Random meal selection may disappear after using the search filter
- Shopping list does not save if switched between pages

### Future Development
- Add automated testing
- Improve overall UX/UI
- Add dietary filters (vegetarian, vegan, gluten-free, dairy-free)
- Allow users to filter by ingredients they already have
- Provide similar recipe recommendations based on a selected meal