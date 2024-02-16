import {WebView} from 'react-native-webview';

import {API_BASE} from '@env';

export const LiveWebView = ({cameraName}: {cameraName: string}) => {
  const uri = API_BASE + 'cameras/' + cameraName;

  const injectedJavaScript = `(function() {
    setTimeout(() => {
      // const keepElem = document.querySelector('video');
      // const keepElem2 = document.querySelector('select');

      // const parent = document.body;
      
      // const keepElemContainer = document.createElement('div');

      // keepElemContainer.appendChild(keepElem2);
      // keepElemContainer.appendChild(keepElem);

      // parent.appendChild(keepElemContainer);


      // [...parent.children]
      //     .forEach(child => child !== keepElemContainer ? parent.removeChild(child) : null);


      let appBar = document.querySelector("#appbar");
      appBar.remove();
      document.querySelector("h1").remove()
      document.querySelector("h1").remove()
      document.querySelector("h1").remove()
      window.ReactNativeWebView.postMessage("Hiding content");
    }, 100);
      
      window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
  })();`;

  return (
    <WebView
      javaScriptEnabled
      source={{uri}}
      originWhitelist={['*']}
      startInLoadingState={true}
      injectedJavaScript={injectedJavaScript}
      onMessage={_d => {}}
    />
  );
};
