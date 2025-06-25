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
    <div className={'w-full relative'}>

      {btnName ?
        <button className={'bg-blue-600 text-white text-xs p-1  rounded-lg hover:bg-blue-800 transition-colors absolute right-2 top-2 '} onClick={() => setBtnName(false)}>
          Save
        </button>
        :
        <button className={'bg-blue-600 text-white text-xs p-1  rounded-lg hover:bg-blue-800 transition-colors absolute right-2  top-2 '} onClick={() => setBtnName(true)}>
          Change Your Name
        </button>
      }

      <div className={'flex flex-col items-center select-none mt-10  bg-green-40c0 w-full'}>
        <h1 className={'text-blue-600 text-2xl lg:text-2xl font-bold text-center'}>
          {
            btnName ?
              <input type='text' className={'w-[150px] border border-blue-400 rounded-2xl p-1 '} value={username} onChange={(e) => {
                setUserName(e.target.value)
                localStorage.setItem('username', JSON.stringify(e.target.value));
              }} onKeyPress={(e) => e.key === 'Enter' && setBtnName(false)}/>
              :
              username

          } Task Manager
        </h1>
        <p className={'text-gray-400 mt-3 text-[12px] lg:text-2xl'}>
          Organize Your Work Efficiently
        </p>
      </div>
    </div>
  )
}
export default Header
