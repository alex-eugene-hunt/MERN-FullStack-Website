import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [scores, setScores] = useState([]);
  const [activeTab, setActiveTab] = useState('questions');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch questions
      const questionsResponse = await fetch('/api/questions');
      const questionsData = await questionsResponse.json();
      setQuestions(questionsData);

      // Fetch scores
      const scoresResponse = await fetch('/api/scores');
      const scoresData = await scoresResponse.json();
      setScores(scoresData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="tab-buttons">
        <button 
          className={activeTab === 'questions' ? 'active' : ''} 
          onClick={() => setActiveTab('questions')}
        >
          AlexAI Questions
        </button>
        <button 
          className={activeTab === 'scores' ? 'active' : ''} 
          onClick={() => setActiveTab('scores')}
        >
          Asteroids Scores
        </button>
      </div>

      {activeTab === 'questions' && (
        <div className="questions-section">
          <h2>AlexAI Questions</h2>
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Question</th>
                  <th>Answer</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q, index) => (
                  <tr key={index}>
                    <td>{formatDate(q.date)}</td>
                    <td>{q.question}</td>
                    <td>{q.answer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'scores' && (
        <div className="scores-section">
          <h2>Asteroids High Scores</h2>
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((s, index) => (
                  <tr key={index}>
                    <td>{formatDate(s.date)}</td>
                    <td>{s.name}</td>
                    <td>{s.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
