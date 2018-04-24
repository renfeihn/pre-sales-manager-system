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

    @Column(nullable = false)
    String projectName;

    @Column(nullable = false)
    String projectDesc;

    @Column(nullable = false)
    String startDate;

    @Column(nullable = false)
    String endDate;

    // 审批人
    @Column(nullable = false)
    String approver;

    /**
     * 是否中标 Y:是  N:否
     */
    @Column(nullable = false)
    @org.hibernate.annotations.Type(type="yes_no")
    Boolean isVictory;

    @Column
    BigDecimal bidAmount;


    /**
     * 项目流程：1.新建 2.一级审批中 3.审批通过 4.结束
     */
    @Column(nullable = false)
    String state;


    @JoinColumn(name = "createUserId", referencedColumnName = "id", nullable = false, updatable = false)
    @OneToOne(optional = false, targetEntity = User.class)
    protected User createBy;


    @JoinColumn(name = "updateUserId", referencedColumnName = "id", nullable = false, updatable = false)
    @OneToOne(optional = false, targetEntity = User.class)
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


}