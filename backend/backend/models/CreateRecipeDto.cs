namespace backend.models
{
    public class CreateRecipeDto
    {
        public string Name { get; set; } = null!;
        public string Author { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Category { get; set; } = null!;
        public List<string> Ingredients { get; set; } = new List<string>();
        public IFormFile? Image { get; set; }
    }
}
