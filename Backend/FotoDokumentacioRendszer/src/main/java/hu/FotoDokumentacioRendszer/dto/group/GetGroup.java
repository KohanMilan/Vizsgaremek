package hu.FotoDokumentacioRendszer.dto.group;

import hu.FotoDokumentacioRendszer.model.Group;

public class GetGroup {
    private Integer id;
    private String name;
    private String color;

    public GetGroup(Group group) {
        this.id = group.getId();
        this.name = group.getName();
        this.color = group.getColor();
    }

    public GetGroup() {
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
