using backend.models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly RecipeService recipeService;

        public RecipesController(RecipeService recipeService)
        {
            this.recipeService = recipeService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Recipe>>> getRecipes()
        {
            var recipes = await recipeService.GetRecipesAsync();
            
            return Ok(recipes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Recipe>> getRecipeById(Guid id)
        {
            var recipe = await recipeService.GetRecipeByIdAsync(id);   

            return Ok(recipe);
        }

        [HttpPost]
        public async Task<ActionResult<Recipe>> addRecipe([FromForm] RecipeCreateDto recipeDto)
        { 
            var recipe = await recipeService.AddRecipeAsync(recipeDto);
        
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> deleteRecipe(Guid id)
        {
            var recipe = await recipeService.DeleteRecipeAsync(id);
            
            return NoContent();
        }
    }
}
