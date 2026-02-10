import Button from './Button';

const Header = ({ showForm, changeTextAndColor }) => {
  return (
    <header className="header">
      <h2 className="app-header">Task Manager App</h2>
      <Button
        onClick={showForm}
        color={changeTextAndColor ? 'red' : 'green'}
        text={changeTextAndColor ? 'Close' : 'Add'}
      />
    </header>
  )
}

// "defaultProps" sets default values if props are missing
Header.defaultProps = {
  title: 'Task Manager App',
}

export default Header;