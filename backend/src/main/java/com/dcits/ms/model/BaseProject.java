package com.dcits.ms.model;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;

/**
 * 基础项目信息表
 */
@Entity
@Setter
@Getter
@Table(name = "ms_base_project")
public class BaseProject {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    @Column(nullable = false)
    String name;

    @Column
    String projectDesc;


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


    public BaseProject() {
    }


    public BaseProject(String name, String projectDesc){
        this.name = name;
        this.projectDesc = projectDesc;
    }

}