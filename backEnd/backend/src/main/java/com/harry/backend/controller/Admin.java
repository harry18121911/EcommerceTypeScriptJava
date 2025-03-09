package com.harry.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.harry.backend.models.Category;
import com.harry.backend.service.CategoryService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("*")
@RestController
public class Admin {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/category")
    public List<Category> getAllCategory() {
        List<Category> categoryList = categoryService.getAllCategory();
        return categoryList;
    }

    @PostMapping("/savecategory")
    public ResponseEntity<String> saveCategory(@ModelAttribute Category category,
            @RequestParam("file") MultipartFile file, @RequestParam("isActive") String isActive){

        String imageName = file != null ? file.getOriginalFilename() : "default.jpg";
        Boolean isActiveParse= isActive.contains("true") ? true :false ;

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
                
                /* File saveFile =new ClassPathResource("static/img").getFile();
                Path path = Paths.get(saveFile.getAbsolutePath()+File.separator+"category_img"+File.separator+file.getOriginalFilename());

                System.out.println(path);

                Files.copy(file.getInputStream(), path ,StandardCopyOption.REPLACE_EXISTING); */
                return ResponseEntity.ok("Saved Successfully ");

            }

        }

    }

}
