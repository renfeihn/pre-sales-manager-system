package com.dcits.ms.repository;


import com.dcits.ms.model.Product;
import com.dcits.ms.model.User;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Integer> {


}
