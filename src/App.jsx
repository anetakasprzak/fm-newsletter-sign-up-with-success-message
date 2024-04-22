/* eslint react/prop-types: 0 */
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="wrapper">
      {!showSuccessPage && (
        <MainComponent
          setShowSuccessPage={setShowSuccessPage}
          setEmail={setEmail}
        />
      )}
      {showSuccessPage && (
        <SuccessPage setShowSuccessPage={setShowSuccessPage} email={email} />
      )}
    </div>
  );
}

function MainComponent({ setShowSuccessPage, setEmail }) {
  return (
    <div className="component">
      <picture className="img">
        <source
          srcSet="./images/illustration-sign-up-desktop.svg"
          media="(min-width: 90rem)"
        />
        <source srcSet="./images/illustration-sign-up-mobile.svg" />
        <img src="./images/illustration-sign-up-mobile.svg" alt="background" />
      </picture>

      <main className="main__box">
        <h1 className="header">Stay updated!</h1>
        <p className="text">
          Join 60,000+ product managers receiving monthly updates on:{" "}
        </p>
        <ul className="list">
          <li className="list__item">
            <img src="./images/icon-list.svg" alt="icon" />
            Product discovery and building what matters
          </li>
          <li className="list__item">
            <img src="./images/icon-list.svg" alt="icon" />
            Measuring to ensure updates are a success
          </li>
          <li className="list__item">
            <img src="./images/icon-list.svg" alt="icon" />
            And much more!
          </li>
        </ul>

        <Form setShowSuccessPage={setShowSuccessPage} setEmail={setEmail} />
      </main>
    </div>
  );
}

function Form({ setShowSuccessPage, setEmail }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    setShowSuccessPage(true);
    setEmail(data.email);
  };

  return (
    <>
      <form className="form__box" onSubmit={handleSubmit(onSubmit)}>
        <div className="input__container">
          <label className="form__label">Email address</label>
          <input
            className={errors.email ? "form__input-error" : "form__input"}
            type="email"
            placeholder="email@company.com"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Valid email required</span>}
        </div>
        <Button>Subscribe to monthly newsletter</Button>
      </form>
    </>
  );
}

function SuccessPage({ setShowSuccessPage, email }) {
  console.log(setShowSuccessPage);

  return (
    <div className="success__page">
      <div className="success__text-box">
        <img
          className="success__img"
          src="./images/icon-success.svg"
          alt="icon"
          width="64px"
        />
        <h1 className="header">Thanks for subscribing!</h1>
        <p className="text">
          A confirmation email has been sent to <strong>{email}</strong>. Please
          open it and click the button inside to confirm your subscription.
        </p>
      </div>
      <Button onClick={() => setShowSuccessPage(false)}>Dismiss message</Button>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}
