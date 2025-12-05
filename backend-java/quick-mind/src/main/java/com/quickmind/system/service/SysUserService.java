package com.quickmind.service;

import com.quickmind.entity.SysUser;
import com.quickmind.mapper.SysUserMapper;
import com.baomidou.mybatisplus.extension.service.IService;

/** 
 * 用户的Service接口(封装用户相关业务逻辑)
 */
public class SysUserService extends IService<SysUser> {
    // IService 是 MyBatis Plus 提供的通用 Service 接口，包含常用的 CRUD 操作
    // 比如 save(), update(), removeById() 等方法
    // 手动添加一个方法：根据用户名查询用户信息
    SysUser selectByUserName(String userName);

    // 手动添加:用户登录校验(业务逻辑: 用户名存在+密码正确 + 状态正常)
    SysUser login(String userName, String password);

}
