import { Link } from 'react-router-dom';

export default function CallToAction() {
  return (
    // <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-3xl rounded-br-3xl text-center h-[11rem]'>
    //     <div className="flex-1 justify-center flex flex-col">
    //         <h2 className='text-xl md:block hidden'>
    //             Want to learn more about JavaScript?
    //         </h2>
    //         <p className='text-gray-500 my-2 md:block hidden'>
    //             Checkout these resources with 100 JavaScript Projects
    //         </p>
    //         <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
    //             <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>
    //                 100 JavaScript Projects
    //             </a>
    //         </Button>
    //     </div>
    // </div>
        // <div className="p-7 flex-1 w-20  md:block hidden">
        // </div>
            <Link to={'href="https://www.100jsprojects.com" '}>
            <img className='w-[30%]'  src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
            </Link>
  )
}