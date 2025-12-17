package com.quickmind.config;

import com.quickmind.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * @author roadaspen
 * @apiNote Spring Security 的配置类, 用于配置安全策略和过滤器链。
 * @since 2025/12/12 18:23
 */
@Configuration
@EnableWebSecurity // 启用 Spring Security 安全配置
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean // 这个注解告诉 Spring 把这个返回的对象作为一个 Bean 放到容器里
    public PasswordEncoder passwordEncoder() {
        // 使用 BCrypt 算法进行密码编码, BCrypt 会为每次加密生成不同的盐值，提高安全性, 盐值存储在密码中。
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 1. 需要先 启用 CORS（跨域资源共享）支持，使用默认配置, 默认配置会自动注入GlobalCorsConfig 的 bean 用于处理跨域请求。
                .cors(Customizer.withDefaults())
                // 2. JWT场景一般会关闭 CSRF（前后端分离场景一般关闭，如需开启需额外配置）
                .csrf().disable()
                // 3. 添加 JWT 认证过滤器（在用户名密码认证过滤器之前执行）
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)

                // 4. 其他 Security 配置（如权限、认证等）
                .authorizeHttpRequests(auth -> auth
                        // permitAll() 表示允许所有用户访问该路径
                        // antMatchers 用于匹配请求路径，这里允许登录接口无需认证
                        .antMatchers("/auth/login", "/auth/logout").permitAll()
                        // 除了上面放行的接口，其他所有接口都必须是“已认证状态”
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}