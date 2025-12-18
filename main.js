document.addEventListener('DOMContentLoaded', () => {

  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  const mealsContainer = document.getElementById('meals');
  const recipeDetails = document.getElementById('recipeDetails');
  const categoriesContainer = document.getElementById('categories');

  const mealsSection = document.getElementById('meals-section');
  const recipeSection = document.getElementById('recipe-section');

  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => {
      data.categories.forEach(cat => {
        categorySelect.innerHTML += `<option value="${cat.strCategory}">${cat.strCategory}</option>`;
      });

      if (categoriesContainer) {
        data.categories.forEach(cat => {
          categoriesContainer.innerHTML += `
            <div class="category-card">
              <img src="${cat.strCategoryThumb}">
              <h3>${cat.strCategory}</h3>
            </div>`;
        });
      }
    });


  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (!query) {
      alert('Enter a meal name!');
      return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(res => res.json())
      .then(data => displayMeals(data.meals));
  });


  categorySelect.addEventListener('change', () => {
    const category = categorySelect.value;
    if (!category) return;

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(res => res.json())
      .then(data => displayMeals(data.meals));
  });

  categorySelect.addEventListener('change', () => {
    const category = categorySelect.value;
     if (!category) return;

    
    mealsSection.style.display = 'block';
    recipeSection.style.display = 'block';

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals));
    });

  categorySelect.addEventListener('change', () => {
    const category = categorySelect.value;
    if (!category) return;

    mealsSection.style.display = 'block';
    recipeSection.style.display = 'block';

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals));
    });

  function displayMeals(meals) {
    mealsContainer.innerHTML = '';
    recipeDetails.innerHTML = '';
    recipeSection.style.display = 'none';

    if (!meals) {
        mealsContainer.innerHTML = '<p>No meals found.</p>';
        return;
    }

    meals.forEach(meal => {
        mealsContainer.innerHTML += `
        <div class="meal-card">
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <button data-id="${meal.idMeal}">View Recipe</button>
        </div>`;
  });

  document.querySelectorAll('.meal-card button').forEach(btn => {
    btn.addEventListener('click', () => {
      recipeSection.style.display = 'block';
      viewRecipe(btn.dataset.id);
    });
  });
}

  function viewRecipe(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
      .then(res => res.json())
      .then(data => {
        const meal = data.meals[0];
        recipeDetails.innerHTML = `
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}">
          <p>${meal.strInstructions}</p>`;
      });
  }

});
