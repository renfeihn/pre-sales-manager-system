package com.dcits.ms.security.factory;


import org.junit.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.dcits.ms.model.User;
import com.dcits.ms.security.factory.UsernamePasswordAuthenticationTokenFactory;

import static org.junit.Assert.*;


public class UsernamePasswordAuthenticationTokenFactoryTest {

    @Test
    public void testCreate() {
        UsernamePasswordAuthenticationTokenFactory factory = new UsernamePasswordAuthenticationTokenFactory();
        User u = new User("username", "pass", "sec", "role");
        UsernamePasswordAuthenticationToken auth = factory.create(u);
        assertNotNull(auth);
        assertEquals(u.getUsername(), auth.getPrincipal().toString());
        assertEquals(u.getPassword(), auth.getCredentials().toString());
        assertEquals(u.getRole(), auth.getAuthorities().toArray()[0].toString());
    }

}
