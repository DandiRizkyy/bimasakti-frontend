import Avatar from 'components/Avatar'
import logo from 'assets/logo.svg'
import { motion } from 'framer-motion'
import { useState } from 'react'
import styled from 'styled-components'
import './styles.css'
import Modal from './Modal'
import axios from 'axios'
import ModalPayment from './ModalPayment'
import { useNavigate } from 'react-router-dom'
import BeatLoader from 'react-spinners/BeatLoader'
import {convertToRupiah} from 'utils/index'

const ModalContent = styled.div`
  height: 100%;
  z-index: 100;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 20px;
    font-weight: bold;
  }
`

const ModalContentPayment = styled.div`
  height: 100%;
  z-index: 100;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 20px;
    font-weight: bold;
  }
`

const randoms = [
  [1, 2],
  [3, 4, 5],
  [6, 7]
]

export default function Home() {
  const [isOpen, toggle] = useState(false)
  const navigate = useNavigate()
  const [isOpenPayment, setIsOpenPayment] = useState(false)
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [kodeprodukPayment, setKodeprodukPayment] = useState('')
  const [nominalPayment, setNominalPayment] = useState('')
  const [ref2Payment, setRef2Payment] = useState('')
  const [ref3Payment, setRef3Payment] = useState('')
  const [inqData, setInqData] = useState<{
    nominal: string
    biayaadmin: string
    totalbayar: string
    saldo: string
  }>({ nominal: '', biayaadmin: '', totalbayar: '', saldo: '' })
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inquiryApi = import.meta.env.VITE_INQUIRY_API
  const paymentApi = import.meta.env.VITE_PAYMENT_API
  const inquiryMethod = import.meta.env.VITE_INQUIRY_METHOD
  const paymentMethod = import.meta.env.VITE_PAYMENT_METHOD
  const uidMethod = import.meta.env.VITE_POST_UID
  const pinMethod = import.meta.env.VITE_POST_PIN
  const ref1Method = import.meta.env.VITE_POST_REF1

  const handleNavigateHistory = () => {
    navigate('/history')
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    // Handle form submission logic here
    console.log('Input 1:', input1)
    console.log('Input 2:', input2)
    try {
      setIsLoading(true)
      const response = await axios.post(inquiryApi, {
        method: inquiryMethod,
        uid: uidMethod,
        pin: pinMethod,
        idpel1: input1,
        idpel2: '',
        idpel3: '',
        kode_produk: input2,
        ref1: ref1Method
      })
      console.log(response)
      setIsLoading(false)
      setInqData(response.data.data)
      setNominalPayment(response.data.data.nominal)
      setRef2Payment(response.data.data.ref2)
      setRef3Payment(response.data.data.ref3)
      setKodeprodukPayment(response.data.data.kodeproduk)
    } catch (error) {
      setIsLoading(false)
      setIsError(true)
      console.log(error)
    }
  }

  const handlePayment = async () => {
    // Handle form submission logic here

    const response = await axios.post(paymentApi, {
      method: paymentMethod,
      uid: uidMethod,
      pin: pinMethod,
      idpel1: input1,
      idpel2: '',
      idpel3: '',
      kode_produk: kodeprodukPayment,
      ref1: ref1Method,
      nominal: nominalPayment,
      ref2: ref2Payment,
      ref3: ref3Payment
    })
    console.log('gas payment')
    console.log(response)
  }

  function handlOpenModal(open: any) {
    console.log('close modal')
    if (open === false) {
      setIsError(false)
      console.log('tutup')
    }
    toggle(open)
  }

  function handlOpenModalPayment(open: any) {
    console.log('close modal')
    if (open === true) {
      handlePayment()
    }
    toggle(open)
    setIsOpenPayment(open)
  }
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="h-auto sm:pb-40 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <div className="my-4">
              <Avatar size="large" src={logo} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Selamat Datang
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Silahkan Cek Tagihan Anda
            </p>
          </div>
          <div className='flex'>
          <div>
            <div className="my-10 max-w-full">
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="input1"
                  >
                    ID Pelanggan
                  </label>
                  <input
                    type="text"
                    id="input1"
                    value={input1}
                    onChange={(e) => setInput1(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="input2"
                  >
                    Kode Produk
                  </label>
                  <input
                    type="text"
                    id="input2"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {/* <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button> */}
                <div className="flex gap-4 text-sm">
                  <button
                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-3 py-1 text-center font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
                    onClick={() => handlOpenModal(true)}
                    type="submit"
                  >
                    Cek Tagihan
                  </button>
                  <button
                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
                    onClick={() => handleNavigateHistory()}
                    type="submit"
                  >
                    Cek History Pembayaran
                  </button>
                </div>
              </form>
              <Modal isOpen={isOpen} handleClose={() => handlOpenModal(false)}>
                {isLoading ? (
                  <ModalContent>
                    <BeatLoader color="#423fcf" />
                  </ModalContent>
                ) : isError ? (
                  <ModalContent>
                    <div className="flex mt-5 mb-5 justify-center items-center">
                      <img
                        src="/red-cross.svg"
                        alt="green-checkmark"
                        width={150}
                      />
                    </div>
                    <h1>Data salah, mohon coba kembali.</h1>
                  </ModalContent>
                ) : (
                  <ModalContent>
                    <h1>Informasi Tagihan Anda</h1>
                    <p>Tagihan bulan ini : {convertToRupiah(Number(inqData.nominal))}</p>
                    <p>Biaya Admin: {convertToRupiah(Number(inqData.biayaadmin))}</p>
                    <p>Total tagihan anda bulan ini: {convertToRupiah(Number(inqData.totalbayar))}</p>
                    <p>Saldo Anda: {convertToRupiah(Number(inqData.saldo))}</p>
                    <button
                      className="mt-2 inline-block rounded-xl border border-transparent bg-lime-600 px-8 py-3 text-center font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
                      onClick={() => handlOpenModalPayment(true)}
                      type="submit"
                    >
                      Bayar Tagihan
                    </button>
                  </ModalContent>
                )}
              </Modal>

              <ModalPayment
                isOpen={isOpenPayment}
                handleClose={() => handlOpenModalPayment(false)}
              >
                <ModalContentPayment>
                  <div className="flex mt-5 mb-5 justify-center items-center">
                    <img
                      src="/green-checkmark.svg"
                      alt="green-checkmark"
                      width={150}
                    />
                  </div>
                  <h1> Pembayaran Sukses </h1>
                </ModalContentPayment>
              </ModalPayment>

            </div>
            
          </div>

          </div>

          

        </div>
        
      </div>
      
    </div>
  )
}
