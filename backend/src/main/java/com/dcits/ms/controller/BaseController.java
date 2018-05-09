package com.dcits.ms.controller;

import com.dcits.ms.model.User;
import com.dcits.ms.service.UserService;
import com.dcits.ms.util.BusiUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;

@Controller
public class BaseController {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    //    @Autowired
//    SecurityAppContext securityAppContext;
    @Autowired
    UserService userService;


    protected User getUser(HttpServletRequest request) {
//        String name = securityAppContext.getContext().getAuthentication().getName();
        String authorizations = request.getHeader("Authorization");
        if (BusiUtil.isNotNull(authorizations)) {
            String username = authorizations.split("_")[0];
            return userService.findByUsername(username);
        }
        return null;
    }


}
