'use client'
import React, { useState } from 'react';
import axios from "../lib/axios"
import EditModal from './EditModal';

const QuestionList = ({ questions, onOptionRemove, onOptionChange, handleRemoveQuestion, onQuestionChange }) => {
    const questionEntries = Object.entries(questions);
    const [editingIndex, setEditingIndex] = useState({ questionId: null, optionIndex: null });
    const [editingValue, setEditingValue] = useState('');
    const [isEditModal, setIsEditModal] = useState(false);
   const [selectedQuestionId, setSelectedQuestionId] = useState(null);


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
                                <button className='border-none rounded-md text-white px-2 bg-blue-600' onClick={() => { setIsEditModal(true); setSelectedQuestionId(id); }}>edit</button>
                            </div>
                            {question.options.map((option, index) => (
                                <div key={index} className='py-1'>
                                    <div className='question--options'>
                                        <div className="mr-1 p-1 rounded-md"> {option} </div>
                                    </div>
                                </div>
                            ))}
                        </li>
                    ))}
                </ul>
            </div>
            {isEditModal &&
                <EditModal
                    questionEntries={questionEntries}
                    setIsEditModal={setIsEditModal}
                    handleRemoveQuestion={handleRemoveQuestion}
                    editingIndex={editingIndex}
                    editingValue={editingValue}
                    setEditingValue={setEditingValue}
                    handleSaveOption={handleSaveOption}
                    handleEditOption={handleEditOption}
                    handleOptionRemove={handleOptionRemove}
                    handleCancelEdit={handleCancelEdit}
                    selectedQuestionId={selectedQuestionId}
                />}
        </div>
    );
};

export default QuestionList;