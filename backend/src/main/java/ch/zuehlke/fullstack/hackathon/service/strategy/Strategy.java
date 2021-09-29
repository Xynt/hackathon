package ch.zuehlke.fullstack.hackathon.service.strategy;

import com.zuehlke.hackathon.peoplefinder.model.Team;

import java.util.List;

public interface Strategy {
    StrategyName getName();
    List<Team> calculate(Team team, int dimension);
}
