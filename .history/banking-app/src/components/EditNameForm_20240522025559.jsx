import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/userSlice";

const EditNameForm = ({ toggleEdit }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [userName, setUserName] = useState(user?.userName || "");

  const handleSave = () => {
    dispatch(updateUser({ userName }));
    toggleEdit();
  };

  return (
    <div className="edit-user-info">
      <h2>Edit user info</h2>
      <div className="input-wrapper">
        <label htmlFor="username">User name:</label>
        <input
          type="text"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="firstname">First name:</label>
        <input type="text" id="firstname" value={user?.firstName} readOnly />
      </div>
      <div className="input-wrapper">
        <label htmlFor="lastname">Last name:</label>
        <input type="text" id="lastname" value={user?.lastName} readOnly />
      </div>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default EditNameForm;
