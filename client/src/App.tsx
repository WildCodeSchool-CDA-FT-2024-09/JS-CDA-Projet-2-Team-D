import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header
        title="ClubCompta"
        subtitle="Représentant"
        logoUrl="/Logo.svg"
        avatarColor="#6EBF8B"
      />
      <Footer />
    </div>
  );
};

export default App;
