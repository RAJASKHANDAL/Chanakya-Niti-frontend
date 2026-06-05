import React from 'react';

function LandingPage({ greetingLine, enterSabha }) {
  return (
    <>
      <header className="topbar">
        <div className="topbar__chant">
          NITI SHASTRA ✦ ARTHASHASTRA ✦ CHANAKYA NITI ✦ KAUTILYA ✦ CHANDRAGUPTA MAURYA ✦ VIDUR NITI
        </div>
      </header>

      <main className="landing">
        <div className="landing__bg" />
        <div className="landing__vignette" />
        <div className="landing__pillar landing__pillar--left" />
        <div className="landing__pillar landing__pillar--right" />
        <div className="landing__arc landing__arc--left" />
        <div className="landing__arc landing__arc--right" />

        <section className="landing__content">
          

          <h1 className="landing__title">Acharya Vishnugupta</h1>

          <p className="landing__subtitle">
            Known to history as Chanakya · Philosopher · Strategist · Voice of Niti
          </p>

          <p className="landing__greeting">{greetingLine}</p>
        <footer className="landing__footer">
    © 2026 Chanakya Niti. All Rights Reserved.
  </footer>

          <div className="landing__figure-wrap">
            <img
              className="landing__figure"
              src="/Meditating.png"
              alt="Acharya Vishnugupta"
            />
          </div>

          <div className="landing__mantra-box">
            <h3>Om Namah. Enter with sincerity, seeker. Leave with wisdom.</h3>
            <p>Ask not for comfort alone — ask for truth, discipline, and direction.</p>
          </div>

          <button
  className="enter-btn"
 onClick={() => {
  console.log("CLICKED");
  setTimeout(() => {
    enterSabha();
  }, 1000);
}}
>
  Enter The Sabha
</button>
        </section>
      </main>
    </>
  );
}

export default LandingPage;