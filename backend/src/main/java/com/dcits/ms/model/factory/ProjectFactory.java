package com.dcits.ms.model.factory;

import com.dcits.ms.model.*;
import com.dcits.ms.model.vo.ProjectVo;
import com.dcits.ms.service.BaseProjectService;
import com.dcits.ms.service.DepartmentService;
import com.dcits.ms.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class ProjectFactory {


    @Autowired
    DepartmentService departmentService;
    @Autowired
    ProductService productService;
    @Autowired
    BaseProjectService baseProjectService;

    public Project create(ProjectVo projectVo, User user) {

        Project project = new Project(projectVo.getProjectDesc(),
                projectVo.getDate()[0], projectVo.getDate()[1], user);

        BaseProject baseProject = baseProjectService.findById(projectVo.getBaseProjectId());

        project.setBaseProject(baseProject);

        Integer departmentId = projectVo.getDepartmentId();
        Department department = departmentService.fingById(departmentId);
        project.setDepartment(department);
        Integer productId = projectVo.getProductId();
        Product product = productService.fingById(productId);
        project.setProduct(product);

        return project;
    }

}
