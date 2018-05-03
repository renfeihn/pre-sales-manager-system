package com.dcits.ms.service;

import com.dcits.ms.model.BaseProject;
import com.dcits.ms.model.factory.BaseProjectFactory;
import com.dcits.ms.repository.BaseProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 基础项目service
 */
@Service
public class BaseProjectService {

    @Autowired
    BaseProjectRepository baseProjectRepository;
    @Autowired
    BaseProjectFactory baseProjectFactory;


    public void create(String peojectName) {
        BaseProject baseProject = baseProjectFactory.create(peojectName);
        baseProjectRepository.save(baseProject);
    }



    public List<BaseProject> findAll() {
        return (List) baseProjectRepository.findAll();
    }


    public void deleteAll() {
        baseProjectRepository.deleteAll();
    }
}
