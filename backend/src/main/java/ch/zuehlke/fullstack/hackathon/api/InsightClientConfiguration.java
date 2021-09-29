package ch.zuehlke.fullstack.hackathon.api;

import ch.zuehlke.fullstack.hackathon.api.employee.InsightEmployeesApi;
import ch.zuehlke.fullstack.hackathon.api.skill.InsightSkillsApi;
import feign.Feign;
import feign.auth.BasicAuthRequestInterceptor;
import feign.gson.GsonDecoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.openfeign.support.SpringMvcContract;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;

@Configuration
public class InsightClientConfiguration {
    private final String insightApiUrl = "https://insight.zuehlke.com/api/v1";
    private final String insightLoginProperties = System.getProperty("user.home") + "/hackathon/people-finder.properties";

    @Bean
    public InsightLogin getInsightLogin() {
        try {
            java.util.Properties properties = new java.util.Properties();
            FileInputStream is = new FileInputStream(insightLoginProperties);
            properties.load(is);
            String username = properties.getProperty("username");
            String password = properties.getProperty("password");
            return new InsightLogin(username, password);
        } catch (Exception e) {
            // TODO (ZUHA-31): Maybe define a better exception?
            throw new RuntimeException("User login could not be loaded.");
        }
    }

    @Bean
    @Autowired
    public InsightEmployeesApi getInsightEmployeesApi(InsightLogin insightLogin) {
        return getClientBuilder(insightLogin)
                .target(InsightEmployeesApi.class, insightApiUrl);
    }

    @Bean
    @Autowired
    public InsightSkillsApi getInsightSkillsApi(InsightLogin insightLogin) {
        return getClientBuilder(insightLogin)
                .target(InsightSkillsApi.class, insightApiUrl);
    }

    private Feign.Builder getClientBuilder(InsightLogin insightLogin) {
        return Feign.builder()
                .requestInterceptor(new BasicAuthRequestInterceptor(insightLogin.getUsername(), insightLogin.getPassword()))
                .decoder(new GsonDecoder());
    }

}
