using Microsoft.AspNetCore.Identity;

namespace backend.Entities
{
    public class User : IdentityUser
    {
        public ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();
    }
}
