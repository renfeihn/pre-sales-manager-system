package com.dcits.ms.service;

import com.dcits.ms.model.Department;
import com.dcits.ms.model.Project;
import com.dcits.ms.model.User;
import com.dcits.ms.model.factory.DepartmentFactory;
import com.dcits.ms.model.factory.ProjectFactory;
import com.dcits.ms.model.vo.ProjectVo;
import com.dcits.ms.repository.DepartmentRepository;
import com.dcits.ms.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

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

    public void deleteAll() {
        projectRepository.deleteAll();
    }


}
