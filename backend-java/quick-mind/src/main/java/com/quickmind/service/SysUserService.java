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
     * 校验用户名密码是否正确
     *
     * @param username
     * @param rawPassword
     * @return
     */
    SysUser checkLogin(String username, String rawPassword);

}
