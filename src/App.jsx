import { useState, useEffect } from 'react';

// Main App component containing the entire portfolio
export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle page change with a transition
  const handlePageChange = (newPage) => {
    if (newPage === activePage || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActivePage(newPage);
      setIsTransitioning(false);
    }, 300); // Wait for the fade-out animation to complete
  };
  
  // Contact Modal component
  const ContactModal = () => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
      const email = "judenotabol3@gmail.com"; // Replace with your actual email
      const subject = "Message from your portfolio";
      const body = `Hi John David,\n\n${message}\n\nSent from your portfolio website.`;
      
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      setIsModalOpen(false); // Close the modal after user interaction
    };

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-white">Contact Me</h3>
            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2003/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          <p className="text-gray-400 mb-4">
            For security reasons, this will open a new email draft for you to send.
          </p>
          <textarea
            className="w-full h-32 p-4 bg-gray-700 rounded-md text-white border-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            onClick={handleSendMessage}
            className="w-full mt-4 py-3 px-6 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition-colors duration-300"
          >
            Send Message
          </button>
        </div>
      </div>
    );
  };
  
  // Hero/Home Section component
  const HeroSection = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(150 - Math.random() * 100);
    const [cursorVisible, setCursorVisible] = useState(true);

    const toRotate = ["Hello, I'm JD.", "An IT Services Graduate."];
    const period = 2000;

    useEffect(() => {
      let ticker = setInterval(() => {
        tick();
      }, delta);

      // Blinking cursor effect
      let cursorTicker = setInterval(() => {
        setCursorVisible(prev => !prev);
      }, 500);

      return () => {
        clearInterval(ticker);
        clearInterval(cursorTicker);
      };
    }, [text, delta]);

    const tick = () => {
      let i = loopNum % toRotate.length;
      let fullText = toRotate[i];
      let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) {
        setDelta(prevDelta => prevDelta / 2);
      }

      if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setDelta(period);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(150 - Math.random() * 100);
      }
    };
    
    return (
      <section className="container mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center justify-center text-center md:text-left relative min-h-screen">
        
        {/* Left side: Photo with updated styles */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end z-10 relative">
          <div className="relative w-full h-auto max-w-2xl">
            <img
              src="/Portfolio-Photo.png"
              alt="John David Lobaton"
              className="w-full h-auto rounded-lg shadow-2xl animate-fade-in-left transition-transform duration-100 ease-out"
            />
          </div>
        </div>
        
        {/* Text content on the right, takes up half the screen on desktop */}
        <div className="w-full md:w-1/2 md:max-w-xl md:ml-16 mt-8 md:mt-0 animate-fade-in-right z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white">
            {text}
            <span className={`align-top inline-block w-1.5 h-10 ml-1 bg-white transition-opacity duration-300 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light mt-4">
            IT Services Student | Full Stack Developer
          </p>
          <p className="text-lg md:text-xl text-gray-400 font-light mt-4">
            A motivated IT professional with a knack for troubleshooting and problem-solving. Eager to apply academic knowledge to real-world challenges.
          </p>
          <div className="flex justify-center md:justify-start space-x-6 pt-6">
            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/john-david-lobaton-940893322/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors duration-300 transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* GitHub Icon */}
            <a
              href="https://github.com/JD-gif"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-100 transition-colors duration-300 transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.21c2.8.35 5.8-1.4 5.8-6.6a4.5 4.5 0 0 0-1.2-3.16 4.2 4.2 0 0 0-.08-3.52s-.7-3.12-3.2-1.31c-.5-.15-1.03-.23-1.57-.23A12.4 12.4 0 0 0 9 2c-2.4 1.8-3.2 1.3-3.2 1.3a4.2 4.2 0 0 0-.08 3.52c-.4 1.3-.6 2.5-1.2 3.16-2.8 5.2-1.4 6.9 1.4 6.6A4.8 4.8 0 0 0 14 18v4" />
              <path d="M18 10a4.5 4.5 0 0 1-1.2 3.16c-2.8 5.2-1.4 6.9 1.4 6.6a4.8 4.8 0 0 0-1-3.21c2.8.35 5.8-1.4 5.8-6.6a4.5 4.5 0 0 0-1.2-3.16 4.2 4.2 0 0 0-.08-3.52s-.7-3.12-3.2-1.31" />
              </svg>
            </a>
            {/* Resume and Contact Me Buttons */}
            <a
              href="/Resume.pdf" // This is the public path to your resume file
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition-colors duration-300"
              download="John-David-Lobaton-Resume.pdf"
            >
              View My Resume
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition-colors duration-300 animate-[pulse_2s_infinite]"
            >
              Contact Me
            </button>
          </div>
        </div>
      </section>
    );
  };

  // Projects Section component
  const ProjectsSection = () => (
    <section className="container mx-auto px-4 md:px-8 py-20 md:py-32">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-purple-400">
        My Projects
      </h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Hero Project: CI/CD Pipeline for Secure Microservices Deployment */}
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
          <a
            href="https://github.com/your-ci-cd-project"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/pipeline.jpg"
              alt="CI/CD Pipeline Project"
              className="w-full h-auto object-cover"
            />
          </a>
        </div>
        <div className="space-y-6">
          <h3 className="text-3xl font-semibold text-white">
            CI/CD Pipeline for Secure Microservices Deployment
          </h3>
          <p className="text-gray-300 text-lg">
            This project demonstrates my ability to build a robust, scalable, and resilient e-commerce platform using a modern microservices architecture and a fully automated CI/CD pipeline. It showcases my practical skills in cloud deployment, container orchestration, and version control.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full">
              React
            </span>
            <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full">
              Python (Flask)
            </span>
            <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full">
              MongoDB
            </span>
            <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full">
              Docker
            </span>
            <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full">
              AWS EC2
            </span>
            <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full">
              CI/CD
            </span>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com/your-ci-cd-project"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition-colors duration-300"
            >
              View on GitHub
            </a>
            <a
              href="https://your-ci-cd-demo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-700 text-gray-200 font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300"
            >
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );

  // About Me Section component
  const AboutSection = () => (
    <section className="container mx-auto px-4 md:px-8 py-20 md:py-32">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-purple-400">
        About Me
      </h2>
      <div className="max-w-4xl mx-auto text-lg text-gray-300 space-y-4">
        <p>
          Hello! My name is John David Lobaton, and I'm a recent graduate with a Diploma in IT Services from the Southern Alberta Institute of Technology (SAIT). My academic background has given me a solid foundation in enterprise networking, server administration, virtualization, and IT security.
        </p>
        <p>
          While my formal work experience is in customer service, I've honed my technical skills through coursework and personal projects. I thrive on solving complex technical problems and am always eager to learn new technologies and collaborate with others to find the best solutions. This portfolio is a testament to my commitment to putting that knowledge into practice and my passion for building robust, real-world applications.
        </p>
      </div>
    </section>
  );

  // Skills Section component
  const SkillsSection = () => (
    <section className="container mx-auto px-4 md:px-8 py-20 md:py-32">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-purple-400">
        Technical Skills
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Networking Skills */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl transition-transform duration-200 hover:scale-105 hover:bg-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-white">Networking</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>Enterprise Networking</li>
            <li>Routing & Switching</li>
            <li>Wireless Networking</li>
          </ul>
        </div>
        {/* Systems & Virtualization Skills */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl transition-transform duration-200 hover:scale-105 hover:bg-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-white">Systems & Virtualization</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>Server Admin</li>
            <li>Cloud Computing</li>
            <li>Virtualization</li>
          </ul>
        </div>
        {/* IT Security Skills */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl transition-transform duration-200 hover:scale-105 hover:bg-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-white">IT Security</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>Security Principles</li>
            <li>Network Security</li>
          </ul>
        </div>
        {/* Programming & Scripting Skills */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl transition-transform duration-200 hover:scale-105 hover:bg-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-white">Programming & Scripting</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>OOP</li>
            <li>Automation</li>
            <li>Git</li>
          </ul>
        </div>
      </div>
    </section>
  );

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HeroSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'about':
        return <AboutSection />;
      case 'skills':
        return <SkillsSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col font-sans antialiased relative">
      {/* Animated Background and Particles */}
      <div className="absolute inset-0 z-0 opacity-80"
          style={{
            background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
            animation: 'fadeIn 1s forwards'
          }}
        >
        </div>
        
        {/* Particle Effect Overlay */}
        <div className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 10px 10px, #fff, rgba(255, 255, 255, 0)),
              radial-gradient(2px 2px at 30px 20px, #ccc, rgba(204, 204, 204, 0)),
              radial-gradient(2px 2px at 50px 50px, #eee, rgba(238, 238, 238, 0)),
              radial-gradient(2px 2px at 80px 30px, #bbb, rgba(187, 187, 187, 0))
            `,
            backgroundSize: '100px 100px',
            animation: 'starfield 120s linear infinite'
          }}
        ></div>
        
        <style>
          {`
            @keyframes starfield {
              from { background-position: 0 0; }
              to { background-position: 10000px 5000px; }
            }
          `}
        </style>

      {/* Navbar - Fixed at the top for easy navigation */}
      <nav className="fixed w-full z-20 top-0 left-0 bg-gray-950 bg-opacity-80 backdrop-blur-sm shadow-xl p-4 transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center">
          <a
            href="#home"
            className="text-2xl font-bold text-purple-400 hover:scale-105 transition-transform duration-300"
            onClick={() => handlePageChange('home')}
          >
            John David Lobaton
          </a>
          <ul className="flex space-x-6 md:space-x-10">
            <li>
              <button
                onClick={() => handlePageChange('home')}
                className={`group text-lg transition-colors duration-300 hover:text-purple-400 font-semibold relative ${
                  activePage === 'home' ? 'text-purple-400' : ''
                }`}
              >
                Home
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-purple-400 transition-transform duration-300 transform ${activePage === 'home' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePageChange('projects')}
                className={`group text-lg transition-colors duration-300 hover:text-purple-400 font-semibold relative ${
                  activePage === 'projects' ? 'text-purple-400' : ''
                }`}
              >
                Projects
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-purple-400 transition-transform duration-300 transform ${activePage === 'projects' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePageChange('about')}
                className={`group text-lg transition-colors duration-300 hover:text-purple-400 font-semibold relative ${
                  activePage === 'about' ? 'text-purple-400' : ''
                }`}
              >
                About
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-purple-400 transition-transform duration-300 transform ${activePage === 'about' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePageChange('skills')}
                className={`group text-lg transition-colors duration-300 hover:text-purple-400 font-semibold relative ${
                  activePage === 'skills' ? 'text-purple-400' : ''
                }`}
              >
                Skills
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-purple-400 transition-transform duration-300 transform ${activePage === 'skills' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="pt-20 flex-grow z-10 relative">
        <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {renderPage()}
        </div>
      </main>
      
      {isModalOpen && <ContactModal />}

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-500 py-8 text-center text-sm z-10 relative">
        <p>Designed and Built by John David Lobaton</p>
      </footer>
    </div>
  );
}
