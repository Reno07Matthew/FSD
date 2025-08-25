export default function Services() {
  const services = [
    {
      title: "Web Development",
      description: "Custom web applications built with modern technologies like React, Next.js, and Node.js.",
      icon: "💻",
      features: ["Responsive Design", "Performance Optimization", "SEO Friendly", "Cross-browser Compatibility"],
      price: "Starting at $2,999"
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android devices.",
      icon: "📱",
      features: ["React Native", "Native iOS/Android", "App Store Deployment", "Push Notifications"],
      price: "Starting at $4,999"
    },
    {
      title: "E-commerce Solutions",
      description: "Complete e-commerce platforms with payment integration and inventory management.",
      icon: "🛒",
      features: ["Payment Gateway", "Inventory Management", "Order Tracking", "Admin Dashboard"],
      price: "Starting at $3,999"
    },
    {
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces designed with user experience in mind.",
      icon: "🎨",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      price: "Starting at $1,999"
    },
    {
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to grow your online presence.",
      icon: "📈",
      features: ["SEO Optimization", "Social Media Marketing", "Content Strategy", "Analytics & Reporting"],
      price: "Starting at $1,499"
    },
    {
      title: "Consulting",
      description: "Technical consulting and strategy development for your digital transformation.",
      icon: "💡",
      features: ["Technology Assessment", "Strategic Planning", "Architecture Design", "Team Training"],
      price: "Starting at $199/hour"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              We offer a comprehensive range of digital services to help your business thrive in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="text-4xl mb-4 text-center">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-green-600">{service.price}</span>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Get Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-lg text-gray-600">
              How we work with you to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Discovery</h3>
              <p className="text-gray-600">
                We start by understanding your business goals, target audience, and project requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Planning</h3>
              <p className="text-gray-600">
                We create detailed project plans, wireframes, and technical specifications.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Development</h3>
              <p className="text-gray-600">
                Our expert team brings your vision to life using cutting-edge technologies.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Launch</h3>
              <p className="text-gray-600">
                We deploy your project and provide ongoing support to ensure success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let&apos;s discuss how we can help bring your vision to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
