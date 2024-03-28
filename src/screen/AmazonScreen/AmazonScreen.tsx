import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { clusterApiUrl, Connection, PublicKey, Keypair } from '@solana/web3.js'
import { encodeURL, createQR } from '@solana/pay'
import BigNumber from 'bignumber.js'
import { ValidatePayment } from '@src/utils/TransactionValidate/qrValidator'
import { OriginExtract } from '@src/utils/lib'
import DisStepHeader from './DisableStepHeader'
import AmazonCardStep from '@src/components/AmazonCard/AmazonCardStep'
//Img

import AmazonFooter from './AmazonFooter'
export default function AmazonScreen() {
  const [searchParams] = useSearchParams()
  const senderInfo = JSON.parse(searchParams.get('senderInfo'))
  const senderOrigin = OriginExtract(senderInfo.origin)
  const senderTabID = senderInfo.tab.id

  console.log('sender info found:', senderInfo)

  const [step, setStep] = useState(1)
  /* for showing | hiding steps */
  const [showStep, setShowStep] = useState([true, false, false, false])
  /* for step completion (completed or not) */
  const [stepStatus, setStepStatus] = useState([true, false, false, false])
  /* for step process (loading or done) */
  const [stepLoading, setStepLoading] = useState([true, true, true, true])

  let ref = useRef(null)

  useEffect(() => {
    /* Establish a connection */
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

    /* Create a payment request link */
    const payment_recipient = new PublicKey('E3z9bv1GbWMceWQ34Waxcgi3C6c9FQevYSbjPckY8Ccp') // <- Merchant address
    const payment_amount = new BigNumber(0.001643) // <- Item price
    const splToken = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU') // <- Token address
    const payment_reference = new Keypair().publicKey // <- Reference(key) for tracking/validating transaction
    const payment_label = 'Savita Gems'
    const payment_message =
      'Natural Picture Jasper Beads Stretchable Bracelet, Approx 4 MM Smooth Round Beads, Stretchable Jasper Bracelet, Adjustable'
    const payment_memo = '#' + 'OrderID1945' // <- Transaction memo -> memo program

    const url = encodeURL({
      recipient: payment_recipient,
      amount: payment_amount,
      splToken: splToken,
      reference: payment_reference,
      label: payment_label,
      message: payment_message,
      memo: payment_memo,
    })

    /* Encode link into a QR code & Add the QR code to your payment page */
    const qrCode = createQR(url, 191, '#140E24', '#FFF')
    qrCode.append(ref.current)

    /* Check for payment status */
    TrackPaymentProcess(payment_reference, connection, payment_recipient, payment_amount, splToken)

    console.log('document location: ', document.location)
  }, [])

  const TrackPaymentProcess = async (
    payment_reference,
    connection,
    payment_recipient,
    payment_amount,
    splToken
  ) => {
    try {
      // const paymentStatus = await ValidatePayment(
      //   payment_reference,
      //   connection,
      //   payment_recipient,
      //   payment_amount,
      //   splToken
      // )
      // console.log('payment Status: ', paymentStatus)

      /* if payment is validated -> simulate step 2 */
      setTimeout(async () => {
        changeStepStatus(setStepLoading, 1, false)
        await simulateStep2()
      }, 7000)
    } catch (error) {
      console.log('payment error: ', error)
    }
  }

  const changeStepStatus = (statusArray, step, value) => {
    statusArray((prevStatus) => {
      var tempStatus = [...prevStatus]
      tempStatus[step - 1] = value
      return tempStatus
    })
  }

  const simulateStep2 = async () => {
    setStep(2)
    changeStepStatus(setShowStep, 2, true)

    setTimeout(async () => {
      changeStepStatus(setStepLoading, 2, false)
      changeStepStatus(setStepStatus, 2, true)

      setTimeout(() => {
        simulateStep3()
      }, 2000)
    }, 3000)
  }

  const simulateStep3 = async () => {
    setStep(3)
    changeStepStatus(setShowStep, 3, true)
    /* send code to background */
    chrome.runtime.sendMessage(
      {
        action: 'applyGiftCard',
        data: 'G6HA-IJ5K-LYUV-WZ14-DQ0R',
        senderOrigin: senderOrigin,
        senderTabId: senderTabID,
      },
      (response) => {
        console.log('response from background is: ', response)
        if (response.success) {
          changeStepStatus(setStepLoading, 3, false)
          changeStepStatus(setStepStatus, 3, true)
          setTimeout(() => {
            simulateStep4()
          }, 2000)
        }
      }
    )
  }

  const simulateStep4 = async () => {
    setStep(4)
    changeStepStatus(setShowStep, 4, true)
    chrome.runtime.sendMessage(
      {
        action: 'placeOrder',
        senderTabId: senderTabID,
      },
      (response) => {
        console.log('response from background is: ', response)
        if (response.success) {
          setTimeout(() => {
            changeStepStatus(setStepLoading, 4, false)
            changeStepStatus(setStepStatus, 4, true)
          }, 2000)
        }
      }
    )
  }

  return (
    <div className="overflow-hidden h-[580px] w-[320px] bg-[url('../../assets/images/Amazon/bg.png')] bg-cover bg-no-repeat pr-[12px] pl-[8px] pt-[24px] text-[#FFF] flex flex-col  justify-between items-center font-monasans m-0 ">
      {/* step 1 */}
      <div className="h-[420px] no-scrollbar overflow-x-hidden overflow-y-scroll flex flex-col items-center justify-start w-full gap-4 ">
        {step === 1 ? (
          <>
            <AmazonCardStep
              step={1}
              title={'Deposit Required USDC'}
              stepLoading={stepLoading}
              currentref={ref}
            />
          </>
        ) : (
          <button
            className="w-full "
            onClick={() => {
              if (showStep[0]) setStep(1)
            }}
          >
            <DisStepHeader done={stepStatus[0]} step={1} title={'Deposit Required USDC'} />
          </button>
        )}
        {/* <div className="ml-3 h-4 border-l border-[#bdbdbd]"></div> */}
        {/* step 2 */}
        {step === 2 ? (
          <div className="w-full">
            <AmazonCardStep
              step={2}
              title={`Convert to ${senderOrigin} Balance`}
              stepLoading={stepLoading}
              currentref={ref}
              senderOrigin={senderOrigin}
            />
          </div>
        ) : (
          <button
            className="w-full "
            onClick={() => {
              if (showStep[1]) setStep(2)
            }}
          >
            <DisStepHeader
              done={stepStatus[1]}
              step={2}
              title={`Convert to ${senderOrigin} Balance`}
            />
          </button>
        )}
        {/* <div className="ml-3 h-4 border-l border-[#bdbdbd]"></div> */}
        {/* step 3 */}
        {step === 3 ? (
          <div className="w-full">
            <AmazonCardStep
              step={3}
              title={'Apply Gift Card'}
              stepLoading={stepLoading}
              currentref={ref}
            />
          </div>
        ) : (
          <button
            className="w-full "
            onClick={() => {
              if (showStep[2]) setStep(3)
            }}
          >
            <DisStepHeader done={stepStatus[2]} step={3} title={'Apply Gift Card'} />
          </button>
        )}
        {/* <div className="ml-3 h-4 border-l border-[#bdbdbd]"></div> */}
        {/* step 4 */}
        {step === 4 ? (
          <div className="w-full">
            <AmazonCardStep
              step={4}
              title={'Place Order'}
              stepLoading={stepLoading}
              currentref={ref}
            />
          </div>
        ) : (
          <button
            className="w-full "
            onClick={() => {
              if (showStep[3]) setStep(4)
            }}
          >
            <DisStepHeader done={stepStatus[3]} step={4} title={'Place Order'} />
          </button>
        )}
        {/* end part */}
        {/* <div className="ml-3 h-4 border-l border-[#bdbdbd]"></div> */}
      </div>
      {!stepLoading[3] && (
        <div className="w-full flex flex-col items-center text-center">
          <div className="text-[#36F181] text-[16px] font-[700] mb-[10px]">
            Thanks for using our service!
          </div>
          <div className="text-[#CECBCF] font-monasans text-[14px] leading-[100%] font-light mb-[32px] max-w-[248px]">
            You earned <span className="text-[#9D3BFF] mx-1">3</span>
            points for successfully purchased this product.
          </div>
          <div className="px-2 py-1.5 rounded-[32px] bg-[#36F181] w-fit">
            <div className="font-DmMono text-[14px] leading-[100%] font-medium text-black">
              GO TO HOMEPAGE
            </div>
          </div>
        </div>
      )}
      <AmazonFooter />
    </div>
  )
}
