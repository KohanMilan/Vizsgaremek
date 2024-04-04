package hu.FotoDokumentacioRendszer.model;
import hu.FotoDokumentacioRendszer.dto.group.CreateGroup;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;

import java.util.List;

@Entity
@EnableAutoConfiguration
@Table(name="groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true)
    private String name;
    private String color;
    @OneToMany
    @JoinColumn(name = "group_id")
    private List<Image> images;

    public Group(Integer id, String name, String color) {
        this.id = id;
        this.name = name;
        this.color = color;
    }

    public Group(CreateGroup createGroup) {
        this.name = createGroup.getName();
        this.color = createGroup.getColor();
    }

    public Group() {
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

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
