package ch.zuehlke.fullstack.hackathon.service.strategy;

import com.zuehlke.hackathon.peoplefinder.model.Team;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LearnStrategy implements Strategy {

    @Override
    public StrategyName getName() {
        return StrategyName.LEARN;
    }

    @Override
    public List<Team> calculate(Team team, int dimension) {
        // TODO (ZUHA-12) Please implement me
        return List.of(team);
    }
}
