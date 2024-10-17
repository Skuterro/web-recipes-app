using backend.models;

namespace backend.IService
{
    public interface IRecipeService
    {
        Task<List<Recipe>> GetRecipesAsync();
        Task<Recipe?> GetRecipeByIdAsync(Guid id);
        Task<Recipe> AddRecipeAsync(RecipeCreateDto recipeDto);
        Task<bool> DeleteRecipeAsync(Guid id);
    }
}
