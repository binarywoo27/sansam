package com.sansam.config;

import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.servers.Server;
import springfox.documentation.oas.web.OpenApiTransformationContext;
import springfox.documentation.oas.web.WebMvcOpenApiTransformationFilter;
import springfox.documentation.spi.DocumentationType;

@Component
public class SwaggerServerConfig implements WebMvcOpenApiTransformationFilter {

	@Override
    public OpenAPI transform(OpenApiTransformationContext<HttpServletRequest> context) {
        OpenAPI openApi = context.getSpecification();
        Server serverForLocal = new Server();
        serverForLocal.setDescription("local");
        serverForLocal.setUrl("http://localhost:5000");

        Server serverForEC2 = new Server();
        serverForEC2.setDescription("EC2");
        serverForEC2.setUrl("https://j8d205.p.ssafy.io/api");
        openApi.setServers(Arrays.asList(serverForLocal, serverForEC2));
        return openApi;
    }

    @Override
    public boolean supports(DocumentationType documentationType) {
        return documentationType.equals(DocumentationType.OAS_30);
    }
}
