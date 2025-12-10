package com.quickmind.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.quickmind.entity.SysUser;
import com.quickmind.mapper.SysUserMapper;
import com.quickmind.service.SysUserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


/**
 * 用户Service实现类(具体实现业务逻辑)
 *
 * @author roadaspen
 * @since 2025/12/10 12:37
 */
@Service // 告诉 Spring 这是一个Service组件,会自动扫描并注入
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {
    // 注入Mapper （MyBatis-Plus的ServiceImpl已封装基础CRUD，复杂查询需用Mapper）
    @Resource
    private SysUserMapper sysUserMapper;

    // 依赖注入：密码加密器（Spring Security 提供，用于校验 BCrypt 加密的密码）
    @Resource
    private PasswordEncoder passwordEncoder;

    /**
     * 根据用户名查询用户（含密码/状态等）
     */
    @Override
    public SysUser selectByUserName(String username) {
        return sysUserMapper.selectByUserName(username);
    }

    /**
     * 登录逻辑校验
     */
    @Override
    public SysUser login(String userName, String password) {
        // 1. 查询用户是否存在
        SysUser sysUser = selectByUserName(userName);
        if (sysUser == null) {
            throw new RuntimeException("用户名不存在");
        }

        // 2. 校验账号状态, 检验用户的status是否正常
        if ("1".equals(sysUser.getStatus())) {
            throw new RuntimeException("账号已禁用,请联系管理员");
        }

        // 3. 校验密码
        if (!passwordEncoder.matches(password, sysUser.getPassword())) {
            throw new RuntimeException("密码错误");
        }
        // 4. 登录成功,返回用户,移除password字段
        sysUser.setPassword(null);
        return sysUser;
    }

    /**
     * 注册方法
     *
     * @param sysUser 用户信息
     * @return 注册结果 true:注册成功 false:注册失败
     */
    @Override
    public boolean register(SysUser sysUser) {
        try {
            // 1. 校验用户名是否重复
            SysUser user = selectByUserName(sysUser.getUserName());
            if (user != null) {
                throw new RuntimeException("用户名已存在");
            }
            // 2. 判断密码是否为空
            if (StringUtils.isEmpty(sysUser.getPassword())) {
                throw new RuntimeException("密码不能为空");
            }
            // 3. 加密密码
            sysUser.setPassword(passwordEncoder.encode(sysUser.getPassword()));
            // 4. 设置默认状态
            sysUser.setStatus("0");
            // 插入用户数据到数据库
            sysUserMapper.insert(sysUser);
            // 注册成功返回true
            return true;
        } catch (Exception e) {
            // 如果出现异常，回滚事务
            throw new RuntimeException("注册失败", e);
        }

    }

}
