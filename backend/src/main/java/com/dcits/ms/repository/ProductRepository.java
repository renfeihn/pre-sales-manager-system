package com.dcits.ms.repository;


import com.dcits.ms.model.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Integer> {


}
