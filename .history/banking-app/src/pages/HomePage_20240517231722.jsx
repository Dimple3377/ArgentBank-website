import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import chatIcon from "../img/icon-chat.png";
import moneyIcon from "../img/icon-money.png";
import securityIcon from "../img/icon-security.png";

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <Feature icon={chatIcon} title="You are our #1 priority">
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </Feature>
          <Feature icon={moneyIcon} title="More savings means higher rates">
            The more you save with us, the higher your interest rate will be!
          </Feature>
          <Feature icon={securityIcon} title="Security you can trust">
            We use top of the line encryption to make sure your data and money
            is always safe.
          </Feature>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
