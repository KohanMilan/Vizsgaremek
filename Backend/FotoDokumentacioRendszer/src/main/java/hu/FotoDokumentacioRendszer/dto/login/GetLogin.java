package hu.FotoDokumentacioRendszer.dto.login;

public class GetLogin {
    private String token;
    private String username;
    private boolean isAdmin;

    public GetLogin() {

    }

    public GetLogin(String token, boolean isAdmin,String username) {
        this.token = token;
        this.isAdmin = isAdmin;
        this.username=username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
}
