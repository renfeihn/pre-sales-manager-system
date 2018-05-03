package com.dcits.ms.model.factory;

import com.dcits.ms.model.Department;
import org.springframework.stereotype.Component;

import com.dcits.ms.model.User;


@Component
public class UserFactory {

    public User create(String username, String password, String sec, String role) {
        return new User(username, password, sec, role);
    }

    public User create(String username, String password, String sec, String role,
                       Department department, String jobTitle, String zhName) {
        return new User(username, password, sec, role, department, jobTitle, zhName);
    }

}
