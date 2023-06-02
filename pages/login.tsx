import Image from 'next/image';

import { signIn } from "next-auth/react";

import { FcGoogle } from 'react-icons/fc';

const Login  = () => {

    const imageStyle = {
        width: 'auto',
        height: 'auto',
    };
 
    return  (
        <div className="relative h-full w-full bg-[url('/images/gamebackground.jpg')] bg-no-repeat bg-fixed bg-cover">
            <div className="bg-black w-full h-full md:bg-opacity-50 flex justify-center items-center">
                <div className="flex justify-center">
                    <div className="flex flex-col items-center bg-black bg-opacity-80 px-16 py-20  rounded-md">

                        <Image src="/images/gamelogo.png" alt="Gameverse" className='-ml-8 mb-10' height={150} width={150} priority={true} style={imageStyle} />

                        <h2 className='text-white text-2xl mb-3 font-semibold'>
                            Entrar com uma conta Google
                        </h2>

                        <div className='mt-10 justify-center'>
                             <div onClick={() => signIn('google', { callbackUrl: '/' })} className='w-[10em] h-10 bg-white rounded-md flex items-center justify-center cursor-pointer hover:opacity-80 transition'>
                                <FcGoogle size={30} />
                             </div>
                         </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;