package com.dcits.ms.controller;

import com.dcits.ms.model.Project;
import com.dcits.ms.model.User;
import com.dcits.ms.model.vo.ActivityVo;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProjectController extends BaseController{

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

//        String name = securityAppContext.getContext().getAuthentication().getName();
        User user = this.getUser();

        Project project = projectService.create(projectVo, user);
        return new HttpEntity(project);
    }

    @RequestMapping(value = "/project/notice", method = RequestMethod.GET)
    public HttpEntity<List> getNotice() {
        List<ProjectVo> list = projectService.findByNum(6);
        return new HttpEntity(list);
    }

    @RequestMapping(value = "/project/list", method = RequestMethod.GET)
    public HttpEntity<List> getProjectLists() {
        List<Project> list = projectService.findAll();

        return new HttpEntity(list);
    }

    @RequestMapping(value = "/project/info", method = RequestMethod.GET)
    public HttpEntity<Project> getProjectInfo(Long id) {
        Project project = projectService.findById(id);

        return new HttpEntity(project);
    }


    /**
     *
     * @return
     */
    @RequestMapping(value = "/activities", method = RequestMethod.GET)
    public HttpEntity<List> getActivities() {

        List<ActivityVo> list = projectService.findActivities(6);

        return new HttpEntity(list);
    }





}
