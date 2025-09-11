import {
  FullScreen as FullScreenWrapper,
  useFullScreenHandle,
} from "react-full-screen";
import { Expand, Shrink } from "lucide-react";
import { type ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

const FullScreenToggle = ({ children }: Props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const handle = useFullScreenHandle();

  return (
    <div>
      {!isFullScreen && (
        <button
          onClick={handle.enter}
          className="absolute bottom-4 right-4 text-black px-3 py-1 rounded z-10 border-0 bg-transparent"
          aria-label="Enter fullscreen"
        >
          <p title="Enter Fullscreen">
            <Expand color="#ebebf8" />
          </p>
        </button>
      )}

      <FullScreenWrapper handle={handle} onChange={setIsFullScreen}>
        {isFullScreen && (
          <button
            onClick={handle.exit}
            className="absolute top-4 right-4 text-black px-3 py-1 rounded z-10 border-0 bg-transparent"
            aria-label="Exit fullscreen"
          >
            <p title="Exit Fullscreen">
              <Shrink color="#ebebf8" />
            </p>
          </button>
        )}
        {children}
      </FullScreenWrapper>
    </div>
  );
};

export default FullScreenToggle;
