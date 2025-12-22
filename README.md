# INST377-Final-Project: CookSmart - Recipe Finder Web Application

## Description

CookSmart is a web application that allows users to search for recipes based on ingredients or keywords. The application fetches recipe data from a public recipe API and displays results in an interactive, user-friendly interface. Users can browse recipes, view details such as ingredients and instructions, and discover new meal ideas quickly.

### Target Browsers

- Google Chrome (latest version)
- Mozilla Firefox (latest version)
- Safari (macOS and iOS)
- Microsoft Edge (Chromium-based)

### Description of Target browsers
- Google Chrome (latest version)
- Mozilla Firefox (latest version)
- Safari (macOS and iOS)
- Microsoft Edge (Chromium-based)
  
The site is optimized for desktop and mobile screens and supports both iOS and Android browsers.


## Developer Manual
### Installation
1) Clone repository: 
      git clone https://github.com/mkrisha1/INST377-Final-Project.git
2) Open the repository in Virtual Studio Code (or local server) and open index.html.

### Running Application
Open index.html in a browser or run a local server.

The application features:
- Display a random meal
- Search meals by name
- Filter meals by category
- Filter meals by cuisine
- View recipe details

### Running Tests
Manual Tests:
- Random Meal: Open the page and check that a random meal is displayed each time the button is clicked.
- Search / Category: Enter a search term or select a category; verify results appear.
- Recipe Details: Click “View Recipe” on any meal card and verify details load.

### API Endpoints
Method	Endpoint	            Description: 

- GET	/     random.php	            Returns a random meal
- GET	/     search.php?s=<query>	Search meals by name
- GET	/     filter.php?c=<category>	Filter meals by category
- GET	/     lookup.php?i=<id>	      Get full recipe by meal ID

### Known Bugs
Random meal selection may disappear after using the search filter

## Future Development
- Add automated testing
- Improve overall UX/UI
- Add dietary filters (vegetarian, vegan, gluten-free, dairy-free)
- Allow users to filter by ingredients they already have
- Provide similar recipe recommendations based on a selected meal


https://github.com/mkrisha1/INST377-Final-Project/edit/main/docs/Developer_Manual.md






