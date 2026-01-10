import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

/*import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; */

import "./home.css"

const Home = () => {
    const features = [
        {
            title: "Find Study Groups",
            desc: "Search and join study groups based on your subject and interest."
        },
        {
            title: "Create Your Group",
            desc: "Start your own study group and invite students."
        },
        {
            title: "Collaborate Easily",
            desc: "Discuss topics, share notes and grow together."
        }
    ];
    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div>
            {/*Navbar Section*/}
            <nav className='navbar'>
                <div className='navbar-one'>
                    <p>StudyGroup <br />Finder</p>
                    <ul className='navbar-two'>
  <li>
    <Link to="/">Home</Link>
  </li>

  <li>
    <Link to="/groups">Find Group</Link>
  </li>

  <li className='group'>
    <Link to="/create">Create Group</Link>
  </li>

  <li className='about'>
    <Link to="/about">About</Link>
  </li>
</ul>

                </div>
            </nav>

            {/*Hero Section*/}
            <div className='hero'>
                <div className='hero-con'>
                    <img src="https://plus.unsplash.com/premium_photo-1686836995331-005859dd3bd7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGxhbmRzY2FwZSUyMGdyb3VwJTIwc3R1ZHl8ZW58MHx8MHx8fDA%3D" alt="homeImg" className='hero-img' />
                    <h1>StudyGroupFinder</h1> <br />
                    <p>A Better World  <br />Through Education</p>
                </div>
            </div>


{/*subject Selection section*/}
            <div className="subject-wrapper">
  <h2 className="subject-title">Select Subject</h2>

  <div className="subject-card">
    <select
      onChange={(e) =>
        setUserData({ ...userData, subject: e.target.value })
      }
    >
      <option value="">Select</option>
      <option value="React">React</option>
      <option value="DBMS">DBMS</option>
      <option value="DSA">DSA</option>
    </select>

    <button onClick={() => navigate("/time")}>
      Next
    </button>
  </div>
</div>


            {/* FEATURES SECTION */}
            <section className="features">
                <h2>Why StudyGroupFinder?</h2>

                <div className="feature-cards">
                    {features.map((item, index) => (
                        <div className="card" key={index}>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

             {/* Footer Section */}
            <div className='footer'>
                <p>&copy; 2026 Study Group Finder. <br />All rights reserved</p>
            </div>
        </div>
    );
};

export default Home;

