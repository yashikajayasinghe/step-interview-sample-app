package nz.govt.linz.landonlite.controllers

import io.ebean.DB
import nz.govt.linz.landonlite.models.Title
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/titles")
class TitlesController {

    @GetMapping("/{id}")
    fun getTitle(@PathVariable id: Long): ResponseEntity<Title> {
        val title = DB.find(Title::class.java)
                .where()
                .eq("id", id)
                .findOne()
        return if (title == null)
            ResponseEntity.notFound().build()
        else
            ResponseEntity.ok().body(title)
    }

    @PostMapping("/{id}")
    fun updateTitle(@PathVariable id: Long, @RequestBody body: Title): ResponseEntity<Title> {
        val title = DB.find(Title::class.java)
                .where()
                .eq("id", id)
                .findOne()
        if (title == null) {
            return ResponseEntity.notFound().build()
        }
        title.ownerName = body.ownerName
        title.save()
        return ResponseEntity.ok().body(title)
    }
}