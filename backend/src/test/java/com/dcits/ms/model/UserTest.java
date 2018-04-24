package com.dcits.ms.model;

import org.junit.Test;

import com.dcits.ms.model.User;

import java.util.Arrays;

import static org.junit.Assert.*;

public class UserTest {

    @Test
    public void testCreateEmptyConstructor() {
        User u = new User();
        u.id = 1;
        u.password = "a";
        u.username = "b";
        u.sec = "c";
        u.token = "d";
        u.setToken("e");

        assertEquals(u.id, u.getId());
        assertEquals(u.password, u.getPassword());
        assertEquals(u.username, u.getUsername());
        assertEquals(u.sec, u.getSec());
        assertEquals(u.token, u.getToken());
        assertEquals(u.role, u.getRole());
    }

    @Test
    public void testCreateNonEmptyConstructor() {
        User u = new User("username", "pass", "sec", "USER");
        assertEquals("pass", u.getPassword());
        assertEquals("username", u.getUsername());
        assertEquals("sec", u.getSec());
        assertEquals(u.getRole(), "USER");
    }


}
