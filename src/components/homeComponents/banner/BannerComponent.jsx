import React from "react";
import { ArrowRight, Tag, Star } from "lucide-react";
import bannerImg from "../../../assets/banner/bannerImg.png";

function BannerComponent() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 mt-8">
            <div
                className="
          relative
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-8
          rounded-3xl
          overflow-hidden
          bg-gradient-to-br
          from-rose-50
          via-pink-50
          to-orange-50
          p-8
          md:p-12
          shadow-xl
          shadow-rose-100/50
          border border-rose-100
        "
            >
                {/* Background Pattern */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-rose-200 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-10 blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-300 rounded-full translate-x-1/3 translate-y-1/3 opacity-10 blur-3xl" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>

                {/* Decorative Elements */}
               
                {/* Left Content */}
                <div className="relative z-10 max-w-lg">
                    <div className="flex items-center gap-2 mb-3">
                     
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">Back!</span>
                    </h1>
                    <p className="text-lg text-gray-700 font-medium mb-6">
                        Avail <span className="font-bold text-rose-700">exciting offers</span>, crafted especially for you!
                    </p>
                    
                    {/* Mobile Image */}
                    <div className="block md:hidden mb-6">
                        <img
                            src={bannerImg}
                            alt="Fresh Chicken"
                            className="h-48 object-contain mx-auto"
                        />
                    </div>
                    
                 
                </div>

                {/* Center Image (Desktop Only) */}
                <div className="relative z-10 hidden md:block transform hover:scale-105 transition-transform duration-300">
                    <div className="absolute -inset-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full opacity-50 blur-xl" />
                    <img
                        src={bannerImg}
                        alt="Fresh Chicken"
                        className="relative h-56 object-contain drop-shadow-2xl"
                    />
                </div>

                {/* Right Offer Card */}
                <div className="relative z-10">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-100 max-w-sm transform hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Chicken Curry Cut</h3>
                                <p className="text-sm text-gray-500">Premium quality, freshly prepared</p>
                            </div>
                            <div className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-1 rounded">
                                -20%
                            </div>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl font-bold text-gray-900">₹169</span>
                                <span className="line-through text-gray-400">₹201</span>
                                <span className="text-sm font-semibold text-green-600">Save ₹32</span>
                            </div>
                            {/*  */}
                        </div>
                        
                        <button className="
                            w-full
                            bg-gradient-to-r
                            from-rose-600
                            to-pink-600
                            hover:from-rose-700
                            hover:to-pink-700
                            transition-all
                            duration-300
                            text-white
                            font-semibold
                            py-3
                            px-6
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            gap-2
                            group
                            shadow-lg
                            shadow-rose-200
                            hover:shadow-xl
                            hover:shadow-rose-300
                        ">
                            Order Now
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                       
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerComponent;