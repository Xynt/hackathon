package ch.zuehlke.fullstack.hackathon.api.skill;

import feign.RequestLine;

public interface InsightSkillsApi {

    @RequestLine("GET /skills")
    InsightSkills getInsightSkills();

}
