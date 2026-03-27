import React from "react";
import "../styles/UserFront.css";

function UserFront() {
  return (
    <div className="container mt-5">
      <form>
        {/* Title_of_Incident */}
        <div className="row mb-3">
          <label htmlFor="inputTitle_of_Incident3" className="col-sm-2 col-form-label">
            Title of Incident
          </label>
          <div className="col-sm-10">
            <input
              type="Title_of_Incident"
              className="form-control"
              id="inputTitle_of_Incident3"
              placeholder="Enter Title_of_Incident"
            />
          </div>
        </div>

        {/* Description */}
        <div className="row mb-3">
          <label htmlFor="inputDescription3" className="col-sm-2 col-form-label">
          Description
          </label>
          <div className="col-sm-10">
            <input
              type="Description"
              className="form-control"
              id="inputDescription3"
              placeholder="Enter Description"
            />
          </div>
        </div>

        {/* type */}
        <fieldset className="row mb-3">
          <legend className="col-form-label col-sm-1 pt-3">Type</legend>

          <div className="col-sm-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                id="gridRadios1"
                value="option1"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="gridRadios1">
                Bugs
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                id="gridRadios2"
                value="option2"
              />
              <label className="form-check-label" htmlFor="gridRadios2">
                Software_installation
              </label>
            </div>

            <div className="form-check disabled">
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                id="gridRadios3"
                value="option3"
                
              />
              <label className="form-check-label" htmlFor="gridRadios3">
                Equipment_Related
              </label>

            </div>
          </div>
        </fieldset>

        {/* Checkbox */}
        
        

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserFront;
