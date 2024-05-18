import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/userSlice";

const EditNameForm = ({ toggleEdit }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState(user ? user.firstName : "");
  const [lastName, setLastName] = useState(user ? user.lastName : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ firstName, lastName }));
    toggleEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="lastName">Last Name</label>
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
    </form>
  );
};

export default EditNameForm;
