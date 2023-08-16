import { useEffect, useState } from 'react';
import cl from "./Loader.module.css";

const Loader = ({ isLoading, className }: { isLoading: boolean, className?: string }) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (isLoading)
      setRender(true);
  }, [isLoading]);

  const onAnimationEnd = () => (!isLoading) && setRender(false);

  if (!render)
    return <></>;

  return (
    <div
      className={[
        cl.loader_wrapper, 
        isLoading ? cl.slide_in : cl.slide_out, 
        className
      ].join(" ")}
      onAnimationEnd={onAnimationEnd}
    >
      <div className={cl.loader}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader;