import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';
import { listIngredients, foodAPI } from '../services/foodAPI';

const ExplorarComidasIng = () => {
  const {
    setMeals,
    ingredientList,
    setIngredientList,
    setStopApi,
  } = useContext(ReceitasContext);

  useEffect(() => {
    listIngredients().then((response) => setIngredientList(response));
    setMeals([{ teste: 'teste' }]);
  }, []);
  console.log(ingredientList);
  const zero = 0;
  const twelve = 12;

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div className="row mb-5 mt-5 pt-3">
        {ingredientList
          && ingredientList.slice(zero, twelve).map((ingred, index) => (
            <Link
              to="/comidas"
              data-testid={ `${index}-ingredient-card` }
              className="col-6 mb-3"
              key={ ingred.strIngredient }
              onClick={ () => {
                foodAPI('ingredient', ingred.strIngredient)
                  .then((response) => setMeals(response));
                setStopApi(true);
              } }
            >
              <div className="card shadow-sm bg-white rounded">
                <img
                  data-testid={ `${index}-card-img` }
                  className="card-img-top"
                  src={ `https://www.themealdb.com/images/ingredients/${ingred.strIngredient}-Small.png` }
                  alt={ ingred.strIngredient }
                />
                <div className="card-body">
                  <h5 className="card-title mb-0" data-testid={ `${index}-card-name` }>
                    {ingred.strIngredient}
                  </h5>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default ExplorarComidasIng;
