package com.quickmind.filter;

import com.quickmind.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * JWT 认证过滤器，每次请求都会经过
 * 继承 OncePerRequestFilter 类，这是 Spring Security 提供的基类，每个请求只会执行一次。
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

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
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // 去掉 Bearer 前缀
            String token = authHeader.substring(7);

            // 2. 验证 Token
            if (jwtUtils.validateToken(token)) {
                Claims claims = jwtUtils.extractClaims(token);
                String username = claims.getSubject();
                // 3. 将用户信息放入 SecurityContext
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(username, null, null);

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        // 4. 放行请求
        filterChain.doFilter(request, response);
    }
}
