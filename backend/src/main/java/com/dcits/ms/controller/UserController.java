package com.dcits.ms.controller;

import com.dcits.ms.model.User;
import com.dcits.ms.model.vo.UserVo;
import com.dcits.ms.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    static final String USERNAME = "username";
    static final String AUTHORIZATIONS = "permissions";

    @Autowired
    UserService userService;


    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public HttpEntity<Map> user(HttpServletRequest request) {

        logger.debug("user start");

        Map<String, Object> result = new HashMap<String, Object>();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Boolean> authorizations = new HashMap();
        for (GrantedAuthority grantedAuthority : auth.getAuthorities()) {
            authorizations.put(grantedAuthority.getAuthority(), Boolean.TRUE);
        }
        result.put(AUTHORIZATIONS, authorizations);
        String username = (String) auth.getPrincipal();
        result.put(USERNAME, username);
        if ("anonymousUser".equals(username)) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        return new HttpEntity(result);
    }

    @RequestMapping(value = "/currentUser", method = RequestMethod.GET)
    public HttpEntity<Map> currentUser(HttpServletRequest request) {
        logger.debug("user start");
        Map<String, Object> result = new HashMap<String, Object>();

        result.put("name", "曲丽丽");
        result.put("avatar", "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png");
        result.put("userid", "00000001");
        result.put("notifyCount", 0);
        return new HttpEntity(result);
    }


    @RequestMapping(value = "/userList", method = RequestMethod.GET)
    public HttpEntity<List> userList(HttpServletRequest request) {
        List<User> list = userService.findAll();
        List<UserVo> result = new ArrayList();
        if (null != list) {
            UserVo userVo = null;
            for (User u : list) {
                userVo = new UserVo(u.getId(), u.getUsername(),
                        u.getDepartment().getName(), u.getJobTitle());
                result.add(userVo);
            }
        }

        return new HttpEntity(result);
    }

    @RequestMapping(value = "login/account", method = RequestMethod.POST)
    public HttpEntity<Map> login(HttpServletRequest request) {
        Map<String, Object> result = new HashMap<String, Object>();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Boolean> authorizations = new HashMap();
        for (GrantedAuthority grantedAuthority : auth.getAuthorities()) {
            authorizations.put(grantedAuthority.getAuthority(), Boolean.TRUE);
        }
        result.put(AUTHORIZATIONS, authorizations);
        String username = (String) auth.getPrincipal();
        result.put(USERNAME, username);
        result.put("currentAuthority", username);
        result.put("status", "ok");

        if ("anonymousUser".equals(username)) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        return new HttpEntity(result);
    }

}
