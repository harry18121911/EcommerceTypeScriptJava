package com.harry.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import com.harry.backend.models.Product;
import com.harry.backend.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    
    }

    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    @Override
    public Product getProduct(int id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public Boolean existsProduct(String name) {
        return productRepository.existsByName(name);
    }

    @Override
    public Boolean deleteProduct(int id) {

        Product product = productRepository.findById(id).orElse(null);
        if(!ObjectUtils.isEmpty(product)){
            productRepository.delete(product);
            return true;
        }
        return false;
    }

    @Override
    public Product patchProduct(Product product) {

        Product oldProduct = productRepository.findById(product.getId()).orElse(null);

        if(!ObjectUtils.isEmpty(oldProduct)){
            if(product.getName()!=null){
                oldProduct.setName(product.getName());
            }
            if(product.getDescription()!=null){
                oldProduct.setDescription(product.getDescription());
            }
            if(product.getImage()!=null){
                oldProduct.setImage(product.getImage());
            }
            if(product.getPrice()!=null){
                oldProduct.setPrice(product.getPrice());
            }
            if(product.getStock()!=-1){
                oldProduct.setStock(product.getStock());
            }
        }

        Product newProduct = productRepository.save(oldProduct);

        return newProduct;
    }

}
