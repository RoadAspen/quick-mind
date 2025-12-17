package com.quickmind.service;

import com.quickmind.entity.SysUser;
import com.quickmind.entity.dto.LoginRequestDTO;
import com.quickmind.entity.vo.LoginResponseVO;
import com.quickmind.mapper.SysUserMapper;
import com.quickmind.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.annotation.Resource;

/**
 * @author roadaspen
 * @apiNote 用户认证服务类，处理用户登录验证逻辑
 * @since 2025/12/11  20:15
 */
@Service
public class AuthService {
    /**
     * 依赖注入：用户服务接口（用于查询用户信息）
     */
    @Resource
    private SysUserService sysUserService;

    /**
     * 依赖注入：用户数据访问层接口（直接操作数据库）
     */
    @Resource
    private SysUserMapper sysUserMapper;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * 生成密码加密方法
     */
    public String generatePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    /**
     * 登录逻辑校验
     */
    public LoginResponseVO login(@RequestBody LoginRequestDTO loginRequest) {
        // 1. 查询用户是否存在
        SysUser sysUser = sysUserService.selectByUserName(loginRequest.getUsername());
        if (sysUser == null) {
            throw new RuntimeException("用户名不存在");
        }

        // 2. 校验账号状态, 检验用户的status是否正常
        if ("1".equals(sysUser.getStatus())) {
            throw new RuntimeException("账号已禁用,请联系管理员");
        }
        System.out.println("登录密码: " + loginRequest.getPassword());
        System.out.println("用户密码: " + sysUser.getPassword());

        // 3. 校验密码
        if (!passwordEncoder.matches(loginRequest.getPassword(), sysUser.getPassword())) {
            throw new RuntimeException("密码错误");
        }
        System.out.println("校验成功");
        // 4. 登录成功,返回用户
        LoginResponseVO responseVO = new LoginResponseVO();
        responseVO.setToken(jwtUtils.generateToken(sysUser.getUserName()));

        return responseVO;
    }
}
