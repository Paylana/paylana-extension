import Check from '@assets/images/Amazon/check.svg'
import arrow from '@assets/images/Amazon/arrow.svg'
export default function DisStepHeader({ done, step, title }: any) {
  return (
    <div className="flex items-center justify-start gap-[8px] w-full">
      <div className="relative flex flex-col items-center self-start">
        <div
          style={{ border: '1px solid rgba(124, 93, 248, 0.25)' }}
          className={`size-[32px] flex items-center justify-center rounded text-[16px] font-[500] leading-7 text-[#7C5DF8] shrink-0  font-DmMono  ${
            !done ? 'bg-[#140E24]' : 'bg-white'
          }`}
        >
          {!done ? '0' + step : <img src={Check} alt="check icon" width={20} />}
        </div>
        {done && (
          <div className="w-[2px] h-[24px] bg-[#4A465B] absolute top-[32px]">
            <p className="opacity-0 ">|</p>
          </div>
        )}
      </div>
      <div className="flex p-[12px_16px] rounded-xl bg-[#211A36] justify-between items-center self-stretch w-full ">
        <div className="text-[#C7BFDF] text-[14px] font-[700]">{title}</div>
        <img src={arrow} alt="" className=" size-[20px]" />
      </div>
    </div>
  )
}
