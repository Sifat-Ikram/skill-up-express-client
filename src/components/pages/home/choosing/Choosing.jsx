import { FaChalkboardTeacher } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaBookOpen } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { motion } from "framer-motion";

const Choosing = () => {
    const iconVariants = {
        hidden: {
            opacity: 0,
            scale: 0.5
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                delay: 0.2
            }
        },
        hover: {
            scale: 1.2
        }
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold text-center mb-8">Why Choose SkillUp Express</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <motion.div className="p-4 cursor-pointer bg-white shadow-lg rounded-lg flex flex-col items-center justify-center" variants={iconVariants} initial="hidden" animate="visible" whileHover="hover">
                    <FaChalkboardTeacher className="text-6xl text-[#04734C] mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Expert Instructors</h2>
                    <p className="text-center">Learn from experienced instructors in various fields to gain valuable knowledge.</p>
                </motion.div>
                <motion.div className="p-4 cursor-pointer bg-white shadow-lg rounded-lg flex flex-col items-center justify-center" variants={iconVariants} initial="hidden" animate="visible" whileHover="hover">
                    <IoMdCheckmarkCircle className="text-6xl text-[#04734C] mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Flexible Learning</h2>
                    <p className="text-center">Enjoy the flexibility of learning at your own pace and schedule.</p>
                </motion.div>
                <motion.div className="p-4 cursor-pointer bg-white shadow-lg rounded-lg flex flex-col items-center justify-center" variants={iconVariants} initial="hidden" animate="visible" whileHover="hover">
                    <FaBookOpen className="text-6xl text-[#04734C] mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Rich Content</h2>
                    <p className="text-center">Access a wide range of educational materials, including textbooks, articles, and more.</p>
                </motion.div>
                <motion.div className="p-4 cursor-pointer bg-white shadow-lg rounded-lg flex flex-col items-center justify-center" variants={iconVariants} initial="hidden" animate="visible" whileHover="hover">
                    <FaVideo className="text-6xl text-[#04734C] mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Interactive Lessons</h2>
                    <p className="text-center">Engage in interactive video lessons to enhance your learning experience.</p>
                </motion.div>
            </div>
        </div>
    );
};

export default Choosing;