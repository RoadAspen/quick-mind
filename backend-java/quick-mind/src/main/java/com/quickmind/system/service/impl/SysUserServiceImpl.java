package com.quickmind.service.impl;

import com.quickmind.entity.SysUser;
import com.quickmind.mapper.SysUserMapper;
import com.quickmind.service.SysUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;


/**
 * 用户Service实现类(具体实现业务逻辑)
 */
@Service // 告诉 Spring 这是一个Service组件,会自动扫描并注入
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser>  immplements SysUserService {
    // 依赖注入:通过 @Resource 注解注入 Mapper 对象
    @Resource
    private SysUserMapper sysUserMapper;

}
