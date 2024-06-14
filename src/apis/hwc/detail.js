import React, { useState, useEffect } from "react";
import axios from "axios";

export const detailGet = async schedulerData => {
  try {
    const response = await axios.get(`tour/`);
  } catch (error) {}
};
