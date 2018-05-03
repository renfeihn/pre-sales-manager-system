package com.dcits.ms.model.vo;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 项目信息VO
 */
@Setter
@Getter
public class ProjectVo {

    Integer id;

    Integer baseProjectId;

    String projectName;

    String projectDesc;

    String[] date;

    Integer departmentId;

    String departmentName;

    Integer productId;

    String productName;

    double weight;

    String remarks;

    List<SupporterVo> supporters;

    String logo;

    String createDate;


}