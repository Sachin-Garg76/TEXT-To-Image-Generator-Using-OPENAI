import './ImageGenerator.css'
import default_img from '../Assets/fluffy.jpg'
import { useRef, useState } from 'react'
const ImageGenerator = () => {

const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = 'YOUR_DEEPAI_API_KEY'; // ← apna key daalna

  const handleGenerate = async () => {
    if (!prompt) return alert('Please enter a prompt');
    setLoading(true);
    try {
      const response = await fetch('https://api.deepai.org/api/text2img', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey
        },
        body: JSON.stringify({ text: prompt })
      });
      const data = await response.json();
      if (data && data.output_url) {
        setImageUrl(data.output_url);
      } else {
        alert('Image generation failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='maindiv'>
      <div className="heading">
        AI Image <span className="text">Generator</span>
      </div>
      
      <div className="searchdiv">
        <input ype="text" value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Enter your prompt" className='inputbox' />
      <button onClick={handleGenerate} style={{ marginLeft: '10px', padding: '8px 12px' }}>
        {loading ? 'Generating…' : 'Generate Image'}
      </button>
      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <h2>Result:</h2>
          <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
      </div>
    </div>
  )
}

export default ImageGenerator





