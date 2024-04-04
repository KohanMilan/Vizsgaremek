package hu.FotoDokumentacioRendszer.controller;

import hu.FotoDokumentacioRendszer.dto.group.GetGroup;
import hu.FotoDokumentacioRendszer.dto.login.GetLogin;
import hu.FotoDokumentacioRendszer.dto.login.Login;
import hu.FotoDokumentacioRendszer.model.User;
import hu.FotoDokumentacioRendszer.service.AuthenticationService;
import hu.FotoDokumentacioRendszer.service.GroupService;
import hu.FotoDokumentacioRendszer.util.Password;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name="Authentication API", description = "Autentikációk kezelése")
public class AuthenticationController {
    @Autowired
    private AuthenticationService service;

   /* @GetMapping("/auth")
    @Operation(summary = "", description = "")
    public String getAuth() {
        return Password.hashPassword("admin");
    }*/
       /*  // secret key used by password encoding
        int iterations = 200000;  // number of hash iteration
        int hashWidth = 256;      // hash width in bits

        Pbkdf2PasswordEncoder pbkdf2PasswordEncoder =
                new Pbkdf2PasswordEncoder(secret, iterations, hashWidth);
        pbkdf2PasswordEncoder.setEncodeHashAsBase64(true);
        String encodedPassword = pbkdf2PasswordEncoder.encode("admin");
        return encodedPassword;
    }*/
    @PostMapping("/auth/login")
    @Operation(summary = "Bejelentkezés")
    public GetLogin login(@RequestBody Login login){
        return service.login(login);
    }


}
//INSERT INTO `users`(`email`, `enabled`, `firstname`, `is_admin`, `lastname`, `password`, `username`) VALUES ('kohan.milan@gmail.com',true,'Kohán',true,'Milán','$2a$12$8NnlaJ13QrCuBRcGM7glruvCuzgr1SJis.7PcimCSwns09stIvfH2','kohan');