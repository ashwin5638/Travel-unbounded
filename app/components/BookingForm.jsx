"use client";

import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const initialForm = {
  fullName: "",
  contactNumber: "",
  countryCode: "+91",
  email: "",
  dateOfTravel: "",
  numberOfPeople: 1,
  hotelCategory: "Standard",
  numberOfChildren: 0,
};

const hotelCategories = ["Standard", "Deluxe", "Luxury"];

const countryCodes = [
  { code: "+91", label: "India (+91)" },
  { code: "+1", label: "US / Canada (+1)" },
  { code: "+44", label: "United Kingdom (+44)" },
  { code: "+61", label: "Australia (+61)" },
  { code: "+254", label: "Kenya (+254)" },
  { code: "+84", label: "Vietnam (+84)" },
  { code: "+94", label: "Sri Lanka (+94)" },
  { code: "+354", label: "Iceland (+354)" },
  { code: "+977", label: "Nepal (+977)" },
  { code: "+971", label: "UAE (+971)" },
  { code: "+65", label: "Singapore (+65)" },
  { code: "+60", label: "Malaysia (+60)" },
];

const BookingForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (form.fullName.trim().length < 2) {
      newErrors.fullName = "Enter a valid name.";
    }

    if (!/^\d{7,15}$/.test(form.contactNumber)) {
      newErrors.contactNumber = "Enter a valid phone number.";
    }

    if (!/^\+\d{1,4}$/.test(form.countryCode)) {
      newErrors.countryCode = "Enter a valid country code.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (!form.dateOfTravel) {
      newErrors.dateOfTravel = "Travel date is required.";
    } else {
      const selectedDate = new Date(`${form.dateOfTravel}T00:00:00`);
      if (selectedDate <= new Date()) {
        newErrors.dateOfTravel = "Travel date must be in the future.";
      }
    }

    if (Number(form.numberOfPeople) < 1) {
      newErrors.numberOfPeople = "At least one traveller is required.";
    }

    if (Number(form.numberOfChildren) < 0) {
      newErrors.numberOfChildren = "Children cannot be negative.";
    }

    if (!hotelCategories.includes(form.hotelCategory)) {
      newErrors.hotelCategory = "Select a valid hotel category.";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          numberOfPeople: Number(form.numberOfPeople),
          numberOfChildren: Number(form.numberOfChildren),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: data.message || "Something went wrong." });
        return;
      }

      setStatus({ type: "success", message: "Thank you! Our travel expert will contact you within 24 hours." });
      setForm(initialForm);
    } catch (error) {
      console.error("Error submitting booking form:", error);
      setStatus({ type: "error", message: "Network error. Please check your connection and try again." });
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full rounded-2xl border bg-background px-4 py-3 text-sm text-ink placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors";

  return (
    <section id="booking" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border-soft bg-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-strong">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
            </svg>
            Plan your trip
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Start your <em className="text-accent not-italic">journey</em>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            Fill in the details below and our travel curators will craft a
            personalised itinerary just for you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-3xl bg-card p-6 shadow-xl shadow-sky-950/5 sm:p-10"
          noValidate
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold text-ink">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                value={form.fullName}
                onChange={handleChange}
                className={`${inputBase} ${errors.fullName ? "border-red-400 focus:border-red-500 focus:ring-red-400/40" : "border-border-soft"}`}
              />
              {errors.fullName && (
                <p className="mt-1.5 text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Country Code */}
            <div>
              <label htmlFor="countryCode" className="mb-1.5 block text-sm font-semibold text-ink">
                Country Code
              </label>
              <select
                id="countryCode"
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                className={`${inputBase} cursor-pointer ${errors.countryCode ? "border-red-400 focus:border-red-500 focus:ring-red-400/40" : "border-border-soft"}`}
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              {errors.countryCode && (
                <p className="mt-1.5 text-xs text-red-500">{errors.countryCode}</p>
              )}
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="contactNumber" className="mb-1.5 block text-sm font-semibold text-ink">
                Contact Number
              </label>
              <input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                autoComplete="tel"
                placeholder="9820012345"
                value={form.contactNumber}
                onChange={handleChange}
                className={`${inputBase} ${errors.contactNumber ? "border-red-400 focus:border-red-500 focus:ring-red-400/40" : "border-border-soft"}`}
              />
              {errors.contactNumber && (
                <p className="mt-1.5 text-xs text-red-500">{errors.contactNumber}</p>
              )}
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={`${inputBase} ${errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-400/40" : "border-border-soft"}`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Date of Travel */}
            <div>
              <label htmlFor="dateOfTravel" className="mb-1.5 block text-sm font-semibold text-ink">
                Date of Travel
              </label>
              <input
                id="dateOfTravel"
                name="dateOfTravel"
                type="date"
                value={form.dateOfTravel}
                onChange={handleChange}
                className={`${inputBase} ${errors.dateOfTravel ? "border-red-400 focus:border-red-500 focus:ring-red-400/40" : "border-border-soft"}`}
              />
              {errors.dateOfTravel && (
                <p className="mt-1.5 text-xs text-red-500">{errors.dateOfTravel}</p>
              )}
            </div>

            {/* Hotel Category */}
            <div>
              <label htmlFor="hotelCategory" className="mb-1.5 block text-sm font-semibold text-ink">
                Hotel Category
              </label>
              <select
                id="hotelCategory"
                name="hotelCategory"
                value={form.hotelCategory}
                onChange={handleChange}
                className={`${inputBase} cursor-pointer ${errors.hotelCategory ? "border-red-400 focus:border-red-500 focus:ring-red-400/40" : "border-border-soft"}`}
              >
                {hotelCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.hotelCategory && (
                <p className="mt-1.5 text-xs text-red-500">{errors.hotelCategory}</p>
              )}
            </div>

            {/* Number of People */}
            <div>
              <label htmlFor="numberOfPeople" className="mb-1.5 block text-sm font-semibold text-ink">
                Travellers
              </label>
              <input
                id="numberOfPeople"
                name="numberOfPeople"
                type="number"
                min="1"
                value={form.numberOfPeople}
                onChange={handleChange}
                className={`${inputBase} ${errors.numberOfPeople ? "border-red-400 focus:border-red-500 focus:ring-red-400/40" : "border-border-soft"}`}
              />
              {errors.numberOfPeople && (
                <p className="mt-1.5 text-xs text-red-500">{errors.numberOfPeople}</p>
              )}
            </div>

            {/* Number of Children */}
            <div>
              <label htmlFor="numberOfChildren" className="mb-1.5 block text-sm font-semibold text-ink">
                Children
              </label>
              
              <input
                id="numberOfChildren"
                name="numberOfChildren"
                type="number"
                min="0"
                value={form.numberOfChildren}
                onChange={handleChange}
                className={`${inputBase} ${errors.numberOfChildren ? "border-red-400 focus:border-red-500 focus:ring-red-400/40" : "border-border-soft"}`}
              />
              {errors.numberOfChildren && (
                <p className="mt-1.5 text-xs text-red-500">{errors.numberOfChildren}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-accent-strong px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <LoadingSpinner size="h-4 w-4" />
                Submitting...
              </>
            ) : (
              <>
                Submit Enquiry
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </>
            )}
          </button>

          <div
            aria-live="polite"
            className={`mt-4 min-h-5 text-center text-sm font-medium ${
              status?.type === "success"
                ? "text-green-600"
                : status?.type === "error"
                  ? "text-red-500"
                  : ""
            } ${status ? "" : "opacity-0"}`}
          >
            {status?.message}
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
