package com.harry.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.harry.backend.models.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    public Boolean existsByName(String name);
}