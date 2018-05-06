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
@RequestMapping("/api/chart")
public class ChartController {


    @Autowired
    DepartmentService departmentService;
    @Autowired
    ProductService productService;
    @Autowired
    BaseProjectService baseProjectService;


    @RequestMapping(value = "/fake_chart_data", method = RequestMethod.GET)
    public HttpEntity fackCharData() {
        Map<String,List> map = new HashMap<>();


        return new HttpEntity(map);
    }


}
