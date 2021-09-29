package ch.zuehlke.fullstack.hackathon.api.employee;

import feign.Param;
import feign.RequestLine;
import feign.Response;

import java.util.List;

public interface InsightEmployeesApi {

    @RequestLine("GET /employees")
    List<InsightEmployee> getInsightEmployees();

    @RequestLine("GET /employees/{code}/picture")
    Response getEmployeePicture(@Param("code") String code);

}
