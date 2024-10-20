import axios from 'axios';
import { Recipe } from '../models/recipe';

export const getRecipes = async ():Promise<Recipe[]> => {
  const response = await axios.get("https://localhost:7061/api/Recipes");
  console.log(response.data);
  return response.data;
}