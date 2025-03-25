package com.harry.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import com.harry.backend.models.Category;
import com.harry.backend.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(int id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public Boolean existsCategory(String name) {
        return categoryRepository.existsByName(name);
    }


    @Override
    public Boolean deleteCategory(int id) {
        Category category = categoryRepository.findById(id).orElse(null);

        if(!ObjectUtils.isEmpty(category)){
            categoryRepository.delete(category);
            return true;
        }
        return false;
    }

    @Override
    public Category patchCategory(Category category) {

        Category oldCategory =categoryRepository.findById(category.getId()).orElse(null);

        if(!ObjectUtils.isEmpty(oldCategory)){
            if(category.getName()!=null){
                oldCategory.setName(category.getName());
            }
            if(category.getImageName()!=null){
                oldCategory.setImageName(category.getImageName());
            }
            if(category.getIsActive()!=null){
                oldCategory.setIsActive(category.getIsActive());
            }
        }

        Category newCategory = categoryRepository.save(oldCategory);

        return newCategory;

    }

    

}
