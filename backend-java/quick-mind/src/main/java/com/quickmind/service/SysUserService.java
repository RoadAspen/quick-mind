package com.quickmind.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.quickmind.common.result.PageResult;
import com.quickmind.entity.SysUser;

import java.util.List;


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
     * @param username 用户名
     * @return 系统用户
     */
    SysUser selectByUserName(String username);

    /**
     * 根据条件分页查询用户列表
     *
     * @param query 用户信息对象
     * @return 用户列表数据集合
     */
    PageResult<SysUser> selectUserList(int page, int pageSize, SysUser query);

    /**
     * 根据ID批量删除用户
     *
     * @param ids      用户ID集合
     * @param updateBy 更新人
     */
    void deleteBatchIds(String ids, String updateBy);

    /**
     * 单独修改用户状态
     */
    void updateUserStatus(Long userId, Integer status, String updateBy);

    /**
     * 编辑用户信息
     *
     * @param sysUser 用户信息
     */
    void updateUser(SysUser sysUser, String updateBy);

    /**
     * 新增用户
     */
    void insertUser(SysUser sysUser, String updateBy);

    /**
     * 批量导入
     */
    void batchImport(List<SysUser> list, String updateBy);


    /**
     * 批量导出用户数据
     *
     * @param list 用户列表
     * @return 导出数据
     */
    byte[] exportData(List<SysUser> list, String updateBy);

    /**
     * 重置密码
     */
    void resetPassword(Long userId, String updateBy);

}
