package com.quickmind.controller;

import com.quickmind.common.result.AjaxResult;
import com.quickmind.entity.dto.LoginRequestDTO;
import com.quickmind.entity.vo.LoginResponseVO;
import com.quickmind.service.AuthService;
import com.quickmind.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 用户认证管理
 *
 * @author roadaspen
 * @version 1.0
 * @apiNote 用户登录控制器，用于处理用户登录相关请求
 * @since 2020/3/19 15:46
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtils jwtUtils;

    /**
     * 用户登录
     *
     * @param loginRequest 登录请求参数
     * @return 登录响应结果
     */
    @PostMapping("/login")
    public AjaxResult<LoginResponseVO> login(@RequestBody LoginRequestDTO loginRequest) {
        System.out.println("接收到登录请求：" + loginRequest);
        return AjaxResult.success(authService.login(loginRequest), "登陆成功");
    }

    /**
     * 用户登出
     *
     * @return 登出响应结果
     */
    @PostMapping("/logout")
    public AjaxResult<Void> logout() {
        System.out.println("接收到登出请求");
        return AjaxResult.success(null, "登出成功");
    }
}
