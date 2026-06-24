import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <main class="relative flex min-h-screen items-center justify-center overflow-hidden bg-black-500 px-6">
      {/* Background Glow */}
      <div class="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl" />

      {/* Decorative circles */}
      <div class="absolute left-20 top-20 h-32 w-32 rounded-full border border-orange-500/10" />
      <div class="absolute bottom-20 right-20 h-48 w-48 rounded-full border border-prussian-blue-700/20" />

      <section class="relative z-10 max-w-2xl text-center">
        <div class="mb-6 inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-500">
          ERROR 404
        </div>

        <h1 class="font-oswald text-8xl font-bold tracking-tight text-white-500 md:text-[10rem]">
          404
        </h1>

        <div class="mx-auto my-6 h-1 w-32 rounded-full bg-orange-500" />

        <h2 class="mb-4 text-3xl font-bold text-alabaster-grey-900">
          Lost in the Void
        </h2>

        <p class="mx-auto mb-10 max-w-lg text-lg text-alabaster-grey-400">
          The page you're looking for drifted into deep space, got eaten by a
          rogue bug, or never existed in the first place.
        </p>

        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <A
            href="/"
            class="rounded-xl bg-orange-500 px-6 py-3 font-medium text-black-500 transition-all hover:scale-105 hover:bg-orange-600"
          >
            Return Home
          </A>

          <button
            onClick={() => window.history.back()}
            class="rounded-xl border border-prussian-blue-600 bg-prussian-blue-500/30 px-6 py-3 font-medium text-alabaster-grey-700 transition-all hover:border-orange-500 hover:text-orange-500"
          >
            Go Back
          </button>
        </div>

        {/* Tiny status text */}
        <p class="mt-12 text-sm text-alabaster-grey-300">
          Error Code: <span class="text-orange-500">PAGE_NOT_FOUND</span>
        </p>
      </section>
    </main>
  );
}
