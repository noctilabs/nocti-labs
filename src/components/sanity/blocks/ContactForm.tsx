'use client';

import { useState } from 'react';

/**
 * Spacing derived from Figma node 2089:22 (form frame) absolute positions.
 * Label 14px/16px line-height; row step ~38px; label→input ~11px.
 */
const SPACING = {
  labelToInput: 11,
  betweenRows: 38,
  phoneRowToProjectDesc: 17,
  projectDescLabelToTextarea: 17,
  textareaToButton: 19,
  formColumnGap: 20,
} as const;

/** Vertical space reserved above input when label is floated. */
const FLOATING_LABEL_TOP_SPACE = 18;
/** Offset so resting label sits slightly above the input border. */
const LABEL_RESTING_TOP_OFFSET = 4;
/** Total height of the floating field wrapper (label area + input area). */
const FLOATING_FIELD_HEIGHT = 42;
/** Top margin so floated label does not hit the bottom border of the field above. */
const FLOATING_FIELD_TOP_MARGIN = 8;

/**
 * Sizes from Figma node 2089:22 (absoluteBoundingBox / style).
 * Copy S: 14px, lineHeight 16. Button & textarea cornerRadius 10.
 */
const SIZES = {
  textareaHeight: 136.83,
  textareaWidth: 442,
  submitWidth: 100.66,
  submitHeight: 37.15,
  borderRadius: 10,
  inputLineWidth: 211,
} as const;

interface FloatingFieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label: string;
  required?: boolean;
  type?: string;
  inputStyle?: React.CSSProperties;
  labelClassName?: string;
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
  labelClassName,
  isTextarea = false,
}: FloatingFieldProps): React.ReactElement {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  const baseInputClasses =
    'w-full h-full bg-transparent border-b-2 border-white text-white font-body text-[14px] leading-[16px] pt-0 pb-2 focus:outline-none box-border';
  const labelBase =
    'font-body text-[14px] font-normal leading-[16px] text-[#d9d9d9] block absolute left-0 transition-all duration-200 pointer-events-none';
  const labelStyle: React.CSSProperties = {
    top: floated ? 0 : FLOATING_LABEL_TOP_SPACE - LABEL_RESTING_TOP_OFFSET,
    color: floated ? '#d9d9d9' : 'rgba(255, 255, 255, 0.65)',
  };
  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    paddingTop: FLOATING_LABEL_TOP_SPACE,
    minHeight: FLOATING_FIELD_HEIGHT,
    marginTop: FLOATING_FIELD_TOP_MARGIN,
  };
  const inputWrapperStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: FLOATING_LABEL_TOP_SPACE,
    bottom: 0,
  };
  if (isTextarea) {
    const textareaClasses =
      'w-full bg-[#D9D9D9] text-black font-body text-[14px] leading-[16px] focus:outline-none resize-none';
    return (
      <div style={wrapperStyle}>
        <label
          htmlFor={name}
          className={`${labelBase} ${labelClassName ?? ''}`}
          style={labelStyle}
        >
          {label}
        </label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={textareaClasses}
          style={{
            height: SIZES.textareaHeight,
            borderRadius: SIZES.borderRadius,
            padding: '12px',
            ...inputStyle,
          }}
        />
      </div>
    );
  }
  return (
    <div style={wrapperStyle}>
      <label
        htmlFor={name}
        className={`${labelBase} ${labelClassName ?? ''}`}
        style={labelStyle}
      >
        {label}
      </label>
      <div style={inputWrapperStyle}>
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={baseInputClasses}
          style={inputStyle}
          required={required}
        />
      </div>
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
      <p className="font-body text-[14px] text-white">
        Thanks! We&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Row 1: First Name + Last Name */}
      <div
        className="grid grid-cols-2 mb-0"
        style={{ gap: SPACING.formColumnGap, marginBottom: 0 }}
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
        className="grid grid-cols-2 mb-0"
        style={{ gap: SPACING.formColumnGap, marginBottom: 0 }}
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
        className="grid grid-cols-2 mb-0"
        style={{ gap: SPACING.formColumnGap, marginBottom: 0 }}
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
        className="grid grid-cols-2 mb-0"
        style={{
          gap: SPACING.formColumnGap,
          marginBottom: SPACING.phoneRowToProjectDesc,
        }}
      >
        <FloatingField
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          label="Phone Number"
          type="tel"
        />
      </div>

      {/* Project Description — label above textarea, label→textarea 17px, textarea→button 19px */}
      <div style={{ marginTop: 25, marginBottom: SPACING.textareaToButton }}>
        <label
          className="font-body text-[14px] font-normal leading-[16px] text-white block"
          style={{ marginBottom: SPACING.projectDescLabelToTextarea }}
        >
          Project Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-[#D9D9D9] text-black font-body text-[14px] leading-[16px] focus:outline-none resize-none"
          style={{
            height: SIZES.textareaHeight,
            borderRadius: SIZES.borderRadius,
            padding: '12px',
          }}
        />
      </div>

      {/* Submit — 100.66×37.15, cornerRadius 10 */}
      <div style={{ marginBottom: submitError ? 8 : 0 }}>
        {submitError && (
          <p className="font-body text-[12px] text-red-400 mb-2">
            Something went wrong. Please try again.
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="bg-white text-black font-mono text-[14px] font-semibold hover:opacity-80 transition disabled:opacity-50"
          style={{
            width: SIZES.submitWidth,
            height: SIZES.submitHeight,
            borderRadius: SIZES.borderRadius,
          }}
        >
          {submitting ? '...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
