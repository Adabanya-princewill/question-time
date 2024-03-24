'use client'
import React, { useState } from 'react';
import axios from "../lib/axios"

const QuestionList = ({ questions, onOptionRemove, onOptionChange, handleRemoveQuestion }) => {
    const questionEntries = Object.entries(questions);
    const [editingIndex, setEditingIndex] = useState({ questionId: null, optionIndex: null });
    const [editingValue, setEditingValue] = useState('');


    const handleOptionRemove = async (id, index) => {
        try {
            await onOptionRemove(id, index);
            await axios.put(`/questions/${id}`, {
                question: questions[id].question,
                options: questions[id].options
            }, {
                headers: {
                    Token: localStorage.getItem('token'),
                }
            });
        } catch (error) {
            console.error('Error removing option:', error);
        }
    };

    const handleEditOption = (questionId, optionIndex) => {
        setEditingIndex({ questionId, optionIndex });
        setEditingValue(questions[questionId].options[optionIndex]);
    };

    const handleCancelEdit = () => {
        setEditingIndex({ questionId: null, optionIndex: null });
        setEditingValue('');
    };

    const handleSaveOption = async (id, index) => {
        try {
            await onOptionChange(id, index, editingValue);
            await axios.put(`/questions/${id}`, {
                question: questions[id].question,
                options: questions[id].options
            }, {
                headers: {
                    Token: localStorage.getItem('token'),
                }
            });
            setEditingIndex({ questionId: null, optionIndex: null });
        } catch (error) {
            console.error('Error saving option:', error);
        }
    };

    return (
        <div>
            <h2 className='text-xl py-2 text-center'>{questionEntries.length ? 'Existing Questions' : 'Click "add" to add question.'}</h2>
            <div>
                <ul className='flex flex-wrap gap-2 justify-center lg:justify-start lg:items-start'>
                    {questionEntries.map(([id, question]) => (
                        <li key={id} className='p-4 bg-blue-100 rounded-md'>
                            <div className='question--card'>
                                <div className='text-xl font-semibold'>{question.question}</div>
                                <svg onClick={() => handleRemoveQuestion(id)} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" fill='red' className='icon--color' x="0px" y="0px" width="18" height="18" viewBox="0 0 30 30">
                                    <path d="M6 8v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8H6zM24 4h-6c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1H6C5.4 4 5 4.4 5 5s.4 1 1 1h18c.6 0 1-.4 1-1S24.6 4 24 4z"></path>
                                </svg>
                            </div>
                            {question.options.map((option, index) => (
                                <div key={index} className='py-1'>
                                    {editingIndex.questionId === id && editingIndex.optionIndex === index ? (
                                        <>
                                            <input
                                                type="text"
                                                value={editingValue}
                                                onChange={(e) => setEditingValue(e.target.value)}
                                                className="border-none mr-1 p-1 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                            />
                                            <button className="text-blue-600" onClick={() => handleSaveOption(id, index)}>Save</button>
                                            <button className="text-red-600 ml-1" onClick={handleCancelEdit}>Cancel</button>
                                        </>
                                    ) : (
                                        <div className='question--options'>
                                            <div className="mr-1 p-1 rounded-md"> {option} </div>
                                            <div className='option--svg'>
                                                <svg onClick={() => handleEditOption(id, index)} xmlns="http://www.w3.org/2000/svg" fill="#20c997" className='icon--color' viewBox="0 0 256 256" width="18" height="18">
                                                    <path d="M 199.5 27.3 l -26.6 26.6 l -70.9 -70.9 l 26.6 -26.6 c 7.5 -7.5 19.7 -7.5 27.3 0 l 43.6 43.6 C 207 7.6 207 19.8 199.5 27.3 z m -126.7 147.1 l -0.8 26.6 l 26.6 -0.8 l 96.1 -96.1 l -26.6 -26.6 l -96.1 96.9 z M 34.4 221.7 l 17.9 -17.9 l -35.7 -35.7 L 0 186.1 l 35.7 35.7 l 17.9 -17.9 z" />
                                                </svg>
                                                <svg onClick={() => handleOptionRemove(id, index)} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" fill='red' className='icon--color' x="0px" y="0px" width="18" height="18" viewBox="0 0 30 30">
                                                    <path d="M6 8v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8H6zM24 4h-6c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1H6C5.4 4 5 4.4 5 5s.4 1 1 1h18c.6 0 1-.4 1-1S24.6 4 24 4z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default QuestionList;