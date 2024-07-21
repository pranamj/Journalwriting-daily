import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [entry, setEntry] = useState('');
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const generatePrompt = async () => {
    try {
      const response = await axios.get('/api/journal');
      setPrompt(response.data.prompt);
    } catch (error) {
      console.error('Error generating prompt:', error);
    }
  };

  const autoResize = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const handleInputChange = (e) => {
    if (startTime === 0) {
      setStartTime(Date.now());
    }
    const currentTime = Date.now();
    const wordsCount = e.target.value.split(' ').length;
    const timeDiff = (currentTime - startTime) / 60000; // time in minutes
    const wpm = Math.round(wordsCount / timeDiff);
    setWordsPerMinute(wpm);
    setEntry(e.target.value);
    autoResize(e.target);
  };

  const saveEntry = async () => {
    try {
      await axios.post('/api/journal', {
        prompt,
        entry,
        wordsPerMinute,
      });
      alert('Journal entry saved successfully!');
      setPrompt('');
      setEntry('');
      setWordsPerMinute(0);
      setStartTime(0);
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Failed to save journal entry.');
    }
  };

  return (
    <div>
      <h1>Journal Prompt Generator</h1>
      <button onClick={generatePrompt}>Create Prompt</button>
      {prompt && (
        <div>
          <h2>Generated Prompt:</h2>
          <p>{prompt}</p>
          <textarea
            value={entry}
            onChange={handleInputChange}
            placeholder="Write your journal entry here..."
            style={{ overflow: 'hidden', resize: 'none' }}
          />
          <p>Words per minute: {wordsPerMinute}</p>
          <button onClick={saveEntry}>Save Entry</button>
        </div>
      )}
    </div>
  );
}
