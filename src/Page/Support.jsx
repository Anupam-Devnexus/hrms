import React, { useState } from "react";

export default function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle sending the data to your backend or email service
    console.log("Support Request Submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-2 text-blue-400">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Support</h1>
        <p className="mb-8 text-gray-600">
          Need help? Fill out the form below or check our FAQs for quick answers.
        </p>

        {submitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md">
            Thank you for contacting support! We will get back to you shortly.
          </div>
        )}

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700" htmlFor="subject">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief summary of your issue"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Detailed description of your problem or question"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
          >
            Submit Request
          </button>
        </form>

        {/* FAQ Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-4 text-gray-700">
            <details className="p-4 border border-gray-200 rounded-md">
              <summary className="cursor-pointer font-medium">How do I reset my password?</summary>
              <p className="mt-2">
                You can reset your password by clicking on the "Forgot Password" link on the login page and following the instructions sent to your email.
              </p>
            </details>

            <details className="p-4 border border-gray-200 rounded-md">
              <summary className="cursor-pointer font-medium">How can I update employee records?</summary>
              <p className="mt-2">
                Employee records can be updated via the Employee Management module. Only users with HR admin privileges can make changes.
              </p>
            </details>

            <details className="p-4 border border-gray-200 rounded-md">
              <summary className="cursor-pointer font-medium">Who do I contact for payroll issues?</summary>
              <p className="mt-2">
                For payroll-related questions, please reach out to the payroll department or use this support form specifying your query.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
