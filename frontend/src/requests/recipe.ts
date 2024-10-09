import axios from 'axios';
import { Recipe } from '../models/recipe';

export const getRecipes = async ():Promise<Recipe[]> => {
  const response = await axios.get("http://localhost:");
  return response.data;
}