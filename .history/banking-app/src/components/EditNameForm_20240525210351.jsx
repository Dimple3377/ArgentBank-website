import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/userSlice";

const EditNameForm = ({ toggleEdit }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [userName, setUserName] = useState(user?.userName || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ firstName, lastName, userName })).then(() => {
      toggleEdit();
    });
  };

  return (
    <div className="edit-user-main">
      <h2>Edit user info</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="form-buttons">
          <button type="submit" className="edit-button">
            Save
          </button>
          <button type="button" className="edit-button" onClick={toggleEdit}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNameForm;
