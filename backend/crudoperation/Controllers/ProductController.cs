﻿using crudoperation.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace crudoperation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductContext _dbContext;
        public ProductController(ProductContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            if (_dbContext.Products == null)
            {
                return NotFound();
            }
          
            return await _dbContext.Products.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            if (_dbContext == null)
            {
                return NotFound();
            }
            var product = await _dbContext.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            var category = await _dbContext.Categories.FindAsync(product.categoryID);

            if (category == null)
            {
                // If the provided category Id does not exist, return BadRequest or handle the error accordingly
                return BadRequest("Invalid category Id");
            }
            product.categoryID = category.Id;
            _dbContext.Products.Add(product);
            await _dbContext.SaveChangesAsync();
            return product;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.ID)
            {
                return BadRequest();
            }

            // Check if the product exists before updating
            var existingProduct = await _dbContext.Products.FindAsync(id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            // Update the existing product fields
            existingProduct.name = product.name;
            existingProduct.Quantity = product.Quantity;
            existingProduct.categoryID = product.categoryID; // Assign the new categoryID

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductAvailable(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        private bool ProductAvailable(int id)
        {
            return (_dbContext.Products?.Any(x => x.ID == id)).GetValueOrDefault();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (_dbContext.Products == null)
            {
                return NotFound();
            }
            var product = await _dbContext.Products.FindAsync(id);
            if(product == null)
            {
                return NotFound();
            }
            _dbContext.Products.Remove(product);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Product>>> GetSearchedProducts(string searchQuery)
        {
            if (_dbContext.Products == null)
            {
                return NotFound();
            }
            if (string.IsNullOrWhiteSpace(searchQuery))
            {
                return BadRequest("Search query cannot be empty.");
            }
            var filteredProducts = await _dbContext.Products
           .Where(p => EF.Functions.Like(p.name, $"%{searchQuery}%"))
           .ToListAsync();


            return Ok(filteredProducts);

        }
        [HttpGet("quantityGreaterThan")]
        public async Task<ActionResult<IEnumerable<Product>>> GetQuantity(int threshold)
        {
            var product = await _dbContext.Products.Where(p => p.Quantity >= threshold).ToListAsync();
            return Ok(product);
        }
        [HttpGet("productbycategory")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(int categoryId)
        {

            var products = await _dbContext.Products
    .Where(p => p.categoryID == categoryId)
    .Select(p => new
    {
        p.ID,
        p.name,
        p.Quantity
        // Exclude category property
    })
    .ToListAsync();
            return Ok(products);
        }
       /* [HttpGet("productbycategoryName")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductByCategoryName(string categoryName)
        {
            var products=await _dbContext.Products.Where(p=>p.category.Name == categoryName).ToListAsync();
            return Ok(products);
        }*/
    }
}
