package com.dcits.ms.model;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 项目信息表
 */
@Entity
@Setter
@Getter
@Table(name = "ms_project")
public class Project {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    @JoinColumn(name = "base_project_id", referencedColumnName = "id", nullable = false, updatable = false)
    @ManyToOne(optional = false, targetEntity = BaseProject.class)
    BaseProject baseProject;

    @Column(nullable = false)
    String projectDesc;

    @Column(nullable = false)
    String startDate;

    @Column(nullable = false)
    String endDate;

    // 事业部
    @JoinColumn(name = "department_id", referencedColumnName = "id", nullable = false, updatable = false)
    @ManyToOne(optional = false, targetEntity = Department.class)
    Department department;

    // 产品族
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false, updatable = false)
    @ManyToOne(optional = false, targetEntity = Product.class)
    Product product;

    // 中标比率
    @Column
    BigDecimal bidRatio;


    /**
     * 项目流程：1.新建 2.结束 3.未中标 4.中标
     */
    @Column(nullable = false)
    String state;


    @JoinColumn(name = "createUserId", referencedColumnName = "id", nullable = false, updatable = false)
    @ManyToOne(optional = false, targetEntity = User.class)
    protected User createBy;


    @JoinColumn(name = "updateUserId", referencedColumnName = "id", nullable = false, updatable = false)
    @ManyToOne(optional = false, targetEntity = User.class)
    protected User updateBy;

    // 备注
    @Column
    protected String remarks;

    // 创建日期
    @Column
    @CreatedDate
    protected Date createDate;

    // 更新日期
    @Column
    @LastModifiedDate
    protected Date updateDate;

    // 删除标记（0：正常；1：删除）
    @Column
    protected String delFlag;


    public Project() {
    }


    public Project(Integer id,String projectDesc, String startDate, String endDate,BigDecimal bidRatio, User user) {
        this.id = id;
        this.projectDesc = projectDesc;
        this.startDate = subDate(startDate);
        this.endDate = subDate(endDate);
        this.createBy = user;
        this.updateBy = user;
        this.bidRatio = bidRatio;
        this.createDate = new Date();
        this.updateDate = new Date();
        this.state = "1";
    }

    private String subDate(String dateStr) {
        if (null != dateStr && dateStr.length() > 10) {
            dateStr = dateStr.substring(0, 10);
        }
        return dateStr;
    }

}