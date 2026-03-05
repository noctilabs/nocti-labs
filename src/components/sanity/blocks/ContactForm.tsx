'use client';

import { useState } from 'react';
import { caption } from '@/lib/typography';

interface FloatingFieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label: string;
  required?: boolean;
  type?: string;
  isTextarea?: boolean;
}

const fieldTextClass = caption;

function FloatingField({
  name,
  value,
  onChange,
  label,
  required = false,
  type = 'text',
  isTextarea = false,
}: FloatingFieldProps): React.ReactElement {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  if (isTextarea) {
    return (
      <div className="mb-[0.8rem]">
        <label htmlFor={name} className={`${fieldTextClass} block text-[#d9d9d9]`}>
          {label}
        </label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-[#D9D9D9] text-black focus:outline-none resize-none h-[9.47rem] rounded-[0.69rem] p-[0.83rem] mt-[1.21rem] ${fieldTextClass}`}
        />
      </div>
    );
  }

  return (
    <div className="mb-[0.8rem] relative border-b border-white pb-[0.75rem]">
      <label
        htmlFor={name}
        className={`${fieldTextClass} block text-[#d9d9d9] transition-opacity duration-150 ${floated ? 'opacity-0' : 'opacity-100'}`}
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`bg-transparent text-white focus:outline-none ${fieldTextClass} absolute inset-0 w-full h-full border-none p-0`}
        required={required}
      />
    </div>
  );
}

export default function ContactForm(): React.ReactElement {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    country: '',
    platform: '',
    phone: '',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <p className={`text-white ${fieldTextClass}`}>
        Thanks! We&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Row 1: First Name + Last Name */}
      <div className="grid grid-cols-2 gap-[1.38rem]">
        <FloatingField
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          label="First Name *"
          required
        />
        <FloatingField
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          label="Last Name *"
          required
        />
      </div>

      {/* Row 2: Work Email + Company Name */}
      <div className="grid grid-cols-2 gap-[1.38rem]">
        <FloatingField
          name="email"
          value={formData.email}
          onChange={handleChange}
          label="Work Email *"
          type="email"
          required
        />
        <FloatingField
          name="company"
          value={formData.company}
          onChange={handleChange}
          label="Company Name *"
          required
        />
      </div>

      {/* Row 3: Current E-Commerce Platform + Country / Region */}
      <div className="grid grid-cols-2 gap-[1.38rem]">
        <FloatingField
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          label="Current E-Commerce Platform"
        />
        <FloatingField
          name="country"
          value={formData.country}
          onChange={handleChange}
          label="Country / Region *"
          required
        />
      </div>

      {/* Row 4: Phone Number */}
      <div className="grid grid-cols-2 gap-[1.38rem]">
        <FloatingField
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          label="Phone Number"
          type="tel"
        />
      </div>

      {/* Project Description */}
      <div className="mt-[1.21rem] mb-[1.31rem]">
        <label className={`block text-white ${fieldTextClass}`}>
          Project Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`w-full bg-[#D9D9D9] text-black focus:outline-none resize-none h-[9.47rem] rounded-[0.69rem] p-[0.83rem] mt-[1.21rem] ${fieldTextClass}`}
        />
      </div>

      {/* Submit */}
      <div className={submitError ? 'mb-2' : ''}>
        {submitError && (
          <p className={`text-red-400 mb-2 text-[0.83rem] font-body font-normal leading-[1.143]`}>
            Something went wrong. Please try again.
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="bg-white text-black hover:opacity-80 transition disabled:opacity-50 w-[6.97rem] h-[2.57rem] rounded-[0.69rem] text-[0.97rem] font-mono font-medium leading-[1.143]"
        >
          {submitting ? '...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
