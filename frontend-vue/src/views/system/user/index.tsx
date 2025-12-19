import { getSysUserListRequest } from '@/api/user';
import PageContainer from '@/components/PageContainer';
import { TableData } from '@/types/common';
import {
  DelFlagEnum,
  SysUserInfo,
  UserSexEnum,
  UserStatusEnum,
  UserTypeEnum
} from '@/types/system/user';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined
} from '@ant-design/icons-vue';
import { useAsyncState } from '@vueuse/core';
import { Button, Space, Table, TableColumnProps, Tag } from 'ant-design-vue';
import { defineComponent, onMounted, reactive } from 'vue';

export default defineComponent({
  setup() {
    function handleView(record: SysUserInfo): void {
      throw new Error('Function not implemented.');
    }

    function handleEdit(record: SysUserInfo): void {
      throw new Error('Function not implemented.');
    }

    function handleDelete(userId: number): void {
      throw new Error('Function not implemented.');
    }
    // 枚举文本映射（用于表格渲染）
    const UserTypeMap = {
      [UserTypeEnum.ORDINARY]: '普通用户'
    };

    const UserSexMap = {
      [UserSexEnum.MALE]: '男',
      [UserSexEnum.FEMALE]: '女',
      [UserSexEnum.UNKNOWN]: '未知'
    };

    const UserStatusMap = {
      [UserStatusEnum.NORMAL]: '正常',
      [UserStatusEnum.DISABLED]: '禁用'
    };

    const DelFlagMap = {
      [DelFlagEnum.UNDELETED]: '未删除',
      [DelFlagEnum.DELETED]: '已删除'
    };
    const columns: TableColumnProps<SysUserInfo>[] = reactive([
      {
        title: '用户ID',
        dataIndex: 'userId',
        key: 'userId',
        width: 80,
        align: 'center',
        fixed: true
      },
      {
        title: '部门ID',
        dataIndex: 'deptId',
        key: 'deptId',
        width: 80,
        align: 'center'
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        width: 120,
        align: 'center'
      },
      {
        title: '昵称',
        dataIndex: 'nickName',
        key: 'nickName',
        width: 120,
        align: 'center'
      },
      {
        title: '用户类型',
        dataIndex: 'userType',
        key: 'userType',
        width: 100,
        align: 'center',
        // 枚举值转中文
        render: (_: string, record: SysUserInfo) =>
          UserTypeMap[record.userType] || '未知'
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        width: 200,
        align: 'center'
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        width: 130,
        align: 'center'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        width: 80,
        align: 'center',
        render: (_: string, record: SysUserInfo) =>
          UserSexMap[record.sex] || '未知'
      },
      {
        title: '用户状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        align: 'center',
        // AntD 风格状态标签渲染
        render: (_: string, record: SysUserInfo) => {
          const statusText = UserStatusMap[record.status] || '未知';
          const statusColor =
            record.status === UserStatusEnum.NORMAL ? 'success' : 'error';
          return <Tag color={statusColor}>{statusText}</Tag>;
        }
      },
      {
        title: '最后登录IP',
        dataIndex: 'loginIp',
        key: 'loginIp',
        width: 120,
        align: 'center'
      },
      {
        title: '最后登录时间',
        dataIndex: 'loginDate',
        key: 'loginDate',
        width: 200,
        align: 'center',
        // 时间格式化（去掉 T 分隔符）
        render: (_: string, record: SysUserInfo) =>
          record.loginDate?.replace('T', ' ') || '-'
      },
      {
        title: '删除状态',
        dataIndex: 'delFlag',
        key: 'delFlag',
        width: 100,
        align: 'center',
        render: (_: string, record: SysUserInfo) => {
          const delText = DelFlagMap[record.delFlag] || '未知';
          const delColor =
            record.delFlag === DelFlagEnum.UNDELETED ? 'default' : 'danger';
          return <Tag color={delColor}>{delText}</Tag>;
        }
      },
      {
        title: '创建人',
        dataIndex: 'createBy',
        key: 'createBy',
        width: 100,
        align: 'center'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 200,
        align: 'center',
        render: (_: string, record: SysUserInfo) =>
          record.createTime?.replace('T', ' ') || '-'
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: 150,
        align: 'center',
        // 备注过长省略
        render: (_: string, record: SysUserInfo) => {
          if (!record.remark) return '-';
          return record.remark.length > 10
            ? `${record.remark.slice(0, 10)}...`
            : record.remark;
        }
      },
      {
        title: '操作',
        key: 'action',
        width: 180,
        align: 'center',
        fixed: 'right',
        render: (_: any, record: SysUserInfo) => (
          <Space size="small">
            <Button
              type="primary"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            >
              查看
            </Button>
            <Button
              type="default"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            >
              编辑
            </Button>
            <Button
              danger={true}
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.userId)}
            >
              删除
            </Button>
          </Space>
        )
      }
    ]);

    const tableData: TableData<SysUserInfo> = reactive({ list: [], total: 0 });

    const { isLoading, execute: runGetUserList } = useAsyncState(
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
    const params = reactive({
      page: 1,
      pageSize: 10
    });

    onMounted(() => {
      runGetUserList(0, params);
    });

    return () => (
      <PageContainer>
        <Table
          columns={columns}
          data-source={tableData.list}
          pagination={false}
          scroll={{ x: 1000 }}
          size="small"
          bordered={true}
          loading={isLoading.value}
        ></Table>
      </PageContainer>
    );
  }
});
