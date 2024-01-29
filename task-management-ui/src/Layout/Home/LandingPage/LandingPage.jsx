import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { useContext } from "react";
import { AuthContext } from "../../../Authentication/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
const LandingPage = () => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const fadeInAnimate = {
        initial:{x: '-80%'},
        animate: {x:0 } 
      }
      const fadeDownAnimate = {
        initial:{y: '-80%'},
        animate: {y:0 } 
      }
      const fadeUpAnimate = {
        initial:{x: '80%'},
        animate: {x:0 } 
      }
      const pop = {
        initial:{scale: 0},
        animate: {scale: 1 } 
      }
    
        
        const [sliderRef] = useKeenSlider(
            {
              loop: true,
              duration:2000
            },
            [
              (slider) => {
                let timeout
                function clearNextTimeout() {
                  clearTimeout(timeout)
                }
                function nextTimeout() {
                  clearTimeout(timeout)
                  timeout = setTimeout(() => {
                    slider.next()
                  }, 3000)
                }
                slider.on("created", () => {
                  slider.container.addEventListener("mouseover", () => {
                    mouseOver = true
                    clearNextTimeout()
                  })
                  slider.container.addEventListener("mouseout", () => {
                    mouseOver = false
                    nextTimeout()
                  })
                  nextTimeout()
                })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
              },
            ]
          )

          const handlePeak =() =>{
            if(user) {
                navigate('/dashboard/allTasks')
            }else{
                Swal.fire({position: "top-end", title: "Please Log In First", showConfirmButton: false, timer: 1500});
                navigate('/logIn')
            }
          }
    return (
        <div className=" gap-5  flex flex-col-reverse items-center lg:max-h-screen ">
        <div ref={sliderRef} className="   mx-auto keen-slider col-span-2">

            {/* Slide #1 */}
         
          <div className=" keen-slider__slide number-slide1 bg-cover lg:h-screen p-10 flex justify-center" style={{ backgroundImage: "url('https://i.ibb.co/smNZcsf/image.png')" }}>
          <div className="col-span-2 flex flex-col justify-center items-center">
              <div  className="flex flex-col w-full lg:pl-10 justify-center gap-1 lg:gap-5 text-start text-white items-center overflow-hidden">
                  <motion.h1 variants={fadeDownAnimate}  initial="initial" whileInView='animate' transition={{  duration: 1 }} className="lg:text-3xl">Welcome To</motion.h1>
                  <motion.h1 variants={fadeInAnimate} initial="initial" whileInView="animate" transition={{  duration: 1 }} className="text-2xl lg:text-7xl font-bold">Task Forge</motion.h1>
                  <motion.h1 variants={fadeUpAnimate} initial="initial" whileInView="animate" transition={{  duration: 1 }} >
                  <p className=" text-xs lg:text-3xl font-semibold">Managing tasks was never easier</p>
                  </motion.h1>
              </div>
              <motion.div variants={pop} initial={{y:50}} whileInView={{y:0}} transition={{  duration: 1 }} className="lg:pl-10">
              <NavLink onClick={handlePeak} className='mt-2 w-fit lg:mt-5 block p-1 lg:p-5 lg:text-xl text-xs border-2 hover:border-black border-black hover:text-[#e94f37] lg:w-fit btnLandLord text-white ' >Take a peak</NavLink>
              </motion.div>
        </div>
        </div>

            {/* Slide #2 */}

          <div className=" keen-slider__slide number-slide1 bg-cover  lg:h-screen p-10 flex " style={{ backgroundImage: "url('https://i.ibb.co/L8KN1LP/leone-venter-Vie-M9-Bd-ZKFo-unsplash.jpg')" }}>
          <div className="col-span-2 flex flex-col justify-center ">
              <div  className="flex flex-col w-full lg:pl-10 justify-center gap-1 lg:gap-5 text-start text-black  overflow-hidden">
                  {/* <motion.h1 variants={fadeDownAnimate}  initial="initial" whileInView='animate' transition={{  duration: 1 }} className="lg:text-3xl">Welcome To</motion.h1> */}
                  {/* <motion.h1 variants={fadeDownAnimate}  initial="initial" whileInView='animate' transition={{  duration: 1 }} className="lg:text-3xl">Welcome To</motion.h1> */}
                  <motion.h1 variants={fadeInAnimate} initial="initial" whileInView="animate" transition={{  duration: 1 }} className="text-2xl lg:text-7xl font-bold">Collaborate with other users</motion.h1>
                  <motion.h1 variants={fadeUpAnimate} initial={{x:-50}} whileInView="animate" transition={{  duration: 1 }} >
                  <p className=" text-xs lg:text-3xl font-semibold">Make your job easier</p>
                  </motion.h1>
              </div>
              <motion.div variants={pop} initial={{y:50}} whileInView={{y:0}} transition={{  duration: 1 }} className="lg:pl-10">
              <NavLink onClick={handlePeak} className='mt-2 w-fit lg:mt-5 block p-1 lg:p-5 lg:text-xl text-xs border-2 hover:border-black border-black  lg:w-fit  bg-white text-black '>Take a peak</NavLink>
              </motion.div>
        </div>
        </div>

          


        

        </div>
      </div>
    );
};

export default LandingPage;