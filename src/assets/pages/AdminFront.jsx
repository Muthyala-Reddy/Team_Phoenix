import React, { useState } from "react";

function AdminFront() {
  const [selected, setSelected] = useState("Dropdown");

  const handleDropdown = (value) => {
    setSelected(value);
    console.log("Selected:", value);
  };

  return (
    <div>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selected}
        </button>

        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => handleDropdown("Submitted")}
            >
              Submitted
            </button>
          </li>

          <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => handleDropdown("Alloted")}
            >
              Alloted
            </button>
          </li>

          <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => handleDropdown("In-Progress")}
            >
              In-Progress
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminFront;