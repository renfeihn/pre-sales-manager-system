package com.dcits.ms.model;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 部门（事业部）信息表
 */
@Entity
@Setter
@Getter
@Table(name = "ms_department")
@EntityListeners(AuditingEntityListener.class)
public class Department {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    @Column(nullable = false)
    String name;


//    @JoinColumn(name = "createUserId", referencedColumnName = "id", updatable = false)
//    @ManyToOne(optional = false, targetEntity = User.class)
//    protected User createBy;
//
//
//    @JoinColumn(name = "updateUserId", referencedColumnName = "id", updatable = false)
//    @ManyToOne(optional = false, targetEntity = User.class)
//    protected User updateBy;

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


    public Department() {
    }

    public Department(String name) {
        this.name = name;
    }

}