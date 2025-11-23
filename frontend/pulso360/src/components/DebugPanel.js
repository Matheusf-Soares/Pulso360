import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function DebugPanel() {
  const { user, isAuthenticated } = useAuth();
  const [localStorageData, setLocalStorageData] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Atualizar dados do localStorage a cada segundo
    const interval = setInterval(() => {
      setLocalStorageData({
        access_token: localStorage.getItem('access_token'),
        user: localStorage.getItem('user'),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 15px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 9999,
          fontSize: '12px',
        }}
      >
        🐛 Debug
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '400px',
        maxHeight: '600px',
        overflow: 'auto',
        background: 'white',
        border: '2px solid #007bff',
        borderRadius: '10px',
        padding: '15px',
        zIndex: 9999,
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        fontFamily: 'monospace',
        fontSize: '11px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h3 style={{ margin: 0, fontSize: '14px' }}>🐛 Debug Panel</h3>
        <button
          onClick={() => setIsVisible(false)}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ marginBottom: '15px', padding: '10px', background: '#f8f9fa', borderRadius: '5px' }}>
        <strong>AuthContext State:</strong>
        <div style={{ marginTop: '5px' }}>
          <div>✅ isAuthenticated: {isAuthenticated ? 'true' : 'false'}</div>
          <div>👤 user: {user ? JSON.stringify(user, null, 2) : 'null'}</div>
        </div>
      </div>

      <div style={{ marginBottom: '15px', padding: '10px', background: '#f8f9fa', borderRadius: '5px' }}>
        <strong>LocalStorage:</strong>
        <div style={{ marginTop: '5px' }}>
          <div>🔑 access_token: {localStorageData.access_token || 'null'}</div>
          <div style={{ marginTop: '5px', wordBreak: 'break-all' }}>
            👤 user: {localStorageData.user || 'null'}
          </div>
        </div>
      </div>

      <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '5px' }}>
        <strong>User Object (parsed):</strong>
        <pre style={{ margin: '5px 0 0 0', fontSize: '10px', overflow: 'auto' }}>
          {localStorageData.user ? JSON.stringify(JSON.parse(localStorageData.user), null, 2) : 'null'}
        </pre>
      </div>

      <button
        onClick={() => {
          console.log('🔍 Debug Info:');
          console.log('AuthContext user:', user);
          console.log('AuthContext isAuthenticated:', isAuthenticated);
          console.log('localStorage access_token:', localStorage.getItem('access_token'));
          console.log('localStorage user:', localStorage.getItem('user'));
        }}
        style={{
          marginTop: '10px',
          width: '100%',
          padding: '8px',
          background: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        📋 Log to Console
      </button>
    </div>
  );
}
