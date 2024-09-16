

const Footer = () => {
  return (
    <div className="bg-orange-500 md:py-10 py-5">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
            <span className="text-2xl md:text-3xl text-white font-bold tracking-tight">
               MernEats.com
            </span>
            <span className="text-white font-bold tracking-tight flex gap-10">
              <span className="cursor-pointer  hover:text-black transition:colors
                               duration-300 text-xs md:text-base">
                Privacy Policy
              </span>
              <span className="cursor-pointer  hover:text-black transition:colors 
                               duration-300 text-xs md:text-base">
                Terms of Service
              </span>
            </span>
        </div>
    </div>
  )
}

export default Footer;