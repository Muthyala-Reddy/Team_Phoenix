import React from "react";


function Admin() {
  return (
    <div className="container mt-4">
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          placeholder="Enter here"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="formGroupExampleInput2" className="form-label">
          Password
        </label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput2"
          placeholder="Password"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="formGroupExampleInput" className="form-label">
          Gmail
        </label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          placeholder="Enter here"
        />
      </div>
      <input class="btn btn-primary" type="submit" value="Submit"></input>
      
    

      
    </div>
    
  );
}

export default Admin;
