export function Button({ children, onClick, className, type = "button" }) {
    return (
      <button className={`btn ${className}`} onClick={onClick} type={type}>
        {children}
      </button>
    );
  }
  