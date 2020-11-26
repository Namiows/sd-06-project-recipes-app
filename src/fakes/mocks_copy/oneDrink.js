const oneDrink = {
  drinks: [
    {
      idDrink: '178319',
      strDrink: 'Aquamarine',
      strDrinkAlternate: null,
      strDrinkES: null,
      strDrinkDE: null,
      strDrinkFR: null,
      'strDrinkZH-HANS': null,
      'strDrinkZH-HANT': null,
      strTags: null,
      strVideo: null,
      strCategory: 'Cocktail',
      strIBA: null,
      strAlcoholic: 'Alcoholic',
      strGlass: 'Martini Glass',
      strInstructions: 'Shake well in a shaker with ice.\r\nStrain in a martini glass.',
      strInstructionsES: null,
      strInstructionsDE: null,
      strInstructionsFR: null,
      'strInstructionsZH-HANS': null,
      'strInstructionsZH-HANT': null,
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      strIngredient1: 'Hpnotiq',
      strIngredient2: 'Pineapple Juice',
      strIngredient3: 'Banana Liqueur',
      strIngredient4: '',
      strIngredient5: '',
      strIngredient6: '',
      strIngredient7: '',
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: '2 oz',
      strMeasure2: '1 oz',
      strMeasure3: '1 oz',
      strMeasure4: '',
      strMeasure5: '',
      strMeasure6: '',
      strMeasure7: '',
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strCreativeCommonsConfirmed: 'No',
      dateModified: null,
    },
  ],
};

const drink = oneDrink.drinks[0];

export const mealIngredientsAndMeasure = (
  Object
    .keys(drink)
    .filter((detail) => {
      const ingredientPattern = /strIngredient\d/i;

      const detailIsIngredient = (
        ingredientPattern.test(detail)
      );

      // makes sure we only have filled ingredients
      if (detailIsIngredient) {
        return drink[detail];
      }

      return false;
    })
    .map((ingredientKey) => {
      const everyNonDigitChar = /[^\d]/g;
      const ingredientNumber = ingredientKey.replace(everyNonDigitChar, '');

      const matchingMeasure = `strMeasure${ingredientNumber}`;

      const ingredient = drink[ingredientKey];
      const measure = drink[matchingMeasure];

      const displayFormat = `${ingredient} - ${measure}`;

      return displayFormat;
    })
);

export default oneDrink;
