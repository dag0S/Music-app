import { useContext, useState, useEffect } from 'react';
import { AudioContext } from '../../context/AudioContext';
import style from './PlayBar.module.scss';
import { IconButton, Slider } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import secondsToMMSS from '../../utils/secondsToMMSS';

const TimeControls = () => {
  const { currentTrack, audio } = useContext(AudioContext);

  const { duration } = currentTrack;

  const [currentTime, setCurrentTime] = useState(0);

  const formattedCurrentTime = secondsToMMSS(currentTime);

  const sliderCurrentTime = Math.round((currentTime / duration) * 100);

  const changeCurrentTimeHandler = (_, value) => {
    const time = Math.round((value / 100) * duration);

    setCurrentTime(time);
    audio.currentTime = time;
  };

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(audio.currentTime);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  console.log('TimeControls');

  return (
    <>
      <p>{formattedCurrentTime}</p>
      <Slider
        step={1}
        min={0}
        max={100}
        value={sliderCurrentTime}
        onChange={changeCurrentTimeHandler}
      />
    </>
  );
};

const PlayBar = () => {
  const { currentTrack, toggleAudioHandler, isPlaying } =
    useContext(AudioContext);

  const { title, artists, preview, duration } = currentTrack;

  const formattedDuration = secondsToMMSS(duration);

  console.log('PlayBar');

  return (
    <div className={style.playbar}>
      <img className={style.preview} src={preview} alt="" />
      <IconButton onClick={() => toggleAudioHandler(currentTrack)}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <div className={style.credits}>
        <h4>{title}</h4>
        <p>{artists}</p>
      </div>
      <div className={style.slider}>
        <TimeControls />
        <p>{formattedDuration}</p>
      </div>
    </div>
  );
};

export default PlayBar;
