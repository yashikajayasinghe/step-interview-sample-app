package nz.govt.linz.landonlite

import nz.govt.linz.landonlite.models.Title
import nz.govt.linz.landonlite.repositories.TitleRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.util.function.Consumer

@Component
internal class SeedData : CommandLineRunner {

    @Autowired
    private val titleRepository: TitleRepository? = null

    override fun run(vararg strings: String) { // Create the seed titles if the database is empty
        if (titleRepository!!.count() == 0L) {
            titleRepository.save(Title("Lot 1 on Block 1", "Jane Doe"))
            titleRepository.save(Title("Lot 2 on Block 1", "Bob Smith"))
        }
        // Print a list of titles in the database
        titleRepository.findAll().forEach(Consumer { x: Title? -> println(x) })
    }
}