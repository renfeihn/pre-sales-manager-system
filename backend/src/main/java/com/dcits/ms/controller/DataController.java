package com.dcits.ms.controller;

import com.dcits.ms.service.BaseProjectService;
import com.dcits.ms.service.DepartmentService;
import com.dcits.ms.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/param")
public class DataController {


    @Autowired
    DepartmentService departmentService;
    @Autowired
    ProductService productService;
    @Autowired
    BaseProjectService baseProjectService;


    @RequestMapping(value = "/getParam", method = RequestMethod.GET)
    public HttpEntity getParam() {
        Map<String,List> map = new HashMap<>();
        map.put("department",departmentService.findAll());
        map.put("product",productService.findAll());
        map.put("project",baseProjectService.findAll());

        return new HttpEntity(map);
    }


}
