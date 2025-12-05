package com.quickmind.entity;

import lombok.Data; // Lombok 注解,自动生成 getter/setter/toString 等方法

import java.time.LocalDateTime; // 时间相关类

/**
 * 系统用户表  实体类（对应数据库表 sys_user）
 */
@Data // Lombok 注解,自动生成 getter/setter/toString 等方法
public class SysUser {
    // 主键 ID
    private Long userId;
    // 部门ID
    private Long deptId; // 部门ID

    // 用户名
    private String username;

    // 昵称
    private String nickname;
    // 用户类型 (00:普通用户)
    private Integer userType; 
    
    // 邮箱
    private String email;
    
    // 手机号
    private String phonenumber;
    
    // 性别 (0:男 1:女 2:未知)
    private Integer sex;
    
    // 头像地址
    private String avatar;
    
    // 密码
    private String password;.

    // 用户状态 (0:正常 1:禁用)
    private Integer status; // 0:正常 1:禁用

    // 删除标记 (0:未删除 1:已删除)
    private Integer delFlag = 0; // 默认未删除

    // 最后登录IP
    private String loginIp; // 最后登录IP

    // 最后登录时间
    private LocalDateTime loginDate; // 最后登录时间

    // 密码更新时间
    private LocalDateTime pwdUpdateDate; // 密码更新时间


    // 创建时间
    private LocalDateTime createTime;
    // 创建人
    private Long createBy; // 创建人ID

    // 更新时间
    private LocalDateTime updateTime;
    // 更新人
    private Long updateBy; // 更新人ID

    // 备注
    private String remark; // 备注信息
}
