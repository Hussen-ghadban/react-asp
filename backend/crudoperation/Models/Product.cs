namespace crudoperation.Models
{
    public class Product
    {
        public int ID { get; set; }
        public string name { get; set; }
        public Category category { get; set; }
        public double Quantity { get; set; }

    }
}
