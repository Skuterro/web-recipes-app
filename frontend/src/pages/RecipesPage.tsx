import { Layout } from "../components/layout/Layout";
import { useEffect, useState } from "react";
import { Recipe } from "../models/recipe";
import { getRecipes } from "../requests/recipe";


interface RecipeCardProps{
  name: string;
  description: string;
  author: string;
  category: string;
}

interface RecipesListProps{
  children: React.ReactNode;
}

const categories = ["All", "Pasta", "Fast Food", "Vege"];

export const RecipesPage = () => {

	const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredRecipes =
  selectedCategory === "All"
    ? recipes
    : recipes.filter((recipe) => recipe.category === selectedCategory);

  const handleFetchRecipes = async () => {
    const data = await getRecipes();
    setRecipes(data);
    console.log(data);
  }

  useEffect(() => {
    handleFetchRecipes();
  },[])

	return (
		<Layout>
			<section>
        <div className="max-w-6xl mx-auto my-10">
        <div className="mb-4">
            <label htmlFor="category-filter" className="mr-2 font-semibold">
              Filter by category:
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)} // Ustaw wybraną kategorię
              className="border rounded p-2"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <RecipesList>
            {filteredRecipes.length === 0 && (
              <span>No recipes to show!</span>)}
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                name={recipe.name}
                description={recipe.description}
                author={recipe.author}
                category={recipe.category}
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
  author,
  category
}: RecipeCardProps) => {
  return (
    <li className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-700">{description}</p>
      <p className="text-gray-700">{category}</p>
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
