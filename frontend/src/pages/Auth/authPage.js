import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import anime from 'animejs/lib/anime.es.js';
import './auth.css';
import SignUp from "../../components/SignUp/signUp";
import SignIn from "../../components/SignIn/signIn";

function Authpage() {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(prevState => !prevState);
  };

  useEffect(() => {
    const resizeTriangles = () => {
      const screenWidth = window.innerWidth;
      const tri1 = document.getElementById('tri1');
      const tri2 = document.getElementById('tri2');


      if (screenWidth <= 500) {
        const tri1Points = `${0},${0} ${screenWidth * 0.35},${0} ${0},${screenWidth * 0.65}`;
        const tri2Points = `${screenWidth},${0} ${screenWidth * 0.6},${0} ${screenWidth},${screenWidth * 0.65}`;
        tri1.setAttribute('points', tri1Points);
        tri2.setAttribute('points', tri2Points);
      } else if (screenWidth <= 760) {
        const tri1Points = `${0},${0} ${screenWidth * 0.7},${0} ${0},${screenWidth * 0.7}`;
        const tri2Points = `${screenWidth * 0.95},${0} ${screenWidth * 0.6},${0} ${screenWidth * 0.95},${screenWidth * 0.7}`;
        tri1.setAttribute('points', tri1Points);
        tri2.setAttribute('points', tri2Points);
      } else if (screenWidth >= 800 && screenWidth <= 1023) {
        const tri1Points = `${0},${0} ${screenWidth * 0.03},${0} ${0},${screenWidth * 0.1}`;
        const tri2Points = `${screenWidth * 0.07},${0} ${screenWidth * 0.05},${0} ${screenWidth * 0.07},${screenWidth * 0.1}`;
        tri1.setAttribute('points', tri1Points);
        tri2.setAttribute('points', tri2Points);
      } else {
        const tri1Points = `${0},${0} ${screenWidth * 0.35},${0} ${0},${screenWidth * 0.65}`;
        const tri2Points = `${screenWidth},${0} ${screenWidth * 0.6},${0} ${screenWidth},${screenWidth * 0.65}`;
        tri1.setAttribute('points', tri1Points);
        tri2.setAttribute('points', tri2Points);
      }

    };

    anime({
      targets: '.triangles',
      translateY: isSignIn ? 0 : '100%',
      rotateX: isSignIn ? '0' : '180deg',
      duration: 800,
      easing: 'easeInSine'
    });

    anime({
      targets: '.form-container',
      translateY: isSignIn ? 0 : '-100%',
      duration: 800,
      easing: 'easeInSine'
    });

    anime({
      targets: '.back-container',
      translateY: isSignIn ? 0 : '136%',
      duration: 800,
      easing: 'easeInSine'
    });

    window.addEventListener('resize', resizeTriangles);
    resizeTriangles();

    return () => {
      window.removeEventListener('resize', resizeTriangles);
    };
  }, [isSignIn]);

  return (
    <div className='auth-container'>
      <div className='back-container'>
        <div className='changeButton'>
          <Button onClick={toggleForm} type="primary" ghost style={{ borderColor: 'white', backgroundColor: '#BBC0BA', color: 'white' }} size='large'>
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </Button>
        </div>
        <svg className='svg'>
          <rect id='rect1' width={'100%'} height={'100%'} fill='#E6DED3' strokeWidth='1' stroke='black' />
          <polygon id='tri1' fill='#FDF0E7' strokeWidth='1' stroke='black' className='triangles' />
          <polygon id='tri2' fill='#BBC0BA' strokeWidth='1' stroke='black' className='triangles' />
        </svg>
      </div>
      <div className='form-container'>{isSignIn ? <SignIn /> : <SignUp />}</div>
    </div>
  );
}

export default Authpage;
