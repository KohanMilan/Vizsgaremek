package hu.FotoDokumentacioRendszer.model;

import hu.FotoDokumentacioRendszer.dto.image.CreateImage;
import hu.FotoDokumentacioRendszer.repository.GroupRepository;
import hu.FotoDokumentacioRendszer.repository.UserRepository;
import hu.FotoDokumentacioRendszer.service.GroupService;
import hu.FotoDokumentacioRendszer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Base64;

@Entity
@EnableAutoConfiguration

public class Image {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Double latitude;
    private Double longitude;
    private Date date;
    private String description;
    @ManyToOne
    @JoinColumn(name="group_id", nullable=false)
    private Group group;
    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;
    @Lob
    private byte[] image;

    public Image(){}
    public Image(CreateImage image,User user,Group group){
        this.name = image.getName();
        this.latitude=image.getLatitude();
        this.longitude=image.getLongitude();
        System.out.println(new Date(System.currentTimeMillis()));
        this.date=new Date(System.currentTimeMillis());
        this.description=image.getDescription();
        this.user=user;
        this.group=group;
        this.image= image.getImage().getBytes();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
