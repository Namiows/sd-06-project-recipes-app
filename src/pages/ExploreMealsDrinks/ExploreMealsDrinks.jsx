import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../../context/Context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getMealsAPI, getDrinksApi } from '../../services/API';

const ExploreMealsDrinks = (props) => {
  const { location: { pathname } } = props;
  const {
    pageTitle,
    recipes,
    setRecipes,
    setLoading,
  } = useContext(Context);
  const [randomId, setRandomId] = useState('');
  const zero = 0;

  const randomRecipe = () => {
    const getRandom = Math.ceil(Math.random() * (recipes.length - 1));
    if (recipes.length > zero && pageTitle === 'Explorar Comidas') {
      setRandomId(`/comidas/${recipes[getRandom].idMeal}`);
      // setRandomId('/comidas/52771');
    }
    if (recipes.length > zero && pageTitle === 'Explorar Bebidas') {
      setRandomId(`/bebidas/${recipes[getRandom].idDrink}`);
      // setRandomId('/bebidas/178319');
    }
  };

  useEffect(() => {
    if (pageTitle === 'Explorar Comidas') {
      setLoading(true);
      getMealsAPI().then((data) => {
        setRecipes(data);
        setLoading(false);
      });
    } else if (pageTitle === 'Explorar Bebidas') {
      setLoading(true);
      getDrinksApi().then((data) => {
        setRecipes(data);
        setLoading(false);
      });
    }
    randomRecipe();
  }, [pageTitle]);

  useEffect(() => {
    randomRecipe();
  }, [recipes]);

  return (
    <div>
      <Header pathname={ pathname } />
      {pathname !== '/receitas-feitas'
      && pathname !== '/receitas-favoritas'
      && <Footer pathname={ pathname } />}
      <Link
        to={ `${pathname}/ingredientes` }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>
      { pageTitle === 'Explorar Comidas' && (
        <Link
          to={ `${pathname}/area` }
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </Link>
      )}
      <Link
        to={ `${randomId}` }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Link>
    </div>
  );
};

ExploreMealsDrinks.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  pathname: PropTypes.string.isRequired,
};

export default ExploreMealsDrinks;
