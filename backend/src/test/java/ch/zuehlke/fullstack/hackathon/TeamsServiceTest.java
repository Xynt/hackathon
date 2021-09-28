package ch.zuehlke.fullstack.hackathon;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.zuehlke.hackathon.peoplefinder.model.*;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class TeamsServiceTest {

    @Test
    public void dummyJson() throws JsonProcessingException {
        Person person1 = new Person().firstName("Lyndsey").lastName("Bonelli").code("lybo");
        Person person2 = new Person().firstName("Xabier").lastName("Rodriguez").code("xaro");
        Person person3 = new Person().firstName("Davide").lastName("Vanoni").code("dava");

        Skill skill1 = new Skill().name("Angular");
        Skill skill2 = new Skill().name("Spring Boot");

        Proficiency proficiency1 = new Proficiency().rating(3).skill(skill1);
        Proficiency proficiency2 = new Proficiency().rating(4).skill(skill2);
        Proficiency proficiency3 = new Proficiency().rating(2).skill(skill1);
        Proficiency proficiency4 = new Proficiency().rating(5).skill(skill2);
        Proficiency proficiency5 = new Proficiency().rating(1).skill(skill1);
        Proficiency proficiency6 = new Proficiency().rating(3).skill(skill2);

        Criteria criteria1 = new Criteria().proficiencies(Arrays.asList(proficiency1, proficiency2));
        Criteria criteria2 = new Criteria().proficiencies(Arrays.asList(proficiency3, proficiency4));
        Criteria criteria3 = new Criteria().proficiencies(Arrays.asList(proficiency5, proficiency6));

        Map<String, Criteria> mapTeam = new HashMap<>();
        mapTeam.put(person1.getCode(), criteria1);
        mapTeam.put(person2.getCode(), criteria2);
        mapTeam.put(person3.getCode(), criteria3);
        Team team = new Team().name("Our fancy team").members(mapTeam);

        ObjectWriter mapper = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String json = mapper.writeValueAsString(team);
        System.out.println(json);
    }
}
