package ch.zuehlke.fullstack.hackathon.controller;

import ch.zuehlke.fullstack.hackathon.service.PeopleService;
import com.zuehlke.hackathon.peoplefinder.api.PeopleApi;
import com.zuehlke.hackathon.peoplefinder.model.Person;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@Controller
public class PeopleController implements PeopleApi {
    private final PeopleService peopleService;

    public PeopleController(PeopleService peopleService) {
        this.peopleService = peopleService;
    }


    @Override
    public ResponseEntity<byte[]> getAvatarForPerson(String code) {
        try {
            return ResponseEntity.ok(this.peopleService.getPersonAvatar(code));
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find avatar for " + code, e);
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @Override
    public ResponseEntity<List<Person>> getPeople() {
        List<Person> people = this.peopleService.getPeople();
        return ResponseEntity.ok(people);
    }
}
