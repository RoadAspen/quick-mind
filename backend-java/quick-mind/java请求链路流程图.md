# Java 完整请求链路流程图（分页 + 查询）

## 一、完整请求链路流程图（分页 + 查询）

```
┌────────────┐
│   浏览器    │
│ /user/list │
│ ?pageNum=1 │
│ &pageSize= │
│ &userName= │
└─────┬──────┘
      │ HTTP Request
      ▼
┌───────────────────────────────┐
│          Controller            │
│ UserController                 │
│                                │
│ 1. 接收参数                    │
│    - pageNum @RequestParam     │
│    - pageSize @RequestParam    │
│    - SysUser query             │
│                                │
│ 2. 不写业务逻辑                │
│ 3. 调用 Service 接口           │
└─────┬─────────────────────────┘
      │ Java 方法调用
      ▼
┌───────────────────────────────┐
│            Service             │
│ UserService (接口)             │
│                                │
│ 1. 定义“能做什么”              │
│    getUserList(...)             │
│ 2. 不关心数据库细节            │
└─────┬─────────────────────────┘
      │ 接口多态
      ▼
┌───────────────────────────────┐
│        ServiceImpl              │
│ UserServiceImpl                │
│                                │
│ 1. 真正的业务逻辑              │
│ 2. 计算 offset                 │
│ 3. 可加事务 / 缓存 / 校验       │
│ 4. 调用 Mapper                 │
└─────┬─────────────────────────┘
      │ Java 方法调用
      ▼
┌───────────────────────────────┐
│            Mapper              │
│ UserMapper                     │
│                                │
│ 1. 参数与 SQL 绑定              │
│ 2. 不写业务逻辑                │
└─────┬─────────────────────────┘
      │
      ▼
┌───────────────────────────────┐
│             SQL XML               │
│ SELECT * FROM sys_user         │
│ WHERE ...                      │
│ LIMIT offset, pageSize         │
└───────────────────────────────┘
      │
      ▼
┌───────────────────────────────┐
│          返回结果               │
│ List<SysUser>                  │
└───────────────────────────────┘
      │
      ▼
┌───────────────────────────────┐
│       AjaxResult 封装           │
│ {                              │
│   code: 200                    │
│   msg: "成功"                  │
│   data: [...]                  │
│ }                              │
└───────────────────────────────┘
```

---

## 二、每一层“只干一件事”（核心原则）

### 1️⃣ Controller（接 HTTP）

**职责**

- 接参数
- 调 Service
- 返回统一结果

**绝对不做**

- SQL
- if else 业务判断
- 计算 offset

```java

@GetMapping("/list")
public AjaxResult<List<SysUser>> list(
        @RequestParam(defaultValue = "1") int pageNum,
        @RequestParam(defaultValue = "10") int pageSize,
        SysUser query
) {
    return AjaxResult.success(
            userService.getUserList(pageNum, pageSize, query)
    );
}
```

---

### 2️⃣ Service（接口 = 业务能力定义）

**职责**

- 描述：我能干什么

```java
public interface UserService {
    List<SysUser> getUserList(int pageNum, int pageSize, SysUser query);
}
```

> 👉 Controller **只依赖接口**
> 👉 这就是“面向接口编程”

---

### 3️⃣ ServiceImpl（真正干活的地方）

**职责**

- 业务逻辑
- 参数计算
- 事务、缓存、权限

```java

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<SysUser> getUserList(int pageNum, int pageSize, SysUser query) {
        int offset = (pageNum - 1) * pageSize;
        return userMapper.selectUserList(offset, pageSize, query);
    }
}
```

> 👉 **以后加 @Transactional 就在这里**

---

### 4️⃣ Mapper（SQL 映射）

**职责**

- Java 参数 → SQL
- SQL 结果 → Java 对象

```java
public interface UserMapper {

    List<SysUser> selectUserList(
            @Param("offset") int offset,
            @Param("pageSize") int pageSize,
            @Param("user") SysUser user
    );
}
```

```xml

<select id="selectUserList" resultType="com.quickmind.entity.SysUser">
    SELECT *
    FROM sys_user
    <where>
        <if test="user.userName != null and user.userName != ''">
            AND user_name LIKE CONCAT('%', #{user.userName}, '%')
        </if>
        <if test="user.status != null">
            AND status = #{user.status}
        </if>
    </where>
    LIMIT #{offset}, #{pageSize}
</select>
```

---

## 三、你现在这个阶段的认知是非常正确的

你现在的做法是：

> ✅ **先手写分页 / 查询 / SQL**
> ❌ **暂时不依赖 MyBatis-Plus**

这是**最正确的学习路径**：

1. 先懂：
   - offset 怎么算
   - 参数怎么进 SQL
   - 分层为什么存在

2. 再用：
   - MP 的 `Page<T>`
   - PageHelper

> 否则就是“会用但不懂”

---

## 四、一句话总结（你可以直接记）

> Controller 接请求
> Service 定能力
> ServiceImpl 写业务
> Mapper 写 SQL
> AjaxResult 统一返回
