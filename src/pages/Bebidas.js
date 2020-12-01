import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import ReceitasContext from '../context/ReceitasContext';
import DrinksCard from '../components/DrinksCard';
import DrinkFilters from '../components/DrinkFilters';
import { drinkAPI, drinkCategoryApi } from '../services/drinkAPI';
import logo from '../images/myfood.png';
import '../style/Loading.css';

function Bebidas() {
  const { searchBox, drinks, setDrinks, setFiltersData } = useContext(ReceitasContext);

  const location = useLocation();
  const doze = 12;

  useEffect(() => {
    async function fetchDrink() {
      const data = await drinkCategoryApi();
      const responseDrinksAPI = await drinkAPI();

      setFiltersData(data);
      setDrinks(responseDrinksAPI);
    }
    if (!drinks.length) {
      fetchDrink();
    }
  }, []);

  return !drinks.length ? (
    <div>
      <img src={ logo } alt="teste" className="loading" />
    </div>
  ) : (
    <section>
      <Header title="Bebidas" searchBtn />
      {searchBox && <SearchBar />}
      <div className="my-4 py-2">
        <DrinkFilters />
        <div className="row">
          {drinks
            .filter((x, index) => index < doze)
            .map((drink, i) => (
              <DrinksCard key={ i } drink={ drink } index={ i } />
            ))}
        </div>
      </div>
      {location.pathname === '/bebidas' && <Footer />}
    </section>
  );
}

export default Bebidas;
