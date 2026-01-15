// Common.js
import axios from "axios";
import React from "react";

class Common {
  //Truncate Text ====================================
  static truncateText(text, limit = 40) {
    return text?.length > limit ? text.slice(0, limit) + "..." : text || "";
  }

  //date Format =====================================
  static dateFormat(date) {
    if (!date) return "";
    // If the date is not already a Date object, parse it
    const dateObject = typeof date === "string" ? new Date(date) : date;
    // Check if the dateObject is a valid Date object
    if (!(dateObject instanceof Date && !isNaN(dateObject))) {
      console.error("Invalid date:", date);
      return ""; // Return an empty string or handle the error accordingly
    }
    // Adjusting for timezone offset
    const localTime = new Date(
      dateObject.getTime() - dateObject.getTimezoneOffset() * 60000
    );
    return localTime.toISOString().split("T")[0];
  }

  //handleSortingChange ==============================
  static handleSortingChange = (field, setSortField, setSortOrder) => {
    if (field === Common.sortField) {
      const newSortOrder = Common.sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newSortOrder);
      Common.sortOrder = newSortOrder;
    } else {
      setSortField(field);
      setSortOrder("desc");
      Common.sortField = field;
      Common.sortOrder = "desc";
    }
  };
}

export default Common;
