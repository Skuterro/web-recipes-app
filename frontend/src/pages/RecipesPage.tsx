import { Layout } from "../components/layout/Layout";
import { useEffect, useState } from "react";
import { Recipe } from "../models/recipe";
import { getRecipes } from "../requests/recipe";
import { Wrapper } from "../components/layout/Wrapper";
import { useNavigate } from "react-router-dom";
import { RecipeModal } from "../components/UI/RecipeModal";

interface RecipeCardProps {
  name: string;
  description: string;
  author: string;
  category: string;
  image?: string | null;
}

interface RecipesListProps {
  children: React.ReactNode;
}

const categories = ["All", "Pasta", "Fast Food", "Vege", "Undefined"];

export const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null); // Stan dla wybranego przepisu
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Stan otwarcia modala

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;
    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNavigate = () => {
    navigate("/recipes/create");
  };

  const handleFetchRecipes = async () => {
    const data = await getRecipes();
    setRecipes(data);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setSelectedRecipe(null); 
  };

  useEffect(() => {
    handleFetchRecipes();
  }, []);

  return (
    <Layout>
      <Wrapper>
        <section className="min-h-[60vh]">
          <div className="flex justify-center mt-10">
            <button
              className="px-12 py-2 text-black text-xl border-black border-2 rounded-2xl 
              hover:text-white hover:bg-orange-500 hover:border-white transition-colors duration-500 ease-in-out"
              onClick={handleNavigate}
            >
              Create a recipe
            </button>
          </div>
          <div className="max-w-6xl mx-auto my-10">
            <div className="mb-4 flex gap-6">
              <label htmlFor="category-filter" className="mr-2 font-semibold">
                Filter by category:
              </label>

              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded p-2"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <label htmlFor="search" className="mr-2 font-semibold">
                Search by name:
              </label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded p-2"
                placeholder="Search recipes..."
              />
            </div>

            <RecipesList>
              {filteredRecipes.length === 0 && <span>No recipes to show!</span>}
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  name={recipe.name}
                  description={recipe.description}
                  author={recipe.author}
                  category={recipe.category}
                  image={recipe.imageData}
                  onClick={() => handleRecipeClick(recipe)}
                  />
              ))}
            </RecipesList>
          </div>
        </section>
        <RecipeModal
          isOpen={isModalOpen}
          onClose={closeModal}
          recipe={selectedRecipe}
        />
      </Wrapper>
    </Layout>
  );
};

const RecipeCard = ({
  name,
  description,
  author,
  category,
  image,
  onClick,
}: RecipeCardProps & { onClick: () => void}) => {

  return (
    <li
      className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
      onClick={onClick}
    >
      {image && (
        <img
          src={`data:image/jpeg;base64,${image}`}
          alt={name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-700">{description}</p>
      <p className="text-gray-700">{category}</p>
      <p className="text-gray-500">
        <em>By: {author}</em>
      </p>
    </li>
  );
};

const RecipesList = ({ children }: RecipesListProps) => {
  return <ul className="grid grid-cols-3 gap-4 list-none p-0">{children}</ul>;
};
