package ch.zuehlke.fullstack.hackathon.api.skill;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class InsightSkills {
    @SerializedName("Items")
    private final List<InsightSkill> items;

    public InsightSkills(List<InsightSkill> items) {
        this.items = items;
    }

    public List<InsightSkill> getItems() {
        return items;
    }
}
