import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { data } from '../config/config';
const EpicBirthdayAnimation = () => {
  const [showText, setShowText] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleClick = () => {
    setShowText(true);
  };

  const backgroundVariants = {
    hidden: { backgroundColor: '#1A1A1A' },
    visible: {
      backgroundColor: [
        '#1A1A1A',    // Start with dark
        '#FF6B6B',    // Red
        '#4ECDC4',    // Turquoise
        '#FFE66D',    // Yellow
        '#FF69B4',    // Pink
        '#9B59B6',    // Purple
        '#1A1A1A'     // Back to dark
      ],
      transition: { 
        duration: 15, 
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
        times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1]
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const balloonVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: -1000, opacity: 1, transition: { duration: 10, repeat: Infinity, ease: 'linear' } },
  };

  const confettiVariants = {
    hidden: { y: -100, opacity: 0, rotate: 0 },
    visible: { y: 1000, opacity: 1, rotate: 360, transition: { duration: 5, repeat: Infinity, ease: 'linear' } },
  };

  const words = [data?.wordOne, data?.wordTwo, data?.wordThree];
  // Here I want to change the words to the words in the config file

  useEffect(() => {
    const interval = setInterval(() => {
      console.clear();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
   <> 
    <motion.div
      className="flex items-center justify-center h-screen relative overflow-hidden"
      initial="hidden"
      animate={showText ? 'visible' : 'hidden'}
      variants={backgroundVariants}
    >
      <AnimatePresence>
        {!showText && (
          <motion.button
            key="button"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            onClick={handleClick}
            className="px-8 py-4 hover:bg-[#1A2A1B] text-2xl font-bold text-white bg-primary rounded-lg shadow-lg hover:bg-secondary transition-colors"
          >
            Click Here, {data?.name}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showText && (
          <motion.div
            key="text-container"
            className="text-center"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={textVariants}
            transition={{ duration: 1 }}
          >
            <div className='flex items-center justify-center'>
              <motion.div
                key={data?.age}
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.2, 0.8, 1.1, 1],
                  rotate: [0, -5, 5, -3, 0],
                }}
                transition={{
                  duration: 0.5,
                  times: [0, 0.2, 0.4, 0.6, 0.8],
                  ease: "easeInOut",
                }}
                className="text-6xl font-bold text-white mx-2"
              >
                {data?.age}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1],
                  scale: [0, 1.2, 1],
                  rotate: [0, 15, 0]
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: "backOut"
                }}
                className="text-6xl font-bold text-yellow-400 mx-2"
              >
                ➜
              </motion.div>
              <motion.div
                key={data?.newAge}
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1.3, 1],
                  rotate: [0, 10, 0]
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.6,
                  ease: "backOut"
                }}
                className="text-6xl font-bold text-green-400 mx-2"
              >
                {data?.newAge}
              </motion.div>
            </div>
            {words.map((word, index) => (
              <motion.h1
                key={word}
                className="text-6xl font-bold text-white mt-4"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 1, duration: 1 }}
              >
                {word}
              </motion.h1>
            ))}

            <motion.p
              className="text-gray-500 text-xl mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
            >
              Joyeux anniversaire, {data?.name}! Que cette journée te soit douce et lumineuse, remplie de joie et de bonheur. 🥳🎂✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showText && (
          <>
            {[...Array(10)].map((_, i) => (
              <motion.img
                key={`balloon-${i}`}
                src="https://cdn-icons-png.flaticon.com/512/1244/1244231.png"
                alt="Balloon"
                className="absolute w-12 h-16"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: '-100px',
                }}
                variants={balloonVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.5, duration: 10, repeat: Infinity, ease: 'linear' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showText && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.img
                key={`confetti-${i}`}
                src="https://cdn-icons-png.flaticon.com/512/4353/4353420.png"
                alt="Confetti"
                className="absolute w-6 h-6"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-100px',
                }}
                variants={confettiVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.2, duration: 5, repeat: Infinity, ease: 'linear' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showText && (
          <motion.img
            key="gift"
            src="https://freepngimg.com/thumb/gift/137013-blue-surprise-gift-png-image-high-quality-thumb.png"
            alt="Gift"
            className="absolute w-24 hover:cursor-pointer h-24 bottom-10 left-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onOpen}
            transition={{ delay: 2, duration: 1 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showText && (
          <motion.img
            key="cake"
            src="https://freepngimg.com/thumb/cake/159094-dark-cake-photos-chocolate-free-download-image.png"
            alt="Birthday Cake"
            className="absolute w-32 h-32 bottom-10 right-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 1 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} style={{ background: '#fff' }}>
        <DrawerContent style={{ maxWidth: '400px', borderRadius: '8px', backgroundColor: '#fff' }}>
          {(onClose: () => void) => (
            <>
              <DrawerHeader
                className="flex flex-col gap-1"
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                  padding: '16px',
                }}
              >
                {data?.name} | {data?.newAge}, Happy Birthday!
              </DrawerHeader>
              <DrawerBody style={{ padding: '20px', fontSize: '14px', backgroundColor: 'gray' }}>
                <p className="text-2xl font-bold">
                  Hello {data?.name}!
                </p>
                <p className="text-2xl">
                J'espère que votre cadeau vous plaira !
                </p>
                <p className="text-white">
                J'espère que tu seras plus heureuse en cette nouvelle année, nous t'aimons et joyeux anniversaire ma petite amie :) Nous serons toujours avec toi, j'espère que ce petit cadeau te plaira :)
                </p>
                <div>
                  <img src="https://cdn.pixabay.com/animation/2022/08/15/03/40/03-40-45-978_512.gif" className="w-42 h-42" alt="Gurcistan" />
                  <img src="https://media3.giphy.com/media/iAW45o4SkXmfF5XeOS/giphy.gif?cid=6c09b952r2e00jx0hjady9tjoledhx1p6f4451krq9sj7u18&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g" className="w-42 h-42" alt="Football" />
                </div>
              </DrawerBody>
              <DrawerFooter style={{ backgroundColor: 'red', padding: '10px 20px', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  style={{
                    backgroundColor: '#f44336',
                    color: '#fff',
                    marginRight: '10px',
                  }}
                >
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
   </> 
  );
};

export default EpicBirthdayAnimation;