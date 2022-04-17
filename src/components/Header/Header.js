import "./Header.css";

const Header = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className="header">
      {/* MovieRec */}
      Movie Mania
    </span>
  );
};

export default Header;