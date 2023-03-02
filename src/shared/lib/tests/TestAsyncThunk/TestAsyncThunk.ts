import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';
import { AsyncThunkAction } from '@reduxjs/toolkit';

type ActionCreatorType<ReturnType, Args, RejectedValue> =
    (args: Args) => AsyncThunkAction<ReturnType, Args, {rejectValue: RejectedValue}>;

export class TestAsyncThunk<ReturnType, Args, RejectedValue> {
    dispatch: jest.MockedFn<any>;

    getState: () => StateScheme;

    actionCreator: ActionCreatorType<ReturnType, Args, RejectedValue>;

    constructor(actionCreator: ActionCreatorType<ReturnType, Args, RejectedValue>) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn();
    }

    async callThunk(args: Args) {
        const action = this.actionCreator(args);
        const result = await action(this.dispatch, this.getState, undefined);

        return result;
    }
}
