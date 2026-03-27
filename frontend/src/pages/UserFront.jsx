<<<<<<< HEAD
import React from "react";
import "../styles/UserFront.css";
=======
import React, { useEffect } from "react";
import axios from "axios";
// If bootstrap isn't imported globally in main.jsx, uncomment next line:
// import "bootstrap/dist/css/bootstrap.min.css";
>>>>>>> b00bb2c (message)

function UserFront() {
  useEffect(() => {
    axios
      .get("http://localhost:8082/ticket/User")
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <form>
        <div className="row mb-3">
<<<<<<< HEAD
          <label htmlFor="inputTitle_of_Incident3" className="col-sm-2 col-form-label">
            Title of Incident
=======
          <label htmlFor="inputTitle" className="col-sm-2 col-form-label">
            Title_of_Incident
>>>>>>> b00bb2c (message)
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputTitle"
              placeholder="Enter Title_of_Incident"
            />
          </div>
        </div>

        <div className="row mb-3">
<<<<<<< HEAD
          <label htmlFor="inputDescription3" className="col-sm-2 col-form-label">
          Description
=======
          <label htmlFor="inputDescription" className="col-sm-2 col-form-label">
            Description
>>>>>>> b00bb2c (message)
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputDescription"
              placeholder="Enter Description"
            />
          </div>
        </div>

        <fieldset className="row mb-3">
          <legend className="col-form-label col-sm-2 pt-0">Type</legend>
          <div className="col-sm-10">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="type" id="bugs" defaultChecked />
              <label className="form-check-label" htmlFor="bugs">
                Bugs
              </label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="radio" name="type" id="software" />
              <label className="form-check-label" htmlFor="software">
                Software_installation
              </label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="radio" name="type" id="equipment" />
              <label className="form-check-label" htmlFor="equipment">
                Equipment_Related
              </label>
            </div>
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserFront;