package com.dcits.ms.filter;

import com.dcits.ms.service.UserService;
import com.dcits.ms.util.BusiUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by renfei on 2018/5/8.
 */
@Component
@ServletComponentScan
@WebFilter(urlPatterns = "/api/*", filterName = "loginFilter")
public class AuthFilter implements Filter {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    static String[] exclusionAuth = {"login/account"};


    @Autowired
    UserService userService;


    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
                         FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;


//        BufferedReader br = request.getReader();
//        String str;
//        StringBuffer sb = new StringBuffer();
//        while ((str = br.readLine()) != null) {
//            sb.append(str);
//        }
//
//        System.out.println(str.toString());


        // 获取认证
//
//        if (BusiUtil.isNotNullAll(username, password)) {
//            User u = userService.findByUsername(username);
//            if (BusiUtil.isNotNull(u) && BusiUtil.isEquals(password, u.getPassword())) {
//                filterChain.doFilter(servletRequest, servletResponse);
//            } else {
//
//            }
//        }


        String path = request.getRequestURI();

        for (String ex : exclusionAuth) {
            if (!path.contains(ex)) {
                // 获取系统头信息，进行校验
                String authorizations = request.getHeader("Authorization");
                logger.debug("authorizations:   " + authorizations);
                // 校验失败，返回错误
                if(BusiUtil.isNull(authorizations)){
                    // todo 响应错误信息
                }
            }
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
