import LineLeft from '@assets/images/Amazon/lineLeft.svg'
import LineRight from '@assets/images/Amazon/lineRight.svg'
import AmazonFooter from '@src/components/AmazonFooter'
import { useEffect, useRef, useState } from 'react'
import { LocalStorage } from '@src/utils/localStorage'
import { walletFormatAddress } from '@src/utils/lib'
export default function HomeScreen() {
  const addRef = useRef(null)
  const [address, setAddress] = useState<any>(null)
  const [point, setPoint] = useState<any>(null)
  const openLoginTab = () => {
    const loginTabURL = 'http://localhost:3001/'
    chrome.tabs.create({ url: loginTabURL })
  }

  const logout = async () => {
    await chrome.storage.local.clear().then((result) => retrieveAddress())
  }

  const retrieveAddress = async () => {
    const addressStorage = await LocalStorage.getSolanaAddress()
    console.log('address get: ', addressStorage)
    if (addressStorage) {
      setAddress(addressStorage)
    } else setAddress(null)
  }

  const retrievePoint = async () => {
    const pointStorage = await LocalStorage.getPoint()
    if (pointStorage) {
      setPoint(pointStorage)
    } else setPoint(null)
  }

  useEffect(() => {
    retrieveAddress()
    retrievePoint()
  }, [])

  return (
    <div className="flex flex-col w-[320px] bg-[url('../../assets/images/Amazon/bg.png')] bg-cover bg-no-repeat font-DmMono">
      {address === null ? (
        <div className="py-[32px] flex items-center">
          <img src={LineLeft} className="w-[68px]" alt="line left" />

          <button
            className="w-[184px] text-black text-[16px] leading-[16px] font-medium rounded-[32px] bg-[#36F181] py-[10px] text-center px-[24px]"
            onClick={openLoginTab}
          >
            Connect Wallet
          </button>

          <img src={LineRight} className="w-[68px]" alt="line right" />
        </div>
      ) : (
        <div className="w-full ">
          {/* header */}
          <div className="p-4 flex items-center justify-between border-b border-b-[#2D2D2D] bg-[rgba(16,11,29,0.50)]">
            <p className="text-[#9D3BFF] font-DmMono text-[14px] leading-[100%] font-medium">
              {walletFormatAddress({ address: address })}
            </p>
            <button
              className="text-[#8F9491] text-[14px] leading-[100%] font-medium font-monasans"
              onClick={logout}
            >
              Log out
            </button>
          </div>
          {/* body */}
          <div className="py-8 px-4 flex flex-col items-center justify-start">
            <div className="font-monasans text-[#36F181] text-[40px] leading-[100%] font-bold mb-1">
              {point}
            </div>
            <div className="text-[#CECBCF] mb-4 text-[14px] font-monasans font-light ">
              loyalty points
            </div>
            <div className="w-fit px-3 py-1.5 rounded-[32px] border border-[#E0D493] bg-[radial-gradient(227.54%_141.42%_at_100%_0%,#6F5727_0%,#100B1D_30.5%,#100B1D_87.9%,#1D140B_100%)]">
              <p className="font-DmMono text-[14px] font-medium leading-[100%] text-[#FFD361]">
                Gold
              </p>
            </div>
          </div>
        </div>
      )}
      <AmazonFooter />
    </div>
  )
}
