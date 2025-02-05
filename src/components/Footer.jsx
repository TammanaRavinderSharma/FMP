import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGooglePlay,
  FaApple,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto">
        {/* Main Footer Row */}
        <div className="flex flex-wrap justify-between items-start border-b border-gray-700 pb-6 mb-6">
          {/* About Us */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="font-bold text-white mb-4">About Us</h4>
            <p className="text-gray-400">
              We connect farmers and consumers directly, providing fresh and sustainable produce.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:underline">About Us</a></li>
              <li><a href="#careers" className="hover:underline">Careers</a></li>
              <li><a href="#contact" className="hover:underline">Contact Us</a></li>
              <li><a href="#blog" className="hover:underline">Blog</a></li>
              <li><a href="#faq" className="hover:underline">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="font-bold text-white mb-4">Contact Us</h4>
            <p className="text-gray-400">Email: support@kisankonnect.com</p>
            <p className="text-gray-400">Phone: +91 123 456 7890</p>
            <p className="text-gray-400">Address: 123 Farm Lane, Agriculture City, India</p>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/4">
            <h4 className="font-bold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-wrap justify-between items-center">
          {/* App Links */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a
              href="https://play.google.com"
              className="flex items-center bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700"
            >
              <FaGooglePlay className="mr-2" /> Google Play
            </a>
            <a
              href="https://apple.com"
              className="flex items-center bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700"
            >
              <FaApple className="mr-2" /> App Store
            </a>
          </div>

          {/* Payment Methods */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <FaCcVisa size={36} className="text-gray-400" />
            <FaCcMastercard size={36} className="text-gray-400" />
            <FaCcPaypal size={36} className="text-gray-400" />
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right text-gray-400">
            &copy; {new Date().getFullYear()} Kisankonnect. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
