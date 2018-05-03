package com.dcits.ms.service;

import com.dcits.ms.model.Department;
import com.dcits.ms.model.Project;
import com.dcits.ms.model.User;
import com.dcits.ms.model.factory.DepartmentFactory;
import com.dcits.ms.model.factory.UserFactory;
import com.dcits.ms.repository.DepartmentRepository;
import com.dcits.ms.repository.UserRepository;
import com.dcits.ms.security.jwt.JwtService;
import com.dcits.ms.support.DateGenerator;
import com.dcits.ms.support.StringSupport;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

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
