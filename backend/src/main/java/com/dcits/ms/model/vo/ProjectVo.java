package com.dcits.ms.model.vo;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

/**
 * 项目信息VO
 */
@Setter
@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProjectVo {


    public ProjectVo() {
    }

    Integer id;

    Integer baseProjectId;

    String projectName;

    String projectDesc;

    String[] date;

    Integer departmentId;

    String departmentName;

    BigDecimal bidRatio;

    Integer productId;

    String productName;

    double weight;

    String remarks;

    List<SupporterVo> supporters;

    String createDate;

    String updateDate;


    // 无用的
    String href;
    String logo;
    String memberLink;

}