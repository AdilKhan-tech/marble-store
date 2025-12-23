import React,{ useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios  from "axios";
import { createIcecreamSizes } from "@/utils/apiRoutes";
export default function IceCreamSizeData ({ closePopup, cakeData = null, onAddcake }) {
const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
   name_en: "",
   name_ar: "",
   icecream_bucket_id: "",
   slug: "",
   
})
}