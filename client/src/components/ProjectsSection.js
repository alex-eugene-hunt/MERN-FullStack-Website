import React, { useState } from 'react';
import { FaGithub, FaCalendar, FaLink, FaChevronDown, FaChevronUp } from 'react-icons/fa';
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
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'LLM', 'Nodemailer']
    },
    {
      title: 'Meteorite Landings Data Mining Application',
      period: 'Aug 2024 - Dec 2024',
      organization: 'University of Oklahoma',
      github: 'https://github.com/alex-eugene-hunt/Meteorite-Landings-Application',
      technologies: ['Python', 'Machine Learning', 'Data Mining', 'GUI Development', 'Data Visualization']
    },
    {
      title: 'ML Drone Flights',
      period: 'May 2024 - Aug 2024',
      github: 'https://github.com/alex-eugene-hunt/ML-Drone-Flights',
      technologies: ['Python', 'TensorFlow', 'Computer Vision', 'Drone API', 'Simulation']
    },
    {
      title: 'Diabetes Detection',
      period: 'Mar 2024 - May 2024',
      github: 'https://github.com/alex-eugene-hunt/Diabetes-Detection',
      technologies: ['Python', 'Scikit-learn', 'Flask', 'Healthcare Analytics', 'Data Preprocessing']
    },
    {
      title: 'Stroke Prediction',
      period: 'Jan 2024 - Mar 2024',
      github: 'https://github.com/alex-eugene-hunt/Stroke-Prediction',
      technologies: ['Python', 'TensorFlow', 'Neural Networks', 'Medical Data Analysis', 'Data Visualization']
    },
    {
      title: 'Remote Controlled Timer',
      period: 'Nov 2023 - Dec 2023',
      github: 'https://github.com/alex-eugene-hunt/Arduino-RemoteControlTimer',
      technologies: ['Arduino', 'C++', 'Mobile App Development', 'Wireless Communication', 'IoT']
    },
    {
      title: 'Frozen Lake with Reinforcement Learning',
      period: 'Sep 2023 - Oct 2023',
      github: 'https://github.com/alex-eugene-hunt/FrozenLake-ReinforcementLearning',
      technologies: ['Python', 'Machine Learning', 'Web Scraping', 'Data Analysis', 'Automation']
    },
    {
      title: 'Score Prediction',
      period: 'Sep 2023 - Oct 2023',
      github: 'https://github.com/alex-eugene-hunt/College-Football-Score-Prediction',
      technologies: ['Python', 'Machine Learning', 'Data Analysis', 'Web Scraping', 'Automation']
    },
    {
      title: 'TurtleBot with Artificial Intelligence',
      period: 'Jul 2023 - Aug 2023',
      github: 'https://github.com/alex-eugene-hunt/Turtle-Bot-Robotics',
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
                className="p-6 cursor-pointer"
                onClick={() => toggleProject(project.github)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                    <div className="flex items-center space-x-4 text-gray-600 mb-4">
                      <span className="flex items-center">
                        <FaCalendar className="mr-2" />
                        {project.period}
                      </span>
                      {project.website && (
                        <a 
                          href={`https://${project.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center hover:text-blue-600"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaLink className="mr-2" />
                          Website
                        </a>
                      )}
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center hover:text-blue-600"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub className="mr-2" />
                        GitHub
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4">
                    {openProject === project.github ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>
              </div>
              
              {openProject === project.github && (
                <div className="p-6 border-t bg-gray-50">
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
