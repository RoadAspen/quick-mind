package com.quickmind.controller;

import com.quickmind.entity.SysUser;
import com.quickmind.mapper.SysUserMapper;
import com.quickmind.service.SysUserService;
import com.quickmind.utils.JwtUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

/**
 * 用户的controller, 提供 http接口
 * @author roadaspen
 * @since 2025/12/10 16:30
 */
@RestController // 组合注解：@Controller + @ResponseBody（返回 JSON 数据）
@RequestMapping("/system/user") // 接口统一前缀（避免接口名冲突）
public class SysUserController {
	@Resource
	private SysUserMapper sysUserMapper;

	@Resource
	private SysUserService sysUserService;

    // 注入 JWT 工具类，用于生成 token
    @Resource
    private JwtUtils jwtUtils;

    /**
     * 登录接口: POST请求,接受 JSON数据
     * 请求地址: <a href="http://localhost:8080/system/user/login">...</a>
     * 请求方式: POST
     * 请求参数: {"userName":"admin","password":"123456"}
     * 返回值: JSON格式的Map对象
     * 注意：@RequestBody 表示接收的是JSON格式的数据
     *      如果是表单提交，则不需要加这个注解
     *      且需要使用 @RequestParam 来接收参数
     */
	@PostMapping("/login")
	public Map<String,Object> login(@RequestBody SysUser sysUser){
		try{
			// 1. 调用 Service 校验登录(业务逻辑在Service中)
			SysUser loginUser = sysUserService.login(sysUser.getUserName(),sysUser.getPassword());
			// 2. 生成 JWT token (用户后续接口验证)
			String token = jwtUtils.generateToken(loginUser.getUserName());
			// 3. 组装返回结果（Token + 用户信息）
			Map<String, Object> result = new HashMap<>();
			result.put("code", 200);
			result.put("msg", "登录成功");
			result.put("token", token);
			result.put("user", loginUser);
			return result;
		} catch (RuntimeException e){
			// 4. 异常处理(返回错误信息)
			Map<String, Object> error = new HashMap<>();
			error.put("code", 500);
			error.put("msg",e.getMessage());
			return error;
		}
	}

}
