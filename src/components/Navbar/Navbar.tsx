import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div
        className="flex justify-evenly py-[0.87rem] text-slate-950 bg-neverLime"
        id="navbarTop"
      >
        <div className="w-full md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px] px-3 md:px-0 flex justify-between md:justify-evenly text-xl">
          <Link to="/">Home</Link>
          <Link to="/categories">Brands</Link>
          <Link to="/categories/people">People</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
      <div
        className="flex justify-center py-[0.87rem] bg-neverBlue"
        id="navbarBottom"
      >
        <div className="w-full md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px] px-3 md:px-0 flex justify-between md:justify-evenly">
          <div className="text-xl">
            <Link to="/near-me">Near Me</Link>
          </div>
          <div className="text-xl">
            <i
              className="fa-solid fa-certificate"
              style={{ fontSize: "inherit", color: "#bfff00" }}
            />
            <Link to="/categories/approved-brands"> Approved Brands</Link>
          </div>
          <div className="text-xl">
            <Link to="/scan">Scan </Link>
            <i
              className="fas fa-barcode fa-lg"
              style={{ fontSize: "inherit" }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
