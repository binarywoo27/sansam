FROM openjdk:11
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} sansam.jar
ENTRYPOINT ["java","-jar","/sansam.jar"]

EXPOSE 5000