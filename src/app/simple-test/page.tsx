"use client";

export default function SimpleTestPage() {
  const handleClick = () => {
    alert('Button works!');
    console.log('Button clicked successfully');
  };

  const handleNavigation = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Simple Button Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleClick}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Test Alert
        </button>
        
        <button 
          onClick={handleNavigation}
          style={{
            padding: '10px 20px',
            backgroundColor: '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Go to Dashboard
        </button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <a 
          href="/login"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#f59e0b',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            marginRight: '10px'
          }}
        >
          Login Page
        </a>
        
        <a 
          href="/register"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px'
          }}
        >
          Register Page
        </a>
      </div>
      
      <p>If these buttons work, the issue is with the UI component library or React setup.</p>
      <p>If these buttons don't work, the issue is with JavaScript execution or hydration.</p>
    </div>
  );
}