package com.quickmind.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.quickmind.entity.SysUser;
import com.quickmind.mapper.SysUserMapper;
import com.quickmind.service.SysUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


/**
 * 用户Service实现类(具体实现业务逻辑)
 * &#064;service 注解：  告诉 Spring 这是一个Service组件,会自动扫描并注入
 *
 * @author roadaspen
 * @since 2025/12/10 12:37
 */
@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {
    /**
     * 注入Mapper （MyBatis-Plus的ServiceImpl已封装基础CRUD，复杂查询需用Mapper）
     */
    @Resource
    private SysUserMapper sysUserMapper;

    /**
     * 根据用户名查询用户（含密码/状态等）
     */
    @Override
    public SysUser selectByUserName(String username) {
        return sysUserMapper.selectByUserName(username);
    }


}
