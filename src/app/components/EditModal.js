import React from 'react';

const EditModal = ({ setIsEditModal, questionEntries, handleCancelEdit, selectedQuestionId, editingValue, handleRemoveQuestion, editingIndex, setEditingValue, handleSaveOption, handleEditOption, handleOptionRemove }) => {
    const selectedQuestion = questionEntries.find(([id]) => id === selectedQuestionId);

    if (!selectedQuestion) {
        return null;
    }

    const [id, question] = selectedQuestion;
    return (
        <div className=''>
            <div className='modal-overlay'>
                <ul className='flex modal flex-wrap gap-2 justify-center lg:justify-start lg:items-start'>

                    <li key={id} className='rounded-lg'>
                        <div className='question--card'>
                            <div className='question--options'>
                                <div className='text-xl font-semibold'>{question.question}</div>
                            </div>
                            <button className='border-none rounded-md text-white px-2 bg-red-600' onClick={() => handleRemoveQuestion(id)}>del-all</button>
                            <button className='border-none rounded-md text-white px-2 bg-red-600' onClick={() => setIsEditModal(false)}>X</button>
                        </div>
                        {question.options.map((option, index) => (
                            <div key={index} className='py-1'>
                                {editingIndex.questionId === id && editingIndex.optionIndex === index ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editingValue}
                                            onClick={() => handleEditOption(id, index)}
                                            onChange={(e) => setEditingValue(e.target.value)}
                                            className="border border-blue-600 w-full mr-1 p-2 rounded-md focus:outline-none focus:border-green-600 caret-blue-600"
                                        />
                                        <div className='my-2'>
                                            <button className="bg-green-600 rounded-md px-2 text-white" onClick={() => handleSaveOption(id, index)}>Save</button>
                                            <button className="bg-red-600 rounded-md px-2 ml-1 text-white" onClick={handleCancelEdit}>cancel</button>
                                        </div>
                                    </>
                                ) : (
                                    <div className='question--options'>
                                        <div className="mr-1 p-1 rounded-md"> {option} </div>
                                        <div className='option--svg'>
                                            <button className='border-none rounded-md text-white px-2 bg-green-600' onClick={() => handleEditOption(id, index)}>edit</button>
                                            <svg onClick={() => handleOptionRemove(id, index)} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" fill='red' className='icon--color' x="0px" y="0px" width="18" height="18" viewBox="0 0 30 30">
                                                <path d="M6 8v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8H6zM24 4h-6c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1H6C5.4 4 5 4.4 5 5s.4 1 1 1h18c.6 0 1-.4 1-1S24.6 4 24 4z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                    </li>

                </ul>
            </div>
        </div>
    );
};

export default EditModal;
