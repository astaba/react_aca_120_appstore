import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchMeals() {
      setError(null);
      try {
        const response = await fetch(
          "https://app-store-6bb68-default-rtdb.firebaseio.com/meals.json"
        );
        if (!response.ok) {
          throw new Error("Data not found, please try again later");
        }
        const data = await response.json();
        // console.log(data);
        const MEALS_DATA = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        console.log(MEALS_DATA);
        setMeals(MEALS_DATA);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
    fetchMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.mealError}>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem key={meal.id} {...meal} />
          ))}
        </ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
