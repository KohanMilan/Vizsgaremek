package hu.FotoDokumentacioRendszer.converter;

import hu.FotoDokumentacioRendszer.dto.group.GetGroup;
import hu.FotoDokumentacioRendszer.model.Group;

import javax.persistence.AttributeConverter;

public class GroupConverter implements AttributeConverter<GetGroup, Group> {

    @Override
    public Group convertToDatabaseColumn(GetGroup getGroup) {
        return new Group(getGroup.getId(), getGroup.getName(), getGroup.getColor());
    }

    @Override
    public GetGroup convertToEntityAttribute(Group group) {
        return new GetGroup(group);
    }
}
