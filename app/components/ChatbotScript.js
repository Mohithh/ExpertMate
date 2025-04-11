// app/components/ChatbotScript.js
'use client';

import { useEffect } from 'react';

const ChatbotScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.defer = true;
    script.setAttribute('chatbotId', process.env.NEXT_PUBLIC_CHATBASE_AGENT_ID);
    script.setAttribute('domain', 'www.chatbase.co');
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default ChatbotScript;