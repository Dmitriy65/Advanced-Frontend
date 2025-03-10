import { counterReducer, CounterScheme } from 'entities/Counter';
import { counterActions } from 'entities/Counter/model/slice/counterSlice';

describe('counterSlice.test', () => {
    test('increment', () => {
        const state: CounterScheme = {
            value: 10,
        };

        expect(counterReducer(state, counterActions.increment())).toEqual({ value: 11 });
    });
    test('decrement', () => {
        const state: CounterScheme = {
            value: 10,
        };

        expect(counterReducer(state, counterActions.decrement())).toEqual({ value: 9 });
    });
    test('should work with empty state', () => {
        expect(counterReducer(undefined, counterActions.increment())).toEqual({ value: 1 });
    });
});
