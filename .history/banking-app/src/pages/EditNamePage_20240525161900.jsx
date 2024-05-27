import React from "react";
import { useDispatch, useSelector } from "react-redux";
import EditNameForm from "../components/EditNameForm";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { updateUser } from "../store/userSlice";

const EditNamePage = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);

  const handleSubmit = (newFirstName, newLastName) => {
    dispatch(updateUser({ firstName: newFirstName, lastName: newLastName }));
  };

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          <h2>Edit user info</h2>
        </div>
        {status === "loading" && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <EditNameForm onSubmit={handleSubmit} />
      </main>
      <Footer />
    </>
  );
};

export default EditNamePage;
