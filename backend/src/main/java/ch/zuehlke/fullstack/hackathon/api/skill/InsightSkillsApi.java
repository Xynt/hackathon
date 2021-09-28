package ch.zuehlke.fullstack.hackathon.api.skill;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping("skills")
public interface InsightSkillsApi {

    @GetMapping()
    @ResponseBody
    InsightSkills getSkills();

}
