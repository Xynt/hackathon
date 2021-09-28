package ch.zuehlke.fullstack.hackathon.service;

import com.zuehlke.hackathon.peoplefinder.model.Team;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class TeamsService {

    public List<Team> calculateTeams(Team team, int dimension) {
        // TODO: Our fancy algo
        return Arrays.asList(team);
    }
}
