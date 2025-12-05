```plaintext
quickmind（单模块）
├── src/main/java/com/quickmind
│   ├── QuickMindApplication.java  // 启动类（唯一入口）
│   ├── common/                    // 通用工具（对应若依的 ruoyi-common）
│   │   ├── utils/                 // 工具类（JwtUtils、PasswordUtils、PageUtils）
│   │   ├── constant/              // 常量（比如 StatusConstant：正常/禁用）
│   │   ├── exception/             // 全局异常处理（GlobalExceptionHandler）
│   │   └── enums/                 // 枚举（比如 BusinessTypeEnum：新增/修改/删除）
│   ├── framework/                 // 框架配置（对应若依的 ruoyi-framework）
│   │   ├── config/                // 配置类（SecurityConfig、MybatisPlusConfig）
│   │   ├── filter/                // 过滤器（JwtAuthenticationFilter）
│   │   └── handler/               // 处理器（比如 MybatisPlus 字段自动填充）
│   ├── system/                    // 系统核心业务（对应若依的 ruoyi-system）
│   │   ├── entity/                // 实体类（SysUser、SysRole、SysMenu）
│   │   ├── mapper/                // Mapper 接口（SysUserMapper、SysRoleMapper）
│   │   ├── service/               // Service 接口+实现（SysUserService + Impl）
│   │   └── controller/            // Controller 接口（SysUserController）
│   └── generator/                 // 代码生成器（CodeGenerator.java）
├── src/main/resources
│   ├── application.yml            // 全局配置（数据库、MyBatis-Plus、JWT）
│   ├── mapper/                    // Mapper XML 文件（SysUserMapper.xml）
│   └── static/                    // 静态资源（可选，比如上传文件）
└── pom.xml                        // 依赖（MyBatis-Plus、Spring Security、JWT）
```
