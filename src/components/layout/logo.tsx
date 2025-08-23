import { Link } from 'react-router';

export default function Logo() {
  return (
    <div>
      <Link to='/'>
        <h1 className='hover:bg-sky-100 px-4 py-2 rounded-xl font-bold text-3xl transition'>
          <span className='text-sky-700'>Qui</span>
          <span>Cash</span>
        </h1>
      </Link>
    </div>
  );
}
