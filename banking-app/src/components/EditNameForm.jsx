import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, fetchUserProfile } from "../store/userSlice";

import "../components/EditNameForm.css";

const EditNameForm = ({ onSave, onCancel }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [userName, setUserName] = useState(user?.userName || "");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { userName };
    dispatch(updateUser(updatedUser)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setUpdateSuccess(true);
        dispatch(fetchUserProfile()); // Recharger les données de l'utilisateur
      }
    });
  };

  useEffect(() => {
    if (updateSuccess) {
      onSave();
    }
  }, [updateSuccess, onSave]);

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
      <button type="submit" className="edit-button">
        Save
      </button>
      <button type="button" className="edit-button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditNameForm;
