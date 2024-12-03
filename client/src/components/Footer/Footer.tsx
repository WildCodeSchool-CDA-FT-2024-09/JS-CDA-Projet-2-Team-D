import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        // backgroundColor: '#D9D9D9', // Couleur de fond
        textAlign: "center",
        padding: "20px 0",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <p style={{ margin: 0 }}>© Copyright - Club Compta - 2024</p>
    </footer>
  );
};

export default Footer;
