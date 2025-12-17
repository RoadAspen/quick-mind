package com.quickmind.common.result;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 通用返回对象
 *
 * @author roadaspen
 * &#064;Data  是“我懒得写样板代码”
 * &#064;AllArgsConstructor  全参构造方法, 要快速 new
 * &#064;NoArgsConstructor  无参构造方法 “我要让框架能用我”
 * @since 2025-12-17 17:38
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AjaxResult<T> {
    /**
     * 状态码
     */
    private Integer code;
    /**
     * 返回消息语句
     */
    private String msg;
    /**
     * 数据对象
     */
    private T data;

    /**
     * @apiNote 成功返回结果
     */
    public static <T> AjaxResult<T> success(T data) {
        return new AjaxResult<>(200, "处理成功", data);
    }

    /**
     * @apiNote 成功返回结果, 并自定义信息
     */
    public static <T> AjaxResult<T> success(T data, String msg) {
        return new AjaxResult<>(200, msg, data);
    }

    /**
     * @apiNote 失败返回结果, 并自定义错误码和信息
     */
    public static <T> AjaxResult<T> fail(Integer code, String msg) {
        return new AjaxResult<>(code, msg, null);
    }

    /**
     * @apiNote 失败返回结果, 并自定义信息
     */
    public static <T> AjaxResult<T> fail(String msg) {
        return new AjaxResult<>(500, msg, null);
    }
}
