package com.harry.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.harry.backend.models.Category;
import com.harry.backend.models.Product;
import com.harry.backend.service.CategoryService;
import com.harry.backend.service.ProductService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin("*")
@RestController
public class Admin {

    @Autowired
    private CategoryService categoryService;

    @Autowired 
    private ProductService productService;

    //Category Controllers
    @GetMapping("/category")
    public ResponseEntity<List<Category>> getAllCategory() {
        List<Category> categoryList = categoryService.getAllCategory();

        return ResponseEntity.ok(categoryList);
    }

    @GetMapping("/categorybyid/{id}")
    public ResponseEntity<Category>categoryById(@PathVariable int id) {
        Category category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }
    

    @GetMapping("/category/{imageName}")
    public ResponseEntity<Resource> getImageForCategory(@PathVariable String imageName) throws Exception {

        Path path = Paths.get("backEnd/backend/target/classes/static/img/category_img/" + imageName);
        Resource resource = new UrlResource(path.toUri());
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resource);
    }

    @GetMapping("/product/{imageName}")
    public ResponseEntity<Resource> getImageForProduct(@PathVariable String imageName) throws Exception {

        Path path = Paths.get("backEnd/backend/target/classes/static/img/product_img/" + imageName);
        Resource resource = new UrlResource(path.toUri());
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resource);
    }


    @PostMapping("/savecategory")
    public ResponseEntity<String> saveCategory(@ModelAttribute Category category,
            @RequestParam("file") MultipartFile file, @RequestParam("isActive") String isActive) throws IOException {

        String imageName = file != null ? file.getOriginalFilename() : "default.jpg";
        Boolean isActiveParse = isActive.contains("true") ? true : false;

        category.setImageName(imageName);

        category.setIsActive(isActiveParse);

        Boolean existsCategory = categoryService.existsCategory(category.getName());

        if (existsCategory) {

            return ResponseEntity.accepted().body("Category Name Already exist");
        } else {
            Category saveCategory = categoryService.saveCategory(category);
            if (ObjectUtils.isEmpty(saveCategory)) {

                return ResponseEntity.internalServerError().body("Error in save category");
            } else {

                /* Server side image save just in case. */
                if (file == null) {
                    return ResponseEntity.internalServerError().body("file is null.");
                } else {

                    File saveFile = new ClassPathResource("static/img").getFile();
                    Path path = Paths.get(saveFile.getAbsolutePath() + File.separator + "category_img" + File.separator
                            + file.getOriginalFilename());

                    System.out.println(path);

                    Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                    return ResponseEntity.ok("Saved Successfully ");
                }
            }

        }

    }

    @DeleteMapping("/deletecategory/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable int id){
        Boolean deleteCategory = categoryService.deleteCategory(id);
        if(deleteCategory){
            return ResponseEntity.ok("Category deleted successfully.");
        }else{
            return ResponseEntity.ok("Something wrong");
        }
    }

    @PatchMapping("/patchcategory/{id}")
    public ResponseEntity<String >patchCategory(@PathVariable int id, @ModelAttribute Category category, @RequestParam("file") MultipartFile file, @RequestParam("isActive") String isActive) throws IOException {
        
        String imageName = file != null ? file.getOriginalFilename() : "default.jpg";
        
        Boolean isActiveParse = isActive.contains("true") ? true : false;

        category.setImageName(imageName);

        category.setIsActive(isActiveParse);
        Category patchCategory = categoryService.patchCategory(category);
        
        if(ObjectUtils.isEmpty(patchCategory)){
            return ResponseEntity.internalServerError().body("Error in Patching");
        } else{
            if (file == null) {
                return ResponseEntity.internalServerError().body("file is null.");
            } else {

                File saveFile = new ClassPathResource("static/img").getFile();
                Path path = Paths.get(saveFile.getAbsolutePath() + File.separator + "category_img" + File.separator
                        + file.getOriginalFilename());

                System.out.println(path);

                Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                return ResponseEntity.ok("Saved Successfully ");
            }
        }
    }

    //Product Controllers

    @GetMapping("/product")
    public ResponseEntity<List<Product>> getAllProduct() {
        List<Product> productList= productService.getAllProduct();

        return ResponseEntity.ok(productList);
    }
    
    @PostMapping("/saveproduct")
    public ResponseEntity<String> saveProduct(@ModelAttribute Product product,
            @RequestParam("file") MultipartFile file, @RequestParam("price") String price, @RequestParam("stock") String stock ) throws IOException {

        String imageName = file != null ? file.getOriginalFilename() : "default.jpg";
        
        product.setPrice(Double.valueOf(price));
        product.setStock(Integer.valueOf(stock));
        product.setImageName(imageName);


        Boolean existsProduct= productService.existsProduct(product.getName());

        if (existsProduct) {

            return ResponseEntity.accepted().body("Product Name Already exist");
        } else {
            Product saveProduct= productService.saveProduct(product);
            if (ObjectUtils.isEmpty(saveProduct)) {

                return ResponseEntity.internalServerError().body("Error in save product");
            } else {

                /* Server side image save just in case. */
                if (file == null) {
                    return ResponseEntity.internalServerError().body("file is null.");
                } else {

                    File saveFile = new ClassPathResource("static/img").getFile();
                    Path path = Paths.get(saveFile.getAbsolutePath() + File.separator + "product_img" + File.separator
                            + file.getOriginalFilename());

                    System.out.println(path);

                    Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                    return ResponseEntity.ok("Saved Successfully ");
                }
            }

        }

    }

}
