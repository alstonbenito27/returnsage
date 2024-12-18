import React, { useState } from 'react';



const Footer = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert(`Subscribed with email: ${email}`);
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.left}>
      <h3 style={{ fontFamily: '"Roboto Slab", serif', fontWeight: '700' }}>ReturnSage</h3>
        <h2>Sign up for newsletter</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Subscribe</button>
        </form>
      </div>
      <div style={sectionContainerStyle}>
                <div style={sectionTitleStyle}>Company</div>
                <div style={linkStyle}>Home</div>
                <div style={linkStyle}>Features</div>
            </div>
            <div style={sectionContainerStyle}>
                <div style={sectionTitleStyle}>Legal</div>
                <div style={linkStyle}>Privacy Policy</div>
                <div style={linkStyle}>Terms of Use</div>
            </div>
    </footer>
  );
};

const sectionContainerStyle = {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    // alignItems : "right",
    padding:"0px 25px",
};

const sectionTitleStyle = {
    fontSize: "20px",
    fontFamily: "Inria Sans",
    fontWeight: "700",
    color: "white",
    marginBottom: "15px",
};

const linkStyle = {
    fontSize: "18px",
    fontFamily: "Inria Sans",
    fontWeight: "400",
    color: "#CBC8C8",
    opacity: 0.5,
    marginBottom: "10px",
    cursor: "pointer",
    textDecoration: "none",
};

const styles = {
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  left: {
    flex: 1,
    paddingLeft:"60px"
  },
  right: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 2,
  },
  form: {
    marginTop: '10px',
  },
  label: {
    fontSize: '14px',
  },
  input: {
    padding: '10px',
    marginRight: '10px',
    border: 'none',
    borderRadius: '4px',
  },
 
  button: {
    padding: '10px 15px',
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  links: {
    margin: '0 20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '8px',
  },
};

export default Footer;
