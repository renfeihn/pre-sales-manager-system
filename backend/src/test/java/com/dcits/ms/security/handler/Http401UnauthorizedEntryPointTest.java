package com.dcits.ms.security.handler;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.core.AuthenticationException;

import com.dcits.ms.security.handler.HeaderHandler;
import com.dcits.ms.security.handler.Http401UnauthorizedEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

import static org.mockito.Mockito.*;

@RunWith(value = MockitoJUnitRunner.class)
public class Http401UnauthorizedEntryPointTest {

    @InjectMocks
    Http401UnauthorizedEntryPoint http401UnauthorizedEntryPoint;
    @Mock
    HeaderHandler headerHandler;

    @Test
    public void testCommence() throws IOException, ServletException {

        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        AuthenticationException authenticationException = mock(AuthenticationException.class);

        http401UnauthorizedEntryPoint.commence(request, response, authenticationException);

        verify(response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Access Denied");
        verify(headerHandler).process(request, response);
    }

}
