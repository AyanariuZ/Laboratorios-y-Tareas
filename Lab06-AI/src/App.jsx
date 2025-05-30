import { useState } from 'react'
import PromptInput from './Prompt';
import './App.css'
import SubmitButton from './Button';
import ResponseSection from './Response';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_DEEPSEK_API_KEY;
  const handleSubmit = async () => {
    

    setLoading(true);
    setResponse('');

    try {
      const apiResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7
        })
      });

      if (!apiResponse.ok) {
        throw new Error(`Error ${apiResponse.status}: ${apiResponse.statusText}`);
      }

      const data = await apiResponse.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        setResponse(data.choices[0].message.content);
      } else {
        throw new Error('Respuesta inesperada de la API');
      }
    }  finally {
      setLoading(false);
    }
  };

  return (
    <>
    <PromptInput value={prompt} onChange={setPrompt}></PromptInput>
    <SubmitButton loading={loading} onClick={handleSubmit}></SubmitButton>
    <ResponseSection response={response}></ResponseSection>
    </>
  )
}

export default App
