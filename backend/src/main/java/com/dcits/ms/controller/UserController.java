package com.dcits.ms.controller;

import com.dcits.ms.model.User;
import com.dcits.ms.model.vo.UserVo;
import com.dcits.ms.service.ProjectService;
import com.dcits.ms.service.SupporterService;
import com.dcits.ms.util.BusiUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
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


    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public HttpEntity<Map> user(HttpServletRequest request) {

        logger.debug("user start");

        Map<String, Object> result = new HashMap<String, Object>();
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        Map<String, Boolean> authorizations = new HashMap();
//        for (GrantedAuthority grantedAuthority : auth.getAuthorities()) {
//            authorizations.put(grantedAuthority.getAuthority(), Boolean.TRUE);
//        }
//        result.put(AUTHORIZATIONS, authorizations);
//        String username = (String) auth.getPrincipal();
//        result.put(USERNAME, username);
//        if ("anonymousUser".equals(username)) {
//            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
//        }
        return new HttpEntity(result);
    }


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
     *
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
     * @param body
     * @return
     */
    @RequestMapping(value = "login/account", method = RequestMethod.POST)
    public HttpEntity<Map> login(@RequestBody String body) throws IOException {
        ObjectMapper mapper = new ObjectMapper();

        Map<String, String> map = mapper.readValue(body, Map.class);

        String username = map.get("username");
        String password = map.get("password");

        String authorizations = "";
        String status = "error";

        if (BusiUtil.isNotNullAll(username, password)) {
            User u = userService.findByUsername(username);
            if (BusiUtil.isNotNull(u) && BusiUtil.isEquals(password, u.getPassword())) {
                authorizations = username + "_" + password;
                status = "ok";
            } else {
                username = "guest";
            }
        }

        Map<String, Object> result = new HashMap<String, Object>();
        result.put(USERNAME, username);
        result.put("currentAuthority", "admin");
        result.put("status", status);
        result.put(AUTHORIZATIONS, authorizations);

        return new HttpEntity(result);
    }

}
