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
  onChange: (value: string) => void;
  label: string;
  options: readonly string[];
  open: boolean;
  onToggle: () => void;
  panelWidth?: string;
}

// Figma spec: 14px font size, 16px line height, Regular (400), Neue Haas Unica Pro
// Converting to rem: 14px = 0.875rem, 16px = 1rem
const fieldTextClass = 'text-[1.25rem] leading-[1.5rem] md:text-[0.875rem] md:leading-[1rem] font-body font-normal';

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

  // Mobile: label always visible above underline (no float trick needed at small sizes)
  // Figma mobile row spacing: 48px between rows (3rem). Desktop uses 1.323375rem.
  return (
    <div className="mb-[1.5rem] md:mb-[1.323375rem] relative md:border-b md:border-white pb-[1rem] md:pb-[0.75rem] flex flex-col justify-end md:block">
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
        className={`bg-transparent text-[#d9d9d9] focus:outline-none ${fieldTextClass} absolute bottom-[1rem] md:inset-0 left-0 w-full border-none p-0`}
        required={required}
      />
      {/* Mobile-only underline: 3/4 width (1/4 shorter from right) */}
      <div className="absolute bottom-0 left-0 w-[85%] h-px bg-white md:hidden" />
    </div>
  );
}

// Figma: items at 14px/24px line-height, panel padding ~10px
// Blue dot: 8px, positioned left, vertically centered on active item row
function getDotTop(index: number): string {
  return `calc(0.625rem + ${index} * 1.5rem + 0.4375rem)`;
}

function FloatingSelect({
  value,
  onChange,
  label,
  options,
  open,
  onToggle,
  panelWidth = 'w-full',
}: FloatingSelectProps): React.ReactElement {
  const [hovered, setHovered] = useState<string | null>(null);

  // Active item: hovered takes priority, fallback to selected value
  const activeItem = hovered ?? value ?? null;
  const activeIndex = activeItem ? options.indexOf(activeItem) : -1;

  return (
    <div className="mb-[1.5rem] md:mb-[1.323375rem] relative md:border-b md:border-white pb-[1rem] md:pb-[0.75rem] flex flex-col justify-end md:block">
      <button
        type="button"
        onClick={onToggle}
        className={`text-left focus:outline-none items-center ${fieldTextClass} text-[#d9d9d9] inline-flex w-3/4 md:flex md:w-full md:justify-between`}
      >
        <span className="md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">{value || label}</span>
        <svg
          className={`hidden md:block w-3 h-3 shrink-0 ml-1.5 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {/* Mobile-only underline: 3/4 width (1/4 shorter from right) */}
      <div className="absolute bottom-0 left-0 w-[85%] h-px bg-white md:hidden" />

      {open && (
        <div
          className={`absolute left-0 top-full z-50 bg-black border border-white rounded-[0.625rem] ${panelWidth}`}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Blue dot — tracks hovered item, falls back to selected item */}
          {activeIndex >= 0 && (
            <span
              className="absolute left-[0.625rem] w-[0.5rem] h-[0.5rem] rounded-full bg-[#0000FF] transition-all duration-100"
              style={{ top: getDotTop(activeIndex) }}
            />
          )}
          {/* Options list */}
          <div className="flex flex-col pl-[1.75rem] py-[0.625rem]">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onMouseEnter={() => setHovered(opt)}
                onClick={() => {
                  onChange(opt);
                  onToggle();
                  setHovered(null);
                }}
                className="w-full text-left text-white text-[1.125rem] leading-[1.75rem] md:text-[0.875rem] md:leading-[1.5rem] font-body font-normal"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string) => (value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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

  // Figma mobile (420px canvas): ~139px left col, ~70px gap, ~151px right col
  // On 390px screen with 1.4rem side padding → ~345px form width → ~137px per col with 70px gap
  const mobileGridClass = 'grid grid-cols-2 gap-x-[4.375rem] items-end md:items-start md:gap-x-[1.38rem] pl-[1.75rem] md:pl-0';

  return (
    <form onSubmit={handleSubmit}>
      {/* Row 1: First Name + Last Name */}
      <div className={mobileGridClass}>
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
      <div className={mobileGridClass}>
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
      <div className={mobileGridClass}>
        <FloatingSelect
          name="platform"
          value={formData.platform}
          onChange={handleSelectChange('platform')}
          label="Current E-Commerce Platform"
          options={platformOptions ?? []}
          open={openDropdown === 'platform'}
          onToggle={() => setOpenDropdown((v) => v === 'platform' ? null : 'platform')}
          panelWidth="w-full md:w-[14rem]"
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
      <div className={mobileGridClass}>
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
          onChange={handleSelectChange('hearAboutUs')}
          label="How did you hear about us?"
          options={hearAboutUsOptions ?? []}
          open={openDropdown === 'hearAboutUs'}
          onToggle={() => setOpenDropdown((v) => v === 'hearAboutUs' ? null : 'hearAboutUs')}
          panelWidth="w-full md:w-[21.8125rem]"
        />
      </div>

      {/* Project Description */}
      {/* Figma mobile: label 14px/16px white, gap 16px, textarea 347×137px rounded-10px */}
      {/* gap between textarea and submit: 15px */}
      <div className="mt-[0.625rem] pr-[5rem] md:pr-0">
        <label className="block text-white text-[1.25rem] leading-[1.5rem] md:text-[0.875rem] md:leading-[1rem] font-body font-normal mb-[2rem] md:mb-[1rem]">
          Project Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full md:w-[27.625rem] h-[13rem] md:h-[8.5625rem] rounded-[0.625rem] bg-[#D9D9D9] text-black outline-none resize-none text-[1.25rem] leading-[1.5rem] md:text-[0.875rem] md:leading-[1rem] font-body font-normal p-[0.75rem] md:p-[1.5rem]"
        />
      </div>

      {/* Submit — Figma: 100.66×37.147px, rounded-10px, white bg, black text, 14px mono medium */}
      <div className={`mt-[2rem] md:mt-[0.9375rem] pb-[4rem] md:pb-0 ${submitError ? 'mb-2' : ''}`}>
        {submitError && (
          <p className="text-red-400 mb-2 text-[0.83rem] font-body font-normal leading-[1.143]">
            Something went wrong. Please try again.
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="bg-white text-black border-2 border-white hover:bg-black hover:text-white hover:border-white transition-[background-color,color,border-color] duration-[400ms] ease-in-out disabled:opacity-50 font-mono font-medium rounded-[0.625rem] text-[1.3125rem] leading-[1.5rem] w-[9.437rem] h-[3.482rem] md:text-[0.875rem] md:leading-[1rem] md:w-[6.29125rem] md:h-[2.3216875rem]"
        >
          {submitting ? '...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
