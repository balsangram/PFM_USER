import React from "react";
import { ArrowRight } from "lucide-react";
import bannerImg from "../../../assets/banner/bannerImg.png";

function BannerComponent() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 mt-6">
            <div
                className="
          relative
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-6
          rounded-2xl
          overflow-hidden
          bg-gradient-to-r
          from-pink-50
          to-rose-50
          p-6
          md:p-8
        "
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('/images/banner-lines.svg')] opacity-20 pointer-events-none" />

                {/* Left Content */}
                <div className="relative z-10 max-w-lg text-center md:text-left">
                    <h2 className="text-2xl md:text-4xl font-bold text-rose-600 mb-2">
                        Welcome
                    </h2>
                    <p className="text-sm md:text-lg text-rose-500 font-medium">
                        Avail exciting offers, only for you!
                    </p>
                </div>

                {/* Center Image (Desktop Only) */}
                <div className="relative z-10 hidden md:block">
                    <img
                        src={bannerImg}
                        alt="Fresh Chicken"
                        className="h-40 object-contain"
                    />
                </div>

                {/* Right Offer */}
                <div className="relative z-10 flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-gray-700 font-semibold text-sm md:text-base">
                            Chicken Curry Cut & more
                        </p>
                        <p className="text-xs text-gray-500">Starting at</p>

                        <div className="flex items-center justify-end gap-2 mt-1">
                            <span className="line-through text-gray-400 text-sm">₹201</span>
                            <span className="text-xl md:text-2xl font-bold text-gray-900">
                                ₹169
                            </span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button className="bg-rose-600 hover:bg-rose-700 transition text-white rounded-full p-3">
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BannerComponent;
