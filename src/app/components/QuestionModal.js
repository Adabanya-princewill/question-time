import React from 'react';

const QuestionModal = ({ questionIndex, options, onOptionChange, onOptionRemove }) => {
    const handleOptionChange = (index, value) => {
        onOptionChange(index, value);
    };

    return (
        <div className='my-4'>
            {options.map((option, index) => (
                <div key={index} className='py-1 flex items-center'>
                    <input
                        required
                        type="text"
                        value={option}
                        placeholder='enter an option...'
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="border mr-1 p-1 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    />
                    <svg onClick={() => onOptionRemove(questionIndex, index)} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" fill='red' className='icon--color' x="0px" y="0px" width="18" height="18" viewBox="0 0 30 30">
                        <path d="M6 8v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8H6zM24 4h-6c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1H6C5.4 4 5 4.4 5 5s.4 1 1 1h18c.6 0 1-.4 1-1S24.6 4 24 4z"></path>
                    </svg>
                </div>
            ))}
        </div>
    );
};

export default QuestionModal;