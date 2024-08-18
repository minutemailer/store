import { useEffect, useState } from 'react';

const stores = {};

function loadPersistentState(id, key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        console.error(`Failed to load persistent state for ${id}`, error);
    }

    return null;
}

function savePersistentState(id, key, state) {
    try {
        localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
        console.error(`Failed to save persistent state for ${id}`, error);
    }
}

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
    persistent = false,
) {
    if (stores[id]) {
        return stores[id];
    }

    const listeners = new Set();
    let state = initialState;

    if (persistent) {
        const persistentState = loadPersistentState(id, `${persistent}.${id}`);

        if (persistentState) {
            state = persistentState;
        }
    }

    const subscribe = (listener) => {
        listeners.add(listener);

        return () => {
            listeners.delete(listener);
        };
    };

    stores[id] = {
        reset(persistent = false) {
            listeners.clear();
            state = initialState;

            if (persistent) {
                localStorage.removeItem(`${persistent}.${id}`);
            }
        },
        dispatch(action, cb = () => {}) {
            const prevState = state;
            state = reducer(state, action);

            if (persistent) {
                savePersistentState(id, `${persistent}.${id}`, state);
            }

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

export function deleteStore(id, persistent = false) {
    if (persistent) {
        localStorage.removeItem(`${persistent}.${id}`);
    }

    delete stores[id];
}

export function resetAllStores(exceptions = [], persistent = false) {
    Object.keys(stores)
        .filter((id) => !exceptions.includes(id))
        .forEach((id) => stores[id].reset(persistent));
    }
}

export function deleteAllStores(exceptions = [], persistent = false) {
    Object.keys(stores)
        .filter((id) => !exceptions.includes(id))
        .forEach((id) => deleteStore(id, persistent));
}
