package hu.FotoDokumentacioRendszer.converter;

import hu.FotoDokumentacioRendszer.dto.user.GetUser;
import hu.FotoDokumentacioRendszer.model.User;

import javax.persistence.AttributeConverter;

public class UserConverter implements AttributeConverter<GetUser, User> {
    @Override
    public User convertToDatabaseColumn(GetUser getUser) {
        return new User();
    }

    @Override
    public GetUser convertToEntityAttribute(User user) {
        return new GetUser(user);
    }
}
