package hu.FotoDokumentacioRendszer.service;

import hu.FotoDokumentacioRendszer.dto.login.GetLogin;
import hu.FotoDokumentacioRendszer.dto.login.Login;
import hu.FotoDokumentacioRendszer.model.User;
import hu.FotoDokumentacioRendszer.repository.UserRepository;
import hu.FotoDokumentacioRendszer.util.JwtUtil;
import hu.FotoDokumentacioRendszer.util.Password;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

@Service
public class AuthenticationService {
    @Autowired
    private UserRepository repository;
    public GetLogin login(Login login) {
        User user = repository.findByUsername(login.getUsername());
        if (user == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        if (!Password.checkPassword(login.getPassword(),user.getPassword()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        if (user.getEnabled() == false)
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        return new GetLogin(JwtUtil.generateToken(user.getUsername()),user.getAdmin(),user.getUsername());
    }

    public static String getSecurePassword(String password, byte[] salt) {

        String generatedPassword = null;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(salt);
            byte[] bytes = md.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < bytes.length; i++) {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
            }
            generatedPassword = sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return generatedPassword;
    }

    private static byte[] getSalt() throws NoSuchAlgorithmException {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }

    public User getUser(String token){
        String username = JwtUtil.getUsername(token);
        User user = repository.findByUsername(username);
        return user;
    }
}
