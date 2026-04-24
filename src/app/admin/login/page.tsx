import { login } from './actions'
import './login.css'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-box surface-low">
        <div className="login-header">
           <Image src="/cato.svg" alt="Cato Logo" width={150} height={60} />
           <h1 className="headline-lg">ADMIN LOGIN</h1>
        </div>
        <form className="login-form">
          <div className="input-group">
            <label className="label-md" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className="input-group">
            <label className="label-md" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>
          <button formAction={login} className="btn btn-primary">Sign In</button>
        </form>
      </div>
    </div>
  )
}
