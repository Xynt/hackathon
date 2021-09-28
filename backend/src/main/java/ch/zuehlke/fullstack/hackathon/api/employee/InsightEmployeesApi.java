package ch.zuehlke.fullstack.hackathon.api.employee;

import feign.RequestLine;

import java.util.List;

public interface InsightEmployeesApi {

    @RequestLine("GET /employees")
    List<InsightEmployee> getInsightEmployees();

}
