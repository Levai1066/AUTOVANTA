import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowUpRight, ChevronRight, Gauge, Search, X } from "lucide-react";
import gsap from "gsap";
import "./styles.css";

const cars = [
  {
    id: "sf90",
    brand: "FERRARI",
    model: "SF90 STRADALE",
    type: "Plug-in hybrid supercar",
    year: "2020s",
    power: "986 hp*",
    drive: "AWD",
    hero: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=2200&q=85",
    description: "A high-performance hybrid architecture where combustion power and electric torque are orchestrated as one system.",
    dna: {
      body: "Lightweight composite and aluminum structures shape the aerodynamic shell.",
      aero: "Air management balances cooling, drag and high-speed stability.",
      chassis: "A performance-focused platform integrates the major load paths.",
      powertrain: "Twin-turbo V8 architecture works with electric drive for combined output.",
      suspension: "Electronic control systems continuously manage wheel behavior.",
      brakes: "High-performance braking hardware converts kinetic energy into heat.",
      electronics: "Multiple control systems coordinate power, traction and driver inputs."
    }
  },
  {
    id: "revuelto",
    brand: "LAMBORGHINI",
    model: "REVUELTO",
    type: "V12 plug-in hybrid",
    year: "2020s",
    power: "1,001 CV*",
    drive: "AWD",
    hero: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=2200&q=85",
    description: "A modern V12 flagship combining a naturally aspirated combustion engine with electric assistance.",
    dna: {
      body: "Aggressive surfaces are shaped around the vehicle's cooling and aerodynamic needs.",
      aero: "Splitters, diffusers and airflow channels help manage pressure around the body.",
      chassis: "A lightweight carbon-oriented structure supports the performance package.",
      powertrain: "A V12 combustion engine is integrated with multiple electric motors.",
      suspension: "Electronic chassis control helps balance response and stability.",
      brakes: "Large performance brakes are designed for repeated high-energy stops.",
      electronics: "Torque, traction and hybrid functions are coordinated electronically."
    }
  },
  {
    id: "gt3rs",
    brand: "PORSCHE",
    model: "911 GT3 RS",
    type: "Track-focused sports car",
    year: "2020s",
    power: "518 hp*",
    drive: "RWD",
    hero: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=85",
    description: "A road-legal performance machine engineered around naturally aspirated response and aerodynamic grip.",
    dna: {
      body: "The body is optimized around mass, cooling and aerodynamic packaging.",
      aero: "Large aerodynamic surfaces generate additional downforce for track driving.",
      chassis: "The platform prioritizes rigidity, feedback and predictable weight transfer.",
      powertrain: "A high-revving naturally aspirated flat-six drives the rear wheels.",
      suspension: "Performance suspension provides extensive control over wheel movement.",
      brakes: "High-performance braking hardware is engineered for repeated deceleration.",
      electronics: "Vehicle dynamics systems allow fine control of traction and chassis behavior."
    }
  },
  {
    id: "artura",
    brand: "McLAREN",
    model: "ARTURA",
    type: "Hybrid supercar",
    year: "2020s",
    power: "690 hp*",
    drive: "RWD",
    hero: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=2200&q=85",
    description: "A compact hybrid supercar built around low mass, rapid response and electric torque.",
    dna: {
      body: "The exterior wraps a lightweight performance-oriented architecture.",
      aero: "Sculpted surfaces guide cooling air while managing drag.",
      chassis: "A lightweight carbon-fiber-oriented platform supports the vehicle.",
      powertrain: "Turbocharged combustion power is paired with an electric motor.",
      suspension: "Chassis systems are tuned to balance agility and ride control.",
      brakes: "Performance braking hardware supports high-speed driving.",
      electronics: "Hybrid and vehicle-dynamics controllers coordinate rapid responses."
    }
  },
  {
    id: "chiron",
    brand: "BUGATTI",
    model: "CHIRON",
    type: "Hypercar",
    year: "2010s–2020s",
    power: "1,500 PS*",
    drive: "AWD",
    hero: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=2200&q=85",
    description: "An extreme grand-touring hypercar centered around a quad-turbocharged W16 powertrain.",
    dna: {
      body: "The body combines dramatic proportions with extensive thermal and aerodynamic packaging.",
      aero: "Active and passive airflow management adapts the car to different driving demands.",
      chassis: "A high-performance architecture is designed around rigidity and stability.",
      powertrain: "A quad-turbocharged W16 produces exceptional power and torque.",
      suspension: "Adaptive systems adjust the vehicle for different driving modes.",
      brakes: "High-energy braking hardware is paired with sophisticated cooling.",
      electronics: "Control systems coordinate engine, transmission, traction and stability."
    }
  },
  {
    id: "jesko",
    brand: "KOENIGSEGG",
    model: "JESKO",
    type: "Megacar",
    year: "2020s",
    power: "Up to 1,600 hp*",
    drive: "RWD",
    hero: "https://images.unsplash.com/photo-1617814076668-7d5d1b2f4e0a?auto=format&fit=crop&w=2200&q=85",
    description: "An engineering-first megacar combining extreme aerodynamics, lightweight construction and a high-output V8.",
    dna: {
      body: "Lightweight structures reduce mass while creating a strong aerodynamic envelope.",
      aero: "Large aero surfaces are designed to produce substantial downforce.",
      chassis: "The platform is engineered around low mass and high structural performance.",
      powertrain: "A twin-turbo V8 architecture provides extreme power potential.",
      suspension: "Advanced suspension geometry supports high-speed stability.",
      brakes: "High-performance carbon-ceramic braking is designed for extreme loads.",
      electronics: "Vehicle systems manage power delivery, traction and active functions."
    }
  }
];

const layers = [
  ["body", "BODY"],
  ["aero", "AERO"],
  ["chassis", "CHASSIS"],
  ["powertrain", "POWERTRAIN"],
  ["suspension", "SUSPENSION"],
  ["brakes", "BRAKES"],
  ["electronics", "ELECTRONICS"]
];

function App() {
  const [selectedCar, setSelectedCar] = useState(cars[0]);
  const [activeLayer, setActiveLayer] = useState("powertrain");
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(".hero-copy > *", { y: 35, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, stagger: .12, ease: "power3.out"
    });
    gsap.fromTo(".hero-car", { scale: 1.08, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 1.4, ease: "power3.out"
    });
  }, []);

  const filtered = cars.filter(c =>
    `${c.brand} ${c.model} ${c.type}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="app">
      <header className="nav">
        <a className="logo" href="#home">AUTO<span>VANTA</span></a>
        <nav>
          <a href="#explore">Explore</a>
          <a href="#dna">Build DNA</a>
          <a href="#lab">The Lab</a>
          <a href="#compare">Compare</a>
        </nav>
        <button className="icon-btn" onClick={() => setShowSearch(true)} aria-label="Search">
          <Search size={18}/>
        </button>
      </header>

      <main>
        <section id="home" className="hero" ref={heroRef}>
          <div className="hero-copy">
            <p className="eyebrow">AUTOMOTIVE EXPLORATION PLATFORM / 01</p>
            <h1>Explore what<br/><em>makes a car</em><br/>extraordinary.</h1>
            <p className="hero-text">
              Machines, engineering, design and performance — explored beyond the surface.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#explore">Explore the collection <ArrowUpRight size={17}/></a>
              <a className="text-btn" href="#dna">Enter the Build DNA <ChevronRight size={16}/></a>
            </div>
          </div>
          <div className="hero-media">
            <img className="hero-car" src={selectedCar.hero} alt={selectedCar.model}/>
            <div className="hero-overlay"/>
            <div className="hero-meta">
              <span>{selectedCar.brand}</span>
              <strong>{selectedCar.model}</strong>
              <small>{selectedCar.type}</small>
            </div>
            <div className="scroll-cue"><ArrowDown size={15}/> Scroll to explore</div>
          </div>
        </section>

        <section id="explore" className="section explore">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE COLLECTION / 02</p>
              <h2>Machines worth<br/><em>understanding.</em></h2>
            </div>
            <p>Start with a curated first collection. The same data architecture will scale to thousands of vehicles.</p>
          </div>
          <div className="car-grid">
            {cars.map(car => (
              <button className={`car-card ${selectedCar.id === car.id ? "active" : ""}`} key={car.id}
                onClick={() => { setSelectedCar(car); setActiveLayer("powertrain"); window.scrollTo({top:0, behavior:"smooth"}); }}>
                <img src={car.hero} alt={car.model}/>
                <div className="car-card-shade"/>
                <div className="car-card-info">
                  <span>{car.brand}</span>
                  <strong>{car.model}</strong>
                  <small>{car.type}</small>
                </div>
                <ArrowUpRight className="card-arrow" size={18}/>
              </button>
            ))}
          </div>
        </section>

        <section id="dna" className="section dna">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SIGNATURE SYSTEM / 03</p>
              <h2>Build <em>DNA.</em></h2>
            </div>
            <p>Don't just look at the car. Pull apart the engineering decisions that make it work.</p>
          </div>

          <div className="dna-shell">
            <div className="dna-visual">
              <div className="dna-label">SYSTEM MAP / {selectedCar.model}</div>
              <div className="layer-stack">
                {layers.map(([key, label], i) => (
                  <button
                    key={key}
                    className={`dna-layer layer-${i} ${activeLayer === key ? "selected" : ""}`}
                    onClick={() => setActiveLayer(key)}
                    style={{"--i": i}}
                  >
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {label}
                  </button>
                ))}
              </div>
              <div className="dna-orbit orbit-1"/>
              <div className="dna-orbit orbit-2"/>
              <div className="dna-center">
                <Gauge size={28}/>
                <span>VEHICLE<br/>SYSTEM</span>
              </div>
            </div>

            <div className="dna-info">
              <p className="eyebrow">ACTIVE LAYER</p>
              <h3>{layers.find(x => x[0] === activeLayer)?.[1]}</h3>
              <p className="dna-description">{selectedCar.dna[activeLayer]}</p>

              <div className="fact-grid">
                <div><span>VEHICLE</span><strong>{selectedCar.brand} {selectedCar.model}</strong></div>
                <div><span>SYSTEM</span><strong>{layers.find(x => x[0] === activeLayer)?.[1]}</strong></div>
                <div><span>MODE</span><strong>ENGINEERING VIEW</strong></div>
                <div><span>DATA</span><strong>CURATED / PHASE 01</strong></div>
              </div>

              <div className="layer-list">
                {layers.map(([key,label]) => (
                  <button key={key} onClick={() => setActiveLayer(key)} className={activeLayer === key ? "on":""}>
                    <span>{label}</span><ChevronRight size={15}/>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="lab" className="section lab">
          <div className="lab-grid">
            <div>
              <p className="eyebrow">THE LAB / 04</p>
              <h2>From surface<br/>to <em>system.</em></h2>
              <p className="hero-text">The future version of AUTOVANTA turns complex automotive engineering into interactive visual stories.</p>
            </div>
            <div className="lab-list">
              {["Energy Flow", "Aerodynamic Vision", "Engine Lab", "Interior Hotspots", "Performance Graphs"].map((x,i) => (
                <div className="lab-row" key={x}>
                  <span>0{i+1}</span><strong>{x}</strong><ChevronRight size={18}/>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="compare" className="section compare">
          <p className="eyebrow">OBJECTIVE DATA / 05</p>
          <h2>Compare the <em>machine.</em></h2>
          <div className="compare-table">
            <div className="compare-row head"><span>VEHICLE</span><span>POWER</span><span>DRIVE</span><span>TYPE</span></div>
            {cars.slice(0,5).map(car => (
              <div className="compare-row" key={car.id}>
                <span><b>{car.brand}</b> {car.model}</span>
                <span>{car.power}</span>
                <span>{car.drive}</span>
                <span>{car.type}</span>
              </div>
            ))}
          </div>
          <small className="disclaimer">* Phase 1 demo values. Production launch should connect each specification to verified sources and market/model-year context.</small>
        </section>
      </main>

      <footer>
        <div className="logo">AUTO<span>VANTA</span></div>
        <p>Explore What Makes a Car Extraordinary.</p>
        <span>PHASE 01 / 2026</span>
      </footer>

      {showSearch && (
        <div className="search-modal" onClick={() => setShowSearch(false)}>
          <div className="search-box" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setShowSearch(false)}><X/></button>
            <p className="eyebrow">SEARCH THE COLLECTION</p>
            <input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ferrari, V12, hybrid..." />
            <div className="search-results">
              {filtered.map(car => (
                <button key={car.id} onClick={() => {setSelectedCar(car); setShowSearch(false); setQuery(""); window.scrollTo({top:0, behavior:"smooth"});}}>
                  <span>{car.brand}</span><strong>{car.model}</strong><ChevronRight size={16}/>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App/>);