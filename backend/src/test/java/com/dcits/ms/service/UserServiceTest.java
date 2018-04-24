package com.dcits.ms.service;


import org.apache.commons.codec.binary.Base64;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import org.springframework.security.authentication.encoding.ShaPasswordEncoder;

import com.dcits.ms.model.User;
import com.dcits.ms.model.factory.UserFactory;
import com.dcits.ms.repository.UserRepository;
import com.dcits.ms.security.jwt.JwtService;
import com.dcits.ms.service.UserService;
import com.dcits.ms.support.DateGenerator;
import com.dcits.ms.support.StringSupport;

import java.util.Date;

import static org.mockito.Mockito.*;
import static org.junit.Assert.*;

@RunWith(value = org.mockito.junit.MockitoJUnitRunner.class)
public class UserServiceTest {

    public static final String SEC = "sec";
    public static final String PASS = "pass";
    public static final String ENCODED_PASS = "123";
    public static final String USERNAME = "username";
    public static final String ROLE = "USER";
    public static final String SECRET = "secret";
    public static final String TOKEN = "token";

    @InjectMocks
    UserService userService;
    @Mock
    UserRepository userRepository;
    @Mock
    ShaPasswordEncoder shaPasswordEncoder;
    @Mock
    StringSupport stringSupport;
    @Mock
    UserFactory userFactory;
    @Mock
    DateGenerator dateGenerator;
    @Mock
    JwtService jwtService;


    User user;
    Date date;

    @Before
    public void before() {
        date = new Date();
        when(stringSupport.generate()).thenReturn(SEC);
        when(shaPasswordEncoder.encodePassword(PASS, SEC)).thenReturn(ENCODED_PASS);
        user = new User();
        when(userFactory.create(USERNAME, ENCODED_PASS, SEC, ROLE)).thenReturn(user);
        when(dateGenerator.getExpirationDate()).thenReturn(date);
    }

    @Test
    public void testCreate() {
        userService.create(USERNAME, PASS, ROLE);
        verify(userRepository).save(user);
    }

    @Test
    public void testIsLoginValidEmptyParams() {
        assertNull(userService.isLoginValid(null, null) );
        assertNull(userService.isLoginValid("", null));
        assertNull(userService.isLoginValid(null, ""));
        verifyZeroInteractions(userRepository, shaPasswordEncoder);
    }

    @Test
    public void testIsLoginValidNullUser() {
        when(userRepository.findByUsername(USERNAME)).thenReturn(null);
        assertNull(userService.isLoginValid(USERNAME, new String(Base64.encodeBase64(PASS.getBytes()))));
        verifyZeroInteractions(shaPasswordEncoder);
    }

    @Test
    public void testIsLoginValidDiffPass() {
        User u = new User(USERNAME, PASS, SEC, ROLE);
        when(userRepository.findByUsername(USERNAME)).thenReturn(u);
        assertNull(userService.isLoginValid(USERNAME, new String(Base64.encodeBase64(PASS.getBytes()))));
    }

    @Test
    public void testIsLoginValidSuccess() {
        User u = new User(USERNAME, ENCODED_PASS, SEC, ROLE);
        when(userRepository.findByUsername(USERNAME)).thenReturn(u);
        assertEquals(u, userService.isLoginValid(USERNAME, new String(Base64.encodeBase64(PASS.getBytes()))));
    }

    @Test
    public void testFindByUsername() {
        User u = new User(USERNAME, PASS, SEC, ROLE);
        when(userRepository.findByUsername(USERNAME)).thenReturn(u);
        assertEquals(u, userService.findByUsername(USERNAME));
    }

    @Test
    public void testCreateUserToken() {
        User u = new User(USERNAME, ENCODED_PASS, SEC, ROLE);
        when(jwtService.createToken(USERNAME, SECRET, date)).thenReturn(TOKEN);
        when(userRepository.findByUsername(USERNAME)).thenReturn(u);
        when(userRepository.save(u)).thenReturn(u);
        User u2 = userService.createUserToken(USERNAME, SECRET);
        verify(userRepository).save(u);
        assertEquals(TOKEN, u2.getToken());
    }

    @Test
    public void testValidateUserNullUsername() {
        when(jwtService.getUsername(TOKEN, SECRET)).thenReturn(null);
        assertNull(userService.validateUser(TOKEN, SECRET));
    }

    @Test
    public void testValidateUserNullUser() {
        when(jwtService.getUsername(TOKEN, SECRET)).thenReturn(USERNAME);
        when(userRepository.findByUsername(USERNAME)).thenReturn(null);
        when(jwtService.isValid(TOKEN, SECRET)).thenReturn(true);
        assertNull(userService.validateUser(TOKEN, SECRET));
    }

    @Test
    public void testValidateUserInvalidToken() {
        User u = new User(USERNAME, ENCODED_PASS, SEC, ROLE);
        when(jwtService.getUsername(TOKEN, SECRET)).thenReturn(USERNAME);
        when(userRepository.findByUsername(USERNAME)).thenReturn(u);
        when(jwtService.isValid(TOKEN, SECRET)).thenReturn(false);
        assertNull(userService.validateUser(TOKEN, SECRET));
    }

    @Test
    public void testValidateUserTokenDiff() {
        User u = new User(USERNAME, ENCODED_PASS, SEC, ROLE);
        u.setToken(TOKEN + "2");
        when(jwtService.getUsername(TOKEN, SECRET)).thenReturn(USERNAME);
        when(userRepository.findByUsername(USERNAME)).thenReturn(u);
        when(jwtService.isValid(TOKEN, SECRET)).thenReturn(true);
        assertNull(userService.validateUser(TOKEN, SECRET));
    }

    @Test
    public void testValidateUserSuccess() {
        User u = new User(USERNAME, ENCODED_PASS, SEC, ROLE);
        u.setToken(TOKEN);
        when(jwtService.getUsername(TOKEN, SECRET)).thenReturn(USERNAME);
        when(userRepository.findByUsername(USERNAME)).thenReturn(u);
        when(jwtService.isValid(TOKEN, SECRET)).thenReturn(true);
        assertEquals(u, userService.validateUser(TOKEN, SECRET));
    }

}
