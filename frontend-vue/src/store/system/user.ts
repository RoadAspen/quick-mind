/** 用户列表 */
import { getSysUserListRequest } from '@/api/user';
import { TableData } from '@/types/common';
import {
  DelFlagEnum,
  SysUserInfo,
  UserSexEnum,
  UserStatusEnum,
  UserTypeEnum
} from '@/types/system/user';
import { useAsyncState } from '@vueuse/core';
import { Modal } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { reactive } from 'vue';
/** 用户类型映射 */
export const UserTypeMap = {
  [UserTypeEnum.ORDINARY]: '普通用户'
};
/** 用户性别 */
export const UserSexMap = {
  [UserSexEnum.MALE]: '男',
  [UserSexEnum.FEMALE]: '女',
  [UserSexEnum.UNKNOWN]: '未知'
};
/** 用户状态映射 */
export const UserStatusMap = {
  [UserStatusEnum.NORMAL]: '正常',
  [UserStatusEnum.DISABLED]: '禁用'
};
/** 删除标记映射 */
export const DelFlagMap = {
  [DelFlagEnum.UNDELETED]: '未删除',
  [DelFlagEnum.DELETED]: '已删除'
};
export const useSysUserStore = defineStore('user', () => {
  /** 分页请求 */
  const pagination = reactive({
    page: 1,
    pageSize: 10
  });
  /** 筛选请求 */
  const filterForm = reactive({
    username: '',
    nickname: '',
    status: undefined as string | undefined,
    sex: undefined as string | undefined
  });
  /** 弹窗表单  新增/编辑弹窗  */
  const modalForm = reactive({
    username: '',
    nickname: '',
    email: '',
    phone: '',
    sex: undefined as string | undefined,
    status: '0' as string
  });

  /** 表格数据 */
  const tableData: TableData<SysUserInfo> = reactive({ list: [], total: 0 });
  /** 获取用户列表请求方法 */
  const { isLoading: tableLoading, execute: runGetUserList } = useAsyncState(
    getSysUserListRequest,
    null,
    {
      immediate: false,
      onSuccess: (res) => {
        if (res) {
          tableData.total = res.total;
          tableData.list = res.list || [];
        }
      }
    }
  );

  function handleSwitchUserStatus(status: string, userId: number) {
    Modal.confirm({
      title: '提示',
      content: `确定要${status === '1' ? '停用' : '启用'}该用户吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        // 调用接口修改用户状态
        // switchUserStatusRequest(userId, status).then((res) => {
        //   if (res) {
        //     message.success('操作成功');
        //     runGetUserList(0, pagination); // 刷新列表
        //   }
        // });
      }
    });
  }
  return {
    UserTypeMap,
    UserSexMap,
    /** 表格数据 */
    tableData,
    /** 分页数据 */
    pagination,
    /** 筛选表单数据 */
    filterForm,
    /** 弹窗表单数据, 用于新增和编辑  */
    modalForm,
    /** 加载状态 */
    tableLoading,
    /** 请求用户列表数据 */
    runGetUserList,
    /** 切换单个用户状态  */
    handleSwitchUserStatus
  };
});
