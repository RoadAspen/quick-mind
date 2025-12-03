-- 创建系统管理相关数据库
CREATE DATABASE IF NOT EXISTS `quickmind_db`
DEFAULT CHARACTER SET utf8mb4 
DEFAULT COLLATE utf8mb4_unicode_ci;

-- 切换到 quickmind_db 数据库
USE `quickmind_db`;

---  从上到下依次执行创建表语句

-- 创建部门表, 组织架构基础
CREATE TABLE IF NOT EXISTS `sys_dept` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '部门ID(主键)',
    `parent_id` bigint(20) DEFAULT 0 COMMENT '父部门ID(0 表示根部门)',
    `dept_name` varchar(30) DEFAULT '' COMMENT '部门名称',
    `sort` int(4) DEFAULT 0 COMMENT '排序(数字越小越靠前)',
    `leader` varchar(20) DEFAULT NULL COMMENT '部门负责人',
    `phone` varchar(11) DEFAULT NULL COMMENT '部门联系电话',
    `email` varchar(50) DEFAULT NULL COMMENT '部门邮箱',
    `status` varchar(1) DEFAULT '0'  COMMENT '状态（ 0 正常 1 停用）',
    `del_flag` varchar(1)  DEFAULT '0' COMMENT '删除标志（0代表存在 1代表删除）',
    `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
    `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
    `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `remark` varchar(500) DEFAULT '' COMMENT '备注',
    PRIMARY KEY (`id`)
) AUTO_INCREMENT = 100 ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='部门表';

-- 插入测试数据（根部门,parent_id 为0）
INSERT INTO `sys_dept` (`parent_id`,`dept_name`, `sort`,`create_by`,`leader`,`phone`, `email`)
VALUES 
(0,'捷智科技', 0, 'admin', '牛油果', '15888888888', 'qm@quickmind.com');-- id  = 100

-- 插入测试数据（子部门）
INSERT INTO `sys_dept` (`parent_id`,`dept_name`, `sort`,`create_by`, `leader`, `phone`, `email`)
VALUES 
(100,'深圳总公司', 1, 'admin', '牛油果',  '15888888888', 'sz@quickmind.com'), -- id  = 101
(100,'太原分公司', 2, 'admin', '牛油果',  '15888888888', 'cs@quickmind.com'), -- id = 102
(101,'研发部门', 1, 'admin',  '牛油果', '15888888888', 'finance@quickmind.com'), -- id  = 103
(101,'市场部门', 2, 'admin',  '牛油果', '15888888888', 'finance@quickmind.com'),
(101,'测试部门', 3, 'admin',  '牛油果', '15888888888', 'finance@quickmind.com'),
(101,'财务部门',4, 'admin',  '牛油果', '15888888888', 'finance@quickmind.com'),
(101,'运维部门', 5, 'admin',  '牛油果', '15888888888', 'finance@quickmind.com'),
(102,'市场部门', 1, 'admin',  '牛油果', '15888888888', 'finance@quickmind.com'),
(102,'财务部门', 2, 'admin',  '牛油果', '15888888888', 'finance@quickmind.com');


-- 岗位表, 用于给用户分配岗位信息
CREATE TABLE `sys_post` (
    `id` bigint NOT NULL AUTO_INCREMENT COMMENT '岗位ID(主键)',
    `post_code` varchar(64) NOT NULL COMMENT '岗位编码(唯一,比如：CEO、CTO、CFO等)',
    `post_name` varchar(50) NOT NULL COMMENT '岗位名称',
    `sort` int(4) DEFAULT 0  NOT NULL COMMENT '排序(数字越小越靠前)',
    `status` varchar(1) DEFAULT '0'  COMMENT '状态（ 0 正常 1 停用）',
    `del_flag` varchar(1)  DEFAULT '0' COMMENT '删除标志（0代表存在 1代表删除）',
    `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
    `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
    `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `remark` varchar(500) DEFAULT '' COMMENT '备注',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_post_code` (`post_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4 COMMENT='岗位信息表';

-- 插入测试数据
INSERT INTO `sys_post` (`post_code`, `post_name`, `sort`,`create_by`)
VALUES 
('CEO', '董事长', 1,'admin'),
('SE', '项目经理', 2,'admin'),
('HR', '人力资源', 3,'admin'),
('USER', '普通员工', 4,'admin');


-- 菜单表
CREATE TABLE `sys_menu` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '菜单ID(主键)',
    `menu_name` varchar(50) NOT NULL COMMENT '菜单名称',
    `parent_id` bigint(20) DEFAULT -1 COMMENT '父菜单ID,-1表示根菜单',
    `sort` int(4) DEFAULT 0 COMMENT '显示顺序',
    `path` varchar(200) DEFAULT '' COMMENT '路由地址,前端使用',
    `component` varchar(255) DEFAULT NULL COMMENT '组件路径,前端使用',
    `is_frame` int(1) DEFAULT 1 COMMENT '是否为外链(1是,0否)',
    `is_cache` int(1) DEFAULT 0 COMMENT '是否缓存(1是,0否)',
    `menu_type` char(1) DEFAULT '' COMMENT '菜单类型(M目录,C菜单,F按钮)',
    `visible` TINYINT(1) DEFAULT 1 COMMENT '菜单状态( 1 显示,  0 隐藏)',
    `status` varchar(1) DEFAULT '0'  COMMENT '状态（ 0 正常 1 停用）',
    `del_flag` varchar(1)  DEFAULT '0' COMMENT '删除标志（0代表存在 1代表删除）',
    `perms` varchar(100) DEFAULT NULL COMMENT '权限标识,(比如 user:list,user:add 一般为 功能名:操作名  格式 )',
    `icon` varchar(100) DEFAULT '#' COMMENT '菜单图标,(前端用)',
    `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
    `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
    `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `remark` varchar(500) DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `idx_parent_id` (`parent_id`) COMMENT '父级ID索引',
  KEY `idx_status` (`status`) COMMENT '状态索引',
  KEY `idx_menu_type` (`menu_type`) COMMENT '菜单类型索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '系统菜单表';

-- 插入完整菜单数据（去掉 menu_id，自动自增；新增首页，删除若依官网）
INSERT INTO `sys_menu` (
  `parent_id`, `menu_name`, `menu_type`, `path`, 
  `component`, `perms`, `icon`, `sort`, `is_frame`, `is_cache`, 
  `visible`, `status`
) VALUES
-- 根目录菜单（parent_id=0）：新增「首页」作为第一项，删除「若依官网」
(0, '首页', 'C', '/home', 'home/index', 'home', 'home', 1, '1', '0', '0', '0'), -- 新增首页：path=/home，component=Home（可根据前端调整）
(0, '系统管理', 'M', 'system', '', '', 'system', 2, '1', '0', '0', '0'), -- 排序改为2
(0, '系统监控', 'M', 'monitor', '', '', 'monitor', 3, '1', '0', '0', '0'), -- 排序改为3
(0, '系统工具', 'M', 'tool', '', '', 'tool', 4, '1', '0', '0', '0'), -- 排序改为4

-- 系统管理子菜单（parent_id=2，对应「系统管理」的自增ID=2）
(2, '用户管理', 'C', 'user', 'system/user/index', 'system:user:list', 'user', 1, '1', '0', '0', '0'),
(2, '角色管理', 'C', 'role', 'system/role/index', 'system:role:list', 'peoples', 2, '1', '0', '0', '0'),
(2, '菜单管理', 'C', 'menu', 'system/menu/index', 'system:menu:list', 'tree-table', 3, '1', '0', '0', '0'),
(2, '部门管理', 'C', 'dept', 'system/dept/index', 'system:dept:list', 'tree', 4, '1', '0', '0', '0'),
(2, '岗位管理', 'C', 'post', 'system/post/index', 'system:post:list', 'post', 5, '1', '0', '0', '0'),
(2, '字典管理', 'C', 'dict', 'system/dict/index', 'system:dict:list', 'dict', 6, '1', '0', '0', '0'),
(2, '参数设置', 'C', 'config', 'system/config/index', 'system:config:list', 'edit', 7, '1', '0', '0', '0'),
(2, '通知公告', 'C', 'notice', 'system/notice/index', 'system:notice:list', 'message', 8, '1', '0', '0', '0'),
(2, '日志管理', 'M', 'log', '', '', 'log', 9, '1', '0', '0', '0'),

-- 系统监控子菜单（parent_id=3，对应「系统监控」的自增ID=3）
(3, '在线用户', 'C', 'online', 'monitor/online/index', 'monitor:online:list', 'online', 1, '1', '0', '0', '0'),
(3, '定时任务', 'C', 'job', 'monitor/job/index', 'monitor:job:list', 'job', 2, '1', '0', '0', '0'),
(3, '数据监控', 'C', 'druid', 'monitor/druid/index', 'monitor:druid:list', 'druid', 3, '1', '0', '0', '0'),
(3, '服务监控', 'C', 'server', 'monitor/server/index', 'monitor:server:list', 'server', 4, '1', '0', '0', '0'),
(3, '缓存监控', 'C', 'cache', 'monitor/cache/index', 'monitor:cache:list', 'redis', 5, '1', '0', '0', '0'),
(3, '缓存列表', 'C', 'cacheList', 'monitor/cacheList', 'monitor:cacheList:list', 'redis-list', 6, '1', '0', '0', '0'),

-- 系统工具子菜单（parent_id=4，对应「系统工具」的自增ID=4）
(4, '表单构建', 'C', 'build', 'tool/build/index', 'tool:build:list', 'build', 1, '1', '0', '0', '0'),
(4, '代码生成', 'C', 'gen', 'tool/gen/index', 'tool:gen:list', 'code', 2, '1', '0', '0', '0'),
(4, '系统接口', 'C', 'swagger', 'tool/swagger/index', 'tool:swagger:list', 'swagger', 3, '1', '0', '0', '0'),

-- 日志管理子菜单（parent_id=11，对应「日志管理」的自增ID=11）
(11, '操作日志', 'C', 'operlog', 'monitor/operlog/index', 'monitor:operlog:list', 'form', 1, '1', '0', '0', '0'),
(11, '登录日志', 'C', 'logininfor', 'monitor/logininfor/index', 'monitor:logininfor:list', 'logininfor', 2, '1', '0', '0', '0'),

-- 以下是所有按钮（parent_id 对应调整后的子菜单自增ID，确保关联正确）
-- 用户管理按钮（parent_id=5，对应「用户管理」自增ID=5）
(5, '用户查询', 'F', '', '', 'system:user:query', '#', 1, '1', '0', '0', '0'),
(5, '用户新增', 'F', '', '', 'system:user:add', '#', 2, '1', '0', '0', '0'),
(5, '用户修改', 'F', '', '', 'system:user:edit', '#', 3, '1', '0', '0', '0'),
(5, '用户删除', 'F', '', '', 'system:user:remove', '#', 4, '1', '0', '0', '0'),
(5, '用户导出', 'F', '', '', 'system:user:export', '#', 5, '1', '0', '0', '0'),
(5, '用户导入', 'F', '', '', 'system:user:import', '#', 6, '1', '0', '0', '0'),
(5, '重置密码', 'F', '', '', 'system:user:resetPwd', '#', 7, '1', '0', '0', '0'),

-- 角色管理按钮（parent_id=6，对应「角色管理」自增ID=6）
(6, '角色查询', 'F', '', '', 'system:role:query', '#', 1, '1', '0', '0', '0'),
(6, '角色新增', 'F', '', '', 'system:role:add', '#', 2, '1', '0', '0', '0'),
(6, '角色修改', 'F', '', '', 'system:role:edit', '#', 3, '1', '0', '0', '0'),
(6, '角色删除', 'F', '', '', 'system:role:remove', '#', 4, '1', '0', '0', '0'),
(6, '角色导出', 'F', '', '', 'system:role:export', '#', 5, '1', '0', '0', '0'),

-- 菜单管理按钮（parent_id=7，对应「菜单管理」自增ID=7）
(7, '菜单查询', 'F', '', '', 'system:menu:query', '#', 1, '1', '0', '0', '0'),
(7, '菜单新增', 'F', '', '', 'system:menu:add', '#', 2, '1', '0', '0', '0'),
(7, '菜单修改', 'F', '', '', 'system:menu:edit', '#', 3, '1', '0', '0', '0'),
(7, '菜单删除', 'F', '', '', 'system:menu:remove', '#', 4, '1', '0', '0', '0'),

-- 部门管理按钮（parent_id=8，对应「部门管理」自增ID=8）
(8, '部门查询', 'F', '', '', 'system:dept:query', '#', 1, '1', '0', '0', '0'),
(8, '部门新增', 'F', '', '', 'system:dept:add', '#', 2, '1', '0', '0', '0'),
(8, '部门修改', 'F', '', '', 'system:dept:edit', '#', 3, '1', '0', '0', '0'),
(8, '部门删除', 'F', '', '', 'system:dept:remove', '#', 4, '1', '0', '0', '0'),

-- 岗位管理按钮（parent_id=9，对应「岗位管理」自增ID=9）
(9, '岗位查询', 'F', '', '', 'system:post:query', '#', 1, '1', '0', '0', '0'),
(9, '岗位新增', 'F', '', '', 'system:post:add', '#', 2, '1', '0', '0', '0'),
(9, '岗位修改', 'F', '', '', 'system:post:edit', '#', 3, '1', '0', '0', '0'),
(9, '岗位删除', 'F', '', '', 'system:post:remove', '#', 4, '1', '0', '0', '0'),
(9, '岗位导出', 'F', '', '', 'system:post:export', '#', 5, '1', '0', '0', '0'),

-- 字典管理按钮（parent_id=10，对应「字典管理」自增ID=10）
(10, '字典查询', 'F', '', '', 'system:dict:query', '#', 1, '1', '0', '0', '0'),
(10, '字典新增', 'F', '', '', 'system:dict:add', '#', 2, '1', '0', '0', '0'),
(10, '字典修改', 'F', '', '', 'system:dict:edit', '#', 3, '1', '0', '0', '0'),
(10, '字典删除', 'F', '', '', 'system:dict:remove', '#', 4, '1', '0', '0', '0'),
(10, '字典导出', 'F', '', '', 'system:dict:export', '#', 5, '1', '0', '0', '0'),

-- 参数设置按钮（parent_id=12，对应「参数设置」自增ID=12）
(12, '参数查询', 'F', '', '', 'system:config:query', '#', 1, '1', '0', '0', '0'),
(12, '参数新增', 'F', '', '', 'system:config:add', '#', 2, '1', '0', '0', '0'),
(12, '参数修改', 'F', '', '', 'system:config:edit', '#', 3, '1', '0', '0', '0'),
(12, '参数删除', 'F', '', '', 'system:config:remove', '#', 4, '1', '0', '0', '0'),
(12, '参数导出', 'F', '', '', 'system:config:export', '#', 5, '1', '0', '0', '0'),

-- 通知公告按钮（parent_id=13，对应「通知公告」自增ID=13）
(13, '公告查询', 'F', '', '', 'system:notice:query', '#', 1, '1', '0', '0', '0'),
(13, '公告新增', 'F', '', '', 'system:notice:add', '#', 2, '1', '0', '0', '0'),
(13, '公告修改', 'F', '', '', 'system:notice:edit', '#', 3, '1', '0', '0', '0'),
(13, '公告删除', 'F', '', '', 'system:notice:remove', '#', 4, '1', '0', '0', '0'),

-- 操作日志按钮（parent_id=14，对应「操作日志」自增ID=14）
(14, '操作查询', 'F', '', '', 'monitor:operlog:query', '#', 1, '1', '0', '0', '0'),
(14, '操作删除', 'F', '', '', 'monitor:operlog:remove', '#', 2, '1', '0', '0', '0'),
(14, '日志导出', 'F', '', '', 'monitor:operlog:export', '#', 3, '1', '0', '0', '0'),

-- 登录日志按钮（parent_id=15，对应「登录日志」自增ID=15）
(15, '登录查询', 'F', '', '', 'monitor:logininfor:query', '#', 1, '1', '0', '0', '0'),
(15, '登录删除', 'F', '', '', 'monitor:logininfor:remove', '#', 2, '1', '0', '0', '0'),
(15, '日志导出', 'F', '', '', 'monitor:logininfor:export', '#', 3, '1', '0', '0', '0'),
(15, '账户解锁', 'F', '', '', 'monitor:logininfor:unlock', '#', 4, '1', '0', '0', '0'),

-- 在线用户按钮（parent_id=16，对应「在线用户」自增ID=16）
(16, '在线查询', 'F', '', '', 'monitor:online:query', '#', 1, '1', '0', '0', '0'),
(16, '批量强退', 'F', '', '', 'monitor:online:batchLogout', '#', 2, '1', '0', '0', '0'),
(16, '单条强退', 'F', '', '', 'monitor:online:forceLogout', '#', 3, '1', '0', '0', '0'),

-- 定时任务按钮（parent_id=17，对应「定时任务」自增ID=17）
(17, '任务查询', 'F', '', '', 'monitor:job:query', '#', 1, '1', '0', '0', '0'),
(17, '任务新增', 'F', '', '', 'monitor:job:add', '#', 2, '1', '0', '0', '0'),
(17, '任务修改', 'F', '', '', 'monitor:job:edit', '#', 3, '1', '0', '0', '0'),
(17, '任务删除', 'F', '', '', 'monitor:job:remove', '#', 4, '1', '0', '0', '0'),
(17, '状态修改', 'F', '', '', 'monitor:job:changeStatus', '#', 5, '1', '0', '0', '0'),
(17, '任务导出', 'F', '', '', 'monitor:job:export', '#', 6, '1', '0', '0', '0'),

-- 代码生成按钮（parent_id=21，对应「代码生成」自增ID=21）
(21, '生成查询', 'F', '', '', 'tool:gen:query', '#', 1, '1', '0', '0', '0'),
(21, '生成修改', 'F', '', '', 'tool:gen:edit', '#', 2, '1', '0', '0', '0'),
(21, '生成删除', 'F', '', '', 'tool:gen:remove', '#', 3, '1', '0', '0', '0'),
(21, '导入代码', 'F', '', '', 'tool:gen:import', '#', 4, '1', '0', '0', '0'),
(21, '预览代码', 'F', '', '', 'tool:gen:preview', '#', 5, '1', '0', '0', '0'),
(21, '生成代码', 'F', '', '', 'tool:gen:code', '#', 6, '1', '0', '0', '0');

--  角色表, 权限核心表,用来关联权限
CREATE TABLE `sys_role` (
    `id` bigint NOT NULL AUTO_INCREMENT COMMENT '角色ID(主键,自增)',
    `role_name` varchar(50) NOT NULL COMMENT '角色名称(唯一)',
    `role_key` varchar(50) NOT NULL COMMENT '角色权限字符串(唯一,比如admin 、user等)',
    `sort` int NOT NULL DEFAULT 0 COMMENT '显示顺序(数字越小越靠前)',
    `status` varchar(1) DEFAULT '0'  COMMENT '状态（ 0 正常 1 停用）',
    `del_flag` varchar(1)  DEFAULT '0' COMMENT '删除标志（0代表存在 1代表删除）',
    `is_admin` tinyint(1) DEFAULT 0 COMMENT '是否为超级管理员(0 否 1 是)',
    `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
    `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
    `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `remark` varchar(500) DEFAULT '' COMMENT '备注(描述信息)',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_role_name` (`role_name`), -- 唯一索引，确保 role_name 的唯一性
    UNIQUE KEY `uk_role_key` (`role_key`) -- 唯一索引，确保 role_key 的唯一性
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '系統角色表';

-- 插入角色数据
INSERT INTO `sys_role` ( `role_name`, `role_key`, `sort`,`is_admin`, `remark`) VALUES
('超级管理员', 'admin', 1, 1, '超级管理员'),
('普通角色', 'common', 2, 0,'普通角色');



-- 创建用户表, 用来关联部门、崗位,  而角色和用户采用多对多的关系
CREATE TABLE IF NOT EXISTS `sys_user` (
    `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID(主键,自增)',
    `user_name` VARCHAR(50) NOT NULL COMMENT '用户名(登录用,唯一)',
    `nick_name` VARCHAR(50) DEFAULT '默认昵称' COMMENT '用户昵称(显示用)',
    `password` VARCHAR(255) NOT NULL COMMENT '密码(加密后,不能存铭文)',
    `sex` varchar(1) DEFAULT "0" COMMENT '性别(0:未知 1:男 2:女)',
    `avatar` VARCHAR(255) DEFAULT '' COMMENT '头像URL(可选)',
    `phone` VARCHAR(20) COMMENT '手机号(可选)',
    `status` varchar(1) DEFAULT '0'  COMMENT '状态（ 0 正常 1 停用）',
    `del_flag` varchar(1)  DEFAULT '0' COMMENT '删除标志（0代表存在 1代表删除）',
    `email` VARCHAR(100) DEFAULT ''  COMMENT '邮箱(可选)',
    `dept_id` bigint DEFAULT 1 COMMENT '所属部门ID(外键,sys_dept.id, 一个人只能属于一个部门)',
    `post_ids` varchar(200) DEFAULT '1' COMMENT '关联岗位ID(外键,sys_post.id, 如:1,2,3 ,逗号分隔,岗位没有更多的关联查询,所以不采用多对多关系,而是直接存储ID串,方便查询和管理)' ,
    `created_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间(自动填充)',
    `updated_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间(自动更新)',
    `last_login_time` TIMESTAMP NULL DEFAULT NULL COMMENT '最后登录时间(可选)',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_user_name` (`user_name`),
    KEY `idx_dept_id` (`dept_id`), -- 索引:优化部门用户查询
    KEY `idx_status` (`status`) -- 索引:优化状态查询
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '系统用户表';

-- 插入admin 用户数据
INSERT INTO `sys_user` (`user_name`, `password`, `nick_name`, `avatar`, `phone`, `email`,`dept_id`,`sex`) 
VALUES(
    'admin',
    '$2a$10$7L2sHh6G6k6yQ9e7X5z4w3v2u1t0s9r8q7p6o5n4m3l2k1j0i',  -- 密码：123456
    '牛油果', 
    '/avatar/admin.jpg', 
    '15888888888',  
    'admin@example.com',
    103,
    "2"
);

-- 插入普通用户数据
INSERT INTO `sys_user` (`user_name`, `password`, `nick_name`, `avatar`, `phone`, `email`,`dept_id`,`sex`) 
VALUES(
    'niuyouguo',
    '$2a$10$7L2sHh6G6k6yQ9e7X5z4w3v2u1t0s9r8q7p6o5n4m3l2k1j0i', 
    '牛油果', 
    '/avatar/user1.jpg', 
    '13800138001', 
    'niuyouguo@example.com',
    105,
    "2"
);


-- 创建字典类型表
CREATE TABLE IF NOT EXISTS `sys_dict_type` (
    `id` BIGINT NOT NULL AUTO_INCREMENT  COMMENT '字典类型ID',
    `dict_type` VARCHAR(100) NOT NULL COMMENT '字典类型 (唯一标识,如 sys_user_sex)',
    `dict_name` VARCHAR(100) NOT NULL COMMENT '字典名称 (如用户性别)',
    `status` varchar(1) DEFAULT '0'  COMMENT '状态（ 0 正常 1 停用）',
    `del_flag` varchar(1)  DEFAULT '0' COMMENT '删除标志（0代表存在 1代表删除）',
    `sort` INT DEFAULT 0 COMMENT '显示顺序',
    `remark` VARCHAR(500) COMMENT '备注',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `create_by` VARCHAR(64) DEFAULT '' COMMENT '创建者',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `update_by` VARCHAR(64) DEFAULT '' COMMENT '更新者',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_dict_type` (`dict_type`) COMMENT '字典类型唯一索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统数据字典类型表';

-- 插入字典类型数据
INSERT INTO `sys_dict_type` (`dict_type`, `dict_name`,`remark`,`sort`) VALUES
('sys_user_sex', '用户性别',`用户性别列表`,1),
('sys_show_hide', '显示/隐藏', '显示/隐藏列表',2),
('sys_normal_disable', '系统开关', '系统开关列表',3),
('sys_job_status', '任务状态', '任务状态列表',4),
('sys_job_group', '任务分组', '任务分组列表',5),
('sys_yes_no', '系统是否', '系统是否列表',6),
('sys_menu_type', '菜单类型', '菜单类型列表',7),
('sys_notice_type', '通知类型', '通知类型列表',8),
('sys_notice_status', '通知状态', '通知状态列表',9),
('sys_oper_type', '操作类型', '操作类型列表',10),
('sys_common_status', '系统状态', '系统状态列表',11);

-- 创建数据字典项表, 属于某一个字典类型的详情
CREATE TABLE `sys_dict_data` (
    `item_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '字典编码',
    `dict_type` VARCHAR(100) NOT NULL COMMENT '字典类型(关联sys_dict_type.dict_type字段)',
    `dict_label` VARCHAR(100) NOT NULL COMMENT '字典标签(显示用)',
    `dict_value` VARCHAR(100) NOT NULL COMMENT '字典值(存储用)',
    `sort` INT NOT NULL DEFAULT 0 COMMENT '排序',
    `remark` VARCHAR(500) COMMENT '备注',
    `status` varchar(1) DEFAULT '0'  COMMENT '状态（ 0 正常 1 停用）',
    `del_flag` varchar(1)  DEFAULT '0' COMMENT '删除标志（0代表存在 1代表删除）',
    `create_by` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '创建者',
    `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_by` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '更新者',
    `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`item_id`),
    UNIQUE KEY `uk_dict_type_value` (`dict_type`, `dict_value`) COMMENT '字典类型和字典值建立唯一索引',
    KEY `idx_dict_type` (`dict_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统数据字典项表';

-- 插入数据字典项数据
INSERT INTO `sys_dict_data` (`dict_type`, `dict_value`, `dict_label`, `remark`, `sort`) VALUES
-- 用户性别
('sys_user_sex', '0', '男', '用户性别男', 1),
('sys_user_sex', '1', '女', '用户性别女', 2),
('sys_user_sex', '2', '未知', '用户性别未知', 3),
-- 菜单类型
('sys_menu_type', 'M', '目录', '菜单目录类型', 1),
('sys_menu_type', 'C', '菜单', '菜单类型', 2),
('sys_menu_type', 'F', '按钮', '按钮类型', 3),
-- 菜单状态
('menu_status', '0', '正常', '菜单正常状态', 1),
('menu_status', '1', '停用', '菜单停用状态', 2),
-- 用户状态
('user_status', '0', '正常', '用户正常状态', 1),
('user_status', '1', '停用', '用户停用状态', 2),
-- 部门状态
('dept_status', '0', '正常', '部门正常状态', 1),
('dept_status', '1', '停用', '部门停用状态', 2),
-- 角色状态
('role_status', '0', '正常', '角色正常状态', 1),
('role_status', '1', '停用', '角色停用状态', 2);

-- 全局配置表
CREATE TABLE sys_config (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '参数主键',
    `config_name` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '参数名称(用来展示)',
    `config_key` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '参数键名(唯一,比如 site_title)',
    `config_value` VARCHAR(500) NOT NULL DEFAULT '' COMMENT '参数键值',
    `config_value_en` VARCHAR(500) NOT NULL DEFAULT '' COMMENT '参数键值(英文)',
    `config_type` CHAR(1) NOT NULL DEFAULT 'N' COMMENT '参数类型 Y 是系统内置 N 是用户自定义',
    `sort` INT NOT NULL DEFAULT 0 COMMENT '显示顺序',
    `create_by` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '创建者',
    `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_by` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '更新者',
    `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `remark` VARCHAR(500) NOT NULL DEFAULT '' COMMENT '备注',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_config_key` (`config_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '参数配置表';

INSERT INTO `sys_config` (
    `create_by`, 
    `remark`, 
    `sort`, 
    `config_name`, 
    `config_key`, 
    `config_value`, 
    `config_type`
) VALUES 
(
    'admin',
    '蓝色 skin-blue、绿色 skin-green、紫色 skin-purple、红色 skin-red、黄色 skin-yellow', 
    1, 
    '主框架页-默认皮肤样式名称', 
    'sys.index.skinName', 
    'skin-blue', 
    'Y'
),
(
    'admin', 
    '初始化密码 123456', 
    2, 
    '用户管理-账号初始密码', 
    'sys.user.initPassword', 
    '123456', 
    'Y'
),
(
    'admin', 
    '深色主题theme-dark，浅色主题theme-light', 
    3, 
    '主框架页-侧边栏主题', 
    'sys.index.sideTheme', 
    'theme-dark', 
    'Y'
),
(
    'admin', 
    '是否开启验证码功能（true开启，false关闭）', 
    4, 
    '账号自助-验证码开关', 
    'sys.account.captchaEnabled', 
    'true', 
    'Y'
),
(
    'admin', 
    '是否开启注册用户功能（true开启，false关闭）', 
    5, 
    '账号自助-是否开启用户注册功能', 
    'sys.account.registerUser', 
    'false', 
    'Y'
),
(
    'admin',  
    '设置登录IP黑名单限制，多个匹配项以;分隔，支持匹配（*通配、网段）', 
    6, 
    '用户登录-黑名单列表', 
    'sys.login.blackIPList', 
    '', 
    'Y'
),
(
    'admin', 
    '0：初始密码修改策略关闭，没有任何提示，1：提醒用户，如果未修改初始密码，则在登录时就会提醒修改密码对话框', 
    7, 
    '用户管理-初始密码修改策略', 
    'sys.account.initPasswordModify', 
    '1', 
    'Y'
),
(
    'admin', 
    '密码更新周期（填写数字，数据初始化值为0不限制，若修改必须为大于0小于365的正整数），如果超过这个周期登录系统时，则在登录时就会提醒修改密码对话框', 
    8, 
    '用户管理-账号密码更新周期', 
    'sys.account.passwordValidateDays', 
    '0', 
    'Y'
);

-- 用户-角色关联表 多对多关联, 用户和角色是[多对多]关系(一个用户可拥有多个角色,一个角色可关联多个用户)
CREATE TABLE `sys_user_role` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
    `user_id` BIGINT NOT NULL COMMENT '用户ID(关联 sys_user 表的 user_id 字段)',
    `role_id` BIGINT NOT NULL COMMENT '角色ID(关联 sys_role 表的 role_id 字段)',
    `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_user_role` (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '用户和角色关联表';
-- 插入数据
INSERT INTO `sys_user_role` (`user_id`,`role_id`) 
VALUES 
(1, 1), -- admin 用户拥有 admin 角色
(2, 2); -- 普通用户拥有普通角色

-- 角色菜单关联表 sys_role_menu
CREATE TABLE `sys_role_menu` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `role_id` BIGINT NOT NULL COMMENT '角色ID(关联 sys_role.id 字段)',
    `menu_id` BIGINT NOT NULL COMMENT '菜单ID(关联 sys_menu.id 字段)',
    `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_role_menu` (`role_id`,`menu_id`),
    KEY `idx_role_id` (`role_id`),
    KEY `idx_menu_id` (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '角色和菜单关联表';

-- 插入关联数据（超级管理员拥有所有菜单权限，普通用户只有查询权限）
INSERT INTO `sys_role_menu` (`role_id`, `menu_id`)
VALUES 
(1, 1), -- 首页
(1, 2), -- 系统管理
(1, 3), -- 系统监控
(1, 4), -- 系统工具
(1, 5),  -- 用户管理
(1, 6),  -- 角色管理
(1, 7),  -- 菜单管理
(1, 8),  -- 部门管理
(1, 9),  -- 岗位管理
(1, 10), -- 字典管理
(1, 11), -- 参数设置
(1, 12), -- 通知公告
(1, 13), -- 日志管理（目录）
(1, 14), -- 在线用户
(1, 15), -- 定时任务
(1, 16), -- 数据监控
(1, 17), -- 服务监控
(1, 18), -- 缓存监控
(1, 19), -- 缓存列表
(1, 20), -- 表单构建
(1, 21), -- 代码生成
(1, 22), -- 系统接口
(1, 23), -- 操作日志
(1, 24), -- 登录日志
(1, 25), -- 用户查询
(1, 26), -- 用户新增
(1, 27), -- 用户修改
(1, 28), -- 用户删除
(1, 29), -- 用户导出
(1, 30), -- 用户导入
(1, 31), -- 重置密码
(1, 32), -- 角色查询
(1, 33), -- 角色新增
(1, 34), -- 角色修改
(1, 35), -- 角色删除
(1, 36), -- 角色导出
(1, 37), -- 菜单查询
(1, 38), -- 菜单新增
(1, 39), -- 菜单修改
(1, 40), -- 菜单删除
(1, 41), -- 部门查询
(1, 42), -- 部门新增
(1, 43), -- 部门修改
(1, 44), -- 部门删除
(1, 45), -- 岗位查询
(1, 46), -- 岗位新增
(1, 47), -- 岗位修改
(1, 48), -- 岗位删除
(1, 49), -- 岗位导出
(1, 50), -- 字典查询
(1, 51), -- 字典新增
(1, 52), -- 字典修改
(1, 53), -- 字典删除
(1, 54), -- 字典导出
(1, 55), -- 参数查询
(1, 56), -- 参数新增
(1, 57), -- 参数修改
(1, 58), -- 参数删除
(1, 59), -- 参数导出
(1, 60), -- 公告查询
(1, 61), -- 公告新增
(1, 62), -- 公告修改
(1, 63), -- 公告删除
(1, 64), -- 操作查询
(1, 65), -- 操作删除
(1, 66), -- 日志导出
(1, 67), -- 登录查询
(1, 68), -- 登录删除
(1, 69), -- 日志导出
(1, 70), -- 账户解锁
(1, 71), -- 在线查询
(1, 72), -- 批量强退
(1, 73), -- 单条强退
(1, 74), -- 任务查询
(1, 75), -- 任务新增
(1, 76), -- 任务修改
(1, 77), -- 任务删除
(1, 78), -- 状态修改
(1, 79), -- 任务导出
(1, 80), -- 生成查询
(1, 81), -- 生成修改
(1, 82), -- 生成删除
(1, 83), -- 导入代码
(1, 84), -- 预览代码
(1, 85), -- 生成代码
-- 二、普通用户（role_id=2）只关联「查询权限」和基础菜单（无新增/删除/导出等操作权限）
(2, 1),  -- 首页
(2, 2),  -- 系统管理（目录）
(2, 5),  -- 用户管理（菜单）
(2, 25), -- 用户查询（按钮）
(2, 3),  -- 系统监控（目录）
(2, 14), -- 在线用户（菜单）
(2, 71), -- 在线查询（按钮）
(2, 4),  -- 系统工具（目录）
(2, 22), -- 系统接口（菜单）
(2, 13), -- 日志管理（目录）
(2, 23), -- 操作日志（菜单）
(2, 64); -- 操作查询（按钮）