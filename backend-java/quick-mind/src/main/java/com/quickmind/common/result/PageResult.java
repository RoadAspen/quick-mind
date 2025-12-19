package com.quickmind.common.result;

import lombok.Data;

import java.util.List;

/**
 * 分页结果, 添加 total
 *
 * @author roadaspen
 * @since 2025/12/19 08:21
 */
@Data
public class PageResult<T> {
    private List<T> list;
    private long total;
    private int page = 1;
    private int pageSize = 20;
}
