import type { Key, Props, Ref } from 'shared/ReactTypes'
import type { Flags } from './fiberFlags'
import type { WorkTag } from './workTags'
import { NoFlags } from './fiberFlags'

export class FiberNode {
  type: any
  tag: WorkTag
  pendingProps: Props
  key: Key
  stateNode: any
  ref: Ref | null

  return: FiberNode | null
  sibling: FiberNode | null
  child: FiberNode | null
  index: number

  memoizedProps: Props | null
  alternate: FiberNode | null
  flags: Flags

  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    this.tag = tag
    this.key = key
    // hostComponent div div DOM
    this.stateNode = null
    // FunctionComponent () => {}
    this.type = null

    // 构成树状结构
    // 父fiberNode
    this.return = null
    // 兄弟fiberNode
    this.sibling = null
    // 子fiberNode
    this.child = null
    // <ul>li*3</ul> 表示<li>的index
    this.index = 0

    this.ref = null

    // 工作单元
    this.pendingProps = pendingProps // 刚开始的 Props
    this.memoizedProps = null // 完成后的 Props

    this.alternate = null // react 采用双缓冲技术，分为 current 和 workInProgress。 alternate 指向对应的 fiberNode
    this.flags = NoFlags // 副作用，标记当前 fiberNode 的类型
  }
}
