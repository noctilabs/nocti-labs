'use client';

import { useState } from 'react';

/**
 * Figma node 2032:5 — form fields.
 * Each field group is 26.83px tall (label 16px + gap + 1px line).
 * Row step 38.39px at 1445px viewport. Column gap 20px.
 * All spacing proportional via vw.
 */

interface FloatingFieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label: string;
  required?: boolean;
  type?: string;
  inputStyle?: React.CSSProperties;
  isTextarea?: boolean;
}

function FloatingField({
  name,
  value,
  onChange,
  label,
  required = false,
  type = 'text',
  inputStyle,
  isTextarea = false,
}: FloatingFieldProps): React.ReactElement {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  const fontStyle: React.CSSProperties = {
    fontSize: 'clamp(11px, 0.97vw, 100vw)',
    fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 400,
    fontStyle: 'normal',
    lineHeight: '1.143',
    letterSpacing: '0',
  };
  const labelStyle: React.CSSProperties = {
    ...fontStyle,
    display: 'block',
    color: floated ? '#d9d9d9' : '#d9d9d9',
  };
  if (isTextarea) {
    return (
      <div style={{ marginBottom: 'clamp(8px, 0.8vw, 100vw)' }}>
        <label htmlFor={name} style={labelStyle}>
          {label}
        </label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-[#D9D9D9] text-black focus:outline-none resize-none"
          style={{
            height: 'clamp(80px, 9.47vw, 100vw)',
            borderRadius: 'clamp(6px, 0.69vw, 100vw)',
            padding: 'clamp(8px, 0.83vw, 100vw)',
            marginTop: 'clamp(10px, 1.21vw, 100vw)',
            ...fontStyle,
            ...inputStyle,
          }}
        />
      </div>
    );
  }
  return (
    <div
      style={{
        marginBottom: 'clamp(8px, 0.8vw, 100vw)',
        position: 'relative',
        borderBottom: '1px solid white',
        paddingBottom: 'clamp(6px, 0.75vw, 100vw)',
      }}
    >
      <label
        htmlFor={name}
        style={{
          ...labelStyle,
          opacity: floated ? 0 : 1,
          transition: 'opacity 0.15s',
        }}
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
        className="bg-transparent text-white focus:outline-none"
        style={{
          ...fontStyle,
          ...inputStyle,
          color: 'white',
          border: 'none',
          padding: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
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
      <p
        className="text-white"
        style={{
          fontSize: 'clamp(11px, 0.97vw, 100vw)',
          fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontWeight: 400,
          lineHeight: '1.143',
        }}
      >
        Thanks! We&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Row 1: First Name + Last Name */}
      <div
        className="grid grid-cols-2"
        style={{ gap: 'clamp(12px, 1.38vw, 100vw)' }}
      >
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
      <div
        className="grid grid-cols-2"
        style={{ gap: 'clamp(12px, 1.38vw, 100vw)' }}
      >
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
      <div
        className="grid grid-cols-2"
        style={{ gap: 'clamp(12px, 1.38vw, 100vw)' }}
      >
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
      <div
        className="grid grid-cols-2"
        style={{ gap: 'clamp(12px, 1.38vw, 100vw)' }}
      >
        <FloatingField
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          label="Phone Number"
          type="tel"
        />
      </div>

      {/* Project Description */}
      <div style={{ marginTop: 'clamp(10px, 1.21vw, 100vw)', marginBottom: 'clamp(12px, 1.31vw, 100vw)' }}>
        <label
          className="block text-white"
          style={{
            fontSize: 'clamp(11px, 0.97vw, 100vw)',
            fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 400,
            lineHeight: '1.143',
          }}
        >
          Project Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-[#D9D9D9] text-black focus:outline-none resize-none"
          style={{
            height: 'clamp(80px, 9.47vw, 100vw)',
            borderRadius: 'clamp(6px, 0.69vw, 100vw)',
            padding: 'clamp(8px, 0.83vw, 100vw)',
            marginTop: 'clamp(10px, 1.21vw, 100vw)',
            fontSize: 'clamp(11px, 0.97vw, 100vw)',
            fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 400,
            lineHeight: '1.143',
          }}
        />
      </div>

      {/* Submit — 100.66×37.15, cornerRadius 10 */}
      <div style={{ marginBottom: submitError ? 8 : 0 }}>
        {submitError && (
          <p
            className="text-red-400 mb-2"
            style={{
              fontSize: 'clamp(10px, 0.83vw, 100vw)',
              fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 400,
              lineHeight: '1.143',
            }}
          >
            Something went wrong. Please try again.
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="bg-white text-black hover:opacity-80 transition disabled:opacity-50"
          style={{
            width: 'clamp(70px, 6.97vw, 100vw)',
            height: 'clamp(28px, 2.57vw, 100vw)',
            borderRadius: 'clamp(6px, 0.69vw, 100vw)',
            fontSize: 'clamp(11px, 0.97vw, 100vw)',
            fontFamily: 'var(--font-mono), "Courier New", Courier, monospace',
            fontWeight: 500,
            lineHeight: '1.143',
          }}
        >
          {submitting ? '...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
