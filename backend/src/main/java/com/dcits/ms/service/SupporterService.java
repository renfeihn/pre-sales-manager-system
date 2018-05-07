package com.dcits.ms.service;

import com.dcits.ms.model.Project;
import com.dcits.ms.model.Supporter;
import com.dcits.ms.model.User;
import com.dcits.ms.model.factory.ProjectFactory;
import com.dcits.ms.model.factory.SupporterFactory;
import com.dcits.ms.model.vo.ProjectVo;
import com.dcits.ms.model.vo.SupporterVo;
import com.dcits.ms.repository.ProjectRepository;
import com.dcits.ms.repository.SupporterRepository;
import com.dcits.ms.util.BusiUtil;
import com.dcits.ms.util.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 支持人员service
 */
@Service
public class SupporterService {

    @Autowired
    SupporterRepository supporterRepository;
    @Autowired
    SupporterFactory supporterFactory;


    public void create(List<SupporterVo> supporterVos, Project project, User user) {
        for (SupporterVo supporterVo : supporterVos) {
            Supporter supporter = supporterFactory.create(supporterVo, project, user);
            supporterRepository.save(supporter);

        }
    }


    public List<Supporter> findSupporterByProject(Project project) {
        return this.supporterRepository.findSupporterByProject(project);
    }


    public Long findSupporterCount() {
        return this.supporterRepository.count();
    }

    public List<Project> findAll() {
        return (List) supporterRepository.findAll();
    }

    public void deleteAll() {
        supporterRepository.deleteAll();
    }


}
