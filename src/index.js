import { useEffect, useState } from 'react';

const stores = {};

export function getStore(id) {
    if (!stores[id]) {
        console.warn(`Store ${id} does not exist`, stores);
    }

    return stores[id];
}

export function createStore(
    id,
    initialState,
    reducer,
    shouldUpdate = () => true,
    onStateChange = () => {},
) {
    if (stores[id]) {
        return stores[id];
    }

    const listeners = new Set();
    let state = initialState;
    const subscribe = (listener) => {
        listeners.add(listener);

        return () => {
            listeners.delete(listener);
        };
    };

    stores[id] = {
        dispatch(action, cb = () => {}) {
            const prevState = state;
            state = reducer(state, action);

            if (shouldUpdate(prevState, state)) {
                listeners.forEach((listener) =>
                    listener(state, prevState, action),
                );
                onStateChange(state, prevState, action);
                cb(state, prevState, action);
            }
        },

        useSelector(selector) {
            const [selectedState, setSelectedState] = useState(() =>
                selector(state),
            );

            useEffect(() => {
                return subscribe(() => setSelectedState(selector(state)));
            }, []);

            return selectedState;
        },

        select(selector) {
            return selector(state);
        },

        getState() {
            return state;
        },
    };

    return stores[id];
}

export function deleteStore(id) {
    delete stores[id];
}

export function deleteAllStores(exceptions = []) {
    Object.keys(stores)
        .filter((id) => !exceptions.includes(id))
        .forEach((id) => deleteStore(id));
}
