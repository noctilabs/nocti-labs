'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    country: '',
    platform: '',
    phone: '',
    description: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const inputClasses =
    'w-full bg-transparent border-b border-white text-white placeholder-gray-500 font-body text-[16px] pb-4 focus:outline-none focus:border-accent transition'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name*"
          value={formData.firstName}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name*"
          value={formData.lastName}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Work Email*"
          value={formData.email}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="company"
          placeholder="Company Name*"
          value={formData.company}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="country"
          placeholder="Country/Region*"
          value={formData.country}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="platform"
          placeholder="Current E-Commerce Platform"
          value={formData.platform}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>
      <div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>
      <div>
        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          className={`${inputClasses} resize-none`}
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="bg-white text-black px-8 py-3 rounded-full font-mono uppercase text-[14px] font-bold hover:opacity-80 transition mt-8"
      >
        Send Message
      </button>
    </form>
  )
}
