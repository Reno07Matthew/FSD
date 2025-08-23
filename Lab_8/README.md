# CyberSec Dashboard - Full-Stack Cybersecurity Application

A comprehensive cybersecurity monitoring and threat intelligence dashboard built with Node.js, Express.js, HTML5, and Tailwind CSS.

## 🔒 Features

### Dashboard Overview
- Real-time security statistics and metrics
- Interactive charts for threat severity distribution
- Security events timeline visualization
- Recent activity monitoring

### Threat Intelligence
- Live threat indicator feeds
- Malicious IP tracking with geolocation
- Threat severity classification (Critical, High, Medium, Low)
- Automated threat detection and alerting

### Vulnerability Management
- CVE tracking and management
- CVSS score integration
- Affected systems monitoring
- Vulnerability status tracking (Open, Patched, etc.)

### Security Tools
- **Network Scanner**: Discover hosts and open ports on target networks
- **Hash Analyzer**: Analyze file hashes for malware detection
- **Real-time Monitoring**: Automated threat detection with cron jobs

### Security Features
- Helmet.js for security headers
- Rate limiting protection
- Input validation and sanitization
- CORS configuration
- Content Security Policy (CSP)

## 🛠 Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **Express Rate Limit**: API rate limiting
- **Node-cron**: Scheduled tasks
- **UUID**: Unique identifier generation

### Frontend
- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: Interactive data visualization
- **Font Awesome**: Icon library
- **Vanilla JavaScript**: No framework dependencies

### Security Libraries
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token handling

## 📁 Project Structure

```
Lab_8/
├── server/
│   └── server.js          # Express server with REST API
├── public/
│   ├── index.html         # Main dashboard interface
│   └── app.js            # Frontend JavaScript
├── package.json          # Dependencies and scripts
├── .env                  # Environment variables
└── README.md            # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd Lab_8
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Edit the `.env` file and update the configuration values as needed.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Access the dashboard:**
   Open your browser and navigate to `http://localhost:3000`

## 📊 API Endpoints

### Threat Intelligence
- `GET /api/threats` - Retrieve all threat indicators
- `POST /api/threats` - Add new threat indicator

### Security Events
- `GET /api/events` - Retrieve security events
- `POST /api/events` - Add new security event

### Vulnerabilities
- `GET /api/vulnerabilities` - Retrieve vulnerabilities
- `POST /api/vulnerabilities` - Add new vulnerability

### Malware Signatures
- `GET /api/malware` - Retrieve malware signatures
- `POST /api/malware` - Add new malware signature

### Dashboard Statistics
- `GET /api/dashboard/stats` - Get dashboard overview statistics

### Security Tools
- `POST /api/scan/network` - Perform network scan
- `POST /api/analyze/hash` - Analyze file hash

## 🔧 Configuration

### Environment Variables

```env
PORT=3000                           # Server port
NODE_ENV=development               # Environment mode
JWT_SECRET=your-jwt-secret         # JWT secret key
BCRYPT_ROUNDS=12                   # Bcrypt hashing rounds
RATE_LIMIT_WINDOW_MS=900000       # Rate limit window (15 minutes)
RATE_LIMIT_MAX_REQUESTS=100       # Max requests per window
LOG_LEVEL=info                     # Logging level
```

### Security Headers
The application uses Helmet.js to set security headers including:
- Content Security Policy (CSP)
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection

## 🎯 Usage Examples

### Adding a New Threat Indicator
```javascript
fetch('/api/threats', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        ip: '192.168.1.100',
        type: 'Malicious IP',
        severity: 'High',
        description: 'Suspicious network activity detected'
    })
});
```

### Performing a Network Scan
```javascript
fetch('/api/scan/network', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        target: '192.168.1.0/24'
    })
});
```

## 🚨 Security Considerations

1. **Rate Limiting**: API endpoints are protected with rate limiting
2. **Input Validation**: All user inputs should be validated
3. **Authentication**: Implement JWT-based authentication for production
4. **HTTPS**: Use HTTPS in production environments
5. **Database Security**: Use parameterized queries to prevent SQL injection
6. **Environment Variables**: Never commit sensitive data to version control

## 🔄 Real-time Updates

The dashboard automatically refreshes data every 30 seconds. For production environments, consider implementing WebSockets for real-time updates:

```javascript
// WebSocket implementation example
const ws = new WebSocket('ws://localhost:3000');
ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    updateDashboard(data);
};
```

## 📈 Monitoring & Logging

- Server logs include timestamp, IP address, and request details
- Error handling with appropriate HTTP status codes
- Performance monitoring for API response times
- Security event logging for audit trails

## 🧪 Testing

### Manual Testing
1. Access the dashboard at `http://localhost:3000`
2. Navigate through different views (Dashboard, Threats, Vulnerabilities, Tools)
3. Test the network scanner with different target networks
4. Test the hash analyzer with sample file hashes

### API Testing
Use tools like Postman or curl to test API endpoints:

```bash
# Get threat statistics
curl -X GET http://localhost:3000/api/dashboard/stats

# Add a new threat
curl -X POST http://localhost:3000/api/threats \
  -H "Content-Type: application/json" \
  -d '{"ip":"10.0.0.1","type":"Malicious IP","severity":"High"}'
```

## 🚀 Deployment

### Production Deployment
1. Set `NODE_ENV=production` in environment variables
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server/server.js --name "cybersec-dashboard"
   ```
3. Configure reverse proxy with Nginx
4. Set up SSL/TLS certificates
5. Configure firewall rules

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server/server.js"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This application is for educational and demonstration purposes only. Do not use in production environments without proper security auditing and testing.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for cybersecurity education and awareness**
