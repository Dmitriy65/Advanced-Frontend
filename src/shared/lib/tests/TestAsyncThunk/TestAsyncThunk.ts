import { StateScheme } from 'app/providers/StoreProvider/config/StateScheme';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosStatic } from 'axios';

type ActionCreatorType<ReturnType, Args, RejectedValue> = (
    args: Args,
) => AsyncThunkAction<ReturnType, Args, { rejectValue: RejectedValue }>;

jest.mock('axios');

export class TestAsyncThunk<ReturnType, Args, RejectedValue> {
    dispatch: jest.MockedFn<any>;

    getState: () => StateScheme;

    actionCreator: ActionCreatorType<ReturnType, Args, RejectedValue>;

    api: jest.MockedFunctionDeep<AxiosStatic>;

    navigate: jest.MockedFn<any>;

    constructor(
        actionCreator: ActionCreatorType<ReturnType, Args, RejectedValue>,
        state?: DeepPartial<StateScheme>,
    ) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn(() => state as StateScheme);
        this.navigate = jest.fn();
        this.api = jest.mocked(axios, true);
    }

    async callThunk(args: Args) {
        const action = this.actionCreator(args);
        const result = await action(this.dispatch, this.getState, {
            api: this.api,
            navigate: this.navigate,
        });

        return result;
    }
}
