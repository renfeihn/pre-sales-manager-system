package com.dcits.ms.controller;

import com.dcits.ms.model.Project;
import com.dcits.ms.model.Supporter;
import com.dcits.ms.model.User;
import com.dcits.ms.model.vo.ActivityVo;
import com.dcits.ms.model.vo.ProjectVo;
import com.dcits.ms.service.ProjectService;
import com.dcits.ms.service.SupporterService;
import com.dcits.ms.util.Lists;
import com.dcits.ms.util.Maps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProjectController extends BaseController {

    @Autowired
    ProjectService projectService;
    @Autowired
    SupporterService supporterService;

    @RequestMapping(value = "/project", method = RequestMethod.GET)
    public HttpEntity<List> getProjects() {
        List list = projectService.findAll();

        return new HttpEntity(list);
    }

    @RequestMapping(value = "/project", method = RequestMethod.POST)
    public HttpEntity<Project> save(HttpServletRequest request, @RequestBody ProjectVo projectVo) {

        User user = this.getUser(request);

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
    public HttpEntity<Project> getProjectInfo(Integer id) {
        Map map = Maps.newHashMap();
        Project project = projectService.findById(id);
        map.put("project", null == project ? new Project() : project);

        List<Supporter> supporters = this.supporterService.findSupporterByProject(project);

        map.put("supporters", null == supporters ? Lists.newArrayList() : supporters);

        return new HttpEntity(map);
    }


    /**
     * @return
     */
    @RequestMapping(value = "/activities", method = RequestMethod.GET)
    public HttpEntity<List> getActivities() {

        List<ActivityVo> list = projectService.findActivities(6);

        return new HttpEntity(list);
    }


}
