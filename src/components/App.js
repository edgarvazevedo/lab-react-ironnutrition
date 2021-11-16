import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';

import foodsSrc from '../foods.json';

import Foodbox from './Foodbox';
import Form from './Form';
import SearchBar from './SearchBar';
import TodaysFoods from './TodaysFoods';

function App() {
  const [foodsBkp, setFoodsBkp] = useState(foodsSrc);
  const [foods, setFoods] = useState(foodsSrc);
  const [showForm, setShowForm] = useState(false);
  const [todaysFoods, setTodaysFoods] = useState([]);

  
  useEffect(() => {
    setFoods([...foodsBkp]);
  }, [foodsBkp]);

  function filterFoods(searchTerm) {
    

    const filtered = foodsBkp.filter((currentFoodObj) => {
      return (
        currentFoodObj.name
          .toLowerCase()
         
          .includes(searchTerm.toLowerCase())
      );
    });

    setFoods(filtered);
  }

  function addTodaysFood(foodObj) {
    if (
      todaysFoods.find((currentFoodObj) => currentFoodObj.name === foodObj.name)
    ) {
      const foodObjIndex = todaysFoods.findIndex(
        (currentFoodObj) => currentFoodObj.name === foodObj.name
      );

      const todaysFoodsClone = [...todaysFoods];

      const foodObjToUpdate = todaysFoodsClone[foodObjIndex];

      foodObjToUpdate.quantity = foodObjToUpdate.quantity + foodObj.quantity;

      return setTodaysFoods(todaysFoodsClone);
    }

    setTodaysFoods([...todaysFoods, foodObj]);
  }

  return (
    <div className="container">
      <h1 className="title">IronNutrition</h1>
      <div>
        <SearchBar filterFoods={filterFoods} />
      </div>
      <div className="column">
        <button
          onClick={() => setShowForm(!showForm)}
          className="button is-link"
        >
          Add Food
        </button>
        {showForm ? <Form foods={foodsBkp} setFoods={setFoodsBkp} /> : null}
      </div>

      <div className="columns">
        <div className="column">
          {foods.map((currentFoodObj) => (
            <Foodbox
              key={currentFoodObj.name}
              name={currentFoodObj.name}
              calories={currentFoodObj.calories}
              image={currentFoodObj.image}
              addTodaysFood={addTodaysFood}
            />
          ))}
        </div>
        <div className="column content">
          <TodaysFoods todaysFoods={todaysFoods} />
        </div>
      </div>
    </div>
  );
}

export default App;
