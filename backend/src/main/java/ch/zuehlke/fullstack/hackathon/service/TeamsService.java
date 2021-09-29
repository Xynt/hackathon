package ch.zuehlke.fullstack.hackathon.service;

import ch.zuehlke.fullstack.hackathon.service.strategy.Strategy;
import ch.zuehlke.fullstack.hackathon.service.strategy.StrategyFactory;
import ch.zuehlke.fullstack.hackathon.service.strategy.StrategyName;
import com.zuehlke.hackathon.peoplefinder.model.Team;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamsService {
    @Value("${app.strategy}")
    StrategyName strategyName;

    private final StrategyFactory strategyFactory;

    public TeamsService(StrategyFactory strategyFactory) {
        this.strategyFactory = strategyFactory;
    }

    public List<Team> calculateTeams(Team team, int dimension) {
        Strategy strategy = strategyFactory.findStrategy(strategyName);
        return strategy.calculate(team, dimension);
    }
}
