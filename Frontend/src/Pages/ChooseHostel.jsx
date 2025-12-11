import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom keyframes for animations (you can move to global CSS)
const CustomStyles = () => (
    <style jsx global>{`
    @keyframes gridMove {
      0% { transform: translate(0, 0); }
      100% { transform: translate(50px, 50px); }
    }
    @keyframes gradientRotate {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes floatRandom {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(20px, -20px); }
      50% { transform: translate(-20px, -40px); }
      75% { transform: translate(10px, -30px); }
    }

    .animate-grid-move { animation: gridMove 20s linear infinite; }
    .animate-gradient-rotate { background-size: 200% auto; animation: gradientRotate 3s ease infinite; }
    .animate-float-random { animation: floatRandom 8s ease-in-out infinite; }
    .animate-pulse-slow { animation: pulse-slow 8s infinite; }
    @keyframes pulse-slow { 0%,100%{opacity:0.4;}50%{opacity:0.6;} }
  `}</style>
);

export default function ChooseHostel() {
    const navigate = useNavigate();
    const [selectedHostel, setSelectedHostel] = useState('');
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    const hostels = [
        { id: 'udham', name: 'Udham Singh', description: 'Boys hostel.' },
        { id: 'lachit', name: 'Lachit', description: 'Boys hostel.' },
        { id: 'kotnis', name: 'Dr Kotnis', description: 'Boys hostel.' },
        { id: 'vhr', name: 'VHR', description: 'Boys hostel.' },
        { id: 'mld', name: 'MLD', description: 'Boys hostel.' },
        { id: 'others', name: 'Other', description: 'Other unlisted hostel' },
        { id: 'outsider', name: 'Outside', description: 'Non hostler' },
    ];

    const handleSubmit = () => {
        console.log(selectedHostel)
        if (selectedHostel) {
            navigate("/chat", {
                state: { hostelName: selectedHostel, }
            });
        }
    };

    const currentHostel = hostels.find(h => h.id === selectedHostel);

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
            <CustomStyles />

            {/* Animated background grid */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 animate-grid-move" style={{
                    backgroundImage: 'linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                }}></div>
            </div>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-400/50 rounded-full animate-float-random pointer-events-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${6 + Math.random() * 4}s`
                    }}
                />
            ))}

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-lg">
                <div className="bg-gray-800/60 backdrop-blur-xl rounded-3xl p-5 sm:p-8 shadow-3xl border border-gray-700/50">

                    {/* Warning */}
                    <div className="mb-4 text-center border border-yellow-500/30 rounded-lg p-3 bg-yellow-900/10 animate-pulse-slow">
                        <p className="text-red-700 text-xs leading-snug font-medium">
                            💀 You can share your thoughts, secrets, or confessions freely.<br />
                            ⚠️ We take no responsibility for what you say. Everything is anonymous.<br />
                            👁 Only enter if you can handle anything you might read or face here.<br />
                            🕷 Some confessions may shock, scare, or surprise you…
                        </p>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-5 tracking-tight">
                        <p className='text-red-700'>☠️ Dare to Enter? ☠️</p>
                        Select Your Confession Zone
                    </h2>

                    {/* Selected hostel display */}
                    <div className="mb-5">
                        <div className="bg-gray-700/40 rounded-xl border-2 border-purple-500/50 p-3 flex items-center min-h-[50px]">
                            <div className="flex-1">
                                <p className="text-gray-300 text-base font-semibold">
                                    {currentHostel ? currentHostel.name + ' Zone' : 'Choose a Zone Below'}
                                </p>
                                {currentHostel && (
                                    <span className="text-gray-500 text-xs ml-0 mt-0.5 block italic">
                                        {currentHostel.description}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Hostel buttons */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {hostels.map((hostel, index) => (
                            <button
                                key={hostel.id}
                                onClick={() => setSelectedHostel(hostel.id)}
                                className={`relative group p-2 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 transform active:scale-95 border-2 border-transparent
                  ${selectedHostel === hostel.id
                                        ? 'bg-purple-600/90 text-white border-purple-400 shadow-lg shadow-purple-500/50'
                                        : 'bg-gray-700/50 text-gray-300 border-gray-600/50 hover:bg-gray-600/70 hover:border-purple-500/40'
                                    }
                  min-h-[55px] flex items-center justify-center text-center leading-snug
                `}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                {selectedHostel === hostel.id && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center animate-ping-small shadow-xl shadow-purple-500/50">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                                <span className="relative z-10">{hostel.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* GO Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleSubmit}
                            onMouseEnter={() => setIsButtonHovered(true)}
                            onMouseLeave={() => setIsButtonHovered(false)}
                            disabled={!selectedHostel}
                            className={`relative group overflow-visible transition-opacity duration-300 ${!selectedHostel ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <div className="absolute -inset-1 bg-gradient-to-red from-cyan-500 via-blue-500 to-cyan-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-500 animate-gradient-rotate"></div>
                            <div className="absolute -inset-2 bg-gradient-to-red from-cyan-400 to-blue-400 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition duration-500"></div>
                            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                                <div className="absolute inset-0 transition-transform duration-1000 bg-gradient-to-red from-transparent via-white/30 to-transparent skew-x-12"></div>
                            </div>
                            <div className="relative px-10 py-3 sm:px-12 sm:py-3.5 bg-gradient-to-red from-cyan-600 via-cyan-700 to-blue-700 rounded-full text-white font-bold text-base sm:text-lg shadow-2xl shadow-cyan-900/50 transform transition-all duration-300 group-hover:scale-[1.05] group-hover:shadow-cyan-500/70 border-2 border-cyan-400/30">
                                <span className="flex items-center gap-2 relative z-10">
                                    <span className="tracking-wider">GOOO !</span>
                                    <svg className={`w-5 h-5 transform transition-all duration-300 ${isButtonHovered ? 'translate-x-1 scale-110' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </div>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
