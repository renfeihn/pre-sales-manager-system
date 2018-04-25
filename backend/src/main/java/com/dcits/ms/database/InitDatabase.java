package com.dcits.ms.database;

import com.dcits.ms.model.User;
import com.dcits.ms.repository.DepartmentRepository;
import com.dcits.ms.service.DepartmentService;
import com.dcits.ms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class InitDatabase {


    /**
     * 初始化用户，部门
     *
     * @param userService
     */
    String[] depNames = {"产品中心", "业务解决方案部", "东区事业部", "西部事业部", "南区事业部"
            , "北区事业部", "东北事业部", "开行事业部"};

    @Autowired
    public InitDatabase(UserService userService, DepartmentService departmentService) {

        userService.deleteAll();
        User user = userService.create("admin", "888888", "USER");


        departmentService.deleteAll();
        for (int i = 0; i < depNames.length; i++) {
            departmentService.create(depNames[i], user);
        }

    }


}
