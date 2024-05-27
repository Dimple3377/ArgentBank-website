import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../store/userSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EditNameForm from "../components/EditNameForm";

import "./UserPageEditMode.css"; // Importez les styles pour le mode édition

const UserPage = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <Header />
      <main className={`main bg-dark ${isEditing ? "edit-mode" : ""}`}>
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user ? `${user.firstName} ${user.lastName}!` : "Loading..."}
          </h1>
          {isEditing ? (
            <h2>Edit user info</h2>
          ) : (
            <button className="edit-button" onClick={toggleEdit}>
              Edit Name
            </button>
          )}
        </div>
        {status === "loading" && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {isEditing ? (
          <>
            <EditNameForm toggleEdit={toggleEdit} />
          </>
        ) : null}
        <div>
          <h2 className="sr-only">Accounts</h2>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UserPage;
