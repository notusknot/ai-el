export default function TagSelector({ label, options, selected, onChange }) {
  function toggle(id) {
    if (selected.includes(id)) {
      onChange(selected.filter((item) => item !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  return (
    <div className="tag-selector">
      <span>{label}</span>
      <div className="tag-list">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={selected.includes(option.id) ? "tag active" : "tag"}
            onClick={() => toggle(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
