package com.quickmind.config;

import com.quickmind.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * 用来配置 密码加密方式相关
 *
 * @author roadaspen
 * @since 2025/12/12 18:23
 */
@Configuration
@EnableWebSecurity // 启用 Spring Security 安全配置
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean // 这个注解告诉 Spring 把这个返回的对象作为一个 Bean 放到容器里
    public PasswordEncoder passwordEncoder() {
        // 使用 BCrypt 算法进行密码编码
        return new BCryptPasswordEncoder();
    }
}