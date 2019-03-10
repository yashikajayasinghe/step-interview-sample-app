package nz.govt.linz.landonline.step.technicalcompetencytest.controllers;

import nz.govt.linz.landonline.step.technicalcompetencytest.models.Title;
import nz.govt.linz.landonline.step.technicalcompetencytest.repositories.TitleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/titles")
public class TitlesController {
    private static ResponseEntity NOT_FOUND = ResponseEntity.notFound().build();

    @Autowired
    private TitleRepository titleRepository;

    @GetMapping("/{id}")
    public ResponseEntity<Title> showTitle(@PathVariable long id) {
        Optional<Title> title = titleRepository.findById(id);
        return title.map(t -> ResponseEntity.ok().body(t)).orElse(NOT_FOUND);
    }

    @PostMapping("/{id}")
    public ResponseEntity<Title> updateTitle(@PathVariable long id, @Valid @RequestBody Title title) {
        Title result = titleRepository.save(title);
        return ResponseEntity.ok().body(result);
    }
}
