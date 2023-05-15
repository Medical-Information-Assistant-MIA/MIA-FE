import './HomePage.css'

export const HomePage = () => {
  return (
    <section className='home-page'>
      <h2>Welcome to Mia <span className='small-title'>(Medical Information Assistant)</span></h2>
      <div 
        className='site-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
      <button>To Dashboard</button>
    </section>
  )
}