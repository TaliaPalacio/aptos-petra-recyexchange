// pages/landing.tsx
import Head from 'next/head';
import styles from '../styles/landing.module.css';

const Landing: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Transformando el Reciclaje en Medellín</title>
        <meta name="description" content="Conéctate con recicladores locales y haz un impacto positivo en tu comunidad." />
      </Head>

      <header className={styles.header}>
        <h1>Transformando el Reciclaje en Medellín</h1>
        <h2>Conéctate con recicladores locales y haz un impacto positivo en tu comunidad.</h2>
        <button className={styles.ctaButton}>Comienza Ahora</button>
      </header>

      <section className={styles.challengeSection}>
        <h2>El Desafío que Enfrentamos</h2>
        <p>
          En Medellín, muchos ciudadanos carecen del hábito de reciclar, lo que impacta negativamente tanto al medio ambiente como a la comunidad.
          Nuestra app tiene como objetivo cambiar eso y facilitar la recolección de reciclables.
        </p>
      </section>

      <section className={styles.solutionSection}>
        <h2>Nuestra Solución</h2>
        <p>
          Nuestra app conecta a recicladores independientes con ciudadanos que desean reciclar, facilitando la comunicación y la coordinación
          para una recolección más eficiente y dignificante.
        </p>
      </section>

      <section className={styles.featuresSection}>
        <h2>Características que Importan</h2>
        <ul>
          <li>💬 Chat Integrado: Comunícate directamente con los recicladores.</li>
          <li>🎁 Sistema de Recompensas: Gana tokens por reciclar.</li>
          <li>🔔 Notificaciones en Tiempo Real: Recibe alertas sobre oportunidades de reciclaje.</li>
          <li>📚 Recursos Educativos: Accede a consejos sobre reciclaje efectivo.</li>
        </ul>
      </section>

      <footer className={styles.footer}>
        <h2>Únete a Nosotros para Hacer la Diferencia</h2>
        <button className={styles.ctaButton}>Descargar la App</button>
      </footer>
    </div>
  );
};

export default Landing;
