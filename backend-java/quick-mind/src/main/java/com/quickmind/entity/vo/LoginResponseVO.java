package com.quickmind.entity.vo;

import lombok.Data;

/**
 * 登录响应VO, 只需要返回一个token即可
 *
 * @author roadaspen
 * @since 2024-12-16
 */
@Data
public class LoginResponseVO {
    /**
     * token
     */
    private String token;
}
