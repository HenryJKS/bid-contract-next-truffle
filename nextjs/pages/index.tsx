import type { NextPage } from 'next';
import { ConnectKitButton } from 'connectkit';
import Owner from '../components/Owner';
import BidWinner from '../components/BidWinner';
import BidForm from '../components/BidForm';
import Withdraw from '../components/Withdraw';

const Home: NextPage = () => {
  return (
    <div>
      <div className='flex justify-end m-2'>
        <ConnectKitButton />
      </div>

      <div>
        <BidWinner />
        <div className='flex justify-center'>
          <BidForm />
          <Withdraw />
        </div>
        <Owner />
      </div>
    </div>
  );
};

export default Home;
