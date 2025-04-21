
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="py-4 px-6 md:px-8 flex justify-between items-center bg-[#FEF6F1]">
      <Link to="/" className="text-[#002B5B] text-2xl font-bold">
        SSCPREP
      </Link>
      <nav>
        <Link to="/sign-in" className="text-[#002B5B] hover:text-opacity-80">Sign In</Link>
      </nav>
    </header>
  );
};

export default Header;
