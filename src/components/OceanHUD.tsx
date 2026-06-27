import SonarWidget from './SonarWidget'

interface OceanHUDProps {
  scrollProg: number
  depthMeters: number
}

export default function OceanHUD({ scrollProg, depthMeters }: OceanHUDProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex items-center justify-between px-6">
      <div className="pointer-events-auto">
        <SonarWidget />
      </div>
      <div className="flex items-center gap-3 font-sans text-xs text-[#dde8e9]/50">
        <div className="relative h-16 w-px bg-white/10">
          <div
            className="absolute bottom-0 left-0 w-px bg-[#57b8bc]"
            style={{ height: `${scrollProg * 100}%` }}
          />
        </div>
        <div className="w-8 whitespace-nowrap text-center">{depthMeters}m</div>
      </div>
    </div>
  )
}
