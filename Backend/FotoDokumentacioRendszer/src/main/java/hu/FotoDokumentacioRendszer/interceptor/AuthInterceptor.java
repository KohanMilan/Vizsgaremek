package hu.FotoDokumentacioRendszer.interceptor;


import hu.FotoDokumentacioRendszer.exception.auth.UnauthorizedException;
import hu.FotoDokumentacioRendszer.service.AuthenticationService;
import hu.FotoDokumentacioRendszer.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class AuthInterceptor implements HandlerInterceptor {



    @Autowired
    private AuthenticationService authenticationService;

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler
    ) throws Exception {


        if (!(handler instanceof HandlerMethod)) {
            return true;
        }

        HandlerMethod handlerMethod = (HandlerMethod) handler;



        if (handlerMethod.hasMethodAnnotation(IsAdmin.class)) {
            System.out.println("ASD");
            String authorizationHeader = request.getHeader("Authorization");

            boolean result =JwtUtil.isAdmin(authorizationHeader,authenticationService);
            if(!result){
                throw new UnauthorizedException();
            }
            return true;

        }

        if (handlerMethod.hasMethodAnnotation(Authenticated.class)) {
            String authorizationHeader = request.getHeader("Authorization");

            boolean result =JwtUtil.checkToken(authorizationHeader);
            if(!result){
                throw new UnauthorizedException();
            }
            return true;
        }






       return true;
    }
}