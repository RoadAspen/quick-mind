import { PageParams } from '../common';

/** 获取用户列表入参 */
export interface UserParams extends PageParams {
  /** 用户名 */
  username?: string;
  /** 用户状态 */
  status?: string;
}

/** 用户信息 */
export interface SysUserInfo {
  /** 主键 ID */
  userId: number;

  /** 部门ID */
  deptId: number;

  /** 用户名 */
  userName: string;

  /** 昵称 */
  nickName: string;

  /** 用户类型 (00:普通用户) */
  userType: UserTypeEnum;

  /** 邮箱 */
  email: string;

  /** 手机号 */
  phone: string;

  /** 性别 (0:男 1:女 2:未知) */
  sex: UserSexEnum;

  /** 头像地址 */
  avatar: string;

  /** 用户状态 (0:正常 1:禁用) */
  status: UserStatusEnum;

  /** 最后登录IP */
  loginIp: string;

  /** 最后登录时间 */
  loginDate: string;

  /** 是否删除 */
  delFlag: DelFlagEnum;

  /** 创建人 */
  createBy: string;

  /** 创建时间 */
  createTime: string;

  /** 备注 */
  remark: string;
}

/** 性别枚举 */
export enum UserSexEnum {
  MALE = '0', // 男
  FEMALE = '1', // 女
  UNKNOWN = '2' // 未知
}

/** 用户状态枚举 */
export enum UserStatusEnum {
  NORMAL = '0', // 正常
  DISABLED = '1' // 禁用
}

/** 用户类型枚举 */
export enum UserTypeEnum {
  ORDINARY = '00' // 普通用户
}

/** 删除标记枚举 */
export enum DelFlagEnum {
  UNDELETED = '0', // 未删除
  DELETED = '1' // 已删除
}
