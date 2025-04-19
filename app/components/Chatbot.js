// app/components/Chatbot.js
'use client';

import { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Check if script already exists
    if (document.getElementById('chatbase-script')) return;

    const script = document.createElement('script');
    script.id = 'chatbase-script';
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.defer = true;
    script.setAttribute('chatbotId', process.env.NEXT_PUBLIC_CHATBASE_AGENT_ID);
    script.setAttribute('domain', 'www.chatbase.co');
    
    document.body.appendChild(script);
    
    return () => {
      const existingScript = document.getElementById('chatbase-script');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return null;
};

export default Chatbot;