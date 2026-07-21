import { motion } from "framer-motion";

import {
    FaCog
} from "react-icons/fa";


export default function SettingsHeader(){


return(

<motion.div

initial={{
    opacity:0,
    y:-20
}}

animate={{
    opacity:1,
    y:0
}}

transition={{
    duration:0.5
}}

className="
flex
items-center
gap-5
"

>


<div

className="
w-16
h-16
rounded-2xl
bg-gradient-to-r
from-[#0B6B57]
to-[#12A67D]
text-white
flex
items-center
justify-center
shadow-lg
"

>

<FaCog size={28}/>


</div>



<div>


<h1

className="
text-4xl
font-bold
text-slate-800
dark:text-white
"

>

Settings

</h1>


<p

className="
text-gray-500
mt-2
"

>

Manage your PaisaTrack preferences and customize your experience.

</p>


</div>


</motion.div>

);

}