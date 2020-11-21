import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Food.css';

function FoodTest() {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategories, setCurrentCategories] = useState('');
  const [currentMeals, setCurrentMeals] = useState([]);

  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const urlCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const urlMealsCategories = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${currentCategories}`;

  useEffect(() => {
    const fecthMeals = async () => {
      const APIRequest = await fetch(url);
      const APIResponse = await APIRequest.json();
      if (APIResponse !== null) {
        setMeals(APIResponse.meals);
      }
    };
    fecthMeals();

    const fecthCategory = async () => {
      const APIRequestCategory = await fetch(urlCategories);
      const APIResponseCategory = await APIRequestCategory.json();
      if (APIResponseCategory !== null) {
        setCategories(APIResponseCategory.meals);
      }
    };
    fecthCategory();
  }, []);

  useEffect(() => {
    const fecthMealsCategory = async () => {
      const APIRequestMealsCategory = await fetch(urlMealsCategories);
      const APIResponseMealsCategory = await APIRequestMealsCategory.json();
      if (APIResponseMealsCategory !== null) {
        setCurrentMeals(APIResponseMealsCategory.meals);
      }
    };
    fecthMealsCategory();
  }, [currentCategories]);

  const firstMeal = 0;
  const limitMeal = 12;
  const limitCategory = 5;

  const renderMeals = () => {
    if (currentCategories === '') {
      return meals.slice(firstMeal, limitMeal).map((meal, id) => (
        <div
          key={ id }
          className="recipe-card"
          data-testid={ `${id}-recipe-card` }
          value={ meal.strCategory }
        >
          <img
            className="card-img"
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
            data-testid={ `${id}-card-img` }
          />
          <h3 data-testid={ `${id}-card-name` }>{meal.strMeal}</h3>
        </div>
      ));
    } if (currentMeals) {
      return currentMeals
        .slice(firstMeal, limitMeal).map((meal, id) => (
          <div
            key={ id }
            className="recipe-card"
            data-testid={ `${id}-recipe-card` }
            value={ meal.strCategory }
          >
            <img
              className="card-img"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${id}-card-img` }
            />
            <p data-testid={ `${id}-card-name` }>{meal.strMeal}</p>
          </div>
        ));
    }
  };

  const handleClickCategory = ({ target: { value } }) => {
    setCurrentCategories(value);
  };

  return (
    <div className="food-container">
      <Header title="Comidas" />
      {
        categories.slice(firstMeal, limitCategory).map((category, id) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            key={ id }
            type="button"
            value={ category.strCategory }
            onClick={ handleClickCategory }
          >
            {category.strCategory}
          </button>))
      }
      {
        renderMeals()
      }
      <Footer />
    </div>
  );
}

export default FoodTest;
