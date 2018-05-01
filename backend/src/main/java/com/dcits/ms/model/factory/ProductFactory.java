package com.dcits.ms.model.factory;

import com.dcits.ms.model.Product;
import org.springframework.stereotype.Component;


@Component
public class ProductFactory {

    public Product create(String prodName) {
        return new Product(prodName);
    }

}
