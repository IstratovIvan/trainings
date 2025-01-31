import React, { useEffect, useState } from 'react';
import Navigator from './navigator/Navigator';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import Auth from './screens/Auth';

const Index = () => {
    const [auth, setAuth] = useState(false);

    return (
        <Provider store={store}>
            {auth ? (
                <Navigator setAuth={setAuth} />
            ) : (
                <Auth setAuth={setAuth} />
            )}
        </Provider>
    );
};

export default Index;
