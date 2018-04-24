package com.dcits.ms.model.factory;

import org.springframework.stereotype.Component;

import com.dcits.ms.model.User;



@Component
public class UserFactory {

    public User create(String username, String password, String sec, String role) {
        return new User(username, password, sec, role);
    }

}
