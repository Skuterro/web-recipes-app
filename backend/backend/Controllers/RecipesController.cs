using backend.Entities;
using backend.IService;
using backend.models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly IRecipeService recipeService;


        //TODO przerobić aby było cacy
        public RecipesController(IRecipeService recipeService)
        {
            this.recipeService = recipeService;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Recipe>>> getRecipes()
        {
            var recipes = await recipeService.GetRecipesAsync();
            
            return Ok(recipes);
        }


        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<Recipe>>> getUserRecipes(string userId)
        {
            var recipes = await recipeService.GetUserRecipesAsync(userId);

            return Ok(recipes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Recipe>> getRecipeById(Guid id)
        {
            var recipe = await recipeService.GetRecipeByIdAsync(id);   

            return Ok(recipe);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<ActionResult<Recipe>> addRecipe(CreateRecipeDto recipeDto)
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
