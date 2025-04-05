//package com.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")  // Apply this to all endpoints
//                .allowedOrigins("*")  // Frontend React app URL
//                // If testing locally, you can add localhost as well:
//                // .allowedOrigins("http://localhost:3000", "http://56.155.34.67:3000")
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Common HTTP methods
//                .allowedHeaders("Content-Type", "Authorization", "X-Requested-With")  // Common headers
//                .allowCredentials(true);  // Allow credentials (e.g., cookies, tokens)
//    }
//}
