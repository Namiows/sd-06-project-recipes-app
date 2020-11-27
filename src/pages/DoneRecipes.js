import React, { useEffect, useState } from 'react';

import '../css/Cards.css';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [copy, setCopy] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (storage) {
      if (filter === '') {
        setRecipes(storage);
      } else if (filter === 'Food') {
        const filtered = storage.filter((item) => item.type === 'comida');
        setRecipes(filtered);
      } else if (filter === 'Drink') {
        const filtered = storage.filter((item) => item.type === 'bebida');
        setRecipes(filtered);
      }
    }
  }, [filter]);

  function handleCopy(type, id) {
    const link = `${window.location.origin}/${type}s/${id}`;
    navigator.clipboard.writeText(link);
    setCopy('Link copiado!');
  }

  const maxTags = 2;

  return (
    <section>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('Food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('Drink') }
      >
        Drinks
      </button>

      { (recipes)
        ? (
          <section className="cards-wrapper">
            { recipes.map((recipe, index) => (
              <section key={ recipe.id } className="item-card">
                <img
                  src={ recipe.image }
                  data-testid={ `${index}-horizontal-image` }
                  alt="card"
                />
                <h4 data-testid={ `${index}-horizontal-top-text` }>
                  { (recipe.type === 'bebida')
                    ? recipe.alcoholicOrNot
                    : `${recipe.area} - ${recipe.category}` }
                </h4>
                <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
                <span data-testid={ `${index}-horizontal-done-date` }>
                  { recipe.doneDate }
                </span>

                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  value="Share"
                  onClick={ () => handleCopy(recipe.type, recipe.id) }
                  src={ shareIcon }
                >
                  <img alt="Share" src={ shareIcon } />
                </button>
                <span>{copy}</span>
                { (recipe.tags !== null)
                  && (Array.isArray(recipe.tags))
                  ? recipe.tags.map((tag, innerIndex) => (
                    (innerIndex < maxTags) ? (
                      <h4
                        key={ tag }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        { tag }
                      </h4>
                    )
                      : null
                  ))
                  : recipe.tags }
              </section>
            )) }
          </section>
        )
        : <div>Loading. . .</div> }
    </section>
  );
}
