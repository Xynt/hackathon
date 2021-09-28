package ch.zuehlke.fullstack.hackathon.controller;

import ch.zuehlke.fullstack.hackathon.service.PeopleService;
import com.zuehlke.hackathon.peoplefinder.api.PeopleApi;
import com.zuehlke.hackathon.peoplefinder.model.Person;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Controller
public class PeopleController implements PeopleApi {
    private final PeopleService peopleService;

    public PeopleController(PeopleService peopleService) {
        this.peopleService = peopleService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @Override
    public ResponseEntity<List<Person>> getPeople() {
        List<Person> people = this.peopleService.getPeople();
        return ResponseEntity.ok(people);
    }
}
