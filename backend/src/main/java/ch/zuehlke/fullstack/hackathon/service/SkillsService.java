package ch.zuehlke.fullstack.hackathon.service;

import ch.zuehlke.fullstack.hackathon.api.skill.InsightSkill;
import ch.zuehlke.fullstack.hackathon.api.skill.InsightSkillsApi;
import com.zuehlke.hackathon.peoplefinder.model.Skill;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillsService {

    private final InsightSkillsApi insightSkillsApi;

    public SkillsService(InsightSkillsApi insightSkillsApi) {
        this.insightSkillsApi = insightSkillsApi;
    }

    public List<Skill> getSkills() {
        List<InsightSkill> skills = insightSkillsApi.getSkills().getItems();

        return skills.stream()
                .map(is -> new Skill().name(is.getName()))
                .collect(Collectors.toList());
    }
}
