import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App: React.FC = () => {
  // Simuler un utilisateur
  const user = {
    type: "Comptable",
  };

  return (
    <div className="app">
      <Header
        title="ClubCompta"
        subtitle="Budget 2024/2025"
        userType={user.type}
        logoUrl="/Logo.svg"
        avatarColor="#6EBF8B"
      />
      <Footer />
    </div>
  );
};

export default App;
