// 启动类
package com.quickmind;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// 注解：标识这是 Spring Boot 启动类（固定写法）
@SpringBootApplication
public class QuickMindApplication {
    // 主方法：Java 程序入口（固定写法）
    public static void main(String[] args){
        // 启动 Spring Boot 项目
        SpringApplication.run(QuickMindApplication.class, args);
        // 启动成功后打印提示（方便查看）
        System.out.println("✅ QuickMind 项目启动成功！访问地址：http://localhost:8080");
    }
}
