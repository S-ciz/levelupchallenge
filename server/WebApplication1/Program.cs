using System.Collections;
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") //for my react local session
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowReactApp");
app.UseHttpsRedirection();

var filePath = "graduates.json";


var graduates = LoadGraduates(filePath) ?? new ArrayList();

// API Endpoints
app.MapGet("/graduate", () =>
{
    return graduates;
}).WithName("GetGraduates");

app.MapGet("/graduate/{id}", (string id) =>
{
    var graduate = graduates.Cast<Graduate>().FirstOrDefault(g => g.graduateId == id);
    return graduate != null ? Results.Ok(graduate) : Results.NotFound(new { message = "Graduate not found" });
}).WithName("GetGraduate");

app.MapPost("/graduate", (Graduate grad) =>
{
    var newGraduate = grad with { graduateId = Guid.NewGuid().ToString() };
    graduates.Add(newGraduate);
    SaveGraduates(filePath, graduates);
    return Results.Created($"/graduate/{newGraduate.graduateId}", newGraduate);
}).WithName("PostGraduate");

app.MapPut("/graduate/{id}", (string id, Graduate grad) =>
{
    var index = graduates.Cast<Graduate>().ToList().FindIndex(g => g.graduateId == id);
    if (index >= 0)
    {
        var updatedGraduate = grad with { graduateId = id };
        graduates[index] = updatedGraduate;
        SaveGraduates(filePath, graduates);
        return Results.Ok(updatedGraduate);
    }
    return Results.NotFound(new { message = "Graduate not found" });
}).WithName("PutGraduate");

app.MapDelete("/graduate/{id}", (string id) =>
{
    var graduate = graduates.Cast<Graduate>().FirstOrDefault(g => g.graduateId == id);
    if (graduate != null)
    {
        graduates.Remove(graduate);
        SaveGraduates(filePath, graduates);
        return Results.Ok(new { message = "Graduate successfully deleted" });
    }
    return Results.NotFound(new { message = "Graduate not found" });
}).WithName("DeleteGraduate");

app.Run();

// Helper functions
static ArrayList LoadGraduates(string filePath)
{
    if (File.Exists(filePath))
    {
        var json = File.ReadAllText(filePath);
        var graduates = JsonSerializer.Deserialize<List<Graduate>>(json);
        return new ArrayList(graduates);
    }
    return null;
}

static void SaveGraduates(string filePath, ArrayList graduates)
{
    var json = JsonSerializer.Serialize(graduates.Cast<Graduate>().ToList());
    File.WriteAllText(filePath, json);
}

record Graduate(
    string graduateId,
    string firstName,
    string lastName,
    string userName,
    string emailAddress,
    string dateOfBirth,
    int age,
    string cell,
    string dateCreated,
    string dateEdited,
    bool isDeleted
);
