// src/pages/AboutUs.jsx
import React, { useState } from "react";

const TEAM = [
  {
    id: "john",
    name: "Chef Charlotte",
    role: "Lead Chef & Recipe Developer",
    img: "Staff.jpg",
    desc: "Chef Charlotte is a grill master and BBQ expert. She creates the main meat recipes and oven specialties."
  },
  {
    id: "emma",
    name: "Chef Emma",
    role: "Food Blogger & Nutritionist",
    img: "staff2.jpg",
    desc: "Chef Emma specializes in desserts and baking, combining taste with nutrition."
  },
  {
    id: "alex",
    name: "Chef Amara",
    role: "Culinary Instructor",
    img: "staff1.jpg",
    desc: "Chef Amara has many years of experience as a cooking instructor and helps beginners feel confident in the kitchen."
  },
];

function AboutUs() {
  const [activeMember, setActiveMember] = useState(null);
  const closeModal = () => setActiveMember(null);

  return (
    <div className="main-wrapper bg-light">
      <section className="py-5">
        <div className="container">

          {/* === ABOUT TEXT === */}
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold mb-3">WHO WE ARE?</h1>
            <p className="lead mb-2">
              At <strong>Cook&amp;Taste</strong>, our passion lies in curating exceptional recipes and culinary experiences...
            </p>
            <p className="mb-2">
              Established in 2024, our diverse team includes skilled chefs, food bloggers, and nutritionists who love
              sharing their kitchen secrets.
            </p>
            <p className="mb-0">
              Embark on this culinary adventure with us and uncover exciting flavors, helpful tips, and cooking
              inspiration for every day.
            </p>
          </div>

          {/* === TEAM TITLE === */}
          <div className="text-center my-5">
            <h2 className="h3 fw-bold">Meet Our Team</h2>
          </div>

          {/* === TEAM GRID === */}
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {TEAM.map((member) => (
              <div className="col" key={member.id}>
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 1rem 2rem rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 .5rem 1rem rgba(0,0,0,0.1)";
                  }}
                >
                  <img
                    src={`/Images/${member.img}`}
                    className="card-img-top"
                    alt={member.name}
                    style={{ height: 270, objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column text-center">
                    <h5 className="card-title fw-semibold">{member.name}</h5>
                    <p className="card-text text-muted mb-4">{member.role}</p>

                    <button
                      type="button"
                      className="btn btn-warning mt-auto"
                      onClick={() => setActiveMember(member)}
                    >
                      More info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* === MODAL === */}
      {activeMember && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-dialog-centered "
            role="document" style={{ maxWidth: "600px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title">{activeMember.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                />
              </div>

              <div className="modal-body">
                <div className="row g-3 align-items-center">
                  <div className="col-12 col-md-5 text-center">
                    <img
                      src={`/Images/${activeMember.img}`}
                      alt={activeMember.name}
                      className="img-fluid rounded-3"
                    />
                  </div>
                  <div className="col-12 col-md-7">
                    <h6 className="text-muted mb-2">{activeMember.role}</h6>
                    <p className="mb-0">{activeMember.desc}</p>
                  </div>
                </div>
              </div>

              <div className="modal-footer border-0">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AboutUs;
