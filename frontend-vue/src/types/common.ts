export interface BaseResponse<T = any> {
  code: number;
  data: T;
  message: string;
}
/**
 * 分页请求参数
 */
export interface PageParams {
  page: number;
  pageSize: number;
}

/**
 * 表格请求结果
 */
export type TableData<T> = {
  list: T[];
  total: number;
} & Partial<PageParams>;
