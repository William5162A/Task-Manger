import React, {useState} from 'react'

const Header = () => {
  const [btnName, setBtnName] = useState(false)
  const [username, setUserName] = useState(() => {
    // تحميل المهام من Local Storage عند بدء التشغيل
    const userName = localStorage.getItem('username');
    return userName
      ? JSON.parse(userName)
      : 'UserName';
  });
  return (
    <div className={'w-full'}>

      {btnName ? '' :
        <button className={'bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors'} onClick={() => setBtnName(true)}></button>
      }

      <div className={'flex flex-col items-center select-none mt-6 bg-green-40c0 w-full'}>
        <h1 className={'text-blue-600 text-2xl lg:text-2xl font-bold text-center'}>
          {username} Task Manager
        </h1>
        <p className={'text-gray-400 mt-3 text-[12px] lg:text-2xl'}>
          Organize Your Work Efficiently
        </p>
      </div>
    </div>
  )
}
export default Header
