package hu.FotoDokumentacioRendszer.model;

import hu.FotoDokumentacioRendszer.dto.user.CreateUser;
import hu.FotoDokumentacioRendszer.util.Password;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import java.util.List;

@Entity
@EnableAutoConfiguration
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true)
    private String username;
    private String password;
    @Column(unique = true)
    private String email;
    private Boolean isAdmin;
    private Boolean enabled;
    private String firstname;
    private String lastname;
    @OneToMany
    @JoinColumn(name = "user_id")
    private List<Image> images;

    public User(Integer id, String username, String password, String email, Boolean isAdmin, Boolean enabled, String firstname, String lastname) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.isAdmin = isAdmin;
        this.enabled = enabled;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public User(CreateUser createUser) {
        this.username = createUser.getUsername();
        this.password = Password.hashPassword( createUser.getPassword());
        this.email = createUser.getEmail();
        this.isAdmin = createUser.getAdmin();
        this.enabled = createUser.getEnabled();
        this.firstname = createUser.getFirstname();
        this.lastname = createUser.getLastname();
    }

    public User() {
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
