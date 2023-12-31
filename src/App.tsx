import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes";
import graphqlClient from './api'
import { ApolloProvider  } from '@apollo/client';
import mpTracker from './lib/mixpanel';
mpTracker.init();

function App() {
  return (
    <>
      <ApolloProvider client={graphqlClient}>
        <Header />
        <Navbar />
        <main className="NeverAgainWrapper w-full flex justify-center align-middle">
          <section id="NeverAppCameraEnabled" className="w-full md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px]">
          <AppRoutes />
          </section>
        </main>
        <Footer />
      </ApolloProvider >
    </>
  );
}

export default App;