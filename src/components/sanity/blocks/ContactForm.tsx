'use client';

import { useState } from 'react';

interface FloatingFieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label: string;
  required?: boolean;
  type?: string;
  isTextarea?: boolean;
}

interface FloatingSelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  options: readonly string[];
}

// Figma spec: 14px font size, 16px line height, Regular (400), Neue Haas Unica Pro
// Converting to rem: 14px = 0.875rem, 16px = 1rem
const fieldTextClass = 'text-[0.875rem] font-body font-normal leading-[1rem]';

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
        <label htmlFor={name} className={`${fieldTextClass} block text-white`}>
          {label}
        </label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-[#D9D9D9] text-black focus:outline-none resize-none h-[8.55rem] rounded-[0.625rem] p-[0.83rem] mt-[1.21rem] ${fieldTextClass}`}
        />
      </div>
    );
  }

  return (
    <div className="mb-[1.323375rem] relative border-b border-white pb-[0.75rem]">
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

function FloatingSelect({
  name,
  value,
  onChange,
  label,
  options,
}: FloatingSelectProps): React.ReactElement {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div className="mb-[1.323375rem] relative border-b border-white pb-[0.75rem] overflow-hidden">
      <label
        htmlFor={name}
        className={`${fieldTextClass} block text-[#d9d9d9] transition-opacity duration-150 whitespace-nowrap overflow-hidden text-ellipsis ${floated ? 'opacity-0' : 'opacity-100'}`}
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`bg-transparent focus:outline-none ${fieldTextClass} absolute inset-0 w-full h-full border-none p-0 pr-6 appearance-none cursor-pointer z-[1] ${value ? 'text-white' : 'text-transparent'}`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-black text-white">
            {opt}
          </option>
        ))}
      </select>
      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none z-[2]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

interface ContactFormProps {
  /** E-commerce platform options from Sanity (contact section) */
  platformOptions?: string[] | null;
  /** How did you hear about us options from Sanity (contact section) */
  hearAboutUsOptions?: string[] | null;
}

export default function ContactForm({ platformOptions = [], hearAboutUsOptions = [] }: ContactFormProps): React.ReactElement {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    country: '',
    platform: '',
    phone: '',
    hearAboutUs: '',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
        <FloatingSelect
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          label="Current E-Commerce Platform"
          options={platformOptions ?? []}
        />
        <FloatingField
          name="country"
          value={formData.country}
          onChange={handleChange}
          label="Country / Region *"
          required
        />
      </div>

      {/* Row 4: Phone Number + How did you hear about us */}
      <div className="grid grid-cols-2 gap-[1.38rem]">
        <FloatingField
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          label="Phone Number"
          type="tel"
        />
        <FloatingSelect
          name="hearAboutUs"
          value={formData.hearAboutUs}
          onChange={handleChange}
          label="How did you hear about us?"
          options={hearAboutUsOptions ?? []}
        />
      </div>

      {/* Project Description */}
      <div className="mt-[0.625rem]">
        <label className={`block text-white ${fieldTextClass} mb-[1.0625rem]`}>
          Project Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={{ 
            borderRadius: '0.625rem',
            width: '27.625rem',
            height: '8.551625rem',
            boxSizing: 'border-box',
            padding: '1.5rem',
            backgroundColor: '#D9D9D9',
            color: 'black',
            outline: 'none',
            resize: 'none'
          }}
          className={fieldTextClass}
        />
      </div>

      {/* Submit */}
      <div className={`mt-[0.93525rem] ${submitError ? 'mb-2' : ''}`}>
        {submitError && (
          <p className={`text-red-400 mb-2 text-[0.83rem] font-body font-normal leading-[1.143]`}>
            Something went wrong. Please try again.
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '6.29125rem',
            height: '2.3216875rem',
            borderRadius: '0.625rem'
          }}
          className="bg-white text-black hover:opacity-80 transition disabled:opacity-50 text-[0.875rem] font-mono font-medium leading-[1rem]"
        >
          {submitting ? '...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
