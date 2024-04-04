package hu.FotoDokumentacioRendszer.dto.image;

import hu.FotoDokumentacioRendszer.dto.group.GetGroup;
import hu.FotoDokumentacioRendszer.dto.user.GetUser;
import hu.FotoDokumentacioRendszer.model.Image;

import java.sql.Date;
import java.util.Base64;

public class CreateImage {

    private String name;
    private Double latitude;
    private Double longitude;
    private String description;
    private GetGroup group;
    private String image;

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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public CreateImage(){


    }
}
