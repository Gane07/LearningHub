FROM openjdk:21-jdk-slim
RUN apt-get update && apt-get install -y maven
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests
EXPOSE ${COURSE_SERVICE_PORT}
ENTRYPOINT ["java", "-jar", "target/CourseService.jar"]