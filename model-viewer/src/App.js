import React, {useEffect, useState} from 'react';
import { modelData } from './modelData';
import {PlayIcon} from './playIcon';
function App() {
  const modelRef = React.useRef();
  const [playing, setPlaying] = useState(false);
  const [playState, setPlayState] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedModel, setSelectedModel] = useState(0);
  const scenes = modelData[selectedModel].scenes || 3;

  useEffect(() => {
    if (modelRef.current?.duration) {
      const { duration } = modelRef.current;
      setDuration(duration);
    }
  }, [modelRef.current?.duration, selectedModel]);

  useEffect(() => {
    setPlaying(false);
    setPlayState(0);
  }, [selectedModel]);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        modelRef?.current.pause();
        setPlaying(false);
        if (scenes === playState) {
          setPlayState(0);
        }
      }, duration / scenes * 1000);
      return () => clearTimeout(timer);
    }
  }, [playState, duration, scenes]);

  return (
    <div>
      <model-viewer
        style={{ width: '100%', height: '75vh' }}
        src={modelData[selectedModel].glb}
        ar
        ar-modes="webxr scene-viewer quick-look"
        seamless-poster
        shadow-intensity="1"
        interaction-prompt="none"
        camera-controls
        enable-pan
        ref={(ref) => {
          modelRef.current = ref;
        }}
      >
      </model-viewer>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <PlayIcon
            style={{ cursor: playing ? 'not-allowed': 'pointer' }}
            height="50"
            width="50"
            color={playing ? '#efefef': '#000' }
            onClick={() => {
              setPlaying(true);
              setPlayState(prevState => prevState + 1);
              modelRef.current.play();
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {modelData.map((model, i) => {
            const active = selectedModel === i;
            return (
              <div
                onClick={() => setSelectedModel(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100px',
                  height: '100px',
                  border: `2px solid ${active ? '#000' : '#fff'}`,
                  cursor: active ? 'initial' : 'pointer'
                }}>
                <img alt="model" src={model.png} style={{ maxWidth: '100%', maxHeight: '100%' }}/>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
