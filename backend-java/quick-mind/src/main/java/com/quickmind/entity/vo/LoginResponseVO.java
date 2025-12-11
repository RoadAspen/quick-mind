package com.quickmind.entity.vo;

import lombok.Data;

/**
 * 登录响应VO
 *
 * @author huangwei
 * @since 2013-8-14
 */
@Data
public class LoginResponseVO {
    /**
     * 用户名
     */
    private String username;
    /**
     * token
     */
    private String token;
    /**
     * Token过期时间（毫秒）
     */
    private Long expiration;
}
