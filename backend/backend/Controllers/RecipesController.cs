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
    }
}
