using backend.data;
using backend.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly DataContext db;

        public RecipesController(DataContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<Recipe>>> getRecipes()
        {
            var recipes = await db.Recipes.ToListAsync();
            
            return Ok(recipes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Recipe>> getRecipeById(Guid id)
        {
            var recipe = await db.Recipes.FindAsync(id);

            if (recipe == null)
            {
                return NotFound("Recipe does not exist.");
            }

            return Ok(recipe);
        }

        [HttpPost]
        public async Task<ActionResult<Recipe>> addRecipe([FromForm] RecipeCreateDto recipeDto)
        {
            byte[]? imageData = null;

            if (recipeDto.Image != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await recipeDto.Image.CopyToAsync(memoryStream);

                    imageData = memoryStream.ToArray();
                }
            }

            var recipe = new Recipe
            {
                Id = Guid.NewGuid(),
                Name = recipeDto.Name,
                Author = recipeDto.Author,
                Description = recipeDto.Description,
                Category = recipeDto.Category,
                Ingredients = recipeDto.Ingredients,
                ImageData = imageData
            };

            db.Recipes.Add(recipe);

            await db.SaveChangesAsync();

            return Ok(recipe);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> deleteRecipe(int id)
        {
            var recipe = await db.Recipes.FindAsync(id);
            
            if(recipe == null)
            {
                return NotFound("Recipe does not exist.");
            }

            db.Recipes.Remove(recipe);
            await db.SaveChangesAsync();
            
            return NoContent();
        }
    }
}
