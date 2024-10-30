import { useEffect } from 'react';

export const removeAllTistoryTags = () => {
  const tistoryElements = document.querySelectorAll('[data-is-tistory-tag');
  tistoryElements.forEach(element => {
    const parent = element.parentNode;
    while (element.firstChild) {
      parent.insertBefore(element.firstChild, element);
    }
    parent.removeChild(element);
  });
};

export const useRemoveTistoryTags = () => {
  const isSSR = process.env.__SSR__;

  useEffect(() => {
    if (!isSSR) removeAllTistoryTags();
  }, []);
};
