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

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const labelClasses = 'font-body text-[14px] font-normal leading-[16px] text-[#D9D9D9]'
  const inputClasses = 'w-full bg-transparent border-b border-white text-white font-body text-[14px] leading-[16px] pt-0 pb-[10px] focus:outline-none placeholder-transparent'

  return (
    <form onSubmit={handleSubmit}>
      {/* Row 1: First Name + Last Name */}
      <div className="grid grid-cols-2 gap-[20px] mb-[38px]">
        <div>
          <label className={labelClasses}>First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className={labelClasses}>Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
      </div>

      {/* Row 2: Work Email + Company Name */}
      <div className="grid grid-cols-2 gap-[20px] mb-[38px]">
        <div>
          <label className={labelClasses}>Work Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className={labelClasses}>Company Name *</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
      </div>

      {/* Row 3: Current E-Commerce Platform + Country / Region */}
      <div className="grid grid-cols-2 gap-[20px] mb-[38px]">
        <div>
          <label className={labelClasses}>Current E-Commerce Platform</label>
          <input
            type="text"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Country / Region *</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
      </div>

      {/* Row 4: Phone Number (left only) */}
      <div className="grid grid-cols-2 gap-[20px] mb-[27px]">
        <div>
          <label className={labelClasses}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
      </div>

      {/* Project Description */}
      <div className="mb-[15px]">
        <label className={`${labelClasses} text-white block mb-[10px]`}>Project Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-[#D9D9D9] text-black font-body text-[14px] leading-[16px] rounded-[10px] p-3 focus:outline-none resize-none"
          rows={5}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-white text-black font-mono text-[14px] font-medium rounded-[10px] hover:opacity-80 transition"
        style={{ width: '100.66px', height: '37.15px' }}
      >
        Submit
      </button>
    </form>
  )
}
