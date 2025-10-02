import React, { useMemo, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Main.scss";
import HelloCard from "../components/HelloCard";
import InstructionCard from "../components/InstructionCard";

const MainPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const texts = useMemo(
    () => ["Непонимая языка", "Женщин", "Критических ошибок"],
    []
  );

  const [textHello, setTextHello] = useState(texts[0]);

  const handleNext = useCallback(() => {
    setTextHello((prev) => {
      const i = texts.indexOf(prev);
      const next = texts[(i + 1) % texts.length];
      return next;
    });
  }, [texts]);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(null);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setSubmitted({ login, password });
    },
    [login, password]
  );

  return (
    <>
      <div className="main">
        <div className="main__container">
          <HelloCard text={textHello} onNext={handleNext} />
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Отправить</button>
          </form>
          {submitted && (
            <div className="submitted">
              <div>Логин: {submitted.login}</div>
              <div>Пароль: {submitted.password}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MainPage;
