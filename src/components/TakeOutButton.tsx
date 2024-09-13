import { useEffect, useState } from "react";

type TakeOutButtonProps = {
  noActive: boolean;
  handleOnClick: () => void;
};

const TakeOutButton = ({ noActive, handleOnClick }: TakeOutButtonProps) => {
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval: number;

    if (isCountingDown && count < 10) {
      interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    } else if (count === 10) {
      setIsCountingDown(false);
      setCount(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCountingDown, count]);

  const handleClick = () => {
    if (!isCountingDown) {
      setIsCountingDown(true);
      setCount(1);
    }
    handleOnClick();
  };

  return (
    <div className="inline-flex items-center w-full">
      <button
        onClick={handleClick}
        disabled={isCountingDown || noActive}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed disabled:rounded-r-none transform active:scale-95 transition duration-150"
      >
        Sacar Siguiente Balota
      </button>
      {isCountingDown && (
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-r-md border-t border-r border-b border-blue-500 transform active:scale-95 transition duration-150">
          <span className="text-blue-500 font-bold">{count}</span>
        </div>
      )}
    </div>
  );
};

export default TakeOutButton;
