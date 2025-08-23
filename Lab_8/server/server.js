const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cron = require("node-cron");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com", "https://cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.github.com"]
    }
  }
}));

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);

// In-memory storage (In production, use a proper database)
let threatIntelligence = [];
let securityEvents = [];
let vulnerabilities = [];
let malwareSignatures = [];

// Initialize sample data
function initializeData() {
  // Sample threat intelligence data
  threatIntelligence = [
    {
      id: uuidv4(),
      ip: "192.168.1.100",
      type: "Malicious IP",
      severity: "High",
      source: "Internal Monitoring",
      description: "Suspicious network activity detected",
      timestamp: new Date().toISOString(),
      location: { lat: 37.7749, lng: -122.4194, country: "USA" }
    },
    {
      id: uuidv4(),
      ip: "10.0.0.50",
      type: "Botnet C&C",
      severity: "Critical",
      source: "Threat Feed",
      description: "Command and control server identified",
      timestamp: new Date().toISOString(),
      location: { lat: 51.5074, lng: -0.1278, country: "UK" }
    }
  ];

  // Sample security events
  securityEvents = [
    {
      id: uuidv4(),
      type: "Failed Login Attempt",
      severity: "Medium",
      source_ip: "203.0.113.5",
      target: "admin@company.com",
      timestamp: new Date().toISOString(),
      status: "Blocked"
    },
    {
      id: uuidv4(),
      type: "Malware Detection",
      severity: "High",
      source_ip: "198.51.100.23",
      target: "workstation-05",
      timestamp: new Date().toISOString(),
      status: "Quarantined"
    }
  ];

  // Sample vulnerabilities
  vulnerabilities = [
    {
      id: uuidv4(),
      cve: "CVE-2024-1234",
      severity: "Critical",
      score: 9.8,
      description: "Remote code execution in web server",
      affected_systems: ["web-server-01", "web-server-02"],
      status: "Open",
      discovered: new Date().toISOString()
    },
    {
      id: uuidv4(),
      cve: "CVE-2024-5678",
      severity: "High",
      score: 8.5,
      description: "SQL injection vulnerability in database",
      affected_systems: ["db-server-01"],
      status: "Patched",
      discovered: new Date().toISOString()
    }
  ];

  // Sample malware signatures
  malwareSignatures = [
    {
      id: uuidv4(),
      name: "Trojan.Win32.Agent",
      hash: "d41d8cd98f00b204e9800998ecf8427e",
      type: "Trojan",
      first_seen: new Date().toISOString(),
      last_seen: new Date().toISOString(),
      detections: 245
    },
    {
      id: uuidv4(),
      name: "Worm.Generic.Conficker",
      hash: "098f6bcd4621d373cade4e832627b4f6",
      type: "Worm",
      first_seen: new Date().toISOString(),
      last_seen: new Date().toISOString(),
      detections: 1023
    }
  ];
}

// API Routes

// Threat Intelligence API
app.get("/api/threats", (req, res) => {
  res.json({
    success: true,
    data: threatIntelligence,
    total: threatIntelligence.length
  });
});

app.post("/api/threats", (req, res) => {
  const threat = {
    id: uuidv4(),
    ...req.body,
    timestamp: new Date().toISOString()
  };
  threatIntelligence.push(threat);
  res.status(201).json({ success: true, data: threat });
});

// Security Events API
app.get("/api/events", (req, res) => {
  res.json({
    success: true,
    data: securityEvents,
    total: securityEvents.length
  });
});

app.post("/api/events", (req, res) => {
  const event = {
    id: uuidv4(),
    ...req.body,
    timestamp: new Date().toISOString()
  };
  securityEvents.push(event);
  res.status(201).json({ success: true, data: event });
});

// Vulnerabilities API
app.get("/api/vulnerabilities", (req, res) => {
  res.json({
    success: true,
    data: vulnerabilities,
    total: vulnerabilities.length
  });
});

app.post("/api/vulnerabilities", (req, res) => {
  const vulnerability = {
    id: uuidv4(),
    ...req.body,
    discovered: new Date().toISOString()
  };
  vulnerabilities.push(vulnerability);
  res.status(201).json({ success: true, data: vulnerability });
});

// Malware Signatures API
app.get("/api/malware", (req, res) => {
  res.json({
    success: true,
    data: malwareSignatures,
    total: malwareSignatures.length
  });
});

app.post("/api/malware", (req, res) => {
  const malware = {
    id: uuidv4(),
    ...req.body,
    first_seen: new Date().toISOString(),
    last_seen: new Date().toISOString()
  };
  malwareSignatures.push(malware);
  res.status(201).json({ success: true, data: malware });
});

// Dashboard Statistics API
app.get("/api/dashboard/stats", (req, res) => {
  const stats = {
    threats: {
      total: threatIntelligence.length,
      critical: threatIntelligence.filter(t => t.severity === "Critical").length,
      high: threatIntelligence.filter(t => t.severity === "High").length,
      medium: threatIntelligence.filter(t => t.severity === "Medium").length
    },
    events: {
      total: securityEvents.length,
      last_24h: securityEvents.filter(e => {
        const eventTime = new Date(e.timestamp);
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return eventTime > yesterday;
      }).length
    },
    vulnerabilities: {
      total: vulnerabilities.length,
      critical: vulnerabilities.filter(v => v.severity === "Critical").length,
      open: vulnerabilities.filter(v => v.status === "Open").length
    },
    malware: {
      total: malwareSignatures.length,
      detections: malwareSignatures.reduce((sum, m) => sum + m.detections, 0)
    }
  };
  
  res.json({ success: true, data: stats });
});

// Network Scan Simulation API
app.post("/api/scan/network", (req, res) => {
  const { target } = req.body;
  
  // Simulate network scan results
  const scanResults = {
    target: target || "192.168.1.0/24",
    scan_type: "Network Discovery",
    status: "Completed",
    hosts_discovered: Math.floor(Math.random() * 50) + 10,
    open_ports: [
      { port: 22, service: "SSH", status: "Open" },
      { port: 80, service: "HTTP", status: "Open" },
      { port: 443, service: "HTTPS", status: "Open" },
      { port: 3389, service: "RDP", status: "Filtered" }
    ],
    timestamp: new Date().toISOString()
  };
  
  res.json({ success: true, data: scanResults });
});

// Hash Analysis API
app.post("/api/analyze/hash", (req, res) => {
  const { hash } = req.body;
  
  // Simulate hash analysis
  const isKnownMalware = malwareSignatures.some(m => m.hash === hash);
  
  const analysis = {
    hash: hash,
    status: isKnownMalware ? "Malicious" : "Clean",
    detections: isKnownMalware ? Math.floor(Math.random() * 50) + 1 : 0,
    first_seen: isKnownMalware ? malwareSignatures.find(m => m.hash === hash).first_seen : null,
    threat_level: isKnownMalware ? "High" : "Low",
    timestamp: new Date().toISOString()
  };
  
  res.json({ success: true, data: analysis });
});

// Generate new threats periodically (simulate real-time monitoring)
cron.schedule("*/30 * * * * *", () => {
  if (threatIntelligence.length < 50) { // Limit to prevent memory issues
    const newThreat = {
      id: uuidv4(),
      ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      type: ["Malicious IP", "Botnet C&C", "Phishing", "Malware Distribution"][Math.floor(Math.random() * 4)],
      severity: ["Low", "Medium", "High", "Critical"][Math.floor(Math.random() * 4)],
      source: "Automated Detection",
      description: "Automatically detected suspicious activity",
      timestamp: new Date().toISOString(),
      location: {
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        country: ["USA", "China", "Russia", "Germany", "UK"][Math.floor(Math.random() * 5)]
      }
    };
    threatIntelligence.push(newThreat);
  }
});

// Initialize data on startup
initializeData();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔒 Cybersecurity Dashboard running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api/`);
});
