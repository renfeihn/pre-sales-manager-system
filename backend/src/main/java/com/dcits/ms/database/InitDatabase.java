package com.dcits.ms.database;

import com.dcits.ms.model.User;
import com.dcits.ms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;



@Component
public class InitDatabase {


    /**
     * 初始化第一个用户
     *
     * @param userService
     */
    @Autowired
    public InitDatabase(UserService userService) {

        User user = userService.findByUsername("admin");
        if (null == user) {
            userService.create("admin", "888888", "USER");
        }
    }


}
