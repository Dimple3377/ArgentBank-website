import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/userSlice";
import "../components/EditNameForm.css";

const EditNameForm = ({ onSave, onCancel }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [firstName] = useState(user?.firstName || "");
  const [lastName] = useState(user?.lastName || "");
  const [userName, setUserName] = useState(user?.userName || "");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { firstName, lastName, userName };
    dispatch(updateUser(updatedUser)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setUpdateSuccess(true);
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
      <div className="input-wrapper">
        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          disabled // Désactive le champ pour le rendre non modifiable
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          disabled // Désactive le champ pour le rendre non modifiable
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
