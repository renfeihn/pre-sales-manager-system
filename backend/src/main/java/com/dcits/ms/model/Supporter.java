package com.dcits.ms.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * 项目支持人员表
 */
@Entity
@Setter
@Getter
@Table(name = "ms_project_supporter")
public class Supporter extends DataEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    @JoinColumn(name = "project_id", referencedColumnName = "id", nullable = false, updatable = false)
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

    public Supporter() {
    }


    public Supporter(String name, String jobTitle, String departmentName,Project project ,User user) {
        this.name = name;
        this.jobTitle = jobTitle;
        this.departmentName = departmentName;
        this.project = project;
        this.createBy = user;
        this.updateBy = user;
    }


}
