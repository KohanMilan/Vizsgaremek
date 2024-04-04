package hu.FotoDokumentacioRendszer.dto.image;

import hu.FotoDokumentacioRendszer.dto.group.GetGroup;
import hu.FotoDokumentacioRendszer.dto.user.GetUser;
import hu.FotoDokumentacioRendszer.model.Group;
import hu.FotoDokumentacioRendszer.model.Image;
import hu.FotoDokumentacioRendszer.model.User;

import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import java.sql.Date;
import java.util.Base64;

public class GetImage {
    private Integer id;
    private String name;
    private Double latitude;
    private Double longitude;
    private Date date;
    private String description;
    private GetGroup group;
    private GetUser user;
    private String image;

    public GetImage(Image image ){
        this.id=image.getId();
        this.name = image.getName();
        this.latitude=image.getLatitude();
        this.longitude=image.getLongitude();
        this.date=image.getDate();
        this.description=image.getDescription();
        this.group=new GetGroup(image.getGroup());
        this.user = new GetUser(image.getUser());
        this.image = new String(image.getImage());


    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public GetGroup getGroup() {
        return group;
    }

    public void setGroup(GetGroup group) {
        this.group = group;
    }

    public GetUser getUser() {
        return user;
    }

    public void setUser(GetUser user) {
        this.user = user;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
