import "../assets/Css/style.css";
import { useState } from "react";

function AboutUs() {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (id) => setActiveModal(id);
  const closeModal = () => setActiveModal(null);

  return (
  
    <div className="main-wrapper">
  <div className="page-container">
      {/* ABOUT SECTION */}
      <div className="page-container">
        <h1>WHO WE ARE?</h1>
        <p>At Cook&Taste, our passion lies in curating exceptional recipes and culinary experiences...</p>
        <p>Established in 2024... Our diverse team includes skilled chefs, food bloggers, and nutritionists...</p>
        <p>Embark on this culinary adventure with us and uncover exciting flavors...</p>
      </div>

      {/* TEAM GRID */}
      <h2>Meet Our Team</h2>
      <div className="page-container">
        <div className="row">
          {[
            {
              name: "Chef John",
              role: "Lead Chef & Recipe Developer",
              img: "Staff.jpg",
              id: "staff3Modal",
              desc: "Chef John is a grill master and BBQ expert..."
            },
            {
              name: "Chef Emma",
              role: "Food Blogger & Nutritionist",
              img: "staff1.jpg",
              id: "staff2Modal",
              desc: "Chef Emma is a specialist in pastry and baking..."
            },
            {
              name: "Chef Alex",
              role: "Culinary Instructor",
              img: "staff2.jpg",
              id: "staff1Modal",
              desc: "Chef Alex is an experienced culinary instructor..."
            }
          ].map((member, i) => (
            <div className="col" key={i}>
              <div className="card">
                <img
                  src={`/Images/${member.img}`}
                  className="card-img"
                  alt={member.name}
                  style={{ maxHeight: 200, objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{member.name}</h5>
                  <p className="card-text">{member.role}</p>
                  <button className="btn" onClick={() => openModal(member.id)}>
                    More info
                  </button>
                </div>
              </div>

              {activeModal === member.id && (
                <div className="modal" id={member.id}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5>{member.name}</h5>
                        <span className="close" onClick={closeModal}>
                          &times;
                        </span>
                      </div>
                      <div className="modal-body">
                        <img
                          src={`/Images/${member.img}`}
                          alt={member.name}
                          className="modal-img"
                        />
                        <p>{member.desc}</p>
                        <button className="btn" onClick={closeModal}>
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    
    </div>
    </div>
  );
}

export default AboutUs;
