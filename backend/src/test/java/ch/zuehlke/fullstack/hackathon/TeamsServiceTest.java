package ch.zuehlke.fullstack.hackathon;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.zuehlke.hackathon.peoplefinder.model.*;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

public class TeamsServiceTest {

    @Test
    public void easyTest() throws JsonProcessingException {
        Person person1 = new Person().firstName("Lyndsey").lastName("Bonelli").code("lybo");
        Person person2 = new Person().firstName("Xabier").lastName("Rodriguez").code("xaro");
        Person person3 = new Person().firstName("Davide").lastName("Vanoni").code("dava");
        Person person4 = new Person().firstName("Stefan").lastName("Boesch").code("steb");
        Person person5 = new Person().firstName("Georg").lastName("Mohr").code("gemo");
        Person person6 = new Person().firstName("Gezim").lastName("Zeneli").code("geze");

        Skill skill1 = new Skill().name("Angular");
        Skill skill2 = new Skill().name("Spring Boot");

        Proficiency proficiency1 = new Proficiency().rating(3).skill(skill1);
        Proficiency proficiency2 = new Proficiency().rating(4).skill(skill2);
        Proficiency proficiency3 = new Proficiency().rating(2).skill(skill1);
        Proficiency proficiency4 = new Proficiency().rating(5).skill(skill2);
        Proficiency proficiency5 = new Proficiency().rating(1).skill(skill1);
        Proficiency proficiency6 = new Proficiency().rating(3).skill(skill2);
        Proficiency proficiency7 = new Proficiency().rating(2).skill(skill1);
        Proficiency proficiency8 = new Proficiency().rating(2).skill(skill2);
        Proficiency proficiency9 = new Proficiency().rating(3).skill(skill1);
        Proficiency proficiency10 = new Proficiency().rating(1).skill(skill2);
        Proficiency proficiency11 = new Proficiency().rating(5).skill(skill1);
        Proficiency proficiency12 = new Proficiency().rating(1).skill(skill2);

        Criteria criteria1 = new Criteria().proficiencies(Arrays.asList(proficiency1, proficiency2));
        Criteria criteria2 = new Criteria().proficiencies(Arrays.asList(proficiency3, proficiency4));
        Criteria criteria3 = new Criteria().proficiencies(Arrays.asList(proficiency5, proficiency6));
        Criteria criteria4 = new Criteria().proficiencies(Arrays.asList(proficiency7, proficiency8));
        Criteria criteria5 = new Criteria().proficiencies(Arrays.asList(proficiency9, proficiency10));
        Criteria criteria6 = new Criteria().proficiencies(Arrays.asList(proficiency11, proficiency12));

        Map<String, Criteria> mapTeam = new HashMap<>();
        mapTeam.put(person1.getCode(), criteria1);
        mapTeam.put(person2.getCode(), criteria2);
        mapTeam.put(person3.getCode(), criteria3);
        mapTeam.put(person4.getCode(), criteria4);
        mapTeam.put(person5.getCode(), criteria5);
        mapTeam.put(person6.getCode(), criteria6);
        Team team = new Team().name("Our fancy team").members(mapTeam);

        ObjectWriter mapper = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String json = mapper.writeValueAsString(team);

        assertThat(team.getMembers()).hasSize(6);
        assertThat(json).isNotEmpty();
    }
}
