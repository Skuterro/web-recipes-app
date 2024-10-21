using backend.data;
using Microsoft.EntityFrameworkCore;
using backend.Services;
using backend.IService;
using backend.models;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<RecipeService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend-react", policyBuilder =>
    {
        policyBuilder.WithOrigins("http://localhost:3000");
        policyBuilder.AllowAnyHeader();
        policyBuilder.AllowAnyMethod();
       
    });
});

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<DataContext>()
    .AddDefaultTokenProviders();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("frontend-react");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
