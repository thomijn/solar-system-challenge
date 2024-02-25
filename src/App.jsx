import {
  useProgress,
} from "@react-three/drei";
import { Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useSound from "use-sound";
import audioSfx from '/audio.mp3';
import { Analytics } from "@vercel/analytics/react"
import Scene from "./Scene";

function App() {
  const [entered, setEntered] = useState(false);
  const { progress } = useProgress();
  const [play] = useSound(audioSfx, {
    volume: 0.4,
    loop: true
  });


  return (
    <>
      <Analytics />
      <AnimatePresence>
        {!entered && (
          <motion.div transition={{ duration: 1.2 }} exit={{ opacity: 0 }} className="intro">
            <div className="progress-bar-wrapper">
              <motion.div
                className="progress-bar"
                initial={{ width: 0 }}
                animate={{
                  x: progress === 100 ? window.innerWidth * 0.31 : 0,
                  width: progress === 100 ? "100%" : progress + "%",
                }}
                transition={{
                  ease: [0.87, 0, 0.13, 1],
                  duration: 1,
                  x: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 1,
                  },
                }}
              ></motion.div>
            </div>
            <motion.button
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              onClick={() => {
                setEntered(true);
                play();
              }}
              initial={{ opacity: 0 }}
              transition={{
                delay: 1.5,
                duration: 0.4,
                ease: [0.87, 0, 0.13, 1],
              }}
              animate={{
                opacity: progress === 100 ? 1 : 0,
              }}
            >
              Enter
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </>
  );
}

export default App;
