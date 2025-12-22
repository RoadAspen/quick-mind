package com.quickmind.entity.vo;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 获取用户列表返回对象
 *
 * @author roadaspen
 * @since 2025/12/22 17:38
 */
@Data
public class SysUserListVO {
    /**
     * 主键 ID
     */
    private Long userId;

    /**
     * 用户名
     */
    private String userName;

    /**
     * 昵称
     */
    private String nickName;


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
     * 部门ID
     */
    private Long deptId;
    /**
     * 部门名称
     */
    private String deptName;

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
     * 创建人
     */
    private String createBy;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;

    /**
     * 更新人
     */
    private String updateBy;

    /**
     * 更新时间
     */
    private LocalDateTime updateTime;

    /**
     * 备注
     */
    private String remark;
}
