package com.dcits.ms.controller;

import com.dcits.ms.model.Project;
import com.dcits.ms.model.User;
import com.dcits.ms.model.vo.ProjectVo;
import com.dcits.ms.security.SecurityAppContext;
import com.dcits.ms.service.ProjectService;
import com.dcits.ms.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProjectController {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    ProjectService projectService;
    @Autowired
    UserService userService;
    @Autowired
    SecurityAppContext securityAppContext;


    @RequestMapping(value = "/project", method = RequestMethod.GET)
    public HttpEntity<List> getProjects() {
        List list = projectService.findAll();

        return new HttpEntity(list);
    }

    @RequestMapping(value = "/project", method = RequestMethod.POST)
    public HttpEntity<Project> save(@RequestBody ProjectVo projectVo) {

        String name = securityAppContext.getContext().getAuthentication().getName();
        User user = userService.findByUsername(name);

        Project project = projectService.create(projectVo, user);
        return new HttpEntity(project);
    }

}
