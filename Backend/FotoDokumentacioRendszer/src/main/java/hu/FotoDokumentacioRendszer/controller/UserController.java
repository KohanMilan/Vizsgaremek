package hu.FotoDokumentacioRendszer.controller;

import hu.FotoDokumentacioRendszer.dto.group.CreateGroup;
import hu.FotoDokumentacioRendszer.dto.group.GetGroup;
import hu.FotoDokumentacioRendszer.dto.user.CreateUser;
import hu.FotoDokumentacioRendszer.dto.user.GetUser;
import hu.FotoDokumentacioRendszer.interceptor.Authenticated;
import hu.FotoDokumentacioRendszer.interceptor.IsAdmin;
import hu.FotoDokumentacioRendszer.service.GroupService;
import hu.FotoDokumentacioRendszer.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController

@Tag(name="User API", description = "Felhasználók kezelése")
public class UserController {


    @Autowired
    private UserService service;
    @Authenticated
    @IsAdmin
    @GetMapping("/user")
    @Operation(summary = "Felhasználók listázása")
    public List<GetUser> getUsers(){
        return service.getUsers();
    }
    @PostMapping(path="/user")
    @Operation(summary = "Felhasználók létrehozása")
    public GetUser createUser(@Valid @RequestBody CreateUser createUser){

        return service.createUser(createUser);
    }
    @DeleteMapping(path="/user/{id}")
    @Operation(summary = "Felhasználók törlése")
    public boolean removeUser(@PathVariable Integer id,@RequestHeader("Authorization") String token){
        return service.removeUser(id,token);
    }
    @PutMapping(path="/user/{id}")
    @Operation(summary = "Felhasználók szerkesztése")
    public GetUser updateUser(@Valid @RequestBody CreateUser createUser, @PathVariable Integer id){
        return service.updateUser(createUser, id);
    }
}
