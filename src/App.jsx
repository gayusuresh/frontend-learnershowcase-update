import { useEffect, useState } from "react";
<<<<<<< HEAD
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { Card } from "./Cards.jsx";
import Admin from "./Admin.jsx";
import Home from "./Home.jsx";
import "./layout.css";

const SECTIONS = [
  {
    path: "projects",
    label: "Projects",
    title: "Learner projects",
    sub: "Real problems, built by our learners.",
  },
  {
    path: "testimonials",
    label: "Testimonials",
    title: "Learner testimonials",
    sub: "Their journey, mentors and course experience.",
  },
  {
    path: "placements",
    label: "Placements",
    title: "Placement success stories",
    sub: "Learners who landed roles after our courses.",
  },
  {
    path: "achievements",
    label: "Achievements",
    title: "Learner achievements",
    sub: "Hackathons, certifications and milestones.",
  },
];
const REGIONS = ["Kerala", "Tamil Nadu", "Telugu"];
const slug = (r) => r.toLowerCase().replace(" ", "-");

function Section({ info, meta }) {
  const type = info.path;
  const [params, setParams] = useSearchParams();
  const region = params.get("region") || "";
  const course = params.get("course") || "";
  const [items, setItems] = useState(null);

  const set = (k, v) => {
    const next = new URLSearchParams(params);
    v ? next.set(k, v) : next.delete(k);
    setParams(next);
  };
  useEffect(() => {
    setItems(null);
    const qs = new URLSearchParams({
      ...(region && { region }),
      ...(course && { course }),
    });
    fetch(`/api/${type}?${qs}`)
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, [type, region, course]);

  return (
    <>
      <div className="pagehead">
        <div className="wrap">
          <h1>{info.title}</h1>
          <p>{info.sub}</p>
        </div>
      </div>
      <div className="wrap content">
        <div className="filters">
          <div className="chips" role="group" aria-label="Region">
            <button
              className={!region ? "on" : ""}
              onClick={() => set("region", "")}
            >
              All regions
            </button>
            {REGIONS.map((r) => (
              <button
                key={r}
                data-region={slug(r)}
                className={region === r ? "on" : ""}
                onClick={() => set("region", r)}
              >
                {r}
              </button>
            ))}
          </div>
          <select
            value={course}
            onChange={(e) => set("course", e.target.value)}
            aria-label="Course"
          >
            <option value="">All courses</option>
            {meta.courses.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        {items === null ? (
          <p className="note">Loading…</p>
        ) : items.length === 0 ? (
          <p className="note">
            Nothing here yet for this region and course. Try another filter.
          </p>
        ) : (
          <div className="grid">
            {items.map((i) => (
              <Card key={i._id} type={type} item={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav">
      <div className="wrap bar2">
        <Link to="/" className="brand">
          Learner<span>Showcase</span>
        </Link>
        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
        <div
          role="navigation"
          className={"menu" + (open ? " open" : "")}
          onClick={() => setOpen(false)}
        >
          <NavLink to="/" end>
            Home
          </NavLink>
          {SECTIONS.map((s) => (
            <NavLink key={s.path} to={`/${s.path}`}>
              {s.label}
            </NavLink>
          ))}
          <NavLink to="/admin" className="cta">
            Manage
          </NavLink>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <Link to="/" className="brand">
              Learner<span style={{ color: "#7FA6FF" }}>Showcase</span>
            </Link>
            <p>
              Celebrating what our learners build, say and become, across
              Kerala, Tamil Nadu and the Telugu states.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            {SECTIONS.map((s) => (
              <Link key={s.path} to={`/${s.path}`}>
                {s.label}
              </Link>
            ))}
          </div>
          <div>
            <h4>Regions</h4>
            {REGIONS.map((r) => (
              <Link key={r} to={`/projects?region=${encodeURIComponent(r)}`}>
                {r}
              </Link>
            ))}
          </div>
          <div>
            <h4>Team</h4>
            <Link to="/admin">Coordinator login</Link>
            <p>Share your story with your batch coordinator.</p>
          </div>
        </div>
        <div className="copy">
          © {new Date().getFullYear()} Learner Showcase. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [meta, setMeta] = useState({ courses: [] });
  const { pathname } = useLocation();
  useEffect(() => {
    fetch("/api/meta/courses")
      .then((r) => r.json())
      .then(setMeta)
      .catch(() => {});
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
=======
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import { SECTIONS, SHOW_ADMIN, SHOW_HOME, START } from "./config/index.js";
import Admin from "./pages/Admin.jsx";
import Home from "./pages/Home.jsx";
import Section from "./pages/Section.jsx";
import { getMeta } from "./services/api.js";

export default function App() {
  const [courses, setCourses] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    getMeta().then((m) => setCourses(m.courses || [])).catch(() => {});
  }, [pathname]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

>>>>>>> 251e00f (sixth)
  return (
    <>
      <Navbar />
      <main className="page">
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Home />} />
          {SECTIONS.map((s) => (
            <Route
              key={s.path}
              path={`/${s.path}`}
              element={<Section info={s} meta={meta} />}
            />
          ))}
         
          <Route
            path="/admin"
            element={
              <div className="wrap content">
                <Admin />
              </div>
            }
          />
=======
          {SHOW_HOME && <Route path="/" element={<Home />} />}
          {SECTIONS.map((s) => <Route key={s.path} path={`/${s.path}`} element={<Section info={s} courses={courses} />} />)}
          {SHOW_ADMIN && <Route path="/admin" element={<div className="wrap content"><Admin /></div>} />}
          <Route path="*" element={<Navigate to={START} replace />} />
>>>>>>> 251e00f (sixth)
        </Routes>
      </main>
      <Footer />
    </>
  );
}
