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
        <div className="h-[30vh]"></div>
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
    <li className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-700">{description}</p>
      <p className="text-gray-500"><em>By: {author}</em></p>
    </li>
  );
};

const RecipesList = ({
  children
}: RecipesListProps) => {
  return (
    <ul className="grid grid-cols-3 gap-4 list-none p-0">
      {children}
    </ul>    
  );
};
