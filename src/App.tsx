
import * as React from "react";
import { StandaloneStructServiceProvider as StandaloneStructServiceProviderType } from 'ketcher-standalone';
import { Editor } from "ketcher-react";
import "ketcher-react/dist/index.css";


const StandaloneStructServiceProvider =
  StandaloneStructServiceProviderType as unknown as new () => any;

const structServiceProvider = new StandaloneStructServiceProvider();

const Sketcher = () => {
  return (
    <Editor
      errorHandler={(message:string) => null}
      staticResourcesUrl={""}
      structServiceProvider={structServiceProvider}
      onInit={(ketcher) => {
        window.ketcher = ketcher;
        window.parent.postMessage(
          {
            eventType: 'init',
          },
          '*',
        );
      }}
    />
  )
}



function handleClick(){
  window.ketcher.getSmiles().then(result => console.log(result));
}

export default () => (
  <>
    <h1>Draw Molecules with Ketcher</h1>
    <div className="sketcher" style={{height:'500px', width:'800px'}}><Sketcher /></div>
    <button onClick={handleClick}>Get Smiles</button>
  </>
);
