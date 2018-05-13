package com.dcits.ms.model.vo;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.math.BigDecimal;
import java.util.List;

/**
 * 项目信息VO
 */
@Setter
@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProjectVo {


    public ProjectVo() {
    }

    Integer id;

    Integer baseProjectId;

    String projectName;

    String[] date;

    Integer departmentId;

    String departmentName;

    Integer productId;

    String productName;



    // 重要程度
    String importance;

    // 客户名称
    String clientName;

    // 客户经理
    String clientDirector;

    // 解决方案
    String solution;

    // 模块
    String module;

    /**
     * 项目落单情况：1：跟进 2：成功  3：失败 4：放弃 5：停止:6：暂停
     */
    String state;

    /**
     * 当前情况描述
     */
    String stateDesc;

    // 交流时间
    String swapDate;

    // 交流人员
    String swapPersons;


    // 提交资料情况
    String projectDesc;

    // 初步预算
    BigDecimal budget;

    // 是否POC  Y/N
    String isPoc;

    // 工作量初估（人月）
    Integer workload;


    double weight;

    String remarks;

    List<SupporterVo> supporters;

    String createDate;

    String updateDate;


    // 无用的
    String href;
    String logo;
    String memberLink;

}