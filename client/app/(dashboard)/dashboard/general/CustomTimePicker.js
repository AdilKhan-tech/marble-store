"use client";
import React, { useState, useEffect, useRef } from "react";

const CustomTimePicker = ({ 
  value,
  onChange, 
  placeholder = "HH:MM",
  translations = {},
  className = "",
  disabled = false,
  format = "24" // "12" or "24" hour format
}) => {
  const t = (k, d) => translations?.[k] ?? d;
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(value || "");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");
  const timePickerRef = useRef(null);

  // Update selectedTime when value prop changes
  useEffect(() => {
    if (value) {
      parseTime(value);
      // Set display time based on format
      if (format === "12" && !value.includes("AM") && !value.includes("PM")) {
        // Convert 24-hour to 12-hour for display
        const timePart = value.split(":");
        let hour24 = parseInt(timePart[0], 10);
        const minute = timePart[1] || "00";
        const period = hour24 >= 12 ? "PM" : "AM";
        const hour12 = hour24 % 12 || 12;
        setSelectedTime(`${String(hour12).padStart(2, '0')}:${minute} ${period}`);
      } else {
        setSelectedTime(value);
      }
    } else {
      setSelectedTime("");
      setSelectedHour("");
      setSelectedMinute("00");
      setSelectedPeriod("AM");
    }
  }, [value, format]);

  // Parse time string (HH:MM:SS, HH:MM or HH:MM AM/PM)
  const parseTime = (timeStr) => {
    if (!timeStr) return;
    
    // Check if it's 12-hour format (contains AM/PM)
    if (timeStr.includes("AM") || timeStr.includes("PM")) {
      const parts = timeStr.split(" ");
      const timePart = parts[0];
      const [hour, minute] = timePart.split(":");
      setSelectedHour(hour);
      setSelectedMinute(minute || "00");
      setSelectedPeriod(parts[1]);
    } else {
      // It's 24-hour format (HH:MM:SS or HH:MM)
      const timePart = timeStr.split(":");
      let hour24 = parseInt(timePart[0], 10);
      const minute = timePart[1] || "00";
      
      if (format === "12") {
        // Convert 24-hour to 12-hour for display
        const period = hour24 >= 12 ? "PM" : "AM";
        const hour12 = hour24 % 12 || 12;
        setSelectedHour(String(hour12).padStart(2, '0'));
        setSelectedMinute(minute);
        setSelectedPeriod(period);
      } else {
        setSelectedHour(String(hour24).padStart(2, '0'));
        setSelectedMinute(minute);
      }
    }
  };

  // Close time picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (timePickerRef.current && !timePickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Generate hours array based on format
  const generateHours = () => {
    if (format === "12") {
      return Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    } else {
      return Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    }
  };

  // Generate minutes array (0-59)
  const generateMinutes = () => {
    return Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  };

  const hours = generateHours();
  const minutes = generateMinutes();
  const periods = ["AM", "PM"];

  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
    updateTime(hour, selectedMinute, selectedPeriod);
  };

  const handleMinuteSelect = (minute) => {
    setSelectedMinute(minute);
    updateTime(selectedHour, minute, selectedPeriod);
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    updateTime(selectedHour, selectedMinute, period);
  };

  const convertTo24Hour = (hour, minute, period) => {
    let hour24 = parseInt(hour, 10);
    
    if (period === "PM" && hour24 !== 12) {
      hour24 += 12;
    } else if (period === "AM" && hour24 === 12) {
      hour24 = 0;
    }
    
    return `${String(hour24).padStart(2, '0')}:${minute}:00`;
  };

  const updateTime = (hour, minute, period) => {
    if (!hour) return;
    
    let displayString;
    let apiString;
    
    if (format === "12") {
      displayString = `${hour}:${minute} ${period}`;
      apiString = convertTo24Hour(hour, minute, period);
    } else {
      displayString = `${hour}:${minute}`;
      apiString = `${hour}:${minute}:00`;
    }
    
    setSelectedTime(displayString);
    onChange(apiString); // Send 24-hour format to API
  };

  const handleClear = () => {
    setSelectedHour("");
    setSelectedMinute("00");
    setSelectedPeriod("AM");
    setSelectedTime("");
    onChange("");
    setIsOpen(false);
  };

  const handleNow = () => {
    const now = new Date();
    const hour24 = now.getHours();
    const minute = String(now.getMinutes()).padStart(2, '0');
    
    if (format === "12") {
      const period = hour24 >= 12 ? "PM" : "AM";
      const hour12 = hour24 % 12 || 12;
      const hourStr = String(hour12).padStart(2, '0');
      setSelectedHour(hourStr);
      setSelectedMinute(minute);
      setSelectedPeriod(period);
      updateTime(hourStr, minute, period);
    } else {
      const hourStr = String(hour24).padStart(2, '0');
      setSelectedHour(hourStr);
      setSelectedMinute(minute);
      updateTime(hourStr, minute, "AM");
    }
    setIsOpen(false);
  };

  const handleDone = () => {
    setIsOpen(false);
  };

  return (
    <div className={`position-relative ${className}`} ref={timePickerRef}>
      {/* Clock Icon */}
      <div 
        className="position-absolute top-50 start-0 translate-middle-y ms-3"
        style={{ cursor: disabled ? 'not-allowed' : 'pointer', pointerEvents: disabled ? 'none' : 'auto', zIndex: 1 }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 6V12L16 14" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Input Field */}
      <input
        type="text"
        className="form-control form-control-lg input-hover-dark text-secondary fs-16 inputs-bg"
        placeholder={placeholder}
        value={selectedTime}
        readOnly
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={{ cursor: disabled ? 'not-allowed' : 'pointer', paddingInlineStart: "50px", height:"48px", borderRadius:"12px"}}
        disabled={disabled}
      />

      {/* Time Picker Dropdown */}
      {isOpen && (
        <div className="position-absolute top-100 start-0 mt-1 bg-white border rounded-3 shadow-lg" style={{ zIndex: 1050, width: '260px' }}>
          {/* Header */}
          <div className="d-flex justify-content-center align-items-center px-3 py-3 border-bottom">
            <div className="fw-semibold fs-16 fnt-color">
              {translations?.lbl_select_time || "Select Time"}
            </div>
          </div>

          {/* Time Selection */}
          <div className="px-3 py-2">
            <div className="row g-2">
              {/* Hour Selector */}
              <div className={format === "12" ? "col-4" : "col-6"}>
                <div className="fw-medium fs-12 mb-1 text-dark text-center border rounded-2 py-1">
                  {translations?.lbl_hour || "Hour"}
                </div>
                <div style={{ maxHeight: '180px', overflowY: 'auto', padding: '3px' }}>
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      role="button"
                      className={`rounded-3 mb-1 border text-center fs-12 py-1 ${
                        selectedHour === hour
                          ? 'text-white'
                          : 'btn-outline-secondary'
                      }`}
                      style={{
                        marginBottom: '2px',
                        fontSize: '12px',
                        padding: '4px',
                        ...(selectedHour === hour
                          ? { backgroundColor: '#ff7900', borderColor: '#ff7900' }
                          : {})
                      }}
                      onClick={() => handleHourSelect(hour)}
                    >
                      {hour}
                    </div>
                  ))}
                </div>
              </div>

              {/* Minute Selector */}
              <div className={format === "12" ? "col-4" : "col-6"}>
                <div className="fw-medium fs-12 mb-1 text-dark text-center border rounded-2 py-1">
                  {translations?.lbl_minute || "Minute"}
                </div>
                <div style={{ maxHeight: '180px', overflowY: 'auto', padding: '3px' }}>
                  {minutes.map((minute) => (
                    <div
                      key={minute}
                      role="button"
                      className={`rounded-3 border mb-1 text-center fs-12 py-1 ${
                        selectedMinute === minute
                          ? 'text-white'
                          : 'btn-outline-secondary'
                      }`}
                      style={{
                        marginBottom: '2px',
                        fontSize: '12px',
                        padding: '4px',
                        ...(selectedMinute === minute
                          ? { backgroundColor: '#ff7900', borderColor: '#ff7900' }
                          : {})
                      }}
                      onClick={() => handleMinuteSelect(minute)}
                    >
                      {minute}
                    </div>
                  ))}
                </div>
              </div>

              {/* Period Selector (12-hour format only) */}
              {format === "12" && (
                <div className="col-4">
                  <div className="fw-medium fs-12 mb-1 text-dark text-center border rounded-2 py-1">
                    {translations?.lbl_period || "Period"}
                  </div>
                  <div style={{ padding: '3px' }}>
                    {periods.map((period) => (
                      <div
                        key={period}
                        role="button"
                        className={`rounded-3 border mb-1 text-center  fs-12 py-1 ${
                          selectedPeriod === period
                            ? 'text-white'
                            : 'btn-outline-secondary'
                        }`}
                        style={{
                          marginBottom: '2px',
                          fontSize: '12px',
                          padding: '4px',
                          ...(selectedPeriod === period
                            ? { backgroundColor: '#ff7900', borderColor: '#ff7900' }
                            : {})
                        }}
                        onClick={() => handlePeriodSelect(period)}
                      >
                        {period}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="d-flex justify-content-between py-2 px-3 border-top">
            <div
              role="button"
              className="calender-clear-btn px-1 rounded-3 border mb-1 fs-16 fw-medium text-secondary text-center py-2"
              style={{ width: "27%" }}
              onClick={handleClear}
            >
              {translations?.lbl_clear || "Clear"}
            </div>

            <button
              type="button"
              className="calender-today-btn rounded-3 border mb-1 text-center fs-16 fw-medium text-primary bg-transparent text-center py-2"
              style={{ width: "32%" }}
              onClick={handleNow}
            >
              {translations?.lbl_now || "Now"}
            </button>

            <button
              type="button"
              className="calender-done-btn rounded-3 border mb-1 text-center fs-16 fw-medium text-white text-center py-2"
              style={{ width: "32%" }}
              onClick={handleDone}
            >
              {translations?.lbl_done || "Done"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTimePicker;

