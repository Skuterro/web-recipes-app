import { useState } from "react"
import { Recipe } from "../models/recipe";
import axios from 'axios';
import { Layout } from "../components/layout/Layout";

interface CreateRecipeForm {
  name: string;
  author: string;
  description: string;
}

export const CreateRecipePage = () => {
  const[recipes, setRecipes] = useState<Recipe[]>([]);

  const handleCreate = async(values:CreateRecipeForm) => {

    const recipe = {
      name: values.name,
      description: values.description,
      author: values.author
    };
  
  //const response = await axios.post("");
  };

  return(
    <Layout>
      <section></section>
    </Layout>
  );

};