import React from "react";
import bannerImg from "../../../assets/banner/bannerImg.png";

function BannerComponent() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 mt-8">
            <div
                className="
                    relative
                    w-full
                    aspect-[21/9]  /* Standard banner ratio 21:9 */
                    md:aspect-[3/1]  /* 3:1 for desktop */
                    rounded-2xl
                    overflow-hidden
                    shadow-lg
                    hover:shadow-xl
                    transition-shadow duration-300
                    bg-gradient-to-r from-rose-50 to-pink-50
                "
            >
                {/* Background Gradient */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <div className="absolute top-0 left-0 w-64 h-64 bg-rose-200 rounded-full -translate-x-1/3 -translate-y-1/3 opacity-20 blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-300 rounded-full translate-x-1/3 translate-y-1/3 opacity-20 blur-3xl" />
                </div>

                {/* Main Banner Image */}
                <img
                    src={bannerImg}
                    alt="Banner"
                    className="
                        absolute
                        inset-0
                        w-full
                        h-full
                        object-cover
                        object-center
                        transition-transform duration-700
                        hover:scale-105
                    "
                />

                {/* Optional: Simple overlay on hover */}
                <div className="
                    absolute inset-0
                    bg-black/0
                    hover:bg-black/5
                    transition-all duration-300
                    flex items-center justify-center
                ">
                    <span className="
                        text-white
                        text-sm font-medium
                        opacity-0 hover:opacity-100
                        transition-opacity duration-300
                        transform translate-y-2 hover:translate-y-0
                        bg-black/30
                        backdrop-blur-sm
                        px-4 py-2
                        rounded-full
                    ">
                        Explore Collection
                    </span>
                </div>
            </div>
        </div>
    );
}

export default BannerComponent;