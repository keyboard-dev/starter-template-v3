import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';
import { AUTH_CONFIG } from '../../config/auth';

export default function AuthCallback(): JSX.Element {
  const [error, setError] = useState<string>('');
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const handleCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const savedState = localStorage.getItem('oauth_state');

      // Verify state to prevent CSRF attacks
      if (state !== savedState) {
        setError('Invalid state parameter. Please try again.');
        return;
      }

      if (code) {
        try {
          // Make POST request to your local server
          const response = await fetch('http://localhost:3000/interactive_docs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });

          const data = await response.json();

          if (data.access_token) {
            localStorage.setItem('github_token', data.access_token);
            localStorage.setItem('github_userinfo', JSON.stringify(data.userinfo));
            localStorage.removeItem('oauth_state');
            history.push('/');
          } else {
            throw new Error('No access token received');
          }
        } catch (error) {
          console.error('Authentication error:', error);
          setError('Failed to authenticate. Please try again.');
        }
      }
    };

    handleCallback();
  }, [location, history]);

  if (error) {
    return (
      <Layout title="Authentication Error">
        <div className="container margin-vert--xl">
          <div className="text--center">
            <h1>Authentication Error</h1>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Authenticating...">
      <div className="container margin-vert--xl">
        <div className="text--center">
          <h1>Authenticating...</h1>
          <p>Please wait while we complete your authentication.</p>
        </div>
      </div>
    </Layout>
  );
} 