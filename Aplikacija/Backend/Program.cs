using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using Backend.Models;
using Backend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IAccessTokenManager, AccessTokenManager>();
builder.Services.AddScoped<IPasswordManager, PasswordManager>();
builder.Services.AddScoped<IImageManager, ImageManager>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CORS",
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:8080",
                                              "http://localhost:7246",
                                              "http://localhost:3000",
                                              "https://localhost:8080",
                                              "http://127.0.0.1:8080",
                                              "https://127.0.0.1:8080",
                                              "https://127.0.0.1:5500",
                                              "http://127.0.0.1:5500",
                                              "http://127.0.0.1:5500",
                                              "http://localhost:5500",
                                              "https://localhost:5500",
                                              "http://192.168.1.35:3000",
                                              "http://192.168.100.2:3000")
                                              .AllowAnyHeader()
                                              .AllowAnyMethod();
                      });

});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["Jwt:Audience"],
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddDbContext<Context>(options =>
{
    options.UseSqlServer("name = ConnectionStrings:StudNetCS");
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.Urls.Add("https://localhost:7246");
    app.Urls.Add("http://localhost:5000");
    //app.Urls.Add("http://192.168.1.35:5000");
    //app.Urls.Add("https://192.168.1.35:7246");
    app.Urls.Add("http://192.168.100.2:5000");
    app.Urls.Add("https://192.168.100.2:7246");
    //  app.Urls.Add("http://192.168.1.101:5000");
    //  app.Urls.Add("https://192.168.1.101:7246");
}

//app.UseHttpsRedirection();

app.UseCors("CORS");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
