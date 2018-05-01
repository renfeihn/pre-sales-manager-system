package com.dcits.ms.model.factory;

import com.dcits.ms.model.Project;
import com.dcits.ms.model.Supporter;
import com.dcits.ms.model.User;
import com.dcits.ms.model.vo.SupporterVo;
import org.springframework.stereotype.Component;


@Component
public class SupporterFactory {

    public Supporter create(SupporterVo SupporterVo, Project project, User user) {

        Supporter Supporter = new Supporter(SupporterVo.getName(), SupporterVo.getJobTittle(),
                SupporterVo.getDepartmentName(), project, user);

        return Supporter;
    }

}
