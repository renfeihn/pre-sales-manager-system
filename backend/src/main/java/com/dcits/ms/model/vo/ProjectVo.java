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



    String projectName;

    String projectDesc;

    String[] date;

    Integer departmentId;

    Integer productId;

    double weight;

    String remarks;

    List<SupporterVo> supporters;


}