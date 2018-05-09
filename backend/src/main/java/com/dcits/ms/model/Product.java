package com.dcits.ms.model;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.expression.spel.ast.OpAnd;

import javax.persistence.*;
import java.util.Date;

/**
 * 产品族信息表
 */
@Entity
@Setter
@Getter
@Table(name = "ms_product")
@EntityListeners(AuditingEntityListener.class)
public class Product {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    @Column(nullable = false)
    String name;


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


    public Product() {
    }

    public Product(String name){
        this.name = name;
    }

}