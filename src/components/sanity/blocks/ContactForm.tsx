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

// Figma: items at 14px/16px line-height, panel padding 0.625rem top/bottom
// Red dot: 8px, positioned left-[3px], vertically centered on active item row
// Item height = 1rem (16px line-height), py-[0.625rem] = 10px top padding
// dot center offset = 0.625rem + (itemIndex * 1rem) + 0.5rem (half item height)
function getRedDotTop(index: number): string {
  // 0.625rem top padding + index * 1rem line-height + 0.25rem (center of 0.5rem dot)
  return `calc(0.625rem + ${index} * 1rem + 0.25rem)`;
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
    <div className="mb-[1.323375rem] relative border-b border-white pb-[0.75rem]">
      <button
        type="button"
        onClick={onToggle}
        className={`w-full text-left focus:outline-none flex justify-between items-center ${fieldTextClass} ${value ? 'text-white' : 'text-[#d9d9d9]'}`}
      >
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">{value || label}</span>
        <svg
          className={`w-3 h-3 shrink-0 ml-2 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute left-0 top-full z-50 bg-[#d9d9d9] ${panelWidth}`}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Red dot — tracks hovered item, falls back to selected item */}
          {activeIndex >= 0 && (
            <span
              className="absolute left-[0.1875rem] w-[0.5rem] h-[0.5rem] rounded-full bg-red-500 transition-all duration-100"
              style={{ top: getRedDotTop(activeIndex) }}
            />
          )}
          {/* Options list */}
          <div className="flex flex-col pl-[0.9375rem] py-[0.625rem]">
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
                className={`w-full text-left ${fieldTextClass} text-black leading-[1rem]`}
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

interface FormFields {
  firstName?: string; lastName?: string; email?: string; company?: string;
  platform?: string; country?: string; phone?: string; hearAboutUs?: string;
  projectDescription?: string; submitButton?: string;
}

interface ContactFormProps {
  platformOptions?: string[] | null;
  hearAboutUsOptions?: string[] | null;
  platformsDataSanity?: string;
  hearAboutUsDataSanity?: string;
  formFields?: FormFields;
  fieldDataSanity?: Partial<Record<keyof FormFields, string | undefined>>;
}

export default function ContactForm({ platformOptions = [], hearAboutUsOptions = [], platformsDataSanity, hearAboutUsDataSanity, formFields, fieldDataSanity }: ContactFormProps): React.ReactElement {
  const f = (key: keyof FormFields, fallback: string) => formFields?.[key] || fallback
  const ds = (key: keyof FormFields) => fieldDataSanity?.[key] ? { 'data-sanity': fieldDataSanity[key] } : {}
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

  return (
    <form onSubmit={handleSubmit}>
      {/* Row 1: First Name + Last Name */}
      <div className="grid grid-cols-2 gap-[1.38rem]">
        <div {...ds('firstName')}>
          <FloatingField name="firstName" value={formData.firstName} onChange={handleChange} label={f('firstName', 'First Name *')} required />
        </div>
        <div {...ds('lastName')}>
          <FloatingField name="lastName" value={formData.lastName} onChange={handleChange} label={f('lastName', 'Last Name *')} required />
        </div>
      </div>

      {/* Row 2: Work Email + Company Name */}
      <div className="grid grid-cols-2 gap-[1.38rem]">
        <div {...ds('email')}>
          <FloatingField name="email" value={formData.email} onChange={handleChange} label={f('email', 'Work Email *')} type="email" required />
        </div>
        <div {...ds('company')}>
          <FloatingField name="company" value={formData.company} onChange={handleChange} label={f('company', 'Company Name *')} required />
        </div>
      </div>

      {/* Row 3: Current E-Commerce Platform + Country / Region */}
      <div className="grid grid-cols-2 gap-[1.38rem]">
        <div {...(platformsDataSanity ? { 'data-sanity': platformsDataSanity } : {})} {...ds('platform')}>
          <FloatingSelect
            name="platform"
            value={formData.platform}
            onChange={handleSelectChange('platform')}
            label={f('platform', 'Current E-Commerce Platform')}
            options={platformOptions ?? []}
            open={openDropdown === 'platform'}
            onToggle={() => setOpenDropdown((v) => v === 'platform' ? null : 'platform')}
            panelWidth="w-[14rem]"
          />
        </div>
        <div {...ds('country')}>
          <FloatingField name="country" value={formData.country} onChange={handleChange} label={f('country', 'Country / Region *')} required />
        </div>
      </div>

      {/* Row 4: Phone Number + How did you hear about us */}
      <div className="grid grid-cols-2 gap-[1.38rem]">
        <div {...ds('phone')}>
          <FloatingField name="phone" value={formData.phone} onChange={handleChange} label={f('phone', 'Phone Number')} type="tel" />
        </div>
        <div {...(hearAboutUsDataSanity ? { 'data-sanity': hearAboutUsDataSanity } : {})} {...ds('hearAboutUs')}>
          <FloatingSelect
            name="hearAboutUs"
            value={formData.hearAboutUs}
            onChange={handleSelectChange('hearAboutUs')}
            label={f('hearAboutUs', 'How did you hear about us?')}
            options={hearAboutUsOptions ?? []}
            open={openDropdown === 'hearAboutUs'}
            onToggle={() => setOpenDropdown((v) => v === 'hearAboutUs' ? null : 'hearAboutUs')}
            panelWidth="w-[21.8125rem]"
          />
        </div>
      </div>

      {/* Project Description */}
      <div className="mt-[0.625rem]" {...ds('projectDescription')}>
        <label className={`block text-white ${fieldTextClass} mb-[1.0625rem]`}>
          {f('projectDescription', 'Project Description')}
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
          {...ds('submitButton')}
        >
          {submitting ? '...' : f('submitButton', 'Submit')}
        </button>
      </div>
    </form>
  );
}
