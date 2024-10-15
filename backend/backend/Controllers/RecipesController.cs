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
        public async Task<ActionResult<Recipe>> getRecipeById(int id)
        {
            var recipe = await db.Recipes.FindAsync(id);

            if (recipe == null)
            {
                return NotFound("Recipe does not exist.");
            }

            return Ok(recipe);
        }

        [HttpPost]
        public async Task<ActionResult<Recipe>> addRecipe([FromBody] Recipe recipe)
        {
            if (recipe == null)
            {
                return BadRequest("Invalid recipe body.");
            }

            db.Recipes.Add(recipe);
            await db.SaveChangesAsync();

            return CreatedAtAction(nameof(getRecipeById), new { id = recipe.Id }, recipe);
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
