"use client";
import { useState, FormEvent } from "react";
import { SiGmail } from "react-icons/si";
import { MdCall } from "react-icons/md";
import emailjs from "emailjs-com";
import { IoMdSend } from "react-icons/io";

const Contact = (): JSX.Element => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const sendEmail = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      await emailjs.sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        e.target as HTMLFormElement,
        "YOUR_USER_ID"
      );
      console.log("Email sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <section id="contact">
      <header data-aos="fade-right" className="animation">
        <h5>Get In Touch</h5>
        <h2>
          Contact <span className="me">Us</span>
        </h2>
      </header>

      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option animation" data-aos="zoom-in">
            <SiGmail className="contact-icon" />
            <h4>GMAIL</h4>
            <h5>ahazpharmaplc1@gmail.com</h5>
            <a
              href="mailto:ahazpharmaplc1@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              send a message
            </a>
          </article>

          <article className="contact__option animation" data-aos="zoom-in">
            <MdCall className="contact-icon" />
            <h4>Call</h4>
            <h5>+251940917172</h5>
            <a href="tel:0940917172">Ring the bell</a>
          </article>
        </div>

        <form
          onSubmit={sendEmail}
          data-aos="fade-left"
          className="animation contact-form"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="contact-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="contact-input"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="contact-input"
            required
          ></textarea>
          <button type="submit" className="btn btn-primary">
            <IoMdSend size={22} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
