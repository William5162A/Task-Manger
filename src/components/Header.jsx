import React, { useState, useRef, useEffect } from 'react';

const Header = () => {
  const [btnName, setBtnName] = useState(false);
  const [username, setUserName] = useState(() => {
    const userName = localStorage.getItem('username');
    return userName ? JSON.parse(userName) : 'UserName';
  });

  // إنشاء مرجع لحقل الإدخال
  const inputRef = useRef(null);

  // التركيز التلقائي على حقل الإدخال عند التغيير
  useEffect(() => {
    if (btnName && inputRef.current) {
      inputRef.current.focus();

      // إغلاق عند الضغط على Escape
      const handleEscape = (e) => {
        if (e.key === 'Escape') setBtnName(false);
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [btnName]);

  // إغلاق عند النقر خارج المكون
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (btnName && !e.target.closest('.header-container')) {
        setBtnName(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [btnName]);

  return (
    <div className="w-full relative header-container">
      {btnName ? (
        <button
          className="bg-blue-400 text-white text-xs p-1 rounded-lg hover:bg-blue-500 transition-colors absolute right-2 top-2"
          onClick={() => setBtnName(false)}
        >
          Save
        </button>
      ) : (
        <button
          className="bg-blue-400 text-white text-xs p-1 rounded-lg hover:bg-blue-500 transition-colors absolute right-2 top-2"
          onClick={() => setBtnName(true)}
        >
          Change Your Name
        </button>
      )}

      <div className="flex flex-col items-center select-none mt-10 w-full">
        <h1 className="text-blue-600 text-2xl lg:text-2xl font-bold text-center">
          {btnName ? (
            <input
              ref={inputRef}
              type="text"
              className="w-[150px] border border-blue-400 rounded-2xl p-1 text-center"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
                localStorage.setItem('username', JSON.stringify(e.target.value));
              }}
              onKeyPress={(e) => e.key === 'Enter' && setBtnName(false)}
            />
          ) : (
            username
          )}{' '}
          Task Manager
        </h1>
        <p className="text-gray-400 mt-3 text-[12px] lg:text-2xl">
          Organize Your Work Efficiently
        </p>
      </div>
    </div>
  );
};

export default Header;
