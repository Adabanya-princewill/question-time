'use client'
import React, { useState, useEffect, useRef } from 'react';
import axios from '../lib/axios';
import QuestionModal from './QuestionModal';

const QuestionForm = ({ questionData, setShowAddModal, showAddModal, fetchQuestions }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '']);
  const [questionId, setQuestionId] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    if (questionData) {
      setQuestion(questionData.question);
      setOptions([...questionData.options]);
      setQuestionId(questionData.id);
    }
  }, [questionData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowAddModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleOptionRemove = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const payload = {
      question,
      options: options
    };
    let response;
    try {

      if (questionId) {
        response = await axios.put(`/questions/${questionId}`, payload, { headers: { Token: token } });
      } else {
        response = await axios.post('/questions', payload, { headers: { Token: token } });
      }
      setShowAddModal(false);
      setQuestion('');
      setOptions(['', '', '']);
      setQuestionId('');
      fetchQuestions(localStorage.getItem('token'));
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };


  const handleDelete = async (questionId) => {
    if (questionId) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`/questions/${questionId}`, { headers: { Token: token } });
        console.log('Question deleted successfully');
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    }
  };

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  return (
    <section className={showAddModal ? 'modal-overlay' : ''}>
      {showAddModal && (
        <form onSubmit={handleSubmit} ref={modalRef} className='modal'>
          <h1 className='py-2'>{questionId ? 'Edit Question' : 'Add New Question'}</h1>
          <input
            required
            type="text"
            placeholder="Enter question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="block w-full py-2 p-2 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
          />
          <QuestionModal options={options} onOptionChange={handleOptionChange} onOptionRemove={handleOptionRemove} />
          <div className='btn--groups'>
            {options.length < 5 && (
              <button type="button" className='text-sm border text-white bg-blue-600 rounded-md px-4 py-1' onClick={handleAddOption}>
                Add Option
              </button>
            )}
            <button className='border text-white bg-green-600 text-sm rounded-md px-4 py-1' type="submit">Submit</button>
            {questionId && (
              <button type="button" className='border text-sm text-white bg-red-600 rounded-md px-4 py-1' onClick={() => handleDelete(questionId)}>
                Delete
              </button>
            )}
          </div>
        </form>
      )}
    </section>
  );
};

export default QuestionForm;