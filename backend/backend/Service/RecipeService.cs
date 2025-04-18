﻿using backend.data;
using backend.Entities;
using backend.IService;
using backend.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{

    public class RecipeService : IRecipeService
    {
        private readonly DataContext db;

        public RecipeService(DataContext db)
        {
            this.db = db;
        }

        public async Task<List<Recipe>> GetRecipesAsync()
        {
            return await db.Recipes.ToListAsync();
        }

        public async Task<Recipe?> GetRecipeByIdAsync(Guid id)
        {
            var recipe = await db.Recipes.FindAsync(id);

            if (recipe == null)
            {
                return null;
            }

            return recipe;
        }

        public async Task<Recipe> AddRecipeAsync(CreateRecipeDto recipeDto)
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

            var user = await db.Users.FindAsync(recipeDto.UserId);

            var recipe = new Recipe
            {
                Id = Guid.NewGuid(),
                Name = recipeDto.Name,
                UserId = recipeDto.UserId,
                Author = user,
                Description = recipeDto.Description,
                Category = recipeDto.Category,
                Ingredients = recipeDto.Ingredients,
                ImageData = imageData
            };

            user.Recipes.Add(recipe);

            db.Recipes.Add(recipe);
            await db.SaveChangesAsync();

            return recipe;
        }

        public async Task<bool> DeleteRecipeAsync(Guid id)
        {
            var recipe = await db.Recipes.FindAsync(id);

            if (recipe == null)
            {
                return false;
            }

            db.Recipes.Remove(recipe);
            await db.SaveChangesAsync();

            return true;
        }

        public async Task<List<Recipe>> GetUserRecipesAsync(string userId)
        {
            // Pobranie przepisów użytkownika
            var recipes = await db.Recipes
                .Where(r => r.UserId == userId)
                .ToListAsync();

            return recipes;
        }

    }
}
