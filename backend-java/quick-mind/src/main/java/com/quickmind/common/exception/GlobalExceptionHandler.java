package com.quickmind.common.exception;

import com.quickmind.common.result.AjaxResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常守卫
 * 全局异常处理类，用于统一处理系统中的异常情况。
 * RestControllerAdvice 注解让这个类对所有 Controller 生效,并且把所有返回值都转变为 JSON
 *
 * @author roadaspen
 * @since 2025-12-17
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    /**
     * 可预期的业务异常  1. 预期内 2. 可控 3. 要提示给用户 4. 有明确错误码 , 这个是主动抛出的异常
     */
    @ExceptionHandler(BusinessException.class)
    public AjaxResult<Void> handleBusiness(BusinessException e) {
        return AjaxResult.fail(e.getCode(), e.getMessage());
    }

    /**
     * 运行时异常（未预期的异常）
     */
    @ExceptionHandler(RuntimeException.class)
    public AjaxResult<Void> handleRuntime(RuntimeException e) {
        return AjaxResult.fail(e.getMessage());
    }

    /**
     * 其他未预期的异常
     */
    @ExceptionHandler(Exception.class)
    public AjaxResult<Void> handleException(Exception e) {
        return AjaxResult.fail("系统异常");
    }
}
