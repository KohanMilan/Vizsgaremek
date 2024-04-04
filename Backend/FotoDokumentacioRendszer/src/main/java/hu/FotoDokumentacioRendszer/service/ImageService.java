package hu.FotoDokumentacioRendszer.service;

import hu.FotoDokumentacioRendszer.dto.image.EditImage;
import hu.FotoDokumentacioRendszer.dto.image.CreateImage;
import hu.FotoDokumentacioRendszer.dto.image.GetImage;
import hu.FotoDokumentacioRendszer.exception.image.ImageNotFoundException;
import hu.FotoDokumentacioRendszer.model.Group;
import hu.FotoDokumentacioRendszer.model.Image;
import hu.FotoDokumentacioRendszer.model.User;
import hu.FotoDokumentacioRendszer.repository.GroupRepository;
import hu.FotoDokumentacioRendszer.repository.ImageRepository;
import hu.FotoDokumentacioRendszer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService {
    @Autowired
    private ImageRepository repository;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GroupRepository groupRepository;
    public List<GetImage> getImages() {

        List<GetImage> response = this.repository.findAll().stream().map(x -> {
            System.out.println(x);
            return new GetImage(x);
        }).toList();

        return response;
    }

    public GetImage createImage(CreateImage createImage,String token) {

        User user=authenticationService.getUser(token);
        Group group=groupRepository.getOne(createImage.getGroup().getId());
        Image created = new Image(createImage,user,group);
        return new GetImage( this.repository.save(created));
    }

    public boolean removeImage(Integer id) {
        if(!repository.existsById(id))
            throw new ImageNotFoundException();
        repository.deleteById(id);
        return true;    }

    public GetImage editImage(EditImage editImage,Integer id) {

        if(!repository.existsById(id))
            throw new ImageNotFoundException();
        Image image =repository.getOne(id);
        image.setLatitude(editImage.getLatitude());
        image.setLongitude(editImage.getLongitude());
        image.setName(editImage.getName());
        image.setDescription(editImage.getDescription());
        Group group=groupRepository.getOne(editImage.getGroup().getId());
        image.setGroup(group);
        image.setImage(editImage.getImage().getBytes());
        return new GetImage( this.repository.save(image));


    }
}
