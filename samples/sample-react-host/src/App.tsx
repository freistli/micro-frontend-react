import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { ComponentProvider } from '@micro-frontend-react/core/lib/ComponentProvider';
import { Context } from '@micro-frontend-react/core/lib/Context';
import { Home } from './Home';

const userProvider = {
  getUserName: () => 'Freist Li 123',
  InitVisibility: true,
};

export function App(): React.ReactElement {
  
  return (
    <div>
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route
        path="/micro-frontend"
        render={() => (
          <ComponentProvider
            config={{
              script: 'http://localhost:8000/bundles/micro-frontend-app.js',
              name: 'MicroFrontendApp',
            }}
            data={{
              customData: 'Display',
            }}
          />         
          
        )}
      />       
    </BrowserRouter> 
    </div>
    
  );
} 

render(
  <Context.Provider
    value={{
      userProvider,
    }}
  >
    <App/>
  </Context.Provider>,
  document.getElementById('app')
);
