import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import loginImg from "../../../public/nosotros.jpg";
import logoStore from "../../assets/logo.png";
import Loader from "../Loader/Loader";

import Swal from "sweetalert2";

import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

import "./Login.css";
import "../../stylesheet/gral-styles/site-styles.css";
import { AuthContext } from "../../context/AuthContext";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
};

let ps = false;

const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexPhone =
    /^\+?([0-9]{2})\)?[-]?([0-9]{3})[ ]?([0-9]{3})?[-]?([0-9]{4})$/;

  if (!form.email.trim()) {
    errors.email = "El campo email es requerido";
  } else if (regexEmail.test(form.email.trim()) == false) {
    errors.email = "Email incorrecto";
  }

  if (!form.name.trim()) {
    errors.name = "El campo nombre es requerido ";
  } else if (regexName.test(form.name.trim()) == false) {
    errors.name = "El nombre solo acepta letras y espacios en blanco";
  }

  if (!form.phone) {
    errors.phone = "El campo teléfono es requerido ";
  } else if (isNaN(form.phone)) {
    errors.phone = "Solo se aceptan números en el teléfono ";
  } else if (regexPhone.test(form.phone.trim()) == false) {
    errors.phone = "Número inválido ";
  }
  if (!form.password.trim()) {
    errors.password = "El campo password es requerido";
  }
  return errors;
};

function Login({ session }) {
  const [login, setLogin] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const { setSession } = useContext(AuthContext);

  const navigate = useNavigate();

  /* funcion de login */
  const logIn = async (email, password) => {
    setLoading(true);

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (!auth.currentUser.emailVerified) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Debe verificar su correo electrónico. Diríjase a su bandeja de entrada",
        });
      } else {
        setLoading(false);
        setSession(true);
        navigate("/e-commerce-react/Inicio");
      }
    } catch (error) {
      setLoading(false);
      if (error.message.includes("auth/user-not-found")) {
        setErrors({ ...errors, email: "El usuario con ese email no existe" });
      } else if (error.message.includes("auth/wrong-password")) {
        setErrors({ ...errors, password: "Contraseña incorrecta" });
      }
    }
  };

  /* funcion de register */
  const register = async ({ name, email, phone, password }) => {
    setLoading(true);

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      sendEmailVerification(auth.currentUser).then(() => {
        setLoading(false);
        Swal.fire({
          title: "Usuario Registrado",
          text: " Diríjase a su bandeja de entrada para verificar su correo",
        });
        setLogin(true);
        updateProfile(auth.currentUser, {
          displayName: auth.currentUser.displayName || name,
          phoneNumber: auth.currentUser.phoneNumber || phone,
        }).catch((error) => {
          setLoading(false);

          if (
            error.message.includes(
              "Password should be at least 6 characters (auth/weak-password)"
            )
          ) {
            setErrors({
              ...errors,
              password: "La contraseña debe contener mas de 6 caracteres",
            });
          } else if (error.message.includes("auth/email-already-in-use")) {
            setErrors({
              ...errors,
              email: "Ya existe un usuario con ese correo",
            });
          }
        });
      });
    } catch {
      (error) => console.log(error);
    }
  };

  /* control de valores de inputs */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    setErrors(validationsForm(form, passwordConfirm));
  };

  /* control del Submit Login */
  const handleSubmitLogin = (e) => {
    e.preventDefault();

    if (!errors.email && !errors.password) {
      logIn(form.email, form.password);
    }
  };

  /* Control del submit Register */
  const handleSubmitRegister = (e) => {
    e.preventDefault();

    if (form.password !== passwordConfirm) {
      setErrorPassword("Las contraseñas no coinciden");
    } else {
      setErrorPassword("");
      if (!errors.email && !errors.password && !errors.phone && !errors.name) {
        register(form);
      }
    }
  };
  if (!session) {
    return (
      <div className="login">
        <div className="login-content">
          <div className="login-img">
            <img src={loginImg} alt="imagen del login" />
          </div>
          <div className="login-rigth">
            <img src={logoStore} alt="logo de frontend" />
            <div className="login-titles">
              {login ? <h1>Iniciar Sesión</h1> : <h1>Registrarse</h1>}
            </div>
            {login ? (
              <form onSubmit={handleSubmitLogin} className="login-inputs">
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  required
                  placeholder="Ingrese su email"
                  value={form.email}
                />
                {errors.email && <p className="input-errors">{errors.email}</p>}
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  required
                  placeholder="Ingrese su contraseña"
                  value={form.password}
                />
                {errors.password && (
                  <p className="input-errors">{errors.password}</p>
                )}
                {loading && (
                  <div className="sesion-loader">
                    <Loader />
                  </div>
                )}
                <div className="login-buttons">
                  <input
                    type="submit"
                    className="btn"
                    value={login ? "Iniciar Sesión" : "Registrarse"}
                  />
                </div>

                {login && (
                  <p className="input-question">
                    No tiene cuenta?
                    <button onClick={() => setLogin(false)}>Crear una</button>
                  </p>
                )}
              </form>
            ) : (
              <form onSubmit={handleSubmitRegister} className="login-inputs">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  required
                  onChange={handleChange}
                  placeholder="Ingrese su nombre"
                />
                {errors.name && <p className="input-errors">{errors.name}</p>}
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  required
                  placeholder="Ingrese su email"
                  value={form.email}
                />
                {errors.email && <p className="input-errors">{errors.email}</p>}
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  required
                  onChange={handleChange}
                  placeholder="Ingrese su número de teléfono"
                />
                {errors.phone && <p className="input-errors">{errors.phone}</p>}
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  required
                  placeholder="Ingrese su contraseña"
                  value={form.password}
                />
                {errors.password && (
                  <p className="input-errors">{errors.password}</p>
                )}
                <input
                  name="passwordConfirm"
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                  }}
                  type="password"
                  required
                  placeholder="Confirmar contraseña"
                  value={passwordConfirm}
                />
                {}
                {errorPassword && (
                  <p className="input-errors">Las constraseñas no coinciden</p>
                )}

                {loading && (
                  <div className="sesion-loader">
                    <Loader />
                  </div>
                )}
                <div className="login-buttons">
                  <input
                    type="submit"
                    className="btn"
                    value={login ? "Iniciar Sesión" : "Registrarse"}
                  />
                </div>
                <p className="input-question">
                  Ya tiene cuenta?
                  <button onClick={() => setLogin(true)}>
                    Ir a Inicio de Sesión
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
  return <Navigate to="/e-commerce-react/Inicio" />;
}
export default Login;
