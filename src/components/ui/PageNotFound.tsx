import { Link } from '@/i18n/navigation';

export default function PageNotFound() {
  return (
    <main className="flex items-center justify-center min-h-screen py-20 px-4">
      <div className="text-center flex flex-col items-center gap-10 max-w-lg">
        {/* Illustration: broken path / route to nowhere */}
        <figure className="w-40 h-40 shrink-0" aria-hidden>
          <svg
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-accent"
          >
            <circle cx="40" cy="80" r="12" fill="currentColor" opacity="0.9" />
            <circle cx="120" cy="80" r="12" fill="currentColor" opacity="0.2" />
            <path
              d="M52 80 H108"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="8 6"
              opacity="0.5"
            />
            <path
              d="M80 50 L80 30 M80 110 L80 130"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.4"
            />
            <circle cx="80" cy="80" r="4" fill="currentColor" opacity="0.6" />
          </svg>
        </figure>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-accent text-sm tracking-widest uppercase">
            404
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            This page doesn&apos;t exist.
          </h1>
          <p className="text-muted text-lg">
            You took a wrong turn. Or we did. Either way, there&apos;s nothing
            here—but the rest of the site is still there.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 font-medium text-accent hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black rounded"
        >
          <span>Back to home</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            className="shrink-0"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </main>
  );
}
