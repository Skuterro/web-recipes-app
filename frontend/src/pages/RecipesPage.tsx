import { Layout } from "../components/layout/Layout";
import { Children, useEffect, useState } from "react";

import { Recipe } from "../models/recipe";
import { getRecipes } from "../requests/recipe";
import { SiPanasonic } from "react-icons/si";

interface RecipeCardProps{
  name: string;
  description: string;
  author: string;
}

interface RecipesListProps{
  children: React.ReactNode;
}

export const RecipesPage = () => {

	const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleFetchRecipes = async () => {
    //const data = await getRecipes();
    //setRecipes(data);
    //console.log(data);
  }

  useEffect(() => {
    handleFetchRecipes();
  },[])

	return (
		<Layout>
			<section>
        <div>
          <RecipesList>
            {recipes.length === 0 && (
              <span>No recipes to show!</span>)}
            {recipes.map((recipe) => (
              <RecipeCard
                name={recipe.name}
                description={recipe.description}
                author={recipe.author}
              />
            ))}

          </RecipesList>
        </div>
			</section>
		</Layout>
  );
};

const RecipeCard = ({
  name,
  description,
  author
}: RecipeCardProps) => {
  return (
    <li>

    </li>
  )
}

const RecipesList = ({
  children
}: RecipesListProps) => {
  return (

    <ul>

    </ul>
    
  )
}
