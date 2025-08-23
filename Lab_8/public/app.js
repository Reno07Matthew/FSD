// CyberSec Dashboard - Frontend JavaScript

// Global variables
let dashboardData = {};
let threatChart = null;
let eventsChart = null;
let attackTypesChart = null;
let geoChart = null;
let hourlyChart = null;
let trendChart = null;
let riskChart = null;
let trafficChart = null;
let protocolChart = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadDashboardData();
    setupEventListeners();
    
    // Refresh data every 30 seconds
    setInterval(loadDashboardData, 30000);
});

// Initialize the application
function initializeApp() {
    console.log('CyberSec Dashboard initialized');
    switchView('dashboard');
    initializeInteractiveElements();
    
    // Add welcome message
    setTimeout(() => {
        showSuccess('CyberSec Dashboard loaded successfully');
    }, 1000);
}

// Setup event listeners
function setupEventListeners() {
    // Network scan form
    document.getElementById('network-scan-form').addEventListener('submit', handleNetworkScan);
    
    // Hash analysis form
    document.getElementById('hash-analysis-form').addEventListener('submit', handleHashAnalysis);
    
    // Additional security tools
    document.getElementById('port-scan-form').addEventListener('submit', handlePortScan);
    document.getElementById('dns-lookup-form').addEventListener('submit', handleDnsLookup);
    document.getElementById('whois-form').addEventListener('submit', handleWhoisLookup);
}

// View switching functionality
function switchView(viewName) {
    // Hide all views
    const views = document.querySelectorAll('.view');
    views.forEach(view => view.classList.add('hidden'));
    
    // Show selected view
    document.getElementById(`${viewName}-view`).classList.remove('hidden');
    
    // Update navigation
    updateNavigation(viewName);
    
    // Load view-specific data
    loadViewData(viewName);
}

function updateNavigation(activeView) {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('bg-white', 'bg-opacity-20');
    });
    
    // Add active class to current button (simplified for demo)
    // In a real app, you'd match by data attributes or IDs
}

// Load view-specific data
function loadViewData(viewName) {
    switch(viewName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'threats':
            loadThreats();
            break;
        case 'vulnerabilities':
            loadVulnerabilities();
            break;
        case 'analytics':
            loadAnalyticsData();
            break;
        case 'network':
            loadNetworkData();
            break;
        case 'tools':
            // Tools view doesn't need initial data loading
            break;
    }
}

// Dashboard data loading
async function loadDashboardData() {
    try {
        // Show loading state
        showLoadingState();
        
        const response = await fetch('/api/dashboard/stats');
        const result = await response.json();
        
        if (result.success) {
            dashboardData = result.data;
            updateDashboardStats();
            updateCharts();
            loadRecentEvents();
            hideLoadingState();
        } else {
            showError('Failed to load dashboard data');
        }
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showError('Failed to load dashboard data');
        hideLoadingState();
    }
}

// Update dashboard statistics with animation
function updateDashboardStats() {
    if (!dashboardData) return;
    
    animateCounter('threats-count', dashboardData.threats.total);
    animateCounter('events-count', dashboardData.events.total);
    animateCounter('vulns-count', dashboardData.vulnerabilities.total);
    animateCounter('malware-count', dashboardData.malware.total);
}

// Animate counter numbers
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = parseInt(element.textContent) || 0;
    const duration = 1000; // 1 second
    const startTime = Date.now();
    
    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
        
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = targetValue.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Loading state functions
function showLoadingState() {
    const statsCards = document.querySelectorAll('.grid .card-hover');
    statsCards.forEach(card => {
        card.style.opacity = '0.6';
        card.style.pointerEvents = 'none';
    });
}

function hideLoadingState() {
    const statsCards = document.querySelectorAll('.grid .card-hover');
    statsCards.forEach(card => {
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
    });
}

// Update charts
function updateCharts() {
    // Wait for data to be available
    if (!dashboardData || !dashboardData.threats) {
        setTimeout(updateCharts, 500);
        return;
    }
    updateThreatChart();
    updateEventsChart();
    updateAttackTypesChart();
    updateGeoChart();
    updateHourlyChart();
}

function updateThreatChart() {
    const ctx = document.getElementById('threatChart');
    if (!ctx) return;
    
    const context = ctx.getContext('2d');
    
    if (threatChart) {
        threatChart.destroy();
    }
    
    const criticalCount = dashboardData.threats.critical || 0;
    const highCount = dashboardData.threats.high || 0;
    const mediumCount = dashboardData.threats.medium || 0;
    const totalCount = dashboardData.threats.total || 0;
    const lowCount = Math.max(0, totalCount - criticalCount - highCount - mediumCount);
    
    threatChart = new Chart(context, {
        type: 'doughnut',
        data: {
            labels: ['Critical', 'High', 'Medium', 'Low'],
            datasets: [{
                data: [criticalCount, highCount, mediumCount, lowCount],
                backgroundColor: [
                    '#ef4444', // red-500
                    '#f97316', // orange-500
                    '#eab308', // yellow-500
                    '#22c55e'  // green-500
                ],
                borderWidth: 3,
                borderColor: '#ffffff',
                hoverBorderWidth: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '50%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#374151',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 1000
            }
        }
    });
}

function updateEventsChart() {
    const ctx = document.getElementById('eventsChart');
    if (!ctx) return;
    
    const context = ctx.getContext('2d');
    
    if (eventsChart) {
        eventsChart.destroy();
    }
    
    // Generate realistic timeline data for the last 7 days
    const labels = [];
    const data = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        }));
        
        // Generate realistic data with some variation
        const baseEvents = 15;
        const variation = Math.floor(Math.random() * 20) - 10;
        data.push(Math.max(0, baseEvents + variation));
    }
    
    eventsChart = new Chart(context, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Security Events',
                data: data,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointHoverBackgroundColor: '#1d4ed8',
                pointHoverBorderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#374151',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        title: function(context) {
                            return `Events on ${context[0].label}`;
                        },
                        label: function(context) {
                            return `Events: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        stepSize: 5,
                        font: {
                            size: 11
                        }
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Additional chart functions
function updateAttackTypesChart() {
    const ctx = document.getElementById('attackTypesChart');
    if (!ctx) return;
    
    const context = ctx.getContext('2d');
    
    if (attackTypesChart) {
        attackTypesChart.destroy();
    }
    
    const attackTypes = ['DDoS', 'Malware', 'Phishing', 'SQL Injection', 'XSS', 'Brute Force'];
    const attackCounts = attackTypes.map(() => Math.floor(Math.random() * 50) + 10);
    
    attackTypesChart = new Chart(context, {
        type: 'bar',
        data: {
            labels: attackTypes,
            datasets: [{
                label: 'Attack Count',
                data: attackCounts,
                backgroundColor: [
                    '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'
                ],
                borderColor: [
                    '#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#2563eb', '#7c3aed'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });
}

function updateGeoChart() {
    const ctx = document.getElementById('geoChart');
    if (!ctx) return;
    
    const context = ctx.getContext('2d');
    
    if (geoChart) {
        geoChart.destroy();
    }
    
    const countries = ['USA', 'China', 'Russia', 'Germany', 'UK', 'France', 'Brazil', 'India'];
    const threatCounts = countries.map(() => Math.floor(Math.random() * 100) + 20);
    
    geoChart = new Chart(context, {
        type: 'doughnut',
        data: {
            labels: countries,
            datasets: [{
                data: threatCounts,
                backgroundColor: [
                    '#ef4444', '#f97316', '#eab308', '#22c55e', 
                    '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        font: {
                            size: 11
                        }
                    }
                }
            }
        }
    });
}

function updateHourlyChart() {
    const ctx = document.getElementById('hourlyChart');
    if (!ctx) return;
    
    const context = ctx.getContext('2d');
    
    if (hourlyChart) {
        hourlyChart.destroy();
    }
    
    const hours = Array.from({length: 24}, (_, i) => `${i}:00`);
    const activityData = hours.map(() => Math.floor(Math.random() * 30) + 5);
    
    hourlyChart = new Chart(context, {
        type: 'line',
        data: {
            labels: hours,
            datasets: [{
                label: 'Threat Activity',
                data: activityData,
                borderColor: '#f97316',
                backgroundColor: 'rgba(249, 115, 22, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 12
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
}


// Load recent events
async function loadRecentEvents() {
    try {
        const response = await fetch('/api/events');
        const result = await response.json();
        
        if (result.success) {
            displayRecentEvents(result.data.slice(0, 5)); // Show last 5 events
        }
    } catch (error) {
        console.error('Error loading recent events:', error);
    }
}

function displayRecentEvents(events) {
    const container = document.getElementById('recent-events');
    container.innerHTML = '';
    
    events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = `p-4 border rounded-lg ${getSeverityClass(event.severity)}`;
        eventDiv.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <h4 class="font-medium text-gray-900">${event.type}</h4>
                    <p class="text-sm text-gray-600">Source: ${event.source_ip} → Target: ${event.target}</p>
                    <p class="text-sm text-gray-500">${formatTimestamp(event.timestamp)}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="px-2 py-1 text-xs font-medium rounded-full ${getSeverityBadgeClass(event.severity)}">
                        ${event.severity}
                    </span>
                    <span class="px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(event.status)}">
                        ${event.status}
                    </span>
                </div>
            </div>
        `;
        container.appendChild(eventDiv);
    });
}

// Load threats
async function loadThreats() {
    try {
        const response = await fetch('/api/threats');
        const result = await response.json();
        
        if (result.success) {
            displayThreats(result.data);
        }
    } catch (error) {
        console.error('Error loading threats:', error);
        showError('Failed to load threat data');
    }
}

function displayThreats(threats) {
    const container = document.getElementById('threats-list');
    container.innerHTML = '';
    
    threats.forEach(threat => {
        const threatDiv = document.createElement('div');
        threatDiv.className = `p-4 border rounded-lg ${getSeverityClass(threat.severity)}`;
        threatDiv.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-2">
                        <h4 class="font-medium text-gray-900">${threat.type}</h4>
                        <span class="px-2 py-1 text-xs font-medium rounded-full ${getSeverityBadgeClass(threat.severity)}">
                            ${threat.severity}
                        </span>
                    </div>
                    <p class="text-sm text-gray-600 mb-1">IP Address: <code class="bg-gray-100 px-1 rounded">${threat.ip}</code></p>
                    <p class="text-sm text-gray-600 mb-1">Location: ${threat.location.country}</p>
                    <p class="text-sm text-gray-600 mb-1">Description: ${threat.description}</p>
                    <p class="text-xs text-gray-500">Source: ${threat.source} • ${formatTimestamp(threat.timestamp)}</p>
                </div>
                <div class="ml-4">
                    <i class="fas fa-globe text-gray-400"></i>
                </div>
            </div>
        `;
        container.appendChild(threatDiv);
    });
}

// Load vulnerabilities
async function loadVulnerabilities() {
    try {
        const response = await fetch('/api/vulnerabilities');
        const result = await response.json();
        
        if (result.success) {
            displayVulnerabilities(result.data);
        }
    } catch (error) {
        console.error('Error loading vulnerabilities:', error);
        showError('Failed to load vulnerability data');
    }
}

function displayVulnerabilities(vulnerabilities) {
    const container = document.getElementById('vulnerabilities-list');
    container.innerHTML = '';
    
    vulnerabilities.forEach(vuln => {
        const vulnDiv = document.createElement('div');
        vulnDiv.className = `p-4 border rounded-lg ${getSeverityClass(vuln.severity)}`;
        vulnDiv.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-2">
                        <h4 class="font-medium text-gray-900">${vuln.cve}</h4>
                        <span class="px-2 py-1 text-xs font-medium rounded-full ${getSeverityBadgeClass(vuln.severity)}">
                            ${vuln.severity}
                        </span>
                        <span class="px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(vuln.status)}">
                            ${vuln.status}
                        </span>
                    </div>
                    <p class="text-sm text-gray-600 mb-1">CVSS Score: <strong>${vuln.score}</strong></p>
                    <p class="text-sm text-gray-600 mb-2">${vuln.description}</p>
                    <p class="text-sm text-gray-600 mb-1">Affected Systems: ${vuln.affected_systems.join(', ')}</p>
                    <p class="text-xs text-gray-500">Discovered: ${formatTimestamp(vuln.discovered)}</p>
                </div>
            </div>
        `;
        container.appendChild(vulnDiv);
    });
}

// Network scan handler
async function handleNetworkScan(event) {
    event.preventDefault();
    
    const target = document.getElementById('scan-target').value;
    const resultsContainer = document.getElementById('scan-results');
    
    // Show loading state
    resultsContainer.innerHTML = '<div class="text-center py-4"><i class="fas fa-spinner fa-spin"></i> Scanning network...</div>';
    resultsContainer.classList.remove('hidden');
    
    try {
        const response = await fetch('/api/scan/network', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ target })
        });
        
        const result = await response.json();
        
        if (result.success) {
            displayScanResults(result.data);
        } else {
            showError('Scan failed');
        }
    } catch (error) {
        console.error('Error during network scan:', error);
        showError('Network scan failed');
    }
}

function displayScanResults(data) {
    const container = document.getElementById('scan-results');
    container.innerHTML = `
        <div class="bg-green-50 border border-green-200 rounded-md p-4">
            <h4 class="font-medium text-green-800 mb-2">Scan Completed</h4>
            <p class="text-sm text-green-700 mb-2">Target: ${data.target}</p>
            <p class="text-sm text-green-700 mb-3">Hosts discovered: ${data.hosts_discovered}</p>
            <div class="space-y-2">
                <h5 class="font-medium text-green-800">Open Ports:</h5>
                ${data.open_ports.map(port => `
                    <div class="flex justify-between text-sm text-green-700">
                        <span>Port ${port.port} (${port.service})</span>
                        <span class="font-medium">${port.status}</span>
                    </div>
                `).join('')}
            </div>
            <p class="text-xs text-green-600 mt-3">Scan completed at ${formatTimestamp(data.timestamp)}</p>
        </div>
    `;
}

// Hash analysis handler
async function handleHashAnalysis(event) {
    event.preventDefault();
    
    const hash = document.getElementById('hash-input').value.trim();
    const resultsContainer = document.getElementById('hash-results');
    
    if (!hash) {
        showError('Please enter a hash to analyze');
        return;
    }
    
    // Show loading state
    resultsContainer.innerHTML = '<div class="text-center py-4"><i class="fas fa-spinner fa-spin"></i> Analyzing hash...</div>';
    resultsContainer.classList.remove('hidden');
    
    try {
        const response = await fetch('/api/analyze/hash', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hash })
        });
        
        const result = await response.json();
        
        if (result.success) {
            displayHashResults(result.data);
        } else {
            showError('Hash analysis failed');
        }
    } catch (error) {
        console.error('Error during hash analysis:', error);
        showError('Hash analysis failed');
    }
}

function displayHashResults(data) {
    const container = document.getElementById('hash-results');
    const isMalicious = data.status === 'Malicious';
    const statusClass = isMalicious ? 'red' : 'green';
    const iconClass = isMalicious ? 'fa-exclamation-triangle' : 'fa-check-circle';
    
    container.innerHTML = `
        <div class="bg-${statusClass}-50 border border-${statusClass}-200 rounded-md p-4">
            <div class="flex items-center mb-3">
                <i class="fas ${iconClass} text-${statusClass}-600 text-xl mr-3"></i>
                <h4 class="font-medium text-${statusClass}-800">Analysis Complete</h4>
            </div>
            <div class="space-y-2">
                <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-${statusClass}-700">Hash:</span>
                    <code class="bg-gray-100 px-2 py-1 rounded text-xs text-gray-800 break-all">${data.hash.substring(0, 32)}${data.hash.length > 32 ? '...' : ''}</code>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-${statusClass}-700">Status:</span>
                    <span class="px-2 py-1 text-xs font-medium rounded-full ${isMalicious ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">${data.status}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-${statusClass}-700">Threat Level:</span>
                    <span class="text-sm text-${statusClass}-700 font-medium">${data.threat_level}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-${statusClass}-700">Detections:</span>
                    <span class="text-sm text-${statusClass}-700 font-bold">${data.detections}</span>
                </div>
                ${data.first_seen ? `
                <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-${statusClass}-700">First Seen:</span>
                    <span class="text-sm text-${statusClass}-700">${formatTimestamp(data.first_seen)}</span>
                </div>
                ` : ''}
            </div>
            <div class="mt-3 pt-3 border-t border-${statusClass}-200">
                <p class="text-xs text-${statusClass}-600">Analysis completed at ${formatTimestamp(data.timestamp)}</p>
            </div>
        </div>
    `;
}

// Utility functions
function getSeverityClass(severity) {
    switch(severity.toLowerCase()) {
        case 'critical': return 'threat-critical bg-red-50 border-red-200';
        case 'high': return 'threat-high bg-orange-50 border-orange-200';
        case 'medium': return 'threat-medium bg-yellow-50 border-yellow-200';
        case 'low': return 'threat-low bg-green-50 border-green-200';
        default: return 'bg-gray-50 border-gray-200';
    }
}

function getSeverityBadgeClass(severity) {
    switch(severity.toLowerCase()) {
        case 'critical': return 'bg-red-100 text-red-800';
        case 'high': return 'bg-orange-100 text-orange-800';
        case 'medium': return 'bg-yellow-100 text-yellow-800';
        case 'low': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

function getStatusBadgeClass(status) {
    switch(status.toLowerCase()) {
        case 'blocked': return 'bg-red-100 text-red-800';
        case 'quarantined': return 'bg-orange-100 text-orange-800';
        case 'open': return 'bg-red-100 text-red-800';
        case 'patched': return 'bg-green-100 text-green-800';
        case 'investigating': return 'bg-blue-100 text-blue-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

function formatTimestamp(timestamp) {
    return new Date(timestamp).toLocaleString();
}

function showError(message) {
    console.error(message);
    
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-exclamation-circle mr-2"></i>
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }
    }, 5000);
}

function showSuccess(message) {
    // Create success toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Real-time updates simulation
function simulateRealTimeUpdates() {
    // This would connect to WebSockets in a real application
    console.log('Real-time updates would be implemented here using WebSockets');
}

// Add pulse animation to active elements
function addPulseAnimation(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('pulse');
        setTimeout(() => {
            element.classList.remove('pulse');
        }, 2000);
    }
}

// Initialize tooltips and interactive elements
function initializeInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Add loading state to buttons
    const buttons = document.querySelectorAll('button[type="submit"]');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
            this.disabled = true;
            
            // Reset button after 3 seconds (if not already reset by form handler)
            setTimeout(() => {
                if (this.disabled) {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }
            }, 3000);
        });
    });
}

// Modal functions
function showDetailModal(type) {
    const modal = document.getElementById('detail-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');
    
    title.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Details`;
    
    // Generate detailed content based on type
    let detailContent = '';
    switch(type) {
        case 'threats':
            detailContent = generateThreatDetails();
            break;
        case 'events':
            detailContent = generateEventDetails();
            break;
        case 'vulnerabilities':
            detailContent = generateVulnDetails();
            break;
        case 'malware':
            detailContent = generateMalwareDetails();
            break;
    }
    
    content.innerHTML = detailContent;
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('detail-modal').classList.add('hidden');
}

function generateThreatDetails() {
    return `
        <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-red-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-red-800">Critical Threats</h4>
                    <p class="text-2xl font-bold text-red-600">5</p>
                    <p class="text-sm text-red-600">Immediate action required</p>
                </div>
                <div class="bg-orange-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-orange-800">High Priority</h4>
                    <p class="text-2xl font-bold text-orange-600">12</p>
                    <p class="text-sm text-orange-600">Review within 24h</p>
                </div>
                <div class="bg-yellow-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-yellow-800">Medium Risk</h4>
                    <p class="text-2xl font-bold text-yellow-600">23</p>
                    <p class="text-sm text-yellow-600">Monitor closely</p>
                </div>
            </div>
            <div class="mt-6">
                <h4 class="font-semibold mb-3">Recent Threat Indicators</h4>
                <div class="space-y-2">
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span>192.168.1.100 - Suspicious Activity</span>
                        <span class="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Critical</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span>10.0.0.50 - Malware Communication</span>
                        <span class="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">High</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateEventDetails() {
    return `
        <div class="space-y-4">
            <canvas id="modal-events-chart" width="400" height="200"></canvas>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 class="font-semibold mb-2">Event Categories</h4>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span>Login Attempts</span>
                            <span class="font-medium">245</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Malware Detection</span>
                            <span class="font-medium">67</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Network Anomalies</span>
                            <span class="font-medium">34</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 class="font-semibold mb-2">Response Actions</h4>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span>Blocked</span>
                            <span class="font-medium text-red-600">156</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Quarantined</span>
                            <span class="font-medium text-orange-600">89</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Allowed</span>
                            <span class="font-medium text-green-600">101</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateVulnDetails() {
    return `
        <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white">
                    <h4 class="font-semibold">Critical Vulnerabilities</h4>
                    <p class="text-2xl font-bold">3</p>
                    <p class="text-sm opacity-90">CVSS Score ≥ 9.0</p>
                </div>
                <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
                    <h4 class="font-semibold">Patch Coverage</h4>
                    <p class="text-2xl font-bold">87%</p>
                    <p class="text-sm opacity-90">Systems updated</p>
                </div>
            </div>
            <div class="space-y-3">
                <h4 class="font-semibold">Top Vulnerabilities</h4>
                <div class="space-y-2">
                    <div class="p-3 border border-red-200 rounded-lg bg-red-50">
                        <div class="flex justify-between items-start">
                            <div>
                                <h5 class="font-medium">CVE-2024-1234</h5>
                                <p class="text-sm text-gray-600">Remote code execution vulnerability</p>
                                <p class="text-xs text-gray-500">Affects: web-server-01, web-server-02</p>
                            </div>
                            <span class="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">9.8</span>
                        </div>
                    </div>
                    <div class="p-3 border border-orange-200 rounded-lg bg-orange-50">
                        <div class="flex justify-between items-start">
                            <div>
                                <h5 class="font-medium">CVE-2024-5678</h5>
                                <p class="text-sm text-gray-600">SQL injection vulnerability</p>
                                <p class="text-xs text-gray-500">Affects: db-server-01</p>
                            </div>
                            <span class="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">8.5</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateMalwareDetails() {
    return `
        <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-purple-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-purple-800">Total Signatures</h4>
                    <p class="text-2xl font-bold text-purple-600">15,847</p>
                </div>
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-blue-800">Detection Rate</h4>
                    <p class="text-2xl font-bold text-blue-600">99.2%</p>
                </div>
                <div class="bg-green-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-green-800">False Positives</h4>
                    <p class="text-2xl font-bold text-green-600">0.8%</p>
                </div>
            </div>
            <div>
                <h4 class="font-semibold mb-3">Recent Malware Families</h4>
                <div class="space-y-2">
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                            <span class="font-medium">Trojan.Win32.Agent</span>
                            <p class="text-sm text-gray-600">MD5: d41d8cd98f00b204e9800998ecf8427e</p>
                        </div>
                        <span class="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">245 detections</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                            <span class="font-medium">Worm.Generic.Conficker</span>
                            <p class="text-sm text-gray-600">SHA256: 098f6bcd4621d373cade4e832627b4f6</p>
                        </div>
                        <span class="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">1,023 detections</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Additional security tool handlers
async function handlePortScan(event) {
    event.preventDefault();
    const target = document.getElementById('port-target').value.trim();
    const resultsContainer = document.getElementById('port-results');
    
    if (!target) {
        showError('Please enter a target IP address');
        return;
    }
    
    resultsContainer.innerHTML = '<div class="text-center py-4"><i class="fas fa-spinner fa-spin"></i> Scanning ports...</div>';
    resultsContainer.classList.remove('hidden');
    
    // Simulate port scan results
    setTimeout(() => {
        const ports = [22, 80, 443, 21, 25, 53, 110, 143, 993, 995];
        const openPorts = ports.filter(() => Math.random() > 0.7);
        
        resultsContainer.innerHTML = `
            <div class="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h4 class="font-medium text-blue-800 mb-2">Port Scan Results</h4>
                <p class="text-sm text-blue-700 mb-2">Target: ${target}</p>
                <div class="space-y-1">
                    ${openPorts.map(port => `
                        <div class="text-sm text-blue-700">Port ${port}: <span class="font-medium text-green-600">Open</span></div>
                    `).join('')}
                    ${openPorts.length === 0 ? '<div class="text-sm text-blue-700">No open ports detected</div>' : ''}
                </div>
            </div>
        `;
        showSuccess('Port scan completed');
    }, 2000);
}

async function handleDnsLookup(event) {
    event.preventDefault();
    const target = document.getElementById('dns-target').value.trim();
    const resultsContainer = document.getElementById('dns-results');
    
    if (!target) {
        showError('Please enter a domain name');
        return;
    }
    
    resultsContainer.innerHTML = '<div class="text-center py-4"><i class="fas fa-spinner fa-spin"></i> Looking up DNS...</div>';
    resultsContainer.classList.remove('hidden');
    
    // Simulate DNS lookup results
    setTimeout(() => {
        resultsContainer.innerHTML = `
            <div class="bg-indigo-50 border border-indigo-200 rounded-md p-4">
                <h4 class="font-medium text-indigo-800 mb-2">DNS Lookup Results</h4>
                <div class="space-y-2 text-sm">
                    <div><strong>A Record:</strong> 192.0.2.1</div>
                    <div><strong>AAAA Record:</strong> 2001:db8::1</div>
                    <div><strong>MX Record:</strong> mail.${target}</div>
                    <div><strong>NS Record:</strong> ns1.${target}</div>
                </div>
            </div>
        `;
        showSuccess('DNS lookup completed');
    }, 1500);
}

async function handleWhoisLookup(event) {
    event.preventDefault();
    const target = document.getElementById('whois-target').value.trim();
    const resultsContainer = document.getElementById('whois-results');
    
    if (!target) {
        showError('Please enter a domain or IP address');
        return;
    }
    
    resultsContainer.innerHTML = '<div class="text-center py-4"><i class="fas fa-spinner fa-spin"></i> Looking up Whois...</div>';
    resultsContainer.classList.remove('hidden');
    
    // Simulate Whois lookup results
    setTimeout(() => {
        resultsContainer.innerHTML = `
            <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <h4 class="font-medium text-yellow-800 mb-2">Whois Information</h4>
                <div class="space-y-1 text-sm text-yellow-700">
                    <div><strong>Domain:</strong> ${target}</div>
                    <div><strong>Registrar:</strong> Example Registrar Inc.</div>
                    <div><strong>Created:</strong> 2020-01-15</div>
                    <div><strong>Expires:</strong> 2025-01-15</div>
                    <div><strong>Status:</strong> Active</div>
                </div>
            </div>
        `;
        showSuccess('Whois lookup completed');
    }, 1800);
}

// Analytics and Network view functions
function loadAnalyticsData() {
    // Load analytics-specific charts and data
    setTimeout(() => {
        updateTrendChart();
        updateRiskChart();
        loadAnalyticsTable();
    }, 500);
}

function loadNetworkData() {
    // Load network-specific charts and data
    setTimeout(() => {
        updateTrafficChart();
        updateProtocolChart();
    }, 500);
}

function updateTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;
    
    const context = ctx.getContext('2d');
    
    if (trendChart) {
        trendChart.destroy();
    }
    
    const days = Array.from({length: 30}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    
    const threatData = days.map(() => Math.floor(Math.random() * 100) + 50);
    
    trendChart = new Chart(context, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: 'Threats Detected',
                data: threatData,
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 10
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateRiskChart() {
    const ctx = document.getElementById('riskChart');
    if (!ctx) return;
    
    const context = ctx.getContext('2d');
    
    if (riskChart) {
        riskChart.destroy();
    }
    
    riskChart = new Chart(context, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Vulnerabilities',
                data: [
                    {x: 9.5, y: 8.5}, {x: 7.2, y: 6.1}, {x: 8.8, y: 9.2},
                    {x: 6.5, y: 4.3}, {x: 9.1, y: 7.8}, {x: 5.5, y: 3.2}
                ],
                backgroundColor: 'rgba(239, 68, 68, 0.6)',
                borderColor: '#ef4444'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'CVSS Score'
                    },
                    min: 0,
                    max: 10
                },
                y: {
                    title: {
                        display: true,
                        text: 'Exploitability'
                    },
                    min: 0,
                    max: 10
                }
            }
        }
    });
}

function updateTrafficChart() {
    const ctx = document.getElementById('trafficChart');
    if (!ctx) return;
    
    const context = ctx.getContext('2d');
    
    if (trafficChart) {
        trafficChart.destroy();
    }
    
    const hours = Array.from({length: 24}, (_, i) => `${i}:00`);
    const inbound = hours.map(() => Math.floor(Math.random() * 1000) + 500);
    const outbound = hours.map(() => Math.floor(Math.random() * 800) + 300);
    
    trafficChart = new Chart(context, {
        type: 'line',
        data: {
            labels: hours,
            datasets: [{
                label: 'Inbound',
                data: inbound,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                fill: true
            }, {
                label: 'Outbound',
                data: outbound,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 12
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'MB/s'
                    }
                }
            }
        }
    });
}

function updateProtocolChart() {
    const ctx = document.getElementById('protocolChart');
    if (!ctx) return;
    
    const context = ctx.getContext('2d');
    
    if (protocolChart) {
        protocolChart.destroy();
    }
    
    const protocols = ['HTTP/HTTPS', 'TCP', 'UDP', 'ICMP', 'SSH', 'FTP'];
    const usage = [45, 25, 15, 8, 4, 3];
    
    protocolChart = new Chart(context, {
        type: 'pie',
        data: {
            labels: protocols,
            datasets: [{
                data: usage,
                backgroundColor: [
                    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#f97316'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function loadAnalyticsTable() {
    const tableBody = document.getElementById('analytics-table');
    if (!tableBody) return;
    
    const data = [
        {type: 'DDoS Attack', count: 45, severity: 'High', trend: '↑ 12%'},
        {type: 'Malware', count: 23, severity: 'Critical', trend: '↓ 5%'},
        {type: 'Phishing', count: 67, severity: 'Medium', trend: '↑ 8%'},
        {type: 'Brute Force', count: 34, severity: 'High', trend: '→ 0%'},
        {type: 'SQL Injection', count: 12, severity: 'Critical', trend: '↓ 15%'}
    ];
    
    tableBody.innerHTML = data.map(item => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${item.type}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.count}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityBadgeClass(item.severity)}">
                    ${item.severity}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.trend}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button class="text-indigo-600 hover:text-indigo-900">Investigate</button>
            </td>
        </tr>
    `).join('');
}
