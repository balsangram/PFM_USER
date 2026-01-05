import React from 'react'
import BannerComponent from '../../components/homeComponents/banner/BannerComponent'
import BestSelling from '../../components/homeComponents/bestSelling/BestSelling'
import ShopByCategory from '../../components/homeComponents/ShopByCategory/ShopByCategory'

function Home() {
    return (
        <div>
            <BannerComponent />
            <BestSelling />
            <ShopByCategory />
        </div>
    )
}

export default Home