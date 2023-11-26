import { Routes, Route } from "react-router-dom";

// pages
import About from "./pages/About";
import ApprovedBrand from "./pages/ApprovedBrand";
import ApprovedBrands from "./pages/ApprovedBrands";
import Brand from "./pages/Brand";
import Brands from "./pages/Brands";
import BrandCategory from "./pages/BrandCategory";
import Corporation from "./pages/Corporation";
import Celebrity from "./pages/Celebrity";
import Celebrities from "./pages/Celebrities";
import Home from "./pages/Home";
import NearMe from "./pages/NearMe";
import People from "./pages/People";
import Politician from "./pages/Politician";
import Politicians from "./pages/Politicians";
import Scan from "./pages/Scan";
import Faq from "./pages/Faq";
import Boycott from "./pages/Boycott";

const AppRoutes = () => (
  <Routes>
    <Route path="/about" element={<About />} />
    <Route path="/approved-brands" element={<ApprovedBrands />} />
    <Route path="/approved-brands/:name" element={<ApprovedBrand />} />
    <Route path="/categories" element={<Brands />} />
    <Route path="/categories/celebrities" element={<Celebrities />} />
    <Route path="/" element={<Home />} />
    <Route path="/near-me" element={<NearMe />} />
    <Route path="/categories/people" element={<People />} />
    <Route path="/categories/politicians" element={<Politicians />} />
    <Route path="/scan" element={<Scan />} />
    <Route path="/faq" element={<Faq />} />
    <Route path="/how-to-boycott" element={<Boycott />} />
    <Route path="/categories/:name" element={<BrandCategory />} />
    <Route path="/categories/brands/:name" element={<Brand />} />
    <Route path="/categories/corporations/:name" element={<Corporation />} />
    <Route path="/categories/celebrities/:name" element={<Celebrity />} />
    <Route path="/categories/politicians/:name" element={<Politician />} />
  </Routes>
);

export default AppRoutes;
