import {signIn} from "@/auth";
import './index.css'

export default function Home() {
  return (
      <div className="auth-container">
        <div className="box">
          <div className="title">
            <h1>HEFACEIT.RU</h1>
            <p>Облегченная платформа FaceIt для фокуса на игре. С улучшенной статистикой, быстрой загрузкой информации и аналитикой.</p>
          </div>
          <button onClick={async () => {
            "use server"
            await signIn("faceit")
          }}>Войти через FACEIT</button>
          <div className="political">
            <span>При авторизации вы соглашаетесь с</span> <a style={{textDecoration: 'underline'}} href="#">политикой конфиденциальности</a>
          </div>
        </div>
      </div>
  )
}