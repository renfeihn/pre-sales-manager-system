package com.dcits.ms.model;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;

/**
 * 用户表
 */
@Entity
@Setter
@Getter
@Table(name = "ms_user")
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    @Column(nullable = false, unique = true)
    String username;
    @Column(nullable = false)
    String password;
    @Column(nullable = false)
    String sec;
    // 角色
    @Column(nullable = false)
    String role;
    // 部门(事业部)
    @Column
    String department;
    // 职位
    @Column
    String position;
    // 中文姓名
    @Column
    String zhName;
    // 工号
    @Column
    String jobNumber;

    @Column
    String token;


//    @JoinColumn(name = "createUserId", referencedColumnName = "id", updatable = false)
//    @OneToOne(optional = false, targetEntity = User.class)
//    protected User createBy;
//
//
//    @JoinColumn(name = "updateUserId", referencedColumnName = "id", updatable = false)
//    @OneToOne(optional = false, targetEntity = User.class)
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

    public User() {

    }

    public User(String username, String password, String sec, String role) {
        this.username = username;
        this.password = password;
        this.sec = sec;
        this.role = role;
    }

    public User(String username, String password, String sec, String role,
                String department, String position, String zhName) {
        this.username = username;
        this.password = password;
        this.sec = sec;
        this.role = role;
        this.department = department;
        this.position = position;
        this.zhName = zhName;
    }
}