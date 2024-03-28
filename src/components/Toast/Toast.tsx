import { memo, useEffect, useState } from 'react'

import '@src/screen/WithdrawPage/withdraw.scss'
import '@src/screen/WithdrawPage/PopupMessage/animation-popup.scss'
import PopupMessage_Lottie from '@src/screen/WithdrawPage/PopupMessage/PopupMessage_Lottie'
import { useAppDispatch, useAppSelector } from '@src/hooks/appHook'
import { selectCurrentToast, setCurrentToast } from '@src/store/reducers/toastSlice'

const Toast = ({ autoDelete }: { autoDelete: boolean }) => {
  const currToast = useAppSelector(selectCurrentToast)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && currToast) {
        dispatch(setCurrentToast(null))
      }
    }, currToast?.dismissTime)

    return () => {
      clearInterval(interval)
    }
  }, [currToast, autoDelete, currToast?.dismissTime])

  return (
    <>
      {currToast && (
        <div
          className={`${
            currToast ? 'right-4' : ' right-[-100%]'
          } fixed bottom-4 flex items-center w-[328px] p-[12px] rounded-2xl gap-3 border-withdraw text-white bg-[rgba(5,_5,_33,_0.7)] backdrop-blur-2xl z-50`}
          style={{ boxShadow: '0px 0px 16px 0px rgba(202, 18, 255, 0.40)' }}
        >
          <div className="flex w-[48px] h-[48px]">
            <PopupMessage_Lottie type={currToast.type} />
          </div>
          <div className="flex flex-col gap-[4px] items-start">
            <h1 className="font-[600] text-[14px] leading-6">{currToast.msgType}</h1>
            <p className="font-[400] text-[12px] leading-5">{currToast.msg}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default memo(Toast)
