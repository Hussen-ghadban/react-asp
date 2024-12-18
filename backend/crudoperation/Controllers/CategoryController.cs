using crudoperation.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace crudoperation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ProductContext _dbContext;
        public CategoryController(ProductContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategorys()
        {
            if (_dbContext.Categories == null)
            {
                return NotFound();
            }

            return await _dbContext.Categories.ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<Category>> PostBrand(Category category)
        {
            _dbContext.Categories.Add(category);
            await _dbContext.SaveChangesAsync();
            return category;
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            if (_dbContext.Categories == null)
            {
                return NotFound();
            }
            var category = await _dbContext.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            _dbContext.Categories.Remove(category);
            await _dbContext.SaveChangesAsync();
            return Ok();

        }

    }
}
