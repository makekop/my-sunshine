export default function LoadingPulse({ text = 'Loading...', className = '' }) {
  return (
    <p className={`text-slate-400 text-center animate-pulse ${className}`}>
      {text}
    </p>
  );
}
