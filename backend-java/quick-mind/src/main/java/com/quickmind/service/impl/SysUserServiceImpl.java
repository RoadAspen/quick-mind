package com.quickmind.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.quickmind.common.result.PageResult;
import com.quickmind.entity.SysUser;
import com.quickmind.mapper.SysUserMapper;
import com.quickmind.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


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
    @Autowired
    private SysUserMapper sysUserMapper;

    /**
     * 根据用户名查询用户（含密码/状态等）
     */
    @Override
    public SysUser selectByUserName(String username) {
        return sysUserMapper.selectByUserName(username);
    }

    /**
     * 页面查询接口（分页）：根据条件查询用户列表（不包含密码字段）
     *
     * @param query 用户信息对象
     */
    @Override
    public PageResult<SysUser> selectUserList(int page, int pageSize, SysUser query) {
        int offset = (page - 1) * pageSize;
        List<SysUser> list = sysUserMapper.selectUserList(offset, pageSize, query);
        int total = sysUserMapper.selectUserCount(query);
        // 封装分页结果
        PageResult<SysUser> result = new PageResult<>();
        result.setList(list);
        result.setPage(page);
        result.setPageSize(pageSize);
        result.setTotal(total);

        return result;
    }

    /**
     * 根据ID批量删除用户
     * Transactional 注解用于开启事务，rollbackFor = Exception.class 表示发生任何异常都回滚
     *
     * @param ids 用户ID集合
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteBatchIds(String ids, String updateBy) {
        // 按逗号、分号、竖线拆分（正则：[,;|] 匹配任意一个分隔符）
        String[] idArray = ids.split("[,;|]");
        sysUserMapper.deleteBatchIds(idArray);
    }

    ;

    /**
     * 单独修改用户状态
     */
    @Override
    public void updateUserStatus(Long userId, Integer status) {

    }

    ;

    /**
     * 编辑用户信息
     *
     * @param sysUser 用户信息
     */
    @Override
    public void updateUser(SysUser sysUser) {

    }

    ;

    /**
     * 新增用户
     */
    @Override
    public void insertUser(SysUser sysUser) {

    }

    ;


}
