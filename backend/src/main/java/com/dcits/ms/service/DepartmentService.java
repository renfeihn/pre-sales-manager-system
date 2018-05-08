package com.dcits.ms.service;

import com.dcits.ms.model.Department;
import com.dcits.ms.model.factory.DepartmentFactory;
import com.dcits.ms.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 部门服务
 */
@Component
public class DepartmentService {

    @Autowired
    DepartmentRepository departmentRepository;
    @Autowired
    DepartmentFactory departmentFactory;


    public void create(String name) {
        Department department = departmentFactory.create(name);
        departmentRepository.save(department);
    }

    public void deleteAll() {
        departmentRepository.deleteAll();
    }

    public Department fingById(Integer id) {
        return departmentRepository.findOne(id);
    }


    public List<Department> findAll() {
        return (List) departmentRepository.findAll();
    }

}
