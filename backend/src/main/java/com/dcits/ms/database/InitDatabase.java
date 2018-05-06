package com.dcits.ms.database;

import com.dcits.ms.model.User;
import com.dcits.ms.service.BaseProjectService;
import com.dcits.ms.service.DepartmentService;
import com.dcits.ms.service.ProductService;
import com.dcits.ms.service.UserService;
import com.dcits.ms.util.BusiUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class InitDatabase {


    /**
     * 初始化用户，部门
     *
     * @param userService
     */
    String[] depNames = {"产品中心", "业务解决方案部", "东区事业部", "西部事业部", "南区事业部"
            , "北区事业部", "东北事业部", "开行事业部"};

    String[] prodNames = {"核心产品线", "互金产品线", "支付产品线"};

    String[] products = {"中关村售前项目", "百信售前项目", "上海售前项目"};


    @Autowired
    public InitDatabase(UserService userService, DepartmentService departmentService,
                        ProductService productService, BaseProjectService baseProjectService) {


        List users = userService.findAll();
        if (BusiUtil.isNull(users)) {

            departmentService.deleteAll();
            userService.deleteAll();
            productService.deleteAll();
            baseProjectService.deleteAll();

            for (int i = 0; i < depNames.length; i++) {
                departmentService.create(depNames[i]);
            }

            for (int i = 0; i < prodNames.length; i++) {
                productService.create(prodNames[i]);
            }

            for (int i = 0; i < products.length; i++) {
                baseProjectService.create(products[i]);
            }

            userService.create("admin", "888888", "USER", departmentService.findAll().get(0), "技术总监", "张三");
        }
    }
}
