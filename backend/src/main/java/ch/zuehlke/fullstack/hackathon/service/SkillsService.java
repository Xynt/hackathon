package ch.zuehlke.fullstack.hackathon.service;

import com.zuehlke.hackathon.peoplefinder.model.Skill;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class SkillsService {

    public List<Skill> getSkills() {
        // TODO: Insight API call
        return Arrays.asList(
                new Skill().name("Angular"),
                new Skill().name("Spring Boot")
        );
    }
}
