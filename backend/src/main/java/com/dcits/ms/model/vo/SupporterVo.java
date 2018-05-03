package com.dcits.ms.model.vo;

import com.dcits.ms.model.Project;
import com.dcits.ms.model.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;

/**
 * 项目支持人员VO
 */
@Setter
@Getter
public class SupporterVo {


    // 支持人员姓名
    String name;

    // 支持人员岗位
    String jobTitle;


    String departmentName;
}
