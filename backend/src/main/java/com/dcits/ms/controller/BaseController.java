package com.dcits.ms.controller;

import com.dcits.ms.model.User;
import com.dcits.ms.security.SecurityAppContext;
import com.dcits.ms.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class BaseController {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    SecurityAppContext securityAppContext;
    @Autowired
    UserService userService;


    protected User getUser() {
        String name = securityAppContext.getContext().getAuthentication().getName();
        return userService.findByUsername(name);
    }


}
