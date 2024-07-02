# Angular Federation
`followed the webpack5 build tool` 


## @angular-architects/native-federation


## Credits

Big thanks to:
- Zack Jackson for initially coming up with the great idea of Module Federation and its successful mental model
- Tobias Koppers for helping to make Module Federation a first-class citizen of webpack
- Florian Rappl for a good discussion about these topics during a speakers dinner in Nuremberg
- The Nx Team, esp. Colum Ferry, who seamlessly integrated webpack Module Federation into Nx and hence helped to spread the word about it (Nx + Module Federation === ❤️)
- Michael Egger-Zikes for contributing to our Module Federation efforts and bringing in valuable feedback
- The Angular CLI-Team, esp. Alan Agius and Charles Lyding, for their fantastic work on the esbuild builder for Angular


## Adding Native Federation

```sh
npm i @angular-architects/native-federation -D

```

## Create the remote angular app
```sh
ng g @angular-architects/native-federation:init --project mfe1 --port 4201 --type remote

```
## Create the Host/shell angular app

```sh
ng g @angular-architects/native-federation:init --project shell --port 4200 --type dynamic-host

```

#  #


# React Vite Federation

## @originjs/vite-plugin-federation

`followed the webpack5 build tool` 


# setup 
``` sh 

npm install @originjs/vite-plugin-federation --save-dev
or

yarn add @originjs/vite-plugin-federation --dev

```

## configure the vite-config

``` ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mfe3',
    //   Entry file will be generated and can consume by the Host/Shell application or any framework
      filename: 'remoteEntry.js',
    //  We can expose any components with unique module names 
      exposes: {
        './App': './src/App.jsx',
      },
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})

```


## Build and Preview Commands

`Here, we are using Vite, so go to the package.json file and run the commands below`

```json
"scripts": {
    "dev": "vite --port 4203 --strictPort",
    "build": "tsc -b && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview --port 4203 --strictPort"
  },
```

`Run the remote application only on the specified port. In this case, we are running on port 4203. If the port is not available, do not run the application; that is why we are using --strictPort.`


``` sh 

 npm run build && npm run preview
  
``` 

Check the if remoteEntry file generated or not

 `visit: http://localhost:4203/assets/remoteEntry.js`



# How to Render React Components into Angular Shell Application


## Setup

`combining web components with module federation for multi framework and multi version micro frontends`

  ### These below tools helps load and create the isolated web component wrapper to render the react or other framework components

``` sh

# install these deps into the angular shell application

npm i @angular-architects/module-federation-tools@latest

npm i @angular-architects/module-federation-runtime@latest


```

## Load react component in the runtime using angular route

First add to the  react vite generated remoteEntry file path: `http://localhost:4203/assets/remoteEntry.js`


``` json
//  /public/federation.manifest.json

{
	"mfe1": "http://localhost:4201/remoteEntry.json",
	"mfe2": "http://localhost:4202/remoteEntry.json",
	"mfe3": "http://localhost:4203/assets/remoteEntry.json"
}


```

`mfe1,mfe2 and mfe3` are the entryFiles names from different frameworks, but in our case we have mfe1 and mfe2 from angular remote app and mfe3 from react application.

### Let's Render the React component.


```ts

import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import {
  WebComponentWrapper, WebComponentWrapperOptions
} from '@angular-architects/module-federation-tools';
import { PageNotFound } from './page-not-found/page-not-found';

export const routes: Routes = [

  {
    path: 'load-angular-mfe1',
    loadComponent: () =>
      loadRemoteModule('mfe1', './Component').then((m) => m.AppComponent),
  },

  {
    path: 'load-angular-mfe2',
    loadComponent: () =>
      loadRemoteModule('mfe2', './Component').then((m) => m.AppComponent),
  },
  {
    path: 'load-react-mfe3',
    component: WebComponentWrapper,
    data: {
      type: 'module',
      remoteEntry: 'http://localhost:4303/assets/remoteEntry.js',
      remoteName: 'mfe3',
      exposedModule: './App',
      // wrapper from react
      elementName: 'react-element',
    } as WebComponentWrapperOptions,
  },
  {
    path: '**',
    component: PageNotFound
  },
];

```


### Use React Class Component and wrap into the web component 
see the given example

```ts

import React from 'react'
import ReactDOM from 'react-dom'
import Countdown from './components/CountDown';

export default class App extends React.Component {
   



   handleClick = ()=> {
      alert("I am from React");  
  }



  render() {
   
    const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg';
    return (
      <>
      <img style= {{marginRight: "10px"}} src={logoUrl} height="30"></img>
        React MFE3
        <Countdown initialSeconds={50000}/>

        <button onClick={this.handleClick}>Call me</button>
       </>
       
    )
  }
}

class ReactMfe extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<App/>, this);
  }
}

customElements.define('react-element', ReactMfe);


```





