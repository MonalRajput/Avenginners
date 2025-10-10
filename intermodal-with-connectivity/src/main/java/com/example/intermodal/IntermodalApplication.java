package com.example.intermodal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class IntermodalApplication {

    public static void main(String[] args) {
        SpringApplication.run(IntermodalApplication.class, args);
        System.out.println("running");
    }
}
