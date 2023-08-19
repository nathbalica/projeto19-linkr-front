import useAuth from "../../hooks/useAuth"
import { AuthContainer, HeaderAuth, InputAuth, ButtonAuth, AuthLink, ContainerLogo, FormContainer } from "./styled"
import apis from "../../services/apis"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" }); // Usando a tupla completa
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function loginUser(e) {
    e.preventDefault()

    apis.singIn({ ...form })
      .then(res => {
        login(res.data)
        navigate('/timeline')
      })
      .catch(() => {
        alert('Erro, tente novamente');
      })
  }



  return (
    <AuthContainer>
      <HeaderAuth>
        <ContainerLogo>

          <h1>linkr</h1>
          <h3>
            save, share and discover <br />
            the best links on the web
          </h3>
        </ContainerLogo>
      </HeaderAuth>
      <FormContainer onSubmit={loginUser}>
        <InputAuth
          required
          type="email"
          autoComplete="username"
          placeholder="E-mail"
          name="email"
          value={form.email}
          onChange={handleForm}
        />
        <InputAuth
          required
          minLength={3}
          type="password"
          autoComplete="new-password"
          placeholder="password"
          name="password"
          value={form.password}
          onChange={handleForm}
        />
        <ButtonAuth type="submit">Log In</ButtonAuth>
        <AuthLink to="/sign-up">
          First time? Create an account!
        </AuthLink>
      </FormContainer>

    </AuthContainer>
  )
}