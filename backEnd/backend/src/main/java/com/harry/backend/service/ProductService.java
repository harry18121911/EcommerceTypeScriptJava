package com.harry.backend.service;

import java.util.List;

import com.harry.backend.models.Product;

public interface ProductService {

    public Product saveProduct(Product product);
 
    public List<Product> getAllProduct();
    
    public Product getProduct(int id);

    public Boolean existsProduct(String name);

    public Boolean deleteProduct(int id);
    
    public Product patchProduct(Product product);
}
