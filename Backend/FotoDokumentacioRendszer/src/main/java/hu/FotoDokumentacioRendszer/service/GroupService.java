package hu.FotoDokumentacioRendszer.service;

import hu.FotoDokumentacioRendszer.dto.group.CreateGroup;
import hu.FotoDokumentacioRendszer.dto.group.GetGroup;
import hu.FotoDokumentacioRendszer.exception.group.GroupAlreadyExistsException;
import hu.FotoDokumentacioRendszer.exception.group.GroupInUseException;
import hu.FotoDokumentacioRendszer.exception.group.GroupNotFoundException;
import hu.FotoDokumentacioRendszer.model.Group;
import hu.FotoDokumentacioRendszer.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GroupService {
    @Autowired
    private GroupRepository repository;

    public List<GetGroup> getGroups(){
        List<GetGroup> list = new ArrayList<>();
        repository.findAll().forEach(group -> {
            list.add(new GetGroup(group));
        });
        return list;
    }
    public GetGroup createGroup(CreateGroup createGroup){
        Group group = new Group(createGroup);
        try {
            Group createdGroup = repository.save(group);
            return new GetGroup(createdGroup);
        }catch (Exception e){
            throw new GroupAlreadyExistsException();
        }
    }

    public boolean removeGroup(Integer id) {
        if(!repository.existsById(id))
            throw new GroupNotFoundException();
        try{
            repository.deleteById(id);

        }catch(Exception e){
            throw new GroupInUseException();
        }

        return true;
    }

    public GetGroup updateGroup(CreateGroup createGroup, Integer id) {
        if(!repository.existsById(id))
            throw new GroupNotFoundException();
        Group savingGroup = repository.getOne(id);
        savingGroup.setName(createGroup.getName());
        savingGroup.setColor(createGroup.getColor());
        Group savedGroup = repository.save(savingGroup);
        GetGroup getGroup = new GetGroup(savedGroup);
        return getGroup;
    }
}
