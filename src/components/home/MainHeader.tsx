import Image from "next/image"

export function MainHeader() {
  return (
    <header className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col items-center justify-center">
        <Image src="/assets/img/logo.png" alt="Logo Marvel" width={300} height={80} className="object-contain mb-4" />
        <h1 className="text-3xl font-bold flex justify-center text-[#404040]">EXPLORE O UNIVERSO</h1>
        <p className="text-sm mt-2 font-bold flex justify-center text-[#b9b9b9]">
          Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você
          descobrirá em breve!
        </p>
      </div>
    </header>
  )
}
