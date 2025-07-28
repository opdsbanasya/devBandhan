import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-[90vh] bg-zinc-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-300 mb-4">
            Have a question, suggestion, or feedback? We'd love to hear from you.
            This project is for educational use only, but we're always open to ideas!
          </p>
          <p className="text-gray-400">
            📧 Email us at:{" "}
            <a href="mailto:support@devbandhan.tech" className="text-blue-400 hover:underline">
              support@devbandhan.tech
            </a>
          </p>
        </div>

        {/* RIGHT SIDE - CONTACT FORM */}
        <form className="bg-zinc-800 p-6 rounded-xl shadow-md space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Message</label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition"
          >
            📩 Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
