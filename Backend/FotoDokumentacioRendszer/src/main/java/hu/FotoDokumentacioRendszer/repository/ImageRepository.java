package hu.FotoDokumentacioRendszer.repository;

import hu.FotoDokumentacioRendszer.model.Group;
import hu.FotoDokumentacioRendszer.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ImageRepository extends JpaRepository<Image, Integer> {
}
