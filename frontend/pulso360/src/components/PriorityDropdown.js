import React, { useEffect, useId, useRef, useState } from 'react';

const OPTIONS = [
  { value: 'high', label: 'Alta', icon: '🔥' },
  { value: 'medium', label: 'Média', icon: '📊' },
  { value: 'low', label: 'Baixa', icon: '📝' }
];

export default function PriorityDropdown({
  value = 'medium',
  onChange,
  placeholder = 'Selecionar prioridade',
  disabled = false,
  size = 'md',
  name,
  ariaLabel
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => OPTIONS.findIndex(o => o.value === value) || 0);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const id = useId();

  useEffect(() => {
    const close = (e) => {
      if (!listRef.current || !buttonRef.current) return;
      if (!listRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  useEffect(() => {
    const idx = OPTIONS.findIndex(o => o.value === value);
    if (idx >= 0) setActiveIndex(idx);
  }, [value]);

  const current = OPTIONS.find(o => o.value === value);

  const handleKeyDown = (e) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % OPTIONS.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + OPTIONS.length) % OPTIONS.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const opt = OPTIONS[activeIndex];
      onChange && onChange(opt.value);
      setOpen(false);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div className={`priority-dropdown ${size}`}>
      <button
        type="button"
        ref={buttonRef}
        className={`priority-trigger ${disabled ? 'disabled' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label={ariaLabel || 'Selecionar prioridade'}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        name={name}
      >
        <span className={`priority-dot ${current ? current.value : 'medium'}`} />
        <span className="priority-label">
          {current ? (
            <>
              <span aria-hidden>{current.icon}</span> {current.label}
            </>
          ) : (
            placeholder
          )}
        </span>
        <span className="priority-caret" aria-hidden>▾</span>
      </button>

      {open && (
        <ul
          id={`${id}-list`}
          ref={listRef}
          className="priority-list"
          role="listbox"
          aria-activedescendant={`${id}-opt-${activeIndex}`}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
        >
          {OPTIONS.map((opt, idx) => (
            <li
              id={`${id}-opt-${idx}`}
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={`priority-option ${idx === activeIndex ? 'active' : ''}`}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => {
                onChange && onChange(opt.value);
                setOpen(false);
                buttonRef.current?.focus();
              }}
            >
              <span className={`priority-dot ${opt.value}`} />
              <span className="option-label">
                <span aria-hidden>{opt.icon}</span> {opt.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
