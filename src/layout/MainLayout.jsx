import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import BottomBar from "../components/BottomBar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />

            {/* Content */}
            <main className="flex-1 p-4 bg-gray-100 pb-16 md:pb-4">
                <Outlet />
            </main>

            {/* Mobile Bottom Bar ONLY */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
                <BottomBar />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MainLayout;
