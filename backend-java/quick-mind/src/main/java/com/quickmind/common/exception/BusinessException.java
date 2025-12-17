package com.quickmind.common.exception;

import lombok.Getter;

/**
 * 业务异常类,可预期的业务异常  1. 预期内 2. 可控 3. 要提示给用户 4. 有明确错误码 , 这个是主动抛出的异常
 *
 * @author roadaspen
 * @since 2025/12/17  18:26
 */
@Getter
public class BusinessException extends RuntimeException {
    private final Integer code;

    public BusinessException(Integer code, String msg) {
        super(msg);
        this.code = code;
    }

}
