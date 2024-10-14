using backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DbSet<Recipe> Recipes { get; set; }

    }
}
