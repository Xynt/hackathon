package ch.zuehlke.fullstack.hackathon.api.employee;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("employees")
public interface InsightEmployeesApi {

    @GetMapping()
    List<InsightEmployee> getInsightEmployees();

    @GetMapping("/{term}")
    List<InsightEmployee> findInsightEmployeesByTerm(@PathVariable String term);

}
