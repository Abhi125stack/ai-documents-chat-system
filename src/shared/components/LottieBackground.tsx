"use client";

import React from "react";
import Lottie from "lottie-react";
import animationData from "@/assets/Gradient BG.json";

const LottieBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden dark">
            <div className="absolute inset-0 flex items-center justify-center">
                <Lottie 
                    animationData={animationData} 
                    className="w-full h-full object-cover opacity-60"
                    loop={true}
                    rendererSettings={{
                        preserveAspectRatio: "xMidYMid slice"
                    }}
                />
            </div>
            {/* Hardcoded dark overlay to prevent theme leakage */}
            <div className="absolute inset-0 bg-[#0a1120]/40 backdrop-blur-[2px]" />
        </div>
    );
};

export default LottieBackground;
