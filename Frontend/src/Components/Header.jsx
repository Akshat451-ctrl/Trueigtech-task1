import React from 'react';

function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-yellow-400 rounded-md flex items-center justify-center text-white font-bold">IM</div>
      <div className="font-semibold text-lg">InstaMini</div>
    </div>
  );
}

export default function Header({ onNavigate, me, onLogout, onSearch }) {
  
  function usernameOrGuest() {
    if (me && me.username) return me.username;
    return 'Guest';
  }

  return (
    <header className="w-full bg-black/40 backdrop-blur sticky top-0 z-20 border-b border-white/5">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-6">
          <div onClick={() => onNavigate && onNavigate('home')} className="cursor-pointer"><Logo /></div>
          <div className="hidden sm:block">
            <input
              onChange={e => onSearch && onSearch(e.target.value)}
              placeholder="Search"
              className="px-3 py-1 rounded border bg-transparent text-sm w-56"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <nav className="hidden sm:flex items-center space-x-3">
            <button className="text-sm text-gray-300 hover:text-white" onClick={() => onNavigate && onNavigate('home')}>Home</button>
            <button className="text-sm text-gray-300 hover:text-white" onClick={() => onNavigate && onNavigate('create')}>Create</button>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-200 hidden md:block">{usernameOrGuest()}</div>
            <button className="text-sm bg-indigo-600 px-3 py-1 rounded text-white" onClick={() => onNavigate && onNavigate('profile')}>Profile</button>
            {me ? (
              <button className="text-sm bg-red-600 px-3 py-1 rounded text-white" onClick={() => (onLogout ? onLogout() : onNavigate && onNavigate('login'))}>Logout</button>
            ) : (
              <button className="text-sm bg-blue-600 px-3 py-1 rounded text-white" onClick={() => onNavigate && onNavigate('login')}>Login</button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
