using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entities
{
    public class Recipe
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Author { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Category { get; set; }

        public List<string> Ingredients { get; set; } = new List<string>();

        public byte[]? ImageData { get; set; }

        [NotMapped]
        public IFormFile? Image { get; set; }
    }
}
