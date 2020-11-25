import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import RecipeContext from '../context/RecipeContext';
import CardBebida from '../components/CardBebida';
import FetchApiBebidas, { fetchApiBebidasByCategory } from '../services/FetchApiBebidas';

function Bebidas() {
  const [categoriaAtual, setCategoriaAtual] = useState('');
  const {
    retornoApiBebidas,
    categoriesBebida,
    setRetornoApiBebidas,
  } = useContext(RecipeContext);

  const zero = 0;
  const doze = 12;
  const cinco = 5;

  async function renderAll() {
    const response = await FetchApiBebidas('2', '');
    setRetornoApiBebidas(response);
  }

  async function renderCategory(category) {
    const response = await fetchApiBebidasByCategory(category);
    setRetornoApiBebidas(response);
  }

  return (
    <div>
      <Header title="Bebidas" />
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ renderAll }
        >
          All
        </button>
        {categoriesBebida
          && categoriesBebida.slice(zero, cinco).map((category, index) => (
            <button
              key={ index }
              type="button"
              id="filterButton"
              value={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => {
                if (categoriaAtual === '') {
                  renderCategory(category.strCategory);
                  setCategoriaAtual(category.strCategory);
                }
                if (categoriaAtual === category.strCategory) {
                  renderAll();
                  setCategoriaAtual(category.strCategory);
                }
                if (categoriaAtual !== category.strCategory) {
                  renderCategory(category.strCategory);
                  setCategoriaAtual(category.strCategory);
                }
              } }
            >
              { category.strCategory }
            </button>
          ))}
      </div>
      {
        retornoApiBebidas ? retornoApiBebidas.map((bebida, index) => {
          if (index < doze) {
            return CardBebida(bebida, index);
          }
          return undefined;
        })
        // eslint-disable-next-line no-alert
          : alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      }
      <MenuInferior />
    </div>
  );
}

export default Bebidas;
