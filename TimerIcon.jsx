export default function TimerIcon({ size = 24, color = "#F9F4DA" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <line x1="12" y1="6" x2="12" y2="12" stroke={color} strokeWidth="2" />
      <line x1="12" y1="12" x2="16" y2="14" stroke={color} strokeWidth="2" />
    </svg>
  );
}
