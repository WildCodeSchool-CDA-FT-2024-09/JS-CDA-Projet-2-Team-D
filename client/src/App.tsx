import Header from "./components/Header/Header";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header
        title="ClubCompta"
        subtitle="Représentant"
        logoUrl="/Logo.svg"
        avatarColor="#6EBF8B"
      />
      {/* Autres composants */}
    </div>
  );
};

export default App;
