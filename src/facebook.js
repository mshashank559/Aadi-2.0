// src/facebook.js
import React, { useState, useEffect } from 'react';
import { FacebookLoginButton } from 'react-social-login-buttons';

const appId = '997741731803641';
const appSecret = '0971aa8145e9e41e8a90515a21fa4fd0';

const Facebook = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const handleLogin = async () => {
      const response = await fetch(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${appId}&redirect_uri=http://localhost:3000/&client_secret=${appSecret}&code=${window.location.href.split('code=')[1]}`);
      const data = await response.json();
      setAccessToken(data.access_token);
    };

    if (window.location.href.includes('code=')) {
      handleLogin();
    }
  }, []);

  const handleLoginClick = () => {
    window.location.href = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${appId}&redirect_uri=http://localhost:3000/&scope=public_profile,email`;
  };

  return (
    <div>
      {accessToken ? (
        <div>
          <h2>Logged in as {userData.name}</h2>
          <img src={userData.picture.data.url} alt={userData.name} />
        </div>
      ) : (
        <FacebookLoginButton onClick={handleLoginClick}>Login with Facebook</FacebookLoginButton>
      )}
    </div>
  );
};

export default Facebook;