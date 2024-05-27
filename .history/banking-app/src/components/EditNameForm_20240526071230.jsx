import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/userSlice"; // Importer updateUser
import { useNavigate } from "react-router-dom";
const EditNameForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [userName, setUserName] = useState(user?.userName || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { firstName, lastName, userName };
    console.log("Données du formulaire:", updatedUser); // Log des données du formulaire
    dispatch(updateUser(updatedUser));
  };
  useEffect(() => {
    if (status === "succeeded") {
      navigate("/user"); // Redirigez vers la page User après une mise à jour réussie
    }
  }, [status, navigate]);

  return (
    <form onSubmit={handleSubmit} className="edit-name-form">
      <div className="input-wrapper">
        <label htmlFor="userName">User name:</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <button type="submit" className="edit-button">
        Save
      </button>
      <button
        type="button"
        className="edit-button"
        onClick={() => window.history.back()}
      >
        Cancel
      </button>
    </form>
  );
};

export default EditNameForm;
