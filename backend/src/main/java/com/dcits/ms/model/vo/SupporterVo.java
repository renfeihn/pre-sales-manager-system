package com.dcits.ms.model.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

/**
 * 项目支持人员VO
 */
@Setter
@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class SupporterVo {


    Integer id;

    // 支持人员姓名
    String name;

    // 支持人员岗位
    String jobTitle;

    // 部门名称
    String departmentName;


    public SupporterVo() {
    }


    public SupporterVo(Integer id, String name, String jobTitle, String departmentName) {
        this.id = id;
        this.name = name;
        this.jobTitle = jobTitle;
        this.departmentName = departmentName;
    }
}
