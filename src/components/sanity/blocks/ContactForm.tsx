'use client';

import { useState } from 'react';

interface FormLabels {
  namePlaceholder?: string | null;
  companyPlaceholder?: string | null;
  emailPlaceholder?: string | null;
  phonePlaceholder?: string | null;
  platformLabel?: string | null;
  countryPlaceholder?: string | null;
  hearAboutUsLabel?: string | null;
  projectDescriptionLabel?: string | null;
  submitLabel?: string | null;
  successMessage?: string | null;
  errorMessage?: string | null;
}

interface ContactFormProps {
  platformOptions?: string[] | null;
  hearAboutUsOptions?: string[] | null;
  labels?: FormLabels | null;
}

const fieldClass = 'w-full bg-transparent text-white font-body font-normal text-[1.5rem] leading-[1.812rem] text-[#585858] focus:outline-none placeholder-[#585858] py-[0.6rem]';
const labelClass = 'w-full font-body font-normal text-[1.5rem] leading-[1.812rem] text-[#585858] cursor-pointer flex justify-between items-center py-[0.6rem]';

function DropdownMenu({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (opt: string) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const activeItem = hovered ?? selected ?? null;
  const activeIndex = activeItem ? options.indexOf(activeItem) : -1;

  return (
    <div
      className="absolute left-0 top-full z-50 bg-black border border-white rounded-[0.625rem] w-[21.8125rem] mt-1"
      onMouseLeave={() => setHovered(null)}
    >
      <div className="relative flex flex-col py-[0.625rem] pl-[2.0625rem] pr-[1rem]">
        {activeIndex >= 0 && (
          <span
            className="absolute left-[0.8125rem] w-[0.5rem] h-[0.5rem] rounded-full bg-[#0000FF] transition-all duration-150"
            style={{ top: `calc(0.625rem + ${activeIndex} * 1.5rem + 0.375rem)` }}
          />
        )}
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onMouseEnter={() => setHovered(opt)}
            onClick={() => onSelect(opt)}
            className={`text-left font-body font-normal text-[0.875rem] leading-[1.5rem] ${opt === selected ? 'text-white' : 'text-[#585858]'} hover:text-white`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ContactForm({ platformOptions = [], hearAboutUsOptions = [], labels }: ContactFormProps): React.ReactElement {
  const l = {
    namePlaceholder: labels?.namePlaceholder || 'Name *',
    companyPlaceholder: labels?.companyPlaceholder || 'Company Name',
    emailPlaceholder: labels?.emailPlaceholder || 'Work Email *',
    phonePlaceholder: labels?.phonePlaceholder || 'Phone Number',
    platformLabel: labels?.platformLabel || 'Current E-Commerce Platform',
    countryPlaceholder: labels?.countryPlaceholder || 'Country / Region *',
    hearAboutUsLabel: labels?.hearAboutUsLabel || 'How did you hear about us?',
    projectDescriptionLabel: labels?.projectDescriptionLabel || 'Project Description',
    submitLabel: labels?.submitLabel || 'Submit',
    successMessage: labels?.successMessage || "Thanks! We'll be in touch soon.",
    errorMessage: labels?.errorMessage || 'Something went wrong. Please try again.',
  };
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    platform: '',
    country: '',
    hearAboutUs: '',
    description: '',
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
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
    return <p className="text-white font-body font-normal text-[1.5rem] leading-[1.208]">{l.successMessage}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-0">
      <input name="name" value={formData.name} onChange={handleChange} placeholder={l.namePlaceholder} required className={fieldClass} />
      <input name="company" value={formData.company} onChange={handleChange} placeholder={l.companyPlaceholder} className={fieldClass} />
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder={l.emailPlaceholder} required className={fieldClass} />
      <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder={l.phonePlaceholder} className={fieldClass} />

      {/* Current E-Commerce Platform */}
      <div className="relative">
        <button type="button" onClick={() => setOpenDropdown((v) => v === 'platform' ? null : 'platform')} className={labelClass}>
          <span className={formData.platform ? 'text-white' : ''}>{formData.platform || l.platformLabel}</span>
        </button>
        {openDropdown === 'platform' && (
          <DropdownMenu
            options={platformOptions ?? []}
            selected={formData.platform}
            onSelect={(opt) => { setFormData((p) => ({ ...p, platform: opt })); setOpenDropdown(null); }}
          />
        )}
      </div>

      <input name="country" value={formData.country} onChange={handleChange} placeholder={l.countryPlaceholder} required className={fieldClass} />

      {/* How did you hear about us */}
      <div className="relative mt-[-0.4rem]">
        <button type="button" onClick={() => setOpenDropdown((v) => v === 'hearAboutUs' ? null : 'hearAboutUs')} className="w-full font-body font-bold text-[1.5rem] leading-[1.812rem] text-white flex items-center cursor-pointer py-[0.6rem]">
          <span>{formData.hearAboutUs || l.hearAboutUsLabel}</span>
        </button>
        {openDropdown === 'hearAboutUs' && (
          <DropdownMenu
            options={hearAboutUsOptions ?? []}
            selected={formData.hearAboutUs}
            onSelect={(opt) => { setFormData((p) => ({ ...p, hearAboutUs: opt })); setOpenDropdown(null); }}
          />
        )}
      </div>

      {/* Project Description */}
      <div className="flex flex-col gap-[1.5rem] mt-[1.75rem]">
        <span className="font-body font-bold text-[1.5rem] leading-[1.812rem] text-white">{l.projectDescriptionLabel}</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-[83%] h-[13.84rem] bg-transparent border border-white rounded-[0.625rem] text-white font-body font-normal text-[1.5rem] leading-[1.812rem] p-[1rem] focus:outline-none resize-none"
        />
      </div>

      {/* Submit */}
      {submitError && (
        <p className="text-red-400 text-[0.875rem] font-body font-normal">{l.errorMessage}</p>
      )}
      <div className="mt-[1.5rem]">
        <button
          type="submit"
          disabled={submitting}
          className="bg-white text-black font-mono font-medium text-[0.875rem] leading-[1rem] uppercase rounded-[30px] px-[2rem] py-[0.875rem] hover:bg-transparent hover:text-white border-2 border-white transition-[background-color,color] duration-300 disabled:opacity-50"
        >
          {submitting ? '...' : l.submitLabel}
        </button>
      </div>
    </form>
  );
}
