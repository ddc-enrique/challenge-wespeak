export interface Counter {
  id: number;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CounterActionType = 'increment' | 'decrement';

export enum CounterActionsValues {
  INCREMENT = 'increment',
  DECREMENT = 'decrement',
}
