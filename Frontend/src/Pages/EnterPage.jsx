import React from 'react';
import { useNavigate } from 'react-router-dom';

export const EnterPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 rounded-2xl shadow-2xl bg-gray-900 border border-gray-700/50 
                    flex flex-col items-center text-center space-y-8 
                    transition-all duration-300 ease-in-out hover:shadow-xl hover:border-violet-500/50">

                {/* Title Section */}
                <div className="space-y-3">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                        Subhartian Confession<br /> Dark Room
                    </h1>
                </div>

                {/* Description/Info Section */}
                <div className="text-gray-400 font-light space-y-2">
                    <p className="text-sm sm:text-base">
                        Anoymous chat for Subharti University students
                    </p>
                    <p className="text-xs sm:text-sm italic text-red-400/80">
                        All messages auto-delete after 24 hours
                    </p>
                    <p className="text-xs sm:text-sm italic text-red-400/80">
                        Do not share personal identity or sensitive info
                    </p>
                </div>

                {/* Ghost Icon - Using a placeholder for the graphic */}
                <div className="pt-4 pb-6">
                    {/* A simple div to represent the ghost icon's area and color */}
                    <div className="text-white text-7xl animate-pulse">
                        👻
                    </div>
                </div>

                {/* Enter Room Button */}
                <button
                    className="w-full max-w-[200px] py-3 px-6 
                     bg-transparent text-white font-semibold rounded-full 
                     shadow-lg transition-all duration-300 
                     
                     // Custom border/background to mimic the purple glow
                     border-2 border-violet-500 
                     bg-gradient-to-red from-violet-600/30 to-fuchsia-600/30
                     
                     // Hover effects
                     hover:bg-gradient-to-red hover:from-violet-500/50 hover:to-fuchsia-500/50
                     hover:shadow-violet-400/50 active:scale-95 focus:outline-none focus:ring-4 focus:ring-violet-500/50"
                    onClick={()=>navigate("/choose-hostel")}
                >
                    Enter Room
                </button>
            </div>
        </div>
    );
};

export default EnterPage;