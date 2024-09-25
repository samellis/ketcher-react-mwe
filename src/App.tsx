import * as React from "react";
import { RemoteStructServiceProvider } from 'ketcher-core'
import { Editor } from "ketcher-react";
import "ketcher-react/dist/index.css";

const structServiceProvider = new RemoteStructServiceProvider(
  process.env.REACT_APP_API_PATH!,
  {  }
)

const Sketcher = () => {
  return (
    <Editor
      errorHandler={(message:string) => null}
      staticResourcesUrl={""}
      structServiceProvider={structServiceProvider}
    />
  )
}

export default () => (
  <>
    <h1>Draw Molecules with Ketcher</h1>
    <div className="sketcher" style={{height:'500px', width:'800px'}}><Sketcher /></div>
  </>
);
