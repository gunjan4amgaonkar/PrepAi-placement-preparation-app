import { useState } from "react";
import "./App.css";
import "./background.css";
import "./theme-dark.css";
import AnimatedBackground from "./AnimatedBackground.jsx";
import "./modules.css";
import CodingPractice from "./CodingPractice.jsx";
import AptitudePreparation from "./AptitudePreparation.jsx";
import CareerRoadmap from "./CareerRoadmap.jsx";
import TechnicalInterviews from "./TechnicalInterviews.jsx";
import HRInterview from "./HRInterview.jsx";
import GroupDiscussion from "./GroupDiscussion.jsx";
import LearningResources from "./LearningResources.jsx";
import PyqFaqs from "./PyqFaqs.jsx";
import MockTests from "./MockTests.jsx";
import ProgressTracking from "./ProgressTracking.jsx";
import AdminPanel from "./AdminPanel.jsx";
import { KEYS, load, save } from "./storage.js";
import { getOverview, readinessLabel } from "./progress.js";

const features = [
  ["👤", "Login & Profile", "Account and student details"],
  ["🧭", "AI Career Roadmap", "Your personalized placement plan"],
  ["💻", "Coding Preparation", "Practice programming problems"],
  ["🧠", "Aptitude Preparation", "Improve reasoning and maths"],
  ["⚙️", "Technical Interviews", "Prepare technical questions"],
  ["🤝", "HR Interview", "Practice HR questions"],
  ["💬", "Group Discussion", "Build communication skills"],
  ["📚", "Learning Resources", "Explore study materials"],
  ["❓", "PYQs & FAQs", "Frequently asked questions"],
  ["📝", "Mock Tests", "Test your preparation"],
  ["📊", "Progress Tracking", "Review your performance"],
  ["🛡️", "Admin Panel", "Manage and verify questions"],
];

const emptyProfile = {
  name: "",
  email: "",
  college: "",
  course: "",
};

export default function App() {
  const [active, setActive] = useState("Dashboard");
  const [profile, setProfile] = useState(() => ({
    ...emptyProfile,
    ...load(KEYS.profile, {}),
  }));
  const [saved, setSaved] = useState(false);
  const progress = getOverview(profile);

  function updateProfile(event) {
    const { name, value } = event.target;
    setProfile((previous) => ({ ...previous, [name]: value }));
    setSaved(false);
  }

  function saveProfile(event) {
    event.preventDefault();
    save(KEYS.profile, profile);
    setSaved(true);
  }

  return (
    <div className="app">
      <AnimatedBackground />
      <aside className="sidebar">
        <h2>PrepAI<span>.</span></h2>
        <p className="muted">PLACEMENT PREPARATION</p>

        {["Dashboard", ...features.map((item) => item[1])].map((name) => (
          <button
            key={name}
            className={`nav-item ${active === name ? "selected" : ""}`}
            onClick={() => {
              setActive(name);
              setSaved(false);
              window.scrollTo(0, 0);
            }}
          >
            {name === "Dashboard"
              ? "🏠"
              : features.find((item) => item[1] === name)?.[0]}{" "}
            {name}
          </button>
        ))}
      </aside>

      <main className="main">
        <header>
          <div>
            <p className="muted">YOUR PLACEMENT JOURNEY</p>
            <h1>{active === "Dashboard" ? "Student Dashboard" : active}</h1>
            <p>Build your skills. Practice consistently. Get placement-ready.</p>
          </div>
          <div className="avatar">
            {profile.name ? profile.name[0].toUpperCase() : "S"}
          </div>
        </header>

        {active === "Dashboard" ? (
          <>
            <section className="welcome">
              <div>
                <p>WELCOME TO PREPAI</p>
                <h2>
                  {profile.name
                    ? `Welcome, ${profile.name}!`
                    : "Your dream career starts here."}
                </h2>
                <p>Choose a learning path and take your next step.</p>
                <button onClick={() => setActive("AI Career Roadmap")}>
                  Explore my roadmap →
                </button>
              </div>
              <div className="welcome-icon">🎯</div>
            </section>

            <h2 className="section-title">Your Overview</h2>
            <section className="stats">
              <article><span>📚</span><p>Learning modules</p><h2>{features.length}</h2></article>
              <article><span>💻</span><p>Coding solved</p><h2>{progress.codingDone}/{progress.codingTotal}</h2></article>
              <article><span>🧠</span><p>Aptitude accuracy</p><h2>{progress.aptAccuracy === null ? "No sets yet" : `${progress.aptAccuracy}%`}</h2></article>
              <article><span>👤</span><p>Profile status</p><h2>{progress.profileDone ? "Created" : "Not completed"}</h2></article>
              <article><span>🔥</span><p>Day streak</p><h2>{progress.streak}</h2></article>
              <article><span>🎯</span><p>Career readiness</p><h2>{progress.readiness}%<small className="stat-note">{readinessLabel(progress.readiness)}</small></h2></article>
            </section>

            <h2 className="section-title">Explore Preparation Modules</h2>
            <section className="feature-grid">
              {features.map(([icon, title, description]) => (
                <button className="feature" key={title}
                  onClick={() => { setActive(title); window.scrollTo(0, 0); }}>
                  <span className="feature-icon">{icon}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="open">Explore module →</span>
                </button>
              ))}
            </section>
          </>
        ) : active === "Login & Profile" ? (
          <section className="module-page profile-page">
            <div className="feature-icon">👤</div>
            <h2>Student Profile</h2>
            <p>Enter your details to personalize your placement journey.</p>

            <form onSubmit={saveProfile} className="profile-form">
              <label>
                Full name
                <input name="name" value={profile.name}
                  onChange={updateProfile} placeholder="Enter your full name"
                  required />
              </label>

              <label>
                Email address
                <input name="email" type="email" value={profile.email}
                  onChange={updateProfile} placeholder="you@example.com"
                  required />
              </label>

              <label>
                College or university
                <input name="college" value={profile.college}
                  onChange={updateProfile} placeholder="Enter your college" />
              </label>

              <label>
                Course or degree
                <select name="course" value={profile.course}
                  onChange={updateProfile}>
                  <option value="">Select your course</option>
                  <option value="B.Tech / B.E.">B.Tech / B.E.</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                  <option value="B.Sc.">B.Sc.</option>
                  <option value="M.Sc.">M.Sc.</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <button type="submit" className="save-button">
                Save Profile
              </button>

              {saved && (
                <p className="success-message">
                  ✓ Profile saved successfully!
                </p>
              )}
            </form>

            <p className="storage-note">
              Prototype: profile details are stored in this browser only.
              This is not a real login system.
            </p>
          </section>
        ) : active === "Coding Preparation" ? (
          <CodingPractice />
        ) : active === "Aptitude Preparation" ? (
          <AptitudePreparation />
        ) : active === "AI Career Roadmap" ? (
          <CareerRoadmap />
        ) : active === "Technical Interviews" ? (
          <TechnicalInterviews />
        ) : active === "HR Interview" ? (
          <HRInterview />
        ) : active === "Group Discussion" ? (
          <GroupDiscussion />
        ) : active === "Learning Resources" ? (
          <LearningResources />
        ) : active === "PYQs & FAQs" ? (
          <PyqFaqs />
        ) : active === "Mock Tests" ? (
          <MockTests />
        ) : active === "Progress Tracking" ? (
          <ProgressTracking profile={profile} goTo={setActive} />
        ) : active === "Admin Panel" ? (
          <AdminPanel />
        ) : null}
      </main>
    </div>
  );
}