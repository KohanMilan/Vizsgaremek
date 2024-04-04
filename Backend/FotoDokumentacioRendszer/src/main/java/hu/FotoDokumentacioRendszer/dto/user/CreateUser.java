package hu.FotoDokumentacioRendszer.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class CreateUser {
    @NotNull
    private String username;
    @NotNull
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Pattern(regexp = "^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,16}$")
    private String password;
        /*
        This regex matches only when all the following are true:

        password must contain 1 number (0-9)
        password must contain 1 uppercase letters
        password must contain 1 lowercase letters
        password must contain 1 non-alpha numeric number
        password is 8-16 characters with no space
        */
    @NotNull
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$")
    private String email;
    private Boolean isAdmin;
    private Boolean enabled;
    @NotNull
    private String firstname;
    @NotNull
    private String lastname;

    public CreateUser(String username, String password, String email, Boolean isAdmin, Boolean enabled, String firstname, String lastname) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.isAdmin = isAdmin;
        this.enabled = enabled;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public CreateUser() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
