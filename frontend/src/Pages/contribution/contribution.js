import React, { useEffect, useState } from "react";
import image from "../../img/bill.jpg";
function Contri() {
  const [contriData, setContriData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("shares"));
    setContriData(data);
    setIsLoaded(true);
  }, []);

  const buildUserShare = (user) => {
    return (
      <div className={"personBlock"}>
        <div>
          <h4>{user.name}</h4>
          {user.items.length ? <h6>Items bought</h6> : ""}
          <div>
            {user.items.map((item) => (
              <li>{item}</li>
            ))}
          </div>
        </div>
        <p className={"sharePrice"}>
          Total share - <span>${user.share}</span>
        </p>
      </div>
    );
  };

  return isLoaded ? (
    <section className="text-center">
      <div
        className="p-5 bg-image img-fluid"
        style={{
          backgroundImage: `url(${image})`,
          height: "1000px",
        }}></div>
      <div
        className="card mx-4 mx-md-5 shadow-5-strong"
        style={{
          marginTop: "-900px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
        }}>
        <div className="card-body py-5 px-md-5">
          <div class="row d-flex justify-content-center">
            {/* <div className="container"> */}
            <div className={"contriPage"}>
              <h3>Individual Contributions</h3>
              <div className={"contriItem"}>
                {contriData.map((user) => buildUserShare(user))}
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className="row"></div>
        </div>
      </div>
    </section>
  ) : (
    <div>
      <p>Loading...</p>
    </div>
  );
}

export default Contri;
