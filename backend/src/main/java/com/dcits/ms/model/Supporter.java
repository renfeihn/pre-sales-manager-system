package com.dcits.ms.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;

/**
 * 项目支持人员表
 */
@Entity
@Setter
@Getter
@Table(name = "ms_project_supporter")
public class Supporter {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    @JoinColumn(name = "projectId", referencedColumnName = "id", nullable = false, updatable = false)
    @ManyToOne(optional = false, targetEntity = Project.class)
    Project project;


    // 支持人员姓名
    @Column
    String name;

    // 支持人员岗位
    @Column
    String jobTitle;

    @Column
    String departmentName;


//    @JoinColumn(name = "supportUserId", referencedColumnName = "id", nullable = false, updatable = false)
//    @ManyToOne(optional = false, targetEntity = User.class)
//    User supportUser;


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


    public Supporter() {
    }


    public Supporter(String name, String jobTitle, String departmentName,Project project ,User user) {
        this.name = name;
        this.jobTitle = jobTitle;
        this.departmentName = departmentName;
        this.project = project;
        this.createBy = user;
        this.updateBy = user;
        this.createDate = new Date();
        this.updateDate = new Date();
    }


}
