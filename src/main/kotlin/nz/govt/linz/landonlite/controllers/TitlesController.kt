package nz.govt.linz.landonlite.controllers

import nz.govt.linz.landonlite.models.Title
import nz.govt.linz.landonlite.repositories.TitleRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/titles")
class TitlesController {
    @Autowired
    private lateinit var titleRepository: TitleRepository

    @GetMapping("/{id}")
    fun getTitle(@PathVariable id: Long): ResponseEntity<Title> {
        val title = titleRepository.findById(id)
        return title.map { t: Title -> ResponseEntity.ok().body(t) }
                .orElse(ResponseEntity.notFound().build())
    }

    @PostMapping("/{id}")
    fun updateTitle(@PathVariable id: Long, @RequestBody body: Title): ResponseEntity<Title> {
        val result = titleRepository.findById(id).get()
        result.ownerName = body.ownerName
        titleRepository.save(result)
        return ResponseEntity.ok().body(result)
    }
}