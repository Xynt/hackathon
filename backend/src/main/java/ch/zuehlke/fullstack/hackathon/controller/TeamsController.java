package ch.zuehlke.fullstack.hackathon.controller;

import ch.zuehlke.fullstack.hackathon.service.TeamsService;
import com.zuehlke.hackathon.peoplefinder.api.TeamsApi;
import com.zuehlke.hackathon.peoplefinder.model.Team;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import javax.validation.Valid;
import java.util.List;

@Controller
public class TeamsController implements TeamsApi {
    private TeamsService teamsService;

    public TeamsController(TeamsService teamsService) {
        this.teamsService = teamsService;
    }

    @Override
    public ResponseEntity<List<Team>> calculateTeams(@Valid Team team, @Valid Integer dimension) {
        List<Team> teams = teamsService.calculateTeams(team, dimension);
        return ResponseEntity.ok(teams);
    }
}
