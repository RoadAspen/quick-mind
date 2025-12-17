package com.quickmind.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 系统用户表  实体类（对应数据库表 sys_user）
 * Lombok 注解,自动生成 getter/setter/toString 等方法
 *
 * @author roadaspen
 * @apiNote 系统用户实体类，用于映射数据库表 sys_user 包含用户的基本信息和状态管理字段
 * @since 2025/12/10 16:30
 */
@Data
@TableName("sys_user")
public class SysUser {
    /**
     * 主键 ID
     */
    @TableId(value = "user_id", type = IdType.AUTO)
    private Long userId;

    /**
     * 部门ID
     */
    private Long deptId;

    /**
     * 用户名
     */
    private String userName;

    /**
     * 昵称
     */
    private String nickName;

    /**
     * 用户类型 (00:普通用户)
     */
    private String userType = "00";

    /**
     * 邮箱
     */
    private String email;

    /**
     * 手机号
     */
    private String phone;

    /**
     * 性别 (0:男 1:女 2:未知)
     */
    private String sex = "2";

    /**
     * 头像地址
     */
    private String avatar;

    /**
     * 密码
     */
    private String password;

    /**
     * 用户状态 (0:正常 1:禁用)
     */
    private String status = "0";

    /**
     * 删除标记 (0:未删除 1:已删除)
     */
    private String delFlag = "0";

    /**
     * 最后登录IP
     */
    private String loginIp;

    /**
     * 最后登录时间
     */
    private LocalDateTime loginDate;

    /**
     * 密码更新时间
     */
    private LocalDateTime pwdUpdateDate;

    /**
     * 创建人
     */
    @TableField(fill = FieldFill.INSERT)
    private String createBy;

    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    /**
     * 更新人
     */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private String updateBy;

    /**
     * 更新时间
     */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    /**
     * 备注
     */
    private String remark;
}
