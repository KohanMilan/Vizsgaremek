package hu.FotoDokumentacioRendszer.dto.user;

import hu.FotoDokumentacioRendszer.model.User;

public class GetUser {
    private Integer id;
    private String username;

    private String email;
    private Boolean isAdmin;
    private Boolean enabled;
    private String firstname;
    private String lastname;

    public GetUser(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.isAdmin = user.getAdmin();
        this.enabled = user.getEnabled();
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
    }

    public GetUser() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
}
