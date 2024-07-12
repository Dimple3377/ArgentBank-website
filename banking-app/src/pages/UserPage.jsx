import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, selectToken } from "../store/userSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EditNameForm from "../components/EditNameForm";
import AccountCard from "../components/AccountCard";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    } else if (!user && status !== "loading") {
      dispatch(fetchUserProfile());
    }
  }, [token, user, status, dispatch, navigate]);

  useEffect(() => {
    if (user) {
      console.log("User data:", user);
    }
  }, [user]);

  const [isEditFormVisible, setEditFormVisible] = useState(false);

  const toggleEditForm = () => {
    setEditFormVisible(!isEditFormVisible);
  };

  const displayName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`
    : "Chargement des données...";

  return (
    <>
      <Header />
      <main className={`main bg-dark ${isEditFormVisible ? "edit-mode" : ""}`}>
        <div className="header">
          <h1>
            Welcome back
            <br />
            {displayName}!
          </h1>
          {!isEditFormVisible && (
            <button className="edit-button" onClick={toggleEditForm}>
              Edit Name
            </button>
          )}
        </div>
        {status === "loading" && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {isEditFormVisible && (
          <div className="edit-section">
            <EditNameForm onSave={toggleEditForm} onCancel={toggleEditForm} />
          </div>
        )}
        <div style={{ height: "61rem" }}>
          <h2 className="sr-only">Accounts</h2>
          <AccountCard
            title="Argent Bank Checking (x8349)"
            amount="$2,082.79"
            description="Available Balance"
            onViewTransactions={() => console.log("View Checking Transactions")}
          />
          <AccountCard
            title="Argent Bank Savings (x6712)"
            amount="$10,928.42"
            description="Available Balance"
            onViewTransactions={() => console.log("View Savings Transactions")}
          />
          <AccountCard
            title="Argent Bank Credit Card (x8349)"
            amount="$184.30"
            description="Current Balance"
            onViewTransactions={() =>
              console.log("View Credit Card Transactions")
            }
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UserPage;
