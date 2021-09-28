package ch.zuehlke.fullstack.hackathon.service;

import ch.zuehlke.fullstack.hackathon.api.employee.InsightEmployee;
import ch.zuehlke.fullstack.hackathon.api.employee.InsightEmployeesApi;
import com.zuehlke.hackathon.peoplefinder.model.Person;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PeopleService {

    private final InsightEmployeesApi insightEmployeesApi;

    public PeopleService(InsightEmployeesApi insightEmployeesApi) {
        this.insightEmployeesApi = insightEmployeesApi;
    }

    public List<Person> getPeople() {
        List<InsightEmployee> insightEmployees = insightEmployeesApi.getInsightEmployees();

        return insightEmployees.stream()
                .map(ie -> new Person().firstName(ie.getFirstName()).lastName(ie.getLastName()).code(ie.getCode()))
                .collect(Collectors.toList());
    }
}
