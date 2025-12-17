package com.quickmind.filter;

import com.quickmind.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

/**
 * JWT 认证过滤器，每次请求都会经过
 * 继承 OncePerRequestFilter 类，这是 Spring Security 提供的基类，每个请求只会执行一次。
 *
 * @author roadaspen
 * @since 2025/12/15 15:30
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Value("${jwt.prefix}")
    private String prefix;

    @Value("${jwt.header}")
    private String header;

    /**
     * doFilterInternal 方法是核心逻辑，用于验证 JWT Token 并设置认证信息到 SecurityContext 中
     * 该方法会在每个请求中被调用一次
     * 通过解析请求头中的 Authorization 字段获取 JWT Token
     * 使用 JwtUtils 验证 Token 的有效性
     * 如果有效，则从 Token 中提取用户信息并创建 Authentication 对象
     * 如果无效，则抛出异常或返回错误响应
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // 1. 获取请求头 Authorization
        String authHeader = request.getHeader(header);
        System.out.println("Auth Header: " + authHeader);

        // 2. 配置不需要解析token的路径白名单
        List<String> whiteList = Arrays.asList("/auth/login", "/auth/logout");
        String path = request.getRequestURI();
        // 3.如果是白名单中的路径，直接放行，不进行 token 解析和验证
        if (whiteList.contains(path)) {
            // 直接放行请求，不进行 token 验证
            filterChain.doFilter(request, response);
            return;
        }

        // 4. 如果包含token, 则进行解析和验证
        if (authHeader != null && authHeader.startsWith(prefix)) {
            // 1.去掉 Bearer 前缀
            String token = authHeader.substring(7);
            try {
                // 2. 验证 Token
                if (jwtUtils.validateToken(token)) {
                    Claims claims = jwtUtils.extractClaims(token);
                    String username = claims.getSubject();
                    // 3. 构建 Authentication 对象并设置到 SecurityContext 中
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(username, null, null);
                    // SecurityContextHolder 就是“Spring Security 的线程本地存储”，用来记录谁在访问当前请求。
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (RuntimeException e) {
                // token 无效或过期
                System.out.println("JWT 无效: " + e.getMessage());
                // 可选：返回 401
                // response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token 无效或已过期");
                // return;
            }

        } else {
            // 没有 Authorization 头
            System.out.println("请求未携带 token: " + path);
        }

        // 5. 放行请求
        filterChain.doFilter(request, response);
    }
}
