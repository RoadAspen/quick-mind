package com.quickmind.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * @author roadaspen
 * @since 2025/12/10 16:30
 */
// 让Spring能扫描到，后续可以注入到Controller/Service里
@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expiration;

    // 1. 用于生成和解析JWT的密钥（实际项目中应从配置文件读取）
    private SecretKey getSecretKey() {
        //  加密密钥（要保密！）
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    // 2. 生成令牌（登录成功后调用）
    public String generateToken(String username) {
        // 生成token，包含：用户名、签发时间、过期时间，最后用密钥签名
        return Jwts.builder()
                // 载荷：存用户名（核心身份信息）
                .setSubject(username)
                // 载荷：签发时间
                .setIssuedAt(new Date())
                // 载荷：过期时间
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                // 签名（防止篡改）
                .signWith(getSecretKey(), SignatureAlgorithm.HS256)
                // 拼接成最终令牌字符串
                .compact();
    }

    // 3. 从令牌解析全部信息（校验请求时调用）
    public Claims extractClaims(String token) {
        // 解析token，取出载荷里的用户名
        return Jwts.parserBuilder()
                // 用相同密钥解密
                .setSigningKey(getSecretKey())
                // 构建解析器（签名验证）
                .build()
                // 解析令牌（如果被篡改，这里会报错）
                .parseClaimsJws(token)
                // 解析出 body
                .getBody();
    }

    // 4. 校验令牌是否有效（校验请求时调用）
    public boolean validateToken(String token) {
        try {
            extractClaims(token);
            return true;

        } catch (ExpiredJwtException e) {
            System.out.println("Token 已过期");
        } catch (UnsupportedJwtException e) {
            System.out.println("不支持的 Token");
        } catch (MalformedJwtException e) {
            System.out.println("无效的 Token（格式错误）");
        } catch (SecurityException e) {
            System.out.println("Token 签名错误");
        } catch (IllegalArgumentException e) {
            System.out.println("Token 为空或非法");
        }
        return false;
    }

    // 5. 辅助方法：检查令牌是否过期
    private boolean isTokenExpired(String token) {
        Claims claims = extractClaims(token);
        if (claims == null) {
            // 无法提取声明，认为令牌无效或已过期
            return true;
        }
        Date expireTime = claims.getExpiration();
        // 过期时间 < 当前时间 → 令牌过期
        return expireTime.before(new Date());
    }
}