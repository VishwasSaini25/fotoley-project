import * as React from 'react';
import { useState,useEffect,useRef } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import data from './data';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { PlayCircle,PauseCircle } from '@mui/icons-material';
export default function App() {
  const timeRef = useRef(null);
  const [activeImg, setActiveImg] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      timeRef.current = setInterval(() => {
        setActiveImg(prevIndex => (prevIndex + 1) % data.length);
      }, 3000);
    } else {
      clearInterval(timeRef.current);
    }
    return() => {
      clearInterval(timeRef.current);
    };
  },[isPlaying, data.length]);

  const handleClick = (index) => {
      setActiveImg(index);
      // if(isPlaying){
      //   setIsPlaying(true);
      // }
    }
  const handlePlayPause = (index) => {
    setIsPlaying(prevState => !prevState);
  }
  const handleNext = (index) => {     
    if(index === 4){
      setActiveImg(0);
    } else setActiveImg(index+1);
  }
  const handlePrev = (index) => {     
    if(index === 0){
      setActiveImg(4);
    } else setActiveImg(index-1);
  }
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Grid container>
        <Grid item xs={6} md={6} lg={7} className='left'>
          <div className='second-div-left'>
            <div className='img-div'>
              <img src={data[activeImg].image} alt='logo' />
            </div>
            <div className="carousel">
              <Grid container justifyContent='space-evenly'>
                <Grid item style={{ alignSelf: 'center' }} onClick={() => handlePrev(activeImg)}>
                  <ArrowLeftIcon fontSize="large" />
                </Grid>
                <Grid item>
                  <div className={['carousel-img', `${activeImg === 0 ? '': 'active'}`].join(' ')} onClick={() => handleClick(0)}>
                    <img src={data[0].image} alt='logo' />
                  </div>
                </Grid>
                <Grid item>
                  <div className={['carousel-img', `${activeImg === 1 ? '': 'active'}`].join(' ')} onClick={() => handleClick(1)}>
                    <img src={data[1].image} alt='logo' />
                  </div>
                </Grid>
                <Grid item>
                  <div className={['carousel-img', `${activeImg === 2 ? '': 'active'}`].join(' ')} onClick={() => handleClick(2)}>
                    <img src={data[2].image} alt='logo' />
                  </div>
                </Grid>
                <Grid item>
                  <div className={['carousel-img', `${activeImg === 3 ? '': 'active'}`].join(' ')} onClick={() => handleClick(3)}>
                    <img src={data[3].image} alt='logo' />
                  </div>
                </Grid>
                <Grid item>
                  <div className={['carousel-img', `${activeImg === 4 ? '': 'active'}`].join(' ')} onClick={() => handleClick(4)}>
                    <img src={data[4].image} alt='logo' />
                  </div>
                </Grid>
                <Grid item style={{ alignSelf: 'center' }} onClick={() => handleNext(activeImg)}>
                  <ArrowRightIcon fontSize="large" />
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} md={6} lg={5} className='right'>
          <div className='second-div-right'>
            <h1>{data[activeImg].title}</h1>
            <p>{data[activeImg].text}</p>
            <div className='play-pause'>
            {isPlaying ? <PauseCircle onClick={() => handlePlayPause(activeImg)} sx={{ fontSize : 80 }} /> : <PlayCircle onClick={() => handlePlayPause(activeImg)} sx={{ fontSize : 80 }} />}
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}