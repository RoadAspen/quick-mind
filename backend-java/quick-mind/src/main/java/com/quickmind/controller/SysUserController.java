package com.quickmind.controller;

import com.quickmind.common.result.AjaxResult;
import com.quickmind.entity.SysUser;
import com.quickmind.service.SysUserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

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
     * 用户列表查询接口
     */
    @GetMapping("/list")
    public AjaxResult<List<SysUser>> list(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            SysUser query
    ) {
        // 调用Service层
        List<SysUser> userList = sysUserService.selectUserList(page, pageSize, query);
        return AjaxResult.success(userList);
    }
}
