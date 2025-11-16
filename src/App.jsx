import { useState, useRef } from "react"
import "./App.css"

// Tab Button Component
function TabButton({ active, label, onClick }) {
  return (
    <button
      className={`tab-button ${active ? 'active' : ''}`}
      onClick={onClick}
      aria-pressed={active}
      role="tab"
    >
      {label}
    </button>
  );
}

// Sidebar/Navigation Component
function Sidebar({ tabs, activeTab, setActiveTab }) {
  return (
    <aside className="sidebar" role="navigation" aria-label="Main navigation">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Brain</h1>
        <SearchBar />
      </div>
      <nav className="sidebar-nav" role="tablist">
        {tabs.map((tab, index) => (
          <TabButton
            key={tab.id}
            active={index === activeTab}
            label={tab.label}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </nav>
    </aside>
  );
}

// Main Content Area Component
function MainContentArea({ content }) {
  return (
    <main className="main-content" role="main">
      <div className="content-section">
        {content}
      </div>
    </main>
  );
}

// Toggle Switch Component (Modern)
function ToggleSwitch({ id, label, onChange }) {
  const [active, setActive] = useState(false);
  
  const handleToggle = () => {
    const newState = !active;
    setActive(newState);
    onChange?.(newState ? "ON" : "OFF");
  };

  return (
    <div className="toggle-wrapper">
      <button
        id={id}
        className={`toggle-switch ${active ? 'active' : ''}`}
        onClick={handleToggle}
        role="switch"
        aria-checked={active}
        aria-label={label || "Toggle switch"}
      >
        <span className="toggle-switch-slider" />
        <span className="sr-only">{active ? "On" : "Off"}</span>
      </button>
      {label && <label htmlFor={id}>{active ? "ON" : "OFF"}</label>}
    </div>
  );
}

// Progress Bar Component
function ProgressBar({ value, max = 100, label }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className="progress-bar-container" role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax={max} aria-label={label || "Progress"}>
      <div 
        className="progress-bar-fill" 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

// Card Components
function CardWrapper({ children }) {
  return (
    <div className="card-wrapper">
      {children}
    </div>
  );
}

function Card({ children, title }) {
  return (
    <article className="card">
      {title && <h3>{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </article>
  );
}

// Animated Toggle Switch (ToggleSwitch2)
function AnimatedToggle({ id, label, onChange }) {
  const [active, setActive] = useState(false);
  
  const handleToggle = () => {
    const newState = !active;
    setActive(newState);
    onChange?.(newState ? "ON" : "OFF");
  };

  return (
    <div className="toggle-wrapper">
      <button
        id={id}
        className={`animated-toggle ${active ? 'active' : ''}`}
        onClick={handleToggle}
        role="switch"
        aria-checked={active}
        aria-label={label || "Animated toggle switch"}
      >
        <span className="animated-toggle-slider" />
        <span className="sr-only">{active ? "On" : "Off"}</span>
      </button>
      {label && <label htmlFor={id}>{active ? "ON" : "OFF"}</label>}
    </div>
  );
}

// Select Input Component
function SelectInput({ id, myList, onChange }) {
  const [selected, setSelected] = useState(myList?.[0] || "");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option);
    console.log(`You selected ${option}`);
  };

  return (
    <div className="select-input-wrapper">
      <div
        className="select-input-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
      </div>
      {isOpen && (
        <ul className="select-input-dropdown">
          {myList?.map((option) => (
            <li
              key={option}
              className="select-input-item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Dropdown Component
function Dropdown({ id, options, selectedOption, onChange, placeholder = "Select..." }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options?.[0] || placeholder);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div className="dropdown-wrapper" ref={dropdownRef}>
      <button
        id={id}
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selected}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <ul className="dropdown-menu" role="listbox">
          {options?.map((option) => (
            <li
              key={option}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={option === selected}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Search Bar Component
function SearchBar({ placeholder = "Search...", data = ["The Goonies", "Dr Panda", "Peppa Pig", "Miss R"] }) {
  const [inputValue, setInputValue] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.trim()) {
      const filtered = data.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredList(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelect = (item) => {
    setInputValue(item);
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", inputValue);
    setShowDropdown(false);
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className="search-input"
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        aria-label="Search"
        autoComplete="off"
      />
      <button className="search-submit" type="submit" aria-label="Submit search">
        🔍
      </button>
      
      {showDropdown && (
        <ul className="search-dropdown">
          {filteredList.map((item) => (
            <li
              key={item}
              className="search-dropdown-item"
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

// Tooltip Component
function Tooltip({ children, text }) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div className="tooltip" role="tooltip">
          {text}
        </div>
      )}
    </div>
  );
}

// Pie Chart Component
function PieChart() {
  return (
    <div className="pie-chart" role="img" aria-label="Pie chart showing data distribution" />
  );
}

// Data Table Component
function DataTable({ data }) {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row._id || index}>
              {headers.map((header) => (
                <td key={`${row._id || index}-${header}`}>
                  {header === 'isActive' ? (
                    <span className={`badge ${row[header] ? 'badge-success' : 'badge-danger'}`}>
                      {row[header] ? 'Active' : 'Inactive'}
                    </span>
                  ) : (
                    String(row[header])
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Page Content Components
function MenuContent() {
  const [dialogText, setDialogText] = useState("OFF");

  return (
    <div>
      <h2 className="section-title">Menu</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <section>
          <span>This is menu content</span>
        </section>

        <section>
          <h3 style={{ marginBottom: '1rem', color: '#6b7280' }}>Select Input</h3>
          <SelectInput id="random" myList={["huh", "123", "ohh"]} />
        </section>

        <section>
          <h3 style={{ marginBottom: '1rem', color: '#6b7280' }}>Toggle Controls</h3>
          <Tooltip text={dialogText}>
            <AnimatedToggle
              id="menu-toggle"
              label="Feature"
              onChange={(state) => setDialogText(state)}
            />
          </Tooltip>
        </section>

        <section>
          <h3 style={{ marginBottom: '1rem', color: '#6b7280' }}>Data Visualization</h3>
          <PieChart />
        </section>

        <section>
          <h3 style={{ marginBottom: '1rem', color: '#6b7280' }}>Progress</h3>
          <ProgressBar value={0} max={100} label="Loading progress" />
        </section>
      </div>
    </div>
  );
}

function SettingsContent() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    console.log('Login attempt:', { username, password: '***' });
  };

  return (
    <div>
      <h2 className="section-title">Settings</h2>
      
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <Tooltip text="Enter your username">
            <input
              id="username"
              name="username"
              type="text"
              className="form-input"
              placeholder="Enter username"
              required
              aria-required="true"
            />
          </Tooltip>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <Tooltip text="Enter your password">
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              placeholder="Enter password"
              required
              aria-required="true"
            />
          </Tooltip>
        </div>

        <button type="submit" className="form-submit">
          Sign In
        </button>
      </form>
    </div>
  );
}

function HelpContent() {
  return (
    <div>
      <h2 className="section-title">Help Center</h2>
      <CardWrapper>
        <Card>
          How odd...
        </Card>
        <Card>
          How odd...huh....
        </Card>
        <Card>
          How odd... what chu mean how odd
        </Card>
        <Card>
          How odd...
        </Card>
        <Card>
          How odd...huh....
        </Card>
        <Card>
          How odd... what chu mean how odd
        </Card>
      </CardWrapper>
    </div>
  );
}

function FeaturedContent() {
  const exampleData = [
    {
      _id: "6551b94e3a4e9b0d6c8f9d0c",
      username: "CodeNinja123",
      role: "Developer",
      isActive: true
    },
    {
      _id: "6551b94e3a4e9b0d6c8f9d0d",
      username: "DesignGuru456",
      role: "Designer",
      isActive: false
    },
    {
      _id: "6551b94e3a4e9b0d6c8f9d0e",
      username: "DataMiner789",
      role: "Analyst",
      isActive: true
    },
    {
      _id: "6551b94e3a4e9b0d6c8f9d0f",
      username: "ProductPro101",
      role: "Manager",
      isActive: true
    },
    {
      _id: "6551b94e3a4e9b0d6c8f9d10",
      username: "QAExpert202",
      role: "QA Engineer",
      isActive: false
    }
  ];

  return (
    <div>
      <h2 className="section-title">User Database</h2>
      <DataTable data={exampleData} />
    </div>
  );
}

// Main App Component
export default function App() {
  const tabs = [
    { id: "menu", label: "Menu", content: <MenuContent /> },
    { id: "settings", label: "Settings", content: <SettingsContent /> },
    { id: "help", label: "Help", content: <HelpContent /> },
    { id: "featured", label: "Featured Content", content: <FeaturedContent /> },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="app-container">
      <Sidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <MainContentArea content={tabs[activeTab].content} />
    </div>
  );
}
