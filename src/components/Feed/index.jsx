import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion"
import FeedCard from "./FeedCard"
import useFeed from "../../hooks/useFeed"

const Feed = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const { feed, handleSwipe } = useFeed()

  const [dragInfo, setDragInfo] = useState(0)
  const [showInstructions, setShowInstructions] = useState(true)
  const [exitDirection, setExitDirection] = useState(0)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-10, 10])

  useEffect(() => {
    if (!user) navigate("/login", { replace: true })
  }, [user, navigate])

  if (!feed) return <h1 className="flex justify-center my-10">Loading...</h1>
  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users found!</h1>

  const activeUser = feed[0]

  const onSwipe = (direction) => {
    setShowInstructions(false)
    handleSwipe(direction, activeUser._id)
  }

  const handleButtonSwipe = (direction) => {
    setExitDirection(direction === "right" ? 500 : -500)
    onSwipe(direction)
  }

  return (
    <div className="flex justify-center items-center w-full h-full pb-8 relative overflow-hidden">

      <AnimatePresence>
        {showInstructions && (
          <>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-1/2 -translate-y-1/2 right-1/2 mr-[15rem] hidden md:flex flex-col items-end gap-2 pointer-events-none z-10"
            >
              <span className="text-error font-bold bg-base-300/80 backdrop-blur px-3 py-1.5 rounded-lg text-sm border border-error/30 shadow-md">
                ← Swipe Left
              </span>
              <span className="text-xs text-base-content/50 font-semibold">
                to Ignore
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-1/2 -translate-y-1/2 left-1/2 ml-[15rem] hidden md:flex flex-col items-start gap-2 pointer-events-none z-10"
            >
              <span className="text-success font-bold bg-base-300/80 backdrop-blur px-3 py-1.5 rounded-lg text-sm border border-success/30 shadow-md">
                Swipe Right →
              </span>
              <span className="text-xs text-base-content/50 font-semibold">
                if Interested
              </span>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeUser._id}
          className="relative rounded-2xl shadow-xl w-80 md:w-96 h-[85%] max-h-[500px] flex flex-col overflow-hidden"
          drag="x"
          style={{ x, rotate }}
          dragConstraints={{ left: 0, right: 0 }}
          onDrag={(event, info) => setDragInfo(info.offset.x)}
          onDragStart={() => setShowInstructions(false)}
          onDragEnd={(event, info) => {
            if (info.offset.x > 100) {
              setExitDirection(500)
              onSwipe("right")
            } else if (info.offset.x < -100) {
              setExitDirection(-500)
              onSwipe("left")
            } else {
              x.set(0)
            }
            setDragInfo(0)
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0.9, opacity: 0, x: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{
            x: exitDirection,
            opacity: 0,
            transition: { duration: 0.3 },
          }}
          transition={{ duration: 0.3 }}
        >
          {dragInfo > 50 && (
            <div className="absolute top-8 left-8 bg-success text-white px-4 py-2 rounded-lg font-bold -rotate-12 border-2 border-white z-30 shadow-lg">
              INTERESTED
            </div>
          )}

          {dragInfo < -50 && (
            <div className="absolute top-8 right-8 bg-error text-white px-4 py-2 rounded-lg font-bold rotate-12 border-2 border-white z-30 shadow-lg">
              NOPE
            </div>
          )}

          <FeedCard user={activeUser} />

          <div className="absolute bottom-4 left-0 right-0 flex justify-around z-20">
            <button
              onClick={() => handleButtonSwipe("left")}
              className="btn btn-circle btn-outline border-error text-error hover:bg-error hover:text-white transition-all"
            >
              ✖
            </button>
            <button
              onClick={() => handleButtonSwipe("right")}
              className="btn btn-circle btn-outline border-success text-success hover:bg-success hover:text-white transition-all"
            >
              ❤️
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  )
}

export default Feed