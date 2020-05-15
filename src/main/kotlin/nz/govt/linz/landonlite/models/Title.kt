package nz.govt.linz.landonlite.models

import io.ebean.Model
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
class Title (
    var description: String,
    var ownerName: String
): Model()
{
    @Id
    @GeneratedValue
    val id: Long = 0

    override fun toString(): String {
        return "Title(description='$description', ownerName='$ownerName', id=$id)"
    }
}
