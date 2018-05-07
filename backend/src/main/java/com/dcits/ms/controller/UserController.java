package com.dcits.ms.controller;

import com.dcits.ms.model.User;
import com.dcits.ms.model.vo.UserVo;
import com.dcits.ms.service.ProjectService;
import com.dcits.ms.service.SupporterService;
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
public class UserController extends BaseController {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    static final String USERNAME = "username";
    static final String AUTHORIZATIONS = "permissions";


    @Autowired
    ProjectService projectService;
    @Autowired
    SupporterService supporterService;

    @RequestMapping(value = "/currentUser", method = RequestMethod.GET)
    public HttpEntity<Map> currentUser() {
        logger.debug("currentUser start");
        Map<String, Object> result = new HashMap<String, Object>();

        User user = this.getUser();
        result.put("name", user.getZhName());
        result.put("avatar", "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png");
        result.put("userid", user.getId());
        result.put("notifyCount", 0);
        return new HttpEntity(result);
    }

    /**
     * 功能说明：
     * @return
     */
    @RequestMapping(value = "/getWorkInfo", method = RequestMethod.GET)
    public HttpEntity<Map> getWorkInfo() {
        Map result = new HashMap();
        User user = this.getUser();
        result.put("user", user);
        result.put("projectCount", this.projectService.findProjectCount());
        // 当年项目数量
        result.put("projectCurrCount", this.projectService.findProjectsByCreateDate().size());
        result.put("supporterCount", this.supporterService.findSupporterCount());

        return new HttpEntity<>(result);
    }


    /**
     * 功能说明：获取用户列表
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/userList", method = RequestMethod.GET)
    public HttpEntity<List> userList(HttpServletRequest request) {
        List<User> list = userService.findAll();
        List<UserVo> result = new ArrayList();
        if (null != list) {
            UserVo userVo = null;
            for (User u : list) {
                userVo = new UserVo(u.getId(), u.getZhName(),
                        u.getDepartment().getName(), u.getJobTitle());
                result.add(userVo);
            }
        }

        return new HttpEntity(result);
    }

    /**
     * 功能说明：登录
     *
     * @param request
     * @return
     */
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
