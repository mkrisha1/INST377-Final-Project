document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  const mealsContainer = document.getElementById('meals');
  const recipeDetails = document.getElementById('recipeDetails');

  const mealsSection = document.getElementById('meals-section');
  const recipeSection = document.getElementById('recipe-section');


  if (mealsSection) mealsSection.style.display = 'none';
  if (recipeSection) recipeSection.style.display = 'none';


  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => {
      data.categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.strCategory;
        option.textContent = cat.strCategory;
        categorySelect.appendChild(option);
      });
    })
    .catch(err => console.error('Category load error:', err));

  
  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();

      if (!query) {
        alert('Please enter a meal name');
        return;
      }

      showMealsSection();

      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
        .catch(err => console.error('Search error:', err));
    });
  }


  categorySelect.addEventListener('change', () => {
    const category = categorySelect.value;
    if (!category) return;

    showMealsSection();

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(res => res.json())
      .then(data => displayMeals(data.meals))
      .catch(err => console.error('Category filter error:', err));
  });


  function displayMeals(meals) {
    mealsContainer.innerHTML = '';
    recipeDetails.innerHTML = '';
    if (recipeSection) recipeSection.style.display = 'none';

    if (!meals) {
      mealsContainer.innerHTML = '<p>No meals found.</p>';
      return;
    }

    meals.forEach(meal => {
      const card = document.createElement('div');
      card.className = 'meal-card';
      card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <button data-id="${meal.idMeal}">View Recipe</button>
      `;
      mealsContainer.appendChild(card);
    });

    document.querySelectorAll('.meal-card button').forEach(btn => {
      btn.addEventListener('click', () => {
        showRecipeSection();
        loadRecipe(btn.dataset.id);
      });
    });
  }


  function loadRecipe(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
      .then(res => res.json())
      .then(data => {
        const meal = data.meals[0];
        recipeDetails.innerHTML = `
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <p>${meal.strInstructions}</p>
        `;
      })
      .catch(err => console.error('Recipe load error:', err));
  }


  function showMealsSection() {
    if (mealsSection) mealsSection.style.display = 'block';
  }

  function showRecipeSection() {
    if (recipeSection) recipeSection.style.display = 'block';
  }
});
