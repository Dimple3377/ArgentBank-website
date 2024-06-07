import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

const SignInPage = () => {
  return (
    <>
      <Header />
      <main className="main bg-dark sign-in-page">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <LoginForm />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SignInPage;
