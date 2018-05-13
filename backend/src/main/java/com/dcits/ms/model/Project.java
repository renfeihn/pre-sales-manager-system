package com.dcits.ms.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * 项目信息表
 */
@Entity
@Setter
@Getter
@Table(name = "ms_project")
public class Project extends DataEntity {


//    @JoinColumn(name = "base_project_id", referencedColumnName = "id", nullable = false, updatable = false)
//    @ManyToOne(optional = false, targetEntity = BaseProject.class)
//    BaseProject baseProject;

    // 项目名称
    @Column(nullable = false)
    String projectName;

    // 重要程度
    @Column(nullable = false)
    String importance;


    // 事业部
    @JoinColumn(name = "department_id", referencedColumnName = "id", nullable = false, updatable = false)
    @ManyToOne(optional = false, targetEntity = Department.class)
    Department department;

    // 产品族
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false, updatable = false)
    @ManyToOne(optional = false, targetEntity = Product.class)
    Product product;

    // 客户名称
    @Column
    String clientName;

    // 客户经理
    @Column
    String clientDirector;

    // 解决方案
    @Column(nullable = false)
    String solution;

    // 模块
    @Column(nullable = false)
    String module;

    /**
     * 项目落单情况：1：跟进 2：成功  3：失败 4：放弃 5：停止:6：暂停
     */
    @Column(nullable = false)
    String state;

    /**
     * 当前情况描述
     */
    @Column(nullable = false)
    String stateDesc;

    // 交流时间
    @Column
    String swapDate;

    // 交流人员
    @Column
    String swapPersons;


    // 提交资料情况
    @Column
    String projectDesc;

    // 初步预算
    @Column
    BigDecimal budget;

    // 是否POC  Y/N
    @Column
    String isPoc;

    // 工作量初估（人月）
    @Column
    Integer workload;


    @Column
    String startDate;

    @Column
    String endDate;


    public Project() {
    }


    public Project(Integer id, String projectDesc, String startDate, String endDate, User user) {
        this.id = id;
        this.projectDesc = projectDesc;
        this.startDate = subDate(startDate);
        this.endDate = subDate(endDate);
        this.createBy = user;
        this.updateBy = user;
        this.state = "1";
    }

    public Project(Integer id, String projectName, String importance,
                   String clientName, String clientDirector, String solution,
                   String module, String state, String stateDesc, String swapDate,
                   String swapPersons, String projectDesc, BigDecimal budget, String isPoc,
                   Integer workload, String remarks, User user) {
        this.id = id;
        this.projectName = projectName;
        this.importance = importance;
        this.clientName = clientName;
        this.clientDirector = clientDirector;
        this.solution = solution;
        this.module = module;
        this.state = state;
        this.stateDesc = stateDesc;
        this.swapDate = swapDate;
        this.swapPersons = swapPersons;
        this.projectDesc = projectDesc;
        this.budget = budget;
        this.isPoc = isPoc;
        this.workload = workload;
        this.remarks = remarks;
        this.createBy = user;
        this.updateBy = user;
    }

    private String subDate(String dateStr) {
        if (null != dateStr && dateStr.length() > 10) {
            dateStr = dateStr.substring(0, 10);
        }
        return dateStr;
    }

}