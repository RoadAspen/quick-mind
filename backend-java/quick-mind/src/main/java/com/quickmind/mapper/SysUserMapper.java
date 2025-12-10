package com.quickmind.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.quickmind.entity.SysUser;
import org.apache.ibatis.annotations.Mapper;

/**
 * 系统用户 Mapper 接口
 *
 * @author roadaspen
 * @since 2025/12/10 16:30
 */
@Mapper // 告诉spring 这是一个 Mapper接口,会自动扫描并创建实现类
public interface SysUserMapper extends BaseMapper<SysUser> {
    // BaseMapper 已经自带了以下方法，不用手动写：
    // 1. selectById(Long id)：根据 ID 查询,单条记录查询
    // 2. insert(SysUser entity)：新增
    // 3. updateById(SysUser entity)：根据 ID 修改
    // 4. deleteById(Long id)：根据 ID 删除
    // 5. selectList(QueryWrapper<SysUser> queryWrapper)：条件查询列表

    // 手动添加一个自定义方法 ,比如 根据用户名查询用户信息,当登录的时候需要用到
    // 注意: 如果是自定义方法,需要在对应的 XML 文件中编写 SQL 语句
    // 例如: selectByUsername.xml 中编写 SQL: select * from sys_user where username = #{username}
    SysUser selectByUserName(String userName);

}
