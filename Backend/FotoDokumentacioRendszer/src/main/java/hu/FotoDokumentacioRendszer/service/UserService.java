package hu.FotoDokumentacioRendszer.service;

import hu.FotoDokumentacioRendszer.dto.group.GetGroup;
import hu.FotoDokumentacioRendszer.dto.user.CreateUser;
import hu.FotoDokumentacioRendszer.dto.user.GetUser;
import hu.FotoDokumentacioRendszer.exception.group.GroupNotFoundException;
import hu.FotoDokumentacioRendszer.exception.user.UserAlreadyExistsException;
import hu.FotoDokumentacioRendszer.exception.user.UserNotFoundException;
import hu.FotoDokumentacioRendszer.exception.user.UserUploadedImageException;
import hu.FotoDokumentacioRendszer.model.Group;
import hu.FotoDokumentacioRendszer.model.User;
import hu.FotoDokumentacioRendszer.repository.UserRepository;
import hu.FotoDokumentacioRendszer.util.Password;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    @Autowired
    private AuthenticationService authenticationService;

    public List<GetUser> getUsers() {
        List<GetUser> list = new ArrayList<>();
        repository.findAll().forEach(user -> {
            list.add(new GetUser(user));
        });
        return list;
    }

    public GetUser createUser(CreateUser createUser) {

        User user = new User(createUser);
        try {
            User createdUser = repository.save(user);
            return new GetUser(createdUser);
        }catch (Exception e){

            throw new UserAlreadyExistsException();
        }
    }

    public boolean removeUser(Integer id,String token) {
        User user=authenticationService.getUser(token);
        if(id.equals(user.getId())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if(!repository.existsById(id))
            throw new UserNotFoundException();
        if(!repository.existsById(id))
            throw new UserUploadedImageException();
        repository.deleteById(id);
        return true;
    }

    public GetUser updateUser(CreateUser createUser, Integer id) {
        if(!repository.existsById(id))
            throw new UserNotFoundException();
        User savingUser = repository.getOne(id);
        System.out.println(savingUser);
        savingUser.setUsername(createUser.getUsername());
        savingUser.setPassword(Password.hashPassword(createUser.getPassword()));
        savingUser.setEmail(createUser.getEmail());
        savingUser.setAdmin(createUser.getAdmin());
        savingUser.setEnabled(createUser.getEnabled());
        savingUser.setFirstname(createUser.getFirstname());
        savingUser.setLastname(createUser.getLastname());
        User savedUser = repository.save(savingUser);
        GetUser getUser = new GetUser(savedUser);
        return getUser;
    }
}
