document.addEventListener('DOMContentLoaded', () => {

  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  const mealsContainer = document.getElementById('meals');
  const recipeDetails = document.getElementById('recipeDetails');
  const categoriesContainer = document.getElementById('categories');
  const mealsSection = document.getElementById('meals-section');
  const recipeSection = document.getElementById('recipe-section');
  const carouselContainer = document.getElementById('mealSlider');

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
              <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}">
              <h3>${cat.strCategory}</h3>
            </div>`;
        });
      }
    });


  function loadCarouselImages() {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Miscellaneous')
      .then(res => res.json())
      .then(data => {
        if (!data.meals || data.meals.length === 0) return;
        carouselContainer.innerHTML = '';

        const sliderContainer = document.createElement('div');
        sliderContainer.setAttribute('data-simple-slider', '');
        sliderContainer.style.width = '700px';
        sliderContainer.style.height = '500px';
        sliderContainer.style.margin = '20px auto';
        sliderContainer.style.overflow = 'hidden';

        data.meals.slice(0, 10).forEach(meal => {
          const img = document.createElement('img');
          img.src = meal.strMealThumb;
          img.alt = meal.strMeal;
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.objectFit = 'contain';
          sliderContainer.appendChild(img);
        });

        carouselContainer.appendChild(sliderContainer);

        setTimeout(() => {
          simpleslider.getSlider({
            container: sliderContainer,
            autoplay: true,
            delay: 2
          });
        }, 100);
      })
      .catch(err => console.error('Error loading carousel images:', err));
  }

  loadCarouselImages();


  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (!query) {
        alert('Enter a meal name!');
        return;
      }

      mealsSection.style.display = 'block';
      recipeSection.style.display = 'none';

      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals));
    });
  }


  if (categorySelect) {
    categorySelect.addEventListener('change', () => {
      const category = categorySelect.value;
      if (!category) return;

      mealsSection.style.display = 'block';
      recipeSection.style.display = 'none';

      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals));
    });
  }


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
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
          <button class="view-btn" data-id="${meal.idMeal}">View Recipe</button>
        </div>`;
    });

    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        recipeSection.style.display = 'block';
        viewRecipe(btn.dataset.id);
      });
    });

    document.querySelectorAll('.fav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        saveFavorite({
          meal_id: btn.dataset.id,
          meal_name: btn.dataset.name,
          meal_thumb: btn.dataset.thumb
        });
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
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <p>${meal.strInstructions}</p>`;
      });
  }


});
