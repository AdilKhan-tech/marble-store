// Common.js
import axios from "axios";
import React from "react";

class Common {
  //truncateText
  static truncateText(text, limit = 40) {
    return text?.length > limit ? text.slice(0, limit) + "..." : text || "";
  }
}

export default Common;
