export default function NopePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-black text-white px-6">
      <h1 className="text-4xl font-bold mb-4">🚫 Access Denied</h1>
      <p className="text-neutral-400 max-w-md">
        Sorry, Ava is exclusively for <span className="text-yellow-400 font-semibold">@abodie.co</span> humans.
      </p>
      <img
        src="https://media.giphy.com/media/l4KhQo2MESJkc6QbS/giphy.gif"
        alt="Not today"
        className="mt-8 rounded-xl w-80"
      />
      <p className="mt-6 text-sm text-neutral-500">Go get yourself an Abodie email and try again.</p>
    </div>
  );
}
