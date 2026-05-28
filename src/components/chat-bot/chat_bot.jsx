/* eslint-disable react/self-closing-comp */
import './ChatSwitcher.css'; // Import the CSS file
import React, { useState } from 'react';

function ChatSwitcher() {
    const [scriptID, setScriptID] = useState('script1');
  
    const loadScript = (id) => {
      const container = document.getElementById('chatContainer');
      container.innerHTML = ''; // Clear any existing chat content
  
      const script = document.createElement('script');
      script.id = id;
  
      if (id === 'script1') {
        script.innerHTML = `
          window.watsonAssistantChatOptions = {
            integrationID: "4969a6b4-7a95-4f8c-9b12-b3ad62c00f00",
            region: "au-syd",
            serviceInstanceID: "752763f9-1e43-48cf-92e0-82d6206a7b63",
            onLoad: async (instance) => { await instance.render(); }
          };
          setTimeout(function(){
            const t=document.createElement('script');
            t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
            document.head.appendChild(t);
          });
        `;
      } else if (id === 'script2') {
        script.innerHTML = `
          window.watsonAssistantChatOptions = {
            integrationID: "8944e3a6-f709-4e52-846b-f59e8e44e9ca",
            region: "au-syd",
            serviceInstanceID: "752763f9-1e43-48cf-92e0-82d6206a7b63",
            onLoad: async (instance) => { await instance.render(); }
          };
          setTimeout(function(){
            const t=document.createElement('script');
            t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
            document.head.appendChild(t);
          });
        `;
      }
  
      container.appendChild(script);
    };
  
    const toggleScript = () => {
      if (scriptID === 'script1') {
        setScriptID('script2');
        loadScript('script2');
      } else {
        setScriptID('script1');
        loadScript('script1');
      }
    };

  // Load default script on component mount
  React.useEffect(() => {
    loadScript('script1');
  }, []);
  

  return (
    <div>
      <div className="button r" id="button-1">
        <input type="checkbox" className="checkbox" id="scriptSwitch" onClick={toggleScript} />
        <div className="knobs"></div>
        <div className="layer"></div>
      </div>
      <div id="chatContainer"></div>
    </div>
  );
}

export default ChatSwitcher;
