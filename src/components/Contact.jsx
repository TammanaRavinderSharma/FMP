import React, { useState } from 'react';
import axios from 'axios';
import FarmerImage from '../assets/FarmerImage.jpg';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    file: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [charCount, setCharCount] = useState(0);

  // Captcha state
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'message') {
      setCharCount(value.length);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(true); // Assuming the captcha verification is done
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert('Please complete the captcha');
      return;
    }
    setIsLoading(true);
    setStatusMessage('');

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('subject', formData.subject);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('phone', formData.phone);
    if (formData.file) formDataToSend.append('file', formData.file);

    try {
      const response = await axios.post('http://localhost:3000/api/users/contact', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setStatusMessage('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '', phone: '', file: null });
      } else {
        setStatusMessage(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${FarmerImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>

      <div className="relative z-10 container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row bg-white/80 rounded-3xl shadow-lg overflow-hidden">
          <div className="md:w-1/2">
            <img
              src={FarmerImage}
              alt="Farmer's Marketplace"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="md:w-1/2 p-8 bg-white/90 backdrop-blur-md rounded-3xl">
            <h2 className="text-3xl font-bold text-green-600 mb-4 text-center">Contact Us</h2>
            <p className="text-gray-600 mb-6 text-center">
              Have questions or feedback? Send us a message, and we’ll get back to you shortly!
            </p>

            {statusMessage && (
              <p className={`text-center ${statusMessage.includes('success') ? 'text-green-500' : 'text-red-500'} mb-4`}>
                {statusMessage}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-transparent text-gray-700 border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-transparent text-gray-700 border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-transparent text-gray-700 border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-transparent text-gray-700 border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  required
                ></textarea>
                <p className="text-sm text-gray-500 mt-2">
                  {charCount} / 500 characters
                </p>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone (optional)
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-transparent text-gray-700 border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                  Attachment (optional)
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="mb-4">
                {/* Add your captcha here */}
                <div className="text-center">
                  <p className="text-sm text-gray-700">Please verify you're not a robot</p>
                  {/* Replace with an actual captcha component */}
                  <input
                    type="checkbox"
                    onChange={(e) => handleCaptchaChange(e.target.checked)}
                  /> I am not a robot
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:bg-green-300 hover:text-black transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p>Or contact us on social media:</p>
              <a href="https://facebook.com" target="_blank" className="text-blue-600">Facebook</a> | 
              <a href="https://twitter.com" target="_blank" className="text-blue-400">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
