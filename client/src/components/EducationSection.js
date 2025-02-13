import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';

function EducationSection() {
  const education = [
    {
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science in Computer Science',
      period: '2019 - 2023',
      description: 'Focused on software engineering, artificial intelligence, and data science.',
      achievements: [
        'GPA: 3.8/4.0',
        'Dean\'s List: All semesters',
        'Senior Thesis: Machine Learning Applications in Portfolio Management'
      ],
      courses: [
        'Advanced Algorithms',
        'Machine Learning',
        'Database Systems',
        'Computer Networks',
        'Software Engineering'
      ]
    },
    // Add more education entries as needed
  ];

  return (
    <div>
      <div className="section-header">Education</div>
      <section id="education" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.timeline}>
            {education.map((edu, index) => (
              <div key={index} style={styles.educationCard}>
                <div style={styles.iconContainer}>
                  <FaGraduationCap style={styles.icon} />
                </div>
                <div style={styles.content}>
                  <h3 style={styles.school}>{edu.school}</h3>
                  <h4 style={styles.degree}>{edu.degree}</h4>
                  <p style={styles.period}>{edu.period}</p>
                  <p style={styles.description}>{edu.description}</p>
                  
                  <div style={styles.achievementsContainer}>
                    <h5 style={styles.subheading}>Achievements</h5>
                    <ul style={styles.list}>
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} style={styles.listItem}>{achievement}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={styles.coursesContainer}>
                    <h5 style={styles.subheading}>Key Courses</h5>
                    <div style={styles.coursesList}>
                      {edu.courses.map((course, i) => (
                        <span key={i} style={styles.courseTag}>{course}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  section: {
    backgroundColor: '#d4996f',
    padding: '2rem 0',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  educationCard: {
    display: 'flex',
    gap: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  iconContainer: {
    backgroundColor: '#007bff',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: {
    color: '#ffffff',
    fontSize: '1.5rem',
  },
  content: {
    flex: 1,
  },
  school: {
    fontSize: '1.5rem',
    color: '#2d3436',
    marginBottom: '0.5rem',
  },
  degree: {
    fontSize: '1.25rem',
    color: '#007bff',
    marginBottom: '0.5rem',
  },
  period: {
    fontSize: '1rem',
    color: '#636e72',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1rem',
    color: '#2d3436',
    marginBottom: '1.5rem',
    lineHeight: '1.6',
  },
  subheading: {
    fontSize: '1.1rem',
    color: '#2d3436',
    marginBottom: '0.75rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '1.5rem',
  },
  listItem: {
    fontSize: '1rem',
    color: '#2d3436',
    marginBottom: '0.5rem',
    paddingLeft: '1.5rem',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '0.5rem',
      width: '6px',
      height: '6px',
      backgroundColor: '#007bff',
      borderRadius: '50%',
    },
  },
  coursesList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  courseTag: {
    backgroundColor: '#e9ecef',
    color: '#2d3436',
    padding: '0.5rem 1rem',
    borderRadius: '2rem',
    fontSize: '0.9rem',
  },
};

export default EducationSection;
