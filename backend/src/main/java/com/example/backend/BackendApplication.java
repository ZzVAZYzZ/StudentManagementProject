package com.example.backend;
import java.io.*;
import java.util.ArrayList;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.backend.API.pushToFrontEndApi;

@SpringBootApplication
public class BackendApplication {
	static StudentManagement sm = new StudentManagement();
	public static void main(String[] args) {
        System.out.println("Happy Coding!");
		SpringApplication.run(BackendApplication.class, args);
	}
}
