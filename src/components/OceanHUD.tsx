import SonarWidget from './SonarWidget'

interface OceanHUDProps {
  scrollProg: number
  depthMeters: number
}

export default function OceanHUD({ scrollProg, depthMeters }: OceanHUDProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex items-center justify-between px-4 sm:bottom-8 sm:px-6">
      <div className="pointer-events-auto origin-bottom-left scale-[0.65] sm:scale-100">
        <SonarWidget />
      </div>
      <div className="flex items-center gap-2 font-sans text-[10px] text-[#dde8e9]/50 sm:gap-3 sm:text-xs">
        <div className="relative h-10 w-px bg-white/10 sm:h-16">
          <div
            className="absolute bottom-0 left-0 w-px bg-[#57b8bc]"
            style={{ height: `${scrollProg * 100}%` }}
          />
        </div>
        <div className="w-6 whitespace-nowrap text-center sm:w-8">{depthMeters}m</div>
      </div>
    </div>
  )
}
