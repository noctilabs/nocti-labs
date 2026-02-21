import PersistentNav from '../layout/PersistentNav';

export default function Hero() {
  return (
    <section
      style={{
        width: '100%',
        aspectRatio: '1445 / 789',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: 'url(/noctiLabsBackgroundLanding.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Inner headline panel */}
      <div
        style={{
          width: '62.56%',   // 903/1445
          aspectRatio: '903 / 385',
          left: '18.96%',   // 274/1445
          top: '25.60%',    // 202/789
          position: 'absolute',
          backgroundImage: 'url(/noctiLabsBackgroundInnerLanding.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            width: '74.5%',   // 673/903
            color: 'white',
            fontSize: 'clamp(24px, 3.32vw, 48px)',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            lineHeight: 1.04,
            textAlign: 'center',
          }}
        >
          Commerce and Technology Studio for the AI era
        </p>
      </div>

      {/* Navigation bar */}
      <PersistentNav />
    </section>
  );
}
