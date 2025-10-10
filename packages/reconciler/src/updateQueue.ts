import type { Action } from 'shared/ReactTypes'

export interface Update<State> {
  action: Action<State>
}

export interface UpdateQueue<State> {
  shared: {
    pending: Update<State> | null
  }
}

export function createUpdate<State>(action: Action<State>): Update<State> {
  return {
    action,
  }
}

export function createUpdateQueue<State>() {
  return {
    shared: {
      pending: null,
    },
  } as UpdateQueue<State>
}

export function enqueueUpdate<State>(updateQueue: UpdateQueue<State>, update: Update<State>) {
  updateQueue.shared.pending = update
}

export function processUpdateQueue<State>(baseState: State, pendingUpdate: Update<State> | null): { memoizedState: State } {
  const result: ReturnType<typeof processUpdateQueue<State>> = {
    memoizedState: baseState,
  }

  if (pendingUpdate !== null) {
    // baseState 1 update 2 memoizedState 2
    // baseState 1 update (x) => 4x memoizedState 4
    const action = pendingUpdate.action
    if (typeof action === 'function') {
      const updater = action as (prevState: State) => State
      result.memoizedState = updater(baseState)
    }
    else {
      result.memoizedState = action
    }
  }

  return result
}
