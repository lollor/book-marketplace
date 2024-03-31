type Props = {
   children: React.ReactNode
}

export default function Page({children}: Props) {
   return (
      <div className="lg:flex justify-between items-center">
         <div className="hidden lg:flex h-[60vh] w-[49%] text-white text-4xl items-center justify-center rounded-[50px] bg-gradient-to-br from-[#889cff] to-primary animated">
            <span className="font-semibold">Book</span>Marketplace
         </div>
         <div className="lg:h-[80vh] h-[95vh] lg:w-[45%] lg:pr-6 flex flex-col items-center justify-center">
            {children}
         </div>
      </div>
   )
}