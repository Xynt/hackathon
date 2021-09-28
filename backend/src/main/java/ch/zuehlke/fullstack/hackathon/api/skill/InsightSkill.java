package ch.zuehlke.fullstack.hackathon.api.skill;

import com.google.gson.annotations.SerializedName;

public class InsightSkill {
    @SerializedName("Name")
    private final String name;

    public InsightSkill(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
