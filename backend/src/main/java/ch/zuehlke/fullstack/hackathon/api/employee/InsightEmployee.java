package ch.zuehlke.fullstack.hackathon.api.employee;

import com.google.gson.annotations.SerializedName;

public class InsightEmployee {
    @SerializedName("Code")
    private final String code;
    @SerializedName("FirstName")
    private final String firstName;
    @SerializedName("LastName")
    private final String lastName;

    public InsightEmployee(String code, String firstName, String lastName) {
        this.code = code;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getCode() {
        return code;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }
}
