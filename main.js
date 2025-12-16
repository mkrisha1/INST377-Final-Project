const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const mealsContainer = document.getElementById('meals');
const recipeDetails = document.getElementById('recipeDetails');
const categoriesContainer = document.getElementById('categories');


fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
  .then(res => res.json())
  .then(data => {
    
    data.categories.forEach(cat => {
      categorySelect.innerHTML += `<option value="${cat.strCategory}">${cat.strCategory}</option>`;
    });

    
    data.categories.forEach(cat => {
      categoriesContainer.innerHTML += `
        <div class="category-card">
          <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}">
          <h3>${cat.strCategory}</h3>
          <p>${cat.strCategoryDescription.slice(0, 100)}...</p>
        </div>`;
    });

    
    const labels = data.categories.map(c => c.strCategory);
    const counts = data.categories.map(() => Math.floor(Math.random() * 20) + 5);
    new Chart(document.getElementById('categoryChart'), {
      type: 'bar',
      data: { labels, datasets: [{ label: 'Meal Categories', data: counts, backgroundColor: 'orange' }] },
      options: { responsive: true }
    });
  });


searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (!query) return alert('Enter a meal name!');
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => displayMeals(data.meals));
});


categorySelect.addEventListener('change', (e) => {
  const category = e.target.value;
  if (!category) return;
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(res => res.json())
    .then(data => displayMeals(data.meals));
});


function displayMeals(meals) {
  mealsContainer.innerHTML = '';
  recipeDetails.innerHTML = '';
  if (!meals) {
    mealsContainer.innerHTML = '<p>No meals found.</p>';
    return;
  }

  meals.forEach(meal => {
    mealsContainer.innerHTML += `
      <div class="meal-card">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <button onclick="viewRecipe('${meal.idMeal}')">View Recipe</button>
      </div>`;
  });
}

function viewRecipe(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      recipeDetails.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>`;
    });
}
