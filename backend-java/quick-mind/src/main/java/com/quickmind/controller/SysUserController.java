package com.quickmind.controller;

import com.quickmind.entity.SysUser;
import com.quickmind.service.SysUserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * 用户管理接口控制器类
 *
 * @author roadaspen
 * @since 2025/12/10 16:30
 */
@RestController // 组合注解：@Controller + @ResponseBody（返回 JSON 数据）
@RequestMapping("/system/user") // 接口统一前缀（避免接口名冲突）
public class SysUserController {

    @Resource
    private SysUserService sysUserService;

    /**
     * 登录接口: POST请求,接受 JSON数据
     * 请求地址: <a href="http://localhost:8080/system/user/login">...</a>
     * 请求方式: POST
     * 请求参数: {"userName":"admin","password":"123456"}
     * 返回值: JSON格式的Map对象
     * 注意：@RequestBody 表示接收的是JSON格式的数据
     * 如果是表单提交，则不需要加这个注解
     * 且需要使用 @RequestParam 来接收参数
     */
    @GetMapping("/list")
    public Map<String, Object> login(@RequestBody SysUser sysUser) {
        try {
            Map<String, Object> result = new HashMap<>();
            result.put("code", 200);
            result.put("msg", "登录成功");
            result.put("token", 1);
            result.put("user", 1);
            return result;
        } catch (RuntimeException e) {
            // 4. 异常处理(返回错误信息)
            Map<String, Object> error = new HashMap<>();
            error.put("code", 500);
            error.put("msg", e.getMessage());
            return error;
        }
    }
}
