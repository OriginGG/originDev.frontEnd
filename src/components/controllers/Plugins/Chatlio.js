/* eslint-disable */

import * as React from 'react';

class Chatlio extends React.Component {
    constructor(props){
        super(props);

        this.addMainScript = this.addMainScript.bind(this);
        this.insertScript = this.insertScript.bind(this);
    }

  
    insertScript(scriptText) {
        const script = document.createElement("script");
        script.innerText = scriptText;
        script.async = true;
        document.body.appendChild(script);
      }

      addMainScript() {
        const scriptText = `
        window._chatlio = window._chatlio||[];
        !function(){ var t=document.getElementById("chatlio-widget-embed");if(t&&window.ChatlioReact&&_chatlio.init)return void _chatlio.init(t,ChatlioReact);for(var e=function(t){return function(){_chatlio.push([t].concat(arguments)) }},i=["configure","identify","track","show","hide","isShown","isOnline", "page", "open", "showOrHide"],a=0;a<i.length;a++)_chatlio[i[a]]||(_chatlio[i[a]]=e(i[a]));var n=document.createElement("script"),c=document.getElementsByTagName("script")[0];n.id="chatlio-widget-embed",n.src="https://w.chatlio.com/w.chatlio-widget.js",n.async=!0,n.setAttribute("data-embed-version","2.3");
           n.setAttribute('data-widget-id','98fb6bc0-f671-46f8-7891-55e9f9ca5ded');
           c.parentNode.insertBefore(n,c);
        }();
    `;
    
        this.insertScript(scriptText);
      }
    
      componentDidMount() {
        if (typeof window !== "undefined") {
          this.addMainScript();
        }
      }
    
      render() {
        return "";
      }
    }


export default Chatlio;