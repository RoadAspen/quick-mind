package com.quickmind.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * @author roadaspen
 * @apiNote 全局跨域配置
 * @since 2025/12/13 17:18
 */
@Configuration
public class GlobalCorsConfig {

    // 通过 CorsFilter 实现（推荐，覆盖所有请求，包括非 Controller 请求）, 不需要在 WebMvcConfig 中手动 addFilterBefore(corsFilter)
    @Bean
    public CorsFilter corsFilter() {
        // 1. 构建跨域配置对象
        CorsConfiguration config = new CorsConfiguration();

        // 2. 添加允许的源（生产环境务必指定具体域名，不要用 *）
        // 本地开发：允许 Vite 前端端口（5173）、后端端口（8080）
        config.addAllowedOriginPattern("http://localhost:3000");
        config.addAllowedOriginPattern("http://localhost:8080");
        // 生产环境示例：config.addAllowedOriginPattern("https://your-frontend-domain.com");

        // 3. 允许携带 Cookie（前后端分离场景如需传递 Token/Cookie 必须开启）
        config.setAllowCredentials(true);

        // 4. 允许的请求方法（GET/POST/PUT/DELETE/OPTIONS 等）,等价于 "*"，允许所有方法
        config.addAllowedMethod(CorsConfiguration.ALL);

        // 5. 允许的请求头（自定义头如 Token、Content-Type 等）,允许所有请求头
        config.addAllowedHeader(CorsConfiguration.ALL);

        // 6. 预检请求（OPTIONS）的缓存时间（秒），减少预检请求次数
        config.setMaxAge(3600L);

        // 7. 配置跨域规则生效的路径（/** 表示所有路径）,对所有的路径生效
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        // 8. 返回跨域过滤器
        return new CorsFilter(source);
    }
}