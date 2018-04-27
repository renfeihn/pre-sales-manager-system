package com.dcits.ms.model.factory;

import com.dcits.ms.model.Department;
import com.dcits.ms.model.User;
import org.springframework.stereotype.Component;


@Component
public class DepartmentFactory {

    public Department create(String depName, User user) {
        return new Department(depName, user);
    }

}
