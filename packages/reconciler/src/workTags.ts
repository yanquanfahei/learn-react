export type WorkTag = typeof FunctionComponent | typeof HostRoot | typeof HostComponent | typeof HostText

// 函数式组件
export const FunctionComponent = 0
// 根节点
export const HostRoot = 3
// 标签
export const HostComponent = 5
// 文本
export const HostText = 6
