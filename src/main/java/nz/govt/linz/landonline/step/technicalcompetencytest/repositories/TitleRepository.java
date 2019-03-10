package nz.govt.linz.landonline.step.technicalcompetencytest.repositories;

import nz.govt.linz.landonline.step.technicalcompetencytest.models.Title;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.Repository;

public interface TitleRepository extends JpaRepository<Title, Long> {
}
