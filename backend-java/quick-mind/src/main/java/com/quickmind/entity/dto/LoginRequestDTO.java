package com.quickmind.entity.dto;

import lombok.Data;

/**
 * 注册登录请求DTO
 *
 * @author roadaspe
 * @apiNote 注册登录请求DTO
 * @since 2025/12/11 16:30
 */
@Data
public class LoginRequestDTO {
    /**
     * 用户名
     */
    private String username;
    /**
     * 密码
     */
    private String password;
    /**
     * 验证码
     */
    private String code;
}
