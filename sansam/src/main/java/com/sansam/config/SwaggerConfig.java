package com.sansam.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Server;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

@EnableSwagger2
@Configuration
public class SwaggerConfig {
    @Bean
    public Docket api() {
        Server serverForLocal = new Server("local", "http://localhost:5000", "for local usages", Collections.emptyList(), Collections.emptyList());
        Server serverForEC2 = new Server("EC2", "https://j8d205.p.ssafy.io/api", "for EC2 usages", Collections.emptyList(), Collections.emptyList());
        return new Docket(DocumentationType.OAS_30)
                .servers(serverForLocal, serverForEC2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.any()) // .any() 대신 .basePackages("{controller package}") 로 세부 지정 가능
                .paths(PathSelectors.any())
                .build();
    }


    public ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("SanSam Spring Boot REST API Documentation")
                .description("Spring Boot REST API for project SanSam.")
                .version("0.1")
                .build();
    }
}