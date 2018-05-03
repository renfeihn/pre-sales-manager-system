package com.dcits.ms.model.factory;

import com.dcits.ms.model.BaseProject;
import org.springframework.stereotype.Component;


@Component
public class BaseProjectFactory {


    public BaseProject create(String name) {
        return new BaseProject(name, "");
    }

}
