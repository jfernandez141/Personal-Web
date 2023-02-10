import React, { useState } from "react";
import style from "./Form.module.css";

import emailjs from "@emailjs/browser";

const { REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, REACT_APP_PUBLIC_KEY } =
  process.env;

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [btn, setBtn] = useState("Send Email");

  function handleSubmit(event) {
    event.preventDefault();
    setBtn("Sending...");

    emailjs
      .send(
        REACT_APP_SERVICE_ID,
        REACT_APP_TEMPLATE_ID,
        form,
        REACT_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          setBtn("Send Email");
          setForm({
            name: "",
            email: "",
            message: "",
          });
          console.log(result.text);
        },
        (error) => {
          setBtn("Send Email");
          console.log(error.text);
        }
      );
  }
  function handleInputChange(event) {
    const property = event.target.name;
    const value = event.target.value;
    setForm({
      ...form,
      [property]: value,
    });
  }

  return (
    <div id="contact" className={style.contacBody}>
      <h2 className={style.title}>Contact</h2>
      <div className={style.links}>
        <a href="https://www.linkedin.com/in/jhamil-fernandez/" target="_blank">
          linkedin
        </a>
        <a href="https://github.com/jfernandez141" target="_blank">
          Github
        </a>
      </div>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          className={style.inputForm}
          placeholder="Name:"
          required
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
        />

        <input
          className={style.inputForm}
          placeholder="Email: "
          required
          type="email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
        />

        <div>
          <textarea
            className={style.message}
            placeholder="Message:"
            required
            name="message"
            cols="30"
            rows="10"
            value={form.message}
            onChange={handleInputChange}
          ></textarea>
          <p>Email send it </p>
        </div>
        <button className={style.btn}>{btn}</button>
      </form>
    </div>
  );
};

export default Form;
