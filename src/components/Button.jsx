const Button = ({ color = 'steelblue', text = 'Click', onClick }) => {
  // Render a button with dynamic styles and text based on props
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className="btn"
    >
      {text}
    </button>
  )
}

export default Button;