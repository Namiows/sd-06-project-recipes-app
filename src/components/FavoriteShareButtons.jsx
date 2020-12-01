import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import CopyToClipBoard from './CopyToClipBoard';

function FavoriteButton({ recipe, type }) {
  const { favoriteRecipes, setFavoriteRecipes,
    isFetching, setIsFetching } = useContext(ReceitasContext);
  const textTime = 3000;
  const [copied, setClipboard] = CopyToClipBoard(textTime);

  // Configuração de chaves e id conforme tipo da receita
  // const keyByType = (type === 'meal') ? 'meals' : 'cocktails';
  const id = recipe[`id${(type === 'meal') ? 'Meal' : 'Drink'}`];
  const urlByType = (type === 'meal') ? 'comidas' : 'bebidas';

  const [isFavorite, setIsFavorite] = useState('');

  // Ao clicar no coração
  const checkFavorite = () => setIsFavorite((prevState) => !prevState);

  // Ao montar
  useEffect(() => {
    setIsFetching(true);
    const favoriteRecipesLS = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const recipesInFavorite = (favoriteRecipesLS !== null)
      ? favoriteRecipesLS : favoriteRecipes;

    const recipeIsAlreadyFavorite = recipesInFavorite
      .map((eachRecipe) => eachRecipe.id).find((eachId) => eachId === id) === id;

    setIsFavorite(recipeIsAlreadyFavorite);
    setIsFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Atualiza o estado global que o estado local mudar
  useEffect(() => {
    if (isFavorite) {
      setFavoriteRecipes((prevState) => {
        const zero = 0;
        const favoritedRecipe = prevState
          .find((eachRecipe) => eachRecipe.id === id);
        const favoriteIndex = prevState.indexOf(favoritedRecipe);
        return ([
          ...prevState.slice(zero, favoriteIndex),
          {
            id,
            type: type === 'meal' ? 'comida' : 'bebida',
            area: recipe.strArea,
            category: recipe.strCategory,
            alcoholicOrNot: type === 'meal' ? '' : recipe.strAlcoholic,
            name: recipe[`str${(type === 'meal') ? 'Meal' : 'Drink'}`],
            image: recipe[`str${(type === 'meal') ? 'Meal' : 'Drink'}Thumb`],
            doneDate: new Date(),
            tags: recipe.strTags,
          },
          ...prevState.slice(favoriteIndex + 1),
        ]);
      });
    } else {
      setFavoriteRecipes((prevState) => {
        const zero = 0;
        const favoritedRecipe = prevState
          .find((eachRecipe) => eachRecipe.id === id);
        const favoriteIndex = prevState.indexOf(favoritedRecipe);
        return ([
          ...prevState.slice(zero, favoriteIndex),
          ...prevState.slice(favoriteIndex + 1),
        ]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavorite]);

  if (favoriteRecipes !== [] && isFavorite !== '') {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }

  return (
    <section className="detalhes-buttons">
      <button
        data-testid="share-btn"
        type="button"
        className="detalhes-share"
        onClick={ () => setClipboard(`/${urlByType}/${id}`) }
      >
        <img src={ shareIcon } alt="compartilhe" />
        { copied ? <p>Link copiado!</p> : true }
      </button>
      {!isFetching
      && (
        <button
          data-testid="favorite-btn"
          type="button"
          className="detalhes-fav"
          onClick={ checkFavorite }
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        >
          <img
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="compartilhe"
          />
        </button>
      )}
    </section>
  );
}

FavoriteButton.propTypes = {
  recipe: propTypes.objectOf(propTypes.string).isRequired,
  type: propTypes.string.isRequired,
};

export default FavoriteButton;
