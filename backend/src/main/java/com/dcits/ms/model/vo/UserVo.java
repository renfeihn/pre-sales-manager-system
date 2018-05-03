package com.dcits.ms.model.vo;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by renfei on 2018/5/3.
 */
@Setter
@Getter
public class UserVo {


    Integer id;

    String name;
    String password;
    String sec;
    // 角色
    String role;

    // 部门(事业部)
    String departmentName;
    // 职位
    String jobTitle;
    // 中文姓名
    String zhName;
    // 工号
    String jobNumber;

    public UserVo() {
    }

    public UserVo(Integer id, String name, String departmentName, String jobTitle) {
        this.id = id;
        this.name = name;
        this.departmentName = departmentName;
        this.jobTitle = jobTitle;
    }

}
