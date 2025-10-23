import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Main.scss";
import HelloCard from "../components/HelloCard";
import InstructionCard from "../components/InstructionCard";
import ProductCard from "../components/ProductCard";
import CartIcon from "../components/CartIcon";
import { CartProvider } from "../contexts/CartContext";

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
    <CartProvider>
      <CartIcon />
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

          {/* Simulated loading of products */}
          <ProductsSection />
        </div>
      </div>
    </CartProvider>
  );
};

export default MainPage;

const demoProducts = [
  {
    id: 1,
    title: "Кроссовки Nike Pegasus",
    description: "Легкие беговые кроссовки для ежедневных тренировок",
    price: 112000,
    imageSrc: "/images/background-login.png",
    bonusPoints: 1120,
  },
  {
    id: 2,
    title: "Кроссовки Nike Air Max",
    description: "Классические кроссовки с технологией Air Max",
    price: 89000,
    imageSrc: "/logo512.png",
    bonusPoints: 890,
  },
  {
    id: 3,
    title: "Кроссовки Adidas Ultraboost",
    description: "Премиальные кроссовки с технологией Boost",
    price: 99000,
    imageSrc: "/logo192.png",
    bonusPoints: 990,
  },
  {
    id: 4,
    title: "Кроссовки Puma Deviate Nitro",
    description: "Скоростные кроссовки для соревнований",
    price: 76000,
    imageSrc: "/logo192.png",
    bonusPoints: 760,
  },
  {
    id: 5,
    title: "Кроссовки New Balance 990",
    description: "Премиальная модель с превосходной амортизацией",
    price: 125000,
    imageSrc: "/logo512.png",
    bonusPoints: 1250,
  },
  {
    id: 6,
    title: "Кроссовки Converse Chuck Taylor",
    description: "Классические кеды для повседневной носки",
    price: 45000,
    imageSrc: "/logo192.png",
    bonusPoints: 450,
  },
];

const ProductsSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(demoProducts);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="loader">Загружаем товары…</div>;
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};
