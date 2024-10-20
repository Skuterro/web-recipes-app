import { useEffect } from "react";
import { Recipe } from "../../models/recipe";


interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
}

export const RecipeModal = ({ isOpen, onClose, recipe }: RecipeModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !recipe) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-50"
    >
      <div
        className="bg-white p-6 rounded-lg max-w-lg w-full relative"
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          X
        </button>

        {recipe.imageData && (
          <img
            src={`data:image/jpeg;base64,${recipe.imageData}`}
            alt={recipe.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
        <p className="text-gray-700 mb-4">{recipe.description}</p>
        <p className="text-gray-700 mb-4">Category: {recipe.category}</p>
        <p className="text-gray-500">
          <em>By: {recipe.author}</em>
        </p>
      </div>
    </div>
  );
};
