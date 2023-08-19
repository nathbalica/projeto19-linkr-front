import { useState } from "react";
import apis from "../../services/apis";
import { useNavigate } from "react-router-dom";

import { AuthContainer, HeaderAuth, InputAuth, ButtonAuth, AuthLink, ContainerLogo, FormContainer } from "../LoginPage/styled"

export default function SignUpPage() {
  const [ form, setForm ] = useState({ username: "", email: "", password: "", profile_image: "" })
  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function register(e) {
    e.preventDefault()

    const promise = apis.signUp(form)
    promise.then(res => {
      console.log(res)
      navigate("/")
    });
    promise.catch(err => {

      alert(err.response.data);

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
      <FormContainer onSubmit={register}>
        
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
        <InputAuth
          required
          placeholder="username"
          name="username"
          value={form.username}
          onChange={handleForm}
        />
        <InputAuth
          required
          minLength={3}
          placeholder="picture url"
          name="profile_image"
          value={form.profile_image}
          onChange={handleForm}
        />
        <ButtonAuth type="submit">Sign Up</ButtonAuth>
      <AuthLink to="/">
      Switch back to log in!
      </AuthLink>
      </FormContainer>

    </AuthContainer>
  )
}