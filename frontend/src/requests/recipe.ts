import axios from 'axios';
import { Recipe } from '../models/recipe';
import Cookies from 'js-cookie';

const getToken = () => {
  return Cookies.get("jwt");
}

export const getRecipes = async ():Promise<Recipe[]> => {
  const token = getToken();
  console.log(token)

  const response = await axios.get("https://localhost:7061/api/Recipes", {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  });
  console.log(response.data);
  return response.data;
}