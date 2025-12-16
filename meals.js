// Search meals
document.getElementById('searchBtn').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value;
  if (!query) return alert('Enter a meal name!');
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => displayMeals(data.meals));
});

// Populate category dropdown
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
  .then(res => res.json())
  .then(data => {
    const dropdown = document.getElementById('categorySelect');
    data.categories.forEach(cat => {
      dropdown.innerHTML += `<option value="${cat.strCategory}">${cat.strCategory}</option>`;
    });
  });

// Filter meals by category
document.getElementById('categorySelect').addEventListener('change', e => {
  const category = e.target.value;
  if (!category) return;
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(res => res.json())
    .then(data => displayMeals(data.meals));
});

// Display meals
function displayMeals(meals) {
  const container = document.getElementById('meals');
  const sliderContainer = document.getElementById('mealSlider');
  container.innerHTML = '';
  sliderContainer.innerHTML = '';
  if (!meals) {
    container.innerHTML = '<p>No meals found.</p>';
    return;
  }

  meals.forEach(meal => {
    container.innerHTML += `
      <div class="meal-card">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <button onclick="viewRecipe('${meal.idMeal}')">View Recipe</button>
      </div>`;
    
    sliderContainer.innerHTML += `
      <div class="swiper-slide">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      </div>`;
  });

  // Initialize Swiper
  new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 10,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  });
}

// View recipe details
function viewRecipe(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      document.getElementById('recipeDetails').innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>`;
    });
}
