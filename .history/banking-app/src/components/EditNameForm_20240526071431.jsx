import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const EditNameForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user); // Supprimer status

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [userName, setUserName] = useState(user?.userName || "");
  const [updateSuccess, setUpdateSuccess] = useState(false); // État local pour suivre le succès de la mise à jour

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { firstName, lastName, userName };
    console.log("Données du formulaire:", updatedUser);
    dispatch(updateUser(updatedUser)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setUpdateSuccess(true); // Mettre à jour l'état local en cas de succès
      }
    });
  };

  useEffect(() => {
    if (updateSuccess) {
      navigate("/user"); // Redirigez vers la page User après une mise à jour réussie
    }
  }, [updateSuccess, navigate]); // Dépendance uniquement sur updateSuccess et navigate

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
