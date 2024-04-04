package hu.FotoDokumentacioRendszer.controller;

import hu.FotoDokumentacioRendszer.dto.image.EditImage;
import hu.FotoDokumentacioRendszer.dto.image.CreateImage;
import hu.FotoDokumentacioRendszer.dto.image.GetImage;
import hu.FotoDokumentacioRendszer.service.ImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@Tag(name="Image API", description = "Képek kezelése")
public class ImageController {
    @Autowired
    private ImageService service;

    @GetMapping("/image")
    @Operation(summary = "Képek listázása")
    public List<GetImage> getImages(){
        return this.service.getImages();

    }

    @PostMapping("/image")
    @Operation(summary = "Képek létrehozása")
    public GetImage createImage(@RequestBody CreateImage createImage, @RequestHeader("Authorization") String token){
        return this.service.createImage(createImage,token);

    }

    @PutMapping("/image/{id}")
    @Operation(summary = "Képek szerkesztése")
    public GetImage editImage(@PathVariable Integer id,@RequestBody EditImage editImage, @RequestHeader("Authorization") String token){
        return this.service.editImage(editImage,id);

    }

    @DeleteMapping("/image/{id}")
    @Operation(summary = "Képek törlése")
    public boolean removeImage(@PathVariable Integer id){
        return service.removeImage(id);
    }
}
