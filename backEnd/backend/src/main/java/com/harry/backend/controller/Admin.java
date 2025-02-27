package com.harry.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.harry.backend.models.Category;
import com.harry.backend.service.CategoryService;

import jakarta.servlet.http.HttpSession;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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
    public Category saveCategory(@RequestBody Category category, HttpSession session) {
        Boolean existsCategory = categoryService.existsCategory(category.getName());

        if (existsCategory) {
            session.setAttribute("errorMessage", "Category name already taken.");
        } else {
            Category saveCategory = categoryService.saveCategory(category);
            if (ObjectUtils.isEmpty(saveCategory)) {
                session.setAttribute("errorMessage", "Not saved. Internal server error");
            } else {
                session.setAttribute("successMessage", "Saved successfully");
            }

        }

        return saveCategory(category, session);
    }  

}
