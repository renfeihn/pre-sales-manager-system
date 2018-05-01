package com.dcits.ms.controller;

import com.dcits.ms.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/data")
public class DataController {


	@Autowired
	DepartmentService departmentService;


	@RequestMapping(value = "/getDepartment", method = RequestMethod.GET)
	public HttpEntity getDepartment() {
		List list = departmentService.findAll();

		return new HttpEntity(list);
	}
	



}
