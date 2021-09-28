package ch.zuehlke.fullstack.hackathon.service;

import com.zuehlke.hackathon.peoplefinder.model.Person;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class PeopleService {

    public List<Person> getPeople() {
        // TODO: Insight API call
        return Arrays.asList(
                new Person().firstName("Lyndsey").lastName("Bonelli"),
                new Person().firstName("Xabier").lastName("Rodriguez"),
                new Person().firstName("Davide").lastName("Vanoni")
        );
    }
}
