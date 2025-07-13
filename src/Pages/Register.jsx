import React, { useState } from "react";
import "./register.css";
import {motion} from "framer-motion";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';

const genderOptions = ["MALE", "FEMALE", "OTHER"];
const maritalStatusOptions = ["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"];
const occupationOptions = ["EMPLOYED", "SELF_EMPLOYED", "STUDENT", "RETIRED", "UNEMPLOYED"];
const categoryOptions = ["GENERAL", "OBC", "SC", "ST"];
const religionOptions = ["HINDU", "MUSLIM", "CHRISTIAN", "SIKH", "OTHER"];
const citizenOptions = ["INDIA", "NRI"];
const relationshipOptions = ["FATHER", "MOTHER", "SPOUSE", "CHILD", "OTHER"];

// Stepper steps
const steps = [
  'Verification',
  'Basic Details',
  'Contact Details',
  'Nominee Details',
  'KYC Details',
  'Review & Submit',
];

const indianStatesAndUTs = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

const countryOptions = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo, Democratic Republic of the",
  "Congo, Republic of the",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

const RegisterForm = () => {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    // UsersRequestDTO fields
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    fatherName: "",
    motherName: "",
    maritalStatus: "",
    spouseName: "",
    occupation: "",
    salary: "",
    citizen: "",
    category: "",
    religion: "",
    // ContactDetailsRequestDTO
    contactDetails: {
      mobileNumber: "",
      email: "",
      communicationAddress: "",
      permanentAddress: "",
      city: "",
      state: "",
      zip: "",
      landmark: "",
      country: "",
      alternateMobileNumber: "",
      alternateEmail: "",
    },
    // NomineeRequestDTO
    nominee: {
      nomineeName: "",
      nomineeRelationship: "",
      nomineeDateOfBirth: "",
      nomineeMobileNumber: "",
      nomineeEmail: "",
      nomineeAadhaar: "",
      nomineePan: "",
      nomineeAddress: "",
    },
    // KycRequestDTO
    kyc: {
      aadhaarNumber: "",
      panNumber: "",
      voterId: "",
      passportNumber: "",
      drivingLicenseNumber: "",
    }
  });

  const [errors, setErrors] = useState({});
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [sameAddress, setSameAddress] = useState(false);
  const [kycFiles, setKycFiles] = useState({
    aadhaar: null,
    pan: null,
    voterId: null,
    passport: null,
    drivingLicense: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleNestedChange = (e, section) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
    setErrors((prev) => ({ ...prev, [`${section}.${name}`]: undefined }));
  };

  const handleKycFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file && !["image/jpeg", "application/pdf"].includes(file.type)) {
      setErrors((prev) => ({ ...prev, [field + "File"]: "Only JPG or PDF allowed" }));
      return;
    }
    setKycFiles((prev) => ({ ...prev, [field]: file }));
    setErrors((prev) => ({ ...prev, [field + "File"]: undefined }));
  };

  const validateStep = () => {
    let newErrors = {};
    const nameFields = [
      { key: 'firstName', value: formData.firstName },
      { key: 'middleName', value: formData.middleName },
      { key: 'lastName', value: formData.lastName },
      { key: 'fatherName', value: formData.fatherName },
      { key: 'motherName', value: formData.motherName },
      { key: 'spouseName', value: formData.spouseName },
      { key: 'nominee.nomineeName', value: formData.nominee.nomineeName },
    ];
    nameFields.forEach(({ key, value }) => {
      if (value && /[0-9]/.test(value)) {
        newErrors[key] = 'Name cannot contain numbers';
      }
    });
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First Name is required';
      if (!formData.lastName) newErrors.lastName = 'Last Name is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
      else {
        const birth = new Date(formData.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
        if (age < 18) newErrors.dateOfBirth = 'Minimum age is 18 to open an account';
      }
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.fatherName) newErrors.fatherName = "Father's Name is required";
      if (!formData.motherName) newErrors.motherName = "Mother's Name is required";
      if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital Status is required';
      if (formData.maritalStatus === "MARRIED" && !formData.spouseName) newErrors.spouseName = 'Spouse Name is required';
      if (!formData.occupation) newErrors.occupation = 'Occupation is required';
      if (!formData.salary) newErrors.salary = 'Salary is required';
      if (!formData.citizen) newErrors.citizen = 'Citizen is required';
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.religion) newErrors.religion = 'Religion is required';
    }
    if (step === 2) {
      const c = formData.contactDetails;
      if (!c.mobileNumber) newErrors['contactDetails.mobileNumber'] = 'Mobile Number is required';
      else if (!/^[0-9]{10}$/.test(c.mobileNumber)) newErrors['contactDetails.mobileNumber'] = 'Mobile Number must be 10 digits';
      if (!c.email) newErrors['contactDetails.email'] = 'Email is required';
      if (!c.communicationAddress) newErrors['contactDetails.communicationAddress'] = 'Communication Address is required';
      if (!c.permanentAddress) newErrors['contactDetails.permanentAddress'] = 'Permanent Address is required';
      if (!c.city) newErrors['contactDetails.city'] = 'City is required';
      if (!c.state) newErrors['contactDetails.state'] = 'State is required';
      if (!c.zip) newErrors['contactDetails.zip'] = 'Pin Code is required';
      if (!/^[1-9][0-9]{5}$/.test(c.zip)) newErrors['contactDetails.zip'] = 'Pin Code must be 6 digits';
      if (!c.country) newErrors['contactDetails.country'] = 'Country is required';
    }
    if (step === 3) {
      const n = formData.nominee;
      const userMobile = formData.contactDetails.mobileNumber;
      const userEmail = formData.contactDetails.email;
      if (!n.nomineeName) newErrors['nominee.nomineeName'] = 'Nominee Name is required';
      if (!n.nomineeRelationship) newErrors['nominee.nomineeRelationship'] = 'Relationship is required';
      if (!n.nomineeDateOfBirth) newErrors['nominee.nomineeDateOfBirth'] = 'Date of Birth is required';
      else {
        const birth = new Date(n.nomineeDateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
        if (age < 18) newErrors['nominee.nomineeDateOfBirth'] = 'Nominee must be at least 18 years old';
      }
      if (!n.nomineeMobileNumber) newErrors['nominee.nomineeMobileNumber'] = 'Mobile Number is required';
      else if (!/^[0-9]{10}$/.test(n.nomineeMobileNumber)) newErrors['nominee.nomineeMobileNumber'] = 'Mobile Number must be 10 digits';
      else if (n.nomineeMobileNumber === userMobile) newErrors['nominee.nomineeMobileNumber'] = 'Nominee mobile cannot be same as user mobile';
      if (!n.nomineeEmail) newErrors['nominee.nomineeEmail'] = 'Nominee Email is required';
      else if (n.nomineeEmail === userEmail) newErrors['nominee.nomineeEmail'] = 'Nominee email cannot be same as user email';
      if (!n.nomineeAadhaar) newErrors['nominee.nomineeAadhaar'] = 'Nominee Aadhaar is required';
      else if (!/^\d{12}$/.test(n.nomineeAadhaar)) newErrors['nominee.nomineeAadhaar'] = 'Aadhaar must be 12 digits';
      if (!n.nomineePan) newErrors['nominee.nomineePan'] = 'Nominee PAN is required';
      else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(n.nomineePan.toUpperCase())) newErrors['nominee.nomineePan'] = 'Invalid PAN format';
      if (!n.nomineeAddress) newErrors['nominee.nomineeAddress'] = 'Nominee Address is required';
    }
    if (step === 4) {
      const k = formData.kyc;
      const n = formData.nominee;
      // Aadhaar
      if (!k.aadhaarNumber) newErrors['kyc.aadhaarNumber'] = 'Aadhaar Number is required';
      else if (!/^[0-9]{12}$/.test(k.aadhaarNumber)) newErrors['kyc.aadhaarNumber'] = 'Aadhaar must be 12 digits';
      else if (k.aadhaarNumber === n.nomineeAadhaar) newErrors['kyc.aadhaarNumber'] = 'Aadhaar cannot match nominee Aadhaar';
      if (!kycFiles.aadhaar) newErrors['aadhaarFile'] = 'Aadhaar file is required';
      // PAN
      if (!k.panNumber) newErrors['kyc.panNumber'] = 'PAN Number is required';
      else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(k.panNumber.toUpperCase())) newErrors['kyc.panNumber'] = 'Invalid PAN format';
      else if (k.panNumber.toUpperCase() === n.nomineePan.toUpperCase()) newErrors['kyc.panNumber'] = 'PAN cannot match nominee PAN';
      if (!kycFiles.pan) newErrors['panFile'] = 'PAN file is required';
      // Voter ID
      if (k.voterId) {
        if (!kycFiles.voterId) newErrors['voterIdFile'] = 'Voter ID file is required';
      }
      // Passport
      if (k.passportNumber) {
        if (!kycFiles.passport) newErrors['passportFile'] = 'Passport file is required';
      }
      // Driving License
      if (k.drivingLicenseNumber) {
        if (!kycFiles.drivingLicense) newErrors['drivingLicenseFile'] = 'Driving License file is required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step < 5) {
      if (step === 0 || validateStep()) {
        setStep(step + 1);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      // placeholder: handle form submission
      console.log('Submitting form data:', formData);
    }
  };

  const getError = (name, section) => {
    if (section) return errors[`${section}.${name}`];
    return errors[name];
  };

  return (
    <div className="register-container">
      {/* Stepper moved above and outside the form box, centered, and numbered from 0 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: 4 }}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label, idx) => (
            <Step key={label}>
              <StepLabel>{`${idx}. ${label}`}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <h2 style={{ textAlign: 'center', marginBottom: 16 }}>
        Register - Step {step}: {steps[step]}
      </h2>
      <Box sx={{ maxWidth: 700, mx: 'auto', mb: 3, mt: 2, bgcolor: 'white', borderRadius: 2, p: 2, boxShadow: 1 }}>
        <form onSubmit={handleSubmit}>
          {step === 0 && (
                <div className="verification-step">
                  {/* Phone Verification */}
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      name="mobileNumber"
                      value={formData.contactDetails.mobileNumber}
                      onChange={(e) => handleNestedChange(e, "contactDetails")}
                      required
                      disabled={phoneVerified}
                      className={getError('mobileNumber', 'contactDetails') ? 'error-input' : ''}
                    />
                    {getError('mobileNumber', 'contactDetails') && <div className="error-message">{getError('mobileNumber', 'contactDetails')}</div>}
                    {!phoneOtpSent && !phoneVerified && (
                      <button type="button" className={"otp-btn"} onClick={() => {
                        if (formData.contactDetails.mobileNumber.length < 10) {
                          setErrors((prev) => ({ ...prev, ['contactDetails.mobileNumber']: 'Enter a valid phone number.' }));
                        } else {
                          setPhoneOtpSent(true);
                        }
                      }}>Send OTP</button>
                    )}
                    {phoneOtpSent && !phoneVerified && (
                      <>
                        <input
                            style={{marginTop: "10px"}}
                          placeholder="Enter phone OTP"
                          value={phoneOtp}
                          onChange={(e) => setPhoneOtp(e.target.value)}
                        />
                        <button type="button" className={"verify-btn"} onClick={() => {
                          if (phoneOtp.length >= 4) {
                            setPhoneVerified(true);
                          } else setErrors((prev) => ({ ...prev, phoneOtp: 'Invalid OTP.' }));
                        }}>Verify OTP</button>
                        {errors.phoneOtp && <div className="error-message">{errors.phoneOtp}</div>}
                      </>
                    )}
                    {phoneVerified && <span className="verified">Phone Verified</span>}
                  </div>
                  {/* Email Verification */}
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.contactDetails.email}
                      onChange={(e) => handleNestedChange(e, "contactDetails")}
                      required
                      disabled={emailVerified}
                      className={getError('email', 'contactDetails') ? 'error-input' : ''}
                    />
                    {getError('email', 'contactDetails') && <div className="error-message">{getError('email', 'contactDetails')}</div>}
                    {!emailOtpSent && !emailVerified && (
                      <button type="button" className={"otp-btn"} onClick={() => {
                        const email = formData.contactDetails.email;
                        if (!email.includes('@')) {
                          setErrors((prev) => ({ ...prev, ['contactDetails.email']: 'Please enter a valid email address.' }));
                        } else {
                          setEmailOtpSent(true);
                        }
                      }}>Send OTP</button>
                    )}
                    {emailOtpSent && !emailVerified && (
                      <>
                        <input
                            style={{marginTop: "10px"}}
                          placeholder="Enter email OTP"
                          value={emailOtp}
                          onChange={(e) => setEmailOtp(e.target.value)}
                        />
                        <button type="button" className={"verify-btn"} onClick={() => {
                          if (emailOtp.length >= 4) {
                            setEmailVerified(true);
                          } else setErrors((prev) => ({ ...prev, emailOtp: 'Invalid OTP.' }));
                        }}>Verify OTP</button>
                        {errors.emailOtp && <div className="error-message">{errors.emailOtp}</div>}
                      </>
                    )}
                    {emailVerified && <span className="verified">Email Verified</span>}
                  </div>
                </div>
          )}

          {step === 1 && (
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      minLength={3}
                      className={getError('firstName') ? 'error-input' : ''}
                  />
                  {getError('firstName') && <div className="error-message">{getError('firstName')}</div>}
                </div>

                <div className="form-group">
                  <label>Middle Name </label>
                  <input
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      required
                      minLength={3}
                      className={getError('middleName') ? 'error-input' : ''}
                  />
                  {getError('middleName') && <div className="error-message">{getError('middleName')}</div>}
                </div>

                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      minLength={3}
                      className={getError('lastName') ? 'error-input' : ''}
                  />
                  {getError('lastName') && <div className="error-message">{getError('lastName')}</div>}
                </div>

                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      max={new Date().toISOString().split("T")[0]}
                      className={getError('dateOfBirth') ? 'error-input' : ''}
                  />
                  {getError('dateOfBirth') && <div className="error-message">{getError('dateOfBirth')}</div>}
                </div>

                <div className="form-group">
                  <label>Gender *</label>
                  <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className={getError('gender') ? 'error-input' : ''}
                  >
                    <option value="">Select Gender</option>
                    {genderOptions.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                    ))}
                  </select>
                  {getError('gender') && <div className="error-message">{getError('gender')}</div>}
                </div>

                <div className="form-group">
                  <label>Father's Name *</label>
                  <input
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className={getError('fatherName') ? 'error-input' : ''}
                  />
                  {getError('fatherName') && <div className="error-message">{getError('fatherName')}</div>}
                </div>

                <div className="form-group">
                  <label>Mother's Name *</label>
                  <input
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className={getError('motherName') ? 'error-input' : ''}
                  />
                  {getError('motherName') && <div className="error-message">{getError('motherName')}</div>}
                </div>

                <div className="form-group">
                  <label>Marital Status *</label>
                  <select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      required
                      className={getError('maritalStatus') ? 'error-input' : ''}
                  >
                    <option value="">Select Marital Status</option>
                    {maritalStatusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                    ))}
                  </select>
                  {getError('maritalStatus') && <div className="error-message">{getError('maritalStatus')}</div>}
                </div>

                {formData.maritalStatus === "MARRIED" && (
                    <div className="form-group">
                      <label>Spouse Name</label>
                      <input
                          name="spouseName"
                          value={formData.spouseName}
                          onChange={handleChange}
                          minLength={5}
                          className={getError('spouseName') ? 'error-input' : ''}
                      />
                      {getError('spouseName') && <div className="error-message">{getError('spouseName')}</div>}
                    </div>
                )}

                <div className="form-group">
                  <label>Occupation *</label>
                  <select
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      required
                      className={getError('occupation') ? 'error-input' : ''}
                  >
                    <option value="">Select Occupation</option>
                    {occupationOptions.map((occ) => (
                        <option key={occ} value={occ}>
                          {occ}
                        </option>
                    ))}
                  </select>
                  {getError('occupation') && <div className="error-message">{getError('occupation')}</div>}
                </div>

                <div className="form-group">
                  <label>Salary (annually) *</label>
                  <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      required
                      step="1"
                      min="0"
                      placeholder="e.g. 50000"
                      className={getError('salary') ? 'error-input' : ''}
                  />
                  {getError('salary') && <div className="error-message">{getError('salary')}</div>}
                </div>

                <div className="form-group">
                  <label>Citizen *</label>
                  <select
                      name="citizen"
                      value={formData.citizen}
                      onChange={handleChange}
                      required
                      className={getError('citizen') ? 'error-input' : ''}
                  >
                    <option value="">Select Citizen</option>
                    {citizenOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {getError('citizen') && <div className="error-message">{getError('citizen')}</div>}
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className={getError('category') ? 'error-input' : ''}
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                    ))}
                  </select>
                  {getError('category') && <div className="error-message">{getError('category')}</div>}
                </div>

                <div className="form-group">
                  <label>Religion *</label>
                  <select
                      name="religion"
                      value={formData.religion}
                      onChange={handleChange}
                      required
                      className={getError('religion') ? 'error-input' : ''}
                  >
                    <option value="">Select Religion</option>
                    {religionOptions.map((rel) => (
                        <option key={rel} value={rel}>
                          {rel}
                        </option>
                    ))}
                  </select>
                  {getError('religion') && <div className="error-message">{getError('religion')}</div>}
                </div>
              </div>
          )}

          {step === 2 && (
              <div className="form-grid">
                <div className="form-group">
                  <label>Mobile Number *</label>
                  <input
                      name="mobileNumber"
                      value={formData.contactDetails.mobileNumber}
                      onChange={(e => handleNestedChange(e, "contactDetails"))}
                      required
                      placeholder="+91xxxxxxxxxx"
                      disabled={true}
                      className={getError('mobileNumber', 'contactDetails') ? 'error-input' : ''}
                  />
                  {getError('mobileNumber', 'contactDetails') && <div className="error-message">{getError('mobileNumber', 'contactDetails')}</div>}
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                      type="email"
                      name="email"
                      value={formData.contactDetails.email}
                      disabled
                      onChange={(e => handleNestedChange(e, "contactDetails"))}
                      required
                      className={getError('email', 'contactDetails') ? 'error-input' : ''}
                  />
                  {getError('email', 'contactDetails') && <div className="error-message">{getError('email', 'contactDetails')}</div>}
                </div>

                <div className="form-group">
                  <label>Communication Address *</label>
                  <textarea
                      name="communicationAddress"
                      value={formData.contactDetails.communicationAddress}
                      onChange={(e) => {
                        handleNestedChange(e, "contactDetails");
                        if (sameAddress) {
                          setFormData(prev => ({
                            ...prev,
                            contactDetails: {
                              ...prev.contactDetails,
                              permanentAddress: e.target.value
                            }
                          }));
                        }
                      }}
                      required
                      rows={3}
                      className={getError('communicationAddress', 'contactDetails') ? 'error-input' : ''}
                  />
                  {getError('communicationAddress', 'contactDetails') && <div className="error-message">{getError('communicationAddress', 'contactDetails')}</div>}
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={sameAddress}
                      onChange={(e) => {
                        setSameAddress(e.target.checked);
                        if (e.target.checked) {
                          setFormData(prev => ({
                            ...prev,
                            contactDetails: {
                              ...prev.contactDetails,
                              permanentAddress: prev.contactDetails.communicationAddress
                            }
                          }));
                        }
                      }}
                    /> Permanent address same as communication address
                  </label>
                </div>
                <div className="form-group">
                  <label>Permanent Address *</label>
                  <textarea
                      name="permanentAddress"
                      value={formData.contactDetails.permanentAddress}
                      onChange={(e) => handleNestedChange(e, "contactDetails")}
                      disabled={sameAddress}
                      required
                      rows={3}
                      className={getError('permanentAddress', 'contactDetails') ? 'error-input' : ''}
                  />
                  {getError('permanentAddress', 'contactDetails') && <div className="error-message">{getError('permanentAddress', 'contactDetails')}</div>}
                </div>

                <div className="form-group">
                  <label>City *</label>
                  <input
                      name="city"
                      value={formData.contactDetails.city}
                      onChange={(e => handleNestedChange(e, "contactDetails"))}
                      required
                      className={getError('city', 'contactDetails') ? 'error-input' : ''}
                  />
                  {getError('city', 'contactDetails') && <div className="error-message">{getError('city', 'contactDetails')}</div>}
                </div>

                <div className="form-group">
                  <label>State *</label>
                  <select
                      name="state"
                      value={formData.contactDetails.state}
                      onChange={(e) => handleNestedChange(e, "contactDetails")}
                      required
                      className={getError('state', 'contactDetails') ? 'error-input' : ''}
                  >
                    <option value="">Select State</option>
                    {indianStatesAndUTs.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                    ))}
                  </select>
                  {getError('state', 'contactDetails') && <div className="error-message">{getError('state', 'contactDetails')}</div>}
                </div>

                <div className="form-group">
                  <label>Pin Code *</label>
                  <input
                      name="zip"
                      value={formData.contactDetails.zip}
                      onChange={(e => handleNestedChange(e, "contactDetails"))}
                      required
                      className={getError('zip', 'contactDetails') ? 'error-input' : ''}
                  />
                  {getError('zip', 'contactDetails') && <div className="error-message">{getError('zip', 'contactDetails')}</div>}
                </div>

                <div className="form-group">
                  <label>Landmark</label>
                  <input
                      name="landmark"
                      value={formData.contactDetails.landmark}
                      onChange={(e => handleNestedChange(e, "contactDetails"))}
                  />
                </div>

                <div className="form-group">
                  <label>Country *</label>
                  <select
                      name="country"
                      value={formData.contactDetails.country}
                      onChange={(e) => handleNestedChange(e, "contactDetails")}
                      required
                      className={getError('country', 'contactDetails') ? 'error-input' : ''}
                  >
                    <option value="">Select Country</option>
                    {countryOptions.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                    ))}
                  </select>
                  {getError('country', 'contactDetails') && <div className="error-message">{getError('country', 'contactDetails')}</div>}
                </div>

                <div className="form-group">
                  <label>Alternate Mobile Number</label>
                  <input
                      name="alternateMobileNumber"
                      value={formData.contactDetails.alternateMobileNumber}
                      onChange={(e => handleNestedChange(e, "contactDetails"))}
                  />
                </div>

                <div className="form-group">
                  <label>Alternate Email</label>
                  <input
                      type="email"
                      name="alternateEmail"
                      value={formData.contactDetails.alternateEmail}
                      onChange={(e => handleNestedChange(e, "contactDetails"))}
                  />
                </div>
              </div>
          )}

          {step === 3 && (
              <div className="form-grid">
                <div className="form-group">
                  <label>Nominee Name *</label>
                  <input
                      name="nomineeName"
                      value={formData.nominee.nomineeName}
                      onChange={(e => handleNestedChange(e, "nominee"))}
                      required
                      className={getError('nomineeName', 'nominee') ? 'error-input' : ''}
                  />
                  {getError('nomineeName', 'nominee') && <div className="error-message">{getError('nomineeName', 'nominee')}</div>}
                </div>

                <div className="form-group">
                  <label>Nominee Relationship *</label>
                  <select
                      name="nomineeRelationship"
                      value={formData.nominee.nomineeRelationship}
                      onChange={(e => handleNestedChange(e, "nominee"))}
                      required
                      className={getError('nomineeRelationship', 'nominee') ? 'error-input' : ''}
                  >
                    <option value="">Select Relationship</option>
                    {relationshipOptions.map((rel) => (
                        <option key={rel} value={rel}>
                          {rel}
                        </option>
                    ))}
                  </select>
                  {getError('nomineeRelationship', 'nominee') && <div className="error-message">{getError('nomineeRelationship', 'nominee')}</div>}
                </div>

                <div className="form-group">
                  <label>Nominee Date of Birth *</label>
                  <input
                      type="date"
                      name="nomineeDateOfBirth"
                      value={formData.nominee.nomineeDateOfBirth}
                      onChange={(e => handleNestedChange(e, "nominee"))}
                      required
                      max={new Date().toISOString().split("T")[0]}
                      className={getError('nomineeDateOfBirth', 'nominee') ? 'error-input' : ''}
                  />
                  {getError('nomineeDateOfBirth', 'nominee') && <div className="error-message">{getError('nomineeDateOfBirth', 'nominee')}</div>}
                </div>

                <div className="form-group">
                  <label>Nominee Mobile Number *</label>
                  <input
                      name="nomineeMobileNumber"
                      value={formData.nominee.nomineeMobileNumber}
                      onChange={(e => handleNestedChange(e, "nominee"))}
                      required
                      className={getError('nomineeMobileNumber', 'nominee') ? 'error-input' : ''}
                  />
                  {getError('nomineeMobileNumber', 'nominee') && <div className="error-message">{getError('nomineeMobileNumber', 'nominee')}</div>}
                </div>

                <div className="form-group">
                  <label>Nominee Email *</label>
                  <input
                      type="email"
                      name="nomineeEmail"
                      value={formData.nominee.nomineeEmail}
                      onChange={(e => handleNestedChange(e, "nominee"))}
                      required
                      className={getError('nomineeEmail', 'nominee') ? 'error-input' : ''}
                  />
                  {getError('nomineeEmail', 'nominee') && <div className="error-message">{getError('nomineeEmail', 'nominee')}</div>}
                </div>

                <div className="form-group">
                  <label>Nominee Aadhaar *</label>
                  <input
                      name="nomineeAadhaar"
                      value={formData.nominee.nomineeAadhaar}
                      onChange={(e => handleNestedChange(e, "nominee"))}
                      required
                      className={getError('nomineeAadhaar', 'nominee') ? 'error-input' : ''}
                  />
                  {getError('nomineeAadhaar', 'nominee') && <div className="error-message">{getError('nomineeAadhaar', 'nominee')}</div>}
                </div>

                <div className="form-group">
                  <label>Nominee PAN *</label>
                  <input
                      name="nomineePan"
                      value={formData.nominee.nomineePan}
                      onChange={(e => handleNestedChange(e, "nominee"))}
                      required
                      className={getError('nomineePan', 'nominee') ? 'error-input' : ''}
                  />
                  {getError('nomineePan', 'nominee') && <div className="error-message">{getError('nomineePan', 'nominee')}</div>}
                </div>

                <div className="form-group">
                  <label>Nominee Address *</label>
                  <textarea
                      name="nomineeAddress"
                      value={formData.nominee.nomineeAddress}
                      onChange={(e => handleNestedChange(e, "nominee"))}
                      rows={3}
                      required
                      className={getError('nomineeAddress', 'nominee') ? 'error-input' : ''}
                  />
                  {getError('nomineeAddress', 'nominee') && <div className="error-message">{getError('nomineeAddress', 'nominee')}</div>}
                </div>
              </div>
          )}

          {step === 4 && (
              <div className="form-grid">
                <div className="form-group">
                  <label>Aadhaar Number *</label>
                  <input
                      name="aadhaarNumber"
                      value={formData.kyc.aadhaarNumber}
                      onChange={(e => handleNestedChange(e, "kyc"))}
                      required
                      className={getError('aadhaarNumber', 'kyc') ? 'error-input' : ''}
                  />
                  {getError('aadhaarNumber', 'kyc') && <div className="error-message">{getError('aadhaarNumber', 'kyc')}</div>}
                  <input
                    type="file"
                    accept=".jpg,.jpeg,application/pdf"
                    onChange={e => handleKycFileChange(e, 'aadhaar')}
                    required
                  />
                  {errors.aadhaarFile && <div className="error-message">{errors.aadhaarFile}</div>}
                </div>
                <div className="form-group">
                  <label>PAN Number *</label>
                  <input
                      name="panNumber"
                      value={formData.kyc.panNumber}
                      onChange={(e => handleNestedChange(e, "kyc"))}
                      required
                      className={getError('panNumber', 'kyc') ? 'error-input' : ''}
                  />
                  {getError('panNumber', 'kyc') && <div className="error-message">{getError('panNumber', 'kyc')}</div>}
                  <input
                    type="file"
                    accept=".jpg,.jpeg,application/pdf"
                    onChange={e => handleKycFileChange(e, 'pan')}
                    required
                  />
                  {errors.panFile && <div className="error-message">{errors.panFile}</div>}
                </div>
                <div className="form-group">
                  <label>Voter ID</label>
                  <input
                      name="voterId"
                      value={formData.kyc.voterId}
                      onChange={(e => handleNestedChange(e, "kyc"))}
                  />
                  {formData.kyc.voterId && (
                    <input
                      type="file"
                      accept=".jpg,.jpeg,application/pdf"
                      onChange={e => handleKycFileChange(e, 'voterId')}
                      required={!!formData.kyc.voterId}
                    />
                  )}
                  {errors.voterIdFile && <div className="error-message">{errors.voterIdFile}</div>}
                </div>
                <div className="form-group">
                  <label>Passport Number</label>
                  <input
                      name="passportNumber"
                      value={formData.kyc.passportNumber}
                      onChange={(e => handleNestedChange(e, "kyc"))}
                  />
                  {formData.kyc.passportNumber && (
                    <input
                      type="file"
                      accept=".jpg,.jpeg,application/pdf"
                      onChange={e => handleKycFileChange(e, 'passport')}
                      required={!!formData.kyc.passportNumber}
                    />
                  )}
                  {errors.passportFile && <div className="error-message">{errors.passportFile}</div>}
                </div>
                <div className="form-group">
                  <label>Driving License Number</label>
                  <input
                      name="drivingLicenseNumber"
                      value={formData.kyc.drivingLicenseNumber}
                      onChange={(e => handleNestedChange(e, "kyc"))}
                  />
                  {formData.kyc.drivingLicenseNumber && (
                    <input
                      type="file"
                      accept=".jpg,.jpeg,application/pdf"
                      onChange={e => handleKycFileChange(e, 'drivingLicense')}
                      required={!!formData.kyc.drivingLicenseNumber}
                    />
                  )}
                  {errors.drivingLicenseFile && <div className="error-message">{errors.drivingLicenseFile}</div>}
                </div>
              </div>
          )}

          {step === 5 && (
              <div>
                <h3>Review Your Details</h3>
                <div className="review-section" style={{ maxHeight: '350px', overflowY: 'auto', paddingRight: '10px' }}>
                  <h4>Basic Details</h4>
                  <ul>
                    <li><strong>First Name:</strong> {formData.firstName}</li>
                    <li><strong>Middle Name:</strong> {formData.middleName}</li>
                    <li><strong>Last Name:</strong> {formData.lastName}</li>
                    <li><strong>Date of Birth:</strong> {formData.dateOfBirth}</li>
                    <li><strong>Gender:</strong> {formData.gender}</li>
                    <li><strong>Father's Name:</strong> {formData.fatherName}</li>
                    <li><strong>Mother's Name:</strong> {formData.motherName}</li>
                    <li><strong>Marital Status:</strong> {formData.maritalStatus}</li>
                    {formData.maritalStatus === "MARRIED" && (
                      <li><strong>Spouse Name:</strong> {formData.spouseName}</li>
                    )}
                    <li><strong>Occupation:</strong> {formData.occupation}</li>
                    <li><strong>Salary:</strong> {formData.salary}</li>
                    <li><strong>Citizen:</strong> {formData.citizen}</li>
                    <li><strong>Category:</strong> {formData.category}</li>
                    <li><strong>Religion:</strong> {formData.religion}</li>
                  </ul>
                  <h4>Contact Details</h4>
                  <ul>
                    <li><strong>Mobile Number:</strong> {formData.contactDetails.mobileNumber}</li>
                    <li><strong>Email:</strong> {formData.contactDetails.email}</li>
                    <li><strong>Communication Address:</strong> {formData.contactDetails.communicationAddress}</li>
                    <li><strong>Permanent Address:</strong> {formData.contactDetails.permanentAddress}</li>
                    <li><strong>City:</strong> {formData.contactDetails.city}</li>
                    <li><strong>State:</strong> {formData.contactDetails.state}</li>
                    <li><strong>Zip:</strong> {formData.contactDetails.zip}</li>
                    <li><strong>Landmark:</strong> {formData.contactDetails.landmark}</li>
                    <li><strong>Country:</strong> {formData.contactDetails.country}</li>
                    <li><strong>Alternate Mobile Number:</strong> {formData.contactDetails.alternateMobileNumber}</li>
                    <li><strong>Alternate Email:</strong> {formData.contactDetails.alternateEmail}</li>
                  </ul>
                  <h4>Nominee Details</h4>
                  <ul>
                    <li><strong>Nominee Name:</strong> {formData.nominee.nomineeName}</li>
                    <li><strong>Relationship:</strong> {formData.nominee.nomineeRelationship}</li>
                    <li><strong>Date of Birth:</strong> {formData.nominee.nomineeDateOfBirth}</li>
                    <li><strong>Mobile Number:</strong> {formData.nominee.nomineeMobileNumber}</li>
                    <li><strong>Email:</strong> {formData.nominee.nomineeEmail}</li>
                    <li><strong>Aadhaar:</strong> {formData.nominee.nomineeAadhaar}</li>
                    <li><strong>PAN:</strong> {formData.nominee.nomineePan}</li>
                    <li><strong>Address:</strong> {formData.nominee.nomineeAddress}</li>
                  </ul>
                  <h4>KYC Details</h4>
                  <ul>
                    <li><strong>Aadhaar Number:</strong> {formData.kyc.aadhaarNumber}</li>
                    <li><strong>PAN Number:</strong> {formData.kyc.panNumber}</li>
                    <li><strong>Voter ID:</strong> {formData.kyc.voterId}</li>
                    <li><strong>Passport Number:</strong> {formData.kyc.passportNumber}</li>
                    <li><strong>Driving License Number:</strong> {formData.kyc.drivingLicenseNumber}</li>
                  </ul>
                  <h4>KYC Documents</h4>
                  <ul>
                    <li><strong>Aadhaar Number:</strong> {formData.kyc.aadhaarNumber}</li>
                    {kycFiles.aadhaar && (
                      <li>
                        <strong>Aadhaar File:</strong> {kycFiles.aadhaar.type.startsWith('image') ? (
                          <img src={URL.createObjectURL(kycFiles.aadhaar)} alt="Aadhaar" style={{maxWidth: 120, maxHeight: 120}} />
                        ) : (
                          <a href={URL.createObjectURL(kycFiles.aadhaar)} target="_blank" rel="noopener noreferrer">View PDF</a>
                        )}
                      </li>
                    )}
                    <li><strong>PAN Number:</strong> {formData.kyc.panNumber}</li>
                    {kycFiles.pan && (
                      <li>
                        <strong>PAN File:</strong> {kycFiles.pan.type.startsWith('image') ? (
                          <img src={URL.createObjectURL(kycFiles.pan)} alt="PAN" style={{maxWidth: 120, maxHeight: 120}} />
                        ) : (
                          <a href={URL.createObjectURL(kycFiles.pan)} target="_blank" rel="noopener noreferrer">View PDF</a>
                        )}
                      </li>
                    )}
                    {formData.kyc.voterId && (
                      <>
                        <li><strong>Voter ID:</strong> {formData.kyc.voterId}</li>
                        {kycFiles.voterId && (
                          <li>
                            <strong>Voter ID File:</strong> {kycFiles.voterId.type.startsWith('image') ? (
                              <img src={URL.createObjectURL(kycFiles.voterId)} alt="Voter ID" style={{maxWidth: 120, maxHeight: 120}} />
                            ) : (
                              <a href={URL.createObjectURL(kycFiles.voterId)} target="_blank" rel="noopener noreferrer">View PDF</a>
                            )}
                          </li>
                        )}
                      </>
                    )}
                    {formData.kyc.passportNumber && (
                      <>
                        <li><strong>Passport Number:</strong> {formData.kyc.passportNumber}</li>
                        {kycFiles.passport && (
                          <li>
                            <strong>Passport File:</strong> {kycFiles.passport.type.startsWith('image') ? (
                              <img src={URL.createObjectURL(kycFiles.passport)} alt="Passport" style={{maxWidth: 120, maxHeight: 120}} />
                            ) : (
                              <a href={URL.createObjectURL(kycFiles.passport)} target="_blank" rel="noopener noreferrer">View PDF</a>
                            )}
                          </li>
                        )}
                      </>
                    )}
                    {formData.kyc.drivingLicenseNumber && (
                      <>
                        <li><strong>Driving License Number:</strong> {formData.kyc.drivingLicenseNumber}</li>
                        {kycFiles.drivingLicense && (
                          <li>
                            <strong>Driving License File:</strong> {kycFiles.drivingLicense.type.startsWith('image') ? (
                              <img src={URL.createObjectURL(kycFiles.drivingLicense)} alt="Driving License" style={{maxWidth: 120, maxHeight: 120}} />
                            ) : (
                              <a href={URL.createObjectURL(kycFiles.drivingLicense)} target="_blank" rel="noopener noreferrer">View PDF</a>
                            )}
                          </li>
                        )}
                      </>
                    )}
                  </ul>
                </div>
              </div>
          )}

          <div className="form-navigation">
            {step > 1 && (
                <motion.button
                    whileHover={{ scale: 1.100 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "keyframes", stiffness: 0 }}
                    className="get-started"
                    onClick={() => handleBack()}
                >
                  Back
                </motion.button>
            )}
            {step < 5 && (step !== 0 || (phoneVerified && emailVerified)) && (
                <motion.button
                    id={"next-btn"}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="get-started"
                    onClick={handleNext}
                >
                  Next
                </motion.button>
            )}
            {step === 5 && (
                <button type="submit" className="submit-btn"
                        onClick={handleSubmit}
                >
                  Submit
                </button>
            )}
          </div>
        </form>
      </Box>
    </div>
  );
};

export default RegisterForm;

