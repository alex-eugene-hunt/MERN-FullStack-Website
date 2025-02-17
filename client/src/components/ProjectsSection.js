import React, { useState, useEffect } from 'react';
import { FaGithub, FaCalendar, FaLink, FaCode, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

function ProjectsSection() {
  const [openProject, setOpenProject] = useState(null);
  const [readmeContents, setReadmeContents] = useState({});

  const projects = [
    {
      title: 'Full-Stack (MERN) Personal Website',
      period: 'Jan 2025 - Present',
      website: 'www.alex-eugene-hunt.rocks',
      github: 'https://github.com/alex-eugene-hunt/MERN-FullStack-Website',
      description: [
        'Personal website created from scratch using Mongo, Express, React, and Node.js.',
        'Fine-tuned local LLM to answer personal questions about myself that users may want to know.',
        'Implemented nodemailer to create an email sending form to allow users to easily send me an email.',
        'Utilized MongoDB to include a playable Asteroids game that keeps a global leaderboard.'
      ],
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'LLM', 'Nodemailer']
    },
    {
      title: 'Meteorite Landings Data Mining Application',
      period: 'Aug 2024 - Dec 2024',
      organization: 'University of Oklahoma',
      github: 'https://github.com/alex-eugene-hunt/Meteorite-Landings-Application',
      description: [
        'Developed a Python-based data mining application with advanced machine learning algorithms.',
        'Enabled accurate classification, discovering geographical hotspots for further scientific research.',
        'Needed to visualize and interpret meteorite distribution for non-technical stakeholders.',
        'Created clustering models leveraging coordinates and built a GUI for easy data exploration.'
      ],
      technologies: ['Python', 'Machine Learning', 'Data Mining', 'GUI Development', 'Data Visualization']
    },
    {
      title: 'ML Drone Flights',
      period: 'May 2024 - Aug 2024',
      github: 'https://github.com/alex-eugene-hunt/ML-Drone-Flights',
      description: [
        'Developed machine learning models to optimize drone flight paths and improve efficiency.',
        'Implemented computer vision algorithms for obstacle detection and navigation.',
        'Created a simulation environment for testing and training drone flight patterns.',
        'Achieved 30% improvement in flight efficiency through ML-optimized path planning.'
      ],
      technologies: ['Python', 'TensorFlow', 'Computer Vision', 'Drone API', 'Simulation']
    },
    {
      title: 'Diabetes Detection',
      period: 'Mar 2024 - May 2024',
      github: 'https://github.com/alex-eugene-hunt/Diabetes-Detection',
      description: [
        'Built a machine learning model to predict diabetes risk using patient health data.',
        'Implemented feature selection and preprocessing techniques to improve model accuracy.',
        'Developed a user-friendly web interface for healthcare professionals.',
        'Achieved 92% accuracy in early diabetes detection.'
      ],
      technologies: ['Python', 'Scikit-learn', 'Flask', 'Healthcare Analytics', 'Data Preprocessing']
    },
    {
      title: 'Stroke Prediction',
      period: 'Jan 2024 - Mar 2024',
      github: 'https://github.com/alex-eugene-hunt/Stroke-Prediction',
      description: [
        'Created a neural network model for early stroke prediction using patient data.',
        'Implemented data balancing techniques to handle imbalanced medical datasets.',
        'Developed visualization tools for model interpretation.',
        'Achieved 88% sensitivity in identifying high-risk patients.'
      ],
      technologies: ['Python', 'TensorFlow', 'Neural Networks', 'Medical Data Analysis', 'Data Visualization']
    },
    {
      title: 'Remote Controlled Timer',
      period: 'Nov 2023 - Dec 2023',
      github: 'https://github.com/alex-eugene-hunt/Arduino-RemoteControlTimer',
      description: [
        'Designed and built a remote-controlled timer system using Arduino.',
        'Implemented wireless communication protocols for remote operation.',
        'Created a mobile app interface for timer control.',
        'Added features for multiple timer presets and scheduling.'
      ],
      technologies: ['Arduino', 'C++', 'Mobile App Development', 'Wireless Communication', 'IoT']
    },
    {
      title: 'Frozen Lake with Reinforcement Learning',
      period: 'Sep 2023 - Oct 2023',
      github: 'https://github.com/alex-eugene-hunt/FrozenLake-ReinforcementLearning',
      description: [
        'Developed a machine learning model to predict sports game scores.',
        'Implemented data scraping to collect historical game data.',
        'Created an automated pipeline for model training and updating.',
        'Achieved 75% accuracy in predicting game outcomes.'
      ],
      technologies: ['Python', 'Machine Learning', 'Web Scraping', 'Data Analysis', 'Automation']
    },
    {
      title: 'Score Prediction',
      period: 'Sep 2023 - Oct 2023',
      github: 'https://github.com/alex-eugene-hunt/College-Football-Score-Prediction',
      description: [
        'Developed a machine learning model to predict sports game scores.',
        'Implemented data scraping to collect historical game data.',
        'Created an automated pipeline for model training and updating.',
        'Achieved 75% accuracy in predicting game outcomes.'
      ],
      technologies: ['Python', 'Machine Learning', 'Web Scraping', 'Data Analysis', 'Automation']
    },
    {
      title: 'TurtleBot with Artificial Intelligence',
      period: 'Jul 2023 - Aug 2023',
      github: 'https://github.com/alex-eugene-hunt/Turtle-Bot-Robotics',
      description: [
        'Programmed a TurtleBot for autonomous navigation and mapping.',
        'Implemented SLAM algorithms for real-time mapping.',
        'Developed obstacle avoidance and path planning algorithms.',
        'Created a user interface for robot control and monitoring.'
      ],
      technologies: ['ROS', 'Python', 'SLAM', 'Robotics', 'Navigation Algorithms']
    }
  ];

  const fetchReadmeContent = async (github) => {
    try {
      // Extract owner and repo from GitHub URL
      const [, , , owner, repo] = github.split('/');
      const apiUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`;
      
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('README not found');
      
      const content = await response.text();
      setReadmeContents(prev => ({ ...prev, [github]: content }));
    } catch (error) {
      console.error('Error fetching README:', error);
      setReadmeContents(prev => ({ ...prev, [github]: 'README not found' }));
    }
  };

  const toggleProject = (github) => {
    if (openProject === github) {
      setOpenProject(null);
    } else {
      setOpenProject(github);
      if (!readmeContents[github]) {
        fetchReadmeContent(github);
      }
    }
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.github} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div 
                className="p-6 cursor-pointer flex justify-between items-center"
                onClick={() => toggleProject(project.github)}
              >
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span className="flex items-center">
                      <FaCalendar className="mr-2" />
                      {project.period}
                    </span>
                    {project.website && (
                      <a href={project.website} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600">
                        <FaLink className="mr-2" />
                        Website
                      </a>
                    )}
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600">
                      <FaGithub className="mr-2" />
                      GitHub
                    </a>
                  </div>
                </div>
                {openProject === project.github ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              
              {openProject === project.github && (
                <div className="p-6 border-t">
                  {readmeContents[project.github] ? (
                    <div className="prose max-w-none">
                      <ReactMarkdown>{readmeContents[project.github]}</ReactMarkdown>
                    </div>
                  ) : (
                    <div className="text-center py-4">Loading README...</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
