# MWE for using epams's ketcher-react

Create a nano react app with typescript, and check everything works:
```
npx nano-react-app ketcher-react-mwe --ts
cd ketcher-react-mwe
npm install
npm start
```

Install [epam ketcher](https://github.com/epam/ketcher)

```
npm install --save ketcher-react
```

As we've used nano react, need to install types:
```
npm i --save-dev @types/node
```


Attempting to use ketcher with the provided code doesn't work, and some changes need to be made:
 
```
import { RemoteStructServiceProvider } from 'ketcher-core'

const structServiceProvider = new RemoteStructServiceProvider(
  process.env.REACT_APP_API_PATH!,
  {
    'custom header': 'value' // optionally you can add custom headers object 
  }
)

const MyComponent = () => {
  return (
    <Editor
      staticResourcesUrl={process.env.PUBLIC_URL}
      structServiceProvider={structServiceProvider}
    />
  )
}
```

- Cannot find editor. Some searching suggests we need to import Editor from ketcher-react: import { Editor } from "ketcher-react";
- For now staticResourcesUrl can be an empty string: staticResourcesUrl={""}
- An error handler is required for editor: errorHandler={(message:string) => null}

No errors in the editor now, but the code won't run as some further changes need to be made. Running at this point will reveal 'Uncaught ReferenceError: process is not defined' in the console. To fix, add the below to vite.config.ts:

```
define: {
        'process.env': {},
        global: {},
      }
```

The app now loads, but there's a weird bug where it is a: huge, and b: keeps moving down the page...! Turns out using this css file is important to sort that behaviour out:

```
import "ketcher-react/dist/index.css";
```


### Interactivity
Need to add the following to the editor:
```
onInit={(ketcher) => {
        window.ketcher = ketcher;
        window.parent.postMessage(
          {
            eventType: 'init',
          },
          '*',
        );
      }}
```

And for this to work we need to create src/typing.d.ts:

```
import { Ketcher } from 'ketcher-core';

declare global {
  export interface Window {
    ketcher?: Ketcher;
  }
}
```

Also, change to use the standalone service provider:

```
import { StandaloneStructServiceProvider as StandaloneStructServiceProviderType } from 'ketcher-standalone';

const StandaloneStructServiceProvider =
  StandaloneStructServiceProviderType as unknown as new () => any;

const structServiceProvider = new StandaloneStructServiceProvider();
```

Now we can interact:

```
function handleClick(){
  window.ketcher.getSmiles().then(result => console.log(result));
}

<button onClick={handleClick}>Get Smiles</button>
```