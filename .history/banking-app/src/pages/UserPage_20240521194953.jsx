import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EditNameForm from "../components/EditNameForm";
import { fetchUserProfile } from "../store/userSlice"; // Assure-toi que cette action est définie

const UserPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    } else {
      dispatch(fetchUserProfile());
    }
  }, [user, navigate, dispatch]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user.firstName} {user.lastName}!
          </h1>
          <button className="edit-button" onClick={toggleEdit}>
            {isEditing ? "Cancel" : "Edit Name"}
          </button>
        </div>
        {isEditing ? (
          <EditNameForm toggleEdit={toggleEdit} />
        ) : (
          <div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                <p className="account-amount">$2,082.79</p>
                <p className="account-amount-description">Available Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">
                  View transactions
                </button>
              </div>
            </section>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                <p className="account-amount">$10,928.42</p>
                <p className="account-amount-description">Available Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">
                  View transactions
                </button>
              </div>
            </section>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">
                  Argent Bank Credit Card (x8349)
                </h3>
                <p className="account-amount">$184.30</p>
                <p className="account-amount-description">Current Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">
                  View transactions
                </button>
              </div>
            </section>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default UserPage;
