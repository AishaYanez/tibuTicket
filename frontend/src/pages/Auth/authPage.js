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

  const animatePositionChange = (target, translateY) => {
    anime({
      targets: target,
      translateY: translateY,
      duration: 1000,
      easing: 'easeInOutQuad'
    });
  };

  useEffect(() => {
    animatePositionChange('.form-container', isSignIn ? 0 : -350);
    animatePositionChange('.back-container', isSignIn ? 0 : 560);
  }, [isSignIn]);

  return (
    <div className='auth-container'>
      <div className='back-container'>
        <div className='changeButton'>
          <Button onClick={toggleForm} type="primary" ghost>
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </Button>
        </div>
        <svg className='svg'>
          <rect id='rect1' width={'100%'} height={'100%'} fill='#E6DED3' strokeWidth='1' stroke='black' />
          <polygon id='tri1' points="0 0, 150 0, 0 100" fill='#FDF0E7' strokeWidth='1' stroke='black' />
          <polygon id='tri2' points="400 0, 250 0, 400 100" fill='#BBC0BA' strokeWidth='1' stroke='black' />
        </svg>
      </div>
      <div className='form-container'>{isSignIn ? <SignIn /> : <SignUp />}</div>
    </div>
  );
}

export default Authpage;
