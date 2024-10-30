using System.ComponentModel.DataAnnotations;

namespace backend.models
{
    public class CreateRecipeDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string UserId { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;
        public List<string> Ingredients { get; set; } = new List<string>();
        public IFormFile? Image { get; set; }
    }
}
