package com.dcits.ms.model.factory;


import org.junit.Test;

import com.dcits.ms.model.factory.UserFactory;

import java.util.Arrays;

import static org.junit.Assert.*;

public class UserFactoryTest {

    @Test
    public void testCreate() {
        UserFactory userFactory = new UserFactory();
        assertNotNull(userFactory.create("username", "pass", "sec", "USER"));
    }

}
