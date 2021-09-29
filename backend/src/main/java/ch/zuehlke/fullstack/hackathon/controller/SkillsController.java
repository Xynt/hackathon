package ch.zuehlke.fullstack.hackathon.controller;

import ch.zuehlke.fullstack.hackathon.service.SkillsService;
import com.zuehlke.hackathon.peoplefinder.api.SkillsApi;
import com.zuehlke.hackathon.peoplefinder.model.Skill;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Controller
public class SkillsController implements SkillsApi {
    private final SkillsService skillsService;

    public SkillsController(SkillsService skillsService) {
        this.skillsService = skillsService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @Override
    public ResponseEntity<List<Skill>> getSkills() {
        List<Skill> skills = skillsService.getSkills();
        return ResponseEntity.ok(skills);
    }
}
