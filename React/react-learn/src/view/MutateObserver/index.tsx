import  { useEffect, useState } from 'react';
import MutateObserver from './MutateObserver';

function ShowMutateObserver() {
  const [ className, setClassName] = useState('aaa');

  useEffect(() => {
    setTimeout(() => setClassName('bbb'), 2000);
  }, []);

  const callback = function (mutationsList: MutationRecord[]) {
    console.log(mutationsList);
  };

  return (
    <div>
      MutateObserver
      <MutateObserver onMutate={callback}>
        <div id="container">
          <div className={className}>
            {
              className === 'aaa' ? <div>aaa</div> : <div>
                <p>bbb</p>
              </div>
            }
          </div>
        </div>
      </MutateObserver>
    </div>
  )
}

export default ShowMutateObserver
