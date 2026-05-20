export default function AppLoading() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      <p className="text-white/40 text-sm mt-4">Chargement...</p>
    </div>
  );
}
