import React from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; //RouterProvider //RouterProvider это тоже самое но современный способ
import { store} from '@/redux/store';
import {App} from '@/App';
import { ThemeProviderWrapper } from './theme/ThemeProviderWrapper';
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true })


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <Provider store={store}>
      <BrowserRouter>
        <ThemeProviderWrapper>
          <App/>
        </ThemeProviderWrapper>
      </BrowserRouter> 
    </Provider> 
  </React.StrictMode>
);