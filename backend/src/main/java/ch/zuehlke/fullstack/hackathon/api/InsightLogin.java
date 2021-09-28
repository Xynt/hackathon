package ch.zuehlke.fullstack.hackathon.api;

public class InsightLogin {
    private final String username;
    private final String password;

    public InsightLogin(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
