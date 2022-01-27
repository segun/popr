import axios from "axios";

const fs = require('fs');
const FormData = require('form-data');

const AuthAPI = async (req, res) => {  
  const accessTokenUrl = process.env.NEXT_PUBLIC_ACCESS_TOKEN_URL;
  
  const {
    query: { code },
  } = req;

  const form = new FormData();
  form.append('client_secret', process.env.NEXT_PUBLIC_CLIENT_SECRET);
  form.append('client_id', process.env.NEXT_PUBLIC_CLIENT_ID);
  form.append('redirect_uri', process.env.NEXT_PUBLIC_REDIRECT_URL);
  form.append('code', code);

  const result = await axios.post(accessTokenUrl, form,  { headers: form.getHeaders() });
  return res.status(200).json({
    token: result.data
  });
};

export default AuthAPI;