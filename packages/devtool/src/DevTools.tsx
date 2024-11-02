import { useEffect, useState } from 'react';
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

  const [openPopup, setOpen] = useState(false);

  return (
    <div>
      <div className="fixed bottom-10 right-10">
        {!openPopup && (
          <button
            className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 shadow-2xl"
            onClick={() => setOpen(prev => !prev)}
          >
            <svg
              className="w-8 h-8"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="CodeIcon"
              aria-label="fontSize medium"
            >
              <path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6z"></path>
            </svg>
          </button>
        )}
        {openPopup && (
          <section className="w-60 h-96 fixed bottom-10 right-10 bg-blue-100">
            <div className="flex flex-col items-center py-8">
              <button onClick={() => setOpen(prev => !prev)}>
                <svg
                  className="w-4 h-4"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="CloseIcon"
                  aria-label="fontSize medium"
                >
                  <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              </button>
              <div className="flex px-4">
                <button className="w-20 h-6 border border-solid border-gray-700 rounded-2xl">
                  Pages
                </button>
                <button className="w-20 h-6 border border-solid border-gray-700 rounded-2xl">
                  Components
                </button>
                <button className="w-20 h-6 border border-solid border-gray-700 rounded-2xl">
                  Settings
                </button>
              </div>
              <span>Article</span>
              <span>Tags</span>
              <span>Sidebar</span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
