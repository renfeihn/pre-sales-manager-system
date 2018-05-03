package com.dcits.ms.service;

import com.dcits.ms.model.Product;
import com.dcits.ms.model.User;
import com.dcits.ms.model.factory.ProductFactory;
import com.dcits.ms.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 产品线SERVICE
 */
@Component
public class ProductService {

    @Autowired
    ProductRepository productRepository;
    @Autowired
    ProductFactory productFactory;


    public void create(String prodName) {
        Product product = productFactory.create(prodName);
        productRepository.save(product);
    }

    public void deleteAll() {
        productRepository.deleteAll();
    }

    public List<Product> findAll() {
        return (List) productRepository.findAll();
    }

    public Product fingById(Integer id) {
        return productRepository.findOne(id);
    }

}
