import { useEffect } from 'react';
import { convertedVariables } from 'constants/index';
import { replaceTistoryVariable } from 'utils';

export const DevTools = () => {
  const enableVariableSwap = process.env.__ENABLE_VARIABLE_SWAP___;
  useEffect(() => {
    if (!enableVariableSwap) return;
    const rootElement = document.getElementById('root');
    if (rootElement) {
      const AllNodes = rootElement.querySelectorAll('*');
      AllNodes.forEach(node => {
        replaceTistoryVariable(node, convertedVariables);
      });
    }
  }, []);

  return (
    <div>
      devtools
      <p className="text-3xl font-bold text-black p-1">hello world</p>
      <button>치환</button>
    </div>
  );
};
