import React, { useState } from "react";
import "./register.css";
import {motion} from "framer-motion";

const genderOptions = ["MALE", "FEMALE", "OTHER"];
const maritalStatusOptions = ["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"];
const occupationOptions = ["EMPLOYED", "SELF_EMPLOYED", "STUDENT", "RETIRED", "UNEMPLOYED"];
const categoryOptions = ["GENERAL", "OBC", "SC", "ST"];
const religionOptions = ["HINDU", "MUSLIM", "CHRISTIAN", "SIKH", "OTHER"];
const relationshipOptions = ["FATHER", "MOTHER", "SPOUSE", "CHILD", "OTHER"];

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

  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted");
    console.log(formData);
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
  };

  return (
      <div className="register-container">
        <h2>
          Register - Step {step}:{" "}
          {step === 0
              ? "Verification"
              : step === 1
                ? "Basic Details"
                : step === 2
                    ? "Contact Details"
                    : step === 3
                        ? "Nominee Details"
                        : step === 4
                            ? "KYC Details"
                            : "Review & Submit"}
        </h2>

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
                    />
                    {!phoneOtpSent && !phoneVerified && (
                      <button type="button" className={"otp-btn"} onClick={() => {
                        if (formData.contactDetails.mobileNumber.length < 10) {
                          alert('Enter a valid phone number.');
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
                          } else alert('Invalid OTP.');
                        }}>Verify OTP</button>
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
                    />
                    {!emailOtpSent && !emailVerified && (
                      <button type="button" className={"otp-btn"} onClick={() => {
                        const email = formData.contactDetails.email;
                        if (!email.includes('@')) {
                          alert('Please enter a valid email address.');
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
                          } else alert('Invalid OTP.');
                        }}>Verify OTP</button>
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
                  />
                </div>

                <div className="form-group">
                  <label>Middle Name *</label>
                  <input
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      required
                      minLength={3}
                  />
                </div>

                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      minLength={3}
                  />
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
                  />
                </div>

                <div className="form-group">
                  <label>Gender *</label>
                  <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                  >
                    <option value="">Select Gender</option>
                    {genderOptions.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Father's Name *</label>
                  <input
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      required
                      minLength={8}
                  />
                </div>

                <div className="form-group">
                  <label>Mother's Name *</label>
                  <input
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      required
                      minLength={8}
                  />
                </div>

                <div className="form-group">
                  <label>Marital Status *</label>
                  <select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      required
                  >
                    <option value="">Select Marital Status</option>
                    {maritalStatusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                    ))}
                  </select>
                </div>

                {formData.maritalStatus === "MARRIED" && (
                    <div className="form-group">
                      <label>Spouse Name</label>
                      <input
                          name="spouseName"
                          value={formData.spouseName}
                          onChange={handleChange}
                          minLength={5}
                      />
                    </div>
                )}

                <div className="form-group">
                  <label>Occupation *</label>
                  <select
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      required
                  >
                    <option value="">Select Occupation</option>
                    {occupationOptions.map((occ) => (
                        <option key={occ} value={occ}>
                          {occ}
                        </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Salary *</label>
                  <input
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 50000"
                  />
                </div>

                <div className="form-group">
                  <label>Citizen *</label>
                  <input
                      name="citizen"
                      value={formData.citizen}
                      onChange={handleChange}
                      required
                      placeholder="Country of citizenship"
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Religion *</label>
                  <select
                      name="religion"
                      value={formData.religion}
                      onChange={handleChange}
                      required
                  >
                    <option value="">Select Religion</option>
                    {religionOptions.map((rel) => (
                        <option key={rel} value={rel}>
                          {rel}
                        </option>
                    ))}
                  </select>
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
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e => handleNestedChange(e, "contactDetails"))}
                      required
                  />
                </div>

                <div className="form-group">
                  <label>Communication Address *</label>
                  <textarea
                      name="communicationAddress"
                      value={formData.contactDetails.communicationAddress}
                      onChange={(e => handleNestedChange(e, "contactDetails"))}
                      required
                      rows={3}
                  />
                </div>

                <div className="form-group">
                  <label>Permanent Address *</label>
                  <textarea
                      name="permanentAddress"
                      value={formData.contactDetails.permanentAddress}
                      onChange={(e => handleNestedChange(e, "contactDetails"))}
                      required
                      rows={3}
                  />
                </div>

                <div className="form-group">
                  <label>City *</label>
                  <input
                      name="city"
                      value={formData.contactDetails.city}
                      onChange={(e => handleNestedChange(e, "contactDetails"))}
                      required
                  />
                </div>

                <div className="form-group">
                  <label>State *</label>
                  <input
                      name="state"
                      value={formData.contactDetails.state}
                      onChange={(e => handleNestedChange(e, "contactDetails"))}
                      required
                  />
                </div>

                <div className="form-group">
                  <label>Zip *</label>
                  <input
                      name="zip"
                      value={formData.contactDetails.zip}
                      onChange={(e => handleNestedChange(e, "contactDetails"))}
                      required
                  />
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
                  <input
                      name="country"
                      value={formData.contactDetails.country}
                      onChange={(e => handleNestedChange(e, "contactDetails"))}
                      required
                  />
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
                  />
                </div>

                <div className="form-group">
                  <label>Nominee Relationship *</label>
                  <select
                      name="nomineeRelationship"
                      value={formData.nominee.nomineeRelationship}
                      onChange={(e => handleNestedChange(e, "nominee"))}
                      required
                  >
                    <option value="">Select Relationship</option>
                    {relationshipOptions.map((rel) => (
                        <option key={rel} value={rel}>
                          {rel}
                        </option>
                    ))}
                  </select>
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
                  />
                </div>

                <div className="form-group">
                  <label>Nominee Mobile Number *</label>
                  <input
                      name="nomineeMobileNumber"
                      value={formData.nominee.nomineeMobileNumber}
                      onChange={(e => handleNestedChange(e, "nominee"))}
                      required
                  />
                </div>

                <div className="form-group">
                  <label>Nominee Email</label>
                  <input
                      type="email"
                      name="nomineeEmail"
                      value={formData.nominee.nomineeEmail}
                      onChange={(e => handleNestedChange(e, "nominee"))}
                  />
                </div>

                <div className="form-group">
                  <label>Nominee Aadhaar</label>
                  <input
                      name="nomineeAadhar"
                      value={formData.nominee.nomineeAadhaar}
                      onChange={(e => handleNestedChange(e, "nominee"))}
                  />
                </div>

                <div className="form-group">
                  <label>Nominee PAN</label>
                  <input
                      name="nomineePan"
                      value={formData.nominee.nomineePan}
                      onChange={(e => handleNestedChange(e, "nominee"))}
                  />
                </div>

                <div className="form-group">
                  <label>Nominee Address</label>
                  <textarea
                      name="nomineeAddress"
                      value={formData.nominee.nomineeAddress}
                      onChange={(e => handleNestedChange(e, "nominee"))}
                      rows={3}
                  />
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
                  />
                </div>

                <div className="form-group">
                  <label>PAN Number *</label>
                  <input
                      name="panNumber"
                      value={formData.kyc.panNumber}
                      onChange={(e => handleNestedChange(e, "kyc"))}
                      required
                  />
                </div>

                <div className="form-group">
                  <label>Voter ID</label>
                  <input
                      name="voterId"
                      value={formData.kyc.voterId}
                      onChange={(e => handleNestedChange(e, "kyc"))}
                  />
                </div>

                <div className="form-group">
                  <label>Passport Number</label>
                  <input
                      name="passportNumber"
                      value={formData.kyc.passportNumber}
                      onChange={(e => handleNestedChange(e, "kyc"))}
                  />
                </div>

                <div className="form-group">
                  <label>Driving License Number</label>
                  <input
                      name="drivingLicenseNumber"
                      value={formData.kyc.drivingLicenseNumber}
                      onChange={(e => handleNestedChange(e, "kyc"))}
                  />
                </div>
              </div>
          )}

          {step === 5 && (
              <div>
                <h3>Review Your Details</h3>
                <pre
                    style={{
                      background: "#f0f0f0",
                      padding: "10px",
                      borderRadius: "5px",
                      maxHeight: "400px",
                      overflowY: "auto",
                    }}
                >
              {JSON.stringify(formData, null, 2)}
            </pre>
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
                <button type="submit" className="submit-btn">
                  Submit
                </button>
            )}
          </div>
        </form>
      </div>
  );
};

export default RegisterForm;

