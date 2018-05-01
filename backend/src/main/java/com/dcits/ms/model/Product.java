package com.dcits.ms.model;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
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
public class Product {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    @Column(nullable = false)
    String prodName;


//    @JoinColumn(name = "createUserId", referencedColumnName = "id", nullable = false, updatable = false)
//    @ManyToOne(optional = false, targetEntity = User.class)
//    protected User createBy;
//
//
//    @JoinColumn(name = "updateUserId", referencedColumnName = "id", nullable = false, updatable = false)
//    @ManyToOne(optional = false, targetEntity = User.class)
//    protected User updateBy;

    // 备注
    @Column
    protected String remarks;

//    // 创建日期
//    @Column
//    @CreatedDate
//    protected Date createDate;
//
//    // 更新日期
//    @Column
//    @LastModifiedDate
//    protected Date updateDate;

    // 删除标记（0：正常；1：删除）
    @Column
    protected String delFlag;


    public Product() {
    }

    public Product(String prodName){
        this.prodName = prodName;
    }

}