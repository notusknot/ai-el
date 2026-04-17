export default function RatingSlider({ label, hint, value, onChange }) {
  return (
    <label className="slider-group">
      <span className="slider-label">
        {label}: <strong>{value}</strong>
      </span>
      <span className="hint">{hint}</span>
      <input
        type="range"
        min={-5}
        max={5}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
