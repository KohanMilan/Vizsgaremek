package hu.FotoDokumentacioRendszer.util;
import hu.FotoDokumentacioRendszer.exception.auth.UnauthorizedException;
import hu.FotoDokumentacioRendszer.model.User;
import hu.FotoDokumentacioRendszer.service.AuthenticationService;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Base64;
import java.util.Date;

public class JwtUtil {
    private static final String SECRET = "your-secret-key";
    private static final long EXPIRATION_TIME = 864_000_000; // 10 days


    public static String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }
    public static String extractUsername(String token) {
        System.out.println(token);
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }


    public static boolean isAdmin(String authToken,AuthenticationService authenticationService){
        try {
            System.out.println(Jwts.parser().setSigningKey(SECRET).parseClaimsJws(authToken).getBody().get("sub"));
            User user= authenticationService.getUser(authToken);

            return user.getAdmin();
        } catch (SignatureException ex) {
            return false;
        } catch (MalformedJwtException ex) {
            return false;
        } catch (ExpiredJwtException ex) {
            return false;
        } catch (UnsupportedJwtException ex) {
            return false;
        } catch (IllegalArgumentException ex) {
            return false;
        }
    }
    public static boolean checkToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            return false;
        } catch (MalformedJwtException ex) {
            return false;
        } catch (ExpiredJwtException ex) {
            return false;
        } catch (UnsupportedJwtException ex) {
            return false;
        } catch (IllegalArgumentException ex) {
            return false;
        }


    }
    public static String getUsername(String token){

        String[] chunks = token.split("\\.");

        Base64.Decoder decoder = Base64.getUrlDecoder();
        String payload = new String(decoder.decode(chunks[1]));


        String username =Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();

        System.out.println(username);
        return username;
    }
}

