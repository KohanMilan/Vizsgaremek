package hu.FotoDokumentacioRendszer.controller;

import hu.FotoDokumentacioRendszer.dto.group.CreateGroup;
import hu.FotoDokumentacioRendszer.dto.group.GetGroup;
import hu.FotoDokumentacioRendszer.model.Group;
import hu.FotoDokumentacioRendszer.repository.GroupRepository;
import hu.FotoDokumentacioRendszer.service.GroupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Tag(name="Group API", description = "Csoportok kezelése")
public class GroupController {
    @Autowired
    private GroupService service;
    @GetMapping("/group")
    @Operation(summary = "Csoportok listázása")
    public List<GetGroup> getGroups(){
        return service.getGroups();
    }
    @PostMapping(path="/group")
    @Operation(summary = "Csoportok létrehozása")
    public GetGroup createGroup(@Valid @RequestBody CreateGroup createGroup){
        return service.createGroup(createGroup);
    }
    @DeleteMapping(path="/group/{id}")
    @Operation(summary = "Csoportok törlése")
    public boolean removeGroup(@PathVariable Integer id){
        return service.removeGroup(id);
    }

    @PutMapping(path="/group/{id}")
    @Operation(summary = "Csoportok szerkesztése")
    public GetGroup updateGroup(@Valid @RequestBody CreateGroup createGroup, @PathVariable Integer id){
        return service.updateGroup(createGroup, id);
    }
}
