import React from "react";

function Footer() {
  return (
    <footer className="hidden md:block bg-gray-900 text-gray-400 text-sm text-center py-4">
      © {new Date().getFullYear()} Priya Fresh Meat Pvt. Ltd. All Rights Reserved.
    </footer>
  );
}

export default Footer;
