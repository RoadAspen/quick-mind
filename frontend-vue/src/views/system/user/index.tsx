import PageContainer from '@/components/PageContainer';
import {
  DelFlagMap,
  UserSexMap,
  UserStatusMap,
  UserTypeMap,
  useSysUserStore
} from '@/store/system/user';
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
import {
  Button,
  Space,
  Switch,
  Table,
  TableColumnProps,
  Tag
} from 'ant-design-vue';
import { defineComponent, onMounted, reactive } from 'vue';

export default defineComponent({
  setup() {
    const userStore = useSysUserStore();
    function handleView(record: SysUserInfo): void {
      throw new Error('Function not implemented.');
    }

    function handleEdit(record: SysUserInfo): void {
      throw new Error('Function not implemented.');
    }

    function handleDelete(userId: number): void {
      throw new Error('Function not implemented.');
    }
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
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        width: 120,
        align: 'center'
      },
      {
        title: '部门名称',
        dataIndex: 'deptName',
        key: 'deptName',
        width: 80,
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
        customRender: ({ text }: { text: UserTypeEnum }) =>
          UserTypeMap[text] || '未知'
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
        customRender: ({ text }: { text: UserSexEnum }) =>
          UserSexMap[text] || '未知'
      },
      {
        title: '用户状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        align: 'center',
        customRender: ({
          text,
          record
        }: {
          text: UserStatusEnum;
          record: SysUserInfo;
        }) => {
          const statusText = UserStatusMap[text] || '未知';
          return (
            <Switch
              size="small"
              checked={text === UserStatusEnum.NORMAL}
              onChange={() =>
                userStore.handleSwitchUserStatus(
                  text === UserStatusEnum.NORMAL
                    ? UserStatusEnum.DISABLED
                    : UserStatusEnum.NORMAL,
                  record.userId
                )
              }
            />
          );
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
        customRender: ({ text }: { text: string }) =>
          text?.replace('T', ' ') || '-'
      },
      {
        title: '删除状态',
        dataIndex: 'delFlag',
        key: 'delFlag',
        width: 100,
        align: 'center',
        customRender: ({ text }: { text: DelFlagEnum }) => {
          const delText = DelFlagMap[text] || '未知';
          const delColor =
            text === DelFlagEnum.UNDELETED ? 'default' : 'danger';
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
        customRender: ({ text }: { text: string }) =>
          text?.replace('T', ' ') || '-'
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: 150,
        align: 'center'
      },
      {
        title: '操作',
        key: 'action',
        width: 180,
        align: 'center',
        fixed: 'right',
        customRender: ({ record }) => (
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

    onMounted(() => {
      userStore.runGetUserList(0, userStore.pagination);
    });

    return () => (
      <PageContainer>
        <Table
          columns={columns}
          data-source={userStore.tableData.list}
          pagination={false}
          scroll={{ x: 1000 }}
          size="small"
          bordered={true}
          loading={userStore.tableLoading}
        ></Table>
      </PageContainer>
    );
  }
});
