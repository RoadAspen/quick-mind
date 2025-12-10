package com.quickmind.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.quickmind.entity.SysUser;


/**
 * 用户的Service接口(封装用户相关业务逻辑)
 *
 * @author roadaspen
 * @since 2025/12/10 12:37
 */
public interface SysUserService extends IService<SysUser> {
    // IService 是 MyBatis Plus 提供的通用 Service 接口，包含常用的 CRUD 操作
    // 比如 save(), update(), removeById() 等方法

    /**
     * 根据用户名查询用户信息
     *
     * @param userName 用户名
     * @return 系统用户
     */
    SysUser selectByUserName(String userName);

    /**
     * 用户登录校验
     * 业务逻辑: 用户名存在 + 密码正确 + 状态正常
     *
     * @param userName 用户名
     * @param password 密码（前端传明文，此处需加密比对）
     * @return 登录成功的用户
     * @throws RuntimeException 登录失败时抛出异常（含错误信息）
     */
    SysUser login(String userName, String password);

    /**
     * 用户注册
     *
     * @param sysUser 用户信息
     * @return 是否注册成功
     * @throws RuntimeException 注册失败时抛出异常（含错误信息）
     */
    boolean register(SysUser sysUser);

}
