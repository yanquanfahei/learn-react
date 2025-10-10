import type { FiberNode } from './fiber'
import { beginWork } from './beginWork'
import { completeWork } from './completeWork'

let workInProgress: FiberNode | null = null

function prepareFreshStack(fiber: FiberNode) {
  workInProgress = fiber
}

function renderRoot(root: FiberNode) {
  prepareFreshStack(root)
  do {
    try {
      workLoop()
      break
    }
    catch (error) {
      console.error('WorkLoop error', error)
      workInProgress = null
    }
  } while (true)
}

function workLoop() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress)
  }
}

function performUnitOfWork(fiber: FiberNode) {
  const next = beginWork(fiber)
  fiber.memoizedProps = fiber.pendingProps
  if (next === null) {
    completeUnitOfWork(fiber)
  }
  else {
    workInProgress = next
  }
}

function completeUnitOfWork(fiber: FiberNode) {
  let node: FiberNode | null = fiber
  do {
    completeWork(node)
    const sibling = node.sibling
    if (sibling !== null) {
      // 处理兄弟节点
      workInProgress = sibling
    }
    else {
      // 处理父节点
      node = node.return
      workInProgress = node
    }
  } while (node !== null)
}
