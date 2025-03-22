package com.harry.backend.service;

import java.util.List;

import com.harry.backend.models.Category;

public interface CategoryService {
    public Category saveCategory(Category category);
 
    public List<Category> getAllCategory();

    public Boolean existsCategory(String name);

    public Boolean deleteCategory(int id);


}
