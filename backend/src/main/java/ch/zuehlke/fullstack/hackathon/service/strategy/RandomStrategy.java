package ch.zuehlke.fullstack.hackathon.service.strategy;

import com.zuehlke.hackathon.peoplefinder.model.Team;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class RandomStrategy implements Strategy {

    @Override
    public StrategyName getName() {
        return StrategyName.RANDOM;
    }

    @Override
    public List<Team> calculate(Team team, int dimension) {
        List<String> peopleCodes = new ArrayList<>(List.copyOf(team.getMembers().keySet()));
        Collections.shuffle(peopleCodes);

        List<Team> teams = new ArrayList<>();
        Team realTeam = null;
        for (int i = 0; i < peopleCodes.size(); i++) {
            if (i % dimension == 0) {
                realTeam = new Team().name(UUID.randomUUID().toString());
                teams.add(realTeam);
            }
            realTeam.putMembersItem(peopleCodes.get(i), team.getMembers().get(peopleCodes.get(i)));
        }

        return teams;
    }
}
