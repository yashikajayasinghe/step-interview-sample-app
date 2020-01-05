package nz.govt.linz.landonlite.repositories;

import nz.govt.linz.landonlite.models.Title;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TitleRepository extends JpaRepository<Title, Long> {
}
