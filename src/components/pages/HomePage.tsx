
import landingPage from "@/assets/landing.png";
import appDownloadImg from "@/assets/appDownload.png";


const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
        <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16" >
          <h1 className="md:text-5xl text-3xl font-bold tracking-tight text-orange-600">Tuck into a takeway today</h1>
          <span className="text-xl font-bold">Food is just a click away!</span>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
            <img src={landingPage}/>
            <div className="flex flex-col items-center gap-4 justify-center text-center">
              <span className="font-bold text-3xl tracking-tighter">Order takeaway even faster</span>
              <span>Download the MernEats App for faster ordering and personalised recommendations</span>
              <img src={appDownloadImg} alt="" />
            </div>
        </div>
       
    </div>
  )
}

export default HomePage;