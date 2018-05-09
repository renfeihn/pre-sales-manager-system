package com.dcits.ms.service;

import com.dcits.ms.model.Project;
import com.dcits.ms.model.User;
import com.dcits.ms.model.factory.ProjectFactory;
import com.dcits.ms.model.vo.ActivityVo;
import com.dcits.ms.model.vo.ProjectVo;
import com.dcits.ms.repository.ProjectRepository;
import com.dcits.ms.util.BusiUtil;
import com.dcits.ms.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.PortInUseException;
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


    /**
     * 功能说明：创建项目信息，人员信息每次全删除，新增
     * @param projectVo
     * @param user
     * @return
     */
    public Project create(ProjectVo projectVo, User user) {
        Project project = projectFactory.create(projectVo, user);
        projectRepository.saveAndFlush(project);

        supporterService.create(projectVo.getSupporters(), project, user);
        return project;
    }


    public List<Project> findAll() {
        return (List) projectRepository.findAll();
    }

    /**
     * 功能说明：取最近的几条
     * @param max
     * @return
     */
    public List<ProjectVo> findByNum(Integer max) {
        List<ProjectVo> result = new ArrayList<>();
        List<Project> list = (List) projectRepository.findByNum(6);
        if (null != list && list.size() > 0) {
            ProjectVo projectVo = null;
            for (Project project : list) {
                projectVo = new ProjectVo();

                projectVo.setId(project.getId());
                projectVo.setProductName(project.getProduct().getName());
                projectVo.setDepartmentName(project.getDepartment().getName());
                projectVo.setProjectName(project.getBaseProject().getName());
                projectVo.setProjectDesc(project.getProjectDesc());
                projectVo.setUpdateDate(DateUtil.getYyyyMMdd(project.getUpdateDate()));
                projectVo.setLogo("https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png");
                projectVo.setHref("");
                projectVo.setMemberLink("");

                result.add(projectVo);
            }
        }

        return result;
    }


    public Project findById(Integer id){
        return this.projectRepository.findOne(id);
    }


    /**
     * 功能说明：查询当年的项目
     * @return
     */
    public List<Project> findProjectsByCreateDate(){
        return this.projectRepository.findProjectsByCreateDate(DateUtil.getCurrYearFirst());
    }



    public Long findProjectCount() {
        return this.projectRepository.count();
    }


    /**
     * 功能说明：工作台获取动态
     *
     * @param max
     * @return
     */
    public List<ActivityVo> findActivities(Integer max) {
        List<ActivityVo> result = new ArrayList<>();
        List<Project> list = (List) projectRepository.findByNum(6);
        if (BusiUtil.isNotNull(list)) {
            ActivityVo activityVo = null;
            Integer id = 0;
            for (Project project : list) {
                activityVo = new ActivityVo();

                activityVo.setId((id++).toString());
                activityVo.setDepartment(project.getDepartment());
                activityVo.setProject(project);
                activityVo.setUser(project.getCreateBy());

                result.add(activityVo);
            }
        }

        return result;
    }

    public void deleteAll() {
        projectRepository.deleteAll();
    }


}
