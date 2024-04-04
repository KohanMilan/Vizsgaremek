package hu.FotoDokumentacioRendszer.dto.group;

import javax.persistence.Column;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class CreateGroup {
    @NotNull
    private String name;
    @NotNull
    @Pattern(regexp = "^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$")
    private String color;

    public CreateGroup(String name, String color) {
        this.name = name;
        this.color = color;
    }

    public CreateGroup() {
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
