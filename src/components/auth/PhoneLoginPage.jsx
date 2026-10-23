import React, { useState } from 'react';
import { Dumbbell, Phone, ArrowRight, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { loginWithPhone } from '../../services/phoneAuthService';

export default function PhoneLoginPage({ onLoginSuccess }) {
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Extract clean digits
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  const isValid = cleanNumber.length === 10;

  const handlePhoneChange = (e) => {
    // Only accept numbers, maximum 10 digits
    const rawVal = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(rawVal);
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      const user = await loginWithPhone(cleanNumber, countryCode);
      onLoginSuccess(user);
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please check your number.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="phone-login-container">
      <div className="login-ambient-orb orb-cyan" aria-hidden="true" />
      <div className="login-ambient-orb orb-cobalt" aria-hidden="true" />

      <div className="phone-login-card simple-card">
        <div className="phone-login-header">
          <div className="brand-icon-wrapper login-brand-icon">
            <Dumbbell className="brand-icon" size={26} />
          </div>
          <h1 className="brand-name">
            BYCE <span className="brand-accent">GYM</span>
          </h1>
          <p className="phone-login-tagline">Enter your phone number to continue</p>
        </div>

        {errorMessage && (
          <div className="phone-error-alert" role="alert">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="phone-form">
          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="phone-input" className="form-label">
                Mobile Number
              </label>
              {cleanNumber.length > 0 && (
                <span className={`phone-digit-counter ${isValid ? 'valid' : ''}`}>
                  {cleanNumber.length}/10 {isValid && <CheckCircle2 size={13} className="text-success" />}
                </span>
              )}
            </div>

            <div className="phone-input-combo">
              <select
                className="country-select"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                aria-label="Country Code"
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+971">🇦🇪 +971</option>
              </select>

              <div className="phone-field-wrapper">
                <Phone size={17} className="phone-icon-inline" />
                <input
                  id="phone-input"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className={`phone-text-input ${isValid ? 'is-valid' : ''}`}
                  placeholder="Enter 10-digit number"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={10}
                  required
                  autoFocus
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block-submit"
            disabled={isLoading || (!isValid && cleanNumber.length > 0)}
          >
            {isLoading ? (
              <>
                <span className="btn-spinner" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In with Phone</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        <div className="phone-login-footer">
          <ShieldCheck size={14} />
          <span>Simple & Secure Gym Management Access</span>
        </div>
      </div>
    </div>
  );
}
