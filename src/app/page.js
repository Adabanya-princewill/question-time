'use client'
import React, { useState, useEffect } from 'react';
import axios from './lib/axios';
import QuestionList from './components/QuestionList';
import QuestionForm from './components/QuestionForm';
import Header from './components/Header';

import { useRouter } from 'next/navigation';

const IndexPage = () => {
  const [questions, setQuestions] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/token');
    } else {
      fetchQuestions(token);
    }
  }, []);

  const fetchQuestions = async (token) => {
    try {
      const response = await axios.get('/questions', {
        headers: {
          Token: token,
        },
      });
      if (response.data) {
        setQuestions(response.data);
      } else {
        setQuestions({});
      }
      setError('');
    } catch (error) {
      setError('Error fetching questions');
      console.error('Error fetching questions:', error);
    }
  };
  
  const handleRemoveQuestion = async (id) => {
    try {
      await axios.delete(`/questions/${id}`, {
        headers: {
          Token: localStorage.getItem('token'),
        }
      });
      const updatedQuestions = { ...questions };
      delete updatedQuestions[id];
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Error removing question:', error);
    }
  };
  

  const handleOptionRemove = (questionId, optionIndex) => {
    const updatedQuestion = { ...questions[questionId] };
    updatedQuestion.options.splice(optionIndex, 1);
    setQuestions({ ...questions, [questionId]: updatedQuestion });
  };

  const handleOptionChange = (id, index, value) => {
    setQuestions(prevQuestions => {
      const updatedQuestions = { ...prevQuestions };
      updatedQuestions[id].options[index] = value;
      return updatedQuestions;
    });
  };
  
  

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className='w-full px-2 py-2 max-w-6xl mx-auto'>
          <Header setShowAddModal={setShowAddModal} />
          <QuestionList
            questions={questions}
            handleRemoveQuestion={handleRemoveQuestion}
            onOptionRemove={handleOptionRemove}
            setQuestions={setQuestions}
            fetchQuestions={fetchQuestions}
            onOptionChange={handleOptionChange}
          />
          <QuestionForm
            setShowAddModal={setShowAddModal}
            showAddModal={showAddModal}
            fetchQuestions={fetchQuestions}
          />
        </div>
      )}
    </div>
  );
};

export default IndexPage;
