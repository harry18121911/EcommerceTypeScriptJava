package com.harry.backend.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import com.harry.backend.models.Category;
import com.harry.backend.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
        private ResourceLoader resourceLoader;

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }

    @Override
    public Boolean existsCategory(String name) {
        return categoryRepository.existsByName(name);
    }

    @Override
    public String readFileFromResources(String filename)throws IOException {

        Resource resource = resourceLoader.getResource("classpath:" + filename);
        // Opening an InputStream to read the content of the resource
        InputStream inputStream = resource.getInputStream();
        // Creating a BufferedReader to read text from the InputStream efficiently
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        // StringBuilder to accumulate the lines read from the file
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        // Reading each line from the file and appending it to the StringBuilder
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }
        // Closing the BufferedReader
        reader.close();
        // Returning the contents of the file as a string
        return stringBuilder.toString();
    }

}
