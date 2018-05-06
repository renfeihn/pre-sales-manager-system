package com.dcits.ms.model.vo;

import com.dcits.ms.model.Department;
import com.dcits.ms.model.Project;
import com.dcits.ms.model.User;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by renfei on 2018/5/6.
 */
@Setter
@Getter
public class ActivityVo {


    private String id;
    private User user;
    private Department department;
    private Project project;

    private String template = "在 @{department} 新建项目 @{project}";
}
