package com.quickmind.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

/**
 * @author roadaspen
 * @since 2025/12/10 16:30
 */
// 让Spring能扫描到，后续可以注入到Controller/Service里
@Component
public class JwtUtils {
    // 1. 用于生成和解析JWT的密钥（实际项目中应从配置文件读取）
    private SecretKey getSecretKey() {
        //  加密密钥（要保密！）
        String secret = "quickmind-secret-key-32bytes-long-123456";
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // 2. 生成令牌（登录成功后调用）
    public String generateToken(String username) {
        // 令牌有效期：2小时（毫秒）
        long expiration = 7200000;
        // 用用户名生成令牌，包含：用户名、签发时间、过期时间，最后用密钥签名
        return Jwts.builder()
                // 载荷：存用户名（核心身份信息）
                .setSubject(username)
                // 载荷：签发时间
                .setIssuedAt(new Date())
                // 载荷：过期时间
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                // 签名（防止篡改）
                .signWith(getSecretKey())
                // 拼接成最终令牌字符串
                .compact();
    }

    // 3. 从令牌解析用户名（校验请求时调用）
    public String getUsernameFromToken(String token) {
        // 解析令牌，取出载荷里的用户名
        return Jwts.parserBuilder()
                // 用相同密钥解密
                .setSigningKey(getSecretKey())
                // 构建解析器（签名验证）
                .build()
                // 解析令牌（如果被篡改，这里会报错）
                .parseClaimsJws(token)
                // 解析出 body
                .getBody()
                // 取出用户名字段（即 subject）
                .getSubject();
    }

    // 4. 校验令牌是否合法（校验请求时调用）
    public boolean validateToken(String token, String username) {
        String tokenUsername = getUsernameFromToken(token);
        // 校验：用户名匹配 + 令牌没过期
        return tokenUsername.equals(username) && !isTokenExpired(token);
    }

    // 5. 辅助方法：检查令牌是否过期
    private boolean isTokenExpired(String token) {
        Date expireTime = Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        // 过期时间 < 当前时间 → 令牌过期
        return expireTime.before(new Date());
    }
}