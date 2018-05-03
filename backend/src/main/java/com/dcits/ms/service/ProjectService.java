package com.dcits.ms.service;

import com.dcits.ms.model.Project;
import com.dcits.ms.model.User;
import com.dcits.ms.model.factory.ProjectFactory;
import com.dcits.ms.model.vo.ProjectVo;
import com.dcits.ms.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 项目service
 */
@Service
public class ProjectService {

    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    ProjectFactory projectFactory;

    @Autowired
    DepartmentService departmentService;
    @Autowired
    ProductService productService;
    @Autowired
    SupporterService supporterService;


    public Project create(ProjectVo projectVo, User user) {
        Project project = projectFactory.create(projectVo, user);
        projectRepository.save(project);

        supporterService.create(projectVo.getSupporters(), project, user);
        return project;
    }


    public List<Project> findAll() {
        return (List) projectRepository.findAll();
    }


    public List<ProjectVo> findByNum(Integer max) {
        List<ProjectVo> result = new ArrayList<>();
        List<Project> list = (List) projectRepository.findByNum(max);
        if(null != list && list.size() > 0){
            ProjectVo projectVo = null;
            for (Project project : list){
                projectVo = new ProjectVo();

                projectVo.setId(project.getId());
                projectVo.setProductName(project.getProduct().getName());
                projectVo.setDepartmentName(project.getDepartment().getName());
                projectVo.setProductName(project.getBaseProject().getName());

                result.add(projectVo);
            }
        }

        return result;
    }


    public void deleteAll() {
        projectRepository.deleteAll();
    }


}
