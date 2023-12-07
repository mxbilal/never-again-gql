import { Link } from "react-router-dom";
import mpTracker from '../../lib/mixpanel';

const Navbar = () => {
  const trackLinkClick = (tag) => {
    mpTracker.track(`Header - Link - ${tag}`);
  };
  return (
    <nav className="sticky top-0 z-50 NeverScannerStatus">
      <div
        className="flex justify-evenly py-[0.87rem] text-slate-950 bg-neverLime"
        id="navbarTop"
      >
        <div className="w-full md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px] px-3 md:px-0 flex justify-between md:justify-evenly text-xl">
          <Link onClick={() => trackLinkClick('Home')} to="/">Home</Link>
          <Link onClick={() => trackLinkClick('Brands')} to="/categories">Boycott</Link>
          <Link onClick={() => trackLinkClick('People')} to="/categories/people">Sellouts</Link>
        </div>
      </div>
      <div
        className="flex justify-center py-[0.87rem] bg-neverBlue"
        id="navbarBottom"
      >
        <div className="w-full md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px] px-3 md:px-0 flex justify-between md:justify-evenly">
          {/*
          <div className="text-xl">
            <Link onClick={() => trackLinkClick('Near Me')} to="/near-me">Near Me</Link>
          </div>
          */}
          <div className="text-xl">
            <i
              className="fa-solid fa-certificate"
              style={{ fontSize: "inherit", color: "#bfff00" }}
            />
            <Link onClick={() => trackLinkClick('Approved Brands')} to="/approved-brands"> Alternative Brands</Link>
          </div>
          <div className="text-xl">
            <Link onClick={() => trackLinkClick('Scan')} to="/scan">Scan Barcodes </Link>
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
